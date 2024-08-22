const express = require('express')
const managerrouter= express.Router()
const managercontroller= require('../controller/managerController')
const upload = require('../config/MulterConfig')


managerrouter.post('/login',managercontroller.login);
managerrouter.get('/managers',managercontroller.getAllManagers);
managerrouter.post('/register',managercontroller.createManager);
managerrouter.delete('/:id',managercontroller.deleteManager);
managerrouter.patch('/:id', managercontroller.updateManager);
managerrouter.get('/:id', managercontroller.getManagerById);
managerrouter.post('/changepassword',managercontroller.changepassword);
managerrouter.patch('/updatepic/:id', upload.single('image'), managercontroller.updateprofilepic);


module.exports = managerrouter