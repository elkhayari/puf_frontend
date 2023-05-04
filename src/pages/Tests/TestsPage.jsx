import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import {
  Header,
  Tests,
  AddTest,
  TestDetail,
  SearchTests,
  TestNavbar,
  RunningTests,
  CompletedTests,
  WaitingTests
} from '../../components';

const TestsPage = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState('');

  console.log('SearchTerm : ', searchTerm);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Daschboard" title="Tests" />

      <TestNavbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        user={user && user}
      />

      <div className="h-full">
        <Routes>
          <Route path="/" exact element={<Tests />} />
          <Route path="/create-test" element={<AddTest user={user} />} />
          <Route
            path="/test-detail/:testId"
            element={<TestDetail user={user} />}
          />
          <Route
            path="/search"
            element={
              <SearchTests
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            }
          />
          <Route path="/waiting" element={<WaitingTests user={user} />} />
          <Route path="/running" element={<RunningTests user={user} />} />
          <Route path="/completed" element={<CompletedTests user={user} />} />
        </Routes>
      </div>
    </div>
  );
};

export default TestsPage;
