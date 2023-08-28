import sgMail from "@sendgrid/mail"
import db from "../database/database.connection.js";

export async function sendEmail(req, res){
    const {userId} = res.locals;
    const {names, total , adress} = res.locals.products;
    let user;

    try{
        user = await db.collection('users').findOne({_id: userId})
    }catch(err){
        res.status(500).send(err.message);
    }

    let products = '';

    names.map( name => {
        products += `<li>Produto: ${name}</li>`
     })
    
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const emailHtml = `<!DOCTYPE html>
    <html>
    <head>
        <title>Compra Realizada com Sucesso!</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f9f9f9;
                color: #333333;
            }
    
            h1 {
                color: #fa4098;
            }
    
            ul {
                list-style-type: none;
                padding: 0;
            }
    
            li {
                margin-bottom: 10px;
            }
    
            strong {
                font-weight: bold;
            }
        </style>
    </head>
    <body>
    <img style="object-fit: cover; max-width: 1000px; border-radius: 10px;" height="500px" width="100%" src="https://png.pngtree.com/thumb_back/fw800/background/20210907/pngtree-goddess-day-0308-shopping-bag-pink-cartoon-banner-image_812901.jpg" alt="">
        <h1>Compra Realizada com Sucesso!</h1>
        <p>Olá,</p>
        <p>Agradecemos por sua compra. Estamos felizes em informar que sua compra foi realizada com sucesso!</p>
        <h2>Detalhes da Compra:</h2>
        <ul>
            ${products}
            <li><strong>Total:</strong> R$ <span style="color: rgb(22, 223, 22);">${total.toFixed(2).toString().replace('.',',')}</span></li>
            <li>Será enviado para: <strong>${adress}</strong></li>
        </ul>
        <p>Fique de olho em seu email para mais atualizações sobre o status do seu pedido.</p>
        <p>Se tiver alguma dúvida ou precisar de assistência adicional, entre em contato conosco.</p>
        <p>Obrigado novamente pela sua compra!</p>
        <p>Atenciosamente,</p>
        <p>SnapShop</p>
    </body>
    </html>
`

    const msg = {
        to: user.email,
        from: process.env.SENDER_EMAIL,
        subject: 'SnapShop - Compra realizada com sucesso',
        text: 'hhhh',
        html: emailHtml.replace("'",""),
    }

    sgMail.send(msg)
    .then((response) => {
        res.sendStatus(200);
    })
    .catch((error) => {
        console.error(error);
        res.status(500).send(error);
    })
}