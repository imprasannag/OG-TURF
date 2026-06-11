import { MapPin, Info, Phone, Mail, Award, Users, Trophy, Clock } from 'lucide-react';

export default function AboutScreen() {
  return (
    <div className="w-full">
      {/* Hero Header */}
      <section className="relative py-24 px-6 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="inline-block px-4 py-1.5 mb-6 glass-card rounded-full border-primary/30">
            <span className="text-primary font-bold text-xs tracking-widest uppercase font-display">Who We Are</span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-black text-white mb-6">Built for the Elite</h1>
          <p className="text-zinc-500 max-w-2xl text-lg leading-relaxed">
            OG Turf Madurai isn't just a sports venue; it's a statement. We provide precision-engineered sports infrastructure for those who take their game seriously.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 max-w-7xl mx-auto flex flex-wrap justify-between gap-12 border-b border-white/5">
          <StatBox icon={<Users />} label="Active Members" value="2,400+" />
          <StatBox icon={<Trophy />} label="Tournaments" value="150+" />
          <StatBox icon={<Award />} label="Elite Coaches" value="12" />
          <StatBox icon={<Info />} label="Area" value="12,000 SQ FT" />
      </section>

      {/* Detailed Info */}
      <section className="py-24 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">
        <div className="flex flex-col gap-8">
          <div className="space-y-4">
            <h2 className="font-display text-4xl font-black text-white">Our Facility</h2>
            <p className="text-zinc-400 leading-relaxed font-display">
              Located in the heart of Madurai, our facility features dual-tone FIFA-certified monofilament synthetic grass. The shock-absorbing layer underneath is designed to reduce injury risk while maintaining high-speed ball responsiveness.
            </p>
          </div>
          
          <div className="space-y-12">
            <FacilityDetail 
              title="Professional Lighting" 
              desc="Stadium-grade LED floodlights ensuring shadow-free visibility for high-intensity night matches." 
            />
            <FacilityDetail 
              title="Amenties & Support" 
              desc="Fully equipped changing rooms, premium water stations, and 24/7 CCTV surveillance for athlete security." 
            />
          </div>
        </div>

        <div className="glass-card rounded-3xl p-10 flex flex-col gap-10">
          <div className="space-y-2">
            <h3 className="font-display text-2xl font-bold text-white">Visit The Arena</h3>
            <p className="text-zinc-500 text-sm">Find us at the prime sporting hub of Madurai.</p>
          </div>

          <div className="space-y-6">
            <ContactLink icon={<MapPin />} label="Address" value="OG TURF MADURAI, subway, OG SPORTS AND INFRA, Paravai, main road, near paravai, Adalai, Madurai, Tamil Nadu 625402" />
            <ContactLink icon={<Phone />} label="Phone" value="+91 999 444 2221" />
            <ContactLink icon={<Mail />} label="Email" value="play@ogturfmadurai.com" />
          </div>

          <div className="mt-auto h-64 rounded-2xl overflow-hidden border border-white/10 relative group">
            <iframe 
              src="https://maps.google.com/maps?q=OG%20TURF%20MADURAI,%20Paravai,%20Madurai&t=&z=14&ie=UTF8&iwloc=&output=embed" 
              className="w-full h-full border-0 filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <div className="absolute bottom-6 left-0 right-0 flex justify-center pointer-events-none">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  window.open('https://maps.google.com/?q=OG+TURF+MADURAI,+subway,+OG+SPORTS+AND+INFRA+,+Paravai,+main+road,+near+paravai,+Adalai,+Madurai,+Tamil+Nadu+625402', '_blank');
                }}
                className="bg-primary text-black font-black px-6 py-3 rounded-xl shadow-[0_0_20px_rgba(57,255,20,0.3)] hover:scale-105 transition-transform flex items-center gap-2 pointer-events-auto"
              >
                <MapPin size={18} /> Get Directions
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing placeholder */}
      <section className="py-24 px-6 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-4xl font-black text-center text-white mb-16 underline decoration-primary decoration-4 underline-offset-8">Precision Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PriceCard tier="Day Mode" time="06:00 - 16:00" price="₹800/hr" features={['Professional Pitch', 'Changing Rooms', 'Water Stations']} />
            <PriceCard tier="Prime Time" time="17:00 - 23:00" price="₹1,200/hr" highlight features={['All Day Benefits', 'Stadium Lighting', 'HD Recording (Opt)']} />
            <PriceCard tier="Elite Night" time="23:00 - 02:00" price="₹1,500/hr" features={['Excluisve Access', 'Dynamic Lighting', 'Late Night Support']} />
          </div>
        </div>
      </section>
    </div>
  );
}

function StatBox({ icon, label, value }: any) {
  return (
    <div className="flex items-center gap-6">
      <div className="text-primary">{icon}</div>
      <div>
        <div className="text-2xl font-black text-white font-display uppercase tracking-tight">{value}</div>
        <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{label}</div>
      </div>
    </div>
  );
}

function FacilityDetail({ title, desc }: any) {
  return (
    <div className="flex gap-6">
      <div className="w-1.5 h-12 bg-primary neon-glow rounded-full shrink-0"></div>
      <div>
        <h4 className="text-white font-bold text-lg mb-1">{title}</h4>
        <p className="text-zinc-500 text-sm">{desc}</p>
      </div>
    </div>
  );
}

function ContactLink({ icon, label, value }: any) {
  return (
    <div className="flex gap-4">
      <div className="text-primary/60">{icon}</div>
      <div>
        <div className="text-[10px] text-zinc-500 uppercase font-black tracking-widest leading-none mb-1">{label}</div>
        <div className="text-white font-bold font-display">{value}</div>
      </div>
    </div>
  );
}

function PriceCard({ tier, time, price, features, highlight = false }: any) {
  return (
    <div className={`p-8 rounded-3xl border ${highlight ? 'bg-primary/5 border-primary neon-glow/5 relative overflow-hidden' : 'glass-card border-white/5'}`}>
      {highlight && <div className="absolute top-0 right-0 bg-primary text-black px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-bl-xl">Most Popular</div>}
      <h3 className="text-xl font-black text-white mb-2 font-display">{tier}</h3>
      <div className="text-zinc-500 text-sm mb-6 flex items-center gap-2"><Clock size={14}/> {time}</div>
      <div className="text-4xl font-black text-primary mb-8 font-display">{price}</div>
      <ul className="space-y-4">
        {features.map((f: string) => (
          <li key={f} className="flex items-center gap-3 text-sm text-zinc-300">
            <div className="w-1 h-1 bg-primary rounded-full"></div>
            {f}
          </li>
        ))}
      </ul>
      <button className={`w-full mt-10 py-4 rounded-xl font-bold transition-all ${highlight ? 'bg-primary text-black hover:opacity-90' : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'}`}>
        Book This Tier
      </button>
    </div>
  );
}
