import express from "express";

import book from "./book.js";

const posts = [
  {
    id: 1,
    description: "Foto sol",
    image: "https://placecats.com/millie/300/150",
  },
  {
    id: 2,
    description: "Foto lua",
    image: "https://placecats.com/millie/300/150",
  },
  {
    id: 3,
    description: "Foto rua",
    image: "https://placecats.com/millie/300/150",
  },
  {
    id: 4,
    description: "Foto casa",
    image: "https://placecats.com/millie/300/150",
  },
  {
    id: 5,
    description: "Foto ladeira",
    image: "https://placecats.com/millie/300/150",
  },
];

// instanciando o servidor
const app = express();

// convertendo o que for possível para json durante as respostas
app.use(express.json());

// dizendo em que porta o servidor deve ouvir
app.listen(3000, () => {
  console.log("Servidor escutando...");
});

// criando uma rota para nosso "recurso", localmente seria algo do tipo http://localhost:3000/api
app.get("/posts", (req, res) => {
  res.status(200).json(posts);
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

// exercício sugerido pela Luri aula 1
app.get("/book", (req, res) => {
  res.status(200).send(book);
});

// exercício sugerido pela Luri aula 2

const findPostforDescription = (description) => {
  // removendo os espaços e aplicando lowerCase
  const descriptionNormalized = description.replace(/\s+/g, "").toLowerCase();
  return posts.filter((post) => {
    // removendo espaços e aplicando lowercase
    const normalizedPostDescription = post.description
      .replace(/\s+/g, "")
      .toLowerCase();

    // comparando as strings normalziadas
    return normalizedPostDescription === descriptionNormalized;
  });
};

app.get("/post/:description", (req, res) => {
  const index = findPostforDescription(req.params.description);
  res.status(200).json(index);
});
