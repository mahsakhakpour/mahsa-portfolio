// Navbar.tsx
import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="main-header">
      <div className="logo-area">
        <img src="/itex.png" className="logo" alt="Logo" />
        <span className="site-name">Mahsa Khakpour</span>
      </div>

      <nav className="nav">        
        <Link href="/#about">About</Link>
        <Link href="/#contact">Contact</Link>
      </nav>
    </header>
  );
}