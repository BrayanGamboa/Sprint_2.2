const mysql = require("mysql2/promise");
require("dotenv").config();

const mysqlConnection = mysql.createPool({
  host: process.env.HOST_DB,
  user: process.env.USER_DB,
  password: process.env.PASSWORD_DB,
  database: process.env.DATABASE_DB,
  port: process.env.PORT_DB,
});

try {
  console.log("Base de datos correctamente enlazada");
} catch (error) {
  console.log("Erro al conectar la DB");
}

module.exports = mysqlConnection;

