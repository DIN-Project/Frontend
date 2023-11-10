import Nav from '../../components/nav.js'
import Footer from '../../components/footer.js'
import Category from '../../components/categories.js'
import styles from '../../styles/catalog.module.css'
import Link from 'next/link';
import { useContext, useState } from 'react';
import { CartContext } from '@/components/CartContext.js';


export default function CategoryPage({products}){
    const [searchQuery, setSearchQuery] = useState('');
    const {addToCart} = useContext(CartContext)

    function itemToCart(product){
        addToCart(product)
    }

    //Filter the products depending on user input
    const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <main>
            <Nav />
            <div className={styles.container}>
                <div className={styles.leftSection}>
                    <input
                        type="text"
                        id="searchBar"
                        placeholder="Search products"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Category />
                </div>
                <div className={styles.rightSection}>
                    <div className={styles.productList}>
                    {filteredProducts.map((product) => (
                            <div className={styles.product}>
                                <img
                                    src={`http://localhost:5283/${product.type}/Images/${
                                    product.motherboardId || product.caseId || product.coolerId || product.graphicsCardId || product.headsetId || product.keyboardId || product.monitorId
                                    || product.mouseId || product.powerSupplyId || product.processorId || product.ramId
                                    }`}
                                    className={styles.img}
                                />
                                <div className={styles.productInfo}>
                                    <Link
                                        href={`/product/${product.type}/${product.motherboardId || product.caseId || product.coolerId || product.graphicsCardId || product.headsetId
                                        || product.keyboardId || product.monitorId || product.mouseId || product.powerSupplyId || product.processorId || product.ramId}`}
                                        className={styles.link}
                                    >
                                        <div className={styles.productName}>{product.name}</div>
                                    </Link>
                                </div>
                                <div>
                                    <div className={styles.productPrice}>{product.price}€</div>
                                    <button onClick={() => itemToCart(product)}>Add to cart</button>
                                </div>
                            </div>
                        ))}
                     </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}

export async function getServerSideProps(context) {
    //Gets items type and fetches the matching item type
    const { type } = context.query;

    const res = await fetch(`http://localhost:5283/${type}s`)
    const productData = await res.json();

    const product = productData.map(product => ({ ...product, type }));


    return {
        props: {
            products: product,
        },
    };
}