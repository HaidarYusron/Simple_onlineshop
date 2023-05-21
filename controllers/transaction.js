const db = require('../config/connection');
exports.checkout = async (data,products) => {
    const query = await db.query('insert into transactions set ?',[data]).catch( err => {
    return err})
    if(!query.code){

        let dataProducts = []
        let idProduct = []
        products.map( item =>{
            dataProducts.push([
                data.no_order,
                item.id,
                item.quantity
            ])
            idProduct.push([
                item.id
            ])   
        
        })
        await db.query('insert into transaction_detail (no_order,id_product,quantity) values ?',[dataProducts])
    
        const stockProduct = await db.query('select stock from products where id in (?)', [idProduct])

        let updateStock = []
        stockProduct.map((res,i) =>{
            updateStock.push([
                dataProducts[i][1],
                res.stock - dataProducts[i][2]
            ])
        })
        await db.query('insert into products (id,stock) values ? on duplicate key update stock = values(stock)', [updateStock])
    };
    const dataOrder = await db.query('select * from transactions where no_order = ?', [data.no_order])
    return dataOrder
}