import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  LoaderCircle,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import {
  deleteProject,
  getAdminProjects,
} from "../../services/adminProjectService";
import type { AdminProject } from "../../services/adminProjectService";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<AdminProject[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function loadProjects() {
    setLoading(true);
    setError("");

    try {
      const result = await getAdminProjects();
      setProjects(result);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Impossible de charger les projets."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadProjects();
  }, []);

  const filteredProjects = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) return projects;

    return projects.filter((project) =>
      `${project.title} ${project.slug} ${project.status}`
        .toLowerCase()
        .includes(value)
    );
  }, [projects, search]);

  async function handleDelete(project: AdminProject) {
    const confirmed = window.confirm(
      `Voulez-vous vraiment supprimer « ${project.title} » ?`
    );

    if (!confirmed) return;

    setDeletingSlug(project.slug);
    setError("");

    try {
      await deleteProject(project.slug);
      setProjects((current) =>
        current.filter((item) => item.slug !== project.slug)
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Impossible de supprimer ce projet."
      );
    } finally {
      setDeletingSlug(null);
    }
  }

  return (
    <section>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="font-semibold text-blue-400">Portfolio</p>
          <h1 className="mt-2 text-3xl font-bold">Mes projets</h1>
          <p className="mt-3 text-slate-400">
            Consultez et gérez les projets affichés dans votre portfolio.
          </p>
        </div>

        <Link
          to="/admin/projects/new"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold transition hover:bg-blue-500"
        >
          <Plus size={18} />
          Ajouter un projet
        </Link>
      </div>

      {error && (
        <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-sm text-red-300">
          {error}
        </div>
      )}

      <div className="mt-8 rounded-2xl border border-white/10 bg-slate-900">
        <div className="flex flex-col gap-4 border-b border-white/10 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-semibold">Liste des projets</h2>
            <p className="mt-1 text-sm text-slate-500">
              {projects.length} projet(s)
            </p>
          </div>

          <label className="relative block w-full sm:max-w-xs">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
            />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Rechercher un projet..."
              className="w-full rounded-xl border border-white/10 bg-slate-950 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500"
            />
          </label>
        </div>

        {loading ? (
          <div className="flex min-h-56 items-center justify-center">
            <LoaderCircle className="animate-spin text-blue-400" size={32} />
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="p-10 text-center text-slate-400">
            {search
              ? "Aucun projet ne correspond à votre recherche."
              : "Aucun projet disponible."}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-white/[0.03] text-slate-400">
                <tr>
                  <th className="px-5 py-4 font-medium">Projet</th>
                  <th className="px-5 py-4 font-medium">Statut</th>
                  <th className="px-5 py-4 font-medium">Mis en avant</th>
                  <th className="px-5 py-4 text-right font-medium">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/5">
                {filteredProjects.map((project) => (
                  <tr key={project.id} className="transition hover:bg-white/[0.02]">
                    <td className="px-5 py-4">
                      <p className="font-semibold text-white">
                        {project.title}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {project.slug}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          project.status === "published"
                            ? "bg-emerald-500/10 text-emerald-300"
                            : "bg-amber-500/10 text-amber-300"
                        }`}
                      >
                        {project.status === "published"
                          ? "Publié"
                          : "Brouillon"}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-slate-300">
                      {project.featured ? "Oui" : "Non"}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        {project.demo_url && (
                          <a
                            href={project.demo_url}
                            target="_blank"
                            rel="noreferrer"
                            title="Ouvrir la démo"
                            className="rounded-lg border border-white/10 p-2 text-slate-400 hover:text-white"
                          >
                            <ArrowUpRight size={17} />
                          </a>
                        )}

                        <button
                          type="button"
                          onClick={() => void handleDelete(project)}
                          disabled={deletingSlug === project.slug}
                          title="Supprimer le projet"
                          className="rounded-lg border border-red-500/20 p-2 text-red-400 transition hover:bg-red-500/10 disabled:opacity-50"
                        >
                          {deletingSlug === project.slug ? (
                            <LoaderCircle size={17} className="animate-spin" />
                          ) : (
                            <Trash2 size={17} />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}