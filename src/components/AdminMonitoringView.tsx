import React, { useState } from 'react';
import {
  ShieldCheck, Search, Filter, AlertTriangle, CheckCircle2, Clock,
  FileText, Plus, ArrowLeft, Paperclip, Check, X, Eye, Sparkles,
  ChevronDown, MessageSquare, Send, Calendar, User, Building, Compass
} from 'lucide-react';
import { Project, DeliverableRequest, Core, Attachment } from '../types';

interface AdminMonitoringViewProps {
  cores: Core[];
  projects: Project[];
  deliverables: DeliverableRequest[];
  onSelectProject: (project: Project) => void;
  onApproveDeliverable: (deliverableId: string, feedback: string) => void;
  onRequestRevisionDeliverable: (deliverableId: string, feedback: string) => void;
  onCreateDeliverableRequest: (newReq: Omit<DeliverableRequest, 'id' | 'requestedAt' | 'status'>) => void;
}

export const AdminMonitoringView: React.FC<AdminMonitoringViewProps> = ({
  cores,
  projects,
  deliverables,
  onSelectProject,
  onApproveDeliverable,
  onRequestRevisionDeliverable,
  onCreateDeliverableRequest
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCoreFilter, setSelectedCoreFilter] = useState('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<'all' | 'revision' | 'submitted' | 'in_progress'>('all');
  const [activeTab, setActiveTab] = useState<'matrix' | 'inbox' | 'requests'>('matrix');

  // Modal states for creating deliverable request
  const [isNewRequestModalOpen, setIsNewRequestModalOpen] = useState(false);
  const [reqProjectId, setReqProjectId] = useState<string>(projects[0]?.id || '');
  const [reqStepId, setReqStepId] = useState<number>(3);
  const [reqTitle, setReqTitle] = useState('');
  const [reqDesc, setReqDesc] = useState('');
  const [reqDeadline, setReqDeadline] = useState('۱۴۰۳/۱۲/۲۵');
  const [reqPriority, setReqPriority] = useState<'urgent' | 'high' | 'normal'>('high');

  // Reviewing a specific deliverable modal/state
  const [reviewingDeliverable, setReviewingDeliverable] = useState<DeliverableRequest | null>(null);
  const [feedbackText, setFeedbackText] = useState('');

  // Stats
  const totalProjectsCount = projects.length;
  const revisionNeededProjects = projects.filter(p => p.overallStatus === 'revision_needed').length;
  const inProgressProjects = projects.filter(p => p.overallStatus === 'in_progress').length;
  const completedProjects = projects.filter(p => p.overallStatus === 'completed').length;
  const pendingInboxCount = deliverables.filter(d => d.status === 'submitted').length;

  // Filtered projects for the matrix
  const filteredProjects = projects.filter((prj) => {
    if (selectedCoreFilter !== 'all' && prj.coreId !== selectedCoreFilter) {
      return false;
    }
    if (selectedStatusFilter === 'revision' && prj.overallStatus !== 'revision_needed') {
      return false;
    }
    if (selectedStatusFilter === 'in_progress' && prj.overallStatus !== 'in_progress') {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = prj.title.toLowerCase().includes(q);
      const matchCode = prj.code.toLowerCase().includes(q);
      const matchLead = prj.studentLead.toLowerCase().includes(q);
      const matchManager = prj.manager.toLowerCase().includes(q);
      return matchTitle || matchCode || matchLead || matchManager;
    }
    return true;
  });

  // Handle creating new deliverable request
  const handleCreateRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reqTitle.trim() || !reqProjectId) return;

    const targetProject = projects.find(p => p.id === reqProjectId);
    if (!targetProject) return;

    const stepTitles: Record<number, string> = {
      1: 'گام ۱: انتخاب مسئله',
      2: 'گام ۲: ارائه پروپوزال',
      3: 'گام ۳: ارزیابی اولیه',
      4: 'گام ۴: تاییدیه نهایی مرکز',
      5: 'گام ۵: ارزیابی اول (فاز ۱)',
      6: 'گام ۶: ارزیابی دوم (فاز ۲)',
      7: 'گام ۷: دفاع و خاتمه'
    };

    onCreateDeliverableRequest({
      projectId: targetProject.id,
      projectCode: targetProject.code,
      projectTitle: targetProject.title,
      studentLead: targetProject.studentLead,
      stepId: reqStepId,
      stepTitle: stepTitles[reqStepId] || `گام ${reqStepId}`,
      title: reqTitle.trim(),
      description: reqDesc.trim() || 'مدارک تکمیلی و گزارش مربوط به این مرحله ارسال گردد.',
      deadline: reqDeadline.trim() || '۱۴۰۳/۱۲/۲۹',
      requestedBy: 'دبیرخانه شورای ارزیابی و مانیتورینگ مرکز',
      priority: reqPriority
    });

    setIsNewRequestModalOpen(false);
    setReqTitle('');
    setReqDesc('');
  };

  const handleApprove = (delivId: string) => {
    onApproveDeliverable(delivId, feedbackText.trim() || 'مدرک ارسالی با موفقیت بررسی و تایید شد.');
    setReviewingDeliverable(null);
    setFeedbackText('');
  };

  const handleRevision = (delivId: string) => {
    if (!feedbackText.trim()) {
      alert('لطفاً دلیل درخواست اصلاحیه را در کادر توضیحات وارد نمایید.');
      return;
    }
    onRequestRevisionDeliverable(delivId, feedbackText.trim());
    setReviewingDeliverable(null);
    setFeedbackText('');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner - Admin Monitoring Dashboard */}
      <div className="bg-gradient-to-l from-slate-950 via-slate-900 to-blue-950 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2.5 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                پنل مدیریت و پایش مرکز
              </span>
              <span className="text-xs text-slate-400 font-medium">
                رصد کلان پیشرفت پروژه‌ها، دریافت و داوری مدارک و ابلاغ اصلاحیه‌ها
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight leading-snug">
              سامانه پایش و مدیریت پروژه‌های پژوهشی
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed text-justify">
              در این سامانه می‌توانید وضعیت تک‌تک پروژه‌ها را در چرخه ۷ مرحله‌ای پایش کنید، فایل‌های ارسالی پژوهشگران را داوری نمایید و در صورت نیاز، مدارک و تکالیف جدیدی برای پژوهشگران تعریف کنید.
            </p>
          </div>

          {/* Action button: Request Deliverable */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsNewRequestModalOpen(true)}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-md shadow-blue-600/20"
            >
              <Plus className="w-4 h-4" />
              <span>تعریف خواسته جدید از پژوهشگر</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Monitoring Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] text-slate-500 font-medium">کل طرح‌های پژوهشی</div>
            <div className="text-xl font-extrabold text-slate-900 font-mono">{totalProjectsCount} <span className="text-xs font-normal text-slate-500">طرح</span></div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] text-slate-500 font-medium">مدارک دریافتی در انتظار داوری</div>
            <div className="text-xl font-extrabold text-indigo-700 font-mono">{pendingInboxCount} <span className="text-xs font-normal text-slate-500">مدرک</span></div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] text-slate-500 font-medium">طرح‌های نیازمند اصلاحیه</div>
            <div className="text-xl font-extrabold text-amber-700 font-mono">{revisionNeededProjects} <span className="text-xs font-normal text-slate-500">طرح</span></div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] text-slate-500 font-medium">طرح‌های تکمیل‌شده</div>
            <div className="text-xl font-extrabold text-emerald-700 font-mono">{completedProjects} <span className="text-xs font-normal text-slate-500">طرح</span></div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs: Matrix vs Deliverables Inbox vs All Requests */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('matrix')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'matrix'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>ماتریس پایش گام‌های ۷‌گانه</span>
            <span className="px-2 py-0.5 rounded-full bg-slate-800 text-[10px] text-slate-300 font-mono">
              {filteredProjects.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('inbox')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'inbox'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>کارتابل مدارک ارسالی کاربران</span>
            {pendingInboxCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-bold">
                {pendingInboxCount} جدید
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('requests')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'requests'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>فهرست کل خواسته‌ها و تکالیف ({deliverables.length})</span>
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute right-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="جستجو در کد، عنوان، مسئول..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-8 pl-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:border-blue-500 w-48 sm:w-60"
            />
          </div>

          <select
            value={selectedCoreFilter}
            onChange={(e) => setSelectedCoreFilter(e.target.value)}
            className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 font-medium focus:outline-hidden"
          >
            <option value="all">تمام هسته‌ها ({cores.length})</option>
            {cores.map(c => (
              <option key={c.id} value={c.id}>{c.title}</option>
            ))}
          </select>
        </div>
      </div>

      {/* TAB 1: 7-STAGE PIPELINE MONITORING MATRIX */}
      {activeTab === 'matrix' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
            <div className="p-4 bg-slate-50/80 border-b border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="font-bold text-slate-800 flex items-center gap-2">
                <span>راهنمای نشانگرها در ماتریس:</span>
                <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  تکمیل‌شده
                </span>
                <span className="inline-flex items-center gap-1 text-blue-700 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                  در جریان
                </span>
                <span className="inline-flex items-center gap-1 text-amber-700 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  نیازمند اصلاح
                </span>
                <span className="inline-flex items-center gap-1 text-slate-400 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span>
                  قفل
                </span>
              </div>

              <div className="text-slate-500 font-medium">
                روی هر ردیف کلیک کنید تا پرونده و تایملاین باز شود.
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-100/75 text-slate-700 font-bold border-b border-slate-200">
                    <th className="p-3.5 w-64">طرح و شناسه</th>
                    <th className="p-3.5 w-32">هسته و مسئول</th>
                    <th className="p-2.5 text-center">۱. تعریف مسئله</th>
                    <th className="p-2.5 text-center">۲. ارائه مرکز</th>
                    <th className="p-2.5 text-center">۳. ارزیابی اولیه</th>
                    <th className="p-2.5 text-center">۴. تأیید نهایی</th>
                    <th className="p-2.5 text-center">۵. فاز اول</th>
                    <th className="p-2.5 text-center">۶. فاز دوم</th>
                    <th className="p-2.5 text-center">۷. خاتمه</th>
                    <th className="p-3.5 text-center w-28">پیشرفت کل</th>
                    <th className="p-3.5 text-center w-28">عملیات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {filteredProjects.map((prj) => {
                    const isRev = prj.overallStatus === 'revision_needed';

                    return (
                      <tr
                        key={prj.id}
                        className="hover:bg-blue-50/40 transition-colors group cursor-pointer"
                        onClick={() => onSelectProject(prj)}
                      >
                        <td className="p-3.5">
                          <div className="font-mono text-[11px] font-bold text-blue-700">{prj.code}</div>
                          <div className="font-bold text-slate-900 mt-0.5 line-clamp-1 group-hover:text-blue-800">
                            {prj.title}
                          </div>
                        </td>

                        <td className="p-3.5 text-slate-600">
                          <div>{prj.studentLead}</div>
                          <div className="text-[10px] text-slate-400 mt-0.5">{prj.manager}</div>
                        </td>

                        {/* Steps 1 to 7 Indicators */}
                        {prj.steps.map((st) => {
                          let badgeBg = 'bg-slate-200 text-slate-500';
                          let label = 'قفل';

                          if (st.status === 'completed') {
                            badgeBg = 'bg-emerald-100 text-emerald-800 font-bold';
                            label = 'تکمیل';
                          } else if (st.status === 'revision_needed') {
                            badgeBg = 'bg-amber-100 text-amber-800 font-bold ring-1 ring-amber-300 animate-pulse';
                            label = 'اصلاح';
                          } else if (st.status === 'in_progress') {
                            badgeBg = 'bg-blue-100 text-blue-800 font-bold ring-1 ring-blue-300';
                            label = 'در جریان';
                          }

                          return (
                            <td key={st.id} className="p-2 text-center">
                              <span
                                title={`${st.title}: ${label}`}
                                className={`inline-block px-2 py-1 rounded-lg text-[10px] ${badgeBg}`}
                              >
                                {label}
                              </span>
                            </td>
                          );
                        })}

                        <td className="p-3.5 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            <div className="w-12 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                              <div
                                className={`h-full ${isRev ? 'bg-amber-500' : 'bg-blue-600'}`}
                                style={{ width: `${prj.progressPercentage}%` }}
                              />
                            </div>
                            <span className="font-mono font-bold text-slate-800">{prj.progressPercentage}٪</span>
                          </div>
                        </td>

                        <td className="p-3.5 text-center" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => onSelectProject(prj)}
                            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1 mx-auto"
                          >
                            <Eye className="w-3 h-3 text-slate-600" />
                            <span>بررسی</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: INBOX OF SUBMITTED DELIVERABLES BY USERS */}
      {activeTab === 'inbox' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">
              مدارک و گزارش‌های ارسالی اخیر توسط پژوهشگران
            </h3>
            <span className="text-xs text-slate-500 font-medium">
              داوری سریع، ثبت بازخورد و اعمال تغییر وضعیت پروژه
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {deliverables.filter(d => d.status === 'submitted' || d.submissionAttachment).map((deliv) => {
              const isPending = deliv.status === 'submitted';

              return (
                <div
                  key={deliv.id}
                  className={`bg-white rounded-2xl p-5 border transition-all shadow-2xs space-y-4 ${
                    isPending ? 'border-indigo-300 ring-1 ring-indigo-200 bg-indigo-50/10' : 'border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700">
                        {deliv.projectCode}
                      </span>
                      <span className="px-2 py-0.5 rounded-lg bg-blue-50 text-blue-700 text-xs font-bold">
                        {deliv.stepTitle}
                      </span>
                    </div>

                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      isPending ? 'bg-indigo-100 text-indigo-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {isPending ? 'در انتظار داوری ادمین' : 'داوری شده'}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-slate-900 leading-snug">
                      {deliv.title}
                    </h4>
                    <div className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                      <span>پژوهشگر: <strong className="text-slate-800">{deliv.studentLead}</strong></span>
                      <span>•</span>
                      <span>ارسال در: <strong className="text-slate-700 font-mono">{deliv.submittedAt || '-'}</strong></span>
                    </div>
                  </div>

                  {/* Student Submission Notes */}
                  {deliv.submissionNotes && (
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
                      <span className="font-bold text-slate-900">یادداشت پژوهشگر:</span>
                      <p className="leading-relaxed">{deliv.submissionNotes}</p>
                    </div>
                  )}

                  {/* Attachment Box */}
                  {deliv.submissionAttachment && (
                    <div className="bg-blue-50/60 p-3 rounded-xl border border-blue-200 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 overflow-hidden">
                        <Paperclip className="w-4 h-4 text-blue-600 shrink-0" />
                        <div className="truncate">
                          <div className="font-bold text-slate-900 truncate font-mono">{deliv.submissionAttachment.name}</div>
                          <div className="text-[10px] text-slate-500">{deliv.submissionAttachment.size}</div>
                        </div>
                      </div>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          alert(`فایل "${deliv.submissionAttachment?.name}" آماده دانلود یا بررسی در محیط پیش‌نمایش است.`);
                        }}
                        className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 text-blue-700 font-bold rounded-lg text-xs shrink-0"
                      >
                        مشاهده فایل
                      </a>
                    </div>
                  )}

                  {/* Admin Decision Actions */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setReviewingDeliverable(deliv)}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>ثبت ارزیابی و بازخورد</span>
                    </button>

                    <button
                      onClick={() => {
                        const prj = projects.find(p => p.id === deliv.projectId);
                        if (prj) onSelectProject(prj);
                      }}
                      className="text-xs text-slate-500 hover:text-slate-800 font-medium"
                    >
                      مشاهده کل طرح ←
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: ALL DELIVERABLES / REQUESTS */}
      {activeTab === 'requests' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">
              فهرست تمام خواسته‌ها و تکالیف تعیین‌شده برای پژوهشگران
            </h3>
            <button
              onClick={() => setIsNewRequestModalOpen(true)}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>افزودن خواسته جدید</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <table className="w-full text-right border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 font-bold text-slate-700">
                  <th className="p-3.5">عنوان مدرک خواسته شده</th>
                  <th className="p-3.5">پروژه و مسئول</th>
                  <th className="p-3.5">گام</th>
                  <th className="p-3.5">مهلت تحویل</th>
                  <th className="p-3.5">وضعیت</th>
                  <th className="p-3.5 text-center">عملیات داوری</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {deliverables.map((deliv) => (
                  <tr key={deliv.id} className="hover:bg-slate-50/80 transition">
                    <td className="p-3.5">
                      <div className="font-bold text-slate-900">{deliv.title}</div>
                      <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{deliv.description}</div>
                    </td>
                    <td className="p-3.5 text-slate-600">
                      <div className="font-mono font-bold text-blue-700">{deliv.projectCode}</div>
                      <div className="text-[11px] text-slate-700 mt-0.5">{deliv.studentLead}</div>
                    </td>
                    <td className="p-3.5 text-slate-700">{deliv.stepTitle}</td>
                    <td className="p-3.5 font-mono text-slate-700">{deliv.deadline}</td>
                    <td className="p-3.5">
                      {deliv.status === 'approved' && (
                        <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                          تأیید شد
                        </span>
                      )}
                      {deliv.status === 'revision_needed' && (
                        <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800">
                          نیازمند اصلاح
                        </span>
                      )}
                      {deliv.status === 'submitted' && (
                        <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-indigo-100 text-indigo-800">
                          ارسال شده
                        </span>
                      )}
                      {deliv.status === 'pending' && (
                        <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800">
                          در انتظار ارسال
                        </span>
                      )}
                    </td>
                    <td className="p-3.5 text-center">
                      <button
                        onClick={() => setReviewingDeliverable(deliv)}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold"
                      >
                        ارزیابی / بازخورد
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL: CREATE NEW DELIVERABLE REQUEST */}
      {isNewRequestModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                  <Plus className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-slate-900">تعریف خواسته جدید از پژوهشگر</h3>
              </div>
              <button
                onClick={() => setIsNewRequestModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateRequest} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">طرح پژوهشی هدف:</label>
                <select
                  value={reqProjectId}
                  onChange={(e) => setReqProjectId(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl"
                >
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>
                      [{p.code}] {p.title} - ({p.studentLead})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">مرحله / گام:</label>
                  <select
                    value={reqStepId}
                    onChange={(e) => setReqStepId(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value={1}>گام ۱: تعریف مسئله</option>
                    <option value={2}>گام ۲: ارائه پروپوزال</option>
                    <option value={3}>گام ۳: ارزیابی اولیه</option>
                    <option value={4}>گام ۴: تاییدیه نهایی</option>
                    <option value={5}>گام ۵: ارزیابی اول (فاز ۱)</option>
                    <option value={6}>گام ۶: ارزیابی دوم (فاز ۲)</option>
                    <option value={7}>گام ۷: خاتمه</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">اولویت اقدام:</label>
                  <select
                    value={reqPriority}
                    onChange={(e) => setReqPriority(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="urgent">فوری (الزامی برای ادامه)</option>
                    <option value="high">مهم</option>
                    <option value="normal">عادی</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">عنوان مدرک یا گزارش خواسته شده:</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: بارگذاری اصلاحیه ابزار سنجش و پرسشنامه‌ها..."
                  value={reqTitle}
                  onChange={(e) => setReqTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">توضیحات و شرایط پذیرش مدرک:</label>
                <textarea
                  rows={3}
                  placeholder="نکات مد نظر داوران و مرکز برای تایید این مدرک..."
                  value={reqDesc}
                  onChange={(e) => setReqDesc(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">موعد تحویل:</label>
                <input
                  type="text"
                  value={reqDeadline}
                  onChange={(e) => setReqDeadline(e.target.value)}
                  placeholder="مثال: ۱۴۰۳/۱۲/۲۵"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-mono"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewRequestModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold"
                >
                  ثبت و ابلاغ به پژوهشگر
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: REVIEW DELIVERABLE & GIVE FEEDBACK */}
      {reviewingDeliverable && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-slate-900">داوری و ثبت نظر برای مدرک ارسالی</h3>
              </div>
              <button
                onClick={() => setReviewingDeliverable(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5">
              <div className="font-bold text-slate-900">{reviewingDeliverable.title}</div>
              <div className="text-slate-500">
                پروژه: <strong>{reviewingDeliverable.projectCode}</strong> | پژوهشگر: <strong>{reviewingDeliverable.studentLead}</strong>
              </div>
              {reviewingDeliverable.submissionNotes && (
                <div className="text-slate-600 bg-white p-2 rounded-lg border border-slate-100 mt-2">
                  <strong className="text-slate-800">پیام ارسالی کاربر: </strong>
                  {reviewingDeliverable.submissionNotes}
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                متن بازخورد داوری / دستور اصلاحیه به پژوهشگر:
              </label>
              <textarea
                rows={4}
                required
                placeholder="دلایل تایید یا موارد نیازمند بازنگری و اصلاح توسط دانشجو را اینجا درج فرمایید..."
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => setReviewingDeliverable(null)}
                className="px-3 py-1.5 text-xs font-bold text-slate-600 hover:text-slate-800"
              >
                انصراف
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleRevision(reviewingDeliverable.id)}
                  className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>ابلاغ اصلاحیه به کاربر</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleApprove(reviewingDeliverable.id)}
                  className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>تأیید نهایی مدرک</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
