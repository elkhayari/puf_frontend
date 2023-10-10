import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { TestLayout, Spinner } from '../index';
import { BASE_URL } from '../../config';

const Tests = () => {
  const [loading, setLoading] = useState(false);
  //const [tests, setTests] = useState([]);
  const [reliabilityTests, setReliabilityTests] = useState([]);
  const [readLatencyTests, setReadLatencyTests] = useState([]);
  const [writeLatencyTests, setWriteLatencyTests] = useState([]);
  const [rowHammeringTests, setRowHammeringTests] = useState([]);

  const { testId } = useParams();

  useEffect(() => {
    setLoading(true);
    if (testId) {
      console.log('useEffect byID');
      requestTestById(testId);
    } else {
      requestTests();
    }
    setLoading(false);
  }, [testId]);

  let requestTests = async () => {
    let response = await fetch(`${BASE_URL}/testsApi/tests/`);
    let data = await response.json();
    console.log('DATA:', data);
    setReliabilityTests(data['reliabilityData']);
    setReadLatencyTests(data['readLatencyData']);
    setWriteLatencyTests(data['writeLatencyData']);
    setRowHammeringTests(data['rowHammeringData']);
  };

  let requestTestById = async (id) => {
    let response = await fetch(`${BASE_URL}/testsApi/tests/${id}`);
    let data = await response.json();

    console.log('DATA:', data);
  };

  if (loading) {
    return <Spinner message="Fetching tests" />;
  }
  return (
    <React.Fragment>
      {reliabilityTests && (
        <TestLayout
          color="#b2ebf2"
          type="Reliability Tests"
          tests={reliabilityTests}
        />
      )}
      <br />
      {readLatencyTests && (
        <TestLayout
          color="#81d4fa"
          type="Read Latency Tests"
          tests={readLatencyTests}
        />
      )}
      <br />
      {writeLatencyTests && (
        <TestLayout
          color="#80cbc4"
          type="Write Latency Tests"
          tests={writeLatencyTests}
        />
      )}
      <br />
      {rowHammeringTests && (
        <TestLayout
          color="#64ffda"
          type="Row Hammering Tests"
          tests={rowHammeringTests}
        />
      )}
    </React.Fragment>
  );
};

export default Tests;
