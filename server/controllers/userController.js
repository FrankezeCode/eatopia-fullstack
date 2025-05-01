import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';




// ---------------------------------------REGISTER  CONTROLLER---------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------//
//------------------------------------creates a new user in the database-----------------------------------------//

// Register User : /api/user/register
export const register = async (req , res)=>{
    try {
        const {name, email , password} = req.body;  //collects the data sent from the frontend
        
        //checks if any field is missing
        if(!name || !email || !password){
            return res.json({success: false, message: 'Missing Details'})
        }
        
        //checks if user with a given email  already exist
        const existingUser = await User.findOne({email})
        if(existingUser)
            return res.json({success: false, message: 'User already exists'})

        //Hashes the user's password using bcrypt with a salt round of 10.
        const hashedPassword = await bcrypt.hash(password, 10);
        
        //Creates a new user in the database with the hashed password.
        const user = await User.create({name, email, password: hashedPassword})

        
         //Creates a JWT token using the user’s ID.
        //Signs it using a secret key stored in your .env file (JWT_SECRET).
        //Sets token expiration to 7 days.
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});

        
        //Sets a cookie named 'token' with the JWT.
        res.cookie('token', token, {
            httpOnly: true, // Prevent javascript to access cookie (helps prevent XSS attacks)
            secure: process.env.NODE_ENV === "production", // Use secure cookies in production
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", // CSRF protection
            maxAge: 7 * 24 * 60 * 60 * 1000, // cookie expirationtime => 7days(the time is in milliseconds)
        })
        

        //Sends the final response to the client:
        return res.json(
            {
                success: true,
                user: {
                    email: user.email,
                    name: user.name
                }
            }
        );

    } catch (error) {
         console.log(error.message);
         res.json({success: false, message: error.message})
    }
}

// ---------------------------------------LOGIN  CONTROLLER---------------------------------------------------//
//------------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------------//
//------------------------------------logs in already existing user-------------------------------------------//

// Login User : /api/user/login
export const login = async(req , res)=>{
    try {
        const {email, password} = req.body; //collects the data sent from the frontend
        
        //checks if email or password is missing
        if(!email || !password ){
            return res.json({success: false , message:'Email and password are required'})
        }
        
        // finds the user
        const user = await User.findOne({email})

        //checks if the user exist
        if(!user){
            return res.json({success: false , message:'Invalid Email or Password'})
        }
        
        //compares the password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.json({success: false , message:'Invalid Email or Password'}) 
        }

         //Creates a JWT token using the user’s ID.
        //Signs it using a secret key stored in your .env file (JWT_SECRET).
        //Sets token expiration to 7 days.
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});

        
        //Sets a cookie named 'token' with the JWT.
        res.cookie('token', token, {
            httpOnly: true, // Prevent javascript to access cookie (helps prevent XSS attacks)
            secure: process.env.NODE_ENV === "production", // Use secure cookies in production
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", // CSRF protection
            maxAge: 7 * 24 * 60 * 60 * 1000, // cookie expirationtime => 7days(the time is in milliseconds)
        })
        

        //Sends the final response to the client:
        return res.json(
            {
                success: true,
                user: {
                    email: user.email,
                    name: user.name
                }
            }
        );
        

    } catch (error) {
        console.log(error.message);
         res.json({success: false, message: error.message})
    }
}



// ---------------------------------------CHECK AUTH  CONTROLLER---------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------//
//------------------------------------checks if a user is authenticated or not -------------------------------------//
//------------------------------------Also sends the user details to the frontent-----------------------------------//


//check Auth : /api/user/is-auth
export const isAuth = async (req , res)=>{
    try {
        
        const user = await User.findById(req.userId).select("-password") //finds the user document using its id  and then subtract the password from it

        return res.json({success: true , user})
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}



// ---------------------------------------LOGOUT  CONTROLLER------------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------//
//------------------------------------------Logs out a user--------------------------------------------------------//


//Logout User  : /api/user/logout
export const logout = async (req, res)=>{
    try {
        res.clearCookie('token', {
            httpOnly: true, // Prevent javascript to access cookie (helps prevent XSS attacks)
            secure: process.env.NODE_ENV === "production", // Use secure cookies in production
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", // CSRF protection
        })
        return res.json({success: true, message: "Logged Out"})
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}