import { useContext } from 'react';
import styles from './nav.module.css'
import Link from 'next/link';
import { CartContext } from './CartContext';

function Nav(){
    const {cart} = useContext(CartContext)
    const totalQuantity = cart.reduce((total, cartItem) => total + cartItem.quantity, 0);

    return(
        <div className={styles.back}>
            <nav className={styles.nav}>
                <Link href="/">
                    <img src="/compx.png" alt="Company Logo" />
                </Link>
                <div></div>
                <ul>
                    <li>
                        <Link href="/"> Home </Link>
                    </li>
                    <li>
                        <a href="/cart">Cart ({totalQuantity})</a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Nav;