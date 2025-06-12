import { getConnection } from '@/lib/db';

export async function POST(req) {
  try {
    const { firstName, lastName, email, password } = await req.json();

    const pool = await getConnection();

    await pool.request()
      .input('FirstName', firstName)
      .input('LastName', lastName)
      .input('Email', email)
      .input('Password', password)  // (plaintext for now; can hash later)
      .query(`
        INSERT INTO Users (FirstName, LastName, Email, Password)
        VALUES (@FirstName, @LastName, @Email, @Password)
      `);

    return new Response(JSON.stringify({ message: 'Registered successfully' }), { status: 201 });
  } catch (error) {
    console.error('Registration failed:', error);
    return new Response(JSON.stringify({ error: 'Registration failed' }), { status: 500 });
  }
}
