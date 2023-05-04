import express from "express";
import userRoutes from "./routes/userRoutes.js";
import db from './config/db.js';

const app = express();
try {
    await db.authenticate();
    console.log('conexión exitosa a la db')
} catch (error) {
    console.log(error)
}

app.use('/auth', userRoutes);

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public'));

const port = 3000;
app.listen(port, () => {
    console.log("server running in port 3000")
});
