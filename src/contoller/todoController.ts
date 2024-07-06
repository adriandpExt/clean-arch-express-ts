import { NextFunction, Request, Response } from "express";

import { ITodosInteractor } from "../interfaces/ITodosInteractor";

export const TodoController = (interactor: ITodosInteractor) => {
  const onGetTodos = async (
    _req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const data = await interactor.all();

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

  const onUpdateTodo = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const data = await interactor.update(req.params.id, req.body.todo);

      return res.status(200).json({
        data,
        message: "Task updated successfully.",
      });
    } catch (error) {
      next(error);
    }
  };

  const onCreateTodo = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.user?.id as string;
      const { todo } = req.body;

      const data = await interactor.create(userId, todo);

      return res.status(201).json({
        data,
        message: "Task created successfully.",
      });
    } catch (error) {
      next(error);
    }
  };

  return {
    onGetTodos,
    onUpdateTodo,
    onCreateTodo,
  };
};
