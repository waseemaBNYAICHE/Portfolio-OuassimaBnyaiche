import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { Project } from "../types/project";
import { getProjects } from "../services/projectService";

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getProjects()
      .then(setProjects)
      .catch(() => setError("Impossible de charger les projets."))
      .finally(() => setLoading(false));
  }, []);

  return (
    

      <section
      id="projects"
      className="bg-slate-950 px-6 py-20 text-white"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p className="font-semibold text-blue-400">Portfolio</p>

          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
            Mes projets
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Découvrez une sélection de mes réalisations et les technologies
            utilisées.
          </p>
        </div>

        {loading && (
          <p className="text-center text-slate-400">
            Chargement des projets...
          </p>
        )}

        {error && (
          <p className="text-center text-red-400">
            {error}
          </p>
        )}

        {!loading && !error && projects.length === 0 && (
          <p className="text-center text-slate-400">
            Aucun projet disponible.
          </p>
        )}

        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-xl"
            >
              <div className="flex h-48 items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-900">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-2xl font-bold">
                    {project.title}
                  </span>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold">
                  {project.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {project.short_description ?? project.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.technologies?.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-300"
                    >
                      {technology}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex gap-3">
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-lg border border-slate-600 px-4 py-2 text-sm transition hover:border-blue-400 hover:text-blue-400"
                    >
                      GitHub
                    </a>
                  )}

                  {project.demo_url && (
                    <a
                      href={project.demo_url}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold transition hover:bg-blue-500"
                    >
                      Voir le projet
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}