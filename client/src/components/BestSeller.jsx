import React from 'react'
import ProductCard from './ProductCard'
import { useAppContext } from "../context/AppContext";

const BestSeller = () => {
 const {products} = useAppContext()
    
  return (
    <div className='mt-16'>
        <p className='text-2xl md:text-3xl font-medium max-md:text-center'>Best Sellers</p>
        <div className='max-md:grid-cols-1 max-md:place-items-center grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6  mt-6'>
            {products.filter((product)=>product.inStock).slice(0,5).map((product, index)=>(
               <ProductCard key={index} product={product}/>
            ))}
        </div>
    </div>
  )
}

export default BestSeller