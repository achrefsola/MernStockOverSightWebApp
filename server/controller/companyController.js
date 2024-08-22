
const companycollection = require('../models/company')


exports.createCompany= async(req,res)=>{

try{
    const companyLogo = req.file ? req.file.path : null; 
    const { companyName, companyAddress, companyRegion, companyPostalCode, companyPhone, companyEmail, managerId } = req.body;
    const companyData = {
        companyName,
        companyAddress,
        companyRegion,
        companyPostalCode,
        companyPhone,
        companyEmail,
        managerId,
        companyLogo,
      };
    const company = await companycollection.create(companyData)
    return res.status(201).send(company)

}
catch(error){
    res.status(400).send(error.message)

}

};

exports.getCompanyById = async (req, res) => {
    try {
        const company = await companycollection.findById(req.params.id);
        if (!company) {
            return res.status(404).send('company not found');
        }
        res.status(200).send(company);
        console.log(company)
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.deleteCompany = async (req,res)=> {

    try {
        const company = await companycollection.findByIdAndDelete (req.params.id)
        if (!company){
            res.status(400).send("company not found ")
        }
        res.status(204).send()
        

    } catch (error){
        res.status(500).send(error.message);
    }


};



exports.updateCompany = async (req, res) => {
    try {  
         const updateData = { ...req.body };
    if (req.file) {
        updateData.companyLogo = `uploads/${req.file.filename}`;
    }
        const company = await companycollection.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
        if (!company) {
            return res.status(404).send('company not found');
        }
        res.status(200).send(company);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.getAllCompanys =async (req, res ) =>{
    try {
        const company = await companycollection.find({});
        if (!company) {
            return res.status("No company found ")
        }
        res.status(200).send(company)
    } catch(error){
        res.status(400).send(error.message)
    }

    
 };
 exports.getCompanyByManagerId =async (req, res ) =>{
    try {
        const managerId =req.params.managerId
        const company = await companycollection.find({managerId:managerId});
        
        if (!company || company.length === 0) {
            return res.status(404).send("No company found");
        }
        res.status(200).send(company)
    } catch(error){
        res.status(400).send(error.message)
    }

    
 };


