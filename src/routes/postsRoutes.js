import express from "express";
import listPosts from "../controllers/postsController.js";

const routes = (app) => {
  // convertendo o que for possível para json durante as respostas
  app.use(express.json());

  // criando uma rota para nosso "recurso", localmente seria algo do tipo http://localhost:3000/api
  app.get("/posts", listPosts);
};

export default routes;
