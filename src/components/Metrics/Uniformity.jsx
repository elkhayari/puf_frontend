import * as React from 'react';
import UniformityTable from './UniformityTable';

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
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';

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

export default function Uniformity(props) {
  const { data } = props;
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      {data.map((group) =>
        group.memories.map((memoryGroup, memoryIndex) =>
          memoryGroup.initialValueKey.map(
            (initialValueGroup, initialValueIndex) =>
              initialValueGroup.startStopAddresses.map(
                (addressesGroup, addressesGroupIndex) => {
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
                          Fractional Hamming Weight of Experimental Results
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
                                  <StyledTableCell
                                    align="center"
                                    colSpan={
                                      addressesGroup.challengeKeys.length
                                    }
                                  >
                                    Challenges
                                  </StyledTableCell>
                                  <StyledTableCell align="center" rowSpan={2}>
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
                                  {addressesGroup.challengeKeys.map(
                                    (challenge, i) => (
                                      <StyledTableCell key={i} align="center">
                                        {challenge}
                                      </StyledTableCell>
                                    )
                                  )}
                                </StyledTableRow>
                              </TableHead>

                              <TableBody>
                                {addressesGroup.challenges.map(
                                  (challengeGroup) => {
                                    console.log(challengeGroup);
                                    return (
                                      <>
                                        {challengeGroup.challenge_measuremenst.map(
                                          (meas, i) => (
                                            <TableRow key={i}>
                                              {i === 0 &&
                                                challengeGroup.challenge.map(
                                                  (c, j) => (
                                                    <TableCell
                                                      align="center"
                                                      rowSpan={
                                                        challengeGroup
                                                          .challenge_measuremenst
                                                          .length
                                                      }
                                                    >
                                                      {c.challengeValue}
                                                    </TableCell>
                                                  )
                                                )}{' '}
                                              {/* DISPLAY chalenge values */}
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
                                                {`${ccyFormat(
                                                  meas.hammingWeight
                                                )}`}
                                              </StyledTableCell>
                                            </TableRow>
                                          )
                                        )}
                                      </>
                                    );
                                  }
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
}
