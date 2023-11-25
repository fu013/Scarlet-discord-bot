const mysql = require("mysql2");

export const myPool = mysql.createPool({
  host: "localhost",
  // host: "172.17.0.1",
  user: "root",
  password: "tmdcks2416@",
  database: "scarlet",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
