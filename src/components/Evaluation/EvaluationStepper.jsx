import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Measurments from './Measurments';
import SelectedTestsEvaluation from './SelectedTestsEvaluation';
import { SelectChallengesForm, Header } from '../index';

const steps = [
  'Measurements',
  'Selected Measurements',
  'Select Challenges & Evaluate'
];

export default function EvaluationStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isStepWarning, setIsStepWarning] = useState(true);
  const [measurements, setMeasurements] = useState(
    JSON.parse(localStorage.getItem('selectedMeasurements')) || []
  );

  console.log('stepper compomenent');
  console.log(measurements);

  const handleNext = () => {
    const newActiveStep = activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleIsStepWarning = (value) => {
    console.log(
      '🚀 ~ file: EvaluationStepper.jsx:56 ~ handleUpdateRobustnessChallenges ~ value:',
      value
    );
    setIsStepWarning(value);
  };

  console.log(isStepWarning);

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <Measurments updateIsStepWarning={handleIsStepWarning} />;
      case 1:
        return <SelectedTestsEvaluation />;
      case 2:
        return (
          <Box sx={{ width: '90%', marginLeft: '5%', marginTop: '20px' }}>
            <SelectChallengesForm
              measurements={measurements}
              isStepWarning={isStepWarning}
            />
          </Box>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <div className="m-2 md:m-10 mt-10 p-2 md:p-10 rounded-3xl">
      <Header category="Dashboard" title="Measurements" />
      <Box sx={{ width: '100%' }}>
        <Stepper nonLinear activeStep={activeStep}>
          {steps.map((label, index) => {
            const labelProps = {};
            if (index !== 0 && isStepWarning) {
              labelProps.optional = (
                <Typography variant="caption" color="#c2410c">
                  No measurement selected yet
                </Typography>
              );
            }

            return (
              <Step key={label}>
                <StepLabel
                  color={index !== 0 && isStepWarning ? '#c2410c' : '#c24100'}
                  {...labelProps}
                >
                  {label}
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <React.Fragment>
          <div sx={{ mt: 2, mb: 1, py: 1 }}>{getStepContent(activeStep)}</div>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button
              onClick={handleNext}
              sx={{ mr: 1 }}
              disabled={activeStep === 2}
            >
              Next
            </Button>
          </Box>
        </React.Fragment>
      </Box>
    </div>
  );
}
