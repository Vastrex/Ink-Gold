import React from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center p-margin-mobile md:p-margin-desktop">
        <div className="max-w-4xl w-full text-center flex flex-col items-center gap-lg">
          <h1 className="text-display-lg mobile:text-display-lg md:text-display-lg font-display-lg text-primary tracking-tight">
            Premium Tattoo Scheduling
          </h1>
          <p className="text-body-lg text-on-surface-variant max-w-2xl">
            Streamline your booking process. Manage appointments, availability, and payments all in one sleek dashboard designed exclusively for tattoo artists.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-md w-full sm:w-auto">
            <Link 
              href="/book"
              className="px-8 py-4 rounded-lg bg-secondary-container text-on-secondary-container font-label-md uppercase tracking-[0.1em] font-black hover:bg-secondary-fixed transition-all shadow-md hover:shadow-lg hover:-translate-y-1"
            >
              Book an Appointment
            </Link>
            <Link 
              href="/pricing"
              className="px-8 py-4 rounded-lg border border-outline-variant text-on-surface font-label-md uppercase tracking-[0.1em] font-black hover:bg-surface-container-low transition-all"
            >
              View Pro Plans
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
