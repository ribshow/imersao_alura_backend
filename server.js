import express from "express";

import book from "./book.js";

// instanciando o servidor
const app = express();

// dizendo em que porta o servidor deve ouvir
app.listen(3000, () => {
  console.log("Servidor escutando...");
});

// criando uma rota para nosso "recurso" localmente seria algo do tipo http://localhost:3000/api
app.get("/api", (req, res) => {
  res.status(200).send("Bem-vindo à imersão alura!");
});

// exercício sugerido pela Luri
app.get("/book", (req, res) => {
  res.status(200).send(book);
});
