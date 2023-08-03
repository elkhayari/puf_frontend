import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import {
  Header,
  Tests,
  AddTest,
  TestDetail,
  SearchTests
} from '../../components';

const TestsPage = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState('');

  console.log('SearchTerm : ', searchTerm);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 rounded-3xl">
      <Header category="Dashboard" title="All Tests" />

      <div className="h-full">
        <Routes>
          <Route path="/" exact element={<Tests />} />
          <Route path="/create-test" element={<AddTest user={user} />} />
          <Route
            path="/test-detail/:testId"
            element={<TestDetail user={user} />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default TestsPage;
