import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  FolderKanban,
  GraduationCap,
  LoaderCircle,
  MessageSquare,
  Sparkles,
} from "lucide-react";

const API_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:8080/api";

interface Statistics {
  projects: number;
  skills: number;
  experiences: number;
  educations: number;
  messages: number;
}

function countItems(response: unknown): number {
  if (Array.isArray(response)) {
    return response.length;
  }

  if (response && typeof response === "object") {
    const result = response as {
      total?: number;
      data?: unknown[] | { data?: unknown[]; total?: number };
    };

    if (typeof result.total === "number") {
      return result.total;
    }

    if (Array.isArray(result.data)) {
      return result.data.length;
    }

    if (
      result.data &&
      typeof result.data === "object" &&
      Array.isArray(result.data.data)
    ) {
      return result.data.total ?? result.data.data.length;
    }
  }

  return 0;
}

async function getData(path: string, token: string) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Impossible de charger ${path}`);
  }

  return response.json();
}

export default function DashboardPage() {
  const [statistics, setStatistics] = useState<Statistics>({
    projects: 0,
    skills: 0,
    experiences: 0,
    educations: 0,
    messages: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("admin_token");

    if (!token) {
      setError("Session administrateur introuvable.");
      setLoading(false);
      return;
    }

    Promise.all([
      getData("/admin/projects", token),
      getData("/admin/skills", token),
      getData("/admin/experiences", token),
      getData("/admin/educations", token),
      getData("/admin/contact-messages", token),
    ])
      .then(([projects, skills, experiences, educations, messages]) => {
        setStatistics({
          projects: countItems(projects),
          skills: countItems(skills),
          experiences: countItems(experiences),
          educations: countItems(educations),
          messages: countItems(messages),
        });
      })
      .catch(() => {
        setError("Impossible de charger les statistiques du dashboard.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const cards = [
    {
      label: "Projets",
      value: statistics.projects,
      icon: FolderKanban,
      color: "from-blue-500 to-cyan-500",
      path: "/admin/projects",
    },
    {
      label: "Compétences",
      value: statistics.skills,
      icon: Sparkles,
      color: "from-violet-500 to-purple-600",
      path: "/admin/skills",
    },
    {
      label: "Expériences",
      value: statistics.experiences,
      icon: BriefcaseBusiness,
      color: "from-emerald-500 to-teal-600",
      path: "/admin/experiences",
    },
    {
      label: "Formations",
      value: statistics.educations,
      icon: GraduationCap,
      color: "from-orange-500 to-amber-500",
      path: "/admin/educations",
    },
    {
      label: "Messages",
      value: statistics.messages,
      icon: MessageSquare,
      color: "from-pink-500 to-rose-600",
      path: "/admin/messages",
    },
  ];

  return (
    <section>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="font-semibold text-blue-400">Vue d’ensemble</p>

          <h1 className="mt-2 text-3xl font-bold">
            Tableau de bord
          </h1>

          <p className="mt-3 text-slate-400">
            Gérez le contenu dynamique de votre portfolio.
          </p>
        </div>

        <Link
          to="/"
          target="_blank"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold transition hover:border-blue-500/50 hover:bg-blue-500/10"
        >
          Voir le portfolio
          <ArrowUpRight size={18} />
        </Link>
      </div>

      {error && (
        <div className="mt-7 rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-red-300">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex min-h-72 items-center justify-center">
          <LoaderCircle className="animate-spin text-blue-400" size={36} />
        </div>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {cards.map((card, index) => {
            const Icon = card.icon;

            return (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -5 }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900 p-6 shadow-xl"
              >
                <div
                  className={`absolute right-[-35px] top-[-35px] h-28 w-28 rounded-full bg-gradient-to-br ${card.color} opacity-10 blur-2xl transition group-hover:opacity-25`}
                />

                <div className="relative flex items-start justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${card.color} shadow-lg`}
                  >
                    <Icon size={23} />
                  </div>

                  <Link
                    to={card.path}
                    className="rounded-lg p-2 text-slate-500 transition hover:bg-white/5 hover:text-white"
                    aria-label={`Ouvrir ${card.label}`}
                  >
                    <ArrowUpRight size={19} />
                  </Link>
                </div>

                <p className="mt-7 text-4xl font-bold">
                  {card.value}
                </p>

                <p className="mt-2 text-sm text-slate-400">
                  {card.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      )}

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
          <h2 className="text-lg font-bold">Actions rapides</h2>

          <div className="mt-5 space-y-3">
            <Link
              to="/admin/projects"
              className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-4 text-sm transition hover:bg-blue-500/10 hover:text-blue-300"
            >
              Gérer les projets
              <ArrowUpRight size={18} />
            </Link>

            <Link
              to="/admin/skills"
              className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-4 text-sm transition hover:bg-blue-500/10 hover:text-blue-300"
            >
              Gérer les compétences
              <ArrowUpRight size={18} />
            </Link>

            <Link
              to="/admin/messages"
              className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-4 text-sm transition hover:bg-blue-500/10 hover:text-blue-300"
            >
              Consulter les messages
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-600/20 to-indigo-600/5 p-6">
          <p className="text-sm font-semibold text-blue-400">
            PortfolioHub
          </p>

          <h2 className="mt-3 text-2xl font-bold">
            Votre espace est connecté à Laravel
          </h2>

          <p className="mt-4 leading-7 text-slate-400">
            Les statistiques affichées sont récupérées directement depuis les
            routes protégées de votre API.
          </p>
        </div>
      </div>
    </section>
  );
}