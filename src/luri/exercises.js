import book from "../../book";

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
