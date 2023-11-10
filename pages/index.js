import styles from '../styles/Home.module.css'
import Nav from '../components/nav.js'
import Footer from '../components/footer.js'
import Carousel from '../components/carousel.js'
import Link from 'next/link';
import { useContext } from 'react';
import { CartContext } from '@/components/CartContext.js';


export default function Home({products}) {
  const {addToCart} = useContext(CartContext)

  function itemToCart(product){
      addToCart(product)
  }

  return (
    <main className={styles.main}>
      <Nav />
      <Carousel />
      <h3 className={styles.recommendation}>Popular Categories</h3>
      <div className={styles.categories}>
        <ul>
          <li>
            <Link href="/product/Case"> Cases </Link>
          </li>
          <li>
            <Link href="/product/Motherboard"> Motherboards </Link>
          </li>
          <li>
            <Link href="/product/Cooler"> Coolers </Link>
          </li>
          <li>
            <Link href="/product/GraphicsCard"> Graphics Cards </Link>
          </li>
          <li>
            <Link href="/product/Monitor"> Monitors </Link>
          </li>
        </ul>
      </div>
      <h3 className={styles.recommendation}>Our recommendations</h3>
      <div className={styles.container}>
        {products.map((product) => (
          <div className={styles.box}>
            <Link href={`/product/${product.type}/${product.motherboardId || product.caseId || product.graphicsCardId || product.processorId}`} className={styles.link}>
            <img src={`http://localhost:5283/${product.type}/Images/${product.motherboardId || product.caseId || product.graphicsCardId || product.processorId }`} />
              <h1 key={product.motherboardId}>{product.name}</h1>
              <li>{product.description}</li>
              <li>{product.price}€</li>
            </Link>
            <button className={styles.custombutton} onClick={() => itemToCart(product)}>Add to cart</button>
          </div>
        ))}
      </div>
      <Footer />
    </main>
  )
}


export async function getServerSideProps() {
  const endpoints = [
    { url: 'http://localhost:5283/Motherboard/1', type: 'Motherboard' },
    { url: 'http://localhost:5283/Case/1', type: 'Case' },
    { url: 'http://localhost:5283/GraphicsCard/1', type: 'GraphicsCard' },
    { url: 'http://localhost:5283/Processor/1', type: 'Processor' },
  ];

  // Use Promise.all to fetch data from all endpoints and put the response into products
  const responses = await Promise.all(endpoints.map(endpoint => fetch(endpoint.url).then(res => res.json())));
  const products = responses.map((data, index) => ({ ...data, type: endpoints[index].type }));

  return {
    props: { products },
  };
}