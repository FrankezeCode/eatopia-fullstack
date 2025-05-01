import { v2 as cloudinary } from 'cloudinary';
import Product from '../models/Product.js';


// ---------------------------------------ADD PRODUCT  CONTROLLER---------------------------------------------------//
//------------------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------------------//
//------------------------------------adds product into the database-----------------------------------------------//

// Add Product: /api/product/add
export const  addProduct = async (req, res) =>{
    try {
        let productData = JSON.parse(req.body.productData) //get product data from the body and parse the JSON string that was received 

        const images = req.files // get the uploaded  image files from the request
        
        // Upload each image to Cloudinary and collect their secure URLs
        let imagesUrl = await Promise.all(
            images.map(async (item)=>{
                let result = await cloudinary.uploader.upload(item.path , {resource_type: 'image'}); //uploads each image
                return result.secure_url; // returns a secure image_url
            })
        )
        
        // Save the product to MongoDB, including the image URLs
        await Product.create({...productData, image: imagesUrl})
        
        // Send the final  success response to the client
        res.json({success: true, message: "Product added"})

    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}


// ---------------------------------------GET PRODUCT  CONTROLLER---------------------------------------------------//
//------------------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------------------//
//------------------------------------gets all product from the database--------------------------------------------//

// Get Product: /api/product/list
export const  productList = async (req, res) =>{
   try {

     const products = await Product.find({})// get all products from mongodb database

     res.json({success: true, products})// send final success response

   } catch (error) {
    console.log(error.message);
    res.json({success: false, message: error.message})
   }
}


// ---------------------------------------GET SINGLE PRODUCT  CONTROLLER--------------------------------------------//
//------------------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------------------//
//------------------------------------gets a single product from the database---------------------------------------//

// Get single Product: /api/product/id
export const  productById = async (req, res) =>{
    try {
        const {id} = req.body //get the id from the body(problem)

        const product = await Product.findById(id)// get a product by id from mongodb database

        res.json({success: true, product})// send final success response

    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}




// ---------------------------------------CHANGE PRODUCT INSTOCK  CONTROLLER--------------------------------------------//
//----------------------------------------------------------------------------------------------------------------------//
//----------------------------------------------------------------------------------------------------------------------//
//------------------------------------chamge a single product instock in the database--------  -------------------------//

// Change product inStock: /api/product/stock
export const  changeStock = async (req, res) =>{
    try {
        const {id, inStock} = req.body  //get the id and instock from the body(problem)

        await Product.findByIdAndUpdate(id, {inStock}) // find and update instock of a product in mongodb database

        res.json({success: true, message: "Stock Update"})// send final success response

    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}