import { UserRepository } from "../user_repository";
import { ProjectRepository } from "../project_repository";

export interface IProject {
    id: string;
    name: string;
    userId: string;
}

export interface IUser {
    id: string;
    name: string;
    email: string;
}

export interface IDatabase {
    userRepo: UserRepository;
    projectRepo: ProjectRepository;
}
