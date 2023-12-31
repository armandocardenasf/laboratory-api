const mysql = require("mysql2");
require("dotenv").config();

const oMySQLConnection = mysql.createPool({
  connectionLimit: 100,
  host: process.env.HOST,
  port: process.env.PORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});
module.exports = oMySQLConnection;
