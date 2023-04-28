require("dotenv").config();
const jwt = require("jsonwebtoken");

const TOKEN_SECRET = process.env.TOKEN_SECRET;

const adminAuth = (req, res, next) => {
  const authHeader = req.header("authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) res.status(400).send();

  jwt.verify(token, TOKEN_SECRET, (err, data) => {
    const isAdmin = data.type === "ADMINISTRADOR" ? true : false;

    if (err || !isAdmin) {
      res.status(403).send();
    } else {
      next();
    }
  });
};

const clientAuth = (req, res, next) => {
  const authHeader = req.header("authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (token === null) res.status(400).send();

  jwt.verify(token, TOKEN_SECRET, (err, data) => {
    const isClient = data.type === "CLIENTE" ? true : false;

    if (err || !isClient) {
      res.send(403).send();
    } else {
      next();
    }
  });
};

module.exports = {
  adminAuth,
  clientAuth,
};
