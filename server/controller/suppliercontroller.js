const suppliercollection = require('../models/supplier')


exports.createSupplier= async(req,res)=>{

try{
    const {fiscalNumber}= req.body
    const existingFiscalNumber = await suppliercollection.findOne({fiscalNumber})
    if (existingFiscalNumber){
    return res.status(409).send("Fiscal number already exists")
    }
    const supplier = await suppliercollection.create(req.body)
    return res.status(201).send(supplier)

}
catch(error){
    res.status(400).send(error.message)

}

};

exports.getSupplierById = async (req, res) => {
    try {
        const supplier = await suppliercollection.findById(req.params.id);
        if (!supplier) {
            return res.status(404).send('Supplier not found');
        }
        res.status(200).send(supplier);
        console.log(supplier)
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.deleteSupplier = async (req,res)=> {

    try {
        const supplier = await suppliercollection.findByIdAndDelete (req.params.id)
        if (!supplier){
            res.status(400).send("Supplier not found ")
        }
        res.status(204).send()
        

    } catch (error){
        res.status(500).send(error.message);
    }


};



exports.updateSupplier = async (req, res) => {
    try {
        const supplier = await suppliercollection.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!supplier) {
            return res.status(404).send('Supplier not found');
        }
        res.status(200).send(supplier);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.getAllSuppliers =async (req, res ) =>{
    try {
        const supplier = await suppliercollection.find({});
        if (!supplier) {
            return res.status("No supplier found ")
        }
        res.status(200).send(supplier)
    } catch(error){
        res.status(400).send(error.message)
    }

    
 };
