import React, { useEffect, useState } from 'react';
import favicon from '../../assets/favicon.png';

export const DeviceStatus = (props) => (
  <button
    type="button"
    style={{ background: props.state === 'ready' ? '#83f28f' : '#FB9678' }}
    className="text-white py-1 px-2 capitalize rounded-2xl text-md"
  >
    {props.state}
  </button>
);

export const AddTest = (props) => {
  const startTest = () => {
    console.log('Start test');
  };

  return (
    <button
      type="button"
      style={{ background: 'Blue' }}
      className="text-white py-1 px-2 capitalize rounded-2xl text-md"
      onClick={() => startTest()}
    >
      Add
    </button>
  );
};

const Device = (props) => {
  const [stmState, setStmState] = useState({ state: 'busy' });
  useEffect(() => {
    getStmState();
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

  console.log(props);
  return (
    <>
      <tr className="templateRow">
        <td className="photo text-center">
          <img
            src={favicon}
            className="w-10 h-10 rounded-full"
            alt="DeviceImage"
          />
        </td>
        <td className="text-center">{props.id}</td>

        <td className="text-center">{props.name}</td>
        <td className="text-center">{props.ExternalMemory}</td>
        <td className="text-center">
          <DeviceStatus state="ready" statusbg="#83f28f" />
        </td>
        <td className="text-center">
          <AddTest />
        </td>
      </tr>
    </>
  );
};

export default Device;
