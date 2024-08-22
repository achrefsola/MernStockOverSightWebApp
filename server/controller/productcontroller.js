const productcollection = require('../models/product')


exports.createProduct= async(req,res)=>{

try{
    const { product, status,category,buyprice, price ,supplierName,stock} = req.body;
    const newProduct = new productcollection({
    product,
    status,
    category,
    buyprice,
    price,
    supplierName,
    stock,
      image: req.file ? `uploads/${req.file.filename}` : '',
    });
    const savedProduct = await newProduct.save();
    return res.status(201).send(savedProduct);
}
catch(error){
    res.status(400).send(error.message)

}

};

exports.getProductById = async (req, res) => {
    try {
        const product = await productcollection.findById(req.params.id, req.body, { new: true, runValidators: true });
        if (!product) {
            return res.status(404).send('Product not found');
        }
        res.status(200).send(product);
        console.log(product)
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.deleteProduct = async (req,res)=> {

    try {
        const product = await productcollection.findByIdAndDelete (req.params.id)
        if (!product){
            res.status(400).send("Product not found ")
        }
        res.status(204).send()

    } catch (error){
        res.status(500).send(error.message);
    }


};


//add image for update here 
exports.updateProduct = async (req, res) => {
   
    try {
        const updateData = { ...req.body };
        if (req.file) {
            updateData.image = `uploads/${req.file.filename}`;
        }

        
        const product = await productcollection.findByIdAndUpdate(req.params.id,  updateData,{ new: true, runValidators: true });
        if (!product) {
            return res.status(404).send('Product not found');
        }
        res.status(200).send(product);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.getAllProducts =async (req, res ) =>{
    try {
        const product = await productcollection.find()
        .populate('supplierName')
        .populate({ path: 'category', select: 'categoryName -_id ' });
        if (!product) {
            return res.status("No product found ")
        }
        res.status(200).send(product)
    } catch(error){
        res.status(400).send(error.message)
    }

    
 };

