import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../config';

const TestDetail = () => {
  const navigate = useNavigate();
  const { testId } = useParams();
  console.log(testId);
  const [test, setTest] = useState();
  const [response, setResponse] = useState(null);

  const requestTestById = async (id) => {
    // `http://127.0.0.1:8000/api/tests/?board=${board}&memory=${memory}`
    let response = await fetch(`${BASE_URL}/api/tests/${testId}`);
    let data = await response.json();
    console.log('DATA:', data);
    setTest(data);
  };

  useEffect(() => {
    requestTestById();
  }, [testId]);

  const startTest = async (id) => {
    console.log('Start Test');
    try {
      const data = test;
      const res = await fetch('http://127.0.0.1:8088/startTest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const json = await res.json();
      setResponse(json);
      console.log(response);
      navigate('/tests/running');
    } catch (err) {
      console.log(err);
    }
  };
  if (test) {
    return (
      <Box sx={{ minWidth: 275 }}>
        <Card>
          <CardContent>
            <Typography variant="h5" color="text.secondary">
              {test.title ? test.title : '...'}
            </Typography>
            <Typography variant="h5" component="div">
              {test.type ? test.type : '...'} - {test.board}
            </Typography>
            <br />
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              * Initial value: {test.initialValue}
            </Typography>
            <Typography variant="body2">
              * Start and stop addresses: {test.startAddress} -{' '}
              {test.stopAddress}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              * Voltage: {test.voltage}
            </Typography>
            <Typography variant="body2">
              * Temperature: {test.temperature}
              <br />
            </Typography>
            <Typography variant="body2">
              * Data setup time: {test.dataSetupTime}
              <br />
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                startTest(test.id);
              }}
            >
              Start
            </Button>
          </CardActions>
        </Card>
      </Box>
    );
  } else {
    return null;
  }
};

export default TestDetail;
