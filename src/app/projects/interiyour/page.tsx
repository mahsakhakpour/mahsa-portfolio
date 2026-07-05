'use client';

import { useEffect, useState } from 'react';
import './style.css';

export default function InteriYOURProject() {
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

  // Figma prototype URL - WITHOUT the flow panel
  const figmaUrl = "https://www.figma.com/proto/nmi051KM3K6MfcTOqCSSQo/interiYOUR?node-id=196-468&p=f&t=WvbdHpBc3OSTWwJT-1&scaling=scale-down&content-scaling=fixed&page-id=45%3A71&starting-point-node-id=196%3A468&hide-ui=1";
  
  // Figma embed URL
  const figmaEmbedUrl = `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(figmaUrl)}`;

  return (
    <div className={`project-page ${isDark ? 'dark' : ''}`}>
      {/* Hero Section */}
      <section className="project-hero">
        <div className="project-container">
          <h1>InteriYOUR Design</h1>
          <p>UX/UI design for an interior design mobile app. Features user interviews, surveys, personas, wireframes, and a fully interactive Figma prototype.</p>

        </div>
      </section>

      <div className="project-container">
        {/* Project Overview - Detailed */}
        <section>
          <h2 className="project-section-title">About <span>InteriYOUR Design</span></h2>
          <div className="project-overview">
            <p>
              InteriYOUR Design is a UX/UI design project for a mobile app that allows users to become their own interior designers using augmented reality technology. The app solves a real problem: people want to redecorate their homes but don't have the time, money, or confidence to hire a professional designer.
            </p>
            <br />
            <p>
              <strong>Key Features:</strong> Users can capture and render their space using panoramic photos, browse furniture options, see items in their home with AR technology, save designs to their library, create wish lists, and purchase items directly through the app. The app also offers style suggestions based on user preferences and personalized profiles.
            </p>
            <br />
            <p>
              <strong>Research & Validation:</strong> The project was built on extensive user research, including interviews with diverse users (from architects to graphic designers) and surveys that showed 80% of people have redecorated in the past 5-10 years, but almost no one has hired an interior designer due to cost and time constraints. The research validated strong interest in AR technology for interior design.
            </p>
          </div>
        </section>

        {/* Live Prototype - Figma Embedded */}
        <section>
          <h2 className="project-section-title">Live <span>Prototype</span></h2>
          <div className="project-iframe-container">
            <iframe 
              src={figmaEmbedUrl}
              className="project-iframe"
              title="InteriYOUR Design Figma Prototype"
              width="100%"
              height="650"
              allowFullScreen
            />
          </div>
        </section>

        {/* How It Works - Enhanced with UX process */}
        <section>
          <h2 className="project-section-title">UX <span>Process</span></h2>
          <div className="project-features">
            <div className="project-feature-card">
              <h3>1</h3>
              <h4>User Research & Interviews</h4>
              <p>Conducted in-depth interviews with 5 users (architects, designers, busy professionals) and surveys with 80% homeowners to understand their decorating challenges, preferences, and pain points.</p>
            </div>
            <div className="project-feature-card">
              <h3>2</h3>
              <h4>Personas & Journey Mapping</h4>
              <p>Created 4 detailed personas (Harold, Teresa, Simon, Ashley) representing target users. Mapped their day-in-the-life and user journeys to identify key touchpoints and opportunities.</p>
            </div>
            <div className="project-feature-card">
              <h3>3</h3>
              <h4>Wireframing & Iteration</h4>
              <p>Developed and tested 5 rounds of wireframes, gathering feedback on the photo capture, space recognition, and saving flows. Each iteration refined the user experience and interface clarity.</p>
            </div>
            <div className="project-feature-card">
              <h3>4</h3>
              <h4>Final Prototype</h4>
              <p>Delivered a high-fidelity interactive prototype in Figma with intuitive navigation, clear user flows, and a polished visual design ready for development.</p>
            </div>
          </div>
        </section>

        {/* PDF Download Section - Only View PDF */}
        <section>
          <h2 className="project-section-title">Full <span>Documentation</span></h2>
          <div className="project-pdf-section">
            <p>
              The complete UX/UI design documentation includes executive summary, user interviews, surveys, personas, user flows, journey maps, wireframes with 5 rounds of iteration, and the final prototype.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a 
                href="/InteriYOUR-Design.pdf" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="project-btn project-btn-dark"
              >
                View Full PDF
              </a>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section>
          <h2 className="project-section-title">Built <span>With</span></h2>
          <div className="project-tech-stack">
            {['Figma', 'User Interviews', 'Surveys', 'Personas', 'Wireframes', 'User Flows', 'Journey Maps', 'AR Technology', 'UX/UI Design'].map((tech, index) => (
              <span key={index} className="project-tech-item">{tech}</span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}