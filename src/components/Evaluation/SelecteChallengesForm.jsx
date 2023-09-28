import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL} from '../../config'
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
  Button,
  TextField
} from '@mui/material';
import { makeStyles } from '@material-ui/core';

const challengesData = [
  { label: 'Data Setup Time', value: 'dataSetupTime' },
  { label: 'Voltage', value: 'voltage' },
  { label: 'Temperature', value: 'temperature' }
];

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '5%',
    marginLeft: '5%',
    width: '50%'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  button: {
    marginTop: theme.spacing(2),
    backgroundColor: '#0277BD',
    '&:hover': {
      backgroundColor: '#42A5F5'
    }
  }
}));

const SelectChallengesForm = ({ isStepWarning }) => {
  const classes = useStyles();
  const [evaluationTitle, setEvaluationTitle] = useState('');

  const [uniformityChallenges, setUniformityChallenges] = useState([
    'dataSetupTime'
  ]);
  const [robustnessChallenges, setRobustnessChallenges] = useState([
    'dataSetupTime'
  ]);
  const [uniquenessChallenges, setUniquenessChallenges] = useState([
    'dataSetupTime'
  ]);
  const selectedMeasurments =
    JSON.parse(localStorage.getItem('selectedMeasurements')) || [];
  const [isValidForm, setIsFormValid] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    validateForm();
  }, [
    evaluationTitle,
    uniformityChallenges,
    robustnessChallenges,
    uniformityChallenges
  ]);

  const handleEvaluationTitleChange = (event) => {
    console.log(event.target.value);
    setEvaluationTitle(event.target.value);
  };

  const handleUniformityChange = (event) => {
    setUniformityChallenges(event.target.value);
  };

  const handleRobustnessChange = (event) => {
    setRobustnessChallenges(event.target.value);
  };

  const handleUniquenessChange = (event) => {
    setUniquenessChallenges(event.target.value);
  };

  const validateForm = () => {
    if (
      evaluationTitle.trim() &&
      uniformityChallenges.length > 0 &&
      robustnessChallenges.length > 0 &&
      uniquenessChallenges.length > 0
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  const startEvaluation = async () => {
    const requestData = {
      title: evaluationTitle,
      measurments: selectedMeasurments,
      uniformityChallenges: uniformityChallenges,
      uniquenessChallenges: uniformityChallenges,
      robustnessChallenges: robustnessChallenges
    };
    const response = await fetch(
      `${BASE_URL}/brokerApi/trigger-evaluation/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      }
    );
    const data = await response.json();
    const taskId = data.task_id;
    console.log(
      '🚀 ~ file: EvaluationStepper.jsx:106 ~ startEvaluation ~ taskId:',
      taskId
    );
    // Poll the status endpoint to get task progress and status
    navigate('/results');
  };

  return (
    <>
      <form className={classes.form}>
        <TextField
          label="Evaluation Title"
          value={evaluationTitle}
          variant="standard"
          onChange={handleEvaluationTitleChange}
          focused
          required
        />

        <FormControl
          className={classes.formControl}
          required
          variant="standard"
        >
          <InputLabel id="select-uniformity-challenges">
            Uniformity Challenges
          </InputLabel>
          <Select
            labelId="select-uniformity-challenges"
            multiple
            value={uniformityChallenges}
            onChange={handleUniformityChange}
            renderValue={(selected) => selected.join(', ')}
          >
            {challengesData.map((challenge) => (
              <MenuItem key={challenge.value} value={challenge.value}>
                {challenge.label}
              </MenuItem>
            ))}
          </Select>
          {uniformityChallenges.length === 0 && (
            <FormHelperText error>
              Select at least one uniformity challenge
            </FormHelperText>
          )}
        </FormControl>

        <br />

        <FormControl
          required
          className={classes.formControl}
          variant="standard"
        >
          <InputLabel>Robustness Challenges</InputLabel>
          <Select
            multiple
            value={robustnessChallenges}
            onChange={handleRobustnessChange}
            renderValue={(selected) => selected.join(', ')}
          >
            {challengesData.map((challenge) => (
              <MenuItem key={challenge.value} value={challenge.value}>
                {challenge.label}
              </MenuItem>
            ))}
          </Select>
          {robustnessChallenges.length === 0 && (
            <FormHelperText error>
              Select at least one robustness challenge
            </FormHelperText>
          )}
        </FormControl>
        <br />

        <FormControl
          required
          className={classes.formControl}
          variant="standard"
        >
          <InputLabel>Uniqueness Challenges</InputLabel>
          <Select
            multiple
            value={uniquenessChallenges}
            onChange={handleUniquenessChange}
            renderValue={(selected) => selected.join(', ')}
          >
            {challengesData.map((challenge) => (
              <MenuItem key={challenge.value} value={challenge.value}>
                {challenge.label}
              </MenuItem>
            ))}
          </Select>
          {uniquenessChallenges.length === 0 && (
            <FormHelperText error>
              Select at least one uniqueness challenge
            </FormHelperText>
          )}
        </FormControl>

        <Button
          className={classes.button}
          variant="contained"
          disabled={!isValidForm || isStepWarning}
          onClick={startEvaluation}
        >
          Start The Evaluation
        </Button>
      </form>
    </>
  );
};

export default SelectChallengesForm;
