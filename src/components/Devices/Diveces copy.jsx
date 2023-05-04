import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useState, useEffect } from 'react';
const Devices = (props) => {
  const [stmState, setStmState] = useState([]);
  useEffect(() => {
    getStmState();
    /*const interval=setInterval(()=>{
      getStmState()
      console.log("useEffect state refresh")
      console.log(stmState)
      if(stmState[0] == "free"){
        
        clearInterval(interval)
      }
    
     },10000)*/

    //return()=>clearInterval(interval)
    //refreshList();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  async function getStmState() {
    const res = await fetch(`http://127.0.0.1:8088/getStmState/`);
    const json = await res.json();
    console.log('getStmState');
    console.log(json);
    setStmState(json);
    //console.log(stmState);
    //setTimeout(function(){[].push(2)}, 1000)
  }
  return (
    <TableRow key={props.id}>
      <TableCell align="left">{props.id}</TableCell>
      <TableCell align="left">{props.name}</TableCell>
      <TableCell align="left">{props.externalMemory}</TableCell>
      <TableCell align="left">{stmState.state}</TableCell>
      <TableCell align="left">{props.is_active}</TableCell>
    </TableRow>
  );
};

export default Devices;
