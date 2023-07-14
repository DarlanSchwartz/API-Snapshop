import { ObjectId } from 'mongodb';
import db from '../database/database.connection.js';

export async function newBuy(req, res){
    const {userId} = res.locals;
    const {amount, cep, city, neighborhood, state, street, number, paymentMethod, cardNumber, expiration, cvv, nameHolder} = req.body;
    const idProduct = req.params.id;
    
    try{
        const product = await db.collection('products').findOne({_id: new ObjectId(idProduct)});

        if(!product) return res.status(404).send("Porduto não encontrado no sistema! ):")
       
        const rest = product.stock - Number(amount);

        if(rest < 0) return res.status(401).send("A quantidade requerida excede o estoque!!!")
        
        if(rest === 0){
            await db.collection('products').updateOne({_id: new ObjectId(idProduct)}, {$set: {available: false, stock: 0}});
        }else{
            await db.collection('products').updateOne({_id: new ObjectId(idProduct)}, {$set: {stock: rest}});
        }
        if(paymentMethod === 'pix' || paymentMethod === 'boleto'){
            await db.collection('buys').insertOne({userId, idProduct, amount, cep, city, neighborhood, state, street, number, paymentMethod});
        }else{
            await db.collection('buys').insertOne({userId, idProduct, amount, cep, city, neighborhood, state, street, number, paymentMethod, cardNumber, expiration, cvv, nameHolder});
        }
        
        res.sendStatus(200);
    }catch(err){
        res.status(500).send(err.message);
    }
}

export async function shoppingCart(req, res){
    const {userId} = res.locals;
    const idProduct = req.params.id;

    try{
        const product = await db.collection('products').findOne({_id: new ObjectId(idProduct)});
        if(!product) return res.status(404).send("Porduto não encontrado no sistema! ):")

        await db.collection('shoppingCart').insertOne({userId, idProduct});
        res.sendStatus(200);
    }catch(err){
        res.status(500).send(err.message);
    }
}

export async function getProductsShoppingCart(req, res){
    const {userId} = res.locals;

    try{
        const products = await db.collection('shoppingCart').find({userId: new ObjectId(userId)}).toArray()
        
        const myProducts = [];
        
        let i = 0;
        do{
            const product = products[i]
            myProducts.push(await db.collection('products').findOne({_id: new ObjectId(product.idProduct)}))
            i++
        } while(i < products.length);

        res.send(myProducts);
        
    }catch(err){
        res.status(500).send(err.message);
    }
}

export async function productsBoughtByYou(req, res){
    const {userId} = res.locals;
    

    try{
        const boughtProducts = await db.collection('buys').find({userId}).toArray()
        if(boughtProducts.length == 0) return res.status(200).send(boughtProducts); 

        const myBuys = [];
        
        let i = 0;
        do{
            const product = boughtProducts[i]
            myBuys.push(await db.collection('products').findOne({_id: new ObjectId(product.idProduct)}))
            i++
        } while(i < boughtProducts.length);

        for (let i = 0; i < boughtProducts.length; i++) {
            myBuys[i] = {...myBuys[i],info: boughtProducts[i]}
        }

        console.log(myBuys);

        return res.send(myBuys);
    }catch(err){
        console.log(err);
        res.status(500).send(err.message);
    }
}

export async function productsRegisteredByUser(req, res){
    const {userId} = res.locals;

    try{
        const products = await db.collection('products').find({userId}).toArray()
        res.send(products);
    }catch(err){
        res.status(500).send(err.message);
    }
}