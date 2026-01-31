import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import Onboarding from './Onboarding';
import TripPlan from './TripPlan';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/plan" element={<Onboarding />} />
        <Route path="/trip" element={<TripPlan />} />
      </Routes>
    </Router>
  );
}

export default App;
