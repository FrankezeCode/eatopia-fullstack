import React from 'react'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets';

const SearchBar = () => {
const {setSearchQuery} = useAppContext();


  return (
      <div className="flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full mt-6">
          <input onChange={(e) => setSearchQuery(e.target.value)} className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search products" />
          <img src={assets.search_icon} alt='Search' className='w-4 h-4' />
      </div>
  )
}

export default SearchBar