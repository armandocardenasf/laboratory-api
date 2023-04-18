const oMySQLConnection = require("../database");

//GETS
const getLogs = (req, res) => {
  const { oUser, oPass } = req.body;

  const query = "CALL getLogSP(?,?);";

  oMySQLConnection.query(query, [oUser, oPass], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
};

//CREATES
const insertLogs = (req, res) => {
  const { oFecha, oAccion, oUsuarioId } = req.body;

  const query = "CALL InsertLogSP(?,?,?);";

  oMySQLConnection.query(
    query,
    [oFecha, oAccion, oUsuarioId],
    (err, rows, fields) => {
      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    }
  );
};

//EXPORTS
module.exports = {
  getLogs,
  insertLogs,
};
