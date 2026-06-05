import { NextResponse } from 'next/server';
import fetch from 'node-fetch';

export async function POST(req: Request) {
  try {
    const { to, appointment } = await req.json();
    if (!to || !appointment) {
      return NextResponse.json({ success: false, error: 'Missing to or appointment' }, { status: 400 });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      return NextResponse.json({ success: false, error: 'Resend API key not configured' }, { status: 500 });
    }

    const emailBody = `
      <h2>Your Tattoo Appointment Confirmation</h2>
      <p><strong>Business:</strong> ${appointment.business_name || 'Tattoo Studio'}</p>
      <p><strong>Date:</strong> ${appointment.appointment_date}</p>
      <p><strong>Time:</strong> ${appointment.appointment_time}</p>
      <p>We look forward to seeing you!</p>
    `;

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'appointments@yourstudio.com',
        to,
        subject: 'Your Tattoo Appointment Confirmation',
        html: emailBody,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('Resend error:', err);
      return NextResponse.json({ success: false, error: 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error('Email endpoint error:', e);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
