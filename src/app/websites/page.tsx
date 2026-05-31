"use client";

import "./style.css";

export default function WebsitesPage() {
  const websites = [
    { id: 1, url: "https://www.uniquegettogethersociety.com/" },
    { id: 2, url: "https://traditionallearning.com/" },
    { id: 3, url: "https://unibuild.ca/" },
    { id: 4, url: "https://www.ciemployment.ca/" },
    
  ];

  return (
    <main className="websites-page">
      <h1 className="page-title">Sample Websites</h1>

      <div className="websites-grid">
        {websites.map((site) => (
          <a
            key={site.id}
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            className="website-card"
          >
            {site.id}
          </a>
        ))}
      </div>
    </main>
  );
}