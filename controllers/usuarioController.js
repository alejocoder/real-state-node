import { check, validationResult } from "express-validator";
import Usuario from "../models/Usuario.js";
import { generarId } from "../helpers/tokens.js";
import { emailRegistro } from "../helpers/emails.js";

const formularioLogin = (req, res) => {
    res.render('auth/login',{
        pagina: 'Iniciar Sesión',
        }
        )
};

const formularioRegister = (req, res) => {
    res.render('auth/registro',{
        pagina: 'Crear Cuenta',
        csrfToken: req.csrfToken(),
        })
};

const registrar = async(req, res) => {

    await check('nombre').notEmpty().withMessage('nombre invalido').run(req);
    await check('email').isEmail().withMessage('email invalido').run(req);
    await check('password').isLength({min: 6}).withMessage('el password debe ser de al menos 6 caracteres').run(req);
    await check('repetir_password').equals('password').withMessage('las contraseñas deben coincidir').run(req);


    let resultado = validationResult(req); 

    if (!resultado.isEmpty()) {
        return res.render('auth/registro',{
            pagina: 'Crear Cuenta',
            csrfToken: req.csrfToken(),
            errores: resultado.array(),
            usuario: {
                nombre: req.body.nombre,
                email: req.body.email
            }
            })
    }

    const existeUsuario = await Usuario.findOne({where: {email : req.body.email}});
    if (existeUsuario) {
        return res.render('auth/registro',{
            pagina: 'Crear Cuenta',
            csrfToken: req.csrfToken(),
            errores: [{msg: 'el usuario ya está registrado'}],
            usuario: {
                nombre: req.body.nombre,
                email: req.body.email
            }
            })
    }

    res.json(resultado.array());

    const usuario = await Usuario.create({
        nombre: req.body.nombre,
        email: req.body.email,
        password: req.body.password,
        token: generarId(),
    });

    emailRegistro({
        nombre: usuario.nombre,
        email: usuario.email,
        token: usuario.token,
    });

    res.render('templates/mensaje', {
        pagina: 'Cuenta Creada Correctamente',
        mensaje: 'Hemos Enviado un Email de Confirmación, presiona en el enlace'
    })

    res.json(usuario);
};

const confirmar = async (req, res) => {

    const {token} = req.params;

    const usuario = await Usuario.findOne({where:{token }});

    if (!usuario) {
        return res.render('auth/confirmar-cuenta', {
            pagina: 'error al confirmar cuenta',
            mensaje: 'hubo un error al confirmar tu cuenta, intenta de nuevo',
            error: true,
        })
    };

    usuario.token = null;
    usuario.confirmado = true;
    await usuario.save();

    res.render('auth/confirmar-cuenta', {
        pagina: 'Cuenta Confirmada',
        mensaje: 'La cuenta se confirmó correctamente',
        error: false,
    });
};



const formularioOlvidePassword = (req, res) => {
    res.render('auth/olvide-password',{
        pagina: 'Recupera tu acceso a Bienes Raices',
        })
}

    
    export {
        formularioLogin,
        formularioRegister,
        registrar,
        confirmar,
        formularioOlvidePassword,
    }