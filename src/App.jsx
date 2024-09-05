import { useContext, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Cart from './components/Cart/Cart'
import Category from './components/Category/Category'
import Brands from './components/Brands/Brands'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Products from './components/Products/Products'
import NotFound from './components/NotFound/NotFound'
import UserContextProvider from './Context/UserContext'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import ProductDetails from './components/ProductDetails/ProductDetails'
import CartContextProvider from './Context/CartContext'
import { Toaster } from 'react-hot-toast';
import CheckOut from './components/CheckOut/CheckOut'
import AllOrders from './components/AllOrders/AllOrders'
import FavoritList from './components/FavoritList/FavoritList'
import WishlistContextProvider from './Context/WishlistContext'
import ForgotPassowrd from './components/ForgotPassowrd/ForgotPassowrd'
import SendCode from './components/SendCode/SendCode'
import ResetPassword from './components/ResetPassword/ResetPassword'
import CashPayment from './components/CashPayment/CashPayment'


function App() {
  let routers = createBrowserRouter([
    {
      path: '', element: <Layout />, children: [
        { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
        { path: 'cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
        { path: 'categories', element: <ProtectedRoute><Category /></ProtectedRoute> },
        { path: 'brands', element: <ProtectedRoute><Brands /></ProtectedRoute> },
        { path: 'checkout', element: <ProtectedRoute><CheckOut /></ProtectedRoute> },
        { path: 'cashPayment', element: <ProtectedRoute><CashPayment /></ProtectedRoute> },
        { path: 'checkout', element: <ProtectedRoute><CheckOut /></ProtectedRoute> },
        { path: 'allorders', element: <ProtectedRoute><AllOrders /></ProtectedRoute> },
        { path: 'wishlist', element: <ProtectedRoute><FavoritList /></ProtectedRoute> },
        { path: 'products', element: <ProtectedRoute><Products /></ProtectedRoute> },
        { path: 'productDetais/:id/:category', element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
        { path: 'register', element: <Register /> },
        { path: 'login', element: <Login /> },
        { path: 'forgotPassword', element: <ForgotPassowrd /> },
        { path: 'sendCode', element: <SendCode /> },
        { path: 'reserPassword', element: <ResetPassword /> },
        { path: '*', element: <NotFound /> },
      ]
    }
  ])


  return (
    <UserContextProvider>
    <WishlistContextProvider>
      <CartContextProvider>
          <RouterProvider router={routers}></RouterProvider>
          <Toaster />
      </CartContextProvider>
    </WishlistContextProvider>
    </UserContextProvider>
  )
}

export default App
