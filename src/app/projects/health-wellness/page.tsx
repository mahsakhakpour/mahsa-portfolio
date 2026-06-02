'use client'

import React, { useEffect, useState } from 'react'
import './style.css'

export default function HealthWellnessProject() {
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
      src: '/healthWellness/login.png',
      title: 'Secure Authentication',
      description: 'Parents and caregivers log in using secure credentials stored in a SQLite database with hashed passwords via NextAuth.js. The login form includes validation and clear error feedback for invalid credentials. The demo account is pre-seeded for easy testing.',
      tag: 'Security',
    },
    {
      src: '/healthWellness/dashboard.png',
      title: 'Health Dashboard',
      description: 'The central dashboard provides a quick overview of active medications, care team size, upcoming appointments, and active therapy goals. All key information is visible at a glance with real-time statistics that update as you add new data.',
      tag: 'Dashboard',
    },
    {
      src: '/healthWellness/add-medication.png',
      title: 'Medication Tracking',
      description: 'Easily add and manage medications with dosage, frequency, and purpose. The modal form captures all necessary details and updates the medication list instantly without a page reload.',
      tag: 'Medications',
    },
    {
      src: '/healthWellness/appointment.png',
      title: 'Appointment Scheduler',
      description: 'Schedule upcoming appointments with healthcare providers. The form stores appointment type, provider name, date, and time, helping families stay organized and never miss a visit.',
      tag: 'Scheduling',
    },
    {
      src: '/healthWellness/update-goals.png',
      title: 'Therapy Goal Progress',
      description: 'Track progress on therapy goals with interactive sliders. Each goal has a target percentage, and caregivers can update the current level. Progress bars update visually to show improvement over time.',
      tag: 'Progress Tracking',
    },
    {
      src: '/healthWellness/care-team.png',
      title: 'Care Team Directory',
      description: 'Maintain a complete directory of all healthcare providers involved in your child\'s care. Add doctors, therapists, and specialists with their names and roles.',
      tag: 'Care Team',
    },
    {
      src: '/healthWellness/edit-profile.png',
      title: 'Child Profile Management',
      description: 'Maintain a complete health record including name, birth date, blood type, allergies, and diagnoses. All fields are editable through a comprehensive modal form that updates instantly.',
      tag: 'Profile',
    },
  ]

  return (
    <div className={`project-page ${isDark ? 'dark' : ''}`}>
      <section className="project-hero">
        <div className="project-container">
          <h1>Health-Wellness</h1>
          <p>A complete family health record platform for children with special needs. Track medications, appointments, therapy goals, and care team members in one centralized dashboard. Built with Next.js, TypeScript, Tailwind CSS, Prisma, and SQLite.</p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a 
              href="https://health-wellness-psi.vercel.app" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="project-btn project-btn-primary"
              style={{ backgroundColor: '#0d9488', color: 'white' }}
            >
              Live Demo
            </a>
            <a 
              href="https://github.com/mahsakhakpour/health-wellness" 
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
              <h4>Log In or Sign Up</h4>
              <p>Parents access the platform with secure credentials. The demo account is pre-seeded for easy testing of all features.</p>
            </div>
            <div className="project-feature-card">
              <h3>2</h3>
              <h4>Manage Health Records</h4>
              <p>Add medications, schedule appointments, track therapy goals, and update the child's profile from a single dashboard interface.</p>
            </div>
            <div className="project-feature-card">
              <h3>3</h3>
              <h4>Monitor Progress</h4>
              <p>Visual progress bars and real-time updates help families track improvements and keep all providers informed.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="project-section-title">Built <span>With</span></h2>
          <div className="project-tech-stack">
            {['Next.js 16', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'NextAuth.js', 'Prisma', 'SQLite', 'Lucide React'].map((tech, index) => (
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
                href="https://health-wellness-psi.vercel.app" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="project-btn project-btn-primary"
                style={{ backgroundColor: '#0d9488', color: 'white' }}
              >
                Live Demo
              </a>
              <a href="https://github.com/mahsakhakpour/health-wellness" target="_blank" rel="noopener noreferrer" className="project-btn project-btn-dark">
                Source Code
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}