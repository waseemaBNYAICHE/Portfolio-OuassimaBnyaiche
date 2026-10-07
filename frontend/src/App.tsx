import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, BriefcaseBusiness, Cloud, Code2, Database, Download, FolderKanban, GraduationCap, Home, Layers3, Mail, MapPin, Menu, Monitor, Moon, Phone, Rocket, Send, ServerCog, Sparkles, Sun, Trophy, UserRound, Wrench, X } from "lucide-react";
import ComputerScene from "./components/ComputerScene";
import ProjectsSection from "./components/ProjectsSection";
import { getPublic, postContact } from "./services/api";

type Profile = { full_name?: string; headline?: string; bio?: string; photo?: string; cv_url?: string; location?: string; availability?: string; email_public?: string };
type Skill = { id: number; name: string; category?: string; proficiency?: number };
type Experience = { id: number; title: string; company: string; location?: string; start_date: string; end_date?: string; current?: boolean; description?: string; technologies?: string[] };
type Service = { id: number; title: string; description: string; icon?: string };
type Social = { id: number; platform: string; url: string };
type SectionId = "accueil" | "apropos" | "projets" | "competences" | "experience" | "services" | "contact";

const sections: Array<{ id: SectionId; label: string; short: string; icon: typeof Home }> = [
  { id: "accueil", label: "Accueil", short: "Accueil", icon: Home }, { id: "apropos", label: "À propos", short: "À propos", icon: UserRound },
  { id: "projets", label: "Projets", short: "Projets", icon: FolderKanban }, { id: "competences", label: "Compétences", short: "Compétences", icon: Wrench },
  { id: "experience", label: "Expériences", short: "Expériences", icon: BriefcaseBusiness }, { id: "services", label: "Services", short: "Services", icon: Layers3 },
  { id: "contact", label: "Contact", short: "Contact", icon: Mail },
];
const fallbackSkills: Skill[] = [
  { id: 1, name: "React & TypeScript", category: "Frontend", proficiency: 92 }, { id: 2, name: "Laravel & PHP", category: "Backend", proficiency: 88 },
  { id: 3, name: "PostgreSQL", category: "Data", proficiency: 84 }, { id: 4, name: "Docker & CI/CD", category: "DevOps", proficiency: 82 },
  { id: 5, name: "Google Cloud", category: "Cloud", proficiency: 80 }, { id: 6, name: "UI / UX", category: "Design", proficiency: 86 },
];
const fallbackServices: Service[] = [
  { id: 1, title: "Interfaces modernes", description: "Des interfaces distinctives, responsives et animées avec une expérience claire." },
  { id: 2, title: "Applications full-stack", description: "Frontend React, API Laravel et base PostgreSQL structurés autour du besoin métier." },
  { id: 3, title: "Cloud & DevOps", description: "Docker, CI/CD et déploiement Google Cloud pour une exécution fiable et reproductible." },
  { id: 4, title: "Conseil & optimisation", description: "Audit, performance, sécurité et accompagnement technique pour faire évoluer vos produits." },
];
const pageVariants = {
  enter: (direction: number) => ({ opacity: 0, x: direction > 0 ? 70 : -70, scale: .985 }), center: { opacity: 1, x: 0, scale: 1 },
  exit: (direction: number) => ({ opacity: 0, x: direction > 0 ? -70 : 70, scale: .985 }),
};

function SectionIntro({ index, eyebrow, title, text }: { index: string; eyebrow: string; title: React.ReactNode; text?: string }) {
  return <div className="deck-heading"><span className="deck-index">{index}</span><div><span className="deck-eyebrow"><Sparkles size={14} /> {eyebrow}</span><h2>{title}</h2>{text && <p>{text}</p>}</div></div>;
}
function formatDate(date?: string) { if (!date) return "Aujourd’hui"; return new Intl.DateTimeFormat("fr-FR", { month: "short", year: "numeric" }).format(new Date(date)); }

function ParticleField() { return <div className="cosmic-particles" aria-hidden="true">{Array.from({ length: 34 }, (_, index) => <i key={index} style={{ "--x": `${(index * 37) % 100}%`, "--y": `${(index * 61) % 100}%`, "--delay": `${(index % 9) * -.55}s`, "--size": `${index % 4 + 1}px` } as React.CSSProperties} />)}</div>; }

function SkillGroup({ icon, title, subtitle, items }: { icon: React.ReactNode; title: string; subtitle: string; items: Array<[string, number]> }) {
  return <article className="skill-category deck-glass"><header><span>{icon}</span><div><h3>{title}</h3><p>{subtitle}</p></div></header>{items.map(([label, level], index) => <div className="skill-row" key={label}><i>{label.slice(0, 2).toUpperCase()}</i><b>{label}</b><span><motion.em initial={{ width: 0 }} animate={{ width: `${level}%` }} transition={{ duration: .8, delay: index * .12 }} /></span><strong>{level}%</strong></div>)}</article>;
}

export default function App() {
  const initialHash = window.location.hash.replace("#", "") as SectionId;
  const [activeSection, setActiveSection] = useState<SectionId>(sections.some((item) => item.id === initialHash) ? initialHash : "accueil");
  const [direction, setDirection] = useState(1); const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    const saved = window.localStorage.getItem("portfolio-theme");
    if (saved === "dark" || saved === "light") return saved;
    return "dark";
  });
  const [profile, setProfile] = useState<Profile | null>(null); const [, setSkills] = useState<Skill[]>(fallbackSkills);
  const [experiences, setExperiences] = useState<Experience[]>([]); const [services, setServices] = useState<Service[]>(fallbackServices);
  const [socials, setSocials] = useState<Social[]>([]); const [contactState, setContactState] = useState<"idle" | "sending" | "success" | "error">("idle");

  useEffect(() => { Promise.allSettled([getPublic<Profile>("/profile"), getPublic<Skill[]>("/skills"), getPublic<Experience[]>("/experiences"), getPublic<Service[]>("/services"), getPublic<Social[]>("/social-links")]).then(([p, sk, ex, se, so]) => {
    if (p.status === "fulfilled" && p.value) setProfile(p.value); if (sk.status === "fulfilled" && sk.value.length) setSkills(sk.value);
    if (ex.status === "fulfilled") setExperiences(ex.value); if (se.status === "fulfilled" && se.value.length) setServices(se.value); if (so.status === "fulfilled") setSocials(so.value);
  }); }, []);
  useEffect(() => { window.localStorage.setItem("portfolio-theme", theme); }, [theme]);

  const activeIndex = sections.findIndex((item) => item.id === activeSection);
  const socialMap = useMemo(() => Object.fromEntries(socials.map((item) => [item.platform.toLowerCase(), item.url])), [socials]);
  const name = profile?.full_name || "Ouassima Bnyaiche";
  const journey = experiences.length ? experiences : [
    { id: 1, title: "Développeuse Full-Stack", company: "PortfolioHub", start_date: "2025-01-01", current: true, description: "Conception d’une plateforme complète : interface, API, administration et cloud.", technologies: ["React", "Laravel", "GCP"] },
    { id: 2, title: "Développement Web", company: "Projets académiques", start_date: "2023-01-01", end_date: "2024-12-01", description: "Applications web, bases de données et pratiques DevOps.", technologies: ["TypeScript", "PHP", "SQL"] },
  ];
  function navigateTo(id: SectionId) { const nextIndex = sections.findIndex((item) => item.id === id); setDirection(nextIndex >= activeIndex ? 1 : -1); setActiveSection(id); setMenuOpen(false); window.history.replaceState(null, "", `#${id}`); }
  function move(step: number) { const nextIndex = (activeIndex + step + sections.length) % sections.length; navigateTo(sections[nextIndex].id); }
  useEffect(() => { const onKey = (event: KeyboardEvent) => { if ((event.target as HTMLElement)?.matches("input, textarea")) return; if (event.key === "ArrowRight" || event.key === "ArrowDown") move(1); if (event.key === "ArrowLeft" || event.key === "ArrowUp") move(-1); }; window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey); });
  async function submitContact(event: React.FormEvent<HTMLFormElement>) { event.preventDefault(); setContactState("sending"); const form = event.currentTarget; try { await postContact(Object.fromEntries(new FormData(form)) as Record<string, string>); form.reset(); setContactState("success"); } catch { setContactState("error"); } }

  return <main className={`portfolio-shell portfolio-deck theme-${theme}`}><div className="noise" /><ParticleField /><div className="cosmic-planet" /><div className="cosmic-horizon" /><div className="cosmic-mountains mountain-back"/><div className="cosmic-mountains mountain-front"/><div className="energy-ribbon ribbon-a"/><div className="energy-ribbon ribbon-b"/><div className="deck-aurora deck-aurora-a" /><div className="deck-aurora deck-aurora-b" />
    <header className="deck-header"><button className="brand deck-brand" onClick={() => navigateTo("accueil")}><span className="brand-mark">OB<span>.</span></span></button>
      <nav className={menuOpen ? "deck-nav is-open" : "deck-nav"} aria-label="Navigation principale">{sections.map((item, index) => <button key={item.id} className={activeSection === item.id ? "active" : ""} onClick={() => navigateTo(item.id)}><span>{String(index + 1).padStart(2, "0")}</span>{item.label}</button>)}</nav>
      <div className="deck-header-actions"><button className="deck-theme" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label={theme === "dark" ? "Activer le thème clair" : "Activer le thème sombre"}>{theme === "dark" ? <Moon size={17} /> : <Sun size={17} />}</button><a className="deck-cv" href={profile?.cv_url || "#"} target={profile?.cv_url ? "_blank" : undefined} rel="noreferrer"><Download size={15}/> Télécharger CV</a><button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Ouvrir le menu">{menuOpen ? <X /> : <Menu />}</button></div></header>

    <div className="deck-stage"><AnimatePresence mode="wait" custom={direction}><motion.section key={activeSection} custom={direction} variants={pageVariants} initial="enter" animate="center" exit="exit" transition={{ duration: .48, ease: [0.22, 1, 0.36, 1] }} className={`deck-page deck-page-${activeSection}`}>
      {activeSection === "accueil" && <div className="deck-home"><div className="deck-home-copy"><div className="availability">
      <span /> {profile?.availability || "Disponible pour de nouveaux projets"}</div><h1><span>Ouassima</span>
      <em>Bnyaiche</em></h1>
      <h3 className="home-role">Développeuse Full Stack</h3>
      <p className="deck-lead">{profile?.headline || "Je conçois des expériences web modernes, performantes et sécurisées."}</p>
      <div className="deck-actions"><button className="button button-primary" onClick={() => navigateTo("projets")}>
        <Rocket size={17}/> Voir mes projets <ArrowRight size={18} />
        </button><button className="button button-ghost" onClick={() => navigateTo("contact")}>
          <Mail size={16} /> Me contacter</button></div>
          <div className="home-socials">
            <a href={socialMap.linkedin || "https://linkedin.com"}><BriefcaseBusiness/></a>
            <a href={socialMap.github || "https://github.com"}><Code2/></a><a href="mailto:contact@portfoliohub.com"><Mail/>
      </a></div>
      <div className="home-stats" >
      <span>
      <b>10+</b> Projets réalisés</span>
      <span>
        <b>5+</b> Années d’expérience</span><span><b>100%</b> Passionnée par le web</span></div></div><div className="deck-computer"><ComputerScene /></div></div>}
      {activeSection === "apropos" && <div className="deck-content deck-about"><SectionIntro index="02" eyebrow="À propos" title={<>À propos <em>de moi</em></>} text="Je transforme des idées en expériences web modernes, performantes et sécurisées." /><div className="deck-about-grid"><article className="deck-glass deck-story"><div className="about-identity"><span><UserRound /></span><div><h3>{name}</h3><small>Développeuse Full Stack</small><div className="about-location"><MapPin/> Tanger, Maroc <i/> Disponible</div></div></div><p>{profile?.bio || "Passionnée par le développement web, je conçois des applications modernes avec une attention particulière à la performance, la sécurité et l’expérience utilisateur. Toujours curieuse, j’aime apprendre de nouvelles technologies et relever des défis stimulants."}</p><div className="about-formation"><GraduationCap/><div><small>Formation</small><b>3ème année Génie Informatique</b><span>ENSIT Tanger · 2025 — 2026</span></div></div></article><div className="deck-about-visual"><ComputerScene /></div></div></div>}
      {activeSection === "projets" && <ProjectsSection />}
      {activeSection === "competences" && <div className="deck-content deck-skills-page"><SectionIntro index="04" eyebrow="Compétences" title={<>Mes <em>compétences</em></>} text="Des technologies modernes pour créer des expériences web performantes, robustes et évolutives." /><div className="skills-categories"><SkillGroup icon={<Monitor/>} title="Frontend" subtitle="Interfaces modernes et réactives" items={[["React",92],["TypeScript",85],["Tailwind CSS",80]]}/><SkillGroup icon={<Code2/>} title="Backend" subtitle="APIs robustes et sécurisées" items={[["Laravel",90],["PHP",82],["API REST",85]]}/><div className="skill-globe"><Code2/><i/><i/><i/><span>FULL STACK</span></div><SkillGroup icon={<Database/>} title="Bases de données" subtitle="Stockage fiable et performant" items={[["PostgreSQL",85],["MySQL",80]]}/><SkillGroup icon={<Cloud/>} title="DevOps & Cloud" subtitle="Déploiement et scalabilité" items={[["Docker",90],["GitHub Actions",80],["Google Cloud",75]]}/></div></div>}
      {activeSection === "experience" && <div className="deck-content deck-experience"><SectionIntro index="05" eyebrow="Expérience" title={<>Parcours & <em>expériences</em></>} text="Un parcours construit par la passion, des expériences concrètes et une envie constante d’apprendre." /><div className="journey-rocket"><Rocket/></div><div className="deck-journey">{journey.slice(0, 3).map((item, index) => <article className="deck-glass deck-journey-card" key={item.id}><span className="journey-number">0{index + 1}</span><div className="journey-icon">{index===0?<GraduationCap/>:index===1?<Code2/>:<Trophy/>}</div><div className="journey-period">{formatDate(item.start_date)} — {item.current ? "Aujourd’hui" : formatDate(item.end_date)}</div><small><MapPin/> {item.company}</small><h3>{item.title}</h3><p>{item.description}</p></article>)}</div></div>}
      {activeSection === "services" && <div className="deck-content deck-services-page"><SectionIntro index="06" eyebrow="Services" title={<>Mes <em>services</em></>} text="Des solutions modernes pour concrétiser vos idées." /><div className="deck-services-grid">{services.slice(0, 4).map((service, index) => { const Icon = index === 0 ? Code2 : index === 1 ? ServerCog : index === 2 ? Sparkles : Cloud; const tags=[['React','TypeScript','Responsive'],['Laravel','API REST','PostgreSQL'],['Figma','Tailwind CSS','UX'],['Docker','CI/CD','Google Cloud']][index]; return <article className="deck-service deck-glass" key={service.id}><div className="service-visual"><Icon/></div><div><h3>{service.title}</h3><p>{service.description}</p><section>{tags.map(tag=><i key={tag}>{tag}</i>)}</section></div><button onClick={() => navigateTo("contact")}><ArrowRight size={18} /></button></article>; })}</div><button className="services-cta" onClick={()=>navigateTo('contact')}><Mail/> Discuter de votre projet <ArrowRight/></button></div>}
      {activeSection === "contact" && <div className="deck-content deck-contact"><div className="deck-contact-copy"><SectionIntro index="07" eyebrow="Contact" title={<>Travaillons <em>ensemble</em></>} text="Une idée, un projet ou une opportunité ? Échangeons." /><div className="contact-details deck-glass"><div className="availability"><span/> Disponible pour de nouveaux projets</div><a href={`mailto:${profile?.email_public || "ouassima.bnyaiche@gmail.com"}`}><Mail/><span>E-mail<b>{profile?.email_public || "ouassima.bnyaiche@gmail.com"}</b></span></a><div><Phone/><span>Téléphone<b>+212 6 12 34 56 78</b></span></div><div><MapPin/><span>Localisation<b>{profile?.location || "Tanger, Maroc"}</b></span></div><section><a href={socialMap.linkedin || "https://linkedin.com"}><BriefcaseBusiness/></a><a href={socialMap.github || "https://github.com"}><Code2/></a></section></div></div><div className="contact-orb"><Send/><i/><i/></div><motion.form className="deck-contact-form deck-glass" onSubmit={submitContact} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}><header><Mail/><div><h3>Envoyez-moi un message</h3><p>Je vous réponds généralement sous 24h.</p></div></header><label>Nom complet<input name="name" required placeholder="Votre nom complet" /></label><label>Adresse e-mail<input name="email" type="email" required placeholder="votre.email@exemple.com" /></label><label>Sujet<input name="subject" placeholder="Sujet de votre message" /></label><label>Message<textarea name="message" required minLength={10} rows={3} placeholder="Votre message..." /></label><button className="button button-primary" disabled={contactState === "sending"}><Send size={17}/>{contactState === "sending" ? "Envoi..." : "Envoyer le message"}<ArrowRight/></button>{contactState === "success" && <p className="form-success">Message envoyé avec succès. Merci !</p>}{contactState === "error" && <p className="form-error">L’envoi a échoué. Réessayez dans un instant.</p>}</motion.form></div>}
    </motion.section></AnimatePresence></div>
    <footer className="deck-footer"><div className="deck-pagination"><span>{String(activeIndex + 1).padStart(2, "0")}</span><i><b style={{ width: `${((activeIndex + 1) / sections.length) * 100}%` }} /></i><span>{String(sections.length).padStart(2, "0")}</span></div><span className="deck-section-name">{sections[activeIndex].short}</span><div className="deck-arrows"><button onClick={() => move(-1)} aria-label="Section précédente"><ArrowLeft /></button><button onClick={() => move(1)} aria-label="Section suivante"><ArrowRight /></button></div></footer>
  </main>;
}
