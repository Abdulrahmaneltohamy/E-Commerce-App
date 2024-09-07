import React, { useContext, useEffect, useState } from 'react'
import style from './Cart.module.css'
import { CartContext } from '../../Context/CartContext'
import LoaderSpinner from '../LoaderSpinner/LoaderSpinner'
import { Link } from 'react-router-dom'



export default function Cart() {
  const [isOnline, setIsOnline] = useState(false)
  let { clearCart, setCart, removeProductFromCart, ubdateProductCount, cart, getCart, isLoading } = useContext(CartContext)

  useEffect(() => {
    getCart()
  }, [])

  function clearAllCart() {
    setCart(null)
    clearCart()
    getCart()
  }
  return (

    <>
      {isLoading && cart ?
        <div className='w-full flex justify-center py-32 items-center'>
          <LoaderSpinner />
        </div> :
        <div className="relative overflow-x-auto shadow-md md:w-3/4 mx-auto sm:rounded-lg mt-4">
          <h2 className='text-center font-bold'>My Shopping Cart <i className="fa-solid fa-cart-shopping text-3xl text-[--main-color]"></i></h2>
          <div className='text-center px-2 py-3 text-sm'>
            <span className=' font-semibold rounded-lg'>Number Of Cart Items : {cart ? cart.numOfCartItems : ''} </span>
            {/* <span className=' font-semibold'>Total Price : {cart?.data?.totalCartPrice ?? ''}  EGP</span> */}
          </div>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs font-bold text-gray-700 uppercase bg-gray-50 ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Product Image
                </th>
                <th scope="col" className="px-6 py-3">
                  Product Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Qty
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {cart?.data.products.map((product, index) => <tr key={index} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4">
                  <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {product.product.title}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <button onClick={() => ubdateProductCount(product.product.id, product.count - 1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                      <span className="sr-only">Quantity button</span>
                      <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                      </svg>
                    </button>
                    <div>
                      <span>{product?.count}</span>
                    </div>

                    <button onClick={() => ubdateProductCount(product.product.id, product.count + 1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                      <span className="sr-only">Quantity button</span>
                      <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                      </svg>
                    </button>
                  </div>
                </td>
                <td className=" py-4 font-semibold text-gray-900 dark:text-white">
                  {product?.price} EGP
                </td>
                <td className="px-6 py-4">
                  <button onClick={() => removeProductFromCart(product.product.id)} className="font-medium text-red-600">Remove</button>
                </td>
              </tr>)}
            </tbody>
          </table>

          {cart?.numOfCartItems > 0 ?
            <>
              <div className='flex justify-around py-4'>
                <div>
                  <input className='ms-3' type="checkbox" id='isOnline' onChange={() => setIsOnline(!isOnline)} />
                  <label htmlFor="isOnline"> pay online ?</label>
                  {isOnline ? <button className='bg-green-700 mx-2 my-2 p-2 rounded-lg'><Link to={"/checkout"}>Payment online</Link></button>
                    : <button className='bg-[--main-color] mx-4 my-2 p-2 rounded-lg'><Link to={"/cashPayment"}>Payment Cash</Link></button>}
                </div>

                <div className=' bg-blue-600 my-2 p-2 mx-3 rounded-lg font-semibold'>Total Price : {cart?.data?.totalCartPrice ?? ''}  EGP</div>

                <button onClick={() => clearAllCart()} className='bg-red-600 my-2 p-2 rounded-lg'>Clear Cart</button>
              </div>


            </>
            :
            <div className='text-center py-5'>
              <h1 className='mb-4'>Your Cart Is Impty</h1>
              <Link className='bg-[--main-color] mx-2 my-2 p-2 rounded-lg' to={"/products"}>Shopping Now</Link>
            </div>
          }

        </div>

      }
    </>
  )
}
