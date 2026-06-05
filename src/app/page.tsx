import React from 'react';
import Button from '@/components/ui/Button';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem)]">
      <div className="w-full max-w-4xl text-center flex flex-col items-center gap-8 px-6 relative">
        {/* Glow effect behind text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-gold-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />
        
        <h1 className="text-5xl md:text-7xl font-black text-foreground tracking-tighter leading-tight drop-shadow-sm">
          Premium Tattoo <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-500 to-gold-600">
            Scheduling
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted max-w-2xl font-medium leading-relaxed">
          Streamline your booking process. Manage appointments, availability, and payments all in one sleek dashboard designed exclusively for top-tier tattoo artists.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 mt-6 w-full sm:w-auto">
          <Button href="/book" variant="primary" size="lg" className="w-full sm:w-auto">
            Book an Appointment
          </Button>
          <Button href="/pricing" variant="outline" size="lg" className="w-full sm:w-auto">
            View Pro Plans
          </Button>
        </div>
      </div>
    </div>
  );
}
