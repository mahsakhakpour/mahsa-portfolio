"use client";

import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import "./style.css";
import { useState, FormEvent } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const form = e.currentTarget;
    const formData = new FormData(form);

    setIsLoading(true);
    setStatus("");

    try {
      const res = await fetch("https://formspree.io/f/mvzvoaqv", {
        method: "POST",
        headers: {
          "Accept": "application/json",
        },
        body: formData,
      });

      if (res.ok) {
        setStatus("✅ Message sent successfully! I'll get back to you soon.");
        form.reset();
      } else {
        const data = await res.json();
        setStatus(data.errors ? data.errors[0] : "❌ Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus("❌ Network error. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />

      <main className="contact-page">
        <section className="contact-hero">
          <h1>Contact</h1>
          <p>If you would like to collaborate, discuss a project, or ask a question, feel free to reach out.</p>
        </section>

        <section className="contact-container">
          <div className="contact-info">
            <h2>Get in Touch</h2>
            <p>
              I am open to discussing development projects, collaboration opportunities,
              and professional inquiries.
            </p>
            <p><strong>Email:</strong> mahsa54@gmail.com</p>
            <p><strong>Location:</strong> Vancouver, BC</p>
            <div className="contact-links">
              <a href="https://linkedin.com/in/mahsa-khakpour" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="https://github.com/mahsakhakpour" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href="/Mahsa_Khakpour_Resume.pdf" target="_blank" rel="noopener noreferrer">Resume</a>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <input 
              type="text" 
              name="name" 
              placeholder="Your Name" 
              required 
              disabled={isLoading}
            />
            <input 
              type="email" 
              name="email" 
              placeholder="Your Email" 
              required 
              disabled={isLoading}
            />
            <textarea 
              name="message" 
              placeholder="Your Message" 
              rows={5} 
              required 
              disabled={isLoading}
            />
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Sending..." : "Send Message"}
            </button>
          </form>

          {status && <p className="form-status">{status}</p>}
        </section>
      </main>

      <Footer />
    </>
  );
}