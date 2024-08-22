const express =require('express')
const app=express()
const cors = require('cors')
const mongoose= require('mongoose')
const managerroute = require('./routes/managerroutes')
const orderroute = require('./routes/orderroutes')
const productroute = require('./routes/productroutes')
const supplierroute = require('./routes/supplierroutes')
const categoryroute= require('./routes/categoryroutes')
const companyroute= require('./routes/companyroutes')

const path = require('path');
require('dotenv').config()
app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
    res.send('this is the app main page ')
});

app.use('/api/manager',managerroute);
app.use('/api/order',orderroute);
app.use('/api/product',productroute);
app.use('/api/supplier',supplierroute);
app.use('/api/category',categoryroute);
app.use('/api/company',companyroute);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));/*This configuration tells Express to serve files from a specific directory when requested */

const port = process.env.port || 5000;
app.listen(port,()=>console.log(`connected to port ${port}`))


const url= process.env.url || 'mongodb://127.0.0.1:27017/stockoversight'
const dbName = 'stockoversight';

mongoose.connect(url)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); 
  });