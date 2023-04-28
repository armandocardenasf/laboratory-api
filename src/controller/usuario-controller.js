const oMySQLConnection = require("../database");
const { generateToken } = require("../helpers/tokens");

//GETS
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

// LOGIN OF USER.
const getLogin = (req, res) => {
  const { oUser, oPass } = req.body;

  query = "CALL LoginSP(?,?);";
  oMySQLConnection.query(query, [oUser, oPass], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
};

// GET ACCESS TOKENS.
const getAccessTokens = (req, res) => {
  const { oUser, oPass } = req.body;

  let query = "SELECT roles_id FROM usuario WHERE usuario = ? AND pass = ?;";

  let typeUser = "CLIENTE";
  oMySQLConnection.query(query, [oUser, oPass], (err, rows, fields) => {
    if (!err) {
      typeUser = rows[0].roles_id;
    } else {
      res.state(500).json();
    }
  });

  const token = generateToken(oUser, typeUser);
  const refreshToken = generateRefreshToken(oUser, typeUser);

  const data = {
    token: token,
    refreshToken: refreshToken,
  };

  res.json(data);
};

//CREATES
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

//UPDATES
const updateUsuario = (req, res) => {
  const { oUsuarioId, oNombre, oApellido, oCorreo, oTelefono, oRolId } =
    req.body;

  const query = "CALL UpdateUsuarioSP(?,?,?,?,?,?);";

  oMySQLConnection.query(
    query,
    [oUsuarioId, oNombre, oApellido, oCorreo, oTelefono, oRolId],
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

//DELETES
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

//EXPORTS
module.exports = {
  getUsuarios,
  getUsuarioById,
  insertUsuario,
  updateUsuario,
  updatePass,
  deleteUsuario,
  getAccessTokens,
  getLogin,
};
