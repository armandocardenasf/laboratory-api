const ExcelJS = require("exceljs");

const NUMBER_OF_PARAMETERS_PER_TABLE = 26;

class ExcelDocument {
  constructor() {
    this.workbook = new ExcelJS.Workbook();
  }

  async createFormat(clientData, receptionData) {
    // load copy of format.
    await this.workbook.xlsx.readFile("./src/assets/format.xlsx");

    const generalInfoWorksheet = this.workbook.getWorksheet("Portada");
    generalInfoWorksheet.getCell("L12").value = "6"; // Número de muestras
    generalInfoWorksheet.getCell("H13").value = "Observaciones generales"; // Observaciones generales

    // general information about the results.
    generalInfoWorksheet.getCell("X10").value = clientData["Folio"]; // Número de folio
    generalInfoWorksheet.getCell("X11").value = "Something"; // Fecha de informe
    generalInfoWorksheet.getCell("X12").value = "FechaAnalisis"; // Fecha de análisis
    generalInfoWorksheet.getCell("X13").value = clientData["FechaRecepcion"]; // Fecha de recepción
    generalInfoWorksheet.getCell("X14").value = clientData["FechaMuestreo"]; // Fecha de muestreo

    // data of the client.
    generalInfoWorksheet.getCell("I18").value = clientData["razon_social"]; // Nombre / razón social
    generalInfoWorksheet.getCell("I19").value = clientData["direccion"]; // Dirección de facturación
    generalInfoWorksheet.getCell("I20").value = clientData["rfc"]; // RFC
    generalInfoWorksheet.getCell("I21").value = clientData["telefono"]; // No. Teléfono
    generalInfoWorksheet.getCell("I22").value = clientData["correo"]; // Correo electrónico
    generalInfoWorksheet.getCell("I22").value = clientData["atencion"]; // Con atención a

    let currSheetData;
    for (
      let i = 0;
      i < Math.floor(receptionData.length / NUMBER_OF_PARAMETERS_PER_TABLE);
      i++
    ) {
      // create new worksheets and fill all the corresponding data.
      let formatWorksheet = this.workbook.getWorksheet("Formato");
      let detailWorksheet = this.workbook.addWorksheet(`Detalle ${i + 1}`);

      // copy the format to the new worksheet.
      detailWorksheet.model = Object.assign(formatWorksheet.model, {
        mergeCells: formatWorksheet.model.merges,
      });
      detailWorksheet.name = `Detalle ${i + 1}`;

      // organize the inputted data in an object.
      currSheetData = Object();
      for (let j = 0; j < NUMBER_OF_PARAMETERS_PER_TABLE; j++) {
        const { nombre, unidades, valor } =
          receptionData[i * NUMBER_OF_PARAMETERS_PER_TABLE + j];

        currSheetData[nombre] = valor;
      }

      detailWorksheet.getCell("W11").value = currSheetData["Nombre"];
      detailWorksheet.getCell("J11").value = currSheetData["Modelo"];
      detailWorksheet.getCell("J12").value = "Condición";

      detailWorksheet.getCell("G17").value =
        currSheetData["Acidez Titulable (pH=7.0) [g/L [T]]"]; // acidez titulable
      detailWorksheet.getCell("G18").value =
        currSheetData["Ácido glucónico [g/L]"]; // acidez glucónico
      detailWorksheet.getCell("G19").value =
        currSheetData["Ácido Málico [g/L]"]; // acidez málico
      detailWorksheet.getCell("G20").value =
        currSheetData["Ácido Láctico [g/L]"]; // acidez láctico
      detailWorksheet.getCell("G21").value =
        currSheetData["Ácido Tartárico [g/L]"]; // acidez tartárico
      detailWorksheet.getCell("G22").value =
        currSheetData["Ácidos volátiles [g/L [A]]"]; // acidez volátiles
      detailWorksheet.getCell("G23").value =
        currSheetData["Azúcares totales [g/L]"]; // azúcares totales
      detailWorksheet.getCell("G24").value = currSheetData["Densidad [g/mL]"]; // densidad
      detailWorksheet.getCell("G25").value = "---"; // estabilidad proteica
      detailWorksheet.getCell("G26").value = "---"; // estabilidad tartártica
      detailWorksheet.getCell("G27").value = currSheetData["Etanol [%vol]"]; // etanol
      detailWorksheet.getCell("G28").value = "---"; // extracto
      detailWorksheet.getCell("G29").value = currSheetData["Fructosa [g/L]"]; // fructuosa
      detailWorksheet.getCell("G30").value = currSheetData["Glicerol [g/L]"]; // glicerol
      detailWorksheet.getCell("G31").value = currSheetData["Glucosa [g/L]"]; // glucosa
      detailWorksheet.getCell("G32").value = currSheetData["pH []"]; // pH
      detailWorksheet.getCell("G33").value =
        currSheetData["Polifenoles totales [g/L]"]; // polifenoles totales
      detailWorksheet.getCell("G34").value = currSheetData["Sacarosa [g/L]"]; // sacarosa
      detailWorksheet.getCell("G35").value = "---"; // sulfitos libres
      detailWorksheet.getCell("G36").value = "---"; // sulfitos totales
    }

    // this.workbook.removeWorksheet("Formato");
    return this;
  }

  async getBuffer() {
    const buffer = await this.workbook.xlsx.writeBuffer();
    return buffer;
  }
}

module.exports = ExcelDocument;
