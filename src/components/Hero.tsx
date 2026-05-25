import { motion } from 'motion/react';
import { Trophy, ArrowRight } from 'lucide-react';

interface HeroProps {
  onOpenBookings: () => void;
  onOpenSuccesses: () => void;
}

const stats = [
  { value: '500+', label: 'Cases Handled' },
  { value: '15+', label: 'Years Experience' },
  { value: 'Pan India', label: 'Practice' },
];

export default function Hero({ onOpenBookings }: HeroProps) {
  const scrollToPractice = () => {
    const el = document.getElementById('practice-expertise');
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[85vh] flex items-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-offwhite overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(4,22,50,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(4,22,50,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">

        {/* Left content */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left">

          <motion.div
            className="inline-block self-start px-4 py-1.5 border border-gold mb-6 bg-gold/5"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-mono text-xs font-bold text-gold tracking-[0.2em] uppercase">
              Advocate | Criminal &amp; PMLA Specialist
            </span>
          </motion.div>

          <motion.h1
            className="font-serif text-4xl md:text-5xl lg:text-[56px] leading-[1.08] mb-3 text-navy font-bold tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Ramandeep Singh
          </motion.h1>

          <motion.p
            className="font-mono text-sm md:text-base text-gold font-semibold tracking-wider uppercase mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            Criminal Defense &amp; PMLA Specialist
          </motion.p>

          <motion.p
            className="font-sans text-base md:text-lg text-gray-dark max-w-2xl mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="font-semibold text-navy">When the Stakes Are High, You Need a Lawyer Who Wins.</span>{' '}
            Advocate Ramandeep Singh brings years of courtroom experience in criminal defense and anti-money laundering cases across India's courts.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <button
              onClick={onOpenBookings}
              className="bg-navy hover:bg-gold text-white px-8 py-4 font-mono text-xs font-bold tracking-widest hover:shadow-lg transition-all duration-300 uppercase"
              id="cta-book-confidential"
            >
              Book a Consultation
            </button>
            <button
              onClick={scrollToPractice}
              className="border-2 border-navy text-navy hover:bg-navy hover:text-white px-8 py-4 font-mono text-xs font-bold tracking-widest transition-all duration-300 uppercase flex items-center gap-2 justify-center"
            >
              View Practice Areas <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            className="flex flex-wrap gap-10 border-t border-outline-variant/20 pt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
          >
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-serif text-2xl md:text-3xl font-bold text-navy">{s.value}</div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-gold font-semibold mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right portrait */}
        <motion.div
          className="lg:col-span-5 relative mt-6 lg:mt-0"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          <div className="aspect-[4/5] bg-surface-high relative overflow-hidden shadow-2xl border border-gold/10 group">
            <img
              alt="Advocate Ramandeep Singh"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover grayscale contrast-125 transition-transform duration-700 group-hover:scale-102"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAevOvRXgX8v90cpE6mJNrZthzOIqL8sKgbKdbyYg05W-rYbiUFJhOzDOJYG-rSM6v6yxYO62puIW_TZwylCsc6Vz58h3RozWiIkJWFR6xx-tQyc00y6Cz_Ga6VQ_J_QozcGItl_sUyzvyYxWKO5G3VixR6PpAgELQ-s6gz5Py8V1vwbEE6gnwyteCwrfO4Y60mF5Tx0WaL6_4gG42A8KKvyM2FQwAdzVmb5D1pKmfOhYMv6n5ioJs_WLtjqXlFr9NoEq-l93DIO8TA"
            />
          </div>
          <motion.div
            className="absolute -bottom-6 -left-6 bg-gold text-white p-6 shadow-xl border border-gold/30"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <div className="flex items-center gap-3">
              <Trophy className="w-8 h-8 text-white/90 shrink-0" />
              <div>
                <div className="font-serif text-3xl md:text-4xl leading-none font-bold">15+</div>
                <div className="font-mono text-[10px] md:text-xs uppercase tracking-widest mt-1 text-white/80">
                  Years of Excellence
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
