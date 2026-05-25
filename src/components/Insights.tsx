import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Clock, User, Calendar, BookOpen, ArrowRight } from 'lucide-react';
import { INSIGHTS } from '../data';
import { InsightArticle } from '../types';

export default function Insights() {
  const [activeArticle, setActiveArticle] = useState<InsightArticle | null>(null);

  return (
    <section id="legal-insights" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      
      {/* Title block */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div className="text-left">
          <div className="font-mono text-xs font-bold text-gold uppercase tracking-widest mb-3">PUBLICATIONS</div>
          <h2 className="font-serif text-3xl md:text-4xl text-navy font-bold mb-2">Legal Insights</h2>
          <p className="font-sans text-sm md:text-base text-gray-dark max-w-lg">
            Analytical commentary on the shifting landscape of Indian law.
          </p>
        </div>
        
        <button 
          onClick={() => setActiveArticle(INSIGHTS[0])}
          className="font-mono text-xs font-bold text-navy hover:text-gold hover:border-gold border-b-2 border-gold pb-1.5 uppercase tracking-widest transition-all shrink-0"
        >
          View Latest Insight
        </button>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {INSIGHTS.map((insight) => (
          <article 
            key={insight.id} 
            onClick={() => setActiveArticle(insight)}
            className="group cursor-pointer flex flex-col h-full bg-white border border-gray-light hover:border-gold/30 hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            {/* Image container */}
            <div className="aspect-video w-full bg-surface-high overflow-hidden relative border-b border-gray-light">
              <img 
                alt={insight.title} 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 grayscale contrast-110" 
                src={insight.image}
              />
              <div className="absolute inset-0 bg-navy/5 group-hover:bg-transparent transition-colors duration-300" />
            </div>

            {/* Texts */}
            <div className="p-6 md:p-8 flex-grow flex flex-col text-left">
              <span className="font-mono text-[10px] md:text-xs text-gold uppercase tracking-widest mb-3 block font-bold">
                {insight.category}
              </span>
              
              <h3 className="font-serif text-lg md:text-xl font-bold text-navy mb-3 group-hover:text-gold transition-colors duration-300 line-clamp-2">
                {insight.title}
              </h3>
              
              <p className="font-sans text-xs md:text-sm text-gray-dark mb-6 line-clamp-3 leading-relaxed flex-grow">
                {insight.description}
              </p>

              <div className="flex items-center justify-between border-t border-gray-light pt-4 mt-auto">
                <span className="font-mono text-[10px] text-gray-dark">
                  {insight.date}
                </span>
                <span className="font-mono text-[10px] text-gold font-bold uppercase tracking-wider flex items-center gap-1 group-hover:underline">
                  READ CASE ANALYSIS <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Expanded Reader Modal */}
      <AnimatePresence>
        {activeArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-navy/85 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveArticle(null)}
            />

            {/* Reader Sheet */}
            <motion.div
              className="relative bg-white w-full max-w-3xl h-[85vh] flex flex-col shadow-2xl overflow-hidden border border-gold/30"
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
            >
              {/* Header static sticky */}
              <div className="bg-navy text-white p-6 md:p-8 flex justify-between items-center border-b border-gold/20 shrink-0">
                <div className="text-left">
                  <span className="font-mono text-xs uppercase text-gold tracking-widest font-bold">
                    {activeArticle.category}
                  </span>
                  <div className="text-xs text-white/50 flex items-center gap-2 mt-1">
                    <Calendar className="w-3.5 h-3.5 text-gold" />
                    <span>{activeArticle.date}</span>
                    <span>• By {activeArticle.author}</span>
                  </div>
                </div>
                <button
                  onClick={() => setActiveArticle(null)}
                  className="p-2 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                  id="close-reader-modal"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Cover image scrollable viewport */}
              <div className="flex-1 overflow-y-auto">
                <div className="h-56 md:h-72 w-full bg-surface-high relative shrink-0">
                  <img 
                    alt="Article Landscape" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale contrast-125 brightness-90"
                    src={activeArticle.image}
                  />
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />
                </div>

                {/* Article Contents */}
                <div className="p-6 md:p-10 max-w-2xl mx-auto text-left">
                  <h1 className="font-serif text-2xl md:text-3.5xl font-bold leading-tight text-navy mb-8">
                    {activeArticle.title}
                  </h1>

                  {/* HTML/Markdown parsing formatted content */}
                  <div className="font-sans text-sm md:text-base text-gray-dark leading-relaxed space-y-6">
                    {activeArticle.content.split('\n\n').map((para, pIdx) => {
                      if (para.startsWith('### ')) {
                        return (
                          <h3 key={pIdx} className="font-serif text-lg md:text-xl font-bold text-navy pt-4">
                            {para.replace('### ', '')}
                          </h3>
                        );
                      }
                      if (para.startsWith('#### ')) {
                        return (
                          <h4 key={pIdx} className="font-serif text-sm md:text-base font-bold text-gold uppercase tracking-wider pt-2">
                            {para.replace('#### ', '')}
                          </h4>
                        );
                      }
                      if (para.includes('\n- ')) {
                        const lines = para.split('\n');
                        const headerLine = lines[0];
                        const listItems = lines.slice(1).map(l => l.replace('- ', '').trim());
                        return (
                          <div key={pIdx} className="space-y-2">
                            {headerLine && <p className="font-semibold text-navy">{headerLine}</p>}
                            <ul className="list-disc pl-5 space-y-1 text-sm bg-surface-low p-4 border border-outline-variant/30">
                              {listItems.map((item, iIdx) => (
                                <li key={iIdx} className="text-gray-dark">{item}</li>
                              ))}
                            </ul>
                          </div>
                        );
                      }
                      return (
                        <p key={pIdx} className="whitespace-pre-wrap">
                          {para}
                        </p>
                      );
                    })}
                  </div>

                  {/* Attorney Sign-off */}
                  <div className="mt-12 pt-6 border-t border-gray-light text-xs md:text-sm text-gray-dark flex items-center justify-between">
                    <div>
                      <span className="block font-bold text-navy">Office of Ramandeep Singh, Senior Counsel</span>
                      <span className="block text-[11px] text-gray-dark mt-0.5">National Security, Financial Offenses & Whistleblower Protections</span>
                    </div>
                    <BookOpen className="w-8 h-8 text-gold/30" />
                  </div>
                </div>
              </div>

              {/* Bottom Sticky action */}
              <div className="p-4 bg-surface-low border-t border-outline-variant/30 flex justify-end shrink-0">
                <button
                  onClick={() => setActiveArticle(null)}
                  className="bg-navy hover:bg-gold text-white font-mono text-xs px-6 py-2.5 uppercase tracking-wider transition-colors"
                >
                  Close Document
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
