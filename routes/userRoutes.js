import express from "express"
import { formularioLogin, formularioOlvidePassword, formularioRegister, registrar, confirmar } from "../controllers/usuarioController.js";


const router = express.Router();

router.get('/login', formularioLogin);

router.get('/registro', formularioRegister);
router.post('/registro', registrar);

router.get('/confirmar/:token', confirmar)

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