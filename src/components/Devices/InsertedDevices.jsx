import React, { useEffect, useState } from 'react';

import { useStateContext } from '../../contexts/ContextProvider';
import { toast } from 'react-toastify';
import {
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Button
} from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import { useNavigate } from 'react-router-dom';

import { Header } from '../index';

const columns = [
  { id: 'port_name', label: 'Port Name', minWidth: 100 },
  { id: 'action', label: 'Action', minWidth: 170 }
];

const InsertedDevices = () => {
  //const [devices, setDevices] = useState([]);
  const { setDevices, devices, setInsertedCount } = useStateContext();
  const [isConnecting, setIsConnecting] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const navigate = useNavigate();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    console.log('useEffect Inserted');
    console.log(devices);
    fetch('http://localhost:8000/deviceApi/insertDevice/') // Replace with your Django API endpoint URL
      .then((response) => response.json())
      .then((data) => {
        setDevices(data);
        //setInsertedCount(data.length)
      })
      .catch((error) => console.log(error));
  }, []); // Empty dependency array ensures the effect runs only once

  const handleConnect = (port) => {
    const encodedPort = encodeURIComponent(port);
    setIsConnecting(true);

    // Call the connect API in the backend
    // Replace 'connectApiEndpoint' with the actual endpoint URL
    fetch(
      `http://127.0.0.1:8000/deviceApi/connectDeviceByPort?port=${encodedPort}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.status === 'connected') {
          // Redirect to connected devices page
          toast.success(
            <div>
              <div>Success</div>
              <div>{data.message}</div>
            </div>
          );
          setInsertedCount((prevCount) => prevCount - 1); // Update the insertedCount in the context by subtracting one from the previous value

          console.log('connected');

          navigate('/connectedDevices');
        } else if (data.type === 'warning') {
          // Retry the connection
          toast.warn(data.message);
          setIsConnecting(false);
          console.log('Connection failed. Retry...');
        } else {
          toast.error(data.message);
          setIsConnecting(false);
          console.log('Connection failed. Retry...');
        }
      })
      .catch((error) => {
        setIsConnecting(false);
        console.error('Error connecting to the backend:', error);
      });
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
              {devices.length > 0 ? (
                devices
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((device) => (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={device.device_port}
                    >
                      <TableCell align="left">{device.device_port}</TableCell>
                      <TableCell align="left">
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          disabled={isConnecting}
                          onClick={() => handleConnect(device.device_port)}
                        >
                          {isConnecting ? (
                            <div className="flex items-center justify-center">
                              <CircularProgress
                                className="text-white"
                                size={24}
                              />
                              <span className="ml-2">Connecting...</span>
                            </div>
                          ) : (
                            'Connect'
                          )}
                        </button>
                      </TableCell>
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
          count={devices.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default InsertedDevices;

/* {<div className="m-2 md:m-10 mt-10 p-2 md:p-10 rounded-3xl">
<Header category="Dashboard" title="Inserted Devices" />
<List>
  {devices.map((device) => (
    <ListItem key={device.device_port}>
      <ListItemText primary={device.device_port} />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        disabled={isConnecting}
        onClick={() => handleConnect(device.device_port)}
      >
        {isConnecting ? (
          <div className="flex items-center justify-center">
            <CircularProgress className="text-white" size={24} />
            <span className="ml-2">Connecting...</span>
          </div>
        ) : (
          'Connect'
        )}
      </button>
    </ListItem>
  ))}
</List>
</div>} */
