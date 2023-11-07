import Nav from "@/components/nav";
import { useContext } from "react";
import { CartContext } from '@/components/CartContext.js';
import Footer from "@/components/footer";

export default function CartPage(){
    //Get from CartContext cart and removefrom cart so they can be used
    const {cart, removeFromCart} = useContext(CartContext);

    //Calculates the correct total
    const totalPrice = cart.reduce((total, cartItem) => total + (cartItem.product.price * cartItem.quantity), 0);

    const handleRemoveClick = (product) => {
        removeFromCart(product);
    };

    return(
        <>
            <Nav />
            {!cart?.length && (
                <div>Your cart is empty</div>
            )}
            {cart?.length > 0 &&(
                <>
                    <h2>Cart</h2>
                    {cart.map((cartItem) => (
                        <div key={cartItem.product.id}>
                            <li>{cartItem.product.name}</li>
                            <li>{cartItem.product.price}€</li>
                            <div>Quantity: {cartItem.quantity}</div>
                            <button onClick={() => handleRemoveClick(cartItem.product)}>Remove from cart</button>
                        </div>
                    ))}
                    <div>Total: {totalPrice}€</div>
                </>
            )}
            <Footer />
        </>
    )
}