import React, { useEffect, useState } from 'react'
import style from './Brands.module.css'
import axios from 'axios'
import LoaderSpinner from '../LoaderSpinner/LoaderSpinner'


export default function Brands() {
  const [allBrands, setAllBrands] = useState([])
  const [isLoading, setIsLoading] = useState(true)


  async function getAllBrands() {
    try {
      let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/brands')
      // console.log(data.data);
      setIsLoading(false)
      setAllBrands(data.data)

    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getAllBrands()
  }, [])

  return (

    <>
    {isLoading ?
        <div className='w-full flex justify-center py-32 items-center'>
          <LoaderSpinner />
        </div> :
      <div className='container py-10'>
        <div className="flex flex-wrap">
          {allBrands?.map((brand, index) => (
            <div key={index} className='w-[80%] mx-auto md:w-1/2 lg:w-1/3 xl:w-1/4 p-4 hover:scale-[1.02] drop-shadow-md'>
              <div className='bg-white shadow-lg rounded-lg border-2 overflow-hidden'>
                <img src={brand.image} className='w-full object-cover' alt={brand.name} />
                <div className='p-4'>
                  <h4 className='font-semibold text-center'>{brand.name}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>}
    </>
  )
}
