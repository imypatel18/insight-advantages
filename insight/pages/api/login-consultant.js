import { getConnection } from '../../lib/db';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const pool = await getConnection();

    const result = await pool.request()
      .input('Email', email.toLowerCase())
      .query(`SELECT ConsultantID, FullName, Email, Password FROM Consultants WHERE Email = @Email`);

    if (result.recordset.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const consultant = result.recordset[0];
    console.log("Consultant record:", result.recordset[0]);
    console.log('▶️ Plain password:', password);
    console.log('▶️ Hashed password from DB:', consultant.Password);

    const isMatch = await bcrypt.compare(password, consultant.Password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    return res.status(200).json({
      message: 'Consultant login successful',
      user: {
        id: consultant.ConsultantID,
        name: consultant.FullName,
        email: consultant.Email,
      },
    });

  } catch (err) {
    console.error('Consultant login error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
