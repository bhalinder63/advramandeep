import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, Clock, ShieldCheck, Landmark, Lock, HelpCircle } from 'lucide-react';
import { ConsultationRequest, MatterType } from '../types';

interface BookingSectionProps {
  onSubmitRequest: (fullName: string, phoneNumber: string, matterType: MatterType) => void;
  selectedMatterPreset: MatterType;
}

export default function BookingSection({ onSubmitRequest, selectedMatterPreset }: BookingSectionProps) {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [matterType, setMatterType] = useState<MatterType>('PMLA Investigation');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketCode, setTicketCode] = useState('');

  // Handle prest set triggered from outer cards
  useState(() => {
    if (selectedMatterPreset) {
      setMatterType(selectedMatterPreset);
    }
  });

  // Sync selectedMatterPreset when it changes
  const handleMatterPresetChange = (preset: MatterType) => {
    setMatterType(preset);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (fullName && phoneNumber) {
      onSubmitRequest(fullName, phoneNumber, matterType);
      
      // Random secure voucher code
      const randCode = `RMS-PMLA-${Math.floor(1000 + Math.random() * 9000)}`;
      setTicketCode(randCode);
      setIsSubmitted(true);

      setFullName('');
      setPhoneNumber('');
    }
  };

  return (
    <section id="contact-cta" className="py-24 bg-surface-low border-y border-outline-variant/30 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <motion.div 
          className="flex justify-center items-center gap-2 mb-4 text-gold font-mono text-xs uppercase tracking-widest font-bold"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Lock className="w-3.5 h-3.5" />
          PRIVILEGED & CONFIDENTIAL
        </motion.div>

        <h2 className="font-serif text-3xl md:text-4xl text-navy font-bold mb-6">
          Confidentiality is our foundation.
        </h2>
        <p className="font-sans text-sm md:text-base text-gray-dark max-w-2xl mx-auto mb-12 leading-relaxed">
          Schedule a private consultation to discuss your matter with complete discretion. Every inquiry is handled with the highest level of professional privilege.
        </p>

        <div className="max-w-xl mx-auto">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div
                key="booking-form"
                className="bg-white p-6 md:p-10 border border-outline-variant/60 shadow-lg"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
              >
                <form className="space-y-6 text-left" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div className="space-y-2">
                      <label className="block font-mono text-[10px] md:text-xs text-navy font-bold uppercase tracking-wider">
                        FULL NAME
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full border-b border-outline-variant py-2.5 px-1 focus:outline-none focus:border-gold text-sm bg-transparent transition-colors font-sans"
                      />
                    </div>

                    {/* Phone number */}
                    <div className="space-y-2">
                      <label className="block font-mono text-[10px] md:text-xs text-navy font-bold uppercase tracking-wider">
                        PHONE NUMBER
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 XXXXX XXXXX"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full border-b border-outline-variant py-2.5 px-1 focus:outline-none focus:border-gold text-sm bg-transparent transition-colors font-mono"
                      />
                    </div>
                  </div>

                  {/* Matter Type */}
                  <div className="space-y-2">
                    <label className="block font-mono text-[10px] md:text-xs text-navy font-bold uppercase tracking-wider">
                      MATTER TYPE
                    </label>
                    <select
                      value={matterType}
                      onChange={(e) => setMatterType(e.target.value as MatterType)}
                      className="w-full border-b border-outline-variant py-2.5 px-1 focus:outline-none focus:border-gold text-xs md:text-sm bg-white cursor-pointer transition-colors font-sans"
                    >
                      <option value="PMLA Investigation">PMLA Investigation & Asset Summons</option>
                      <option value="Criminal Defense">Criminal Trial & High Court Appeals</option>
                      <option value="Corporate Litigation">Corporate Fraud compliance & NCLT</option>
                      <option value="General Legal Consultation">General Corporate Advisory & Case Review</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-navy hover:bg-gold text-white py-4 font-mono text-xs font-bold tracking-widest uppercase hover:shadow-lg transition-all duration-300"
                    id="submit-consultation-btn"
                  >
                    REQUEST CONSULTATION
                  </button>

                  <p className="text-center font-sans text-[11px] italic text-gray-dark mt-4">
                    Note: Transmission of information does not create an attorney-client relationship. All submitted data is encrypted and encrypted under local legal guidance.
                  </p>
                </form>
              </motion.div>
            ) : (
              /* High Fidelity Submission voucher */
              <motion.div
                key="booking-success"
                className="bg-white p-8 md:p-10 border-2 border-gold shadow-2xl space-y-6 text-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, y: 15 }}
                id="booking-success-card"
              >
                <div className="w-16 h-16 bg-gold/10 text-gold flex items-center justify-center rounded-full mx-auto">
                  <ShieldCheck className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif text-xl md:text-2xl font-bold text-navy">Privileged Receipt Valid</h3>
                  <p className="text-xs text-gray-dark max-w-sm mx-auto">
                    Your brief has been compiled securely under strict attorney-client privilege.
                  </p>
                </div>

                {/* Voucher details block */}
                <div className="bg-surface-low border border-outline-variant/40 p-5 divide-y divide-outline-variant/30 text-left font-mono text-xs">
                  <div className="py-2.5 flex justify-between">
                    <span className="text-gray-dark uppercase">REFERENCE ID</span>
                    <span className="font-bold text-gold">{ticketCode}</span>
                  </div>
                  <div className="py-2.5 flex justify-between">
                    <span className="text-gray-dark uppercase">CATEGORY</span>
                    <span className="font-bold text-navy">{matterType}</span>
                  </div>
                  <div className="py-2.5 flex justify-between">
                    <span className="text-gray-dark uppercase">SECURITY CODE</span>
                    <span className="text-emerald-700 font-bold">● PRIVILEGED</span>
                  </div>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/20 p-4 text-xs text-amber-900 text-left">
                  <strong>Verification Status:</strong> Your request has been logged. You can review and approve this directly in the <strong>Counsel Dashboard</strong> (click the Shield icon in the top header) using access code <strong>2026</strong>.
                </div>

                <button
                  onClick={() => setIsSubmitted(false)}
                  className="bg-navy hover:bg-gold text-white font-mono text-xs px-6 py-3 uppercase tracking-wider transition-all"
                  id="make-another-request-btn"
                >
                  Log Another Consultation
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
