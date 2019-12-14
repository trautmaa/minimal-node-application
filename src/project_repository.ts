import { AppDAO } from '../dao';
import { IProject } from './types/types';

export class ProjectRepository {

    constructor(public dao: AppDAO) { }

    public createTable() {
        const sql = `
          CREATE TABLE IF NOT EXISTS projects (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            userId INTEGER,
            CONSTRAINT projects_fk_userId FOREIGN KEY (userId)
              REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE)`;
        return this.dao.run(sql);
    }

    public create(name: string, userId: string) {
        return this.dao.run(
            'INSERT INTO projects (name, userId) VALUES (?)',
            [name, userId]
        );
    }

    public update(project: IProject) {
        const { id, name, userId } = project;
        return this.dao.run(
            `UPDATE projects SET
            name = ?,
            userId = ?
            WHERE id = ?`,
            [name, userId, id]
        );
    }

    public delete(id: string) {
        return this.dao.run(
            `DELETE FROM projects WHERE id = ?`,
            [id]
        );
    }

    public getById(id: string) {
        return this.dao.get(
            `SELECT * FROM projects WHERE id = ?`,
            [id]
        );
    }

    public getAll() {
        return this.dao.all(`SELECT * FROM projects`);
    }
}
