import { Express } from "express";

export const userRoutes = (app: Express) => {

    const users = [
        {
            id: "1",
            username: "Robin Wieruch",
        },
        {
            id: "2",
            username: "Dave Davids",
        },
    ];

    app.get("/users/:userID", (req, res) => {
        return res.send(
            users.filter((user) => user.id === req.params.userID),
        );
    });

    app.get("/users", (req, res) => {
        return res.send(users);
    });
    app.post("/users", (req, res) => {
        return res.send("Received a POST HTTP method: users");
    });
    app.put("/users", (req, res) => {
        return res.send("Received a PUT HTTP method: users");
    });
    app.delete("/users", (req, res) => {
        return res.send("Received a DELETE HTTP method: users");
    });

};
