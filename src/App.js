import zandilePhoto from './assets/zandilePhoto.jpg';
import { useState, useEffect, useRef } from "react";

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Navbar() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = ["home", "about", "projects", "services", "contact"];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActive(id);
  };

  return (
    <nav style={{
      position: "fixed", top: 16, left: "50%",
      transform: "translateX(-50%)", zIndex: 100,
      display: "flex", gap: 2, padding: "6px 12px",
      borderRadius: 999,
      background: scrolled ? "rgba(10,10,10,0.9)" : "rgba(20,20,20,0.7)",
      backdropFilter: "blur(20px)",
      border: "1px solid rgba(255,255,255,0.08)",
      boxShadow: scrolled ? "0 8px 32px rgba(0,0,0,0.4)" : "none",
      transition: "all 0.3s ease",
      whiteSpace: "nowrap",
    }}>
      {["home", "about", "projects", "services", "contact"].map((item) => (
        <button key={item} onClick={() => scrollTo(item)} style={{
          background: active === item ? "rgba(147,51,234,0.3)" : "transparent",
          border: active === item ? "1px solid rgba(147,51,234,0.5)" : "1px solid transparent",
          color: active === item ? "#c084fc" : "rgba(255,255,255,0.65)",
          padding: "5px 10px", borderRadius: 999, cursor: "pointer",
          fontSize: 13, fontWeight: active === item ? 600 : 400,
          transition: "all 0.2s ease",
        }}>
          {item}
        </button>
      ))}
    </nav>
  );
}

function Home() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="home" style={{
      minHeight: "100vh",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "100px 24px 60px",
      textAlign: "center",
      position: "relative", overflow: "hidden",
    }}>
      {/* Background glow */}
      <div style={{
        position: "absolute", top: "20%", left: "50%",
        transform: "translateX(-50%)",
        width: 400, height: 400, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(147,51,234,0.2) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Photo — shown FIRST on mobile */}
      <div style={{
        width: 200, height: 240,
        borderRadius: 20,
        overflow: "hidden",
        marginBottom: 32,
        border: "2px solid rgba(147,51,234,0.3)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(147,51,234,0.15)",
        flexShrink: 0,
      }}>
        <img src={zandilePhoto} alt="Zandile" style={{
          width: "100%", height: "100%", objectFit: "cover", objectPosition: "top"
        }} />
      </div>

      {/* Available badge */}
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        marginBottom: 20, padding: "6px 14px", borderRadius: 999,
        background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)",
      }}>
        <span style={{
          width: 8, height: 8, borderRadius: "50%", background: "#22c55e",
          boxShadow: "0 0 8px #22c55e", display: "inline-block",
        }} />
        <span style={{ color: "#86efac", fontSize: 13, fontWeight: 500 }}>
          Available for freelance work
        </span>
      </div>

      {/* Name */}
      <h1 style={{
        fontSize: "clamp(2.2rem, 8vw, 3.8rem)",
        fontWeight: 800, lineHeight: 1.1, color: "#ffffff",
        marginBottom: 12, letterSpacing: "-0.02em",
      }}>
        Hi, I'm Zandile 👋
      </h1>

      {/* Title */}
      <h2 style={{
        fontSize: "clamp(1rem, 4vw, 1.4rem)",
        fontWeight: 400, color: "rgba(255,255,255,0.55)",
        marginBottom: 20, letterSpacing: "0.02em",
      }}>
        Frontend Developer
      </h2>

      {/* Bio */}
      <p style={{
        fontSize: 16, lineHeight: 1.8,
        color: "rgba(255,255,255,0.7)",
        marginBottom: 24, maxWidth: 500,
      }}>
        I build responsive, user-friendly digital experiences with hands-on
        experience in web development. I bring ideas to life through clean
        code and thoughtful design.
      </p>

      {/* Location + Available Now */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        gap: 12, marginBottom: 32, flexWrap: "wrap",
      }}>
        <span style={{ fontSize: 14, color: "rgba(255,255,255,0.5)" }}>
          📍 Rustenburg, SA
        </span>
        <span style={{
          fontSize: 13, color: "#22c55e", padding: "2px 10px",
          borderRadius: 999, background: "rgba(34,197,94,0.1)",
          border: "1px solid rgba(34,197,94,0.2)",
        }}>
          Available Now
        </span>
      </div>

      {/* CTA Buttons */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginBottom: 40 }}>
        <button onClick={() => scrollTo("projects")} style={{
          background: "linear-gradient(135deg, #7c3aed, #9333ea)",
          border: "none", color: "#fff", padding: "13px 28px",
          borderRadius: 999, cursor: "pointer", fontWeight: 600,
          fontSize: 15, boxShadow: "0 4px 20px rgba(147,51,234,0.35)",
        }}>
          View Projects
        </button>
        <button onClick={() => scrollTo("contact")} style={{
          background: "transparent",
          border: "1.5px solid rgba(255,255,255,0.25)",
          color: "#fff", padding: "13px 28px", borderRadius: 999,
          cursor: "pointer", fontWeight: 600, fontSize: 15,
        }}>
          Hire Me
        </button>
      </div>

      {/* Social links */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>Follow me:</span>
        {[
          { href: "https://github.com/zandilekheswa5-sudo", label: "GitHub", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg> },
          { href: "https://www.linkedin.com/in/zandile-kheswa-04149b244", label: "LinkedIn", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
          { href: "https://twitter.com/Zandile_in_tech", label: "Twitter/X", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.733-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/></svg> },
          { href: "https://instagram.com/zandile.dev", label: "Instagram", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg> },
        ].map(({ href, label, icon }) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
            style={{ color: "rgba(255,255,255,0.45)", display: "flex", alignItems: "center" }}>
            {icon}
          </a>
        ))}
      </div>
    </section>
  );
}

function About() {
  const [ref, visible] = useReveal();

  return (
    <section id="about" style={{ padding: "80px 24px" }}>
      <div ref={ref} style={{
        maxWidth: 680, margin: "0 auto",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: "all 0.7s ease",
      }}>
        <p style={{
          color: "#a855f7", fontSize: 13, fontWeight: 600,
          letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8,
        }}>
          Who I Am
        </p>
        <h2 style={{
          fontSize: "clamp(2rem, 6vw, 3rem)", fontWeight: 800,
          color: "#fff", marginBottom: 24, lineHeight: 1.1,
        }}>
          About Me
        </h2>

        {/* Photo — centered above text on mobile */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}>
          <div style={{
            width: 160, background: "#1a1a1a",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 12, padding: "10px 10px 30px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            transform: "rotate(2.5deg)",
          }}>
            <div style={{ width: "100%", aspectRatio: "1", borderRadius: 6, overflow: "hidden", marginBottom: 10 }}>
              <img src={zandilePhoto} alt="Zandile" style={{
                width: "100%", height: "100%", objectFit: "cover", objectPosition: "top"
              }} />
            </div>
            <p style={{ textAlign: "center", fontSize: 12, color: "rgba(255,255,255,0.6)", fontFamily: "cursive" }}>
              @Zandile.dev
            </p>
            <p style={{ textAlign: "center", fontSize: 10, color: "rgba(255,255,255,0.35)" }}>
              Frontend Developer
            </p>
          </div>
        </div>

        <p style={{ fontSize: 16, lineHeight: 1.85, color: "rgba(255,255,255,0.7)", marginBottom: 20 }}>
          I am a Frontend Developer based in Rustenburg, South Africa,
          specialising in building clean, responsive, and user-centric web
          interfaces. My work focuses on transforming ideas into intuitive
          digital experiences that are both visually engaging and functionally
          robust.
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.85, color: "rgba(255,255,255,0.7)", marginBottom: 36 }}>
          I am currently expanding my expertise into Full Stack Software
          Development through hands-on projects, continuously strengthening
          both my technical and problem-solving capabilities. I have a strong
          interest in modern web design, particularly in crafting responsive
          layouts and interactive user experiences that balance aesthetics
          with performance.
        </p>

        {/* Current Focus Areas */}
        <div style={{ marginBottom: 36 }}>
          <p style={{
            fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 16,
            fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em",
          }}>
            Current Focus Areas
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { icon: "🎨", text: "UI/UX Design using Figma and Adobe XD" },
              { icon: "💻", text: "Frontend Development with HTML, CSS, JavaScript, and Tailwind CSS" },
              { icon: "🤖", text: "Prompt Engineering and AI Engineering" },
              { icon: "🚀", text: "Developing personal projects and exploring emerging web technologies" },
            ].map(({ icon, text }) => (
              <div key={text} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <span style={{
                  width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                  background: "rgba(147,51,234,0.12)",
                  border: "1px solid rgba(147,51,234,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 16,
                }}>
                  {icon}
                </span>
                <p style={{ fontSize: 15, color: "rgba(255,255,255,0.65)", lineHeight: 1.7, paddingTop: 6 }}>
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 14, fontWeight: 500 }}>
            Skills & Tools
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {["HTML & CSS", "JavaScript", "React", "Tailwind CSS", "Figma", "UI/UX Design", "Responsive Design", "Prompt Engineering"].map((skill) => (
              <span key={skill} style={{
                padding: "6px 14px", borderRadius: 999,
                background: "rgba(147,51,234,0.12)",
                border: "1px solid rgba(147,51,234,0.25)",
                color: "#c084fc", fontSize: 13, fontWeight: 500,
              }}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const [ref, visible] = useReveal();

  return (
    <section id="projects" style={{ padding: "80px 24px" }}>
      <div ref={ref} style={{
        maxWidth: 680, margin: "0 auto",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: "all 0.7s ease",
      }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p style={{
            color: "#a855f7", fontSize: 13, fontWeight: 600,
            letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8,
          }}>
            Portfolio
          </p>
          <h2 style={{ fontSize: "clamp(2rem, 6vw, 3rem)", fontWeight: 800, color: "#fff" }}>
            Featured Work
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* FocusFlow card */}
          <div style={{
            background: "rgba(20,15,35,0.8)",
            border: "1px solid rgba(147,51,234,0.2)",
            borderRadius: 20, overflow: "hidden",
            boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
          }}>
            <div style={{
              height: 180, background: "linear-gradient(135deg, #1e0b3d, #0f0520)",
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              position: "relative",
            }}>
              <span style={{ fontSize: 48 }}>⚡</span>
              <span style={{ fontSize: 12, marginTop: 8, color: "rgba(255,255,255,0.3)" }}>
                FocusFlow Dashboard
              </span>
              <div style={{
                position: "absolute", top: 12, right: 12,
                padding: "4px 10px", borderRadius: 999,
                background: "rgba(34,197,94,0.15)",
                border: "1px solid rgba(34,197,94,0.3)",
                color: "#86efac", fontSize: 11, fontWeight: 500,
              }}>
                Live
              </div>
            </div>
            <div style={{ padding: 24 }}>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 8 }}>
                FocusFlow Dashboard
              </h3>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", marginBottom: 20, lineHeight: 1.6 }}>
                Productivity dashboard built for freelancers. Track tasks, manage time,
                and stay on top of projects — all in one clean interface.
              </p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
                {["React", "Tailwind CSS", "JavaScript"].map((tag) => (
                  <span key={tag} style={{
                    padding: "4px 12px", borderRadius: 999,
                    background: "rgba(147,51,234,0.15)",
                    border: "1px solid rgba(147,51,234,0.3)",
                    color: "#c084fc", fontSize: 12, fontWeight: 500,
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
              <div style={{ display: "flex", gap: 16 }}>
                <a href="https://github.com/zandilekheswa5-sudo" target="_blank" rel="noopener noreferrer"
                  style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, textDecoration: "none", fontWeight: 500 }}>
                  GitHub →
                </a>
                <a href="https://github.com/zandilekheswa5-sudo" target="_blank" rel="noopener noreferrer"
                  style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, textDecoration: "none", fontWeight: 500 }}>
                  Live Demo →
                </a>
              </div>
            </div>
          </div>

          {/* Coming soon */}
          <div style={{
            background: "rgba(15,10,25,0.6)",
            border: "1px dashed rgba(255,255,255,0.08)",
            borderRadius: 20, padding: 48,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: 12,
          }}>
            <span style={{ fontSize: 32 }}>✨</span>
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 15, fontWeight: 500 }}>
              More projects coming...
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  const [ref, visible] = useReveal();

  return (
    <section id="services" style={{ padding: "80px 24px" }}>
      <div ref={ref} style={{
        maxWidth: 680, margin: "0 auto",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: "all 0.7s ease",
      }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p style={{
            color: "#a855f7", fontSize: 13, fontWeight: 600,
            letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8,
          }}>
            What I Offer
          </p>
          <h2 style={{ fontSize: "clamp(2rem, 6vw, 3rem)", fontWeight: 800, color: "#fff" }}>
            Our Features & Services
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {[
            { icon: "🌐", title: "Web Development", desc: "Building fast, responsive websites and web apps using React, HTML, CSS, and Tailwind CSS. Every project is crafted with clean, maintainable code." },
            { icon: "🎨", title: "UI/UX Design", desc: "Designing intuitive, visually appealing interfaces in Figma. From wireframes to polished prototypes, I focus on experiences that feel effortless." },
            { icon: "📱", title: "Responsive Design", desc: "Ensuring your site looks beautiful on every device — from mobile to desktop. Pixel-perfect layouts that adapt gracefully to any screen size." },
          ].map(({ icon, title, desc }) => (
            <div key={title} style={{
              background: "rgba(20,15,35,0.8)",
              border: "1px solid rgba(147,51,234,0.15)",
              borderRadius: 20, padding: 28,
            }}>
              <div style={{
                width: 50, height: 50, borderRadius: 14,
                background: "rgba(147,51,234,0.12)",
                border: "1px solid rgba(147,51,234,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 24, marginBottom: 16,
              }}>
                {icon}
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 10 }}>{title}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.75, color: "rgba(255,255,255,0.55)" }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [ref, visible] = useReveal();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" style={{ padding: "80px 24px 100px" }}>
      <div ref={ref} style={{
        maxWidth: 680, margin: "0 auto",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: "all 0.7s ease",
      }}>
        <p style={{
          color: "#a855f7", fontSize: 13, fontWeight: 600,
          letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8,
        }}>
          Let's Talk
        </p>
        <h2 style={{ fontSize: "clamp(2rem, 6vw, 3rem)", fontWeight: 800, color: "#fff", marginBottom: 12 }}>
          Get In Touch
        </h2>
        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 1.75, marginBottom: 36 }}>
          Let's collaborate! I'm always open to discussing exciting projects
          and new opportunities.
        </p>

        {/* Contact details */}
        {[
          { icon: "✉️", label: "Email", value: "zandile.dev.sa@gmail.com", href: "mailto:zandile.dev.sa@gmail.com" },
          { icon: "📞", label: "Phone", value: "+27 79 743 8937", href: "tel:+27797438937" },
          { icon: "📍", label: "Location", value: "Rustenburg, SA", href: null },
        ].map(({ icon, label, value, href }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12,
              background: "rgba(147,51,234,0.1)",
              border: "1px solid rgba(147,51,234,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 18, flexShrink: 0,
            }}>
              {icon}
            </div>
            <div>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginBottom: 2 }}>{label}</p>
              {href ? (
                <a href={href} style={{ fontSize: 14, color: "rgba(255,255,255,0.75)", textDecoration: "none" }}>{value}</a>
              ) : (
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.75)" }}>{value}</p>
              )}
            </div>
          </div>
        ))}

        {/* Social */}
        <div style={{ marginBottom: 40, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginBottom: 14 }}>Find me on</p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {[
              { href: "https://github.com/zandilekheswa5-sudo", label: "GitHub" },
              { href: "https://www.linkedin.com/in/zandile-kheswa-04149b244", label: "LinkedIn" },
              { href: "https://wa.me/27797438937", label: "WhatsApp" },
            ].map(({ href, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={{
                padding: "8px 16px", borderRadius: 999,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.6)",
                fontSize: 13, textDecoration: "none", fontWeight: 500,
              }}>
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* Form */}
        <div style={{
          background: "rgba(20,15,35,0.8)",
          border: "1px solid rgba(147,51,234,0.15)",
          borderRadius: 24, padding: 28,
        }}>
          {sent && (
            <div style={{
              background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)",
              borderRadius: 12, padding: "12px 16px", marginBottom: 20,
              color: "#86efac", fontSize: 14, textAlign: "center",
            }}>
              ✅ Message sent! I'll get back to you soon.
            </div>
          )}
          {[
            { key: "name", placeholder: "Your Name", type: "text" },
            { key: "email", placeholder: "Your Email", type: "email" },
          ].map(({ key, placeholder, type }) => (
            <input key={key} type={type} placeholder={placeholder} value={formData[key]}
              onChange={(e) => setFormData((p) => ({ ...p, [key]: e.target.value }))}
              style={{
                width: "100%", background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 12, padding: "14px 16px", color: "#fff",
                fontSize: 14, marginBottom: 16, outline: "none", boxSizing: "border-box",
              }}
            />
          ))}
          <textarea placeholder="Your Message" value={formData.message}
            onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
            rows={5} style={{
              width: "100%", background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 12, padding: "14px 16px", color: "#fff",
              fontSize: 14, marginBottom: 24, outline: "none",
              resize: "vertical", boxSizing: "border-box", fontFamily: "inherit",
            }}
          />
          <button onClick={handleSubmit} style={{
            width: "100%",
            background: "linear-gradient(135deg, #7c3aed, #9333ea)",
            border: "none", color: "#fff", padding: "15px 24px",
            borderRadius: 12, cursor: "pointer", fontWeight: 600, fontSize: 15,
            boxShadow: "0 4px 20px rgba(147,51,234,0.35)",
          }}>
            Send Message ✉️
          </button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid rgba(255,255,255,0.05)",
      padding: "24px", textAlign: "center",
    }}>
      <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>
        © 2025 Zandile.dev — Built with React & Tailwind
      </p>
      <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", marginTop: 4 }}>
        Rustenburg, SA 📍
      </p>
    </footer>
  );
}

export default function App() {
  return (
    <div style={{
      background: "linear-gradient(135deg, #0a0514 0%, #130a2e 40%, #0d0520 70%, #0a0514 100%)",
      minHeight: "100vh", color: "#fff",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      overflowX: "hidden",
      width: "100%",
    }}>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body { overflow-x: hidden; width: 100%; }
        ::placeholder { color: rgba(255,255,255,0.25); }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0a0514; }
        ::-webkit-scrollbar-thumb { background: rgba(147,51,234,0.3); border-radius: 3px; }
      `}</style>
      <Navbar />
      <Home />
      <About />
      <Projects />
      <Services />
      <Contact />
      <Footer />
    </div>
  );
}
