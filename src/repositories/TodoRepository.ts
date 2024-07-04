import connection from "../db/connection";
import { Todos } from "../entities/Todos";
import { ITodosRepository } from "../interfaces/ITodosRepository";

export const TodoRepository: ITodosRepository = {
  async create(todo: string) {
    return new Promise<Todos>((resolve, reject) => {
      const postSQL = `INSERT INTO todo_tbl (todo) VALUES (?)`;

      connection.query(postSQL, [todo], (err, results) => {
        if (err) {
          console.log(err.message);
          reject(err);
        } else {
          const newTodo: Todos = {
            id: (results as unknown as Todos).id,
            todo: todo,
          };
          resolve(newTodo);
        }
      });
    });
  },

  async update(id: number, todo: string) {
    return new Promise<Todos>((resolve, reject) => {
      const values = [todo, id];
      const putSQL = `UPDATE todo_tbl SET todo = ? WHERE id = ?`;

      connection.query(putSQL, values, (err, _results) => {
        if (err) {
          console.log(err.message);
          reject(err);
        } else {
          const updatedTodo: Todos = {
            id: id,
            todo: todo,
          };
          resolve(updatedTodo);
        }
      });
    });
  },

  async all() {
    return new Promise<Todos[]>((resolve, reject) => {
      const query = "SELECT * FROM todo_tbl";

      connection.query(query, (err: Error | null, results: Todos[]) => {
        if (err) {
          reject(err);
        } else {
          if (results.length === 0) {
            resolve([]);
          } else {
            resolve(results);
          }
        }
      });
    });
  },
};
