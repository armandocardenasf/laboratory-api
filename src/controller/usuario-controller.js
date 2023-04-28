const oMySQLConnection = require("../database");
const { generateToken, generateRefreshToken } = require("../helpers/tokens");

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

// helper function for getAcessTokens.
const getIdTypeUser = (oUser, oPass) => {
  let query = "SELECT roles_id FROM usuario WHERE correo = ? AND password = ?;";

  return new Promise((resolve, reject) => {
    oMySQLConnection.query(query, [oUser, oPass], (err, rows, fields) => {
      if (!err) {
        resolve(rows[0].roles_id);
      } else {
        reject(err);
      }
    });
  });
};

// helper function for getAcessTokens.
const getTypeUser = (idTypeUser) => {
  // get the type of user the token is gonna be signed with to identify the permissions of user.
  query = "SELECT nombre FROM cevitdb.roles WHERE id = ?;";

  return new Promise((resolve, reject) => {
    oMySQLConnection.query(query, [idTypeUser], (err, rows) => {
      if (!err) {
        resolve(rows[0].nombre);
      } else {
        reject(err);
      }
    });
  });
};

// GET ACCESS TOKENS.
const getAccessTokens = async (req, res) => {
  /*
  Function which purpose is to get the corresponding JWT and refresh token for the user. The JWT token consists of
  2 different components, which are the email and the type of the user.
  */
  const { oUser, oPass } = req.body;

  let idTypeUser = 0;
  let typeUser = "";

  idTypeUser = await getIdTypeUser(oUser, oPass);
  typeUser = await getTypeUser(idTypeUser);

  if (!typeUser) {
    res.status(500).send();
    return;
  }

  const token = generateToken(oUser, typeUser);
  const refreshToken = generateRefreshToken(oUser, typeUser);

  const data = {
    token: token,
    refreshToken: refreshToken,
  };

  res.json(data);
};

// TESTING ROUTE
const securedRouteAdmin = (req, res) => {
  res.status(200).send();
};

// TESTING ROUTE
const securedRouteClient = (req, res) => {
  res.status(200).send();
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
  securedRouteAdmin,
  securedRouteClient,
};
