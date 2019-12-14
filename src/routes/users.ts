import { Express } from "express";
import { UserRepository } from "../user_repository";

export const userRoutes = (app: Express, userRepo: UserRepository) => {

    // Get one
    app.get("/users/:userId", (req, res) => {
        const { userId } = req.params;
        return userRepo.getById(userId).then(
            (user) =>
                res.send(user)
        );
    });

    // Get all
    app.get("/users", (req, res) => {
        return userRepo.getAll().then(
            (theUsers) =>
                res.send(theUsers)
        );
    });

    // Create
    app.post("/users/:userId", (req, res) => {
        const { userId } = req.params;
        return userRepo.create(userId, 'email').then(
            (user) =>
                res.send(user)
        );
    });

    // Update
    app.put("/users/:userId", (req, res) => {
        const { userId } = req.params;
        return userRepo.update(
            {
                id: userId,
                name: 'new name',
                email: 'new email'
            }
        ).then(
            (user) =>
                res.send(user)
        );
    });

    // Delete
    app.delete("/users/:userId", (req, res) => {
        const { userId } = req.params;
        return userRepo.delete(userId).then(
            (user) =>
                res.send(user)
        );
    });

};
