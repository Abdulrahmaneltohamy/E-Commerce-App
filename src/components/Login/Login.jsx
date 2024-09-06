import React, { useContext, useState } from 'react'
import style from './Login.module.css'
import { Formik, useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import { CartContext } from '../../Context/CartContext';


export default function Login() {
  const [apiError, setapiError] = useState(null)
  let navigate = useNavigate()
  const [loadingspinner, setLoadingspinner] = useState(false)
  let { setUserData } = useContext(UserContext)
  const { cart } = useContext(CartContext);
  const [numOfCart, setNumOfCart] = useState(null)


  async function LoginHandle(values) {
    // console.log("Login", values);
    try {
      setLoadingspinner(true)
      let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values)
      // console.log(data);
      navigate('/')
      window.location.reload();
      localStorage.setItem('userToken', data.token)
      setUserData(data.token)
      setNumOfCart(cart.numOfCartItems)
      setLoadingspinner(false)

    } catch (err) {
      // console.log(err);
      // console.log(err.response.data.message);
      setapiError(err.response.data.message)
      setLoadingspinner(false)
    }
  }
  let validationSchemaForm = Yup.object().shape({
    email: Yup.string().email('email is invaild').required('email is require'),
    password: Yup.string().matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/, 'characters must (between 6 and 16) and Includes a special character and number ex.(P@ssw0rd123)').required('password is require'),
  })


  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    }
    , validationSchema: validationSchemaForm
    , onSubmit: LoginHandle
  })

  return (
    <>


{/* <form class="max-w-sm mx-auto">
  <div class="mb-5">
    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
    <input type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="name@flowbite.com" required />
  </div>
</form> */}



      <div className="container w-[80%] md:w-[38%] mx-auto my-8 py-20 border-gray-300 border-2 shadow-xl rounded-3xl px-10">
        <h2 className='font-semibold py-3 text-[--main-color]'>Login Now :</h2>

        <form onSubmit={formik.handleSubmit}>

          {apiError && <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
            <span className="font-medium">{apiError}</span>
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


          <Link to='/forgotPassword'> <div className='font-bold text-red-600 text-right mb-4'>Forgot Password ?</div> </Link>
            {loadingspinner ? <button type="button" className="text-white bg-[--main-color]  font-medium rounded-lg text-sm w-full px-10 py-2.5 text-center ">
              <i className="fas fa-spinner fa-spin-pulse"></i>

            </button> : <button type="submit" className="text-white bg-[--main-color]  font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center mb-2">Register</button>}
         

          <p className='md:text-center mt-3'>You Don't have an account ? <Link to='/register'><span className='font-semibold'>Register Now</span></Link></p>

        </form>
      </div>
    </>
  )
}
