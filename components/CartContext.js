import React, { createContext, useContext, useEffect, useState } from 'react';

export const CartContext = createContext();

export function CartProvider({children}){
    //Defines local storage as ls (fixes an error, didnt know what localstorage was for some reason)
    const ls = typeof window !== 'undefined' ? localStorage : null;

    const [cart, setCart] = useState([]);

    // Use effect to put items into local storage
    useEffect(() =>{
        if(cart?.length > 0) {
            ls?.setItem('cart', JSON.stringify(cart));
        }
    },[cart]);

    //useEffect for after mount, sets cart from data in localstorage
    useEffect(() => {
        if (ls && ls.getItem('cart')){
            setCart(JSON.parse(ls.getItem('cart')));
        }
    }, [])

    // Adds to cart, checks if its allready added, if allreadty, adds 1 to quantity, if not then adds it with quantity of 1
    function addToCart(product) {
        const existingProduct = cart.find((item) => item.product.name === product.name);

        if (existingProduct) {
            existingProduct.quantity += 1;
            setCart([...cart]);
        } else {
            setCart([...cart, { product, quantity: 1 }]);
        }
    };

    //Remove the item from cart
    function removeFromCart(product) {
        const updatedCart = cart.filter((item) => item.product.name !== product.name);
        setCart(updatedCart);
    }

    return (
        <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
}