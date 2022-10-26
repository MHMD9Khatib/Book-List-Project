const { Pool } = require('pg');
require("env2")(".env");


// const dbUrl = process.env.DATABASE_URL;
// const user = process.env.User;
// const host = process.env.Host;
// const database = process.env.Database;
// const password = process.env.Password;
// const port =process.env.Port;
// // console.log(port);

// const pool = new Pool({
//   user: user,
//   host: host,
//   database: database,
//   password: password,
//   port: port,
//   connectionString: dbUrl,
//   ssl: {
//     rejectUnauthorized: false,
//   },

// })


// module.exports = pool;

const {
  env: {
    DATABASE_URL,
  },
} = process;

let dbUrl = DATABASE_URL;


const options = {
  connectionString: dbUrl,
  ssl: {
    rejectUnauthorized: false,
  },
};

module.exports = new Pool(options);
