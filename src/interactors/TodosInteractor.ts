import { ITodosInteractor } from "../interfaces/ITodosInteractor";
import { ITodosRepository } from "../interfaces/ITodosRepository";

export const TodoInteractor = (
  repository: ITodosRepository
): ITodosInteractor => {
  const create = async (todo: string) => {
    return await repository.create(todo);
  };

  const update = async (id: number, todo: string) => {
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
