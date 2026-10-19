import { useState, useEffect, useRef } from "react";
import zandilePhoto from "./assets/zandilePhoto.jpg";
import zandileCutout from "./assets/zandileCutout.png";
import focusflowImg from "./assets/focusflow.png";
import glowhausImg from "./assets/glowhaus.png";
import mamabearImg from "./assets/mamabear.png";
import GCALEKAImg from "./assets/GCALEKA.png";
import cryptoAnalyzerImg from "./assets/crypto-market-analyzer.png";
import personalExpenseTrackerImg from "./assets/personal-expense-tracker.png";
import aiClientAssistantImg from "./assets/ai-client-assisants.png";
import menuFlowImg from "./assets/menuflow.png";
import aiContentStudioImg from "./assets/ai-content-studio.png";
import careerLaunchAIImg from "./assets/career-launch-ai.png";

// ── THEME ──────────────────────────────────────────────────────────────────
// `p` is the soft purple palette used for lavender cards, chips and frames
const themes = {
  light: {
    isDark: false,
    bg: "#ffffff", bgAlt: "#f5f5f5", bgCard: "#ffffff",
    border: "#e5e5e5", borderHover: "#d1d1d1",
    text: "#111111", textSub: "#555555", textMuted: "#888888",
    btnPrimary: "#111111", btnPrimaryText: "#ffffff",
    shadow: "0 1px 4px rgba(0,0,0,0.08)",
    shadowHover: "0 8px 24px rgba(0,0,0,0.12)",
    navBg: "rgba(255,255,255,0.85)",
    tagBg: "#f0f0f0", tagText: "#444444",
    activeBadgeBg: "#111111", activeBadgeText: "#ffffff",
    successBg: "#f0fdf4", successText: "#166534",
    p: {
      cardGrad: "linear-gradient(145deg, #ffffff 0%, #f7f2ff 55%, #eee5ff 100%)",
      border: "rgba(124,58,237,0.18)",
      borderHover: "rgba(124,58,237,0.42)",
      shadow: "0 2px 10px rgba(124,58,237,0.07)",
      shadowHover: "0 10px 26px rgba(124,58,237,0.15)",
      chipText: "#3b3550",
      innerBg: "rgba(255,255,255,0.78)",
      innerBorder: "rgba(124,58,237,0.16)",
      inputBg: "rgba(255,255,255,0.92)",
      accentText: "#6d28d9",
      accentSoft: "#5b3fa8",
      accentMuted: "#7a6aa0",
      frame: "linear-gradient(160deg, #f1e8ff 0%, #e0d0ff 100%)",
      frameBorder: "rgba(124,58,237,0.3)",
      glow: "rgba(124,58,237,0.30)",
      secBtnBg: "linear-gradient(135deg, #f7f2ff 0%, #ebe0ff 100%)",
      secBtnBorder: "rgba(124,58,237,0.38)",
      secBtnText: "#6d28d9",
    },
  },
  dark: {
    isDark: true,
    bg: "#0f0f0f", bgAlt: "#181818", bgCard: "#1c1c1c",
    border: "#2a2a2a", borderHover: "#3a3a3a",
    text: "#f0f0f0", textSub: "#a0a0a0", textMuted: "#666666",
    btnPrimary: "#f0f0f0", btnPrimaryText: "#111111",
    shadow: "0 1px 4px rgba(0,0,0,0.3)",
    shadowHover: "0 8px 24px rgba(0,0,0,0.5)",
    navBg: "rgba(15,15,15,0.9)",
    tagBg: "#242424", tagText: "#b0b0b0",
    activeBadgeBg: "#f0f0f0", activeBadgeText: "#111111",
    successBg: "#052e16", successText: "#86efac",
    p: {
      cardGrad: "linear-gradient(145deg, #1a1228 0%, #1e1133 55%, #241340 100%)",
      border: "rgba(167,139,250,0.2)",
      borderHover: "rgba(167,139,250,0.5)",
      shadow: "0 2px 12px rgba(0,0,0,0.35)",
      shadowHover: "0 10px 28px rgba(124,58,237,0.25)",
      chipText: "#e2dcf2",
      innerBg: "rgba(10,6,20,0.45)",
      innerBorder: "rgba(167,139,250,0.18)",
      inputBg: "rgba(10,6,20,0.55)",
      accentText: "#c4b5fd",
      accentSoft: "#c4b5fd",
      accentMuted: "#9d8fc4",
      frame: "linear-gradient(160deg, #2c1a4d 0%, #1d0f36 100%)",
      frameBorder: "rgba(167,139,250,0.35)",
      glow: "rgba(124,58,237,0.45)",
      secBtnBg: "linear-gradient(135deg, rgba(124,58,237,0.2) 0%, rgba(147,51,234,0.1) 100%)",
      secBtnBorder: "rgba(167,139,250,0.45)",
      secBtnText: "#c4b5fd",
    },
  },
};

const PURPLE_GRAD = "linear-gradient(135deg, #7c3aed 0%, #9333ea 55%, #a855f7 100%)";
const CV_PATH = "/Zandile_Kheswa_CV.pdf";
const CREDLY_URL = "https://www.credly.com/users/zandile-kheswa";

// ── HELPERS ────────────────────────────────────────────────────────────────
function useIsMobile() {
  const [m, setM] = useState(window.innerWidth < 768);
  useEffect(() => {
    const h = () => setM(window.innerWidth < 768);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return m;
}

function useReveal() {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setV(true); },
      { threshold: 0.08 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, v];
}

// Lift + stronger purple border on hover (lavender cards)
const lift = (p) => ({
  onMouseEnter: (e) => {
    e.currentTarget.style.transform = "translateY(-3px)";
    e.currentTarget.style.borderColor = p.borderHover;
    e.currentTarget.style.boxShadow = p.shadowHover;
  },
  onMouseLeave: (e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.borderColor = p.border;
    e.currentTarget.style.boxShadow = p.shadow;
  },
});

// Lavender outline button that fills with the purple gradient on hover
const fillHover = (p) => ({
  onMouseEnter: (e) => {
    e.currentTarget.style.background = PURPLE_GRAD;
    e.currentTarget.style.color = "#ffffff";
    e.currentTarget.style.borderColor = "transparent";
  },
  onMouseLeave: (e) => {
    e.currentTarget.style.background = p.secBtnBg;
    e.currentTarget.style.color = p.secBtnText;
    e.currentTarget.style.borderColor = p.secBtnBorder;
  },
});

const scrollToId = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

// Chip used inside the Skills cards (lighter than the card so it stands out)
function Chip({ t, children }) {
  const p = t.p;
  return (
    <span
      style={{
        background: p.innerBg, color: p.chipText,
        border: `1px solid ${p.innerBorder}`,
        padding: "6px 14px", borderRadius: 8, fontSize: 13,
        transition: "all 0.2s ease", cursor: "default",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.borderColor = p.borderHover; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = p.innerBorder; }}
    >
      {children}
    </span>
  );
}

// Lighter pill that sits inside lavender cards
function InnerPill({ t, children, small }) {
  const p = t.p;
  return (
    <span style={{
      background: p.innerBg, color: p.chipText,
      border: `1px solid ${p.innerBorder}`,
      padding: small ? "3px 10px" : "4px 12px",
      borderRadius: small ? 5 : 6, fontSize: small ? 11 : 12,
    }}>{children}</span>
  );
}

// ── NAVBAR ─────────────────────────────────────────────────────────────────
// ─── NAVBAR ───
const NAV_LINKS = [
  "home",
  "about",
  "skills",
  "projects",
  "qualifications",
  "contact",
];

function Navbar({ theme, t, toggleTheme }) {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      for (const id of [...NAV_LINKS].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 140) { setActive(id); break; }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => { scrollToId(id); setActive(id); setMenuOpen(false); };

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        background: scrolled ? t.navBg : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? `1px solid ${t.border}` : "1px solid transparent",
        transition: "all 0.3s ease",
      }}>
        <div style={{
          maxWidth: 1100, margin: "0 auto", padding: "0 24px", height: 64,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <button onClick={() => go("home")} style={{
            background: "none", border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", gap: 0,
          }}>
            <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.03em", color: t.text, lineHeight: 1 }}>Zandile</span>
            <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.03em", color: "#7c3aed", lineHeight: 1 }}>.</span>
            <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.03em", color: t.textMuted, lineHeight: 1 }}>dev</span>
          </button>

          {!isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              {NAV_LINKS.map((id) => (
                <button key={id} onClick={() => go(id)} style={{
                  background: active === id ? t.activeBadgeBg : "transparent",
                  color: active === id ? t.activeBadgeText : t.textSub,
                  border: "none", padding: "6px 14px", borderRadius: 6,
                  cursor: "pointer", fontSize: 13, fontWeight: active === id ? 600 : 400,
                  textTransform: "capitalize", transition: "all 0.2s",
                }}>{id}</button>
              ))}
              <button onClick={toggleTheme} style={{
                background: "none", border: `1px solid ${t.border}`,
                borderRadius: 6, padding: "6px 10px", cursor: "pointer",
                color: t.textSub, fontSize: 14, marginLeft: 8,
              }}>
                {theme === "light" ? "🌙" : "☀️"}
              </button>
            </div>
          )}

          {isMobile && (
            <button onClick={() => setMenuOpen((o) => !o)} style={{
              background: "none", border: `1px solid ${t.border}`,
              borderRadius: 6, padding: "6px 10px", cursor: "pointer",
              color: t.text, fontSize: 18,
            }}>
              {menuOpen ? "✕" : "☰"}
            </button>
          )}
        </div>
      </nav>

      {isMobile && menuOpen && (
        <div style={{
          position: "fixed", top: 64, left: 0, right: 0, zIndex: 199,
          background: t.bg, borderBottom: `1px solid ${t.border}`,
          padding: "16px 24px 24px",
        }}>
          {NAV_LINKS.map((id) => (
            <button key={id} onClick={() => go(id)} style={{
              display: "block", width: "100%", textAlign: "left",
              background: active === id ? t.bgAlt : "none",
              border: "none", padding: "12px 16px", borderRadius: 8,
              color: t.text, fontSize: 15, fontWeight: active === id ? 600 : 400,
              textTransform: "capitalize", cursor: "pointer", marginBottom: 4,
            }}>{id}</button>
          ))}
          <div style={{ borderTop: `1px solid ${t.border}`, marginTop: 16, paddingTop: 16 }}>
            <button onClick={() => { toggleTheme(); setMenuOpen(false); }} style={{
              display: "flex", alignItems: "center", gap: 8,
              background: t.bgAlt, border: `1px solid ${t.border}`,
              borderRadius: 8, padding: "10px 16px", cursor: "pointer",
              color: t.text, fontSize: 14, fontWeight: 500,
            }}>
              {theme === "light" ? "🌙 Dark" : "☀️ Light"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// ── HERO ──────────────────────────────────────────────────────────────────
const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/zandile-kheswa-04149b244", d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
  { label: "GitHub", href: "https://github.com/zandilekheswa5-sudo", d: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" },
  { label: "Instagram", href: "https://instagram.com/zandile.dev", d: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" },
  { label: "TikTok", href: "https://tiktok.com/@zandile.dev", d: "M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z" },
  { label: "X", href: "https://twitter.com/Zandile_in_tech", d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.733-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" },
];

function SocialIcons({ t, center }) {
  const base = t.isDark ? "rgba(255,255,255,0.45)" : "#888888";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 18, justifyContent: center ? "center" : "flex-start" }}>
      {SOCIALS.map(({ label, href, d }) => (
        <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
          style={{ color: base, display: "flex", alignItems: "center", transition: "all 0.2s" }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "#7c3aed"; e.currentTarget.style.transform = "translateY(-2px)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = base; e.currentTarget.style.transform = "translateY(0)"; }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d={d} /></svg>
        </a>
      ))}
    </div>
  );
}

function TitlePill({ t }) {
  const d = t.isDark;
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 8,
      background: d ? "rgba(124,58,237,0.12)" : "rgba(124,58,237,0.06)",
      border: `1px solid ${d ? "rgba(124,58,237,0.3)" : "rgba(124,58,237,0.2)"}`,
      borderRadius: 999, padding: "7px 18px",
    }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#7c3aed", display: "inline-block", flexShrink: 0 }} />
      <span style={{ fontSize: "0.95rem", color: d ? "#c4b5fd" : "#7c3aed", fontWeight: 500 }}>
        Frontend Developer &amp; AI Engineer
      </span>
    </div>
  );
}

function Intro({ t }) {
  return (
    <p style={{ fontSize: 15, lineHeight: 1.8, color: t.isDark ? "rgba(255,255,255,0.55)" : "#888888", maxWidth: 460 }}>
      I build practical web applications and AI-powered solutions that turn
      real-world problems into useful digital experiences.
    </p>
  );
}

function StatCards({ t, isMobile }) {
  const d = t.isDark;
  const stats = [
    { num: "10+", label: "TOTAL PROJECTS", sub: "Projects built and developed", target: "projects" },
    { num: "40+", label: "PROFESSIONAL SKILLS", sub: "Technologies and development capabilities", target: "skills" },
    { num: "1+", label: "YEARS OF EXPERIENCE", sub: "Continuous hands-on development", target: "qualifications" },
  ];
  const rest = d ? "0 2px 12px rgba(124,58,237,0.08)" : "0 1px 4px rgba(0,0,0,0.08)";
  const restBorder = d ? "rgba(124,58,237,0.25)" : "#e5e5e5";
  return (
    <div style={{
      display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
      gap: 16, position: "relative", zIndex: 1,
    }}>
      {stats.map(({ num, label, sub, target }) => (
        <button key={label} onClick={() => scrollToId(target)} style={{
          background: d ? "rgba(124,58,237,0.06)" : "#ffffff",
          border: `1px solid ${restBorder}`, borderRadius: 12, padding: "24px 28px",
          cursor: "pointer", textAlign: "left", transition: "all 0.22s ease",
          boxShadow: rest, display: "flex", flexDirection: "column", gap: 4,
        }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.borderColor = d ? "rgba(124,58,237,0.55)" : "#7c3aed";
            e.currentTarget.style.boxShadow = d ? "0 8px 28px rgba(124,58,237,0.2)" : "0 8px 24px rgba(124,58,237,0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.borderColor = restBorder;
            e.currentTarget.style.boxShadow = rest;
          }}
        >
          <span style={{ fontSize: "2.2rem", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1, color: d ? "#ffffff" : "#111111" }}>{num}</span>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", marginTop: 6, color: "#7c3aed" }}>{label}</span>
          <span style={{ fontSize: 12, lineHeight: 1.5, color: d ? "rgba(255,255,255,0.45)" : "#888888" }}>{sub}</span>
        </button>
      ))}
    </div>
  );
}

// Hero photo: transparent cutout over a smooth purple gradient that fades softly into the hero on all four sides
function HeroPhoto({ t, style }) {
  const d = t.isDark;
  const edgeFade =
    "linear-gradient(to right, transparent 0%, #000 28%, #000 72%, transparent 100%)," +
    "linear-gradient(to bottom, transparent 0%, #000 9%, #000 72%, transparent 100%)";
  return (
    <div style={{ position: "relative", ...style }}>
      {/* Purple tint that the faded bottom edge melts into */}
      <div style={{
        position: "absolute", left: "-8%", right: "-8%", bottom: "-6%", height: "46%",
        background: `radial-gradient(ellipse at 50% 100%, ${d ? "rgba(124,58,237,0.38)" : "rgba(124,58,237,0.2)"} 0%, transparent 70%)`,
        filter: "blur(12px)", pointerEvents: "none",
      }} />
      {/* Smooth purple gradient backdrop (same in light and dark mode), faded on every side */}
      <div style={{
        position: "relative",
        paddingTop: "12%",
        background: d
          ? "radial-gradient(ellipse 85% 80% at 50% 30%, #9b7ee8 0%, #6d3fd0 40%, #45208a 75%, #2a1260 100%)"
          : "radial-gradient(ellipse 85% 80% at 50% 30%, #dccffa 0%, #bd9ef3 40%, #9d78e2 75%, #7f5ac6 100%)",
        WebkitMaskImage: edgeFade, maskImage: edgeFade,
        WebkitMaskComposite: "source-in", maskComposite: "intersect",
      }}>
        <img src={zandileCutout} alt="Zandile Kheswa" style={{ width: "100%", height: "auto", display: "block" }} />
      </div>
    </div>
  );
}

function Hero({ t }) {
  const isMobile = useIsMobile();
  const d = t.isDark;
  const heroBg = d
    ? "linear-gradient(135deg, #0a0a0f 0%, #0f0a1a 40%, #13082a 70%, #0a0a0f 100%)"
    : "#ffffff";
  const greeting = d ? "rgba(255,255,255,0.72)" : "#555555";
  const nameColor = d ? "#ffffff" : "#111111";

  // ── MOBILE ──
  if (isMobile) {
    return (
      <section id="home" style={{
        minHeight: "100vh", background: heroBg,
        display: "flex", flexDirection: "column", justifyContent: "center",
        padding: "100px 24px 60px", position: "relative", overflow: "hidden",
      }}>
        {d && (
          <div style={{
            position: "absolute", top: "5%", right: "5%", width: 300, height: 300, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(124,58,237,0.13) 0%, transparent 70%)", pointerEvents: "none",
          }} />
        )}

        <p style={{ fontSize: "1.25rem", fontWeight: 500, marginBottom: 6, textAlign: "center", color: greeting }}>Hi, I'm</p>

        <h1 style={{
          fontSize: "clamp(1.4rem, 7.5vw, 2.4rem)", fontWeight: 800, letterSpacing: "-0.04em",
          lineHeight: 1.05, color: nameColor, marginBottom: 24, textAlign: "center", whiteSpace: "nowrap",
        }}>
          ZANDILE KHESWA
        </h1>

        <HeroPhoto t={t} style={{ width: "100%", maxWidth: 300, margin: "0 auto 24px" }} />

        <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
          <TitlePill t={t} />
        </div>

        <div style={{ display: "flex", justifyContent: "center", textAlign: "center", marginBottom: 24 }}>
          <Intro t={t} />
        </div>

        <div style={{ marginBottom: 40 }}>
          <SocialIcons t={t} center />
        </div>

        <StatCards t={t} isMobile />
      </section>
    );
  }

  // ── DESKTOP ──
  return (
    <section id="home" style={{
      minHeight: "100vh", background: heroBg,
      display: "flex", flexDirection: "column", justifyContent: "center",
      padding: "100px 8% 60px", position: "relative", overflow: "hidden",
    }}>
      {d && (
        <>
          <div style={{
            position: "absolute", top: "8%", right: "8%", width: 450, height: 450, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(124,58,237,0.13) 0%, transparent 70%)", pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute", bottom: "15%", left: "3%", width: 300, height: 300, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)", pointerEvents: "none",
          }} />
        </>
      )}

      {/* Narrower, centered row: text + photo sit a little closer to the middle. Stat cards stay full width. */}
      <div style={{
        width: "100%", maxWidth: 1000, margin: "0 auto 64px",
        display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between",
        gap: 56, position: "relative", zIndex: 1,
      }}>
        <div style={{ flex: 1, minWidth: 0, textAlign: "left" }}>
          <p style={{ fontSize: "1.75rem", fontWeight: 500, marginBottom: 8, color: greeting }}>Hi, I'm</p>
          <h1 style={{
            fontSize: "clamp(2.2rem, 4.2vw, 3.6rem)", fontWeight: 800, letterSpacing: "-0.04em",
            lineHeight: 1.05, color: nameColor, marginBottom: 24, whiteSpace: "nowrap",
          }}>
            ZANDILE KHESWA
          </h1>
          <div style={{ marginBottom: 20 }}><TitlePill t={t} /></div>
          <div style={{ marginBottom: 24 }}><Intro t={t} /></div>
          <SocialIcons t={t} />
        </div>

        <HeroPhoto t={t} style={{ flexShrink: 0, width: "clamp(230px, 26vw, 320px)" }} />
      </div>

      <StatCards t={t} isMobile={false} />
    </section>
  );
}

// ── ABOUT ──────────────────────────────────────────────────────────────────
function About({ t }) {
  const [ref, v] = useReveal();
  const isMobile = useIsMobile();
  const p = t.p;
  const frameWidth = isMobile ? 240 : 320;

  return (
    <section id="about" style={{ background: t.bgAlt, padding: isMobile ? "80px 24px" : "100px 8%", overflow: "hidden" }}>
      <div ref={ref} style={{
        maxWidth: 1100, margin: "0 auto",
        opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(24px)",
        transition: "all 0.6s ease",
      }}>
        <div style={{
          display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? 40 : 80, alignItems: "center",
        }}>
          {/* Purple frame with glow */}
          <div style={{ order: isMobile ? -1 : 1, display: "flex", justifyContent: "center" }}>
            <div style={{ position: "relative", width: frameWidth }}>
              <div style={{
                position: "absolute", inset: -36, borderRadius: 40,
                background: `radial-gradient(circle at 50% 50%, ${p.glow} 0%, transparent 70%)`,
                filter: "blur(22px)", pointerEvents: "none",
              }} />
              <div style={{
                position: "relative", width: "100%",
                background: p.frame, border: `1px solid ${p.frameBorder}`,
                borderRadius: 16, padding: "12px 12px 40px",
                boxShadow: `0 18px 46px ${p.glow}`,
              }}>
                <div style={{ width: "100%", aspectRatio: "1", borderRadius: 10, overflow: "hidden", marginBottom: 12 }}>
                  <img src={zandilePhoto} alt="Zandile Kheswa" style={{
                    width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block",
                  }} />
                </div>
                <p style={{ textAlign: "center", fontSize: 13, color: p.accentSoft, fontFamily: "cursive" }}>@Zandile.dev</p>
                <p style={{ textAlign: "center", fontSize: 11, color: p.accentMuted, marginTop: 4 }}>Frontend Developer</p>
              </div>
            </div>
          </div>

          {/* Text */}
          <div style={{ order: isMobile ? 1 : 0 }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: t.textMuted, letterSpacing: "0.1em", marginBottom: 12 }}>ABOUT ME</p>
            <h2 style={{
              fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 800, color: t.text,
              letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 24,
            }}>
              Building practical<br />technology solutions.
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.85, color: t.textSub, marginBottom: 16 }}>
              I'm Zandile Kheswa, a developer passionate about building practical technology
              solutions that solve real-world problems.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.85, color: t.textSub, marginBottom: 16 }}>
              I work across frontend and backend development while exploring AI-powered
              applications, automation, and data-driven technologies. Through hands-on projects
              and continuous technical learning, I've developed experience building responsive
              web applications, APIs, and intelligent digital solutions.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.85, color: t.textSub, marginBottom: 36 }}>
              I'm constantly expanding my skills through professional certifications, practical
              development, and personal projects, with a focus on creating useful, reliable,
              and user-friendly technology.
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button onClick={() => scrollToId("projects")} style={{
                background: PURPLE_GRAD, color: "#ffffff", border: "none",
                padding: "11px 24px", borderRadius: 8, cursor: "pointer",
                fontWeight: 600, fontSize: 14, fontFamily: "inherit",
                boxShadow: "0 6px 20px rgba(124,58,237,0.35)", transition: "all 0.2s",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 10px 28px rgba(124,58,237,0.48)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(124,58,237,0.35)"; }}
              >View Projects →</button>

              <a href={CV_PATH} download="Zandile_Kheswa_CV.pdf" style={{
                background: p.secBtnBg, color: p.secBtnText,
                border: `1px solid ${p.secBtnBorder}`,
                padding: "11px 24px", borderRadius: 8, cursor: "pointer",
                fontWeight: 600, fontSize: 14, textDecoration: "none",
                display: "inline-block", transition: "all 0.2s",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.borderColor = "#7c3aed"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = p.secBtnBorder; }}
              >Download CV ↓</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── SKILLS ─────────────────────────────────────────────────────────────────
function Skills({ t }) {
  const [ref, v] = useReveal();
  const [activeFilter, setActiveFilter] = useState("All");
  const isMobile = useIsMobile();
  const p = t.p;

  const filters = ["All", "Frontend", "Backend", "AI & Data", "Cloud & Tools", "Software Engineering"];
  const allSkills = {
    "Frontend": ["HTML5","CSS3","JavaScript","React","React Hooks","Responsive Web Design","Tailwind CSS","UI/UX Design","Component-Based Development","State Management","Frontend Application Development"],
    "Backend": ["Node.js","Express.js","REST APIs","API Development","API Integration","Backend Application Development","Authentication","CRUD Operations","JSON","Server-Side Development"],
    "AI & Data": ["Python","Pandas","NumPy","Data Analysis","Data Collection","REST APIs with Python","Machine Learning","scikit-learn","Generative AI","AI Application Development","Prompt Engineering","Model Evaluation","Deep Learning","AI/ML Concepts"],
    "Software Engineering": ["Software Engineering","Object-Oriented Programming","Data Structures & Algorithms","Software Development Lifecycle","Git","GitHub","Version Control","Testing","Debugging","Code Quality","Problem Solving","Software Architecture","Application Development"],
    "Cloud & Tools": ["Cloud Computing","Cloud Application Development","Deployment","CI/CD","GitHub","Vercel","Supabase","Google Cloud / GCP","VS Code","Postman","Docker","Firebase"],
  };
  const displayed = activeFilter === "All" ? Object.entries(allSkills) : [[activeFilter, allSkills[activeFilter]]];

  const cardStyle = {
    background: p.cardGrad, border: `1px solid ${p.border}`,
    borderRadius: 14, padding: isMobile ? 20 : 26, boxShadow: p.shadow, transition: "all 0.22s ease",
  };

  return (
    <section id="skills" style={{ background: t.bg, padding: isMobile ? "80px 24px" : "100px 8%" }}>
      <div ref={ref} style={{
        maxWidth: 1100, margin: "0 auto",
        opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(24px)",
        transition: "all 0.6s ease",
      }}>
        <p style={{ fontSize: 12, fontWeight: 600, color: t.textMuted, letterSpacing: "0.1em", marginBottom: 12 }}>SKILLS</p>
        <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 800, color: t.text, letterSpacing: "-0.03em", marginBottom: 36 }}>
          Technologies &amp; Capabilities
        </h2>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 32, paddingBottom: 24, borderBottom: `1px solid ${t.border}` }}>
          {filters.map((f) => {
            const on = activeFilter === f;
            return (
              <button key={f} onClick={() => setActiveFilter(f)} style={{
                background: on ? "rgba(124,58,237,0.12)" : t.bgAlt,
                color: on ? p.accentText : t.textSub,
                border: `1px solid ${on ? "rgba(124,58,237,0.38)" : t.border}`,
                padding: "7px 16px", borderRadius: 6, cursor: "pointer",
                fontSize: 13, fontWeight: on ? 600 : 400, transition: "all 0.2s",
              }}>{f}</button>
            );
          })}
        </div>

        {/* One lavender card per category */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {displayed.map(([group, skills]) => (
            <div key={group} style={cardStyle} {...lift(p)}>
              <p style={{ fontSize: 14, fontWeight: 700, color: t.text, marginBottom: 16, letterSpacing: "0.01em" }}>{group}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {skills.map((skill) => <Chip key={skill} t={t}>{skill}</Chip>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── PROJECTS ───────────────────────────────────────────────────────────────
const projectsData = [
  {
    title: "FocusFlow", subtitle: "Productivity Dashboard",
    desc: "A productivity dashboard designed to help freelancers organize tasks, manage priorities, track deadlines, and monitor their progress from one place.",
    tech: ["Next.js","TypeScript","Tailwind CSS","Supabase","Git","GitHub"],
    image: focusflowImg, github: "https://github.com/zandilekheswa5-sudo/focusflow",
    demo: "https://focusflow-nine-gules.vercel.app", status: "completed",
    features: ["Create and manage tasks","Change task priorities","Delete tasks","Set due dates","Overdue task handling","Task progress tracking","Progress indicators","Productivity analytics","User authentication and database integration"],
    details: "FocusFlow is a productivity management application built with freelancers in mind. The application provides a centralized workspace for managing tasks and monitoring productivity.\n\nI focused on building the application interface, task-management functionality, state management, database integration, and responsive user experience. The project also involved working with Supabase authentication and database permissions while developing a functional full-stack workflow.",
  },
  {
    title: "GlowHaus", subtitle: "Beauty E-Commerce Store",
    desc: "A modern beauty e-commerce website designed to provide customers with a visually engaging shopping experience for beauty products.",
    tech: ["React","JavaScript","Vite","Tailwind CSS","Git","GitHub"],
    image: glowhausImg, github: "https://github.com/zandilekheswa5-sudo/glowhaus",
    demo: "https://glowhaus-ten.vercel.app/", status: "completed",
    features: ["Product browsing","Product-focused UI","Responsive design","E-commerce interface","Interactive product experience","Mobile-friendly layout"],
    details: "GlowHaus is a beauty e-commerce project focused on creating a modern and engaging online shopping experience.\n\nI developed the frontend interface and worked on creating a responsive product-focused experience that works across different screen sizes.\n\nThe project helped strengthen my experience with React, component-based development, responsive layouts, and building interfaces around real-world business requirements.",
  },
  {
    title: "Styled By Mama Bear", subtitle: "Beauty Booking Website",
    desc: "A modern beauty business website designed to showcase services and provide customers with a professional digital experience for discovering and engaging with the business.",
    tech: ["React","JavaScript","Tailwind CSS","Responsive Design"],
    image: mamabearImg, github: "https://github.com/zandilekheswa5-sudo/styled-by-mama-bear",
    demo: "https://mama-bear-styles.lovable.app/", status: "completed",
    features: ["Service presentation","Beauty-business focused design","Responsive interface","Mobile-friendly experience","Professional landing page","Customer-focused UI"],
    details: "Styled By Mama Bear is a website created for a beauty business, with a focus on professional presentation, usability, and responsive design.\n\nThe project allowed me to work on translating a real business concept into a modern digital experience while considering the needs of both the business and its customers.\n\nThe final interface was designed to make the business's services easy to discover while maintaining a clean and visually appealing experience.",
  },
  {
    title: "GCALEKA", subtitle: "Business Website",
    desc: "A professional business website designed to establish a strong online presence and provide visitors with a clear, accessible way to learn about the organization and its services.",
    tech: ["React","Vite","JavaScript","Tailwind CSS","CSS","EmailJS","GitHub","Vercel"],
    image: GCALEKAImg, github: "https://github.com/zandilekheswa5-sudo/GCALEKA",
    demo: "https://gcaleka.vercel.app", status: "completed",
    features: ["Professional online presence","Clear content organization","Responsive design","Contact integration via EmailJS"],
    details: "GCALEKA is a business-focused web project built around creating a professional and accessible online presence.\n\nThe project focused on translating the organization's needs into a structured web experience with clear content organization, responsive design, and a professional interface.\n\nThis project strengthened my experience with building websites around real-world organizational requirements rather than purely personal concepts.",
  },
  {
    title: "Crypto Market Analyzer", subtitle: "Python Data Analysis Application",
    desc: "A Python-based cryptocurrency market analysis tool that collects market data through an API, processes the data, and visualizes price movements using interactive charts.",
    tech: ["Python","Pandas","NumPy","REST APIs","CoinGecko API","Plotly"],
    image: cryptoAnalyzerImg, github: "https://github.com/zandilekheswa5-sudo/crypto-market-analyzer",
    demo: null, status: "no-demo",
    features: ["Cryptocurrency market data collection","API integration","OHLC data analysis","30-day market data","Moving average calculation","Current price information","High/low price analysis","Percentage change","Interactive candlestick visualization"],
    details: "Crypto Market Analyzer is a Python data-analysis project built to explore cryptocurrency market data through an API.\n\nThe application collects historical OHLC data, processes the information using Python and Pandas, and visualizes price movements through interactive candlestick charts. I also implemented a 7-period moving average and calculated key market statistics including current price, highs, lows, and percentage changes.\n\nThe project demonstrates my practical experience with Python, API integration, data processing, and data visualization.",
  },
  {
    title: "Personal Expense Tracker", subtitle: "Python CLI Application",
    desc: "A command-line Python application for recording, organizing, and analyzing personal expenses.",
    tech: ["Python","JSON","Data Structures","File Handling"],
    image: personalExpenseTrackerImg, github: "https://github.com/zandilekheswa5-sudo/personal-expense-tracker",
    demo: null, status: "no-demo",
    features: ["Add expenses","View expenses","Record dates","Categorize spending","Track expense amounts","Calculate total spending","Calculate spending by category","Interactive command-line menu"],
    details: "Personal Expense Tracker is a lightweight Python application designed to help users record and analyze their expenses.\n\nI built the application using Python and implemented a menu-driven interface that allows users to add and view expenses, assign categories, record dates, and calculate spending totals.\n\nThe project demonstrates practical Python programming concepts including functions, loops, conditional logic, data structures, input handling, and data processing.",
  },
  {
    title: "AI Client Assistant", subtitle: "AI-Powered Business Assistant",
    desc: "An AI-powered application concept designed to help businesses streamline client communication and automate repetitive customer-facing tasks.",
    tech: ["Python","AI","APIs","Generative AI","Prompt Engineering","Automation"],
    image: aiClientAssistantImg, github: "https://github.com/zandilekheswa5-sudo/ai-client-assistant",
    demo: "https://ai-client-assistant-eta.vercel.app/", status: "completed",
    features: ["AI-powered client communication","Business workflow automation","Intelligent assistant integration","Prompt engineering implementation"],
    details: "AI Client Assistant explores how AI can be integrated into business workflows to reduce repetitive manual tasks and improve client communication.\n\nThe project combines AI capabilities with automation concepts to demonstrate how businesses can use intelligent assistants to support everyday operations.\n\nMy work in this area focuses on applying Python, AI APIs, prompt engineering, and automation concepts to practical business use cases.",
  },
  {
    title: "MenuFlow", subtitle: "QR Restaurant Menu Platform",
    desc: "A digital restaurant menu platform that allows restaurants to create and manage online menus that customers can access through QR codes.",
    tech: ["React","JavaScript","Firebase","QR Code","Responsive Web Design"],
    image: menuFlowImg, github: "https://github.com/zandilekheswa5-sudo/MenuFlow",
    demo: null, status: "in-development",
    features: ["Restaurant menu management","Owner dashboard","Menu categories","Subcategories","Menu item management","Food images","QR code generation","Responsive customer menu","Mobile-first experience"],
    details: "MenuFlow is a restaurant technology project designed to simplify digital menu management.\n\nRestaurant owners can manage their menu content through a dedicated interface while customers can access the digital menu through a QR code.\n\nI focused on building the menu-management experience, category and item organization, authentication flow, responsive customer experience, and QR-based access.\n\nThe project demonstrates my ability to build applications around a specific business workflow and translate that workflow into a usable web application.",
  },
  {
    title: "AI Content Studio", subtitle: "AI-Powered Content Generation Platform",
    desc: "An AI-powered content creation platform designed to help businesses and creators generate marketing content for multiple digital platforms.",
    tech: ["React","JavaScript","AI","APIs","Generative AI","Prompt Engineering"],
    image: aiContentStudioImg, github: "https://github.com/zandilekheswa5-sudo/ai-content-studio",
    demo: null, status: "in-development",
    features: ["Instagram captions","Facebook posts","X posts","LinkedIn posts","Business name generation","Product descriptions"],
    details: "AI Content Studio is an AI-powered content creation platform designed to simplify the process of producing marketing content.\n\nThe application uses generative AI to help users create platform-specific content such as social media posts, captions, business names, and product descriptions.\n\nThe project combines frontend development with AI integration and prompt engineering, giving me practical experience in designing interfaces around AI-powered workflows.",
  },
  {
    title: "CareerLaunch AI", subtitle: "AI-Powered Career Assistant",
    desc: "An AI-powered career platform concept designed to help users navigate their career development and make better use of AI throughout their job-search journey.",
    tech: ["React","JavaScript","AI","APIs","Generative AI","Prompt Engineering"],
    image: careerLaunchAIImg, github: "https://github.com/zandilekheswa5-sudo/career-launch-ai",
    demo: null, status: "in-development",
    features: ["AI-powered career guidance","Job search assistance","Career development tools","AI-integrated workflows"],
    details: "CareerLaunch AI is an AI-focused project exploring how artificial intelligence can support people throughout their career journey.\n\nThe project combines web development and generative AI to create a platform focused on practical career-related workflows.\n\nIt represents my growing interest in building AI-powered applications that solve real-world problems rather than using AI simply as an additional feature.",
  },
];

function ProjectModal({ project, t, onClose }) {
  const p = t.p;
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);

  const neutralSpan = {
    flex: 1, padding: "11px 0", borderRadius: 8, textAlign: "center",
    background: p.innerBg, color: t.textMuted, border: `1px solid ${p.innerBorder}`,
    fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center",
  };

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 300,
      background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
    }} onClick={onClose}>
      <div style={{
        background: p.cardGrad, border: `1px solid ${p.border}`,
        borderRadius: 16, maxWidth: 600, width: "100%",
        maxHeight: "85vh", overflowY: "auto", padding: 36,
        boxShadow: "0 24px 60px rgba(0,0,0,0.35)",
      }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <div>
            <h3 style={{ fontSize: "1.4rem", fontWeight: 700, color: t.text, marginBottom: 4 }}>{project.title}</h3>
            <p style={{ fontSize: 13, color: p.accentMuted }}>{project.subtitle}</p>
          </div>
          <button onClick={onClose} style={{
            background: p.innerBg, border: `1px solid ${p.innerBorder}`,
            borderRadius: 6, width: 32, height: 32, cursor: "pointer",
            color: t.textSub, fontSize: 16,
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>✕</button>
        </div>

        {project.image && (
          <div style={{ borderRadius: 8, overflow: "hidden", marginBottom: 24, border: `1px solid ${p.border}` }}>
            <img src={project.image} alt={project.title} style={{ width: "100%", display: "block", objectFit: "cover", objectPosition: "top", maxHeight: 200 }} />
          </div>
        )}

        <p style={{ fontSize: 14, lineHeight: 1.75, color: t.textSub, marginBottom: 24, whiteSpace: "pre-line" }}>{project.details}</p>

        <div style={{ marginBottom: 24 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: t.textMuted, letterSpacing: "0.08em", marginBottom: 12 }}>KEY FEATURES</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {project.features.map((f) => (
              <div key={f} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#7c3aed", flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: t.textSub }}>{f}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 28 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: t.textMuted, letterSpacing: "0.08em", marginBottom: 12 }}>TECH STACK</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {project.tech.map((tech) => <InnerPill key={tech} t={t}>{tech}</InnerPill>)}
          </div>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <a href={project.github} target="_blank" rel="noopener noreferrer" style={{
            flex: 1, padding: "11px 0", borderRadius: 8, textAlign: "center",
            background: PURPLE_GRAD, color: "#ffffff",
            textDecoration: "none", fontWeight: 600, fontSize: 13,
            boxShadow: "0 6px 18px rgba(124,58,237,0.32)",
          }}>GitHub →</a>
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer" style={{
              flex: 1, padding: "11px 0", borderRadius: 8, textAlign: "center",
              background: p.secBtnBg, color: p.secBtnText, border: `1px solid ${p.secBtnBorder}`,
              textDecoration: "none", fontWeight: 600, fontSize: 13,
            }}>Live Demo ↗</a>
          )}
          {project.status === "in-development" && !project.demo && <span style={neutralSpan}>In Development</span>}
          {project.status === "no-demo" && <span style={neutralSpan}>CLI / No Demo</span>}
        </div>
      </div>
    </div>
  );
}

function Projects({ t }) {
  const [ref, v] = useReveal();
  const isMobile = useIsMobile();
  const p = t.p;
  const [showAll, setShowAll] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const displayed = showAll ? projectsData : projectsData.slice(0, 5);

  const statusBadge = (status) => {
    if (status === "in-development") return { label: "In Development", color: "#ca8a04", bg: "#fefce8" };
    if (status === "no-demo") return null;
    return { label: "Live", color: "#16a34a", bg: "#f0fdf4" };
  };

  return (
    <section id="projects" style={{ background: t.bgAlt, padding: isMobile ? "80px 24px" : "100px 8%" }}>
      {selectedProject && <ProjectModal project={selectedProject} t={t} onClose={() => setSelectedProject(null)} />}
      <div ref={ref} style={{
        maxWidth: 1100, margin: "0 auto",
        opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(24px)",
        transition: "all 0.6s ease",
      }}>
        <p style={{ fontSize: 12, fontWeight: 600, color: t.textMuted, letterSpacing: "0.1em", marginBottom: 12 }}>PROJECTS</p>
        <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 800, color: t.text, letterSpacing: "-0.03em", marginBottom: 40 }}>
          Featured Work
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(320px, 1fr))", gap: 20 }}>
          {displayed.map((project) => {
            const badge = statusBadge(project.status);
            return (
              <div key={project.title} style={{
                background: p.cardGrad, border: `1px solid ${p.border}`,
                borderRadius: 14, overflow: "hidden",
                transition: "all 0.22s ease", boxShadow: p.shadow,
                display: "flex", flexDirection: "column",
              }}
                onMouseEnter={(e) => {
                  lift(p).onMouseEnter(e);
                  const im = e.currentTarget.querySelector("img");
                  if (im) im.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  lift(p).onMouseLeave(e);
                  const im = e.currentTarget.querySelector("img");
                  if (im) im.style.transform = "scale(1)";
                }}
              >
                <div style={{
                  height: 180, background: p.innerBg, overflow: "hidden", position: "relative",
                  flexShrink: 0, borderBottom: `1px solid ${p.border}`,
                }}>
                  <img src={project.image} alt={project.title} style={{
                    width: "100%", height: "100%", objectFit: "cover", objectPosition: "top",
                    transition: "transform 0.4s ease", display: "block",
                  }} />
                  {badge && (
                    <span style={{
                      position: "absolute", top: 12, right: 12, padding: "3px 10px", borderRadius: 4,
                      background: badge.bg, color: badge.color, fontSize: 11, fontWeight: 600,
                    }}>{badge.label}</span>
                  )}
                </div>
                <div style={{ padding: 20, display: "flex", flexDirection: "column", flex: 1 }}>
                  <p style={{ fontSize: 11, color: p.accentMuted, marginBottom: 4 }}>{project.subtitle}</p>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: t.text, marginBottom: 8 }}>{project.title}</h3>
                  <p style={{ fontSize: 13, color: t.textSub, lineHeight: 1.65, marginBottom: 16, flex: 1 }}>{project.desc}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
                    {project.tech.slice(0, 4).map((tech) => <InnerPill key={tech} t={t} small>{tech}</InnerPill>)}
                    {project.tech.length > 4 && (
                      <span style={{
                        background: p.innerBg, color: p.accentMuted, border: `1px solid ${p.innerBorder}`,
                        padding: "3px 10px", borderRadius: 5, fontSize: 11,
                      }}>+{project.tech.length - 4}</span>
                    )}
                  </div>
                  <button onClick={() => setSelectedProject(project)} style={{
                    width: "100%", padding: "9px 0", borderRadius: 7,
                    background: p.secBtnBg, color: p.secBtnText, border: `1px solid ${p.secBtnBorder}`,
                    fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.2s", fontFamily: "inherit",
                  }} {...fillHover(p)}>Details →</button>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ textAlign: "center", marginTop: 36 }}>
          <button onClick={() => setShowAll((s) => !s)} style={{
            background: p.secBtnBg, color: p.secBtnText, border: `1px solid ${p.secBtnBorder}`,
            padding: "11px 32px", borderRadius: 8,
            cursor: "pointer", fontSize: 14, fontWeight: 600, transition: "all 0.2s", fontFamily: "inherit",
          }} {...fillHover(p)}>
            {showAll ? "See Less ↑" : `See More (${projectsData.length - 5} more) ↓`}
          </button>
        </div>
      </div>
    </section>
  );
}

// ── QUALIFICATIONS ──────────────────────────────────────────────────────────
function Qualifications({ t }) {
  const [ref, v] = useReveal();
  const [activeTab, setActiveTab] = useState("education");
  const isMobile = useIsMobile();
  const p = t.p;

  const education = [
    { year: "2022", title: "Information Technology Basics" },
    { year: "2023", title: "Web Development" },
    { year: "2024", title: "Data Structures & Algorithms" },
    { year: "2025 – Present", title: "IBM Full-Stack Software Developer Professional Certificate", note: "In Progress" },
  ];

  const certs = [
    "Software Engineering","Introduction to Cloud Computing","HTML, CSS & JavaScript","Git & GitHub",
    "Developing Frontend Apps with React","Developing Backend Apps with Node.js & Express",
    "Python for Data Science, AI & Development","Developing AI-based Applications using Python & Flask",
    "Machine Learning with Python","Generative AI",
  ];

  const experience = [
    {
      icon: "💻", title: "Frontend Development", type: "Hands-on Project Experience",
      desc: "Practical experience developing responsive web applications and user interfaces using modern frontend technologies, including React, JavaScript, HTML, CSS, component-based development, state management, and responsive design.",
      items: ["React applications","Functional components","React Hooks","State management","Redux","Component composition","useEffect","Dynamic data","GitHub workflows"],
      projects: ["FocusFlow","GlowHaus","Styled By Mama Bear","GCALEKA","React course projects"],
    },
    {
      icon: "⚙️", title: "Backend Development", type: "Hands-on Project Experience",
      desc: "Practical experience developing server-side applications and APIs using Node.js and Express, including CRUD operations, authentication, JWT, sessions, and API testing.",
      items: ["Node.js","Express.js","REST APIs","CRUD","JWT","Postman"],
      projects: ["Personal Expense Tracker","Crypto Market Analyzer","Node.js & Express Course Project"],
    },
    {
      icon: "🤖", title: "AI-Powered Application Development", type: "Hands-on Project Experience",
      desc: "Practical experience exploring and developing AI-powered applications using Python, APIs, generative AI technologies, data tools, and automation workflows.",
      items: ["Python","AI APIs","Generative AI","Prompt Engineering","Data","AI application development","Automation"],
      projects: ["AI Client Assistant","AI Content Studio","CareerLaunch AI"],
    },
  ];

  const cardStyle = {
    background: p.cardGrad, border: `1px solid ${p.border}`,
    borderRadius: 14, padding: 28, boxShadow: p.shadow, transition: "all 0.22s ease",
  };

  return (
    <section id="qualifications" style={{ background: t.bg, padding: isMobile ? "80px 24px" : "100px 8%" }}>
      <div ref={ref} style={{
        maxWidth: 1100, margin: "0 auto",
        opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(24px)",
        transition: "all 0.6s ease",
      }}>
        <p style={{ fontSize: 12, fontWeight: 600, color: t.textMuted, letterSpacing: "0.1em", marginBottom: 12 }}>QUALIFICATIONS</p>
        <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 800, color: t.text, letterSpacing: "-0.03em", marginBottom: 36 }}>
          Education &amp; Experience
        </h2>

        <div style={{ display: "flex", gap: 0, borderBottom: `1px solid ${t.border}`, marginBottom: 40, overflowX: "auto" }}>
          {[{ id: "education", label: "Education & Certifications" }, { id: "experience", label: "Professional Experience" }].map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
              background: "none", border: "none", whiteSpace: "nowrap",
              borderBottom: activeTab === tab.id ? "2px solid #7c3aed" : "2px solid transparent",
              color: activeTab === tab.id ? p.accentText : t.textMuted,
              padding: "12px 24px", cursor: "pointer",
              fontSize: 14, fontWeight: activeTab === tab.id ? 600 : 400,
              transition: "all 0.2s", marginBottom: -1,
            }}>{tab.label}</button>
          ))}
        </div>

        {/* SLIDE 1 — Education & Certifications */}
        {activeTab === "education" && (
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 24 }}>
            <div style={cardStyle} {...lift(p)}>
              <p style={{ fontSize: 13, fontWeight: 600, color: t.text, marginBottom: 28 }}>🎓 Education</p>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {education.map((item, i) => (
                  <div key={i} style={{
                    paddingBottom: i < education.length - 1 ? 24 : 0,
                    borderLeft: "2px solid rgba(124,58,237,0.3)",
                    paddingLeft: 20, position: "relative", marginLeft: 6,
                  }}>
                    <div style={{
                      position: "absolute", left: -6, top: 4, width: 10, height: 10, borderRadius: "50%",
                      background: "#7c3aed", border: `2px solid ${t.isDark ? "#1e1133" : "#f7f2ff"}`,
                    }} />
                    <p style={{ fontSize: 11, color: t.textMuted, marginBottom: 4 }}>{item.year}</p>
                    <p style={{ fontSize: 14, fontWeight: 500, color: t.text, lineHeight: 1.4 }}>{item.title}</p>
                    {item.note && (
                      <span style={{
                        fontSize: 11, color: "#92400e", background: "#fef3c7", border: "1px solid #fcd34d",
                        padding: "2px 10px", borderRadius: 999, marginTop: 8, display: "inline-block", fontWeight: 500,
                      }}>{item.note}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div style={cardStyle} {...lift(p)}>
              <p style={{ fontSize: 13, fontWeight: 600, color: t.text, marginBottom: 24 }}>📜 Certifications</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {certs.map((cert, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: 12,
                    padding: "10px 14px", borderRadius: 8,
                    background: p.innerBg, border: `1px solid ${p.innerBorder}`,
                  }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#7c3aed", flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: t.textSub }}>{cert}</span>
                  </div>
                ))}
              </div>
              <a href={CREDLY_URL} target="_blank" rel="noopener noreferrer" style={{
                display: "inline-block", marginTop: 20, padding: "10px 20px", borderRadius: 8,
                background: p.secBtnBg, color: p.secBtnText, border: `1px solid ${p.secBtnBorder}`,
                fontSize: 13, fontWeight: 600, textDecoration: "none", transition: "all 0.2s",
              }} {...fillHover(p)}>View Verified Badges ↗</a>
            </div>
          </div>
        )}

        {/* SLIDE 2 — Professional Experience */}
        {activeTab === "experience" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {experience.map((exp) => (
              <div key={exp.title} style={cardStyle} {...lift(p)}>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 16 }}>
                  <span style={{ fontSize: 22 }}>{exp.icon}</span>
                  <div>
                    <p style={{ fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 2 }}>{exp.title}</p>
                    <p style={{ fontSize: 12, color: p.accentMuted }}>{exp.type}</p>
                  </div>
                </div>
                <p style={{ fontSize: 14, lineHeight: 1.75, color: t.textSub, marginBottom: 20 }}>{exp.desc}</p>
                <div style={{ marginBottom: exp.projects.length > 0 ? 20 : 0 }}>
                  <p style={{ fontSize: 11, fontWeight: 600, color: t.textMuted, letterSpacing: "0.08em", marginBottom: 10 }}>
                    {exp.title === "Backend Development" ? "TECHNOLOGIES" : "EXPERIENCE AREAS"}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {exp.items.map((item) => <InnerPill key={item} t={t}>{item}</InnerPill>)}
                  </div>
                </div>
                {exp.projects.length > 0 && (
                  <div>
                    <p style={{ fontSize: 11, fontWeight: 600, color: t.textMuted, letterSpacing: "0.08em", marginBottom: 10 }}>SUPPORTING PROJECTS</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {exp.projects.map((proj) => <InnerPill key={proj} t={t}>{proj}</InnerPill>)}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ── CONTACT ────────────────────────────────────────────────────────────────
function Contact({ t }) {
  const [ref, v] = useReveal();
  const isMobile = useIsMobile();
  const p = t.p;
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    // TODO: connect EmailJS here (service ID, template ID, public key)
    setTimeout(() => {
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus(null), 4000);
    }, 1000);
  };

  const inputStyle = {
    width: "100%", padding: "12px 14px",
    background: p.inputBg, border: `1px solid ${p.innerBorder}`,
    borderRadius: 8, color: t.text, fontSize: 14,
    outline: "none", boxSizing: "border-box",
    transition: "border-color 0.2s", fontFamily: "inherit",
  };
  const focus = (e) => (e.target.style.borderColor = "#7c3aed");
  const blur = (e) => (e.target.style.borderColor = p.innerBorder);

  const lavenderCard = {
    background: p.cardGrad, border: `1px solid ${p.border}`,
    borderRadius: 14, boxShadow: p.shadow, transition: "all 0.22s ease",
  };

  const services = [
    { title: "Frontend Development", desc: "Responsive websites and modern React applications." },
    { title: "Website Design", desc: "Clean, responsive interfaces focused on usability." },
    { title: "AI-Powered Applications", desc: "AI integrations and intelligent application experiences." },
    { title: "Business Automation", desc: "AI-assisted workflows and automation solutions." },
  ];

  return (
    <section id="contact" style={{ background: t.bgAlt, padding: isMobile ? "80px 24px" : "100px 8%" }}>
      <div ref={ref} style={{
        maxWidth: 1100, margin: "0 auto",
        opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(24px)",
        transition: "all 0.6s ease",
      }}>
        <p style={{ fontSize: 12, fontWeight: 600, color: t.textMuted, letterSpacing: "0.1em", marginBottom: 12 }}>CONTACT</p>
        <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 800, color: t.text, letterSpacing: "-0.03em", marginBottom: 48 }}>
          Let's Work Together
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 40 : 60, alignItems: "flex-start" }}>
          <div>
            <div style={{ ...lavenderCard, padding: 24, marginBottom: 24 }} {...lift(p)}>
              <p style={{ fontSize: 13, fontWeight: 600, color: t.text, marginBottom: 20 }}>What I Can Help With</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {services.map(({ title, desc }) => (
                  <div key={title} style={{ display: "flex", gap: 12 }}>
                    <span style={{ width: 4, borderRadius: 2, background: "#7c3aed", flexShrink: 0, alignSelf: "stretch", opacity: 0.75 }} />
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 600, color: t.text, marginBottom: 2 }}>{title}</p>
                      <p style={{ fontSize: 12, color: t.textSub, lineHeight: 1.5 }}>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ ...lavenderCard, padding: 24 }} {...lift(p)}>
              <p style={{ fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 6 }}>Have a project in mind?</p>
              <p style={{ fontSize: 13, color: t.textSub, marginBottom: 20 }}>Let's build something useful.</p>
              <a href="mailto:zandile.dev.sa@gmail.com" style={{
                display: "inline-block", background: PURPLE_GRAD, color: "#ffffff",
                padding: "10px 20px", borderRadius: 7, textDecoration: "none",
                fontWeight: 600, fontSize: 13, boxShadow: "0 6px 18px rgba(124,58,237,0.32)",
              }}>Get in Touch →</a>
            </div>
          </div>

          {/* Form inside a lavender gradient card */}
          <form onSubmit={handleSubmit} style={{
            display: "flex", flexDirection: "column", gap: 14,
            background: p.cardGrad, border: `1px solid ${p.border}`,
            borderRadius: 16, padding: isMobile ? 22 : 28, boxShadow: p.shadow,
          }}>
            {status === "success" && (
              <div style={{ background: t.successBg, border: "1px solid #bbf7d0", borderRadius: 8, padding: "12px 16px", color: t.successText, fontSize: 14 }}>
                Message sent successfully! ✓
              </div>
            )}
            <input type="text" placeholder="Name" required value={form.name}
              onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
              style={inputStyle} onFocus={focus} onBlur={blur} />
            <input type="email" placeholder="Email" required value={form.email}
              onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
              style={inputStyle} onFocus={focus} onBlur={blur} />
            <input type="text" placeholder="Subject" required value={form.subject}
              onChange={(e) => setForm((s) => ({ ...s, subject: e.target.value }))}
              style={inputStyle} onFocus={focus} onBlur={blur} />
            <textarea placeholder="Message" required rows={6} value={form.message}
              onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
              style={{ ...inputStyle, resize: "vertical" }} onFocus={focus} onBlur={blur} />
            <button type="submit" disabled={status === "sending"} style={{
              background: PURPLE_GRAD, color: "#ffffff", border: "none",
              padding: "13px 24px", borderRadius: 8,
              cursor: status === "sending" ? "not-allowed" : "pointer",
              fontWeight: 600, fontSize: 14, fontFamily: "inherit",
              boxShadow: "0 6px 20px rgba(124,58,237,0.35)",
              opacity: status === "sending" ? 0.7 : 1, transition: "all 0.2s",
            }}
              onMouseEnter={(e) => { if (status !== "sending") { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 10px 28px rgba(124,58,237,0.48)"; } }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(124,58,237,0.35)"; }}
            >
              {status === "sending" ? "Sending..." : "Send Message →"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

// ── FOOTER ─────────────────────────────────────────────────────────────────
function Footer({ t }) {
  const socials = [
    { label: "GitHub", href: "https://github.com/zandilekheswa5-sudo" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/zandile-kheswa-04149b244" },
    { label: "Credly", href: CREDLY_URL },
    { label: "Instagram", href: "https://instagram.com/zandile.dev" },
    { label: "TikTok", href: "https://tiktok.com/@zandile.dev" },
    { label: "X", href: "https://twitter.com/Zandile_in_tech" },
  ];

  return (
    <footer style={{ background: t.bg, borderTop: `1px solid ${t.border}`, padding: "40px 8%" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", marginBottom: 4 }}>
              <span style={{ fontSize: 16, fontWeight: 800, letterSpacing: "-0.03em", color: t.text, lineHeight: 1 }}>Zandile</span>
              <span style={{ fontSize: 16, fontWeight: 800, letterSpacing: "-0.03em", color: "#7c3aed", lineHeight: 1 }}>.</span>
              <span style={{ fontSize: 16, fontWeight: 800, letterSpacing: "-0.03em", color: t.textMuted, lineHeight: 1 }}>dev</span>
            </div>
            <p style={{ fontSize: 12, color: t.textMuted }}>Frontend Developer &amp; AI Engineer</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
            <p style={{ fontSize: 12, color: t.textMuted, fontWeight: 500 }}>Connect with me</p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              {socials.map(({ label, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={{
                  fontSize: 13, color: t.textSub, textDecoration: "none", transition: "color 0.2s",
                }}
                  onMouseEnter={(e) => (e.target.style.color = "#7c3aed")}
                  onMouseLeave={(e) => (e.target.style.color = t.textSub)}
                >{label}</a>
              ))}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, paddingTop: 20, borderTop: `1px solid ${t.border}` }}>
          <p style={{ fontSize: 12, color: t.textMuted }}>© 2026 Zandile Kheswa. All rights reserved.</p>
          <a href="mailto:zandile.dev.sa@gmail.com" style={{ fontSize: 13, color: t.textSub, textDecoration: "none" }}>zandile.dev.sa@gmail.com</a>
        </div>
      </div>
    </footer>
  );
}

// ── APP ROOT ───────────────────────────────────────────────────────────────
export default function App() {
  const [theme, setTheme] = useState("light");
  const t = themes[theme];

  return (
    <div style={{
      background: t.bg, color: t.text,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      overflowX: "hidden", width: "100%",
      transition: "background 0.3s ease, color 0.3s ease",
    }}>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body { overflow-x: hidden; width: 100%; scroll-behavior: smooth; }
        ::placeholder { color: ${t.textMuted}; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: ${t.bg}; }
        ::-webkit-scrollbar-thumb { background: ${t.border}; border-radius: 3px; }
        @media (prefers-reduced-motion: reduce) { * { transition: none !important; } }
      `}</style>
      <Navbar theme={theme} t={t} toggleTheme={() => setTheme((s) => (s === "light" ? "dark" : "light"))} />
      <Hero t={t} />
      <About t={t} />
      <Skills t={t} />
      <Projects t={t} />
      <Qualifications t={t} />
      <Contact t={t} />
      <Footer t={t} />
    </div>
  );
}