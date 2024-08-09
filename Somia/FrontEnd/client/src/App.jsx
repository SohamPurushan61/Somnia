import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Web3Provider from './contexts/Web3Provider';
import HomePage from './pages/HomePage';
import ConnectionPage from './pages/connectionPage';

const App = () => {
  return (
    <Web3Provider>
      <Router>
        <Routes>
          <Route path="/" element={<ConnectionPage />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </Router>
    </Web3Provider>
  );
};

export default App;