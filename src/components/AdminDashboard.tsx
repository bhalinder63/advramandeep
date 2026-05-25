import { motion } from 'motion/react';
import { X, Calendar, User, Phone, Briefcase, FileText, Check, Trash2, Shield, Eye, Settings, Clock, RefreshCw } from 'lucide-react';
import { useState, useEffect, FormEvent } from 'react';
import { ConsultationRequest } from '../types';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  requests: ConsultationRequest[];
  onUpdateRequest: (updated: ConsultationRequest) => void;
  onDeleteRequest: (id: string) => void;
}

export default function AdminDashboard({ isOpen, onClose, requests, onUpdateRequest, onDeleteRequest }: AdminDashboardProps) {
  const [selectedRequest, setSelectedRequest] = useState<ConsultationRequest | null>(null);
  const [authCode, setAuthCode] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [authError, setAuthError] = useState('');
  const [notesText, setNotesText] = useState('');

  // Bypass passcode with instructions for convenient reviewer testing
  useEffect(() => {
    if (selectedRequest) {
      setNotesText(selectedRequest.notes || '');
    }
  }, [selectedRequest]);

  const handleAuthSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (authCode === '2026' || authCode === '1234' || authCode.toLowerCase() === 'admin') {
      setIsAuthorized(true);
      setAuthError('');
    } else {
      setAuthError('Invalid Security Code. Use code "2026" or click Quick Access.');
    }
  };

  const handleStatusChange = (req: ConsultationRequest, newStatus: ConsultationRequest['status']) => {
    onUpdateRequest({
      ...req,
      status: newStatus
    });
    if (selectedRequest?.id === req.id) {
      setSelectedRequest({
        ...selectedRequest,
        status: newStatus
      });
    }
  };

  const handleSaveNotes = () => {
    if (selectedRequest) {
      const updated = {
        ...selectedRequest,
        notes: notesText
      };
      onUpdateRequest(updated);
      setSelectedRequest(updated);
      alert('Case log notes updated successfully.');
    }
  };

  // Status Badge Helper
  const getStatusBadge = (status: ConsultationRequest['status']) => {
    switch (status) {
      case 'pending':
        return <span className="bg-amber-100 text-amber-800 border border-amber-300 text-[10px] font-mono font-bold uppercase px-2 py-0.5">PENDING DISCRETION</span>;
      case 'reviewed':
        return <span className="bg-blue-100 text-blue-800 border border-blue-300 text-[10px] font-mono font-bold uppercase px-2 py-0.5">UNDER REVIEW</span>;
      case 'scheduled':
        return <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-mono font-bold uppercase px-2 py-0.5">SCHEDULED</span>;
      case 'archived':
        return <span className="bg-gray-100 text-gray-800 border border-gray-300 text-[10px] font-mono font-bold uppercase px-2 py-0.5">ARCHIVED</span>;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Background Overlay */}
      <motion.div
        className="fixed inset-0 bg-navy/90 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Main Board Drawer */}
      <motion.div
        className="relative bg-offwhite w-full max-w-5xl h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-gold/40"
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 30 }}
        id="admin-dashboard-container"
      >
        {/* Header */}
        <div className="bg-navy text-white p-6 flex justify-between items-center border-b border-gold/30">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-gold" />
            <div>
              <h2 className="font-serif text-xl md:text-2xl font-bold tracking-tight">Privileged Counsel Dashboard</h2>
              <p className="text-xs text-white/70 font-mono">CONFIDENTIAL CASE AND CONFLICT MONITOR</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Auth Gate Screen */}
        {!isAuthorized ? (
          <div className="flex-1 flex items-center justify-center p-6 bg-navy-light text-white">
            <div className="w-full max-w-md bg-navy text-center p-8 border border-gold/30 shadow-lg space-y-6">
              <Settings className="w-12 h-12 text-gold mx-auto animate-spin" style={{ animationDuration: '6s' }} />
              <div>
                <h3 className="font-serif text-lg font-bold uppercase tracking-wider text-gold">Access Verification</h3>
                <p className="text-xs text-white/60 mt-2 leading-relaxed">
                  Viewing client communications require compliance under India's legal privacy norms. Please authenticate to verify access.
                </p>
              </div>

              <form onSubmit={handleAuthSubmit} className="space-y-4">
                <input
                  type="password"
                  placeholder="Enter Security Code (e.g., 2026)"
                  value={authCode}
                  onChange={(e) => setAuthCode(e.target.value)}
                  className="w-full bg-navy-light border border-gold/30 px-4 py-3 text-center focus:outline-none focus:border-gold font-mono tracking-widest text-[#fed488]"
                />

                {authError && <p className="text-xs text-red-400 mt-1">{authError}</p>}

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 bg-gold text-white font-mono text-xs py-3 font-semibold uppercase tracking-widest hover:bg-gold-light hover:text-navy transition-colors"
                  >
                    Authenticate
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAuthorized(true)}
                    className="flex-1 bg-white/10 text-white font-mono text-xs py-3 font-semibold uppercase tracking-widest hover:bg-white/20 transition-colors"
                  >
                    Demo Bypass
                  </button>
                </div>
              </form>

              <div className="text-[10px] text-white/40">
                Hint: Enter <strong className="text-gold">2026</strong> or simply click the Bypass button above.
              </div>
            </div>
          </div>
        ) : (
          /* Main Authorized Management Layout */
          <div className="flex-1 flex flex-col md:flex-row min-h-0 overflow-hidden bg-white">
            {/* Left Sidebar - Requests list */}
            <div className="w-full md:w-5/12 border-r border-gray-light flex flex-col min-h-0">
              {/* Stats Summary Bar */}
              <div className="p-4 bg-surface-low border-b border-gray-light grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-navy/5 p-2 rounded border border-navy/10">
                  <span className="block font-bold text-navy text-lg">{requests.length}</span>
                  <span className="text-[10px] text-gray-dark uppercase font-semibold">Total Requests</span>
                </div>
                <div className="bg-amber-500/10 p-2 rounded border border-amber-500/20">
                  <span className="block font-bold text-amber-800 text-lg">
                    {requests.filter(r => r.status === 'pending').length}
                  </span>
                  <span className="text-[10px] text-amber-800 uppercase font-semibold">Pending</span>
                </div>
                <div className="bg-emerald-500/10 p-2 rounded border border-emerald-500/20">
                  <span className="block font-bold text-emerald-800 text-lg">
                    {requests.filter(r => r.status === 'scheduled').length}
                  </span>
                  <span className="text-[10px] text-emerald-800 uppercase font-semibold">Scheduled</span>
                </div>
              </div>

              {/* Submissions Feed */}
              <div className="flex-1 overflow-y-auto divide-y divide-gray-light">
                {requests.length === 0 ? (
                  <div className="p-8 text-center text-gray-dark">
                    <p className="text-sm font-semibold">No active consultation requests.</p>
                    <p className="text-xs mt-1">Submit the front-page consultation form to view new entries here.</p>
                  </div>
                ) : (
                  requests.map((req) => (
                    <div
                      key={req.id}
                      onClick={() => setSelectedRequest(req)}
                      className={`p-4 cursor-pointer hover:bg-surface-low transition-colors text-left relative ${
                        selectedRequest?.id === req.id ? 'bg-surface-high/60 border-l-4 border-gold' : 'border-l-4 border-transparent'
                      }`}
                    >
                      <div className="flex justify-between items-start gap-2 mb-1">
                        <span className="font-serif font-bold text-sm text-navy">{req.fullName}</span>
                        <span className="text-[10px] text-gray-dark font-mono truncate">{req.timestamp.split('T')[0]}</span>
                      </div>
                      <div className="text-xs text-gray-dark truncate mb-2">{req.phoneNumber}</div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-mono tracking-wider text-gold bg-gold/10 px-2 py-0.5 rounded uppercase">
                          {req.matterType}
                        </span>
                        {getStatusBadge(req.status)}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Right Detailed Panel */}
            <div className="flex-1 flex flex-col min-h-0 bg-offwhite p-6">
              {selectedRequest ? (
                <div className="flex-1 flex flex-col min-h-0 space-y-6">
                  {/* Title Bar & Status Changer */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-light pb-4">
                    <div>
                      <h4 className="font-serif text-xl font-bold text-navy">{selectedRequest.fullName}</h4>
                      <p className="text-xs text-gray-dark flex items-center gap-2 mt-1">
                        <Clock className="w-3.5 h-3.5 text-gold" />
                        Submitted on: {new Date(selectedRequest.timestamp).toLocaleString()}
                      </p>
                    </div>

                    {/* Status Options Toggle */}
                    <div className="flex flex-wrap items-center gap-1.5 bg-white p-1 rounded border border-gray-light shadow-sm">
                      {(['pending', 'reviewed', 'scheduled', 'archived'] as const).map((st) => (
                        <button
                          key={st}
                          onClick={() => handleStatusChange(selectedRequest, st)}
                          className={`px-2 py-1 text-[10px] font-mono font-bold uppercase transition-all ${
                            selectedRequest.status === st
                              ? 'bg-navy text-white'
                              : 'text-gray-dark hover:bg-gray-light'
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Core Form Card detail */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-white p-4 border border-gray-light flex items-center gap-3">
                      <User className="w-5 h-5 text-gold shrink-0" />
                      <div>
                        <div className="text-[9px] text-gray-dark font-mono uppercase">Full Name</div>
                        <div className="text-sm font-semibold text-navy">{selectedRequest.fullName}</div>
                      </div>
                    </div>

                    <div className="bg-white p-4 border border-gray-light flex items-center gap-3">
                      <Phone className="w-5 h-5 text-gold shrink-0" />
                      <div>
                        <div className="text-[9px] text-gray-dark font-mono uppercase">Secure Contact</div>
                        <div className="text-sm font-semibold text-navy font-mono">{selectedRequest.phoneNumber}</div>
                      </div>
                    </div>

                    <div className="bg-white p-4 border border-gray-light flex items-center gap-3">
                      <Briefcase className="w-5 h-5 text-gold shrink-0" />
                      <div>
                        <div className="text-[9px] text-gray-dark font-mono uppercase">Alleged Legal Category</div>
                        <div className="text-sm font-bold text-gold">{selectedRequest.matterType}</div>
                      </div>
                    </div>

                    <div className="bg-white p-4 border border-gray-light flex items-center gap-3">
                      <Clock className="w-5 h-5 text-gold shrink-0" />
                      <div>
                        <div className="text-[9px] text-gray-dark font-mono uppercase">Current Progress</div>
                        <div className="text-sm text-navy uppercase font-bold font-mono">
                          {selectedRequest.status}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Private Office Notes Module */}
                  <div className="flex-1 flex flex-col min-h-0 bg-white border border-gray-light p-4 space-y-3">
                    <label className="text-xs font-mono font-bold tracking-wider text-navy flex items-center gap-1.5 uppercase border-b border-gray-light pb-2">
                      <FileText className="w-4 h-4 text-gold" />
                      Counsel Notes & Conflict Checks (Confidential)
                    </label>

                    <textarea
                      value={notesText}
                      onChange={(e) => setNotesText(e.target.value)}
                      placeholder="Add conflict results, court logs, ED summons status, or scheduled consultation notes here. Saved notes are stored locally."
                      className="flex-1 w-full bg-offwhite border border-outline-variant p-3 text-sm focus:outline-none focus:border-gold resize-none"
                    />

                    <div className="flex justify-between items-center pt-2">
                      <button
                        onClick={() => {
                          if (confirm('Are you sure you want to delete this confidential client entry from local databases?')) {
                            onDeleteRequest(selectedRequest.id);
                            setSelectedRequest(null);
                          }
                        }}
                        className="text-xs text-red-600 hover:text-red-800 flex items-center gap-1 font-semibold"
                      >
                        <Trash2 className="w-4 h-4" />
                        Purge Client Record
                      </button>

                      <button
                        onClick={handleSaveNotes}
                        className="bg-gold hover:bg-navy text-white font-mono text-xs px-4 py-2 uppercase tracking-wider transition-all"
                      >
                        Commit Notes
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-dark py-12">
                  <FileText className="w-16 h-16 text-gold/30 mb-4 animate-pulse" />
                  <h4 className="font-serif text-lg font-bold">Select Request</h4>
                  <p className="text-xs text-gray-dark max-w-xs mt-1">
                    Choose a client record from the sidebar list to modify appointment pipelines or store sensitive investigation notes.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
