const express = require("express");
const cors = require("cors");
const clienteRouter = require("./routes/cliente");
const externoRouter = require("./routes/externo");
const logRouter = require("./routes/log");
const parametrosRouter = require("./routes/parametros");
const resultadosRouter = require("./routes/resultados");
const resultadosParametrosRouter = require("./routes/resultados-parametros");
const rolesRouter = require("./routes/roles");
const suscripcionesRouter = require("./routes/suscripciones");
const usuarioRouter = require("./routes/usuario");
const filesRouter = require("./routes/files");
const desviacionRouter = require("./routes/desviacion");
const emailRouter = require("./routes/email");
const excelRouter = require("./routes/excel");
const recepcion = require("./routes/recepcion");
const app = express();

const PORT = 80;

app.use(express.json());
app.use(cors({ credentials: false, origin: "*" }));

app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

app.use("/cliente", clienteRouter);
app.use("/externo", externoRouter);
app.use("/log", logRouter);
app.use("/parametros", parametrosRouter);
app.use("/resultados", resultadosRouter);
app.use("/resultados-parametros", resultadosParametrosRouter);
app.use("/roles", rolesRouter);
app.use("/suscripciones", suscripcionesRouter);
app.use("/usuario", usuarioRouter);
app.use("/files", filesRouter);
app.use("/desviacion", desviacionRouter);
app.use("/email", emailRouter);
app.use("/recepcion", recepcion);
app.use("/excel", excelRouter);

app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING IN ${PORT}`);
});
