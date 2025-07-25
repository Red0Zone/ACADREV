const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    rejectUnauthorized: false, // This is important for self-signed certificates
  },
});

// Test the connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error(" MySQL connection failed:", err);
    process.exit(1);
  } else {
    console.log(" MySQL connected!");
    connection.release();
  }
});

module.exports = pool;
