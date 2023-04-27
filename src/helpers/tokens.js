require("dotenv").config();
const jwt = require("jsonwebtoken");

const TOKEN_SECRET = process.env.TOKEN_SECRET;

const generateToken = (name, type) => {
  const data = {
    name: name,
    type: type,
  };

  return jwt.sign(data, TOKEN_SECRET, { expiresIn: "14d" });
};

module.exports = {
  generateToken,
};
