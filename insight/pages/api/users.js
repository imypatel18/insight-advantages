import { getConnection } from '../../lib/db'; // Fixed path: pages/api -> lib

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('🔄 Starting API request...');
    
    // Check environment variables first
    if (!process.env.AZURE_SQL_SERVER) {
      console.error('❌ Missing AZURE_SQL_SERVER environment variable');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    console.log('📡 Connecting to database...');
    const pool = await getConnection();
    console.log('✅ Database connection established');
    
    // Check if Users table exists
    console.log('🔍 Checking if Users table exists...');
    const tableCheck = await pool.request().query(`
      SELECT COUNT(*) as tableExists 
      FROM INFORMATION_SCHEMA.TABLES 
      WHERE TABLE_NAME = 'Users'
    `);
    
    if (tableCheck.recordset[0].tableExists === 0) {
      console.log('⚠️  Users table does not exist - creating sample data response');
      return res.status(200).json({
        success: true,
        message: 'Users table does not exist yet',
        sampleData: [
          { id: 1, name: 'Sample User 1', email: 'user1@example.com' },
          { id: 2, name: 'Sample User 2', email: 'user2@example.com' }
        ],
        note: 'Create the Users table to see real data'
      });
    }

    console.log('🔄 Executing SELECT query...');
    const result = await pool.request().query('SELECT * FROM Users');
    console.log('✅ Query successful, rows returned:', result.recordset.length);
    
    res.status(200).json({
      success: true,
      data: result.recordset,
      count: result.recordset.length,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ API Error Details:');
    console.error('- Message:', error.message);
    console.error('- Code:', error.code);
    console.error('- Stack:', error.stack);
    
    // More specific error responses
    if (error.message?.includes('getConnection is not a function')) {
      res.status(500).json({ 
        error: 'Database module import error',
        details: 'Check file paths and exports',
        hint: 'Verify lib/db.js exists and exports getConnection function'
      });
    } else if (error.code === 'ELOGIN') {
      res.status(401).json({ 
        error: 'Database authentication failed',
        hint: 'Check username and password'
      });
    } else if (error.code === 'ESOCKET') {
      res.status(503).json({ 
        error: 'Cannot connect to database server',
        hint: 'Check server name and firewall settings'
      });
    } else {
      res.status(500).json({ 
        error: 'Database error',
        details: error.message,
        code: error.code || 'UNKNOWN'
      });
    }
  }
}
