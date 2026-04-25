import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

/* ── Animated Counter ── */
function Counter({ end, label, suffix = '+' }: { end: number; label: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let current = 0;
    const step = Math.ceil(end / 40);
    const timer = setInterval(() => {
      current += step;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, 30);
    return () => clearInterval(timer);
  }, [inView, end]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-2xl sm:text-3xl font-bold font-[Space_Grotesk] text-gradient">
        {count}{suffix}
      </div>
      <div className="text-text-muted text-xs mt-1">{label}</div>
    </div>
  );
}

const stats = [
  { end: 10, label: 'AI Projects', suffix: '+' },
  { end: 50, label: 'Prompts Crafted', suffix: '+' },
  { end: 1000, label: 'AI Generations', suffix: '+' },
  { end: 15, label: 'Tools Explored', suffix: '+' },
];

const funFacts = [
  { icon: '🎯', text: 'Prompt engineering is my superpower' },
  { icon: '🔄', text: 'Automating workflows daily with AI' },
  { icon: '📚', text: 'Always learning new AI capabilities' },
  { icon: '🌍', text: 'Building for the future of intelligence' },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="section-label mb-3 flex items-center gap-2">
            <span className="w-8 h-px bg-accent-light" />
            About Me
          </div>
          <h2 className="section-title text-3xl sm:text-4xl lg:text-5xl">
            Passionate about building
            <br />
            <span className="text-gradient">intelligent solutions</span>
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-3 gap-4">
          {/* Main Bio Card - spans 2 cols */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-2 gradient-border p-6 sm:p-8 rounded-2xl bg-surface"
          >
            <h3 className="font-[Space_Grotesk] text-xl font-semibold mb-4 text-text-primary">
              Who I Am
            </h3>
            <div className="space-y-4 text-text-secondary text-sm leading-relaxed">
              <p>
                I'm <span className="text-text-primary font-medium">Sahadeb Pratihar</span> — a curious mind diving deep into
                the world of Generative AI, Prompt Engineering, and AI Automation. My journey started with a
                simple question: <span className="text-accent-light italic">"How can AI make human work more meaningful?"</span>
              </p>
              <p>
                Today, I specialize in crafting precise prompts that unlock the full potential of AI models like
                ChatGPT, Claude, and Gemini. I build automated workflows that transform repetitive tasks into
                elegant, AI-powered systems — from content generation pipelines to intelligent chatbots.
              </p>
              <p>
                My focus is on <span className="text-text-primary">practical AI</span> — not just theory, but real tools and
                solutions that make a difference. Whether it's setting up a Telegram bot that summarizes articles,
                creating a prompt library for creators, or designing AI dashboards, I bring ideas to life with
                intelligence.
              </p>
            </div>
          </motion.div>

          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="gradient-border p-6 rounded-2xl bg-surface flex flex-col items-center justify-center text-center"
          >
            <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-accent/20 to-cyan/10 border border-accent/10 flex items-center justify-center mb-4 relative">
              <span className="text-5xl">👨‍💻</span>
              <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald border-2 border-surface flex items-center justify-center">
                <span className="text-[8px]">✓</span>
              </div>
            </div>
            <h4 className="font-[Space_Grotesk] font-semibold text-lg">Sahadeb Pratihar</h4>
            <p className="text-text-muted text-sm mt-1">India 🇮🇳</p>
            <div className="mt-4 flex gap-2">
              <span className="tag">AI</span>
              <span className="tag" style={{ background: 'rgba(34,211,238,0.1)', color: '#22d3ee', borderColor: 'rgba(34,211,238,0.15)' }}>
                Prompts
              </span>
              <span className="tag" style={{ background: 'rgba(251,113,133,0.1)', color: '#fb7185', borderColor: 'rgba(251,113,133,0.15)' }}>
                Automation
              </span>
            </div>
          </motion.div>

          {/* Stats Card - spans 2 cols */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="md:col-span-2 gradient-border p-6 rounded-2xl bg-surface"
          >
            <h3 className="font-[Space_Grotesk] text-lg font-semibold mb-6 text-text-primary">
              By the Numbers
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <Counter key={stat.label} {...stat} />
              ))}
            </div>
          </motion.div>

          {/* Fun Facts Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="gradient-border p-6 rounded-2xl bg-surface"
          >
            <h3 className="font-[Space_Grotesk] text-lg font-semibold mb-4 text-text-primary">
              Quick Facts
            </h3>
            <div className="space-y-3">
              {funFacts.map((fact, i) => (
                <div key={i} className="flex items-start gap-3 text-sm">
                  <span className="text-base mt-0.5">{fact.icon}</span>
                  <span className="text-text-secondary">{fact.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
