const express = require('express');
const transaction = express.Router();
const {randomOrderNumber} = require("../helpers/utils")
const {checkout} = require('../controllers/transaction')
transaction.route('/').post(async(req,res)=>{
    const { total_price, paid_amount, products } = req.body
    const order = {
        no_order:randomOrderNumber(),total_price, paid_amount
    }
    res.send(await checkout(order,products))
})

module.exports = transaction