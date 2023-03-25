const oMySQLConnection = require("../database");

const getResultados = (req, res) => {
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
const getResultadoByClienteId = (req, res) => {
  const { oClienteId } = req.body;

  const query = "CALL GetResultadoByClienteIdSP(?);";

  oMySQLConnection.query(query, [oClienteId], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
};
const insertResultado = (req, res) => {
  const {
    oMuestra,
    oTipoMuestra,
    oFechaMuestra,
    oFechaRecepcion,
    oCantidadMuestras,
    oFechaAnalisis,
    oFechaInforme,
    oHoraAnalisis,
    oClienteId,
  } = req.body;

  const query = "CALL InsertResultadoSP(?,?,?,?,?,?,?,?,?);";

  oMySQLConnection.query(
    query,
    [
      oMuestra,
      oTipoMuestra,
      oFechaMuestra,
      oFechaRecepcion,
      oCantidadMuestras,
      oFechaAnalisis,
      oFechaInforme,
      oHoraAnalisis,
      oClienteId,
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
const updateResultado = (req, res) => {
  const {
    oResultadoId,
    oMuestra,
    oTipoMuestra,
    oFechaMuestra,
    oFechaRecepcion,
    oCantidadMuestras,
    oFechaAnalisis,
    oFechaInforme,
    oHoraAnalisis,
    oClienteId,
  } = req.body;

  const query = "CALL UpdateResultadoSP(?,?,?,?,?,?,?,?,?,?);";

  oMySQLConnection.query(
    query,
    [
      oResultadoId,
      oMuestra,
      oTipoMuestra,
      oFechaMuestra,
      oFechaRecepcion,
      oCantidadMuestras,
      oFechaAnalisis,
      oFechaInforme,
      oHoraAnalisis,
      oClienteId,
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
const deleteResultado = (req, res) => {
  const { oResultadoId } = req.body;

  const query = "CALL DeleteResultadoSP(?);";

  oMySQLConnection.query(query, [oResultadoId], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
};
module.exports = {
  getResultados,
  getResultadoByClienteId,
  insertResultado,
  updateResultado,
  deleteResultado,
};
