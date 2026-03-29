"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaMoon, FaSun } from "react-icons/fa";
import styles from "./Header.module.css";

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.body.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    } else {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    }
  };

  return (
    <header className={styles.mainHeader}>
      <div className={styles.logoArea}>
        <img src="/logo.png" alt="Mahsa logo" className={styles.logo} />
        <span className={styles.siteName}>Mahsa Khakpour</span>
      </div>

      <nav className={styles.navBar}>
        <Link href="/" className={styles.navItem}>About</Link>

        <div
          className={styles.dropdown}
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <span className={styles.navItem}>Portfolio ▾</span>

          {dropdownOpen && (
            <div className={styles.dropdownMenu}>
              <Link href="/projects" className={styles.dropdownLink}>Projects</Link>
              <Link href="/my-designs" className={styles.dropdownLink}>My Designs</Link>
              <Link href="/websites" className={styles.dropdownLink}>Websites</Link>
            </div>
          )}
        </div>

        <Link href="/contact" className={styles.navItem}>Contact</Link>

        <button onClick={toggleTheme} className={styles.themeToggle}>
          {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
        </button>
      </nav>
    </header>
  );
}