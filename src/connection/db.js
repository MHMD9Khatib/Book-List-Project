const Pool = require('pg').Pool
require("env2")(".env");

const pool = new Pool({
  
  user: 'me',
  host: 'localhost',
  database: 'booklist',
  password: 'password',
  port: 5432,
})


module.exports = pool;



