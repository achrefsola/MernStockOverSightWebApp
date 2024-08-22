const express = require('express')
const orderrouter= express.Router()
const ordercontroller= require('../controller/ordercontroller')



orderrouter.get('/orders',ordercontroller.getAllOrder);
orderrouter.post('/create',ordercontroller.createOrder);
orderrouter.delete('/:id',ordercontroller.deleteOrder);
orderrouter.patch('/:id', ordercontroller.updateOrder);
orderrouter.get('/:id', ordercontroller.getOrderById);


module.exports = orderrouter