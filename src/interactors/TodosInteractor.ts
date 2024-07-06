import { ITodosInteractor } from "../interfaces/ITodosInteractor";
import { ITodosRepository } from "../interfaces/ITodosRepository";

export const TodoInteractor = (
  repository: ITodosRepository
): ITodosInteractor => {
  const create = async (todo: string, userId: string) => {
    if (todo === "") {
      throw new Error("Todo cannot be empty!");
    }
    return await repository.create(userId, todo);
  };

  const update = async (id: string, todo: string) => {
    if (!todo) {
      throw new Error("Todo cannot be empty!");
    }

    return await repository.update(id, todo);
  };
  const all = async () => {
    return await repository.all();
  };

  return {
    create,
    update,
    all,
  };
};
