import React, { useState, useEffect } from 'react';
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Resize,
  Sort,
  ContextMenu,
  Filter,
  Page,
  ExcelExport,
  PdfExport,
  Inject
} from '@syncfusion/ej2-react-grids';
import ClipLoader from 'react-spinners/ClipLoader';

import { Header } from '../../components';

import { Device } from '../../components';

import { contextMenuItems } from '../../data/dummy';

import { useDevices } from '../../components';

const override = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'blue'
};

export const gridDeviceImage = (props) => (
  <div>
    <img
      className="rounded-xl h-20 md:ml-3"
      src={props.ProductImage}
      alt="Err"
    />
  </div>
);

export const deviceStatus = (props) => (
  <button
    type="button"
    style={{ background: props.StatusBg }}
    className="text-white py-1 px-2 capitalize rounded-2xl text-md"
  >
    {props.Status}
  </button>
);

export const DevicesPage = () => {
  const [devices, setDevices] = useState([]);
  const [stmState, setStmState] = useState(null);
  const [page, setPage] = useState(1);
  const { data, isLoading } = useDevices();

  console.log(data);
  console.log(isLoading);
  // activeDevice to start a test

  const runTest = (props) => (
    <button
      type="button"
      style={{ background: 'Blue' }}
      className="text-white py-1 px-2 capitalize rounded-2xl text-md"
      onClick={() => startTest()}
    >
      Add
    </button>
  );
  const startTest = () => {
    console.log('Start test');

    //getStmState();
  };

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
  let listDevices = [
    {
      ID: devices.length !== 0 ? devices[0].id : 'Loading',
      Name: devices.length !== 0 ? devices[0].name : 'Loading',
      Memory: devices.length !== 0 ? devices[0].ExternalMemory : 'loading',
      Status: stmState !== null ? stmState.state : 'loading',
      StatusBg:
        stmState !== null
          ? stmState.state === 'open'
            ? '#83f28f'
            : '#FB9678'
          : '#FB9678'
    }
  ];

  let dataa = [
    {
      headerText: 'Image',
      template: gridDeviceImage,
      textAlign: 'Center',
      width: '120'
    },
    {
      field: 'ID',
      headerText: 'Device ID',
      width: '90',
      textAlign: 'Center'
    },
    {
      field: 'Name',
      headerText: 'Name',
      width: '110',
      editType: 'dropdownedit',
      textAlign: 'Center'
    },
    {
      field: 'Memory',
      headerText: 'External Memory',
      width: '120',
      textAlign: 'Center'
    },
    {
      headerText: 'Status',
      template: deviceStatus,
      field: 'OrderItems',
      textAlign: 'Center',
      width: '120'
    },
    {
      headerText: 'Start a test',
      template: runTest,
      field: 'Run',
      textAlign: 'Center',
      width: '120'
    }
  ];

  const editing = { allowDeleting: true, allowEditing: true };

  if (isLoading) {
    return (
      <div className="sweet-loading">
        <ClipLoader
          color="#ffff00"
          loading={true}
          size={150}
          cssOverride={override}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Daschboard" title="Devices" />
      <GridComponent
        id="gridcomp"
        dataSource={data}
        rowTemplate={Device}
        allowPaging
        allowSorting
        allowExcelExport
        allowPdfExport
        contextMenuItems={contextMenuItems}
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <ColumnDirective headerText="Image" width="90" textAlign="Center" />
          <ColumnDirective
            headerText="Device Id"
            width="90"
            textAlign="Center"
            field="ID"
          />
          <ColumnDirective
            headerText="Name"
            width="120"
            textAlign="Center"
            field="Name"
          />
          <ColumnDirective
            headerText="External Memory"
            width="120"
            textAlign="Left"
            field="Memory"
          />
          <ColumnDirective
            headerText="Status"
            width="120"
            textAlign="Center"
            field="Status"
          />
          <ColumnDirective
            headerText="Test"
            width="120"
            textAlign="Left"
            field="Test"
          />
        </ColumnsDirective>
        <Inject
          services={[
            Resize,
            Sort,
            ContextMenu,
            Filter,
            Page,
            ExcelExport,
            PdfExport
          ]}
        />
      </GridComponent>
    </div>
  );
};

export default DevicesPage;
