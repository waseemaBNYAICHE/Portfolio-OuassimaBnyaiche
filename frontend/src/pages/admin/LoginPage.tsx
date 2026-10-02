import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  LoaderCircle,
  LockKeyhole,
  Mail,
} from "lucide-react";
import { login } from "../../services/authService";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("admin@portfoliohub.com");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      navigate("/admin/dashboard", { replace: true });
    } catch (exception) {
      setError(
        exception instanceof Error
          ? exception.message
          : "Une erreur est survenue."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-5 py-10 text-white">
      <div className="login-grid" />
      <div className="login-orb login-orb-a absolute left-[-120px] top-[-100px] h-80 w-80 rounded-full bg-lime-400/20 blur-[100px]" />
      <div className="login-orb login-orb-b absolute bottom-[-140px] right-[-100px] h-96 w-96 rounded-full bg-violet-600/30 blur-[120px]" />
      <div className="login-orb login-orb-c absolute left-[48%] top-[20%] h-56 w-56 rounded-full bg-cyan-500/15 blur-[100px]" />

      <motion.div
        initial={{ opacity: 0, y: 35, rotateX: 8 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.65 }}
        className="relative z-10 grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] shadow-2xl shadow-blue-950/50 backdrop-blur-xl lg:grid-cols-2"
      >
        <section className="relative hidden min-h-[620px] flex-col justify-between overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-700 to-slate-950 p-12 lg:flex">
          <div className="absolute right-[-70px] top-24 h-60 w-60 rotate-12 rounded-[50px] border border-white/20 bg-white/10 shadow-2xl backdrop-blur-md" />
          <div className="absolute bottom-20 left-[-55px] h-48 w-48 -rotate-12 rounded-[45px] border border-white/10 bg-white/10 backdrop-blur-md" />

          <div className="relative z-10">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-lime-300 text-xl font-black text-slate-950 shadow-xl">
              O.
            </div>

            <p className="mt-7 text-sm font-semibold uppercase tracking-[0.3em] text-blue-200">
              PortfolioHub
            </p>

            <h1 className="mt-5 max-w-md text-4xl font-bold leading-tight">
              Gérez votre portfolio depuis un espace unique.
            </h1>

            <p className="mt-5 max-w-md leading-7 text-blue-100/80">
              Projets, compétences, expériences, formations et messages sont
              accessibles depuis votre tableau de bord.
            </p>
          </div>

          <p className="relative z-10 text-sm text-blue-200/70">
            Espace sécurisé réservé à l’administratrice.
          </p>
        </section>

        <section className="flex min-h-[620px] items-center p-7 sm:p-12">
          <div className="mx-auto w-full max-w-sm">
            <div className="mb-9 lg:hidden">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 font-black">
                PH
              </div>
            </div>

            <p className="font-semibold text-blue-400">Administration</p>

            <h2 className="mt-2 text-3xl font-bold">
              Bon retour, Ouassima
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Connectez-vous pour administrer le contenu de votre portfolio.
            </p>

            {error && (
              <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Adresse e-mail
                </label>

                <div className="relative">
                  <Mail
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  />

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                    autoComplete="email"
                    className="w-full rounded-xl border border-slate-700 bg-slate-900/80 py-3.5 pl-12 pr-4 text-sm outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    placeholder="admin@portfoliohub.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Mot de passe
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                    autoComplete="current-password"
                    className="w-full rounded-xl border border-slate-700 bg-slate-900/80 py-3.5 pl-12 pr-12 text-sm outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    placeholder="Votre mot de passe"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-white"
                    aria-label={
                      showPassword
                        ? "Masquer le mot de passe"
                        : "Afficher le mot de passe"
                    }
                  >
                    {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 font-semibold shadow-lg shadow-blue-600/20 transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading && <LoaderCircle size={19} className="animate-spin" />}
                {loading ? "Connexion..." : "Se connecter"}
              </button>
            </form>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="mt-6 w-full text-center text-sm text-slate-400 transition hover:text-blue-400"
            >
              ← Retour au portfolio
            </button>
          </div>
        </section>
      </motion.div>
    </main>
  );
}
