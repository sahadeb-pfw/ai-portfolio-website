import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import AILab from './components/AILab';
import { Experience, Blog, Testimonials, FAQ } from './components/Sections';
import Contact from './components/Contact';
import Footer from './components/Footer';

/* ============================================
   LOADING SCREEN — Minimalist fade
   ============================================ */
function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 1800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[100] bg-[#06060a] flex items-center justify-center"
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent to-cyan flex items-center justify-center text-white font-bold text-lg font-[Space_Grotesk] mx-auto">
            SP
          </div>
        </motion.div>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 120 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          className="h-0.5 bg-gradient-to-r from-accent to-cyan rounded-full mx-auto mb-4"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-text-muted text-xs font-mono"
        >
          Initializing...
        </motion.p>
      </div>
    </motion.div>
  );
}

/* ============================================
   BACK TO TOP BUTTON
   ============================================ */
function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-40 w-10 h-10 rounded-xl bg-surface-2 border border-border flex items-center justify-center text-text-secondary hover:text-white hover:border-accent/30 transition-all shadow-lg shadow-black/20"
        >
          ↑
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ============================================
   SECTION DIVIDER
   ============================================ */
function Divider() {
  return (
    <div className="max-w-6xl mx-auto px-6 md:px-12">
      <div className="gradient-line" />
    </div>
  );
}

/* ============================================
   MAIN APP
   ============================================ */
export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <>
          {/* Aurora Background */}
          <div className="aurora-bg">
            <div className="aurora-blob aurora-blob-1" />
            <div className="aurora-blob aurora-blob-2" />
            <div className="aurora-blob aurora-blob-3" />
          </div>

          {/* Noise Overlay */}
          <div className="noise-overlay" />

          {/* Navigation */}
          <Navbar />

          {/* Main Content */}
          <main className="relative z-10">
            <Hero />
            <Divider />
            <About />
            <Divider />
            <Skills />
            <Divider />
            <Projects />
            <Divider />
            <AILab />
            <Divider />
            <Experience />
            <Divider />
            <Blog />
            <Divider />
            <Testimonials />
            <Divider />
            <FAQ />
            <Divider />
            <Contact />
          </main>

          <Footer />
          <BackToTop />
        </>
      )}
    </>
  );
}
