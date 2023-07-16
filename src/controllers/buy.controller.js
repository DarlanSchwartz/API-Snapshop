import { ObjectId } from 'mongodb';
import db from '../database/database.connection.js';

export async function newBuy(req, res){
    const {userId} = res.locals;
    const {amount, cep, city, neighborhood, state, street, number, paymentMethod, cardNumber, expiration, cvv, nameHolder, price, idProducts} = req.body;
    //const idProduct = req.params.id;
    
    try{
        let i = 0;
        do{
            const idProduct = idProducts[i]
            const product = await db.collection('products').findOne({_id: new ObjectId(idProduct)});

            if(!product) return res.status(404).send("Produto não encontrado no sistema! ):")

            const rest = product.stock - Number(amount[i]);

            if(rest < 0) return res.status(401).send("A quantidade requerida excede o estoque!!!")
            
            if(rest === 0){
                await db.collection('products').updateOne({_id: new ObjectId(idProduct)}, {$set: {available: false, stock: 0}});
            }else{
                await db.collection('products').updateOne({_id: new ObjectId(idProduct)}, {$set: {stock: rest}});
            }
            
            i++;
        }while(i < idProducts.length);

        if(paymentMethod === 'pix' || paymentMethod === 'boleto'){
            await db.collection('buys').insertOne({userId, idProducts, amount,price, cep, city, neighborhood, state, street, number, paymentMethod});
        }else{
            await db.collection('buys').insertOne({userId, idProducts, amount, price, cep, city, neighborhood, state, street, number, paymentMethod, cardNumber, expiration, cvv, nameHolder});
        }
          
        res.sendStatus(200);
    }catch(err){
        res.status(500).send(err.message);
    }
}

export async function shoppingCart(req, res){
    const {userId} = res.locals;
    const idProduct = req.params.id;
    const queryParams = req.query;
    const quantity =  queryParams.quantity ? Number( queryParams.quantity) : 1;

    try{
        const product = await db.collection('products').findOne({_id: new ObjectId(idProduct)});
        if(!product) return res.status(404).send("Produto não encontrado no sistema! ):")

        await db.collection('shoppingCart').insertOne({userId, idProduct, quantity});
        res.sendStatus(200);
    }catch(err){
        res.status(500).send(err.message);
    }
}

export async function getProductsShoppingCart(req, res){
    const {userId} = res.locals;
    try{
        const products = await db.collection('shoppingCart').find({userId}).toArray();
        if(products.length === 0) return res.send([]);
        const myProducts = [];
        
        let i = 0;
        do{
            const product = products[i];
            myProducts.push(await db.collection('products').findOne({_id: new ObjectId(product.idProduct)}));
            i++;
        } while(i < products.length);

        for (let i = 0; i < products.length; i++) {
           if(myProducts[i])
           {
                myProducts[i].quantity = products[i].quantity;
           }
        }
        
        return res.send(myProducts);
        
    }catch(err){
        console.log(err);
       return  res.status(500).send(err.message);
    }
}

export async function deleteProductByCart(req, res){
    const {id} = req.params;
    const {userId} = res.locals;
    console.log(userId)
    try{
        const d = await db.collection('shoppingCart').deleteOne({idProduct: id, userId})
        console.log(d)
        res.sendStatus(200);
    }catch(err){
        res.status(500).send(err.message)
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