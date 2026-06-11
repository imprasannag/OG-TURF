import { useState, useEffect, useMemo } from 'react';
import { Calendar, User, Phone, Clock, CheckCircle2, CloudSun, Sunset, Moon, Sun, Ticket, Download, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { saveBooking, subscribeToBookings } from '../bookingStore';
import { Booking } from '../types';

const formatTime = (h: number) => {
  const isPM = h >= 12 && h < 24;
  const h12 = h % 12 || 12;
  return `${h12 < 10 ? '0' : ''}${h12}:00 ${isPM ? 'PM' : 'AM'}`;
};

const generateSlots = () => {
  const slots = [];
  for (let i = 0; i <= 23; i++) {
    const time = `${formatTime(i)} to ${formatTime(i + 1 === 24 ? 0 : i + 1)}`;
    let period = 'Night';
    let icon = <Moon size={18} className="text-blue-400" />;
    
    if (i >= 5 && i < 12) { 
      period = 'Morning'; 
      icon = <Sun size={18} className="text-yellow-400" />; 
    } else if (i >= 12 && i < 17) { 
      period = 'Afternoon'; 
      icon = <CloudSun size={18} className="text-orange-400" />; 
    } else if (i >= 17 && i < 21) { 
      period = 'Evening'; 
      icon = <Sunset size={18} className="text-red-400" />; 
    }

    let price = 500;
    if (period === 'Evening') price = 700;
    if (period === 'Night') price = 800;

    slots.push({
      id: `${i}`,
      time,
      startHour: i,
      period,
      icon,
      price
    });
  }
  return slots;
};

const ALL_SLOTS = generateSlots();
const PERIODS = ['Morning', 'Afternoon', 'Evening', 'Night'];


declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function BookingScreen() {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [ticketData, setTicketData] = useState<Booking | null>(null);
  const [timeLeft, setTimeLeft] = useState(300);

  // Countdown timer logic when modal is open
  useEffect(() => {
    let timer: any;
    if (showModal && !success && !isProcessing) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setShowModal(false);
            setSelectedSlots([]);
            alert("Booking session expired. Please select slots again.");
            return 300;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (!showModal) {
      setTimeLeft(300); // Reset when closed
    }
    return () => clearInterval(timer);
  }, [showModal, success, isProcessing]);

  const formatCountdown = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };
  
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [allBookings, setAllBookings] = useState<Booking[]>([]);

  // Instantly reflect bookings from the store/firebase
  useEffect(() => {
    const unsubscribe = subscribeToBookings((bookings) => {
      setAllBookings(bookings);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const bookedForDate = allBookings
      .filter(b => b.date === selectedDate && b.status !== 'cancelled')
      .flatMap(b => b.slots);
      
    setBookedSlots(bookedForDate);
    // Remove selected slots if they just got booked by someone else (but not while we are processing our own payment)
    if (!isProcessing) {
      setSelectedSlots(prev => prev.filter(s => !bookedForDate.includes(s)));
    }
  }, [selectedDate, allBookings, isProcessing]);

  const handleSlotClick = (id: string) => {
    if (bookedSlots.includes(id)) return;
    setSelectedSlots(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const selectedSlotsData = useMemo(() => {
    return ALL_SLOTS.filter(s => selectedSlots.includes(s.id));
  }, [selectedSlots]);

  const totalAmount = useMemo(() => {
    return selectedSlotsData.reduce((sum, slot) => sum + slot.price, 0);
  }, [selectedSlotsData]);

  const handlePayment = async () => {
    setIsProcessing(true);

    const bookingId = "OGT" + Math.floor(10000 + Math.random() * 90000);

    const bookingData: Booking = {
      id: bookingId,
      customerName: name,
      phone,
      date: selectedDate,
      slots: selectedSlots,
      game: 'Cricket',
      amount: totalAmount,
      status: 'confirmed',
      paymentMethod: 'razorpay',
      createdAt: new Date().toISOString()
    };

    const options = {
      key: "rzp_test_Sld6VxdEJj2KzI",
      amount: totalAmount * 100,
      currency: "INR",
      name: "OG Turf Madurai",
      description: `Booking for ${selectedSlots.length} hours`,
      image: "/Logo.jpg",
      handler: function (response: any) {
        bookingData.paymentId = response.razorpay_payment_id;
        // Fire and forget save to avoid hanging if Firebase is offline
        saveBooking(bookingData).catch((e) => {
          console.error(e);
          setAllBookings(prev => [...prev, bookingData]); // Fallback local update
        });
        setTicketData(bookingData);
        setIsProcessing(false);
        setShowModal(false);
        setSuccess(true);
      },
      prefill: { name, contact: phone },
      theme: { color: "#39ff14" }
    };

    try {
      if (window.Razorpay) {
        const rzp1 = new window.Razorpay(options);
        rzp1.on('payment.failed', function (response: any){
          alert("Payment Failed: " + response.error.description);
          setIsProcessing(false);
        });
        rzp1.open();
      } else {
        throw new Error("Razorpay script not loaded");
      }
    } catch (error) {
      console.warn("Razorpay popup failed (likely due to missing backend order_id). Falling back to mock flow for testing.", error);
      setTimeout(() => {
        bookingData.paymentId = "mock_pay_" + bookingId;
        // Fire and forget save to avoid hanging if Firebase is offline
        saveBooking(bookingData).catch((e) => {
          console.error(e);
          setAllBookings(prev => [...prev, bookingData]); // Fallback local update
        });
        setTicketData(bookingData);
        setIsProcessing(false);
        setShowModal(false);
        setSuccess(true);
      }, 1500);
    }
  };

  const resetBooking = () => {
    setSuccess(false);
    setTicketData(null);
    setSelectedSlots([]);
    setName('');
    setPhone('');
  };

  if (success && ticketData) {
    return (
      <div className="min-h-screen flex items-center justify-center py-20 px-6">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }} 
          animate={{ scale: 1, opacity: 1, y: 0 }} 
          className="max-w-md w-full"
        >
          {/* Digital Ticket */}
          <motion.div 
            whileHover={{ y: -5 }}
            id="printable-ticket" 
            className="glass-card rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(57,255,20,0.15)] border border-white/20 relative transition-colors duration-500 hover:border-primary/40"
          >
            
            {/* Ticket Header */}
            <div className="bg-primary p-6 text-black flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black font-display tracking-tight">OG TURF</h2>
                <p className="text-sm font-bold opacity-80 uppercase tracking-widest">Entry Ticket</p>
              </div>
              <Ticket size={32} className="opacity-80" />
            </div>

            {/* Ticket Body */}
            <div className="p-8 bg-zinc-900 relative">
              {/* Dotted line separation effect */}
              <div className="absolute -top-3 left-0 right-0 h-6 flex justify-between px-[-10px] z-10">
                <div className="w-6 h-6 rounded-full bg-background -ml-3 border-r border-white/10"></div>
                <div className="flex-1 mx-4 border-t-2 border-dashed border-white/10 mt-3"></div>
                <div className="w-6 h-6 rounded-full bg-background -mr-3 border-l border-white/10"></div>
              </div>

              <div className="flex justify-center mb-6">
                 <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                    <CheckCircle2 size={32} />
                 </div>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Player Name</p>
                  <p className="text-xl text-white font-bold">{ticketData.customerName}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Date</p>
                    <p className="text-white font-bold">{new Date(ticketData.date).toLocaleDateString('en-GB')}</p>
                  </div>
                  <div>
                    <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Total Paid</p>
                    <p className="text-primary font-black text-lg">₹{ticketData.amount}</p>
                  </div>
                </div>

                <div>
                  <p className="text-zinc-500 text-xs uppercase tracking-wider mb-2">Booked Slots</p>
                  <div className="space-y-2">
                    {ALL_SLOTS.filter(s => ticketData.slots.includes(s.id)).map(slot => (
                      <div key={slot.id} className="bg-black/50 border border-white/10 rounded-lg p-3 text-sm text-white font-bold flex justify-between">
                        <span>{slot.time}</span>
                        <span className="text-primary">Confirmed</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* QR Code Placeholder / Barcode area */}
              <div className="mt-8 pt-6 border-t border-white/10 text-center relative overflow-hidden group">
                 <div className="absolute inset-0 bg-primary/5 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                 <p className="text-zinc-600 font-mono text-sm tracking-widest">{ticketData.id}</p>
              </div>
            </div>
          </motion.div>

          <div className="mt-8 space-y-4 print:hidden">
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => window.print()}
                className="w-full py-3 glass-card text-white font-bold rounded-xl hover:bg-white/5 transition-colors flex justify-center items-center gap-2 border border-white/10"
              >
                <Download size={20} /> Download
              </button>
              <button 
                onClick={() => {
                  const slotsText = ALL_SLOTS.filter(s => ticketData.slots.includes(s.id)).map(s => s.time).join(', ');
                  const text = `✅ *Your slot is confirmed at ${slotsText}*\n\n*Date:* ${new Date(ticketData.date).toLocaleDateString('en-GB')}\n*Time:* ${slotsText}\n*Amount:* ₹${ticketData.amount}\n*Location:* https://maps.google.com/?q=${encodeURIComponent('OG TURF MADURAI, subway, OG SPORTS AND INFRA , Paravai, main road, near paravai, Adalai, Madurai, Tamil Nadu 625402')}\n\nSee you at the pitch! ⚽`;
                  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
                }}
                className="w-full py-3 bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#128C7E] transition-colors flex justify-center items-center gap-2"
              >
                <MessageCircle size={20} /> WhatsApp
              </button>
            </div>
            <button onClick={resetBooking} className="w-full py-4 bg-primary text-black font-bold rounded-xl hover:bg-primary/90 transition-colors">
              Book Another Slot
            </button>
          </div>
          <style>{`
            @media print {
              body * { visibility: hidden; }
              #printable-ticket, #printable-ticket * { visibility: visible; }
              #printable-ticket { position: absolute; left: 0; top: 0; width: 100%; max-width: 500px; margin: 0 auto; box-shadow: none; border: 1px solid #ccc; }
            }
          `}</style>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Sidebar - Form */}
        <div className="lg:col-span-4">
          <div className="glass-card rounded-3xl p-6 sm:p-8 sticky top-28">
            <h2 className="text-3xl font-black font-display text-white mb-8 text-center">Book Your Slot</h2>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-zinc-400 font-bold text-sm flex items-center gap-2">
                  <User size={16} /> Your Name
                </label>
                <input 
                  type="text" 
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-zinc-400 font-bold text-sm flex items-center gap-2">
                  <Phone size={16} /> Contact (WhatsApp)
                </label>
                <input 
                  type="tel" 
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="WhatsApp Number"
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                />
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <label htmlFor="booking-date" className="text-zinc-400 font-bold text-sm flex items-center gap-2 cursor-pointer w-fit">
                    <Calendar size={16} /> Booking Date
                  </label>
                  <div className="relative">
                    <input 
                      id="booking-date"
                      type="date"
                      value={selectedDate}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => {
                        setSelectedDate(e.target.value);
                        setSelectedSlots([]);
                      }}
                      onClick={(e) => {
                        try {
                          if ('showPicker' in HTMLInputElement.prototype) {
                            (e.target as HTMLInputElement).showPicker();
                          }
                        } catch (err) {}
                      }}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:border-primary focus:ring-1 focus:ring-primary transition-all cursor-pointer [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert hover:bg-white/5"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 mt-6">
                <button
                  disabled={!name || !phone || selectedSlots.length === 0}
                  onClick={() => setShowModal(true)}
                  className="w-full bg-primary text-black py-4 rounded-xl font-bold text-lg hover:scale-[1.02] transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex justify-center items-center gap-2 shadow-[0_0_20px_rgba(57,255,20,0.2)]"
                >
                  <Calendar size={20} />
                  Review & Book
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Area - Slots Grid */}
        <div className="lg:col-span-8 glass-card rounded-3xl p-6 sm:p-8">
          <h2 className="text-2xl font-black font-display text-white mb-8">Select Slot Time</h2>
          
          <div className="space-y-10">
            {PERIODS.map(period => {
              const periodSlots = ALL_SLOTS.filter(s => s.period === period);
              if (periodSlots.length === 0) return null;
              
              return (
                <div key={period}>
                  <div className="flex items-center gap-3 mb-4">
                    {periodSlots[0].icon}
                    <h3 className="text-lg font-bold text-white">{period}</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {periodSlots.map(slot => {
                      const isBooked = bookedSlots.includes(slot.id);
                      const isSelected = selectedSlots.includes(slot.id);
                      
                      return (
                        <motion.button
                          layout
                          whileHover={!isBooked ? { scale: 1.05 } : {}}
                          whileTap={!isBooked ? { scale: 0.95 } : {}}
                          key={slot.id}
                          disabled={isBooked}
                          onClick={() => handleSlotClick(slot.id)}
                          className={`p-4 rounded-2xl flex flex-col items-center justify-center gap-2 border-2 transition-colors relative overflow-hidden ${
                            isBooked
                              ? 'bg-red-500/10 border-red-500/30 text-red-500 cursor-not-allowed shadow-[inset_0_0_20px_rgba(239,68,68,0.05)]'
                              : isSelected
                                ? 'bg-primary/10 border-primary shadow-[0_0_25px_rgba(57,255,20,0.25)]'
                                : 'bg-black/40 border-white/10 hover:border-primary/50 hover:shadow-[0_0_15px_rgba(57,255,20,0.1)] hover:bg-primary/5'
                          }`}
                        >
                          <motion.span layout className={`text-xs sm:text-sm font-bold text-center ${isSelected ? 'text-white' : isBooked ? 'text-red-400' : 'text-zinc-300'}`}>
                            {slot.time.split(' to ')[0]}<br/>to<br/>{slot.time.split(' to ')[1]}
                          </motion.span>
                          <motion.span layout className={`text-sm sm:text-base font-black ${isSelected ? 'text-primary' : isBooked ? 'text-red-500' : 'text-white'}`}>
                            {isBooked ? 'Booked' : `₹${slot.price}`}
                          </motion.span>
                          
                          <AnimatePresence>
                            {isSelected && (
                              <motion.div 
                                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                animate={{ opacity: 1, height: 'auto', marginTop: 4 }}
                                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                className="w-full pt-2 border-t border-primary/30 flex items-center justify-center gap-1 text-primary text-[10px] font-black uppercase tracking-widest"
                              >
                                <CheckCircle2 size={12} /> Selected
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-black/80 border border-primary/20 rounded-3xl p-8 max-w-md w-full shadow-[0_0_100px_rgba(0,0,0,0.8)] relative"
            >
              <h3 className="text-2xl font-black font-display text-white mb-6 text-center">Confirm Your Booking</h3>
              
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-center py-3 px-4 rounded-xl mb-6 font-bold flex items-center justify-center gap-2 animate-pulse">
                <Clock size={18} /> 
                <span>Slots reserved for <span className="font-mono text-xl">{formatCountdown(timeLeft)}</span></span>
              </div>

              <div className="bg-black/50 rounded-2xl p-6 space-y-4 mb-8 border border-white/5">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400 font-bold text-sm flex items-center gap-2"><User size={16}/> Name</span>
                  <span className="text-white font-bold">{name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400 font-bold text-sm flex items-center gap-2"><Calendar size={16}/> Date</span>
                  <span className="text-white font-bold">{new Date(selectedDate).toLocaleDateString('en-GB')}</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-zinc-400 font-bold text-sm flex items-center gap-2"><Clock size={16}/> Time</span>
                  <div className="text-right">
                    {selectedSlotsData.map(s => (
                      <div key={s.id} className="text-white font-bold text-sm">{s.time}</div>
                    ))}
                  </div>
                </div>
                <div className="pt-4 mt-4 border-t border-white/10 flex justify-between items-center">
                  <span className="text-zinc-400 font-bold text-sm flex items-center gap-2">Total Price</span>
                  <span className="text-primary font-black text-2xl">₹{totalAmount}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => setShowModal(false)}
                  className="py-3.5 rounded-xl font-bold text-white bg-white/5 hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="py-3.5 rounded-xl font-bold text-black bg-primary hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {isProcessing ? 'Processing...' : 'Confirm & Book'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
