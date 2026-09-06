export type UserRole = 'admin' | 'student';

export interface StudentProfile {
  id: string;
  name: string;
  studentId: string;
  coreId: string;
  roleInCore: string;
  avatar?: string;
}

export type StepStatus = 'completed' | 'in_progress' | 'locked' | 'revision_needed';

export interface Attachment {
  id: string;
  name: string;
  size: string;
  uploadedBy: string;
  uploadedAt: string;
  fileType: string;
  fileDataUrl?: string;
}

export interface TimelineStep {
  id: number;
  title: string;
  shortTitle: string;
  description: string;
  status: StepStatus;
  lastUpdated: string;
  notes: string;
  attachments: Attachment[];
  
  // Specific fields for Step 1: انتخاب مسئله
  isProblemDefined?: boolean;
  problemTitle?: string;
  problemStatement?: string;
  keywords?: string[];
  
  // Specific fields for Step 2: ارائه به مرکز
  submissionDate?: string;
  proposalType?: string;
  isSubmittedToCenter?: boolean;
  
  // Specific fields for Step 3: ارزیابی اولیه
  evaluationResult?: 'approved' | 'rejected' | 'revision_needed' | 'pending';
  evaluatorName?: string;
  evaluatorComment?: string;
  evaluationDate?: string;
  
  // Specific fields for Step 4: تأیید نهایی مرکز
  officialApprovalStatus?: 'approved' | 'pending' | 'conditional';
  approvalNumber?: string;
  approvalDate?: string;
  centerNotes?: string;
  
  // Specific fields for Step 5 & 6: ارزیابی اول و دوم
  phaseTitle?: string;
  phaseReportSummary?: string;
  score?: number;
  phaseEvaluationComment?: string;
  phaseEvaluator?: string;
  
  // Specific fields for Step 7: ارزیابی‌های بعدی و خاتمه
  completionCertificateIssued?: boolean;
  finalScore?: number;
  finalEvaluationComment?: string;
  additionalStages?: { title: string; date: string; status: string; notes: string }[];
}

export interface Project {
  id: string;
  coreId: string;
  title: string;
  code: string;
  summary: string;
  manager: string; // استاد راهنما / مدیر هسته
  studentLead: string; // مسئول دانشجویی
  members: string[];
  startDate: string;
  targetEndDate: string;
  currentStepIndex: number; // 0 to 6
  overallStatus: 'completed' | 'in_progress' | 'revision_needed' | 'draft';
  progressPercentage: number;
  steps: TimelineStep[];
}

export interface Core {
  id: string;
  title: string;
  category: string;
  director: string; // نام مدیر هسته
  secretary: string; // دبیر هسته
  members: string[];
  description: string;
  establishedYear: string;
  location: string;
  projectsCount: number;
  activeProjects: Project[];
  color: string;
  iconName: string;
}

export type ActivityCategory = 'group_support' | 'sessions' | 'classes';

export interface Activity {
  id: string;
  category: ActivityCategory;
  title: string;
  speakerOrMentor: string;
  date: string;
  time: string;
  location: string;
  capacity?: number;
  registeredCount?: number;
  description: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  tags: string[];
  supportAmount?: string; // برای حمایت از گروه
  supportType?: string;
}

export interface SideActivity {
  id: string;
  title: string;
  type: 'conference' | 'competition' | 'visit' | 'workshop' | 'exhibition';
  organizer: string;
  date: string;
  location: string;
  summary: string;
  registrationOpen: boolean;
  audience: string;
  imageUrl?: string;
}

export type DeliverableStatus = 'pending' | 'submitted' | 'approved' | 'revision_needed';

export interface DeliverableRequest {
  id: string;
  projectId: string;
  projectCode: string;
  projectTitle: string;
  studentLead: string;
  stepId: number; // گام ۱ تا ۷
  stepTitle: string;
  title: string; // عنوان مدرک یا گزارش خواسته شده
  description: string; // توضیحات و شرایط تحویل
  deadline: string; // موعد ارسال
  status: DeliverableStatus;
  requestedBy: string; // دبیرخانه / ناظر علمی / مدیر
  requestedAt: string;
  priority: 'urgent' | 'high' | 'normal';
  submissionNotes?: string;
  submissionAttachment?: Attachment;
  submittedAt?: string;
  feedbackComment?: string;
  evaluatedAt?: string;
  evaluatorName?: string;
}
