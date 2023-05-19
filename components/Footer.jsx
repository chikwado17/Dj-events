import Link from "next/link"
import styles from '../styles/Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
        <p>copyright &copy; DJ Events Project 2023 | Nworie Chikwado Emmanuel</p>

        <Link href={'/about'}>
            About this project
        </Link>
    </footer>
  )
}
