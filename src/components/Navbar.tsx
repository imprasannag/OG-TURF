import { AppScreen } from '../types';
import { NAVIGATION_LINKS } from '../constants';
import { Menu, X, LayoutDashboard } from 'lucide-react';
import { useState } from 'react';

interface NavbarProps {
  currentScreen: AppScreen;
  onNavigate: (screen: AppScreen) => void;
}

export default function Navbar({ currentScreen, onNavigate }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 w-full z-50 flex justify-between items-center px-6 py-4 bg-zinc-950/60 backdrop-blur-lg border-b border-white/10 shadow-[0_0_15px_rgba(57,255,20,0.1)]">
      <div 
        className="text-2xl font-black text-primary tracking-tighter font-display cursor-pointer flex items-center gap-3"
        onClick={() => onNavigate(AppScreen.HOME)}
      >
        OG Turf Madurai
        <img src="/Logo.jpg" alt="Logo" className="h-10 w-10 rounded-full object-cover border-2 border-primary" />
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-8 font-display tracking-tight">
        {NAVIGATION_LINKS.map((link) => (
          <button
            key={link.label}
            onClick={() => onNavigate(link.screen as AppScreen)}
            className={`transition-colors relative pb-1 ${
              currentScreen === link.screen
                ? 'text-primary font-bold border-b-2 border-primary'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            {link.label}
          </button>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        <button 
          className="md:hidden text-white ml-auto"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-zinc-950 border-b border-white/10 md:hidden animate-in fade-in slide-in-from-top-4">
          <div className="flex flex-col p-4 gap-4">
            {NAVIGATION_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => {
                  onNavigate(link.screen as AppScreen);
                  setIsMenuOpen(false);
                }}
                className={`text-left p-2 font-display ${
                  currentScreen === link.screen ? 'text-primary font-bold' : 'text-zinc-400'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
