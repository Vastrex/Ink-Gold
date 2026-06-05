import React from 'react';
import Card from '@/components/ui/Card';

type AppointmentCardProps = {
  time: string; // e.g. "10:00 AM - 1:00 PM"
  clientName: string;
  tattooStyle: string; // e.g. "Traditional Sleeve (Cont.)"
  status: 'Confirmed' | 'Consultation' | 'Cancelled' | 'Pending';
};

export default function AppointmentCard({
  time,
  clientName,
  tattooStyle,
  status,
}: AppointmentCardProps) {
  // Determine colors based on status (using design palette)
  const statusColors: Record<string, { bg: string; text: string; border?: string }> = {
    Confirmed: { bg: 'bg-secondary-container', text: 'text-on-secondary-container' },
    Consultation: { bg: 'bg-surface-variant', text: 'text-on-surface-variant', border: 'border-outline-variant' },
    Cancelled: { bg: 'bg-error-container', text: 'text-on-error' },
    Pending: { bg: 'bg-primary-container', text: 'text-on-primary' },
  };
  const colors = statusColors[status] ?? statusColors['Confirmed'];

  return (
    <Card className="relative overflow-hidden group hover:shadow-lg transition-shadow">
      {/* Left accent line */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary-container" />
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2 text-primary font-label-md">
          <span className="material-symbols-outlined text-sm">schedule</span>
          {time}
        </div>
        <span className={`${colors.bg} ${colors.text} text-xs font-bold px-2 py-1 rounded ${colors.border ? `border ${colors.border}` : ''}`}> {status} </span>
      </div>
      <h4 className="text-body-lg font-body-lg font-bold text-primary mb-1">{clientName}</h4>
      <p className="text-body-md font-body-md text-on-surface-variant flex items-center gap-1">
        <span className="material-symbols-outlined text-sm opacity-70">draw</span>
        {tattooStyle}
      </p>
    </Card>
  );
}
