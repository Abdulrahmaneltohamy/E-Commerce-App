import React, { useContext, useEffect, useState } from 'react'
import style from './AllOrders.module.css'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import LoaderSpinner from '../LoaderSpinner/LoaderSpinner';



export default function AllOrders() {
  let { getCart } = useContext(CartContext)
  let { id } = jwtDecode(localStorage.getItem('userToken'))
  const [allOrders, setAllOrders] = useState(null)
  const [isLoading, setIsLoading] = useState(true);

  // console.log(id);


  async function getUserOrders() {
    try {
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
      // console.log(data);
      setAllOrders(data)
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  }


  // function paymentMessage() {
  //   toast.success('Your order has been paid successfully, your card is empty now') , 
  //   {
  //     duration: 7000
  //   }
  // }
  // paymentMessage()

  useEffect(() => {
    getUserOrders()
    getCart()
  }, [])


  return (

    <>

      {isLoading ?
        <div className='w-full flex justify-center py-32 items-center'>
          <LoaderSpinner />
        </div> :

        <>

          <div className='container mx-auto'>
            <div className="relative overflow-x-auto md:w-3/4 mx-auto">
              <h2 className='font-bold mt-3 py-4 text-center'>Order Details <i className="fa-solid fa-list-check"></i></h2>
              <table className="w-full text-sm text-center text-gray-500">
                <thead className="text-xs text-gray-700 bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Order Number
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Total Order Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Order Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Type of Payment
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {allOrders ? allOrders.map((order, index) => {

                    const formattedDate = new Date(order.createdAt).toISOString().split('T')[0];

                    return (
                      <tr key={index} className="bg-white border-b text-center">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {order.id}
                        </th>
                        <td className="px-6 py-4">
                          {order.totalOrderPrice} EGP
                        </td>
                        <td className="px-6 py-4">
                          {formattedDate}
                        </td>
                        <td className="px-6 py-4">
                          {order.paymentMethodType}
                        </td>
                      </tr>
                    );
                  }) :
                    <div className='py-20 text-center'>
                      <p className='text-2xl'>Your order has been paid successfully</p>
                      <p className='text-2xl'> your card is empty now</p>
                      <button className='bg-green-700 mx-2 my-2 p-2 rounded-lg'><Link to={"/products"}>Shopping Now</Link></button>
                    </div>
                  }
                </tbody>
              </table>
              <button className='bg-green-700 mx-auto w-full my-5 p-2 rounded-lg'><Link to={"/products"}>Shopping Now</Link></button>
            </div>
          </div>

        </>
      }
    </>
  )
}
