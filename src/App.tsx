import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import Header from './components/Header';
import Hero from './components/Hero';
import PracticeAreas from './components/PracticeAreas';
import WhyChooseUs from './components/WhyChooseUs';
import AboutAdvocate from './components/AboutAdvocate';
import Testimonials from './components/Testimonials';
import Insights from './components/Insights';
import BookingSection from './components/BookingSection';
import CaseSuccessesModal from './components/CaseSuccessesModal';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';
import { ConsultationRequest, MatterType } from './types';

const STORAGE_KEY = 'ramandeep_singh_requests';

const INITIAL_REQUESTS: ConsultationRequest[] = [
  {
    id: 'req-mock-1',
    fullName: 'Aditya Mittal',
    phoneNumber: '+91 98110 54321',
    matterType: 'PMLA Investigation',
    timestamp: '2026-05-25T14:20:00.000Z',
    status: 'pending',
    notes: 'Summons received under Section 50 of PMLA regarding provisional corporate property attachment. Confirmed defense preview. Preparing briefing on property origin prior to alleged predicate dates.'
  },
  {
    id: 'req-mock-2',
    fullName: 'Dr. Rajeev Sethi',
    phoneNumber: '+91 99102 33445',
    matterType: 'Criminal Defense',
    timestamp: '2026-05-24T10:15:00.000Z',
    status: 'scheduled',
    notes: 'Bail hearing scheduled. Demanding digital integrity verification under Section 65B of Evidence Act.'
  }
];

export default function App() {
  const [requests, setRequests] = useState<ConsultationRequest[]>([]);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);
  const [selectedMatterPreset, setSelectedMatterPreset] = useState<MatterType>('PMLA Investigation');

  // Load requests from localStorage on startup
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setRequests(JSON.parse(saved));
      } catch (e) {
        setRequests(INITIAL_REQUESTS);
      }
    } else {
      setRequests(INITIAL_REQUESTS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_REQUESTS));
    }
  }, []);

  // Sync to local storage
  const syncRequests = (newRequests: ConsultationRequest[]) => {
    setRequests(newRequests);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newRequests));
  };

  // Callback to handle new consultation submitted by visitor
  const handleAddRequest = (fullName: string, phoneNumber: string, matterType: MatterType) => {
    const newReq: ConsultationRequest = {
      id: `req-${Date.now()}`,
      fullName,
      phoneNumber,
      matterType,
      timestamp: new Date().toISOString(),
      status: 'pending',
      notes: ''
    };
    const updated = [newReq, ...requests];
    syncRequests(updated);
  };

  // Modify request (status, notes, etc.)
  const handleUpdateRequest = (updated: ConsultationRequest) => {
    const updatedList = requests.map(r => r.id === updated.id ? updated : r);
    syncRequests(updatedList);
  };

  // Delete a request
  const handleDeleteRequest = (id: string) => {
    const filteredList = requests.filter(r => r.id !== id);
    syncRequests(filteredList);
  };

  // Handle preset selected from Case Successes Modal
  const handleSelectMatterFromSuccess = (matter: MatterType) => {
    setSelectedMatterPreset(matter);
    
    // Smooth scroll to contact selector form section
    const element = document.getElementById('contact-cta');
    if (element) {
      setTimeout(() => {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }, 100);
    }
  };

  // Count pending items to display in Badge
  const pendingCount = requests.filter(r => r.status === 'pending').length;

  return (
    <div className="bg-offwhite min-h-screen selection:bg-gold/20 flex flex-col antialiased">
      {/* Primary Header */}
      <Header 
        onOpenBookings={() => {
          const element = document.getElementById('contact-cta');
          if (element) {
            window.scrollTo({
              top: element.offsetTop - 80,
              behavior: 'smooth'
            });
          }
        }}
        onOpenAdmin={() => setIsAdminDashboardOpen(true)}
        adminCount={pendingCount}
      />

      {/* Main Pages Flow */}
      <main className="flex-grow">
        {/* Core Hero Banner */}
        <Hero 
          onOpenBookings={() => {
            const element = document.getElementById('contact-cta');
            if (element) {
              window.scrollTo({
                top: element.offsetTop - 80,
                behavior: 'smooth'
              });
            }
          }}
          onOpenSuccesses={() => setIsSuccessModalOpen(true)}
        />

        {/* Practice Areas Bento Grid */}
        <PracticeAreas 
          onSelectConsultation={handleSelectMatterFromSuccess}
        />

        {/* Why Choose Us */}
        <WhyChooseUs />

        {/* About The Advocate */}
        <AboutAdvocate />

        {/* Legal insights blog elements */}
        <Insights />

        {/* Client Testimonials */}
        <Testimonials />

        {/* Client Booking and Consultation form */}
        <BookingSection 
          onSubmitRequest={handleAddRequest}
          selectedMatterPreset={selectedMatterPreset}
        />
      </main>

      {/* Footer information bar */}
      <Footer />

      {/* Floating and Drawer Modals loaded dynamically via AnimatePresence */}
      <AnimatePresence>
        {isSuccessModalOpen && (
          <CaseSuccessesModal 
            isOpen={isSuccessModalOpen}
            onClose={() => setIsSuccessModalOpen(false)}
            onSelectConsultation={handleSelectMatterFromSuccess}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isAdminDashboardOpen && (
          <AdminDashboard 
            isOpen={isAdminDashboardOpen}
            onClose={() => setIsAdminDashboardOpen(false)}
            requests={requests}
            onUpdateRequest={handleUpdateRequest}
            onDeleteRequest={handleDeleteRequest}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
