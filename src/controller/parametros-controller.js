const oMySQLConnection = require("../database");

//GETS
const getParametros = (req, res) => {
  const query = "CALL GetResultadoSP();";
  oMySQLConnection.query(query, (err, rows, fields) => {
    if (!err) {
      console.log(rows);
      res.json(rows);
    } else {
      res.status(400).send("Bad request.")
    }
  });
};

//CREATES
const insertParametro = (req, res) => {
  const { oNombre, oValor, oUnidades } = req.body;

  const query = "CALL InsertParametroSP(?,?,?);";

  oMySQLConnection.query(
    query,
    [oNombre, oValor, oUnidades],
    (err, rows, fields) => {
      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    }
  );
};

//UPDATES
const updateParametro = (req, res) => {
  const { oParametroId, oNombre, oValor, oUnidades } = req.body;

  const query = "CALL UpdateParametroSP(?,?,?,?);";

  oMySQLConnection.query(
    query,
    [oParametroId, oNombre, oValor, oUnidades],
    (err, rows, fields) => {
      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    }
  );
};

//DELETES
const deleteParametro = (req, res) => {
  const { oParametroId } = req.body;

  const query = "CALL DeleteParametroSP(?);";

  oMySQLConnection.query(query, [oParametroId], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
};

//EXPORTS
module.exports = {
  getParametros,
  insertParametro,
  updateParametro,
  deleteParametro,
};
