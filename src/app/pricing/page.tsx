'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function PricingPage() {
  const router = useRouter();
  const [isPro, setIsPro] = useState(false);

  // Fetch current user's subscription status
  useEffect(() => {
    const fetchStatus = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from('users')
          .select('subscription_status')
          .eq('id', user.id)
          .single();
        if (!error && data) setIsPro(data.subscription_status === 'pro');
      }
    };
    fetchStatus();
  }, []);

  const startCheckout = async (priceTier: 'monthly' | 'yearly') => {
    const res = await fetch('/api/stripe/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ price_tier: priceTier, /* optionally add user id */ }),
    });
    const { url, error } = await res.json();
    if (url) window.location.href = url;
    else alert(error || 'Failed to start checkout');
  };

  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center justify-center min-h-screen bg-background p-6">
        <h1 className="text-display-lg font-display-lg text-primary mb-8">Choose Your Plan</h1>
        <div className="grid gap-8 sm:grid-cols-2 max-w-4xl w-full">
          {/* Free Tier */}
          <div className="bg-surface-container-lowest rounded-xl shadow-md border border-outline-variant p-6 flex flex-col">
            <h2 className="text-headline-md font-headline-md text-primary mb-4">Free</h2>
            <p className="text-body-md text-on-surface-variant mb-4">$0 / month</p>
            <ul className="flex-1 mb-6 space-y-2 text-body-md text-on-surface-variant">
              <li>✓ 5 appointments per month</li>
              <li>✓ Basic support</li>
            </ul>
            <button
              disabled={isPro === false && isPro !== null}
              className={`w-full py-3 rounded-lg font-label-md text-label-md uppercase tracking-[0.1em] font-black 
                ${isPro ? 'bg-secondary-container text-on-secondary-container' : 'bg-surface-container-low text-on-surface-variant'}
                hover:${isPro ? 'bg-secondary' : 'bg-surface-container'} transition-colors`}
            >
              {isPro ? 'Current Plan' : 'Free Tier'}
            </button>
          </div>
          {/* Pro Tier */}
          <div className="bg-surface-container-lowest rounded-xl shadow-md border border-outline-variant p-6 flex flex-col">
            <h2 className="text-headline-md font-headline-md text-primary mb-4">Pro</h2>
            <p className="text-body-md text-on-surface-variant mb-4">
              $19 / month <span className="text-sm text-on-surface-variant">or $149 / year</span>
            </p>
            <ul className="flex-1 mb-6 space-y-2 text-body-md text-on-surface-variant">
              <li>✓ Unlimited appointments</li>
              <li>✓ Priority support</li>
              <li>✓ Gold badge on profile</li>
            </ul>
            <button
              onClick={() => startCheckout('monthly')}
              className="w-full py-3 rounded-lg bg-[#d4af37] text-primary font-label-md text-label-md uppercase tracking-[0.1em] font-black hover:opacity-90 transition-colors shadow-md hover:shadow-lg"
            >
              Upgrade to Pro
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
