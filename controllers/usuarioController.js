const formularioLogin = (req, res) => {
    res.render('auth/login',{
        auth: true,
        }
        )
    };

const formularioRegister = (req, res) => {
    res.render('auth/registro',{
        pagina: 'Crear Cuenta',
        })
    }

    
    export {
        formularioLogin,
        formularioRegister,
    }