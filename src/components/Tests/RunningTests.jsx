import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Header } from '../index';
import './HourglassIcon.css';
import { BASE_URL } from '../../config';

const RunningTests = () => {
  const [runningTests, setRunningTests] = useState([]);
  const [testProgress, setTestProgress] = useState(0);

  useEffect(() => {
    requestTests();
  }, []);

  useEffect(() => {
    requestProgress();
  }, []);

  // TODO: Filter the running test in the backend

  let requestTests = async () => {
    try {
      const filter = 'running'; // Your filter parameter value
      let response = await fetch(
        `${BASE_URL}/testsApi/measurmentsStatus/?filter=${filter}`
      );
      let data = await response.json();
      console.log('Running Tests DATA:', data);
      const running_tests = Object.values(data).reduce(
        (acc, array) => acc.concat(array),
        []
      );

      setRunningTests(running_tests);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  let requestProgress = async () => {
    let response = await fetch(`http://127.0.0.1:8088/testProgress/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: 32 })
    });
    let data = await response.json();
    console.log('DATA:', data.progress);
    setTestProgress(data);
    console.log(data.progress);
  };

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

  console.log(
    '🚀 ~ file: RunningTests.jsx:88 ~ RunningTests ~ runningTests:',
    runningTests
  );

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 rounded-3xl">
      <Header category="Dashboard" title="Running Tests" />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell align="left">Type</StyledTableCell>
              <StyledTableCell align="left">Memory</StyledTableCell>
              <StyledTableCell align="left">Data Setup Time</StyledTableCell>
              <StyledTableCell align="left">Iteration</StyledTableCell>
              <StyledTableCell align="left">Status</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {runningTests &&
              runningTests.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    {row.id}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.testType}</StyledTableCell>
                  <StyledTableCell align="left">
                    <span className="primary">{row.memoryLabel}</span>
                    <br />
                    <span className="secondary">{row.memoryBrand}</span>
                    {' / '}
                    <span className="secondary">{row.memoryModel}</span>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.dataSetupTime}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.iteration}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <div className="green-dot"></div>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default RunningTests;
