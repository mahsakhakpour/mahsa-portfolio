"use client";

import { FaCode, FaLaptopCode, FaPalette, FaChartLine, FaSearch, FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Chat from "../../components/Chat";

export default function HomePage() {

  const skills = [
    { name: "HTML", file: "/icons/html5.jpg" },
    { name: "CSS", file: "/icons/css3.png" },
    { name: "JavaScript", file: "/icons/js.png" },
    { name: "React", file: "/icons/react.png" },
    { name: "Next.js", file: "/icons/nextjs.png" },
    { name: "Node.js", file: "/icons/node.png" },
    { name: "SQL", file: "/icons/sql.png" },
    { name: "Python", file: "/icons/python.jpg" },
    { name: "MongoDB", file: "/icons/mongo.png" },
    { name: "PHP", file: "/icons/php.png" },
    { name: "Angular", file: "/icons/angular.png" },
  ];

  return (
    <>
      <main>

        {/* Hero */}
        <section className="hero">
          <h1>
            Bringing Ideas to Life <br />
            In the Digital World
          </h1>
          <p>
            Full-stack developer with a passion for front-end experiences and intuitive user interfaces.
          </p>
        </section>

        {/* About */}
        <section className="about">
          <div className="about-content">
            <img src="/Mahsa.png" alt="Mahsa Khakpour" className="about-photo" />

            <div className="about-text">
              <h2>About Me</h2>
              <p>
                I am a full-stack web developer who thrives at the intersection of logic 
                and creativity. While my technical foundation spans front-end interfaces, 
                back-end systems, and database architecture, my true passion lies in 
                crafting exceptional front-end experiences and intuitive user interfaces.
              </p>
              <p>
                I am deeply driven by how users interact with technology — translating 
                complex requirements into seamless, accessible, and human-centered digital 
                journeys. My full-stack expertise allows me to bridge design and 
                development, ensuring that every visual detail is supported by robust, 
                scalable architecture.
              </p>
              <p>
                I hold a Bachelor's degree in Computer-Software Engineering, an Associate 
                Certificate in Web Development from the British Columbia Institute of 
                Technology (BCIT), and a Master of Science in Computer Science from 
                Northeastern University.
              </p>
            </div>
          </div>
        </section>

        {/* Professional Summary - Improved */}
        <section className="summary">
          <h2>Professional Summary</h2>
          <p>
            I deliver clean, maintainable code with a focus on long-term value and user-centered design.
            Every project receives structured planning, iterative development, and rigorous testing
            to ensure performance, accessibility, and scalability across all devices and platforms.
          </p>
        </section>

        {/* Skills - No more duplicates */}
        <section className="skills" id="skills">
          <h2>Skills Overview</h2>

          <div className="skills-marquee">
            <div className="skills-track">
              {skills.map((skill, idx) => (
                <div key={idx} className="skill-item">
                  <img
                    src={skill.file}
                    alt={skill.name}
                    className="skill-icon"
                  />
                  <span>{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What I Offer */}
        <section className="offer">
          <h2>What I Offer</h2>

          <div className="offer-grid">
            <div className="offer-card">
              <FaLaptopCode className="offer-icon" />
              <h3>Front-End Development</h3>
              <p>
                Creating responsive, accessible, and modern user interfaces
                using current front-end technologies.
              </p>
            </div>

            <div className="offer-card">
              <FaCode className="offer-icon" />
              <h3>Full Stack Development</h3>
              <p>
                Building end-to-end applications with structured
                and maintainable code.
              </p>
            </div>

            <div className="offer-card">
              <FaPalette className="offer-icon" />
              <h3>UX/UI Designing</h3>
              <p>
                Designing clear, user-centered interfaces for
                practical applications.
              </p>
            </div>

            <div className="offer-card">
              <FaChartLine className="offer-icon" />
              <h3>Data-Driven Development</h3>
              <p>
                Applying data insights and visualization
                to improve application outcomes.
              </p>
            </div>

            <div className="offer-card">
              <FaSearch className="offer-icon" />
              <h3>Business Analysis & SEO</h3>
              <p>
                Aligning technical solutions with business goals
                and improving visibility.
              </p>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="contact" id="contact">
          <h2>Contact</h2>
          <p>
            If you&apos;d like to work together or have any questions:
          </p>

          <div className="contact-links">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=mahsa54@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button"
            >
              <MdEmail /> Send Email
            </a>
            
            
          </div>
        </section>

      </main>
      
      <Chat />
    </>
  );
}