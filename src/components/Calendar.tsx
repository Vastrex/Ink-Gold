'use client';

import React from 'react';
import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

type CalendarProps = {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
};

export default function Calendar({ selectedDate, onDateChange }: CalendarProps) {
  return (
    <div className="w-full flex justify-center">
      <ReactCalendar
        onChange={(val) => onDateChange(val as Date)}
        value={selectedDate}
        minDate={new Date()}
        className="rounded-lg border-none shadow-sm p-2 w-full max-w-full"
      />
    </div>
  );
}
