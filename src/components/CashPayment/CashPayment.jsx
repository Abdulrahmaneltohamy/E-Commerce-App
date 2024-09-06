import React, { useContext, useState } from 'react'
import style from './CashPayment.module.css'
import { Formik, useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';


export default function CashPayment() {
  let {headerToken , cart} = useContext(CartContext)
  // const [isOnline, setIsOnline] = useState(false)
  let navigate = useNavigate()

  async function cashPaymentHandle(shippingAddress) {
    try {

      let { data } = await axios.post( `https://ecommerce.routemisr.com/api/v1/orders/${cart.data._id}`,
        shippingAddress,
        {
          headers: headerToken
        })
        console.log(data);
        toast.success('Successfully Payment',
          {
              duration: 4000,
              icon : '👏'
          }
      )
    
        navigate('/allorders')

    } catch (err) {
      console.log(err);
    }
  }


  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    }
    , onSubmit: cashPaymentHandle
  })

  return (
    <>
      <div className="container w-[80%]  md:w-1/3 mx-auto my-8 px-10 py-10 border-gray-300 border-2 shadow-xl rounded-3xl">
        <h2 className=' font-bold py-3 text-black'>Checkout Now :</h2>

        <form onSubmit={formik.handleSubmit}>


          <div className="relative z-0 w-full mb-5 group">
            <input type="text" name="details" id="details" value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[--main-color] peer" placeholder=" " required />
            <label htmlFor="details" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[--main-color]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">details :</label>
          </div>


          <div className="relative z-0 w-full mb-5 group">
            <input type="tel" name="phone" id="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[--main-color] peer" autoComplete='phone' placeholder=" " required />
            <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[--main-color]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">phone :</label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input type="text" name="city" id="city" value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[--main-color] peer" autoComplete='city' placeholder=" " required />
            <label htmlFor="city" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[--main-color]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">city :</label>
          </div>


          {/* <input type="checkbox" id='isOnline' onChange={() => setIsOnline(!isOnline)} />
          <label htmlFor="isOnline"> pay online ?</label> */}

          <button type="submit" className="text-white bg-green-900 w-full  font-medium rounded-lg text-sm  px-5 py-2.5 text-center mb-2">
            Pay Cash
          </button>
        </form>
      </div>
    </>
  )
}


