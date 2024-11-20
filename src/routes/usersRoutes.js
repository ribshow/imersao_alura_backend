import express from "express";
import createUser from "../controllers/usersController.js";

const userRoutes = (app) => {
  app.use(express.json());

  app.post("/create", createUser);
};

export default userRoutes;
