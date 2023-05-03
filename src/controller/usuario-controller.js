const oMySQLConnection = require("../database");
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
const getLogin = (req, res) => {
  const { oUser, oPass } = req.body;

  // TODO: hash password and modify the function.

  query = "CALL LoginSP(?,?);";
  oMySQLConnection.query(query, [oUser, oPass], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
};

const getNewTokenWithRefreshToken = async (req, res) => {
  const { oRefreshToken } = req.body;

  // get user data from token
  let userTokenData = Object();
  try {
    jwt.verify(oRefreshToken, REFRESH_TOKEN_SECRET, (err, data) => {
      if (err) {
        res.status(400).send();
        return;
      }

      userTokenData = {
        email: data.email,
        type: data.type,
      };
    });
  } catch (e) {
    res.status(403).send();
    return;
  }

  // check if user exists.
  let query = "SELECT COUNT(*) AS count FROM usuario WHERE correo = ?;";
  const [rows, fields] = await oMySQLConnection
    .promise()
    .query(query, [userTokenData.email]);

  if (rows[0].count == 0) {
    res.status(403).send();
    return;
  }

  // user exists. Get new token.
  const token = generateToken(userTokenData.email, userTokenData.type);
  res.status(200).json({ token: token });
};

// helper function for getAcessTokens.
const getIdTypeUser = (oUser, oPass) => {
  let query = "SELECT roles_id FROM usuario WHERE correo = ? AND password = ?;";

  // TODO: hash password and modify the function.
  const [rows, fields] = oMySQLConnection
    .promise()
    .query(query, [oUser, oPass]);

  if (rows[0].roles_id) {
    return rows[0].roles_id;
  } else {
    return new Error("Type of user not found.");
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
    return new Error("Could not get the type of the user.");
  }
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

  try {
    idTypeUser = await getIdTypeUser(oUser, oPass);
    console.log(idTypeUser);
    typeUser = await getTypeUser(idTypeUser);
    console.log("hereee");
  } catch (e) {
    res.status(500).send();
  }

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

  // PUT refresh token and expiration date NOW in db.
  const query = "CALL UpdateRefreshTokenSP(?, ?);";
  await oMySQLConnection.query(query, [refreshToken, oUser]);

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
  getNewTokenWithRefreshToken,
  securedRouteAdmin,
  securedRouteClient,
};
