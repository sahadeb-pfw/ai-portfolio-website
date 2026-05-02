import { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Send, MessageCircle } from 'lucide-react';

const socials = [
  { name: 'GitHub', icon: Github, href: 'https://github.com/sahadeb-pfw', color: '#f1f1f7' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/in/sahadebpratihar', color: '#0077b5' },
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/sahadebpratihar', color: '#1da1f2' },
  { name: 'Telegram', icon: Send, href: 'https://t.me/YOUR_USERNAME', color: '#0088cc' },
  { name: 'WhatsApp', icon: MessageCircle, href: 'https://wa.me/919933376136', color: '#25d366' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const [statusMessage, setStatusMessage] = useState('');
const formEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT as string | undefined;

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!formEndpoint) {
    setStatus('error');
    setStatusMessage('Form is not connected. Missing VITE_FORMSPREE_ENDPOINT');
    return;
  }

  setStatus('sending');
  setStatusMessage('');

  try {
    const res = await fetch(formEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message,
      }),
    });

    if (!res.ok) throw new Error('Form submit failed');

    setStatus('sent');
    setStatusMessage('Thank you! Message sent successfully.');
    setForm({ name: '', email: '', subject: '', message: '' });
  } catch {
    setStatus('error');
    setStatusMessage('Message not sent. Please try again.');
  }
};
  return (
    <section id="contact" className="relative py-24 md:py-32">
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
            Get In Touch
          </div>
          <h2 className="section-title text-3xl sm:text-4xl lg:text-5xl">
            Let's build something
            <br />
            <span className="text-gradient">amazing together</span>
          </h2>
          <p className="text-text-secondary text-sm mt-4 max-w-lg">
            Have a project in mind? Need AI automation for your business? Or just want to chat about the future of AI?
            I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8">
          {/* Left - Info */}
          <div className="space-y-4">
            {/* Contact Info Cards */}
            {[
              { icon: '📧', label: 'Email', value: 'hello.sahadebpfw@gmail.com', sub: 'Response within 24h' },
              { icon: '📍', label: 'Location', value: 'India', sub: 'Available worldwide' },
              { icon: '💼', label: 'Availability', value: 'Open for projects', sub: 'Freelance & consulting' },
            ].map((info) => (
              <motion.div
                key={info.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="gradient-border p-4 rounded-xl bg-surface flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-surface-2 flex items-center justify-center text-lg">
                  {info.icon}
                </div>
                <div>
                  <div className="text-xs text-text-muted">{info.label}</div>
                  <div className="text-sm font-medium text-text-primary">{info.value}</div>
                  <div className="text-[10px] text-text-muted">{info.sub}</div>
                </div>
              </motion.div>
            ))}

            {/* Social Links */}
            <div className="pt-4">
              <p className="text-xs text-text-muted mb-3">Find me on</p>
              <div className="flex gap-2">
                {socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={s.name}
                    className="w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center text-xs font-mono text-text-muted hover:border-accent/30 hover:text-accent-light transition-all"
                  >
                   <s.icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="gradient-border p-6 sm:p-8 rounded-2xl bg-surface space-y-4"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-text-secondary mb-1.5 block">Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  required
                  className="input-field"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-text-secondary mb-1.5 block">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="your@email.com"
                  required
                  className="input-field"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-text-secondary mb-1.5 block">Subject</label>
              <input
                type="text"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                placeholder="What's this about?"
                required
                className="input-field"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-text-secondary mb-1.5 block">Message</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell me about your project..."
                required
                rows={5}
                className="input-field resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={status === 'sending'}
              className="btn-primary w-full justify-center"
            >
              {status === 'sending' ? (
                <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</>
              ) : status === 'sent' ? (
                '✓ Message Sent!'
              ) : (
                'Send Message →'
              )}
            </button>
            {status === 'sent' && (
  <p className="text-emerald text-xs text-center">{statusMessage || "Thank you! I'll get back to you soon."}</p>
)}
{status === 'error' && (
  <p className="text-rose text-xs text-center">{statusMessage}</p>
)}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
