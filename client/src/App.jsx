import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './LanguageContext';
import LandingPage from './LandingPage';
import Onboarding from './Onboarding';
import TripPlan from './TripPlan';
<<<<<<< HEAD
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
=======
import BudgetCurrencyPage from './BudgetCurrencyPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/plan" element={<><Navbar /><Onboarding /></>} />
          <Route path="/trip" element={<><Navbar /><TripPlan /></>} />
          <Route path="/budget" element={<BudgetCurrencyPage />} />
        </Routes>
      </Router>
    </LanguageProvider>
>>>>>>> 7b1421a5fbcb9e3856f7277895f3fd4c814a33c1
  );
}

export default App;

