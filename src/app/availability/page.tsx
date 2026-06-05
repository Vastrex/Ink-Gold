'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Calendar from '@/components/Calendar';
import AvailabilitySlots from '@/components/AvailabilitySlots';

export default function AvailabilityPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);

  // Load existing slots for the selected date (placeholder API)
  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const res = await fetch(`/api/availability?date=${selectedDate.toISOString().split('T')[0]}`);
        const data = await res.json();
        if (Array.isArray(data.slots)) setAvailableSlots(data.slots);
      } catch (e) {
        console.error(e);
        setAvailableSlots([]);
      }
    };
    fetchSlots();
  }, [selectedDate]);

  const handleSave = async () => {
    try {
      await fetch('/api/availability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: selectedDate.toISOString().split('T')[0], slots: availableSlots }),
      });
      alert('Availability saved');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto p-margin-mobile md:p-margin-desktop py-lg">
        <h1 className="text-headline-lg mobile:text-headline-lg md:text-headline-lg text-primary mb-lg">
          Manage Availability
        </h1>
        <div className="grid lg:grid-cols-2 gap-lg">
          <div className="bg-surface-container-lowest rounded-lg shadow-md p-md border border-surface-container-high">
            <Calendar selectedDate={selectedDate} onDateChange={setSelectedDate} />
          </div>
          <div className="flex flex-col gap-lg">
            <AvailabilitySlots
              slots={availableSlots}
              selectedSlot={null}
              onSelect={() => {}}
            />
            <button
              onClick={handleSave}
              className="w-full py-4 rounded-lg bg-secondary-container text-on-secondary-container font-label-md uppercase tracking-[0.1em] font-black hover:bg-secondary-fixed transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              Save Availability
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
