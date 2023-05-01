const oMySQLConnection = require("../database");

//GETS
const getRecepcion = (req, res) => {
  const query = "CALL GetRecepcionSP();";
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
const getRecepcionByCliente = (req, res) => {
  const { oClienteID } = req.body;
  const query = "CALL GetRecepcionByClienteIdSP(?);";
  oMySQLConnection.query(query, [oClienteID], (err, rows, fields) => {
    if (!err) {
      console.log(rows);
      res.json(rows);
    } else {
      console.log(err);
      return err;
    }
  });
};
const insertRecepcion = (req, res) => {
  const {
    oFechaMuestreo,
    oFechaRecepcion,
    oFolio,
    oTotalMuestras,
    oClienteID,
    oTipoMuestra,
  } = req.body;

  const query = "CALL InsertRecepcionSP(?,?,?,?,?,?);";

  oMySQLConnection.query(
    query,
    [
      oFechaMuestreo,
      oFechaRecepcion,
      oFolio,
      oTotalMuestras,
      oClienteID,
      oTipoMuestra,
    ],
    (err, rows, fields) => {
      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    }
  );
};
const updateRecepcion = (req, res) => {
  const {
    oID,
    oFechaMuestreo,
    oFechaRecepcion,
    oFolio,
    oTotalMuestras,
    oClienteID,
  } = req.body;

  const query = "CALL UpdateRecepcionSP(?,?,?,?,?,?);";

  oMySQLConnection.query(
    query,
    [oID, oFechaMuestreo, oFechaRecepcion, oFolio, oTotalMuestras, oClienteID],
    (err, rows, fields) => {
      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    }
  );
};
const deleteRecepcion = (req, res) => {
  const { oID } = req.body;

  const query = "CALL DeleteRecepcionSP(?);";

  oMySQLConnection.query(query, [oID], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
};
//EXPORTS
module.exports = {
  getRecepcion,
  getRecepcionByCliente,
  insertRecepcion,
  deleteRecepcion,
  updateRecepcion,
};
