import React, { useEffect, useState } from "react";
import {
  Github,
  Linkedin,
  Mail,
  Download,
  ArrowUp,
  Lock,
  Layers,
  Server,
  Database,
  GitBranch,
  ShieldCheck,
  Code2,
  Boxes,
  Workflow,
  Menu,
  X,
  GraduationCap,
  Briefcase,
} from "lucide-react";

/* -----------------------------------------------------------
   DESIGN TOKENS
   Restructured to follow the reference site's shape: a
   typewriter hero over an illustration, a curved pastel band
   that folds in the "about + stats" content, white cards that
   overlap the band, a portfolio grid with corner ribbons, and
   floating action buttons. Recolored into the pastel purple /
   blue / pink family already established for this brand.
------------------------------------------------------------ */

const FONT_IMPORT = `
@import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
`;

const INK = "#332B4D";
const PAPER = "#FBFAFF";
const CORAL = "#D9C9F7"; // pastel purple
const YELLOW = "#C3DFFA"; // pastel blue
const TEAL = "#F6D3E8"; // pastel pink
const LAVENDER = "#CFEAF5"; // pastel sky
const ACCENT = "#8E7CC3"; // deeper periwinkle, for legible text/hover on white
const BAND = "#B9A8F2"; // slightly deeper pastel purple, used for the curved band

/* Rotating-word hook for the hero — a soft fade/slide swap instead of a
   typewriter-with-cursor effect, so the hero doesn't read as a copy of any
   particular reference site. */

function useRotatingWord(words, intervalMs = 2200) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const fadeOut = setTimeout(() => setVisible(false), intervalMs - 260);
    const swap = setTimeout(() => {
      setIndex((i) => (i + 1) % words.length);
      setVisible(true);
    }, intervalMs);
    return () => {
      clearTimeout(fadeOut);
      clearTimeout(swap);
    };
  }, [index, words, intervalMs]);

  return { word: words[index], visible };
}

/* Reusable bits ------------------------------------------------------------ */

function HardCard({ className = "", children }) {
  return (
    <div
      className={`border-2 border-[#332B4D] bg-[#FBFAFF] shadow-[5px_5px_0_0_#332B4D] transition-all duration-200 hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[7px_7px_0_0_#8E7CC3] ${className}`}
    >
      {children}
    </div>
  );
}

function Eyebrow({ label, tint = CORAL }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-4">
      <span className="h-px w-8" style={{ background: tint }} />
      <span
        className="text-[12px] tracking-[0.28em] uppercase"
        style={{ fontFamily: "'IBM Plex Mono', monospace", color: ACCENT }}
      >
        {label}
      </span>
      <span className="h-px w-8" style={{ background: tint }} />
    </div>
  );
}

/* Section band — full-width pastel panel with a soft, blurred elevation
   shadow (no hard border/offset) for a smoother, calmer feel than the
   playful hard-shadow cards used elsewhere on the page. */

function BandPanel({ children, className = "" }) {
  return (
    <div
      style={{ background: BAND }}
      className={`w-full shadow-[0_20px_50px_-24px_rgba(51,43,77,0.45)] ${className}`}
    >
      {children}
    </div>
  );
}

/* Hero illustration — an original flat-style "developer at laptop" -------- */

function HeroIllustration() {
  return (
    <svg viewBox="0 0 320 320" className="w-64 sm:w-72 md:w-80" role="img" aria-label="Illustration of a developer working at a laptop">
      <circle cx="160" cy="168" r="130" fill={LAVENDER} />
      <circle cx="160" cy="150" r="2" fill="none" />
      {/* torso / hoodie */}
      <path d="M85 300 C85 235 115 205 160 205 C205 205 235 235 235 300 Z" fill={CORAL} stroke={INK} strokeWidth="4" />
      {/* neck */}
      <rect x="145" y="118" width="30" height="26" rx="8" fill="#F3D3B8" stroke={INK} strokeWidth="3" />
      {/* head */}
      <circle cx="160" cy="95" r="46" fill="#F6DAC0" stroke={INK} strokeWidth="4" />
      {/* hair */}
      <path
        d="M114 92 C110 55 130 34 160 34 C192 34 212 58 206 94 C200 80 190 74 178 76 C168 62 150 62 140 76 C126 74 116 80 114 92 Z"
        fill={INK}
      />
      {/* glasses */}
      <rect x="130" y="96" width="26" height="18" rx="9" fill="none" stroke={ACCENT} strokeWidth="4" />
      <rect x="166" y="96" width="26" height="18" rx="9" fill="none" stroke={ACCENT} strokeWidth="4" />
      <line x1="156" y1="103" x2="166" y2="103" stroke={ACCENT} strokeWidth="4" />
      {/* smile */}
      <path d="M148 118 Q160 126 172 118" fill="none" stroke={INK} strokeWidth="3.5" strokeLinecap="round" />
      {/* laptop */}
      <g>
        <rect x="108" y="222" width="104" height="66" rx="8" fill={INK} />
        <rect x="118" y="230" width="84" height="48" rx="4" fill={PAPER} />
        <text x="160" y="262" textAnchor="middle" fontFamily="'IBM Plex Mono', monospace" fontSize="20" fill={ACCENT} fontWeight="600">
          {"</>"}
        </text>
        <rect x="98" y="286" width="124" height="10" rx="5" fill={YELLOW} stroke={INK} strokeWidth="3" />
      </g>
      {/* floating accent shapes */}
      <circle cx="60" cy="120" r="10" fill={TEAL} stroke={INK} strokeWidth="3" />
      <rect x="242" y="90" width="20" height="20" rx="6" fill={YELLOW} stroke={INK} strokeWidth="3" transform="rotate(18 252 100)" />
      <circle cx="258" cy="210" r="8" fill={CORAL} stroke={INK} strokeWidth="3" />
    </svg>
  );
}

/* Nav ----------------------------------------------------------------------*/

function NavBar() {
  const [open, setOpen] = useState(false);
  const links = [
    ["About", "#about"],
    ["Experience", "#experience"],
    ["Portfolio", "#work"],
    ["Skills", "#stack"],
    ["Contact", "#contact"],
  ];
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-[#FBFAFF]/90 border-b border-[#E7E1F5]">
      <div className="max-w-6xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <a
          href="#top"
          className="text-[17px] tracking-tight"
          style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 600, color: INK }}
        >
          <span style={{ color: ACCENT }}>{"<"}</span>Regina<span style={{ color: ACCENT }}>{" />"}</span>
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="text-[13px] tracking-[0.08em] uppercase text-[#5B5470] hover:text-[#332B4D] transition-colors"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              {label}
            </a>
          ))}
        </nav>
        <button className="md:hidden text-[#332B4D]" onClick={() => setOpen((o) => !o)} aria-label="Toggle navigation menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-[#E7E1F5] bg-[#FBFAFF]">
          <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-4">
            {links.map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="text-[13px] tracking-[0.08em] uppercase text-[#332B4D]"
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

/* Hero -----------------------------------------------------------------*/

function Hero() {
  const { word, visible } = useRotatingWord(["Software Developer", "Full-Stack Developer"]);
  return (
    <section id="top" className="max-w-6xl mx-auto px-6 md:px-10 pt-16 md:pt-20 pb-10">
      <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
        <div className="text-center md:text-left">
          <h1
            className="text-[38px] sm:text-[48px] md:text-[54px] leading-[1.05] tracking-tight mb-3"
            style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 700, color: INK }}
          >
            Hi, I'm Regina.
          </h1>
          <p
            className="text-[18px] md:text-[20px] mb-5 h-[1.4em] transition-opacity duration-300"
            style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 600, color: ACCENT, opacity: visible ? 1 : 0 }}
          >
            {word}
          </p>
          <p className="text-[15.5px] md:text-[16.5px] text-[#5B5470] max-w-md mx-auto md:mx-0 leading-relaxed mb-8">
            I care about building software that solves real problems, stays maintainable, and makes a difference.
          </p>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-7">
            <a
              href="#work"
              className="inline-flex items-center gap-2 text-[14px] px-5 py-3 rounded-lg border-2 border-[#332B4D] shadow-[4px_4px_0_0_#332B4D] hover:shadow-[6px_6px_0_0_#332B4D] hover:-translate-y-0.5 hover:-translate-x-0.5 transition-all duration-200"
              style={{ fontFamily: "'IBM Plex Mono', monospace", background: CORAL, color: INK }}
            >
              View My Work
            </a>
            <a
              href="/Regina_Maye_Banadera_Resume.pdf"
              target="_blank"
              className="inline-flex items-center gap-2 text-[14px] px-5 py-3 rounded-lg border-2 border-[#332B4D] bg-[#FBFAFF] shadow-[4px_4px_0_0_#332B4D] hover:shadow-[6px_6px_0_0_#332B4D] hover:-translate-y-0.5 hover:-translate-x-0.5 transition-all duration-200"
              style={{ fontFamily: "'IBM Plex Mono', monospace", color: INK }}
            >
              <Download size={15} /> Resume
            </a>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-5">
            <a href="https://github.com/reginabanadera" aria-label="GitHub" className="text-[#332B4D] hover:text-[#8E7CC3] transition-colors">
              <Github size={20} />
            </a>
            <a href="https://www.linkedin.com/in/regina-maye-banadera-b64799207/" aria-label="LinkedIn" className="text-[#332B4D] hover:text-[#8E7CC3] transition-colors">
              <Linkedin size={20} />
            </a>
            <a href="mailto:reginabanadera@gmail.com?subject=Portfolio%20Inquiry" aria-label="Email" className="text-[#332B4D] hover:text-[#8E7CC3] transition-colors">
              <Mail size={20} />
            </a>
          </div>
        </div>
        <div className="flex justify-center">
          <HeroIllustration />
        </div>
      </div>
    </section>
  );
}

/* About + stats band --------------------------------------------------------*/

const STATS = [
  { value: "[7]+", label: "Years" },
  { value: "[10]+", label: "Systems Shipped" },
  { value: "[3]", label: "Organization" },
];

function AboutBand() {
  return (
    <section id="about" className="py-8 md:py-12">
      <BandPanel className="px-6 md:px-16 py-10 md:py-14">
        <div className="max-w-2xl mx-auto text-center">
          <h2
            className="text-[20px] md:text-[24px] mb-3"
            style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 700, color: INK }}
          >
            A bit about my work
          </h2>
          <div className="space-y-4 text-[15px] md:text-[16px] leading-relaxed">
            <p className="text-[#43395A]">
              I'm a full-stack developer who builds business-critical software,
              from ticketing and approval systems to HR, authentication, and
              admissions platforms.
            </p>

            <p className="text-[#43395A]">
              I enjoy turning complex workflows into secure, maintainable, and
              reliable software that solves real problems.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-3 mt-7">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="flex items-baseline gap-2 px-3.5 py-2 rounded-full bg-white/50"
            >
              <span className="text-[17px] md:text-[19px]" style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 700, color: INK }}>
                {s.value}
              </span>
              <span className="text-[10.5px] tracking-[0.08em] uppercase" style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#463A66" }}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </BandPanel>
    </section>
  );
}

/* Experience + Education two-column cards, overlapping the band ------------*/

const EXPERIENCE = [
  { role: "Senior Software Developer", org: "Kintetsu World Express (Phils.) Inc.", range: "May 2026 — Present", icon: Briefcase },
  { role: "Junior Software Developer", org: "Kintetsu World Express (Phils.) Inc.", range: "April 2024 — May 2026", icon: Briefcase },
  { role: "Backend Developer", org: "Seaversity Inc.", range: "April 2024 — June 2024", icon: Briefcase },
  { role: "Computer Programmer", org: "United International Private School", range: "February 2022 — November 2023", icon: Briefcase },
  { role: "Systems Engineer", org: "Kintetsu World Express (Phils.) Inc.", range: "September 2018 — February 2022", icon: Briefcase },
];

const EDUCATION = [
  { role: "Bachelor of Science in Information Technology", org: "Central Colleges of the Philippines", range: "2014 — 2018", icon: GraduationCap },
  { role: "High School Graduate", org: "Carlos L. Albert High School", range: "2010 — 2014", icon: GraduationCap },
];

function TimelineCard({ title, icon: Icon, tint, items }) {
  return (
    <HardCard className="rounded-2xl p-6 md:p-7 flex-1">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-lg border-2 border-[#332B4D] flex items-center justify-center" style={{ background: tint }}>
          <Icon size={15} className="text-[#332B4D]" />
        </div>
        <p className="text-[13px] tracking-[0.14em] uppercase" style={{ fontFamily: "'IBM Plex Mono', monospace", color: INK }}>
          {title}
        </p>
      </div>
      <div className="relative pl-5">
        <div className="absolute left-[3px] top-1 bottom-1 w-px" style={{ background: `${tint}` }} />
        <div className="space-y-6">
          {items.map((it, i) => (
            <div key={i} className="relative">
              <span
                className="absolute -left-5 top-1 w-2 h-2 rounded-full border-2 border-[#332B4D]"
                style={{ background: i === 0 ? tint : PAPER }}
              />
              <h3 className="text-[15.5px] text-[#332B4D]" style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 600 }}>
                {it.role}
              </h3>
              <p className="text-[13.5px] text-[#5B5470]">{it.org}</p>
              <p className="text-[12px] italic text-[#8A8098]">{it.range}</p>
            </div>
          ))}
        </div>
      </div>
    </HardCard>
  );
}

function ExperienceEducation() {
  return (
    <section id="experience" className="max-w-6xl mx-auto px-6 md:px-10 py-10 md:py-14">
      <div className="flex flex-col md:flex-row gap-6">
        <TimelineCard title="Work Experience" icon={Briefcase} tint={CORAL} items={EXPERIENCE} />
        <TimelineCard title="Education" icon={GraduationCap} tint={YELLOW} items={EDUCATION} />
      </div>
    </section>
  );
}

/* Tech Stack --------------------------------------------------------------*/

function TechStack() {
  const groups = [
    { title: "Frontend", icon: Layers, items: ["React", "TypeScript", "Styled-components"], tint: CORAL },
    { title: "Backend", icon: Server, items: ["Python", "Flask", "PHP", "Laravel", "VB.Net"], tint: YELLOW },
    { title: "Database", icon: Database, items: ["SQL Server", "PostgreSQL", "MySQL"], tint: TEAL },
    { title: "DevOps", icon: GitBranch, items: ["Docker", "Nginx", "GitHub Actions"], tint: LAVENDER },
    { title: "Other", icon: ShieldCheck, items: ["REST APIs", "JWT", "MFA", "IIS"], tint: CORAL },
  ];
  return (
    <section id="stack" className="max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-20">
      <Eyebrow label="Technologies Used" tint={CORAL} />
      <h2
        className="text-[26px] md:text-[32px] text-center mb-10"
        style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 700, color: INK }}
      >
        The stack behind the systems.
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {groups.map((g) => (
          <HardCard key={g.title} className="rounded-xl p-5">
            <div className="w-9 h-9 rounded-lg border-2 border-[#332B4D] flex items-center justify-center mb-4" style={{ background: g.tint }}>
              <g.icon size={16} className="text-[#332B4D]" />
            </div>
            <p className="text-[13px] tracking-[0.1em] uppercase text-[#332B4D] mb-3" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              {g.title}
            </p>
            <ul className="space-y-1.5">
              {g.items.map((it) => (
                <li key={it} className="text-[14px] text-[#5B5470]">
                  {it}
                </li>
              ))}
            </ul>
          </HardCard>
        ))}
      </div>
    </section>
  );
}

/* Featured Projects — portfolio grid with corner ribbon --------------------*/

const PROJECTS = [
  {
    id: "ITOSS-01",
    name: "ITOSS v2",
    tag: "Enterprise ticketing & approval workflow",
    ribbon: "Enterprise",
    tint: CORAL,
    desc:
      "A full ticketing and multi-level approval platform: request submission, routing, approvals, and status tracking end to end, replacing a manual paper process.",
    tech: ["React", "TypeScript", "Flask", "SQL Server", "Linux", "Docker", "Github Actions"],
  },
  {
    id: "AUTH-02",
    name: "MFA Authentication System",
    tag: "Secure authentication platform",
    ribbon: "Internal System",
    tint: YELLOW,
    desc:
      "A secure authentication service with OTP verification, JWT-based sessions, and centralized session management usable across multiple internal apps.",
    tech: [ "Python", "Flask", "JWT", "SQL Server", "REST APIs", "IIS"],
  },
  {
    id: "HRIS-03",
    name: "HRIS — Leave & Attendance",
    tag: "Employee management & HR workflows",
    ribbon: "Internal System",
    tint: TEAL,
    desc:
      "An HR information system covering employee records, leave requests, attendance tracking, and approval workflows in one place.",
    tech: ["React", "Typescript", "Python", "Flask", "PostgeSQL"],
  },
  {
    id: "ADMS-04",
    name: "PMMA Admission System",
    tag: "Admissions management platform",
    ribbon: "Enterprise",
    tint: LAVENDER,
    desc:
      "An end-to-end admissions system for application intake, document verification, and status tracking for applicants and administrators alike.",
    tech: ["Vue", "TypeScript", "PHP", "Laravel", "PostgreSQL"],
  },
  {
    id: "SYS-05",
    name: "Other Internal Systems",
    tag: "Assorted business tooling",
    ribbon: "Internal System",
    tint: CORAL,
    desc:
      "Several smaller internal systems built for day-to-day operations — reporting dashboards, config tools, and workflow utilities.",
    tech: ["React", "Python", "REST APIs"],
  },
];

function ProjectCard({ p }) {
  return (
    <HardCard className="rounded-2xl p-6">
      <div className="flex items-start justify-between gap-3 mb-1">
        <span className="text-[11px] tracking-[0.14em] text-[#8A8098]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
          #{p.id}
        </span>
        <span
          className="text-[10.5px] tracking-[0.08em] px-2.5 py-1 rounded-full border border-[#332B4D]/30"
          style={{ fontFamily: "'IBM Plex Mono', monospace", background: p.tint, color: INK }}
        >
          {p.ribbon}
        </span>
      </div>
      <h3 className="text-[19px] md:text-[21px] text-[#332B4D] mt-1 mb-1" style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 600 }}>
        {p.name}
      </h3>
      <p className="text-[13px] text-[#5B5470] mb-4">{p.tag}</p>
      <p className="text-[14px] text-[#43395A] leading-relaxed mb-4">{p.desc}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {p.tech.map((t) => (
          <span
            key={t}
            className="text-[11px] px-2.5 py-1 rounded-full border border-[#332B4D]/25 text-[#43395A]"
            style={{ fontFamily: "'IBM Plex Mono', monospace", background: "#F3EFFC" }}
          >
            {t}
          </span>
        ))}
      </div>
      <p className="flex items-center gap-1.5 text-[12px] text-[#8A8098]">
        <Lock size={12} /> Deployed internally — not publicly browsable
      </p>
    </HardCard>
  );
}

function FeaturedProjects() {
  return (
    <section id="work" className="max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-20">
      <Eyebrow label="My Portfolio" tint={TEAL} />
      <h2
        className="text-[26px] md:text-[32px] text-center mb-10"
        style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 700, color: INK }}
      >
        Systems I've shipped and maintain.
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
        {PROJECTS.map((p) => (
          <ProjectCard key={p.id} p={p} />
        ))}
      </div>
    </section>
  );
}

/* What I Do ------------------------------------------------------------------*/

function WhatIDo() {
  const cards = [
    { icon: Code2, title: "Full-Stack Development", desc: "End-to-end features across React Typescript frontends and Python/PHP backends.", tint: CORAL },
    { icon: Boxes, title: "API Development", desc: "Secure, well-documented REST APIs that other systems can rely on.", tint: YELLOW },
    { icon: Database, title: "Database Design", desc: "Schemas that stay clean and fast as the data — and the org — grows.", tint: TEAL },
    { icon: GitBranch, title: "System Integration", desc: "Connecting existing tools and services into one coherent workflow.", tint: LAVENDER },
    { icon: Workflow, title: "Workflow & Approval Systems", desc: "Ticketing, routing, and multi-level approval logic, built to be trusted.", tint: CORAL },
    { icon: Server, title: "Deployment / DevOps", desc: "Docker, Nginx, and CI pipelines that ship changes without drama.", tint: YELLOW },
  ];
  return (
    <section className="max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-20">
      <Eyebrow label="What I Do" tint={LAVENDER} />
      <h2
        className="text-[26px] md:text-[32px] text-center mb-10"
        style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 700, color: INK }}
      >
        How I can help.
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {cards.map((c) => (
          <HardCard key={c.title} className="rounded-xl p-6">
            <div className="w-10 h-10 rounded-lg border-2 border-[#332B4D] flex items-center justify-center mb-4" style={{ background: c.tint }}>
              <c.icon size={18} className="text-[#332B4D]" />
            </div>
            <h3 className="text-[15.5px] text-[#332B4D] mb-2" style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 600 }}>
              {c.title}
            </h3>
            <p className="text-[14px] text-[#5B5470] leading-relaxed">{c.desc}</p>
          </HardCard>
        ))}
      </div>
    </section>
  );
}

/* Contact — curved band bookend, big rounded icon buttons -------------------*/

function Contact() {
  const links = [
    { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/regina-maye-banadera-b64799207/" },
    { icon: Github, label: "GitHub", href: "https://github.com/reginabanadera" },
    { icon: Mail, label: "Email", href: "mailto:reginabanadera@gmail.com?subject=Portfolio%20Inquiry" },
    { icon: Download, label: "Resume", href: "/Regina_Maye_Banadera_Resume.pdf" },
  ];
  return (
    <section id="contact" className="py-6 md:py-10 pb-16">
      <BandPanel className="px-6 md:px-10 py-14 md:py-16 text-center">
        <h2 className="text-[24px] md:text-[30px] mb-4" style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 700, color: INK }}>
          Have a project in mind?
        </h2>
        <p className="text-[14.5px] md:text-[16px] max-w-xl mx-auto mb-8 leading-relaxed" style={{ color: "#463A66" }}>
          Let's build something useful — reach out through any of these.
        </p>
        <div className="inline-flex flex-wrap justify-center gap-3 md:gap-4 bg-white/60 rounded-2xl px-5 py-4 shadow-[0_10px_25px_-12px_rgba(51,43,77,0.35)]">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              aria-label={l.label}
              className="w-12 h-12 rounded-xl bg-[#FBFAFF] flex items-center justify-center hover:-translate-y-0.5 transition-transform shadow-[0_4px_12px_-4px_rgba(51,43,77,0.3)]"
              title={l.label}
            >
              <l.icon size={19} className="text-[#332B4D]" />
            </a>
          ))}
        </div>
        <p className="text-[12.5px] mt-10" style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#5B4E80" }}>
          © {new Date().getFullYear()} Regina — built with React &amp; TypeScript.
        </p>
      </BandPanel>
    </section>
  );
}

/* Floating action buttons ----------------------------------------------------*/

function FloatingButtons() {
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 420);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!showTop) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-xl border-2 border-[#332B4D] flex items-center justify-center shadow-[3px_3px_0_0_#332B4D] hover:-translate-y-0.5 transition-transform"
      style={{ background: "#FBFAFF" }}
    >
      <ArrowUp size={18} className="text-[#332B4D]" />
    </button>
  );
}

/* Root --------------------------------------------------------------------*/

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-[#FBFAFF]" style={{ fontFamily: "'Inter', sans-serif" }}>
      <style>{FONT_IMPORT}</style>
      <NavBar />
      <Hero />
      <AboutBand />
      <ExperienceEducation />
      <TechStack />
      <FeaturedProjects />
      <WhatIDo />
      <Contact />
      <FloatingButtons />
    </div>
  );
}