'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import AppointmentCard from '@/components/AppointmentCard';
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
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto p-margin-mobile md:p-margin-desktop py-lg">
        {/* Header */}
        <div className="flex items-center justify-between mb-lg">
          <h1 className="text-display-lg font-display-lg text-primary">Dashboard</h1>
          <Link
            href="/book"
            className="bg-[#d4af37] text-primary px-6 py-3 rounded-lg shadow-md hover:opacity-90 hover:shadow-lg transition-all active:scale-95 flex items-center gap-2 font-label-md text-label-md uppercase tracking-wider font-bold"
          >
            <span className="material-symbols-outlined">add</span>
            Add Availability
          </Link>
        </div>

        {/* Today's appointments section */}
        <section className="bg-surface-container-lowest rounded-xl shadow-md border border-outline-variant overflow-hidden">
          <div className="p-5 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
            <h2 className="text-headline-md font-headline-md text-primary flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary-container" style={{ fontVariationSettings: "'FILL' 1" }}>
                today
              </span>
              Today's Lineup
            </h2>
            <span className="bg-secondary-container text-on-secondary-container text-xs font-bold px-2 py-1 rounded-full">
              {appointments.length} Sessions
            </span>
          </div>
          <div className="p-5 flex flex-col gap-4">
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
        </section>
      </main>
    </div>
  );
}
