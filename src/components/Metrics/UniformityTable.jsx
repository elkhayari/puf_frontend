import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { Checkbox, Button } from '@mui/material';

function ccyFormat(num) {
  return `${num.toFixed(4)}`;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}));

const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
  color: 'white' // For example, set the default color to pink
}));

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: '40px',
  // Adding bottom shadow
  boxShadow: 'rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;',

  // Adding a subtle border
  border: '1px solid rgba(0, 0, 0, 0.1)',

  // Adding a subtle gradient background
  background: 'linear-gradient(to bottom, #fff, #f5f5f5)'

  /*  '&:hover': {
    // Enhancing the shadow on hover to make it more interactive
    boxShadow: 'rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;',
  }, */
}));

function GroupRow({ group, evaluation_id, setExistingHeatmapIds }) {
  //const [heatmap, setHeatmap] = useState(null);
  console.log(group)
  const [heatmaps, setHeatmaps] = useState([]);
  const measurement_ids = group.challenge_measuremenst.map(
    (measurement) => measurement.id
  );
  console.log(measurement_ids)

  useEffect(() => {
    const fetchExistingHeatmapIds = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/brokerApi/existing-heatmap-ids/?evaluation_id=${evaluation_id}&measurement_ids=${JSON.stringify(measurement_ids)}`)
        const data = await response.json();
        console.log('data from existing heatmaps:::')
        console.log(data)
        // Append the fetched data to the existing heatmaps
        setHeatmaps(data);
        setExistingHeatmapIds(measurement_ids);
      } catch (error) {
          console.error("Error fetching existing heatmap IDs:", error);
      }
  };

  fetchExistingHeatmapIds()
  }, []);

  return (
    <div>
    {heatmaps && heatmaps.map(heatmap => (
      <div key={heatmap.id}>
        <p>ID: {heatmap.id}</p>
        <img src={`data:image/png;base64,${heatmap.heatmap_binary_image}`} alt={`Heatmap ${heatmap.id}`} />
      </div>
    ))}
  </div>
  );
}

export default function UniformityTable(props) {
  const {
    memoryGroup,
    group,
    initialValueGroup,
    totalMeasurements,
    addressesGroup,
    evaluation_id
  } = props;

  const [expanded, setExpanded] = useState(true);
  const [selected, setSelected] = useState([]);
  const [heatmapVisible, setHeatmapVisible] = useState(false);
  const [existingHeatmapIds, setExistingHeatmapIds] = useState([]);
  const [open, setOpen] = useState(false);




  //const isSelected = (id) => selected.indexOf(id) !== -1;
  const isSelected = (group) => {
    const groupIDs = group.challenge_measuremenst.map(
      (measurement) => measurement.id
    );

    // Find if the current group's IDs are already in one of the sub-arrays of `selected`
    const groupIndex = selected.findIndex(
      (subArray) =>
        subArray.length === groupIDs.length &&
        subArray.every((id) => groupIDs.includes(id))
    );

    return groupIndex !== -1;
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = addressesGroup.challenges.flatMap((challengeGroup) =>
        challengeGroup.challenge_measuremenst.map(
          (measurement) => measurement.id
        )
      );
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleSelectAllGroup = (event, group) => {
    console.log(group);
    const groupIDs = group.challenge_measuremenst.map(
      (measurement) => measurement.id
    );
    console.log(groupIDs);

    if (event.target.checked) {
      // Add the current group's IDs to the selected array of arrays if they are not already present
      setSelected((prevSelected) => {
        const isAlreadySelected = prevSelected.some(
          (subArray) =>
            subArray.length === groupIDs.length &&
            subArray.every((id) => groupIDs.includes(id))
        );

        if (!isAlreadySelected) {
          return [...prevSelected, groupIDs];
        } else {
          return prevSelected;
        }
      });
    } else {
      // Remove the current group's IDs from the selected array of arrays if they are present
      setSelected((prevSelected) => {
        const newSelected = prevSelected.filter(
          (subArray) =>
            !(
              subArray.length === groupIDs.length &&
              subArray.every((id) => groupIDs.includes(id))
            )
        );
        return newSelected;
      });
    }
  };

  const handleCheckboxClick = (event, id) => {
    console.log(id);
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  }));

  const handleGenerateHeatmap = async (addressesGroup) => {
    console.log(selected);
    console.log(addressesGroup);

    const groupedFilteredData = selected.map((selectedGroup) => {
      return selectedGroup.flatMap((selectedId) => {
        return addressesGroup.challenges.flatMap((challenge) =>
          challenge.challenge_measuremenst.filter(
            (measurement) => measurement.id === selectedId
          )
        );
      });
    });

    const requestData = {
      data: groupedFilteredData,
      evaluation_id : evaluation_id
    };
    console.log('groupedFilteredData');
    console.log(groupedFilteredData);
    //generate-heatmaps/
    const response = await fetch(
      'http://127.0.0.1:8000/brokerApi/generate-heatmaps/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      }
    );
    const data = await response.json();

    console.log(data);

    // Call the Django API endpoint to initiate heatmap generation
    /*  fetch('/api/generate_heatmap/', {
    method: 'POST',
    body: JSON.stringify(requestPayload),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      // Display heatmap to user or any other necessary actions
    }
  }); */
  };

  const fetchHeatmapForMeasurement = async (group) => {
    console.log(group)
    
   /*  try {
        const response = await fetch(`http://127.0.0.1:8000/api/heatmaps/?measurement_id=${measurementId}`);
        const data = await response.json();
        // Merge the new heatmap data with the existing ones
        setHeatmaps(prevHeatmaps => [...prevHeatmaps, ...data]);
    } catch (error) {
        console.error("Error fetching heatmap for measurement:", error);
    } */
};

  const fetchHeatmaps = async () => {
    console.log('fetch heatmaps')
   /*  try {
        const response = await fetch(`http://127.0.0.1:8000/api/heatmaps/?evaluation_id=${evaluation_id}&measurement_ids=${JSON.stringify(selected)}`);
        const data = await response.json();
        setHeatmaps(data);
    } catch (error) {
        console.error("Error fetching heatmaps:", error);
    } */
};

  const toggleHeatmapSection = () => {
    if (!heatmapVisible) {
        fetchHeatmaps();
    }
    setHeatmapVisible(!heatmapVisible);
};


  return (
    <StyledCard sx={{ width: '100%' }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="chip">
            {memoryGroup.memoryKey[0]}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={group.testType}
        subheader={memoryGroup.memoryKey}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Memory Area : {addressesGroup.startAddress} -{' '}
          {addressesGroup.stopAddress}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Initial Value: {initialValueGroup.initialValue}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Fractional Hamming Weight of Experimental Results
          {selected}
        </Typography>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <TableContainer component={Paper}>
            <Table sx={{ width: '100%' }} aria-label="customized table">
              <TableHead>
                <StyledTableRow>
                <StyledTableCell rowSpan={2} />
                  <StyledTableCell align="center" rowSpan={2}>
                    {console.log(addressesGroup)
                     
                    }
                    
                    <StyledCheckbox
                      indeterminate={
                        selected.length > 0 &&
                        selected.length < totalMeasurements
                      }
                      checked={
                        totalMeasurements > 0 &&
                        selected.length === totalMeasurements
                      }
                      onChange={handleSelectAllClick}
                    />{' '}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    colSpan={addressesGroup.challengeKeys.length}
                  >
                    Challenges
                  </StyledTableCell>
                  <StyledTableCell align="left" rowSpan={2}>
                    ID
                  </StyledTableCell>
                  <StyledTableCell align="left" rowSpan={2}>
                    Chip
                  </StyledTableCell>
                  <StyledTableCell align="left" rowSpan={2}>
                    Iteration
                  </StyledTableCell>
                  <StyledTableCell align="left" rowSpan={2}>
                    Zeros
                  </StyledTableCell>
                  <StyledTableCell align="left" rowSpan={2}>
                    Ones
                  </StyledTableCell>
                  <StyledTableCell align="left" rowSpan={2}>
                    Gaps
                  </StyledTableCell>
                  <StyledTableCell align="left" rowSpan={2}>
                    Hamming Weight
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  {addressesGroup.challengeKeys.map((challenge, i) => (
                    <StyledTableCell key={i} align="center">
                      {challenge}
                    </StyledTableCell>
                  ))}
                </StyledTableRow>
              </TableHead>

              <TableBody>
                {addressesGroup.challenges.map((challengeGroup) => {
                  console.log(challengeGroup);

                  return (
                    <>
                      {challengeGroup.challenge_measuremenst.map((meas, i) => (
                        <>
                        <TableRow key={i}>
                          {i === 0 &&
                            challengeGroup.challenge.map((c, j) => (
                              <>
                                <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
                                <StyledTableCell
                                  align="center"
                                  rowSpan={
                                    challengeGroup.challenge_measuremenst.length
                                  }
                                  padding="checkbox"
                                >
                                  <Checkbox
                                    checked={isSelected(challengeGroup)}
                                    onChange={(event) =>
                                      handleSelectAllGroup(
                                        event,
                                        challengeGroup
                                      )
                                    }
                                  />
                                </StyledTableCell>
                                
                                <TableCell
                                  align="center"
                                  rowSpan={
                                    challengeGroup.challenge_measuremenst.length
                                  }
                                >
                                  {c.challengeValue}
                                </TableCell>
                              </>
                            ))}{' '}
                          {/* DISPLAY chalenge values */}
                         
                          {
                            // Inside the component that renders TableRow
/* useEffect(() => {
  fetchHeatmapForMeasurement(challengeGroup)
}, [challengeGroup]) */

                          }
                          <StyledTableCell align="left">
                            {meas.id}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {meas.memoryLabel}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {meas.iteration}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {meas.zeros}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {meas.ones}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {meas.gaps}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {`${ccyFormat(meas.hammingWeight)}`}
                          </StyledTableCell>
                        </TableRow>
                        <TableRow>
                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={11}>
                          <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 1 }}>
                              <Typography
                                className="mr-2 text-gray-900 font-semibold mb-1"
                                gutterBottom
                              >
                                Characteristics
                              </Typography>
                                </Box>
                                <GroupRow group={challengeGroup} evaluation_id={evaluation_id} setExistingHeatmapIds= {setExistingHeatmapIds} />

                                </Collapse>
                                </TableCell>
                                </TableRow>
                        </>
                        
                        
                      ))}
                    </>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleGenerateHeatmap(addressesGroup)}
        >
          Generate Heatmap
        </Button>
      </Collapse>
      <Button onClick={toggleHeatmapSection}>
    {heatmapVisible ? "Hide Heatmaps" : "Show Heatmaps"}
</Button>

<Collapse in={heatmapVisible}>
    <CardContent>
       {/* { heatmaps && heatmaps.map((heatmap, index) => (
          <div key={index}>
            {heatmap}
                <img src={`data:image/png;base64,${heatmap.heatmap_binary_image}`} alt={`Heatmap ${index + 1}`} /> 
            </div>
        ))}  */}
    </CardContent>
</Collapse>

      
    </StyledCard>
  );
}

/*
challenge
*/
