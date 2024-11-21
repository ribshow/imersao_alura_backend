import express from "express";
import {
  listPosts,
  createPost,
  uploadImage,
  updatePost,
  showPost,
} from "../controllers/postsController.js";
import multer from "multer";

// função para salvar o arquivo no windows(Para linux e mac esse passo não é necessário) com nome original e não com uma string aleatória
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
// inicializando o multer, dizendo para ele criar e salvar a imagem na pasta uploads
const upload = multer({ dest: "./uploads", storage });

const routes = (app) => {
  // convertendo o que for possível para json durante as respostas
  app.use(express.json());

  // criando uma rota para nosso "recurso", localmente seria algo do tipo http://localhost:3000/api
  app.get("/posts", listPosts);

  // rota para visualizar um post
  app.get("/post/:id", showPost);

  // rota para criar um post
  app.post("/posts", createPost);

  // rota para salvar imagem
  app.post("/posts/upload", upload.single("image"), uploadImage);

  // rota para atualizar uma imagem (exercicio luri)
  app.put("/posts/:id", updatePost);
};

export default routes;
