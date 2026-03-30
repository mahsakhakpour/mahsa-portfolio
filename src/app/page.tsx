"use client";

import { FaCode, FaLaptopCode, FaPalette, FaChartLine, FaSearch } from "react-icons/fa";
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
            Front-end developer focused on creating structured, user-friendly
            and modern web experiences.
          </p>
        </section>

        {/* About */}
        <section className="about">
          <div className="about-content">
            <img src="/Mahsa.png" alt="Mahsa Khakpour" className="about-photo" />

            <div className="about-text">
              <h2>About Me</h2>
              <p>
                I am a web developer who combines design and development to turn ideas into
                functional, user-centered applications. From front-end interfaces to back-end
                systems and databases, I apply technical skills, structured design, and careful
                planning to deliver modern, responsive, and accessible digital experiences.
              </p>
            </div>
          </div>
        </section>

        {/* Professional Summary */}
        <section className="summary">
          <h2>Professional Summary</h2>
          <p>
            I approach projects with a balance of structure and flexibility,
            focusing on clarity, maintainability, and long-term value.
          </p>
        </section>

        {/* Skills */}
        <section className="skills" id="skills">
          <h2>Skills Overview</h2>

          <div className="skills-marquee">
            <div className="skills-track">

              {skills.concat(skills).map((skill, idx) => (
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

        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=mahsa54@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="cta-button"
        >
          Send Email
        </a>

        </section>

      </main>
      
   
      <Chat />

    </>
  );
}