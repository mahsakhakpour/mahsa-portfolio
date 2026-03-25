import Link from 'next/link';
export default function Navbar() {
  return (
    <header className="main-header">

      <div className="logo-area">
        <img src="/itex.png" className="logo" />
        <span className="site-name">Mahsa Khakpour</span>
      </div>

      <nav className="nav">

        <Link href="/">Home</Link>

        <Link href="/#about">About</Link>

        <div className="dropdown">

          <span>Portfolio</span>

          <div className="dropdown-menu">
            <Link href="/my-designs">My Designs</Link>
            <Link href="/websites">Websites</Link>
            <Link href="/projects">Projects</Link>
          </div>

        </div>

        <Link href="/#contact">Contact</Link>

      </nav>

    </header>
  )
}