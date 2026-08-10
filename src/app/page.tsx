"use client";

import { FaLaptopCode, FaPalette, FaChartLine, FaSearch, FaCog, FaLayerGroup } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Chat from "../../components/Chat";

export default function HomePage() {

  const skills = [
    { name: "HTML", file: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
    { name: "CSS", file: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" },
    { name: "JavaScript", file: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
    { name: "React", file: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
    { name: "Next.js", file: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
    { name: "Node.js", file: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
    { name: "SQL", file: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg" },
    { name: "Python", file: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
    { name: "MongoDB", file: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
    { name: "PHP", file: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg" },
    { name: "Angular", file: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg" },
    { name: "WordPress", file: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/wordpress/wordpress-plain.svg" },
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
            UX/UI Designer & Front-End Developer | Passionate about digital design and human-centered experiences.
          </p>
        </section>

        {/* About */}
        <section className="about">
          <div className="about-content">
            <img src="/Mahsa.png" alt="Mahsa Khakpour" className="about-photo" />

            <div className="about-text">
              <h2>About Me</h2>
              <p>
                Hi, I'm Mahsa.
              </p>
              <p>
                I'm a <strong>UX/UI Designer and Front-End Developer</strong>, but if I'm being honest, my heart is in digital design.
              </p>
              <p>
                I love that moment when an idea finally becomes real, the moment I look at the product and think:
              </p>
              <p>
                <strong>"Yes. That's exactly what I had in mind."</strong>
              </p>
              <p>
                I enjoy understanding how people interact with technology, exploring ideas, and turning them into interfaces that feel intuitive, clear, and purposeful. My background in full-stack development means I can take an idea beyond the interface and understand how it works as a real product.
              </p>
              <p>
                I can move between <strong>design and development</strong>, which helps me turn creative ideas into practical, technically sound experiences.
              </p>
              <p>
                I hold a <strong>Bachelor's degree in Computer-Software Engineering</strong>, an <strong>Associate Certificate in Web Development from BCIT</strong>, and a <strong>Master of Science in Computer Science from Northeastern University</strong>.
              </p>
              <p>
                But what really drives me isn't the technology itself.
              </p>
              <p>
                <strong>It's seeing an idea become the thing I imagined.</strong>
              </p>
            </div>
          </div>
        </section>

        {/* Professional Summary */}
        <section className="summary">
          <h2>Professional Summary</h2>
          <p>
            My goal is to design and build digital products that people genuinely enjoy using. I combine a deep passion for 
            UX/UI design with the technical discipline of a full-stack engineer to create experiences that are both beautiful 
            and bulletproof. I believe the best technology feels effortless and intuitive.
          </p>
        </section>

        {/* Skills */}
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
              <FaPalette className="offer-icon" />
              <h3>UX/UI Design</h3>
              <p>
                Designing clear, user-centered interfaces that are intuitive, accessible, 
                and a pleasure to use. My true passion lies in crafting digital experiences 
                that users love.
              </p>
            </div>

            <div className="offer-card">
              <FaLaptopCode className="offer-icon" />
              <h3>Front-End Development</h3>
              <p>
                Creating responsive, accessible, and modern user interfaces
                using current front-end technologies. I bring my designs to life 
                with pixel-perfect precision.
              </p>
            </div>

            <div className="offer-card">
              <FaLayerGroup className="offer-icon" />
              <h3>Full Stack Development</h3>
              <p>
                Building end-to-end applications with structured
                and maintainable code. My full-stack knowledge ensures 
                seamless integration between design and functionality.
              </p>
            </div>

            <div className="offer-card">
              <FaChartLine className="offer-icon" />
              <h3>Data-Driven Development</h3>
              <p>
                Applying data insights and visualization
                to improve application outcomes and inform design decisions.
              </p>
            </div>

            <div className="offer-card">
              <FaSearch className="offer-icon" />
              <h3>Business Analysis & SEO</h3>
              <p>
                Aligning technical solutions with business goals
                and improving visibility through strategic planning.
              </p>
            </div>

            <div className="offer-card">
              <FaCog className="offer-icon" />
              <h3>Content Management Systems</h3>
              <p>
                Building and customizing user-friendly content management systems 
                that allow clients to easily manage their own websites without coding. 
                Expertise in various CMS platforms and headless solutions.
              </p>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="contact" id="contact">
          <h2>Contact</h2>
          <p>
            If you'd like to work together or have any questions, I'd love to hear from you.
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