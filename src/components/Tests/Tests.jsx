import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { TestLayout, Spinner } from '../index';

const Tests = () => {
  const [loading, setLoading] = useState(false);
  const [tests, setTests] = useState([]);

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
    let response = await fetch('http://127.0.0.1:8000/api/tests/');
    let data = await response.json();
    console.log('DATA:', data);
    setTests(data);
  };

  let requestTestById = async (id) => {
    // `http://127.0.0.1:8000/api/tests/?board=${board}&memory=${memory}`
    let response = await fetch(`http://127.0.0.1:8000/api/tests/${id}`);
    let data = await response.json();
    console.log('DATA:', data);
    setTests(data);
  };

  if (loading) {
    return <Spinner message="Fetching tests" />;
  }
  return <div>{tests && <TestLayout tests={tests} />}</div>;
};

export default Tests;
