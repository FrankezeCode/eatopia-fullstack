import Address from "../models/Address.js"



// -----------------------------------------ADD ADDRESS  CONTROLLER---------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------add address to the database----------------------------------------------//

// Add Address : /api/address/add
export const addAddress = async()=>{
    try {
        const {address, userId} = req.body //gets the address data, and userId from the request body
        await Address.create({...address, userId})// saves the data to the database
        res.json({success: true, message: "Address added successfully"})//sends success response to the client
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}



// -----------------------------------------GET ADDRESS  CONTROLLER---------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------//
//-----------------------------------------get address from the database----------------------------------------------//

//Get Address: /api/address/get
export const getAddress = async()=>{
    try {
        const { userId} = req.body //(problem) //get userid from the request
        const addresses =  await Address.find({userId}) // find the addresses using the userId
        res.json({success: true, addresses})
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}
