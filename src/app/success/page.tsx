import React from 'react';
import Navbar from '@/components/Navbar';

export default function SuccessPage() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-center bg-background p-6">
        <div className="max-w-md rounded-xl bg-surface-container-low p-8 text-center shadow-md">
          <h1 className="mb-4 text-2xl font-bold text-primary">Payment Successful!</h1>
          <p className="mb-6 text-body-md text-on-surface-variant">
            Thank you for your deposit. Your appointment has been confirmed.
          </p>
          <a
            href="/dashboard"
            className="inline-block rounded-full bg-secondary-container px-6 py-3 text-sm font-medium text-on-secondary-container hover:bg-secondary transition-colors"
          >
            View Dashboard
          </a>
        </div>
      </main>
    </>
  );
}
