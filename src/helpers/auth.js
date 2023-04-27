require("dotenv").config();
const jwt = require("jsonwebtoken");

const TOKEN_SECRET = process.env.TOKEN_SECRET;

const adminAuth = (req, res, next) => {
  const authHeader = req.header("authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (token === null) res.status(400).send();

  jwt.verify(token, TOKEN_SECRET, (err, data) => {
    const isAdmin = data.type === "admin" ? true : false;

    if (err || !isAdmin) {
      res.send(403).send();
    } else {
      next();
    }
  });
};

const userAuth = (req, res, next) => {
  const authHeader = req.header("authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (token === null) res.status(400).send();

  jwt.verify(token, TOKEN_SECRET, (err, data) => {
    const isClient = data.type === "client" ? true : false;

    if (err || !isClient) {
      res.send(403).send();
    } else {
      next();
    }
  });
};

modele.exports = {
  adminAuth,
  userAuth,
};
