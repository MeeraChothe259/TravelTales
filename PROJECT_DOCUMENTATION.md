# TravelTales Project Documentation

Welcome to **TravelTales**, an advanced, AI-powered travel planning companion. This platform leverages modern web technologies and Generative AI to provide users with personalized itineraries, budget management, safety insights, and destination discovery.

---

## 🚀 Project Overview

**TravelTales** is a full-stack web application designed to simplify trip planning. It uses Google Gemini AI to generate detailed, multi-day itineraries based on user preferences. From finding the perfect destination to managing your budget and discovering local secrets, TravelTales is your all-in-one travel assistant.

---

## 🛠 Tech Stack

### Frontend
- **Framework**: [React 19](https://reactjs.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Routing**: [React Router 7](https://reactrouter.com/)
- **Styling**: Vanilla CSS with modern aesthetics (Glassmorphism, Vibrant Gradients).
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Maps**: [Leaflet](https://leafletjs.com/) & [React Leaflet](https://react-leaflet.js.org/)
- **State Management**: React Context API (e.g., `LanguageContext`)

### Backend
- **Environment**: [Node.js](https://nodejs.org/)
- **Framework**: [Express](https://expressjs.com/)
- **AI Integration**: [Google Generative AI (Gemini Pro)](https://ai.google.dev/)
- **Geocoding**: OpenStreetMap Nominatim API
- **Utilities**: `dotenv`, `cors`, `nodemon`

---

## ✨ Core Features

### 1. Destination Discovery
- **Module**: `DestinationDiscovery.jsx` & `DestinationResults.jsx`
- **Description**: Helps users decide where to go based on their mood, interests, and past travels.
- **AI Utility**: Recommends destinations and generates "Hero Images" suggestions for them.

### 2. Smart Itinerary Generation
- **Module**: `Onboarding.jsx` -> `TripPlan.jsx`
- **Description**: A multi-step onboarding process collects user data (destination, dates, budget, interests).
- **AI Utility**: The backend uses Gemini to generate a day-by-day itinerary including morning, afternoon, and evening activities.

### 3. Local Intelligence & Safety
- **Module**: `LocalIntelligence.jsx`
- **Description**: Provides real-time-like insights into safety, local etiquette, scams to avoid, and "hidden gems."
- **Integration**: Fetches specific localized data via AI for the chosen destination.

### 4. Budget & Currency Manager
- **Module**: `BudgetCurrencyPage.jsx` & `BudgetManager.jsx`
- **Description**: Tracks expenses across categories (Food, Stay, Transport, Fun) and provides currency conversion.

### 5. Interactive Map Exploration
- **Module**: `MapExploration.jsx`
- **Description**: Visualizes the trip itinerary on an interactive map using Leaflet. Highlights points of interest and daily stops.

### 6. AI Travel Chatbot
- **Module**: `TravelChatbot.jsx`
- **Description**: A persistent floating assistant available on every page to answer quick travel questions or provide tips.

### 7. Hotel Suggestions
- **Module**: `HotelSuggestionsPage.jsx`
- **Description**: Recommends hotels based on the generated plan and user budget.

---

## 📡 API Documentation (Backend)

The server runs on `http://localhost:5000`.

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/` | `GET` | API Health Check. |
| `/api/chat` | `POST` | Interacts with the AI Assistant. Payload: `{ message: string }`. |
| `/api/geocode` | `GET` | Converts location names to coordinates. Query: `q=locationName`. |
| `/api/generate-plan` | `POST` | Generates a full trip plan. Payload: `formData` object. Falls back to mock data if AI fails. |

---

## 📂 Project Structure

```text
TravelTales/
├── client/                # React Frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components (Navbar, etc.)
│   │   ├── assets/        # Static images and icons
│   │   ├── App.jsx        # Main routing and layout
│   │   ├── TripPlan.jsx   # Core itinerary display
│   │   └── ...            # Feature-specific components
│   └── package.json
├── server/                # Node.js Backend
│   ├── index.js           # Server entry point & routes
│   ├── geminiService.js   # Integration with Google Gemini
│   ├── mockAI.js          # Fallback logic for offline/no-key use
│   └── package.json
└── README.md              # Root documentation
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js installed.
- A Google Gemini API Key.

### Backend Setup
1. Navigate to `/server`.
2. Run `npm install`.
3. Create a `.env` file and add:
   ```env
   GEMINI_API_KEY=your_api_key_here
   PORT=5000
   ```
4. Run `npm run dev` to start the server.

### Frontend Setup
1. Navigate to `/client`.
2. Run `npm install`.
3. Run `npm run dev` to launch the Vite development server.
4. Open the provided local URL (usually `http://localhost:5173`).

---

## 🎨 Design Philosophy
TravelTales uses a **Glassmorphic** design language:
- **Translucency**: Frosted glass effects on containers.
- **Vibrancy**: Use of gradients (Indigo to Purple) to evoke a sense of professional yet magical travel.
- **Responsiveness**: Fully adaptive layout for mobile and desktop viewing.

---

*Generated by Antigravity AI Assistant.*
