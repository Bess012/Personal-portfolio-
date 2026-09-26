import React, { useState, useEffect } from "react";

// Set this to '/photo.jpg' (or similar) once you have a headshot — the placeholder
// in the About section below will swap for the real image automatically.
const photoSrc = "/assets/profilepic.jpg";

// Path to your CV — drop the file at public/assets/cv.pdf
const cvSrc = "/assets/CV-Bessem.pdf";

const skills = [
  {
    cat: "LANGUAGES",
    items: [
      { name: "C", icon: "devicon-c-plain colored" },
      { name: "C++", icon: "devicon-cplusplus-plain colored" },
      { name: "Python", icon: "devicon-python-plain colored" },
      { name: "Java", icon: "devicon-java-plain colored" },
    ],
  },
  {
    cat: "BACKEND",
    items: [
      { name: "Django", icon: "devicon-django-plain colored" },
      { name: "Flask", icon: "devicon-flask-original" },
      { name: "FastAPI", icon: "devicon-fastapi-plain colored" },
    ],
  },
  {
    cat: "FRONTEND",
    items: [
      { name: "HTML", icon: "devicon-html5-plain colored" },
      { name: "CSS", icon: "devicon-css3-plain colored" },
      { name: "JavaScript", icon: "devicon-javascript-plain colored" },
      { name: "React", icon: "devicon-react-original colored" },
    ],
  },
  {
    cat: "MOBILE",
    items: [
      { name: "React Native", icon: "devicon-react-original colored" },
      { name: "Expo", icon: "devicon-expo-original" },
    ],
  },
  {
    cat: "DATABASES",
    items: [
      { name: "PostgreSQL", icon: "devicon-postgresql-plain colored" },
      { name: "Neo4j", icon: "devicon-neo4j-plain colored" },
      { name: "Redis", icon: "devicon-redis-plain colored" },
    ],
  },
  {
    cat: "AI / DATA",
    items: [
      { name: "PyTorch", icon: "devicon-pytorch-original colored" },
      { name: "Pandas", iconSrc: "https://cdn.simpleicons.org/pandas/150458" },
      { name: "NumPy", iconSrc: "https://cdn.simpleicons.org/numpy/013243" },
      { name: "Docker", icon: "devicon-docker-plain colored" },
    ],
  },
];

// Each project can override how its image is displayed inside the card:
//   fit:      "cover" | "contain"  → object-fit
//   position: CSS object-position  → e.g. "center", "top", "center top"
//   bg:       backdrop color behind contained images (fills letterboxing)
const projects = [
  {
    name: "EcoNexus",
    kind: "Academic",
    desc: "A SaaS platform for ESG analysis and decision-making, built around a RAG-powered chatbot that lets users query sustainability data in natural language. Users interact with live ESG data through natural-language queries; the backend combines a vector store, a graph DB, and a caching layer.",
    stack: [
      "React",
      "Python",
      "FastAPI",
      "PostgreSQL",
      "Weaviate",
      "Neo4j",
      "Redis",
      "Docker",
    ],
    image: "/assets/connexion.png",
    fit: "cover",
    position: "center 30%",
    bg: "#0b1a13",
  },
  {
    name: "Gymini",
    kind: "Personal",
    desc: "A cross-platform mobile app for nutrition and fitness tracking. Users log meals and workouts and receive AI-powered recommendations adapted to their goals. Background jobs handle reminders and data aggregation via Celery.",
    stack: [
      "React Native",
      "Expo",
      "Python",
      "Django",
      "DRF",
      "PostgreSQL",
      "Redis",
      "JWT",
      "Celery",
    ],
    image: "/assets/gymini.png",
    fit: "cover",
    position: "center 25%",
    bg: "#0a0a12",
  },
  {
    name: "Extractor Agent",
    kind: "Professional",
    desc: "A VS Code extension that extracts a structured JSON representation of Simulink/Stateflow models from auto-generated image-only PDFs. Uses a local vision-language model (Qwen2.5-VL via Ollama) for semantic reading and deterministic Python for geometry, OCR, parsing, merging, and contract validation — no cloud APIs, no second LLM.",
    stack: [
      "Python",
      "FastAPI",
      "Qwen2.5-VL",
      "Ollama",
      "OCR",
      "React",
      "TypeScript",
      "VS Code",
    ],
    image: "/assets/upload.png",
    fit: "cover",
    position: "center top",
    bg: "#0d0d1a",
  },
  {
    name: "DiagFix",
    kind: "Professional",
    desc: "An intuitive web app built for Tunisie Telecom to automatically diagnose customer fixed-line faults. Customers enter their line number and get a clear fault description. Problems are ranked across three urgency levels. An admin mode (password-protected) displays a dashboard sorted by severity with a repair button that resolves issues and updates the data file live.",
    stack: ["HTML", "CSS", "JS", "Flask", "JSON"],
    image: "/assets/interface.png",
    fit: "cover",
    position: "center 25%",
    bg: "#f5f7fb",
  },
  {
    name: "The Investigator",
    kind: "Personal",
    desc: "A deep learning model built from scratch that reads short murder-mystery stories and predicts the culprit. Trained a custom BiLSTM with a hand-crafted tokenizer on LLM-generated story data.",
    stack: ["Python", "PyTorch", "BiLSTM", "Custom Tokenizer", "LLM Data Gen"],
    image: "/assets/investigator.png",
    fit: "cover",
    position: "center 38%",
    bg: "#0b0b12",
  },
  {
    name: "KTEBI",
    kind: "Academic",
    desc: "An online library platform for reading enthusiasts to browse, search, and manage books. Full CRUD with a PHP backend and a clean, responsive front-end.",
    stack: ["HTML", "CSS", "JS", "PHP"],
    image: "/assets/Ktebi.png",
    fit: "cover",
    position: "center top",
    bg: "#f5f0e6",
  },
  {
    name: "E-Uber",
    kind: "Academic",
    desc: "A terminal application connecting customers with taxi drivers, built as a systems-programming exercise in C. Implements socket communication and process management.",
    stack: ["C", "CodeBlocks"],
  },
];

// `logo` is a monogram placeholder. Swap the <Logo initials="XX" /> usage below
// for a real <img src="..." /> once you have actual company logos.
const experience = [
  {
    when: "Summer 2026",
    company: "Akkurad Engineering",
    logo: "/assets/akkurad_gmbh_logo.jpeg",
    role: "AI Developer Intern — Akkurad Engineering",
    desc: "Built an AI agent to automatically extract information from Simulink PDF reports via Matlab. Developed a FastAPI backend and a VS Code extension with a React/TypeScript interface to visualize the extracted data.",
    stack: [
      "Python",
      "FastAPI",
      "Qwen2.5-VL",
      "Ollama",
      "OCR",
      "React",
      "TypeScript",
      "VS Code",
    ],
  },
  {
    when: "Summer 2025",
    company: "Tunisie Telecom",
    logo: "/assets/1.jpg",
    role: "Developer Intern — Tunisie Telecom",
    desc: "Developed Diagfix, an application for automatic diagnostics on customer fixed lines. Analyzed network faults and automated the diagnostic process.",
    stack: ["HTML", "CSS", "JS", "Flask", "JSON"],
  },
];

const education = [
  {
    when: "2024 – 2027",
    name: "École Nationale des Sciences de l\u2019Informatique- ENSI",
    detail: "Diplôme d\u2019ingénieur en informatique — Manouba",
  },
  {
    when: "2022 – 2024",
    name: "Institut Préparatoire d\u2019Études d\u2019Ingénieur Nabeul-IPEIN",
    detail: "Diplôme de fin d\u2019études préparatoires",
  },
  {
    when: "2022",
    name: "Lycée Technique Gaafour-LTG",
    detail: "Baccalauréat en Mathématiques — Moyenne : 14,69",
  },
];

const certs = [
  {
    name: "Introduction to Deep Learning",
    company: "NVIDIA",
    logoSrc: "assets/76B900.svg",
  },
  {
    name: "Introduction to Cybersecurity",
    company: "Cisco Networking Academy",
    logoSrc: "assets/049FD9.svg",
  },
];

const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

function Rail({ idx, title }) {
  return (
    <div className="lg:sticky lg:top-24 lg:pr-8">
      <span className="font-mono text-[13px] text-amberdim block mb-2">
        {idx}
      </span>
      <h2 className="text-2xl font-semibold">{title}</h2>
    </div>
  );
}

function Tag({ children }) {
  return (
    <span className="font-mono text-[11.5px] text-paperdim border border-amber/40 px-2 py-0.5">
      {children}
    </span>
  );
}

function Photo({ src }) {
  const inner = src ? (
    <img
      src={src}
      alt="Bessem Jouini"
      className="w-full aspect-square object-cover"
    />
  ) : (
    <div className="relative w-full aspect-square border border-dashed border-amber/35 bg-ink/60 flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(232,163,61,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(232,163,61,0.15) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />
      <span className="relative font-mono text-[11px] text-amberdim tracking-wide">
        PROFILE PHOTO
      </span>
      <span className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-amber/50" />
      <span className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-amber/50" />
      <span className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-amber/50" />
      <span className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-amber/50" />
    </div>
  );

  return (
    <div
      className="group cursor-pointer relative"
      style={{ perspective: "1000px" }}
    >
      <div className="transition-transform duration-500 transform-gpu group-hover:rotate-y-12 group-hover:rotate-x-12 group-hover:scale-105 group-hover:shadow-[0_0_30px_rgba(232,163,61,0.15)] relative z-10 bg-panel">
        {inner}
      </div>
      <div className="absolute inset-0 bg-amber/20 transition-transform duration-500 transform-gpu group-hover:-translate-x-2 group-hover:translate-y-2 z-0"></div>
    </div>
  );
}

function ProjectCard({ p }) {
  const [flipped, setFlipped] = useState(false);

  // Per-project image presentation (falls back to sensible defaults)
  const fit = p.fit || "cover";
  const position = p.position || "center";
  const bg = p.bg || "#0b0b0b";

  return (
    <div
      className="pc-card select-none cursor-pointer touch-manipulation relative z-0 transition-all duration-300"
      style={{ perspective: "1400px" }}
      onClick={() => setFlipped(!flipped)}
    >
      <div className="pc-card-inner transition-all duration-500 transform-gpu h-full origin-center">
        <div
          style={{
            transformStyle: "preserve-3d",
            transition: "transform 0.6s cubic-bezier(0.4,0.2,0.2,1)",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
            position: "relative",
            minHeight: "360px",
          }}
        >
          {/* ── FRONT: big image + name/kind/stack ── */}
          <div
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
            className={`absolute inset-0 border border-amber/20 bg-panel flex flex-col overflow-hidden group ${
              flipped ? "pointer-events-none" : ""
            }`}
          >
            {/* Image area — takes up most of the card */}
            {p.image ? (
              <div
                className="relative flex-1 overflow-hidden"
                style={{ background: bg }}
              >
                <img
                  src={p.image}
                  alt={`${p.name} screenshot`}
                  className="w-full h-full transition-transform duration-500 group-hover:scale-105"
                  style={{ objectFit: fit, objectPosition: position }}
                />
                {/* subtle gradient overlay at the bottom */}
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-panel to-transparent z-0 pointer-events-none" />
              </div>
            ) : (
              <div className="flex-1 p-5 border-b border-amber/10 bg-ink flex flex-col items-center justify-center gap-4 relative overflow-hidden">
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage:
                      "radial-gradient(#e8a33d 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                ></div>
                <div className="w-16 h-16 rounded-full border border-amber/20 bg-panel flex items-center justify-center text-amber/80 shadow-[0_0_20px_rgba(232,163,61,0.1)] relative z-10 group-hover:scale-110 transition-transform duration-500">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M4 17l6-6-6-6M12 19h8" />
                  </svg>
                </div>
                <div className="font-mono text-[11px] text-amberdim uppercase tracking-widest relative z-10 text-center">
                  {p.name}
                </div>
              </div>
            )}
            {/* Bottom bar */}
            <div className="p-4 shrink-0 bg-panel relative">
              <div className="flex justify-between items-center gap-2 flex-wrap mb-2">
                <h3 className="text-[17px] font-semibold">{p.name}</h3>
                <span className="font-mono text-[10px] text-amberdim border border-amberdim/60 px-2 py-0.5">
                  {p.kind}
                </span>
              </div>
              <div className="flex gap-1.5 flex-wrap">
                {p.stack.slice(0, 5).map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
                {p.stack.length > 5 && (
                  <span className="font-mono text-[10.5px] text-amberdim">
                    +{p.stack.length - 5}
                  </span>
                )}
              </div>
              {p.image && (
                <div className="pc-hint mt-3 font-mono text-[10px] text-amber/40 flex items-center gap-1.5 transition-opacity opacity-70">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M7 16L3 12l4-4M17 8l4 4-4 4M14 4l-4 16" />
                  </svg>
                  tap to flip for details
                </div>
              )}
            </div>
          </div>

          {/* ── BACK: project description ── */}
          <div
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
            className={`absolute inset-0 border border-amber/30 bg-panel flex flex-col overflow-hidden p-5 ${
              flipped ? "" : "pointer-events-none"
            }`}
          >
            <div className="flex justify-between items-start gap-2 mb-3">
              <h3 className="text-[18px] font-semibold leading-tight">
                {p.name}
              </h3>
              <span className="font-mono text-[10px] text-amberdim border border-amberdim/60 px-2 py-0.5 shrink-0">
                {p.kind}
              </span>
            </div>
            <p className="text-paperdim text-[14px] leading-relaxed flex-1 overflow-y-auto pr-2">
              {p.desc}
            </p>
            <div className="mt-4 flex gap-2 flex-wrap shrink-0">
              {p.stack.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
            <div className="mt-4 font-mono text-[10px] text-amber/40">
              ↩ tap to flip back
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TerminalPanel() {
  const lines = [
    { t: "$ ", c: "whoami", dim: false },
    { t: "> ", c: "bessem jouini — software engineer", dim: true },
    { t: "$ ", c: "status --check", dim: false },
    { t: "> ", c: "ai systems ......... online", dim: true },
    { t: "> ", c: "backend apis ....... online", dim: true },
    { t: "> ", c: "availability ....... open for opportunities", dim: true },
    { t: "$ ", c: "run diagnostics.sh", dim: false },
    { t: "> ", c: "analyzing 7 projects, 2 internships", dim: true },
    { t: "> ", c: "result: ready to build", dim: true },
  ];
  return (
    <div className="font-mono text-[11.5px] sm:text-[13px] leading-relaxed">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-amber/15">
        <span className="w-2.5 h-2.5 rounded-full bg-amber/60 shrink-0" />
        <span className="w-2.5 h-2.5 rounded-full bg-paperdim/40 shrink-0" />
        <span className="w-2.5 h-2.5 rounded-full bg-paperdim/40 shrink-0" />
        <span className="ml-2 text-paperdim/70 text-[10.5px] sm:text-[11.5px]">
          session.log
        </span>
      </div>
      {lines.map((l, i) => (
        <div key={i} className="whitespace-pre-wrap break-words">
          <span className={l.dim ? "text-paperdim" : "text-amber"}>{l.t}</span>
          <span className={l.dim ? "text-paperdim" : "text-paper"}>{l.c}</span>
        </div>
      ))}
      <div className="mt-1">
        <span className="text-amber">$ </span>
        <span className="inline-block w-2 h-3.5 bg-amber/70 align-middle" />
      </div>
    </div>
  );
}

function Logo({ src, initials, size = "w-11 h-11 text-[12px]" }) {
  return (
    <div
      className={`${size} shrink-0 border border-amber/30 bg-ink flex items-center justify-center overflow-hidden`}
    >
      {src ? (
        <img src={src} alt="" className="w-full h-full object-contain" />
      ) : (
        <span className="font-mono text-amberdim font-medium">{initials}</span>
      )}
    </div>
  );
}

export default function App() {
  const [expandedImage, setExpandedImage] = useState(null);
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.id))
      .filter(Boolean);

    if (sections.length === 0) return;

    // A thin band around the vertical middle of the viewport — whichever
    // section is crossing it becomes "active" in the nav.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <div>
      {/* Expanded Image Modal */}
      {expandedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-10 bg-ink/90 backdrop-blur-sm"
          onClick={() => setExpandedImage(null)}
        >
          <div className="relative max-w-7xl w-full h-full flex flex-col items-center justify-center cursor-zoom-out">
            <button
              className="absolute top-4 right-4 text-paperdim hover:text-amber font-mono text-[13px] bg-panel border border-amber/20 px-4 py-2 transition-colors z-10"
              onClick={() => setExpandedImage(null)}
            >
              CLOSE [Esc]
            </button>
            <img
              src={expandedImage}
              alt="Expanded view"
              className="max-w-full max-h-full object-contain border border-amber/20 bg-panel shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      <header className="sticky top-0 z-10 bg-ink/90 backdrop-blur border-b border-amber/20">
        <div className="w-full px-6 lg:px-10 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="font-mono font-semibold text-[16px]">
              BESSEM JOUINI
            </div>
            <a
              href={cvSrc}
              download
              className="group inline-flex items-center gap-1.5 font-mono text-[11px] px-3 py-1.5 border border-amber/40 text-amber hover:bg-amber hover:text-ink transition-colors"
              title="Download CV"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 3v12" />
                <path d="M7 10l5 5 5-5" />
                <path d="M5 21h14" />
              </svg>
              CV
            </a>
          </div>

          {/* Desktop nav — all 5 sections, always visible from md up */}
          <nav className="hidden md:flex gap-6 font-mono text-[13px] text-paperdim">
            {navLinks.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                className={`transition-colors ${
                  activeSection === l.id ? "text-amber" : "hover:text-amber"
                }`}
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Mobile menu toggle — only exists below md */}
          <button
            className="md:hidden inline-flex items-center justify-center w-9 h-9 border border-amber/30 text-amber shrink-0"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile dropdown — same 5 links as desktop, nothing hidden */}
        {menuOpen && (
          <nav className="md:hidden border-t border-amber/20 bg-ink/95 backdrop-blur flex flex-col px-6 py-2 font-mono text-[14px]">
            {navLinks.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={() => setMenuOpen(false)}
                className={`py-3 border-b border-amber/10 last:border-b-0 ${
                  activeSection === l.id ? "text-amber" : "text-paperdim"
                }`}
              >
                {l.label}
              </a>
            ))}
          </nav>
        )}
      </header>

      <section id="home" className="border-b border-amber/20">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-10 py-20 lg:py-28 grid lg:grid-cols-[1.15fr_0.85fr] gap-8 lg:gap-14 items-center">
          <div>
            <h1 className="font-bold leading-[1.06] text-[clamp(36px,5vw,64px)]">
              I build software that turns raw data into decisions.
            </h1>
            <p className="mt-6 text-lg text-paperdim max-w-[54ch]">
              3rd-year Engineering student at ENSI focused on AI-integrated
              systems and full-stack development — from RAG chatbots and
              vision-language pipelines to automated agents.
            </p>
            <div className="mt-9 flex gap-3.5 flex-wrap">
              <a
                href="#contact"
                className="font-mono text-[13px] px-5 py-3 bg-amber text-ink font-medium"
              >
                Get in touch
              </a>
              <a
                href="#projects"
                className="font-mono text-[13px] px-5 py-3 border border-amber/40 hover:border-amber"
              >
                View projects
              </a>
            </div>
          </div>
          <div className="w-full max-w-full overflow-hidden border border-amber/20 bg-panel p-4 sm:p-6 group hover:border-amber/50 hover:bg-amber/5 transition-all duration-200">
            <TerminalPanel />
          </div>
        </div>
      </section>

      <section id="about" className="border-b border-amber/20">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-10 py-16 grid lg:grid-cols-[220px_1fr] gap-8 lg:gap-14">
          <Rail idx="01" title="About" />
          <div className="grid sm:grid-cols-[1fr_350px] gap-8 items-start">
            <div>
              <p className="max-w-[64ch] text-paperdim text-[15.5px]">
                I'm a 3rd-year computer science engineering student at
                ENSI-Manouba, focused on building AI-powered and full-stack
                software systems. I've worked across backend development, data
                processing, and applied AI through academic projects and
                internships. I enjoy turning complex, real-world problems into
                practical software and I'm currently looking for an opportunity
                to contribute to challenging engineering projects while
                deepening my expertise in AI and software development.
              </p>
              <div className="mt-6 flex gap-8 flex-wrap font-mono text-[13px] text-paperdim">
                <div>
                  <b className="font-sans text-paper">Français</b> — B2
                </div>
                <div>
                  <b className="font-sans text-paper">English</b> — B2
                </div>
                <div>
                  <b className="font-sans text-paper">Deutsch</b> — A1
                </div>
              </div>
            </div>
            <div className="border border-amber/20 bg-panel p-2 w-full max-w-[350px] mx-auto">
              <Photo src={photoSrc} />
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="border-b border-amber/20">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-10 py-16 grid lg:grid-cols-[220px_1fr] gap-8 lg:gap-14">
          <Rail idx="02" title="Skills" />
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-px bg-amber/20 border border-amber/20">
            {skills.map((s) => (
              <div key={s.cat} className="bg-panel p-6">
                <div className="font-mono text-xs text-amber mb-3">{s.cat}</div>
                <div className="flex flex-wrap gap-3">
                  {s.items.map((item) => (
                    <div
                      key={item.name}
                      className="flex flex-col items-center gap-1.5 group"
                      title={item.name}
                    >
                      <div className="w-9 h-9 border border-amber/15 bg-ink/60 flex items-center justify-center group-hover:border-amber/40 transition-colors duration-150">
                        {item.iconSrc ? (
                          <img
                            src={item.iconSrc}
                            alt={item.name}
                            className="w-5 h-5 opacity-80 group-hover:opacity-100 transition-opacity"
                          />
                        ) : (
                          <i
                            className={`${item.icon}`}
                            style={{ fontSize: "20px" }}
                          />
                        )}
                      </div>
                      <span className="font-mono text-[9.5px] text-paperdim/70 text-center leading-tight max-w-[44px]">
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="border-b border-amber/20">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-10 py-16 grid lg:grid-cols-[220px_1fr] gap-8 lg:gap-14">
          <Rail idx="03" title="Projects" />
          <div>
            <div className="grid sm:grid-cols-2 gap-5">
              {projects.map((p) => (
                <ProjectCard key={p.name} p={p} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="experience" className="border-b border-amber/20">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-10 py-16 grid lg:grid-cols-[220px_1fr] gap-8 lg:gap-14">
          <Rail idx="04" title="Experience" />
          <div>
            {experience.map((e, i) => (
              <div
                key={e.role}
                className="group border border-amber/20 bg-panel p-6 mb-6 hover:border-amber/50 hover:bg-amber/5 transition-all duration-200"
              >
                <div className="grid grid-cols-1 sm:grid-cols-[170px_1fr] gap-6">
                  <div>
                    <div className="font-mono text-[12.5px] text-amberdim mb-4">
                      {e.when}
                    </div>
                    <div className="transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-3 w-fit">
                      <Logo src={e.logo} size="w-20 h-20 text-[20px]" />
                    </div>
                    <div className="mt-4 font-mono text-[12px] text-paperdim transition-colors group-hover:text-paper">
                      {e.company}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-[17px] font-semibold mb-2 transition-colors group-hover:text-amber">
                      {e.role}
                    </h3>
                    <p className="text-paperdim text-[14.5px]">{e.desc}</p>
                    <div className="mt-3 flex gap-2 flex-wrap">
                      {e.stack.map((t) => (
                        <Tag key={t}>{t}</Tag>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="education" className="border-b border-amber/20">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-10 py-16 grid lg:grid-cols-[220px_1fr] gap-8 lg:gap-14">
          <Rail idx="05" title="Education" />
          <div>
            {education.map((e, i) => (
              <div
                key={e.name}
                className="group border border-amber/20 bg-panel p-6 mb-6 hover:border-amber/50 hover:bg-amber/5 transition-all duration-200"
              >
                <div className="grid grid-cols-1 sm:grid-cols-[170px_1fr] gap-6">
                  <div className="font-mono text-[12.5px] text-amberdim">
                    {e.when}
                  </div>
                  <div>
                    <h3 className="text-[16px] font-semibold transition-colors group-hover:text-amber">
                      {e.name}
                    </h3>
                    <p className="text-paperdim text-sm mt-1">{e.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="certs" className="border-b border-amber/20">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-10 py-16 grid lg:grid-cols-[220px_1fr] gap-8 lg:gap-14">
          <Rail idx="06" title="Certifications" />
          <div className="grid sm:grid-cols-2 gap-5">
            {certs.map((c) => (
              <div
                key={c.name}
                className="group border border-amber/20 bg-panel p-5 flex items-center gap-5 hover:border-amber/50 hover:bg-amber/5 transition-all duration-200"
              >
                <div className="transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-3 shrink-0">
                  <Logo src={c.logoSrc} size="w-14 h-14 text-[14px]" />
                </div>
                <div>
                  <h3 className="text-[15px] font-semibold leading-tight transition-colors group-hover:text-amber">
                    {c.name}
                  </h3>
                  <div className="mt-1 font-mono text-[11px] text-amberdim">
                    {c.company}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="border-t border-amber/20">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-10 py-24">
          <div className="font-mono text-[12px] text-amber mb-3">
            // GET IN TOUCH
          </div>
          <div className="grid lg:grid-cols-[1fr] gap-14">
            {/* Single column — clean and confident */}
            <div>
              <h2 className="text-[34px] lg:text-[44px] font-bold leading-[1.1] max-w-[20ch]">
                Have something to build?{" "}
                <span className="text-amber">Let's talk.</span>
              </h2>
              <p className="mt-4 text-paperdim text-[15px] max-w-[52ch]">
                Whether it's a project, a collaboration, or just a question — my
                inbox is open.
              </p>
              <div className="mt-8 flex flex-col gap-3">
                <a
                  href="mailto:bassemjouini33@gmail.com"
                  className="group flex items-center gap-4 border border-amber/20 bg-panel p-4 hover:border-amber/50 hover:bg-amber/5 transition-all duration-200"
                >
                  <div className="w-10 h-10 shrink-0 border border-amber/30 bg-ink flex items-center justify-center text-amber group-hover:bg-amber group-hover:text-ink transition-all duration-200">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="w-5 h-5"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <div className="font-mono text-[10.5px] text-amberdim mb-0.5 uppercase tracking-wider">
                      Email
                    </div>
                    <div className="font-mono text-[13.5px] text-paper truncate">
                      bassemjouini33@gmail.com
                    </div>
                  </div>
                  <svg
                    className="ml-auto shrink-0 w-4 h-4 text-amber/30 group-hover:text-amber group-hover:translate-x-1 transition-all duration-200"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
                <a
                  href="tel:+21652418280"
                  className="group flex items-center gap-4 border border-amber/20 bg-panel p-4 hover:border-amber/50 hover:bg-amber/5 transition-all duration-200"
                >
                  <div className="w-10 h-10 shrink-0 border border-amber/30 bg-ink flex items-center justify-center text-amber group-hover:bg-amber group-hover:text-ink transition-all duration-200">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="w-5 h-5"
                    >
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <div className="font-mono text-[10.5px] text-amberdim mb-0.5 uppercase tracking-wider">
                      Phone
                    </div>
                    <div className="font-mono text-[13.5px] text-paper">
                      +216 52 418 280
                    </div>
                  </div>
                  <svg
                    className="ml-auto shrink-0 w-4 h-4 text-amber/30 group-hover:text-amber group-hover:translate-x-1 transition-all duration-200"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
                <a
                  href="https://github.com/Bess012"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 border border-amber/20 bg-panel p-4 hover:border-amber/50 hover:bg-amber/5 transition-all duration-200"
                >
                  <div className="w-10 h-10 shrink-0 border border-amber/30 bg-ink flex items-center justify-center text-amber group-hover:bg-amber group-hover:text-ink transition-all duration-200">
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <div className="font-mono text-[10.5px] text-amberdim mb-0.5 uppercase tracking-wider">
                      GitHub
                    </div>
                    <div className="font-mono text-[13.5px] text-paper">
                      github.com/Bess012
                    </div>
                  </div>
                  <svg
                    className="ml-auto shrink-0 w-4 h-4 text-amber/30 group-hover:text-amber group-hover:translate-x-1 transition-all duration-200"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/bessem-jouini-a6a0a8341/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 border border-amber/20 bg-panel p-4 hover:border-amber/50 hover:bg-amber/5 transition-all duration-200"
                >
                  <div className="w-10 h-10 shrink-0 border border-amber/30 bg-ink flex items-center justify-center text-amber group-hover:bg-amber group-hover:text-ink transition-all duration-200">
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <div className="font-mono text-[10.5px] text-amberdim mb-0.5 uppercase tracking-wider">
                      LinkedIn
                    </div>
                    <div className="font-mono text-[13.5px] text-paper">
                      Bessem Jouini
                    </div>
                  </div>
                  <svg
                    className="ml-auto shrink-0 w-4 h-4 text-amber/30 group-hover:text-amber group-hover:translate-x-1 transition-all duration-200"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
              <button
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(
                      "bassemjouini33@gmail.com",
                    );
                    alert(
                      "Email copied to clipboard: bassemjouini33@gmail.com",
                    );
                  } catch (err) {
                    console.error("Clipboard copy failed", err);
                  }
                  window.location.href = "mailto:bassemjouini33@gmail.com";
                }}
                className="mt-8 inline-flex items-center gap-2.5 font-mono text-[13px] px-6 py-3.5 bg-amber text-ink font-semibold hover:bg-amber/90 transition-colors"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-4 h-4"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                Send me a message
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
