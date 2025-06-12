import { getConnection } from '@/lib/db';

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const pool = await getConnection();
    const result = await pool.request()
      .input('Email', email)
      .input('Password', password)
      .query('SELECT * FROM Users WHERE Email = @Email AND Password = @Password');

    const user = result.recordset[0];

    if (user) {
      return new Response(JSON.stringify({ success: true, consultant: user }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      return new Response(JSON.stringify({ success: false, message: 'Invalid email or password' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

  } catch (error) {
    console.error('Login error:', error);
    return new Response(JSON.stringify({ success: false, message: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
