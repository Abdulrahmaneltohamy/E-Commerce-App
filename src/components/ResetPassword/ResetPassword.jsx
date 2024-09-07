import React, { useContext, useState } from 'react'
import style from './ResetPassword.module.css'
import { Formik, useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


export default function ResetPassword() {
  const [messageSuccess, setMessageSuccess] = useState(null)
  let navigate = useNavigate()
  const [loadingspinner, setLoadingspinner] = useState(false)

  async function ResetPassword(values) {
    try {
      setLoadingspinner(true)
      let { data } = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', values)
      // console.log(data);
      if (data.token) {
        setMessageSuccess(data.token)
      }
      setLoadingspinner(false)

    } catch (err) {
      console.log(err);
      setLoadingspinner(false)
    }
  }
  let validationSchemaForm = Yup.object().shape({
    email: Yup.string().email('email is invaild').required('email is require'),
    newPassword: Yup.string().matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/, 'characters must (between 6 and 16) and Includes a special character and number ex.(P@ssw0rd123)').required('password is require'),
  })


  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    }
    , validationSchema: validationSchemaForm
    , onSubmit: ResetPassword
  })

  return (
    <>

      <div className="container w-[80%] md:w-[39%] mx-auto my-8 py-8 border-gray-300 shadow-xl border-2 rounded-3xl px-10">
        <h2 className='font-semibold py-1 text-[--main-color] mb-5'>Create New Password</h2>

        <form onSubmit={formik.handleSubmit}>
          {/* 
          {apiError ? <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
            <span className="font-medium">{apiError}</span>
          </div> : <span>{messageSuccess}</span> } */}

          <div className="relative z-0 w-full mb-5 group py-5">
            <input type="email" name="email" id="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[--main-color] peer" placeholder=" " />
            <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[--main-color]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email :</label>
          </div>
          {formik.errors.email && formik.touched.email && <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
            <span className="font-medium">{formik.errors.email}</span>
          </div>}

          <div className="relative z-0 w-full mb-5 group">
            <input type="password" name="newPassword" id="newPassword" value={formik.values.newPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[--main-color] peer" autoComplete='newPassword' placeholder=" " />
            <label htmlFor="newPassword" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[--main-color]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">newPassword :</label>
          </div>
          {formik.errors.newPassword && formik.touched.newPassword && <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
            <span className="font-medium">{formik.errors.newPassword}</span>
          </div>}



          {messageSuccess ? 
          <div>
            <p className='mb-2'>your password has been changed successfully<i className="fa-solid fa-check text-green-600 border-2 border-green-600 p-1 rounded-full mx-2"></i></p>
           <Link to="/login"><p>you can <span className='font-bold text-green-600'>Login Now</span></p></Link>
          </div> : 
          <>
          {loadingspinner ? <button type="button" className="text-white bg-[--main-color]  font-medium rounded-lg text-sm w-full px-10 py-2.5 text-center ">
            <i className="fas fa-spinner fa-spin-pulse"></i>
          </button> : <button type="submit" className="text-white bg-[--main-color]  font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center mb-2">Verify</button>}
          </>
          }



        </form>
      </div>
    </>
  )
}

