const express = require('express')
const companyrouter= express.Router()
const companycontroller= require('../controller/companyController')
const upload = require('../config/MulterConfig')



companyrouter.get('/companys',companycontroller.getAllCompanys);
companyrouter.post('/create', upload.single('companyLogo'),companycontroller.createCompany);
companyrouter.delete('/:id',companycontroller.deleteCompany);
companyrouter.patch('/:id', upload.single('companyLogo'), companycontroller.updateCompany);
companyrouter.get('/:id', companycontroller.getCompanyById);
companyrouter.get('/company/:managerId', companycontroller.getCompanyByManagerId);



module.exports = companyrouter