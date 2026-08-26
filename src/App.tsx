import React, { useEffect, useState } from "react";
import {
  Github,
  Linkedin,
  Mail,
  Download,
  ArrowRight,
  ArrowUpRight,
  Circle,
  CheckCircle2,
  Clock,
  Rocket,
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
  Sparkles,
} from "lucide-react";

/* -----------------------------------------------------------
   DESIGN TOKENS — "screen-printed gig poster" energy
   Inspired by the homemade, prolific, cheerfully DIY spirit of
   local-access-TV / indie-label creators: bold color-block
   accents, chunky rounded type, hand-stamped badges, and a
   hard offset shadow (like stacked paper) used everywhere as
   the page's one recurring signature move.

   Palette: warm paper white + deep ink-plum + a punchy
   coral / marigold / teal trio (not the cream+serif+terracotta
   or near-black+neon defaults).
   Type: Fredoka (chunky, friendly display) + Inter (body)
   + IBM Plex Mono (stamps, catalog numbers, tech tags).
------------------------------------------------------------ */

const FONT_IMPORT = `
@import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
`;

const INK = "#332B4D";
const PAPER = "#FBFAFF";
const CORAL = "#D9C9F7";
const YELLOW = "#C3DFFA";
const TEAL = "#F6D3E8";
const LAVENDER = "#CFEAF5";
const ACCENT = "#8E7CC3";

const STAGES = [
  { key: "submitted", label: "Submitted", icon: Circle },
  { key: "review", label: "In Review", icon: Clock },
  { key: "approved", label: "Approved", icon: CheckCircle2 },
  { key: "deployed", label: "Deployed", icon: Rocket },
];

const STATS = [
  { text: "50+ tickets closed", tint: YELLOW, rot: "-rotate-2" },
  { text: "4 systems, 0 fires", tint: TEAL, rot: "rotate-1" },
  { text: "Chocolate: mandatory", tint: CORAL, rot: "-rotate-1" },
];

function useCycler(length, intervalMs = 1900) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % length), intervalMs);
    return () => clearInterval(t);
  }, [length, intervalMs]);
  return i;
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

function Eyebrow({ id, label, tint = YELLOW }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span
        className="text-[11px] tracking-[0.16em] px-2.5 py-1 border-2 border-[#332B4D] rounded-md -rotate-1"
        style={{ fontFamily: "'IBM Plex Mono', monospace", background: tint, color: INK }}
      >
        {id}
      </span>
      <span
        className="text-[11px] tracking-[0.28em] text-[#5B5470] uppercase"
        style={{ fontFamily: "'IBM Plex Mono', monospace" }}
      >
        {label}
      </span>
      <span className="flex-1 h-px bg-[#E8DFC8]" />
    </div>
  );
}

function StatusPill({ status }) {
  const map = {
    deployed: { text: "IN PRODUCTION", bg: TEAL, fg: INK },
    internal: { text: "INTERNAL SYSTEM", bg: YELLOW, fg: INK },
  };
  const s = map[status] || map.deployed;
  return (
    <span
      className="inline-flex items-center gap-1.5 text-[10.5px] tracking-[0.1em] px-2.5 py-1 rounded-full border-2 border-[#332B4D] rotate-1"
      style={{ background: s.bg, color: s.fg, fontFamily: "'IBM Plex Mono', monospace" }}
    >
      {s.text}
    </span>
  );
}

/* Hero signature: reskinned "catalog" ticket, poster-style ---------------- */

function HeroTicket() {
  const active = useCycler(STAGES.length, 1900);

  return (
    <HardCard className="w-full max-w-sm rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <span
          className="text-[11px] tracking-[0.14em] px-2 py-0.5 rounded border-2 border-[#332B4D] -rotate-2"
          style={{ fontFamily: "'IBM Plex Mono', monospace", background: YELLOW, color: INK }}
        >
          CATALOG NO. 0042
        </span>
        <span
          className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.12em] px-2 py-0.5 rounded-full"
          style={{ fontFamily: "'IBM Plex Mono', monospace", background: "#EDE7F9", color: "#6B5A9E" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#8E7CC3] animate-pulse" />
          LIVE
        </span>
      </div>

      <p className="text-[#332B4D] text-[16px] leading-snug mb-5" style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 600 }}>
        Leave request — approval routing
      </p>

      <div className="space-y-0">
        {STAGES.map((s, idx) => {
          const Icon = s.icon;
          const isDone = idx < active;
          const isActive = idx === active;
          const dotColor = isDone ? TEAL : isActive ? CORAL : "#E4E0EE";
          return (
            <div key={s.key} className="flex items-start gap-3">
              <div className="flex flex-col items-center">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center border-2 border-[#332B4D] transition-colors duration-500"
                  style={{ background: dotColor }}
                >
                  <Icon
                    size={13}
                    className={`transition-colors duration-500 ${isDone || isActive ? "text-[#332B4D]" : "text-[#B0AAC2]"} ${isActive ? "animate-pulse" : ""}`}
                  />
                </div>
                {idx < STAGES.length - 1 && (
                  <div
                    className="w-0.5 h-6 transition-colors duration-500 rounded-full"
                    style={{ background: isDone ? TEAL : "#E4E0EE" }}
                  />
                )}
              </div>
              <div className="pb-6 -mt-0.5">
                <p
                  className={`text-[13px] transition-colors duration-500 ${isDone || isActive ? "text-[#332B4D]" : "text-[#B0AAC2]"}`}
                  style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                >
                  {s.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </HardCard>
  );
}

/* Nav ----------------------------------------------------------------------*/

function NavBar() {
  const [open, setOpen] = useState(false);
  const links = [
    ["About", "#about"],
    ["Stack", "#stack"],
    ["Work", "#work"],
    ["Experience", "#experience"],
    ["Contact", "#contact"],
  ];
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-[#FBFAFF]/90 border-b-2 border-[#332B4D]">
      <div className="max-w-6xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <a
          href="#top"
          className="text-[16px] tracking-tight text-[#332B4D] inline-flex items-center gap-1"
          style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 600 }}
        >
          Regina<span style={{ color: ACCENT }}>.dev</span>
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="text-[13.5px] text-[#5B5470] hover:text-[#332B4D] transition-colors"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              {label}
            </a>
          ))}
        </nav>
        <button
          className="md:hidden text-[#332B4D]"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle navigation menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t-2 border-[#332B4D] bg-[#FBFAFF]">
          <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-4">
            {links.map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="text-[14px] text-[#332B4D]"
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
  return (
    <section id="top" className="max-w-6xl mx-auto px-6 md:px-10 pt-16 md:pt-24 pb-14">
      <div className="grid md:grid-cols-[1.15fr_0.85fr] gap-14 md:gap-10 items-center">
        <div>
          <span
            className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.18em] px-3 py-1.5 border-2 border-[#332B4D] rounded-full mb-6 -rotate-2"
            style={{ fontFamily: "'IBM Plex Mono', monospace", background: YELLOW, color: INK }}
          >
            <Sparkles size={12} /> AVAILABLE FOR WORK
          </span>
          <h1
            className="text-[#332B4D] text-[42px] sm:text-[52px] md:text-[62px] leading-[1.05] tracking-tight mb-5"
            style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 700 }}
          >
            Hi, I'm Regina.
          </h1>
          <p
            className="text-[19px] md:text-[22px] mb-5"
            style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 600, color: ACCENT }}
          >
            Full-Stack Developer &amp; Software Developer
          </p>
          <p className="text-[15.5px] md:text-[16.5px] text-[#5B5470] max-w-lg leading-relaxed mb-9">
            I build business applications, workflow systems, APIs, and modern
            web interfaces — the kind of software that quietly runs an
            organization's day-to-day operations (and occasionally makes
            someone's Monday a little less painful).
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-9">
            <a
              href="#work"
              className="inline-flex items-center gap-2 border-2 border-[#332B4D] text-[#332B4D] text-[14px] px-5 py-3 rounded-lg shadow-[4px_4px_0_0_#332B4D] hover:shadow-[6px_6px_0_0_#332B4D] hover:-translate-y-0.5 hover:-translate-x-0.5 transition-all duration-200"
              style={{ fontFamily: "'IBM Plex Mono', monospace", background: CORAL, color: "#332B4D" }}
            >
              View My Work <ArrowRight size={15} />
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 border-2 border-[#332B4D] text-[#332B4D] text-[14px] px-5 py-3 rounded-lg bg-[#FBFAFF] shadow-[4px_4px_0_0_#332B4D] hover:shadow-[6px_6px_0_0_#332B4D] hover:-translate-y-0.5 hover:-translate-x-0.5 transition-all duration-200"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              <Download size={15} /> Download Resume
            </a>
          </div>

          <div className="flex items-center gap-5 mb-10">
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

          <div className="flex flex-wrap gap-3">
            {STATS.map((s) => (
              <span
                key={s.text}
                className={`text-[12px] px-3 py-1.5 rounded-full border-2 border-[#332B4D] ${s.rot} shadow-[3px_3px_0_0_#332B4D]`}
                style={{ fontFamily: "'IBM Plex Mono', monospace", background: s.tint, color: INK }}
              >
                {s.text}
              </span>
            ))}
          </div>
        </div>

        <div className="flex justify-center md:justify-end">
          <HeroTicket />
        </div>
      </div>
    </section>
  );
}

/* About --------------------------------------------------------------------*/

function About() {
  return (
    <section id="about" className="max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-20 border-t-2 border-dashed border-[#E8DFC8]">
      <Eyebrow id="SYS-01" label="About" tint={YELLOW} />
      <div className="grid md:grid-cols-[0.9fr_1.1fr] gap-10 md:gap-16">
        <h2
          className="text-[28px] md:text-[34px] text-[#332B4D] leading-tight tracking-tight"
          style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 600 }}
        >
          I build the systems that keep organizations moving — and I actually enjoy it.
        </h2>
        <div className="space-y-4 text-[15px] md:text-[16px] leading-relaxed">
          <p className="text-[#43395A]">
            I'm a full-stack developer focused on business-critical software:
            ticketing and approval platforms, authentication systems, HR
            tools, and admissions software used by real organizations every
            day. I care less about chasing the newest framework and more
            about building things that are secure, maintainable, and actually
            get used.
          </p>
          <p className="text-[#43395A]">
            My work sits at the intersection of clean interfaces and solid
            backend architecture — from React and TypeScript on the frontend
            to Python, Flask, and Laravel on the server, backed by relational
            databases and deployed on infrastructure I also help maintain.
          </p>
          <p className="text-[#43395A]">
            I like problems with a workflow at their core: who submits what,
            who approves it, what happens next — and turning that into
            software that's fast, secure, and easy to trust. Bonus points if
            it ships with a little personality.
          </p>
        </div>
      </div>
    </section>
  );
}

/* Tech Stack --------------------------------------------------------------*/

function TechStack() {
  const groups = [
    { title: "Frontend", icon: Layers, items: ["React", "TypeScript", "Vue"], tint: CORAL },
    { title: "Backend", icon: Server, items: ["Python", "Flask", "Laravel", "VB.Net"], tint: YELLOW },
    { title: "Database", icon: Database, items: ["SQL Server", "PostgreSQL", "MySQL"], tint: TEAL },
    { title: "DevOps", icon: GitBranch, items: ["Docker", "Nginx", "GitHub Actions"], tint: LAVENDER },
    { title: "Other", icon: ShieldCheck, items: ["REST APIs", "JWT", "MFA", "IIS"], tint: CORAL },
  ];
  return (
    <section id="stack" className="max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-20 border-t-2 border-dashed border-[#E8DFC8]">
      <Eyebrow id="SYS-02" label="Tech Stack" tint={TEAL} />
      <h2
        className="text-[28px] md:text-[34px] text-[#332B4D] leading-tight tracking-tight mb-10"
        style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 600 }}
      >
        The stack behind the systems.
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {groups.map((g) => (
          <HardCard key={g.title} className="rounded-xl p-5">
            <div
              className="w-9 h-9 rounded-lg border-2 border-[#332B4D] flex items-center justify-center mb-4"
              style={{ background: g.tint }}
            >
              <g.icon size={16} className="text-[#332B4D]" />
            </div>
            <p
              className="text-[13px] tracking-[0.1em] uppercase text-[#332B4D] mb-3"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
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

/* Featured Projects ---------------------------------------------------------*/

const PROJECTS = [
  {
    id: "ITOSS-01",
    name: "ITOSS v2",
    tag: "Enterprise Ticketing & Approval Workflow",
    status: "deployed",
    problem:
      "The organization relied on manual, paper-based ticketing for IT requests and approvals — slow to track, easy to lose, and impossible to audit.",
    build:
      "A full ticketing and multi-level approval platform: request submission, routing, approvals, and status tracking end to end, replacing the manual process entirely.",
    tech: ["React", "TypeScript", "Flask", "SQL Server", "Linux", "Docker"],
    features: [
      "Multi-level, role-based approval routing",
      "Real-time ticket status and audit trail",
      "Admin dashboard for tracking SLAs and workload",
    ],
  },
  {
    id: "AUTH-02",
    name: "MFA Authentication System",
    tag: "Secure Authentication Platform",
    status: "deployed",
    problem:
      "Internal systems needed a stronger, centralized login layer beyond a single password, to reduce the risk of unauthorized access.",
    build:
      "A secure authentication service with one-time-password verification, JWT-based sessions, and centralized session management usable across multiple internal apps.",
    tech: ["Python", "Flask", "JWT", "REST APIs"],
    features: [
      "OTP-based multi-factor verification",
      "Stateless JWT session handling",
      "Reusable across multiple internal systems",
    ],
  },
  {
    id: "HRIS-03",
    name: "HRIS — Leave & Attendance",
    tag: "Employee Management & HR Workflows",
    status: "internal",
    problem:
      "HR was tracking leave requests, attendance, and approvals across spreadsheets and email, making reporting slow and error-prone.",
    build:
      "An HR information system covering employee records, leave requests, attendance tracking, and approval workflows in one place.",
    tech: ["React", "Typescript", "Python", "Flask", "PostgreSQL"],
    features: [
      "Leave request + approval workflow",
      "Attendance tracking and reporting",
      "Centralized employee records",
    ],
  },
  {
    id: "ADMS-04",
    name: "PMMA Admission System",
    tag: "Admissions Management Platform",
    status: "deployed",
    problem:
      "Manual admissions processing made it difficult to manage high applicant volume, track document requirements, and communicate status.",
    build:
      "An end-to-end admissions system for application intake, document verification, and status tracking for applicants and administrators alike.",
    tech: ["Vue", "Laravel", "PostgreSQL"],
    features: [
      "Applicant intake and document verification",
      "Status tracking for applicants and staff",
      "Admin tools for reviewing applications at scale",
    ],
  },
];

function ProjectCard({ p }) {
  return (
    <HardCard className="rounded-2xl p-6 md:p-7">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <span
            className="text-[11px] tracking-[0.14em] px-1.5 py-0.5 rounded border border-[#332B4D]/20 text-[#8A8098]"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            #{p.id}
          </span>
          <h3
            className="text-[20px] md:text-[22px] text-[#332B4D] mt-1.5"
            style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 600 }}
          >
            {p.name}
          </h3>
          <p className="text-[13.5px] text-[#5B5470] mt-0.5">{p.tag}</p>
        </div>
        <StatusPill status={p.status} />
      </div>

      <div className="space-y-4">
        <div>
          <p
            className="text-[11px] tracking-[0.12em] text-[#8A8098] uppercase mb-1"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            Problem
          </p>
          <p className="text-[14.5px] text-[#43395A] leading-relaxed">{p.problem}</p>
        </div>
        <div>
          <p
            className="text-[11px] tracking-[0.12em] text-[#8A8098] uppercase mb-1"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            What I Built
          </p>
          <p className="text-[14.5px] text-[#43395A] leading-relaxed">{p.build}</p>
        </div>
        <div>
          <p
            className="text-[11px] tracking-[0.12em] text-[#8A8098] uppercase mb-2"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            Key Features
          </p>
          <ul className="space-y-1.5">
            {p.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-[14px] text-[#43395A]">
                <CheckCircle2 size={14} style={{ color: ACCENT }} className="mt-0.5 shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-wrap gap-2 pt-1">
          {p.tech.map((t, i) => (
            <span
              key={t}
              className={`text-[11.5px] px-2.5 py-1 rounded-full border border-[#332B4D]/25 text-[#43395A] ${i % 2 === 0 ? "-rotate-1" : "rotate-1"}`}
              style={{ fontFamily: "'IBM Plex Mono', monospace", background: "#FBF2DD" }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </HardCard>
  );
}

function FeaturedProjects() {
  return (
    <section id="work" className="max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-20 border-t-2 border-dashed border-[#E8DFC8]">
      <Eyebrow id="SYS-03" label="Featured Projects" tint={CORAL} />
      <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
        <h2
          className="text-[28px] md:text-[34px] text-[#332B4D] leading-tight tracking-tight"
          style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 600 }}
        >
          Systems I've shipped and maintain.
        </h2>
        <p className="text-[13.5px] text-[#5B5470] max-w-xs">
          Plus several other internal business systems built for day-to-day
          operations.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-7">
        {PROJECTS.map((p) => (
          <ProjectCard key={p.id} p={p} />
        ))}
      </div>
    </section>
  );
}

/* Experience ----------------------------------------------------------------*/

const EXPERIENCE = [
  {
    range: "May 2026 — Present",
    role: "Senior Software Developer",
    org: "Kintetsu World Express (Phils.) Inc.",
    desc:
      "Design and build internal business systems end to end — ticketing, approvals and authentication — from database schema to deployed interface.",
  },
  {
    range: "April 2024 — May 2026",
    role: "Junior Software Developer",
    org: "Kintetsu World Express (Phils.) Inc.",
    desc:
      "Built and maintained REST APIs and web interfaces for internal tools, working across React frontends and Python/PHP backends.",
  },
  {
    range: "April 2024 — June 2024",
    role: "Backend Developer",
    org: "Seaversity Inc.",
    desc:
      "Developed and maintained REST APIs using PHP and Laravel, with Vue.js for frontend development, supporting internal web applications and business workflows.",
  },
  {
    range: "Ferbruary 2022 — November 2023",
    role: "Computer Programmer",
    org: "United International Private School",
    desc:
      "Developed and maintained web-based systems, implemented new features, provided system support, and resolved technical issues to ensure smooth and reliable day-to-day operations.",
  },
  {
    range: "September 2018 — February 2022",
    role: "Systems Engineer",
    org: "Kintetsu World Express (Phils.) Inc.",
    desc:
      "Developed and maintained web-based systems, implemented new features, provided system support, and resolved technical issues to ensure smooth and reliable day-to-day operations.",
  },
];

function Experience() {
  return (
    <section id="experience" className="max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-20 border-t-2 border-dashed border-[#E8DFC8]">
      <Eyebrow id="SYS-04" label="Experience" tint={YELLOW} />
      <h2
        className="text-[28px] md:text-[34px] text-[#332B4D] leading-tight tracking-tight mb-10"
        style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 600 }}
      >
        Where I've built.
      </h2>
      <div className="relative pl-8 md:pl-10">
        <div className="absolute left-[7px] md:left-[9px] top-1 bottom-1 w-0.5 bg-[#E8DFC8]" />
        <div className="space-y-10">
          {EXPERIENCE.map((e, i) => (
            <div key={i} className="relative">
              <div
                className="absolute -left-8 md:-left-10 top-1 w-4 h-4 rounded-full border-2 border-[#332B4D]"
                style={{ background: i === 0 ? TEAL : PAPER }}
              />
              <p
                className="text-[12px] tracking-[0.12em] text-[#8A8098] uppercase mb-1"
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              >
                {e.range}
              </p>
              <h3
                className="text-[18px] text-[#332B4D] mb-0.5"
                style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 600 }}
              >
                {e.role} <span className="text-[#5B5470] font-normal" style={{ fontFamily: "'Inter', sans-serif" }}>· {e.org}</span>
              </h3>
              <p className="text-[14.5px] text-[#5B5470] leading-relaxed max-w-2xl">{e.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* What I Do ------------------------------------------------------------------*/

function WhatIDo() {
  const cards = [
    { icon: Code2, title: "Full-Stack Development", desc: "End-to-end features across React/Vue frontends and Python/PHP backends.", tint: CORAL },
    { icon: Boxes, title: "API Development", desc: "Secure, well-documented REST APIs that other systems can rely on.", tint: YELLOW },
    { icon: Database, title: "Database Design", desc: "Schemas that stay clean and fast as the data — and the org — grows.", tint: TEAL },
    { icon: GitBranch, title: "System Integration", desc: "Connecting existing tools and services into one coherent workflow.", tint: LAVENDER },
    { icon: Workflow, title: "Workflow & Approval Systems", desc: "Ticketing, routing, and multi-level approval logic, built to be trusted.", tint: CORAL },
    { icon: Server, title: "Deployment / DevOps", desc: "Docker, Nginx, and CI pipelines that ship changes without drama.", tint: YELLOW },
  ];
  return (
    <section className="max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-20 border-t-2 border-dashed border-[#E8DFC8]">
      <Eyebrow id="SYS-05" label="What I Do" tint={TEAL} />
      <h2
        className="text-[28px] md:text-[34px] text-[#332B4D] leading-tight tracking-tight mb-10"
        style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 600 }}
      >
        How I can help.
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {cards.map((c) => (
          <HardCard key={c.title} className="rounded-xl p-6">
            <div
              className="w-10 h-10 rounded-lg border-2 border-[#332B4D] flex items-center justify-center mb-4"
              style={{ background: c.tint }}
            >
              <c.icon size={18} className="text-[#332B4D]" />
            </div>
            <h3
              className="text-[15.5px] text-[#332B4D] mb-2"
              style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 600 }}
            >
              {c.title}
            </h3>
            <p className="text-[14px] text-[#5B5470] leading-relaxed">{c.desc}</p>
          </HardCard>
        ))}
      </div>
    </section>
  );
}

/* Contact ---------------------------------------------------------------------*/

function Contact() {
  return (
    <section id="contact" className="max-w-6xl mx-auto px-6 md:px-10 py-20 md:py-28 border-t-2 border-dashed border-[#E8DFC8]">
      <div
        className="rounded-3xl px-8 md:px-16 py-14 md:py-20 text-center border-2 border-[#332B4D] shadow-[8px_8px_0_0_#332B4D]"
        style={{ background: INK }}
      >
        <span
          className="inline-block text-[11px] tracking-[0.2em] px-3 py-1 rounded-full mb-6 -rotate-2 border-2 border-[#332B4D]"
          style={{ fontFamily: "'IBM Plex Mono', monospace", background: YELLOW, color: INK }}
        >
          SYS-06 // CONTACT
        </span>
        <h2
          className="text-[30px] md:text-[44px] text-[#FBFAFF] leading-tight tracking-tight mb-4"
          style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 700 }}
        >
          Have a project in mind?
        </h2>
        <p className="text-[16px] md:text-[18px] mb-10" style={{ color: "#B8B0CC" }}>
          Let's build something useful.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="mailto:reginabanadera@gmail.com?subject=Portfolio%20Inquiry"
            className="inline-flex items-center gap-2 text-[14px] px-5 py-3 rounded-lg border-2 border-[#332B4D] shadow-[4px_4px_0_0_#332B4D] hover:shadow-[6px_6px_0_0_#332B4D] hover:-translate-y-0.5 hover:-translate-x-0.5 transition-all duration-200"
            style={{ fontFamily: "'IBM Plex Mono', monospace", background: CORAL, color: "#332B4D" }}
          >
            <Mail size={15} /> reginabanadera@gmail.com
          </a>
          <a
            href="https://github.com/reginabanadera"
            className="inline-flex items-center gap-2 text-[14px] px-5 py-3 rounded-lg border-2 border-[#5B5470] text-[#FBFAFF] hover:border-[#C3DFFA] hover:text-[#C3DFFA] transition-colors"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            <Github size={15} /> GitHub <ArrowUpRight size={13} />
          </a>
          <a
            href="https://www.linkedin.com/in/regina-maye-banadera-b64799207/"
            className="inline-flex items-center gap-2 text-[14px] px-5 py-3 rounded-lg border-2 border-[#5B5470] text-[#FBFAFF] hover:border-[#C3DFFA] hover:text-[#C3DFFA] transition-colors"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            <Linkedin size={15} /> LinkedIn <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
      <p className="text-center text-[12.5px] text-[#8A8098] mt-8" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
        © {new Date().getFullYear()} Regina — built with React &amp; TypeScript.
      </p>
    </section>
  );
}

/* Root --------------------------------------------------------------------*/

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-[#FBFAFF]" style={{ fontFamily: "'Inter', sans-serif" }}>
      <style>{FONT_IMPORT}</style>
      <NavBar />
      <Hero />
      <About />
      <TechStack />
      <FeaturedProjects />
      <Experience />
      <WhatIDo />
      <Contact />
    </div>
  );
}
