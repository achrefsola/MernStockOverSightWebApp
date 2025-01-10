const stripe = require('stripe')('sk_test_51Q6aBBDR9jXBiqEaeAR8Oco98D1dYW7rf2oFQkKbHxtyqz3gaXXlf9D2fw2NF0FgpXkvTqvC4g0lGW3POP0o71x100DaiaENmh')

exports.makePayment = async (req,res)=>{
    try{
        const session= await stripe.checkout.sessions.create({
            
            payment_method_types : ['card'],
            success_url: 'http://localhost:3000/dashboard/payment/success',

            line_items: [
              {
                price_data: {
                    currency: 'usd', // Currency for the payment
                    product_data: {
                        name: 'StockOversight VIP Pack', // Product name
                    },
                    unit_amount: 2000,
                },
                quantity: 1,
              },
            ],
            mode: 'payment',
        })
        res.json({ id: session.id, url: session.url });
    }
    catch(error){
        res.status(500).send({error:error.message})
        console.log(error.message)
    }
}