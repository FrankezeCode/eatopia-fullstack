
import User from "../models/User.js"



// ---------------------------------------UPDATE USER CARTDATA  CONTROLLER----------------------------------------------//
//----------------------------------------------------------------------------------------------------------------------//
//----------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------updates the user cart data------------------------------------------//

//Update User CardData : /api/cart/update
export const updateCart = async (req, res)=>{
    try {
        const {userId, cartItems} = req.body //gets the cartItems data, and userId from the request body
        await User.findByIdAndUpdate(userId , {cartItems}) //finds and update the data in the database

        res.json({success: true, message: "Cart Updated"}) //sends success response to the client
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}


