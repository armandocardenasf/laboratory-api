const oMySQLConnection = require("../database");

const getAnalysis = (req, res) => {
  const oIdResultado = req.params["resultadoId"];

  const query = "CALL GetIncertidumbreByResultadoSP(?);";
  oMySQLConnection.query(query, [oIdResultado], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
      res.status(500).json({ message: "Error" });
    }
  });
};

const updateAnalysis = (req, res) => {
  const { oIdCalculo, oValor } = req.body;

  // not implemented yet.
  const query = "CALL UpdateCalculoByIdSP(?, ?);";
  oMySQLConnection.query(query, [oIdCalculo, oValor], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
      res.status(500).json({ message: "Error" });
    }
  });
};

//EXPORTS
module.exports = {
  getAnalysis,
  updateAnalysis,
};
