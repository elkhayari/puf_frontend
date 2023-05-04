import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Login } from './components';
import { Home } from './pages';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
