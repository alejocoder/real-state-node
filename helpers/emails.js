import { text } from "express";


const emailRegistro = async(datos) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        }
      });

      const {email, nombre, token} = datos;

      await transport.sendMail({
        from: 'BienesRaices.com',
        to: email,
        subject: 'Confirma tu cuenta',
        text: 'Confirma tu cuenta',
        html: `
        <p>Hola ${nombre}, comprueba tu cuenta</p>
        
        <p>Tu cuenta ya está lista, solo debes confirmarla en el siguiente enlace:
        <a href="">Confirmar Cuenta</a> </p>

        <p>Si no creaste una cuenta puedes ignorar este mensaje</p>
        `
      })

}


export{
    emailRegistro,
}