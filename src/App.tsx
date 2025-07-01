import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import LandingPage from './components/LandingPage';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import Marketplace from './components/Marketplace';
import Profile from './components/Profile';
import CarbonCalculator from './components/CarbonCalculator';
import Communities from './components/Communities';
import Events from './components/Events';
import Messages from './components/Messages';

function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [activeSection, setActiveSection] = useState('feed');

  const handleEnterApp = () => {
    setShowLanding(false);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'feed':
        return <Feed />;
      case 'marketplace':
        return <Marketplace />;
      case 'profile':
        return <Profile />;
      case 'calculator':
        return <CarbonCalculator />;
      case 'communities':
        return <Communities />;
      case 'events':
        return <Events />;
      case 'messages':
        return <Messages />;
      default:
        return <Feed />;
    }
  };

  if (showLanding) {
    return (
      <AuthProvider>
        <LandingPage onEnterApp={handleEnterApp} />
      </AuthProvider>
    );
  }

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        <Header />
        <div className="flex">
          <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
          <main className="flex-1 ml-64 p-6">
            {renderContent()}
          </main>
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;