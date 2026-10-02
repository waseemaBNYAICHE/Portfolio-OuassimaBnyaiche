import { useEffect, useMemo, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, BriefcaseBusiness, Code2, Download, Mail, MapPin, Menu, Send, Sparkles, X } from "lucide-react";
import ComputerScene from "./components/ComputerScene";
import ProjectsSection from "./components/ProjectsSection";
import { API_URL, getPublic, postContact } from "./services/api";

type Profile = { full_name?: string; headline?: string; bio?: string; photo?: string; cv_url?: string; location?: string; availability?: string; email_public?: string };
type Skill = { id: number; name: string; category?: string; proficiency?: number };
type Experience = { id: number; title: string; company: string; location?: string; start_date: string; end_date?: string; current?: boolean; description?: string; technologies?: string[] };
type Service = { id: number; title: string; description: string; icon?: string };
type Social = { id: number; platform: string; url: string };

const fallbackSkills: Skill[] = [
  { id: 1, name: "React & TypeScript", category: "Frontend", proficiency: 92 },
  { id: 2, name: "Laravel & PHP", category: "Backend", proficiency: 88 },
  { id: 3, name: "PostgreSQL", category: "Data", proficiency: 84 },
  { id: 4, name: "Google Cloud", category: "DevOps", proficiency: 80 },
];
const fallbackServices: Service[] = [
  { id: 1, title: "Interfaces premium", description: "Des expériences web distinctives, fluides et pensées jusque dans les micro-interactions." },
  { id: 2, title: "Applications full-stack", description: "Frontend React et API Laravel robustes, structurés autour de vos besoins métier." },
  { id: 3, title: "Cloud & performance", description: "Déploiement, base de données et optimisation pour une expérience rapide et fiable." },
];

function SectionTitle({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} className="section-heading">
    <span className="eyebrow"><Sparkles size={14} /> {eyebrow}</span><h2>{title}</h2>{text && <p>{text}</p>}
  </motion.div>;
}

function formatDate(date?: string) {
  if (!date) return "Aujourd’hui";
  return new Intl.DateTimeFormat("fr-FR", { month: "short", year: "numeric" }).format(new Date(date));
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [skills, setSkills] = useState<Skill[]>(fallbackSkills);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [services, setServices] = useState<Service[]>(fallbackServices);
  const [socials, setSocials] = useState<Social[]>([]);
  const [contactState, setContactState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 28, restDelta: 0.001 });

  useEffect(() => {
    Promise.allSettled([getPublic<Profile>("/profile"), getPublic<Skill[]>("/skills"), getPublic<Experience[]>("/experiences"), getPublic<Service[]>("/services"), getPublic<Social[]>("/social-links")])
      .then(([p, sk, ex, se, so]) => {
        if (p.status === "fulfilled" && p.value) setProfile(p.value);
        if (sk.status === "fulfilled" && sk.value.length) setSkills(sk.value);
        if (ex.status === "fulfilled") setExperiences(ex.value);
        if (se.status === "fulfilled" && se.value.length) setServices(se.value);
        if (so.status === "fulfilled") setSocials(so.value);
      });
  }, []);

  const socialMap = useMemo(() => Object.fromEntries(socials.map((item) => [item.platform.toLowerCase(), item.url])), [socials]);
  const name = profile?.full_name || "Ouassima Bnyaiche";
  async function submitContact(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setContactState("sending");
    const form = event.currentTarget;
    try { await postContact(Object.fromEntries(new FormData(form)) as Record<string, string>); form.reset(); setContactState("success"); }
    catch { setContactState("error"); }
  }

  return <main className="portfolio-shell">
    <motion.div className="scroll-progress" style={{ scaleX }} /><div className="noise" />
    <header className="site-header">
      <a className="brand" href="#accueil"><span className="brand-mark">O.</span><span>Ouassima</span></a>
      <nav className={menuOpen ? "nav-links is-open" : "nav-links"}>
        {[{l:"À propos",h:"apropos"},{l:"Expertise",h:"expertise"},{l:"Projets",h:"projets"},{l:"Parcours",h:"parcours"},{l:"Contact",h:"contact"}].map(({l,h}) => <a key={h} href={`#${h}`} onClick={() => setMenuOpen(false)}>{l}</a>)}
        <a className="nav-admin" href="/admin/login">Admin <ArrowUpRight size={15} /></a>
      </nav>
      <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Ouvrir le menu">{menuOpen ? <X /> : <Menu />}</button>
    </header>

    <section id="accueil" className="hero-section">
      <div className="hero-glow hero-glow-one" /><div className="hero-glow hero-glow-two" />
      <motion.div className="hero-copy" initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8 }}>
        <div className="availability"><span /> {profile?.availability || "Disponible pour de nouveaux projets"}</div>
        <p className="hero-kicker">FULL-STACK DEVELOPER · CREATIVE CODER</p>
        <h1>Je transforme les idées en <em>expériences digitales.</em></h1>
        <p className="hero-lead">{profile?.headline || "Je conçois des applications web modernes, performantes et mémorables — de l’interface jusqu’au cloud."}</p>
        <div className="hero-actions"><a className="button button-primary" href="#projets">Voir mes projets <ArrowDownRight size={18} /></a><a className="button button-ghost" href="#contact">Parlons de votre idée</a></div>
        <div className="hero-meta"><span><MapPin size={16} /> {profile?.location || "Maroc · Remote"}</span><span><Code2 size={16} /> React · Laravel · Cloud</span></div>
      </motion.div>
      <motion.div className="hero-visual" initial={{ opacity: 0, scale: .86 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: .2 }}><ComputerScene /></motion.div>
      <a className="scroll-cue" href="#apropos"><span>Scroll</span><ArrowDownRight size={18} /></a>
    </section>

    <section id="apropos" className="section about-section">
      <SectionTitle eyebrow="À propos" title={`Hello, moi c’est ${name.split(" ")[0]}.`} />
      <div className="about-grid">
        <motion.div className="about-statement" initial={{ opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <p>{profile?.bio || "Développeuse full-stack passionnée par les interfaces élégantes et les architectures solides. J’aime donner une identité forte aux produits numériques, sans jamais sacrifier la clarté ni la performance."}</p>
          {profile?.cv_url && <a className="text-link" href={profile.cv_url} target="_blank" rel="noreferrer">Télécharger mon CV <Download size={17} /></a>}
        </motion.div>
        <div className="about-cards">{[{v:"10+",l:"Projets réalisés"},{v:"04",l:"Expertises clés"},{v:"100%",l:"Curiosité & passion"}].map((i,n) => <motion.div key={i.l} className="metric-card" initial={{opacity:0,y:22}} whileInView={{opacity:1,y:0}} transition={{delay:n*.1}} viewport={{once:true}}><strong>{i.v}</strong><span>{i.l}</span></motion.div>)}</div>
      </div>
    </section>

    <section id="expertise" className="section expertise-section">
      <SectionTitle eyebrow="Expertise" title="Du concept au produit vivant." text="Une approche complète pour construire des expériences cohérentes, rapides et maintenables." />
      <div className="services-grid">{services.slice(0,3).map((service,index) => <motion.article key={service.id} className="service-card" initial={{opacity:0,y:28}} whileInView={{opacity:1,y:0}} whileHover={{y:-8}} transition={{delay:index*.08}} viewport={{once:true}}><span className="service-number">0{index+1}</span><div className="service-icon">{index===0?<Sparkles/>:index===1?<Code2/>:<BriefcaseBusiness/>}</div><h3>{service.title}</h3><p>{service.description}</p></motion.article>)}</div>
      <div className="skills-marquee"><div>{[...skills,...skills].map((skill,index)=><span key={`${skill.id}-${index}`}>{skill.name}<i /></span>)}</div></div>
    </section>

    <ProjectsSection />

    <section id="parcours" className="section timeline-section">
      <SectionTitle eyebrow="Parcours" title="Expérience & évolution." text="Chaque étape nourrit la suivante : comprendre, concevoir, construire et améliorer." />
      <div className="timeline">{(experiences.length ? experiences : [
        {id:1,title:"Développeuse Full-Stack",company:"PortfolioHub",start_date:"2025-01-01",current:true,description:"Conception d’une plateforme portfolio complète avec administration, API et déploiement cloud.",technologies:["React","Laravel","GCP"]},
        {id:2,title:"Développement Web",company:"Projets académiques & personnels",start_date:"2023-01-01",end_date:"2024-12-01",description:"Création d’interfaces utiles et apprentissage continu des bonnes pratiques du web.",technologies:["TypeScript","PHP","SQL"]}
      ]).map((item,index)=><motion.article className="timeline-item" key={item.id} initial={{opacity:0,x:index%2?30:-30}} whileInView={{opacity:1,x:0}} viewport={{once:true}}><div className="timeline-dot"/><div className="timeline-date">{formatDate(item.start_date)} — {item.current?"Aujourd’hui":formatDate(item.end_date)}</div><div className="timeline-card"><span>{item.company}</span><h3>{item.title}</h3><p>{item.description}</p><div>{item.technologies?.map(t=><small key={t}>{t}</small>)}</div></div></motion.article>)}</div>
    </section>

    <section id="contact" className="section contact-section">
      <div className="contact-copy"><SectionTitle eyebrow="Contact" title="Une idée en tête ? Construisons-la." text="Disponible pour un stage, une mission ou une collaboration ambitieuse." /><a className="contact-email" href={`mailto:${profile?.email_public||"contact@portfoliohub.com"}`}><Mail /> {profile?.email_public||"contact@portfoliohub.com"}</a><div className="social-row"><a href={socialMap.github||"https://github.com"} target="_blank" rel="noreferrer" aria-label="GitHub"><Code2/></a><a href={socialMap.linkedin||"https://linkedin.com"} target="_blank" rel="noreferrer" aria-label="LinkedIn"><BriefcaseBusiness/></a></div></div>
      <motion.form className="contact-form" onSubmit={submitContact} initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}}><div className="field-row"><label>Votre nom<input name="name" required placeholder="Nom complet"/></label><label>Votre e-mail<input name="email" type="email" required placeholder="vous@email.com"/></label></div><label>Sujet<input name="subject" placeholder="Collaboration, mission..."/></label><label>Votre message<textarea name="message" required minLength={10} rows={5} placeholder="Parlez-moi de votre projet..."/></label><button className="button button-primary" disabled={contactState==="sending"}>{contactState==="sending"?"Envoi...":"Envoyer le message"}<Send size={17}/></button>{contactState==="success"&&<p className="form-success">Message envoyé avec succès. Merci !</p>}{contactState==="error"&&<p className="form-error">L’envoi a échoué. Réessayez dans un instant.</p>}</motion.form>
    </section>

    <footer><a className="brand" href="#accueil"><span className="brand-mark">O.</span><span>Ouassima</span></a><p>Designé & développé avec passion · {new Date().getFullYear()}</p><span className="api-status"><i/> API connectée · {API_URL.replace(/^https?:\/\//,"").split("/")[0]}</span></footer>
  </main>;
}
