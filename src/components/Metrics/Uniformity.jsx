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
      <Chip label="Uniformity" color="info" />
      {data.map((chip) => {
        return (
          <Card sx={{ maxWidth: 800 }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  {chip.chip[0]}
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title="Write Latency"
              subheader="March 26, 2023"
            />

            <CardContent>
              <Typography variant="body2" color="text.secondary">
                MEmory: {chip.chip}
              </Typography>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Initail Value: 0x55
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Challenge: Data Setup Time
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
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
                  <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell align="center">
                          Data Setup Time
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          Iteration
                        </StyledTableCell>
                        <StyledTableCell align="left">Zeros</StyledTableCell>
                        <StyledTableCell align="left">Ones</StyledTableCell>
                        <StyledTableCell align="left">
                          Hamming Weight
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {chip.chipMeasurements.map((row) => (
                        <>
                          <TableRow>
                            <StyledTableCell
                              rowSpan={row.challengeMeasurements.length + 1}
                              align="center"
                            >
                              {row.challengeValue}
                            </StyledTableCell>
                          </TableRow>
                          {row.challengeMeasurements.map((meas) => (
                            <TableRow>
                              <StyledTableCell align="left">
                                {meas.iteration}
                              </StyledTableCell>
                              <StyledTableCell align="left">
                                {meas.zeors}
                              </StyledTableCell>
                              <StyledTableCell align="left">
                                {meas.ones}
                              </StyledTableCell>
                              <StyledTableCell align="left">
                                {meas.hammingWeight}
                              </StyledTableCell>
                            </TableRow>
                          ))}
                        </>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Collapse>
          </Card>
        );
      })}
    </>
  );
}
