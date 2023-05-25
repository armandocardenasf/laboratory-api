const { jsPDF } = require("jspdf");
require("jspdf-autotable");

const NUMBER_OF_PARAMETERS_PER_TABLE = 26;
const DEFAULT_FONT_SIZE = 10;

const normalizeText = (text) => {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

class PdfFormat {
  constructor() {
    this.doc = new jsPDF();
    this.doc.setFontSize(DEFAULT_FONT_SIZE);
  }

  getDocument(resultsData) {
    /*
      Insert the results data into the pdf. Creates multiple tables with the specified number of parameters.
    */
    for (
      let i = 0;
      i < Math.floor(resultsData.length / NUMBER_OF_PARAMETERS_PER_TABLE);
      i++
    ) {
      const tmp = [];
      for (let j = 0; j < NUMBER_OF_PARAMETERS_PER_TABLE; j++) {
        const { nombre, unidades, valor } =
          resultsData[i * NUMBER_OF_PARAMETERS_PER_TABLE + j];

        // removing "áéíóú"
        const normalizedKey = normalizeText(nombre);
        const normalizedValue = normalizeText(valor);
        const normalizedUnits = normalizeText(unidades);

        tmp.push({
          parametro: normalizedKey,
          valor: normalizedValue,
          unidad: normalizedUnits,
          metodologia: "metodologia",
          desviacion_estandar: "desviacion estandar",
          incertidumbre: "incertidumbre",
          desviacion_metodo: "desviacion metodo",
        });
      }
      this.insertTableIntoDocument(tmp);
    }
    return this.doc;
  }

  setClientData(clientData) {
    const docHeight = this.doc.internal.pageSize.getHeight();
    const docWidth = this.doc.internal.pageSize.getWidth();

    this.doc.setFont(undefined, "bold").setFontSize(24);
    this.doc.text("REGISTRO DE CALIDAD", docWidth / 2, 20, {
      align: "center",
    });

    // const img = new Image();
    // img.src = "../assets/cevit.png";

    // // Wait for the image to load
    // img.onload = function () {
    //   var imgWidth = this.width;
    //   var imgHeight = this.height;

    //   this.doc.addImage(this, "PNG", docWidth / 2 - 50, 40, 100, 100);
    //   doc.save("document.pdf");
    // };

    this.doc.setFont(undefined, "bold").setFontSize(16);
    this.doc.text("FOLIO: ", 10, 40);
    this.doc.text(clientData.Folio, 36, 40);

    this.doc.setFontSize(DEFAULT_FONT_SIZE);
    this.doc.setFont(undefined, "bold");
    this.doc.text("Fecha de Muestreo: ", 10, 50);
    this.doc.text("Fecha de recepcion: ", 10, 56);
    this.doc.text("Direccion: ", 10, 86);
    this.doc.text("Total muestras: ", 10, 92);
    this.doc.text("Tipo de muestra: ", 10, 98);
    this.doc.text("Razon social: ", 10, 104);
    this.doc.text("RFC: ", 10, 110);
    this.doc.text("Telefono: ", 10, 116);
    this.doc.text("Correo: ", 10, 122);
    this.doc.text("Atencion: ", 10, 128);

    this.doc.setFont(undefined, "normal");
    this.doc.text(clientData.FechaMuestreo, 50, 50);
    this.doc.text(clientData.FechaRecepcion, 50, 56);
    this.doc.text(normalizeText(clientData.direccion), 50, 86);
    this.doc.text(String(clientData.TotalMuestras), 50, 92);
    this.doc.text(clientData.tipoMuestra ? "Vino" : "Mosto", 50, 98);
    this.doc.text(normalizeText(clientData.razon_social), 50, 104);
    this.doc.text(normalizeText(clientData.rfc), 50, 110);
    this.doc.text(String(clientData.telefono), 50, 116);
    this.doc.text(normalizeText(clientData.correo), 50, 122);
    this.doc.text(normalizeText(clientData.atencion), 50, 128);

    this.doc.addPage();
    return this;
  }

  insertTableIntoDocument(resultsData) {
    let info = [];
    resultsData.forEach((element, index, array) => {
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

    this.doc.autoTable({
      margin: { top: 10 },
      styles: {
        fontSize: 8,
      },
      headStyles: {
        fillColor: "#630021", // Set the background color of the header row
        fontSize: 9,
      },
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
  }
}

module.exports = PdfFormat;
