import express from 'express';
import { addProduct, changeStock, productById, productList } from '../controllers/productController.js';
import { upload } from '../configs/multer.js';
import authSeller from '../middlewares/authSeller.js';


const productRouter = express.Router();


productRouter.post('/add', upload.array(["images"]) , authSeller, addProduct); // add middleware to upload and authenticate the seller before he can upload
productRouter.get('/list', productList)
productRouter.get('/id', productById) //(problem)
productRouter.post('/stock', authSeller, changeStock) 



export default productRouter;