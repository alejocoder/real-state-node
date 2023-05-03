import express from "express";
import userRoutes from "./routes/userRoutes.js"

const app = express();

app.use('/auth', userRoutes);

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public'));

const port = 3000;
app.listen(port, () => {
    console.log("server running")
});
