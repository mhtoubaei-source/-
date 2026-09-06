import React, { useState } from 'react';
import {
  HeartHandshake, MessageSquare, BookOpen, Calendar, Clock,
  MapPin, Users, Plus, CheckCircle2,
  Sparkles, Check
} from 'lucide-react';
import { Activity, ActivityCategory, UserRole } from '../types';

interface ActivitiesViewProps {
  activities: Activity[];
  role: UserRole;
  onAddActivity: (activity: Activity) => void;
  onRegisterActivity: (activityId: string) => void;
}

export const ActivitiesView: React.FC<ActivitiesViewProps> = ({
  activities,
  role,
  onAddActivity,
  onRegisterActivity
}) => {
  const [activeSubTab, setActiveSubTab] = useState<ActivityCategory>('group_support');
  const [registeredIds, setRegisteredIds] = useState<string[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form states for adding activity
  const [newTitle, setNewTitle] = useState('');
  const [newSpeaker, setNewSpeaker] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newSupportAmount, setNewSupportAmount] = useState('');

  const isAdmin = role === 'admin';

  const filteredActivities = activities.filter(a => a.category === activeSubTab);

  const handleRegister = (id: string) => {
    if (!registeredIds.includes(id)) {
      setRegisteredIds([...registeredIds, id]);
      onRegisterActivity(id);
    }
  };

  const handleCreateActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const created: Activity = {
      id: 'act-' + Date.now(),
      category: activeSubTab,
      title: newTitle.trim(),
      speakerOrMentor: newSpeaker.trim() || 'مرکز هدایت تربیتی',
      date: newDate.trim() || 'آذر ۱۴۰۳',
      time: '۱۰:۰۰ الی ۱۲:۰۰',
      location: newLocation.trim() || 'سالن همایش‌های مرکز',
      description: newDesc.trim() || 'برنامه حمایتی و آموزشی جدید',
      status: 'upcoming',
      tags: ['فعالیت جدید'],
      supportAmount: activeSubTab === 'group_support' ? newSupportAmount : undefined
    };

    onAddActivity(created);
    setIsAddModalOpen(false);
    setNewTitle('');
    setNewSpeaker('');
    setNewDate('');
    setNewLocation('');
    setNewDesc('');
    setNewSupportAmount('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Section Header - Professional Polish */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-xs font-bold">
              بخش ۲-۲
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              فعالیت‌های مرکز هدایت تربیتی
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-normal">
            شامل ۳ محور بنیادین: بسته‌های حمایت مادی و معنوی، نشست‌های هم‌اندیشی نخبگانی، و کلاس‌ها و کارگاه‌های مهارتی
          </p>
        </div>

        {isAdmin && (
          <button
            id="add-activity-btn"
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs border border-emerald-500/20 self-start md:self-auto"
          >
            <Plus className="w-4 h-4" />
            افزودن فعالیت جدید
          </button>
        )}
      </div>

      {/* 3 Sub-category Tabs (Explicitly required: ۱. حمایت از گروه ۲. نشست‌ها ۳. کلاس‌ها) */}
      <div className="bg-slate-100/90 p-1.5 rounded-xl border border-slate-200/60 flex flex-wrap gap-1.5 max-w-2xl shadow-2xs">
        <button
          id="subtab-group-support"
          onClick={() => setActiveSubTab('group_support')}
          className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 py-2 px-3.5 rounded-lg text-xs sm:text-sm font-bold transition cursor-pointer ${
            activeSubTab === 'group_support'
              ? 'bg-white text-emerald-800 shadow-2xs border border-slate-200/70'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <HeartHandshake className="w-4 h-4 text-emerald-600" />
          ۱. حمایت از گروه
        </button>

        <button
          id="subtab-sessions"
          onClick={() => setActiveSubTab('sessions')}
          className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 py-2 px-3.5 rounded-lg text-xs sm:text-sm font-bold transition cursor-pointer ${
            activeSubTab === 'sessions'
              ? 'bg-white text-blue-800 shadow-2xs border border-slate-200/70'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <MessageSquare className="w-4 h-4 text-blue-600" />
          ۲. نشست‌ها
        </button>

        <button
          id="subtab-classes"
          onClick={() => setActiveSubTab('classes')}
          className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 py-2 px-3.5 rounded-lg text-xs sm:text-sm font-bold transition cursor-pointer ${
            activeSubTab === 'classes'
              ? 'bg-white text-indigo-800 shadow-2xs border border-slate-200/70'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <BookOpen className="w-4 h-4 text-indigo-600" />
          ۳. کلاس‌ها و کارگاه‌ها
        </button>
      </div>

      {/* Activities Content Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {filteredActivities.map((act) => {
          const isRegistered = registeredIds.includes(act.id);
          return (
            <div
              key={act.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 flex flex-col justify-between shadow-2xs hover:border-slate-300 hover:shadow-xs transition-all space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                    act.category === 'group_support'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200/80'
                      : act.category === 'sessions'
                      ? 'bg-blue-50 text-blue-800 border-blue-200/80'
                      : 'bg-indigo-50 text-indigo-800 border-indigo-200/80'
                  }`}>
                    {act.category === 'group_support' ? 'حمایت مالی/تجهیزاتی' : act.category === 'sessions' ? 'نشست تخصصی' : 'کارگاه آموزشی'}
                  </span>

                  <span className="text-[11px] font-medium text-slate-500">
                    {act.status === 'upcoming' ? 'پیش‌رو' : act.status === 'ongoing' ? 'در حال برگزاری' : 'پایان‌یافته'}
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                  {act.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed text-justify font-normal">
                  {act.description}
                </p>

                {/* Specific field for Support Amount */}
                {act.supportAmount && (
                  <div className="bg-emerald-50/90 p-3 rounded-xl border border-emerald-200/80 text-xs shadow-2xs">
                    <span className="text-emerald-700 font-semibold">ارزش بسته حمایتی: </span>
                    <strong className="text-emerald-900 font-bold">{act.supportAmount}</strong>
                  </div>
                )}

                <div className="space-y-1.5 text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    <span>متولی / مدرس: </span>
                    <strong className="text-slate-800">{act.speakerOrMentor}</strong>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>زمان: </span>
                    <span className="text-slate-700">{act.date} - {act.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>مکان: </span>
                    <span className="text-slate-700">{act.location}</span>
                  </div>
                  {act.capacity && (
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>ظرفیت ثبت‌نام: </span>
                      <span className="text-slate-700 font-mono">{(act.registeredCount || 0) + (isRegistered ? 1 : 0)} از {act.capacity} نفر</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action button */}
              <div className="pt-2">
                {isRegistered ? (
                  <div className="w-full py-2 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-bold text-center border border-emerald-200 flex items-center justify-center gap-1.5 shadow-2xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ثبت‌نام شما با موفقیت انجام شد
                  </div>
                ) : (
                  <button
                    onClick={() => handleRegister(act.id)}
                    className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition cursor-pointer flex items-center justify-center gap-1.5 shadow-xs border border-slate-750"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    {act.category === 'group_support' ? 'ارسال درخواست دریافت حمایت' : 'ثبت‌نام و رزرو صندلی'}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Activity Modal (Admin) */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl border border-slate-200 space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                تعریف فعالیت جدید ({activeSubTab === 'group_support' ? 'بسته حمایتی' : activeSubTab === 'sessions' ? 'نشست تخصصی' : 'کلاس و کارگاه'})
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">مشخصات رویداد یا بسته حمایتی را وارد کنید.</p>
            </div>
            <form onSubmit={handleCreateActivity} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">عنوان برنامه:</label>
                <input
                  type="text"
                  required
                  placeholder="عنوان نشست، کارگاه یا طرح حمایت..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50/80 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">مدرس / سخنران / نهاد حامی:</label>
                <input
                  type="text"
                  value={newSpeaker}
                  onChange={(e) => setNewSpeaker(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50/80 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">تاریخ برگزاری:</label>
                  <input
                    type="text"
                    placeholder="مثلاً: پنجشنبه ۲۵ بهمن"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50/80 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">مکان / بستر برگزاری:</label>
                  <input
                    type="text"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50/80 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                  />
                </div>
              </div>

              {activeSubTab === 'group_support' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">میزان یا نوع حمایت:</label>
                  <input
                    type="text"
                    placeholder="مثال: گرنت ۵۰ میلیون تومانی..."
                    value={newSupportAmount}
                    onChange={(e) => setNewSupportAmount(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50/80 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">توضیحات و اهداف برنامه:</label>
                <textarea
                  rows={3}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50/80 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition cursor-pointer"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition cursor-pointer shadow-xs"
                >
                  ثبت فعالیت
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
