import express from "express";

import book from "./book.js";

const app = express();

app.listen(3000, () => {
  console.log("Servidor escutando...");
});

app.get("/api", (req, res) => {
  res.status(200).send("Bem-vindo à imersão alura!");
});

// exercício sugerido pela Luri
app.get("/book", (req, res) => {
  res.status(200).send(book);
});
