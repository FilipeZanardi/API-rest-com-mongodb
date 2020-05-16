'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require ('mongoose');
const config = require('./config')

const app = express();
const router = express.Router()

//Conecta ao banco
//mongoose.connect('mongodb+srv://filipe:filipe@cluster0-h2qys.mongodb.net/test?retryWrites=true&w=majority')
mongoose.connect(config.connectionString);
mongoose.connection;

//Carrega os models
const Product = require ('./models/product');
const Customer = require('./models/customer');
const Order = require('./models/order');

//Carrega as Rotas
const indexRoute = require('./routes/index-route');
const productRoute = require('./routes/product-route')
const customerRoute = require('./routes/customer-route')
const orderRoute = require('./routes/order-route')

app.use(bodyParser.json({
    limit: '25mb'
}));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(function (req, res, next){
    res.header('Acess-Control-Allow-Origin', '*')
    res.header('Acess-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-acess-token');
    res.header('Acess-Control-Allow-Origin', 'GET, POST, PUT, DELETE, OPTIONS')
    next();
})


app.use('/', indexRoute);
app.use('/products', productRoute);
app.use('/customers', customerRoute);
app.use('/orders', orderRoute);

module.exports = app;
