import Order from "../models/Order.js"
import Product from "../models/Product.js"
import Stripe from 'stripe'



// -----------------------------------------PLACE ORDER COD  CONTROLLER-----------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------//
//-----------------------------------------save the order to the database----------------------------------------------//

// Place Order COD: /api/order/cod
export const placeOrderCOD = async (req, res)=>{
    try {
        const {userId, items, address} = req.body //get the data from request body
        
        // checks if data is available
        if(!address || items.length === 0 ){
            return res.json({success: false, message: "Invalid data"})
        }

        //Calculate Amount Using Items 
        let amount = await items.reduce(async (acc, item)=>{
            //acc is the initial count of the item, and the initial acc value is 0
            const product = await Product.findById(item.product);
            return (await acc) + product.offerPrice * item.quantity
        }, 0)


        // Add Tax Charge (2%)
        amount += Math.floor(amount * 0.02);

        await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: 'COD'
        })

        return res.json({success: true, message: "Order Placed Successfully"})
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}


// -----------------------------------------PLACE ORDER STRIPE  CONTROLLER-----------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------//
//--------------------------------------pay with stripe and save the order to the database----------------------------//

// Place Order Stripe: /api/order/stripe
export const placeOrderStripe = async (req, res)=>{
    try {
        const {userId, items, address} = req.body //get the data from request body
        const {origin} = req.headers; //get the origin from the request header/(it fectches the frontend url)
        
        // checks if data is available
        if(!address || items.length === 0 ){
            return res.json({success: false, message: "Invalid data"})
        }

        let productData = [];

        //Calculate Amount Using Items 
        let amount = await items.reduce(async (acc, item)=>{
            //acc is the initial count of the item, and the initial acc value is 0
            const product = await Product.findById(item.product);
            productData.push({
                name: product.name,
                price: product.offerPrice,
                quantity: item.quantity
            });
            return (await acc) + product.offerPrice * item.quantity
        }, 0)


        // Add Tax Charge (2%)
        amount += Math.floor(amount * 0.02);

        const order = await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: 'Online'
        })

        // Stripe Gateway Initialize
        const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

        // create Line items for stripe
        const line_items = productData.map((item)=>{
            return {
                price_data: {
                    currency: "usd",
                    product_data: {name:  item.name},
                    unit_amount: Math.floor(item.price + item.price * 0.02) * 100,
                },
                quantity: item.quantity,
            }
        })

        // Create Stripe session
        const session = await stripeInstance.checkout.sessions.create({
            line_items,
            mode : "payment",
            success_url: `${origin}/loader?next=my-orders`,
            cancel_url: `${origin}/cart`,
            metadata: {
                orderId : order._id.toString(),
                userId,
            }
        })

        return res.json({success: true,  url: session.url})//(problem)
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}



// -----------------------------------------GET ORDER  CONTROLLER-----------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------//
//-----------------------------------------get the order data from database-------------------------------------------//

// Get Orders by User ID : /api/order/user
export const getUserOrders = async (req, res)=>{
    try {
        const {userId} = req.body // (problem) 

        const orders = await Order.find({
            userId,
            $or: [{paymentType: 'COD'}, { isPaid: true }] //this is or statement in mongodb meaning either any of the two object

        }).populate("items.product address").sort({createdAt: -1});

        res.json({success: true , orders});


    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

// -----------------------------------------GET ALL ORDER CONTROLLER--------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------//
//------------------------------- get all  order for seller from the database-----------------------------------------//

// Get All Orders (for seller / admin)  /api/order/seller
export const getAllOrders = async (req, res)=>{
    try {
    
        const orders = await Order.find({
            $or: [{paymentType: 'COD'}, {isPaid: true}]

        }).populate("items.product address").sort({createdAt: -1});

        res.json({success: true , orders});


    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}
