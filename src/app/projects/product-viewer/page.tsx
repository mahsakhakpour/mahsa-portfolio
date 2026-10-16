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
          <h1>Product Viewer</h1>
          <p className="hero-description">
            An interactive 3D product viewer with drag-to-rotate, zoom, and a full product page. Designed and built with vanilla JavaScript, CSS, and HTML, with no external libraries.
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
              <strong>The goal:</strong> online product pages usually show a few static photos. This project explores how an interactive 360° viewer can let people inspect a product the way they would in a store, using direct manipulation instead of buttons and image carousels.
            </p>
            <br />
            <p>
              <strong>My role:</strong> I designed the interaction and interface, then built the rotation engine, zoom controls, and product page myself in vanilla JavaScript, CSS, and HTML.
            </p>
            <br />
            <p>
              <strong>What it includes:</strong> drag to rotate the product 360°, zoom with scroll or buttons, a responsive layout, and a complete product page with pricing, rating, description, features, and add-to-cart feedback.
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
                title="Product Viewer"
                width="100%"
                height="650"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        {/* Design Decisions */}
        <section>
          <h2 className="project-section-title">Design <span>Decisions</span></h2>
          <div className="project-features">
            <div className="project-feature-card">
              <h3>1</h3>
              <h4>Direct manipulation over buttons</h4>
              <p>Dragging the product itself feels more natural than clicking left and right arrows, so rotation follows the pointer instead of jumping between fixed angles.</p>
            </div>
            <div className="project-feature-card">
              <h3>2</h3>
              <h4>Momentum for a physical feel</h4>
              <p>Rotation continues briefly after release and slows down gradually, so the object feels like it has weight instead of stopping the instant the pointer lifts.</p>
            </div>
            <div className="project-feature-card">
              <h3>3</h3>
              <h4>Visible zoom feedback</h4>
              <p>Zoom works with scroll or buttons, in 0.1x steps, with the current level shown in real time so people always know where they are.</p>
            </div>
            <div className="project-feature-card">
              <h3>4</h3>
              <h4>A reveal animation with a purpose</h4>
              <p>The product drops in when the page loads, which draws attention to the object and signals that it's interactive.</p>
            </div>
          </div>
        </section>

        {/* What I'd Improve Next */}
        <section>
          <h2 className="project-section-title">What I'd Improve <span>Next</span></h2>
          <div className="project-overview">
            <p>
              <strong>Keyboard controls:</strong> arrow keys to rotate and +/− to zoom, so the viewer works without a mouse or touch.
            </p>
            <br />
            <p>
              <strong>Reduced motion:</strong> respect the <code>prefers-reduced-motion</code> setting by skipping the reveal animation and momentum for people who need it.
            </p>
            <br />
            <p>
              <strong>Usability testing:</strong> watch a few people use the viewer to see whether they discover drag-to-rotate without a hint.
            </p>
          </div>
        </section>

        {/* Tech Stack */}
        <section>
          <h2 className="project-section-title">Built <span>With</span></h2>
          <div className="project-tech-stack">
            {['Vanilla JavaScript', 'CSS3', 'HTML5', 'CSS Custom Properties', 'Gesture Handling', 'Momentum Physics', 'Responsive Design'].map((tech, index) => (
              <span key={index} className="project-tech-item">{tech}</span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}