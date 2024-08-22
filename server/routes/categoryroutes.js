const express = require('express')
const categoryrouter= express.Router()
const categorycontroller= require('../controller/categoryController')



categoryrouter.get('/categorys',categorycontroller.getAllCategorys);
categoryrouter.post('/create',categorycontroller.createCategory);
categoryrouter.delete('/:id',categorycontroller.deleteCategory);
categoryrouter.patch('/:id', categorycontroller.updateCategory);
categoryrouter.get('/:id', categorycontroller.getCategoryById);


module.exports = categoryrouter