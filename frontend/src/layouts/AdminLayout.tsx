import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  BriefcaseBusiness,
  ExternalLink,
  FolderKanban,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Settings,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";
import { logout } from "../services/authService";

const menuItems = [
  {
    label: "Tableau de bord",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Profil",
    path: "/admin/profile",
    icon: UserRound,
  },
  {
    label: "Projets",
    path: "/admin/projects",
    icon: FolderKanban,
  },
  {
    label: "Compétences",
    path: "/admin/skills",
    icon: Sparkles,
  },
  {
    label: "Expériences",
    path: "/admin/experiences",
    icon: BriefcaseBusiness,
  },
  {
    label: "Formations",
    path: "/admin/educations",
    icon: GraduationCap,
  },
  {
    label: "Messages",
    path: "/admin/messages",
    icon: MessageSquare,
  },
  {
    label: "Services",
    path: "/admin/services",
    icon: Settings,
  },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);

    try {
      await logout();
      navigate("/admin/login", { replace: true });
    } finally {
      setLoggingOut(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Fermer le menu"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/60 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-white/10 bg-slate-950/95 p-5 backdrop-blur-xl transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate("/admin/dashboard")}
            className="flex items-center gap-3"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-700 font-black shadow-lg shadow-blue-600/20">
              PH
            </span>

            <span className="text-left">
              <span className="block font-bold">PortfolioHub</span>
              <span className="text-xs text-slate-500">Administration</span>
            </span>
          </button>

          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-2 text-slate-400 hover:bg-white/10 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="mt-9 flex-1 space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`
                }
              >
                <Icon size={19} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="space-y-2 border-t border-white/10 pt-5">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white"
          >
            <ExternalLink size={19} />
            Voir le portfolio
          </a>

          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-red-400 transition hover:bg-red-500/10 disabled:opacity-50"
          >
            <LogOut size={19} />
            {loggingOut ? "Déconnexion..." : "Se déconnecter"}
          </button>
        </div>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-white/10 bg-slate-950/80 px-5 backdrop-blur-xl sm:px-8">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-slate-300 lg:hidden"
            >
              <Menu size={22} />
            </button>

            <div>
              <p className="text-sm text-slate-500">Espace administrateur</p>
              <p className="font-semibold">Bonjour, Ouassima 👋</p>
            </div>
          </div>

          <button
            type="button"
            className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-slate-400 transition hover:text-white"
            aria-label="Paramètres"
          >
            <Settings size={20} />
          </button>
        </header>

        <main className="p-5 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
