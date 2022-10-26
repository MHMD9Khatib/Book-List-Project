const Pool = require('pg').Pool
require("env2")(".env");

const pool = new Pool({
  // user: 'me',
  // host: 'localhost',
  // database: 'booklist',
  // password: 'password',
  // port: 5432,
  user : process.env.User,
  host: process.env.Host,
  database: process.env.Database,
  password: process.env.Password,
  port: process.env.Port,
})


module.exports = pool;



