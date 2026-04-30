const express = require("express");
const os = require("os");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "API PUCPR DevOps rodando!",
    timestamp: new Date().toISOString(),
    hostname: os.hostname(),
  });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/sobre", (req, res) => {
  res.json({
    projeto: "pucpr-devops",
    disciplina: "DevOps",
    instituicao: "PUCPR",
    versao: "1.0.0",
  });
});

module.exports = app;
