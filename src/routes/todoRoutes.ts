import express from "express";
import { TodoController } from "../contoller/todoController";
import { TodoRepository } from "../repositories/TodoRepository";
import { TodoInteractor } from "../interactors/TodosInteractor";

const repository = TodoRepository;
const interactor = TodoInteractor(repository);

const controller = TodoController(interactor);

const router = express.Router();

router.get("/todos", controller.onGetTodos);
router.post("/todos", controller.onCreateTodo);
router.put("/todos/:id", controller.onUpdateTodo);

export default router;
