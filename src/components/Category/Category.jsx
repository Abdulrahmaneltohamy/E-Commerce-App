import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoaderSpinner from '../LoaderSpinner/LoaderSpinner';

export default function Category() {
  const [allCategories, setAllCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [supCategories, setSupCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  async function getAllCategories() {
    try {
      let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
      setAllCategories(data.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  async function getSupCategories(id, name) {
    setIsLoading(true);
    if (!id) return;
    setIsLoading(false);

    try {
      setIsLoading(true);
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`);
      setSupCategories(data.data);
      setSelectedCategory(name);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getAllCategories();
  }, []);

  const handleCategoryClick = (id, name) => {
    getSupCategories(id, name);
  };

  return (
    <>
      {isLoading ? (
        <div className='w-full flex justify-center py-32 items-center'>
          <LoaderSpinner />
        </div>
      ) : (
        <>
          <div className='container py-10'>
            <div className="flex flex-wrap">
              {allCategories?.map((category) => (
                <div
                  key={category._id}
                  onClick={() => handleCategoryClick(category._id, category.name)}
                  className='w-[80%] mx-auto md:w-1/2 lg:w-1/3 xl:w-1/4 p-4 hover:scale-[1.02] drop-shadow-md cursor-pointer'
                >
                  <div className='bg-white shadow-lg rounded-lg border-2 overflow-hidden'>
                    <img
                      src={category.image}
                      className='w-full h-[300px] object-cover'
                      alt={category.name}
                    />
                    <div className='p-4'>
                      <h4 className='font-semibold text-center'>{category.name}</h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {selectedCategory && (
            <div>
              <h1 className='text-center text-[--main-color] font-bold py-5'>{`${selectedCategory} Sub Categories`}</h1> 
              <div className="flex flex-wrap">
                {supCategories?.map((sup) => (
                  <div
                    key={sup._id}
                    className='w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4 hover:scale-[1.02] drop-shadow-md'
                  >
                    <div className='bg-white shadow-lg rounded-lg border-2 overflow-hidden'>
                      <div className='p-4'>
                        <h4 className='font-semibold text-center'>{sup.name}</h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
