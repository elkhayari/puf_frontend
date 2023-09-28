import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { CheckCircle, Error } from '@mui/icons-material';
import UploadIcon from '@mui/icons-material/Upload';
import FileDownloadOffIcon from '@mui/icons-material/FileDownloadOff';
import {BASE_URL} from '../../config'
const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'testType',
    headerName: 'Test Type',
    width: 150
  },
  {
    field: 'memoryLabel',
    headerName: 'Memory Label',
    width: 110
  },
  {
    field: 'dataSetupTime',
    headerName: 'DST',
    type: 'number',
    width: 100
  },
  {
    field: 'voltage',
    headerName: 'Voltage',
    type: 'number',
    width: 100
  },
  {
    field: 'temperature',
    headerName: 'Temperature',
    type: 'number',
    width: 100
  },

  {
    field: 'iteration',
    headerName: 'Iteration',
    width: 100
  },
  {
    field: 'uploaded',
    headerName: 'Uploaded',
    width: 100,
    type: 'boolean',
    renderCell: (params) => (
      <span style={{ color: params.value === true ? 'green' : 'red' }}>
        {params.value ? (
          <UploadIcon style={{ color: 'green' }} />
        ) : (
          <FileDownloadOffIcon style={{ color: 'red' }} />
        )}
      </span>
    )
  }
  /*{
    field: 'fileName',
    headerName: 'File',
    width: 100
  }*/
];

export default function Measurments({ updateIsStepWarning }) {
  const [rows, setRows] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploadedMeasurmentsLoading, setUploadedMeasurmentsLoading] =
    useState(true);
  const [uploadedMeasurments, setUploadedMeasurments] = useState(null);

  const [selected, setSelected] = useState(null);
  console.log('selected from local', selected);

  useEffect(() => {
    requestTests();
  }, []);

  useEffect(() => {
    requestUploadedMeasurments();
  }, []);

  let requestTests = async () => {
    fetch(`${BASE_URL}/testsApi/getEvaluationsTest/`)
      .then((response) => response.json())
      .then((data) => {
        const completed_tests = Object.values(data).reduce(
          (acc, array) => acc.concat(array),
          []
        );
        console.log(completed_tests);
        let processedData = [];
        if (completed_tests.length > 0) {
          processedData = completed_tests.map(
            ({
              id,
              testType,
              initialValue,
              memoryType,
              memoryLabel,
              memoryBrand,
              memoryModel,
              startAddress,
              stopAddress,
              dataSetupTime,
              created,
              fileName,
              iteration,
              voltage,
              temperature,
              testId
            }) => ({
              id: `INT_${id}_${testId}`,
              testType,
              initialValue,
              memoryType,
              memoryLabel,
              memoryBrand,
              memoryModel,
              startAddress,
              stopAddress,
              dataSetupTime,
              created,
              fileName,
              iteration,
              voltage,
              temperature,
              uploaded: false,
              testId
            })
          );
        }

        setRows(processedData);
        console.log(processedData);
        setLoading(false);
        localStorage.removeItem('selectedMeasurements');
      });
  };

  let requestUploadedMeasurments = async () => {
    try {
      let response = await fetch(
        `${BASE_URL}/uploadMeasurmentsApi/uploadMeas`
      );
      let data = await response.json();
      //console.log('Uploaded Measurments:', data);
      const measurements = Object.values(data).reduce(
        (acc, array) => acc.concat(array),
        []
      );
      console.log('Uploaded Measurments:', measurements);
      const processedData = measurements.map(
        ({
          id,
          testType,
          initialValue,
          memoryType,
          memoryLabel,
          memoryBrand,
          memoryModel,
          startAddress,
          stopAddress,
          dataSetupTime,
          created,
          fileName,
          file,
          iteration,
          voltage,
          temperature
        }) => ({
          id: `EXT_${id}`,
          testType,
          initialValue,
          memoryType: memoryType || 'FRAM',
          memoryLabel: memoryLabel || 'none',
          memoryBrand: memoryBrand || 'none',
          memoryModel: memoryModel || 'none',
          startAddress,
          stopAddress,
          dataSetupTime,
          created,
          fileName: file,
          iteration,
          voltage,
          temperature,
          uploaded: true
        })
      );
      setUploadedMeasurments(processedData);
      setUploadedMeasurmentsLoading(false);
    } catch (error) {
      console.error('Error fetching uploaded data:', error);
    }
  };

  const handleSelectAllClick = (event) => {
    console.log(event.length, ' Selected');
    if (event.length > 0) {
      updateIsStepWarning(false);
    } else {
      updateIsStepWarning(true);
    }

    const selectedRows = rows
      .concat(uploadedMeasurments)
      .filter((row) => event.includes(row.id));
    console.log(
      '🚀 ~ file: Measurments.jsx:137 ~ handleSelectAllClick ~ selectedRows:',
      selectedRows
    );
    setSelected(selectedRows);
    localStorage.removeItem('selectedMeasurements');
    const selectedMeasurements = [];
    selectedMeasurements.push(...selectedRows);
    localStorage.setItem(
      'selectedMeasurements',
      JSON.stringify(selectedMeasurements)
    );
  };
  if (loading || uploadedMeasurmentsLoading) {
    return (
      <div>
        <p>Loading data...</p>
      </div>
    );
  }

  return (
    <Box sx={{ width: '90%', marginLeft: '5%', marginTop: '20px' }}>
      <DataGrid
        rows={rows.concat(uploadedMeasurments)}
        columns={columns}
        onRowSelectionModelChange={handleSelectAllClick}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 15
            }
          }
        }}
        autoHeight={true}
        pageSizeOptions={[15, 30, 45]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
