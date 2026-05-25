import { useState, useEffect } from 'react';
import { Menu, X, Shield, Landmark } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  onOpenBookings: () => void;
  onOpenAdmin: () => void;
  adminCount: number;
}

export default function Header({ onOpenBookings, onOpenAdmin, adminCount }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of fixed header
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
    <>
      <header
        className={`fixed top-0 w-full z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-offwhite/95 backdrop-blur-md shadow-lg border-b border-outline-variant/10 py-3'
            : 'bg-offwhite/90 backdrop-blur-sm border-b border-outline-variant/10 py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          {/* Logo */}
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="cursor-pointer flex items-center gap-2 group"
          >
            <Landmark className="w-5 h-5 text-gold group-hover:scale-110 transition-transform duration-300" />
            <span className="font-serif text-lg md:text-xl font-bold tracking-wider text-navy hover:text-gold transition-colors">
              RAMANDEEP SINGH
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            <button
              onClick={() => scrollToSection('practice-expertise')}
              className="font-mono text-xs font-semibold uppercase tracking-wider text-navy hover:text-gold transition-colors py-1 relative group"
            >
              Practice Areas
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold group-hover:w-full transition-all duration-300" />
            </button>
            <button
              onClick={() => scrollToSection('pillars-advocacy')}
              className="font-mono text-xs font-semibold uppercase tracking-wider text-navy hover:text-gold transition-colors py-1 relative group"
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold group-hover:w-full transition-all duration-300" />
            </button>
            <button
              onClick={() => scrollToSection('legal-insights')}
              className="font-mono text-xs font-semibold uppercase tracking-wider text-navy hover:text-gold transition-colors py-1 relative group"
            >
              Legal Insights
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold group-hover:w-full transition-all duration-300" />
            </button>
          </nav>

          {/* User Utilities & Call to Action */}
          <div className="flex items-center space-x-3">
            {/* Private Portal access with pending requests indicator */}
            <button
              onClick={onOpenAdmin}
              className="p-2 text-navy hover:text-gold hover:bg-gold/10 relative transition-all rounded-full group"
              title="Confidential Officer Panel"
              id="admin-dashboard-btn"
            >
              <Shield className="w-5 h-5" />
              {adminCount > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4.5 h-4.5 bg-gold text-white font-mono text-[9px] font-bold flex items-center justify-center rounded-full animate-pulse border border-white">
                  {adminCount}
                </span>
              )}
            </button>

            <button
              onClick={() => scrollToSection('contact-cta')}
              className="hidden lg:block font-mono text-xs font-semibold uppercase tracking-widest text-[#44474d] hover:text-gold transition-colors px-4 py-2"
            >
              CONTACT
            </button>

            <button
              onClick={onOpenBookings}
              className="bg-navy hover:bg-gold text-white font-mono text-xs font-semibold px-5 py-2.5 tracking-widest transition-all duration-300 uppercase border border-navy hover:border-gold shadow-sm hover:shadow-md"
            >
              BOOK CONSULTATION
            </button>

            {/* Mobile Hamburger menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-navy hover:text-gold"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Draver */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-x-0 top-[60px] bg-navy text-white z-30 shadow-2xl md:hidden border-b border-gold/30"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="px-6 py-8 space-y-6 flex flex-col items-center text-center">
              <button
                onClick={() => scrollToSection('practice-expertise')}
                className="font-serif text-lg font-bold tracking-wide hover:text-gold transition-colors"
              >
                Practice Areas
              </button>
              <button
                onClick={() => scrollToSection('pillars-advocacy')}
                className="font-serif text-lg font-bold tracking-wide hover:text-gold transition-colors"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('legal-insights')}
                className="font-serif text-lg font-bold tracking-wide hover:text-gold transition-colors"
              >
                Legal Insights
              </button>
              <div className="h-px w-24 bg-gold/20 my-2" />
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="text-xs font-mono font-semibold tracking-widest text-gold hover:text-white transition-all flex items-center gap-1.5"
              >
                <Shield className="w-4 h-4" /> PRIVILEGED LOGIN
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
