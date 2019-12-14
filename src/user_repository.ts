import { AppDAO } from '../dao';
import { IUser } from './types/types';

export class UserRepository {

    constructor(public dao: AppDAO) { }

    public createTable() {
        const sql = `
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          email TEXT)`;
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

    public getById(id: string) {
        return this.dao.get(
            `SELECT * FROM users WHERE id = ?`,
            [id]
        );
    }

    public getAll() {
        return this.dao.all(`SELECT * FROM users`);
    }

    public getProjects(projectId: string) {
        return this.dao.all(
            `SELECT * FROM projects WHERE userId = ?`,
            [projectId]
        );
    }
}
