import Link from 'next/link';
import Nav from '../components/nav.js'
import Footer from '../components/footer.js'
import styles from '../styles/catalog.module.css'
import { useContext } from 'react';
import { CartContext } from '@/components/CartContext.js';

export default function Page({products}) {
    const {addToCart} = useContext(CartContext)
    function itemToCart(product){
        addToCart(product)
    }

    return (
        <main>
            <Nav />
            <div className={styles.container}>
                {products.map((product) => (
                    <div className={styles.box}>
                        <img src="https://picsum.photos/250/250" />
                        <Link href={`/product/${product.type}/${product.motherboardId || product.caseId}`} className={styles.link}> 
                            <li key={product.motherboardId || product.caseId}>{product.name}</li>
                            <li>{product.description}</li>
                            <li>{product.price}€</li>
                        </Link>
                        <button onClick={() => itemToCart(product)}>Add to cart</button>
                    </div>
                ))}
            </div>
            <Footer />
        </main>
    );
}

/*
        Check if possible to get every product to have just id instead of caseid or 
*/


export async function getServerSideProps() {
    const motherboardRes = await fetch('http://localhost:5283/Motherboards')
    const casesRes = await fetch('http://localhost:5283/Cases')

    const motherboardData = await motherboardRes.json();
    const casesData = await casesRes.json();

    const products = [
        ...motherboardData.map(product => ({ ...product, type: "Motherboard" })),
        ...casesData.map(product => ({ ...product, type: "Case" })),
    ];

    return {
        props: {products}
    }
}