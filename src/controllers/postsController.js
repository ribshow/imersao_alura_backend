import { ObjectId } from "mongodb";
import {
  getAllPosts,
  create,
  update,
  findPost,
  updateNew,
  deleteOnePost,
} from "../models/post.js";
import generateDescWithGemini from "../services/geminiService.js";
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

// cria um post com imagem
export async function createPostImage(req, res) {
  const { description, alt } = req.body;
  const newPost = {
    description,
    image_url: req.file.originalname, // recebendo caminho da imagem
    alt,
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

// atualiza um post gerando uma descrição usando api do gemini
export async function updateNewPost(req, res) {
  const { id } = req.params;
  const imageUrl = `http://localhost:3000/${id}.jpg`;
  try {
    const imageBuffer = fs.readFileSync(`uploads/${id}.jpg`);
    const description = await generateDescWithGemini(imageBuffer);
    //console.log(alt);
    const newPost = {
      description: description,
      image_url: imageUrl,
      alt: req.body.alt,
    };

    const postUpdate = await updateNew(id, newPost);
    res.status(200).json(postUpdate);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: `Erro ao atualizar post ${error.message}` });
  }
}

// deleta um post
export async function deletePost(req, res) {
  const { id } = req.params;

  try {
    const postDeleted = await deleteOnePost(id);
    res.status(200).json(postDeleted);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: `Houve um problema ao excluir o post ${error.message}` });
  }
}
