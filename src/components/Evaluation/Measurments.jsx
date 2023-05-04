import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'testType',
    headerName: 'Test Type',
    width: 200,
    editable: true,
  },
  {
    field: 'testTitle',
    headerName: 'Title',
    width: 300,
    editable: true,
  },
  {
    field: 'memory',
    headerName: 'Memory',
    width: 100,
    editable: true,
  },
  {
    field: 'dataSetupTime',
    headerName: 'Data Setup Time',
    type: 'number',
    width: 120,
    editable: true,
  },

  {
    field: 'iteration',
    headerName: 'Iteration',
    width: 100,
  },
  
];

export default function Measurments() {
  const [rows, setRows] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selected, setSelected] = useState(null);
  console.log('selected from local', selected)

  useEffect(() => {
    requestTests();
    
  }, []);

  let requestTests = async () => {
    fetch('http://127.0.0.1:8000/api/getEvaluationsTest/')
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        const processedData = data.map(({ id, testType, testTitle, memory, dataSetupTime, created, fileName, iteration  }) => ({ id, testType, testTitle, memory, dataSetupTime, created, fileName, iteration  }));
        setRows(processedData);
          console.log(processedData);
        setLoading(false);
        localStorage.removeItem('selectedMeasurements');
      });
  };

  const handleSelectAllClick = (event) => {
    console.log(event.length , ' Selected');
    const selectedRows = rows.filter((row) => event.includes(row.id));
    setSelected(selectedRows);
    localStorage.removeItem('selectedMeasurements');
    const selectedMeasurements = [];
    selectedMeasurements.push(...selectedRows);
    localStorage.setItem('selectedMeasurements', JSON.stringify(selectedMeasurements));
    
  };
  if (loading) {
    return <p>Loading data...</p>;
  }
  return (
      <Box sx={{ width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        onRowSelectionModelChange = {handleSelectAllClick}

        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        autoHeight ={true}
        pageSizeOptions={[10,20,30]}
        checkboxSelection
        disableRowSelectionOnClick
      />
      
       
    </Box>
  );
}