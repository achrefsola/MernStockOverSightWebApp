const ordercollection = require('../models/order')


exports.createOrder= async(req,res)=>{

try{
    
    console.log("Request Body: ", req.body);
    const order = await ordercollection.create(req.body)
    return res.status(201).send(order)

}
catch(error){
    res.status(400).send(error.message)

}

};

exports.getOrderById = async (req, res) => {
    try {
        const order = await ordercollection.findById(req.params.id, req.body, { new: true, runValidators: true });
        if (!order) {
            return res.status(404).send('Order not found');
        }
        res.status(200).send(order);
        console.log(order)
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.deleteOrder= async (req,res)=> {

    try {
        const order = await ordercollection.findByIdAndDelete (req.params.id)
        if (!order){
            res.status(400).send("Order not found ")
        }
        res.status(204).send()

    } catch (error){
        res.status(500).send(error.message);
    }


};



exports.updateOrder = async (req, res) => {
    try {
        console.log('this is the update ',req.body)
        const order = await ordercollection.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        
        if (!order) {
            return res.status(404).send('Order not found');
        }
        res.status(200).send(order);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.getAllOrder=async (req, res ) =>{
    try {
        const order = await ordercollection.find().populate('products','product')
        if (!order) {
            return res.status("No order found ")
        }
        res.status(200).send(order)
    } catch(error){
        res.status(400).send(error.message)
    }

    
 };
