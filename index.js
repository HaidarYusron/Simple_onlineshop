const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const products = require('./routers/products')
const port = 3000;
const transactions = require('./routers/transactions')

app.use(cors());
app.use(bodyParser.json());
const db = require("./config/connection");

app.get('/', (req, res) => {
  res.send('hello world')
});
app.post('/product', (req, res) => {
    console.log(req.body)
    res.send('testing')
});
app.use('/products', products)
app.use('/transactions', transactions)
app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}`)
});

