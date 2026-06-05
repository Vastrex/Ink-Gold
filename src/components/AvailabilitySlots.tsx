'use client';

import React, { useState } from 'react';

type AvailabilitySlotsProps = {
  slots?: string[];
  selectedSlot?: string | null;
  onSelect?: (slot: string) => void;
};

export default function AvailabilitySlots({ slots, selectedSlot, onSelect }: AvailabilitySlotsProps) {
  const [localSelected, setLocalSelected] = useState<string | null>(null);

  const currentSelected = selectedSlot !== undefined ? selectedSlot : localSelected;
  const handleSelect = (time: string) => {
    if (onSelect) onSelect(time);
    else setLocalSelected(time);
  };

  const renderSlot = (time: string, disabled = false, booked = false) => {
    const isSelected = currentSelected === time;
    
    let stateClasses = 'border-surface-border text-foreground hover:border-gold-500 hover:bg-surface-hover';
    if (disabled) stateClasses = 'border-surface-border/50 text-muted/50 cursor-not-allowed';
    if (booked) stateClasses = 'border-surface-border/30 text-muted/30 line-through cursor-not-allowed bg-surface-hover/20';
    if (isSelected) stateClasses = 'border-gold-500 bg-gold-500/10 text-gold-500 font-bold shadow-[0_0_15px_rgba(212,175,55,0.2)] scale-[1.02]';

    return (
      <button
        key={time}
        onClick={() => !disabled && !booked && handleSelect(time)}
        disabled={disabled || booked}
        className={`py-3 px-2 rounded-xl border transition-all duration-300 ease-out flex items-center justify-center ${stateClasses}`}
      >
        {time}
      </button>
    );
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
          <span className="material-symbols-outlined text-gold-500">schedule</span>
          Available Times
        </h3>
        <span className="text-xs font-bold tracking-wider uppercase text-gold-500 bg-gold-500/10 px-3 py-1.5 rounded-full border border-gold-500/20">
          Selected Date
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 content-start flex-grow mb-8">
        <div className="col-span-full text-xs font-semibold tracking-widest text-muted uppercase mt-2 mb-2">Morning</div>
        {['09:00 AM', '10:00 AM', '11:00 AM', '11:30 AM'].map((t, i) => renderSlot(t, i === 1, false))}

        <div className="col-span-full text-xs font-semibold tracking-widest text-muted uppercase mt-4 mb-2">Afternoon</div>
        {['01:00 PM', '02:30 PM', '03:00 PM', '04:00 PM'].map((t, i) => renderSlot(t, false, i === 3))}

        <div className="col-span-full text-xs font-semibold tracking-widest text-muted uppercase mt-4 mb-2">Evening</div>
        {['05:00 PM', '06:30 PM'].map((t) => renderSlot(t))}
      </div>

      <div className="mt-auto pt-6 border-t border-surface-border">
        <div className="flex justify-between items-center bg-surface-hover/50 p-4 rounded-2xl border border-surface-border mb-6">
          <div className="flex flex-col">
            <span className="text-xs font-semibold tracking-wider uppercase text-muted mb-1">Selected Slot</span>
            <span className="text-lg font-bold text-gold-500">
              {currentSelected ? currentSelected : 'None selected'}
            </span>
          </div>
        </div>
        {/* The submit button is now hidden here if the parent wants to render its own, but we keep it for fallback */}
        {!onSelect && (
          <button
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-gold-500 to-gold-600 text-background font-bold uppercase tracking-[0.1em] transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:-translate-y-0.5"
            disabled={!currentSelected}
          >
            Submit Booking
          </button>
        )}
      </div>
    </div>
  );
}
