import React, { useState, useEffect } from 'react';

import { styled } from '@mui/material/styles';
import { Box, List, ListItem, ListItemText, IconButton }  from '@mui/material';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';


const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper
}));

const SelectedTestsEvaluation = (props) => {

  const [secondary, setSecondary] = useState(false);

  const [measurements, setMeasurements] = useState(JSON.parse(localStorage.getItem('selectedMeasurements')) || []);

  useEffect(() => {
    localStorage.setItem('selectedMeasurements', JSON.stringify(measurements));
  }, [measurements]);

  const deleteObject = (index) => {
    setMeasurements(measurements.filter((test, i) => i !== index));
  };

  
  return (
    <Grid item xs={12} md={6}>
      <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
        List of selected measurments
      </Typography>
      <Demo>
        <List>
          {measurements &&
            measurements.map((test, index) => {
              console.log('test:', test)
              return (
                <ListItem disablePadding
                  key={test.id}
                  secondaryAction={
                    <IconButton color="error" edge="end" aria-label="delete">
                      <DeleteIcon onClick={ () => deleteObject(index)} />
                    </IconButton>
                  }
                >
                  
                  <ListItemText
                    primary={test.id}
                    secondary={secondary ? 'Secondary text' : null}
                  />
                  <ListItemText
                    primary={test.testTitle}
                    secondary={secondary ? 'Secondary text' : null}
                  />
                  <ListItemText
                    primary={test.dataSetupTime}
                    secondary={secondary ? 'Secondary text' : null}
                  />
                </ListItem>
              );
            })}
        </List>
      </Demo>
    </Grid>
  );
};

export default SelectedTestsEvaluation;
