const oMySQLConnection = require("../database");

const getUsuarios = (req, res) => {
  const query = "CALL GetUsuarioSP();";
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
const getUsuarioById = (req, res) => {
  const { oUsuarioId } = req.body;

  const query = "CALL GetUsuarioById(?);";

  oMySQLConnection.query(query, [oUsuarioId], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
};
const insertUsuario = (req, res) => {
  const { oNombre, oApellido, oCorreo, oPass, oTelefono, oRolId } = req.body;

  const query = "CALL InsertUsuarioSP(?,?,?,?,?,?);";

  oMySQLConnection.query(
    query,
    [oNombre, oApellido, oCorreo, oPass, oTelefono, oRolId],
    (err, rows, fields) => {
      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    }
  );
};

const updateUsuario = (req, res) => {
  const { oUsuarioId, oNombre, oApellido, oCorreo,  oTelefono, oRolId } =
    req.body;

  const query = "CALL UpdateUsuarioSP(?,?,?,?,?,?);";

  oMySQLConnection.query(
    query,
    [oUsuarioId, oNombre, oApellido, oCorreo,  oTelefono, oRolId],
    (err, rows, fields) => {
      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    }
  );
};
const updatePass = (req, res) => {
  const { oUsuarioId, oPass } = req.body;

  const query = "CALL UpdatePasswordSP(?,?);";

  oMySQLConnection.query(query, [oUsuarioId, oPass], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
};

const deleteUsuario = (req, res) => {
  const { oUsuarioId } = req.body;

  const query = "CALL DeleteUsuarioSP(?);";

  oMySQLConnection.query(query, [oUsuarioId], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
};

const getLogin = (req, res) => {
  const { oUser, oPass } = req.body;
  const query = "CALL LoginSP(?,?);";

  oMySQLConnection.query(query, [oUser, oPass], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
};

module.exports = {
  getUsuarios,
  getUsuarioById,
  insertUsuario,
  updateUsuario,
  updatePass,
  deleteUsuario,
  getLogin,
};
