import { check, validationResult } from "express-validator";
import Usuario from "../models/Usuario.js";

const formularioLogin = (req, res) => {
    res.render('auth/login',{
        pagina: 'Iniciar Sesión',
        }
        )
    };

const formularioRegister = (req, res) => {
    res.render('auth/registro',{
        pagina: 'Crear Cuenta',
        })
    }

const registrar = async(req, res) => {

    await check('nombre').notEmpty().withMessage('nombre invalido').run(req);
    await check('email').isEmail().withMessage('email invalido').run(req);
    await check('password').isLength({min: 6}).withMessage('el password debe ser de al menos 6 caracteres').run(req);
    await check('repetir_password').equals('password').withMessage('las contraseñas deben coincidir').run(req);


    let resultado = validationResult(req); 

    if (!resultado.isEmpty()) {
        return res.render('auth/registro',{
            pagina: 'Crear Cuenta',
            errores: resultado.array(),
            usuario: {
                nombre: req.body.nombre,
                email: req.body.email
            }
            })
    }

    res.json(resultado.array());

    const usuario = await Usuario.create(req.body);

    res.json(usuario);
}

    const formularioOlvidePassword = (req, res) => {
        res.render('auth/olvide-password',{
            pagina: 'Recupera tu acceso a Bienes Raices',
            })
        }

    
    export {
        formularioLogin,
        formularioRegister,
        registrar,
        formularioOlvidePassword,
    }