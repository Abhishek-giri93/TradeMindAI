const mysql = require("mysql2");

console.log("Database:", process.env.DB_NAME);
console.log("Database user:", process.env.DB_USER);

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if(err){
    console.log("Connection failed !!", err.message);
    return;
  }
  console.log("Database connected successfully!!");
});

module.exports = db;