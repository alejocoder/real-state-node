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

const registrar = (req, res) => {

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