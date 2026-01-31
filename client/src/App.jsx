import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './LanguageContext';
import LandingPage from './LandingPage';
import Onboarding from './Onboarding';
import TripPlan from './TripPlan';
import BudgetCurrencyPage from './BudgetCurrencyPage';
import HotelSuggestionsPage from './HotelSuggestionsPage';
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
          <Route path="/hotels" element={<HotelSuggestionsPage />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;

