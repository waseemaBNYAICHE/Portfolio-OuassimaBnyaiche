import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Code2, LoaderCircle, Sparkles } from "lucide-react";
import type { Project } from "../types/project";
import { getProjects } from "../services/projectService";

const demoProjects: Project[] = [
  { id: -1, title: "PortfolioHub", slug: "portfoliohub", short_description: "Plateforme full-stack pour présenter et administrer un portfolio professionnel.", description: "Portfolio connecté à une API Laravel.", technologies: ["React", "TypeScript", "Laravel", "GCP"], image: null, github_url: null, demo_url: null, status: "published", featured: true, display_order: 0, published_at: null, created_at: "", updated_at: "" },
  { id: -2, title: "Dashboard Analytics", slug: "dashboard", short_description: "Interface d’administration claire, responsive et centrée sur les données.", description: "Dashboard moderne.", technologies: ["React", "REST API", "PostgreSQL"], image: null, github_url: null, demo_url: null, status: "published", featured: false, display_order: 1, published_at: null, created_at: "", updated_at: "" },
  { id: -3, title: "Cloud Architecture", slug: "cloud", short_description: "Architecture conteneurisée, fiable et prête à évoluer sur Google Cloud.", description: "Cloud deployment.", technologies: ["Docker", "Cloud Run", "Cloud SQL"], image: null, github_url: null, demo_url: null, status: "published", featured: false, display_order: 2, published_at: null, created_at: "", updated_at: "" },
];

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("Tous");

  useEffect(() => { getProjects().then(setProjects).catch(() => setProjects([])).finally(() => setLoading(false)); }, []);
  const visible = projects.length ? projects : demoProjects;
  const categories = useMemo(() => ["Tous", ...Array.from(new Set(visible.flatMap((p) => p.technologies || []).slice(0, 5)))], [visible]);
  const filtered = filter === "Tous" ? visible : visible.filter((p) => p.technologies?.includes(filter));

  return <section id="projets" className="section projects-section">
    <div className="projects-head">
      <div className="section-heading"><span className="eyebrow"><Sparkles size={14}/> Sélection</span><h2>Projets pensés avec précision.</h2><p>Quelques réalisations où design, code et stratégie avancent ensemble.</p></div>
      <div className="project-filters">{categories.map((item) => <button key={item} className={filter===item?"active":""} onClick={()=>setFilter(item)}>{item}</button>)}</div>
    </div>
    {loading ? <div className="project-loading"><LoaderCircle className="animate-spin"/> Connexion aux projets...</div> :
      <div className="projects-grid">{filtered.map((project,index) => <motion.article key={project.id} className={index===0?"project-card featured":"project-card"} initial={{opacity:0,y:35}} whileInView={{opacity:1,y:0}} whileHover={{y:-7}} transition={{delay:index*.08}} viewport={{once:true}}>
        <div className="project-visual">
          {project.image ? <img src={project.image} alt={project.title}/> : <div className={`project-art art-${(index%3)+1}`}><span>{String(index+1).padStart(2,"0")}</span><div><i/><i/><i/></div><strong>{project.title.slice(0,2).toUpperCase()}</strong></div>}
          <div className="project-links">{project.github_url&&<a href={project.github_url} target="_blank" rel="noreferrer"><Code2 size={18}/></a>}{project.demo_url&&<a href={project.demo_url} target="_blank" rel="noreferrer"><ArrowUpRight size={18}/></a>}</div>
        </div>
        <div className="project-info"><span>0{index+1} / PROJECT</span><h3>{project.title}</h3><p>{project.short_description||project.description}</p><div className="project-tech">{project.technologies?.map(t=><small key={t}>{t}</small>)}</div></div>
      </motion.article>)}</div>}
  </section>;
}
