const { jsPDF } = require("jspdf");
require("jspdf-autotable");

const NUMBER_OF_PARAMETERS_PER_TABLE = 26;

class PdfFormat {
  static getDocument(data) {
    const doc = new jsPDF();
    for (let i = 0; i <= data.length % NUMBER_OF_PARAMETERS_PER_TABLE; i++) {
      const tmp = [];
      for (let j = 0; j < data.length; j++) {
        const { nombre, unidades, valor } =
          data[i * NUMBER_OF_PARAMETERS_PER_TABLE + j];

        // removing "áéíóú"
        const normalizedKey = nombre
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");
        const normalizedValue = valor
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");

        tmp.push({
          parametro: normalizedKey,
          valor: normalizedValue,
          unidad: unidades,
          metodologia: "metodologia",
          desviacion_estandar: "desviacion estandar",
          incertidumbre: "incertidumbre",
          desviacion_metodo: "desviacion metodo",
        });
      }
      this.insertTableIntoDocument(tmp, doc);
    }
    return doc;
  }

  static insertTableIntoDocument(data, doc) {
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
      pageBreak: "always",
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

    doc;
  }
}

module.exports = PdfFormat;
