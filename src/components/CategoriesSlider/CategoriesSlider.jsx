import React, { useEffect, useState } from 'react'
import style from './CategoriesSlider.module.css'
import axios from 'axios'
import Slider from "react-slick";



export default function CategoriesSlider() {
  const [categoriesSlider, setCategoriesSlider] = useState([])

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1500,
    adaptiveHeight: true,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,
          adaptiveHeight: true,
          focusOnSelect: true,
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          adaptiveHeight: true,
          focusOnSelect: true,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
          adaptiveHeight: true,
          focusOnSelect: true,
        }
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          adaptiveHeight: true,
          focusOnSelect: true,
        }
      }
    ]
  };


  async function getCategoriesSlider() {
    try {
      let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
      // console.log(data.data);
      // setIsLoading(false)
      setCategoriesSlider(data.data)

    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getCategoriesSlider()
  }, [])

  return (

    <>
      <div className=' pb-11'>
        <h2 className='mb-1'>Shop Popular Categories</h2>

        <Slider {...settings}>
          {categoriesSlider?.map((category, index) => <div key={index} className=' py-3'>
            <img src={category.image} className='w-full h-[200px]' alt="" />
            <h4 className='font-semibold'>{category.name}</h4>
          </div>)}

        </Slider>
      </div>



    </>
  )
}
