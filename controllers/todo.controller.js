import TodoModel from "../model/todo.model.js";

export const createTodo = async (req, res, next) => {
  try {
    const createModel = await TodoModel.create(req.body);
    res.status(201).json(createModel);
  } catch (error) {
    next(error);
  }
};

export const getAllTodo = async (req, res, next) => {
  try {
    const Todos = await TodoModel.find();
    res.status(200).json(Todos);
  } catch (error) {
    next(error);
  }
};

export const getTodoById = async (req, res, next) => {
  try {
    const todo = await TodoModel.findById(req.params.id);
    if (!todo) {
      res.status(404).json({ message: "No todo found" });
    } else {
      res.status(200).json(todo);
    }
  } catch (error) {
    next(error);
  }
};

export const updateTodo = async (req, res, next) => {
  try {
    const updatedTodo = await TodoModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    if (!updatedTodo) {
      res.status(400).json({ message: "bad request" });
    } else {
      res.status(200).json(updatedTodo);
    }
  } catch (error) {
    next(error);
  }
};
