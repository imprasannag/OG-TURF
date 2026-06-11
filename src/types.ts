export enum AppScreen {
  HOME = 'home',
  BOOKING = 'booking',
  ADMIN = 'admin',
  ABOUT = 'about',
  FACILITIES = 'facilities'
}

export interface Slot {
  id: string;
  time: string;
  status: 'available' | 'booked' | 'blocked';
  duration: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  initials: string;
  comment: string;
  rating: number;
}

export interface Booking {
  id: string;
  customerName: string;
  phone: string;
  date: string;
  slots: string[];
  game: 'Football' | 'Cricket' | 'Event';
  amount: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  paymentMethod: 'upi' | 'cash' | 'razorpay';
  paymentId?: string;
  createdAt: string;
}
