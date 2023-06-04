require("dotenv").config();
const jwt = require("jsonwebtoken");

const TOKEN_SECRET = process.env.TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

const generateToken = (id, type) => {
  const data = {
    id: id,
    type: type,
  };

  return jwt.sign(data, TOKEN_SECRET, { expiresIn: "20m" });
};

const generateRefreshToken = (id, type) => {
  const data = {
    id: id,
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
