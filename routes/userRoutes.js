import express from "express"
import { formularioLogin, formularioOlvidePassword, formularioRegister } from "../controllers/usuarioController.js";


const router = express.Router();

router.get('/login', formularioLogin);
router.get('/registro', formularioRegister);
router.get('/olvide-password', formularioOlvidePassword);

router.post('/', function(req, res) {
    res.json({msg: 'post response'})
});

router.route('/')
    .get((req, res) => {
        res.json({msg: 'get response'})
    })
    .post((req, res) => {
        res.json({msg: 'post response'})
    })

export default router;