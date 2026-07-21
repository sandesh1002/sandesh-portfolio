import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Code } from 'lucide-react';

const PRIMARY = 'hsl(190,90%,50%)';
const SECONDARY = 'hsl(260,80%,65%)';
const MUTED = 'hsl(215,20%,65%)';

const projects = [
  {
    title: 'Online Voting System',
    description:
      'A secure, end-to-end online voting platform featuring user authentication, robust database integration, and real-time election management. Built with a focus on data integrity and intuitive user experience.',
    stack: ['MongoDB', 'Express.js', 'React.js', 'Node.js'],
    image: '/project-voting.png',
    links: {
      github: 'https://github.com/sandesh1002',
      live: '#',
    },
  },
  {
    title: 'Streaming & E-Commerce Clones',
    description:
      'High-fidelity frontend clones of Netflix, Amazon, and YouTube. These projects showcase pixel-perfect responsive design, modern layout techniques using Flexbox/Grid, and complex UI state management without relying on heavy frameworks.',
    stack: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
    image: '/project-clones.png',
    links: {
      github: 'https://github.com/sandesh1002',
      live: '#',
    },
  },
];

function ProjectCard({ project, idx }) {
  const cardRef = useRef(null);
  const [tiltStyle, setTiltStyle] = useState({});

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const tiltX = ((y - rect.height / 2) / (rect.height / 2)) * -8;
    const tiltY = ((x - rect.width / 2) / (rect.width / 2)) * 8;
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: 'none',
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.5s ease',
    });
  };

  const isReversed = idx % 2 !== 0;

  return (
    <div className={`flex flex-col lg:flex-row gap-8 lg:gap-16 items-center ${isReversed ? 'lg:flex-row-reverse' : ''}`}>

      {/* Image */}
      <motion.div
        initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="w-full lg:w-3/5 relative group cursor-pointer"
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={tiltStyle}
      >
        {/* Color overlay */}
        <div className="absolute inset-0 rounded-xl transition-all duration-500 group-hover:opacity-0 z-10"
          style={{ background: `${PRIMARY}33`, mixBlendMode: 'multiply' }} />

        {/* Hover overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-center justify-center rounded-xl pointer-events-none"
          style={{ background: 'rgba(0,0,0,0.6)' }}>
          <span className="flex items-center gap-2 text-white font-mono text-sm px-4 py-2 rounded-full backdrop-blur-md"
            style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
            <ExternalLink className="w-4 h-4" /> View Project
          </span>
        </div>

        <div className="relative rounded-xl overflow-hidden glass-panel glow-border p-2"
          style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-auto object-cover rounded-lg aspect-video"
            style={{ filter: 'contrast(1.1)' }}
          />
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className={`w-full lg:w-2/5 flex flex-col ${isReversed ? 'lg:items-start' : 'lg:items-end'}`}
      >
        <div className="flex items-center gap-2 font-mono text-sm mb-2" style={{ color: PRIMARY }}>
          <Code className="w-4 h-4" />
          <span>Featured Project</span>
        </div>

        <h4 className="text-2xl md:text-3xl font-heading font-bold text-white mb-6">
          {project.title}
        </h4>

        <div className="glass-panel p-6 rounded-xl relative z-20 mb-6 w-full lg:w-[120%] shadow-2xl"
          style={{ border: '1px solid rgba(255,255,255,0.05)' }}>
          <p className="leading-relaxed text-sm md:text-base" style={{ color: MUTED }}>
            {project.description}
          </p>
        </div>

        <ul className={`flex flex-wrap gap-4 font-mono text-xs mb-8 ${isReversed ? 'justify-start' : 'lg:justify-end'}`}
          style={{ color: `${MUTED}cc` }}>
          {project.stack.map((tech) => (
            <li key={tech}
              className="px-2 py-1 rounded"
              style={{ background: `${PRIMARY}15`, color: PRIMARY }}>
              {tech}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-6">
          <a href={project.links.github} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 group transition-colors"
            style={{ color: 'white' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = PRIMARY; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'white'; }}>
            <Github className="w-5 h-5" />
            <span className="text-sm font-mono opacity-0 group-hover:opacity-100 transition-opacity">Code</span>
          </a>
          <a href={project.links.live} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 group transition-colors"
            style={{ color: 'white' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = PRIMARY; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'white'; }}>
            <ExternalLink className="w-5 h-5" />
            <span className="text-sm font-mono opacity-0 group-hover:opacity-100 transition-opacity">Live</span>
          </a>
        </div>
      </motion.div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-32 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <h2 className="text-sm font-mono mb-4 flex items-center gap-2" style={{ color: PRIMARY }}>
            <span className="w-8 h-px inline-block" style={{ background: PRIMARY }} />
            03. FEATURED WORK
          </h2>
          <h3 className="text-3xl md:text-5xl font-heading font-bold text-white">
            Things I've built.
          </h3>
        </motion.div>

        <div className="space-y-32">
          {projects.map((project, idx) => (
            <ProjectCard key={project.title} project={project} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
