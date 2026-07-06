"use client";

import "./style.css";
import Link from "next/link";

export default function ProjectsPage() {
  const projects = [
    // TOP ROW (3 items)
    {
      title: "Health-Wellness",
      image: "/healthWellness/health.png",
      link: "/projects/health-wellness",
    },
    {
      title: "InteriYOUR",
      image: "/interiYour/interiYOUR.png",
      link: "/projects/interiyour",
    },
    {
      title: "MCCP",
      image: "/mccp/mccp-poster.png",
      link: "/projects/mccp",
    },
    // BOTTOM ROW (3 items)
    {
      title: "360° Product Viewer",
      image: "/product-viewer/icon.png",
      link: "/projects/product-viewer",
    },
    {
      title: "Construction Analytics",
      image: "/constructionAnalytics/construction-analytics.png",
      link: "/projects/construction-analytics",
    },
    {
      title: "Kanba",
      image: "/kanba/kanba.png",
      link: "/projects/kanba",
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
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
            />
            <span className="project-title">{project.title}</span>
          </Link>
        ))}
      </div>
    </main>
  );
}