'use client';

import { useEffect, useState } from 'react';
import './style.css';

export default function ProductViewerProject() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkDarkMode = () => {
      const isDarkMode = document.body.classList.contains('dark');
      setIsDark(isDarkMode);
    };

    checkDarkMode();

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          checkDarkMode();
        }
      });
    });

    observer.observe(document.body, { attributes: true });

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`project-page ${isDark ? 'dark' : ''}`}>
      {/* Hero Section */}
      <section className="project-hero">
        <div className="project-container">
          <h1>360° Product Experience</h1>
          <p className="hero-description">
            An immersive 3D product viewer with interactive rotation, zoom, and a premium e-commerce interface. Built with vanilla JavaScript, CSS, and HTML.
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <a 
              href="https://github.com/mahsakhakpour/product-viewer" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="project-btn project-btn-primary"
            >
              View Source Code
            </a>
            <a 
              href="/product-viewer/index.html" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="project-btn project-btn-secondary"
            >
              Live Demo
            </a>
          </div>
        </div>
      </section>

      <div className="project-container">
        {/* Project Overview */}
        <section>
          <h2 className="project-section-title">About <span>This Project</span></h2>
          <div className="project-overview">
            <p>
              The 360° Product Experience is an interactive product viewer that allows users to rotate and zoom in on a product from any angle. It features a smooth drag-to-rotate interaction, momentum-based scrolling, and a premium e-commerce interface.
            </p>
            <br />
            <p>
              <strong>Key Features:</strong> Drag to rotate the product 360°, scroll or use buttons to zoom in/out, smooth momentum scrolling for natural rotation, and a fully responsive design. The interface includes a product page with pricing, rating, description, and add-to-cart functionality.
            </p>
            <br />
            <p>
              <strong>Technical Highlights:</strong> Built with vanilla JavaScript for the 3D rotation engine, CSS custom properties for theming, and a fully responsive layout. The project demonstrates advanced DOM manipulation, gesture handling, and smooth animations without any external libraries.
            </p>
          </div>
        </section>

        {/* Interactive Preview - Embedded */}
        <section>
          <h2 className="project-section-title">Live <span>Demo</span></h2>
          <div className="project-iframe-wrapper">
            <div className="project-iframe-container">
              <iframe 
                src="/product-viewer/index.html"
                className="project-iframe"
                title="360° Product Experience"
                width="100%"
                height="650"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section>
          <h2 className="project-section-title">How It <span>Works</span></h2>
          <div className="project-features">
            <div className="project-feature-card">
              <h3>1</h3>
              <h4>Drag to Rotate</h4>
              <p>Click and drag left or right to rotate the product 360°. The rotation is smooth with momentum for a natural feel.</p>
            </div>
            <div className="project-feature-card">
              <h3>2</h3>
              <h4>Zoom Controls</h4>
              <p>Use the zoom buttons or scroll to zoom in and out. The zoom level is displayed in real-time with 0.1x increments.</p>
            </div>
            <div className="project-feature-card">
              <h3>3</h3>
              <h4>Premium Interface</h4>
              <p>A complete product page with pricing, rating, description, features, and add-to-cart functionality with interactive feedback.</p>
            </div>
            <div className="project-feature-card">
              <h3>4</h3>
              <h4>Reveal Animation</h4>
              <p>The product automatically reveals itself with a cinematic drop-in animation when the page loads.</p>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section>
          <h2 className="project-section-title">Built <span>With</span></h2>
          <div className="project-tech-stack">
            {['Vanilla JavaScript', 'CSS3', 'HTML5', 'CSS Custom Properties', 'DOM Manipulation', 'Gesture Handling', 'Momentum Physics', 'Responsive Design'].map((tech, index) => (
              <span key={index} className="project-tech-item">{tech}</span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}