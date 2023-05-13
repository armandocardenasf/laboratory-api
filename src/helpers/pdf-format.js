const { jsPDF } = require("jspdf");
require("jspdf-autotable");

class PdfFormat {
  static getDocument(groupedData) {
    const doc = new jsPDF();
    // const docs = [];
    for (let i = 0; i < groupedData[0].values.length; i++) {
      const tmp = [];
      for (let j = 0; j < groupedData.length; j++) {
        const { key, unit, values } = groupedData[j];

        // removing "áéíóú"
        const normalizedKey = key
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");
        const normalizedValue = values[i]
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");

        tmp.push({
          parametro: normalizedKey,
          valor: normalizedValue,
          unidad: unit,
          metodologia: "metodologia",
          desviacion_estandar: "desviacion estandar",
          incertidumbre: "incertidumbre",
          desviacion_metodo: "desviacion metodo",
        });
      }
      this.insertTableIntoDocument(tmp, doc);
      // const doc = this.createPdf(tmp);
      // docs.push(doc);
    }

    // return docs;
    return doc;
  }

  static getGroupedData(data) {
    return data.reduce((acc, curr) => {
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
