import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const { customer_name, customer_email, customer_phone, appointment_date, appointment_time } = await req.json();

    // Basic validation
    if (!customer_name || !customer_email || !appointment_date || !appointment_time) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }
    // Simple email format check
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailRegex.test(customer_email)) {
      return NextResponse.json({ success: false, error: 'Invalid email format' }, { status: 400 });
    }

    const { data, error } = await supabase.from('appointments').insert({
      customer_name,
      customer_email,
      customer_phone,
      appointment_date,
      appointment_time,
    }).select('id').single();

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, appointment_id: data.id });
  } catch (e) {
    console.error('Unexpected error:', e);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
