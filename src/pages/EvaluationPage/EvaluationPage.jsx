import React from 'react';
import { Route, Routes } from 'react-router-dom';

import {
  Header,
  Evaluation,
  EvaluationStepper,
  SelectedTestsEvaluation,
  Experiments,
  TriggerTask,
  Metrics,
  Results,
  Upload
} from '../../components';

const EvaluationPage = () => {
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Dashboard" title="Evaluation" />

      <div className="h-full">
        <Routes>
          {/* <Route path="/" exact element={<EvaluationStepper />} />
          <Route path="/nextPage" element={<SelectedTestsEvaluation />} />
          <Route path="/metrics" element={<Metrics />} /> */}

          {/* <Route path="/upload" element={<Upload />} />
          <Route path="/triggerTask" element={<TriggerTask />} />
          <Route path="/results" element={<Results />} /> */}
        </Routes>
      </div>
    </div>
  );
};

export default EvaluationPage;
