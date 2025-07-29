const fs = require('fs-extra');
const mysql = require('mysql2');
var path = require('path');

const pool = mysql.createPool({
  host: process.env.NEXT_PUBLIC_MYSQL_HOST,
  port: process.env.NEXT_PUBLIC_MYSQL_PORT,
  user: process.env.NEXT_PUBLIC_MYSQL_USERNAME,
  password: process.env.NEXT_PUBLIC_MYSQL_PASSWORD,
  database: process.env.NEXT_PUBLIC_MYSQL_DATABASE,
  connectionLimit: 10,
  acquireTimeout: 60000,
  timeout: 60000,
  reconnect: true,
  // Add these settings to reduce race conditions
  multipleStatements: false,
  typeCast: true,
  // Ensure consistent isolation level
  timezone: 'Z',
  ssl: process.env.NEXT_PUBLIC_MYSQL_SSLENABLED == 'true' && {
    ca: fs.readFileSync(path.resolve(process.env.NEXT_PUBLIC_MYSQL_SSL_CA)),
    cert: fs.readFileSync(
      path.resolve(process.env.NEXT_PUBLIC_MYSQL_SSL_CLIENTCERT)
    ),
    key: fs.readFileSync(
      path.resolve(process.env.NEXT_PUBLIC_MYSQL_SSL_CLIENTCERTKEY)
    ),
  },
});

export async function query(q, values) {
  try {
    console.log('Executing query:', q.replace(/\s+/g, ' ').trim());
    if (values) {
      console.log('With values:', values);
    }
    
    const result = await pool.promise().query(q, values);
    
    // Log insertId for debugging
    if (result[0] && result[0].insertId) {
      console.log('Generated insertId:', result[0].insertId);
    }
    
    return result[0];
  } catch (error) {
    console.error('Database query error:', error);
    console.error('Query was:', q);
    console.error('Values were:', values);
    throw error;
  }
}

// Add a function to execute queries within a transaction
export async function withTransaction(callback) {
  const connection = await pool.promise().getConnection();
  try {
    await connection.beginTransaction();
    const result = await callback(connection);
    await connection.commit();
    return result;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}
