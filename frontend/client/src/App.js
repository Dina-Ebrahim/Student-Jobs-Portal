import  JoinPortal  from './pages/authentication/JoinPortal';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  return (
     <Router>
      <Routes>
        <Route path="/" element={<JoinPortal />} />
      </Routes>
    </Router>
  );
}

export default App;