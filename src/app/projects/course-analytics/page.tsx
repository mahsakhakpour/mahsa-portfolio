'use client'

import { useEffect, useState } from 'react'
import './style.css'
import Header from '../../../../components/Header'
import Footer from '../../../../components/Footer'

export default function CourseAnalyticsProject() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const checkDarkMode = () => {
      const isDarkMode = document.documentElement.classList.contains('dark') ||
                         document.body.classList.contains('dark') ||
                         window.matchMedia('(prefers-color-scheme: dark)').matches
      setIsDark(isDarkMode)
    }

    checkDarkMode()

    const observer = new MutationObserver(checkDarkMode)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] })

    return () => observer.disconnect()
  }, [])

  const screenshots = [
    {
      src: '/courseAnalytics/home.png',
      title: 'Home Page - Survey Form',
      description: 'The main entry point where users can submit their course preferences. This page features a clean, user-friendly form with real-time validation. Users enter their name and select their preferred platform (MySQL, Android, or JavaScript). The form is built with React Hook Form for efficient validation and error handling. Once submitted, the data is instantly saved and reflected in the charts without any page refresh.',
      tag: 'Getting Started',
      tagClass: 'project-tag-start'
    },
    {
      src: '/courseAnalytics/dashboard.png',
      title: 'Analytics Dashboard',
      description: 'A comprehensive overview of all survey data. This dashboard provides key metrics including total responses, votes per platform, and participation rates. The data is visualized through interactive cards, progress bars, and a dynamic pie chart. Users can quickly identify trends, such as which platform is most popular among students. The dashboard updates in real-time as new responses come in, making it perfect for live presentations.',
      tag: 'Data Analysis',
      tagClass: 'project-tag-analytics'
    },
    {
      src: '/courseAnalytics/survey.png',
      title: 'Survey Form - Detailed View',
      description: 'A closer look at the survey submission interface. The form includes clear labels, intuitive radio button selections, and instant feedback for validation errors. When a user submits their response, a success notification appears and the form resets automatically. The form is fully accessible and keyboard-friendly, ensuring a smooth experience for all users. All submissions are securely stored in the browser\'s localStorage for persistence.',
      tag: 'User Input',
      tagClass: 'project-tag-input'
    },
    {
      src: '/courseAnalytics/survey-result.png',
      title: 'Survey Results & Data Visualization',
      description: 'This section displays the collected data in an easy-to-understand format. The interactive pie chart, built with Recharts, shows the distribution of preferences with clear percentages and color coding. Below the chart, a detailed list shows each individual response with timestamps. This dual-view approach allows users to see both the big picture and the specific details. The chart updates dynamically as new responses are added, providing real-time insights.',
      tag: 'Results & Insights',
      tagClass: 'project-tag-results'
    },
  ]

  const features = [
    { title: 'Interactive Charts', description: 'Real-time data visualization with Recharts that updates instantly when new responses are submitted.' },
    { title: 'Local Storage', description: 'Persistent data storage using browser\'s localStorage - no backend required, works offline.' },
    { title: 'Fully Responsive', description: 'Optimized for all devices - desktop, tablet, and mobile with a seamless experience.' },
    { title: 'Modern Design', description: 'Clean UI with Tailwind CSS, dark mode support, and smooth animations.' },
  ]

  const techStack = [
    'Next.js 14', 'TypeScript', 'Tailwind CSS', 'React Query',
    'Recharts', 'Framer Motion', 'React Hook Form', 'LocalStorage API'
  ]

  return (
    <>
      <Header />

      <div className={`project-page ${isDark ? 'dark' : ''}`}>
        {/* Hero Section */}
        <section className="project-hero">
          <div className="project-container">
            <h1>Course Platform Analytics</h1>
            <p>A full-stack survey platform for collecting and visualizing student preferences for BCIT course platforms</p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <a href="https://github.com/mahsakhakpour/course-platform-analytics" target="_blank" rel="noopener noreferrer" className="project-btn project-btn-primary">
                View Source Code
              </a>
              <a href="https://course-analytics.vercel.app" target="_blank" rel="noopener noreferrer" className="project-btn project-btn-secondary">
                Live Demo
              </a>
            </div>
          </div>
        </section>

        <div className="project-container">
          {/* Features Section */}
          <section>
            <h2 className="project-section-title">Key <span>Features</span></h2>
            <div className="project-features">
              {features.map((feature, index) => (
                <div key={index} className="project-feature-card">
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Screenshots Section */}
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
                  <span className={`project-tag ${screenshot.tagClass}`}>{screenshot.tag}</span>
                </div>
              </div>
            ))}
          </section>

          {/* Tech Stack Section */}
          <section>
            <h2 className="project-section-title">Technologies <span>Used</span></h2>
            <div className="project-tech-stack">
              {techStack.map((tech, index) => (
                <span key={index} className="project-tech-item">{tech}</span>
              ))}
            </div>
          </section>

          {/* Links Section */}
          <section>
            <div className="project-links">
              <h2>Ready to Explore?</h2>
              <p>Check out the complete source code on GitHub or try the live demo.</p>
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

      <Footer />
    </>
  )
}