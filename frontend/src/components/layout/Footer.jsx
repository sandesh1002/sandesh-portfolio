export default function Footer() {
  return (
    <footer className="py-8 relative z-10 text-center" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <a
          href="https://github.com/sandesh1002"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono inline-block group transition-colors"
          style={{ color: 'hsl(215,20%,65%)' }}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'hsl(190,90%,50%)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'hsl(215,20%,65%)'; }}
        >
          <span className="block mb-1 text-sm">Designed &amp; Built by Sandesh Jadhav</span>
          <span className="text-xs opacity-50 group-hover:opacity-100 transition-opacity">
            {new Date().getFullYear()} &bull; MERN Stack Developer &bull; Pune, India
          </span>
        </a>
      </div>
    </footer>
  );
}
