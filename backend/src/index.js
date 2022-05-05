const express = require("express");
const app = express();
require("dotenv").config();
const cors = require('cors')

//Configuraciones
app.set("port", process.env.PORT || 4000);

//Middlewars
app.use(express.json());
app.use(cors());

//Routes
app.use(require("./routes/routs"));

//Iniciando el servidor
app.listen(app.get("port"), () => {
  console.log(`Servidor corriendo en el puerto ${app.get("port")}`);
});