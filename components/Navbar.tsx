import Link from "next/link";
import styles from "./Header.module.css";

export default function Navbar() {
  return (
    <header className={styles.mainHeader}>
      <div className={styles.logoArea}>
        <img src="/logo.png" alt="Logo" className={styles.logo} />
        <span className={styles.siteName}>Mahsa Khakpour</span>
      </div>
      <nav className={styles.navBar}>
        <Link href="/#about" className={styles.navItem}>About</Link>
        <Link href="/#contact" className={styles.navItem}>Contact</Link>
      </nav>
    </header>
  );
}