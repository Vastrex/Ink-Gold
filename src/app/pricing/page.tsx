'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

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
    <div className="flex flex-col items-center py-20 px-6">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-4 drop-shadow-sm">
          Simple, Transparent <span className="text-gold-500">Pricing</span>
        </h1>
        <p className="text-muted text-lg max-w-xl mx-auto">
          Choose the plan that best fits your studio's needs. Upgrade anytime to unlock unlimited potential.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 max-w-5xl w-full">
        {/* Free Tier */}
        <Card className="flex flex-col relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-surface-border transition-colors group-hover:bg-muted" />
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">Essential</h2>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-4xl font-black text-foreground">$0</span>
              <span className="text-muted font-medium">/ month</span>
            </div>
            <p className="text-muted text-sm">Perfect for artists just starting out.</p>
          </div>
          
          <ul className="flex-1 mb-10 space-y-4">
            {['5 appointments per month', 'Basic calendar management', 'Email support'].map((feature, i) => (
              <li key={i} className="flex items-center gap-3 text-foreground/80 font-medium">
                <span className="text-muted material-symbols-outlined text-sm">check_circle</span>
                {feature}
              </li>
            ))}
          </ul>
          
          <Button
            variant="secondary"
            disabled={true}
            className="w-full"
          >
            {isPro ? 'Current Plan' : 'Free Tier (Included)'}
          </Button>
        </Card>

        {/* Pro Tier */}
        <Card className="flex flex-col relative border-gold-500/30 shadow-[0_0_40px_rgba(212,175,55,0.05)]">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold-500 to-gold-600" />
          <div className="absolute top-6 right-6">
            <Badge variant="gold">Most Popular</Badge>
          </div>
          
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">Pro Artist</h2>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-4xl font-black text-foreground">$19</span>
              <span className="text-muted font-medium">/ month</span>
            </div>
            <p className="text-muted text-sm">Everything you need to run a busy studio.</p>
          </div>
          
          <ul className="flex-1 mb-10 space-y-4">
            {['Unlimited appointments', 'Priority automated booking', 'Gold verified badge', '24/7 Priority support'].map((feature, i) => (
              <li key={i} className="flex items-center gap-3 text-foreground font-medium">
                <span className="text-gold-500 material-symbols-outlined text-sm drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]">check_circle</span>
                {feature}
              </li>
            ))}
          </ul>
          
          <div className="flex flex-col gap-3 mt-auto">
            <Button
              variant="primary"
              onClick={() => startCheckout('monthly')}
              className="w-full"
            >
              Upgrade to Pro
            </Button>
            <button 
              onClick={() => startCheckout('yearly')}
              className="text-xs text-muted hover:text-gold-500 font-medium tracking-wide transition-colors uppercase"
            >
              Or pay $149 yearly (Save 35%)
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
