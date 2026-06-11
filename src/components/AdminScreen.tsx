import { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Wallet, 
  Zap, 
  Search, 
  Bell, 
  Plus, 
  LayoutDashboard, 
  Calendar, 
  ClipboardList, 
  BarChart3,
  MoreVertical,
  Filter,
  CheckCircle2,
  XCircle,
  X,
  Edit2,
  Save
} from 'lucide-react';
import { subscribeToBookings, updateBookingStatus, deleteBookingRecord, updateBooking, saveBooking } from '../bookingStore';
import { Booking } from '../types';

const formatTime = (h: number) => {
  const isPM = h >= 12 && h < 24;
  const h12 = h % 12 || 12;
  return `${h12 < 10 ? '0' : ''}${h12}:00 ${isPM ? 'PM' : 'AM'}`;
};

const ALL_SLOTS = Array.from({ length: 24 }, (_, i) => {
  const time = `${formatTime(i)} to ${formatTime(i + 1 === 24 ? 0 : i + 1)}`;
  let period = 'Night';
  if (i >= 5 && i < 12) period = 'Morning';
  else if (i >= 12 && i < 17) period = 'Afternoon';
  else if (i >= 17 && i < 21) period = 'Evening';

  let price = 500;
  if (period === 'Evening') price = 700;
  if (period === 'Night') price = 800;

  return { id: `${i}`, time, price };
});

export default function AdminScreen() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [activeTab, setActiveTab] = useState<'Dashboard' | 'Bookings'>('Dashboard');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedAdminSlots, setSelectedAdminSlots] = useState<string[]>([]);
  const [isBooking, setIsBooking] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToBookings((data) => {
      setBookings(data);
    });
    return () => unsubscribe();
  }, []);

  const bookedSlotIds = bookings
    .filter(b => b.date === selectedDate && b.status !== 'cancelled')
    .flatMap(b => b.slots);

  const handleAdminBooking = async () => {
    if (selectedAdminSlots.length === 0) return;
    
    setIsBooking(true);
    const bookingId = "ADM" + Math.floor(10000 + Math.random() * 90000);
    
    const totalAmount = ALL_SLOTS
      .filter(s => selectedAdminSlots.includes(s.id))
      .reduce((acc, curr) => acc + curr.price, 0);

    const bookingData: Booking = {
      id: bookingId,
      customerName: "Internal Booking",
      phone: "Admin",
      date: selectedDate,
      slots: selectedAdminSlots,
      game: 'Cricket',
      amount: totalAmount,
      status: 'confirmed',
      paymentMethod: 'cash',
      createdAt: new Date().toISOString()
    };

    try {
      await saveBooking(bookingData);
      setSelectedAdminSlots([]);
      alert("Slots booked successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to book slots.");
    } finally {
      setIsBooking(false);
    }
  };

  const handleCancel = async (id: string) => {
    if(confirm('Are you sure you want to cancel this booking?')) {
      await updateBookingStatus(id, 'cancelled');
    }
  };

  const handleDelete = async (id: string) => {
    if(confirm('Are you sure you want to delete this booking entirely?')) {
      await deleteBookingRecord(id);
    }
  };

  const startEdit = (b: Booking) => {
    setEditingId(b.id);
    setEditForm(b);
  };

  const saveEdit = async () => {
    if (editingId && editForm) {
      await updateBooking(editingId, editForm);
      setEditingId(null);
    }
  };

  const [editForm, setEditForm] = useState<Partial<Booking>>({});

  const activeBookings = bookings.filter(b => b.status === 'confirmed');
  const todaysBookings = activeBookings.filter(b => b.date === selectedDate);
  const totalRevenue = activeBookings.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Sidebar (Existing Sidebar Code) */}
      <aside className="w-full lg:w-64 bg-zinc-950/80 border-r border-white/10 flex flex-col lg:min-h-screen">
        <div className="p-6 flex items-center gap-3 hidden lg:flex">
          <div className="w-10 h-10 rounded bg-primary flex items-center justify-center neon-glow cursor-pointer" onClick={() => window.location.href = '/'}>
            <Zap className="text-black" size={20} fill="currentColor" />
          </div>
          <div>
            <h2 className="text-lg font-black text-white leading-none font-display">OG Admin</h2>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1 font-bold">Elite Performance</p>
          </div>
        </div>

        <nav className="flex lg:flex-col mt-2 lg:mt-6 px-4 space-y-0 lg:space-y-1 gap-2 lg:gap-0 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0">
          <NavItem 
            active={activeTab === 'Dashboard'} 
            onClick={() => setActiveTab('Dashboard')}
            icon={<LayoutDashboard size={20} />} 
            label="Dashboard" 
          />
          <NavItem 
            active={activeTab === 'Bookings'} 
            onClick={() => setActiveTab('Bookings')}
            icon={<ClipboardList size={20} />} 
            label="All Bookings" 
          />
        </nav>

        <div className="p-4 border-t border-white/5 space-y-6 mt-auto hidden lg:block">
          <button onClick={() => window.location.href = '/'} className="w-full bg-white/5 text-white font-bold py-3 rounded-xl hover:bg-white/10 transition-colors text-sm">
            Exit to Website
          </button>
          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 cursor-pointer group transition-colors">
            <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-primary font-bold border border-primary/20">
              AD
            </div>
            <div>
              <p className="text-sm font-bold text-white">Admin Profile</p>
              <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-tighter">Super Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Content Area */}
      <main className="flex-1 w-full bg-background p-4 md:p-8 overflow-y-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-black text-white font-display">Elite Dashboard</h1>
            <p className="text-zinc-500 text-sm mt-1">Manage turf bookings, schedules and performance.</p>
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="flex-1 md:flex-none glass-card px-4 py-2 rounded-xl flex items-center gap-3 border-white/5 focus-within:border-primary/50 transition-colors">
              <Search className="text-zinc-500" size={18} />
              <input 
                type="text" 
                placeholder="Search..."
                className="bg-transparent border-none focus:ring-0 text-sm w-full md:w-48 text-white outline-none"
              />
            </div>
            <button className="md:hidden px-4 py-2 bg-white/5 rounded-xl text-white font-bold text-sm" onClick={() => window.location.href = '/'}>
              Exit
            </button>
          </div>
        </header>

        {activeTab === 'Dashboard' ? (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <StatCard label="Total Active Bookings" value={activeBookings.length} icon={<TrendingUp size={20} className="text-primary" />} />
              <StatCard label="Total Revenue" value={`₹${totalRevenue.toLocaleString()}`} icon={<Wallet size={20} className="text-primary" />} />
              <StatCard label="Today's Slots" value={todaysBookings.reduce((a,b)=>a+b.slots.length,0)} progress={Math.min(100, todaysBookings.length * 5)} icon={<Zap size={20} className="text-primary" />} />
            </div>

            {/* Main Workspace */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1 space-y-6">
                <div className="glass-card p-6 rounded-2xl">
                  <h3 className="font-display text-lg text-white font-bold mb-4">Slot Manager</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block">Select Date</label>
                      <input 
                        type="date" 
                        value={selectedDate}
                        onChange={e => setSelectedDate(e.target.value)}
                        className="w-full bg-zinc-950/50 border border-white/10 rounded-xl p-3 text-white focus:border-primary outline-none text-sm"
                      />
                    </div>
                    
                    <div className="pt-4 border-t border-white/5">
                      <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-4">Quick Book / Block Slots</label>
                      <div className="grid grid-cols-3 gap-2 mb-6 max-h-64 overflow-y-auto custom-scrollbar pr-2">
                        {ALL_SLOTS.map(slot => {
                          const isBooked = bookedSlotIds.includes(slot.id);
                          const isSelected = selectedAdminSlots.includes(slot.id);
                          // Extract just the start time for the label (e.g. "06:00 AM")
                          const label = slot.time.split(' to ')[0];
                          return (
                            <button
                              key={slot.id}
                              disabled={isBooked}
                              onClick={() => setSelectedAdminSlots(prev => 
                                prev.includes(slot.id) ? prev.filter(s => s !== slot.id) : [...prev, slot.id]
                              )}
                              className={`py-2 px-1 rounded text-[9px] font-black border transition-all ${
                                isBooked ? 'bg-red-500/20 border-red-500/40 text-red-400 cursor-not-allowed' :
                                isSelected ? 'bg-primary/20 border-primary text-primary shadow-[0_0_10px_rgba(198,255,0,0.2)]' :
                                'bg-white/5 border-white/10 text-zinc-400 hover:border-white/30'
                              }`}
                            >
                              {label}
                            </button>
                          );
                        })}
                      </div>
                      <button 
                        onClick={handleAdminBooking}
                        disabled={selectedAdminSlots.length === 0 || isBooking}
                        className="w-full bg-primary text-black font-bold py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-all flex items-center justify-center gap-2 text-xs"
                      >
                        <Plus size={16} /> {isBooking ? 'Processing...' : 'Book Selected'}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl overflow-hidden h-64 border border-white/10 relative group bg-zinc-950">
                  <img 
                    src="/2026-04-08 (2).webp"
                    alt="Turf View"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-primary text-black px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-tight">Main Pitch</span>
                    <h4 className="text-white font-black font-display">Stadium Alpha</h4>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2 glass-card rounded-2xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-display text-lg text-white font-bold">Today's Schedule ({selectedDate})</h3>
                </div>
                
                <div className="space-y-3">
                  {todaysBookings.length === 0 ? (
                    <div className="p-8 text-center text-zinc-500 border border-dashed border-white/10 rounded-xl">
                      No bookings for this date yet.
                    </div>
                  ) : (
                    todaysBookings.map((b) => (
                      <div key={b.id} className="p-4 rounded-xl border border-white/10 bg-black/40 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                          <p className="font-bold text-white text-lg">{b.customerName}</p>
                          <p className="text-zinc-400 text-sm">{b.game} • {b.phone}</p>
                          <div className="flex gap-2 mt-2">
                            {b.slots.map(s => (
                              <span key={s} className="px-2 py-1 bg-white/10 rounded text-[10px] font-bold text-zinc-300">Slot {s}</span>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-3 w-full md:w-auto">
                          <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold border border-primary/30">₹{b.amount}</span>
                          <button onClick={() => handleCancel(b.id)} className="ml-auto md:ml-0 p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors" title="Cancel Booking">
                            <XCircle size={18} />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-display text-xl text-white font-bold mb-6">All Bookings Registry</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead>
                  <tr className="border-b border-white/10 text-zinc-500 uppercase tracking-wider text-[10px]">
                    <th className="pb-3 pr-4 font-bold">Booking ID</th>
                    <th className="pb-3 px-4 font-bold">Customer</th>
                    <th className="pb-3 px-4 font-bold">Game</th>
                    <th className="pb-3 px-4 font-bold">Date & Slots</th>
                    <th className="pb-3 px-4 font-bold">Amount</th>
                    <th className="pb-3 px-4 font-bold">Status</th>
                    <th className="pb-3 pl-4 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b) => (
                    <tr key={b.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                      <td className="py-4 pr-4 font-mono text-zinc-400">#{b.id}</td>
                      <td className="py-4 px-4">
                        {editingId === b.id ? (
                          <input type="text" value={editForm.customerName || ''} onChange={e => setEditForm({...editForm, customerName: e.target.value})} className="bg-black/50 border border-white/20 rounded p-1 text-white w-full" />
                        ) : (
                          <div className="font-bold text-white">{b.customerName} <span className="block text-[10px] text-zinc-500 font-normal">{b.phone}</span></div>
                        )}
                      </td>
                      <td className="py-4 px-4 text-zinc-300">
                        {editingId === b.id ? (
                          <select value={editForm.game} onChange={e => setEditForm({...editForm, game: e.target.value as any})} className="bg-black/50 border border-white/20 rounded p-1 text-white">
                            <option value="Football">Football</option>
                            <option value="Cricket">Cricket</option>
                            <option value="Event">Event</option>
                          </select>
                        ) : (
                          b.game
                        )}
                      </td>
                      <td className="py-4 px-4 text-zinc-300">
                        {editingId === b.id ? (
                          <input type="date" value={editForm.date} onChange={e => setEditForm({...editForm, date: e.target.value})} className="bg-black/50 border border-white/20 rounded p-1 text-white" />
                        ) : (
                          <div>{b.date} <span className="block text-primary text-[10px]">{b.slots.length} slots</span></div>
                        )}
                      </td>
                      <td className="py-4 px-4 font-bold text-white">₹{b.amount} <span className="block text-[10px] text-zinc-500 font-normal uppercase">{b.paymentMethod}</span></td>
                      <td className="py-4 px-4">
                        {editingId === b.id ? (
                          <select value={editForm.status} onChange={e => setEditForm({...editForm, status: e.target.value as any})} className="bg-black/50 border border-white/20 rounded p-1 text-white">
                            <option value="confirmed">Confirmed</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="pending">Pending</option>
                          </select>
                        ) : (
                          <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                            b.status === 'confirmed' ? 'bg-primary/20 text-primary' : b.status === 'cancelled' ? 'bg-red-500/20 text-red-400' : 'bg-orange-500/20 text-orange-400'
                          }`}>
                            {b.status}
                          </span>
                        )}
                      </td>
                      <td className="py-4 pl-4 text-right flex items-center justify-end gap-2">
                        {editingId === b.id ? (
                          <button onClick={saveEdit} className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors" title="Save">
                            <Save size={16} />
                          </button>
                        ) : (
                          <button onClick={() => startEdit(b)} className="p-2 text-zinc-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors" title="Edit record">
                            <Edit2 size={16} />
                          </button>
                        )}
                        <button onClick={() => handleDelete(b.id)} className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors" title="Delete record">
                          <X size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {bookings.length === 0 && (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-zinc-500">No bookings found in the database.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function NavItem({ icon, label, active = false, onClick }: { icon: any, label: string, active?: boolean, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-display whitespace-nowrap lg:whitespace-normal ${
      active ? 'bg-primary/10 text-primary border-l-0 lg:border-l-4 lg:border-r-0 border-b-4 lg:border-b-0 border-primary font-bold' : 'text-zinc-500 hover:bg-white/5'
    }`}>
      {icon}
      <span>{label}</span>
    </button>
  );
}

function StatCard({ label, value, change, progress, icon }: any) {
  return (
    <div className="glass-card p-6 rounded-2xl relative overflow-hidden group">
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all"></div>
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{label}</span>
        {icon}
      </div>
      <div className="flex items-end gap-3 flex-wrap font-display">
        <h3 className="text-3xl font-black text-white">{value}</h3>
        {change && <span className="text-[10px] text-primary pb-1 font-bold">{change}</span>}
        {progress !== undefined && (
          <div className="w-full mt-4 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
            <div className="h-full bg-primary neon-glow" style={{ width: `${progress}%` }}></div>
          </div>
        )}
      </div>
    </div>
  );
}
