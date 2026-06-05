'use client';

import React, { useState, useEffect } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
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
    <div className="min-h-screen bg-background flex flex-col items-center py-12 px-4 md:px-12">
      <Card className="w-full max-w-7xl mb-8">
        <div className="p-6 border-b border-surface-border flex justify-between items-center">
          <h1 className="text-4xl font-black text-foreground">Manage Availability</h1>
        </div>
        <Card className="p-6">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-surface-container-lowest rounded-2xl shadow-md p-6 border border-surface-border">
              <Calendar selectedDate={selectedDate} onDateChange={setSelectedDate} />
            </div>
            <div className="flex flex-col gap-6">
              <AvailabilitySlots
                slots={availableSlots}
                selectedSlot={null}
                onSelect={() => {}}
              />
              <Button
                onClick={handleSave}
                variant="primary"
                size="lg"
                className="w-full"
              >
                Save Availability
              </Button>
            </div>
          </div>
        </Card>
      </Card>
    </div>
  );
}
