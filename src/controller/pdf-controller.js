const oMySQLConnection = require("../database");
const { jsPDF } = require("jspdf");
const PdfFormat = require("../helpers/pdf-format");
const { response } = require("express");
require("jspdf-autotable");

const sendPDF = async (req, res) => {
  const { oResultadoId } = req.body;

  // get the data. Name of the parameter and also its value for each one of them.
  // need to get it from each resultado.
  // create store procedure.

  const query = "CALL GetResultadoParameterValueSP(?);";
  const [rows, fields] = await oMySQLConnection
    .promise()
    .query(query, [oResultadoId]);

  if (!rows) {
    res.status(500).send("Error");
    return;
  }

  const groupedData = rows[0].reduce((acc, curr) => {
    const key = curr.nombre;
    const unit = curr.unidades;
    const existing = acc.find((item) => item.key === key);
    if (existing) {
      existing.values.push(curr.valor);
    } else {
      acc.push({ key, unit, values: [curr.valor] });
    }
    return acc;
  }, []);

  const formattedData = [];

  for (let i = 0; i < groupedData[0].values.length; i++) {
    for (let j = 0; j < groupedData.length; j++) {
      const { key, unit, values } = groupedData[j];

      // removing "áéíóú"
      const normalizedKey = key
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      const normalizedValue = values[i]
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

      formattedData.push({
        parametro: normalizedKey,
        valor: normalizedValue,
        unidad: unit,
        metodologia: "metodologia",
        desviacion_estandar: "desviacion estandar",
        incertidumbre: "incertidumbre",
        desviacion_metodo: "desviacion metodo",
      });
    }
  }

  console.log(formattedData);
  const doc = new PdfFormat().generate(formattedData);

  // send pdf
  const buffer = doc.output();
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", 'attachment; filename="example.pdf"');
  res.status(200).send(buffer);
};

module.exports = {
  sendPDF,
};
