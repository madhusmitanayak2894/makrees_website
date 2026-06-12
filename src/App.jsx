import { useState, useEffect, useRef } from "react";

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

export default function App() {
  const [page, setPage] = useState("Home");
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", company: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || page !== "Home") return;
    const ctx = canvas.getContext("2d");
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);
    const pts = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 0.5, a: Math.random() * 0.25 + 0.05,
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
          ctx.strokeStyle = `rgba(27,43,143,${0.06 * (1 - d / 100)})`; ctx.lineWidth = 0.6; ctx.stroke();
        }
      }));
      animRef.current = requestAnimationFrame(draw);
    };
    if (animRef.current) cancelAnimationFrame(animRef.current);
    draw();
    return () => { cancelAnimationFrame(animRef.current); window.removeEventListener("resize", resize); };
  }, [page]);

  const navigate = (p) => setPage(p);
  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <div style={{ fontFamily: "'Inter','Segoe UI',sans-serif", background: "#F8F9FC", color: "#1A1A2E", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        ::selection{background:#1B2B8F22;color:#1B2B8F}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-track{background:#f0f2f8}
        ::-webkit-scrollbar-thumb{background:#1B2B8F40;border-radius:4px}
        .fade-in{animation:fadeIn .65s ease forwards}
        @keyframes fadeIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        .card-hover{transition:transform .3s ease,box-shadow .3s ease,border-color .3s ease}
        .card-hover:hover{transform:translateY(-6px);box-shadow:0 20px 56px rgba(27,43,143,.12);border-color:rgba(27,43,143,.3)!important}
        .btn-primary{background:linear-gradient(135deg,#1B2B8F,#E53935);color:#fff;border:none;padding:14px 32px;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;transition:all .3s;font-family:inherit;letter-spacing:.2px}
        .btn-primary:hover{transform:translateY(-2px);box-shadow:0 12px 32px rgba(27,43,143,.3)}
        .btn-outline{background:transparent;color:#1B2B8F;border:2px solid rgba(27,43,143,.35);padding:13px 30px;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;transition:all .3s;font-family:inherit}
        .btn-outline:hover{background:rgba(27,43,143,.06);border-color:#1B2B8F}
        .glow-text{background:linear-gradient(135deg,#1B2B8F,#E53935);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .nav-link{color:#4A5270;font-size:14px;font-weight:600;cursor:pointer;transition:color .2s;padding:6px 2px;background:none;border:none;font-family:inherit;letter-spacing:.2px;position:relative}
        .nav-link:hover,.nav-link.active{color:#1B2B8F}
        .section-label{font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#E53935;margin-bottom:12px;display:block}
        .tag{display:inline-block;background:rgba(27,43,143,.08);color:#1B2B8F;border:1px solid rgba(27,43,143,.2);border-radius:30px;padding:5px 14px;font-size:11px;font-weight:700;letter-spacing:.5px;text-transform:uppercase}
        .input-field{width:100%;background:#fff;border:1.5px solid #E2E6F0;border-radius:12px;padding:13px 16px;color:#1A1A2E;font-size:14px;outline:none;transition:border-color .2s,box-shadow .2s;font-family:inherit}
        .input-field::placeholder{color:#9AA0B4}
        .input-field:focus{border-color:#1B2B8F;box-shadow:0 0 0 3px rgba(27,43,143,.08)}
        select.input-field option{background:#fff;color:#1A1A2E}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-9px)}}
        @keyframes pulse{0%,100%{transform:scale(1);opacity:.5}50%{transform:scale(1.08);opacity:.8}}
        .floating{animation:float 3.8s ease-in-out infinite}
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.95)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(27,43,143,.08)",
        boxShadow: scrolled ? "0 4px 24px rgba(27,43,143,.08)" : "none",
        transition: "all .4s ease", padding: "0 28px",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", height: 70, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* REAL LOGO */}
          <div onClick={() => navigate("Home")} style={{ cursor: "pointer", display: "flex", alignItems: "center" }}>
            <img src="/makrees_logo.jpeg" alt="Makrees" style={{ height: 52, width: "auto", objectFit: "contain" }} />
          </div>
          <div style={{ display: "flex", gap: 34, alignItems: "center" }}>
            {NAV_LINKS.map(l => (
              <button key={l} className={`nav-link${page === l ? " active" : ""}`} onClick={() => navigate(l)}>
                {l}
                {page === l && <span style={{ position: "absolute", bottom: -2, left: 0, right: 0, height: 2, background: "linear-gradient(90deg,#1B2B8F,#E53935)", borderRadius: 2 }} />}
              </button>
            ))}
          </div>
          <button className="btn-primary" style={{ padding: "10px 24px", fontSize: 13 }} onClick={() => navigate("Contact")}>Get Started</button>
        </div>
      </nav>

      {/* PAGES */}
      <div className="fade-in" key={page}>
        {page === "Home" && <HomePage navigate={navigate} canvasRef={canvasRef} />}
        {page === "Services" && <ServicesPage navigate={navigate} />}
        {page === "Technology" && <TechnologyPage navigate={navigate} />}
        {page === "About" && <AboutPage navigate={navigate} />}
        {page === "Contact" && <ContactPage formData={formData} setFormData={setFormData} submitted={submitted} handleSubmit={handleSubmit} />}
      </div>

      <Footer navigate={navigate} />
    </div>
  );
}

// ── HOME ──────────────────────────────────────────────────────────────────────
function HomePage({ navigate, canvasRef }) {
  return (
    <div>
      {/* HERO */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden", background: "linear-gradient(135deg,#EEF1FB 0%,#FFF5F5 50%,#F0F4FF 100%)" }}>
        <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.7 }} />
        {/* Decorative blobs */}
        <div style={{ position: "absolute", top: "-10%", right: "-5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(229,57,53,.07) 0%,transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "5%", left: "-8%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(27,43,143,.07) 0%,transparent 70%)", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 2, maxWidth: 1200, margin: "0 auto", padding: "120px 28px 80px", width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
              <div style={{ width: 38, height: 2, background: "linear-gradient(90deg,#1B2B8F,#E53935)" }} />
              <span className="tag">Global Growth Agency</span>
            </div>
            <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(36px,4.5vw,62px)", fontWeight: 800, lineHeight: 1.06, color: "#0D1136", marginBottom: 24, letterSpacing: "-1.5px" }}>
              From Idea to Impact —<br />
              <span className="glow-text">We Build, Market,<br />Automate &amp; Scale</span>
            </h1>
            <p style={{ fontSize: 17, color: "#5A6480", lineHeight: 1.8, maxWidth: 520, marginBottom: 44, fontWeight: 400 }}>
              Makrees helps businesses, startups, educational institutions, and entrepreneurs grow faster through AI-powered marketing, branding, automation, and technology solutions.
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <button className="btn-primary" onClick={() => navigate("Services")} style={{ fontSize: 15, padding: "15px 36px" }}>Explore Services</button>
              <button className="btn-outline" onClick={() => navigate("Contact")} style={{ fontSize: 15, padding: "15px 32px" }}>Talk to Us →</button>
            </div>
            {/* Trust badges */}
            <div style={{ display: "flex", gap: 24, marginTop: 44, flexWrap: "wrap" }}>
              {["500+ Clients", "50+ Countries", "98% Satisfaction"].map(b => (
                <div key={b} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#E53935" }} />
                  <span style={{ fontSize: 13, color: "#6B7A99", fontWeight: 600 }}>{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right side visual */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16, position: "relative" }}>
            {/* Logo hero card */}
            <div style={{ background: "#fff", borderRadius: 24, padding: "32px", boxShadow: "0 20px 60px rgba(27,43,143,.12)", textAlign: "center", border: "1px solid rgba(27,43,143,.06)" }}>
              <img src="/makrees_logo.jpeg" alt="Makrees" style={{ width: "80%", maxWidth: 260, height: "auto", objectFit: "contain", margin: "0 auto", display: "block" }} />
              <p style={{ color: "#6B7A99", fontSize: 13, marginTop: 16, fontStyle: "italic" }}>Insights • Innovation • Impact</p>
            </div>
            {/* Floating stat cards */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {STATS.map(s => (
                <div key={s.label} className="card-hover" style={{ background: "#fff", borderRadius: 16, padding: "20px 16px", textAlign: "center", border: "1px solid rgba(27,43,143,.07)", boxShadow: "0 4px 16px rgba(27,43,143,.06)" }}>
                  <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 28, fontWeight: 800 }} className="glow-text">{s.value}</div>
                  <div style={{ fontSize: 11, color: "#9AA0B4", marginTop: 4, fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section style={{ padding: "96px 28px", background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <span className="section-label">What We Do</span>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(28px,3.5vw,46px)", fontWeight: 700, color: "#0D1136", letterSpacing: "-1px" }}>End-to-End Business Solutions</h2>
            <p style={{ color: "#6B7A99", fontSize: 16, marginTop: 14, maxWidth: 520, margin: "14px auto 0", lineHeight: 1.75 }}>From brand building to growth automation — everything your business needs.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 22 }}>
            {SERVICES.slice(0, 6).map((s, i) => (
              <div key={s.title} className="card-hover" style={{ background: "#F8F9FC", border: "1.5px solid #E8ECF4", borderRadius: 20, padding: "28px 24px" }}>
                <div style={{ width: 50, height: 50, borderRadius: 14, background: i % 2 === 0 ? "rgba(27,43,143,.08)" : "rgba(229,57,53,.08)", border: `1px solid ${i % 2 === 0 ? "rgba(27,43,143,.15)" : "rgba(229,57,53,.15)"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, marginBottom: 16 }}>{s.icon}</div>
                <h3 style={{ fontWeight: 700, fontSize: 16, color: "#0D1136", marginBottom: 9 }}>{s.title}</h3>
                <p style={{ color: "#6B7A99", fontSize: 13, lineHeight: 1.68 }}>{s.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 44 }}>
            <button className="btn-outline" onClick={() => navigate("Services")}>View All 12 Services →</button>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section style={{ padding: "96px 28px", background: "linear-gradient(135deg,#EEF1FB,#FFF5F5)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <span className="section-label">How It Works</span>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 700, color: "#0D1136", letterSpacing: "-1px" }}>Our Proven Process</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}>
            {PROCESS.map((p, i) => (
              <div key={p.step} style={{ position: "relative", textAlign: "center" }}>
                {i < 3 && <div style={{ position: "absolute", top: 26, left: "60%", right: "-40%", height: 2, background: `linear-gradient(90deg,${p.color}50,transparent)`, zIndex: 0 }} />}
                <div style={{ width: 52, height: 52, borderRadius: "50%", background: `${p.color}12`, border: `2px solid ${p.color}40`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", position: "relative", zIndex: 1, fontFamily: "'Space Grotesk',sans-serif", fontSize: 13, fontWeight: 800, color: p.color }}>{p.step}</div>
                <h3 style={{ fontWeight: 700, fontSize: 17, color: "#0D1136", marginBottom: 9 }}>{p.title}</h3>
                <p style={{ color: "#6B7A99", fontSize: 13, lineHeight: 1.65 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GLOBAL REACH */}
      <section style={{ padding: "96px 28px", background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div>
            <span className="section-label">Global Reach</span>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(26px,3vw,44px)", fontWeight: 700, color: "#0D1136", letterSpacing: "-1px", lineHeight: 1.1, marginBottom: 22 }}>Your Business,<br />Everywhere in the World</h2>
            <p style={{ color: "#6B7A99", fontSize: 15, lineHeight: 1.82, marginBottom: 30 }}>We work with clients worldwide, helping businesses build strong brands, generate leads, increase sales, expand through franchises, and achieve sustainable growth.</p>
            {["Strong brand building", "Lead generation at scale", "Franchise expansion support", "Sustainable business growth"].map(item => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <div style={{ width: 20, height: 20, borderRadius: "50%", background: "linear-gradient(135deg,#1B2B8F,#E53935)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#fff", flexShrink: 0 }}>✓</div>
                <span style={{ color: "#4A5270", fontSize: 15 }}>{item}</span>
              </div>
            ))}
            <button className="btn-primary" style={{ marginTop: 34 }} onClick={() => navigate("Contact")}>Start Your Growth Journey</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {["🇺🇸 USA", "🇬🇧 UK", "🇮🇳 India", "🇦🇪 UAE", "🇦🇺 Australia", "🇸🇬 Singapore", "🇨🇦 Canada", "🌍 +43 More"].map(c => (
              <div key={c} className="card-hover" style={{ background: "#F8F9FC", border: "1.5px solid #E8ECF4", borderRadius: 16, padding: "18px 14px", textAlign: "center", fontSize: 14, color: "#4A5270", fontWeight: 500 }}>{c}</div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 28px", background: "linear-gradient(135deg,#1B2B8F,#2D3FBE,#E53935)" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(28px,4vw,48px)", fontWeight: 800, color: "#fff", letterSpacing: "-1.5px", marginBottom: 18 }}>Ready to Scale with Makrees?</h2>
          <p style={{ color: "rgba(255,255,255,.8)", fontSize: 16, maxWidth: 460, margin: "0 auto 40px", lineHeight: 1.75 }}>End-to-end solutions tailored to your goals — from startup launch to global scale.</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
            <button onClick={() => navigate("Contact")} style={{ background: "#fff", color: "#1B2B8F", border: "none", padding: "15px 36px", borderRadius: 50, fontWeight: 700, fontSize: 15, cursor: "pointer", transition: "all .3s", fontFamily: "inherit" }}>Book a Free Consultation</button>
            <button onClick={() => navigate("Services")} style={{ background: "transparent", color: "#fff", border: "2px solid rgba(255,255,255,.5)", padding: "15px 32px", borderRadius: 50, fontWeight: 700, fontSize: 15, cursor: "pointer", transition: "all .3s", fontFamily: "inherit" }}>See Our Services</button>
          </div>
        </div>
      </section>
    </div>
  );
}

// ── SERVICES ──────────────────────────────────────────────────────────────────
function ServicesPage({ navigate }) {
  return (
    <div style={{ paddingTop: 70 }}>
      <section style={{ padding: "80px 28px 50px", textAlign: "center", background: "linear-gradient(135deg,#EEF1FB,#FFF5F5)" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <span className="section-label">Our Services</span>
          <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(32px,5vw,56px)", fontWeight: 800, color: "#0D1136", letterSpacing: "-2px", marginBottom: 18 }}>Complete Business<br /><span className="glow-text">Growth Solutions</span></h1>
          <p style={{ color: "#6B7A99", fontSize: 16, lineHeight: 1.75 }}>12 specialized services to cover every aspect of building, marketing, and scaling your business worldwide.</p>
        </div>
      </section>
      <section style={{ padding: "20px 28px 96px", background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 22 }}>
          {SERVICES.map((s, i) => (
            <div key={s.title} className="card-hover" style={{ background: "#F8F9FC", border: "1.5px solid #E8ECF4", borderRadius: 22, padding: "32px 26px", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -16, right: -16, fontSize: 72, opacity: 0.05 }}>{s.icon}</div>
              <div style={{ width: 48, height: 48, borderRadius: 13, background: i % 2 === 0 ? "rgba(27,43,143,.08)" : "rgba(229,57,53,.08)", border: `1px solid ${i % 2 === 0 ? "rgba(27,43,143,.15)" : "rgba(229,57,53,.15)"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, marginBottom: 16 }}>{s.icon}</div>
              <div style={{ fontSize: 10, fontWeight: 700, color: i % 2 === 0 ? "#1B2B8F" : "#E53935", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 7 }}>Service {String(i + 1).padStart(2, "0")}</div>
              <h3 style={{ fontWeight: 700, fontSize: 16, color: "#0D1136", marginBottom: 10 }}>{s.title}</h3>
              <p style={{ color: "#6B7A99", fontSize: 13, lineHeight: 1.7 }}>{s.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ maxWidth: 860, margin: "52px auto 0", textAlign: "center", background: "linear-gradient(135deg,#1B2B8F,#E53935)", borderRadius: 28, padding: "52px 40px" }}>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 34, fontWeight: 700, color: "#fff", marginBottom: 14 }}>Need a Custom Package?</h2>
          <p style={{ color: "rgba(255,255,255,.82)", fontSize: 15, marginBottom: 32, lineHeight: 1.7 }}>Every business is unique. Let Makrees build a tailored strategy matching your exact goals.</p>
          <button onClick={() => navigate("Contact")} style={{ background: "#fff", color: "#1B2B8F", border: "none", padding: "14px 36px", borderRadius: 50, fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: "inherit" }}>Request a Custom Proposal</button>
        </div>
      </section>
    </div>
  );
}

// ── TECHNOLOGY ────────────────────────────────────────────────────────────────
function TechnologyPage({ navigate }) {
  return (
    <div style={{ paddingTop: 70 }}>
      <section style={{ padding: "80px 28px 50px", textAlign: "center", background: "linear-gradient(135deg,#EEF1FB,#FFF5F5)" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <span className="section-label">Technology & Innovation</span>
          <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(32px,5vw,56px)", fontWeight: 800, color: "#0D1136", letterSpacing: "-2px", marginBottom: 18 }}>Powering <span className="glow-text">Future-Ready</span><br />Tech Ventures</h1>
          <p style={{ color: "#6B7A99", fontSize: 16, lineHeight: 1.75 }}>Makrees specializes in promoting and scaling businesses in advanced technology sectors.</p>
        </div>
      </section>
      <section style={{ padding: "20px 28px 72px", background: "#fff" }}>
        <div style={{ maxWidth: 1060, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 22 }}>
          {TECH_SECTORS.map(t => (
            <div key={t.title} className="card-hover" style={{ background: "#F8F9FC", border: "1.5px solid #E8ECF4", borderRadius: 26, padding: "48px 22px", textAlign: "center" }}>
              <div style={{ width: 78, height: 78, borderRadius: "50%", margin: "0 auto 22px", background: `${t.color}0D`, border: `2px solid ${t.color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 34 }}>{t.icon}</div>
              <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 17, color: "#0D1136", marginBottom: 14 }}>{t.title}</h3>
              <div style={{ width: 36, height: 3, background: `linear-gradient(90deg,${t.color},${t.color}80)`, margin: "0 auto", borderRadius: 2 }} />
            </div>
          ))}
        </div>
      </section>
      <section style={{ padding: "40px 28px 90px", background: "linear-gradient(135deg,#EEF1FB,#FFF5F5)" }}>
        <div style={{ maxWidth: 1060, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          <div>
            <span className="section-label">Why Makrees for Tech</span>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(24px,3vw,38px)", fontWeight: 700, color: "#0D1136", letterSpacing: "-1px", marginBottom: 22 }}>The Future is Technology-Driven</h2>
            <p style={{ color: "#6B7A99", fontSize: 15, lineHeight: 1.85, marginBottom: 20 }}>Makrees helps robotics companies, STEM programs, AI ventures, and embedded systems businesses get the marketing and growth infrastructure they need to scale globally.</p>
            <p style={{ color: "#6B7A99", fontSize: 15, lineHeight: 1.85, marginBottom: 34 }}>From launch strategy to investor-ready branding, we understand technology businesses and deliver real results.</p>
            <button className="btn-primary" onClick={() => navigate("Contact")}>Partner With Makrees →</button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
            {["Deep understanding of tech markets", "Investor-ready branding & pitch decks", "STEM & EdTech marketing expertise", "Robotics & hardware launch support", "AI startup growth acceleration", "Global tech community connections"].map(item => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: 14, background: "#fff", border: "1.5px solid #E8ECF4", borderRadius: 12, padding: "13px 16px" }}>
                <div style={{ width: 22, height: 22, borderRadius: "50%", background: "linear-gradient(135deg,#1B2B8F,#E53935)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#fff", flexShrink: 0 }}>✓</div>
                <span style={{ color: "#4A5270", fontSize: 14 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ── ABOUT ─────────────────────────────────────────────────────────────────────
function AboutPage({ navigate }) {
  return (
    <div style={{ paddingTop: 70 }}>
      {/* HERO */}
      <section style={{ padding: "80px 28px 50px", textAlign: "center", background: "linear-gradient(135deg,#EEF1FB,#FFF5F5)" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <span className="section-label">About Makrees</span>
          <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(32px,5vw,56px)", fontWeight: 800, color: "#0D1136", letterSpacing: "-2px", marginBottom: 18 }}>We Turn Ambition Into<br /><span className="glow-text">Global Impact</span></h1>
        </div>
      </section>

      {/* ABOUT CONTENT */}
      <section style={{ padding: "60px 28px", background: "#fff" }}>
        <div style={{ maxWidth: 1060, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start", marginBottom: 64 }}>
            <div>
              <span className="section-label">Who We Are</span>
              <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 32, fontWeight: 700, color: "#0D1136", marginBottom: 20, letterSpacing: "-0.5px" }}>About Makrees</h2>
              <p style={{ color: "#5A6480", fontSize: 15, lineHeight: 1.88, marginBottom: 16 }}>
                Makrees is a global AI-powered marketing and business growth company dedicated to helping startups, entrepreneurs, educational institutions, and established businesses scale faster and smarter.
              </p>
              <p style={{ color: "#5A6480", fontSize: 15, lineHeight: 1.88, marginBottom: 16 }}>
                We combine innovation, automation, branding, and strategic marketing to create powerful growth systems that generate leads, increase visibility, and drive revenue. From social media marketing and email automation to brand development, content creation, franchise expansion, and recruitment solutions, we provide end-to-end support for businesses at every stage of their journey.
              </p>
              <p style={{ color: "#5A6480", fontSize: 15, lineHeight: 1.88, marginBottom: 16 }}>
                Our expertise extends beyond traditional marketing. We actively support startups in product marketing, business development, robotics, STEM education, Arduino-based innovations, and technology-driven ventures. By combining cutting-edge technology with proven business strategies, we help our clients transform ideas into successful brands.
              </p>
              <p style={{ color: "#5A6480", fontSize: 15, lineHeight: 1.88, marginBottom: 16 }}>
                At Makrees, we believe that every business has the potential to make a global impact. Our mission is to empower organizations with intelligent marketing solutions, strong brand identities, and scalable growth strategies that deliver measurable results.
              </p>
              <p style={{ color: "#5A6480", fontSize: 15, lineHeight: 1.88 }}>
                Whether you're launching a startup, expanding your market reach, building a franchise network, or seeking a complete marketing transformation, Makrees is your trusted partner in growth.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
              {/* Mission */}
              <div style={{ background: "linear-gradient(135deg,rgba(27,43,143,.05),rgba(27,43,143,.02))", border: "1.5px solid rgba(27,43,143,.12)", borderRadius: 20, padding: "28px 24px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(27,43,143,.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🎯</div>
                  <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 18, color: "#1B2B8F" }}>Our Mission</h3>
                </div>
                <p style={{ color: "#5A6480", fontSize: 14, lineHeight: 1.78 }}>To empower businesses worldwide through AI-driven marketing, automation, branding, and innovative growth strategies.</p>
              </div>
              {/* Vision */}
              <div style={{ background: "linear-gradient(135deg,rgba(229,57,53,.05),rgba(229,57,53,.02))", border: "1.5px solid rgba(229,57,53,.12)", borderRadius: 20, padding: "28px 24px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(229,57,53,.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🌐</div>
                  <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 18, color: "#E53935" }}>Our Vision</h3>
                </div>
                <p style={{ color: "#5A6480", fontSize: 14, lineHeight: 1.78 }}>To become a globally recognized leader in AI-powered business growth, helping organizations build stronger brands, reach larger audiences, and achieve sustainable success.</p>
              </div>
              {/* Logo */}
              <div style={{ background: "#F8F9FC", border: "1.5px solid #E8ECF4", borderRadius: 20, padding: "24px", textAlign: "center" }}>
                <img src="/makrees_logo.jpeg" alt="Makrees" style={{ width: "75%", maxWidth: 220, height: "auto", objectFit: "contain" }} />
              </div>
            </div>
          </div>

          {/* OUR STORY */}
          <div style={{ background: "linear-gradient(135deg,#EEF1FB,#FFF5F5)", borderRadius: 28, padding: "48px 44px", marginBottom: 60 }}>
            <span className="section-label">Our Journey</span>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 32, fontWeight: 700, color: "#0D1136", marginBottom: 24, letterSpacing: "-0.5px" }}>Our Story</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 36 }}>
              <div>
                <p style={{ color: "#5A6480", fontSize: 15, lineHeight: 1.88, marginBottom: 16 }}>
                  Makrees was founded with a vision to help businesses grow in the digital age through innovation, technology, and strategic marketing.
                </p>
                <p style={{ color: "#5A6480", fontSize: 15, lineHeight: 1.88, marginBottom: 16 }}>
                  We saw that many startups and businesses had great ideas but lacked the right marketing, branding, and growth strategies to reach their full potential. That's where Makrees comes in.
                </p>
              </div>
              <div>
                <p style={{ color: "#5A6480", fontSize: 15, lineHeight: 1.88, marginBottom: 16 }}>
                  Today, we help businesses worldwide with AI-powered marketing, automation, branding, social media growth, content creation, lead generation, franchise development, and business expansion. We also support technology-driven ventures in Robotics, STEM Education, and Arduino innovation.
                </p>
                <p style={{ color: "#5A6480", fontSize: 15, lineHeight: 1.88, marginBottom: 16 }}>
                  Our mission is simple: to transform ideas into brands, brands into businesses, and businesses into success stories.
                </p>
                <p style={{ color: "#1B2B8F", fontSize: 15, lineHeight: 1.88, fontWeight: 600 }}>
                  At Makrees, we don't just market companies — we help build their future.
                </p>
              </div>
            </div>
          </div>

          {/* Values */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
            {[
              { icon: "🎯", title: "Results-First", desc: "Every strategy built around measurable outcomes and real business impact." },
              { icon: "🌐", title: "Global Mindset", desc: "50+ countries. We think globally while executing locally." },
              { icon: "⚡", title: "Speed & Agility", desc: "Fast execution without compromising quality or strategic depth." },
              { icon: "🤝", title: "True Partnership", desc: "We treat your business as our own — invested in your success." },
            ].map(v => (
              <div key={v.title} className="card-hover" style={{ background: "#F8F9FC", border: "1.5px solid #E8ECF4", borderRadius: 18, padding: "24px 18px", textAlign: "center" }}>
                <div style={{ fontSize: 32, marginBottom: 14 }}>{v.icon}</div>
                <h3 style={{ fontWeight: 700, fontSize: 15, color: "#0D1136", marginBottom: 8 }}>{v.title}</h3>
                <p style={{ color: "#6B7A99", fontSize: 13, lineHeight: 1.65 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ padding: "64px 28px", background: "linear-gradient(135deg,#1B2B8F,#2D3FBE,#E53935)" }}>
        <div style={{ maxWidth: 1060, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 32, textAlign: "center" }}>
          {STATS.map(s => (
            <div key={s.label}>
              <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 48, fontWeight: 800, color: "#fff", lineHeight: 1 }}>{s.value}</div>
              <div style={{ color: "rgba(255,255,255,.7)", fontSize: 12, marginTop: 8, textTransform: "uppercase", letterSpacing: "1.5px", fontWeight: 600 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "72px 28px 90px", background: "#fff", textAlign: "center" }}>
        <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 36, fontWeight: 700, color: "#0D1136", marginBottom: 14, letterSpacing: "-0.5px" }}>Let's Build Something Extraordinary</h2>
        <p style={{ color: "#6B7A99", fontSize: 16, marginBottom: 36, lineHeight: 1.7 }}>Your idea deserves global impact. Let Makrees make it happen.</p>
        <button className="btn-primary" onClick={() => navigate("Contact")} style={{ fontSize: 15, padding: "15px 36px" }}>Start the Conversation →</button>
      </section>
    </div>
  );
}

// ── CONTACT ───────────────────────────────────────────────────────────────────
function ContactPage({ formData, setFormData, submitted, handleSubmit }) {
  const update = (k, v) => setFormData(p => ({ ...p, [k]: v }));
  return (
    <div style={{ paddingTop: 70 }}>
      <section style={{ padding: "80px 28px 40px", textAlign: "center", background: "linear-gradient(135deg,#EEF1FB,#FFF5F5)" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <span className="section-label">Get in Touch</span>
          <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(32px,5vw,56px)", fontWeight: 800, color: "#0D1136", letterSpacing: "-2px", marginBottom: 18 }}>Let's Grow Your<br /><span className="glow-text">Business Together</span></h1>
          <p style={{ color: "#6B7A99", fontSize: 16, lineHeight: 1.75 }}>Makrees will get back to you within 24 hours with a tailored growth plan.</p>
        </div>
      </section>
      <section style={{ padding: "40px 28px 90px", background: "#fff" }}>
        <div style={{ maxWidth: 1060, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 56, alignItems: "start" }}>
          {/* INFO */}
          <div>
            <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 40 }}>
              {[
                { icon: "📧", label: "Email", val: "growth@makrees.com", href: "mailto:growth@makrees.com" },
                { icon: "📞", label: "Phone / WhatsApp", val: "+91 7894357177", href: "tel:+917894357177" },
                { icon: "🌐", label: "Website", val: "www.makrees.com", href: "https://www.makrees.com" },
                { icon: "📍", label: "Global HQ", val: "Serving 50+ Countries Worldwide", href: null },
              ].map(c => (
                <div key={c.label} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div style={{ width: 46, height: 46, borderRadius: 13, background: "rgba(27,43,143,.07)", border: "1.5px solid rgba(27,43,143,.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{c.icon}</div>
                  <div>
                    <div style={{ fontSize: 10, color: "#9AA0B4", textTransform: "uppercase", letterSpacing: "1px", fontWeight: 700, marginBottom: 4 }}>{c.label}</div>
                    {c.href ? <a href={c.href} style={{ color: "#1B2B8F", fontSize: 14, fontWeight: 600, textDecoration: "none" }}>{c.val}</a> : <div style={{ color: "#4A5270", fontSize: 14 }}>{c.val}</div>}
                  </div>
                </div>
              ))}
            </div>
            {/* Social links */}
            <div style={{ background: "linear-gradient(135deg,rgba(27,43,143,.05),rgba(229,57,53,.04))", border: "1.5px solid rgba(27,43,143,.1)", borderRadius: 20, padding: "24px 20px" }}>
              <h3 style={{ fontWeight: 700, fontSize: 15, color: "#0D1136", marginBottom: 16 }}>Follow Us</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <a href="https://www.instagram.com/makrees_research/" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>📸</div>
                  <span style={{ color: "#4A5270", fontSize: 14, fontWeight: 500 }}>@makrees_research</span>
                </a>
                <a href="https://www.linkedin.com/company/makrees-research/" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: "#0077B5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, color: "#fff", fontWeight: 700 }}>in</div>
                  <span style={{ color: "#4A5270", fontSize: 14, fontWeight: 500 }}>Makrees Research</span>
                </a>
              </div>
            </div>
          </div>

          {/* FORM */}
          {submitted ? (
            <div style={{ textAlign: "center", padding: "80px 24px" }}>
              <div style={{ fontSize: 60, marginBottom: 20 }}>🚀</div>
              <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 28, fontWeight: 700, color: "#0D1136", marginBottom: 13 }}>Message Sent!</h2>
              <p style={{ color: "#6B7A99", fontSize: 15, lineHeight: 1.75 }}>Thank you for reaching out to Makrees. Our team will get back to you within 24 hours with a tailored growth plan.</p>
            </div>
          ) : (
            <div style={{ background: "#F8F9FC", border: "1.5px solid #E8ECF4", borderRadius: 26, padding: "36px 30px" }}>
              <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 22, color: "#0D1136", marginBottom: 26 }}>Tell Us About Your Goals</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 13 }}>
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
                <button className="btn-primary" onClick={handleSubmit} style={{ fontSize: 15, padding: "15px" }}>Send Message & Get Your Growth Plan →</button>
                <p style={{ textAlign: "center", fontSize: 12, color: "#B0B8CC" }}>We respond within 24 hours. No spam, ever.</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

// ── FOOTER ────────────────────────────────────────────────────────────────────
function Footer({ navigate }) {
  return (
    <footer style={{ borderTop: "1px solid #E8ECF4", padding: "60px 28px 28px", background: "#0D1136" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 44, marginBottom: 52 }}>
          <div>
            <div style={{ marginBottom: 18, cursor: "pointer" }} onClick={() => navigate("Home")}>
              <img src="/makrees_logo.jpeg" alt="Makrees" style={{ height: 56, width: "auto", objectFit: "contain", background: "#fff", borderRadius: 12, padding: "6px 10px" }} />
            </div>
            <p style={{ color: "#6B7A8C", fontSize: 13, lineHeight: 1.78, maxWidth: 260, marginBottom: 22 }}>From Idea to Impact — We Build, Market, Automate, and Scale Businesses Worldwide.</p>
            <div style={{ display: "flex", gap: 10 }}>
              <a href="https://www.instagram.com/makrees_research/" target="_blank" rel="noopener noreferrer" style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 16, textDecoration: "none" }}>📸</a>
              <a href="https://www.linkedin.com/company/makrees-research/" target="_blank" rel="noopener noreferrer" style={{ width: 36, height: 36, borderRadius: "50%", background: "#0077B5", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#fff", fontSize: 14, fontWeight: 700, textDecoration: "none" }}>in</a>
              <a href="mailto:growth@makrees.com" style={{ width: 36, height: 36, borderRadius: "50%", background: "#E53935", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 16, textDecoration: "none" }}>✉️</a>
            </div>
          </div>
          <div>
            <h4 style={{ fontSize: 11, fontWeight: 700, color: "#fff", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: 18 }}>Company</h4>
            {["Home", "About", "Services", "Technology", "Contact"].map(l => (
              <div key={l} style={{ marginBottom: 10 }}>
                <button onClick={() => navigate(l)} style={{ background: "none", border: "none", color: "#6B7A8C", fontSize: 13, cursor: "pointer", fontFamily: "inherit", padding: 0, transition: "color .2s" }}
                  onMouseOver={e => e.target.style.color = "#fff"} onMouseOut={e => e.target.style.color = "#6B7A8C"}>{l}</button>
              </div>
            ))}
          </div>
          <div>
            <h4 style={{ fontSize: 11, fontWeight: 700, color: "#fff", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: 18 }}>Services</h4>
            {["Marketing Automation", "Social Media", "Branding", "Video Production", "Startup Growth", "Recruitment"].map(s => (
              <div key={s} style={{ marginBottom: 10 }}><span style={{ color: "#6B7A8C", fontSize: 13 }}>{s}</span></div>
            ))}
          </div>
          <div>
            <h4 style={{ fontSize: 11, fontWeight: 700, color: "#fff", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: 18 }}>Contact</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <a href="mailto:growth@makrees.com" style={{ color: "#6B7A8C", fontSize: 13, textDecoration: "none" }}>📧 growth@makrees.com</a>
              <a href="tel:+917894357177" style={{ color: "#6B7A8C", fontSize: 13, textDecoration: "none" }}>📞 +91 7894357177</a>
              <a href="https://www.instagram.com/makrees_research/" target="_blank" rel="noopener noreferrer" style={{ color: "#6B7A8C", fontSize: 13, textDecoration: "none" }}>📸 Instagram</a>
              <a href="https://www.linkedin.com/company/makrees-research/" target="_blank" rel="noopener noreferrer" style={{ color: "#6B7A8C", fontSize: 13, textDecoration: "none" }}>💼 LinkedIn</a>
              <span style={{ color: "#6B7A8C", fontSize: 13 }}>⏱ 24h Response Time</span>
            </div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,.08)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <span style={{ color: "#3A4560", fontSize: 12 }}>© 2026 Makrees. All rights reserved.</span>
          <div style={{ display: "flex", gap: 24 }}>
            <span style={{ color: "#3A4560", fontSize: 12, cursor: "pointer" }}>Privacy Policy</span>
            <span style={{ color: "#3A4560", fontSize: 12, cursor: "pointer" }}>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
