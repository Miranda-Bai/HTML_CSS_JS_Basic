const mysql = require("mysql2");

const db = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "A154672020b",
  database: "my_db_01",
});

module.exports = db;
