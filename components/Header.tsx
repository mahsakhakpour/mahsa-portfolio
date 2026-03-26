"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FaMoon, FaSun } from "react-icons/fa";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.body.classList.add("dark");
    }
  }, []);

  // Toggle theme function
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

  // Handle dropdown with delay
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 200);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <header className="main-header">
      <div className="logo-area">
        <img src="/logo.png" alt="Mahsa Logo" className="logo" />
        <span className="site-name">Mahsa Khakpour</span>
      </div>

      <nav className="nav-bar">
        <Link href="/" className="nav-item">About</Link>

        <div
          className="dropdown"
          ref={dropdownRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <span className="nav-item portfolio-link">Portfolio ▾</span>

          {open && (
            <div 
              className="dropdown-menu"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Link href="/my-designs">My Designs</Link>
              <Link href="/websites">Websites</Link>
              <Link href="/projects">Projects</Link>
            </div>
          )}
        </div>

        <Link href="/contact" className="nav-item">Contact</Link>
        
        <button onClick={toggleTheme} className="theme-toggle">
          {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
        </button>
      </nav>
    </header>
  );
}
