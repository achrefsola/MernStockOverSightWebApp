
const categorycollection = require('../models/category')


exports.createCategory= async(req,res)=>{

try{
    
   
    const category = await categorycollection.create(req.body)
    return res.status(201).send(category)

}
catch(error){
    res.status(400).send(error.message)

}

};

exports.getCategoryById = async (req, res) => {
    try {
        const category = await categorycollection.findById(req.params.id);
        if (!category) {
            return res.status(404).send('category not found');
        }
        res.status(200).send(category);
        console.log(category)
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.deleteCategory = async (req,res)=> {

    try {
        const category = await categorycollection.findByIdAndDelete (req.params.id)
        if (!category){
            res.status(400).send("category not found ")
        }
        res.status(204).send()
        

    } catch (error){
        res.status(500).send(error.message);
    }


};



exports.updateCategory = async (req, res) => {
    try {
        const category = await categorycollection.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!category) {
            return res.status(404).send('category not found');
        }
        res.status(200).send(category);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.getAllCategorys =async (req, res ) =>{
    try {
        const category = await categorycollection.find({});
        if (!category) {
            return res.status("No category found ")
        }
        res.status(200).send(category)
    } catch(error){
        res.status(400).send(error.message)
    }

    
 };
