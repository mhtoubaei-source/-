import React, { useState } from 'react';
import {
  BookOpen, Users, Compass, Activity as ActivityIcon, 
  Sparkles, Download, ShieldCheck, GraduationCap, ChevronDown, Menu, X, FileText
} from 'lucide-react';
import { UserRole, StudentProfile } from '../types';

export type ActiveTab = 
  | 'core-programs' 
  | 'center-cores' 
  | 'center-activities' 
  | 'side-activities'
  | 'admin-monitoring'
  | 'researcher-portal';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  subActivityCategory?: string;
  setSubActivityCategory?: (cat: string) => void;
  role: UserRole;
  setRole: (role: UserRole) => void;
  students: StudentProfile[];
  currentStudent: StudentProfile;
  setCurrentStudent: (student: StudentProfile) => void;
  onOpenExportModal: () => void;
  actionNeededCount?: number;
  pendingInboxCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  setSubActivityCategory,
  role,
  setRole,
  students,
  currentStudent,
  setCurrentStudent,
  onOpenExportModal,
  actionNeededCount = 0,
  pendingInboxCount = 0
}) => {
  const [isCenterDropdownOpen, setIsCenterDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isStudentDropdownOpen, setIsStudentDropdownOpen] = useState(false);

  const isCenterActive = activeTab === 'center-cores' || activeTab === 'center-activities';

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
      {/* Top Utility & Role Switcher Bar */}
      <div className="bg-slate-950 text-slate-300 px-4 py-2 text-xs border-b border-slate-850">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5">
          {/* Left info in RTL: role switch notice */}
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-slate-200 font-semibold tracking-tight">مرکز هدایت علمی-پژوهشی و تربیتی</span>
            <span className="text-slate-600 hidden md:inline">|</span>
            <span className="text-slate-400 hidden md:inline font-normal">پایش مستمر و رشد استعدادهای پژوهشی دانشجومعلمان و نخبگان</span>
          </div>

          {/* Right Role Switcher Control */}
          <div className="flex items-center gap-2.5">
            <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800 shadow-inner">
              <span className="text-[11px] text-slate-400 ml-2 font-medium">سطح دسترسی:</span>
              <button
                id="role-admin-btn"
                onClick={() => setRole('admin')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  role === 'admin'
                    ? 'bg-blue-600 text-white shadow-xs ring-1 ring-blue-400/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-blue-200" />
                مدیر سیستم / هسته
              </button>

              <button
                id="role-student-btn"
                onClick={() => setRole('student')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  role === 'student'
                    ? 'bg-emerald-600 text-white shadow-xs ring-1 ring-emerald-400/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5 text-emerald-200" />
                دانشجو / عضو هسته
              </button>
            </div>

            {/* Student profile switcher when in student mode */}
            {role === 'student' && (
              <div className="relative">
                <button
                  onClick={() => setIsStudentDropdownOpen(!isStudentDropdownOpen)}
                  className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-emerald-300 px-2.5 py-1 rounded-xl border border-emerald-500/30 text-xs font-medium transition cursor-pointer shadow-xs"
                >
                  <img
                    src={currentStudent.avatar}
                    alt={currentStudent.name}
                    className="w-4 h-4 rounded-full object-cover border border-emerald-400/40"
                  />
                  <span>{currentStudent.name}</span>
                  <ChevronDown className="w-3 h-3 text-emerald-400" />
                </button>

                {isStudentDropdownOpen && (
                  <div className="absolute left-0 mt-1.5 w-60 bg-slate-900 text-slate-100 rounded-xl shadow-2xl border border-slate-750 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                    <div className="px-3 py-1.5 text-[11px] text-slate-400 border-b border-slate-800 font-medium">
                      انتخاب هویت دانشجو برای آزمودن:
                    </div>
                    {students.map((st) => (
                      <button
                        key={st.id}
                        onClick={() => {
                          setCurrentStudent(st);
                          setIsStudentDropdownOpen(false);
                        }}
                        className={`w-full text-right px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-800 transition cursor-pointer ${
                          st.id === currentStudent.id ? 'bg-slate-800/80 text-emerald-400 font-bold' : 'text-slate-200'
                        }`}
                      >
                        <div>
                          <div>{st.name}</div>
                          <div className="text-[10px] text-slate-400 mt-0.5">{st.roleInCore}</div>
                        </div>
                        {st.id === currentStudent.id && <span className="text-emerald-400 text-xs font-bold">✓</span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Single File Export Action Button */}
            <button
              id="export-single-html-btn"
              onClick={onOpenExportModal}
              className="flex items-center gap-1.5 bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-xl text-xs font-semibold transition cursor-pointer shadow-xs"
              title="دریافت خروجی تک‌فایلی HTML برای استفاده آفلاین"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden md:inline">خروجی تک‌فایلی HTML</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-blue-600/25 border border-blue-400/20">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                <span>مرکز هدایت تربیتی</span>
                <span className="text-[11px] font-semibold px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full border border-[#f38216] hidden sm:inline">
                  هسته‌های علمی-پژوهشی
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                سامانه هوشمند مدیریت فرآیندها، فعالیت‌ها و تایملاین پروژه‌ها
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {/* 1. برنامه های هسته ها */}
            <button
              id="nav-core-programs"
              onClick={() => setActiveTab('core-programs')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'core-programs'
                  ? 'bg-blue-50 text-blue-800 border border-blue-200/70 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              <BookOpen className="w-4 h-4 text-blue-600" />
              ۱. برنامه‌های هسته‌ها
            </button>

            {/* 2. برنامه مرکز هدایت تربیتی (با زیرمجموعه‌ها) */}
            <div className="relative">
              <button
                id="nav-center-menu-btn"
                onClick={() => setIsCenterDropdownOpen(!isCenterDropdownOpen)}
                onMouseEnter={() => setIsCenterDropdownOpen(true)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isCenterActive
                    ? 'bg-blue-50 text-blue-800 border border-blue-200/70 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                <Users className="w-4 h-4 text-blue-600" />
                <span>۲. برنامه مرکز هدایت تربیتی</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${isCenterDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu for Section 2 */}
              {isCenterDropdownOpen && (
                <div
                  onMouseLeave={() => setIsCenterDropdownOpen(false)}
                  className="absolute right-0 mt-1.5 w-68 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  <button
                    id="nav-center-cores"
                    onClick={() => {
                      setActiveTab('center-cores');
                      setIsCenterDropdownOpen(false);
                    }}
                    className={`w-full text-right p-3 rounded-xl transition flex items-start gap-3 cursor-pointer ${
                      activeTab === 'center-cores'
                        ? 'bg-blue-50/80 text-blue-800 font-bold border border-blue-100'
                        : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="p-2 bg-blue-100 text-blue-700 rounded-lg shrink-0 mt-0.5 shadow-xs">
                      <Users className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">۲-۱. نمایش هسته‌ها</div>
                      <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                        کارت‌های هسته‌ها، مدیران، اعضا و پروژه‌ها
                      </div>
                    </div>
                  </button>

                  <button
                    id="nav-center-activities"
                    onClick={() => {
                      setActiveTab('center-activities');
                      setIsCenterDropdownOpen(false);
                    }}
                    className={`w-full text-right p-3 rounded-xl transition flex items-start gap-3 mt-1 cursor-pointer ${
                      activeTab === 'center-activities'
                        ? 'bg-blue-50/80 text-blue-800 font-bold border border-blue-100'
                        : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg shrink-0 mt-0.5 shadow-xs">
                      <ActivityIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">۲-۲. فعالیت‌ها</div>
                      <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                        ۱. حمایت از گروه | ۲. نشست‌ها | ۳. کلاس‌ها
                      </div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* 3. فعالیت های جانبی */}
            <button
              id="nav-side-activities"
              onClick={() => setActiveTab('side-activities')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'side-activities'
                  ? 'bg-blue-50 text-blue-800 border border-blue-200/70 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              ۳. فعالیت‌های جانبی
            </button>

            {/* Role-Specific Core Tabs */}
            {role === 'admin' ? (
              <button
                id="nav-admin-monitoring"
                onClick={() => setActiveTab('admin-monitoring')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'admin-monitoring'
                    ? 'bg-blue-600 text-white shadow-xs ring-1 ring-blue-400/40'
                    : 'text-blue-700 bg-blue-50/90 hover:bg-blue-100/90 border border-blue-200/80'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>پایش و مدیریت پروژه‌ها</span>
                {pendingInboxCount > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-bold">
                    {pendingInboxCount} مدرک جدید
                  </span>
                )}
              </button>
            ) : (
              <button
                id="nav-researcher-portal"
                onClick={() => setActiveTab('researcher-portal')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'researcher-portal'
                    ? 'bg-emerald-600 text-white shadow-xs ring-1 ring-emerald-400/40'
                    : 'text-emerald-800 bg-emerald-50/90 hover:bg-emerald-100/90 border border-emerald-200/80'
                }`}
              >
                <FileText className="w-4 h-4 text-emerald-600" />
                <span>پژوهش‌های من و ارسال مدارک</span>
                {actionNeededCount > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-bold">
                    {actionNeededCount} اقدام فوری
                  </span>
                )}
              </button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-3 space-y-2 animate-in fade-in slide-in-from-top-2">
          {/* Quick prominent tab in mobile */}
          <button
            onClick={() => {
              setActiveTab('researcher-portal');
              setIsMobileMenuOpen(false);
            }}
            className={`w-full text-right px-3 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between ${
              activeTab === 'researcher-portal' ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-900 border border-emerald-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span>پژوهش‌های من و ارسال آسان مدارک</span>
            </div>
            {actionNeededCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-amber-500 text-white text-[10px]">
                {actionNeededCount}
              </span>
            )}
          </button>

          <button
            onClick={() => {
              setActiveTab('admin-monitoring');
              setIsMobileMenuOpen(false);
            }}
            className={`w-full text-right px-3 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between ${
              activeTab === 'admin-monitoring' ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-900 border border-blue-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              <span>سامانه پایش و مدیریت پروژه‌ها (ادمین)</span>
            </div>
            {pendingInboxCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-amber-400 text-slate-900 text-[10px]">
                {pendingInboxCount}
              </span>
            )}
          </button>

          <div className="pt-2 border-t border-slate-100 space-y-1">
            <button
              onClick={() => {
                setActiveTab('core-programs');
                setIsMobileMenuOpen(false);
              }}
              className={`w-full text-right px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-2 ${
                activeTab === 'core-programs' ? 'bg-blue-50 text-blue-800 border border-blue-200' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <BookOpen className="w-4 h-4 text-blue-600" />
              ۱. برنامه‌های هسته‌ها
            </button>

            <div className="space-y-1 pr-3 border-r-2 border-slate-200">
              <div className="text-[11px] font-bold text-slate-400 py-1">۲. برنامه مرکز هدایت تربیتی:</div>
              <button
                onClick={() => {
                  setActiveTab('center-cores');
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-right px-3 py-2 rounded-xl text-xs font-medium flex items-center gap-2 ${
                  activeTab === 'center-cores' ? 'bg-blue-50 text-blue-800 font-bold border border-blue-200' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Users className="w-4 h-4 text-blue-600" />
                ۲-۱. نمایش هسته‌ها و پروژه‌ها
              </button>
              <button
                onClick={() => {
                  setActiveTab('center-activities');
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-right px-3 py-2 rounded-xl text-xs font-medium flex items-center gap-2 ${
                  activeTab === 'center-activities' ? 'bg-blue-50 text-blue-800 font-bold border border-blue-200' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <ActivityIcon className="w-4 h-4 text-emerald-600" />
                ۲-۲. فعالیت‌ها (حمایت، نشست‌ها، کلاس‌ها)
              </button>
            </div>

            <button
              onClick={() => {
                setActiveTab('side-activities');
                setIsMobileMenuOpen(false);
              }}
              className={`w-full text-right px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-2 ${
                activeTab === 'side-activities' ? 'bg-blue-50 text-blue-800 border border-blue-200' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              ۳. فعالیت‌های جانبی (همایش‌ها و مسابقات)
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
