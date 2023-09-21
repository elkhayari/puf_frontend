import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../index';

import { testTypes } from '../../data/dummy';

import TextField from '@mui/material/TextField';

const AddTest = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const navigate = useNavigate();

  const [values, setValues] = useState({
    title: '',
    initialValue: '0x55',
    testType: '',
    startAddress: 0,
    stopAddress: 99,
    temperature: 23,
    temperatureChecked: false,
    voltageChecked: false,
    voltage: 12,
    dataSetupTime: '15',
    iterations: 1
  });

  const [errors, setErrors] = React.useState({
    title: '',
    initialValue: '',
    testType: '',
    startAddress: '',
    stopAddress: '',
    temperature: '',
    voltage: '',
    dataSetupTime: '',
    iterations: ''
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
    console.log(
      '🚀 ~ file: AddTest.jsx:83 ~ handleChange ~ event:',
      name,
      event.target.value
    );

    if (name === 'dataSetupTime') {
      let dst = event.target.value;

      const regex = /^\d+[,-]\d+([,-]\d*)*$/;
      console.log(dst);
      console.log(regex.test(dst));

      setValues({ ...values, [name]: dst });
    } else {
      setValues({ ...values, [name]: event.target.value });
    }
  };

  const handleChange1 = (name) => (event) => {
    setValues({ ...values, [name]: event.target.checked });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Save Test');

    if (validate()) {
      // code to submit form data
      console.log('Send Post Request:');

      const data = values;
      console.log(data);
      const VM_IP_ADDRESS = window.location.hostname;
      
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)
      };
      fetch(`http://${VM_IP_ADDRESS}:8000/api-endpoint/`, requestOptions).then(
        (data) => {
          console.log(data); // JSON data parsed by `data.json()` call
          navigate('/tests');
        }
      );
    } else {
      console.log('Input missing ');
      setFields(true);
    }
  };

  function hasLatencyWord(str) {
    return str.includes('latency');
  }

  return (
    <div className="m-2 md:m-10 mt-10 p-2 md:p-10 rounded-3xl">
      <Header category="Dashboard" title="Add Test" />
      <div className="flex flex-col justify-center items-center">
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

            {/* TEST type options */}
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-6 group">
                <label for="underline_select" className="sr-only">
                  Underline select
                </label>
                <select
                  id="underline_select"
                  className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
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

            <div className="grid grid-cols-3 gap-4 my-8">
              <div className="flex">
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                  Initial Value
                </span>
                <input
                  type="text"
                  id="website-admin"
                  className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                  id="website-admin"
                  type="number"
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
                  id="website-admin"
                  type="number"
                  className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={values.stopAddress}
                  onChange={handleChange('stopAddress')}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 md:gap-6 mt-8">
              <div className="flex items-center">
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
                  className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
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

            <div className="grid md:grid-cols-3 md:gap-6 my-4 mt-8">
              <TextField
                id="outlined-helperText_2"
                label="Data Setup Time"
                helperText=""
                value={values.dataSetupTime}
                placeholder="Data setup time"
                onChange={handleChange('dataSetupTime')}
              />
            </div>

            <div className="grid md:grid-cols-3 md:gap-6 my-4 mt-8">
              <TextField
                id="outlined-helperText_3"
                label="Number of Iterations"
                helperText=""
                value={values.iterations}
                placeholder="Iterations"
                onChange={handleChange('iterations')}
              />
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
    </div>
  );
};

export default AddTest;
