import { motion } from 'motion/react';
import { Gavel, Landmark, Briefcase, Shield, Search, BookOpen, ArrowRight } from 'lucide-react';
import { MatterType } from '../types';

interface PracticeAreasProps {
  onSelectConsultation: (matter: MatterType) => void;
}

const areas = [
  {
    icon: <Gavel className="w-7 h-7 text-gold" />,
    title: 'Criminal Defense',
    description:
      'Comprehensive defense in Sessions Court, High Court, and Supreme Court. Bail applications, anticipatory bail, trial defense, and appeals.',
  },
  {
    icon: <Landmark className="w-7 h-7 text-gold" />,
    title: 'PMLA Defense',
    description:
      'Specialized defense under the Prevention of Money Laundering Act. ED raids, attachment of property, PMLA trials, and High Court challenges.',
  },
  {
    icon: <Briefcase className="w-7 h-7 text-gold" />,
    title: 'White Collar Crime',
    description:
      'Defense in cases involving financial fraud, corporate crime, cheque dishonour, and economic offenses.',
  },
  {
    icon: <Shield className="w-7 h-7 text-gold" />,
    title: 'Bail Applications',
    description:
      'Urgent bail and anticipatory bail applications in Sessions Court, High Court, and Supreme Court with highest success rate.',
  },
  {
    icon: <Search className="w-7 h-7 text-gold" />,
    title: 'Financial Crime & ED',
    description:
      'Defense against Enforcement Directorate investigations, asset attachment, and prosecution under FEMA and related acts.',
  },
  {
    icon: <BookOpen className="w-7 h-7 text-gold" />,
    title: 'Legal Consultation',
    description:
      'Confidential legal advisory for individuals and businesses on criminal exposure, compliance risk, and preventive legal strategy.',
  },
];

export default function PracticeAreas({ onSelectConsultation }: PracticeAreasProps) {
  return (
    <section id="practice-expertise" className="py-24 bg-offwhite scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-16 text-center">
          <motion.div
            className="font-mono text-xs font-bold text-gold uppercase tracking-widest mb-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Practice Areas
          </motion.div>
          <motion.h2
            className="font-serif text-3xl md:text-4xl text-navy font-bold mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Legal Expertise You Can Rely On
          </motion.h2>
          <motion.p
            className="font-sans text-sm md:text-base text-gray-dark max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            Specializing in criminal defense and financial crime — with comprehensive support across all related matters.
          </motion.p>
          <motion.div
            className="mt-5 mx-auto w-16 h-px bg-gold"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          />
        </div>

        {/* 3×2 grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {areas.map((area, idx) => (
            <motion.div
              key={area.title}
              className="group bg-white border border-outline-variant/20 p-8 hover:border-gold/40 hover:shadow-lg transition-all duration-300 flex flex-col relative"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 + idx * 0.07 }}
            >
              <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-gold/20 group-hover:border-gold transition-colors duration-300" />
              <div className="mb-5">{area.icon}</div>
              <h3 className="font-serif text-lg md:text-xl font-bold text-navy mb-3 group-hover:text-gold transition-colors">
                {area.title}
              </h3>
              <p className="font-sans text-sm text-gray-dark leading-relaxed flex-grow">
                {area.description}
              </p>
              <button
                onClick={() => onSelectConsultation(area.title as MatterType)}
                className="mt-6 inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-gold hover:text-navy transition-colors uppercase tracking-widest"
              >
                Learn More <ArrowRight className="w-3 h-3" />
              </button>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
