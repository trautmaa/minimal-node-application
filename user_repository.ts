import { AppDAO } from './dao';
import { IUser } from './src/types/types';

export class UserRepository {
    public dao: AppDAO;

    constructor(dao) {
        this.dao = dao;
    }

    public createTable() {
        const sql = `
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          description TEXT,
          isComplete INTEGER DEFAULT 0,
          projectId INTEGER,
          CONSTRAINT users_fk_projectId FOREIGN KEY (projectId)
            REFERENCES projects(id) ON UPDATE CASCADE ON DELETE CASCADE)`
        return this.dao.run(sql);
    }

    public create(name: string, email: string) {
        return this.dao.run(
            'INSERT INTO users (name, email) VALUES (?, ?)',
            [name, email]
        );
    }

  public update(user: IUser) {
    const { id, name, email } = user;
    return this.dao.run(
      `UPDATE users
      SET name = ?,
        email = ?,
      WHERE id = ?`,
      [name, email, id]
    );
  }

  public delete(id: string) {
      return this.dao.run(
          `DELETE FROM users WHERE id = ?`,
          [id]
      );
  }
}
