import React, { useContext, useEffect, useState } from 'react'
import style from './Home.module.css'
import Products from '../Products/Products'
import Cart from '../Cart/Cart'
import Brands from '../Brands/Brands'
import { CounterContext } from '../../Context/CounterContext'
import RecentProducts from '../RecentProducts/RecentProducts'
import axios from 'axios'
import LoaderSpinner from '../LoaderSpinner/LoaderSpinner'
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider'
import MainSlider from '../MainSlider/MainSlider'
import { WishlistContext } from '../../Context/WishlistContext'


export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [products, setProducts] = useState([])
  let {getWishlist } = useContext(WishlistContext)


  async function getRecentProducts() {
    try {
      let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products')
      // console.log(data.data);
      setIsLoading(false)
      setProducts(data.data)

    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getRecentProducts()
    getWishlist()
  }, [])



  return (

    <>
      {isLoading ?
        <div className='w-full flex justify-center py-32 items-center'>
          <LoaderSpinner />
        </div> :

        <div className='container '>
          <MainSlider />

          <CategoriesSlider />

          <div className="flex flex-wrap">
            {products.map((product, index) => <RecentProducts key={index} product={product} />)}
          </div>

        </div>}

    </>
  )
}
