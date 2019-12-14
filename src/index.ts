import cors from "cors";
import "dotenv/config";
import express from "express";
import { messageRoutes } from "./routes/messages";
import { userRoutes } from "./routes/users";

// Express
const app = express();
app.use(cors());

// Routes
userRoutes(app);
messageRoutes(app);

app.get("/", (req, res) => {
  res.send("goodbye world");
});

app.listen(3000, () =>
  console.log("Example app listening on port 3000!"),
);

