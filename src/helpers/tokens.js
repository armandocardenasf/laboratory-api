require("dotenv").config();
const jwt = require("jsonwebtoken");

const TOKEN_SECRET = process.env.TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

const generateToken = (email, type) => {
  const data = {
    email: email,
    type: type,
  };

  return jwt.sign(data, TOKEN_SECRET, { expiresIn: "15m" });
};

const generateRefreshToken = (email, type) => {
  const data = {
    email: email,
    type: type,
  };

  return jwt.sign(data, REFRESH_TOKEN_SECRET, { expiresIn: "60d" });
};

module.exports = {
  TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  generateToken,
  generateRefreshToken,
};
