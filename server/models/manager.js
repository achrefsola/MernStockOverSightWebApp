const mongoose = require('mongoose')
const schema= mongoose.Schema
const bcrypt = require('bcryptjs')


const managerschema= new schema({

    _id: {
        type:mongoose.Schema.Types.ObjectId,
        auto:true
    },
    lastName :{
        type:String,
        required:true
    },
    firstName :{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password: {
        type: String,
        required: true
      },
      image: {
        type: String
       
      },
})

managerschema.pre('save' , async function(next){
    const manager = this;
    if (!manager.isModified('password')) 
    return next();

    try{
        const salt = await bcrypt.genSalt();
        manager.password=await bcrypt.hash(manager.password,salt);
        next();
    } catch (error) {
        return next(error);
      }

    }
);
// Compare the given password with the hashed password in the database
managerschema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };
const manager = mongoose.model("manager", managerschema)
module.exports= manager