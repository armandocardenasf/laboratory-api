const { jsPDF } = require("jspdf");
require("jspdf-autotable");

class PdfFormat {
  generate(data) {
    const doc = new jsPDF();

    let info = [];
    data.forEach((element, index, array) => {
      info.push([
        element.no,
        element.id,
        element.m15,
        element.v15,
        element.emb,
        element.mant,
        element.mc,
        element.ep,
        element.et,
        element.bt,
        element.s02,
      ]);
    });

    doc.autoTable({
      head: [
        [
          "No.",
          "ID",
          "M15",
          "V15",
          "Emb",
          "Mant",
          "MC",
          "EP",
          "ET",
          "BT",
          "S02",
        ],
      ],
      body: info,
    });

    return doc;
  }
}

module.exports = PdfFormat;
