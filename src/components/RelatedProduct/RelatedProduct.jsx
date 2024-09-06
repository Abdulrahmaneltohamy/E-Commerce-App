import React, { useContext, useEffect, useState } from 'react'
import style from './RelatedProduct.module.css'
import Slider from "react-slick";
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';

export default function RelatedProduct() {
  const [relatedProduct, setRelatedProduct] = useState([])
  let { category } = useParams()
  let {addProductToCart} = useContext(CartContext)
  
  var settings2 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1500,
    adaptiveHeight: true,
    focusOnSelect: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,
          adaptiveHeight: true,
          focusOnSelect: false,
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          adaptiveHeight: true,
          focusOnSelect: false,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
          adaptiveHeight: true,
          focusOnSelect: false,
        }
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          adaptiveHeight: true,
          focusOnSelect: false,
        }
      }
    ]
  };

  async function getRelatedProduct(category) {
    try {
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
      let allProduct = data.data;
      // console.log(data.data);

      let related = allProduct.filter((product) => product.category.name == category)
      // console.log(related);
      setRelatedProduct(related)

    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getRelatedProduct(category)
  }, [category])

  
  return (
    <> 
      <div className=" py-5">
        <h2 className='py-3 text-center font-semibold'>Products associated with this item</h2>
        <Slider {...settings2}>
          {relatedProduct.map((product , index) =>
          <div key={index} className='px-2 py-7'>
            <div className='w-[80%] mx-auto md:w-full rounded-md py-1 px-1 hover:border-2 border-gray-300 hover:scale-[1.1] product shadow-lg focus:border-none'>
              <Link to={`/productDetais/${product.id}/${product.category.name}`}>
                  <img className='w-full' src={product.imageCover} alt="" />
                  <div className=' pt-2'>
                    <h2 className='text-sm font-semibold text-[--main-color]'>{product.category.name}</h2>
                    <h2 className='text-sm font-semibold'>{product.title.split(' ').slice(0, 2).join(' ')}</h2>
                    <div className='flex justify-between'>
                      <h4>{product.price} EGP</h4>
                      <h4><i className="fa-solid fa-star text-yellow-600"></i> {product.ratingsAverage}</h4>
                    </div>
                  </div>
              </Link>
              <button onClick={()=>addProductToCart(product.id)} className='btn rounded-md'>Add To Cart</button>
            </div>
            </div>
          )}
        </Slider>
      </div>
    </>
  )
}
