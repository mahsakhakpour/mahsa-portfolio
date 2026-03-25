"use client"

import { useState } from "react"
import Header from "../../../components/Header"
import Navbar from "../../../components/Navbar"
import Footer from "../../../components/Footer"
import "./style.css"

export default function MyDesigns() {
  const items = [
    { src: "/designs/1.mp4", type: "video" },
    { src: "/designs/2.mp4", type: "video" },
    { src: "/designs/3.mp4", type: "video" },
    { src: "/designs/4.png", type: "image" },
    { src: "/designs/5.jpg", type: "image", shape: "rect" },
    { src: "/designs/6.png", type: "image" },
    { src: "/designs/7.png", type: "image" },
    { src: "/designs/8.png", type: "image", shape: "rect" },
    { src: "/designs/9.png", type: "image" },
    { src: "/designs/10.jpg", type: "image" },
    { src: "/designs/11.jpg", type: "image", shape: "rect" },
    { src: "/designs/12.png", type: "image" }
  ]

  const [selected, setSelected] = useState<string | null>(null)

  return (
    <>
      <Header />      

      <main className="design-page">
        <h1 className="design-title">Design & Media Samples</h1>

        <div className="grid-container">
          {items.map((item, i) => {
            const boxClass = item.shape === "rect" ? "grid-item rect" : "grid-item square"

            return (
              <div key={i} className={boxClass}>
                {item.type === "video" ? (
                  <video
                    src={item.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="grid-media"
                    onClick={() => setSelected(item.src)}
                  />
                ) : (
                  <img
                    src={item.src}
                    className="grid-media"
                    onClick={() => setSelected(item.src)}
                  />
                )}
              </div>
            )
          })}
        </div>

        {selected && (
          <div className="modal" onClick={() => setSelected(null)}>
            {selected.endsWith(".mp4") ? (
              <video
                src={selected}
                autoPlay
                muted
                loop
                controls
                className="modal-media"
              />
            ) : (
              <img src={selected} className="modal-media" />
            )}
          </div>
        )}
      </main>

      <Footer />
    </>
  )
}