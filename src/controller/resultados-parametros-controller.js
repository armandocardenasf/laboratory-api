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

const updateResultadoParametro = (req, res) => {
    const { oParametroId, oResultadoId, oValor } = req.body;

    const query = 'CALL UpdateResultadoParametroSP(?, ?);';
    oMySQLConnection.query(query, [oParametroId, oResultadoId, oValor], (err, rows) => {
        if (!err) {
            res.status(200).send("The value was updates successfully.");
        } else {
            res.status(400).send("One of the parameters introduced is wrong.");
        }
    });
}

const deleteResultadoParametro = (req, res) => {
    const { oParametroId, oResultadoId } = req.body;

    const query = 'CALL DeleteResultadoParametroSP(?, ?);';
    oMySQLConnection.query(query, [oParametroId, oResultadoId], (err, rows) => {
        if (!err) {
            res.status(200).send("The value was deleted successfully.");
        } else {
            res.status(400).send("One of the parameters introduced is wrong.");
        }
    })
}

module.exports = (
    getParametrosByResultadoId,
    getParametroById,
    getParametrosByFecha,
    updateResultadoParametro,
    deleteResultadoParametro
);
