import { AppDAO } from './dao';
import { IProject } from './src/types/types';

export class ProjectRepository {
    public dao: AppDAO;

    constructor(dao) {
        this.dao = dao;
    }

    public createTable() {
        const sql = `
      CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT)`;
        return this.dao.run(sql);
    }

    public create(name: string) {
        return this.dao.run(
            'INSERT INTO projects (name) VALUES (?)',
            [name]
        );
    }

    public update(project: IProject) {
        const { id, name } = project;
        return this.dao.run(
            `UPDATE projects SET name = ? WHERE id = ?`,
            [name, id]
        );
    }

    public delete(id: string) {
        return this.dao.run(
            `DELETE FROM projects WHERE id = ?`,
            [id]
        );
    }
}
