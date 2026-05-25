import { motion } from 'motion/react';
import { BookOpen, Award, MapPin } from 'lucide-react';

const credentials = [
  { icon: <BookOpen className="w-4 h-4 text-gold shrink-0" />, text: 'LLB — University of Delhi' },
  { icon: <Award className="w-4 h-4 text-gold shrink-0" />, text: 'Enrolled — Bar Council of India' },
  { icon: <MapPin className="w-4 h-4 text-gold shrink-0" />, text: 'Active Practice — Pan India' },
];

export default function AboutAdvocate() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative border border-gold/20 p-4">
              <img
                alt="Advocate Ramandeep Singh"
                referrerPolicy="no-referrer"
                className="w-full opacity-80 border border-gold/10 grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAh5RjE0UgiHSf7Y76igMwkTA5AV5r1IZfox_uz81Yt49MhqQgcWlz-RvCuXv9VFD2CHC6Aj-kpXDQuE7_wbVLagBOKsEF2Dq2vm1i8K1OsRhelwgRk-oY4IqeW5F9vuIsgHw7-6-Sd7hmsbzq3-g7FkZzmLsDF7bhbpRGfnICZT2M12nljy2ATRoHY5XJk9s4jl6gu835J_s3-kjPEi01weN0UuNiFqULKAOjvHSmFBJMIdowFA1kInR3O54VVo97mswTg4GaVJ1g_"
              />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-gold" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-gold" />
            </div>
            <div className="absolute inset-0 border-[16px] border-gold/10 translate-x-6 translate-y-6 -z-10 bg-gold/5" />
          </motion.div>

          {/* Right: Content */}
          <div>
            <motion.div
              className="font-mono text-xs text-gold uppercase tracking-widest mb-3 font-semibold"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              About The Advocate
            </motion.div>
            <motion.h2
              className="font-serif text-3xl md:text-4xl font-bold text-navy tracking-tight mb-6"
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Advocate Ramandeep Singh
            </motion.h2>

            <motion.div
              className="space-y-4 font-sans text-sm md:text-base text-navy/65 leading-relaxed mb-8"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <p>
                Advocate Ramandeep Singh is a distinguished criminal defense lawyer with extensive experience in India's courts. His practice focuses on criminal defense and PMLA (Prevention of Money Laundering Act) matters — areas that demand not only legal precision but also strategic thinking under pressure.
              </p>
              <p>
                With a reputation built on courtroom results, Advocate Singh has represented clients in Sessions Courts, High Courts, and the Supreme Court of India. He is known for his methodical approach to case preparation, his command of financial crime law, and his ability to secure bail and acquittals in complex criminal matters.
              </p>
              <p>
                His PMLA practice covers the full spectrum — from ED summons and search operations to property attachment challenges and PMLA trial defense.
              </p>
            </motion.div>

            {/* Credentials */}
            <motion.div
              className="space-y-3 border-t border-outline-variant/20 pt-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              {credentials.map((c) => (
                <div key={c.text} className="flex items-center gap-3">
                  {c.icon}
                  <span className="font-mono text-xs tracking-wide text-navy/80 font-medium">{c.text}</span>
                </div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
