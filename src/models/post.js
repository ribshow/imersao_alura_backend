import connectDb from "../config/dbconfig.js";
import { ObjectId } from "mongodb";

// instanciando a conexão com o cluster na nuvem
const connection = await connectDb(process.env.STRING_CONNECTION);

const db = connection.db("imersao_alura");
const collection = db.collection("posts");

// dizendo qual banco de dados desejo acessar, qual coleção e retornando o resultado
export async function getAllPosts() {
  return collection.find().toArray();
}

// função para buscar 1 post
export async function findPost(id) {
  const objectId = ObjectId.createFromHexString(id);
  return collection.findOne(objectId);
}

// função parar criar um novo post
export async function create(newPost) {
  return collection.insertOne(newPost);
}

// função para atualziar um post
export async function update(id, updatePost) {
  // normalizo o id recebido como parâmetro para passar para a função update
  const objectId = ObjectId.createFromHexString(id);
  return collection.updateOne({ _id: objectId }, { $set: updatePost });
}
