const fs = require('fs-extra');
const mysql = require('mysql2');
var path = require('path');

const db = mysql.createConnection({
  host: process.env.NEXT_PUBLIC_MYSQL_HOST,
  port: process.env.NEXT_PUBLIC_MYSQL_PORT,
  user: process.env.NEXT_PUBLIC_MYSQL_USERNAME,
  password: process.env.NEXT_PUBLIC_MYSQL_PASSWORD,
  database: process.env.NEXT_PUBLIC_MYSQL_DATABASE,
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
  const result = await db.promise().query(q, values);

  return result[0];
}
