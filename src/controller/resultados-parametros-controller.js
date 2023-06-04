const oMySQLConnection = require("../database");

// GETS
const getResultadosParametrosByResultadoId = (req, res) => {
  const oResultadoId = req.params["resultId"];

  const query = "CALL GetAnalisissByResultadoIdSP(?);";

  oMySQLConnection.query(query, [oResultadoId], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
      res.status(400).send("Bad request.");
    }
  });
};

const getResultadosParametrosByParameterId = (req, res) => {
  const oParametroId = req.params["parameterId"];

  const query = "CALL GetResultadosParametroByParameterIdSP(?);";
  oMySQLConnection.query(query, [oParametroId], (err, rows) => {
    if (!err) {
      res.json(rows);
    } else {
      res.status(400).send("Bad request.");
    }
  });
};

const getResultadosParametrosByFecha = (req, res) => {
  const { oParametrosFecha } = req.body;

  const query = "CALL GetParametrosByFechaSP(?);";
  oMySQLConnection.query(query, [oParametrosFecha], (err, rows) => {
    if (!err) {
      res.json(rows);
    } else {
      res.status(400).send("Bad request.");
    }
  });
};

//CREATES

const createResultadoParametro = (req, res) => {
  const { oParametroId, oResultadoId, oValor } = req.body;

  const query = "CALL insertResultParameter(?, ?, ?);";

  oMySQLConnection.query(
    query,
    [oParametroId, oResultadoId, oValor],
    (err, rows) => {
      if (!err) {
        res.status(200).send("The value was created successfully.");
      } else {
        res.status(400).send("One of the parameters introduced is wrong.");
      }
    }
  );
};

//UPDATES
const updateResultadoParametro = (req, res) => {
  const { oParametroId, oResultadoId, oValor } = req.body;

  const query = "CALL UpdateResultadoParametroSP(?, ?, ?);";
  oMySQLConnection.query(
    query,
    [oParametroId, oResultadoId, oValor],
    (err, rows) => {
      if (!err) {
        res.status(200).send("The value was updated successfully.");
      } else {
        res.status(400).send("One of the parameters introduced is wrong.");
      }
    }
  );
};
const updateResultadoParametroValue = (req, res) => {
  const { oResultadoParametroID, oValor } = req.body;

  const query = "CALL UpdateResultadoParametroValueSP(?, ?);";
  oMySQLConnection.query(
    query,
    [oResultadoParametroID, oValor],
    (err, rows) => {
      if (!err) {
        res.status(200).send("The value was updated successfully.");
      } else {
        res.status(400).send("One of the parameters introduced is wrong.");
      }
    }
  );
};
//DELETES
const deleteResultadoParametro = (req, res) => {
  const { oParametroId, oResultadoId } = req.body;

  const query = "CALL DeleteResultadoParametroSP(?, ?);";
  oMySQLConnection.query(query, [oParametroId, oResultadoId], (err, rows) => {
    if (!err) {
      res.json(rows);
    } else {
      res.status(400).send("One of the parameters introduced is wrong.");
    }
  });
};

//EXPORTS
module.exports = {
  getResultadosParametrosByResultadoId,
  getResultadosParametrosByParameterId,
  getResultadosParametrosByFecha,
  createResultadoParametro,
  updateResultadoParametro,
  updateResultadoParametroValue,
  deleteResultadoParametro,
};
