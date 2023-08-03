import React, { useEffect, useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography
} from '@material-ui/core';
import {
  FiberManualRecord as FiberManualRecordIcon,
  FlashOn as FlashOnIcon
} from '@material-ui/icons';
import { FiberManualRecord } from '@material-ui/icons';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useStateContext } from '../../contexts/ContextProvider';
import { Header } from '../index';

const columns = [
  { id: 'device_label', label: 'Label', minWidth: 100 },
  { id: 'serial_number', label: 'Serial', minWidth: 170 },
  {
    id: 'owner',
    label: 'Owner',
    minWidth: 100
  },
  {
    id: 'is_busy',
    label: 'Status',
    minWidth: 90
  }
];

const ConnectedDevices = () => {
  const { connectedDevices, setConnectedDevices } = useStateContext();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  useEffect(() => {
    console.log('useEffect connected');
    fetch('http://localhost:8000/deviceApi/connectedDevice/') // Replace with your Django API endpoint URL
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        setConnectedDevices(data);
      })
      .catch((error) => console.log(error));
  }, []); // Empty dependency array ensures the effect runs only once

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getStatusIcon = (isBusy) => {
    return isBusy ? (
      <FiberManualRecordIcon style={{ color: 'orange' }} />
    ) : (
      <FiberManualRecordIcon style={{ color: 'green' }} />
    );
  };

  return (
    <div className="m-2 md:m-10 mt-10 p-2 md:p-10 rounded-3xl">
      <Header category="Dashboard" title="Connected Devices" />
      <Paper
        sx={{ width: '100%', overflow: 'hidden' }}
        className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl"
      >
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {connectedDevices.length > 0 ? (
                connectedDevices
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.id === 'is_busy'
                              ? getStatusIcon(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    No devices connected
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={connectedDevices.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default ConnectedDevices;
