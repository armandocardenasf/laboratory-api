const oMySQLConnection = require("../database");

const getParametros = (req, res) => {
  const query = "CALL GetResultadoSP();";
  oMySQLConnection.query(query, (err, rows, fields) => {
    if (!err) {
      console.log(rows);
      res.json(rows);
    } else {
      console.log(err);
      return err;
    }
  });
};
const getParametrosByResultadoId = (req, res) => {
  const { oResultadoId } = req.body;

  const query = "CALL GetParametroByResultadoIdSP(?);";

  oMySQLConnection.query(query, [oResultadoId], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
};
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
module.exports = {
  getParametros,
  getParametrosByResultadoId,
  insertParametro,
  updateParametro,
  deleteParametro,
};
