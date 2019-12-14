
import { Express } from "express";

export const messageRoutes = (app: Express) => {

    const messages = [
        {
            id: "1",
            text: "Hello World",
            userId: "1",
        },
        {
            id: "2",
            text: "By World",
            userId: "2",
        }
    ];

    app.get("/messages/:messageID", (req, res) => {
        return res.send(
            messages.filter((message) => message.id === req.params.messageID),
        );
    });

    app.get("/messages", (req, res) => {
        return res.send(messages);
    });
    app.post("/messages", (req, res) => {
        return res.send("Received a POST HTTP method: messages");
    });
    app.put("/messages", (req, res) => {
        return res.send("Received a PUT HTTP method: messages");
    });
    app.delete("/messages", (req, res) => {
        return res.send("Received a DELETE HTTP method: messages");
    });

};
