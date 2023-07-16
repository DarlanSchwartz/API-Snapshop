import sgMail from "@sendgrid/mail"
import db from "../database/database.connection.js";

export async function sendEmail(req, res){
    const {userId} = res.locals;
    const {names, total} = res.locals.products;
    let user;

    try{
        user = await db.collection('users').findOne({_id: userId})
    }catch(err){
        res.status(500).send(err.message)
    }
    
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    let html = '';
    
    names.forEach( name => {
        html += `<p>${name}</p>`
    })

    html += `<p>Total R$ ${total}</p>`;

    const msg = {
    to: user.email, // Change to your recipient
    from: 'noreply.snapshop@gmail.com', // Change to your verified sender
    subject: 'SnapShop - Compra realizada com sucesso',
    text: 'hhhh',
    html: html.toString(),
    }

    sgMail
    .send(msg)
    .then((response) => {
        console.log(response[0].statusCode)
        console.log(response[0].headers)
        res.send(200)
    })
    .catch((error) => {
        console.error(error)
        res.status(500).send(error)
    })
}