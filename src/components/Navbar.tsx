import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { id: 'home', label: 'Home', icon: '⌂' },
  { id: 'about', label: 'About', icon: '◎' },
  { id: 'skills', label: 'Skills', icon: '⚡' },
  { id: 'projects', label: 'Projects', icon: '◈' },
  { id: 'ai-lab', label: 'AI Lab', icon: '🤖' },
  { id: 'experience', label: 'Journey', icon: '◇' },
  { id: 'testimonials', label: 'Reviews', icon: '♡' },
  { id: 'contact', label: 'Contact', icon: '✉' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Detect active section
      const sections = navLinks.map(l => document.getElementById(l.id));
      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec) {
          const rect = sec.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(navLinks[i].id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navbar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 hidden md:flex items-center gap-1 px-2 py-2 rounded-full transition-all duration-500 ${
          scrolled
            ? 'glass-strong shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        {/* Logo */}
        <button
          onClick={() => scrollTo('home')}
          className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-white/5 transition-colors mr-2"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-cyan flex items-center justify-center text-white font-bold text-sm font-[Space_Grotesk]">
            SP
          </div>
        </button>

        {/* Links */}
        <div className="flex items-center gap-0.5">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`relative px-3 py-2 rounded-full text-xs font-medium transition-all duration-200 ${
                activeSection === link.id
                  ? 'text-white'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {activeSection === link.id && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 bg-white/10 rounded-full"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{link.label}</span>
            </button>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={() => scrollTo('contact')}
          className="ml-2 px-4 py-2 rounded-full bg-gradient-to-r from-accent to-accent-light text-white text-xs font-semibold hover:shadow-lg hover:shadow-accent/20 transition-all"
        >
          Hire Me
        </button>
      </motion.nav>

      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 glass-strong">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={() => scrollTo('home')} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-cyan flex items-center justify-center text-white font-bold text-sm">
              SP
            </div>
            <span className="font-[Space_Grotesk] font-semibold text-sm">Sahadeb</span>
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-white/5 transition-colors"
          >
            <div className="flex flex-col gap-1.5 items-center">
              <motion.span
                animate={mobileMenuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                className="block w-5 h-0.5 bg-white rounded-full"
              />
              <motion.span
                animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block w-5 h-0.5 bg-white rounded-full"
              />
              <motion.span
                animate={mobileMenuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
                className="block w-5 h-0.5 bg-white rounded-full"
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 z-40 bg-midnight/95 backdrop-blur-xl pt-20 px-6"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => scrollTo(link.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors ${
                    activeSection === link.id
                      ? 'bg-white/10 text-white'
                      : 'text-text-secondary hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span className="text-lg">{link.icon}</span>
                  <span className="font-medium">{link.label}</span>
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                onClick={() => scrollTo('contact')}
                className="mt-4 w-full py-3 rounded-xl bg-gradient-to-r from-accent to-accent-light text-white font-semibold text-center"
              >
                Hire Me
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
