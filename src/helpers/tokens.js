require("dotenv").config();
const jwt = require("jsonwebtoken");

const TOKEN_SECRET = process.env.TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

const generateToken = (name, type) => {
  const data = {
    name: name,
    type: type,
  };

  return jwt.sign(data, TOKEN_SECRET, { expiresIn: "15m" });
};

const generateRefreshToken = (name, type) => {
  const data = {
    name: name,
    type: type,
  };

  return jwt.sign(data, REFRESH_TOKEN_SECRET, { expiresIn: "60d" });
};

module.exports = {
  generateToken,
  generateRefreshToken,
};
