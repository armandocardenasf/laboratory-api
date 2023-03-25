const oMySQLConnection = require("../database");

const getRoles = (req, res) => {
  const query = "CALL GetRolSP();";
  oMySQLConnection.query(query, (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
};

const getRolesById = (req, res) => {
  const { oID } = req.body;
  const query = "CALL GetRolByIdSP(?);";
  oMySQLConnection.query(query, [oID], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
};

module.exports = {
  getRoles,
  getRolesById,
};
