// import supertest from "supertest";
import request from "supertest";
import newTodo from "../mock-data/new-todo.json";
import allTodos from "../mock-data/all-todos.json";

import app from "../../app";
const endpointUrl = "/todos";

let firstTodo;

describe(endpointUrl, () => {
  it("POST" + endpointUrl, async () => {
    const response = await request(app).post(endpointUrl).send(newTodo);
    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe(newTodo.title);
  });
  it("should return error 500 on malformed data with POST", async () => {
    const response = await request(app).post(endpointUrl).send({ done: false });
    expect(response.statusCode).toBe(500);
    expect(response.body).toStrictEqual({
      message: "Todo validation failed: title: Path `title` is required.",
    });
  });
  it("GET", async () => {
    const response = await request(app).get(endpointUrl);
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0].title).toBeDefined();
    firstTodo = response.body[0];
  });

  it("GET todo by ID", async () => {
    const response = await request(app).get(endpointUrl + "/" + firstTodo._id);
    expect(response.statusCode).toBe(200);
  });
});
