'use client';

import { useEffect, useState } from 'react';
import './style.css';

export default function CourseAnalyticsProject() {
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

  const screenshots = [
    {
      src: '/courseAnalytics/home.png',
      title: 'Home Page - Survey Form',
      description: 'The main entry point where users can submit their course preferences. This page features a clean, user-friendly form with real-time validation. Users enter their name and select their preferred platform (MySQL, Android, or JavaScript). The form is built with React Hook Form for efficient validation and error handling. Once submitted, the data is instantly saved and reflected in the charts without any page refresh.',
      tag: 'Getting Started',
    },
    {
      src: '/courseAnalytics/dashboard.png',
      title: 'Analytics Dashboard',
      description: 'A comprehensive overview of all survey data. This dashboard provides key metrics including total responses, votes per platform, and participation rates. The data is visualized through interactive cards, progress bars, and a dynamic pie chart. Users can quickly identify trends, such as which platform is most popular among students.',
      tag: 'Data Analysis',
    },
    {
      src: '/courseAnalytics/survey.png',
      title: 'Survey Form - Detailed View',
      description: 'A closer look at the survey submission interface. The form includes clear labels, intuitive radio button selections, and instant feedback for validation errors. When a user submits their response, a success notification appears and the form resets automatically.',
      tag: 'User Input',
    },
    {
      src: '/courseAnalytics/survey-result.png',
      title: 'Survey Results & Data Visualization',
      description: 'This section displays the collected data in an easy-to-understand format. The interactive pie chart, built with Recharts, shows the distribution of preferences with clear percentages and color coding. Below the chart, a detailed list shows each individual response with timestamps.',
      tag: 'Results & Insights',
    },
  ];

  return (
    <div className={`project-page ${isDark ? 'dark' : ''}`}>
      {/* Hero Section */}
      <section className="project-hero">
        <div className="project-container">
          <h1>Course Platform Analytics</h1>
          <p>A full-stack survey platform for collecting and visualizing student preferences for course platforms. Built with Next.js, TypeScript, and Tailwind CSS, it features real-time data visualization with Recharts, persistent local storage, and a fully responsive design.</p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
   
          </div>
        </div>
      </section>

      <div className="project-container">
        {/* Screenshots Section - Like MCCP flowchart/images */}
        <section>
          <h2 className="project-section-title">Project <span>Walkthrough</span></h2>
          {screenshots.map((screenshot, index) => (
            <div key={index} className={`project-screenshot-item ${index % 2 === 1 ? 'reverse' : ''}`}>
              <div className="project-screenshot-image">
                <img src={screenshot.src} alt={screenshot.title} />
              </div>
              <div className="project-screenshot-content">
                <h3>{screenshot.title}</h3>
                <p>{screenshot.description}</p>
                <span className="project-tag">{screenshot.tag}</span>
              </div>
            </div>
          ))}
        </section>

        {/* How It Works Section - Like MCCP */}
        <section>
          <h2 className="project-section-title">How It <span>Works</span></h2>
          <div className="project-features">
            <div className="project-feature-card">
              <h3>1</h3>
              <h4>Submit Preferences</h4>
              <p>Users fill out a simple form to share their preferred course platform with real-time validation.</p>
            </div>
            <div className="project-feature-card">
              <h3>2</h3>
              <h4>Store Data Locally</h4>
              <p>Responses are saved in browser localStorage for persistence without a backend.</p>
            </div>
            <div className="project-feature-card">
              <h3>3</h3>
              <h4>View Analytics</h4>
              <p>Interactive charts and metrics update instantly to show student preferences.</p>
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section>
          <h2 className="project-section-title">Built <span>With</span></h2>
          <div className="project-tech-stack">
            {['Next.js 14', 'TypeScript', 'Tailwind CSS', 'React Query', 'Recharts', 'Framer Motion', 'React Hook Form', 'LocalStorage API'].map((tech, index) => (
              <span key={index} className="project-tech-item">{tech}</span>
            ))}
          </div>
        </section>

        {/* Links Section */}
        <section>
          <div className="project-links">
            <h2>Ready to Explore?</h2>
            <p>Check out the complete source code on GitHub.</p>
            <div className="project-buttons">
              <a href="https://github.com/mahsakhakpour/course-platform-analytics" target="_blank" rel="noopener noreferrer" className="project-btn project-btn-dark">
                Source Code
              </a>
              <a href="https://github.com/mahsakhakpour/course-platform-analytics/blob/main/README.md" target="_blank" rel="noopener noreferrer" className="project-btn project-btn-outline">
                Documentation
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}