import express from "express";

import routes from "./src/routes/postsRoutes.js";
import userRoutes from "./src/routes/usersRoutes.js";

// instanciando o servidor
const app = express();
routes(app);
userRoutes(app);

// dizendo em que porta o servidor deve ouvir
app.listen(3000, () => {
  console.log("Servidor escutando...");
});

// função para filtrar um post específico pelo id
const findPost = (id) => {
  return posts.findIndex((post) => {
    return post.id === Number(id);
  });
};

app.get(`/posts/:id`, (req, res) => {
  const index = findPost(req.params.id);
  res.status(200).json(posts[index]);
});
