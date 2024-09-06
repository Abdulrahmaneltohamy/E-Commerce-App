import React, { useState } from 'react'
import style from './NotFound.module.css'
import notFoundimage  from "../../assets/images/not-found-image.png"

export default function NotFound() {
  return (

    <>
    <div>
      <img className='w-full mx-auto' src={notFoundimage} alt="notFoundimage" />
    </div>
    </>
  )
}
