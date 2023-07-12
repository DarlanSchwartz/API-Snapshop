
import { ObjectId } from 'mongodb';
import dayjs from "dayjs";
import db from '../database/database.connection.js';

export async function newProduct(req, res) {

    const product = { ...req.body, date: dayjs().format('DD/MM/YY') };

    try {
        await db.collection('products').insertOne(product);
        return res.status(201).send('Produto criado com sucesso!');

    } catch (error) {
        console.log(error.message);
        return res.status(500).send('Internal server error');
    }
}

export async function deleteProduct(req, res) {

    const { id } = req.params;
    if (!id || id == '') return res.status(404).send('Falha ao remover produto: Produto não encontrado!');

    try {

        const result = await db.collection('products').deleteOne({ _id: new ObjectId(id) });
        // no products were deleted
        if (result.deletedCount === 0) return res.status(404).send('Falha ao remover produto: Produto não encontrado!');

        return res.status(204).send('Produto removido com sucesso!');
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal server error');
    }
}

export async function editProduct(req, res) {

    const { id } = req.params;
    if (!id || id == '') return res.status(404).send('Falha ao editar produto: Produto não encontrado!');

    const product = { ...req.body, date: dayjs().format('DD/MM/YY') };

    try {
        const result = await db.collection('products').findOne({_id:new ObjectId(id)});
        // no products were edited
        if(!result) return res.status(404).send('Falha ao editar produto: Produto não encontrado!');

        await db.collection('products').updateOne({ _id: new ObjectId(id) }, { $set: product });
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal server error');
    }
}

export async function viewProduct(req, res) {

    const { id } = req.params;
    if (!id || id == '') return res.status(404).send('Produto não encontrado!');

    try {
        const product = await db.collection('products').findOne({ _id: new ObjectId(id) });
        return res.status(200).send(product);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal server error');
    }
}