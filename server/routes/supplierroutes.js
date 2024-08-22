const express = require('express')
const supplierrouter= express.Router()
const suppliercontroller= require('../controller/suppliercontroller')



supplierrouter.get('/suppliers',suppliercontroller.getAllSuppliers);
supplierrouter.post('/create',suppliercontroller.createSupplier);
supplierrouter.delete('/:id',suppliercontroller.deleteSupplier);
supplierrouter.patch('/:id', suppliercontroller.updateSupplier);
supplierrouter.get('/:id', suppliercontroller.getSupplierById);


module.exports = supplierrouter