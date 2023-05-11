import express from "express";
import userRoutes from "./routes/userRoutes.js";
import db from './config/db.js';
import cookieParser from "cookie-parser";
import csfr from "csurf";

const app = express();

app.use(express.urlencoded({extended: true}))

app.use(cookieParser())

let csrfProtection = csrf({ cookie: true });

try {
    await db.authenticate();
    db.sync();
    console.log('conexión exitosa a la db')
} catch (error) {
    console.log(error)
}

app.use('/auth', csrfProtection , userRoutes);

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public'));

const port = process.env.port || 3000;
app.listen(port, () => {
    console.log("server running in port 3000")
});
