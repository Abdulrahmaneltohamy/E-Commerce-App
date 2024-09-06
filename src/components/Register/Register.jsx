import React, { useContext, useState } from 'react'
import style from './Register.module.css'
import { Formik, useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';


export default function Register() {
  const [apiError, setapiError] = useState(null)
  let navigate = useNavigate()
  const [loadingspinner, setLoadingspinner] = useState(false)
  let { setUserData } = useContext(UserContext)


  async function registerHandle(values) {
    // console.log("reg",formik);
    // console.log("register", values);
    try {
      setLoadingspinner(true)
      let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values)
      navigate('/')
      localStorage.setItem('userToken', data.token)
      console.log(data);
      setUserData(data.token)
      setLoadingspinner(false)
    } catch (err) {
      // console.log(err);
      // console.log(err.response.data.message);
      setapiError(err.response.data.message)
      setLoadingspinner(false)
    }

  }
  // function validateForm(values) {
  //   // console.log("validate", values);
  //   // console.log("valid", formik);

  //   let errorform = {}
  //   if (values.name === "") {
  //     errorform.name = "name is require"
  //   }
  //   else if (!/^[A-Z][a-z]{2,10}$/.test(values.name)) {
  //     errorform.name = "Min characters Is 3, max is 12 and name must start with capital letter"
  //   }

  //   if (values.email === "") {
  //     errorform.email = "email is require"
  //   }
  //   else if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(values.email)) {
  //     errorform.email = "invalid mail ex.(ahmed@gmail.com)"
  //   }

  //   if (values.password === "") {
  //     errorform.password = "password is require"
  //   }
  //   else if (! /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(values.password)) {
  //     errorform.password = " characters must (between 6 and 16) and Includes a special character and number ex.(P@ssw0rd123)"
  //   }
    
  //   if (values.phone === "") {
  //     errorform.phone = "phone is require"
  //   }
  //   else if (! /^(00201|\+201|01)[0-2,5]{1}[0-9]{8}$/.test(values.phone)) {
  //     errorform.phone = "egyption number phone only"
  //   }

  //   return errorform;
  // }

  let validationSchemaForm = Yup.object().shape({
    name: Yup.string().min(3, 'min characters is 3').max(12, 'max characters is 12').required('name is require'),
    email: Yup.string().email('email is invaild').required('email is require'),
    password: Yup.string().matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/, 'characters must (between 6 and 16) and Includes a special character and number ex.(P@ssw0rd123)').required('password is require'),
    rePassword: Yup.string().oneOf([Yup.ref("password")], "Passwords dont matched").required('rePassword is require'),
    phone: Yup.string().matches(/^(00201|\+201|01)[0-2,5]{1}[0-9]{8}$/, 'egyption number phone only').required('phone is require'),
  })

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
    }, validationSchema: validationSchemaForm
    //  validate: validateForm
    , onSubmit: registerHandle
  })


  return (
    <>
      <div className="container w-[80%] md:w-[38%] mx-auto my-8 py-8 border-gray-300 shadow-xl border-2 rounded-3xl px-10">
        <h2 className='font-semibold py-3 text-[--main-color]'>Register Now :</h2>

        <form onSubmit={formik.handleSubmit}>

          {apiError && <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
            <span className="font-medium">{apiError}</span>
          </div>}

          <div className="relative z-0 w-full mb-5 group">
            <input type="text" name="name" id="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[--main-color] peer" placeholder=" " />
            <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[--main-color]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">name :</label>
          </div>
          {formik.errors.name && formik.touched.name && <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
            <span className="font-medium">{formik.errors.name}</span>
          </div>}


          <div className="relative z-0 w-full mb-5 group">
            <input type="email" name="email" id="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[--main-color] peer" placeholder=" " />
            <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[--main-color]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">email :</label>
          </div>
          {formik.errors.email && formik.touched.email && <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
            <span className="font-medium">{formik.errors.email}</span>
          </div>}

          <div className="relative z-0 w-full mb-5 group">
            <input type="password" name="password" id="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[--main-color] peer" autoComplete='password' placeholder=" " />
            <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[--main-color]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">password :</label>
          </div>
          {formik.errors.password && formik.touched.password && <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
            <span className="font-medium">{formik.errors.password}</span>
          </div>}

          <div className="relative z-0 w-full mb-5 group">
            <input type="password" name="rePassword" id="rePassword" value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[--main-color] peer" autoComplete='password' placeholder=" " />
            <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[--main-color]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">confirm password :</label>
          </div>
          {formik.errors.rePassword && formik.touched.rePassword && <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
            <span className="font-medium">{formik.errors.rePassword}</span>
          </div>}

          <div className="relative z-0 w-full mb-5 group">
            <input type="tel" name="phone" id="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[--main-color] peer" placeholder=" " />
            <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[--main-color]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">phone :</label>
          </div>
          {formik.errors.phone && formik.touched.phone && <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
            <span className="font-medium">{formik.errors.phone}</span>
          </div>}

          {loadingspinner ? <button type="button" className="text-white bg-[--main-color]  font-medium rounded-lg text-sm w-full px-10 py-2.5 text-center ">
            <i className="fas fa-spinner fa-spin-pulse"></i>
          </button> : <button type="submit" className="text-white bg-[--main-color]  font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center mb-4">Register </button>}
          <p>You already have an account ? <Link to='/login'><span className='font-semibold'>Login Now</span></Link></p>
    

        </form>
      </div>
    </>
  )
}
