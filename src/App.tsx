import { useState } from 'react';
import { AppScreen } from './types';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeScreen from './components/HomeScreen';
import BookingScreen from './components/BookingScreen';
import AdminScreen from './components/AdminScreen';
import AboutScreen from './components/AboutScreen';
import FacilitiesScreen from './components/FacilitiesScreen';
import { motion, AnimatePresence } from 'motion/react';
import Preloader from './components/Preloader';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>(AppScreen.HOME);

  // Separate page for Admin
  if (window.location.pathname === '/admin') {
    return <AdminScreen />;
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case AppScreen.HOME:
        return <HomeScreen onNavigate={setCurrentScreen} />;
      case AppScreen.BOOKING:
        return <BookingScreen />;
      case AppScreen.ABOUT:
        return <AboutScreen />;
      case AppScreen.FACILITIES:
        return <FacilitiesScreen />;
      default:
        return <HomeScreen onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-primary selection:text-black">
      <Preloader />
      <Navbar currentScreen={currentScreen} onNavigate={setCurrentScreen} />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer onNavigate={setCurrentScreen} />
    </div>
  );
}
