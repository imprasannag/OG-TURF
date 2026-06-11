import { AppScreen } from '../types';
import { Mail, Phone, Globe, Share2 } from 'lucide-react';

interface FooterProps {
  onNavigate: (screen: AppScreen) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="w-full py-12 px-8 bg-zinc-950 border-t border-white/10 font-display text-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="max-w-xs">
          <div className="text-lg font-bold text-white mb-4">OG Turf Madurai</div>
          <p className="text-zinc-500 leading-relaxed">
            The premier sports destination in Madurai, engineered for performance and designed for the elite. 
            Experience the future of turf sports.
          </p>
          <div className="flex gap-4 mt-6">
            <a href="#" className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-white hover:text-primary transition-colors">
              <Globe size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-white hover:text-primary transition-colors">
              <Mail size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-white hover:text-primary transition-colors">
              <Phone size={18} />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-12">
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Navigate</h4>
            <ul className="flex flex-col gap-2 text-zinc-500">
              <li><button onClick={() => onNavigate(AppScreen.HOME)} className="hover:text-primary transition-colors">Home</button></li>
              <li><button onClick={() => onNavigate(AppScreen.BOOKING)} className="hover:text-primary transition-colors">Book Now</button></li>
              <li><button onClick={() => onNavigate(AppScreen.ABOUT)} className="hover:text-primary transition-colors">Pricing</button></li>
              <li><button onClick={() => onNavigate(AppScreen.ABOUT)} className="hover:text-primary transition-colors">Facilities</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Support</h4>
            <ul className="flex flex-col gap-2 text-zinc-500">
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Refund Policy</a></li>
              <li><button onClick={() => onNavigate(AppScreen.ABOUT)} className="hover:text-primary transition-colors text-left font-display">Contact Support</button></li>
            </ul>
          </div>
        </div>

        <div className="w-full md:w-auto text-zinc-500 pt-8 md:pt-0 border-t border-white/5 md:border-0">
          <div className="mb-4 text-white font-bold uppercase tracking-wider text-xs font-display">Newsletter</div>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Email Address"
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:border-primary outline-none text-white text-sm transition-all"
            />
            <button className="bg-primary text-black px-4 py-2 rounded-lg font-bold hover:opacity-90 transition-opacity">
              Join
            </button>
          </div>
          <p className="mt-8 text-xs font-display">© 2024 OG Turf Madurai. Precision Engineered Performance.</p>
        </div>
      </div>
    </footer>
  );
}
