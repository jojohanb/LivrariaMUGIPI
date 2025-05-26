import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Historico from './components/Historico';
import Inicio from './components/Inicio';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/inicio" />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/historico" element={<Historico />} />
      </Routes>
    </Router>
  );
};

export default App;
