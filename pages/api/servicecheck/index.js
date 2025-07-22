const fs = require('fs-extra');
const mysql = require('mysql2');
var path = require('path');

const handler = async (req, res) => {
  try {
    return new Promise(async (resolve) => {
      const connection = mysql.createConnection({
        host: process.env.NEXT_PUBLIC_MYSQL_HOST,
        port: process.env.NEXT_PUBLIC_MYSQL_PORT,
        user: process.env.NEXT_PUBLIC_MYSQL_USERNAME,
        password: process.env.NEXT_PUBLIC_MYSQL_PASSWORD,
        database: process.env.NEXT_PUBLIC_MYSQL_DATABASE,
        ssl: process.env.NEXT_PUBLIC_MYSQL_SSLENABLED == 'true' && {
          ca: fs.readFileSync(
            path.resolve(process.env.NEXT_PUBLIC_MYSQL_SSL_CA)
          ),
          cert: fs.readFileSync(
            path.resolve(process.env.NEXT_PUBLIC_MYSQL_SSL_CLIENTCERT)
          ),
          key: fs.readFileSync(
            path.resolve(process.env.NEXT_PUBLIC_MYSQL_SSL_CLIENTCERTKEY)
          ),
        },
      });
      connection.ping((err) => {
        if (err) {
          res.status(530).json({ message: 'Connection failed' });
          resolve();
        } else {
          connection.end();
          res.status(200).json({ message: 'Connection success' });
          resolve();
        }
      });
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export default handler;
