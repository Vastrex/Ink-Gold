'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Calendar from '@/components/Calendar';
import AvailabilitySlots from '@/components/AvailabilitySlots';
import BookingForm from '@/components/BookingForm';
import { useRouter } from 'next/navigation';

export default function BookPage() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [clientInfo, setClientInfo] = useState({ name: '', email: '', phone: '', notes: '' });
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);

  useEffect(() => {
    // Fetch available slots for the selected date
    const fetchSlots = async () => {
      try {
        const res = await fetch(`/api/availability?date=${selectedDate.toISOString().split('T')[0]}`);
        const data = await res.json();
        if (data.slots) setAvailableSlots(data.slots);
      } catch (e) {
        console.error(e);
      }
    };
    fetchSlots();
  }, [selectedDate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      date: selectedDate.toISOString().split('T')[0],
      time: selectedSlot,
      ...clientInfo,
    };
    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) router.push('/success');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto p-margin-mobile md:p-margin-desktop py-lg">
        <h1 className="text-headline-lg mobile:text-headline-lg md:text-headline-lg text-primary mb-lg">
          Book an Appointment
        </h1>
        <div className="grid lg:grid-cols-2 gap-lg">
          {/* Left column: Calendar + Form */}
          <div className="flex flex-col gap-lg">
            <div className="bg-surface-container-lowest rounded-lg shadow-md p-md border border-surface-container-high">
              <Calendar selectedDate={selectedDate} onDateChange={setSelectedDate} />
            </div>
            <div className="bg-surface-container-lowest rounded-lg shadow-md p-md border border-surface-container-high">
              <BookingForm
                clientInfo={clientInfo}
                setClientInfo={setClientInfo}
                onSubmit={handleSubmit}
                selectedSlot={selectedSlot}
              />
            </div>
          </div>
          {/* Right column: Time slots */}
          <div className="flex flex-col gap-lg h-full">
            <AvailabilitySlots
              slots={availableSlots}
              selectedSlot={selectedSlot}
              onSelect={setSelectedSlot}
            />
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!selectedSlot || !clientInfo.name}
              className="w-full py-4 rounded-lg bg-secondary-container text-on-secondary-container font-label-md uppercase tracking-[0.1em] font-black hover:bg-secondary-fixed transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
            >
              Submit Booking
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
