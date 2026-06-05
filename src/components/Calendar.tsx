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
    <div className="w-full flex justify-center custom-calendar-wrapper">
      <ReactCalendar
        onChange={(val) => onDateChange(val as Date)}
        value={selectedDate}
        minDate={new Date()}
        className="w-full max-w-full"
      />
    </div>
  );
}
