import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const filters = ['All', 'AI Tools', 'Websites', 'Automation', 'Prompts'];

const projects = [
  {
    title: 'AI Portfolio Website',
    desc: 'A stunning 3D portfolio website showcasing AI skills with interactive elements, Three.js animations, and a built-in AI tools laboratory.',
    tags: ['React', 'Three.js', 'Tailwind', 'Framer Motion'],
    filter: 'Websites',
    icon: '🌐',
    color: '#6366f1',
    features: ['3D animations', 'AI Lab section', 'Responsive design', 'Glassmorphism UI'],
  },
  {
    title: 'AI Automation Agent',
    desc: 'Personal AI assistant that automates daily tasks including email summarization, content scheduling, and intelligent notifications.',
    tags: ['Python', 'Gemini API', 'Automation'],
    filter: 'Automation',
    icon: '🤖',
    color: '#22d3ee',
    features: ['Task automation', 'Smart scheduling', 'API integration', 'Notifications'],
  },
  {
    title: 'AI Prompt Library',
    desc: 'A curated collection of 100+ optimized prompts for ChatGPT, Claude, Midjourney and other AI tools, organized by category and use case.',
    tags: ['Prompt Engineering', 'ChatGPT', 'Claude'],
    filter: 'Prompts',
    icon: '📚',
    color: '#fb7185',
    features: ['100+ prompts', 'Categorized', 'Copy-paste ready', 'Regular updates'],
  },
  {
    title: 'AI Content Generator',
    desc: 'Automated content generation pipeline that creates blog posts, social media captions, and marketing copy using multiple AI models.',
    tags: ['AI', 'Automation', 'Content'],
    filter: 'AI Tools',
    icon: '✍️',
    color: '#34d399',
    features: ['Multi-model', 'Batch generation', 'Templates', 'Export options'],
  },
  {
    title: 'AI Image Generation Gallery',
    desc: 'Showcase of AI-generated artwork exploring various styles from photorealistic to abstract using Midjourney, DALL-E, and Stable Diffusion.',
    tags: ['Midjourney', 'DALL-E', 'Stable Diffusion'],
    filter: 'AI Tools',
    icon: '🎨',
    color: '#fbbf24',
    features: ['Multiple styles', 'High quality', 'Style transfer', 'Gallery view'],
  },
  {
    title: 'Telegram AI Task Assistant',
    desc: 'A Telegram bot powered by AI that helps manage tasks, set reminders, summarize messages, and provide intelligent responses.',
    tags: ['Telegram Bot', 'AI', 'Google Apps Script'],
    filter: 'Automation',
    icon: '💬',
    color: '#818cf8',
    features: ['Chat interface', 'Task management', 'Smart replies', 'Reminders'],
  },
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const filtered = activeFilter === 'All' ? projects : projects.filter((p) => p.filter === activeFilter);

  return (
    <section id="projects" className="relative py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="section-label mb-3 flex items-center gap-2">
            <span className="w-8 h-px bg-accent-light" />
            Projects
          </div>
          <h2 className="section-title text-3xl sm:text-4xl lg:text-5xl">
            Things I've built
            <br />
            <span className="text-gradient">with AI</span>
          </h2>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                activeFilter === f
                  ? 'bg-white/10 text-white border border-white/10'
                  : 'text-text-muted hover:text-text-secondary border border-transparent hover:border-border'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {filtered.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: i * 0.08 }}
                className="group gradient-border rounded-2xl bg-surface overflow-hidden hover:bg-surface-2 transition-all duration-300"
              >
                {/* Card Header with gradient */}
                <div
                  className="h-32 flex items-center justify-center relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${project.color}15, ${project.color}05)`,
                  }}
                >
                  <span className="text-5xl group-hover:scale-110 transition-transform duration-500">
                    {project.icon}
                  </span>
                  {/* Decorative shapes */}
                  <div
                    className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-20 group-hover:opacity-30 transition-opacity"
                    style={{ background: project.color, filter: 'blur(30px)' }}
                  />
                </div>

                {/* Card Body */}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="text-[10px] font-mono px-2 py-0.5 rounded-md"
                      style={{
                        background: `${project.color}15`,
                        color: project.color,
                      }}
                    >
                      {project.filter}
                    </span>
                  </div>
                  <h3 className="font-[Space_Grotesk] font-semibold text-base mb-2 text-text-primary group-hover:text-white transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-text-muted text-xs leading-relaxed mb-4">
                    {project.desc}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.features.map((f) => (
                      <span
                        key={f}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-surface-3 text-text-muted"
                      >
                        {f}
                      </span>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tags.map((tag) => (
                      <span key={tag} className="tag text-[10px]">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2 border-t border-border">
                    <button className="btn-ghost text-[11px] flex-1 justify-center hover:text-accent-light">
                      Live Demo →
                    </button>
                    <button className="btn-ghost text-[11px] flex-1 justify-center hover:text-accent-light">
                      GitHub ↗
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
