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

  const renderSlot = (time: string, disabled = false, booked = false) => (
    <button
      key={time}
      onClick={() => !disabled && !booked && handleSelect(time)}
      disabled={disabled || booked}
      className={`py-3 px-2 rounded-lg font-body-md text-body-md transition-all
        ${booked ? 'text-outline line-through bg-surface-container-low cursor-not-allowed' : ''}
        ${disabled ? 'text-outline cursor-not-allowed' : ''}
        ${!disabled && !booked ? 'text-on-surface hover:border-primary-container hover:bg-surface-container' : ''}
        ${currentSelected === time ? 'border-2 border-primary-container bg-primary-container text-on-primary font-bold shadow-md scale-105' : ''}
        ${!disabled && !booked ? 'border border-outline-variant' : ''}`}
    >
      {time}
    </button>
  );

  return (
    <div className="flex flex-col gap-lg h-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-md pb-sm border-b border-outline-variant">
        <h3 className="font-headline-md text-headline-md text-primary">Available Times</h3>
        <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container px-3 py-1 rounded-full">
          {/* Example date – could be a prop */}
          October 9th
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-sm content-start flex-grow">
        {/* Morning */}
        <div className="col-span-full font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mt-2 mb-1">
          Morning
        </div>
        {['09:00 AM', '10:00 AM', '11:00 AM', '11:30 AM'].map((t, i) =>
          renderSlot(t, i === 1, false) // 10:00 AM disabled as example
        )}

        {/* Afternoon */}
        <div className="col-span-full font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mt-4 mb-1">
          Afternoon
        </div>
        {['01:00 PM', '02:30 PM', '03:00 PM', '04:00 PM'].map((t, i) =>
          renderSlot(t, false, i === 3) // 04:00 PM booked (line‑through)
        )}

        {/* Evening */}
        <div className="col-span-full font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mt-4 mb-1">
          Evening
        </div>
        {['05:00 PM', '06:30 PM'].map((t) => renderSlot(t))}
      </div>

      {/* Selected summary */}
      <div className="mt-lg pt-md border-t border-outline-variant">
        <div className="flex justify-between items-center mb-4 bg-surface-container-low p-3 rounded-lg border border-outline-variant">
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Selected Slot</span>
            <span className="font-body-md text-body-md font-bold text-primary">
              {currentSelected ? `Oct 9, ${currentSelected}` : 'None'}
            </span>
          </div>
          <span className="material-symbols-outlined text-secondary-container">schedule</span>
        </div>
        <button
          className="w-full py-4 rounded-lg bg-secondary-container text-on-secondary-container font-label-md text-label-md uppercase tracking-[0.1em] font-black hover:bg-secondary-fixed transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
          disabled={!currentSelected}
        >
          Submit Booking
          <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
        </button>
        <p className="font-label-sm text-label-sm text-on-surface-variant text-center mt-3">
          A deposit may be required to confirm your appointment.
        </p>
      </div>
    </div>
  );
}
