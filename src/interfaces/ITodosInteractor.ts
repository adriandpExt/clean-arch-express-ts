import { Todos } from "../entities/Todos";

export interface ITodosInteractor {
  create(todo: string): Promise<Todos>;
  update(id: number, todo: string): Promise<Todos>;
  all(): Promise<Todos[]>;
}
