import { ObjectId } from 'mongodb';
import db from '../database/database.connection.js';

export async function newBuy(req, res){
    const {userId} = res.locals;
    const {amount} = req.body;
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
        await db.collection('buys').insertOne({userId, idProduct, amount});
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

export async function productsBoughtByYou(req, res){
    const {userId} = res.locals;
    

    try{
        const products = await db.collection('buys').find({userId}).toArray()
        
        const myBuys = [];
        
        let i = 0;
        do{
            const product = products[i]
            myBuys.push(await db.collection('products').findOne({_id: new ObjectId(product.idProduct)}))
            i++
        } while(i < products.length);

        return res.send(myBuys);
    }catch(err){
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