import {
  createTodo,
  getAllTodo,
  getTodoById,
  updateTodo,
} from "../../controllers/todo.controller.js";
import TodoModel from "../../model/todo.model.js";
import newTodo from "../mock-data/new-todo.json";
import allTodos from "../mock-data/all-todos.json";

// <- Mock http request ->
import httpMocks from "node-mocks-http";

// <- Create mock function ->
// TodoModel.create = jest.fn();
// TodoModel.find = jest.fn();
// TodoModel.findById = jest.fn();
// TodoModel.findByIdAndUpdate = jest.fn();

// Just mock all functions include in this file as jest.fn()
jest.mock("../../model/todo.model");

let req, res, next;
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe("TodoController.updateTodo", () => {
  it("should have a updateTodo method", () => {
    expect(typeof updateTodo).toBe("function");
  });
  it("should call findByIdAndUpdate with body and id", async () => {
    req.params.id = "1";
    req.body = { done: true };
    await updateTodo(req, res, next);

    expect(TodoModel.findByIdAndUpdate).toBeCalledWith("1", { done: true });
  });
});

describe("TodoController.getTodoById", () => {
  it("should have a getTodoById", async () => {
    expect(typeof getTodoById).toBe("function");
  });
  it("should call findById with route parameters", async () => {
    req.params.id = "to-do_Id";
    await getTodoById(req, res, next);
    expect(TodoModel.findById).toBeCalledWith("to-do_Id");
  });
  it("should return json body and status code 200", async () => {
    TodoModel.findById.mockReturnValue(newTodo);
    await getTodoById(req, res, next);

    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(newTodo);
  });
  it("should handle error with incorrect id", async () => {
    const errorMessage = { message: "Handled Error" };
    const rejectPromise = Promise.reject(errorMessage);
    TodoModel.findById.mockReturnValue(rejectPromise);

    await getTodoById(req, res, next);

    expect(next).toBeCalledWith(errorMessage);
  });

  it("should return 404 status and not found message", async () => {
    TodoModel.findById.mockReturnValue(null);
    await getTodoById(req, res, next);
    expect(res.statusCode).toBe(404);
  });
});

describe("TodoController.getAllToDo", () => {
  it("should return all todo collections", async () => {
    expect(typeof getAllTodo).toBe("function");
  });

  it("should return status code 200 and all todos", async () => {
    TodoModel.find.mockReturnValue(allTodos);
    await getAllTodo(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy(); // To ensure that we receive response back
    expect(res._getJSONData()).toStrictEqual(allTodos);
  });

  it("should handle error if there empty todo list", async () => {
    const errorMessage = { message: "there are no todos" };
    const reject = Promise.reject(errorMessage);
    TodoModel.find.mockReturnValue(reject);

    await getAllTodo(req, res, next);
    expect(next).toBeCalledWith(errorMessage);
  });
});

describe("TodoController.createTodo", () => {
  beforeEach(() => {
    req.body = newTodo;
  });

  it("should have a createTodo function", () => {
    expect(typeof createTodo).toBe("function");
  });

  it("should call TodoModel.create", () => {
    createTodo(req, res, next);
    expect(TodoModel.create).toBeCalledWith(newTodo);
  });

  it("should return 201 response code", async () => {
    await createTodo(req, res, next);
    expect(res.statusCode).toBe(201);

    expect(res._isEndCalled()).toBeTruthy(); // To ensure that we receive response back
  });

  it("should return json body in response", async () => {
    TodoModel.create.mockReturnValue(newTodo);

    await createTodo(req, res, next);

    expect(res._getJSONData()).toStrictEqual(newTodo);
  });

  it("It should handle errors", async () => {
    const errorMessage = { message: "Title property missing" };
    const rejectPromise = Promise.reject(errorMessage);
    TodoModel.create.mockReturnValue(rejectPromise);

    await createTodo(req, res, next);
    expect(next).toBeCalledWith(errorMessage);
  });
});
