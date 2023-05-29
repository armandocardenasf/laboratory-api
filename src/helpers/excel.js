const ExcelJS = require("exceljs");

class ExcelDocument {
  constructor() {
    this.workbook = new ExcelJS.Workbook();
  }

  async createFormat() {
    // load copy of format.
    await this.workbook.xlsx.readFile("./src/assets/format.xlsx");

    const generalInfoWorksheet = this.workbook.getWorksheet("Portada");
    generalInfoWorksheet.getCell("L12").value = "6"; // Número de muestras
    generalInfoWorksheet.getCell("H13").value = "Observaciones generales"; // Observaciones generales

    // general information about the results.
    generalInfoWorksheet.getCell("X10").value = "Something"; // Número de folio
    generalInfoWorksheet.getCell("X11").value = "Something"; // Fecha de informe
    generalInfoWorksheet.getCell("X12").value = "Something"; // Fecha de análisis
    generalInfoWorksheet.getCell("X13").value = "Something"; // Fecha de recepción
    generalInfoWorksheet.getCell("X14").value = "Something"; // Fecha de muestreo

    // data of the client.
    generalInfoWorksheet.getCell("I18").value = "Something"; // Nombre / razón social
    generalInfoWorksheet.getCell("I19").value = "Something"; // Dirección de facturación
    generalInfoWorksheet.getCell("I20").value = "Something"; // RFC
    generalInfoWorksheet.getCell("I21").value = "Something"; // No. Teléfono
    generalInfoWorksheet.getCell("I22").value = "Something"; // Correo electrónico
    generalInfoWorksheet.getCell("I22").value = "Something"; // Con atención a

    return this;
  }

  async getBuffer() {
    const buffer = await this.workbook.xlsx.writeBuffer();
    return buffer;
  }
}

module.exports = ExcelDocument;
