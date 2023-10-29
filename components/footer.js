import styles from './footer.module.css';
import Link from 'next/link';

function Footer(){
    return(
        <div className={styles.back}>
            <footer className={styles.footer}>
                <Link href="/">
                    <img src="/compx.png" alt="Company Logo" />
                </Link>
                <ul>
                    <li>041 444 4204</li>
                    <li>CS@compx.com</li>
                </ul>
                <ul>
                    <li><a href="#">Social Media</a></li>
                </ul>
            </footer>
        </div>
    )
}

export default Footer;