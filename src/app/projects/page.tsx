"use client";

import "./style.css";
import Link from "next/link";

export default function ProjectsPage() {
  const projects = [
    {
      title: "Kanba",
      image: "/kanba/kanba.png",
      link: "/projects/kanba"
    },
    {
      title: "Course Analytics",
      image: "/course output Screenshot.png",
      link: "/projects/course-analytics"
    },
    {
      title: "MCCP",
      image: "/MCCP/MCCP.png",
      link: "/projects/MCCP"
    },
    {
      title: "interiYOUR",
      image: "/interiYour/interiYOUR.png",
      link: "/InteriYOUR-Design_Final-Project.pdf"
    },


  
  ];

  return (
    <main className="projects-page">
      <h1 className="projects-title">Project Samples</h1>
      <p className="projects-subtitle">
        Here are some project samples. Please click on each to see details:
      </p>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <Link href={project.link} key={index} className="project-card">
            <img src={project.image} alt={project.title} />
            <span className="project-title">{project.title}</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
