const oMySQLConnection = require("../database");

//GETS
const getResultados = (req, res) => {
  const { oFolio } = req.body;
  const query = "CALL GetResultadosByFolio(?);";
  oMySQLConnection.query(query, [oFolio], (err, rows, fields) => {
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
  oMySQLConnection.query(query, [oClienteId], (err, rows) => {
    if (!err) {
      res.json(rows);
    } else {
      res.status(400).send("Bad request.");
    }
  });
};

const getAllResultadosByClienteId = (req, res) => {
  const oClienteId = req.params["clientId"];

  const query = "CALL GetAllResultadosByClienteIdSP(?);";
  oMySQLConnection.query(query, [oClienteId], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      res.status(400).send("Bad request.");
    }
  });
};

//CREATES
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

//UPDATES
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

//DELETES
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

//EXPORTS
module.exports = {
  getResultados,
  getResultadoByClienteId,
  getAllResultadosByClienteId,
  insertResultado,
  updateResultado,
  deleteResultado,
};
