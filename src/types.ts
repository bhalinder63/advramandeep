/**
 * Types and interfaces for the Ramandeep Singh Law Office Application
 */

export type MatterType = 'PMLA Investigation' | 'Criminal Defense' | 'Corporate Litigation' | 'General Legal Consultation';

export interface ConsultationRequest {
  id: string;
  fullName: string;
  phoneNumber: string;
  matterType: MatterType;
  message?: string;
  timestamp: string;
  status: 'pending' | 'reviewed' | 'scheduled' | 'archived';
  notes?: string;
}

export interface PracticeArea {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: string; // lucide icon name
  highlights: string[];
}

export interface InsightArticle {
  id: string;
  category: string;
  title: string;
  description: string;
  content: string; // Markdown or simple HTML formatted content
  image: string;
  date: string;
  author: string;
}

export interface CaseSuccess {
  id: string;
  title: string;
  category: MatterType;
  citation?: string;
  result: string;
  forum: string;
  summary: string;
  year: number;
}
