import React, { useState } from 'react'
import style from './Layout.module.css'
import NavBar from '../NavBar/NavBar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'

export default function Layout() {
  return (

    <>
    <NavBar/>

    <div className="container py-16">
    <Outlet></Outlet>
    </div>

    <Footer/>
    </>
  )
}
