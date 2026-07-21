import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Github, Send, CheckCircle } from 'lucide-react';

const PRIMARY = 'hsl(190,90%,50%)';
const SECONDARY = 'hsl(260,80%,65%)';
const MUTED = 'hsl(215,20%,65%)';

const inputStyle = {
  width: '100%',
  background: 'rgba(0,0,0,0.2)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '6px',
  padding: '12px 16px',
  color: 'white',
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  outline: 'none',
  transition: 'border-color 0.2s',
};

function Input({ ...props }) {
  return (
    <input
      {...props}
      style={inputStyle}
      onFocus={(e) => { e.target.style.borderColor = PRIMARY; }}
      onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; }}
    />
  );
}

function Textarea({ ...props }) {
  return (
    <textarea
      {...props}
      style={{ ...inputStyle, resize: 'none' }}
      onFocus={(e) => { e.target.style.borderColor = PRIMARY; }}
      onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; }}
    />
  );
}

const contactLinks = [
  {
    href: 'mailto:sandeshjadhavv1002@gmail.com',
    Icon: Mail,
    color: PRIMARY,
    label: 'Email',
    value: 'sandeshjadhavv1002@gmail.com',
  },
  {
    href: 'tel:+919322562406',
    Icon: Phone,
    color: SECONDARY,
    label: 'Phone',
    value: '+91 9322562406',
  },
  {
    href: 'https://github.com/sandesh1002',
    Icon: Github,
    color: 'white',
    label: 'GitHub',
    value: '@sandesh1002',
    external: true,
  },
];

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function Contact() {
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    };

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Failed to send');

      setStatus('sent');
      e.target.reset();
      setTimeout(() => setStatus('idle'), 4000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <section id="contact" className="py-32 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <h2 className="text-sm font-mono mb-4 flex items-center justify-center gap-2" style={{ color: PRIMARY }}>
            <span className="w-8 h-px inline-block" style={{ background: PRIMARY }} />
            05. WHAT'S NEXT?
            <span className="w-8 h-px inline-block" style={{ background: PRIMARY }} />
          </h2>
          <h3 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">
            Get In Touch
          </h3>
          <p className="text-lg mb-10" style={{ color: MUTED }}>
            I'm currently looking for new opportunities as a Full Stack Developer.
            Whether you have a question, a project idea, or just want to say hi — I'll get back to you!
          </p>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="glass-panel p-8 rounded-2xl max-w-xl mx-auto mb-20 space-y-5 relative"
          style={{ border: '1px solid rgba(255,255,255,0.1)' }}
        >
          <div className="grid md:grid-cols-2 gap-5">
            <div className="space-y-2 text-left">
              <label className="text-sm font-mono block" style={{ color: MUTED }}>Name</label>
              <Input name="name" required placeholder="Sandesh Jadhav" />
            </div>
            <div className="space-y-2 text-left">
              <label className="text-sm font-mono block" style={{ color: MUTED }}>Email</label>
              <Input type="email" name="email" required placeholder="you@example.com" />
            </div>
          </div>
          <div className="space-y-2 text-left">
            <label className="text-sm font-mono block" style={{ color: MUTED }}>Message</label>
            <Textarea name="message" required rows={4} placeholder="Hi Sandesh, I'd like to talk about..." />
          </div>

          <button
            type="submit"
            disabled={status !== 'idle'}
            className="w-full h-12 rounded-md font-medium text-sm flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
            style={{ background: PRIMARY, color: 'hsl(222,47%,11%)' }}
          >
            {status === 'idle' && <><Send className="w-4 h-4" /> Send Message</>}
            {status === 'sending' && 'Sending...'}
            {status === 'sent' && <><CheckCircle className="w-4 h-4" /> Message Sent!</>}
            {status === 'error' && 'Failed — try again'}
          </button>
        </motion.form>

        {/* Contact cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {contactLinks.map(({ href, Icon, color, label, value, external }) => (
            <a
              key={label}
              href={href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              className="group"
            >
              <div className="glass-panel p-6 rounded-2xl flex flex-col items-center justify-center text-center gap-4 h-full transition-colors duration-200"
                style={{ border: '1px solid rgba(255,255,255,0.05)' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = ''; }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 duration-200"
                  style={{ background: `${color}18` }}>
                  <Icon className="w-6 h-6" style={{ color }} />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">{label}</h4>
                  <p className="text-sm font-mono" style={{ color: MUTED }}>{value}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
