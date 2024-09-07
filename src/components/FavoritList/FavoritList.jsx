import React, { useContext, useEffect, useState } from 'react'
import style from './FavoritList.module.css'
import { WishlistContext } from '../../Context/WishlistContext'
import LoaderSpinner from '../LoaderSpinner/LoaderSpinner'
import { CartContext } from '../../Context/CartContext'



export default function FavoritList() {
  let {removeProductFromWishlist , isLoading , wishlist, getWishlist } = useContext(WishlistContext)
  let {addProductToCart} = useContext(CartContext)

  //  addProductToWishlist("6428ebc6dc1175abc65ca0b9")
  useEffect(() => {

    getWishlist()
  }, [])

//   useEffect(() => {
//     if (!isLoading && !wishlist) {
//         getWishlist();
//     }
// }, [isLoading, wishlist, getWishlist]);


  return (

    <>
      {isLoading && wishlist ?
        <div className='w-full flex justify-center py-32 items-center'>
          <LoaderSpinner />
        </div> :
        <div className="relative overflow-x-auto shadow-md md:w-3/4 mx-auto sm:rounded-lg my-6">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs font-bold text-gray-700">
              <tr>
                <th colSpan={4} className='text-2xl py-4 pl-5'>My Wish list ❤️</th>
              </tr>
            </thead>
            <tbody>
              {wishlist?.data.map((item, index) => <tr key={index} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4">
                  <img src={item?.imageCover} className="w-full md:w-32" alt="" />
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {item?.category?.name}
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {item?.price} EGP
                </td>
                <td className="px-6 py-4">
                  <button onClick={() => removeProductFromWishlist(item._id)} className="font-medium text-red-600 ">Remove</button>
                </td>
                <td className="px-6 py-4">
                <button onClick={()=>addProductToCart(item._id)} className='btn rounded-md text-black'>Add To Cart</button>
                </td>
              </tr>)}
            </tbody>
          </table>

        </div>

      }
    </>
  )
}
