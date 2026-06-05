import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

/**
 * POST /api/seed-slots
 * Generates availability slots for a range of dates.
 * Body (JSON):
 *   - startDate: optional ISO date string (defaults to today)
 *   - days: optional number of days to generate (default 7)
 */
export async function POST(req: Request) {
  try {
    const { startDate, days } = await req.json();
    const start = startDate ? new Date(startDate) : new Date();
    const numDays = typeof days === 'number' ? days : 7;
    const slots: any[] = [];

    for (let i = 0; i < numDays; i++) {
        const date = new Date(start);
        date.setDate(start.getDate() + i);
        const dateStr = date.toISOString().split('T')[0];
        // Create hourly slots from 09:00 to 17:00 (9am‑5pm)
        for (let hour = 9; hour < 17; hour++) {
            const startTime = `${hour.toString().padStart(2, '0')}:00:00`;
            const endTime = `${(hour + 1).toString().padStart(2, '0')}:00:00`;
            slots.push({
                date: dateStr,
                start_time: startTime,
                end_time: endTime,
                is_booked: false,
            });
        }
    }

    const { data, error } = await supabase.from('availability_slots').insert(slots).select();
    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ success: true, inserted: data?.length ?? 0 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Unexpected error' }, { status: 500 });
  }
}

/**
 * GET /api/seed-slots
 * Returns a simple confirmation that the endpoint is reachable.
 */
export async function GET() {
  return NextResponse.json({ message: 'Seed slots endpoint ready. POST to generate slots.' });
}
