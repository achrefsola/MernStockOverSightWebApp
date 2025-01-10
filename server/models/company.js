const mongoose = require('mongoose')
const schema= mongoose.Schema
const bcrypt = require('bcryptjs')


const companyschema= new schema({

    _id: {
        type:mongoose.Schema.Types.ObjectId,
        auto:true
    },
    companyName :{
        type:String,
        required:true
    },
    companyAddress :{
        type:String,
        required:true
    },
    companyRegion:{
        type:String,
        required:true
    },
    companyPostalCode: {
        type: Number,
        required: true
      },
    companyPhone: {
        type: Number,
       
      },
    companyEmail:{
        type:String,
        required:true
    },
    companyLogo:{
        type:String,
        
    },
    
    managerId:{
        type:String,
        required:true
    },
})




const company = mongoose.model("company", companyschema)
module.exports= company