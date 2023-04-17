const oMySQLConnection = require('../database');

const deleteAnalisis = (req, res) => {
    const { oUsuarioId, oResultadoID } = req.body;
  
    const query = "CALL DeleteAnalisisSP(?,?);";
  
    oMySQLConnection.query(query, [oUsuarioId, oResultadoID], (err, rows) => {
      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    });
  };


module.exports = {
    deleteAnalisis
};
