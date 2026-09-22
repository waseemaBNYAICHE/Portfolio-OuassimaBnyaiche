import { motion } from "framer-motion";
import ProjectsSection from "./components/ProjectsSection";


function App() {
  
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 px-6">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-4xl rounded-3xl border border-white/10 bg-white/10 px-8 py-14 text-center shadow-2xl backdrop-blur-md sm:px-14"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-block rounded-full bg-blue-500/20 px-5 py-2 font-semibold text-blue-300"
          >
            Full Stack Developer
          </motion.span>

          <h1 className="mt-8 text-5xl font-bold sm:text-7xl">
            Portfolio
            <span className="text-blue-400">Hub</span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
            Plateforme dynamique pour présenter et administrer mes projets
            professionnels.
          </p>

          <motion.a
  href="#projects"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.96 }}
  className="mt-8 inline-block cursor-pointer rounded-xl bg-blue-600 px-7 py-3 font-semibold text-white shadow-lg shadow-blue-600/30 transition-colors hover:bg-blue-500"
>
  Découvrir mes projets
</motion.a>
        </motion.div>
      </section>

      <ProjectsSection />
    </main>
  );
}

export default App;