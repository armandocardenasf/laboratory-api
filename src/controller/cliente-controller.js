const oMySQLConnection = require("../database");

const getCliente = (req, res) => {
  const query = "CALL GetClienteSP();";
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
const getClienteById = (req, res) => {
  const { oClienteId } = req.body;

  const query = "CALL GetClienteByIdSP(?);";

  oMySQLConnection.query(query, [oClienteId], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
};
const insertCliente = (req, res) => {
  const { oNombre, oDireccion, oRfc, oExternoId, oSuscripcionId } = req.body;

  const query = "CALL InsertClienteSP(?,?,?,?,?);";

  oMySQLConnection.query(
    query,
    [oNombre, oDireccion, oRfc, oExternoId, oSuscripcionId],
    (err, rows, fields) => {
      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    }
  );
};

const updateCliente = (req, res) => {
  const { oClienteId, oNombre, oDireccion, oRfc, oExternoId, oSuscripcionId } =
    req.body;

  const query = "CALL UpdateClienteSP(?,?,?,?,?,?);";

  oMySQLConnection.query(
    query,
    [oClienteId, oNombre, oDireccion, oRfc, oExternoId, oSuscripcionId],
    (err, rows, fields) => {
      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    }
  );
};

const deleteCliente = (req, res) => {
  const { oClienteId } = req.body;

  const query = "CALL DeleteClienteSP(?);";

  oMySQLConnection.query(query, [oClienteId], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
};

module.exports = {
  getCliente,
  getClienteById,
  insertCliente,
  updateCliente,
  deleteCliente,
};
