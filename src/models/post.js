import connectDb from "../config/dbconfig.js";

// instanciando a conexão com o cluster na nuvem
const connection = await connectDb(process.env.STRING_CONNECTION);

// dizendo qual banco de dados desejo acessar, qual coleção e retornando o resultado
const getAllPosts = async () => {
  const db = connection.db("imersao_alura");
  const collection = db.collection("posts");
  return collection.find().toArray();
};

export default getAllPosts;
