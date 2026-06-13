import { Helmet } from "react-helmet-async";

const BASE_URL = "https://makrees.com";
const DEFAULT_IMAGE = `${BASE_URL}/makrees_logo.jpeg`;

const PAGE_SEO = {
  Home: {
    title: "Makrees | Global AI-Powered Marketing & Business Growth Agency",
    description: "Makrees helps businesses, startups, and entrepreneurs grow faster through AI-powered marketing, branding, automation, and technology solutions. 500+ clients, 50+ countries.",
    keywords: "AI marketing agency, business growth, marketing automation, branding agency, startup growth, social media marketing, digital marketing India",
    url: `${BASE_URL}/`,
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Makrees Home",
      "description": "Global AI-Powered Marketing & Business Growth Agency",
      "url": `${BASE_URL}/`
    }
  },
  Services: {
    title: "Our Services | Marketing, Branding & Business Growth - Makrees",
    description: "Explore Makrees' 12 specialized services: marketing automation, social media marketing, email campaigns, branding, logo design, video production, startup development, franchise expansion, and more.",
    keywords: "marketing services, social media marketing, email marketing, branding services, logo design, video production, startup development, franchise development, sales funnel, recruitment solutions",
    url: `${BASE_URL}/#services`,
    schema: {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Makrees Services",
      "description": "Complete list of marketing and business growth services offered by Makrees",
      "url": `${BASE_URL}/#services`,
      "numberOfItems": 12,
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Marketing Automation" },
        { "@type": "ListItem", "position": 2, "name": "Social Media Marketing" },
        { "@type": "ListItem", "position": 3, "name": "Email Marketing Campaigns" },
        { "@type": "ListItem", "position": 4, "name": "Branding & Brand Strategy" },
        { "@type": "ListItem", "position": 5, "name": "Logo Design & Visual Identity" },
        { "@type": "ListItem", "position": 6, "name": "Brand Shoots & Video Editing" },
        { "@type": "ListItem", "position": 7, "name": "Vlogging & Content Creation" },
        { "@type": "ListItem", "position": 8, "name": "Product Marketing & GTM" },
        { "@type": "ListItem", "position": 9, "name": "Startup Development" },
        { "@type": "ListItem", "position": 10, "name": "Franchise Development" },
        { "@type": "ListItem", "position": 11, "name": "Sales Funnel Creation" },
        { "@type": "ListItem", "position": 12, "name": "Recruitment & Hiring" }
      ]
    }
  },
  Technology: {
    title: "Technology & Innovation | Robotics, STEM, AI Marketing - Makrees",
    description: "Makrees specializes in marketing and scaling technology ventures including Robotics startups, STEM education programs, AI companies, and Arduino & embedded systems businesses worldwide.",
    keywords: "robotics marketing, STEM education marketing, AI startup marketing, Arduino marketing, embedded systems, technology venture growth, EdTech marketing, hardware startup",
    url: `${BASE_URL}/#technology`,
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Makrees Technology & Innovation",
      "description": "Marketing and growth solutions for technology ventures - Robotics, STEM, AI, Arduino",
      "url": `${BASE_URL}/#technology`,
      "specialty": ["Robotics Marketing", "STEM Education Marketing", "AI Startup Growth", "Hardware Marketing"]
    }
  },
  About: {
    title: "About Makrees | AI-Powered Global Growth Agency - Insights, Innovation, Impact",
    description: "Learn about Makrees, founded by Madhusmita Nayak. Our mission is to empower businesses worldwide through AI-driven marketing, automation, branding, and innovative growth strategies across 50+ countries.",
    keywords: "about Makrees, Madhusmita Nayak, Makrees founder, global marketing agency, AI marketing company, business growth agency India",
    url: `${BASE_URL}/#about`,
    schema: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "About Makrees",
      "description": "Global AI-powered marketing and business growth company",
      "url": `${BASE_URL}/#about`,
      "mainEntity": {
        "@type": "Organization",
        "name": "Makrees Research",
        "founder": {
          "@type": "Person",
          "name": "Madhusmita Nayak",
          "jobTitle": "Founder & CEO"
        }
      }
    }
  },
  Contact: {
    title: "Contact Makrees | Get a Free Business Growth Consultation",
    description: "Contact Makrees for a free business growth consultation. Reach us at growth@makrees.com or WhatsApp +91 7894357177. We respond within 24 hours with a tailored growth plan.",
    keywords: "contact Makrees, free consultation, business growth consultation, marketing consultation, growth@makrees.com, Makrees WhatsApp",
    url: `${BASE_URL}/#contact`,
    schema: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Contact Makrees",
      "description": "Get in touch with Makrees for a free business growth consultation",
      "url": `${BASE_URL}/#contact`,
      "mainEntity": {
        "@type": "Organization",
        "name": "Makrees",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+91-7894357177",
          "email": "growth@makrees.com",
          "contactType": "customer service",
          "availableLanguage": ["English", "Hindi"]
        }
      }
    }
  }
};

export default function SEO({ page }) {
  const seo = PAGE_SEO[page] || PAGE_SEO.Home;

  return (
    <Helmet>
      {/* Primary */}
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords} />
      <link rel="canonical" href={seo.url} />

      {/* Open Graph */}
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:image" content={DEFAULT_IMAGE} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Makrees" />

      {/* Twitter */}
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={DEFAULT_IMAGE} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@Mak_rees" />

      {/* Page-specific JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(seo.schema)}
      </script>
    </Helmet>
  );
}
