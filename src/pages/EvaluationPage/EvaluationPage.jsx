import React from 'react';
import { Route, Routes } from 'react-router-dom';

import {
  Header,
  Evaluation,
  EvaluationStepper,
  SelectedTestsEvaluation,
  Experiments,
  Metrics,
  Measurments
} from '../../components';

const EvaluationPage = () => {
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Daschboard" title="Evaluation" />

      <div className="h-full">
        <Routes>
          <Route path="/" exact element={<EvaluationStepper />} />

          <Route path="/nextPage" element={<SelectedTestsEvaluation />} />
          <Route path="/metrics" element={<Metrics />} />
          <Route path="/experiments" element={<Experiments />} />

          {/**<Route
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
          <Route path="/running" element={<RunningTests user={user} />} />
          
                   */}
        </Routes>
      </div>
    </div>
  );
};

export default EvaluationPage;
