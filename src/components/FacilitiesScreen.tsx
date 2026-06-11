import { motion } from 'motion/react';
import { TreePine, Bath, Coffee, CheckCircle2 } from 'lucide-react';

export default function FacilitiesScreen() {
  const facilities = [
    {
      icon: <TreePine size={40} className="text-primary mb-4" />,
      title: "Lush Green Environment",
      desc: "Our turf is surrounded by a carefully maintained, eco-friendly green environment. Experience fresh air and natural vibes while you play your high-intensity matches.",
      perks: ["Eco-friendly layout", "Fresh air circulation", "Relaxing scenery"]
    },
    {
      icon: <Bath size={40} className="text-primary mb-4" />,
      title: "Modern Washrooms & Toilets",
      desc: "Hygienic, well-maintained toilets and changing rooms available 24/7. We ensure top-tier cleanliness standards for all our athletes before and after the game.",
      perks: ["Regularly sanitized", "Changing rooms included", "Running water 24/7"]
    },
    {
      icon: <Coffee size={40} className="text-primary mb-4" />,
      title: "Rest Areas & Lounge",
      desc: "Take a break between sessions in our comfortable shaded rest areas. Complete with seating, hydration stations, and a relaxing atmosphere to recover.",
      perks: ["Shaded seating", "Hydration stations", "Viewer's gallery"]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 min-h-[80vh]">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-black font-display text-white mb-6">World-Class <span className="text-primary">Facilities</span></h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">We provide more than just a playing field. Enjoy our comprehensive amenities designed for comfort, hygiene, and peak performance.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {facilities.map((fac, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2 }}
            className="glass-card rounded-3xl p-8 hover:border-primary/50 transition-all group"
          >
            <div className="transform group-hover:scale-110 transition-transform origin-left">
              {fac.icon}
            </div>
            <h3 className="text-2xl font-bold text-white mb-4 font-display">{fac.title}</h3>
            <p className="text-zinc-400 leading-relaxed">{fac.desc}</p>
            
            <ul className="mt-6 space-y-3 pt-6 border-t border-white/10">
              {fac.perks.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-zinc-300 font-medium">
                  <CheckCircle2 size={18} className="text-primary" /> {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
