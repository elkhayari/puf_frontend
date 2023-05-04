import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Spinner } from '../index';

import { boards, memories, testTypes } from '../../data/dummy';

import TextField from '@mui/material/TextField';

const AddTest = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState(false);

  const navigate = useNavigate();

  const [values, setValues] = useState({
    title: '',
    initialValue: '0x55',
    testType: '',
    startAddress: '',
    stopAddress: '',
    board: '',
    memory: 'FRAM',
    temperature: 23,
    temperatureChecked: false,
    voltageChecked: false,
    voltage: 12,
    dataSetupTime: '15'
  });

  const [errors, setErrors] = React.useState({
    title: '',
    initialValue: '',
    testType: '',
    startAddress: '',
    stopAddress: '',
    board: '',
    memory: '',
    temperature: '',
    voltage: '',
    dataSetupTime: ''
  });

  const validate = () => {
    let newErrors = {};
    newErrors.title = values.title ? '' : 'This field is required.';
    newErrors.initialValue = values.initialValue
      ? ''
      : 'This field is required.';
    newErrors.testType = values.testType ? '' : 'This field is required.';
    newErrors.startAddress = values.startAddress
      ? ''
      : 'This field is required.';
    newErrors.stopAddress = values.stopAddress ? '' : 'This field is required.';
    newErrors.board = values.board ? '' : 'This field is required.';
    newErrors.memory = values.memory ? '' : 'This field is required.';
    newErrors.temperature = values.temperature ? '' : 'This field is required.';
    newErrors.voltage = values.voltage ? '' : 'This field is required.';
    newErrors.dataSetupTime = values.dataSetupTime
      ? ''
      : 'This field is required.';

    setErrors(newErrors);
    //return Object.keys(newErrors).length === 0;

    return Object.values(newErrors).every((x) => x === '');
  };

  const handleChange = (name) => (event) => {
    if (name === 'dataSetupTime') {
      let dst = event.target.value;
      const str5 = '1-'; // true

      const regex = /^\d+[,-]\d+([,-]\d*)*$/;
      console.log(dst);
      console.log(regex.test(dst));

      setValues({ ...values, [name]: dst });
    } else {
      console.log(event.target.value);
      setValues({ ...values, [name]: event.target.value });
    }
  };

  const handleChange1 = (name) => (event) => {
    console.log(event.target.checked);

    setValues({ ...values, [name]: event.target.checked });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('save Test');

    if (validate()) {
      // code to submit form data
      console.log('Send Post Request:');

      const data = values;
      console.log(data);
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)
      };
      fetch('http://127.0.0.1:8000/api/tests/', requestOptions).then((data) => {
        console.log(data); // JSON data parsed by `data.json()` call
        navigate('/tests');
      });
    } else {
      console.log('Input missing ');
      setFields(true);
    }
  };

  function hasLatencyWord(str) {
    return str.includes('latency');
  }
  return (
    <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5">
      <div className="flex flex-1 flex-col gap-3 lg:pl-3 mt-2 w-full">
        <form onSubmit={handleSubmit}>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="floating_Title"
              id="floating_Title"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              onChange={handleChange('title')}
              required
            />
            <label
              htmlFor="floating_Title"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Title
            </label>
          </div>

          <div class="grid md:grid-cols-2 md:gap-6">
            <div class="relative z-0 w-full mb-6 group">
              <label for="underline_select" class="sr-only">
                Underline select
              </label>
              <select
                id="underline_select"
                class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                value={values.board}
                onChange={handleChange('board')}
              >
                <option selected>Choose a board</option>
                {boards.map((board) => (
                  <option key={board} value={board}>
                    {board}
                  </option>
                ))}
              </select>
            </div>
            <div class="relative z-0 w-full mb-6 group">
              <label for="underline_select" class="sr-only">
                Underline select
              </label>
              <select
                id="underline_select"
                class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                value={values.memory}
                onChange={handleChange('memory')}
              >
                <option selected>Choose an external memory</option>
                {memories.map((memory) => (
                  <option key={memory} value={memory}>
                    {memory}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div class="grid md:grid-cols-2 md:gap-6">
            <div class="relative z-0 w-full mb-6 group">
              <label for="underline_select" class="sr-only">
                Underline select
              </label>
              <select
                id="underline_select"
                class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                value={values.testType}
                onChange={handleChange('testType')}
              >
                <option selected>Select a test type</option>
                {testTypes.map((testType) => (
                  <option key={testType.name} value={testType.name}>
                    {testType.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div class="grid grid-cols-4 gap-4 my-8">
            <div class="flex">
              <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                Initial Value
              </span>
              <input
                type="text"
                id="website-admin"
                class="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={values.initialValue}
                placeholder={values.initialValue}
                onChange={handleChange('initialValue')}
              />
            </div>

            <div className="flex">
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                Start Address
              </span>
              <input
                type="text"
                id="website-admin"
                class="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={values.startAddress}
                onChange={handleChange('startAddress')}
              />
            </div>

            <div className="flex">
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                Stop Address
              </span>
              <input
                type="text"
                id="website-admin"
                className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={values.stopAddress}
                onChange={handleChange('stopAddress')}
              />
            </div>
          </div>

          <div class="grid md:grid-cols-2 md:gap-6 mt-8">
            <div class="flex items-center">
              <input
                id="bordered-checkbox-1"
                type="checkbox"
                value=""
                name="bordered-checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100"
                checked={values.temperatureChecked}
                onChange={handleChange1('temperatureChecked')}
              />
              <label
                for="bordered-checkbox-1"
                class="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                I have to instert a temperature value.
              </label>
            </div>
          </div>
          {values.temperatureChecked && (
            <div className="grid md:grid-cols-5 md:gap-6 my-4">
              <TextField
                id="outlined-helperText_2"
                label="Add temperature"
                helperText="Please, add a custom temperature"
                value={values.temperature}
                placeholder="Please, add a custom temperature"
                onChange={handleChange('temperature')}
              />
            </div>
          )}
          <div class="grid md:grid-cols-2 md:gap-6 mt-8">
            <div class="flex items-center">
              <input
                id="bordered-checkbox-2"
                type="checkbox"
                value=""
                name="bordered-checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                checked={values.voltageChecked}
                onChange={handleChange1('voltageChecked')}
              />
              <label
                for="bordered-checkbox-2"
                class="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                "I have to instert a voltage value.
              </label>
            </div>
          </div>
          <div className="grid md:grid-cols-5 md:gap-6 my-4">
            {values.voltageChecked && (
              <TextField
                id="outlined-helperText_2"
                label="Voltage"
                helperText="Please, add a custom voltage"
                value={values.voltage}
                placeholder="Please, add a custom voltage"
                onChange={handleChange('voltage')}
              />
            )}
          </div>

          <div className="grid md:grid-cols-5 md:gap-6 my-4 mt-8">
            {hasLatencyWord(values.testType) && (
              <TextField
                id="outlined-helperText_2"
                label="Data Setup Time"
                helperText=""
                value={values.dataSetupTime}
                placeholder="Data setup time"
                onChange={handleChange('dataSetupTime')}
              />
            )}
          </div>

          <button
            type="submit"
            className="bg-black text-white font-bold p-2 rounded-full w-28 outline-none"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTest;

{
  /**
   * 
   * <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full">
            <TextField
              id="outlined-name"
              label="Test Title"
              variant="standard"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Add your title"
              className="outline-none w-3/5 sm:text-2xl font-bold border-b-2 border-gray-200 p-2"
            />
          </div>

          <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-6 w-full">
            <Select
              className="outline-none w-3/5 p-1"
              labelId="demo-controlled-open-select"
              id="demo-controlled-open-select"
              //open={open}
              //onClose={handleClose}
              //onOpen={handleOpen}
              value={testType}
              label="Test Type"
              onChange={(e) => setTestType(e.target.value)}
            >
              {testTypes.map((testType) => (
                <MenuItem key={testType.name} value={testType.name}>
                  <em>{testType.name}</em>
                </MenuItem>
              ))}
            </Select>
          </div>
          <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-6 w-full">
            <Select
              className="outline-none w-3/5 p-1"
              labelId="demo-controlled-open"
              id="demo-controlled-open"
              //open={open}
              //onClose={handleClose}
              //onOpen={handleOpen}
              value={testType}
              label="Bord"
              onChange={(e) => setBoard(e.target.value)}
            >
              {boards.map((board) => (
                <MenuItem key={board} value={board}>
                  <em>{board}</em>
                </MenuItem>
              ))}
            </Select>
          </div>
          <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-10 w-full">
            <Typography gutterBottom>Start and Stops adresses</Typography>
            <div className="w-3/5 p-1">
              <Slider
                getAriaLabel={(index) => (index === 0 ? 'start' : 'stop')}
                onChange={handleChangeStartStop}
                value={startStop}
                valueLabelDisplay="on"
                marks={startStopMarks}
              />
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-10 w-full">
            <Typography gutterBottom>Temperture</Typography>
            <div className="w-3/5 p-1">
              <Slider
                aria-label="Always visible"
                defaultValue={80}
                //getAriaValueText={valuetext}
                step={10}
                marks={tempMarks}
                valueLabelDisplay="auto"
                min={-50}
                max={50}
                onChange={(e) => setTemperture(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-10 w-full">
            <Typography gutterBottom>Supply voltage</Typography>
            <div className="w-3/5 p-1">
              <Slider
                aria-label="Always visible"
                defaultValue={10}
                //getAriaValueText={valuetext}
                step={1}
                marks={voltMarks}
                valueLabelDisplay="auto"
                min={0}
                max={12}
                onChange={(e) => setVoltage(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-end items-end mt-5">
          <button
            type="button"
            onClick={saveTest}
            className="bg-red-500 text-white font-bold p-2 rounded-full w-28 outline-none"
          >
            Save
          </button>
        </div>
        ###############################

<div>
        <form onSubmit={(e) => {
            e.preventDefault();
            requestTests()
        }} >
            <label htmlFor='testName'>
                 Test
                 <input
                   id="testName"
                   value={testName}
                   placeholder="Test name"
                   onChange={(e) => setTestName(e.target.value)}
                 />
            </label>
            <label htmlFor="board">
                Board
                <select
                    id="board"
                    value={board}
                    onChange={(e) => {
                    setBoard(e.target.value);
                    }}
                    onBlur={(e) => {
                    setBoard(e.target.value);
                    }}
                >
                    <option />
                    {BOARDS.map((board) => (
                    <option key={board} value={board}>
                        {board}
                    </option>
                    ))}
                </select>
        </label>
        <label htmlFor="memory_type">
          Memory
          <select
            disabled={!MEMORIES.length}
            id="memory_type"
            value={memoryType}
            onChange={(e) => setMemoryType(e.target.value)}
            onBlur={(e) => setMemoryType(e.target.value)}
          >
            <option />
            {MEMORIES.map((memory) => (
              <option key={memory} value={memory}>
                {memory}
              </option>
            ))}
          </select>
        </label>
        <button>Submit</button>
        </form>
    </div>
            <div className='tests-list'>
                {tests.map((test, index) => (
                    <TestItem key={test.id} test={test} />
                ))}
            </div>
*/
}
