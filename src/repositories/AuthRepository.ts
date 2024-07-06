import { RowDataPacket } from "mysql2";
import connection from "../db/connection";
import { Auth } from "../entities/Auth";
import { IAuthRepository } from "../interfaces/IAuthRepository";

export const AuthRepository: IAuthRepository = {
  async login(email: string): Promise<Auth> {
    return new Promise<Auth>((resolve, reject) => {
      const values = [email];
      connection.query(
        "SELECT * FROM user_tbl WHERE email = ?",
        values,
        (err, results: RowDataPacket[]) => {
          if (err) {
            reject(new Error(`Database error: ${err.message}`));
          } else {
            resolve(results[0] as Auth);
          }
        }
      );
    });
  },

  register(email: string, password: string) {
    return new Promise<Auth>((resolve, reject) => {
      const values = [email, password];

      const postSQL = `INSERT INTO user_tbl (email, password) VALUES (?,?)`;
      connection.query(postSQL, values, (err, _results) => {
        if (err) {
          reject(err);
        } else {
          const newAccount: Auth = {
            email: email,
            password: password,
          };
          resolve(newAccount);
        }
      });
    });
  },
};
