import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Header } from '../../components';

const DevicesPageStatus = ({ user }) => {
  return (
    <div className="m-2 md:m-10 mt-10 p-2 md:p-10 rounded-3xl">
      <Header category="Dashboard" title="Devices-page" />

      <div className="h-full">
        <Routes>
          {/* <Route path="" exact element={<Devices />} />
          <Route path="/insertedDevices" element={<InsertedDevices />} />
          <Route path="/connectedDevices" element={<ConnectedDevices />} /> */}
        </Routes>
      </div>
    </div>
  );
};

export default DevicesPageStatus;
