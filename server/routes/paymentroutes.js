const express = require('express')
const paymentrouter = express.Router()
const paymentcontroller = require('../controller/paymentController')




paymentrouter.post('/create-checkout-session',paymentcontroller.makePayment);





module.exports = paymentrouter