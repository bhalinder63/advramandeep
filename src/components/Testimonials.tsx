import { motion } from 'motion/react';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    initials: 'AK',
    name: 'A. Kumar',
    matter: 'Anticipatory Bail Matter',
    quote:
      'Advocate Ramandeep Singh handled my anticipatory bail matter with exceptional speed and skill. In a situation where every hour mattered, he delivered results. I cannot recommend him highly enough.',
  },
  {
    initials: 'RS',
    name: 'R. Sharma',
    matter: 'PMLA — ED Matter',
    quote:
      'When our company faced an ED notice under PMLA, we were completely lost. Advocate Singh\'s clarity, strategy, and courtroom presence gave us confidence and ultimately the right outcome.',
  },
  {
    initials: 'PM',
    name: 'P. Mehta',
    matter: 'Criminal Defense — Sessions Court',
    quote:
      'Highly professional, deeply knowledgeable, and always available when needed. He explained every step of the process and never left us in the dark. Outstanding advocate.',
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-navy text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            className="font-mono text-xs text-gold uppercase tracking-widest mb-3 font-semibold"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Client Testimonials
          </motion.div>
          <motion.h2
            className="font-serif text-3xl md:text-4xl font-bold tracking-tight"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Trusted by Clients Across India
          </motion.h2>
          <motion.p
            className="mt-3 font-sans text-sm text-white/50 tracking-wide"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Every case matters. Every client deserves the best defense.
          </motion.p>
          <motion.div
            className="mt-5 mx-auto w-16 h-px bg-gold"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
          />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.name}
              className="group relative border border-white/10 hover:border-gold/40 bg-white/5 hover:bg-white/8 p-8 transition-all duration-300"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + idx * 0.12 }}
            >
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-gold/20 group-hover:border-gold transition-colors duration-300" />

              {/* Quote icon */}
              <Quote className="w-7 h-7 text-gold/40 mb-5 group-hover:text-gold/70 transition-colors duration-300" />

              {/* Quote text */}
              <p className="font-sans text-sm text-white/70 leading-relaxed mb-8 italic">
                "{t.quote}"
              </p>

              {/* Divider */}
              <div className="h-px w-10 bg-gold/30 mb-5" />

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full border border-gold/40 bg-gold/10 flex items-center justify-center shrink-0">
                  <span className="font-mono text-[11px] font-bold text-gold">{t.initials}</span>
                </div>
                <div>
                  <p className="font-serif text-sm font-bold text-white">{t.name}</p>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-gold/70 mt-0.5">{t.matter}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
