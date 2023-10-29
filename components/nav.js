import styles from './nav.module.css'
import Link from 'next/link';

function Nav(){
    return(
        <div className={styles.back}>
            <nav className={styles.nav}>
                <Link href="/">
                    <img src="/compx.png" alt="Company Logo" />
                </Link>
                <div></div>
                <ul>
                    <li>
                        <Link href="/"> Home </Link>
                    </li>
                    <li>
                        <a href="#">Cart</a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Nav;