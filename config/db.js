const { Pool } = require("pg");
require("dotenv").config();

//database connection
const pool = new Pool({
  user: DB_HOST,
  host: DB_USER,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: DB_PORT,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
