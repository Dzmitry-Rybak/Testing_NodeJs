import express from "express";
import todoRouter from "./routs/todo.routs.js";
import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost:27017/unit-test-udemy")
  .then(() => console.log("Connected to DataBase"))
  .catch(console.error);

const app = express();

app.use(express.json());

app.use("/todos", todoRouter);

app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message });
});

app.get("/", (req, res) => {
  res.json("Hello world!");
});

export default app;
