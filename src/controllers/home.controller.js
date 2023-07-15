
import db from '../database/database.connection.js';

export async function getAllProducts(req, res) {

    // Pagination
    const queryParams = req.query;
    const page =  queryParams.page ? Number( queryParams.page) : 1;
    const start =( page-1) * 18;
    const end = 18 * page;

    //console.log('page',page,'start:',start,'end',end);

    try {
        const products = (await db.collection('products').find().toArray()).slice(start,end);
        return res.status(200).send(products);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal server error');
    }
}