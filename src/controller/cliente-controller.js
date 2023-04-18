const oMySQLConnection = require("../database");

//GETS
const getCliente = (req, res) => {
  const query = "CALL GetClientesSP();";
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

  const query = "CALL GetClienteById(?);";

  oMySQLConnection.query(query, [oClienteId], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
};
const getClienteByExternoId = (req, res) => {
  const { oExternoId } = req.body;

  const query = "CALL GetClientesByExternoId(?);";

  oMySQLConnection.query(query, [oExternoId], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
};

//CREATES
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

//UPDATES
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

//DELETES
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

//EXPORTS
module.exports = {
  getCliente,
  getClienteById,
  getClienteByExternoId,
  insertCliente,
  updateCliente,
  deleteCliente,
};
