import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import Uniformity from './Uniformity';
import Robustness from './Robustness';
import Uniqueness from './Uniqueness';

const theme = createTheme({
  typography: {
    poster: {
      fontSize: '2rem',
      color: 'blue'
    },
    // Disable h3 variant
    h3: undefined
  }
});

export default function Metrics() {
  let location = useLocation();
  //const { selected } = location.state;

  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState([]);
  const selected = JSON.parse(localStorage.getItem('selectedMeasurements')) || [];


  useEffect(() => {
    requestMetrics();
  }, []);

  let requestMetrics = async () => {
    setLoading(true);
    fetch('http://127.0.0.1:8000/api/getMetrics/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(selected)
    })
      .then((response) => response.json())
      .then((data) => {
        setMetrics(data);
        console.log('metrics', data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  if (loading) {
    return <p>Loading data...</p>;
  }

  return (
    <div>
      <Typography variant="poster" theme={theme}>
        Metrics
      </Typography>
      <Divider />
      <br />
      {metrics.map((item) => {
        return (
          <>
            <Uniformity key="uniformity" data={item['uniformity']} />
            <Robustness key="Robustness" data={item['intra_hd_list']} />
            <Uniqueness key="Uniqueness" data={item['inter_hd_list']} />
          </>
        );
      })}
    </div>
  );
}
