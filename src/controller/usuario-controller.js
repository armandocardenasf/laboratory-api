const oMySQLConnection = require("../database");
const { hashPassword, verifyPassword } = require("../helpers/hashing");
const {
  generateToken,
  generateRefreshToken,
  REFRESH_TOKEN_SECRET,
} = require("../helpers/tokens");
const jwt = require("jsonwebtoken");

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
const getLogin = async (req, res) => {
  const { oUser, oPass } = req.body;

  // grab hashed password from db.
  query = "SELECT password FROM usuario WHERE correo = ?;";
  const [rows, fields] = await oMySQLConnection.promise().query(query, [oUser]);

  let hashedPassword = "";
  if (rows.length > 0) {
    hashedPassword = rows[0].password;
  } else {
    res.status(401).send();
    return;
  }

  const isValid = await verifyPassword(oPass, hashedPassword);

  if (!isValid) {
    res.status(401).send();
    return;
  }

  // get data from user only if the password is valid.
  query = "CALL LoginSP(?);";
  oMySQLConnection.query(query, [oUser], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
      res.status(401).send();
    }
  });
};

const getNewTokenWithRefreshToken = async (req, res) => {
  const { oRefreshToken } = req.body;

  if (!oRefreshToken) {
    res.status(400).send();
    return;
  }

  // get user data from token
  let userTokenData = Object();
  try {
    jwt.verify(oRefreshToken, REFRESH_TOKEN_SECRET, (err, data) => {
      if (err) {
        res.status(400).send();
        return;
      }

      userTokenData = {
        id: data.id,
        type: data.type,
      };
    });
  } catch (e) {
    res.status(403).send();
    return;
  }

  // check if refresh token is not expired.
  const decoded = jwt.verify(oRefreshToken, REFRESH_TOKEN_SECRET);
  if (decoded.exp * 1000 < Date.now()) {
    res.status(403).send();
    return;
  }

  // check if user exists.
  let query = "SELECT COUNT(*) as count FROM usuario WHERE id = ?;";
  const [rows, fields] = await oMySQLConnection
    .promise()
    .query(query, [userTokenData.id]);

  if (rows[0].count == 0) {
    res.status(403).send();
    return;
  }

  // user exists. Get new token.
  const token = generateToken(userTokenData.id, userTokenData.type);
  res.status(200).json({ token: token });
};

// helper function for getAcessTokens.
const getIdTypeUser = async (oUser, oPass) => {
  let query = "SELECT roles_id FROM usuario WHERE correo = ? AND password = ?;";

  // TODO: hash password and modify the function.
  const [rows, fields] = await oMySQLConnection
    .promise()
    .query(query, [oUser, oPass]);

  if (rows[0].roles_id) {
    return rows[0].roles_id;
  } else {
    throw new Error("Could not get the user.");
  }
};

// helper function for getAcessTokens.
const getTypeUser = async (idTypeUser) => {
  // get the type of user the token is gonna be signed with to identify the permissions of user.
  query = "SELECT nombre FROM roles WHERE id = ?;";

  const [rows, fields] = await oMySQLConnection
    .promise()
    .query(query, [idTypeUser]);

  if (rows[0].nombre) {
    return rows[0].nombre;
  } else {
    throw new Error("Could not get the type of the user.");
  }
};

// GET ACCESS TOKENS.
const getAccessTokens = async (req, res) => {
  /*
  Function which purpose is to get the corresponding JWT and refresh token for the user. The JWT token consists of
  2 different components, which are the id and the type of the user.
  */
  const { oUser, oPass } = req.body;

  let idTypeUser = 0;
  let typeUser = "";

  let query = "SELECT password FROM usuario WHERE correo = ?;";
  const [rows, fields] = await oMySQLConnection.promise().query(query, [oUser]);

  let hashedPassword = "";
  if (rows.length > 0) {
    hashedPassword = rows[0].password;
  } else {
    res.status(401).send();
    return;
  }

  // verify the password validity.
  const isValid = await verifyPassword(oPass, hashedPassword);

  if (!isValid) {
    res.status(401).send();
    return;
  }

  try {
    idTypeUser = await getIdTypeUser(oUser, hashedPassword);
    typeUser = await getTypeUser(idTypeUser);
  } catch (e) {
    res.status(500).send();
    return;
  }

  if (!typeUser) {
    res.status(500).send();
    return;
  }

  // get the id of the user from the email.
  query = "SELECT id FROM usuario WHERE correo = ?;";
  const [rows2, fields2] = await oMySQLConnection
    .promise()
    .query(query, [oUser]);

  let idUser = 0;

  if (rows2[0]) {
    idUser = rows2[0].id;
  } else {
    res.status(500).send();
    return;
  }

  const token = generateToken(idUser, typeUser);
  const refreshToken = generateRefreshToken(idUser, typeUser);

  const data = {
    token: token,
    refreshToken: refreshToken,
  };

  // PUT refresh token and expiration date NOW in db.
  query = "CALL UpdateRefreshTokenSP(?, ?);";
  await oMySQLConnection.promise().query(query, [refreshToken, oUser]);

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
const insertUsuario = async (req, res) => {
  const { oNombre, oApellido, oCorreo, oPass, oTelefono, oRolId } = req.body;

  const hashedPassword = await hashPassword(oPass);

  const query = "CALL InsertUsuarioSP(?,?,?,?,?,?);";
  oMySQLConnection.query(
    query,
    [oNombre, oApellido, oCorreo, hashedPassword, oTelefono, oRolId],
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
const updatePass = async (req, res) => {
  const { oUsuarioId, oPass } = req.body;

  const hashedPassword = await hashPassword(oPass);

  const query = "CALL UpdatePasswordSP(?,?);";
  oMySQLConnection.query(
    query,
    [oUsuarioId, hashedPassword],
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
  getNewTokenWithRefreshToken,
  securedRouteAdmin,
  securedRouteClient,
};
