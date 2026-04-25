import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ── Skills Data ── */
const skillCategories = [
  {
    id: 'ai',
    label: 'AI & Gen AI',
    color: '#6366f1',
    skills: [
      { name: 'Prompt Engineering', level: 95 },
      { name: 'ChatGPT / Claude AI', level: 90 },
      { name: 'Midjourney / DALL-E', level: 85 },
      { name: 'Stable Diffusion', level: 80 },
      { name: 'AI Automation', level: 85 },
      { name: 'LangChain Basics', level: 70 },
    ],
  },
  {
    id: 'tools',
    label: 'Platforms',
    color: '#22d3ee',
    skills: [
      { name: 'Google AI Studio', level: 85 },
      { name: 'Runway ML', level: 80 },
      { name: 'ElevenLabs', level: 85 },
      { name: 'Canva AI', level: 90 },
      { name: 'n8n / Make.com', level: 75 },
      { name: 'Hugging Face', level: 70 },
    ],
  },
  {
    id: 'other',
    label: 'Other',
    color: '#fb7185',
    skills: [
      { name: 'Content Writing', level: 85 },
      { name: 'Research & Analysis', level: 90 },
      { name: 'AI Ethics & Safety', level: 80 },
      { name: 'Social Media AI', level: 85 },
      { name: 'Google Apps Script', level: 75 },
      { name: 'Telegram Bots', level: 80 },
    ],
  },
];

/* ── Services Data ── */
const services = [
  {
    icon: '✍️',
    title: 'Prompt Writing',
    desc: 'Crafting precise, high-converting prompts for ChatGPT, Claude, Midjourney and more.',
    color: '#6366f1',
  },
  {
    icon: '⚙️',
    title: 'AI Workflow Setup',
    desc: 'Designing automated pipelines that connect AI tools to streamline your business.',
    color: '#22d3ee',
  },
  {
    icon: '📝',
    title: 'AI Content Assistance',
    desc: 'Generating high-quality blogs, social posts, emails and marketing copy with AI.',
    color: '#fb7185',
  },
  {
    icon: '🔬',
    title: 'AI Research Support',
    desc: 'Deep-dive research powered by AI to gather insights, summarize papers, and analyze data.',
    color: '#34d399',
  },
  {
    icon: '🤖',
    title: 'AI Automation Consulting',
    desc: 'Expert guidance on integrating AI automation into your existing workflows.',
    color: '#fbbf24',
  },
  {
    icon: '🚀',
    title: 'Personal Branding with AI',
    desc: 'Leverage AI tools to build a strong, consistent personal brand across platforms.',
    color: '#818cf8',
  },
  {
    icon: '📊',
    title: 'AI Productivity Systems',
    desc: 'Custom AI-powered systems for task management, scheduling and productivity.',
    color: '#f472b6',
  },
  {
    icon: '🔧',
    title: 'AI Tool Integration',
    desc: 'Seamlessly integrate AI APIs and tools into your applications and workflows.',
    color: '#a78bfa',
  },
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('ai');
  const activeSkills = skillCategories.find((c) => c.id === activeCategory)!;

  return (
    <>
      {/* Skills Section */}
      <section id="skills" className="relative py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="section-label mb-3 flex items-center gap-2">
              <span className="w-8 h-px bg-accent-light" />
              Skills & Expertise
            </div>
            <h2 className="section-title text-3xl sm:text-4xl lg:text-5xl">
              My AI toolkit
              <br />
              <span className="text-gradient-cool">& abilities</span>
            </h2>
          </motion.div>

          {/* Category Tabs */}
          <div className="flex gap-2 mb-10">
            {skillCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat.id
                    ? 'bg-white/10 text-white border border-white/10'
                    : 'text-text-muted hover:text-text-secondary border border-transparent'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Skills Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {activeSkills.skills.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="gradient-border p-5 rounded-xl bg-surface group hover:bg-surface-2 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-text-primary">
                      {skill.name}
                    </span>
                    <span className="text-xs font-mono text-text-muted">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-surface-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.05 + 0.3, ease: 'easeOut' }}
                      className="h-full rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${activeSkills.color}, ${activeSkills.color}88)`,
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Skill Tags Cloud */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-10 flex flex-wrap gap-2"
          >
            {['ChatGPT', 'Gemini', 'Claude', 'Prompt Engineering', 'Generative AI', 'AI Research',
              'Workflow Automation', 'Content Creation', 'Google Apps Script', 'Telegram Bots',
              'No-Code AI', 'Midjourney', 'DALL-E', 'ElevenLabs', 'Runway ML'].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-surface-2 border border-border text-text-secondary hover:border-accent/20 hover:text-accent-light transition-colors cursor-default"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="section-label mb-3 flex items-center gap-2">
              <span className="w-8 h-px bg-accent-light" />
              Services
            </div>
            <h2 className="section-title text-3xl sm:text-4xl lg:text-5xl">
              What I can do
              <br />
              <span className="text-gradient-warm">for you</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="gradient-border p-5 rounded-2xl bg-surface group hover:bg-surface-2 transition-all duration-300 cursor-default"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-4"
                  style={{ background: `${service.color}15` }}
                >
                  {service.icon}
                </div>
                <h4 className="font-[Space_Grotesk] font-semibold text-sm mb-2 text-text-primary group-hover:text-white transition-colors">
                  {service.title}
                </h4>
                <p className="text-text-muted text-xs leading-relaxed">
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
