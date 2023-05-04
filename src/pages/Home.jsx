import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Navbar, Sidebar, Other } from '../components';
import { TestsPage, DevicesPage, EvaluationPage } from './index';

// Icons
import { FiSettings } from 'react-icons/fi';

import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { useStateContext } from '../contexts/ContextProvider';

const Home = () => {
  const [user, setUser] = useState('Bob');

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
            <Route path="/" exact element={<DevicesPage />} />
            <Route path="/devices" exact element={<DevicesPage />} />
            <Route path="/tests/*" element={<TestsPage user={user} />} />
            <Route
              path="/evaluation/*"
              element={<EvaluationPage user={user} />}
            />
            <Route path="/other" element={<Other />} />
          </Routes>
        </div>{' '}
        {/*End Routing */}
      </div>{' '}
      {/* End Navbare */}
    </div>
  );
};

export default Home;
