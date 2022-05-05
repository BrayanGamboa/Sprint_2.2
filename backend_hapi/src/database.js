const { Pool } = require('pg')

const configuracion = {
  host: process.env.HOST_PSQL,
  user: process.env.USER_PSQL,
  password: process.env.PASSWORD_PSQL,
  database: process.env.DB_PSQL,
  port: process.env.PORT_PSQL,
}

const psqlConnection = new Pool(configuracion)
try {
  console.log("Base de datos correctamente enlazada");
} catch (error) {
  console.log("Erro al conectar la DB");
  console.log(error);
}


// const mysql = require("mysql2/promise");
// require("dotenv").config();

// const mysqlConnection = mysql.createPool({
//   host: process.env.HOST_DB,
//   user: process.env.USER_DB,
//   password: process.env.PASSWORD_DB,
//   database: process.env.DATABASE_DB,
//   port: process.env.PORT_DB
// });

// try {
//   console.log("Base de datos correctamente enlazada");
// } catch (error) {
//   console.log("Erro al conectar la DB");
//   console.log(error);
// }

// module.exports = mysqlConnection;
module.exports = psqlConnection;

