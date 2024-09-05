import React, { useState, useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import { CartContext } from '../../Context/CartContext';
import mainlogo from '../../assets/images/freshcart-logo.svg';
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function NavBar() {
  const { userData, setUserData } = useContext(UserContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  function toggleNavExpansion() {
    setIsNavExpanded(!isNavExpanded);
  }

  function logOut() {
    localStorage.removeItem('userToken');
    setUserData(null);
    navigate('/Login');
  }

  return (
    <nav className="bg-gray-300 p-4 text-black border-gray-200 fixed left-0 right-0 top-0 z-50">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={mainlogo} width={110} alt="main logo" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-grow justify-center space-x-4">
          {userData ? (
            <>
              <NavLink to="" end className="hover:text-gray-700">Home</NavLink>
              <NavLink to="products" className="hover:text-gray-700">Products</NavLink>
              <NavLink to="categories" className="hover:text-gray-700">Categories</NavLink>
              <NavLink to="brands" className="hover:text-gray-700">Brands</NavLink>
              <NavLink to="allorders" className="hover:text-gray-700">Orders</NavLink>
              <NavLink to="wishlist" className="hover:text-gray-700">Wish List</NavLink>
            </>
          ) : null}
        </div>

        {/* Right Side - Cart, Logout, Social Icons (Visible on Desktop) */}
        <div className="hidden md:flex items-center space-x-4">
          {!userData && (
            <div className="flex space-x-4">
              <NavLink to="login" className="hover:text-gray-700">Login</NavLink>
              <NavLink to="register" className="hover:text-gray-700">Register</NavLink>
            </div>
          )}
          {userData && (
            <>
              <NavLink to="cart" className="relative">
                <i className="fa-solid fa-cart-shopping text-[30px]">
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                    {cart ? cart.numOfCartItems : 0}
                  </span>
                </i>
              </NavLink>
              <button onClick={logOut} className="text-black hover:text-gray-700">Logout</button>
            </>
          )}
          <div className="flex space-x-4">
            <Link to="https://facebook.com" target="_blank" className="text-black hover:text-gray-700">
              <i className="fa-brands fa-facebook"></i>
            </Link>
            <Link to="https://twitter.com" target="_blank" className="text-black hover:text-gray-700">
              <i className="fa-brands fa-twitter"></i>
            </Link>
            <Link to="https://instagram.com" target="_blank" className="text-black hover:text-gray-700">
              <i className="fa-brands fa-instagram"></i>
            </Link>
            <Link to="https://linkedin.com" target="_blank" className="text-black hover:text-gray-700">
              <i className="fa-brands fa-linkedin"></i>
            </Link>
            <Link to="https://youtube.com" target="_blank" className="text-black hover:text-gray-700">
              <i className="fa-brands fa-youtube"></i>
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="inline-flex items-center p-2 w-8 h-10 justify-center text-black rounded-lg md:hidden hover:bg-gray-400 focus:outline-none"
          aria-controls="navbar-default"
          aria-expanded={isNavExpanded}
          onClick={toggleNavExpansion}
        >
          <span className="sr-only">Open main menu</span>
          <span className="text-2xl">☰</span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed top-[64px] right-0 w-64 h-[100vh] md:hidden bg-gray-300 border border-gray-300 shadow-lg z-40 transform transition-transform ${isNavExpanded ? 'translate-x-0' : 'translate-x-full'}`} id="navbar-default">
        <div className="p-4">
          <nav>
            {userData ? (
              <>
                <NavLink to="" className="block py-2" end onClick={toggleNavExpansion}>Home</NavLink>
                <NavLink to="products" className="block py-2" onClick={toggleNavExpansion}>Products</NavLink>
                <NavLink to="categories" className="block py-2" onClick={toggleNavExpansion}>Categories</NavLink>
                <NavLink to="brands" className="block py-2" onClick={toggleNavExpansion}>Brands</NavLink>
                <NavLink to="allorders" className="block py-2" onClick={toggleNavExpansion}>Orders</NavLink>
                <NavLink to="wishlist" className="block py-2" onClick={toggleNavExpansion}>Wish List</NavLink>
                <NavLink to="cart" className="block py-2" onClick={toggleNavExpansion}>
                  <i className="fa-solid fa-cart-shopping text-[30px]">
                    <span className="text-xs text-red-500">{cart ? cart.numOfCartItems : 0}</span>
                  </i>
                </NavLink>
                <button onClick={() => { logOut(); toggleNavExpansion(); }} className="block py-2 text-black">Logout</button>
                <div className="flex space-x-4 mt-4">
                  <Link to="https://facebook.com" target="_blank" className="text-black">
                    <i className="fa-brands fa-facebook"></i>
                  </Link>
                  <Link to="https://twitter.com" target="_blank" className="text-black">
                    <i className="fa-brands fa-twitter"></i>
                  </Link>
                  <Link to="https://instagram.com" target="_blank" className="text-black">
                    <i className="fa-brands fa-instagram"></i>
                  </Link>
                  <Link to="https://linkedin.com" target="_blank" className="text-black">
                    <i className="fa-brands fa-linkedin"></i>
                  </Link>
                  <Link to="https://youtube.com" target="_blank" className="text-black">
                    <i className="fa-brands fa-youtube"></i>
                  </Link>
                </div>
              </>
            ) : (
              <>
                <NavLink to="login" className="block py-2" end onClick={toggleNavExpansion}>Login</NavLink>
                <NavLink to="register" className="block py-2" onClick={toggleNavExpansion}>Register</NavLink>
              </>
            )}
          </nav>
        </div>
      </div>
    </nav>
  );
}
