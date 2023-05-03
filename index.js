import express from "express";
import userRoutes from "./routes/userRoutes.js"

const app = express();

app.use('/', userRoutes)

const port = 3000;
app.listen(port, () => {
    console.log("server running")
});