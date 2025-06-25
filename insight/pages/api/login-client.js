import { getConnection } from '../../lib/db';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Missing credentials' });
  }

  try {
    const pool = await getConnection();

    // Only fetch by email (NOT password)
    const result = await pool
      .request()
      .input('email', email)
      .query('SELECT * FROM Clients WHERE Email = @email');

    if (result.recordset.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = result.recordset[0];

    // 🔐 Compare hashed password
    const isMatch = await bcrypt.compare(password, user.Password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // ✅ Login success
    return res.status(200).json({ message: 'Login successful', user: { id: user.Id, email: user.Email, name: user.Name } });

  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
