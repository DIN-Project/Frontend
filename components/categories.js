import Link from 'next/link';
import styles from './categories.module.css'

export default function categoriesList(){
    return(
        <>
            <ul className={styles.list}>
                <li>
                    <Link href="/catalog"> All products </Link>
                </li>
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
                    <Link href="/product/Headset"> Headsets </Link>
                </li>
                <li>
                    <Link href="/product/Keyboard"> Keyboards </Link>
                </li>
                <li>
                    <Link href="/product/Monitor"> Monitors </Link>
                </li>
                <li>
                    <Link href="/product/Mouse"> Mouses </Link>
                </li>
                <li>
                    <Link href="/product/PowerSupply"> Power Supplies </Link>
                </li>
                <li>
                    <Link href="/product/Processor"> Processors </Link>
                </li>
            </ul>
        </>
    );
}