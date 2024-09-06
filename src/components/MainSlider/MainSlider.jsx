import React, { useState } from 'react'
import style from './MainSlider.module.css'
import Slider from "react-slick";
import slider1  from "../../assets/images/slider-image-1.jpeg"
import slider2  from "../../assets/images/slider-image-2.jpeg"
import slider3  from "../../assets/images/slider-image-3.jpeg"
import slider7  from "../../assets/images/background3.jpg"
import slider8  from "../../assets/images/slider-image-8.jpg"

export default function MainSlider() {

  var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1500,
    adaptiveHeight: true,
    focusOnSelect: true,
  }

  return (

    <>
        <div className='flex flex-wrap py-5'>
          <div className="md:w-3/4 w-full pb-8 md:pb-0">
          <Slider {...settings}>
          <img className='w-full h-[400px]' src={slider1} alt="slider image 1" />
          <img className='w-full h-[400px]' src={slider2} alt="slider image 2" />
          <img className='w-full h-[400px]' src={slider3} alt="slider image 3" />
          </Slider>
          </div>
          <div className="md:w-1/4 w-full flex flex-col">
          <img className='w-full h-[200px]' src={slider8} alt="slider image 5" />
          <img className='w-full h-[200px]' src={slider7} alt="slider image 4" />

          </div>
        </div>
      
    </>
  )
}
