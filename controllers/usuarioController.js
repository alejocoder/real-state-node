const formularioLogin = (req, res) => {
    res.render('auth/login',{
        auth: true,
        }
        )
    };

const formularioRegister = (req, res) => {
    res.render('auth/registro',{
        auth: true,
        }
        )
    }

    
    export {
        formularioLogin,
        formularioRegister,
    }