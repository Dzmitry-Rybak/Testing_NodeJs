import express from "express";
import {
  createTodo,
  getAllTodo,
  getTodoById,
} from "../controllers/todo.controller.js";

const router = express.Router();

router.route("/").post(createTodo).get(getAllTodo);
router.get("/:id", getTodoById);

export default router;
