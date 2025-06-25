import sql from 'mssql';

const config = {
  server: process.env.AZURE_SQL_SERVER,
  database: process.env.AZURE_SQL_DATABASE,
  user: process.env.AZURE_SQL_USER,
  password: process.env.AZURE_SQL_PASSWORD,
  port: parseInt(process.env.AZURE_SQL_PORT || '1433', 10),
  options: {
    encrypt: true,
    trustServerCertificate: false,
    enableArithAbort: true,
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  requestTimeout: 30000,
  connectionTimeout: 30000,
};

let pool;

export async function getConnection() {
  try {
    if (!pool) {
      console.log('🔄 Creating new SQL connection pool...');
      pool = new sql.ConnectionPool(config);
      await pool.connect();
      console.log('✅ Connected to Azure SQL Database');
      
      // Test the connection
      const testResult = await pool.request().query('SELECT 1 as test');
      console.log('✅ Connection test successful');
    }
    return pool;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    pool = null; // Reset pool on failure
    throw error;
  }
}
