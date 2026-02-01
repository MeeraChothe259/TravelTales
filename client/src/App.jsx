import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './LanguageContext';
import { CurrencyProvider } from './CurrencyContext';
import LandingPage from './LandingPage';
import Onboarding from './Onboarding';
import TripPlan from './TripPlan';
import BudgetCurrencyPage from './BudgetCurrencyPage';
import HotelSuggestionsPage from './HotelSuggestionsPage';
import DestinationDiscovery from './DestinationDiscovery';
import DestinationResults from './DestinationResults';
import Navbar from './components/Navbar';
import TravelChatbot from './TravelChatbot';
import VlogsPage from './VlogsPage';
import HiddenGemsPage from './HiddenGemsPage';
import FeedbackPage from './FeedbackPage';
import LoginPage from './LoginPage';
import SavedItinerariesPage from './SavedItinerariesPage';

function App() {
  return (
    <LanguageProvider>
      <CurrencyProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/saved-itineraries" element={<><Navbar /><SavedItinerariesPage /></>} />
            <Route path="/discover" element={<DestinationDiscovery />} />
            <Route path="/destination-results" element={<DestinationResults />} />
            <Route path="/onboarding" element={<><Navbar /><Onboarding /></>} />
            <Route path="/plan" element={<><Navbar /><Onboarding /></>} />
            <Route path="/trip" element={<><Navbar /><TripPlan /></>} />
            <Route path="/budget" element={<BudgetCurrencyPage />} />
            <Route path="/hotels" element={<HotelSuggestionsPage />} />
            <Route path="/vlogs" element={<VlogsPage />} />
            <Route path="/hidden-gems" element={<HiddenGemsPage />} />
            <Route path="/feedback" element={<FeedbackPage />} />
          </Routes>
          <TravelChatbot />
        </Router>
      </CurrencyProvider>
    </LanguageProvider>
  );
}

export default App;
