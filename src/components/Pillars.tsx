import { motion } from 'motion/react';
import { Award, BookOpen, Fingerprint } from 'lucide-react';

export default function Pillars() {
  const pillarsList = [
    {
      num: '01',
      title: 'Immutable Integrity',
      description: 'Unwavering ethical standards in every case, ensuring your reputation is guarded alongside your freedom.',
      icon: <Fingerprint className="text-gold w-4 h-4" />
    },
    {
      num: '02',
      title: 'Intellectual Superiority',
      description: 'Deep analytical rigor applied to every piece of evidence, uncovering leverage where others see none.',
      icon: <BookOpen className="text-gold w-4 h-4" />
    },
    {
      num: '03',
      title: 'Bespoke Defense',
      description: 'Every legal strategy is custom-built for the specific nuances of your matter. No boilerplate solutions.',
      icon: <Award className="text-gold w-4 h-4" />
    }
  ];

  return (
    <section id="pillars-advocacy" className="py-24 bg-navy text-white overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Text and Pillars */}
          <div className="text-left">
            <motion.div 
              className="font-mono text-xs text-gold uppercase tracking-widest mb-3 font-semibold"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              Our Operational Core
            </motion.div>
            <motion.h2 
              className="font-serif text-3xl md:text-4xl font-bold mb-12 tracking-tight"
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              The Pillars of Our Advocacy
            </motion.h2>

            <div className="space-y-10">
              {pillarsList.map((p, idx) => (
                <motion.div 
                  key={p.num} 
                  className="flex gap-6 items-start"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + idx * 0.15 }}
                >
                  {/* Circle number */}
                  <div className="w-12 h-12 rounded-full border border-gold/40 flex items-center justify-center shrink-0 bg-navy-light/40 group hover:border-gold transition-colors">
                    <span className="font-mono text-xs font-semibold text-gold">{p.num}</span>
                  </div>

                  <div>
                    <h4 className="font-serif text-lg md:text-xl font-bold mb-2 flex items-center gap-2 text-white">
                      {p.icon}
                      {p.title}
                    </h4>
                    <p className="font-sans text-xs md:text-sm text-white/70 leading-relaxed max-w-lg">
                      {p.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Side: Image with visual borders */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative border-[1px] border-gold/20 p-4">
              <img 
                alt="Legal Detail" 
                referrerPolicy="no-referrer"
                className="w-full opacity-70 border border-gold/10 grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAh5RjE0UgiHSf7Y76igMwkTA5AV5r1IZfox_uz81Yt49MhqQgcWlz-RvCuXv9VFD2CHC6Aj-kpXDQuE7_wbVLagBOKsEF2Dq2vm1i8K1OsRhelwgRk-oY4IqeW5F9vuIsgHw7-6-Sd7hmsbzq3-g7FkZzmLsDF7bhbpRGfnICZT2M12nljy2ATRoHY5XJk9s4jl6gu835J_s3-kjPEi01weN0UuNiFqULKAOjvHSmFBJMIdowFA1kInR3O54VVo97mswTg4GaVJ1g_"
              />
              
              {/* Decorative Absolute borders */}
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-gold" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-gold" />
            </div>

            {/* Back Gold Shadow Block */}
            <div className="absolute inset-0 border-[16px] border-gold/10 translate-x-6 translate-y-6 -z-10 bg-gold/5" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
