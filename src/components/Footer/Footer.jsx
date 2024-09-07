import React, { useState } from 'react'
import style from './Footer.module.css'
import { Link } from 'react-router-dom';
import masterlogo from "../../assets/images/mastercard-logo.png"
import visalogo from "../../assets/images/visa.png"
import mastercard from "../../assets/images/mastercard.png"
import paypal from "../../assets/images/paypal.png"

export default function Footer() {
  return (
    <footer className="bg-gray-300">
      <div className="mx-auto w-full max-w-screen-xl px-4 py-4 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <div className="flex lg:flex-row items-center mb-3 md:mb-6">
              <i className="fa-solid fa-cart-shopping text-green-600 fa-2x me-1"></i>
              <span className="self-center text-2xl font-semibold whitespace-nowrap font-[Oswald-V] text-[#020402]">FreshCart</span>
            </div>

            <div className=" flex items-center text-left ">
              <span className="mr-2 font-bold">paymen partners</span>
              <img className='mr-1' src={masterlogo} alt="masterlogo" />
              <img className='mr-1' src={visalogo} alt="visalogo" />
              <img className='mr-1' src={paypal} alt="paypal" />
              <img className='mr-1' src={mastercard} alt="mastercard" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3 ">
            <div>
              <h2 className="mb-6 text-sm font-bold uppercase text-[#3C433B]">Follow us</h2>
              <ul className="text-gray-500 font-medium">
                <li className="mb-4"><Link to="https://github.com/themesberg/flowbite" className="hover:text-red-600">Github</Link></li>
                <li><Link to="https://discord.gg/4eeurUVvTy" className="hover:text-red-600">Discord</Link></li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-bold uppercase text-[#3C433B]">Legal</h2>
              <ul className="text-gray-500 font-medium">
                <li className="mb-4"><a href="#" className="hover:text-red-600">Privacy Policy</a></li>
                <li><Link to='' className="hover:text-red-600">Terms & Conditions</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="sm:flex sm:items-center text-center text-black font-bold py-4 bg-gray-400 sm:justify-center">
        <span className="text-sm sm:text-center">© 2024 <Link to="https://github.com/Abdulrahmaneltohamy" className="hover:underline">abdelrahmantohamy</Link> | All Rights Reserved.</span>
        <div className="flex flex-row justify-center mt-4 sm:mt-0 text-center">
          <Link to='' className="text-gray-500  ms-5 ">
            <i className="fab fa-facebook-f text-black hover:text-red-700 font-semibold"></i>
          </Link>
          <Link to='' className="text-gray-500  ms-5">
            <i className="fab fa-discord text-black hover:text-red-700 font-semibold"></i>
          </Link>
          <Link to='' className="text-gray-500  ms-5">
            <i className="fab fa-twitter text-black hover:text-red-700 font-semibold"></i>
          </Link>
          <Link to='' className="text-gray-500  ms-5">
            <i className="fab fa-instagram text-black hover:text-red-700 font-semibold"></i>
          </Link>
        </div>
      </div>
    </footer>
  );
}
