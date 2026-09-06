import React, { useState } from 'react';
import {
  X, CheckCircle2, Clock, Lock, AlertTriangle, Upload, Download, Trash2,
  FileText, ArrowRight, ArrowLeft, Shield, User, Award,
  Check, Calendar, Hash, Paperclip, MessageSquare, PlusCircle
} from 'lucide-react';
import { Project, TimelineStep, UserRole, Attachment, StepStatus } from '../types';

interface TimelineModalProps {
  project: Project | null;
  role: UserRole;
  currentStudentName?: string;
  onClose: () => void;
  onUpdateProject: (updatedProject: Project) => void;
}

export const TimelineModal: React.FC<TimelineModalProps> = ({
  project,
  role,
  currentStudentName = 'محمدحسین حسینی',
  onClose,
  onUpdateProject,
}) => {
  if (!project) return null;

  const [activeStepIndex, setActiveStepIndex] = useState<number>(project.currentStepIndex || 0);
  const [newCommentText, setNewCommentText] = useState('');
  const [isEditingProblem, setIsEditingProblem] = useState(false);
  const [tempProblemTitle, setTempProblemTitle] = useState(project.steps[0]?.problemTitle || '');
  const [tempProblemDesc, setTempProblemDesc] = useState(project.steps[0]?.problemStatement || '');
  const [tempIsDefined, setTempIsDefined] = useState(project.steps[0]?.isProblemDefined ?? true);
  
  // Admin evaluation form states
  const [adminEvalStatus, setAdminEvalStatus] = useState<'approved' | 'rejected' | 'revision_needed'>('approved');
  const [adminEvalComment, setAdminEvalComment] = useState('');
  const [adminScore, setAdminScore] = useState<number>(90);
  const [newPhaseStageTitle, setNewPhaseStageTitle] = useState('');

  const currentStep = project.steps[activeStepIndex];
  const isAdmin = role === 'admin';

  const getStatusBadge = (status: StepStatus) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            تکمیل‌شده
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
            <Clock className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
            در حال انجام
          </span>
        );
      case 'revision_needed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            نیازمند اصلاح
          </span>
        );
      case 'locked':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
            <Lock className="w-3.5 h-3.5 text-slate-400" />
            در انتظار / قفل
          </span>
        );
    }
  };

  const handleStepStatusChange = (newStatus: StepStatus) => {
    if (!isAdmin) return;
    const updatedSteps = [...project.steps];
    updatedSteps[activeStepIndex] = {
      ...updatedSteps[activeStepIndex],
      status: newStatus,
      lastUpdated: 'امروز (توسط مدیر)'
    };

    // calculate progress
    const completedCount = updatedSteps.filter(s => s.status === 'completed').length;
    const progress = Math.round((completedCount / updatedSteps.length) * 100);

    onUpdateProject({
      ...project,
      steps: updatedSteps,
      progressPercentage: progress,
      currentStepIndex: newStatus === 'completed' && activeStepIndex < 6 ? activeStepIndex + 1 : activeStepIndex
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const newAttachment: Attachment = {
      id: 'att-' + Date.now(),
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(1)} مگابایت`,
      uploadedBy: isAdmin ? 'مدیر سیستم' : `${currentStudentName} (دانشجو)`,
      uploadedAt: 'همین الان',
      fileType: file.type || 'application/octet-stream'
    };

    const updatedSteps = [...project.steps];
    const currentAttachments = updatedSteps[activeStepIndex].attachments || [];
    updatedSteps[activeStepIndex] = {
      ...updatedSteps[activeStepIndex],
      attachments: [newAttachment, ...currentAttachments],
      lastUpdated: 'امروز'
    };

    onUpdateProject({
      ...project,
      steps: updatedSteps
    });

    e.target.value = '';
  };

  const handleDeleteAttachment = (attId: string) => {
    const updatedSteps = [...project.steps];
    const filtered = (updatedSteps[activeStepIndex].attachments || []).filter(a => a.id !== attId);
    updatedSteps[activeStepIndex] = {
      ...updatedSteps[activeStepIndex],
      attachments: filtered
    };
    onUpdateProject({
      ...project,
      steps: updatedSteps
    });
  };

  const handleDownloadAttachment = (att: Attachment) => {
    // Create simulated file download
    const content = `گزارش و مستندات طرح: ${project.title}\nمرحله: ${currentStep.title}\nنام فایل: ${att.name}\nبارگذاری توسط: ${att.uploadedBy}\nتاریخ: ${att.uploadedAt}`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = att.name.endsWith('.pdf') || att.name.endsWith('.docx') ? att.name : `${att.name}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSaveProblemEdit = () => {
    const updatedSteps = [...project.steps];
    updatedSteps[0] = {
      ...updatedSteps[0],
      problemTitle: tempProblemTitle,
      problemStatement: tempProblemDesc,
      isProblemDefined: tempIsDefined,
      lastUpdated: 'امروز'
    };
    onUpdateProject({
      ...project,
      steps: updatedSteps
    });
    setIsEditingProblem(false);
  };

  const handleAddComment = () => {
    if (!newCommentText.trim()) return;
    const authorRole = isAdmin ? 'مدیر ارشد مرکز' : `${currentStudentName} (عضو هسته)`;
    const updatedSteps = [...project.steps];
    const existingNotes = updatedSteps[activeStepIndex].notes || '';
    const newEntry = `[${authorRole}]: ${newCommentText.trim()}`;
    
    updatedSteps[activeStepIndex] = {
      ...updatedSteps[activeStepIndex],
      notes: existingNotes ? `${existingNotes}\n${newEntry}` : newEntry,
      lastUpdated: 'امروز'
    };

    onUpdateProject({
      ...project,
      steps: updatedSteps
    });
    setNewCommentText('');
  };

  const handleAddAdditionalStage = () => {
    if (!newPhaseStageTitle.trim()) return;
    const updatedSteps = [...project.steps];
    const currentList = updatedSteps[6].additionalStages || [];
    updatedSteps[6] = {
      ...updatedSteps[6],
      additionalStages: [
        ...currentList,
        {
          title: newPhaseStageTitle.trim(),
          date: '۱۴۰۴',
          status: 'برنامه‌ریزی‌شده',
          notes: 'ثبت‌شده در شورای پژوهش'
        }
      ]
    };
    onUpdateProject({
      ...project,
      steps: updatedSteps
    });
    setNewPhaseStageTitle('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-950/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div 
        id="project-timeline-modal"
        className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl border border-slate-200/90 overflow-hidden flex flex-col my-auto max-h-[92vh]"
      >
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800">
          <div className="space-y-1.5 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-lg bg-slate-800 text-blue-300 text-xs font-mono font-bold border border-slate-700">
                {project.code}
              </span>
              <span className="text-xs text-slate-400">
                تاریخ شروع: {project.startDate} | مهلت: {project.targetEndDate}
              </span>
              {getStatusBadge(currentStep.status)}
            </div>
            <h2 className="text-lg sm:text-xl font-black text-white leading-snug tracking-tight">
              {project.title}
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-1">
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-blue-400" />
                مدیر هسته: <strong className="text-white">{project.manager}</strong>
              </span>
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-emerald-400" />
                مسئول دانشجویی: <strong className="text-white">{project.studentLead}</strong>
              </span>
              <span className="text-slate-400">
                اعضا: {project.members.join('، ')}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end md:self-center">
            {/* Progress metric */}
            <div className="text-left bg-slate-800/90 px-4 py-2 rounded-xl border border-slate-700/80 hidden sm:block">
              <div className="text-xs text-slate-400">پیشرفت کل پروژه</div>
              <div className="text-lg font-extrabold text-blue-400 font-mono">
                {project.progressPercentage}٪
              </div>
            </div>

            <button
              id="close-timeline-modal-btn"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
              title="بستن پنجره"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stepper Navigation (Horizontal Scrolling Bar) */}
        <div className="bg-slate-100/90 border-b border-slate-200/80 px-4 py-2.5 overflow-x-auto">
          <div className="flex items-center justify-between min-w-[700px] gap-2">
            {project.steps.map((step, idx) => {
              const isActive = idx === activeStepIndex;
              const isDone = step.status === 'completed';
              const isRevision = step.status === 'revision_needed';
              const isProgress = step.status === 'in_progress';

              return (
                <button
                  key={step.id}
                  id={`step-tab-${step.id}`}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`flex-1 flex flex-col items-center p-2 rounded-xl transition-all text-center relative cursor-pointer ${
                    isActive 
                      ? 'bg-white shadow-2xs ring-1 ring-slate-300 border border-slate-200/80' 
                      : 'hover:bg-slate-200/50'
                  }`}
                >
                  <div className="flex items-center justify-center mb-1">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                      isDone 
                        ? 'bg-emerald-600 text-white shadow-2xs' 
                        : isRevision
                        ? 'bg-amber-500 text-white shadow-2xs'
                        : isProgress
                        ? 'bg-blue-600 text-white ring-3 ring-blue-100 shadow-2xs'
                        : 'bg-slate-300 text-slate-600'
                    }`}>
                      {isDone ? <Check className="w-3.5 h-3.5" /> : step.id}
                    </div>
                  </div>
                  <span className={`text-xs font-bold leading-tight line-clamp-1 ${
                    isActive ? 'text-blue-900 font-extrabold' : 'text-slate-700'
                  }`}>
                    {step.title}
                  </span>
                  <span className="text-[10px] text-slate-500 mt-0.5">
                    {step.status === 'completed' ? 'تکمیل' : step.status === 'in_progress' ? 'جاری' : step.status === 'revision_needed' ? 'اصلاح' : 'در انتظار'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step Body Content Area */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {/* Step Header with Title and Status Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200/80">
            <div>
              <div className="text-xs text-blue-600 font-bold mb-1">
                گام {currentStep.id} از ۷: {currentStep.shortTitle}
              </div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                {currentStep.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                {currentStep.description}
              </p>
            </div>

            {/* Admin Quick Status Control */}
            {isAdmin ? (
              <div className="bg-slate-50/80 p-2.5 rounded-xl border border-slate-200/80 flex flex-wrap items-center gap-1.5 shrink-0 shadow-2xs">
                <span className="text-xs font-semibold text-slate-700">وضعیت گام:</span>
                <button
                  onClick={() => handleStepStatusChange('completed')}
                  className={`px-2.5 py-1 text-xs rounded-lg font-medium transition cursor-pointer ${
                    currentStep.status === 'completed' 
                      ? 'bg-emerald-600 text-white shadow-2xs' 
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-emerald-50'
                  }`}
                >
                  تکمیل شد
                </button>
                <button
                  onClick={() => handleStepStatusChange('in_progress')}
                  className={`px-2.5 py-1 text-xs rounded-lg font-medium transition cursor-pointer ${
                    currentStep.status === 'in_progress' 
                      ? 'bg-blue-600 text-white shadow-2xs' 
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-blue-50'
                  }`}
                >
                  در حال اجرا
                </button>
                <button
                  onClick={() => handleStepStatusChange('revision_needed')}
                  className={`px-2.5 py-1 text-xs rounded-lg font-medium transition cursor-pointer ${
                    currentStep.status === 'revision_needed' 
                      ? 'bg-amber-600 text-white shadow-2xs' 
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-amber-50'
                  }`}
                >
                  نیازمند اصلاح
                </button>
                <button
                  onClick={() => handleStepStatusChange('locked')}
                  className={`px-2.5 py-1 text-xs rounded-lg font-medium transition cursor-pointer ${
                    currentStep.status === 'locked' 
                      ? 'bg-slate-600 text-white shadow-2xs' 
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  قفل
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">وضعیت دسترسی: دانشجو (مشاهده و بارگذاری گزارش)</span>
              </div>
            )}
          </div>

          {/* STEP SPECIFIC CONTENT BLOCKS */}

          {/* 1. انتخاب مسئله */}
          {currentStep.id === 1 && (
            <div className="bg-slate-50/70 rounded-2xl p-5 border border-slate-200/80 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-800 text-sm">وضعیت تبیین مسئله:</span>
                  {currentStep.isProblemDefined ? (
                    <span className="inline-flex items-center gap-1 text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-full font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      مسئله کاملاً مشخص و تثبیت‌شده است
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-0.5 rounded-full font-medium">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                      مسئله هنوز تدوین نهایی نشده است
                    </span>
                  )}
                </div>

                {/* Edit toggle button */}
                {(isAdmin || (role === 'student' && currentStep.status !== 'completed')) && (
                  <button
                    onClick={() => {
                      setIsEditingProblem(!isEditingProblem);
                      setTempProblemTitle(currentStep.problemTitle || '');
                      setTempProblemDesc(currentStep.problemStatement || '');
                      setTempIsDefined(currentStep.isProblemDefined ?? true);
                    }}
                    className="text-xs text-blue-600 hover:text-blue-800 font-semibold cursor-pointer"
                  >
                    {isEditingProblem ? 'انصراف از ویرایش' : 'ویرایش متن مسئله'}
                  </button>
                )}
              </div>

              {isEditingProblem ? (
                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      عنوان دقیق مسئله:
                    </label>
                    <input
                      type="text"
                      value={tempProblemTitle}
                      onChange={(e) => setTempProblemTitle(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-hidden transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      شرح جامع مسئله و ضرورت تربیتی-پژوهشی:
                    </label>
                    <textarea
                      rows={4}
                      value={tempProblemDesc}
                      onChange={(e) => setTempProblemDesc(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-hidden transition"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="isDefinedCheck"
                      checked={tempIsDefined}
                      onChange={(e) => setTempIsDefined(e.target.checked)}
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="isDefinedCheck" className="text-xs text-slate-700">
                      نشانه‌گذاری به عنوان مسئله تاییدشده و مشخص
                    </label>
                  </div>
                  <button
                    onClick={handleSaveProblemEdit}
                    className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 cursor-pointer shadow-xs"
                  >
                    ذخیره تغییرات مسئله
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
                    <div className="text-xs text-slate-500 font-semibold mb-1">عنوان مسئله ثبت‌شده:</div>
                    <div className="text-sm font-bold text-slate-800">
                      {currentStep.problemTitle || 'عنوانی برای مسئله تعیین نشده است.'}
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
                    <div className="text-xs text-slate-500 font-semibold mb-1">شرح دقیق و ضرورت پژوهش:</div>
                    <div className="text-sm text-slate-700 leading-relaxed font-normal">
                      {currentStep.problemStatement || 'شرح مسئله ثبت نشده است.'}
                    </div>
                  </div>
                  {currentStep.keywords && currentStep.keywords.length > 0 && (
                    <div className="flex items-center gap-2 flex-wrap pt-1">
                      <span className="text-xs text-slate-500 font-medium">کلیدواژه‌ها:</span>
                      {currentStep.keywords.map((kw, i) => (
                        <span key={i} className="px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded text-xs">
                          {kw}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* 2. ارائه به مرکز */}
          {currentStep.id === 2 && (
            <div className="bg-slate-50/70 rounded-2xl p-5 border border-slate-200/80 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
                  <div className="text-xs text-slate-500 font-medium mb-1">وضعیت ارسال به مرکز</div>
                  <div className="flex items-center gap-2 mt-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm font-bold text-slate-800">
                      {currentStep.isSubmittedToCenter ? 'فرم و مدارک ارسال شد' : 'در انتظار ارسال'}
                    </span>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
                  <div className="text-xs text-slate-500 font-medium mb-1">تاریخ رسمی تحویل</div>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-bold text-slate-800">
                      {currentStep.submissionDate || 'ثبت‌نشده'}
                    </span>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
                  <div className="text-xs text-slate-500 font-medium mb-1">قالب طرح ارائه‌شده</div>
                  <div className="text-sm font-bold text-slate-800 mt-1">
                    {currentStep.proposalType || 'پروپوزال رسمی مرکز'}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3. ارزیابی اولیه */}
          {currentStep.id === 3 && (
            <div className="bg-slate-50/70 rounded-2xl p-5 border border-slate-200/80 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-600">نتیجه داوری شورای علمی:</span>
                  {currentStep.evaluationResult === 'approved' && (
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full text-xs font-bold flex items-center gap-1 shadow-2xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      تأیید کامل شورا
                    </span>
                  )}
                  {currentStep.evaluationResult === 'revision_needed' && (
                    <span className="px-3 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-full text-xs font-bold flex items-center gap-1 shadow-2xs">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                      نیازمند اصلاح پروپوزال
                    </span>
                  )}
                  {currentStep.evaluationResult === 'rejected' && (
                    <span className="px-3 py-1 bg-rose-50 text-rose-800 border border-rose-200 rounded-full text-xs font-bold shadow-2xs">
                      رد شده
                    </span>
                  )}
                  {currentStep.evaluationResult === 'pending' && (
                    <span className="px-3 py-1 bg-blue-50 text-blue-800 border border-blue-200 rounded-full text-xs font-bold shadow-2xs">
                      در دست داوری
                    </span>
                  )}
                </div>

                <div className="text-xs text-slate-500">
                  داوران / ارزیاب: <strong className="text-slate-800">{currentStep.evaluatorName || 'شورای داوری مرکز'}</strong>
                </div>
              </div>

              {/* Feedback box */}
              <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700 mb-2">
                  <MessageSquare className="w-4 h-4 text-blue-600" />
                  باکس توضیحات و نظر ارزیاب مرکز:
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50/80 p-3 rounded-lg border border-slate-200/80 font-normal">
                  {currentStep.evaluatorComment || 'توضیحاتی از سوی ارزیاب ثبت نشده است.'}
                </p>
              </div>

              {/* Admin Evaluation Submission Form */}
              {isAdmin && (
                <div className="bg-blue-50/70 p-4 rounded-xl border border-blue-200/80 space-y-3 shadow-2xs">
                  <div className="text-xs font-bold text-blue-900">ثبت / به‌روزرسانی نظر ارزیاب توسط مدیر:</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-slate-700 mb-1 font-medium">نتیجه نهایی ارزیابی اولیه:</label>
                      <select
                        value={currentStep.evaluationResult || 'approved'}
                        onChange={(e) => {
                          const val = e.target.value as any;
                          const updatedSteps = [...project.steps];
                          updatedSteps[activeStepIndex] = {
                            ...updatedSteps[activeStepIndex],
                            evaluationResult: val,
                            status: val === 'approved' ? 'completed' : val === 'revision_needed' ? 'revision_needed' : 'in_progress'
                          };
                          onUpdateProject({ ...project, steps: updatedSteps });
                        }}
                        className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-hidden transition"
                      >
                        <option value="approved">تأیید شده (مجوز ورود به مرحله بعد)</option>
                        <option value="revision_needed">نیازمند اصلاح (ارجاع به دانشجو)</option>
                        <option value="rejected">رد طرح</option>
                        <option value="pending">در انتظار داوری</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-slate-700 mb-1 font-medium">نام ارزیاب یا شورا:</label>
                      <input
                        type="text"
                        defaultValue={currentStep.evaluatorName || 'شورای ارزیابی مرکز'}
                        onBlur={(e) => {
                          const updatedSteps = [...project.steps];
                          updatedSteps[activeStepIndex] = {
                            ...updatedSteps[activeStepIndex],
                            evaluatorName: e.target.value
                          };
                          onUpdateProject({ ...project, steps: updatedSteps });
                        }}
                        className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-hidden transition"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-700 mb-1 font-medium">متن نظر و توصیه‌های تکمیلی به پژوهشگران:</label>
                    <textarea
                      rows={3}
                      defaultValue={currentStep.evaluatorComment || ''}
                      onBlur={(e) => {
                        const updatedSteps = [...project.steps];
                        updatedSteps[activeStepIndex] = {
                          ...updatedSteps[activeStepIndex],
                          evaluatorComment: e.target.value
                        };
                        onUpdateProject({ ...project, steps: updatedSteps });
                      }}
                      placeholder="توضیحات اصلاحی یا تاییدیه..."
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-hidden transition"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 4. تأیید نهایی مرکز */}
          {currentStep.id === 4 && (
            <div className="bg-slate-50/70 rounded-2xl p-5 border border-slate-200/80 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
                  <div className="text-xs text-slate-500 font-medium mb-1">وضعیت تأیید رسمی مرکز</div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    ابلاغ قطعی و مصوب
                  </span>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
                  <div className="text-xs text-slate-500 font-medium mb-1">شماره شناسه ابلاغیه مصوب</div>
                  <div className="flex items-center gap-1.5 text-sm font-mono font-bold text-slate-800">
                    <Hash className="w-4 h-4 text-blue-600" />
                    {currentStep.approvalNumber || `مرکز/۱۴۰۳/پ/${project.code}`}
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
                  <div className="text-xs text-slate-500 font-medium mb-1">تاریخ صدور مجوز</div>
                  <div className="flex items-center gap-1.5 text-sm font-bold text-slate-800">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    {currentStep.approvalDate || '۱۴۰۳/۰۹/۱۵'}
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
                <div className="text-xs text-slate-500 font-medium mb-1">یادداشت دبیرخانه مرکز:</div>
                <div className="text-xs sm:text-sm text-slate-700">
                  {currentStep.centerNotes || 'پروژه با حمایت مالی مرکز هدایت تربیتی و تخصیص کد پژوهشی تصویب شد.'}
                </div>
              </div>
            </div>
          )}

          {/* 5 & 6. ارزیابی اول و دوم */}
          {(currentStep.id === 5 || currentStep.id === 6) && (
            <div className="bg-slate-50/70 rounded-2xl p-5 border border-slate-200/80 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="text-xs font-semibold text-blue-600">
                    {currentStep.id === 5 ? 'مرحله ارزیابی اول (گزارش پیشرفت فاز ۱)' : 'مرحله ارزیابی دوم (گزارش پیشرفت فاز ۲)'}
                  </div>
                  <h4 className="text-sm font-bold text-slate-800">
                    {currentStep.phaseTitle || `محورهای فاز ${currentStep.id === 5 ? 'اول' : 'دوم'}`}
                  </h4>
                </div>

                {currentStep.score !== undefined && (
                  <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200/80 shadow-2xs">
                    <Award className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs text-slate-600">امتیاز ارزیابی:</span>
                    <strong className="text-sm text-emerald-800 font-mono font-extrabold">{currentStep.score} از ۱۰۰</strong>
                  </div>
                )}
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs space-y-2">
                <div className="text-xs text-slate-500 font-medium">خلاصه گزارش پیشرفت ارائه شده:</div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                  {currentStep.phaseReportSummary || 'تیم پژوهشی گزارش پیشرفت و داده‌های میدانی این فاز را تدوین و ضمیمه کرده‌اند.'}
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-xs text-slate-500 font-medium">نظر ناظر علمی و ارزیاب:</div>
                  <div className="text-xs text-slate-500 font-semibold">{currentStep.phaseEvaluator || 'ناظر علمی مرکز'}</div>
                </div>
                <p className="text-xs sm:text-sm text-slate-800 bg-slate-50/80 p-3 rounded-lg border border-slate-200/80 font-normal">
                  {currentStep.phaseEvaluationComment || 'هنوز نظری برای این فاز ثبت نگردیده است.'}
                </p>
              </div>

              {/* Admin score and evaluation setter */}
              {isAdmin && (
                <div className="bg-blue-50/70 p-4 rounded-xl border border-blue-200/80 space-y-3 shadow-2xs">
                  <div className="text-xs font-bold text-blue-900">ثبت نمره و نظر داوری این فاز:</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-slate-700 mb-1 font-medium">نمره این فاز (از ۱۰۰):</label>
                      <input
                        type="number"
                        min={0}
                        max={100}
                        defaultValue={currentStep.score || 85}
                        onBlur={(e) => {
                          const updatedSteps = [...project.steps];
                          updatedSteps[activeStepIndex] = {
                            ...updatedSteps[activeStepIndex],
                            score: Number(e.target.value)
                          };
                          onUpdateProject({ ...project, steps: updatedSteps });
                        }}
                        className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-hidden transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-700 mb-1 font-medium">ناظر ارزیابی‌کننده:</label>
                      <input
                        type="text"
                        defaultValue={currentStep.phaseEvaluator || 'دکتر تقوی'}
                        onBlur={(e) => {
                          const updatedSteps = [...project.steps];
                          updatedSteps[activeStepIndex] = {
                            ...updatedSteps[activeStepIndex],
                            phaseEvaluator: e.target.value
                          };
                          onUpdateProject({ ...project, steps: updatedSteps });
                        }}
                        className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-hidden transition"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-700 mb-1 font-medium">متن نظر داوری فاز:</label>
                    <textarea
                      rows={2}
                      defaultValue={currentStep.phaseEvaluationComment || ''}
                      onBlur={(e) => {
                        const updatedSteps = [...project.steps];
                        updatedSteps[activeStepIndex] = {
                          ...updatedSteps[activeStepIndex],
                          phaseEvaluationComment: e.target.value
                        };
                        onUpdateProject({ ...project, steps: updatedSteps });
                      }}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-hidden transition"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 7. ارزیابی‌های بعدی و خاتمه پروژه */}
          {currentStep.id === 7 && (
            <div className="bg-slate-50/70 rounded-2xl p-5 border border-slate-200/80 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                    گام پایانی و صدور گواهی
                  </span>
                  <h4 className="text-sm font-bold text-slate-800">
                    فرآیند خاتمه، دفاع نهایی و مراحل تکمیلی
                  </h4>
                </div>

                <div className="flex items-center gap-2">
                  {currentStep.completionCertificateIssued ? (
                    <span className="px-3 py-1 bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs">
                      <Award className="w-4 h-4" />
                      گواهی اختتام رسمی صادر شده
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-slate-200 text-slate-700 rounded-xl text-xs font-medium">
                      در آستانه صدور گواهی
                    </span>
                  )}
                </div>
              </div>

              {/* Additional Phases & Closeout stages list */}
              <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-slate-800">مراحل تکمیلی، رویدادهای بازخورد و کاربست میدانی:</div>
                  <span className="text-xs text-slate-500">امکان ثبت اقدامات پس از خاتمه</span>
                </div>

                <div className="space-y-2">
                  {currentStep.additionalStages && currentStep.additionalStages.length > 0 ? (
                    currentStep.additionalStages.map((st, i) => (
                      <div key={i} className="flex items-start justify-between p-3 bg-slate-50/80 rounded-lg border border-slate-200/80 text-xs">
                        <div className="space-y-0.5">
                          <div className="font-bold text-slate-900 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                            {st.title}
                          </div>
                          <div className="text-slate-500">{st.notes}</div>
                        </div>
                        <div className="text-left shrink-0 font-mono">
                          <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-[11px]">
                            {st.date}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-xs text-slate-500 p-2 text-center">مرحله تکمیلی جدیدی تعریف نشده است.</div>
                  )}
                </div>

                {/* Admin Add Additional Stage */}
                {isAdmin && (
                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="text"
                      placeholder="عنوان مرحله تکمیلی (مثلاً: چاپ کتابچه یا برگزاری کارگاه مربیان)..."
                      value={newPhaseStageTitle}
                      onChange={(e) => setNewPhaseStageTitle(e.target.value)}
                      className="flex-1 px-3 py-2 text-xs bg-slate-50/80 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-hidden transition"
                    />
                    <button
                      onClick={handleAddAdditionalStage}
                      className="px-3 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 flex items-center gap-1 cursor-pointer shrink-0 shadow-xs"
                    >
                      <PlusCircle className="w-3.5 h-3.5" />
                      افزودن مرحله
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ATTACHMENTS SYSTEM (Required for all steps) */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Paperclip className="w-4 h-4 text-blue-600" />
                <h4 className="text-sm font-bold text-slate-900">
                  فایل‌های پیوست و اسناد این گام ({currentStep.attachments?.length || 0} فایل)
                </h4>
              </div>

              {/* Upload trigger button */}
              <label
                id={`upload-attachment-step-${currentStep.id}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-xs font-semibold cursor-pointer transition-colors border border-blue-200/80 shadow-2xs"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>بارگذاری فایل جدید</span>
                <input
                  type="file"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Attachment files list */}
            {currentStep.attachments && currentStep.attachments.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentStep.attachments.map((att) => (
                  <div
                    key={att.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50/80 hover:bg-slate-100/80 border border-slate-200/80 transition-all group shadow-2xs"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="p-2 bg-blue-100 text-blue-700 rounded-lg shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="overflow-hidden">
                        <div className="text-xs font-bold text-slate-800 truncate" title={att.name}>
                          {att.name}
                        </div>
                        <div className="text-[10px] text-slate-500 flex items-center gap-2 mt-0.5">
                          <span>{att.size}</span>
                          <span>•</span>
                          <span>توسط {att.uploadedBy}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0 mr-2">
                      <button
                        onClick={() => handleDownloadAttachment(att)}
                        className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-white rounded-lg transition-colors cursor-pointer"
                        title="دانلود فایل"
                      >
                        <Download className="w-4 h-4" />
                      </button>

                      {/* Delete allowed for admin or uploader */}
                      {(isAdmin || att.uploadedBy.includes(currentStudentName)) && (
                        <button
                          onClick={() => handleDeleteAttachment(att.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-white rounded-lg transition-colors cursor-pointer"
                          title="حذف فایل"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                <FileText className="w-8 h-8 text-slate-300 mx-auto mb-1.5" />
                <p className="text-xs text-slate-500">
                  هنوز فایلی برای این مرحله بارگذاری نشده است.
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  دانشجویان و مدیران می‌توانند پروپوزال، فرم‌ها یا گزارش‌های فاز را اضافه نمایند.
                </p>
              </div>
            )}
          </div>

          {/* NOTES & FEEDBACK HISTORY BOX */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs space-y-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-blue-600" />
              <h4 className="text-sm font-bold text-slate-900">
                توضیحات، یادداشت‌ها و تاریخچه بازخوردها
              </h4>
            </div>

            {currentStep.notes ? (
              <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-200/80 text-xs text-slate-700 leading-relaxed whitespace-pre-line font-sans">
                {currentStep.notes}
              </div>
            ) : (
              <div className="text-xs text-slate-400 italic">هیچ یادداشتی ثبت نشده است.</div>
            )}

            {/* Add note/feedback input */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="text"
                placeholder={isAdmin ? "ثبت نظر، بازخورد ارزیابی یا دستور کار به عنوان مدیر..." : "ثبت توضیح یا سوال از مدیر پروژه..."}
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                className="flex-1 px-3 py-2 text-xs bg-slate-50/80 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-hidden transition"
              />
              <button
                onClick={handleAddComment}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition cursor-pointer shrink-0 shadow-xs border border-slate-750"
              >
                ثبت پیام
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer (Step navigation prev/next) */}
        <div className="bg-slate-50/80 px-6 py-4 border-t border-slate-200/80 flex items-center justify-between">
          <button
            onClick={() => setActiveStepIndex(Math.max(0, activeStepIndex - 1))}
            disabled={activeStepIndex === 0}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-2xs transition"
          >
            <ArrowRight className="w-4 h-4" />
            گام قبلی
          </button>

          <div className="text-xs text-slate-500 font-medium">
            مرحله {activeStepIndex + 1} از {project.steps.length}
          </div>

          <button
            onClick={() => setActiveStepIndex(Math.min(project.steps.length - 1, activeStepIndex + 1))}
            disabled={activeStepIndex === project.steps.length - 1}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-xs transition"
          >
            گام بعدی
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
