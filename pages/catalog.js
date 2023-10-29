import Link from 'next/link';
import Nav from '../components/nav.js'
import Footer from '../components/footer.js'
import styles from '../styles/catalog.module.css'

export default function Page({products}) {
    return (
        <main>
            <Nav />
            <div className={styles.container}>
                {products.map((product) => (
                    <div className={styles.box}>
                        <Link href={"/product/" + product.motherboardId }>
                            <li key={product.motherboardId}>{product.name}</li>
                            <li>{product.description}</li>
                            <li>{product.price}€</li>
                        </Link>
                    </div>
                ))}
            </div>
            <Footer />
        </main>
    );
}

export async function getServerSideProps() {
    const res = await fetch('http://localhost:5283/Motherboards')
    const data = await res.json();

    return {
        props: {products: data}
    }
}