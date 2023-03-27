const oMySQLConnection = require("../database");

const getExterno = (req, res) => {
  const query = "CALL GetExternoSP();";
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
const getExternoById = (req, res) => {
  const { oExternoId } = req.body;

  const query = "CALL GetExternoByIdSP(?);";

  oMySQLConnection.query(query, [oExternoId], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
};
const insertExterno = (req, res) => {
  const {
    oNoFolio,
    oFechaMuestreo,
    oFechaRecepcion,
    oRazonSocial,
    oRfc,
    oTelefono,
    oCorreo,
    oAtencion,
    oUsuarioId,
  } = req.body;

  const query = "CALL InsertExternoSP(?,?,?,?,?,?,?,?,?);";

  oMySQLConnection.query(
    query,
    [
      oNoFolio,
      oFechaMuestreo,
      oFechaRecepcion,
      oRazonSocial,
      oRfc,
      oTelefono,
      oCorreo,
      oAtencion,
      oUsuarioId,
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

const updateExterno = (req, res) => {
  const {
    oExternoId,
    oNoFolio,
    oFechaMuestreo,
    oFechaRecepcion,
    oRazonSocial,
    oRfc,
    oTelefono,
    oCorreo,
    oAtencion,
    oUsuarioId,
  } = req.body;

  const query = "CALL UpdateExternoSP(?,?,?,?,?,?,?,?,?);";

  oMySQLConnection.query(
    query,
    [
      oExternoId,
      oNoFolio,
      oFechaMuestreo,
      oFechaRecepcion,
      oRazonSocial,
      oRfc,
      oTelefono,
      oCorreo,
      oAtencion,
      oUsuarioId,
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

const deleteExterno = (req, res) => {
  const { oExternoId } = req.body;

  const query = "CALL DeleteExternoSP(?);";

  oMySQLConnection.query(query, [oExternoId], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
};

module.exports = {
  getExterno,
  getExternoById,
  insertExterno,
  updateExterno,
  deleteExterno,
};
