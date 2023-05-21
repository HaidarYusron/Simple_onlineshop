const db = require("../config/connection");

exports.getProducts = async() => {
    return await db.query("SELECT * FROM products")
}

exports.createProducts = async(data) => {
    const query = await db.query("insert into products set ?", [data])
    if(!query.affectedRows) return "error when inserting products"
    return "product succesfully created"
}