"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaMoon, FaSun, FaBars, FaTimes } from "react-icons/fa";
import styles from "./Header.module.css";

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.body.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add("menu-open");
      document.body.style.overflow = "hidden";
    } else {
      document.body.classList.remove("menu-open");
      document.body.style.overflow = "";
    }
    return () => {
      document.body.classList.remove("menu-open");
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

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

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  };

  return (
    <header className={styles.mainHeader}>
      <div className={styles.logoArea}>
        <img src="/logo.png" alt="Mahsa logo" className={styles.logo} />
        <span className={styles.siteName}>Mahsa Khakpour</span>
      </div>

      <button
        className={styles.mobileToggle}
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      <nav className={`${styles.navBar} ${mobileMenuOpen ? styles.navBarMobileActive : ""}`}>
        <Link href="/" className={styles.navItem} onClick={closeMobileMenu}>
          About
        </Link>

        <div
          className={styles.dropdown}
          onMouseEnter={() => window.innerWidth > 768 && setDropdownOpen(true)}
          onMouseLeave={() => window.innerWidth > 768 && setDropdownOpen(false)}
          onClick={() => window.innerWidth <= 768 && setDropdownOpen(!dropdownOpen)}
        >
          <span className={styles.navItem}>Portfolio ▾</span>

          {dropdownOpen && (
            <div className={styles.dropdownMenu}>
              <Link href="/projects" className={styles.dropdownLink} onClick={closeMobileMenu}>
                Projects
              </Link>
              <Link href="/my-designs" className={styles.dropdownLink} onClick={closeMobileMenu}>
                Designs
              </Link>
              <Link href="/websites" className={styles.dropdownLink} onClick={closeMobileMenu}>
                Websites
              </Link>
            </div>
          )}
        </div>

        <Link href="/contact" className={styles.navItem} onClick={closeMobileMenu}>
          Contact
        </Link>

        <button onClick={toggleTheme} className={styles.themeToggle}>
          {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
        </button>
      </nav>
    </header>
  );
}