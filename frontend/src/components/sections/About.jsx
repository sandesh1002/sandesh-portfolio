import { motion } from 'framer-motion';
import { Terminal, Code2, Database } from 'lucide-react';

const PRIMARY = 'hsl(190,90%,50%)';
const SECONDARY = 'hsl(260,80%,65%)';
const MUTED = 'hsl(215,20%,65%)';

const cards = [
  {
    Icon: Terminal,
    color: PRIMARY,
    title: 'Frontend Development',
    desc: 'Crafting immersive, responsive, and accessible user interfaces using React.js, Tailwind CSS, and modern web standards.',
  },
  {
    Icon: Database,
    color: SECONDARY,
    title: 'Backend Architecture',
    desc: 'Designing secure, scalable server-side applications and RESTful APIs with Node.js and Express.',
  },
  {
    Icon: Code2,
    color: '#ffffff',
    title: 'Database Management',
    desc: 'Modeling and managing complex data structures efficiently using MongoDB and SQL databases.',
  },
];

const softSkills = ['Problem Solving', 'Team Collaboration', 'Communication', 'Quick Learning', 'Time Management', 'Adaptability'];

export default function About() {
  return (
    <section id="about" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:w-2/3"
        >
          <h2 className="text-sm font-mono mb-4 flex items-center gap-2" style={{ color: PRIMARY }}>
            <span className="w-8 h-px inline-block" style={{ background: PRIMARY }} />
            01. ABOUT ME
          </h2>
          <h3 className="text-3xl md:text-5xl font-heading font-bold text-white mb-8">
            Building the architecture of tomorrow.
          </h3>
          <div className="text-lg space-y-6 leading-relaxed" style={{ color: `${MUTED}cc` }}>
            <p>
              I am a motivated Full Stack Web Developer with deep knowledge of the MERN Stack.
              My journey into software development is driven by a genuine passion for building
              systems that are not only functional but architecturally sound and visually compelling.
            </p>
            <p>
              Operating out of Pune, India, I specialize in bridging the gap between robust backend
              infrastructure and seamless, modern frontend interfaces. Whether it's designing secure
              REST APIs or crafting responsive UI with React and Tailwind CSS, I approach every
              problem with a solution-oriented mindset.
            </p>
          </div>
        </motion.div>

        {/* Capability cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          {cards.map(({ Icon, color, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-panel p-8 rounded-2xl glow-border group"
            >
              <div className="mb-6 p-4 rounded-xl inline-block transition-transform group-hover:scale-110 duration-300"
                style={{ background: 'rgba(255,255,255,0.05)' }}>
                <Icon className="w-8 h-8" style={{ color }} />
              </div>
              <h4 className="text-xl font-heading font-semibold text-white mb-3">{title}</h4>
              <p className="leading-relaxed text-sm" style={{ color: MUTED }}>{desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Soft skills */}
        <div className="mt-20">
          <h4 className="text-xl font-heading font-semibold text-white mb-6 text-center md:text-left">
            Soft Skills
          </h4>
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            {softSkills.map((skill, i) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="px-4 py-2 rounded-full glass-panel font-mono text-sm transition-colors cursor-default"
                style={{ color: PRIMARY, border: '1px solid rgba(255,255,255,0.1)' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${PRIMARY}60`; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
