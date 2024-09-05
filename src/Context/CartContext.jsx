import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from 'react-hot-toast';


export let CartContext = createContext()


export default function CartContextProvider(props) {
    const [cart, setCart] = useState(null);
    const [isLoading, setIsLoading] = useState(true)
    // const [isEmpty, setIsEmpty] = useState(false);

    let headerToken = {
        token: localStorage.getItem('userToken')
    }

    async function addProductToCart(idOfProduct) {
        try {
            let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/cart',
                {
                    productId: idOfProduct
                },
                {
                    headers: headerToken
                })

            // console.log(data);
            setCart(data);
            toast.success('Successfully added Product',
                {
                    duration: 4000,
                    // icon : '👏'
                }
            )

        } catch (err) {
            console.log(err);
            setIsLoading(false)
        }
    }


    async function getCart() {
        try {
            setIsLoading(true)
            let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/cart',
                {
                    headers: headerToken
                })

            // console.log(data);
            setCart(data);
            setIsLoading(false)

        } catch (err) {
            console.log(err);
            setIsLoading(false)
        }
    }

    async function ubdateProductCount(idOfProduct, count) {
        try {
            setIsLoading(true)
            let { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${idOfProduct}`,
                {
                    count
                },
                {
                    headers: headerToken
                })

            // console.log(data);
            setCart(data);
            setIsLoading(false)
            toast.success('Successfully',
            )

        } catch (err) {
            console.log(err);
            setIsLoading(false)
        }
    }

    async function removeProductFromCart(idOfProduct) {
        try {
            setIsLoading(true)
            let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${idOfProduct}`,
                {
                    headers: headerToken
                })

            console.log(data);
            setCart(data);
            setIsLoading(false)
            toast.success('Successfully',
            )

        } catch (err) {
            console.log(err);
            setIsLoading(false)
        }
    }
    async function clearCart() {
        try {
            setIsLoading(true)
            let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,
                {
                    headers: headerToken
                })
            setCart(null);
            setIsLoading(false)
            toast.success('Successfully',)

        } catch (err) {
            console.log(err);
            setIsLoading(false)
        }
    }


    useEffect(() => {
        getCart()
    }, [])

    return <CartContext.Provider value={{ headerToken, clearCart, removeProductFromCart, ubdateProductCount, addProductToCart, getCart, cart, setCart, isLoading }}>

        {props.children}

    </CartContext.Provider>
}