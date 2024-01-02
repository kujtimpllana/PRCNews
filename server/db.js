import mysql from "mysql2";

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "toor",
  database: "prc_news",
  multipleStatements: false,
});
