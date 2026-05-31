'use client'

import React, { useEffect, useState } from 'react'
import './style.css'

export default function ConstructionAnalyticsProject() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const checkDarkMode = () => {
      const isDarkMode = document.body.classList.contains('dark')
      setIsDark(isDarkMode)
    }

    checkDarkMode()

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          checkDarkMode()
        }
      })
    })

    observer.observe(document.body, { attributes: true })

    return () => observer.disconnect()
  }, [])

  const screenshots = [
    {
      src: '/constructionAnalytics/home.png',
      title: 'Home Page - Feedback Form',
      description: 'The main entry point where clients can submit their project feedback. This page features a clean, user-friendly form with real-time validation. Clients enter their company name, project location, and select their project type (Residential, Commercial, or Industrial). The form is built with React Hook Form for efficient validation and error handling. Once submitted, the data is instantly saved and reflected in the charts without any page refresh.',
      tag: 'Getting Started',
    },
    {
      src: '/constructionAnalytics/dashboard.png',
      title: 'Analytics Dashboard',
      description: 'A comprehensive overview of all feedback data. This dashboard provides key metrics including total responses, votes per project type, and participation rates. The data is visualized through interactive cards, progress bars, and a dynamic pie chart. Users can quickly identify trends, such as which project type is most popular among clients.',
      tag: 'Data Analysis',
    },
    {
      src: '/constructionAnalytics/map.png',
      title: 'Project Distribution Map',
      description: 'An interactive map powered by Leaflet and OpenStreetMap shows the geographic distribution of projects. Each marker is color-coded by project type (Residential, Commercial, Industrial). Click on any marker to see client name, project type, and address. The map automatically zooms to fit all locations.',
      tag: 'Geospatial',
    },
    {
      src: '/constructionAnalytics/csv.png',
      title: 'CSV Export Feature',
      description: 'The dashboard includes an "Export to CSV" button that allows users to download all survey responses as a CSV file. This file can be opened in Excel, Google Sheets, or any data analysis tool. The export includes client names, project types, addresses, and timestamps.',
      tag: 'Data Export',
    },
  ]

  return (
    <div className={`project-page ${isDark ? 'dark' : ''}`}>
      <section className="project-hero">
        <div className="project-container">
          <h1>Construction Analytics</h1>
          <p>A full-stack feedback platform for collecting and visualizing client preferences and locations for construction project types. Built with Next.js, TypeScript, and Tailwind CSS, it features real-time data visualization, an interactive map, and CSV export.</p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a 
              href="https://construction-feedback-app.vercel.app" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="project-btn project-btn-primary"
              style={{ backgroundColor: '#10b981', color: 'white' }}
            >
              Live Demo
            </a>
            <a 
              href="https://github.com/mahsakhakpour/construction-feedback" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="project-btn project-btn-dark"
            >
              Source Code
            </a>
          </div>
        </div>
      </section>

      <div className="project-container">
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

        <section>
          <h2 className="project-section-title">How It <span>Works</span></h2>
          <div className="project-features">
            <div className="project-feature-card">
              <h3>1</h3>
              <h4>Submit Feedback</h4>
              <p>Clients fill out a simple form to share their project type preference and location with real-time validation.</p>
            </div>
            <div className="project-feature-card">
              <h3>2</h3>
              <h4>Geocode Location</h4>
              <p>The address is automatically converted to coordinates using OpenStreetMap's Nominatim service (free, no API key required).</p>
            </div>
            <div className="project-feature-card">
              <h3>3</h3>
              <h4>View Analytics</h4>
              <p>Interactive charts, statistics, and a color-coded map update instantly to show client preferences and geographic distribution.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="project-section-title">Built <span>With</span></h2>
          <div className="project-tech-stack">
            {['Next.js 14', 'TypeScript', 'Tailwind CSS', 'React Query', 'Recharts', 'Leaflet', 'OpenStreetMap', 'React Hook Form', 'LocalStorage API'].map((tech, index) => (
              <span key={index} className="project-tech-item">{tech}</span>
            ))}
          </div>
        </section>

        <section>
          <div className="project-links">
            <h2>Ready to Explore?</h2>
            <p>Check out the complete source code on GitHub or try the live demo.</p>
            <div className="project-buttons">
              <a 
                href="https://construction-feedback-app.vercel.app" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="project-btn project-btn-primary"
                style={{ backgroundColor: '#10b981', color: 'white' }}
              >
                Live Demo
              </a>
              <a href="https://github.com/mahsakhakpour/construction-feedback" target="_blank" rel="noopener noreferrer" className="project-btn project-btn-dark">
                Source Code
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}