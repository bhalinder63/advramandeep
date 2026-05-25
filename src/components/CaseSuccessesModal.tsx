import { motion } from 'motion/react';
import { X, Filter, Landmark, Gavel, Briefcase, ChevronRight, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { CASE_SUCCESSES } from '../data';
import { CaseSuccess, MatterType } from '../types';

interface CaseSuccessesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectConsultation: (matter: MatterType) => void;
}

export default function CaseSuccessesModal({ isOpen, onClose, onSelectConsultation }: CaseSuccessesModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<MatterType | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const categories: (MatterType | 'All')[] = [
    'All',
    'PMLA Investigation',
    'Criminal Defense',
    'Corporate Litigation',
    'General Legal Consultation'
  ];

  const filteredCases = CASE_SUCCESSES.filter(c => {
    const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.forum.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (c.citation && c.citation.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Background Overlay */}
      <motion.div
        className="fixed inset-0 bg-navy/80 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Modal Container */}
      <motion.div
        className="relative bg-offwhite w-full max-w-4xl h-[85vh] flex flex-col shadow-2xl overflow-hidden border border-gold/20"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
      >
        {/* Header */}
        <div className="bg-navy text-white p-6 md:p-8 flex justify-between items-center border-b border-gold/30">
          <div>
            <div className="flex items-center gap-2 text-gold font-mono text-xs uppercase tracking-widest mb-1">
              <Landmark className="w-4 h-4" />
              Verdicts & Stays
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold">Case Success Overview</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            id="close-success-modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Filters and Search Bar */}
        <div className="p-4 md:p-6 bg-white border-b border-gray-light flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-semibold tracking-wide uppercase transition-all duration-200 border ${
                  selectedCategory === cat
                    ? 'bg-gold text-white border-gold'
                    : 'bg-offwhite text-navy border-outline-variant hover:bg-gray-light'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-dark">
              <Filter className="w-4 h-4 text-gold" />
            </span>
            <input
              type="text"
              placeholder="Search rulings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-outline-variant focus:outline-none focus:border-gold text-sm bg-offwhite transition-all"
            />
          </div>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {filteredCases.length === 0 ? (
            <div className="text-center py-16 text-gray-dark">
              <p className="text-lg">No case success records found matching current criteria.</p>
              <button
                onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                className="mt-4 text-sm text-gold hover:underline"
              >
                Reset filters
              </button>
            </div>
          ) : (
            filteredCases.map((cs) => (
              <motion.div
                key={cs.id}
                className="bg-white p-6 border border-gray-light hover:border-gold/30 shadow-sm hover:shadow-md transition-all duration-300 relative group"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                id={`case-card-${cs.id}`}
              >
                {/* Visual Accent */}
                <div className="absolute top-0 left-0 w-1.5 h-full bg-navy group-hover:bg-gold transition-colors" />

                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-[10px] font-mono uppercase bg-gold/10 text-gold px-2 py-0.5 tracking-wider">
                        {cs.category}
                      </span>
                      {cs.citation && (
                        <span className="text-xs text-on-surface-variant font-mono">
                          | {cs.citation}
                        </span>
                      )}
                      <span className="text-xs text-gray-dark font-mono ml-auto md:ml-0 bg-gray-light px-2 py-0.5">
                        {cs.year}
                      </span>
                    </div>

                    <h3 className="font-serif text-lg md:text-xl font-bold text-navy group-hover:text-gold transition-colors mb-2">
                      {cs.title}
                    </h3>
                    <p className="text-sm text-gray-dark leading-relaxed mb-4">
                      {cs.summary}
                    </p>

                    <div className="text-xs font-semibold text-navy flex items-center gap-2">
                      <span className="text-gold tracking-widest font-mono uppercase">Forum:</span>
                      {cs.forum}
                    </div>
                  </div>

                  <div className="flex flex-col items-start md:items-end justify-between min-w-[200px] shrink-0 bg-surface-low p-4 border border-outline-variant/30 text-left md:text-right">
                    <div className="text-xs font-semibold tracking-wider text-gold uppercase mb-1 font-mono">
                      RESULT ACHIEVED
                    </div>
                    <div className="text-sm font-bold text-navy flex items-center gap-1.5 md:justify-end">
                      <CheckCircle className="w-4 h-4 text-green-700 shrink-0" />
                      {cs.result}
                    </div>
                    <button
                      onClick={() => {
                        onSelectConsultation(cs.category);
                        onClose();
                      }}
                      className="mt-4 text-xs font-semibold text-gold hover:text-navy hover:underline transition-all flex items-center gap-1 group-hover:translate-x-1"
                    >
                      Inquire on Similar Matter
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Disclaimer / Footer */}
        <div className="p-4 bg-surface-low border-t border-outline-variant/30 text-center text-[11px] text-gray-dark italic">
          Disclaimer: Case verdicts are factual and rely strictly on public courtroom logs. Prior outcomes do not fully guarantee identical results, as every client defense is strictly unique.
        </div>
      </motion.div>
    </div>
  );
}
