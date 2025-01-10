const express = require('express');
const managercollection = require('../models/manager');
const mongoose  = require('mongoose')
const jwt  =require ('jsonwebtoken')
const bcrypt = require('bcryptjs');
 
exports.createManager= async(req,res)=>{

try{
    const {email} = req.body
    const existingEmail = await managercollection.findOne({email})
   
    if (existingEmail){
        return res.status(409).send("user already exists")
    }
    const manager = await managercollection.create(req.body)
    console.log('hhhhh')
    return res.status(201).send(manager)
}
catch(error){
    
    res.status(400).send(error.message)

}

};

exports.getManagerById = async (req, res) => {
    try {
        const projection ={password:0}
        const manager = await managercollection.findById(req.params.id,projection);
        if (!manager) {
            return res.status(404).send('Manager not found');
        }
        res.status(200).send(manager);
        console.log(manager)
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.deleteManager = async (req,res)=> {

    try {
        const manager = await managercollection.findByIdAndDelete (req.params.id)
        if (!manager){
            res.status(400).send("Manager not found ")
        }
        res.status(204).send()

    } catch (error){
        res.status(500).send(error.message);
    }


};



exports.updateManager = async (req, res) => {
    try {
                /*
        --the { new: true } option in mongoose is used to return the new updated data rather than the old one 
        PS : not using the { new: true } option will return the old data 
        -- the {runValidators :true } option in mongoose ensure that the updated data sent in the request fit the 
        schema requirments in the collection 
        PS : not using {runValidators :true } option will violates the schema's validation constraints. for exemple , 
        if a data field type is set to "Number" and we updated it with a "String" mangoose will save the data anyway 
        even the data type is not correct .
        */
        const projection ={password:0}
        const manager = await managercollection.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!manager) {
            return res.status(404).send('Manager not found');
        }
        res.status(200).send(manager);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.getAllManagers =async (req, res ) =>{
    try {
        const manager = await managercollection.find({});
        if (!manager) {
            return res.status("No manager found ")
        }
        res.status(200).send(manager)
    } catch(error){
        res.status(400).send(error.message)
    }

    
 };

 exports.login= async (req,res,next)=>{
    const {email, password} = req.body
    try {
        const manager =  await managercollection.findOne({email})
        if (!manager){
           return res.status(404).send("manager not found ")

        }

        const passwordMatch= await manager.comparePassword(password)
        if (!passwordMatch){
            return res.status(404).json({message : "incorrect password"})
        }
        const token = jwt.sign({managerId:manager._id}, process.env.Secret_Key, {expiresIn :  '1m'});
        console.log("manager logged in ")

        res.json ({
            token : token, 
            manager: {id : manager._id}
        });
        }catch (error){
        next(error)
 
        }
    }


    exports.changepassword= async (req,res,next)=>{
        const {id,password,newpassword,cnewpassword} = req.body
        try {
            const manager =  await managercollection.findById(id)
            if (!manager){
               return res.status(404).send("manager not found ")
    
            }
    
            const passwordMatch= await manager.comparePassword(password)
            if (!passwordMatch){
                return res.status(404).json({message : "incorrect actuel password"})
            }
            if (newpassword!==cnewpassword){
                return res.status(400).json({message:"new password does not match confirmation"})
            }
            
                manager.password=newpassword
                await manager.save();
            return res.status(200).json({message : "Password successfully changed"})
    
            
            }catch (error){
            next(error)
     
            }
        }

        exports.updateprofilepic=async (req,res)=>{
            try {
                const imagepath= req.file ? `uploads/${req.file.filename}` : ''
                const manager = await managercollection.findByIdAndUpdate(req.params.id,{ image: imagepath },{ new: true } );
                
            if (!manager) {
                return res.status(404).send('Manager not found');
              }
              res.status(200).send(manager);
            }catch (error) {
              res.status(400).send(error.message);
            }
            
             
          
        };