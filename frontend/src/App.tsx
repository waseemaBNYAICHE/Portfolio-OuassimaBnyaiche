import { motion, MotionConfig } from 'motion/react'

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 px-6">
        <motion.section
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="w-full max-w-3xl rounded-3xl border border-white/10 bg-white/10 p-10 text-center text-white shadow-2xl backdrop-blur-xl"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-flex rounded-full bg-blue-500/20 px-4 py-2 text-sm font-medium text-blue-200"
          >
            Full Stack Developer
          </motion.span>

          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
            Portfolio
            <span className="text-blue-400">Hub</span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
            Plateforme dynamique pour présenter et administrer mes projets
            professionnels.
          </p>

          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="mt-8 rounded-xl bg-blue-600 px-7 py-3 font-semibold text-white shadow-lg shadow-blue-600/30 transition-colors hover:bg-blue-500"
          >
            Découvrir mes projets
          </motion.button>
        </motion.section>
      </main>
    </MotionConfig>
  )
}

export default App