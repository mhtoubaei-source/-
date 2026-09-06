import React, { useState } from 'react';
import {
  Users, UserCheck, Briefcase, Plus, Search,
  ArrowLeft, Clock, CheckCircle2, AlertTriangle, ShieldCheck,
  Building, Check
} from 'lucide-react';
import { Core, Project, UserRole, StudentProfile } from '../types';

interface CoresListViewProps {
  cores: Core[];
  role: UserRole;
  currentStudent: StudentProfile;
  onSelectProject: (project: Project) => void;
  onAddCore: (newCore: Core) => void;
  onAddProject: (coreId: string, newProject: Project) => void;
}

export const CoresListView: React.FC<CoresListViewProps> = ({
  cores,
  role,
  currentStudent,
  onSelectProject,
  onAddCore,
  onAddProject
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showOnlyMyCore, setShowOnlyMyCore] = useState(role === 'student');
  const [isAddCoreModalOpen, setIsAddCoreModalOpen] = useState(false);
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const [targetCoreIdForProject, setTargetCoreIdForProject] = useState<string>('');

  // Form states for Add Core
  const [newCoreTitle, setNewCoreTitle] = useState('');
  const [newCoreDirector, setNewCoreDirector] = useState('');
  const [newCoreCategory, setNewCoreCategory] = useState('فناوری‌های نوین تربیتی');
  const [newCoreDesc, setNewCoreDesc] = useState('');
  const [newCoreMembers, setNewCoreMembers] = useState('');

  // Form states for Add Project
  const [newPrjTitle, setNewPrjTitle] = useState('');
  const [newPrjCode, setNewPrjCode] = useState('');
  const [newPrjStudentLead, setNewPrjStudentLead] = useState('');
  const [newPrjSummary, setNewPrjSummary] = useState('');

  const isAdmin = role === 'admin';

  // Filter cores based on student role or search
  const filteredCores = cores.filter((core) => {
    // If student view and "showOnlyMyCore" is true
    if (role === 'student' && showOnlyMyCore) {
      if (core.id !== currentStudent.coreId) {
        return false;
      }
    }

    // Category filter
    if (selectedCategory !== 'all' && core.category !== selectedCategory) {
      return false;
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = core.title.toLowerCase().includes(q);
      const matchDirector = core.director.toLowerCase().includes(q);
      const matchMembers = core.members.some(m => m.toLowerCase().includes(q));
      const matchProjects = core.activeProjects.some(p => p.title.toLowerCase().includes(q));
      return matchTitle || matchDirector || matchMembers || matchProjects;
    }

    return true;
  });

  const categories = Array.from(new Set(cores.map(c => c.category)));

  const handleCreateCore = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCoreTitle.trim() || !newCoreDirector.trim()) return;

    const membersList = newCoreMembers
      ? newCoreMembers.split(',').map(m => m.trim())
      : [`${newCoreDirector} (مدیر هسته)`];

    const createdCore: Core = {
      id: 'core-' + Date.now(),
      title: newCoreTitle.trim(),
      category: newCoreCategory,
      director: newCoreDirector.trim(),
      secretary: 'دبیرخانه هسته',
      establishedYear: '۱۴۰۳',
      location: 'ساختمان پژوهش و فناوری',
      color: 'blue',
      iconName: 'Building',
      description: newCoreDesc.trim() || 'هسته علمی-پژوهشی جدید مرکز هدایت تربیتی',
      members: membersList,
      projectsCount: 0,
      activeProjects: []
    };

    onAddCore(createdCore);
    setIsAddCoreModalOpen(false);
    setNewCoreTitle('');
    setNewCoreDirector('');
    setNewCoreDesc('');
    setNewCoreMembers('');
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPrjTitle.trim() || !targetCoreIdForProject) return;

    const parentCore = cores.find(c => c.id === targetCoreIdForProject);
    const newPrj: Project = {
      id: 'prj-' + Date.now(),
      coreId: targetCoreIdForProject,
      title: newPrjTitle.trim(),
      code: newPrjCode.trim() || `EDU-${Math.floor(100 + Math.random() * 900)}`,
      summary: newPrjSummary.trim() || 'شرح اولیه پروژه پژوهشی جدید',
      manager: parentCore ? parentCore.director : 'مدیر هسته',
      studentLead: newPrjStudentLead.trim() || currentStudent.name,
      members: [newPrjStudentLead.trim() || currentStudent.name],
      startDate: '۱۴۰۳/۱۰/۰۱',
      targetEndDate: '۱۴۰۴/۰۶/۳۰',
      currentStepIndex: 0,
      overallStatus: 'in_progress',
      progressPercentage: 15,
      steps: [
        {
          id: 1,
          title: 'انتخاب مسئله',
          shortTitle: 'تعریف مسئله',
          description: 'تبیین ابعاد و ضرورت مسئله پژوهشی',
          status: 'in_progress',
          lastUpdated: 'امروز',
          notes: 'پروژه جدید ثبت شد. در انتظار تبیین مسئله و ارسال فرم‌ها.',
          isProblemDefined: true,
          problemTitle: newPrjTitle.trim(),
          problemStatement: newPrjSummary.trim(),
          keywords: ['پژوهش تربیتی', 'نوآوری'],
          attachments: []
        },
        {
          id: 2,
          title: 'ارائه به مرکز',
          shortTitle: 'ارائه پروپوزال',
          description: 'ارسال پیشنهاده رسمی به مرکز',
          status: 'locked',
          lastUpdated: '-',
          notes: '-',
          attachments: []
        },
        {
          id: 3,
          title: 'ارزیابی اولیه',
          shortTitle: 'داوری اولیه',
          description: 'داوری شورای علمی',
          status: 'locked',
          lastUpdated: '-',
          notes: '-',
          attachments: []
        },
        {
          id: 4,
          title: 'تأیید نهایی مرکز',
          shortTitle: 'تأیید مصوبه',
          description: 'صدور ابلاغیه رسمی',
          status: 'locked',
          lastUpdated: '-',
          notes: '-',
          attachments: []
        },
        {
          id: 5,
          title: 'ارزیابی اول',
          shortTitle: 'گزارش فاز ۱',
          description: 'ارائه گزارش پیشرفت فاز ۱',
          status: 'locked',
          lastUpdated: '-',
          notes: '-',
          attachments: []
        },
        {
          id: 6,
          title: 'ارزیابی دوم',
          shortTitle: 'گزارش فاز ۲',
          description: 'ارائه گزارش پیشرفت فاز ۲',
          status: 'locked',
          lastUpdated: '-',
          notes: '-',
          attachments: []
        },
        {
          id: 7,
          title: 'ارزیابی‌های بعدی و خاتمه پروژه',
          shortTitle: 'خاتمه طرح',
          description: 'دفاع نهایی و صدور گواهی',
          status: 'locked',
          lastUpdated: '-',
          notes: '-',
          attachments: []
        }
      ]
    };

    onAddProject(targetCoreIdForProject, newPrj);
    setIsAddProjectModalOpen(false);
    setNewPrjTitle('');
    setNewPrjCode('');
    setNewPrjStudentLead('');
    setNewPrjSummary('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Section Header - Professional Polish */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200/80 text-xs font-bold">
              بخش ۲-۱
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              نمایش کارنامه و پروژه‌های هسته‌های پژوهشی
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-normal">
            {role === 'admin' 
              ? 'پنل جامع مدیریتی: دسترسی به تمام هسته‌ها، اعضا، پروژه‌ها و امکان باز کردن و ویرایش تایملاین مراحل'
              : `داشبورد اختصاصی دانشجو: مشاهده اطلاعات هسته مربوطه (${currentStudent.name}) و ثبت گزارش‌های فاز`}
          </p>
        </div>

        {/* Action Buttons for Admin or Student Filter */}
        <div className="flex flex-wrap items-center gap-2.5">
          {role === 'student' && (
            <button
              onClick={() => setShowOnlyMyCore(!showOnlyMyCore)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-2xs ${
                showOnlyMyCore
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              <Check className="w-3.5 h-3.5" />
              {showOnlyMyCore ? 'فقط هسته من (فعال)' : 'نمایش همه هسته‌ها'}
            </button>
          )}

          {isAdmin && (
            <>
              <button
                id="add-new-core-btn"
                onClick={() => setIsAddCoreModalOpen(true)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs border border-blue-500/20"
              >
                <Plus className="w-4 h-4" />
                تعریف هسته جدید
              </button>

              <button
                id="add-new-project-btn"
                onClick={() => {
                  setTargetCoreIdForProject(cores[0]?.id || '');
                  setIsAddProjectModalOpen(true);
                }}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs border border-slate-750"
              >
                <Plus className="w-4 h-4" />
                ثبت پروژه جدید
              </button>
            </>
          )}
        </div>
      </div>

      {/* Role banner note */}
      {role === 'student' && showOnlyMyCore && (
        <div className="bg-emerald-50/80 border border-emerald-200/90 p-3.5 sm:p-4 rounded-xl flex items-center justify-between text-xs text-emerald-900 shadow-2xs">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              شما به عنوان <strong>{currentStudent.name}</strong> وارد شده‌اید. اطلاعات و پروژه‌های اختصاصی هسته شما نمایش داده می‌شود.
            </span>
          </div>
          <span className="text-[11px] text-emerald-700 font-mono font-medium">شناسه: {currentStudent.studentId}</span>
        </div>
      )}

      {/* Search & Filter bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="جستجو در هسته‌ها، اساتید، اعضا یا پروژه‌ها..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pr-9 pl-3 py-2 text-xs bg-slate-50/80 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition cursor-pointer shadow-2xs ${
              selectedCategory === 'all'
                ? 'bg-blue-700 text-white font-bold'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200/60'
            }`}
          >
            همه حوزه‌ها ({cores.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition cursor-pointer shadow-2xs ${
                selectedCategory === cat
                  ? 'bg-blue-700 text-white font-bold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Cores Grid */}
      <div className="space-y-6">
        {filteredCores.length > 0 ? (
          filteredCores.map((core) => (
            <div
              key={core.id}
              id={`core-card-${core.id}`}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all overflow-hidden"
            >
              {/* Core Card Header */}
              <div className="p-5 sm:p-6 border-b border-slate-200/80 bg-gradient-to-l from-slate-50/60 via-slate-50/20 to-white">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200/80">
                        {core.category}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        تأسیس: {core.establishedYear} | {core.location}
                      </span>
                    </div>

                    <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                      {core.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-4xl text-justify font-normal">
                      {core.description}
                    </p>
                  </div>

                  {/* Director and Secretary badge */}
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-2xs space-y-2 shrink-0 min-w-[240px]">
                    <div className="flex items-center gap-2 text-xs">
                      <UserCheck className="w-4 h-4 text-blue-700" />
                      <span className="text-slate-500">مدیر هسته:</span>
                      <strong className="text-slate-900">{core.director}</strong>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <Users className="w-4 h-4 text-emerald-700" />
                      <span className="text-slate-500">دبیر هسته:</span>
                      <strong className="text-slate-800">{core.secretary}</strong>
                    </div>
                  </div>
                </div>

                {/* Members List */}
                <div className="mt-4 pt-3.5 border-t border-slate-200/70">
                  <div className="flex items-center gap-2 mb-2 text-xs font-bold text-slate-700">
                    <Users className="w-3.5 h-3.5 text-blue-700" />
                    اسامی اعضای فعال هسته ({core.members.length} نفر):
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {core.members.map((member, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-slate-50 text-slate-700 text-xs font-medium border border-slate-200"
                      >
                        {member}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Active Projects in this Core */}
              <div className="p-5 sm:p-6 bg-white space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-blue-700" />
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                      لیست پروژه‌های فعال هسته ({core.activeProjects.length} طرح)
                    </h3>
                  </div>
                  <span className="text-[11px] text-slate-500 font-normal">
                    برای باز شدن تایملاین تعاملی و ثبت گزارش‌ها، روی هر پروژه کلیک کنید
                  </span>
                </div>

                {core.activeProjects.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {core.activeProjects.map((prj) => {
                      const currentStep = prj.steps[prj.currentStepIndex] || prj.steps[0];
                      return (
                        <div
                          key={prj.id}
                          id={`project-item-${prj.id}`}
                          onClick={() => onSelectProject(prj)}
                          className="group relative bg-slate-50/70 hover:bg-blue-50/30 p-4 sm:p-5 rounded-xl border border-slate-200/85 hover:border-blue-300 transition-all cursor-pointer flex flex-col justify-between shadow-2xs"
                        >
                          <div className="space-y-2.5">
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-mono text-[11px] font-bold text-blue-800 bg-blue-100/90 px-2 py-0.5 rounded border border-blue-200/60">
                                {prj.code}
                              </span>
                              <div className="flex items-center gap-1.5 text-xs">
                                {prj.overallStatus === 'completed' ? (
                                  <span className="flex items-center gap-1 text-emerald-800 font-bold bg-emerald-100/90 px-2 py-0.5 rounded-full text-[11px] border border-emerald-200">
                                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                    پایان‌یافته
                                  </span>
                                ) : prj.overallStatus === 'revision_needed' ? (
                                  <span className="flex items-center gap-1 text-amber-800 font-bold bg-amber-100/90 px-2 py-0.5 rounded-full text-[11px] border border-amber-200">
                                    <AlertTriangle className="w-3 h-3 text-amber-600" />
                                    نیازمند اصلاح
                                  </span>
                                ) : (
                                  <span className="flex items-center gap-1 text-blue-800 font-bold bg-blue-100/90 px-2 py-0.5 rounded-full text-[11px] border border-blue-200">
                                    <Clock className="w-3 h-3 text-blue-600" />
                                    در حال اجرا
                                  </span>
                                )}
                              </div>
                            </div>

                            <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition leading-snug">
                              {prj.title}
                            </h4>

                            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                              {prj.summary}
                            </p>

                            <div className="text-[11px] text-slate-500 space-y-1 pt-1 font-medium">
                              <div>مسئول دانشجویی: <strong className="text-slate-800">{prj.studentLead}</strong></div>
                              <div>گام فعلی در تایملاین: <strong className="text-blue-700">گام {currentStep.id}: {currentStep.shortTitle}</strong></div>
                            </div>
                          </div>

                          {/* Progress Bar & Click Trigger */}
                          <div className="mt-4 pt-3 border-t border-slate-200/70 space-y-1.5">
                            <div className="flex items-center justify-between text-[11px]">
                              <span className="text-slate-500 font-medium">پیشرفت کل:</span>
                              <span className="font-bold text-blue-700 font-mono">{prj.progressPercentage}٪</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-200/80 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-blue-600 rounded-full transition-all duration-500"
                                style={{ width: `${prj.progressPercentage}%` }}
                              ></div>
                            </div>

                            <div className="flex items-center justify-end gap-1 text-xs font-bold text-blue-700 group-hover:translate-x-[-3px] transition-transform pt-1.5">
                              <span>مشاهده و مدیریت تایملاین ۷ مرحله‌ای</span>
                              <ArrowLeft className="w-3.5 h-3.5" />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-slate-50/70 rounded-xl border border-dashed border-slate-200">
                    <p className="text-xs text-slate-500">
                      پروژه فعالی برای این هسته تعریف نشده است.
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200/90 shadow-2xs">
            <Building className="w-12 h-12 text-slate-300 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-slate-800">هسته‌ای یافت نشد</h3>
            <p className="text-xs text-slate-500 mt-1">با معیارهای جستجوی فعلی موردی پیدا نشد.</p>
          </div>
        )}
      </div>

      {/* Add New Core Modal (Admin only) */}
      {isAddCoreModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl border border-slate-200 space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">تعریف هسته پژوهشی جدید</h3>
              <p className="text-xs text-slate-500 mt-0.5">مشخصات اولیه هسته و تیم پژوهشی را وارد نمایید.</p>
            </div>
            <form onSubmit={handleCreateCore} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">نام هسته:</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: هسته تربیت اخلاقی و معنویت پژوهی"
                  value={newCoreTitle}
                  onChange={(e) => setNewCoreTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50/80 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">نام مدیر هسته (عضو هیئت علمی):</label>
                <input
                  type="text"
                  required
                  placeholder="دکتر ..."
                  value={newCoreDirector}
                  onChange={(e) => setNewCoreDirector(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50/80 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">حوزه تخصصی:</label>
                <input
                  type="text"
                  value={newCoreCategory}
                  onChange={(e) => setNewCoreCategory(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50/80 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">اسامی اعضا (با کاما جدا کنید):</label>
                <input
                  type="text"
                  placeholder="علی رضایی، فاطمه مهدوی..."
                  value={newCoreMembers}
                  onChange={(e) => setNewCoreMembers(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50/80 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">شرح اهداف هسته:</label>
                <textarea
                  rows={3}
                  value={newCoreDesc}
                  onChange={(e) => setNewCoreDesc(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50/80 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddCoreModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition cursor-pointer"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition cursor-pointer shadow-xs"
                >
                  ثبت هسته
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add New Project Modal (Admin only) */}
      {isAddProjectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl border border-slate-200 space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">ثبت پروژه پژوهشی جدید</h3>
              <p className="text-xs text-slate-500 mt-0.5">ایجاد پرونده پژوهشی و پیوست به چرخه ۷ مرحله‌ای پایش</p>
            </div>
            <form onSubmit={handleCreateProject} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">انتخاب هسته متبوع:</label>
                <select
                  value={targetCoreIdForProject}
                  onChange={(e) => setTargetCoreIdForProject(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50/80 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                >
                  {cores.map(c => (
                    <option key={c.id} value={c.id}>{c.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">عنوان پروژه:</label>
                <input
                  type="text"
                  required
                  placeholder="عنوان طرح پژوهشی..."
                  value={newPrjTitle}
                  onChange={(e) => setNewPrjTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50/80 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">کد شناسه طرح:</label>
                  <input
                    type="text"
                    placeholder="مثال: EDU-205"
                    value={newPrjCode}
                    onChange={(e) => setNewPrjCode(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50/80 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">مسئول دانشجویی طرح:</label>
                  <input
                    type="text"
                    placeholder="نام دانشجو..."
                    value={newPrjStudentLead}
                    onChange={(e) => setNewPrjStudentLead(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50/80 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">شرح و مسئله اولیه:</label>
                <textarea
                  rows={3}
                  value={newPrjSummary}
                  onChange={(e) => setNewPrjSummary(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50/80 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddProjectModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition cursor-pointer"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition cursor-pointer shadow-xs"
                >
                  ثبت و راه‌اندازی تایملاین
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
