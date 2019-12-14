
import Promise from 'bluebird';
import { AppDAO } from '../dao';
import { ProjectRepository } from './project_repository';
import { UserRepository } from './user_repository';
import { IProject, IUser, IDatabase } from './types/types';
import cors from "cors";
import "dotenv/config";
import express from "express";
import { messageRoutes } from "./routes/messages";
import { userRoutes } from "./routes/users";

function dbSetup() {
    const dao = new AppDAO('./database.sqlite3');
    const userData = { name: 'Traut', email: 'hello.com' };
    const projectRepo = new ProjectRepository(dao);
    const userRepo = new UserRepository(dao);
    let userId: string;

    userRepo.createTable()
        .then(() => projectRepo.createTable())
        .then(() => userRepo.create(userData.name, userData.email))
        .then((data: { id: string }) => {
            userId = data.id;
            const projects: Array<Partial<IProject>> = [
                {
                    name: 'Project one',
                    userId
                },
                {
                    name: 'Project two',
                    userId
                }
            ];
            return Promise.all(projects.map((project) => {
                const { name } = project;
                return projectRepo.create(name, userId);
            }));
        })
        .then(() => userRepo.getById(userId))
        .then((user: IUser) => {
            console.log(`\nRetreived user from database`);
            console.log(`user id = ${user.id}`);
            console.log(`user name = ${user.name}`);
            return userRepo.getProjects(user.id);
        })
        .then((projects: IProject[]) => {
            console.log('\nRetrieved user projects from database');
            return new Promise((resolve, reject) => {
                projects.forEach((project) => {
                    console.log(`project id = ${project.id}`);
                    console.log(`project name = ${project.name}`);
                });
                resolve('success');
            });
        })
        .catch((err) => {
            console.log('Error: ');
            console.log(JSON.stringify(err));
        });

    return { userRepo, projectRepo };
}

function serverSetup(db: IDatabase) {
    // Express
    const app = express();
    app.use(cors());

    // Routes
    const { userRepo } = db;

    userRoutes(app, userRepo);
    messageRoutes(app);

    app.get("/", (req, res) => {
        res.send("goodbye world");
    });

    app.listen(3000, () =>
        console.log("Example app listening on port 3000!"),
    );

}

function main() {
    const db = dbSetup();
    serverSetup(db);
}

main();
