import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import Onboarding from './Onboarding';
import TripPlan from './TripPlan';
import TravelChatbot from './TravelChatbot';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/plan" element={<Onboarding />} />
        <Route path="/trip" element={<TripPlan />} />
      </Routes>
      <TravelChatbot />
    </Router>
  );
}

export default App;
