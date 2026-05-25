import { motion } from 'motion/react';
import { Scale, Zap, MapPin, Lock } from 'lucide-react';

const reasons = [
  {
    icon: <Scale className="w-6 h-6 text-gold" />,
    title: 'Experience That Speaks in Court',
    subtitle: 'Deep PMLA Expertise',
    description:
      'One of the few advocates in India with dedicated specialization in Prevention of Money Laundering Act cases — from ED summons to High Court appeals.',
  },
  {
    icon: <Zap className="w-6 h-6 text-gold" />,
    title: 'Urgent Matter Response',
    subtitle: 'Available When It Matters',
    description:
      'We understand that legal emergencies do not wait. Consultation available for urgent bail matters, ED raids, and arrest situations with fast response.',
  },
  {
    icon: <MapPin className="w-6 h-6 text-gold" />,
    title: 'Pan India Practice',
    subtitle: 'Nationwide Jurisdiction',
    description:
      'Appearing before District Courts, Sessions Courts, High Courts, and the Supreme Court of India across multiple jurisdictions.',
  },
  {
    icon: <Lock className="w-6 h-6 text-gold" />,
    title: 'Complete Confidentiality',
    subtitle: 'Absolute Discretion',
    description:
      'Every matter is handled with absolute discretion. Your case details and communications remain strictly confidential at all times.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-offwhite overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            className="font-mono text-xs text-gold uppercase tracking-widest mb-3 font-semibold"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Our Distinction
          </motion.div>
          <motion.h2
            className="font-serif text-3xl md:text-4xl font-bold text-navy tracking-tight"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Why Choose Us
          </motion.h2>
          <motion.div
            className="mt-4 mx-auto w-16 h-px bg-gold"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          />
        </div>

        {/* 2×2 Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {reasons.map((item, idx) => (
            <motion.div
              key={item.title}
              className="group border border-outline-variant/20 bg-white p-8 hover:border-gold/40 hover:shadow-lg transition-all duration-300 relative"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + idx * 0.1 }}
            >
              {/* Decorative corner accent */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-gold/30 group-hover:border-gold transition-colors duration-300" />

              <div className="flex items-start gap-5">
                <div className="shrink-0 w-12 h-12 border border-gold/30 group-hover:border-gold/60 flex items-center justify-center transition-colors duration-300 bg-gold/5">
                  {item.icon}
                </div>

                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-gold font-semibold mb-1">
                    {item.subtitle}
                  </p>
                  <h3 className="font-serif text-lg md:text-xl font-bold text-navy mb-3 leading-snug">
                    {item.title}
                  </h3>
                  <p className="font-sans text-xs md:text-sm text-navy/60 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
