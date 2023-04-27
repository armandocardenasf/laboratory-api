require("dotenv").config();
const jwt = require("jsonwebtoken");

const TOKEN_SECRET = process.env.TOKEN_SECRET;

module.exports = (req, res, next) => {
  const authHeader = req.header("authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (token === null) res.status(400).send();

  jwt.verify(token, TOKEN_SECRET, (err, data) => {
    const userType = data.type;

    if (err || userType !== "client") {
      res.send(403).send();
    } else {
      next();
    }
  });
};
