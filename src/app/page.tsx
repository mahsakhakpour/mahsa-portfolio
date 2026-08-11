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
            Product Designer & UX/UI Designer | Strong Front-End Development Focus | Human-centered experiences with a Computer Science foundation.
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
                I'm a <strong>Product Designer</strong> and <strong>UX/UI Designer</strong> with a strong front-end development focus, and a deep love for human-centered experiences. My Computer Science background helps me turn visionary ideas into real, impactful products. I live at the intersection of user empathy, visual storytelling, and strategic problem-solving.
              </p>
              <p>
                I design for the moment when everything clicks. When the user flow feels effortless. When the interface disappears and the experience takes over. When I look at the product and think:
              </p>
              <p>
                <strong>"Yes. That's exactly what I had in mind."</strong>
              </p>
              <p>
                I believe the best digital experiences aren't just functional, they're felt. They guide users intuitively, surprise them with delight, and make complex tasks feel simple. I don't just design screens; I design journeys, emotions, and connections between people and technology.
              </p>
              <p>
                My background in Computer Science isn't about code, it's about understanding the possibilities and constraints of the medium I design for. It allows me to think structurally, prototype intelligently, and collaborate with engineers as a true partner. I speak both languages: design and technology. And that makes me a more effective, empathetic designer.
              </p>
              <p>
                With my <strong>front-end development expertise</strong>, I can bring my designs to life with pixel-perfect precision, ensuring every interaction feels as good as it looks. This ability to design and build gives me a unique perspective, I understand not just what users want, but what's technically feasible and performant.
              </p>
              <p>
                I hold a <strong>Master of Science in Computer Science</strong> from Northeastern University, an <strong>Associate Certificate in Applied Web Development</strong> from BCIT, and a <strong>Bachelor's degree in Computer-Software Engineering</strong>.
              </p>
              <p>
                But what drives me isn't the technology itself.
              </p>
              <p>
                It's the human connection. It's watching someone use something I designed and seeing them smile because it just works. It's turning complex problems into elegant, intuitive experiences that people genuinely enjoy. It's the moment an idea becomes something real, something meaningful, something that makes someone's day a little bit better.
              </p>
            </div>
          </div>
        </section>

        {/* Design Philosophy */}
        <section className="summary">
          <h2>Design Philosophy</h2>
          <p>
            Design isn't just how it looks, it's how it feels, how it flows, and how it serves the people who use it.
          </p>
          <br />
          <p>
            <strong>Empathy-first design</strong> , Every pixel should be guided by a deep understanding of the humans on the other side. I start with people, not problems.
          </p>
          <br />
          <p>
            <strong>Storytelling through design</strong> , Every product has a story to tell. I craft experiences that guide users through that narrative with clarity and delight.
          </p>
          <br />
          <p>
            <strong>Design & build with purpose</strong> , I design with a deep understanding of front-end development, ensuring that every visual choice is not only beautiful but also technically sound and performant.
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
              <h3>Product Design</h3>
              <p>
                Designing user-centered products that are intuitive, accessible, 
                and a pleasure to use. From research to high-fidelity prototypes, 
                I craft experiences that users love.
              </p>
            </div>

            <div className="offer-card">
              <FaLaptopCode className="offer-icon" />
              <h3>UX/UI Design</h3>
              <p>
                Creating responsive, accessible, and modern user interfaces
                with a focus on user flow, visual storytelling, and emotional 
                connection.
              </p>
            </div>

            <div className="offer-card">
              <FaLayerGroup className="offer-icon" />
              <h3>Front-End Development</h3>
              <p>
                Bringing designs to life with pixel-perfect precision. I build 
                responsive, accessible, and performant interfaces using modern 
                front-end technologies.
              </p>
            </div>

            <div className="offer-card">
              <FaChartLine className="offer-icon" />
              <h3>Data-Driven Design</h3>
              <p>
                Applying data insights and user research to inform design 
                decisions and create experiences that truly meet user needs.
              </p>
            </div>

            <div className="offer-card">
              <FaSearch className="offer-icon" />
              <h3>Business Analysis & Strategy</h3>
              <p>
                Aligning design solutions with business goals and user needs
                through strategic planning and research-driven insights.
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