import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  Navbar,
  Sidebar,
  Other,
  RunningTests,
  CompletedTests,
  WaitingTests,
  AddTest,
  InsertedDevices,
  ConnectedDevices,
  Devices,
  Metrics,
  EvaluationStepper,
  Results,
  Upload
} from '../components';
import { TestsPage, EvaluationPage, DevicesPageStatus } from './index';

// Icons
import { FiSettings } from 'react-icons/fi';

import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { useStateContext } from '../contexts/ContextProvider';

const Home = () => {
  const [user, setUser] = useState('Bob');
  console.log('HOme Home Home Home HOme');

  const { activeMenu } = useStateContext();

  return (
    <div className="flex relative dark:bg-main-dark-bg">
      {/** Setting Button */}
      <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
        <TooltipComponent content="Settings" position="Top">
          <button
            type="button"
            style={{ background: 'blue', borderRadius: '50%' }}
            className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
          >
            <FiSettings />
          </button>
        </TooltipComponent>
      </div>

      {/* sidebar*/}
      {activeMenu ? (
        <div className="w-72 fixed sidebare dark:bg-secondary-dark-bg bg-white">
          <Sidebar />
        </div>
      ) : (
        <div className="w-0 dark:bg-secondary-dark-bg ">
          <Sidebar />
        </div>
      )}

      {/** Navbare */}
      <div
        className={` dark:bg-main-bg bg-main-bg min-h-screen w-full
            ${activeMenu ? 'md:ml-72' : 'flex-2'}
            `}
      >
        <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
          <Navbar />
        </div>
        {/** Routing */}
        <div>
          <Routes>
            <Route path="/" exact element={<Devices />} />
            <Route path="/devices" element={<Devices />} />
            <Route path="/insertedDevices" element={<InsertedDevices />} />
            <Route path="/connectedDevices" element={<ConnectedDevices />} />

            {/**TESTS */}
            <Route path="/tests" element={<TestsPage user={user} />} />
            <Route
              path="/waitingTests"
              element={<WaitingTests user={user} />}
            />
            <Route
              path="/runningTests"
              element={<RunningTests user={user} />}
            />
            <Route
              path="/completedTests"
              element={<CompletedTests user={user} />}
            />
            <Route path="/AddTest" element={<AddTest user={user} />} />

            {/**EVALUATION   */}
            <Route
              path="/evaluation"
              element={<EvaluationStepper user={user} />}
            />
            <Route path="/metrics" element={<Metrics />} />
            <Route path="/uploadMeasurments" element={<Upload />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </div>
        {/*End Routing */}
      </div>
      {/* End Navbare */}
    </div>
  );
};

export default Home;
