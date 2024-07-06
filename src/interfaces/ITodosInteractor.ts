import { Todos } from "../entities/Todos";

export interface ITodosInteractor {
  create(userId: string, todo: string): Promise<Todos>;
  update(id: string, todo: string): Promise<Todos>;
  all(): Promise<Todos[]>;
}
