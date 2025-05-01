import React from 'react'
import { assets } from '../assets/assets'

// Input Field Component
const  InputField = ({type, placeholder, name, handleChange, address})=>(
    <input 
    type={type} 
    placeholder={placeholder}
    name={name}
    onChange={handleChange}
    value={address[name]}
    required
    className="w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition"
    />
)


const AddAddress = () => {

  const [address, setAddress] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  })
 
  const onSubmitHandler = async(e)=>{
        e.preventDefault();
  }


  const handleChange = (e)=>{
    const {name, value} = e.target;
    setAddress((prevState) => ({
        ...prevState,
        [name]: value
    }))
  }


  return (
    <div className='mt-16 '>
        <p className='text-2xl md:text-3xl text-gray-500'>Add Shipping <span className='text-primary font-semibold'>Address</span></p>

        <div className='flex flex-col-reverse md:flex-row justify-between mt-10'>
            <div className='flex-1 max-w-md'>

              <form onSubmit={onSubmitHandler} className='space-y-3 mt-6 text-sm '>
                <div className='grid grid-cols-2 gap-4'>
                  <InputField type="text" handleChange={handleChange} address={address} name="firstName" placeholder="First Name"/>
                  <InputField type="text" handleChange={handleChange} address={address} name="lastName" placeholder="Last Name"/>
                </div>

                <InputField type="email" handleChange={handleChange} address={address} name="email" placeholder="Email Address"/>
                <InputField type="text" handleChange={handleChange} address={address} name="street" placeholder="Street"/>

                <div className='grid grid-cols-2 gap-4'>
                  <InputField type="text" handleChange={handleChange} address={address} name="city" placeholder="City"/>
                  <InputField type="text" handleChange={handleChange} address={address} name="state" placeholder="State"/>
                </div>

                <div className='grid grid-cols-2 gap-4'>
                  <InputField type="number" handleChange={handleChange} address={address} name="zipCode" placeholder="Zip Code"/>
                  <InputField type="text" handleChange={handleChange} address={address} name="country" placeholder="Country"/>
                </div>
                <InputField type="number" handleChange={handleChange} address={address} name="phone" placeholder="Phone Number"/>

                <button className='w-full bg-primary mt-6 text-white py-3 rounded hover:bg-primary-dull transition duration-200 ease-in-out cursor-pointer uppercase' type="submit">
                  Save address
                </button>
              </form>

            </div>
            <img className='md:mr-16 mb-16 md:mt-0' src={assets.add_address_iamge} alt="Add Address" />
        </div>
    </div>
  )
} 

export default AddAddress