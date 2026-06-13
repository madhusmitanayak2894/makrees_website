import { useState, useEffect, useRef } from "react";
import ChatBot from "./ChatBot.jsx";

// ── SVG SOCIAL ICONS ─────────────────────────────────────────────────────────
const IconInstagram = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2"/>
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/>
  </svg>
);
const IconLinkedIn = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);
const IconX = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);
const IconFacebook = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
  </svg>
);
const IconMail = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);
const IconMenu = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);
const IconClose = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

// ── DATA ──────────────────────────────────────────────────────────────────────
const NAV_LINKS = ["Home", "Services", "Technology", "About", "Contact"];

const SERVICES = [
  { icon: "⚙️", title: "Marketing Automation", desc: "Automate your marketing pipelines, lead nurturing, and CRM workflows for maximum efficiency." },
  { icon: "📱", title: "Social Media Marketing", desc: "Data-driven social campaigns that build brand authority and drive real engagement." },
  { icon: "📧", title: "Email Marketing Campaigns", desc: "Precision-targeted email sequences that convert subscribers into loyal customers." },
  { icon: "🎯", title: "Branding & Brand Strategy", desc: "Cohesive brand identities that resonate with your audience and stand apart from competition." },
  { icon: "✏️", title: "Logo Design & Visual Identity", desc: "Distinctive logos and visual systems that tell your brand story at a glance." },
  { icon: "🎬", title: "Brand Shoots & Video Editing", desc: "Professional photography and video production that elevates your brand presence." },
  { icon: "📹", title: "Vlogging & Content Creation", desc: "Compelling content strategies that build audiences and drive organic growth." },
  { icon: "🚀", title: "Product Marketing & GTM", desc: "Go-to-market strategies that ensure your product launches with maximum impact." },
  { icon: "💡", title: "Startup Development", desc: "End-to-end business growth consulting from ideation to scale." },
  { icon: "🏢", title: "Franchise Development", desc: "Build and expand your franchise network with proven systems and strategies." },
  { icon: "💰", title: "Sales Funnel Creation", desc: "High-converting funnels and deal closure support that turn prospects into revenue." },
  { icon: "👥", title: "Recruitment & Hiring", desc: "Strategic talent acquisition solutions to build high-performance teams." },
];

const TECH_SECTORS = [
  { icon: "🤖", title: "Robotics Startups", color: "#1B2B8F" },
  { icon: "🔬", title: "STEM Education Programs", color: "#E53935" },
  { icon: "⚡", title: "Arduino & Embedded Systems", color: "#1B2B8F" },
  { icon: "🧠", title: "AI & Tech Ventures", color: "#E53935" },
];

const STATS = [
  { value: "500+", label: "Global Clients" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "50+", label: "Countries Reached" },
  { value: "10x", label: "Average Growth" },
];

const PROCESS = [
  { step: "01", title: "Discovery", desc: "Deep-dive into your goals, market, and challenges.", color: "#1B2B8F" },
  { step: "02", title: "Strategy", desc: "Custom roadmap tailored to your business objectives.", color: "#E53935" },
  { step: "03", title: "Execute", desc: "Expert team delivers with precision and speed.", color: "#1B2B8F" },
  { step: "04", title: "Scale", desc: "Optimize, iterate, and grow beyond expectations.", color: "#E53935" },
];

const SOCIAL_LINKS = [
  { icon: <IconInstagram />, href: "https://www.instagram.com/makrees_research/", label: "Instagram", bg: "linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)", color: "#fff" },
  { icon: <IconLinkedIn />, href: "https://www.linkedin.com/company/makrees-research/", label: "LinkedIn", bg: "#0077B5", color: "#fff" },
  { icon: <IconX />, href: "https://x.com/Mak_rees", label: "X", bg: "#000", color: "#fff" },
  { icon: <IconFacebook />, href: "https://www.facebook.com/profile.php?id=61582505383420", label: "Facebook", bg: "#1877F2", color: "#fff" },
  { icon: <IconMail />, href: "mailto:growth@makrees.com", label: "Email", bg: "#E53935", color: "#fff" },
];

// ── APP ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("Home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", company: "", service: "", message: "" });
  const [formStatus, setFormStatus] = useState("idle"); // idle | sending | sent | verify | error
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { window.scrollTo(0, 0); setMenuOpen(false); }, [page]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || page !== "Home") return;
    const ctx = canvas.getContext("2d");
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);
    const pts = Array.from({ length: 45 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 0.5, a: Math.random() * 0.2 + 0.05,
      c: Math.random() > 0.5 ? "27,43,143" : "229,57,53",
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.c},${p.a})`; ctx.fill();
      });
      pts.forEach((a, i) => pts.slice(i + 1).forEach(b => {
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 100) {
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(27,43,143,${0.05 * (1 - d / 100)})`; ctx.lineWidth = 0.6; ctx.stroke();
        }
      }));
      animRef.current = requestAnimationFrame(draw);
    };
    if (animRef.current) cancelAnimationFrame(animRef.current);
    draw();
    return () => { cancelAnimationFrame(animRef.current); window.removeEventListener("resize", resize); };
  }, [page]);

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in Name, Email, and Message.");
      return;
    }
    setFormStatus("sending");
    try {
      // Using FormData (multipart) — more compatible than JSON for FormSubmit
      const fd = new FormData();
      fd.append("name", formData.name);
      fd.append("email", formData.email);
      fd.append("company", formData.company || "Not provided");
      fd.append("service", formData.service || "Not specified");
      fd.append("message", formData.message);
      fd.append("_subject", `New Makrees Inquiry from ${formData.name}`);
      fd.append("_template", "table");
      fd.append("_captcha", "false");
      fd.append("_honey", "");

      const res = await fetch("https://formsubmit.co/ajax/madhusmita2894@gmail.com", {
        method: "POST",
        headers: { "Accept": "application/json" },
        body: fd,
      });
      const data = await res.json();
      if (data.success === "true" || data.success === true) {
        setFormStatus("sent");
      } else {
        setFormStatus("verify");
      }
    } catch {
      setFormStatus("verify");
    }
  };

  const handleMailto = () => {
    const subject = encodeURIComponent(`New Makrees Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company || "N/A"}\nService: ${formData.service || "N/A"}\n\nMessage:\n${formData.message}`
    );
    window.open(`mailto:madhusmita2894@gmail.com?subject=${subject}&body=${body}`, "_blank");
    setFormStatus("sent");
  };

  const navigate = (p) => setPage(p);

  return (
    <div style={{ fontFamily: "'Inter','Segoe UI',sans-serif", background: "#F8F9FC", color: "#1A1A2E", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        ::selection{background:rgba(27,43,143,.15);color:#1B2B8F}
        ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:#f0f2f8}::-webkit-scrollbar-thumb{background:rgba(27,43,143,.3);border-radius:4px}
        .fade-in{animation:fadeIn .6s ease forwards}
        @keyframes fadeIn{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        @keyframes slideUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        .card-hover{transition:transform .3s ease,box-shadow .3s ease,border-color .3s ease}
        .card-hover:hover{transform:translateY(-5px);box-shadow:0 16px 48px rgba(27,43,143,.1);border-color:rgba(27,43,143,.25)!important}
        .btn-primary{background:linear-gradient(135deg,#1B2B8F,#E53935);color:#fff;border:none;padding:14px 32px;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;transition:all .3s;font-family:inherit;letter-spacing:.2px;display:inline-block}
        .btn-primary:hover{transform:translateY(-2px);box-shadow:0 10px 28px rgba(27,43,143,.3)}
        .btn-outline{background:transparent;color:#1B2B8F;border:2px solid rgba(27,43,143,.35);padding:13px 30px;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;transition:all .3s;font-family:inherit}
        .btn-outline:hover{background:rgba(27,43,143,.06);border-color:#1B2B8F}
        .glow-text{background:linear-gradient(135deg,#1B2B8F,#E53935);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .section-label{font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#E53935;margin-bottom:12px;display:block}
        .tag{display:inline-block;background:rgba(27,43,143,.08);color:#1B2B8F;border:1px solid rgba(27,43,143,.2);border-radius:30px;padding:5px 14px;font-size:11px;font-weight:700;letter-spacing:.5px;text-transform:uppercase}
        .input-field{width:100%;background:#fff;border:1.5px solid #E2E6F0;border-radius:12px;padding:13px 16px;color:#1A1A2E;font-size:14px;outline:none;transition:border-color .2s,box-shadow .2s;font-family:inherit}
        .input-field::placeholder{color:#9AA0B4}
        .input-field:focus{border-color:#1B2B8F;box-shadow:0 0 0 3px rgba(27,43,143,.08)}
        select.input-field option{background:#fff;color:#1A1A2E}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        .nav-link{color:#4A5270;font-size:14px;font-weight:600;cursor:pointer;transition:color .2s;padding:6px 2px;background:none;border:none;font-family:inherit;letter-spacing:.2px;position:relative}
        .nav-link:hover,.nav-link.active{color:#1B2B8F}
        /* ── RESPONSIVE ── */
        .desktop-nav{display:flex;gap:32px;align-items:center}
        .mobile-menu-btn{display:none;background:none;border:none;cursor:pointer;color:#1B2B8F;padding:4px}
        .mobile-nav{display:none}
        .hero-grid{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center}
        .stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:40px;text-align:center}
        .services-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}
        .process-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:24px}
        .reach-grid{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center}
        .country-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}
        .footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:44px;margin-bottom:52px}
        .contact-grid{display:grid;grid-template-columns:1fr 1.3fr;gap:56px;align-items:start}
        .about-grid{display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:start}
        .story-grid{display:grid;grid-template-columns:1fr 1fr;gap:36px}
        .tech-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:22px}
        .tech-detail-grid{display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center}
        .values-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
        .service-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:32px;text-align:center}
        .form-row{display:grid;grid-template-columns:1fr 1fr;gap:13px}
        .hero-stats-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}
        @media(max-width:1024px){
          .services-grid{grid-template-columns:repeat(2,1fr)}
          .tech-grid{grid-template-columns:repeat(2,1fr)}
          .values-grid{grid-template-columns:repeat(2,1fr)}
          .process-grid{grid-template-columns:repeat(2,1fr)}
          .footer-grid{grid-template-columns:1fr 1fr;gap:32px}
          .service-stats{grid-template-columns:repeat(2,1fr)}
        }
        @media(max-width:768px){
          .desktop-nav{display:none!important}
          .mobile-menu-btn{display:flex!important;align-items:center}
          .mobile-nav{display:flex;flex-direction:column;gap:0;position:fixed;top:70px;left:0;right:0;background:rgba(255,255,255,.98);backdrop-filter:blur(20px);border-bottom:1px solid #E8ECF4;z-index:999;padding:8px 0;box-shadow:0 8px 24px rgba(27,43,143,.08)}
          .hero-grid{grid-template-columns:1fr!important;gap:36px!important}
          .hero-right{display:none}
          .stats-grid{grid-template-columns:repeat(2,1fr)!important;gap:20px!important}
          .services-grid{grid-template-columns:1fr!important}
          .process-grid{grid-template-columns:repeat(2,1fr)!important;gap:20px!important}
          .reach-grid{grid-template-columns:1fr!important;gap:36px!important}
          .footer-grid{grid-template-columns:1fr!important;gap:28px!important}
          .contact-grid{grid-template-columns:1fr!important;gap:32px!important}
          .about-grid{grid-template-columns:1fr!important;gap:36px!important}
          .story-grid{grid-template-columns:1fr!important;gap:20px!important}
          .tech-grid{grid-template-columns:repeat(2,1fr)!important}
          .tech-detail-grid{grid-template-columns:1fr!important;gap:32px!important}
          .values-grid{grid-template-columns:repeat(2,1fr)!important}
          .service-stats{grid-template-columns:repeat(2,1fr)!important;gap:20px!important}
          .form-row{grid-template-columns:1fr!important}
          .hero-stats-grid{grid-template-columns:repeat(2,1fr)!important}
          .cta-btns{flex-direction:column!important;gap:12px!important}
          .cta-btns button,.cta-btns a{width:100%!important;text-align:center!important}
          section{padding-left:18px!important;padding-right:18px!important}
        }
        @media(max-width:480px){
          .tech-grid{grid-template-columns:1fr!important}
          .values-grid{grid-template-columns:1fr!important}
          .service-stats{grid-template-columns:1fr!important}
          .hero-stats-grid{grid-template-columns:1fr 1fr!important}
          .process-grid{grid-template-columns:1fr!important}
        }
        .section-pad{padding:72px 28px}
        @media(max-width:768px){.section-pad{padding:48px 18px!important}}
      `}</style>

      {/* ── NAV ── */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, background: "rgba(255,255,255,0.97)", backdropFilter: "blur(20px)", borderBottom: `1px solid ${scrolled ? "rgba(27,43,143,.1)" : "rgba(27,43,143,.06)"}`, boxShadow: scrolled ? "0 4px 24px rgba(27,43,143,.08)" : "none", transition: "all .4s ease", padding: "0 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", height: 70, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div onClick={() => navigate("Home")} style={{ cursor: "pointer", display: "flex", alignItems: "center" }}>
            <img src="/makrees_logo.jpeg" alt="Makrees" style={{ height: 50, width: "auto", objectFit: "contain" }} />
          </div>
          {/* Desktop nav */}
          <div className="desktop-nav">
            {NAV_LINKS.map(l => (
              <button key={l} className={`nav-link${page === l ? " active" : ""}`} onClick={() => navigate(l)}>
                {l}
                {page === l && <span style={{ position: "absolute", bottom: -2, left: 0, right: 0, height: 2, background: "linear-gradient(90deg,#1B2B8F,#E53935)", borderRadius: 2 }} />}
              </button>
            ))}
            <button className="btn-primary" style={{ padding: "10px 22px", fontSize: 13 }} onClick={() => navigate("Contact")}>Get Started</button>
          </div>
          {/* Mobile hamburger */}
          <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <IconClose /> : <IconMenu />}
          </button>
        </div>
        {/* Mobile menu */}
        {menuOpen && (
          <div className="mobile-nav">
            {NAV_LINKS.map(l => (
              <button key={l} onClick={() => navigate(l)} style={{ background: "none", border: "none", padding: "14px 24px", fontSize: 15, fontWeight: 600, color: page === l ? "#1B2B8F" : "#4A5270", cursor: "pointer", textAlign: "left", borderBottom: "1px solid #F0F2F8", width: "100%", fontFamily: "inherit" }}>{l}</button>
            ))}
            <div style={{ padding: "14px 24px" }}>
              <button className="btn-primary" style={{ width: "100%", padding: "12px", fontSize: 14 }} onClick={() => navigate("Contact")}>Get Started</button>
            </div>
          </div>
        )}
      </nav>

      {/* ── PAGES ── */}
      <div className="fade-in" key={page} style={{ paddingTop: 70 }}>
        {page === "Home" && <HomePage navigate={navigate} canvasRef={canvasRef} />}
        {page === "Services" && <ServicesPage navigate={navigate} />}
        {page === "Technology" && <TechnologyPage navigate={navigate} />}
        {page === "About" && <AboutPage navigate={navigate} />}
        {page === "Contact" && <ContactPage formData={formData} setFormData={setFormData} formStatus={formStatus} handleSubmit={handleSubmit} handleMailto={handleMailto} />}
      </div>

      <Footer navigate={navigate} />
      <ChatBot />
    </div>
  );
}

// ── HOME ──────────────────────────────────────────────────────────────────────
function HomePage({ navigate, canvasRef }) {
  return (
    <div>
      <section style={{ position: "relative", minHeight: "calc(100vh - 70px)", display: "flex", alignItems: "center", overflow: "hidden", background: "linear-gradient(135deg,#EEF1FB 0%,#FFF5F5 50%,#F0F4FF 100%)", padding: "60px 28px 60px" }}>
        <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.6 }} />
        <div style={{ position: "absolute", top: "-10%", right: "-5%", width: "min(500px,60vw)", height: "min(500px,60vw)", borderRadius: "50%", background: "radial-gradient(circle,rgba(229,57,53,.07) 0%,transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "5%", left: "-8%", width: "min(400px,50vw)", height: "min(400px,50vw)", borderRadius: "50%", background: "radial-gradient(circle,rgba(27,43,143,.07) 0%,transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1200, margin: "0 auto", width: "100%" }}>
          <div className="hero-grid">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                <div style={{ width: 36, height: 2, background: "linear-gradient(90deg,#1B2B8F,#E53935)" }} />
                <span className="tag">Global Growth Agency</span>
              </div>
              <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(32px,5vw,62px)", fontWeight: 800, lineHeight: 1.06, color: "#0D1136", marginBottom: 22, letterSpacing: "-1.5px" }}>
                From Idea to Impact —<br />
                <span className="glow-text">We Build, Market,<br />Automate &amp; Scale</span>
              </h1>
              <p style={{ fontSize: "clamp(14px,2vw,17px)", color: "#5A6480", lineHeight: 1.8, marginBottom: 36, fontWeight: 400, maxWidth: 520 }}>
                Makrees helps businesses, startups, educational institutions, and entrepreneurs grow faster through AI-powered marketing, branding, automation, and technology solutions.
              </p>
              <div className="cta-btns" style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                <button className="btn-primary" onClick={() => navigate("Services")} style={{ fontSize: 15, padding: "14px 32px" }}>Explore Services</button>
                <button className="btn-outline" onClick={() => navigate("Contact")} style={{ fontSize: 15, padding: "14px 28px" }}>Talk to Us →</button>
              </div>
              <div style={{ display: "flex", gap: 20, marginTop: 36, flexWrap: "wrap" }}>
                {["500+ Clients", "50+ Countries", "98% Satisfaction"].map(b => (
                  <div key={b} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#E53935", flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: "#6B7A99", fontWeight: 600 }}>{b}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="hero-right" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ background: "#fff", borderRadius: 24, padding: "28px", boxShadow: "0 20px 60px rgba(27,43,143,.12)", textAlign: "center", border: "1px solid rgba(27,43,143,.06)" }}>
                <img src="/makrees_logo.jpeg" alt="Makrees" style={{ width: "75%", maxWidth: 240, height: "auto", objectFit: "contain" }} />
                <p style={{ color: "#9AA0B4", fontSize: 12, marginTop: 12, fontStyle: "italic" }}>Insights • Innovation • Impact</p>
              </div>
              <div className="hero-stats-grid">
                {STATS.map(s => (
                  <div key={s.label} className="card-hover" style={{ background: "#fff", borderRadius: 16, padding: "18px 14px", textAlign: "center", border: "1px solid rgba(27,43,143,.07)", boxShadow: "0 4px 16px rgba(27,43,143,.06)" }}>
                    <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(22px,3vw,28px)", fontWeight: 800 }} className="glow-text">{s.value}</div>
                    <div style={{ fontSize: 10, color: "#9AA0B4", marginTop: 4, fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section style={{ padding: "56px 28px", background: "#fff", borderTop: "1px solid #F0F2F8", borderBottom: "1px solid #F0F2F8" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="stats-grid">
            {STATS.map(s => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div className="glow-text" style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(36px,5vw,52px)", fontWeight: 800, lineHeight: 1 }}>{s.value}</div>
                <div style={{ color: "#9AA0B4", fontSize: 11, marginTop: 8, textTransform: "uppercase", letterSpacing: "1.5px", fontWeight: 600 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="section-pad" style={{ background: "#F8F9FC" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <span className="section-label">What We Do</span>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(26px,4vw,46px)", fontWeight: 700, color: "#0D1136", letterSpacing: "-1px" }}>End-to-End Business Solutions</h2>
            <p style={{ color: "#6B7A99", fontSize: 15, marginTop: 12, maxWidth: 500, margin: "12px auto 0", lineHeight: 1.75 }}>From brand building to growth automation.</p>
          </div>
          <div className="services-grid">
            {SERVICES.slice(0, 6).map((s, i) => (
              <div key={s.title} className="card-hover" style={{ background: "#fff", border: "1.5px solid #E8ECF4", borderRadius: 20, padding: "26px 22px" }}>
                <div style={{ width: 48, height: 48, borderRadius: 13, background: i % 2 === 0 ? "rgba(27,43,143,.07)" : "rgba(229,57,53,.07)", border: `1px solid ${i % 2 === 0 ? "rgba(27,43,143,.14)" : "rgba(229,57,53,.14)"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, marginBottom: 14 }}>{s.icon}</div>
                <h3 style={{ fontWeight: 700, fontSize: 15, color: "#0D1136", marginBottom: 8 }}>{s.title}</h3>
                <p style={{ color: "#6B7A99", fontSize: 13, lineHeight: 1.68 }}>{s.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <button className="btn-outline" onClick={() => navigate("Services")}>View All 12 Services →</button>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section-pad" style={{ background: "linear-gradient(135deg,#EEF1FB,#FFF5F5)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <span className="section-label">How It Works</span>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(26px,4vw,44px)", fontWeight: 700, color: "#0D1136", letterSpacing: "-1px" }}>Our Proven Process</h2>
          </div>
          <div className="process-grid">
            {PROCESS.map((p, i) => (
              <div key={p.step} style={{ position: "relative", textAlign: "center", padding: "0 8px" }}>
                <div style={{ width: 52, height: 52, borderRadius: "50%", background: `${p.color}12`, border: `2px solid ${p.color}40`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px", fontFamily: "'Space Grotesk',sans-serif", fontSize: 13, fontWeight: 800, color: p.color }}>{p.step}</div>
                <h3 style={{ fontWeight: 700, fontSize: 16, color: "#0D1136", marginBottom: 8 }}>{p.title}</h3>
                <p style={{ color: "#6B7A99", fontSize: 13, lineHeight: 1.65 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GLOBAL REACH */}
      <section className="section-pad" style={{ background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="reach-grid">
            <div>
              <span className="section-label">Global Reach</span>
              <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(24px,3.5vw,44px)", fontWeight: 700, color: "#0D1136", letterSpacing: "-1px", lineHeight: 1.1, marginBottom: 20 }}>Your Business,<br />Everywhere in the World</h2>
              <p style={{ color: "#6B7A99", fontSize: 14, lineHeight: 1.82, marginBottom: 26 }}>We work with clients worldwide, helping businesses build strong brands, generate leads, and achieve sustainable growth.</p>
              {["Strong brand building", "Lead generation at scale", "Franchise expansion support", "Sustainable business growth"].map(item => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 11 }}>
                  <div style={{ width: 20, height: 20, borderRadius: "50%", background: "linear-gradient(135deg,#1B2B8F,#E53935)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#fff", flexShrink: 0 }}>✓</div>
                  <span style={{ color: "#4A5270", fontSize: 14 }}>{item}</span>
                </div>
              ))}
              <button className="btn-primary" style={{ marginTop: 28 }} onClick={() => navigate("Contact")}>Start Your Growth Journey</button>
            </div>
            <div className="country-grid">
              {["🇺🇸 USA", "🇬🇧 UK", "🇮🇳 India", "🇦🇪 UAE", "🇦🇺 Australia", "🇸🇬 Singapore", "🇨🇦 Canada", "🌍 +43 More"].map(c => (
                <div key={c} className="card-hover" style={{ background: "#F8F9FC", border: "1.5px solid #E8ECF4", borderRadius: 14, padding: "16px 12px", textAlign: "center", fontSize: 13, color: "#4A5270", fontWeight: 500 }}>{c}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "72px 28px", background: "linear-gradient(135deg,#1B2B8F,#2D3FBE,#E53935)" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(26px,4vw,46px)", fontWeight: 800, color: "#fff", letterSpacing: "-1.5px", marginBottom: 16 }}>Ready to Scale with Makrees?</h2>
          <p style={{ color: "rgba(255,255,255,.82)", fontSize: 15, maxWidth: 440, margin: "0 auto 36px", lineHeight: 1.75 }}>End-to-end solutions tailored to your goals.</p>
          <div className="cta-btns" style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
            <button onClick={() => navigate("Contact")} style={{ background: "#fff", color: "#1B2B8F", border: "none", padding: "14px 32px", borderRadius: 50, fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: "inherit" }}>Book a Free Consultation</button>
            <button onClick={() => navigate("Services")} style={{ background: "transparent", color: "#fff", border: "2px solid rgba(255,255,255,.5)", padding: "14px 28px", borderRadius: 50, fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: "inherit" }}>See Our Services</button>
          </div>
        </div>
      </section>
    </div>
  );
}

// ── SERVICES ──────────────────────────────────────────────────────────────────
function ServicesPage({ navigate }) {
  return (
    <div>
      <section style={{ padding: "72px 28px 48px", textAlign: "center", background: "linear-gradient(135deg,#EEF1FB,#FFF5F5)" }}>
        <span className="section-label">Our Services</span>
        <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(28px,5vw,54px)", fontWeight: 800, color: "#0D1136", letterSpacing: "-2px", marginBottom: 16 }}>Complete Business<br /><span className="glow-text">Growth Solutions</span></h1>
        <p style={{ color: "#6B7A99", fontSize: 15, lineHeight: 1.75, maxWidth: 600, margin: "0 auto" }}>12 specialized services covering every aspect of building, marketing, and scaling your business worldwide.</p>
      </section>
      <section style={{ padding: "16px 28px 80px", background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="services-grid" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))" }}>
            {SERVICES.map((s, i) => (
              <div key={s.title} className="card-hover" style={{ background: "#F8F9FC", border: "1.5px solid #E8ECF4", borderRadius: 20, padding: "30px 24px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: -12, right: -12, fontSize: 64, opacity: 0.05 }}>{s.icon}</div>
                <div style={{ width: 46, height: 46, borderRadius: 13, background: i % 2 === 0 ? "rgba(27,43,143,.08)" : "rgba(229,57,53,.08)", border: `1px solid ${i % 2 === 0 ? "rgba(27,43,143,.15)" : "rgba(229,57,53,.15)"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, marginBottom: 14 }}>{s.icon}</div>
                <div style={{ fontSize: 10, fontWeight: 700, color: i % 2 === 0 ? "#1B2B8F" : "#E53935", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 6 }}>Service {String(i + 1).padStart(2, "0")}</div>
                <h3 style={{ fontWeight: 700, fontSize: 15, color: "#0D1136", marginBottom: 9 }}>{s.title}</h3>
                <p style={{ color: "#6B7A99", fontSize: 13, lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ maxWidth: 820, margin: "48px auto 0", textAlign: "center", background: "linear-gradient(135deg,#1B2B8F,#E53935)", borderRadius: 24, padding: "48px 32px" }}>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(22px,3vw,32px)", fontWeight: 700, color: "#fff", marginBottom: 12 }}>Need a Custom Package?</h2>
            <p style={{ color: "rgba(255,255,255,.82)", fontSize: 14, marginBottom: 28, lineHeight: 1.7 }}>Let Makrees build a tailored strategy matching your exact goals and budget.</p>
            <button onClick={() => navigate("Contact")} style={{ background: "#fff", color: "#1B2B8F", border: "none", padding: "13px 32px", borderRadius: 50, fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "inherit" }}>Request a Custom Proposal</button>
          </div>
        </div>
      </section>
    </div>
  );
}

// ── TECHNOLOGY ────────────────────────────────────────────────────────────────
function TechnologyPage({ navigate }) {
  return (
    <div>
      <section style={{ padding: "72px 28px 48px", textAlign: "center", background: "linear-gradient(135deg,#EEF1FB,#FFF5F5)" }}>
        <span className="section-label">Technology & Innovation</span>
        <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(28px,5vw,54px)", fontWeight: 800, color: "#0D1136", letterSpacing: "-2px", marginBottom: 16 }}>Powering <span className="glow-text">Future-Ready</span><br />Tech Ventures</h1>
        <p style={{ color: "#6B7A99", fontSize: 15, lineHeight: 1.75, maxWidth: 600, margin: "0 auto" }}>Makrees specializes in promoting and scaling businesses in advanced technology sectors.</p>
      </section>
      <section style={{ padding: "16px 28px 64px", background: "#fff" }}>
        <div style={{ maxWidth: 1060, margin: "0 auto" }}>
          <div className="tech-grid">
            {TECH_SECTORS.map(t => (
              <div key={t.title} className="card-hover" style={{ background: "#F8F9FC", border: "1.5px solid #E8ECF4", borderRadius: 24, padding: "44px 20px", textAlign: "center" }}>
                <div style={{ width: 76, height: 76, borderRadius: "50%", margin: "0 auto 20px", background: `${t.color}0D`, border: `2px solid ${t.color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32 }}>{t.icon}</div>
                <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 16, color: "#0D1136", marginBottom: 14 }}>{t.title}</h3>
                <div style={{ width: 32, height: 3, background: `linear-gradient(90deg,${t.color},${t.color}80)`, margin: "0 auto", borderRadius: 2 }} />
              </div>
            ))}
          </div>
        </div>
      </section>
      <section style={{ padding: "32px 28px 80px", background: "linear-gradient(135deg,#EEF1FB,#FFF5F5)" }}>
        <div style={{ maxWidth: 1060, margin: "0 auto" }}>
          <div className="tech-detail-grid">
            <div>
              <span className="section-label">Why Makrees for Tech</span>
              <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(22px,3vw,38px)", fontWeight: 700, color: "#0D1136", letterSpacing: "-1px", marginBottom: 18, lineHeight: 1.2 }}>The Future is Technology-Driven</h2>
              <p style={{ color: "#6B7A99", fontSize: 14, lineHeight: 1.85, marginBottom: 18 }}>Makrees helps robotics companies, STEM programs, AI ventures, and embedded systems businesses get the marketing and growth infrastructure they need to scale globally.</p>
              <button className="btn-primary" onClick={() => navigate("Contact")} style={{ marginTop: 8 }}>Partner With Makrees →</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {["Deep understanding of tech markets", "Investor-ready branding & pitch decks", "STEM & EdTech marketing expertise", "Robotics & hardware launch support", "AI startup growth acceleration", "Global tech community connections"].map(item => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 12, background: "#fff", border: "1.5px solid #E8ECF4", borderRadius: 12, padding: "12px 16px" }}>
                  <div style={{ width: 20, height: 20, borderRadius: "50%", background: "linear-gradient(135deg,#1B2B8F,#E53935)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#fff", flexShrink: 0 }}>✓</div>
                  <span style={{ color: "#4A5270", fontSize: 13 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ── ABOUT ─────────────────────────────────────────────────────────────────────
function AboutPage({ navigate }) {
  return (
    <div>
      <section style={{ padding: "72px 28px 48px", textAlign: "center", background: "linear-gradient(135deg,#EEF1FB,#FFF5F5)" }}>
        <span className="section-label">About Makrees</span>
        <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(28px,5vw,54px)", fontWeight: 800, color: "#0D1136", letterSpacing: "-2px", marginBottom: 16 }}>We Turn Ambition Into<br /><span className="glow-text">Global Impact</span></h1>
      </section>

      {/* FOUNDER SECTION */}
      <section className="section-pad" style={{ background: "#fff" }}>
        <div style={{ maxWidth: 1060, margin: "0 auto" }}>
          <div className="about-grid" style={{ alignItems: "center" }}>
            {/* Founder Image */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
              <div style={{ position: "relative" }}>
                <div style={{ width: "min(320px,85vw)", height: "min(380px,100vw)", borderRadius: 28, overflow: "hidden", boxShadow: "0 24px 64px rgba(27,43,143,.18)", border: "4px solid #fff" }}>
                  <img src="/founder.jpeg" alt="Founder - Makrees" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }} />
                </div>
                {/* Floating badge */}
                <div style={{ position: "absolute", bottom: -16, left: "50%", transform: "translateX(-50%)", background: "linear-gradient(135deg,#1B2B8F,#E53935)", borderRadius: 50, padding: "10px 22px", whiteSpace: "nowrap", boxShadow: "0 8px 24px rgba(27,43,143,.3)" }}>
                  <span style={{ color: "#fff", fontSize: 13, fontWeight: 700 }}>⭐ Founder & CEO</span>
                </div>
              </div>
              <div style={{ textAlign: "center", marginTop: 24 }}>
                <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 22, fontWeight: 800, color: "#0D1136", marginBottom: 4 }}>Madhusmita Nayak</h3>
                <p style={{ color: "#E53935", fontSize: 13, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 14 }}>Founder & CEO, Makrees Research</p>
                <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
                  {[
                    { icon: <IconLinkedIn />, href: "https://www.linkedin.com/company/makrees-research/", bg: "#0077B5" },
                    { icon: <IconInstagram />, href: "https://www.instagram.com/makrees_research/", bg: "linear-gradient(135deg,#833ab4,#fd1d1d)" },
                    { icon: <IconX />, href: "https://x.com/Mak_rees", bg: "#000" },
                  ].map((s, i) => (
                    <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" style={{ width: 36, height: 36, borderRadius: "50%", background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", textDecoration: "none" }}>{s.icon}</a>
                  ))}
                </div>
              </div>
            </div>

            {/* Founder Bio */}
            <div>
              <span className="section-label">Meet the Founder</span>
              <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(22px,3vw,34px)", fontWeight: 700, color: "#0D1136", marginBottom: 20, letterSpacing: "-0.5px", lineHeight: 1.2 }}>Visionary Leader Behind Makrees</h2>
              <p style={{ color: "#5A6480", fontSize: 14, lineHeight: 1.88, marginBottom: 16 }}>
                Madhusmita Nayak is the founder and driving force behind Makrees Research, a global AI-powered marketing and business growth company. With a deep passion for technology, strategic marketing, and entrepreneurship, she built Makrees with a singular vision — to empower businesses worldwide through innovation and intelligent growth strategies.
              </p>
              <p style={{ color: "#5A6480", fontSize: 14, lineHeight: 1.88, marginBottom: 16 }}>
                Her journey began with a clear observation: countless startups and businesses had exceptional ideas but lacked the right marketing infrastructure to grow. Madhusmita set out to bridge that gap — combining her expertise in AI, automation, branding, and business development to create powerful growth systems for clients across 50+ countries.
              </p>
              <p style={{ color: "#5A6480", fontSize: 14, lineHeight: 1.88, marginBottom: 24 }}>
                Under her leadership, Makrees has grown into a trusted partner for startups, entrepreneurs, educational institutions, and technology ventures — from Robotics and STEM education to AI-driven businesses and franchise networks.
              </p>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                {["AI & Marketing Expert", "Global Business Strategist", "Tech Entrepreneur"].map(tag => (
                  <span key={tag} style={{ background: "rgba(27,43,143,.07)", color: "#1B2B8F", border: "1px solid rgba(27,43,143,.15)", borderRadius: 30, padding: "6px 14px", fontSize: 12, fontWeight: 700 }}>{tag}</span>
                ))}
              </div>
              <blockquote style={{ borderLeft: "3px solid #E53935", paddingLeft: 18, marginTop: 24 }}>
                <p style={{ color: "#0D1136", fontSize: 15, fontStyle: "italic", lineHeight: 1.7, fontWeight: 500 }}>"At Makrees, we don't just market companies — we help build their future. Every business has the potential to make a global impact."</p>
                <cite style={{ color: "#E53935", fontSize: 12, fontWeight: 700, fontStyle: "normal", display: "block", marginTop: 8 }}>— Madhusmita Nayak, Founder & CEO</cite>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT CONTENT */}
      <section className="section-pad" style={{ background: "#F8F9FC" }}>
        <div style={{ maxWidth: 1060, margin: "0 auto" }}>
          <div className="about-grid">
            <div>
              <span className="section-label">Who We Are</span>
              <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(22px,3vw,32px)", fontWeight: 700, color: "#0D1136", marginBottom: 18, letterSpacing: "-0.5px" }}>About Makrees</h2>
              <p style={{ color: "#5A6480", fontSize: 14, lineHeight: 1.88, marginBottom: 14 }}>Makrees is a global AI-powered marketing and business growth company dedicated to helping startups, entrepreneurs, educational institutions, and established businesses scale faster and smarter.</p>
              <p style={{ color: "#5A6480", fontSize: 14, lineHeight: 1.88, marginBottom: 14 }}>We combine innovation, automation, branding, and strategic marketing to create powerful growth systems that generate leads, increase visibility, and drive revenue.</p>
              <p style={{ color: "#5A6480", fontSize: 14, lineHeight: 1.88, marginBottom: 14 }}>Our expertise extends beyond traditional marketing. We actively support startups in product marketing, business development, robotics, STEM education, Arduino-based innovations, and technology-driven ventures.</p>
              <p style={{ color: "#5A6480", fontSize: 14, lineHeight: 1.88 }}>Whether you're launching a startup, expanding your market reach, building a franchise network, or seeking a complete marketing transformation, Makrees is your trusted partner in growth.</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ background: "linear-gradient(135deg,rgba(27,43,143,.05),rgba(27,43,143,.02))", border: "1.5px solid rgba(27,43,143,.12)", borderRadius: 20, padding: "26px 22px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 12 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 11, background: "rgba(27,43,143,.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🎯</div>
                  <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 17, color: "#1B2B8F" }}>Our Mission</h3>
                </div>
                <p style={{ color: "#5A6480", fontSize: 13, lineHeight: 1.78 }}>To empower businesses worldwide through AI-driven marketing, automation, branding, and innovative growth strategies.</p>
              </div>
              <div style={{ background: "linear-gradient(135deg,rgba(229,57,53,.05),rgba(229,57,53,.02))", border: "1.5px solid rgba(229,57,53,.12)", borderRadius: 20, padding: "26px 22px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 12 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 11, background: "rgba(229,57,53,.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🌐</div>
                  <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 17, color: "#E53935" }}>Our Vision</h3>
                </div>
                <p style={{ color: "#5A6480", fontSize: 13, lineHeight: 1.78 }}>To become a globally recognized leader in AI-powered business growth, helping organizations build stronger brands and achieve sustainable success.</p>
              </div>
              <div style={{ background: "#fff", border: "1.5px solid #E8ECF4", borderRadius: 20, padding: "20px", textAlign: "center" }}>
                <img src="/makrees_logo.jpeg" alt="Makrees" style={{ width: "70%", maxWidth: 200, height: "auto", objectFit: "contain" }} />
              </div>
            </div>
          </div>

          {/* OUR STORY */}
          <div style={{ background: "linear-gradient(135deg,#EEF1FB,#FFF5F5)", borderRadius: 24, padding: "clamp(28px,4vw,48px)", marginTop: 48 }}>
            <span className="section-label">Our Journey</span>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(22px,3vw,30px)", fontWeight: 700, color: "#0D1136", marginBottom: 22, letterSpacing: "-0.5px" }}>Our Story</h2>
            <div className="story-grid">
              <div>
                <p style={{ color: "#5A6480", fontSize: 14, lineHeight: 1.88, marginBottom: 14 }}>Makrees was founded with a vision to help businesses grow in the digital age through innovation, technology, and strategic marketing.</p>
                <p style={{ color: "#5A6480", fontSize: 14, lineHeight: 1.88 }}>We saw that many startups and businesses had great ideas but lacked the right marketing, branding, and growth strategies to reach their full potential. That's where Makrees comes in.</p>
              </div>
              <div>
                <p style={{ color: "#5A6480", fontSize: 14, lineHeight: 1.88, marginBottom: 14 }}>Today, we help businesses worldwide with AI-powered marketing, automation, branding, social media growth, content creation, lead generation, franchise development, and business expansion. We also support technology-driven ventures in Robotics, STEM Education, and Arduino innovation.</p>
                <p style={{ color: "#1B2B8F", fontSize: 14, lineHeight: 1.88, fontWeight: 600 }}>Our mission is simple: to transform ideas into brands, brands into businesses, and businesses into success stories. At Makrees, we don't just market companies — we help build their future.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="section-pad" style={{ background: "#fff" }}>
        <div style={{ maxWidth: 1060, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <span className="section-label">Our Values</span>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(22px,3vw,36px)", fontWeight: 700, color: "#0D1136" }}>What Drives Us</h2>
          </div>
          <div className="values-grid">
            {[
              { icon: "🎯", title: "Results-First", desc: "Every strategy built around measurable outcomes and real business impact." },
              { icon: "🌐", title: "Global Mindset", desc: "50+ countries. We think globally while executing locally." },
              { icon: "⚡", title: "Speed & Agility", desc: "Fast execution without compromising quality or strategic depth." },
              { icon: "🤝", title: "True Partnership", desc: "We treat your business as our own — invested in your success." },
            ].map(v => (
              <div key={v.title} className="card-hover" style={{ background: "#F8F9FC", border: "1.5px solid #E8ECF4", borderRadius: 18, padding: "24px 18px", textAlign: "center" }}>
                <div style={{ fontSize: 30, marginBottom: 12 }}>{v.icon}</div>
                <h3 style={{ fontWeight: 700, fontSize: 15, color: "#0D1136", marginBottom: 7 }}>{v.title}</h3>
                <p style={{ color: "#6B7A99", fontSize: 13, lineHeight: 1.65 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ padding: "60px 28px", background: "linear-gradient(135deg,#1B2B8F,#2D3FBE,#E53935)" }}>
        <div style={{ maxWidth: 1060, margin: "0 auto" }}>
          <div className="service-stats">
            {STATS.map(s => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(36px,5vw,48px)", fontWeight: 800, color: "#fff", lineHeight: 1 }}>{s.value}</div>
                <div style={{ color: "rgba(255,255,255,.7)", fontSize: 11, marginTop: 8, textTransform: "uppercase", letterSpacing: "1.5px", fontWeight: 600 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "64px 28px", background: "#F8F9FC", textAlign: "center" }}>
        <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(22px,3vw,34px)", fontWeight: 700, color: "#0D1136", marginBottom: 12 }}>Let's Build Something Extraordinary</h2>
        <p style={{ color: "#6B7A99", fontSize: 15, marginBottom: 32, lineHeight: 1.7 }}>Your idea deserves global impact. Let Makrees make it happen.</p>
        <button className="btn-primary" onClick={() => navigate("Contact")} style={{ fontSize: 15, padding: "14px 32px" }}>Start the Conversation →</button>
      </section>
    </div>
  );
}

// ── CONTACT ───────────────────────────────────────────────────────────────────
function ContactPage({ formData, setFormData, formStatus, handleSubmit, handleMailto }) {
  const update = (k, v) => setFormData(p => ({ ...p, [k]: v }));
  return (
    <div>
      <section style={{ padding: "72px 28px 44px", textAlign: "center", background: "linear-gradient(135deg,#EEF1FB,#FFF5F5)" }}>
        <span className="section-label">Get in Touch</span>
        <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(28px,5vw,54px)", fontWeight: 800, color: "#0D1136", letterSpacing: "-2px", marginBottom: 16 }}>Let's Grow Your<br /><span className="glow-text">Business Together</span></h1>
        <p style={{ color: "#6B7A99", fontSize: 15, lineHeight: 1.75, maxWidth: 520, margin: "0 auto" }}>Makrees will reply within 24 hours with a tailored growth plan for your business.</p>
      </section>
      <section style={{ padding: "36px 28px 80px", background: "#fff" }}>
        <div style={{ maxWidth: 1060, margin: "0 auto" }}>
          <div className="contact-grid">
            {/* Info */}
            <div>
              <div style={{ display: "flex", flexDirection: "column", gap: 18, marginBottom: 32 }}>
                {[
                  { icon: "📧", label: "Email", val: "growth@makrees.com", href: "mailto:growth@makrees.com" },
                  { icon: "📞", label: "Phone / WhatsApp", val: "+91 7894357177", href: `https://wa.me/917894357177?text=${encodeURIComponent("Hi Makrees! I'd like to know more about your services.")}` },
                  { icon: "🌐", label: "Website", val: "www.makrees.com", href: "https://www.makrees.com" },
                  { icon: "📍", label: "Global HQ", val: "Serving 50+ Countries Worldwide", href: null },
                ].map(c => (
                  <div key={c.label} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(27,43,143,.07)", border: "1.5px solid rgba(27,43,143,.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{c.icon}</div>
                    <div>
                      <div style={{ fontSize: 10, color: "#9AA0B4", textTransform: "uppercase", letterSpacing: "1px", fontWeight: 700, marginBottom: 3 }}>{c.label}</div>
                      {c.href ? <a href={c.href} style={{ color: "#1B2B8F", fontSize: 14, fontWeight: 600, textDecoration: "none" }}>{c.val}</a> : <div style={{ color: "#4A5270", fontSize: 14 }}>{c.val}</div>}
                    </div>
                  </div>
                ))}
              </div>
              {/* Social */}
              <div style={{ background: "linear-gradient(135deg,rgba(27,43,143,.04),rgba(229,57,53,.04))", border: "1.5px solid rgba(27,43,143,.08)", borderRadius: 18, padding: "22px 18px" }}>
                <h3 style={{ fontWeight: 700, fontSize: 14, color: "#0D1136", marginBottom: 16 }}>Connect With Us</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                  {SOCIAL_LINKS.map(s => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", padding: "8px 12px", borderRadius: 12, background: "rgba(255,255,255,.7)", border: "1px solid #E8ECF4", transition: "all .2s" }}>
                      <div style={{ width: 34, height: 34, borderRadius: 9, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", color: s.color, flexShrink: 0 }}>{s.icon}</div>
                      <span style={{ color: "#4A5270", fontSize: 13, fontWeight: 600 }}>{s.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* FORM */}
            <div style={{ background: "#F8F9FC", border: "1.5px solid #E8ECF4", borderRadius: 24, padding: "32px 28px" }}>
              {formStatus === "sent" ? (
                <div style={{ textAlign: "center", padding: "60px 20px" }}>
                  <div style={{ fontSize: 56, marginBottom: 18 }}>🚀</div>
                  <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 26, fontWeight: 700, color: "#0D1136", marginBottom: 12 }}>Message Sent!</h2>
                  <p style={{ color: "#6B7A99", fontSize: 14, lineHeight: 1.75 }}>Thank you! Your message has been received. Our team will get back to you within 24 hours.</p>
                </div>
              ) : (
                <>
                  <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 20, color: "#0D1136", marginBottom: 24 }}>Tell Us About Your Goals</h2>
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    <div className="form-row">
                      <div><label style={{ display: "block", fontSize: 10, color: "#9AA0B4", marginBottom: 6, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".5px" }}>Full Name *</label><input className="input-field" placeholder="Your name" value={formData.name} onChange={e => update("name", e.target.value)} /></div>
                      <div><label style={{ display: "block", fontSize: 10, color: "#9AA0B4", marginBottom: 6, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".5px" }}>Email *</label><input className="input-field" type="email" placeholder="your@email.com" value={formData.email} onChange={e => update("email", e.target.value)} /></div>
                    </div>
                    <div><label style={{ display: "block", fontSize: 10, color: "#9AA0B4", marginBottom: 6, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".5px" }}>Company Name</label><input className="input-field" placeholder="Your company or startup" value={formData.company} onChange={e => update("company", e.target.value)} /></div>
                    <div><label style={{ display: "block", fontSize: 10, color: "#9AA0B4", marginBottom: 6, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".5px" }}>Service Needed</label>
                      <select className="input-field" value={formData.service} onChange={e => update("service", e.target.value)} style={{ cursor: "pointer" }}>
                        <option value="">Select a service...</option>
                        {SERVICES.map(s => <option key={s.title} value={s.title}>{s.title}</option>)}
                        <option value="Multiple Services">Multiple Services / Full Package</option>
                      </select>
                    </div>
                    <div><label style={{ display: "block", fontSize: 10, color: "#9AA0B4", marginBottom: 6, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".5px" }}>Your Goals & Message *</label><textarea className="input-field" rows={5} placeholder="Tell us about your business, challenges, and what you want to achieve..." value={formData.message} onChange={e => update("message", e.target.value)} style={{ resize: "vertical" }} /></div>
                    <button className="btn-primary" onClick={handleSubmit} disabled={formStatus === "sending"} style={{ fontSize: 14, padding: "14px", opacity: formStatus === "sending" ? 0.7 : 1, cursor: formStatus === "sending" ? "not-allowed" : "pointer" }}>
                      {formStatus === "sending" ? "⏳ Sending..." : "Send Message & Get Your Growth Plan →"}
                    </button>
                    {(formStatus === "error" || formStatus === "verify") && (
                      <div style={{ background: "rgba(229,57,53,.06)", border: "1.5px solid rgba(229,57,53,.2)", borderRadius: 12, padding: "16px", textAlign: "center" }}>
                        <p style={{ fontSize: 13, color: "#E53935", fontWeight: 600, marginBottom: 6 }}>⚠️ Submission needs activation</p>
                        <p style={{ fontSize: 12, color: "#6B7A99", lineHeight: 1.6, marginBottom: 12 }}>
                          Please check <strong>madhusmita2894@gmail.com</strong> inbox for an email from <strong>FormSubmit</strong> and click <strong>"Activate Form"</strong>. Then try again.
                        </p>
                        <p style={{ fontSize: 12, color: "#6B7A99", marginBottom: 12 }}>OR send directly right now:</p>
                        <button onClick={handleMailto} style={{ background: "linear-gradient(135deg,#1B2B8F,#E53935)", color: "#fff", border: "none", padding: "10px 24px", borderRadius: 50, fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
                          📧 Send via Gmail directly
                        </button>
                      </div>
                    )}
                    <p style={{ textAlign: "center", fontSize: 11, color: "#B0B8CC" }}>We respond within 24 hours. No spam, ever.</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ── FOOTER ────────────────────────────────────────────────────────────────────
function Footer({ navigate }) {
  return (
    <footer style={{ borderTop: "1px solid #E8ECF4", padding: "56px 28px 24px", background: "#0D1136" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="footer-grid">
          <div>
            <div style={{ marginBottom: 16, cursor: "pointer", display: "inline-block" }} onClick={() => navigate("Home")}>
              <img src="/makrees_logo.jpeg" alt="Makrees" style={{ height: 52, width: "auto", objectFit: "contain", background: "#fff", borderRadius: 10, padding: "5px 8px" }} />
            </div>
            <p style={{ color: "#6B7A8C", fontSize: 13, lineHeight: 1.78, maxWidth: 250, marginBottom: 20 }}>From Idea to Impact — We Build, Market, Automate, and Scale Businesses Worldwide.</p>
            {/* Social Icons */}
            <div style={{ display: "flex", gap: 9, flexWrap: "wrap" }}>
              {SOCIAL_LINKS.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" title={s.label}
                  style={{ width: 36, height: 36, borderRadius: "50%", background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", color: s.color, textDecoration: "none", flexShrink: 0 }}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 style={{ fontSize: 11, fontWeight: 700, color: "#fff", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: 16 }}>Company</h4>
            {["Home", "About", "Services", "Technology", "Contact"].map(l => (
              <div key={l} style={{ marginBottom: 9 }}>
                <button onClick={() => navigate(l)} style={{ background: "none", border: "none", color: "#6B7A8C", fontSize: 13, cursor: "pointer", fontFamily: "inherit", padding: 0, transition: "color .2s" }}
                  onMouseOver={e => e.target.style.color = "#fff"} onMouseOut={e => e.target.style.color = "#6B7A8C"}>{l}</button>
              </div>
            ))}
          </div>
          <div>
            <h4 style={{ fontSize: 11, fontWeight: 700, color: "#fff", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: 16 }}>Services</h4>
            {["Marketing Automation", "Social Media", "Branding", "Video Production", "Startup Growth", "Recruitment"].map(s => (
              <div key={s} style={{ marginBottom: 9 }}><span style={{ color: "#6B7A8C", fontSize: 13 }}>{s}</span></div>
            ))}
          </div>
          <div>
            <h4 style={{ fontSize: 11, fontWeight: 700, color: "#fff", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: 16 }}>Contact</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              <a href="mailto:growth@makrees.com" style={{ color: "#6B7A8C", fontSize: 13, textDecoration: "none", display: "flex", alignItems: "center", gap: 7 }}><IconMail /> growth@makrees.com</a>
              <a href="tel:+917894357177" style={{ color: "#6B7A8C", fontSize: 13, textDecoration: "none" }}>📞 +91 7894357177</a>
              <a href="https://www.instagram.com/makrees_research/" target="_blank" rel="noopener noreferrer" style={{ color: "#6B7A8C", fontSize: 13, textDecoration: "none", display: "flex", alignItems: "center", gap: 7 }}><IconInstagram /> Instagram</a>
              <a href="https://www.linkedin.com/company/makrees-research/" target="_blank" rel="noopener noreferrer" style={{ color: "#6B7A8C", fontSize: 13, textDecoration: "none", display: "flex", alignItems: "center", gap: 7 }}><IconLinkedIn /> LinkedIn</a>
              <a href="https://x.com/Mak_rees" target="_blank" rel="noopener noreferrer" style={{ color: "#6B7A8C", fontSize: 13, textDecoration: "none", display: "flex", alignItems: "center", gap: 7 }}><IconX /> X (Twitter)</a>
              <a href="https://www.facebook.com/profile.php?id=61582505383420" target="_blank" rel="noopener noreferrer" style={{ color: "#6B7A8C", fontSize: 13, textDecoration: "none", display: "flex", alignItems: "center", gap: 7 }}><IconFacebook /> Facebook</a>
            </div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,.07)", paddingTop: 22, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
          <span style={{ color: "#3A4560", fontSize: 12 }}>© 2026 Makrees. All rights reserved.</span>
          <div style={{ display: "flex", gap: 20 }}>
            <span style={{ color: "#3A4560", fontSize: 12, cursor: "pointer" }}>Privacy Policy</span>
            <span style={{ color: "#3A4560", fontSize: 12, cursor: "pointer" }}>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
