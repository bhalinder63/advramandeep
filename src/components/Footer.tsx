import { Link, Mail, Globe, ExternalLink } from 'lucide-react';
import { MouseEvent } from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = (e: MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="w-full bg-navy text-white pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-t border-gold/20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 text-left">
        
        {/* Profile Info */}
        <div className="md:col-span-4 space-y-6">
          <div className="font-serif text-xl md:text-2xl font-bold tracking-wider text-gold">
            RAMANDEEP SINGH
          </div>
          <p className="font-sans text-xs md:text-sm text-white/70 max-w-xs leading-relaxed">
            Leading Advocate specializing in high-profile criminal defense and PMLA matters across India. Committed to strategic legal protection under strict confidentiality.
          </p>
          <div className="flex gap-4">
            <a 
              href="https://highcourtchambers.org" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white/60 hover:text-gold transition-colors p-1.5 bg-white/5 rounded-full"
            >
              <Globe className="w-4 h-4" />
            </a>
            <a 
              href="mailto:chambers.ramandeepsingh@outlook.com" 
              className="text-white/60 hover:text-gold transition-colors p-1.5 bg-white/5 rounded-full"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Navigation links */}
        <div className="md:col-span-2 space-y-4">
          <h5 className="font-mono text-xs font-bold text-white uppercase tracking-widest border-b border-gold/20 pb-2">
            Navigation
          </h5>
          <ul className="space-y-2.5 font-sans text-xs md:text-sm text-white/60">
            <li>
              <a href="#" onClick={handleScrollToTop} className="hover:text-gold hover:translate-x-1 transition-all block">
                Home
              </a>
            </li>
            <li>
              <button onClick={() => handleScrollToSection('practice-expertise')} className="hover:text-gold hover:translate-x-1 transition-all text-left block">
                Practice Areas
              </button>
            </li>
            <li>
              <button onClick={() => handleScrollToSection('pillars-advocacy')} className="hover:text-gold hover:translate-x-1 transition-all text-left block">
                About
              </button>
            </li>
            <li>
              <button onClick={() => handleScrollToSection('legal-insights')} className="hover:text-gold hover:translate-x-1 transition-all text-left block">
                Insights
              </button>
            </li>
          </ul>
        </div>

        {/* Legal matters Links */}
        <div className="md:col-span-2 space-y-4">
          <h5 className="font-mono text-xs font-bold text-white uppercase tracking-widest border-b border-gold/20 pb-2">
            Legal
          </h5>
          <ul className="space-y-2.5 font-sans text-xs md:text-sm text-white/60">
            <li>
              <a href="#privacy" onClick={(e) => { e.preventDefault(); alert('Privacy policy is securely held under counsel archives.'); }} className="hover:text-gold transition-all block">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#disclaimer" onClick={(e) => { e.preventDefault(); alert('Attorney Advertising - General awareness briefs as per Bar Council criteria.'); }} className="hover:text-gold transition-all block">
                Legal Disclaimer
              </a>
            </li>
            <li>
              <a href="#terms" onClick={(e) => { e.preventDefault(); alert('Terms of Service of consultation apply.'); }} className="hover:text-gold transition-all block">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>

        {/* Physical Office chambers */}
        <div className="md:col-span-4 space-y-4">
          <h5 className="font-mono text-xs font-bold text-gold uppercase tracking-widest border-b border-gold/20 pb-2">
            Offices
          </h5>
          <div className="space-y-4 font-sans text-xs md:text-sm text-white/70">
            <div>
              <p className="font-bold text-white mb-1">New Delhi</p>
              <p className="text-white/60 leading-relaxed">High Court Chambers, Sher Shah Suri Marg</p>
            </div>
            <div>
              <p className="font-bold text-white mb-1">Mumbai</p>
              <p className="text-white/60 leading-relaxed font-sans">Nariman Point, Chambers at Marine Drive</p>
            </div>
          </div>
        </div>

        {/* Copyright board */}
        <div className="md:col-span-12 mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-mono text-[9px] md:text-[11px] text-white/50 text-center md:text-left">
            © {currentYear} RAMANDEEP SINGH. ALL RIGHTS RESERVED. ATTORNEY ADVERTISING.
          </div>
          <div className="flex gap-6 font-mono text-[10px] text-white/50">
            <a 
              href="#privacy" 
              onClick={(e) => { e.preventDefault(); alert('Privacy policy details'); }} 
              className="hover:text-gold transition-all"
            >
              Privacy Policy
            </a>
            <a 
              href="#disclaimer" 
              onClick={(e) => { e.preventDefault(); alert('As per the rules of the Bar Council of India, we are not permitted to solicit work or advertise.'); }} 
              className="hover:text-gold transition-all"
            >
              Legal Disclaimer
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
