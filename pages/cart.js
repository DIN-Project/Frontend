import Nav from "@/components/nav";
import { useContext, useState } from "react";
import { CartContext } from '@/components/CartContext.js';
import Footer from "@/components/footer";
import styles from "../styles/cart.module.css";

export default function CartPage(){
    //Get from CartContext cart and removefrom cart so they can be used
    const {cart, removeFromCart} = useContext(CartContext);
    const [name, setName] = useState("");
    const [creditCard, setCreditCard] = useState("");
    const [address, setAddress] = useState("");

    //Calculates the correct total
    const totalPrice = cart.reduce((total, cartItem) => total + (cartItem.product.price * cartItem.quantity), 0);

    const handleRemoveClick = (product) => {
        removeFromCart(product);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleCreditCardChange = (e) => {
        setCreditCard(e.target.value);
    };

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };


    const handleCheckout = () => {
            // Clear local storage, give alert and reload page
            localStorage.clear();
            alert("Your order has been sent!");
            window.location.reload();
    };

    return(
        <>
            <Nav />
            <div className={styles.container}>
                {!cart?.length && (
                    <div className={styles.center}>Your cart is empty</div>
                )}
                {cart?.length > 0 && (
                <>
                    <div className={styles.leftSection}>
                        <div className={styles.productList}>
                            {cart.map((cartItem) => (
                                <div key={cartItem.product.id} className={styles.cartItem}>
                                    <img
                                        src={`http://localhost:5283/${cartItem.product.type}/Images/${
                                        cartItem.product.motherboardId || cartItem.product.caseId || cartItem.product.coolerId || cartItem.product.graphicsCardId ||  cartItem.product.headsetId
                                        ||  cartItem.product.keyboardId ||  cartItem.product.monitorId ||  cartItem.product.mouseId ||  cartItem.product.powerSupplyId || cartItem.product.processorId || cartItem.product.ramId
                                        }`}
                                        className={styles.img}
                                    />
                                    <div className={styles.details}>
                                        <div className={styles.name}>{cartItem.product.name}</div>
                                        <div className={styles.priceQuantity}>
                                            <div>{cartItem.product.price}€</div>
                                            <div>Quantity: {cartItem.quantity}</div>
                                            <button className={styles.checkoutButton} onClick={() => handleRemoveClick(cartItem.product)}>Remove from cart</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={styles.rightSection}>
                        <div>Name</div>
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={handleNameChange}
                            required
                        />
                        <div>Credit card</div>
                        <input
                            type="text"
                            placeholder="Credit Card"
                            value={creditCard}
                            onChange={handleCreditCardChange}
                            required
                        />
                        <div>Address</div>
                        <input
                            type="text"
                            placeholder="Address"
                            value={address}
                            onChange={handleAddressChange}
                            required
                        />
                        <div>Total: {totalPrice}€</div>
                        <button className={styles.checkoutButton} onClick={handleCheckout}>Checkout</button>
                    </div>
                </>
                )}
            </div>
            <Footer />
        </>
    )
}