import styles from './footer.module.css';
import Link from 'next/link';

export default function Footer(){
    return(
        <div className={styles.back}>
            <footer className={styles.footer}>
                <Link href="/">
                    <img src="/compx.png" alt="Company Logo" />
                </Link>
                <ul>
                    <li className={styles.title}>Contact Us</li>
                    <li>041 444 4204</li>
                    <li>CS@compx.com</li>
                </ul>
                <ul>
                    <li className={styles.title}>Social Media</li>
                    <li>Twitter</li>
                </ul>
            </footer>
        </div>
    )
}