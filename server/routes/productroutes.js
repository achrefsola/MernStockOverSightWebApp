const express = require('express')
const productrouter= express.Router()
const productcontroller= require('../controller/productcontroller')
const upload = require('../config/MulterConfig')



productrouter.get('/products',productcontroller.getAllProducts);
productrouter.post('/create', upload.single('image'),productcontroller.createProduct);
productrouter.delete('/:id',productcontroller.deleteProduct);
productrouter.patch('/:id', upload.single('image'), productcontroller.updateProduct);
productrouter.get('/:id', productcontroller.getProductById);


module.exports = productrouter