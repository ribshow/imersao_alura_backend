import express from "express";
import cors from "cors";
import {
  listPosts,
  createPost,
  updatePost,
  showPost,
  updateNewPost,
  createPostImage,
} from "../controllers/postsController.js";
import multer from "multer";

// configurando cors
const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200,
};
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

  // configurando corsN
  app.use(cors(corsOptions));

  // criando uma rota para nosso "recurso", localmente seria algo do tipo http://localhost:3000/api
  app.get("/posts", listPosts);

  // rota para visualizar um post
  app.get("/post/:id", showPost);

  // rota para criar um post
  app.post("/posts", createPost);

  // rota para salvar imagem
  app.post("/posts/upload", upload.single("image"), createPostImage);

  // rota para atualizar um post
  app.put("/posts/upload/:id", updateNewPost);

  // rota para atualizar uma imagem (exercicio luri)
  app.put("/posts/:id", updatePost);
};

export default routes;
