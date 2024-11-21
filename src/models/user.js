import connectDb from "../config/dbconfig.js";

// instanciando a conexão com o cluster na nuvem
const connection = await connectDb(process.env.STRING_CONNECTION);

// função para inserir múltiplos documentos na coleção user
const createCollection = async () => {
  try {
    // crio um array de com os objetos que serão inseridos
    const users = [
      {
        username: "Billy",
        email: "billy@alura.com",
        password: "imersao_alura",
        createdAt: new Date(),
      },
      {
        username: "Mandy",
        email: "mandy@alura.com",
        password: "imersao_alura",
        createdAt: new Date(),
      },
      {
        username: "Kick Buttowski",
        email: "kick@alura.com",
        password: "imersao_alura",
        createdAt: new Date(),
      },
    ];
    const db = connection.db("imersao_alura");
    const collectionUsers = db.collection("users");
    const insertManyResult = await collectionUsers.insertMany(users);
    let ids = insertManyResult.insertedIds;

    console.log(
      `${insertManyResult.insertedCount} documentos foram inseridos.`
    );

    for (let id of Object.values(ids)) {
      console.log(`Documento inserido com id ${id}`);
    }

    return "Users criado com sucesso!";
  } catch (error) {
    console.log("Ocorreu um erro ao processar a requisição", error);
  }
};

export default createCollection;
