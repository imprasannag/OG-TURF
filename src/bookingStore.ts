import { Booking } from './types';
import { db } from './firebase';
import { collection, onSnapshot, doc, setDoc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';

const COLLECTION_NAME = 'bookings';

export const subscribeToBookings = (callback: (bookings: Booking[]) => void) => {
  const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
  
  return onSnapshot(q, (snapshot) => {
    const bookings: Booking[] = [];
    snapshot.forEach((doc) => {
      bookings.push({ id: doc.id, ...doc.data() } as Booking);
    });
    callback(bookings);
  }, (error) => {
    console.error("Error fetching bookings:", error);
    callback([]);
  });
};

export const saveBooking = async (booking: Booking) => {
  try {
    // If we want the document ID to match the booking.id, we use setDoc
    const bookingRef = doc(db, COLLECTION_NAME, booking.id);
    await setDoc(bookingRef, booking);
  } catch (error) {
    console.error("Error saving booking:", error);
    throw error;
  }
};

export const updateBookingStatus = async (id: string, status: Booking['status']) => {
  try {
    const bookingRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(bookingRef, { status });
  } catch (error) {
    console.error("Error updating booking status:", error);
    throw error;
  }
};

export const updateBooking = async (id: string, updates: Partial<Booking>) => {
  try {
    const bookingRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(bookingRef, updates);
  } catch (error) {
    console.error("Error updating booking:", error);
    throw error;
  }
};

export const deleteBookingRecord = async (id: string) => {
  try {
    const bookingRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(bookingRef);
  } catch (error) {
    console.error("Error deleting booking:", error);
    throw error;
  }
};
