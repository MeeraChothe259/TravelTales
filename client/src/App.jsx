import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './LanguageContext';
import LandingPage from './LandingPage';
import Onboarding from './Onboarding';
import TripPlan from './TripPlan';
import BudgetCurrencyPage from './BudgetCurrencyPage';
import HotelSuggestionsPage from './HotelSuggestionsPage';
import DestinationDiscovery from './DestinationDiscovery';
import DestinationResults from './DestinationResults';
import Navbar from './components/Navbar';
import TravelChatbot from './TravelChatbot';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/discover" element={<DestinationDiscovery />} />
          <Route path="/destination-results" element={<DestinationResults />} />
          <Route path="/onboarding" element={<><Navbar /><Onboarding /></>} />
          <Route path="/plan" element={<><Navbar /><Onboarding /></>} />
          <Route path="/trip" element={<><Navbar /><TripPlan /></>} />
          <Route path="/budget" element={<BudgetCurrencyPage />} />
          <Route path="/hotels" element={<HotelSuggestionsPage />} />
        </Routes>
        <TravelChatbot />
      </Router>
    </LanguageProvider>
  );
}

export default App;
