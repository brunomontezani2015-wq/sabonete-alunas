import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentArea from './pages/StudentArea';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StudentArea />} />
      </Routes>
    </Router>
  );
}
