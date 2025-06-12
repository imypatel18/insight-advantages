import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/db';

export async function POST(req) {
  try {
    const data = await req.json();
    const { firstName, lastName, email, password } = data;

    // Construct fallback values
    const name = `${firstName} ${lastName}`;
    const phone = ''; // since not provided
    const expertise = 'N/A'; // default
    const availability = 1; // default to "available"

    const pool = await connectToDB();

    await pool.request()
      .input('Name', name)
      .input('Email', email)
      .input('Phone', phone)
      .input('Expertise', expertise)
      .input('Availability', availability)
      .input('Password', password)
      .query(`
        INSERT INTO Consultants (Name, Email, Phone, Expertise, Availability, Password)
        VALUES (@Name, @Email, @Phone, @Expertise, @Availability, @Password)
      `);

    return NextResponse.json({ success: true, message: 'Consultant registered' });

  } catch (err) {
    console.error('Error inserting consultant:', err);
    return NextResponse.json({ success: false, message: 'Failed to register consultant' }, { status: 500 });
  }
}
