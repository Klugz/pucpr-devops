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

module.exports = app;
