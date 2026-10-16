"use client";

import {
  FaLaptopCode,
  FaPalette,
  FaChartLine,
  FaUniversalAccess,
  FaCog,
  FaLayerGroup,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Chat from "../../components/Chat";

export default function HomePage() {
  const skills = [
    { name: "Figma", file: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" },
    { name: "HTML", file: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
    { name: "CSS", file: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" },
    { name: "JavaScript", file: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
    { name: "TypeScript", file: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
    { name: "React", file: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
    { name: "Next.js", file: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
    { name: "Angular", file: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg" },
    { name: "Tailwind CSS", file: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
    { name: "Node.js", file: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
    { name: ".NET", file: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dot-net/dot-net-original.svg" },
    { name: "SQL", file: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg" },
    { name: "MongoDB", file: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
    { name: "Python", file: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
    { name: "PHP", file: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg" },
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
            <strong>Design Engineer | UX/UI Designer &amp; Front-End Developer</strong>
            <br />
            I design human-centered interfaces, and I build them.
          </p>
        </section>

        {/* About */}
        <section className="about">
          <div className="about-content">
            <img src="/Mahsa.png" alt="Mahsa Khakpour" className="about-photo" />

            <div className="about-text">
              <h2>About Me</h2>
              <p>
                As a <strong>Design Engineer</strong>, I bring together <strong>UX/UI design</strong> and <strong>front-end development</strong>, driven by a deep love for human-centered experiences. My work lives at the intersection of user empathy, visual storytelling, and problem-solving.
              </p>
              <p>
                It's all about the moment when everything clicks. When the user flow feels effortless. When the finished product matches the vision, and the only thought is:
              </p>
              <p>
                <strong>"Yes. That's exactly what I had in mind."</strong>
              </p>
              <p>
                The best digital experiences aren't just functional, they're felt. They guide users intuitively, surprise them with delight, and make complex tasks feel simple. Beyond screens, the work is about journeys, emotions, and the connections between people and technology.
              </p>
              <p>
                A developer who designs and a designer who codes. Designing in Figma and building with Angular, React, Next.js, and TypeScript means what's imagined is what actually ships, with fewer handoff gaps. <strong>Full-stack web applications</strong>, taken from product design all the way to production code, are part of that track record.
              </p>
              <p>
                Education includes a <strong>Master of Science in Computer Science</strong> from Northeastern University, an <strong>Associate Certificate in Applied Web Development</strong> from BCIT, and a <strong>Bachelor's degree in Computer-Software Engineering</strong>.
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
        <section className="summary" style={{ textAlign: "left" }}>
          <h2>Design Philosophy</h2>
          <p>
            Design isn't just how it looks, it's how it feels, how it flows, and how it serves the people who use it.
          </p>
          <br />
          <p>
            <strong>Empathy-first design.</strong> Every pixel should be guided by a deep understanding of the humans on the other side.
          </p>
          <br />
          <p>
            <strong>Storytelling through design.</strong> Every product has a story to tell, and good design guides users through it with clarity and delight.
          </p>
        </section>

        {/* How I Work */}
        <section className="summary" style={{ textAlign: "left" }}>
          <h2>How I Work</h2>
          <p>
            <strong>1. Understand the problem.</strong> Research, personas, and user journeys define who the product is for and what they need.
          </p>
          <br />
          <p>
            <strong>2. Structure before pixels.</strong> Information architecture, user flows, and wireframes give a product clarity before it gets visual polish.
          </p>
          <br />
          <p>
            <strong>3. Prototype and refine.</strong> Figma prototypes and working builds make ideas real early, so they can be tried, questioned, and improved.
          </p>
          <br />
          <p>
            <strong>4. Build with purpose.</strong> Beautiful isn't enough. On the front end, that means accessible, responsive, performant interfaces in React, Next.js, and TypeScript. On the back end, it means clean APIs and well-planned data models, so the experience holds up beyond the screen.
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
                Turning complex problems into clear products. From user research,
                personas, and journeys to flows, wireframes, and high-fidelity
                Figma prototypes.
              </p>
            </div>

            <div className="offer-card">
              <FaLaptopCode className="offer-icon" />
              <h3>UX/UI Design</h3>
              <p>
                Designing responsive, modern interfaces with a focus on visual
                hierarchy, interaction, and the emotional connection between
                people and the product.
              </p>
            </div>

            <div className="offer-card">
              <FaLayerGroup className="offer-icon" />
              <h3>Front-End Development</h3>
              <p>
                Building responsive, performant interfaces with React, Next.js,
                TypeScript, and Tailwind CSS, so what's designed is what ships.
              </p>
            </div>

            <div className="offer-card">
              <FaChartLine className="offer-icon" />
              <h3>Dashboards &amp; Data Visualization</h3>
              <p>
                Designing and building analytics dashboards and interactive maps
                that make complex data easy to explore and understand.
              </p>
            </div>

            <div className="offer-card">
              <FaUniversalAccess className="offer-icon" />
              <h3>Design Systems &amp; Accessibility</h3>
              <p>
                Creating reusable components and consistent patterns, built to
                WCAG standards so interfaces work for everyone.
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

            <a
              href="https://www.linkedin.com/in/mahsa-khakpour/"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button"
            >
              <FaLinkedin /> LinkedIn
            </a>

            <a
              href="https://github.com/mahsakhakpour"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button"
            >
              <FaGithub /> GitHub
            </a>
          </div>
        </section>
      </main>

      <Chat />
    </>
  );
}