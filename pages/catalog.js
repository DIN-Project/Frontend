import Link from 'next/link';
import Nav from '../components/nav.js'
import Footer from '../components/footer.js'
import styles from '../styles/catalog.module.css'
import Category from '../components/categories.js'
import { useContext, useState } from 'react';
import { CartContext } from '@/components/CartContext.js';

export default function Page({products}) {
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
                                    product.motherboardId || product.caseId || product.coolerId || product.graphicsCardId || product.headsetId || product.keyboardId || product.monitorId || product.mouseId 
                                    || product.powerSupplyId || product.processorId || product.ramId
                                    }`}
                                    className={styles.img}
                                />
                                <div className={styles.productInfo}>
                                    <Link
                                    href={`/product/${product.type}/${product.motherboardId || product.caseId || product.coolerId || product.graphicsCardId || product.headsetId || product.keyboardId 
                                    || product.monitorId || product.mouseId || product.powerSupplyId || product.processorId || product.ramId
                                    }`}
                                    className={styles.link}
                                    >
                                    <div className={styles.productName}>{product.name}</div>
                                    </Link>
                                </div>
                                <div className={styles.priceAndCart}>
                                    <div className={styles.productPrice}>{product.price}€</div>
                                    <button className={styles.custombutton} onClick={() => itemToCart(product)}>Add to cart</button>
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


export async function getServerSideProps() {
    const motherboardRes = await fetch('http://localhost:5283/Motherboards')
    const casesRes = await fetch('http://localhost:5283/Cases')
    const coolerRes = await fetch('http://localhost:5283/Coolers')
    const gpuRes = await fetch('http://localhost:5283/GraphicsCards')
    const headsetRes = await fetch('http://localhost:5283/Headsets')
    const keyboardRes = await fetch('http://localhost:5283/Keyboards')
    const monitorRes = await fetch('http://localhost:5283/Monitors')
    const mouseRes = await fetch('http://localhost:5283/Mouses')
    const powerSupplyRes = await fetch('http://localhost:5283/PowerSupplys')
    const processorRes = await fetch('http://localhost:5283/Processors')
    const ramRes = await fetch('http://localhost:5283/Rams')


    const motherboardData = await motherboardRes.json();
    const casesData = await casesRes.json();
    const coolerData = await coolerRes.json();
    const gpuData = await gpuRes.json();
    const headsetData = await headsetRes.json();
    const keyboardData = await keyboardRes.json();
    const monitorData = await monitorRes.json();
    const mouseData = await mouseRes.json();
    const powerSupplyData = await powerSupplyRes.json();
    const processorData = await processorRes.json();
    const ramData = await ramRes.json();

    const products = [
        ...motherboardData.map(product => ({ ...product, type: "Motherboard" })),
        ...casesData.map(product => ({ ...product, type: "Case" })),
        ...coolerData.map(product => ({ ...product, type: "Cooler" })),
        ...gpuData.map(product => ({ ...product, type: "GraphicsCard" })),
        ...headsetData.map(product => ({ ...product, type: "Headset" })),
        ...keyboardData.map(product => ({ ...product, type: "Keyboard" })),
        ...monitorData.map(product => ({ ...product, type: "Monitor"})),
        ...mouseData.map(product => ({ ...product, type: "Mouse"})),
        ...powerSupplyData.map(product => ({ ...product, type: "PowerSupply"})),
        ...processorData.map(product => ({ ...product, type: "Processor"})),
        ...ramData.map(product => ({ ...product, type: "Ram"}))
    ];

    return {
        props: {products}
    }
}
