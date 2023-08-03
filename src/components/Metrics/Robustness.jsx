import React from 'react';

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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';

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

const Robustness = (props) => {
  const { data } = props;
  console.log('🚀 ~ file: Robustness.jsx:59 ~ Robustness ~ data:', data);

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <>
      {data.map((group) =>
        group.memories.map((memoryGroup) =>
          memoryGroup.initialValueKey.map((initialValueGroup) =>
            initialValueGroup.startStopAddresses.map(
              (addressesGroup, addressesGroupIndex) => {
                console.log(addressesGroup);
                return (
                  <Card sx={{ width: '100%' }} key={addressesGroupIndex}>
                    <CardHeader
                      avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="chip">
                          {1}
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
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                      >
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
                        Intra-measurements of Experimental Results
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
                          <Table
                            sx={{ width: '100%' }}
                            aria-label="customized table"
                          >
                            <TableHead>
                              <StyledTableRow>
                                <StyledTableCell align="center" rowSpan={2}>
                                  Chip
                                </StyledTableCell>
                                <StyledTableCell
                                  align="center"
                                  colSpan={addressesGroup.challengeKeys.length}
                                >
                                  Challenges
                                </StyledTableCell>
                                <StyledTableCell align="left" rowSpan={2}>
                                  Min
                                </StyledTableCell>
                                <StyledTableCell align="left" rowSpan={2}>
                                  Avg
                                </StyledTableCell>
                                <StyledTableCell align="left" rowSpan={2}>
                                  Max
                                </StyledTableCell>
                              </StyledTableRow>
                              <StyledTableRow>
                                {addressesGroup.challengeKeys.map((c, i) => (
                                  <StyledTableCell key={i} align="center">
                                    {c.challengeName}
                                  </StyledTableCell>
                                ))}
                              </StyledTableRow>
                            </TableHead>

                            <TableBody>
                              {addressesGroup.chipInstances.map(
                                (chipGroup, index) =>
                                  chipGroup.challenges.map(
                                    (challengeGroup, chalengeIndex) =>
                                      challengeGroup.challenge_measuremenst.map(
                                        (meas, j) => {
                                          return (
                                            <TableRow key={j}>
                                              {chalengeIndex === 0 && (
                                                <TableCell
                                                  align="center"
                                                  rowSpan={
                                                    chipGroup.challenges.length
                                                  }
                                                >
                                                  {chipGroup.chipLabel}
                                                </TableCell>
                                              )}{' '}
                                              {/* DISPLAY CHIP LAEL */}
                                              {challengeGroup.challenge.map(
                                                (c, i) => {
                                                  console.log(c);
                                                  return (
                                                    <StyledTableCell
                                                      align="center"
                                                      key={i}
                                                      rowSpan={
                                                        challengeGroup
                                                          .challenge_measuremenst
                                                          .length
                                                      }
                                                    >
                                                      {c.challengeValue}
                                                    </StyledTableCell>
                                                  );
                                                }
                                              )}
                                              {meas.Robustness ? (
                                                <>
                                                  <StyledTableCell align="left">
                                                    {meas.hammingDistance.min}
                                                  </StyledTableCell>
                                                  <StyledTableCell align="left">
                                                    {meas.hammingDistance.avg}
                                                  </StyledTableCell>
                                                  <StyledTableCell align="left">
                                                    {meas.hammingDistance.max}
                                                  </StyledTableCell>
                                                </>
                                              ) : (
                                                <StyledTableCell
                                                  colSpan={3}
                                                  align="left"
                                                >
                                                  <Alert severity="warning">
                                                    You need at least two
                                                    measurments!
                                                  </Alert>
                                                </StyledTableCell>
                                              )}
                                            </TableRow>
                                          );
                                        }
                                      )
                                  )
                              )}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </CardContent>
                    </Collapse>
                  </Card>
                );
              }
            )
          )
        )
      )}
    </>
  );
};

export default Robustness;
