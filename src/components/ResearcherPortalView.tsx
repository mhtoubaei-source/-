import React, { useState, useRef } from 'react';
import {
  FileText, Upload, Clock, CheckCircle2, AlertTriangle, Send,
  Calendar, ArrowLeft, Paperclip, Sparkles, Filter, Eye, Check,
  Search, Info, Shield, HelpCircle, ChevronRight
} from 'lucide-react';
import { Project, DeliverableRequest, StudentProfile, Attachment } from '../types';

interface ResearcherPortalViewProps {
  projects: Project[];
  deliverables: DeliverableRequest[];
  currentStudent: StudentProfile;
  onSelectProject: (project: Project) => void;
  onSubmitDeliverable: (
    deliverableId: string | null,
    projectId: string,
    stepId: number,
    title: string,
    notes: string,
    file: { name: string; size: string; type: string }
  ) => void;
  onNavigateToProjects: () => void;
}

export const ResearcherPortalView: React.FC<ResearcherPortalViewProps> = ({
  projects,
  deliverables,
  currentStudent,
  onSelectProject,
  onSubmitDeliverable,
  onNavigateToProjects
}) => {
  // Filter deliverables belonging to this student or this student's core projects
  const studentProjects = projects.filter(
    p => p.studentLead === currentStudent.name || 
         p.members.some(m => m.includes(currentStudent.name)) ||
         p.coreId === currentStudent.coreId
  );

  // Fallback to all projects if specific matching not found
  const accessibleProjects = studentProjects.length > 0 ? studentProjects : projects;

  const [deliverableFilter, setDeliverableFilter] = useState<'all' | 'action_needed' | 'submitted' | 'approved'>('all');
  const [selectedProjectIdForForm, setSelectedProjectIdForForm] = useState<string>(
    accessibleProjects[0]?.id || ''
  );
  const [selectedStepIdForForm, setSelectedStepIdForForm] = useState<number>(3);
  const [linkedDeliverableId, setLinkedDeliverableId] = useState<string | null>(null);
  const [submissionTitle, setSubmissionTitle] = useState('');
  const [submissionNotes, setSubmissionNotes] = useState('');
  const [attachedFile, setAttachedFile] = useState<{ name: string; size: string; type: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [lastSubmissionId, setLastSubmissionId] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Deliverables filtering
  const studentDeliverables = deliverables.filter(d => 
    d.studentLead === currentStudent.name ||
    accessibleProjects.some(p => p.id === d.projectId)
  );

  const filteredDeliverables = studentDeliverables.filter(d => {
    if (deliverableFilter === 'action_needed') {
      return d.status === 'pending' || d.status === 'revision_needed';
    }
    if (deliverableFilter === 'submitted') {
      return d.status === 'submitted';
    }
    if (deliverableFilter === 'approved') {
      return d.status === 'approved';
    }
    return true;
  });

  // Action needed count
  const actionNeededCount = studentDeliverables.filter(
    d => d.status === 'pending' || d.status === 'revision_needed'
  ).length;

  const handleTriggerQuickSubmission = (deliv: DeliverableRequest) => {
    setSelectedProjectIdForForm(deliv.projectId);
    setSelectedStepIdForForm(deliv.stepId);
    setLinkedDeliverableId(deliv.id);
    setSubmissionTitle(`ارسال: ${deliv.title}`);
    setSubmissionNotes('');
    
    // Scroll down to submission form
    const formElement = document.getElementById('deliverable-submission-card');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const sizeInMb = (file.size / (1024 * 1024)).toFixed(1);
      setAttachedFile({
        name: file.name,
        size: `${sizeInMb} مگابایت`,
        type: file.type || 'application/octet-stream'
      });
    }
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submissionTitle.trim()) return;

    setIsSubmitting(true);

    const filePayload = attachedFile || {
      name: `مدرک_تکمیلی_${currentStudent.name.replace(/\s+/g, '_')}.pdf`,
      size: '۲.۴ مگابایت',
      type: 'application/pdf'
    };

    setTimeout(() => {
      onSubmitDeliverable(
        linkedDeliverableId,
        selectedProjectIdForForm,
        selectedStepIdForForm,
        submissionTitle.trim(),
        submissionNotes.trim(),
        filePayload
      );

      setIsSubmitting(false);
      setShowSuccessToast(true);
      setLastSubmissionId(`SUB-${Math.floor(100000 + Math.random() * 900000)}`);
      
      // Reset form
      setSubmissionTitle('');
      setSubmissionNotes('');
      setAttachedFile(null);
      setLinkedDeliverableId(null);

      setTimeout(() => setShowSuccessToast(false), 5000);
    }, 600);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner - Researcher Portal */}
      <div className="bg-gradient-to-l from-slate-900 via-slate-850 to-blue-950 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2.5 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                میز کار اختصاصی پژوهشگر
              </span>
              <span className="text-xs text-slate-400 font-medium">
                کاربر فعال: <strong className="text-white">{currentStudent.name}</strong> ({currentStudent.roleInCore})
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight leading-snug">
              پژوهش‌های من و ارسال آسان مدارک
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed text-justify">
              در این سامانه می‌توانید مدارک، فایل‌های پروپوزال و گزارش‌های پیشرفتی که مرکز از شما درخواست کرده را به سادگی ارسال نموده و وضعیت دقیق بررسی و نمرات هیئت داوران را به صورت زنده رصد کنید.
            </p>
          </div>

          {/* Quick Stat Pill */}
          <div className="bg-slate-800/80 backdrop-blur-sm p-4 rounded-2xl border border-slate-700/80 shrink-0 flex items-center gap-4">
            <div className="text-center px-2">
              <div className="text-2xl font-black text-amber-400 font-mono">{actionNeededCount}</div>
              <div className="text-[11px] text-slate-300 mt-0.5 font-medium">اقدام فوری / در انتظار ارسال</div>
            </div>
            <div className="h-8 w-px bg-slate-700"></div>
            <div className="text-center px-2">
              <div className="text-2xl font-black text-blue-400 font-mono">{accessibleProjects.length}</div>
              <div className="text-[11px] text-slate-300 mt-0.5 font-medium">طرح‌های در دست اجرا</div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Notification Alert */}
      {showSuccessToast && (
        <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex items-center justify-between gap-3 shadow-xs animate-in slide-in-from-top-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
              <Check className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-emerald-900">
                مدرک و گزارش شما با موفقیت برای مرکز ارسال شد!
              </div>
              <div className="text-[11px] text-emerald-700 mt-0.5 font-mono">
                کد رهگیری دبیرخانه: {lastSubmissionId} — پرونده جهت بررسی و اعلام نظر در کارتابل ارزیابان مرکز قرار گرفت.
              </div>
            </div>
          </div>
          <button 
            onClick={() => setShowSuccessToast(false)}
            className="text-emerald-700 hover:text-emerald-900 p-1 rounded-lg text-xs font-bold"
          >
            بستن
          </button>
        </div>
      )}

      {/* Grid: Left Column = Checklist of What the Center Wants / Right Column = Fast Submission Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
        {/* RIGHT (or main in RTL): SECTION 1: WHAT THE CENTER WANTS FROM YOU (۷ کولم) */}
        <div className="lg:col-span-7 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold shadow-2xs">
                <AlertTriangle className="w-4 h-4 text-amber-700" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                  چیزهایی که مرکز از شما خواسته است
                </h2>
                <p className="text-[11px] text-slate-500 font-medium">
                  مدارک، فرم‌ها، گزارش‌های دوره‌ای و اصلاحیه‌های ضروری برای پیشرفت طرح
                </p>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/80 text-xs">
              <button
                onClick={() => setDeliverableFilter('all')}
                className={`px-2.5 py-1 rounded-lg font-bold transition ${
                  deliverableFilter === 'all' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                همه ({studentDeliverables.length})
              </button>
              <button
                onClick={() => setDeliverableFilter('action_needed')}
                className={`px-2.5 py-1 rounded-lg font-bold transition flex items-center gap-1 ${
                  deliverableFilter === 'action_needed' ? 'bg-white text-amber-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                اقدام فوری ({actionNeededCount})
              </button>
              <button
                onClick={() => setDeliverableFilter('submitted')}
                className={`px-2.5 py-1 rounded-lg font-bold transition ${
                  deliverableFilter === 'submitted' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                در انتظار بررسی
              </button>
              <button
                onClick={() => setDeliverableFilter('approved')}
                className={`px-2.5 py-1 rounded-lg font-bold transition ${
                  deliverableFilter === 'approved' ? 'bg-white text-emerald-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                تأییدشده
              </button>
            </div>
          </div>

          {/* List of Requested Deliverables */}
          <div className="space-y-3.5">
            {filteredDeliverables.length === 0 ? (
              <div className="bg-white p-8 rounded-2xl border border-slate-200/80 text-center space-y-3 shadow-2xs">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                <div className="text-sm font-bold text-slate-800">هیچ درخواست مدارکی در این فیلتر وجود ندارد</div>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  تمامی تکالیف ارسالی شما به‌روز هستند یا در این دسته‌بندی موردی ثبت نشده است.
                </p>
              </div>
            ) : (
              filteredDeliverables.map((deliv) => {
                const isUrgent = deliv.priority === 'urgent' || deliv.status === 'revision_needed';
                const isPending = deliv.status === 'pending';
                const isRevision = deliv.status === 'revision_needed';
                const isSubmitted = deliv.status === 'submitted';
                const isApproved = deliv.status === 'approved';

                return (
                  <div
                    key={deliv.id}
                    className={`bg-white rounded-2xl p-4 sm:p-5 border transition-all shadow-2xs hover:shadow-xs space-y-3.5 ${
                      isRevision 
                        ? 'border-amber-300 bg-amber-50/20' 
                        : isPending && isUrgent
                        ? 'border-blue-300 bg-blue-50/15'
                        : isSubmitted
                        ? 'border-indigo-200'
                        : isApproved
                        ? 'border-emerald-200 bg-emerald-50/15'
                        : 'border-slate-200/80'
                    }`}
                  >
                    {/* Card Top: Tags, Status, Deadline */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="font-mono font-bold px-2 py-0.5 bg-slate-100 text-slate-700 rounded-lg border border-slate-200">
                          {deliv.projectCode}
                        </span>
                        <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-lg font-bold border border-blue-100">
                          {deliv.stepTitle}
                        </span>
                        {isUrgent && (
                          <span className="px-2 py-0.5 bg-rose-50 text-rose-700 rounded-lg font-bold border border-rose-200 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-600"></span>
                            اولویت فوری
                          </span>
                        )}
                      </div>

                      {/* Status Badges */}
                      <div>
                        {isRevision && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                            نیازمند اصلاحیه
                          </span>
                        )}
                        {isPending && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-900 border border-blue-300">
                            <Clock className="w-3.5 h-3.5 text-blue-600" />
                            در انتظار ارسال مدرک
                          </span>
                        )}
                        {isSubmitted && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-900 border border-indigo-300">
                            <Clock className="w-3.5 h-3.5 text-indigo-600" />
                            ارسال شده (در دست بررسی شورا)
                          </span>
                        )}
                        {isApproved && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            مدرک تایید شد
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Title & Description */}
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                        {deliv.title}
                      </h3>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed text-justify">
                        {deliv.description}
                      </p>
                    </div>

                    {/* Feedback / Reviewer Note Callout if Revision is needed */}
                    {deliv.feedbackComment && (
                      <div className="bg-amber-100/70 border border-amber-300/80 p-3 rounded-xl text-xs text-amber-950 space-y-1">
                        <div className="font-bold flex items-center gap-1 text-amber-900">
                          <Info className="w-3.5 h-3.5" />
                          نظر و خواسته دقیق داور / ارزیاب مرکز:
                        </div>
                        <p className="leading-relaxed font-medium pr-4">
                          {deliv.feedbackComment}
                        </p>
                      </div>
                    )}

                    {/* If Already Submitted Attachment Preview */}
                    {deliv.submissionAttachment && (
                      <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2 overflow-hidden">
                          <Paperclip className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span className="font-bold text-slate-800 truncate font-mono">
                            {deliv.submissionAttachment.name}
                          </span>
                          <span className="text-[10px] text-slate-400">({deliv.submissionAttachment.size})</span>
                        </div>
                        <span className="text-[11px] text-slate-500 font-sans shrink-0">
                          ارسال‌شده در {deliv.submittedAt}
                        </span>
                      </div>
                    )}

                    {/* Card Footer: Requested by, Deadline & Action Button */}
                    <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div className="flex flex-wrap items-center gap-3 text-slate-500">
                        <span className="flex items-center gap-1">
                          <Shield className="w-3.5 h-3.5 text-slate-400" />
                          درخواست‌کننده: <strong className="text-slate-700">{deliv.requestedBy}</strong>
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-blue-500" />
                          مهلت تحویل: <strong className="text-slate-800 font-mono">{deliv.deadline}</strong>
                        </span>
                      </div>

                      {/* Button to quickly trigger submission */}
                      {(isPending || isRevision) && (
                        <button
                          onClick={() => handleTriggerQuickSubmission(deliv)}
                          className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs shrink-0 text-xs"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>ارسال مدرک و گزارش</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* LEFT (or sidebar in RTL): SECTION 2: FAST DELIVERABLE SUBMISSION FORM (۵ کولم) */}
        <div className="lg:col-span-5 space-y-6">
          <div
            id="deliverable-submission-card"
            className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-md space-y-4 sticky top-24"
          >
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-xs">
                <Send className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900 tracking-tight">
                  فرم ارسال آسان مدارک به مرکز
                </h3>
                <p className="text-[11px] text-slate-500 font-medium">
                  فایل، پروپوزال یا گزارش پیشرفت خود را بارگذاری کنید
                </p>
              </div>
            </div>

            {/* If linked to a specific deliverable */}
            {linkedDeliverableId && (
              <div className="p-2.5 bg-blue-50/80 border border-blue-200 rounded-xl text-xs flex items-center justify-between gap-2">
                <span className="text-blue-900 font-medium truncate">
                  در حال پاسخ به درخواست شماره: <strong>{linkedDeliverableId}</strong>
                </span>
                <button
                  type="button"
                  onClick={() => setLinkedDeliverableId(null)}
                  className="text-blue-600 hover:text-blue-800 text-[11px] font-bold underline cursor-pointer"
                >
                  لغو پیوند
                </button>
              </div>
            )}

            <form onSubmit={handleSubmitForm} className="space-y-4">
              {/* Project Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  انتخاب پروژه پژوهشی مربوطه:
                </label>
                <select
                  value={selectedProjectIdForForm}
                  onChange={(e) => setSelectedProjectIdForForm(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-hidden transition"
                >
                  {accessibleProjects.map((p) => (
                    <option key={p.id} value={p.id}>
                      [{p.code}] {p.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Step Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  مرحله یا گام پژوهشی:
                </label>
                <select
                  value={selectedStepIdForForm}
                  onChange={(e) => setSelectedStepIdForForm(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-hidden transition"
                >
                  <option value={1}>گام ۱: انتخاب و تبیین مسئله</option>
                  <option value={2}>گام ۲: ارائه پروپوزال به مرکز</option>
                  <option value={3}>گام ۳: ارزیابی اولیه و اصلاحیه داوری</option>
                  <option value={4}>گام ۴: تاییدیه نهایی و قرارداد</option>
                  <option value={5}>گام ۵: ارزیابی اول (گزارش فاز ۱)</option>
                  <option value={6}>گام ۶: ارزیابی دوم (گزارش فاز ۲)</option>
                  <option value={7}>گام ۷: ارزیابی نهایی، دفاع و خاتمه</option>
                </select>
              </div>

              {/* Title of Submission */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  عنوان مدرک یا گزارش ارسالی:
                </label>
                <input
                  type="text"
                  required
                  placeholder="مثال: گزارش پیشرفت فاز دوم همراه با جدول تحلیل آماری..."
                  value={submissionTitle}
                  onChange={(e) => setSubmissionTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-hidden transition"
                />
              </div>

              {/* File Attachment Drop Area */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  فایل ضمیمه (PDF, Word, Excel, ZIP):
                </label>
                
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />

                {attachedFile ? (
                  <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <Paperclip className="w-4 h-4 text-blue-600 shrink-0" />
                      <div className="truncate">
                        <div className="font-bold text-slate-800 truncate font-mono">{attachedFile.name}</div>
                        <div className="text-[10px] text-slate-500">{attachedFile.size}</div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setAttachedFile(null)}
                      className="text-rose-600 hover:text-rose-800 text-xs font-bold px-2 py-1 cursor-pointer"
                    >
                      تغییر فایل
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-slate-300 hover:border-blue-500 bg-slate-50/60 hover:bg-blue-50/30 p-4 rounded-xl text-center cursor-pointer transition space-y-1.5"
                  >
                    <Upload className="w-6 h-6 text-slate-400 mx-auto" />
                    <div className="text-xs font-bold text-slate-700">
                      کلیک کنید یا فایل را به اینجا بکشید
                    </div>
                    <div className="text-[10px] text-slate-400">
                      حداکثر حجم مجاز: ۵۰ مگابایت
                    </div>
                  </div>
                )}
              </div>

              {/* Notes to Evaluator */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  توضیحات و پیام پژوهشگر به داوران مرکز:
                </label>
                <textarea
                  rows={3}
                  placeholder="نکات تکمیلی، پاسخ به سوالات داوری، یا توضیحات درباره داده‌ها..."
                  value={submissionNotes}
                  onChange={(e) => setSubmissionNotes(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-hidden transition"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || !submissionTitle.trim()}
                className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>در حال ارسال به دبیرخانه...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>ثبت رسمی و ارسال به مرکز</span>
                  </>
                )}
              </button>

              <div className="text-[10px] text-slate-400 text-center leading-relaxed">
                مدارک بلافاصله پس از ثبت در کارتابل داوران قرار گرفته و اعلان دریافت در سوابق طرح ثبت می‌گردد.
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* SECTION 3: LIVE STATUS TRACKER OF MY PROJECTS */}
      <div className="space-y-4 pt-4 border-t border-slate-200/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold shadow-2xs">
              <Sparkles className="w-4 h-4 text-emerald-700" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                رصد و پایش وضعیت زنده پروژه‌های من
              </h2>
              <p className="text-[11px] text-slate-500 font-medium">
                پیشرفت گام‌به‌گام در تایملاین ۷ مرحله‌ای، امتیازات ثبت‌شده و آرشیو مصوبات
              </p>
            </div>
          </div>

          <button
            onClick={onNavigateToProjects}
            className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1 cursor-pointer"
          >
            <span>مشاهده همه پروژه‌های هسته‌ها</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {accessibleProjects.map((prj) => {
            const currentStep = prj.steps[prj.currentStepIndex] || prj.steps[0];
            const hasPendingFeedback = prj.overallStatus === 'revision_needed';

            return (
              <div
                key={prj.id}
                className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  {/* Top Bar */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
                      {prj.code}
                    </span>

                    {/* Progress percentage */}
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-slate-500 font-medium">پیشرفت کل:</span>
                      <span className="text-sm font-mono font-extrabold text-blue-600">
                        {prj.progressPercentage}٪
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-sm font-bold text-slate-900 leading-snug line-clamp-2">
                    {prj.title}
                  </h3>

                  {/* Current Active Step Banner */}
                  <div className={`p-3 rounded-xl border text-xs space-y-1 ${
                    hasPendingFeedback
                      ? 'bg-amber-50 border-amber-200 text-amber-900'
                      : 'bg-blue-50/60 border-blue-200 text-blue-900'
                  }`}>
                    <div className="font-bold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                      گام فعلی: گام {currentStep.id} از ۷ ({currentStep.shortTitle})
                    </div>
                    <div className="text-[11px] text-slate-600 font-medium pr-3.5">
                      {currentStep.description}
                    </div>
                  </div>

                  {/* 7-Step Mini Progress Pipeline Visual */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>خط زمانی گام‌ها:</span>
                      <span>گام {currentStep.id} فعال است</span>
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                      {prj.steps.map((st, i) => {
                        const isDone = st.status === 'completed';
                        const isRev = st.status === 'revision_needed';
                        const isCur = i === prj.currentStepIndex;

                        return (
                          <div
                            key={st.id}
                            title={`گام ${st.id}: ${st.shortTitle} (${st.status})`}
                            className={`h-2 rounded-full transition-all ${
                              isDone
                                ? 'bg-emerald-500'
                                : isRev
                                ? 'bg-amber-500'
                                : isCur
                                ? 'bg-blue-600 ring-2 ring-blue-200'
                                : 'bg-slate-200'
                            }`}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Bottom Action: Open Interactive Modal */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-[11px] text-slate-500">
                    مدیر هسته: <strong className="text-slate-700">{prj.manager}</strong>
                  </div>

                  <button
                    onClick={() => onSelectProject(prj)}
                    className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>مشاهده تایملاین تفصیلی ۷ مرحله‌ای</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
