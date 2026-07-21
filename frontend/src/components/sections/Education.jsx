import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin, Award } from 'lucide-react';

const PRIMARY = 'hsl(190,90%,50%)';
const SECONDARY = 'hsl(260,80%,65%)';
const MUTED = 'hsl(215,20%,65%)';

const coursework = ['Data Structures', 'Web Development', 'Database Management', 'Software Engineering', 'Computer Networks'];

export default function Education() {
  return (
    <section id="education" className="py-24 relative z-10" style={{ background: 'rgba(0,0,0,0.2)' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:w-2/3 mx-auto text-center"
        >
          <h2 className="text-sm font-mono mb-4 flex items-center justify-center gap-2" style={{ color: PRIMARY }}>
            <span className="w-8 h-px inline-block" style={{ background: PRIMARY }} />
            04. ACADEMICS
            <span className="w-8 h-px inline-block" style={{ background: PRIMARY }} />
          </h2>
          <h3 className="text-3xl md:text-5xl font-heading font-bold text-white">
            Education Timeline
          </h3>
        </motion.div>

        <div className="max-w-3xl mx-auto relative">
          {/* Vertical line */}
          <div className="absolute left-8 top-10 bottom-10 w-0.5 hidden md:block"
            style={{ background: `linear-gradient(to bottom, ${PRIMARY}, ${SECONDARY}, transparent)` }} />

          {/* BCS */}
          <div className="relative z-10 md:pl-20 mb-12">
            <div className="absolute left-[27px] top-6 w-3 h-3 rounded-full hidden md:block"
              style={{ background: PRIMARY, boxShadow: `0 0 10px ${PRIMARY}cc` }} />

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-panel p-8 md:p-10 rounded-2xl glow-border relative overflow-hidden"
              style={{ border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full pointer-events-none"
                style={{ background: `${PRIMARY}08`, filter: 'blur(50px)' }} />

              <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center mb-6 pb-6"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <div>
                  <h4 className="text-2xl font-heading font-bold text-white mb-2">
                    Bachelor of Computer Science (BCS)
                  </h4>
                  <p className="text-lg font-medium" style={{ color: `${PRIMARY}e0` }}>
                    Mamasaheb Mohol College, Pune
                  </p>
                  <p className="text-sm" style={{ color: MUTED }}>
                    Savitribai Phule Pune University
                  </p>
                </div>
                <div className="flex flex-col gap-3 shrink-0">
                  <div className="flex items-center gap-2 font-mono text-sm px-3 py-1.5 rounded-md"
                    style={{ background: 'rgba(255,255,255,0.05)', color: MUTED }}>
                    <Calendar className="w-4 h-4" style={{ color: PRIMARY }} />
                    2022 – 2025
                  </div>
                  <div className="flex items-center gap-2 font-mono text-sm px-3 py-1.5 rounded-md"
                    style={{ background: 'rgba(255,255,255,0.05)', color: MUTED }}>
                    <MapPin className="w-4 h-4" style={{ color: SECONDARY }} />
                    Pune, India
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 text-sm leading-relaxed mb-6" style={{ color: `${MUTED}cc` }}>
                <GraduationCap className="w-6 h-6 shrink-0 mt-1" style={{ color: 'rgba(255,255,255,0.2)' }} />
                <p>
                  Focusing on core computer science fundamentals, algorithms, and software engineering principles.
                  Actively applying academic concepts to real-world full-stack development projects.
                </p>
              </div>

              <div className="pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <p className="text-sm font-mono mb-3" style={{ color: PRIMARY }}>Key Coursework:</p>
                <div className="flex flex-wrap gap-2">
                  {coursework.map((subject) => (
                    <span key={subject}
                      className="px-3 py-1 rounded-md text-xs font-mono"
                      style={{ background: 'rgba(255,255,255,0.05)', color: MUTED, border: '1px solid rgba(255,255,255,0.05)' }}>
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* HSC */}
          <div className="relative z-10 md:pl-20">
            <div className="absolute left-[27px] top-6 w-3 h-3 rounded-full hidden md:block"
              style={{ background: SECONDARY, boxShadow: `0 0 10px ${SECONDARY}cc` }} />

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass-panel p-6 md:p-8 rounded-2xl relative overflow-hidden"
              style={{ border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
                <div>
                  <h4 className="text-xl font-heading font-bold text-white mb-2">
                    Higher Secondary Certificate (HSC)
                  </h4>
                  <p className="text-md font-medium" style={{ color: `${SECONDARY}e0` }}>
                    Science Stream
                  </p>
                </div>
                <div className="flex items-center gap-2 font-mono text-sm px-3 py-1.5 rounded-md shrink-0"
                  style={{ background: 'rgba(255,255,255,0.05)', color: MUTED }}>
                  <Calendar className="w-4 h-4" style={{ color: PRIMARY }} />
                  2020 – 2022
                </div>
              </div>

              <div className="flex items-start gap-4 text-sm leading-relaxed mt-4 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', color: `${MUTED}cc` }}>
                <Award className="w-5 h-5 shrink-0 mt-0.5" style={{ color: 'rgba(255,255,255,0.2)' }} />
                <p>
                  Completed high school with a strong focus on Mathematics and Physics, establishing
                  the analytical foundation for a degree in Computer Science.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
