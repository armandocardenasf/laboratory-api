const oMySQLConnection = require('../database');


const getParametrosByResultadoId = (req, res) => {
    const oResultadoId = req.params["resultId"];
  
    const query = "CALL GetParametrosByResultadoIdSP(?);";
  
    oMySQLConnection.query(query, [oResultadoId], (err, rows, fields) => {
      if (!err) {
        res.json(rows);
      } else {
        res.status(400).send("Bad request.")
      }
    });
  };
  
  const getParametroById = (req, res) => {
    const oParametroId = req.params["parameterId"];
  
    const query = 'CALL GetParametroByIdSP(?);';
    oMySQLConnection.query(query, [oParametroId], (err, rows) => {
      if (!err) {
        res.json(rows);
      } else {
        res.status(400).send("Bad request.")
      }
    });
  }
  
  const getParametrosByFecha = (req, res) => {
    const { oParametrosFecha } = req.body;
  
    const query = 'CALL GetParametrosByFechaSP(?);';
    oMySQLConnection.query(query, [oParametrosFecha], (err, rows) => {
      if (!err) {
        res.json(rows);
      } else {
        res.status(400).send("Bad request.")
      }
    });
  }

module.exports = (
    getParametrosByResultadoId,
    getParametroById,
    getParametrosByFecha
);
