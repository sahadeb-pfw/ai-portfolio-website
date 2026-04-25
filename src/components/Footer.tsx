

const quickLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'AI Lab', href: '#ai-lab' },
  { label: 'Contact', href: '#contact' },
];

const socials = [
  { name: 'GitHub', icon: 'GH', href: '#' },
  { name: 'LinkedIn', icon: 'LI', href: '#' },
  { name: 'Twitter', icon: 'TW', href: '#' },
  { name: 'Telegram', icon: 'TG', href: '#' },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-border">
      {/* Gradient top line */}
      <div className="h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 py-12">
        <div className="grid sm:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-cyan flex items-center justify-center text-white font-bold text-sm font-[Space_Grotesk]">
                SP
              </div>
              <span className="font-[Space_Grotesk] font-semibold">Sahadeb Pratihar</span>
            </div>
            <p className="text-text-muted text-xs leading-relaxed">
              Turning ideas into intelligence with AI. Building the future, one prompt at a time.
            </p>
            <p className="text-text-muted text-[10px] mt-3 font-mono">Powered by AI ⚡</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold text-text-primary mb-3">Quick Links</h4>
            <div className="space-y-2">
              {quickLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-xs text-text-muted hover:text-accent-light transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-xs font-semibold text-text-primary mb-3">Connect</h4>
            <div className="flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.name}
                  className="w-9 h-9 rounded-lg bg-surface-2 border border-border flex items-center justify-center text-xs font-mono text-text-muted hover:border-accent/30 hover:text-accent-light transition-all"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-text-muted text-[11px]">
            © {new Date().getFullYear()} Sahadeb Pratihar. All rights reserved.
          </p>
          <p className="text-text-muted text-[10px] font-mono">
            Designed & built with AI ✦ React + Three.js
          </p>
        </div>
      </div>
    </footer>
  );
}
