const ExcelJS = require("exceljs");
const { PDFDocument } = require("pdf-lib");
const fs = require("fs");
const puppeteer = require("puppeteer");

const NUMBER_OF_PARAMETERS_PER_TABLE = 31;

class ExcelDocument {
  constructor() {
    this.workbook = new ExcelJS.Workbook();
  }

  async createFormat(clientData, receptionData, deviationAndVarianceData) {
    // load copy of format.
    await this.workbook.xlsx.readFile("./src/assets/format.xlsx");

    const generalInfoWorksheet = this.workbook.getWorksheet("Portada");
    generalInfoWorksheet.getCell("L12").value = clientData["TotalMuestras"]; // Número de muestras
    generalInfoWorksheet.getCell("H13").value = clientData["observaciones"]; // Observaciones generales

    // general information about the results.
    generalInfoWorksheet.getCell("X10").value = clientData["Folio"]; // Número de folio
    generalInfoWorksheet.getCell("X11").value = clientData["FechaInforme"]; // Fecha de informe
    generalInfoWorksheet.getCell("X12").value = clientData["FechaAnalisis"]; // Fecha de análisis
    generalInfoWorksheet.getCell("X13").value = clientData["FechaRecepcion"]; // Fecha de recepción
    generalInfoWorksheet.getCell("X14").value = clientData["FechaMuestreo"]; // Fecha de muestreo

    // data of the client.
    generalInfoWorksheet.getCell("I18").value = clientData["razon_social"]; // Nombre / razón social
    generalInfoWorksheet.getCell("I19").value = clientData["direccion"]; // Dirección de facturación
    generalInfoWorksheet.getCell("I20").value = clientData["rfc"]; // RFC
    generalInfoWorksheet.getCell("I21").value = clientData["telefono"]; // No. Teléfono
    generalInfoWorksheet.getCell("I22").value = clientData["correo"]; // Correo electrónico
    generalInfoWorksheet.getCell("I22").value = clientData["atencion"]; // Con atención a

    let [deviations, variances] = [Object(), Object()];
    for (const item of deviationAndVarianceData) {
      const { nombre, desviacionEstandar, incertidumbre } = item;
      deviations[nombre] = desviacionEstandar;
      variances[nombre] = incertidumbre;
    }

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
      detailWorksheet.getCell("J12").value = currSheetData["Condición muestra"];

      // data of parameter
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
      detailWorksheet.getCell("G25").value =
        currSheetData["Estabilidad Proteica"]; // estabilidad proteica
      detailWorksheet.getCell("G26").value =
        currSheetData["Estabilidad Tartárica"]; // estabilidad tartártica
      detailWorksheet.getCell("G27").value = currSheetData["Etanol [%vol]"]; // etanol
      detailWorksheet.getCell("G28").value = currSheetData["Extracto [g/L]"]; // extracto
      detailWorksheet.getCell("G29").value = currSheetData["Fructosa [g/L]"]; // fructuosa
      detailWorksheet.getCell("G30").value = currSheetData["Glicerol [g/L]"]; // glicerol
      detailWorksheet.getCell("G31").value = currSheetData["Glucosa [g/L]"]; // glucosa
      detailWorksheet.getCell("G32").value = currSheetData["pH []"]; // pH
      detailWorksheet.getCell("G33").value =
        currSheetData["Polifenoles totales [g/L]"]; // polifenoles totales
      detailWorksheet.getCell("G34").value = currSheetData["Sacarosa [g/L]"]; // sacarosa
      detailWorksheet.getCell("G35").value = currSheetData["Sulfitos libres"]; // sulfitos libres
      detailWorksheet.getCell("G36").value = currSheetData["Sulfitos totales"]; // sulfitos totales

      // deviation
      detailWorksheet.getCell("O17").value =
        deviations["Acidez Titulable (pH=7.0) [g/L [T]]"] ?? ""; // acidez titulable
      detailWorksheet.getCell("O18").value =
        deviations["Ácido glucónico [g/L]"] ?? ""; // acidez glucónico
      detailWorksheet.getCell("O19").value =
        deviations["Ácido Málico [g/L]"] ?? ""; // acidez málico
      detailWorksheet.getCell("O20").value =
        deviations["Ácido Láctico [g/L]"] ?? ""; // acidez láctico
      detailWorksheet.getCell("O21").value =
        deviations["Ácido Tartárico [g/L]"] ?? ""; // acidez tartárico
      detailWorksheet.getCell("O22").value =
        deviations["Ácidos volátiles [g/L [A]]"] ?? ""; // acidez volátiles
      detailWorksheet.getCell("O23").value =
        deviations["Azúcares totales [g/L]"] ?? ""; // azúcares totales
      detailWorksheet.getCell("O24").value =
        deviations["Densidad [g/mL]"] ?? ""; // densidad
      detailWorksheet.getCell("O25").value =
        deviations["Estabilidad Proteica"] ?? ""; // estabilidad proteica
      detailWorksheet.getCell("O26").value =
        deviations["Estabilidad Tartárica"] ?? ""; // estabilidad tartártica
      detailWorksheet.getCell("O27").value = deviations["Etanol [%vol]"] ?? ""; // etanol
      detailWorksheet.getCell("O28").value = deviations["Extracto [g/L]"] ?? ""; // extracto
      detailWorksheet.getCell("O29").value = deviations["Fructosa [g/L]"] ?? ""; // fructuosa
      detailWorksheet.getCell("O30").value = deviations["Glicerol [g/L]"] ?? ""; // glicerol
      detailWorksheet.getCell("O31").value = deviations["Glucosa [g/L]"] ?? ""; // glucosa
      detailWorksheet.getCell("O32").value = deviations["pH []"] ?? ""; // pH
      detailWorksheet.getCell("O33").value =
        deviations["Polifenoles totales [g/L]"] ?? ""; // polifenoles totales
      detailWorksheet.getCell("O34").value = deviations["Sacarosa [g/L]"] ?? ""; // sacarosa
      detailWorksheet.getCell("O35").value =
        deviations["Sulfitos libres"] ?? ""; // sulfitos libres
      detailWorksheet.getCell("O36").value =
        deviations["Sulfitos totales"] ?? ""; // sulfitos totales

      // variance
      detailWorksheet.getCell("Q17").value =
        variances["Acidez Titulable (pH=7.0) [g/L [T]]"] ?? ""; // acidez titulable
      detailWorksheet.getCell("Q18").value =
        variances["Ácido glucónico [g/L]"] ?? ""; // acidez glucónico
      detailWorksheet.getCell("Q19").value =
        variances["Ácido Málico [g/L]"] ?? ""; // acidez málico
      detailWorksheet.getCell("Q20").value =
        variances["Ácido Láctico [g/L]"] ?? ""; // acidez láctico
      detailWorksheet.getCell("Q21").value =
        variances["Ácido Tartárico [g/L]"] ?? ""; // acidez tartárico
      detailWorksheet.getCell("Q22").value =
        variances["Ácidos volátiles [g/L [A]]"] ?? ""; // acidez volátiles
      detailWorksheet.getCell("Q23").value =
        variances["Azúcares totales [g/L]"] ?? ""; // azúcares totales
      detailWorksheet.getCell("Q24").value = variances["Densidad [g/mL]"] ?? ""; // densidad
      detailWorksheet.getCell("Q25").value =
        variances["Estabilidad Proteica"] ?? ""; // estabilidad proteica
      detailWorksheet.getCell("Q26").value =
        variances["Estabilidad Tartárica"] ?? ""; // estabilidad tartártica
      detailWorksheet.getCell("Q27").value = variances["Etanol [%vol]"] ?? ""; // etanol
      detailWorksheet.getCell("Q28").value = variances["Extracto [g/L]"] ?? ""; // extracto
      detailWorksheet.getCell("Q29").value = variances["Fructosa [g/L]"] ?? ""; // fructuosa
      detailWorksheet.getCell("Q30").value = variances["Glicerol [g/L]"] ?? ""; // glicerol
      detailWorksheet.getCell("Q31").value = variances["Glucosa [g/L]"] ?? ""; // glucosa
      detailWorksheet.getCell("Q32").value = variances["pH []"] ?? ""; // pH
      detailWorksheet.getCell("Q33").value =
        variances["Polifenoles totales [g/L]"] ?? ""; // polifenoles totales
      detailWorksheet.getCell("Q34").value = variances["Sacarosa [g/L]"] ?? ""; // sacarosa
      detailWorksheet.getCell("Q35").value = variances["Sulfitos libres"] ?? ""; // sulfitos libres
      detailWorksheet.getCell("Q36").value =
        variances["Sulfitos totales"] ?? ""; // sulfitos totales
    }

    // this.workbook.removeWorksheet("Formato");
    return this;
  }

  async getBuffer() {
    const buffer = await this.workbook.xlsx.writeBuffer();
    return buffer;
  }

  // async convertExcelToPDF() {
  //   const pdfDoc = await PDFDocument.create();

  //   await this.workbook.eachSheet(async (worksheet) => {
  //     for (const image of worksheet.getImages()) {
  //       const img = await this.workbook.model.media.find(
  //         (m) => m.index === image.imageId
  //       );

  //       const page = pdfDoc.addPage();

  //       console.log(worksheet.name);
  //       console.log(img.buffer);

  //       try {
  //         const embeddedImage = await pdfDoc.embedJpg(img.buffer);

  //         const { width, height } = embeddedImage.scale(1);
  //         page.drawImage(embeddedImage, {
  //           x: 0,
  //           y: 0,
  //           width,
  //           height,
  //         });
  //       } catch (e) {
  //         console.log(`Error processing image: ${e.message}`);
  //         continue;
  //       }
  //     }

  //     const pdfBytes = await pdfDoc.save();
  //     return pdfBytes;
  //   });
  // }
}

module.exports = ExcelDocument;
