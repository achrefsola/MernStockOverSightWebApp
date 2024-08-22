
const mongoose = require('mongoose')
const schema= mongoose.Schema


const categoryschema= new schema({

    _id: {
        type:mongoose.Schema.Types.ObjectId,
        auto:true
    },
    categoryName :{
        type:String,
        required:true
    },
    createdAt: { 
        type: Date,
        default: Date.now 
    },

    updatedAt: {
        type: Date,
        default: Date.now 
    },
  
 
});

categoryschema.pre('save', function(next) {
    if (this.isModified()) {
      this.updatedAt = Date.now();
    }
    next();
});

categoryschema.pre('findOneAndUpdate', function(next) {
    this.set({ updatedAt: Date.now() });
    next();
  });

  
const category = mongoose.model("category", categoryschema)
module.exports=category