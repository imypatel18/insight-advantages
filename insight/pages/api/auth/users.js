// pages/api/users.js
import { getConnection } from '@/lib/db';

export default async function handler(req, res) {
  try {
    const pool = await getConnection();
    const result = await pool.request().query('SELECT * FROM Users');

    res.status(200).json(result.recordset);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
