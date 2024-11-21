import { ObjectId } from "mongodb";
import { getAllPosts, create, update, findPost } from "../models/post.js";
import fs from "fs";

// listar todos os posts
export async function listPosts(req, res) {
  const posts = await getAllPosts();
  res.status(200).json(posts);
}

// listar um único post
export async function showPost(req, res) {
  const { id } = req.params;
  const post = await findPost(id);
  res.status(200).json(post);
}

// função para criar um novo post
export async function createPost(req, res) {
  // recebe o corpo da requisição
  const newPost = req.body;

  try {
    // tenta inserir dentro do banco os dados recebidos na requisição http em new post
    const postCreated = await create(newPost);

    // em caso de sucesso retorna o post criado em formato json com código 201
    res.status(201).json(postCreated);
  } catch (error) {
    console.error(`Algo errado aconteceu: ${error.message}`);
    res.status(500).json({ Error: "Algo errado aconteceu." });
  }
}

// upload de imagens
export async function uploadImage(req, res) {
  const newPost = {
    description: "",
    image_url: req.file.originalname, // recebendo caminho da imagem
    alt: "",
  };

  try {
    // função que insere um novo documento na coleção posts
    const postCreated = await create(newPost);
    // captura o id criado para a imagem que foi inserida em newPost e atribui na const
    const updatedImage = `uploads/${postCreated.insertedId}.jpg`;
    // renomeia o arquivo na pasta uploads para o id que foi gerado na criação do post
    fs.renameSync(req.file.path, updatedImage);

    // caso tudo ocorra bem retorna o post criado
    res.status(201).json(postCreated);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ Error: "Falha na requisição." });
  }
}

// atualizar um post
export async function updatePost(req, res) {
  try {
    const { id } = req.params; // id do documento
    const updatePost = req.body;

    const result = await update(id, updatePost);

    if (result.modifiedCount === 1) {
      res.status(200).json({ message: "Post atualizado com sucesso!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualziar post" });
  }
}
