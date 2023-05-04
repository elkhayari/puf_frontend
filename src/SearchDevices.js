import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Device from './divece';

const SearchDevices = () => {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    requestDevices();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  async function requestDevices() {
    const res = await fetch(`http://127.0.0.1:8088/getDevice/`);
    const json = await res.json();
    console.log('setDevices');
    console.log(json);
    setDevices([json]);
    //setTimeout(function(){devices.push(2)}, 1000)
  }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell align="left">ID</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">memory</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left">Event</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {devices.map((device) => (
              <Device
                key={device.id}
                id={device.id}
                name={device.name}
                externalMemory={device.ExternalMemory}
                is_active={device.is_active}
                event="test_1"
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default SearchDevices;
