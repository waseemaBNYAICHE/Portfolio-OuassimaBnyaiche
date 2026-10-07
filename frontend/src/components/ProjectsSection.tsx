import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Code2, LoaderCircle, Sparkles } from "lucide-react";
import type { Project } from "../types/project";
import { getProjects } from "../services/projectService";

const demoProjects: Project[] = [
  { id: -1, title: "PortfolioHub", slug: "portfoliohub", short_description: "Portfolio administrable avec une interface animée, une API Laravel et une base PostgreSQL.", description: "Portfolio personnel full-stack.", technologies: ["React", "TypeScript", "Tailwind CSS", "Laravel"], image: "/images/projects/portfoliohub.png", github_url: null, demo_url: null, status: "published", featured: true, display_order: 0, published_at: null, created_at: "", updated_at: "" },
  { id: -2, title: "VITALIS", slug: "vitalis", short_description: "Application de gestion de clinique : patients, rendez-vous, consultations et dossiers médicaux.", description: "Application médicale full-stack.", technologies: ["Vue.js", "Laravel", "PostgreSQL", "Docker"], image: "/images/projects/vitalis.png", github_url: null, demo_url: null, status: "published", featured: false, display_order: 1, published_at: null, created_at: "", updated_at: "" },
  { id: -3, title: "Inspection Automobile", slug: "autoinspect", short_description: "Application de gestion des inspections, des véhicules et des rapports de contrôle.", description: "Application de gestion automobile.", technologies: ["Laravel", "MySQL", "Docker"], image: "/images/projects/autoinspect.png", github_url: null, demo_url: null, status: "published", featured: false, display_order: 2, published_at: null, created_at: "", updated_at: "" },
];

const localProjectImages: Record<string, string> = {
  portfoliohub: "/images/projects/portfoliohub.png",
  vitalis: "/images/projects/vitalis.png",
  autoinspect: "/images/projects/autoinspect.png",
};

function projectImage(project: Project) {
  if (project.image) return project.image;
  const identity = `${project.slug} ${project.title}`.toLowerCase();
  const key = Object.keys(localProjectImages).find((name) =>
    identity.includes(name) || (name === "autoinspect" && identity.includes("inspection")),
  );
  return key ? localProjectImages[key] : null;
}

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { getProjects().then(setProjects).catch(() => setProjects([])).finally(() => setLoading(false)); }, []);
  const visible = useMemo(() => (projects.length ? projects : demoProjects).slice(0, 3), [projects]);

  return <div className="deck-content deck-projects">
    <div className="deck-projects-heading"><span className="deck-index">03</span><div><span className="deck-eyebrow"><Sparkles size={14} /> Projets sélectionnés</span><h2>Du code avec une intention.</h2><p>Des réalisations où l’interface, la logique métier et le cloud avancent ensemble.</p></div></div>
    {loading ? <div className="deck-project-loading"><LoaderCircle className="animate-spin" /> Connexion aux projets...</div> : <div className="neon-project-grid">{visible.map((project, index) => <motion.article key={project.id} className={`neon-project-card project-tone-${index + 1}`} initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * .12 }} whileHover={{ y: -8 }}>
      <div className="neon-project-visual">{projectImage(project) ? <img src={projectImage(project)!} alt={`Aperçu visuel : ${project.title}`} loading="lazy" /> : <><div className="mini-browser"><i/><i/><i/><span/><span/><span/></div><b>{project.title.slice(0, 2).toUpperCase()}</b></>}</div>
      <div className="neon-project-info"><div className="project-status"><i /> Projet publié</div><h3>{project.title}</h3><p>{project.short_description || project.description}</p><div className="project-pills">{project.technologies?.slice(0, 4).map((tech) => <span key={tech}>{tech}</span>)}</div><section>{project.github_url ? <a href={project.github_url} target="_blank" rel="noreferrer"><Code2 /> Voir sur GitHub</a> : <span><Code2 /> Code sécurisé</span>}{project.demo_url ? <a href={project.demo_url} target="_blank" rel="noreferrer">Voir le projet <ArrowUpRight /></a> : <button>Découvrir <ArrowUpRight /></button>}</section></div>
    </motion.article>)}</div>}
  </div>;
}
