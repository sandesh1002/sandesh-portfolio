import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { Menu, X, Terminal } from 'lucide-react';

const navLinks = [
  { name: 'About', href: '#about', id: 'about' },
  { name: 'Skills', href: '#skills', id: 'skills' },
  { name: 'Projects', href: '#projects', id: 'projects' },
  { name: 'Education', href: '#education', id: 'education' },
  { name: 'Contact', href: '#contact', id: 'contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = ['about', 'skills', 'projects', 'education', 'contact'];
      let current = '';
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) current = section;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 768) setMobileMenuOpen(false); };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-50 origin-left"
        style={{
          scaleX,
          background: 'linear-gradient(90deg, hsl(190,90%,50%), hsl(260,80%,65%))',
        }}
      />

      <header
        className={`fixed top-[2px] w-full z-40 transition-all duration-300 ${
          isScrolled ? 'glass-panel py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2 text-xl font-heading font-bold text-white group"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          >
            <Terminal className="text-primary w-6 h-6 transition-transform group-hover:scale-110" style={{ color: 'hsl(190,90%,50%)' }} />
            <span>Sandesh<span style={{ color: 'hsl(190,90%,50%)' }}>.dev</span></span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-6">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <li key={link.name} className="relative">
                    <a
                      href={link.href}
                      className="text-sm font-mono transition-colors"
                      style={{ color: isActive ? 'hsl(190,90%,50%)' : 'hsl(215,20%,65%)' }}
                      onMouseEnter={(e) => { if (!isActive) e.target.style.color = 'hsl(190,90%,50%)'; }}
                      onMouseLeave={(e) => { if (!isActive) e.target.style.color = 'hsl(215,20%,65%)'; }}
                    >
                      <span style={{ color: 'rgba(0,240,255,0.5)', marginRight: '4px' }}>&gt;</span>
                      {link.name}
                    </a>
                    {isActive && (
                      <motion.div
                        layoutId="nav-underline"
                        className="absolute -bottom-1 left-0 right-0 h-px"
                        style={{ background: 'hsl(190,90%,50%)' }}
                        initial={false}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </li>
                );
              })}
            </ul>
            <a
              href="#contact"
              className="px-4 py-2 rounded-md text-sm font-mono border transition-all duration-200 hover:scale-105"
              style={{
                borderColor: 'hsl(190,90%,50%)',
                color: 'hsl(190,90%,50%)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(0,240,255,0.1)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
            >
              Get in Touch
            </a>
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden transition-colors"
            style={{ color: 'hsl(215,20%,65%)' }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 w-full glass-panel border-t py-4 px-6 md:hidden flex flex-col gap-2 shadow-xl"
              style={{ borderColor: 'rgba(255,255,255,0.05)' }}
            >
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-base font-mono py-2 transition-colors block"
                    style={{ color: isActive ? 'hsl(190,90%,50%)' : 'hsl(215,20%,65%)' }}
                  >
                    <span style={{ color: 'rgba(0,240,255,0.5)', marginRight: '8px' }}>&gt;</span>
                    {link.name}
                  </a>
                );
              })}
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 w-full text-center px-4 py-2.5 rounded-md text-sm font-mono border block"
                style={{ borderColor: 'hsl(190,90%,50%)', color: 'hsl(190,90%,50%)' }}
              >
                Get in Touch
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
