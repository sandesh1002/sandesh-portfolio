import { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, FileText, ArrowRight } from 'lucide-react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';

const PRIMARY = 'hsl(190,90%,50%)';
const SECONDARY = 'hsl(260,80%,65%)';
const MUTED = 'hsl(215,20%,65%)';

function Counter({ from, to }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const count = useMotionValue(from);
  const rounded = useTransform(count, (v) => Math.round(v));
  const spring = useSpring(count, { duration: 2000, bounce: 0 });

  useEffect(() => {
    if (inView) spring.set(to);
  }, [inView, spring, to]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

const TITLES = ['Full Stack Developer', 'React.js Engineer', 'MERN Stack Builder', 'Node.js Developer'];

export default function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = TITLES[titleIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        if (currentText === fullText) setTimeout(() => setIsDeleting(true), 1500);
      } else {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        if (currentText === '') {
          setIsDeleting(false);
          setTitleIndex((prev) => (prev + 1) % TITLES.length);
        }
      }
    }, isDeleting ? 40 : 80);
    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, titleIndex]);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${PRIMARY}33, transparent 70%)`, filter: 'blur(80px)' }} />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${SECONDARY}22, transparent 70%)`, filter: 'blur(80px)' }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 grid lg:grid-cols-2 gap-12 items-center w-full">

        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex flex-col items-start"
        >
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel mb-6" style={{ border: `1px solid ${PRIMARY}40` }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: PRIMARY }} />
            <span className="text-xs font-mono uppercase tracking-wider" style={{ color: PRIMARY }}>Available for work</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-heading font-bold text-white mb-4 leading-tight">
            Hi, I'm <br />
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(135deg, ${PRIMARY}, ${SECONDARY})` }}>
              Sandesh Jadhav
            </span>
          </h1>

          <h2 className="text-xl md:text-2xl font-mono mb-2 h-8" style={{ color: MUTED }}>
            {currentText}<span className="animate-pulse">|</span>
          </h2>

          <p className="text-base mb-10 max-w-lg leading-relaxed mt-4" style={{ color: `${MUTED}cc` }}>
            I architect and build scalable, secure web applications from database to UI.
            I don't just write code — I craft digital experiences.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-10">
            <a
              href="#projects"
              className="group flex items-center gap-2 px-6 py-3 rounded-md font-medium text-sm transition-all duration-200 hover:scale-105"
              style={{ background: PRIMARY, color: 'hsl(222,47%,11%)' }}
            >
              View Projects
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-md font-medium text-sm border transition-all duration-200 hover:scale-105"
              style={{ borderColor: `${PRIMARY}60`, color: PRIMARY }}
              onMouseEnter={(e) => { e.currentTarget.style.background = `${PRIMARY}15`; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
            >
              <FileText className="w-4 h-4" />
              Resume
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 pt-6 w-full max-w-md" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            {[
              { to: 2, label: 'Years Learning' },
              { to: 5, label: 'Technologies' },
              { to: 3, label: 'Projects Built' },
            ].map(({ to, label }) => (
              <div key={label}>
                <div className="text-2xl font-heading font-bold text-white">
                  <Counter from={0} to={to} />+
                </div>
                <div className="text-xs font-mono" style={{ color: MUTED }}>{label}</div>
              </div>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6 mt-10">
            {[
              { href: 'https://github.com/sandesh1002', Icon: Github, label: 'GitHub' },
              { href: 'mailto:sandeshjadhavv1002@gmail.com', Icon: Mail, label: 'Email' },
              { href: 'https://linkedin.com', Icon: Linkedin, label: 'LinkedIn' },
            ].map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                aria-label={label}
                className="transition-all duration-200 hover:scale-110"
                style={{ color: MUTED }}
                onMouseEnter={(e) => { e.currentTarget.style.color = PRIMARY; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = MUTED; }}
              >
                <Icon className="w-6 h-6" />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Right — Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="relative lg:ml-auto flex justify-center lg:justify-end"
        >
          <div className="relative w-72 h-72 md:w-[420px] md:h-[420px] rounded-2xl overflow-hidden glass-panel glow-border p-2">
            <div className="absolute inset-0 z-10" style={{ background: `linear-gradient(135deg, ${PRIMARY}15, ${SECONDARY}15)` }} />
            <img
              src="/avatar.png"
              alt="Sandesh Jadhav"
              className="w-full h-full object-cover rounded-xl"
              style={{ filter: 'contrast(1.1)' }}
            />
          </div>

          {/* Floating MERN badge */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            className="absolute -bottom-4 -left-4 md:-left-8 glass-panel px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 z-20"
            style={{ border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg"
              style={{ background: `${PRIMARY}20`, color: PRIMARY }}>M</div>
            <div>
              <div className="text-white font-bold font-heading text-sm">MERN</div>
              <div className="text-xs font-mono" style={{ color: MUTED }}>Expertise</div>
            </div>
          </motion.div>

          {/* Floating location badge */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1 }}
            className="absolute -top-4 -right-4 md:-right-6 glass-panel px-5 py-3 rounded-xl shadow-2xl z-20"
            style={{ border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <div className="text-white font-bold font-heading text-sm">Pune, IN</div>
            <div className="text-xs font-mono" style={{ color: MUTED }}>Based</div>
          </motion.div>

          {/* Floating code snippet */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut', delay: 0.5 }}
            className="absolute -bottom-14 -right-2 md:-right-10 glass-panel p-4 rounded-lg shadow-2xl z-30 hidden sm:block"
            style={{ border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <pre className="text-xs font-mono leading-relaxed">
              <span style={{ color: SECONDARY }}>const</span>
              <span className="text-white"> dev</span>
              <span className="text-white"> = {'{'}</span>{'\n'}
              {'  '}<span style={{ color: MUTED }}>name:</span>
              <span style={{ color: PRIMARY }}> "Sandesh"</span>,{'\n'}
              {'  '}<span style={{ color: MUTED }}>stack:</span>
              <span className="text-white"> [</span>
              <span style={{ color: PRIMARY }}>"React"</span>
              <span className="text-white">, </span>
              <span style={{ color: PRIMARY }}>"Node"</span>
              <span className="text-white">],</span>{'\n'}
              {'  '}<span style={{ color: MUTED }}>status:</span>
              <span style={{ color: PRIMARY }}> "open_to_work"</span>{'\n'}
              <span className="text-white">{'}'}</span>;
            </pre>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40"
      >
        <span className="text-xs font-mono tracking-widest text-white rotate-90 mb-4">SCROLL</span>
        <div className="w-px h-16" style={{ background: `linear-gradient(to bottom, ${PRIMARY}, transparent)` }} />
      </motion.div>
    </section>
  );
}
