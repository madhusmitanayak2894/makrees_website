import { useState, useEffect, useRef } from "react";

// ── MAKREES LOGO SVG COMPONENT ──────────────────────────────────────────────
function MakreesLogo({ size = 36, showText = true, light = false }) {
  const textColor = light ? "#0A0E1A" : "#E8ECF4";
  const accentColor = light ? "#7B61FF" : "url(#logoGrad)";
  const iconBg = light ? "#7B61FF" : "url(#logoGrad)";
  const id = `lg${size}`;
  return (
    <svg width={showText ? size * 5.2 : size} height={size} viewBox={`0 0 ${showText ? size * 5.2 : size} ${size}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00C9FF"/>
          <stop offset="100%" stopColor="#7B61FF"/>
        </linearGradient>
      </defs>
      {/* Icon square */}
      <rect width={size} height={size} rx={size * 0.27} fill={`url(#${id})`}/>
      {/* M letterform */}
      <text x={size * 0.5} y={size * 0.72} textAnchor="middle"
        fontFamily="'Space Grotesk','Segoe UI',sans-serif"
        fontSize={size * 0.52} fontWeight="900" fill="#fff"
      >M</text>
      {/* Accent dot */}
      <circle cx={size * 0.82} cy={size * 0.18} r={size * 0.1} fill="#00E5A0"/>
      {/* Wordmark */}
      {showText && (
        <text x={size * 1.25} y={size * 0.67}
          fontFamily="'Space Grotesk','Segoe UI',sans-serif"
          fontSize={size * 0.5} fontWeight="800" fill={textColor}
          letterSpacing="-0.5"
        >
          <tspan>Mak</tspan><tspan fill={light ? "#7B61FF" : "#00C9FF"}>rees</tspan>
        </text>
      )}
    </svg>
  );
}

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
  { icon: "🤖", title: "Robotics Startups", color: "#00C9FF" },
  { icon: "🔬", title: "STEM Education Programs", color: "#7B61FF" },
  { icon: "⚡", title: "Arduino & Embedded Systems", color: "#FFB800" },
  { icon: "🧠", title: "AI & Tech Ventures", color: "#00E5A0" },
];

const STATS = [
  { value: "500+", label: "Global Clients" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "50+", label: "Countries Reached" },
  { value: "10x", label: "Average Growth" },
];

const PROCESS = [
  { step: "01", title: "Discovery", desc: "Deep-dive into your goals, market, and challenges.", color: "#00C9FF" },
  { step: "02", title: "Strategy", desc: "Custom roadmap tailored to your business objectives.", color: "#7B61FF" },
  { step: "03", title: "Execute", desc: "Expert team delivers with precision and speed.", color: "#00E5A0" },
  { step: "04", title: "Scale", desc: "Optimize, iterate, and grow beyond expectations.", color: "#FFB800" },
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
    const pts = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.38, vy: (Math.random() - 0.5) * 0.38,
      r: Math.random() * 1.5 + 0.4, a: Math.random() * 0.5 + 0.15,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,201,255,${p.a})`; ctx.fill();
      });
      pts.forEach((a, i) => pts.slice(i + 1).forEach(b => {
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 95) {
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(0,201,255,${0.07 * (1 - d / 95)})`; ctx.lineWidth = 0.5; ctx.stroke();
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
    <div style={{ fontFamily: "'Inter','Segoe UI',sans-serif", background: "#0A0E1A", color: "#E8ECF4", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        ::selection{background:#00C9FF30;color:#00C9FF}
        ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:#0A0E1A}::-webkit-scrollbar-thumb{background:#00C9FF40;border-radius:4px}
        .fade-in{animation:fadeIn .65s ease forwards}
        @keyframes fadeIn{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
        .card-hover{transition:transform .3s ease,box-shadow .3s ease,border-color .3s ease}
        .card-hover:hover{transform:translateY(-6px);box-shadow:0 20px 56px rgba(0,201,255,.11);border-color:rgba(0,201,255,.35)!important}
        .btn-primary{background:linear-gradient(135deg,#00C9FF,#7B61FF);color:#fff;border:none;padding:14px 32px;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;transition:all .3s;letter-spacing:.2px;font-family:inherit}
        .btn-primary:hover{transform:translateY(-2px);box-shadow:0 12px 32px rgba(0,201,255,.35)}
        .btn-outline{background:transparent;color:#00C9FF;border:1.5px solid rgba(0,201,255,.38);padding:13px 30px;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;transition:all .3s;font-family:inherit}
        .btn-outline:hover{background:rgba(0,201,255,.08);border-color:#00C9FF}
        .glow-text{background:linear-gradient(135deg,#00C9FF,#7B61FF,#00E5A0);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .nav-link{color:#8892A4;font-size:14px;font-weight:500;cursor:pointer;transition:color .2s;padding:6px 2px;background:none;border:none;font-family:inherit;letter-spacing:.2px;position:relative}
        .nav-link:hover,.nav-link.active{color:#E8ECF4}
        .section-label{font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#00C9FF;margin-bottom:12px;display:block}
        .tag{display:inline-block;background:rgba(0,201,255,.08);color:#00C9FF;border:1px solid rgba(0,201,255,.22);border-radius:30px;padding:5px 14px;font-size:11px;font-weight:700;letter-spacing:.5px;text-transform:uppercase}
        .input-field{width:100%;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:12px;padding:13px 16px;color:#E8ECF4;font-size:14px;outline:none;transition:border-color .2s,background .2s;font-family:inherit}
        .input-field::placeholder{color:#3A4156}
        .input-field:focus{border-color:rgba(0,201,255,.38);background:rgba(0,201,255,.03)}
        select.input-field option{background:#141828}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-9px)}}
      `}</style>

      {/* ── NAV ─────────────────────────────────────────────────────── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? "rgba(10,14,26,0.94)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,.06)" : "none",
        transition: "all .4s ease", padding: "0 28px",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", height: 70, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div onClick={() => navigate("Home")} style={{ cursor: "pointer" }}>
            <MakreesLogo size={34} showText={true} />
          </div>
          <div style={{ display: "flex", gap: 34, alignItems: "center" }}>
            {NAV_LINKS.map(l => (
              <button key={l} className={`nav-link${page === l ? " active" : ""}`} onClick={() => navigate(l)}>
                {l}
                {page === l && <span style={{ position: "absolute", bottom: -2, left: 0, right: 0, height: 2, background: "linear-gradient(90deg,#00C9FF,#7B61FF)", borderRadius: 2 }} />}
              </button>
            ))}
          </div>
          <button className="btn-primary" style={{ padding: "10px 24px", fontSize: 13 }} onClick={() => navigate("Contact")}>Get Started</button>
        </div>
      </nav>

      {/* ── PAGES ───────────────────────────────────────────────────── */}
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

// ── HOME ─────────────────────────────────────────────────────────────────────
function HomePage({ navigate, canvasRef }) {
  return (
    <div>
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.55 }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 18% 50%,rgba(0,201,255,.07) 0%,transparent 55%),radial-gradient(ellipse at 80% 20%,rgba(123,97,255,.09) 0%,transparent 55%),radial-gradient(ellipse at 60% 82%,rgba(0,229,160,.05) 0%,transparent 48%)" }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1200, margin: "0 auto", padding: "120px 28px 80px", width: "100%" }}>
          <div style={{ maxWidth: 800 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 30 }}>
              <div style={{ width: 40, height: 1, background: "linear-gradient(90deg,transparent,#00C9FF)" }} />
              <span className="tag">Global Growth Agency</span>
            </div>
            <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(42px,6vw,74px)", fontWeight: 800, lineHeight: 1.05, color: "#E8ECF4", marginBottom: 28, letterSpacing: "-2px" }}>
              From Idea to Impact —<br />
              <span className="glow-text">We Build, Market,<br />Automate &amp; Scale</span>
            </h1>
            <p style={{ fontSize: 18, color: "#6B7A99", lineHeight: 1.78, maxWidth: 580, marginBottom: 46, fontWeight: 400 }}>
              Makrees helps businesses, startups, educational institutions, and entrepreneurs grow faster through innovative marketing, branding, automation, and technology solutions.
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <button className="btn-primary" onClick={() => navigate("Services")} style={{ fontSize: 16, padding: "16px 38px" }}>Explore Services</button>
              <button className="btn-outline" onClick={() => navigate("Contact")} style={{ fontSize: 16, padding: "16px 36px" }}>Talk to Us →</button>
            </div>
          </div>
          {/* Floating badges */}
          <div style={{ position: "absolute", right: "6%", top: "24%", display: "flex", flexDirection: "column", gap: 14 }}>
            {["Marketing", "Automation", "Branding", "Technology"].map((t, i) => (
              <div key={t} style={{ animation: `float 3.8s ease-in-out ${i * 0.8}s infinite`, background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 40, padding: "10px 18px", fontSize: 13, fontWeight: 600, color: "#8892A4", backdropFilter: "blur(10px)" }}>{t}</div>
            ))}
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 180, background: "linear-gradient(to bottom,transparent,#0A0E1A)" }} />
      </section>

      {/* STATS */}
      <section style={{ padding: "72px 28px", background: "#0D1120", borderTop: "1px solid rgba(255,255,255,.04)", borderBottom: "1px solid rgba(255,255,255,.04)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 40, textAlign: "center" }}>
          {STATS.map(s => (
            <div key={s.label}>
              <div className="glow-text" style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 52, fontWeight: 800, lineHeight: 1 }}>{s.value}</div>
              <div style={{ color: "#3A4156", fontSize: 12, marginTop: 8, textTransform: "uppercase", letterSpacing: "1.5px", fontWeight: 600 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section style={{ padding: "96px 28px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <span className="section-label">What We Do</span>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(30px,4vw,48px)", fontWeight: 700, color: "#E8ECF4", letterSpacing: "-1px" }}>End-to-End Business Solutions</h2>
            <p style={{ color: "#6B7A99", fontSize: 16, marginTop: 14, maxWidth: 520, margin: "14px auto 0", lineHeight: 1.75 }}>From brand building to growth automation — everything your business needs to thrive globally.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20 }}>
            {SERVICES.slice(0, 6).map(s => (
              <div key={s.title} className="card-hover" style={{ background: "rgba(255,255,255,.025)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 20, padding: "28px 24px" }}>
                <div style={{ fontSize: 34, marginBottom: 14 }}>{s.icon}</div>
                <h3 style={{ fontWeight: 700, fontSize: 17, color: "#E8ECF4", marginBottom: 9 }}>{s.title}</h3>
                <p style={{ color: "#4A5568", fontSize: 13, lineHeight: 1.68 }}>{s.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 44 }}>
            <button className="btn-outline" onClick={() => navigate("Services")}>View All 12 Services →</button>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section style={{ padding: "96px 28px", background: "#0D1120" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <span className="section-label">How It Works</span>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(30px,4vw,46px)", fontWeight: 700, color: "#E8ECF4", letterSpacing: "-1px" }}>Our Proven Process</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}>
            {PROCESS.map((p, i) => (
              <div key={p.step} style={{ position: "relative", textAlign: "center" }}>
                {i < 3 && <div style={{ position: "absolute", top: 27, left: "60%", right: "-40%", height: 1, background: `linear-gradient(90deg,${p.color}60,transparent)`, zIndex: 0 }} />}
                <div style={{ width: 54, height: 54, borderRadius: "50%", background: `${p.color}14`, border: `1px solid ${p.color}45`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", position: "relative", zIndex: 1, fontFamily: "'Space Grotesk',sans-serif", fontSize: 13, fontWeight: 700, color: p.color }}>{p.step}</div>
                <h3 style={{ fontWeight: 700, fontSize: 17, color: "#E8ECF4", marginBottom: 9 }}>{p.title}</h3>
                <p style={{ color: "#4A5568", fontSize: 13, lineHeight: 1.65 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GLOBAL REACH */}
      <section style={{ padding: "96px 28px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div>
            <span className="section-label">Global Reach</span>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(28px,3.5vw,46px)", fontWeight: 700, color: "#E8ECF4", letterSpacing: "-1px", lineHeight: 1.1, marginBottom: 22 }}>Your Business,<br />Everywhere in the World</h2>
            <p style={{ color: "#6B7A99", fontSize: 15, lineHeight: 1.82, marginBottom: 30 }}>We work with clients worldwide, helping businesses build strong brands, generate leads, increase sales, expand through franchises, and achieve sustainable growth.</p>
            {["Strong brand building", "Lead generation at scale", "Franchise expansion support", "Sustainable business growth"].map(item => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 11 }}>
                <div style={{ width: 20, height: 20, borderRadius: "50%", background: "linear-gradient(135deg,#00C9FF,#7B61FF)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, flexShrink: 0 }}>✓</div>
                <span style={{ color: "#A0AABF", fontSize: 15 }}>{item}</span>
              </div>
            ))}
            <button className="btn-primary" style={{ marginTop: 34 }} onClick={() => navigate("Contact")}>Start Your Growth Journey</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {["🇺🇸 USA", "🇬🇧 UK", "🇮🇳 India", "🇦🇪 UAE", "🇦🇺 Australia", "🇸🇬 Singapore", "🇨🇦 Canada", "🌍 +43 More"].map(c => (
              <div key={c} className="card-hover" style={{ background: "rgba(255,255,255,.025)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 16, padding: "18px 14px", textAlign: "center", fontSize: 14, color: "#6B7A99" }}>{c}</div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "96px 28px", background: "#0D1120" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <div style={{ background: "linear-gradient(135deg,rgba(0,201,255,.06),rgba(123,97,255,.06))", border: "1px solid rgba(0,201,255,.15)", borderRadius: 32, padding: "72px 48px" }}>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(30px,4vw,50px)", fontWeight: 800, color: "#E8ECF4", letterSpacing: "-1.5px", marginBottom: 18 }}>Ready to Scale with Makrees?</h2>
            <p style={{ color: "#6B7A99", fontSize: 16, maxWidth: 480, margin: "0 auto 40px", lineHeight: 1.75 }}>Whether you're launching a startup or scaling an existing business — our team delivers end-to-end solutions tailored to your goals.</p>
            <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
              <button className="btn-primary" style={{ fontSize: 15, padding: "15px 38px" }} onClick={() => navigate("Contact")}>Book a Free Consultation</button>
              <button className="btn-outline" onClick={() => navigate("Services")}>See Our Services</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ── SERVICES ──────────────────────────────────────────────────────────────────
function ServicesPage({ navigate }) {
  return (
    <div style={{ paddingTop: 100 }}>
      <section style={{ padding: "80px 28px 50px", textAlign: "center" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <span className="section-label">Our Services</span>
          <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(34px,5vw,58px)", fontWeight: 800, color: "#E8ECF4", letterSpacing: "-2px", marginBottom: 18 }}>Complete Business<br /><span className="glow-text">Growth Solutions</span></h1>
          <p style={{ color: "#6B7A99", fontSize: 16, lineHeight: 1.75 }}>12 specialized services to cover every aspect of building, marketing, and scaling your business worldwide.</p>
        </div>
      </section>
      <section style={{ padding: "20px 28px 96px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 22 }}>
          {SERVICES.map((s, i) => (
            <div key={s.title} className="card-hover" style={{ background: "rgba(255,255,255,.025)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 22, padding: "34px 26px", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -18, right: -18, fontSize: 76, opacity: 0.04 }}>{s.icon}</div>
              <div style={{ width: 50, height: 50, borderRadius: 14, background: "linear-gradient(135deg,rgba(0,201,255,.1),rgba(123,97,255,.1))", border: "1px solid rgba(0,201,255,.18)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, marginBottom: 18 }}>{s.icon}</div>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#7B61FF", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 7 }}>Service {String(i + 1).padStart(2, "0")}</div>
              <h3 style={{ fontWeight: 700, fontSize: 17, color: "#E8ECF4", marginBottom: 10 }}>{s.title}</h3>
              <p style={{ color: "#4A5568", fontSize: 13, lineHeight: 1.7 }}>{s.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ maxWidth: 900, margin: "56px auto 0", textAlign: "center", background: "linear-gradient(135deg,rgba(0,201,255,.05),rgba(123,97,255,.05))", border: "1px solid rgba(0,201,255,.12)", borderRadius: 28, padding: "52px 40px" }}>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 34, fontWeight: 700, color: "#E8ECF4", marginBottom: 14 }}>Need a Custom Package?</h2>
          <p style={{ color: "#6B7A99", fontSize: 15, marginBottom: 32, lineHeight: 1.7 }}>Every business is unique. Let's build a tailored strategy that matches your exact goals and budget.</p>
          <button className="btn-primary" onClick={() => navigate("Contact")} style={{ fontSize: 15, padding: "14px 36px" }}>Request a Custom Proposal</button>
        </div>
      </section>
    </div>
  );
}

// ── TECHNOLOGY ────────────────────────────────────────────────────────────────
function TechnologyPage({ navigate }) {
  return (
    <div style={{ paddingTop: 100 }}>
      <section style={{ padding: "80px 28px 50px", textAlign: "center" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <span className="section-label">Technology & Innovation</span>
          <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(34px,5vw,58px)", fontWeight: 800, color: "#E8ECF4", letterSpacing: "-2px", marginBottom: 18 }}>Powering <span className="glow-text">Future-Ready</span><br />Tech Ventures</h1>
          <p style={{ color: "#6B7A99", fontSize: 16, lineHeight: 1.75 }}>Makrees specializes in promoting and scaling businesses in advanced technology sectors — from robotics to AI.</p>
        </div>
      </section>
      <section style={{ padding: "20px 28px 80px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 22 }}>
          {TECH_SECTORS.map(t => (
            <div key={t.title} className="card-hover" style={{ background: "rgba(255,255,255,.025)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 26, padding: "48px 24px", textAlign: "center" }}>
              <div style={{ width: 78, height: 78, borderRadius: "50%", margin: "0 auto 22px", background: `${t.color}13`, border: `1px solid ${t.color}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 34 }}>{t.icon}</div>
              <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 18, color: "#E8ECF4", marginBottom: 14 }}>{t.title}</h3>
              <div style={{ width: 36, height: 3, background: t.color, margin: "0 auto", borderRadius: 2, opacity: 0.7 }} />
            </div>
          ))}
        </div>
      </section>
      <section style={{ padding: "40px 28px 96px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          <div>
            <span className="section-label">Why Technology</span>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(26px,3vw,40px)", fontWeight: 700, color: "#E8ECF4", letterSpacing: "-1px", marginBottom: 22, lineHeight: 1.15 }}>The Future is Technology-Driven</h2>
            <p style={{ color: "#6B7A99", fontSize: 15, lineHeight: 1.85, marginBottom: 20 }}>The fastest-growing businesses are tech-enabled. Makrees helps robotics companies, STEM programs, AI ventures, and embedded systems businesses get the marketing and growth infrastructure they need.</p>
            <p style={{ color: "#6B7A99", fontSize: 15, lineHeight: 1.85, marginBottom: 34 }}>From launch strategy to investor-ready branding, we understand the unique challenges of technology businesses and deliver real results.</p>
            <button className="btn-primary" onClick={() => navigate("Contact")}>Partner With Makrees</button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {["Deep understanding of tech markets", "Investor-ready branding & pitch decks", "STEM & EdTech marketing expertise", "Robotics & hardware launch support", "AI startup growth acceleration", "Global tech community connections"].map(item => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: 14, background: "rgba(255,255,255,.025)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 12, padding: "13px 16px" }}>
                <div style={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(0,201,255,.1)", border: "1px solid rgba(0,201,255,.28)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#00C9FF", flexShrink: 0 }}>✓</div>
                <span style={{ color: "#8892A4", fontSize: 14 }}>{item}</span>
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
    <div style={{ paddingTop: 100 }}>
      <section style={{ padding: "80px 28px 50px", textAlign: "center" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <span className="section-label">About Makrees</span>
          <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(34px,5vw,58px)", fontWeight: 800, color: "#E8ECF4", letterSpacing: "-2px", marginBottom: 18 }}>We Turn Ambition Into<br /><span className="glow-text">Global Impact</span></h1>
          <p style={{ color: "#6B7A99", fontSize: 16, lineHeight: 1.75 }}>A team of marketers, strategists, designers, developers, and growth hackers united by one mission: help your business scale.</p>
        </div>
      </section>
      <section style={{ padding: "40px 28px 80px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}>
          <div>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 34, fontWeight: 700, color: "#E8ECF4", marginBottom: 18, letterSpacing: "-1px" }}>Our Story</h2>
            <p style={{ color: "#6B7A99", fontSize: 15, lineHeight: 1.88, marginBottom: 18 }}>Makrees was founded on a simple belief: every great idea deserves the infrastructure to become a global impact. We started as a small team of passionate marketers and strategists who saw a critical gap — businesses with incredible potential were failing not because of bad products, but because of poor marketing and growth strategy.</p>
            <p style={{ color: "#6B7A99", fontSize: 15, lineHeight: 1.88, marginBottom: 18 }}>Today, Makrees is a full-service growth agency serving clients across 50+ countries — from early-stage startups to established enterprises, from robotics companies to STEM education programs.</p>
            <p style={{ color: "#6B7A99", fontSize: 15, lineHeight: 1.88 }}>Whether you're launching your first product, building a franchise empire, or automating your entire sales pipeline — we've done it before, and we'll do it for you.</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { icon: "🎯", title: "Results-First", desc: "Every strategy is built around measurable outcomes and real business impact." },
              { icon: "🌐", title: "Global Mindset", desc: "50+ countries. We think globally while executing locally for every client." },
              { icon: "⚡", title: "Speed & Agility", desc: "Fast execution without compromising on quality or strategic depth." },
              { icon: "🤝", title: "True Partnership", desc: "We treat your business as our own — fully invested in your long-term success." },
            ].map(v => (
              <div key={v.title} className="card-hover" style={{ background: "rgba(255,255,255,.025)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 18, padding: "22px 18px", display: "flex", gap: 18 }}>
                <div style={{ fontSize: 26, flexShrink: 0 }}>{v.icon}</div>
                <div>
                  <h3 style={{ fontWeight: 700, fontSize: 15, color: "#E8ECF4", marginBottom: 5 }}>{v.title}</h3>
                  <p style={{ color: "#4A5568", fontSize: 13, lineHeight: 1.65 }}>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section style={{ padding: "64px 28px", background: "#0D1120", borderTop: "1px solid rgba(255,255,255,.04)", borderBottom: "1px solid rgba(255,255,255,.04)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 32, textAlign: "center" }}>
          {STATS.map(s => (
            <div key={s.label}>
              <div className="glow-text" style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 48, fontWeight: 800, lineHeight: 1 }}>{s.value}</div>
              <div style={{ color: "#3A4156", fontSize: 12, marginTop: 8, textTransform: "uppercase", letterSpacing: "1.5px", fontWeight: 600 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>
      <section style={{ padding: "80px 28px 96px", textAlign: "center" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 38, fontWeight: 700, color: "#E8ECF4", marginBottom: 14, letterSpacing: "-1px" }}>Let's Build Something Extraordinary</h2>
          <p style={{ color: "#6B7A99", fontSize: 16, marginBottom: 36, lineHeight: 1.7 }}>Your idea deserves global impact. Let Makrees make it happen.</p>
          <button className="btn-primary" onClick={() => navigate("Contact")} style={{ fontSize: 15, padding: "15px 36px" }}>Start the Conversation →</button>
        </div>
      </section>
    </div>
  );
}

// ── CONTACT ───────────────────────────────────────────────────────────────────
function ContactPage({ formData, setFormData, submitted, handleSubmit }) {
  const update = (k, v) => setFormData(p => ({ ...p, [k]: v }));
  return (
    <div style={{ paddingTop: 100 }}>
      <section style={{ padding: "80px 28px 40px", textAlign: "center" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <span className="section-label">Get in Touch</span>
          <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(34px,5vw,58px)", fontWeight: 800, color: "#E8ECF4", letterSpacing: "-2px", marginBottom: 18 }}>Let's Grow Your<br /><span className="glow-text">Business Together</span></h1>
          <p style={{ color: "#6B7A99", fontSize: 16, lineHeight: 1.75 }}>Tell us about your business and goals. Makrees will get back to you within 24 hours with a tailored plan.</p>
        </div>
      </section>
      <section style={{ padding: "40px 28px 96px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 60, alignItems: "start" }}>
          <div>
            <div style={{ display: "flex", flexDirection: "column", gap: 22, marginBottom: 44 }}>
              {[
                { icon: "📧", label: "Email", val: "hello@makrees.com" },
                { icon: "💬", label: "WhatsApp", val: "+1 (800) MAKREES" },
                { icon: "🌐", label: "Website", val: "www.makrees.com" },
                { icon: "📍", label: "Global HQ", val: "Serving 50+ Countries Worldwide" },
              ].map(c => (
                <div key={c.label} style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>
                  <div style={{ width: 46, height: 46, borderRadius: 14, background: "rgba(0,201,255,.08)", border: "1px solid rgba(0,201,255,.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{c.icon}</div>
                  <div>
                    <div style={{ fontSize: 10, color: "#3A4156", textTransform: "uppercase", letterSpacing: "1px", fontWeight: 700, marginBottom: 4 }}>{c.label}</div>
                    <div style={{ color: "#8892A4", fontSize: 14 }}>{c.val}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ background: "linear-gradient(135deg,rgba(0,201,255,.06),rgba(123,97,255,.06))", border: "1px solid rgba(0,201,255,.12)", borderRadius: 20, padding: "28px 22px" }}>
              <h3 style={{ fontWeight: 700, fontSize: 16, color: "#E8ECF4", marginBottom: 10 }}>Free Consultation</h3>
              <p style={{ color: "#6B7A99", fontSize: 13, lineHeight: 1.75 }}>Not sure where to start? Book a free 30-minute consultation and let our Makrees experts map out your growth strategy — no commitment required.</p>
            </div>
          </div>
          {submitted ? (
            <div style={{ textAlign: "center", padding: "80px 24px" }}>
              <div style={{ fontSize: 60, marginBottom: 22 }}>🚀</div>
              <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 30, fontWeight: 700, color: "#E8ECF4", marginBottom: 14 }}>Message Sent!</h2>
              <p style={{ color: "#6B7A99", fontSize: 15, lineHeight: 1.75 }}>Thank you for reaching out to Makrees. Our team will get back to you within 24 hours with a tailored growth plan for your business.</p>
            </div>
          ) : (
            <div style={{ background: "rgba(255,255,255,.025)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 28, padding: "38px 32px" }}>
              <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 22, color: "#E8ECF4", marginBottom: 28 }}>Tell Us About Your Goals</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div><label style={{ display: "block", fontSize: 10, color: "#3A4156", marginBottom: 7, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".5px" }}>Full Name *</label><input className="input-field" placeholder="Your name" value={formData.name} onChange={e => update("name", e.target.value)} /></div>
                  <div><label style={{ display: "block", fontSize: 10, color: "#3A4156", marginBottom: 7, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".5px" }}>Email *</label><input className="input-field" type="email" placeholder="your@email.com" value={formData.email} onChange={e => update("email", e.target.value)} /></div>
                </div>
                <div><label style={{ display: "block", fontSize: 10, color: "#3A4156", marginBottom: 7, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".5px" }}>Company Name</label><input className="input-field" placeholder="Your company or startup" value={formData.company} onChange={e => update("company", e.target.value)} /></div>
                <div><label style={{ display: "block", fontSize: 10, color: "#3A4156", marginBottom: 7, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".5px" }}>Service Needed</label>
                  <select className="input-field" value={formData.service} onChange={e => update("service", e.target.value)} style={{ cursor: "pointer" }}>
                    <option value="">Select a service...</option>
                    {SERVICES.map(s => <option key={s.title} value={s.title}>{s.title}</option>)}
                    <option value="Multiple Services">Multiple Services / Full Package</option>
                  </select>
                </div>
                <div><label style={{ display: "block", fontSize: 10, color: "#3A4156", marginBottom: 7, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".5px" }}>Your Goals & Message *</label><textarea className="input-field" rows={5} placeholder="Tell us about your business, current challenges, and what you want to achieve..." value={formData.message} onChange={e => update("message", e.target.value)} style={{ resize: "vertical" }} /></div>
                <button className="btn-primary" onClick={handleSubmit} style={{ fontSize: 15, padding: "15px", marginTop: 4 }}>Send Message & Get Your Growth Plan →</button>
                <p style={{ textAlign: "center", fontSize: 12, color: "#2A3040" }}>We respond within 24 hours. No spam, ever.</p>
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
    <footer style={{ borderTop: "1px solid rgba(255,255,255,.05)", padding: "60px 28px 28px", background: "#080B15" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 44, marginBottom: 52 }}>
          <div>
            <div style={{ marginBottom: 18 }} onClick={() => navigate("Home")} style={{ cursor: "pointer", marginBottom: 18, display: "inline-block" }}>
              <MakreesLogo size={32} showText={true} />
            </div>
            <p style={{ color: "#2A3040", fontSize: 13, lineHeight: 1.78, maxWidth: 270, marginBottom: 22 }}>From Idea to Impact — We Build, Market, Automate, and Scale Businesses Worldwide.</p>
            <div style={{ display: "flex", gap: 10 }}>
              {["𝕏", "in", "f", "▶"].map(s => (
                <div key={s} style={{ width: 34, height: 34, borderRadius: "50%", border: "1px solid rgba(255,255,255,.07)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#3A4156", fontSize: 12 }}>{s}</div>
              ))}
            </div>
          </div>
          <div>
            <h4 style={{ fontSize: 11, fontWeight: 700, color: "#E8ECF4", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: 18 }}>Company</h4>
            {["Home", "About", "Services", "Technology", "Contact"].map(l => (
              <div key={l} style={{ marginBottom: 10 }}>
                <button onClick={() => navigate(l)} style={{ background: "none", border: "none", color: "#3A4156", fontSize: 13, cursor: "pointer", fontFamily: "inherit", padding: 0 }}>{l}</button>
              </div>
            ))}
          </div>
          <div>
            <h4 style={{ fontSize: 11, fontWeight: 700, color: "#E8ECF4", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: 18 }}>Services</h4>
            {["Marketing Automation", "Social Media", "Branding", "Video Production", "Startup Growth", "Recruitment"].map(s => (
              <div key={s} style={{ marginBottom: 10 }}><span style={{ color: "#3A4156", fontSize: 13 }}>{s}</span></div>
            ))}
          </div>
          <div>
            <h4 style={{ fontSize: 11, fontWeight: 700, color: "#E8ECF4", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: 18 }}>Contact</h4>
            {["📧 hello@makrees.com", "🌐 50+ Countries", "⏱ 24h Response Time"].map(c => (
              <div key={c} style={{ color: "#3A4156", fontSize: 13, marginBottom: 10 }}>{c}</div>
            ))}
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,.04)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <MakreesLogo size={22} showText={false} />
            <span style={{ color: "#1E2535", fontSize: 12 }}>© 2025 Makrees. All rights reserved.</span>
          </div>
          <div style={{ display: "flex", gap: 24 }}>
            {["Privacy Policy", "Terms of Service"].map(l => (
              <span key={l} style={{ color: "#1E2535", fontSize: 12, cursor: "pointer" }}>{l}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
