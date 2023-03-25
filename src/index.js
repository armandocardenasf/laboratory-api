const express = require("express");
const cors = requerie("cors");
const clienteRouter = require("./routes/cliente");
const externoRouter = require("./routes/externo");
const logRouter = require("./routes/log");
const parametrosRouter = require("./routes/parametros");
const resultadosRouter = require("./routes/resultados");
const rolesRouter = require("./routes/roles");
const suscripcionesRouter = require("./routes/suscripciones");
const usuarioRouter = require("./routes/usuario");

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors({ credentials: false, origin: "*" }));

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/cliente", clienteRouter);
app.use("/externo", externoRouter);
app.use("/log", logRouter);
app.use("/parametros", parametrosRouter);
app.use("/resultados", resultadosRouter);
app.use("/roles", rolesRouter);
app.use("/suscripciones", suscripcionesRouter);
app.use("/usuario", usuarioRouter);

app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING IN ${PORT}`);
});
