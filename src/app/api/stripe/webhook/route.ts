import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const sig = req.headers.get('stripe-signature') as string;
  const rawBody = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('⚠️ Webhook signature verification failed.', err);
    return new NextResponse('Invalid signature', { status: 400 });
  }

  // Handle relevant events
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const supabaseUserId = session.metadata?.supabase_user_id as string;
      if (supabaseUserId) {
        await supabase
          .from('users')
          .update({ subscription_status: 'pro' })
          .eq('id', supabaseUserId);
      }
      break;
    }
    case 'customer.subscription.updated': {
      const subscription = event.data.object as Stripe.Subscription;
      const supabaseUserId = subscription.metadata?.supabase_user_id as string;
      if (supabaseUserId) {
        const status = subscription.status === 'active' ? 'pro' : 'free';
        await supabase
          .from('users')
          .update({ subscription_status: status })
          .eq('id', supabaseUserId);
      }
      break;
    }
    default:
      // No action needed for other events
      break;
  }

  return new NextResponse('Success', { status: 200 });
}
