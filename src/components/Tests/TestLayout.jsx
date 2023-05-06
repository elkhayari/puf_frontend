import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { AiTwotoneDelete } from 'react-icons/ai';
import { CiEdit } from 'react-icons/ci';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { TestItem } from '../index';
import Button from '@mui/material/Button';

function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const deleteTest = (id) => {
    console.log('Delete Test', id);
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      }
    };
    fetch(`http://127.0.0.1:8000/api/tests/${id}`, requestOptions).then(
      (data) => {
        console.log(data); // JSON data parsed by `data.json()` call
        navigate('/tests');
      }
    );
  };

  const editTest = (id) => {
    console.log('Edit Test', id);
  };
  const [response, setResponse] = useState(null);

  const startTest = async (id) => {
    console.log('Start Test');
    try {
      const data = row;
      const res = await fetch('http://127.0.0.1:8088/startTest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const json = await res.json();
      setResponse(json);
      console.log(response);
      navigate('/tests/running');
      //navigate('/tests/running');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.title}
        </TableCell>
        <TableCell align="left">{row.testType}</TableCell>
        <TableCell align="left">{row.board}</TableCell>
        <TableCell align="left">{row.memory}</TableCell>
        <TableCell
          align="left"
          className="inline-grid grid-cols-2 gap-4 px-1 py-4"
        >
          <button
            type="button"
            onClick={(e) => {
              //e.stopPropagation()
              editTest(row.id);
            }}
            className="bg-blue-200/30 p-1 rounded-full w-8 h-8 flex items-center justify-center text-blue-600 opacity-75 hover:opacity-100 outline-none"
          >
            <CiEdit />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              deleteTest(row.id);
            }}
            className="bg-red-200/30 p-1 rounded-full w-8 h-8 flex items-center justify-center text-red-600 opacity-75 hover:opacity-100 outline-none"
          >
            <AiTwotoneDelete />
          </button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                More data
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Start Address</TableCell>
                    <TableCell>Stop Address</TableCell>
                    <TableCell>Voltage</TableCell>
                    <TableCell>Temperature</TableCell>
                    <TableCell>Data Setup Time</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.startAddress}
                    </TableCell>
                    <TableCell>{row.stopAddress}</TableCell>
                    <TableCell>{row.voltage}</TableCell>
                    <TableCell>{row.temperature}</TableCell>
                    <TableCell>{row.dataSetupTime}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <Button
                className=" pt-10"
                size="medium"
                onClick={(e) => {
                  e.stopPropagation();
                  startTest(row.id);
                }}
              >
                Start
              </Button>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
const TestLayout = ({ tests }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Title</TableCell>
            <TableCell align="left">Test Type</TableCell>
            <TableCell align="left">Memory</TableCell>
            <TableCell align="left">Board</TableCell>
            <TableCell align="left">Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {tests.map((test) => (
            <Row key={test.id} row={test} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TestLayout;
