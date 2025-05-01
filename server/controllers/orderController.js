import Order from "../models/Order.js"
import Product from "../models/Product.js"



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

// -----------------------------------------GET ORDER  CONTROLLER-----------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------//
//-----------------------------------------get the order data from database-------------------------------------------//

// Get Orders by User ID : /api/order/user
export const getUserOrders = async (req, res)=>{
    try {
        const {userId} = req.body // (problem) 

        const orders = Order.find({
            userId,
            $or: [{paymentType: 'COD', isPaid: true}]

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
    
        const orders = Order.find({
            $or: [{paymentType: 'COD', isPaid: true}]

        }).populate("items.product address").sort({createdAt: -1});

        res.json({success: true , orders});


    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}
