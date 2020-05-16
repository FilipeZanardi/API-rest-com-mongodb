'use strict';
const mongoose = require('mongoose')
const Order = mongoose.model('Order')

exports.get = async(data) =>{
    var res = await Order
    .find({}, 'numero status, costumer, items')
    .populate('customer', 'nome')
    .populate('items.produto', 'title')
    return res;
}

exports.create = async(data) => {
    var order = new Order(data)
    await order.save()
}