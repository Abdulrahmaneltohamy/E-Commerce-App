import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ProductDetails from '../ProductDetails/ProductDetails'
import { CartContext } from '../../Context/CartContext'
import { WishlistContext } from '../../Context/WishlistContext'


export default function RecentProducts({ product }) {

    let { addProductToCart } = useContext(CartContext)
    let {getWishlist , wishlistProducts, addProductToWishlist } = useContext(WishlistContext)
    const isWishlisted = wishlistProducts.includes(product.id);

    // useEffect(() => {
    //     getWishlist()
    // }, [])
    
    return (
        <>
            <div className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 py-5 px-3 product cursor-pointer'>
                <div className=' rounded-md p-1 shadow-lg hover:border-2 border-gray-300 hover:scale-[1.03]'>
                    <Link to={`/productDetais/${product.id}/${product.category.name}`}>
                        <img className='w-full' src={product.imageCover} alt="" />
                        <div className=' pt-2'>
                            <h2 className='text-sm font-semibold text-[--main-color]'>{product.category.name}</h2>
                            <h2 className='text-sm font-bold'>{product.title.split(' ').slice(0, 2).join(' ')}</h2>
                            <div className='flex justify-between'>
                                <h4>{product.price} EGP</h4>
                                <h4><i className="fa-solid fa-star text-yellow-600"></i> {product.ratingsAverage}</h4>
                            </div>
                        </div>
                    </Link>
                    <div onClick={() => addProductToWishlist(product.id)} className='text-2xl text-right'>
                        <i style={{ color: isWishlisted ? 'red' : 'black' }} className="fa-solid fa-heart"></i>
                    </div>
                    <button onClick={() => addProductToCart(product.id)} className='btn rounded-md'>Add To Cart</button>
                </div>
            </div>

        </>

    )
}
