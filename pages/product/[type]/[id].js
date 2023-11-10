import Nav from '../../../components/nav.js'
import Footer from '../../../components/footer.js'
import styles from '../../../styles/productpage.module.css'
import { useContext } from 'react';
import { CartContext } from '@/components/CartContext.js';


export default function ProductPage({product}){
    const {addToCart} = useContext(CartContext)

    function itemToCart(product){
        addToCart(product)
    }

    return (
        <main>
            <Nav />
            <div className={styles.container}>
                <div className={styles.productImageContainer}>
                    <img src={`http://localhost:5283/${product.type}/Images/${
                                product.motherboardId || product.caseId || product.coolerId || product.graphicsCardId || product.headsetId || product.keyboardId || product.monitorId
                                || product.mouseId || product.powerSupplyId || product.processorId || product.ramId
                            }`}
                            className={styles.productImage}
                    />
                </div>
                <ul>
                    <li className={styles.title}>{product.name}</li>
                    <li className={styles.customsize}>{product.price}€</li>
                    <li className={styles.alv}>Sisältäen alv.24%</li>
                    <button className={styles.custombutton} onClick={() => itemToCart(product)}>Add to cart</button>
                </ul>
            </div>
            <div className={styles.itemdetails}>
                <div>{product.description}</div>
            </div>
            <Footer />
        </main>
    );
}

export async function getServerSideProps(context) {
    //Gets items id and type
    const { type, id } = context.query;

    const res = await fetch(`http://localhost:5283/${type}/${id}`)
    const product = await res.json();

    //Gets type and adds it to the product
    product.type = type;

    return {
        props: {
            product,
        },
    };
}