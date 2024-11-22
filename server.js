import express from "express";

import routes from "./src/routes/postsRoutes.js";
import userRoutes from "./src/routes/usersRoutes.js";

// instanciando o servidor
const app = express();
// servindo arquivos estáticos, dentro de uploads
app.use(express.static("uploads"));
routes(app);
userRoutes(app);

// dizendo em que porta o servidor deve ouvir
app.listen(3000, () => {
  console.log("Servidor escutando...");
});
