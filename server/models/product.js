
const mongoose = require('mongoose')
const schema= mongoose.Schema


const productschema= new schema({

    _id: {
        type:mongoose.Schema.Types.ObjectId,
        auto:true
    },
    product :{
        type:String,
        required:true

    },
    status: {
        type: Boolean,
        default: false
      },
      category:{
        type:schema.Types.ObjectId,
        ref:'category',
        required :true
    },
    price:{
        type:Number,
        required:true
    },
    buyprice:{
        type:Number,
        required:true
    },
    
    supplierName:{
        type:schema.Types.ObjectId,
        ref:'supplier'
    },
    stock:{
        type:Number,
        default:false
    },
    image:{
        type:String
        
    },
    description:{
        type:String,
    
    },
    reference:{
        type:String,
        
    
    },
   
    

   


   
   
    
})
const generateReference = () => {
    const timestamp = Math.floor(Date.now() / 1000); // Use seconds 
    const randomValue = Math.floor(Math.random() * 1000); 
    const paddedRandomValue = randomValue.toString().padStart(3, '0'); //  3-digit format
    return `REF-${timestamp}-${paddedRandomValue}`;
  };
  
  //  pre-save middleware 
  productschema.pre('save', function(next) {
    if (this.isNew && !this.reference) { // Generate reference only for new documents
      this.reference = generateReference();
    }
    next();
  });
const product = mongoose.model("product", productschema)
module.exports=product