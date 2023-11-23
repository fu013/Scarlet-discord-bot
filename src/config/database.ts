const mysql = require("mysql2");

export const myPool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "tmdcks2416@",
  database: "scarlet",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
