import React, { useContext, useEffect, useState } from 'react';
import style from './Products.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LoaderSpinner from '../LoaderSpinner/LoaderSpinner';
import { CartContext } from '../../Context/CartContext';
import { WishlistContext } from '../../Context/WishlistContext';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addProductToCart } = useContext(CartContext);
  const { getWishlist, wishlistProducts, addProductToWishlist } = useContext(WishlistContext);

  async function getProducts() {
    try {
      let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
      setIsLoading(false);
      setProducts(data.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getProducts();
    getWishlist();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className='w-full flex justify-center py-32 items-center'>
          <LoaderSpinner />
        </div>
      ) : (
        <div className="flex flex-wrap py-10">
          {products.map((product, index) => {
            
            const isWishlisted = wishlistProducts.includes(product.id);

            return (
              <div key={index} className='w-[80%] mx-auto sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 py-5 px-3 product cursor-pointer'>
                <div className='rounded-md p-1 shadow-lg hover:border-2 border-gray-300 hover:scale-[1.04]'>
                  <Link to={`/productDetais/${product.id}/${product.category.name}`}>
                    <img className='w-full' src={product.imageCover} alt="" />
                    <div className='pt-2'>
                      <h2 className='text-sm font-semibold text-[--main-color]'>{product.category.name}</h2>
                      <h2 className='text-sm font-bold'>{product.title.split(' ').slice(0, 2).join(' ')}</h2>
                      <div className='flex justify-between'>
                        <h4>{product.price} EGP</h4>
                        <h4><i className="fa-solid fa-star text-yellow-600"></i> {product.ratingsAverage}</h4>
                      </div>
                    </div>
                  </Link>
                  <div onClick={() => addProductToWishlist(product.id)} className='text-2xl text-right'>
                    <i style={{ color: isWishlisted ? 'red' : 'black' }} className="fa-solid fa-heart"></i>
                  </div>
                  <button onClick={() => addProductToCart(product.id)} className='btn rounded-md'>Add To Cart</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
