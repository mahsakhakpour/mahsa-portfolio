import Link from "next/link";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-copyright">
          © {new Date().getFullYear()} Mahsa Khakpour. All rights reserved.
        </div>
        
        <div className="footer-links">
          <a 
            href="https://github.com/mahsakhakpour" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="GitHub"
            style={{ color: "white" }}
          >
            <FaGithub size={28} style={{ color: "white", fill: "white" }} />
          </a>
          <a 
            href="https://linkedin.com/in/mahsa-khakpour" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            style={{ color: "white" }}
          >
            <FaLinkedin size={28} style={{ color: "white", fill: "white" }} />
          </a>
          <a 
            href="https://mail.google.com/mail/?view=cm&fs=1&to=mahsa54@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Email"
            style={{ color: "white" }}
          >
            <FaEnvelope size={28} style={{ color: "white", fill: "white" }} />
          </a>
        </div>
      </div>
    </footer>
  );
}