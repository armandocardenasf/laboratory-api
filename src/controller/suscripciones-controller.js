const oMySQLConnection = require("../database");

const getSuscripciones = (req, res) => {
  const query = "CALL GetSuscripcionSP();";
  oMySQLConnection.query(query, (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
};

const getSuscripcionesById = (req, res) => {
  const { oID } = req.body;
  const query = "CALL GetSuscripcionByIdSP(?);";
  oMySQLConnection.query(query, [oID], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
};

module.exports = {
  getSuscripciones,
  getSuscripcionesById,
};
