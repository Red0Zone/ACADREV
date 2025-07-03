const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const db = mysql.createConnection({

  host:process.env.DB_HOST,
  user:process.env.DB_USER,
  password:process.env.DB_PASSWORD,
  database:process.env.DB_NAME,
  
  ssl: {
    rejectUnauthorized: false // This is important for self-signed certificates
  }
});

db.connect((err) => {
  if (err) {
    console.error(' MySQL connection failed:', err);
    process.exit(1);
  } else {
    console.log(' MySQL connected!');
  }
});

module.exports = db;