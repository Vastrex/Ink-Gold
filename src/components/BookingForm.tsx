'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';

type ClientInfo = {
  name: string;
  email: string;
  phone: string;
  notes: string;
};

type BookingFormProps = {
  clientInfo: ClientInfo;
  setClientInfo: React.Dispatch<React.SetStateAction<ClientInfo>>;
  onSubmit: (e: React.FormEvent) => void;
  selectedSlot?: string | null;
};

export default function BookingForm({ clientInfo, setClientInfo, onSubmit }: BookingFormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setClientInfo((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="w-full">
      <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
        <span className="material-symbols-outlined text-gold-500">person</span>
        Client Details
      </h3>
      <form className="flex flex-col gap-5" onSubmit={onSubmit}>
        <Input
          id="name"
          label="Full Name"
          type="text"
          placeholder="John Doe"
          value={clientInfo.name}
          onChange={handleChange}
          required
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Input
            id="email"
            label="Email Address"
            type="email"
            placeholder="john@example.com"
            value={clientInfo.email}
            onChange={handleChange}
            required
          />
          <Input
            id="phone"
            label="Phone Number"
            type="tel"
            placeholder="(555) 000-0000"
            value={clientInfo.phone}
            onChange={handleChange}
          />
        </div>
        
        <div className="flex flex-col w-full">
          <label className="text-xs font-semibold tracking-wider uppercase text-muted mb-2">
            Design Notes (Optional)
          </label>
          <textarea
            id="notes"
            rows={3}
            placeholder="Brief description of your tattoo idea, placement, and size..."
            value={clientInfo.notes}
            onChange={handleChange}
            className="w-full bg-surface-hover/50 border border-surface-border text-foreground placeholder:text-muted/50 rounded-2xl px-4 py-3 transition-all focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 focus:bg-surface-hover resize-none"
          />
        </div>
      </form>
    </div>
  );
}
