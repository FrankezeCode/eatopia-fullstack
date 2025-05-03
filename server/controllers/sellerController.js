import jwt from "jsonwebtoken";

// ---------------------------------------SELLER LOGIN  CONTROLLER---------------------------------------------//
//------------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------------//
//----------------------------------------------logs in Seller------------------------------------------------//

// Login seller : /api/seller/login
export const sellerLogin =  async(req, res) =>{
    try {
        const {email, password} = req.body; //collects the data sent from the frontend

        if(password === process.env.SELLER_PASSWORD && email === process.env.SELLER_EMAIL){
           const token = jwt.sign({email},  process.env.JWT_SECRET, {expiresIn: '7d'})

           //Sets a cookie named 'sellerToken' with the JWT.
            res.cookie('sellerToken', token, {
            httpOnly: true, // Prevent javascript to access cookie (helps prevent XSS attacks)
            secure: true, // Use secure cookies in production
            sameSite: "none", // CSRF protection
            maxAge: 7 * 24 * 60 * 60 * 1000, // cookie expirationtime => 7days(the time is in milliseconds)
             })

             return res.json({success: true , message:'Logged in'})
        }else {
            return res.json({success: false , message:'Invalid Credentials'})
        }

    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}


// ---------------------------------------CHECK AUTH  CONTROLLER---------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------//
//------------------------------------checks if the seller is authenticated or not -------------------------------------//
//------------------------------------Also sends the sellers details to the frontent-----------------------------------//


//Seller isAuth : /api/seller/is-auth
export const isSellerAuth = async (req , res)=>{
    try {

        return res.json({success: true })

    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}



// ---------------------------------------SELLER LOGOUT  CONTROLLER------------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------//
//------------------------------------------Logs out a seller--------------------------------------------------------//


//Logout Seller  : /api/seller/logout
export const sellerLogout = async (req, res)=>{
    try {
        res.clearCookie('sellerToken', {
            httpOnly: true, // Prevent javascript to access cookie (helps prevent XSS attacks)
            secure: true, // Use secure cookies in production
            sameSite: "none"  // CSRF protection
        })
        return res.json({success: true, message: "Logged Out"})
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}






