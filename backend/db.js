const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root', // <-- Password set to 'root'
  database: 'real_estate',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Verify MySQL connection on server startup
pool.getConnection()
  .then((connection) => {
    console.log('✅ Connected to MySQL Database (real_estate) successfully!');
    connection.release();
  })
  .catch((err) => {
    console.error('❌ MySQL Connection Failed! Check if MySQL service is running.');
    console.error('Details:', err.message);
  });

module.exports = pool;