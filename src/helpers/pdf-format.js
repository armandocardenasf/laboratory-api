const { jsPDF } = require("jspdf");
require("jspdf-autotable");

class PdfFormat {
  generate(data) {
    const doc = new jsPDF();

    let info = [];
    data.forEach((element, index, array) => {
      info.push([
        element.parametro,
        element.valor,
        element.unidad,
        element.metodologia,
        element.desviacion_estandar,
        element.incertidumbre,
        element.desviacion_metodo,
      ]);
    });

    doc.autoTable({
      head: [
        [
          "Parametro",
          "Valor",
          "Unidad",
          "Metodologia",
          "Desviacion estandar",
          "Incertidumbre",
          "Dev. del metodo",
        ],
      ],
      body: info,
    });

    return doc;
  }
}

module.exports = PdfFormat;
