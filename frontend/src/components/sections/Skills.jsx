import { motion } from 'framer-motion';

const PRIMARY = 'hsl(190,90%,50%)';
const SECONDARY = 'hsl(260,80%,65%)';
const MUTED = 'hsl(215,20%,65%)';

const skills = [
  {
    category: 'Frontend',
    emoji: '🎨',
    items: [
      { name: 'React.js', level: 85 },
      { name: 'JavaScript (ES6+)', level: 88 },
      { name: 'HTML5', level: 95 },
      { name: 'CSS3', level: 92 },
      { name: 'Tailwind CSS', level: 85 },
    ],
  },
  {
    category: 'Backend',
    emoji: '⚙️',
    items: [
      { name: 'Node.js', level: 80 },
      { name: 'Express.js', level: 78 },
      { name: 'REST APIs', level: 82 },
    ],
  },
  {
    category: 'Database & Tools',
    emoji: '🗄️',
    items: [
      { name: 'MongoDB', level: 75 },
      { name: 'SQL', level: 70 },
      { name: 'Git / GitHub', level: 88 },
    ],
  },
  {
    category: 'Other',
    emoji: '🔧',
    items: [
      { name: 'VS Code', level: 95 },
      { name: 'Power BI', level: 60 },
    ],
  },
];

// Tech icon badges — purely decorative labels
const techBadges = ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Tailwind CSS', 'Git', 'REST API', 'JavaScript'];

export default function Skills() {
  return (
    <section id="skills" className="py-24 relative z-10" style={{ background: 'rgba(0,0,0,0.2)' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-sm font-mono mb-4 flex items-center gap-2" style={{ color: PRIMARY }}>
            <span className="w-8 h-px inline-block" style={{ background: PRIMARY }} />
            02. TECHNICAL ARSENAL
          </h2>
          <h3 className="text-3xl md:text-5xl font-heading font-bold text-white">
            Tools of the trade.
          </h3>
        </motion.div>

        {/* Tech badges row */}
        <div className="flex flex-wrap gap-3 mb-12">
          {techBadges.map((badge, i) => (
            <motion.span
              key={badge}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="px-3 py-1.5 rounded-md text-xs font-mono font-medium"
              style={{ background: `${PRIMARY}15`, color: PRIMARY, border: `1px solid ${PRIMARY}30` }}
            >
              {badge}
            </motion.span>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((group, idx) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-panel p-6 rounded-2xl transition-colors duration-300"
              style={{ border: '1px solid rgba(255,255,255,0.05)' }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${PRIMARY}40`; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; }}
            >
              <h4 className="text-lg font-heading font-semibold text-white mb-6 pb-4 flex items-center gap-2"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <span>{group.emoji}</span> {group.category}
              </h4>
              <ul className="space-y-5">
                {group.items.map((skill, i) => (
                  <li key={skill.name} className="group">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-mono text-sm transition-colors group-hover:text-white" style={{ color: MUTED }}>
                        {skill.name}
                      </span>
                      <span className="font-mono text-xs opacity-80" style={{ color: PRIMARY }}>
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: i * 0.05, ease: 'easeOut' }}
                        className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg, ${PRIMARY}, ${SECONDARY})` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
