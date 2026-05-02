import { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Github, Mail, MessageCircle } from 'lucide-react';

/* ── 3D Floating Shapes ── */
function FloatingShapes() {
  const meshRef1 = useRef<THREE.Mesh>(null);
  const meshRef2 = useRef<THREE.Mesh>(null);
  const meshRef3 = useRef<THREE.Mesh>(null);
  const meshRef4 = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshRef1.current) {
      meshRef1.current.rotation.x = t * 0.2;
      meshRef1.current.rotation.y = t * 0.3;
      meshRef1.current.position.y = Math.sin(t * 0.5) * 0.3;
    }
    if (meshRef2.current) {
      meshRef2.current.rotation.x = t * 0.15;
      meshRef2.current.rotation.z = t * 0.25;
      meshRef2.current.position.y = Math.sin(t * 0.4 + 1) * 0.4;
    }
    if (meshRef3.current) {
      meshRef3.current.rotation.y = t * 0.3;
      meshRef3.current.position.y = Math.cos(t * 0.35) * 0.3;
    }
    if (meshRef4.current) {
      meshRef4.current.rotation.x = t * 0.1;
      meshRef4.current.rotation.y = t * 0.15;
    }
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Icosahedron */}
      <mesh ref={meshRef1} position={[-1.5, 0.5, 0]}>
        <icosahedronGeometry args={[0.8, 1]} />
        <meshStandardMaterial
          color="#6366f1"
          wireframe
          transparent
          opacity={0.25}
        />
      </mesh>
      {/* Torus */}
      <mesh ref={meshRef2} position={[1.8, -0.3, -1]}>
        <torusGeometry args={[0.6, 0.2, 16, 32]} />
        <meshStandardMaterial
          color="#22d3ee"
          wireframe
          transparent
          opacity={0.2}
        />
      </mesh>
      {/* Octahedron */}
      <mesh ref={meshRef3} position={[0, 1.5, -2]}>
        <octahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial
          color="#fb7185"
          wireframe
          transparent
          opacity={0.2}
        />
      </mesh>
      {/* Dodecahedron */}
      <mesh ref={meshRef4} position={[-0.5, -1.2, 0.5]}>
        <dodecahedronGeometry args={[0.4, 0]} />
        <meshStandardMaterial
          color="#818cf8"
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>
    </group>
  );
}

/* ── Typewriter Hook ── */
function useTypewriter(strings: string[], speed = 80, pause = 2000) {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = strings[index];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIndex < current.length) {
      timeout = setTimeout(() => {
        setText(current.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, speed);
    } else if (!deleting && charIndex === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setText(current.slice(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      }, speed / 2);
    } else if (deleting && charIndex === 0) {
      setDeleting(false);
      setIndex((index + 1) % strings.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, index, strings, speed, pause]);

  return text;
}

/* ── Particle Field ── */
function Particles() {
  const count = 60;
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
      ref.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#6366f1" transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

export default function Hero() {
  const typedText = useTypewriter([
    'Generative AI Enthusiast',
    'Prompt Engineering Expert',
    'AI Automation Builder',
    'Creative AI Explorer',
  ], 60, 2500);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 60 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[5, 5, 5]} intensity={0.8} />
          <FloatingShapes />
          <Particles />
        </Canvas>
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/8 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan/6 rounded-full blur-[120px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pt-24 md:pt-0">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="section-label mb-4 flex items-center gap-2">
                <span className="w-8 h-px bg-accent-light" />
                Welcome to my universe
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-[Space_Grotesk] text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] mb-4"
            >
              Hi, I'm{' '}
              <span className="text-gradient">Sahadeb Pratihar</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-2 border border-border">
                <span className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
                <span className="text-sm text-text-secondary font-mono typing-cursor">
                  {typedText}
                </span>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-text-secondary text-base sm:text-lg leading-relaxed max-w-lg mb-8"
            >
              Turning ideas into intelligence with AI. I craft powerful prompts,
              build automated workflows, and explore the frontiers of generative AI
              to create meaningful digital solutions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-3"
            >
              <a href="#projects" className="btn-primary">
                <span>View My Work</span>
                <span>→</span>
              </a>
              <a href="#ai-lab" className="btn-secondary">
                <span>🤖</span>
                <span>Explore AI Lab</span>
              </a>
              <a href="#contact" className="btn-ghost">
                <span>Get in touch</span>
              </a>
            </motion.div>

            {/* Social Icons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex items-center gap-3 mt-8"
            >
              {[
  { label: 'GitHub', href: 'https://github.com/sahadeb-pfw', icon: Github },
  { label: 'WhatsApp', href: 'https://wa.me/919933376136', icon: MessageCircle },
  { label: 'Email', href: 'mailto:hello.sahadebpfw@gmail.com', icon: Mail },
].map((s) => {
  const Icon = s.icon;
  return (
    <a
      key={s.label}
      href={s.href}
      target="_blank"
      rel="noopener noreferrer"
      title={s.label}
      className="w-9 h-9 rounded-lg bg-surface-2 border border-border flex items-center justify-center text-text-muted hover:border-accent/30 hover:text-accent-light transition-all"
    >
      <Icon size={16} />
    </a>
  );
})}
            </motion.div>
          </div>

          {/* Right - Abstract visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden md:flex items-center justify-center"
          >
            <div className="relative w-80 h-80">
              {/* Rotating ring */}
              <div className="absolute inset-0 rounded-full border border-accent/20 animate-spin-slow" />
              <div className="absolute inset-4 rounded-full border border-cyan/10 animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '30s' }} />
              {/* Center avatar area */}
              <div className="absolute inset-12 rounded-full bg-gradient-to-br from-accent/20 to-cyan/10 flex items-center justify-center overflow-hidden border border-accent/10">
                <div className="text-center">
                  <div className="text-6xl mb-2">🧠</div>
                  <p className="text-xs text-text-muted font-mono">AI Powered</p>
                </div>
              </div>
              {/* Floating dots */}
              {[
                { top: '10%', left: '50%', color: '#6366f1', delay: 0 },
                { top: '30%', left: '85%', color: '#22d3ee', delay: 0.5 },
                { top: '70%', left: '80%', color: '#fb7185', delay: 1 },
                { top: '85%', left: '45%', color: '#818cf8', delay: 1.5 },
                { top: '65%', left: '15%', color: '#34d399', delay: 2 },
                { top: '25%', left: '10%', color: '#fbbf24', delay: 2.5 },
              ].map((dot, i) => (
                <div
                  key={i}
                  className="absolute w-3 h-3 rounded-full"
                  style={{
                    top: dot.top,
                    left: dot.left,
                    background: dot.color,
                    boxShadow: `0 0 12px ${dot.color}`,
                    animation: `float 3s ease-in-out infinite`,
                    animationDelay: `${dot.delay}s`,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-text-muted text-xs font-mono">scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 rounded-full border border-border flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-accent-light" />
        </motion.div>
      </motion.div>
    </section>
  );
}
