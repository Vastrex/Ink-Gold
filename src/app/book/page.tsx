'use client';

import React, { useState, useEffect } from 'react';
import Calendar from '@/components/Calendar';
import AvailabilitySlots from '@/components/AvailabilitySlots';
import BookingForm from '@/components/BookingForm';
import Button from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

export default function BookPage() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [clientInfo, setClientInfo] = useState({ name: '', email: '', phone: '', notes: '' });
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);

  useEffect(() => {
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
    <div className="min-h-screen bg-background flex flex-col items-center py-12 px-4 md:px-12">
      <h1 className="text-4xl md:text-5xl font-black text-foreground mb-10">
        Book an Appointment
      </h1>
      <div className="grid lg:grid-cols-2 gap-12 w-full max-w-7xl">
        {/* Left column: Calendar and Form */}
        <div className="flex flex-col gap-8">
          <div className="bg-surface-container-lowest rounded-2xl shadow-md p-6 border border-surface-border">
            <Calendar selectedDate={selectedDate} onDateChange={setSelectedDate} />
          </div>
          <div className="bg-surface-container-lowest rounded-2xl shadow-md p-6 border border-surface-border">
            <BookingForm
              clientInfo={clientInfo}
              setClientInfo={setClientInfo}
              onSubmit={handleSubmit}
              selectedSlot={selectedSlot}
            />
          </div>
        </div>
        {/* Right column: Time slots */}
        <div className="flex flex-col gap-8 h-full">
          <AvailabilitySlots
            slots={availableSlots}
            selectedSlot={selectedSlot}
            onSelect={setSelectedSlot}
          />
          <Button
            onClick={handleSubmit}
            variant="primary"
            size="lg"
            disabled={!selectedSlot || !clientInfo.name}
            className="w-full"
          >
            Submit Booking
          </Button>
        </div>
      </div>
    </div>
  );
}
