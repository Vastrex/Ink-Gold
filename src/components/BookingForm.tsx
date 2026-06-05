'use client';

import { useState } from 'react';

type BookingFormProps = {
  onSubmit?: (data: {
    name: string;
    email: string;
    phone: string;
    notes: string;
  }) => void;
};

export default function BookingForm({ onSubmit }: BookingFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
  };

  return (
    <div className="bg-surface-container-lowest rounded-lg shadow-md p-md border border-surface-container-high">
      <h3 className="font-headline-md text-headline-md text-primary mb-md">Client Details</h3>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* Full Name */}
        <div className="flex flex-col gap-xs">
          <label htmlFor="name" className="font-label-md text-label-md text-on-surface-variant">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-surface border border-outline-variant rounded-lg p-3 font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all placeholder:text-outline"
            required
          />
        </div>
        {/* Email & Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-xs">
            <label htmlFor="email" className="font-label-md text-label-md text-on-surface-variant">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-surface border border-outline-variant rounded-lg p-3 font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all placeholder:text-outline"
              required
            />
          </div>
          <div className="flex flex-col gap-xs">
            <label htmlFor="phone" className="font-label-md text-label-md text-on-surface-variant">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="(555) 000-0000"
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-surface border border-outline-variant rounded-lg p-3 font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all placeholder:text-outline"
            />
          </div>
        </div>
        {/* Design Notes */}
        <div className="flex flex-col gap-xs mt-2">
          <label htmlFor="notes" className="font-label-md text-label-md text-on-surface-variant">
            Design Notes (Optional)
          </label>
          <textarea
            id="notes"
            rows={3}
            placeholder="Brief description of your tattoo idea, placement, and size..."
            value={formData.notes}
            onChange={handleChange}
            className="w-full bg-surface border border-outline-variant rounded-lg p-3 font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all resize-none placeholder:text-outline"
          />
        </div>
        {/* Submit button can be placed by parent page; we only expose the form */}
      </form>
    </div>
  );
}
