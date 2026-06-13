import { useState, useEffect, useRef } from "react";

const WA_NUMBER = "917894357177";

// ── ICON ─────────────────────────────────────────────────────────────────────
const IconWhatsApp = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);
const IconClose = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const IconSend = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);
const IconBack = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="15 18 9 12 15 6"/>
  </svg>
);

// ── CHAT FLOW DATA ────────────────────────────────────────────────────────────
const FLOWS = {
  main: {
    botMsg: "Hi there! 👋 Welcome to **Makrees**.\n\nI'm your AI assistant. How can I help you today?",
    options: [
      { id: "marketing", label: "📢 Marketing Services" },
      { id: "branding",  label: "🎨 Branding & Design" },
      { id: "startup",   label: "🚀 Startup Development" },
      { id: "tech",      label: "🤖 Technology Ventures" },
      { id: "pricing",   label: "💰 Pricing & Packages" },
      { id: "live",      label: "💬 Talk to a Human Agent", isLive: true },
    ],
  },
  marketing: {
    botMsg: "Great choice! 📢 Here's what our **Marketing Services** include:\n\n✅ Marketing Automation\n✅ Social Media Marketing\n✅ Email Marketing Campaigns\n✅ Content Creation & Vlogging\n✅ Product Marketing & Go-to-Market Strategy\n✅ Sales Funnel Creation\n\nWe help brands grow 10x faster with data-driven campaigns across 50+ countries. What would you like to know more about?",
    options: [
      { id: "marketing_social", label: "📱 Social Media Marketing" },
      { id: "marketing_email",  label: "📧 Email Marketing" },
      { id: "marketing_auto",   label: "⚙️ Marketing Automation" },
      { id: "marketing_funnel", label: "💰 Sales Funnels" },
      { id: "main",             label: "🏠 Back to Main Menu" },
      { id: "live",             label: "💬 Talk to Expert", isLive: true },
    ],
  },
  marketing_social: {
    botMsg: "📱 **Social Media Marketing** at Makrees:\n\nWe create data-driven social strategies for:\n• Instagram, LinkedIn, Facebook & X\n• Reels, Stories & Short-form Videos\n• Paid Ads & Organic Growth\n• Influencer Collaborations\n• Analytics & Performance Reports\n\n🎯 Average result: **3x more engagement** in 60 days!\n\nReady to grow your social presence?",
    options: [
      { id: "marketing", label: "← Back to Marketing" },
      { id: "pricing",   label: "💰 See Pricing" },
      { id: "live",      label: "💬 Get Started", isLive: true },
    ],
  },
  marketing_email: {
    botMsg: "📧 **Email Marketing** at Makrees:\n\nWe build precision email systems:\n• Welcome & Onboarding Sequences\n• Drip Campaigns & Nurture Flows\n• Promotional & Newsletter Campaigns\n• A/B Testing & Optimization\n• Average Open Rate: **45%+**\n\nOur email campaigns generate consistent leads and sales on autopilot 🔥",
    options: [
      { id: "marketing", label: "← Back to Marketing" },
      { id: "pricing",   label: "💰 See Pricing" },
      { id: "live",      label: "💬 Get Started", isLive: true },
    ],
  },
  marketing_auto: {
    botMsg: "⚙️ **Marketing Automation** at Makrees:\n\nWe automate your entire marketing engine:\n• CRM Setup & Lead Management\n• Automated Email & SMS Flows\n• Lead Scoring & Segmentation\n• Chatbot & WhatsApp Automation\n• Multi-channel Campaign Automation\n\n💡 Save 20+ hours/week while growing faster!",
    options: [
      { id: "marketing", label: "← Back to Marketing" },
      { id: "pricing",   label: "💰 See Pricing" },
      { id: "live",      label: "💬 Talk to Expert", isLive: true },
    ],
  },
  marketing_funnel: {
    botMsg: "💰 **Sales Funnel Creation** at Makrees:\n\nWe build high-converting funnels:\n• Landing Page Design & Copywriting\n• Lead Magnet Creation\n• Upsell & Downsell Sequences\n• Cart & Checkout Optimization\n• Conversion Rate Optimization\n\n📈 Our funnels convert at **3-5x** industry average!",
    options: [
      { id: "marketing", label: "← Back to Marketing" },
      { id: "pricing",   label: "💰 See Pricing" },
      { id: "live",      label: "💬 Build My Funnel", isLive: true },
    ],
  },
  branding: {
    botMsg: "🎨 Our **Branding & Design** services:\n\n✅ Logo Design & Visual Identity\n✅ Brand Strategy & Positioning\n✅ Professional Brand Shoots\n✅ Video Editing & Production\n✅ Social Media Design Kits\n✅ Website UI/UX Design\n\nWe've built 500+ brands across 50+ countries. What aspect interests you most?",
    options: [
      { id: "branding_logo",   label: "✏️ Logo & Visual Identity" },
      { id: "branding_video",  label: "🎬 Video & Photography" },
      { id: "branding_strategy", label: "🎯 Brand Strategy" },
      { id: "main",            label: "🏠 Back to Main Menu" },
      { id: "live",            label: "💬 Talk to Expert", isLive: true },
    ],
  },
  branding_logo: {
    botMsg: "✏️ **Logo & Visual Identity** at Makrees:\n\nWe create complete brand identities:\n• Custom Logo Design (3 concepts)\n• Brand Color Palette & Typography\n• Brand Guidelines Document\n• Business Card & Letterhead\n• Social Media Profile Kit\n• Favicon & App Icon\n\n🏆 Delivered in **5-7 business days** with unlimited revisions!",
    options: [
      { id: "branding", label: "← Back to Branding" },
      { id: "pricing",  label: "💰 See Pricing" },
      { id: "live",     label: "💬 Start My Brand", isLive: true },
    ],
  },
  branding_video: {
    botMsg: "🎬 **Video & Photography** at Makrees:\n\nProfessional content that converts:\n• Corporate Brand Shoots\n• Product Photography\n• Explainer & Promo Videos\n• Reels & Short-form Content\n• Video Editing & Post-production\n• Testimonial Videos\n\n📹 We've produced **1000+ videos** for brands worldwide!",
    options: [
      { id: "branding", label: "← Back to Branding" },
      { id: "pricing",  label: "💰 See Pricing" },
      { id: "live",     label: "💬 Book a Shoot", isLive: true },
    ],
  },
  branding_strategy: {
    botMsg: "🎯 **Brand Strategy** at Makrees:\n\nWe define your brand's DNA:\n• Brand Positioning & Messaging\n• Target Audience Analysis\n• Competitor Research\n• Brand Voice & Tone Guidelines\n• Go-to-Market Strategy\n• Investor-Ready Brand Decks\n\n💡 A strong brand commands **20% higher pricing** in any market!",
    options: [
      { id: "branding", label: "← Back to Branding" },
      { id: "pricing",  label: "💰 See Pricing" },
      { id: "live",     label: "💬 Build My Strategy", isLive: true },
    ],
  },
  startup: {
    botMsg: "🚀 **Startup Development** at Makrees:\n\nWe help startups go from 0 to scale:\n\n✅ Business Plan & Model Development\n✅ Product Marketing & GTM Strategy\n✅ Investor Pitch Deck Creation\n✅ Franchise Development & Expansion\n✅ Recruitment & Team Building\n✅ Sales & Revenue Growth Systems\n\nWe've helped **200+ startups** launch and scale successfully. What stage are you at?",
    options: [
      { id: "startup_idea",     label: "💡 I have an idea" },
      { id: "startup_launch",   label: "🛫 I'm ready to launch" },
      { id: "startup_scale",    label: "📈 I want to scale" },
      { id: "startup_franchise",label: "🏢 Franchise expansion" },
      { id: "main",             label: "🏠 Back to Main Menu" },
      { id: "live",             label: "💬 Talk to Expert", isLive: true },
    ],
  },
  startup_idea: {
    botMsg: "💡 **Idea Stage?** Perfect — let's build your foundation!\n\nAt Makrees we help you:\n• Validate your business idea\n• Create a solid business plan\n• Build your brand identity from scratch\n• Develop your MVP marketing strategy\n• Connect with potential investors\n• Set up your digital presence\n\n🎯 Most of our clients go from **idea to launch in 30-60 days!**",
    options: [
      { id: "startup", label: "← Back to Startup" },
      { id: "pricing", label: "💰 See Packages" },
      { id: "live",    label: "💬 Start My Journey", isLive: true },
    ],
  },
  startup_launch: {
    botMsg: "🛫 **Ready to Launch?** Let's make it explosive!\n\nOur Launch Package includes:\n• Full Brand Identity Setup\n• Website & Landing Pages\n• Social Media Account Setup\n• Launch Marketing Campaign\n• Press Release & PR Strategy\n• Paid Ads Setup (Google + Meta)\n\n🔥 We've launched **100+ products** with zero to viral results!",
    options: [
      { id: "startup", label: "← Back to Startup" },
      { id: "pricing", label: "💰 See Packages" },
      { id: "live",    label: "💬 Plan My Launch", isLive: true },
    ],
  },
  startup_scale: {
    botMsg: "📈 **Scaling Your Business?** We've got the playbook!\n\nOur Scaling Solutions:\n• Advanced Marketing Automation\n• Multi-channel Paid Advertising\n• Sales Team Training & Support\n• CRM & Pipeline Optimization\n• International Market Expansion\n• Performance Analytics Dashboard\n\n🚀 Our clients see **average 10x growth** within 12 months!",
    options: [
      { id: "startup", label: "← Back to Startup" },
      { id: "pricing", label: "💰 See Packages" },
      { id: "live",    label: "💬 Scale With Us", isLive: true },
    ],
  },
  startup_franchise: {
    botMsg: "🏢 **Franchise Development** at Makrees:\n\nWe build complete franchise systems:\n• Franchise Operations Manual\n• Franchise Marketing Kit\n• Franchisee Recruitment Campaigns\n• Territory Mapping & Expansion Plan\n• Training Programs & SOPs\n• Legal Documentation Support\n\n🌍 We've helped brands expand to **20+ cities** through franchising!",
    options: [
      { id: "startup", label: "← Back to Startup" },
      { id: "pricing", label: "💰 See Packages" },
      { id: "live",    label: "💬 Expand My Franchise", isLive: true },
    ],
  },
  tech: {
    botMsg: "🤖 **Technology Ventures** at Makrees:\n\nWe specialize in marketing & growing:\n\n✅ Robotics Startups\n✅ STEM Education Programs\n✅ Arduino & Embedded Systems\n✅ AI & Machine Learning Ventures\n✅ EdTech Platforms\n✅ Hardware Product Companies\n\nWe understand the **unique challenges** of tech businesses. What's your venture?",
    options: [
      { id: "tech_robotics", label: "🤖 Robotics Startup" },
      { id: "tech_stem",     label: "🔬 STEM Education" },
      { id: "tech_ai",       label: "🧠 AI Venture" },
      { id: "tech_hardware", label: "⚡ Hardware/Arduino" },
      { id: "main",          label: "🏠 Back to Main Menu" },
      { id: "live",          label: "💬 Talk to Tech Expert", isLive: true },
    ],
  },
  tech_robotics: {
    botMsg: "🤖 **Robotics Startup Marketing** at Makrees:\n\nWe help robotics companies:\n• Build investor-ready pitch decks\n• Create technical product demos\n• B2B & B2G marketing campaigns\n• Trade show & exhibition marketing\n• LinkedIn & industry outreach\n• PR & media coverage strategy\n\n🏆 We've worked with **50+ robotics & hardware** companies worldwide!",
    options: [
      { id: "tech",    label: "← Back to Technology" },
      { id: "pricing", label: "💰 See Pricing" },
      { id: "live",    label: "💬 Grow My Robotics Brand", isLive: true },
    ],
  },
  tech_stem: {
    botMsg: "🔬 **STEM Education Marketing** at Makrees:\n\nWe help STEM programs grow:\n• Student Enrollment Campaigns\n• Parent & School Outreach\n• Workshop Promotion Strategy\n• Online Course Marketing\n• YouTube & Content Strategy\n• Franchise Model for STEM Centers\n\n📚 We've helped STEM institutes increase enrollment by **300%+!**",
    options: [
      { id: "tech",    label: "← Back to Technology" },
      { id: "pricing", label: "💰 See Pricing" },
      { id: "live",    label: "💬 Grow My STEM Program", isLive: true },
    ],
  },
  tech_ai: {
    botMsg: "🧠 **AI Venture Marketing** at Makrees:\n\nWe specialize in AI company growth:\n• Investor Pitch & Fundraising Support\n• Product Hunt & Launch Campaigns\n• Developer Community Marketing\n• B2B SaaS Lead Generation\n• Thought Leadership Content\n• Partnership & Integration Marketing\n\n💡 We understand AI — our team uses AI in everything we do!",
    options: [
      { id: "tech",    label: "← Back to Technology" },
      { id: "pricing", label: "💰 See Pricing" },
      { id: "live",    label: "💬 Launch My AI Product", isLive: true },
    ],
  },
  tech_hardware: {
    botMsg: "⚡ **Hardware & Arduino Marketing** at Makrees:\n\nWe help hardware makers grow:\n• Crowdfunding Campaign Strategy\n• Technical Content & Tutorials\n• Maker Community Outreach\n• E-commerce & Product Listings\n• Demo Videos & Explainers\n• Distributor & Retailer Outreach\n\n🔧 From Kickstarter to mass market — we've done it all!",
    options: [
      { id: "tech",    label: "← Back to Technology" },
      { id: "pricing", label: "💰 See Pricing" },
      { id: "live",    label: "💬 Market My Product", isLive: true },
    ],
  },
  pricing: {
    botMsg: "💰 **Makrees Pricing & Packages:**\n\n🥉 **Starter** — For new businesses\nBranding + Social Media Setup\nStarting from ₹15,000/month\n\n🥈 **Growth** — For scaling businesses\nFull Marketing + Automation\nStarting from ₹35,000/month\n\n🥇 **Enterprise** — For large organizations\nCustom End-to-End Solutions\nCustom Pricing\n\n✨ **All packages include:**\nDedicated account manager, monthly reports & strategy calls\n\nWant a custom quote for your specific needs?",
    options: [
      { id: "main",  label: "🏠 Back to Main Menu" },
      { id: "live",  label: "💬 Get Custom Quote", isLive: true },
    ],
  },
};

// ── FORMAT MESSAGE (bold with **) ─────────────────────────────────────────────
function FormatMsg({ text }) {
  const lines = text.split("\n");
  return (
    <div>
      {lines.map((line, i) => {
        const parts = line.split(/\*\*(.*?)\*\*/g);
        return (
          <p key={i} style={{ margin: i === 0 ? 0 : "4px 0 0" }}>
            {parts.map((p, j) => j % 2 === 1 ? <strong key={j}>{p}</strong> : p)}
          </p>
        );
      })}
    </div>
  );
}

// ── TYPING INDICATOR ──────────────────────────────────────────────────────────
function TypingDots() {
  return (
    <div style={{ display: "flex", gap: 4, alignItems: "center", padding: "12px 14px", background: "#fff", borderRadius: "4px 14px 14px 14px", width: "fit-content", boxShadow: "0 1px 3px rgba(0,0,0,.08)" }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: "#9AA0B4", animation: `dotBounce 1.2s ease-in-out ${i * 0.2}s infinite` }} />
      ))}
    </div>
  );
}

// ── MAIN CHAT WIDGET ──────────────────────────────────────────────────────────
export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [options, setOptions] = useState([]);
  const [typing, setTyping] = useState(false);
  const [inputText, setInputText] = useState("");
  const [unread, setUnread] = useState(1);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  // Init chat on open
  useEffect(() => {
    if (open && messages.length === 0) {
      setUnread(0);
      startFlow("main");
    }
    if (open) setUnread(0);
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const addBotMsg = (text, delay = 800) => new Promise(res => {
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(prev => [...prev, { type: "bot", text }]);
      res();
    }, delay);
  });

  const startFlow = async (flowId) => {
    const flow = FLOWS[flowId];
    if (!flow) return;
    setOptions([]);
    await addBotMsg(flow.botMsg, flowId === "main" ? 600 : 900);
    setOptions(flow.options);
  };

  const handleOption = async (opt) => {
    if (opt.isLive) {
      // Add user bubble
      setMessages(prev => [...prev, { type: "user", text: opt.label }]);
      setOptions([]);
      await addBotMsg("Connecting you to our team... 🔄\n\nClick the button below to start a live chat on WhatsApp! Our team typically responds within **5 minutes**. 🚀", 800);
      setOptions([{ id: "open_wa", label: "💬 Open WhatsApp Now", isWaBtn: true }]);
      return;
    }
    if (opt.id === "open_wa") {
      window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hi Makrees! I'd like to speak with your team. 👋")}`, "_blank");
      return;
    }
    setMessages(prev => [...prev, { type: "user", text: opt.label }]);
    setOptions([]);
    await startFlow(opt.id);
  };

  const handleTextSend = async () => {
    const txt = inputText.trim();
    if (!txt) return;
    setInputText("");
    setMessages(prev => [...prev, { type: "user", text: txt }]);
    setOptions([]);
    // Simple keyword matching
    const lower = txt.toLowerCase();
    if (lower.includes("market") || lower.includes("social") || lower.includes("email")) {
      await startFlow("marketing");
    } else if (lower.includes("brand") || lower.includes("logo") || lower.includes("design")) {
      await startFlow("branding");
    } else if (lower.includes("startup") || lower.includes("launch") || lower.includes("scale")) {
      await startFlow("startup");
    } else if (lower.includes("robot") || lower.includes("ai") || lower.includes("tech") || lower.includes("stem") || lower.includes("arduino")) {
      await startFlow("tech");
    } else if (lower.includes("price") || lower.includes("pricing") || lower.includes("cost") || lower.includes("package")) {
      await startFlow("pricing");
    } else if (lower.includes("human") || lower.includes("agent") || lower.includes("talk") || lower.includes("live")) {
      await addBotMsg("Sure! Let me connect you to our team. 🤝", 600);
      setOptions([{ id: "open_wa", label: "💬 Open WhatsApp Now", isWaBtn: true }]);
    } else {
      await addBotMsg("Thanks for your message! 😊 Let me help you find what you're looking for. Here are our main services:", 800);
      setOptions(FLOWS.main.options);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleTextSend(); }
  };

  const resetChat = () => {
    setMessages([]);
    setOptions([]);
    setTyping(false);
    startFlow("main");
  };

  return (
    <>
      <style>{`
        @keyframes dotBounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-6px)} }
        @keyframes chatSlideUp { from{opacity:0;transform:translateY(20px) scale(.96)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes badgePop { 0%{transform:scale(0)} 70%{transform:scale(1.2)} 100%{transform:scale(1)} }
        .chat-option-btn { background:#fff; border:1.5px solid rgba(27,43,143,.18); border-radius:20px; padding:8px 14px; font-size:12px; color:#1B2B8F; font-weight:600; cursor:pointer; transition:all .2s; text-align:left; font-family:inherit; width:100%; }
        .chat-option-btn:hover { background:rgba(27,43,143,.06); border-color:#1B2B8F; transform:translateX(2px); }
        .chat-option-btn.live { background:linear-gradient(135deg,#25D366,#128C7E); border-color:transparent; color:#fff; }
        .chat-option-btn.live:hover { box-shadow:0 4px 14px rgba(37,211,102,.4); transform:translateY(-1px); }
        .chat-option-btn.wa-btn { background:linear-gradient(135deg,#25D366,#128C7E); border-color:transparent; color:#fff; font-size:14px; padding:12px 20px; border-radius:24px; }
        .chat-option-btn.wa-btn:hover { box-shadow:0 6px 20px rgba(37,211,102,.45); }
        .chat-scroll::-webkit-scrollbar { width:3px; }
        .chat-scroll::-webkit-scrollbar-thumb { background:rgba(27,43,143,.2); border-radius:3px; }
      `}</style>

      <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 12 }}>
        {/* CHAT WINDOW */}
        {open && (
          <div style={{ width: "min(360px, calc(100vw - 48px))", background: "#F0F2F8", borderRadius: 20, boxShadow: "0 12px 48px rgba(0,0,0,.18)", overflow: "hidden", animation: "chatSlideUp .3s ease", border: "1px solid rgba(27,43,143,.08)", display: "flex", flexDirection: "column", height: "min(560px, 75vh)" }}>

            {/* HEADER */}
            <div style={{ background: "linear-gradient(135deg,#1B2B8F,#2D3FBE)", padding: "14px 16px", display: "flex", alignItems: "center", gap: 11, flexShrink: 0 }}>
              <div style={{ width: 42, height: 42, borderRadius: "50%", overflow: "hidden", border: "2px solid rgba(255,255,255,.3)", flexShrink: 0 }}>
                <img src="/makrees_logo.jpeg" alt="Makrees" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ color: "#fff", fontWeight: 700, fontSize: 14, fontFamily: "'Space Grotesk',sans-serif" }}>Makrees Assistant</div>
                <div style={{ color: "rgba(255,255,255,.75)", fontSize: 11, display: "flex", alignItems: "center", gap: 5, marginTop: 2 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4eff91", display: "inline-block" }} />
                  Online • Usually replies in 5 min
                </div>
              </div>
              <button onClick={resetChat} title="Restart" style={{ background: "rgba(255,255,255,.15)", border: "none", color: "#fff", cursor: "pointer", borderRadius: 8, width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, marginRight: 4 }}>↺</button>
              <button onClick={() => setOpen(false)} style={{ background: "rgba(255,255,255,.15)", border: "none", color: "#fff", cursor: "pointer", borderRadius: 8, width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <IconClose />
              </button>
            </div>

            {/* MESSAGES */}
            <div className="chat-scroll" style={{ flex: 1, overflowY: "auto", padding: "16px 14px", display: "flex", flexDirection: "column", gap: 10 }}>
              {messages.map((msg, i) => (
                <div key={i} style={{ display: "flex", justifyContent: msg.type === "user" ? "flex-end" : "flex-start" }}>
                  {msg.type === "bot" && (
                    <div style={{ width: 28, height: 28, borderRadius: "50%", overflow: "hidden", flexShrink: 0, marginRight: 8, marginTop: 2, border: "1.5px solid rgba(27,43,143,.15)" }}>
                      <img src="/makrees_logo.jpeg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                  )}
                  <div style={{
                    maxWidth: "78%",
                    background: msg.type === "user" ? "linear-gradient(135deg,#1B2B8F,#2D3FBE)" : "#fff",
                    color: msg.type === "user" ? "#fff" : "#1A1A2E",
                    borderRadius: msg.type === "user" ? "14px 4px 14px 14px" : "4px 14px 14px 14px",
                    padding: "10px 13px",
                    fontSize: 13,
                    lineHeight: 1.6,
                    boxShadow: "0 1px 4px rgba(0,0,0,.08)",
                  }}>
                    <FormatMsg text={msg.text} />
                  </div>
                </div>
              ))}
              {typing && (
                <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", overflow: "hidden", border: "1.5px solid rgba(27,43,143,.15)" }}>
                    <img src="/makrees_logo.jpeg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <TypingDots />
                </div>
              )}
              {/* OPTIONS */}
              {!typing && options.length > 0 && (
                <div style={{ display: "flex", flexDirection: "column", gap: 7, marginTop: 4 }}>
                  {options.map(opt => (
                    <button key={opt.id} onClick={() => handleOption(opt)}
                      className={`chat-option-btn${opt.isLive ? " live" : ""}${opt.isWaBtn ? " wa-btn" : ""}`}>
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* INPUT */}
            <div style={{ padding: "10px 12px", background: "#fff", borderTop: "1px solid #E8ECF4", display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
              <input ref={inputRef} value={inputText} onChange={e => setInputText(e.target.value)} onKeyDown={handleKeyDown}
                placeholder="Type your message..." style={{ flex: 1, border: "1.5px solid #E2E6F0", borderRadius: 20, padding: "9px 14px", fontSize: 13, outline: "none", fontFamily: "inherit", color: "#1A1A2E", background: "#F8F9FC" }} />
              <button onClick={handleTextSend} style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#1B2B8F,#E53935)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", flexShrink: 0 }}>
                <IconSend />
              </button>
            </div>

            {/* FOOTER */}
            <div style={{ background: "#fff", textAlign: "center", padding: "6px", borderTop: "1px solid #F0F2F8" }}>
              <span style={{ fontSize: 10, color: "#B0B8CC" }}>Powered by </span>
              <span style={{ fontSize: 10, fontWeight: 700, color: "#1B2B8F" }}>Makrees AI</span>
            </div>
          </div>
        )}

        {/* FLOAT BUTTON */}
        <div style={{ position: "relative" }}>
          {!open && unread > 0 && (
            <div style={{ position: "absolute", top: -4, right: -4, width: 18, height: 18, borderRadius: "50%", background: "#E53935", color: "#fff", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", animation: "badgePop .4s ease", zIndex: 1 }}>{unread}</div>
          )}
          <button onClick={() => setOpen(!open)} style={{ width: 58, height: 58, borderRadius: "50%", background: open ? "#E53935" : "linear-gradient(135deg,#25D366,#128C7E)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(37,211,102,.5)", transition: "all .3s ease", color: "#fff" }}
            onMouseOver={e => e.currentTarget.style.transform = "scale(1.1) rotate(5deg)"}
            onMouseOut={e => e.currentTarget.style.transform = "scale(1) rotate(0deg)"}>
            {open ? <IconClose /> : <IconWhatsApp />}
          </button>
        </div>
      </div>
    </>
  );
}
