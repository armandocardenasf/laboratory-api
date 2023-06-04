require("dotenv").config();
const jwt = require("jsonwebtoken");

const TOKEN_SECRET = process.env.TOKEN_SECRET;

// ** NOTE **
// res.locals.user has properties id and type as in the jwt itself.

const adminAuth = (req, res, next) => {
  const authHeader = req.header("authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).send();
    return;
  }

  jwt.verify(token, TOKEN_SECRET, (err, data) => {
    if (!data) {
      res.status(401).send();
      return;
    }

    const isAdmin = data.type === "ADMINISTRADOR" ? true : false;

    if (err || !isAdmin) {
      res.status(403).send();
    } else {
      res.locals.user = data;
      next();
    }
  });
};

const clientAuth = (req, res, next) => {
  const authHeader = req.header("authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).send();
    return;
  }

  jwt.verify(token, TOKEN_SECRET, (err, data) => {
    if (!data) {
      res.status(401).send();
      return;
    }

    const isClient = data.type === "CLIENTE" ? true : false;

    if (err || !isClient) {
      res.send(403).send();
    } else {
      res.locals.user = data;
      next();
    }
  });
};

const userAuth = (req, res, next) => {
  const authHeader = req.header("authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).send();
    return;
  }

  jwt.verify(token, TOKEN_SECRET, (err, data) => {
    if (!data) {
      res.status(401).send();
      return;
    }

    const isUser = data.type === "USUARIO" ? true : false;

    if (err || !isUser) {
      res.send(403).send();
    } else {
      res.locals.user = data;
      next();
    }
  });
};

const authUserAndClient = (req, res, next) => {
  const authHeader = req.header("authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).send();
    return;
  }

  jwt.verify(token, TOKEN_SECRET, (err, data) => {
    console.log(data)
    if (!data) {
      res.status(401).send();
      return;
    }

    const isUserOrClient =
      data.type === "CLIENTE" || data.type === "USUARIO" ? true : false;

    if (err || !isUserOrClient) {
      res.status(403).send();
    } else {
      res.locals.user = data;
      next();
    }
  });
};

module.exports = {
  adminAuth,
  clientAuth,
  userAuth,
  authUserAndClient,
};
