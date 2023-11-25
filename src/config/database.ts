const mysql = require("mysql2");

export const myPool = mysql.createPool({
  host: process.env.NODE_ENV === "prod" ? "172.17.0.1" : "127.0.0.1",
  user: "root",
  password: "tmdcks2416@",
  database: "scarlet",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
