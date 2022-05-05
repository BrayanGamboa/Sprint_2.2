const express = require("express");
const router = express.Router();
const uploadFile = require('../../configMulter');

const mysqlConnection = require("../database");

router.get("/", (req, res) => {
  res.send("<h1>Página principal</h1>");
});

router.get("/marca", async (req, res) => {

  try {
    const [rows] = await mysqlConnection.query(`SELECT * FROM marca;`);
    res.status(200).json(rows);
  } catch {
    res.status(500);
    console.log(err);
  }
});

router.get("/vehiculo", async (req, res) => {
  try {
    const [rows] = await mysqlConnection.query(`SELECT * FROM vehiculo;`);
    return res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
    console.log(err);
  }
});

router.get("/linea", async (req, res) => {
  try {
    const [rows] = await mysqlConnection.query(`SELECT * FROM linea;`);
    res.status(200).json(rows);
  } catch {
    res.status(500);
    console.log(err);
  }
});

router.get("/minmax", async (req, res) => {
  try {
    const [rows] = await mysqlConnection.query(`SELECT MIN(modelo), MAX(modelo) FROM vehiculo;`);
    res.status(200).json(rows[0]);
  } catch {
    res.status(500);
    console.log(err);
  }
});

router.get("/sum", async (req, res) => {
  try {
    const [rows] = await mysqlConnection.query(`SELECT SUM(modelo) FROM vehiculo;`);
    res.status(200).json(rows[0]);
  } catch {
    res.status(500);
    console.log(err);
  }
});

router.get("/prom", async (req, res) => {
  try {
    const [rows] = await mysqlConnection.query(`SELECT AVG(modelo) FROM vehiculo;`);
    res.status(200).json(rows);
  } catch {
    res.status(500);
    console.log(err);
  }
});

router.get("/activos", async (req, res) => {
  try {
    const [rows] = mysqlConnection.query(`SELECT COUNT(estado) FROM linea;`);
    res.status(200).json(rows);
  } catch {
    res.status(500);
    console.log(err);
  }
});

router.get("/filter_seguro/:fecha1,:fecha2", async (req, res) => {
  const { fecha1, fecha2 } = req.params;
  try {
    const [rows] = await mysqlConnection.query(`SELECT * FROM vehiculo WHERE fch_vence_seg >= "${fecha1}" AND fch_vence_seg <= "${fecha2}";`)
    res.status(200).json(rows);
  } catch {
    res.status(500);
    console.log(err);
  }
});

router.get("/filter_modelo/:fecha1,:fecha2", async (req, res) => {
  const { fecha1, fecha2 } = req.params;
  try {
    const [rows] = await mysqlConnection.query(`SELECT * FROM vehiculo WHERE modelo >= "${fecha1}" AND modelo <= "${fecha2}";`);
    res.status(200).json(rows);
  } catch {
    res.status(500);
    console.log(err);
  }
});

router.get("/consultcarr", async (req, res) => {
  try {
    const [rows] = await mysqlConnection.query(`
    SELECT vehiculo.num_placa, vehiculo.modelo, linea.descripcion, marca.descripcion
      FROM ( ( linea INNER JOIN vehiculo ON vehiculo.linea = linea.id_linea)
      INNER JOIN marca ON marca.nombre = linea.nombre_marca);`);
    res.status(200).json(rows);
  } catch {
    res.status(500);
    console.log(err);
  }
});

router.get("/marca/:nombre", async (req, res) => {
  const { nombre } = req.params;
  try {
    const [rows] = await mysqlConnection.query(`SELECT * FROM marca WHERE nombre = "${nombre}";`);
    if (!rows[0]) {
      res.status(204).send("Sin datos");
    } else {
      res.status(200).json(rows[0]);
    }
  } catch {
    res.status(500);
    console.log(err);
  }
}
);

router.get("/linea/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await mysqlConnection.query(`SELECT * FROM linea WHERE id_linea = ${id};`);
    if (!rows[0]) {
      res.status(204).send("Sin datos");
    } else {
      res.status(200).json(rows[0]);
    }
  } catch {
    res.status(500);
    console.log(err);
  }
}
);

router.get("/vehiculo/:placa", async (req, res) => {
  const { placa } = req.params;
  try {
    const [rows] = await mysqlConnection.query(`SELECT * FROM vehiculo WHERE num_placa = "${placa}";`);
    if (!rows[0]) {
      res.status(204).send("Sin datos");
    } else {
      res.status(200).json(rows[0]);
    }
  } catch {
    res.status(500);
    console.log(err);
  }
}
);

router.delete("/marca/:nombre", async (req, res) => {
  const { nombre } = req.params;
  try {
    await mysqlConnection.query(`DELETE FROM marca WHERE nombre = "${nombre}";`);
    res.status(200).send("Borrado");
    console.log("Se han borrado");
  } catch {
    res.status(500);
    console.log(err);
  }
}
);

router.delete("/linea/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await mysqlConnection.query(`DELETE FROM linea WHERE id_linea = ${id};`);
    res.status(200).send("Borrado");
    console.log("Se han borrado");
  } catch {
    res.status(500);
    console.log(err);
  }
}
);

router.delete("/vehiculo/:placa", async (req, res) => {
  const { placa } = req.params;
  try {
    await mysqlConnection.query(`DELETE FROM vehiculo WHERE num_placa = "${placa}";`);
    res.status(200).send("Borrado");
    console.log("Se han borrado");
  } catch {
    res.status(500);
    console.log(err);
  }
}
);

router.post("/linea", async (req, res) => {
  const { descripcion, estado, id_marca } = req.body;
  if (!descripcion || !estado || !id_marca) {
    res.status(409).send({ error: "Conflict" });
  } else {
    res.status(200).send("Se envió correctamente");
    await mysqlConnection.query(`INSERT INTO linea (descripcion, estado, id_marca)VALUES ("${descripcion}","${estado}",${id_marca});`);
  }
});

router.post("/marca", async (req, res) => {
  const { nombre, descripcion, estado } = req.body;
  if (!nombre || !descripcion || !estado) {
    res.status(409).send({ error: "Conflict" });
  } else {
    res.status(200).send("Se envió correctamente");
    await mysqlConnection.query(`INSERT INTO marca (nombre, descripcion, estado)VALUES ("${nombre}","${descripcion}","${estado}");`);
  }
});

router.post("/vehiculo", async (req, res) => {
  const { num_placa, modelo, fch_vence_seg, fch_vence_tecno, linea, url_img } = req.body;
  if (!num_placa || !modelo || !fch_vence_seg || !fch_vence_tecno || !linea || !url_img) {
    res.status(409).send({ error: "Conflict" });
  } else {
    res.status(200).send("Se envió correctamente");
    await mysqlConnection.query(`INSERT INTO vehiculo VALUES ("${num_placa}","${modelo}","${fch_vence_seg}", "${fch_vence_tecno}", ${linea}, "${url_img}");`);
  }
});

router.put("/vehiculo/:placa", async (req, res) => {
  const { placa } = req.params;
  const { modelo, fch_vence_seg, fch_vence_tecno, linea, url_img } = req.body;
  console.log(placa, req.body);
  try {
    res.status(200).send("Se envió correctamente");
    mysqlConnection.query(`UPDATE vehiculo SET modelo = "${modelo}", fch_vence_seg = "${fch_vence_seg}", fch_vence_tecno = "${fch_vence_tecno}", linea = ${linea}, url_img = "${url_img}" WHERE num_placa = "${placa}";`);
  } catch {
    res.status(204);
  }
});

router.post("/vehi", async (req, res) => {
  uploadFile(req, res, (err) => {
    if (err) {
      console.log(err);
      err.message = 'Error al subir archivo';
      res.send(err);

    }
    if (req.file) console.log(req.file);
    else if (req.files) console.log(req.files);
    res.send('Archivo subido').status(200);
  })
});


module.exports = router;  