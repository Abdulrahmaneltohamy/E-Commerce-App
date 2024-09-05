import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from 'react-hot-toast';


export let WishlistContext = createContext()


export default function WishlistContextProvider(props) {
    const [wishlist, setWishlist] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [wishlistProducts, setWishlistProducts] = useState([]);

    
    let headerToken = {
        token: localStorage.getItem('userToken')
    }

    async function addProductToWishlist(idOfProduct) {
        try {
            setIsLoading(true)
            let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/wishlist',
                {
                    productId: idOfProduct
                },
                {
                    headers: headerToken
                })

            // console.log(data);
            setWishlist(data);
            setWishlistProducts(prev => [...prev, idOfProduct]);
            setIsLoading(false)
            toast.success('It has been successfully added ❤️',)

        } catch (err) {
            console.log(err);
            setIsLoading(false)
        }
    }


    async function getWishlist() {
        try {
            setIsLoading(true)
            let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist',
                {
                    headers: headerToken
                })

            // console.log(data);
            setWishlist(data);
            setWishlistProducts(data.data.map(item => item._id));
            setIsLoading(false)

        } catch (err) {
            console.log(err);
            setIsLoading(false)
        }
    }


    async function removeProductFromWishlist(idOfProduct) {
        try {
            setIsLoading(true)
            let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${idOfProduct}`,
                {
                    headers: headerToken
                })

            // console.log(data);
            await getWishlist();
            // setWishlist(data);
            setIsLoading(false)
            toast.success('Successfully',
            )

        } catch (err) {
            console.log(err);
            setIsLoading(false)
        }
    }

    return <WishlistContext.Provider value={{removeProductFromWishlist , wishlistProducts , isLoading , wishlist , getWishlist , addProductToWishlist}}>

        {props.children}

    </WishlistContext.Provider>
}