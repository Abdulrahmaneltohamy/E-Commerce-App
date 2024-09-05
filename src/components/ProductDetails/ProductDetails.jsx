import React, { useContext, useEffect, useState } from 'react'
import style from './ProductDetails.module.css'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import Slider from "react-slick";
import LoaderSpinner from '../LoaderSpinner/LoaderSpinner';
import RelatedProduct from '../RelatedProduct/RelatedProduct';
import { CartContext } from '../../Context/CartContext';
import { WishlistContext } from '../../Context/WishlistContext';


export default function ProductDetails() {
  const [isLoading, setIsLoading] = useState(true)
  const [productDetails, setProductDetails] = useState({})
  let { addProductToCart } = useContext(CartContext)
  const { getWishlist, wishlistProducts, addProductToWishlist } = useContext(WishlistContext);

  let { id } = useParams()
  // console.log(id);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1500
  };

  const isWishlisted = wishlistProducts.includes(id);


  async function getProductDetails(id) {
    try {
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      // console.log(data.data);
      setIsLoading(false)
      setProductDetails(data.data)

    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getProductDetails(id)
    getWishlist()
  }, [id])


  return (
    <>
      {isLoading ?
        <div className='w-full flex justify-center py-32 items-center'>
          <LoaderSpinner />
        </div> :
        <div className="container">

          <div className="flex flex-col md:flex-row items-center space-y-10 space-x-6 w-3/4 mx-auto py-10">
            <div className=' w-full md:w-1/4'>
              {productDetails.images ? <Slider {...settings}>
                {productDetails.images.map((image, index) => <img src={image} key={index} className='w-full' alt="" />)}
              </Slider> : <img src={productDetails.imageCover} className='w-full' alt="" />}
            </div>
            <div className='w-full md:w-3/4'>
              <div className='flex justify-between items-center'>
                <h2 className='text-base font-semibold'>{productDetails.title}</h2>
                <div onClick={() => addProductToWishlist(id)} className='text-2xl text-right'>
                  <i style={{ color: isWishlisted ? 'red' : 'black' }} className="fa-solid fa-heart cursor-pointer"></i>
                </div>
              </div>

              <p className='my-3 text-gray-700'>{productDetails.description}</p>
              <h3>{productDetails.category?.name}</h3>
              <div className='flex justify-between my-3'>
                <h4>{productDetails.price} EGP</h4>
                <h4><i className="fa-solid fa-star text-yellow-600"></i> {productDetails.ratingsAverage}</h4>
              </div>

              <button onClick={() => addProductToCart(id)} className='btn rounded-md'>Add To Cart</button>
            </div>
          </div>

          <RelatedProduct />

        </div>}
    </>
  )
}
