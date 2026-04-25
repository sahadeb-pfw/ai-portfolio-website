import { useState } from 'react';
import { motion } from 'framer-motion';

/* ── Experience / Journey Timeline ── */
const timeline = [
  {
    date: '2024 — Present',
    title: 'Generative AI Exploration',
    desc: 'Diving deep into ChatGPT, Claude, Gemini, and other frontier AI models. Building practical projects and experimenting with prompt engineering.',
    icon: '🧠',
    color: '#6366f1',
  },
  {
    date: '2024',
    title: 'Prompt Engineering Mastery',
    desc: 'Engineered 50+ specialized prompts for various use cases — content creation, coding assistance, data analysis, and creative generation.',
    icon: '✍️',
    color: '#22d3ee',
  },
  {
    date: '2024',
    title: 'AI Automation Experiments',
    desc: 'Built automated workflows using n8n, Make.com, Google Apps Script, and Telegram bots. Connected AI APIs to create intelligent pipelines.',
    icon: '⚙️',
    color: '#fb7185',
  },
  {
    date: '2024',
    title: 'Portfolio & AI Lab Launch',
    desc: 'Created this portfolio website with a built-in AI tools laboratory, showcasing projects, skills, and real working AI utilities.',
    icon: '🚀',
    color: '#34d399',
  },
  {
    date: '2025',
    title: 'Certifications & Courses',
    desc: 'Completed courses in Generative AI, Prompt Engineering, and AI Ethics. Continuously learning and staying updated with the latest AI developments.',
    icon: '🎓',
    color: '#fbbf24',
  },
];

export function Experience() {
  return (
    <section id="experience" className="relative py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="section-label mb-3 flex items-center gap-2">
            <span className="w-8 h-px bg-accent-light" />
            My Journey
          </div>
          <h2 className="section-title text-3xl sm:text-4xl lg:text-5xl">
            Learning
            <br />
            <span className="text-gradient-cool">path & growth</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-accent/30 via-cyan/20 to-transparent" />

          <div className="space-y-8">
            {timeline.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative pl-16"
              >
                {/* Dot */}
                <div
                  className="absolute left-4 top-1 w-5 h-5 rounded-full border-2 flex items-center justify-center"
                  style={{ borderColor: item.color, background: `${item.color}20` }}
                >
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: item.color }} />
                </div>

                <div className="gradient-border p-5 rounded-xl bg-surface">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-base">{item.icon}</span>
                    <span className="text-[10px] font-mono text-text-muted">{item.date}</span>
                  </div>
                  <h4 className="font-[Space_Grotesk] font-semibold text-sm mb-1 text-text-primary">
                    {item.title}
                  </h4>
                  <p className="text-text-muted text-xs leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Blog Section ── */
const blogPosts = [
  {
    title: 'How I Started My AI Journey',
    excerpt: 'From curiosity to creation — my story of discovering generative AI and how it transformed my approach to problem-solving.',
    date: 'Dec 2024',
    category: 'Personal',
    readTime: '5 min',
    color: '#6366f1',
  },
  {
    title: 'Top 10 Prompt Engineering Tips',
    excerpt: 'Practical techniques I use daily to get better results from AI models. From system prompts to chain-of-thought reasoning.',
    date: 'Jan 2025',
    category: 'Guides',
    readTime: '8 min',
    color: '#22d3ee',
  },
  {
    title: 'AI Tools Every Beginner Should Know',
    excerpt: 'A curated list of free and accessible AI tools that can supercharge your productivity from day one.',
    date: 'Feb 2025',
    category: 'Tools',
    readTime: '6 min',
    color: '#fb7185',
  },
  {
    title: 'The Future of Generative AI',
    excerpt: 'Exploring upcoming trends in AI — multimodal models, AI agents, and the democratization of artificial intelligence.',
    date: 'Mar 2025',
    category: 'Trends',
    readTime: '7 min',
    color: '#34d399',
  },
];

export function Blog() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="section-label mb-3 flex items-center gap-2">
            <span className="w-8 h-px bg-accent-light" />
            Blog & Insights
          </div>
          <h2 className="section-title text-3xl sm:text-4xl lg:text-5xl">
            Thoughts &
            <br />
            <span className="text-gradient-warm">writings</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4">
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group gradient-border rounded-2xl bg-surface p-6 hover:bg-surface-2 transition-all duration-300 cursor-pointer"
            >
              {/* Thumbnail placeholder */}
              <div
                className="h-32 rounded-xl mb-4 flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${post.color}12, ${post.color}05)` }}
              >
                <span className="text-3xl group-hover:scale-110 transition-transform duration-500">📰</span>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <span
                  className="text-[10px] font-mono px-2 py-0.5 rounded-md"
                  style={{ background: `${post.color}15`, color: post.color }}
                >
                  {post.category}
                </span>
                <span className="text-text-muted text-[10px]">{post.readTime}</span>
              </div>
              <h3 className="font-[Space_Grotesk] font-semibold text-sm mb-2 group-hover:text-white transition-colors">
                {post.title}
              </h3>
              <p className="text-text-muted text-xs leading-relaxed">{post.excerpt}</p>
              <div className="mt-3 text-accent-light text-xs font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                Read more →
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Testimonials ── */
const testimonials = [
  {
    name: 'Alex Rivera',
    role: 'Startup Founder',
    text: 'Sahadeb\'s prompt engineering skills transformed our AI content pipeline. His ability to craft precise, effective prompts saved us hours of work weekly.',
    rating: 5,
    color: '#6366f1',
  },
  {
    name: 'Priya Sharma',
    role: 'Digital Marketing Lead',
    text: 'Working with Sahadeb on AI automation was a game-changer. He set up workflows that reduced our content creation time by 60%.',
    rating: 5,
    color: '#22d3ee',
  },
  {
    name: 'Jordan Chen',
    role: 'Freelance Developer',
    text: 'The AI tools and prompts Sahadeb created for our project were incredibly well-designed. His understanding of AI capabilities is impressive.',
    rating: 5,
    color: '#fb7185',
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="section-label mb-3 flex items-center gap-2">
            <span className="w-8 h-px bg-accent-light" />
            Testimonials
          </div>
          <h2 className="section-title text-3xl sm:text-4xl lg:text-5xl">
            Kind words from
            <br />
            <span className="text-gradient">collaborators</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="gradient-border p-6 rounded-2xl bg-surface"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, si) => (
                  <span key={si} className="text-amber text-xs">★</span>
                ))}
              </div>
              <p className="text-text-secondary text-xs leading-relaxed mb-6 italic">
                "{t.text}"
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{ background: `${t.color}20`, color: t.color }}
                >
                  {t.name[0]}
                </div>
                <div>
                  <div className="text-xs font-semibold text-text-primary">{t.name}</div>
                  <div className="text-[10px] text-text-muted">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── FAQ Section ── */
const faqs = [
  {
    q: 'What AI tools do you specialize in?',
    a: 'I specialize in ChatGPT, Claude, Gemini, Midjourney, DALL-E, Stable Diffusion, ElevenLabs, Runway ML, and various automation platforms like n8n and Make.com. I\'m always exploring new tools as they emerge.',
  },
  {
    q: 'Can you help me set up AI automation for my business?',
    a: 'Absolutely! I can help design and implement AI-powered workflows for content creation, customer support, data analysis, email automation, and more. Let\'s discuss your specific needs.',
  },
  {
    q: 'What is prompt engineering and why does it matter?',
    a: 'Prompt engineering is the art of crafting instructions that guide AI models to produce optimal outputs. It matters because the quality of your prompt directly impacts the quality of AI responses — better prompts mean better results.',
  },
  {
    q: 'Are the AI tools on this website free to use?',
    a: 'The tools showcased here use a mix of free browser APIs (Web Speech API, Tesseract.js for OCR) and demo outputs. Some tools are ready for API integration (Hugging Face, Gemini) which offer free tiers.',
  },
  {
    q: 'How can I collaborate with you?',
    a: 'You can reach out through the contact form below, or connect with me on LinkedIn, GitHub, or Telegram. I\'m open to freelance projects, collaborations, and consulting opportunities.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <div className="section-label mb-3 justify-center flex items-center gap-2">
            <span className="w-8 h-px bg-accent-light" />
            FAQ
            <span className="w-8 h-px bg-accent-light" />
          </div>
          <h2 className="section-title text-3xl sm:text-4xl">
            Common questions
          </h2>
        </motion.div>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="gradient-border rounded-xl bg-surface overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left"
              >
                <span className="text-sm font-medium text-text-primary pr-4">{faq.q}</span>
                <span className={`text-text-muted text-lg transition-transform duration-300 shrink-0 ${openIndex === i ? 'rotate-45' : ''}`}>
                  +
                </span>
              </button>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="px-5 pb-4"
                >
                  <p className="text-text-secondary text-xs leading-relaxed">{faq.a}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
