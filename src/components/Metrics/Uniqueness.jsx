import { useEffect, useMemo, useState } from 'react';

import { Avatar, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
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

export default function Uniqueness(props) {
  const { data } = props;
  console.log(data)
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  
  return (
    <Box
      sx={{
        height: 400,
        width: '100%'
      }}
    >
      <Typography
        variant="h4"
        component="h4"
        sx={{ textAlign: 'center', mt: 3, mb: 3 }}
      >
        Manage Inter-Hamming distance between chips
      </Typography>
      {data.map((measurments) => {
        console.log(measurments)
        return (
          <Card sx={{ maxWidth: 800 }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  {measurments.chips[0]} {measurments.chips[1]}
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
                Chips:  {measurments.chips[0]} {measurments.chips[1]} 
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
                        <StyledTableCell align="left">Chip 1</StyledTableCell>
                        <StyledTableCell align="left">Chip 2</StyledTableCell>
                        <StyledTableCell align="left">Iteration Chip 1</StyledTableCell>
                        <StyledTableCell align="left">Iteration Chip 2</StyledTableCell>
                        <StyledTableCell align="left">Inter Hamming-Distance</StyledTableCell>

                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {measurments.uniquenessMeasurments.map((row) => (
                        <>
                        <TableRow>
                          <StyledTableCell
                            rowSpan={row.hammingDistances.length + 1}
                            align="center"
                          >
                            {row.challengeValue}
                          </StyledTableCell>
                        </TableRow>
                        {row.hammingDistances.map((row_2) => (
                            <TableRow>
                              <StyledTableCell align="left">
                                {row_2.chip_1}
                              </StyledTableCell>
                              <StyledTableCell align="left">
                                {row_2.chip_2}
                              </StyledTableCell>
                              <StyledTableCell align="left">
                                {row_2.chip_1_iteration}
                              </StyledTableCell>
                              <StyledTableCell align="left">
                                {row_2.chip_2_iteration}
                            </StyledTableCell>
                            <StyledTableCell align="left">
                                {row_2.inter_hd}
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
    </Box>
  );
}
