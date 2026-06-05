'use client';

import React, { useEffect, useState } from 'react';
import AppointmentCard from '@/components/AppointmentCard';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Link from 'next/link';

type Appointment = {
  id: string;
  time: string; // e.g. "10:00 AM - 1:00 PM"
  clientName: string;
  tattooStyle: string;
  status: 'Confirmed' | 'Consultation' | 'Cancelled' | 'Pending';
};

export default function DashboardPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    // Fetch today's appointments – replace with real endpoint as needed
    const fetchAppointments = async () => {
      try {
        const res = await fetch('/api/appointments?today=true');
        const data = await res.json();
        if (Array.isArray(data.appointments)) setAppointments(data.appointments);
      } catch (error) {
        console.error('Failed to load appointments', error);
      }
    };
    fetchAppointments();
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center py-12 px-4 md:px-12">
      <Card className="w-full max-w-7xl mb-8">
        <div className="flex items-center justify-between p-6">
          <h1 className="text-4xl font-black text-foreground">Dashboard</h1>
          <Link href="/book">
            <Button variant="primary" size="lg" className="flex items-center gap-2">
              <span className="material-symbols-outlined">add</span>
              Add Availability
            </Button>
          </Link>
        </div>
      </Card>

      <Card className="w-full max-w-7xl">
        <div className="p-6 border-b border-surface-border flex justify-between items-center">
          <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary-container" style={{ fontVariationSettings: "'FILL' 1" }}>today</span>
            Today's Lineup
          </h2>
          <span className="bg-secondary-container text-on-secondary-container text-xs font-bold px-2 py-1 rounded-full">
            {appointments.length} Sessions
          </span>
        </div>
        <div className="p-6 flex flex-col gap-4">
          {appointments.length === 0 ? (
            <p className="text-body-md text-on-surface-variant">No appointments scheduled for today.</p>
          ) : (
            appointments.map((appt) => (
              <AppointmentCard
                key={appt.id}
                time={appt.time}
                clientName={appt.clientName}
                tattooStyle={appt.tattooStyle}
                status={appt.status}
              />
            ))
          )}
        </div>
      </Card>
    </div>
  );
}
