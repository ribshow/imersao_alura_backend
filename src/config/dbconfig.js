import { MongoClient } from "mongodb";

const connectDb = async (stringConnection) => {
  let mongoClient;

  try {
    mongoClient = new MongoClient(stringConnection);
    console.log("Conectando ao cluster do banco de dados...");
    await mongoClient.connect();
    console.log("Conectado ao banco de dados com sucesso!");

    return mongoClient;
  } catch (error) {
    console.error("Falha na conexão!", error);
    process.exit();
  }
};

export default connectDb;
