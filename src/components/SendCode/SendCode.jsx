import React, { useContext, useState } from 'react'
import style from './SendCode.module.css'
import { Formik, useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';



export default function SendCode() {
  const [apiError, setapiError] = useState(null)
  let navigate = useNavigate()
  const [loadingspinner, setLoadingspinner] = useState(false)

  async function SendCode(values) {
    try {
      setLoadingspinner(true)
      let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', values)
      // console.log(data);
      if (data.status === 'Success') {
        navigate('/reserPassword')

      }
      setLoadingspinner(false)

    } catch (err) {
      console.log(err);
      setLoadingspinner(false)
    }
  }

  let formik = useFormik({
    initialValues: {
      resetCode: "",
    }
    , onSubmit: SendCode
  })

  return (
    <>

      <div className="container w-[80%] md:w-[38%] mx-auto my-8 py-8 border-gray-300 shadow-xl border-2 rounded-3xl px-10">
        <h3 className='font-semibold py-1 mb-1'>Enter Verification Code</h3>
        <p className=' text-sm mb-6 '>we've sent a code to your mail</p>

        <form onSubmit={formik.handleSubmit}>
{/* 
          {apiError ? <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
            <span className="font-medium">{apiError}</span>
          </div> : <span>{messageSuccess}</span> } */}

          <div className="relative z-0 w-full mb-5 group py-5">
            <input type="text" name="resetCode" id="resetCode" value={formik.values.resetCode} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[--main-color] peer" placeholder=" " />
            <label htmlFor="resetCode" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[--main-color]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Verify Reset Code :</label>
          </div>
          {formik.errors.resetCode && formik.touched.resetCode && <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
            <span className="font-medium">{formik.errors.resetCode}</span>
          </div>}

          
            {loadingspinner ? <button type="button" className="text-white bg-[--main-color]  font-medium rounded-lg text-sm w-full  px-10 py-2.5 text-center ">
              <i className="fas fa-spinner fa-spin-pulse"></i>
            </button> : <button type="submit" className="text-white bg-[--main-color]  font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center mb-2">Verify</button>}
          

        </form>
      </div>
    </>
  )
}

