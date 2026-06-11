import { AppScreen } from '../types';
import { GALLERY_IMAGES, TESTIMONIALS } from '../constants';
import { Clock, MousePointer2, History, ShieldCheck, ArrowRight, Star, CheckCircle2, Trophy, MessageSquare, Coins, Coffee, Car, Shield, Shirt, GraduationCap, Sparkles, Percent } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import TossCoin from './TossCoin';
import { useState } from 'react';

interface HomeScreenProps {
  onNavigate: (screen: AppScreen) => void;
}

export default function HomeScreen({ onNavigate }: HomeScreenProps) {
  const [isTossOpen, setIsTossOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.05], [1, 0.95]);

  const offers = [
    { title: "Early Bird Discount", desc: "Get 20% off on slots between 6 AM - 10 AM", code: "OGEARLY" },
    { title: "Weekend Warrior", desc: "Book 3 hours, get 1 hour free every Sunday", code: "OGWEEKEND" },
    { title: "Midnight Madness", desc: "Flat ₹500 off on all slots after 11 PM", code: "OGNIGHT" }
  ];

  return (
    <div className="w-full relative">
      <TossCoin isOpen={isTossOpen} onClose={() => setIsTossOpen(false)} />
      
      {/* Floating Toss Action Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsTossOpen(true)}
        className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-primary text-black rounded-full shadow-[0_0_20px_rgba(57,255,20,0.4)] flex items-center justify-center group"
      >
        <Coins size={28} className="group-hover:rotate-12 transition-transform" />
        <span className="absolute -top-12 right-0 bg-black/80 backdrop-blur-md text-white text-[10px] py-1 px-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-bold border border-primary/20">MATCH TOSS</span>
      </motion.button>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/b3.jpg"
            alt="Sports Turf Background"
            className="w-full h-full object-cover opacity-80"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
          
          {/* Pitch Markings Overlay */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] border-2 border-white rounded-full"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-full bg-white"></div>
          </div>

          {/* Floating Sports Decor */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div 
              animate={{ y: [0, -40, 0], rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[15%] left-[10%] text-6xl filter blur-[1px] opacity-20"
            >⚽</motion.div>
            <motion.div 
              animate={{ y: [0, 40, 0], rotate: -360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[20%] right-[15%] text-5xl filter blur-[2px] opacity-10"
            >🏏</motion.div>
            <motion.div 
              animate={{ x: [0, 50, 0], rotate: 180 }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-[30%] left-[20%] text-4xl filter blur-[1px] opacity-15"
            >⚽</motion.div>
          </div>

          {/* Animated Light Beams */}
          <motion.div 
            animate={{ rotate: [-2, 2, -2], opacity: [0.1, 0.4, 0.1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-20%] left-[-10%] w-[40%] h-[150%] bg-gradient-to-b from-primary/30 via-primary/5 to-transparent origin-top transform -skew-x-[20deg] blur-[80px] pointer-events-none"
          ></motion.div>
          <motion.div 
            animate={{ rotate: [2, -2, 2], opacity: [0.1, 0.4, 0.1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-20%] right-[-10%] w-[40%] h-[150%] bg-gradient-to-b from-primary/30 via-primary/5 to-transparent origin-top transform skew-x-[20deg] blur-[80px] pointer-events-none"
          ></motion.div>

          {/* Creeping Fog Effect */}
          <motion.div 
            animate={{ x: ['-2%', '2%', '-2%'], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-0 left-[-20%] right-[-20%] h-[70%] bg-gradient-to-t from-black via-white/5 to-transparent blur-[100px] pointer-events-none"
          ></motion.div>

          {/* Floating Dust Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  y: '100vh', 
                  x: `${Math.random() * 100}vw`,
                  opacity: 0,
                  scale: Math.random() * 0.5 + 0.5
                }}
                animate={{ 
                  y: '-20vh', 
                  opacity: [0, Math.random() * 0.5 + 0.2, 0],
                  x: `${Math.random() * 100}vw` 
                }}
                transition={{ 
                  duration: Math.random() * 15 + 10, 
                  repeat: Infinity, 
                  delay: Math.random() * 15,
                  ease: "linear"
                }}
                className="absolute w-2 h-2 bg-primary/30 rounded-full blur-[2px]"
              />
            ))}
          </div>
        </div>
        
        <motion.div 
          style={{ opacity, scale }}
          className="relative z-10 max-w-7xl mx-auto px-6 text-center"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#c6ff00]/5 rounded-full blur-[150px] pointer-events-none" />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-block px-6 py-2 mb-10 bg-white/5 backdrop-blur-md rounded-none border-l-4 border-[#c6ff00]"
          >
            <span className="text-[#c6ff00] font-black text-xs tracking-[0.5em] uppercase font-display">Go Green Elite Arena</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-display text-8xl md:text-[11rem] leading-[0.85] mb-10 tracking-tighter text-white font-black uppercase drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          >
            OG <span className="text-[#c6ff00] neon-text-glow">TURF</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-3xl text-zinc-400 max-w-3xl mx-auto mb-16 font-black uppercase tracking-[0.4em]"
          >
            Engineered For <span className="text-[#c6ff00] underline decoration-4 underline-offset-8">Victory</span>
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <button 
              onClick={() => onNavigate(AppScreen.BOOKING)}
              className="px-16 py-6 bg-[#c6ff00] text-black font-black rounded-none skew-x-[-12deg] text-2xl hover:bg-white transition-all shadow-[0_20px_50px_rgba(198,255,0,0.3)] uppercase tracking-tighter"
            >
              <span className="inline-block skew-x-[12deg]">Book Now</span>
            </button>
            <button 
              onClick={() => setIsTossOpen(true)}
              className="px-12 py-6 bg-transparent border-2 border-white/20 text-white font-black rounded-none skew-x-[-12deg] text-xl hover:bg-[#c6ff00] hover:text-black transition-all flex items-center gap-4"
            >
              <Coins size={24} className="text-[#c6ff00] skew-x-[12deg]" /> 
              <span className="skew-x-[12deg] uppercase">Match Toss</span>
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Offers Marquee */}
      <div className="bg-primary overflow-hidden py-3 relative z-20 -mt-2 shadow-[0_-10px_50px_rgba(57,255,20,0.2)]">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center mx-8">
              <Sparkles size={16} className="text-black mr-2" />
              <span className="text-black font-black text-sm uppercase tracking-widest">
                Special Offer: Get 20% Off your first booking with code: OGNEW20
              </span>
              <Sparkles size={16} className="text-black ml-8" />
            </div>
          ))}
        </div>
      </div>

      {/* Offers Grid Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full -z-10" />
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4"
        >
          <div>
            <h2 className="font-display text-4xl md:text-5xl text-white font-bold leading-tight">
              Exclusive <span className="text-primary">Arena Offers</span>
            </h2>
            <p className="text-zinc-500 mt-4 max-w-lg">Unlock premium perks and discounts designed for our regular champions.</p>
          </div>
          <button className="text-primary font-bold flex items-center gap-2 group">
            Explore All Deals <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offers.map((offer, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="glass-card p-8 rounded-3xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <Percent size={120} className="text-primary" />
              </div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                  <Trophy size={24} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{offer.title}</h3>
                <p className="text-zinc-400 mb-8">{offer.desc}</p>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between group-hover:border-primary/30 transition-all">
                  <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest">CODE</span>
                  <span className="text-primary font-black font-display text-xl">{offer.code}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-24 px-6 bg-zinc-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: <Coffee />, title: "Player's Cafe", desc: "Energy drinks & snacks" },
                  { icon: <Car />, title: "Secure Parking", desc: "Space for 50+ vehicles" },
                  { icon: <Shield />, title: "Locker Rooms", desc: "Secure gear storage" },
                  { icon: <CheckCircle2 />, title: "Shower Rooms", desc: "Premium hygiene facilities" },
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="glass-card p-6 rounded-2xl border-white/5"
                  >
                    <div className="text-primary mb-4">{item.icon}</div>
                    <h4 className="text-white font-bold mb-1">{item.title}</h4>
                    <p className="text-zinc-500 text-sm">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="font-display text-4xl md:text-5xl text-white font-bold mb-6">World Class <span className="text-primary">Facilities</span></h2>
              <p className="text-zinc-400 text-lg mb-8">We don't just provide a pitch; we provide an experience. From professional-grade locker rooms to our on-site cafe, every detail is designed for the athlete.</p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h5 className="text-white font-bold">Safe & Secure</h5>
                    <p className="text-zinc-500 text-xs uppercase tracking-tighter">CCTV Monitored Environment</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h5 className="text-white font-bold">Always Open</h5>
                    <p className="text-zinc-500 text-xs uppercase tracking-tighter">24/7 Match Support</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kits & Coaching Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl text-white font-bold mb-4">Elite Gear & <span className="text-primary">Coaching</span></h2>
          <p className="text-zinc-500">Everything you need to play like a pro, all in one place.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Coaching Card */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative group overflow-hidden rounded-[2.5rem] border border-white/10 bg-zinc-900 shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
            <img src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=2000" alt="Coaching" className="w-full h-[400px] object-cover group-hover:scale-110 transition-transform duration-700 opacity-50" />
            <div className="absolute inset-0 z-20 p-12 flex flex-col justify-end">
              <div className="w-14 h-14 bg-primary text-black rounded-2xl flex items-center justify-center mb-6 shadow-2xl">
                <GraduationCap size={32} />
              </div>
              <h3 className="text-3xl font-black text-white mb-4 uppercase tracking-tighter">Pro Coaching</h3>
              <p className="text-zinc-300 mb-8 max-w-md">Train under certified coaches with specialized programs for both beginners and advanced players. Group sessions and 1-on-1 available.</p>
              <button className="w-fit px-8 py-3 bg-white text-black font-black rounded-xl hover:bg-primary transition-colors uppercase tracking-widest text-xs">Book a Session</button>
            </div>
          </motion.div>

          {/* Kits Card */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative group overflow-hidden rounded-[2.5rem] border border-white/10 bg-zinc-900 shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
            <img src="https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=2000" alt="Equipment" className="w-full h-[400px] object-cover group-hover:scale-110 transition-transform duration-700 opacity-50" />
            <div className="absolute inset-0 z-20 p-12 flex flex-col justify-end">
              <div className="w-14 h-14 bg-primary text-black rounded-2xl flex items-center justify-center mb-6 shadow-2xl">
                <Shirt size={32} />
              </div>
              <h3 className="text-3xl font-black text-white mb-4 uppercase tracking-tighter">Kit Rentals</h3>
              <p className="text-zinc-300 mb-8 max-w-md">No gear? No problem. Rent professional-grade cricket bats, pads, gloves, and football shoes at affordable hourly rates.</p>
              <button className="w-fit px-8 py-3 bg-white text-black font-black rounded-xl hover:bg-primary transition-colors uppercase tracking-widest text-xs">View Price List</button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Bento Grid */}
      <section className="py-24 px-6 max-w-7xl mx-auto relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/2 blur-[150px] -z-10" />
        <div className="text-center mb-16 relative">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
          <h2 className="font-display text-4xl md:text-6xl text-white mb-4 font-black tracking-tight italic">Engineered for <span className="text-primary neon-text-glow">Victory</span></h2>
          <p className="text-zinc-500 max-w-xl mx-auto uppercase tracking-[0.3em] text-[10px] font-bold">The Science of Elite Performance</p>
          
          {/* Scanning Line Effect */}
          <motion.div 
            animate={{ top: ['0%', '100%', '0%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-[2px] bg-primary/20 blur-[4px] z-10 pointer-events-none"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-2 glass-card p-8 rounded-2xl flex flex-col justify-between hover:border-primary/50 transition-all group">
            <Clock className="text-primary group-hover:scale-110 transition-transform" size={40} />
            <div className="mt-12">
              <h3 className="font-display text-2xl text-white mb-2 font-bold">Real-time slot availability</h3>
              <p className="text-zinc-400">Live dashboard showing current and upcoming availability. What you see is what you get, updated every second.</p>
            </div>
          </div>

          <div className="glass-card p-8 rounded-2xl flex flex-col justify-between hover:border-primary/50 transition-all group">
            <MousePointer2 className="text-primary group-hover:scale-110 transition-transform" size={40} />
            <div className="mt-12">
              <h3 className="font-display text-2xl text-white mb-2 font-bold">Easy booking</h3>
              <p className="text-zinc-400">Two-tap confirmation with instant digital receipts.</p>
            </div>
          </div>

          <div className="glass-card p-8 rounded-2xl flex flex-col justify-between hover:border-primary/50 transition-all group">
            <History className="text-primary group-hover:scale-110 transition-transform" size={40} />
            <div className="mt-12">
              <h3 className="font-display text-2xl text-white mb-2 font-bold">24/7 Access</h3>
              <p className="text-zinc-400">Midnight matches or early morning drills.</p>
            </div>
          </div>

          <div className="md:col-span-4 glass-card p-8 rounded-2xl flex flex-col md:flex-row items-center gap-8 hover:border-primary/50 transition-all">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                  <ShieldCheck size={28} />
                </div>
                <h3 className="font-display text-3xl text-white font-black italic">Elite Infrastructure</h3>
              </div>
              <p className="text-zinc-400 text-lg leading-relaxed">FIFA-standard synthetic grass with specialized shock absorption for peak athlete safety and ball performance. Professional floodlights and perimeter fencing designed for high-intensity play. <span className="text-primary font-bold">Optimized for Madurai's climate.</span></p>
            </div>
            <div className="w-full md:w-1/3 aspect-video rounded-xl overflow-hidden border border-white/10">
              <img
                src="/2026-04-08 (1).webp"
                alt="Premium Turf Detail"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-display text-4xl text-white font-bold">The Arena Gallery</h2>
              <p className="text-zinc-500 mt-2">Visualizing the home of champions.</p>
            </div>
            <button className="text-primary flex items-center gap-2 font-bold group">
              View All <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {GALLERY_IMAGES.map((img, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`rounded-3xl overflow-hidden glass-card group relative ${idx === 0 ? 'md:col-span-2 md:row-span-2 h-[500px]' : 'h-60'}`}
              >
                <img 
                  src={img} 
                  alt={`Arena View ${idx + 1}`} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale-[0.5] group-hover:grayscale-0"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                  <div className="w-10 h-[2px] bg-primary mb-2 transform -translate-x-4 group-hover:translate-x-0 transition-transform duration-500" />
                  <span className="text-white font-display text-xl font-black italic tracking-tight">ARENA VIEW 0{idx + 1}</span>
                  <p className="text-primary text-[10px] font-bold tracking-widest uppercase mt-1 opacity-0 group-hover:opacity-100 transition-opacity delay-200">4K High Definition</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 px-6 bg-zinc-950 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
             <h2 className="font-display text-4xl md:text-5xl text-white mb-4 font-bold">Precision Pricing</h2>
             <p className="text-zinc-500 max-w-xl mx-auto">Transparent, competitive pricing for elite sports infrastructure.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PriceCard tier="Day Mode" time="06:00 - 16:00" price="₹800/hr" features={['Professional Pitch', 'Changing Rooms', 'Water Stations']} onBook={() => onNavigate(AppScreen.BOOKING)} />
            <PriceCard tier="Prime Time" time="17:00 - 23:00" price="₹1,200/hr" highlight features={['All Day Benefits', 'Stadium Lighting', 'Premium Support']} onBook={() => onNavigate(AppScreen.BOOKING)} />
            <PriceCard tier="Elite Night" time="23:00 - 02:00" price="₹1,500/hr" features={['Exclusive Access', 'Dynamic Lighting', 'Late Night Access']} onBook={() => onNavigate(AppScreen.BOOKING)} />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl text-white font-bold">Elite Experiences</h2>
          <div className="flex justify-center items-center gap-2 mt-4">
            <div className="flex text-primary">
              {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" size={18} />)}
            </div>
            <span className="text-zinc-400 text-sm">5.0 / 5 Based on 500+ reviews</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="glass-card p-8 rounded-2xl relative group hover:border-primary/30 transition-all">
              <span className="absolute top-8 right-8 text-7xl text-white/5 font-serif italic select-none">"</span>
              <div className="flex text-primary mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" size={14} />)}
              </div>
              <p className="text-zinc-300 mb-8 italic leading-relaxed text-lg">"{t.comment}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-black">
                  {t.initials}
                </div>
                <div>
                  <h4 className="text-white font-bold">{t.name}</h4>
                  <p className="text-zinc-500 text-xs uppercase tracking-widest">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tournament Hosting Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="glass-card rounded-[3rem] overflow-hidden border border-primary/20 relative">
          <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
            <Trophy size={300} className="text-primary" />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-8 md:p-16 relative z-10">
            <div>
              <div className="inline-block px-4 py-1.5 mb-6 bg-primary/10 rounded-full border border-primary/20">
                <span className="text-primary font-bold text-xs tracking-widest uppercase font-display flex items-center gap-2">
                   <Trophy size={14} /> Tournament Special
                </span>
              </div>
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="font-display text-4xl md:text-6xl text-white mb-6 font-black tracking-tight leading-tight"
              >
                Host Your <br /> <span className="text-primary">Tournament</span>
              </motion.h2>
              <p className="text-zinc-400 text-lg mb-8 max-w-md">
                Planning a corporate event or a city-wide championship? We offer special bulk rates and full facility management for tournament hosts.
              </p>
              
              <div className="space-y-4 mb-10">
                {[
                  'Bulk Slot Booking (4+ Hours)',
                  'Special Tournament Pricing',
                  'Exclusive Facility Access',
                  'Tournament Management Support'
                ].map((feature, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4 text-white font-bold"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary shadow-[0_0_15px_rgba(57,255,20,0.1)]">
                      <CheckCircle2 size={20} />
                    </div>
                    {feature}
                  </motion.div>
                ))}
              </div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="glass-card p-8 rounded-3xl border border-white/10 bg-black/40 shadow-2xl relative"
            >
              <div className="absolute -top-4 -left-4 bg-primary text-black p-3 rounded-2xl shadow-xl">
                <MessageSquare size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-6 ml-6">Tournament Inquiry</h3>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest ml-1">Name</label>
                    <input type="text" placeholder="Your Name" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:border-primary outline-none transition-all placeholder:text-zinc-600" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest ml-1">Contact</label>
                    <input type="tel" placeholder="Phone Number" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:border-primary outline-none transition-all placeholder:text-zinc-600" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest ml-1">Event Name</label>
                  <input type="text" placeholder="e.g. Corporate League 2024" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:border-primary outline-none transition-all placeholder:text-zinc-600" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest ml-1">Message</label>
                  <textarea placeholder="Tell us about your event (date, estimated hours, etc.)" rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:border-primary outline-none transition-all resize-none placeholder:text-zinc-600"></textarea>
                </div>
                <button className="w-full bg-primary text-black font-black py-4 rounded-xl hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_20px_rgba(57,255,20,0.2)] mt-4 uppercase tracking-widest text-sm">
                  Send Inquiry
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto glass-card rounded-3xl overflow-hidden relative p-12 md:p-24 text-center">
          <div className="absolute inset-0 bg-primary/5 pointer-events-none"></div>
          <div className="relative z-10">
            <h2 className="font-display text-5xl md:text-7xl text-white mb-6 font-black tracking-tight">Ready for Kickoff?</h2>
            <p className="text-zinc-400 text-lg md:text-xl max-w-xl mx-auto mb-10">
              Join the community of elite athletes in Madurai. Your next victory starts with single click.
            </p>
            <button 
              onClick={() => onNavigate(AppScreen.BOOKING)}
              className="px-12 py-5 bg-primary text-black font-black rounded-full text-xl neon-glow hover:scale-105 transition-all shadow-xl"
            >
              Reserve Your Slot Now
            </button>
            <div className="mt-8 text-zinc-500 text-sm flex flex-col sm:flex-row items-center justify-center gap-6">
              <span className="flex items-center gap-2"><CheckCircle2 className="text-primary" size={18} /> Instant Confirmation</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="text-primary" size={18} /> Secure Payments</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function PriceCard({ tier, time, price, features, highlight = false, onBook }: any) {
  return (
    <div className={`p-8 rounded-3xl border transition-all duration-300 hover:-translate-y-2 ${highlight ? 'bg-primary/5 border-primary shadow-[0_0_30px_rgba(57,255,20,0.15)] relative overflow-hidden' : 'glass-card border-white/5 hover:border-white/20'}`}>
      {highlight && <div className="absolute top-0 right-0 bg-primary text-black px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-bl-xl shadow-lg">Most Popular</div>}
      <h3 className="text-xl font-black text-white mb-2 font-display">{tier}</h3>
      <div className="text-zinc-500 text-sm mb-6 flex items-center gap-2"><Clock size={14}/> {time}</div>
      <div className="text-4xl font-black text-primary mb-8 font-display">{price}</div>
      <ul className="space-y-4">
        {features.map((f: string) => (
          <li key={f} className="flex items-center gap-3 text-sm text-zinc-300">
            <div className="w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_5px_rgba(57,255,20,0.5)]"></div>
            {f}
          </li>
        ))}
      </ul>
      <button onClick={onBook} className={`w-full mt-10 py-4 rounded-xl font-bold transition-all ${highlight ? 'bg-primary text-black hover:opacity-90 hover:scale-105' : 'bg-white/5 text-white hover:bg-white/10 border border-white/10 hover:border-white/30'}`}>
        Book This Tier
      </button>
    </div>
  );
}
