import styles from '../styles/Home.module.css'
import Nav from '../components/nav.js'
import Footer from '../components/footer.js'
import Carousel from '../components/carousel.js'
import Link from 'next/link';


export default function Home({products}) {

  return (
    <main className={styles.main}>
      <Nav />
      <Carousel />
      <h3 className={styles.recommendation}>Our recommendations</h3>
      <div className={styles.container}>
        {products.map((product) => (
          <div className={styles.box}>
            <Link href={"/product/" + product.motherboardId } className={styles.link}>
            <img src="https://picsum.photos/250/250" />
              <h1 key={product.motherboardId}>{product.name}</h1>
              <li>{product.description}</li>
              <li>{product.price}€</li>
              <li>Add to cart</li>
            </Link>
          </div>
        ))}
      </div>
      <Footer />
    </main>
  )
}


export async function getServerSideProps() {
  const res = await fetch('http://localhost:5283/Motherboards');
  const data = await res.json();

  return {
      props: { products: data }
  };
}