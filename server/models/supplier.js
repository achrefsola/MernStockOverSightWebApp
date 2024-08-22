
const mongoose = require('mongoose')
const schema= mongoose.Schema


const supplierschema= new schema({

    _id: {
        type:mongoose.Schema.Types.ObjectId,
        auto:true
    },
    supplierName :{
        type:String,
        required:true
    },
    contact:{
        type:Number,
        
    },
    fiscalNumber:{
        type : String,
        required : true
    },
    email:{
        type : String,
        
    }
 
});

const supplier = mongoose.model("supplier", supplierschema)
module.exports=supplier