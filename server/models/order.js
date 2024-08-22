
const mongoose = require('mongoose')
const schema= mongoose.Schema


const orderschema= new schema({

    _id: {
        type:mongoose.Schema.Types.ObjectId,
        auto:true
    },
    orderDate :{
        type:Date,
        default:Date.now
    },
    products: [{
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'product',
          required: true
        },
        product: {
            type: String,
            
            required: true
          },
        quantity: {
          type: Number,
          required: true
        },
        price: {
            type: Number,
            required: true
          }
      }],
    customerName:{
        type:String,
        required:true
    },
    customerContact:{
        type:String,
        required:false
    },

    totalPrice: {
        type: Number,
      
      },
    status:{
        type:String,
        
        
    },
    isCompany : {
        type:Boolean,
        required : true,
        default : false
    },
    fiscalNumber:{
        type :String,
        required: false,
    },

    email:{
        type : String,
        require :false
    },
    address:{
        type : String,
        require :false
    }

})

const order = mongoose.model("order", orderschema)
module.exports=order