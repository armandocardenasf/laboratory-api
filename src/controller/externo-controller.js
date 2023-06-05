const oMySQLConnection = require("../database");

//GETS
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

  const query = "CALL GetExternoById(?);";

  oMySQLConnection.query(query, [oExternoId], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
};
const getExternoByUserId = (req, res) => {
  const { oUserId } = req.body;

  const query = "CALL GetExternoByUserIdSP(?);";

  oMySQLConnection.query(query, [oUserId], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
};

//CREATES
const insertExterno = (req, res) => {
  const { oRazonSocial, oRfc, oTelefono, oCorreo, oAtencion, oUsuarioId } =
    req.body;

  const query = "CALL InsertExternoSP(?,?,?,?,?,?);";

  oMySQLConnection.query(
    query,
    [oRazonSocial, oRfc, oTelefono, oCorreo, oAtencion, oUsuarioId],
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
const updateExterno = (req, res) => {
  const {
    oExternoId,
    oRazonSocial,
    oRfc,
    oTelefono,
    oCorreo,
    oAtencion,
    oUsuarioId,
  } = req.body;

  const query = "CALL UpdateExternoSP(?,?,?,?,?,?,?);";

  oMySQLConnection.query(
    query,
    [oExternoId, oRazonSocial, oRfc, oTelefono, oCorreo, oAtencion, oUsuarioId],
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

//EXPORTS
module.exports = {
  getExterno,
  getExternoById,
  getExternoByUserId,
  insertExterno,
  updateExterno,
  deleteExterno,
};
