import React, { useState } from 'react';
import {
  Sparkles, Trophy, Building, Bus, Calendar,
  MapPin, Users, CheckCircle2, ArrowLeft, Check
} from 'lucide-react';
import { SideActivity, UserRole } from '../types';

interface SideActivitiesViewProps {
  sideActivities: SideActivity[];
  role: UserRole;
}

export const SideActivitiesView: React.FC<SideActivitiesViewProps> = ({
  sideActivities,
  role
}) => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [registeredIds, setRegisteredIds] = useState<string[]>([]);

  const filtered = selectedType === 'all' 
    ? sideActivities 
    : sideActivities.filter(s => s.type === selectedType);

  const handleRegister = (id: string) => {
    if (!registeredIds.includes(id)) {
      setRegisteredIds([...registeredIds, id]);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'conference':
        return <Building className="w-4 h-4 text-blue-600" />;
      case 'competition':
        return <Trophy className="w-4 h-4 text-amber-600" />;
      case 'visit':
        return <Bus className="w-4 h-4 text-emerald-600" />;
      default:
        return <Sparkles className="w-4 h-4 text-indigo-600" />;
    }
  };

  const getTypeName = (type: string) => {
    switch (type) {
      case 'conference':
        return 'همایش ملی';
      case 'competition':
        return 'مسابقه و رویداد رقابتی';
      case 'visit':
        return 'اردوی علمی و بازدید';
      default:
        return 'رویداد متفرقه';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Section Header - Professional Polish */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200/80 text-xs font-bold">
              بخش ۳
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              برنامه‌ها و رویدادهای جانبی
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-normal">
            معرفی همایش‌های علمی ملی، مسابقات ایده‌پروری، اردوهای هم‌اندیشی و بازدیدهای میدانی از مراکز نوآوری
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        <button
          onClick={() => setSelectedType('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer shadow-2xs ${
            selectedType === 'all'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          همه برنامه‌ها ({sideActivities.length})
        </button>
        <button
          onClick={() => setSelectedType('conference')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer shadow-2xs ${
            selectedType === 'conference'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          همایش‌های علمی
        </button>
        <button
          onClick={() => setSelectedType('competition')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer shadow-2xs ${
            selectedType === 'competition'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          مسابقات ایده‌پردازی
        </button>
        <button
          onClick={() => setSelectedType('visit')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer shadow-2xs ${
            selectedType === 'visit'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          اردوها و بازدیدهای علمی
        </button>
      </div>

      {/* Side Activities Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {filtered.map((item) => {
          const isRegistered = registeredIds.includes(item.id);
          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs hover:border-slate-300 hover:shadow-xs transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200/80">
                    {getTypeIcon(item.type)}
                    {getTypeName(item.type)}
                  </span>
                  <span className={`text-[11px] font-semibold ${item.registrationOpen ? 'text-emerald-600' : 'text-slate-400'}`}>
                    {item.registrationOpen ? 'ثبت‌نام فعال' : 'ظرفیت تکمیل / بسته'}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed text-justify font-normal">
                  {item.summary}
                </p>

                <div className="space-y-1.5 text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>تاریخ برگزاری: </span>
                    <strong className="text-slate-800">{item.date}</strong>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>محل برگزاری: </span>
                    <span className="text-slate-700">{item.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    <span>مخاطبان هدف: </span>
                    <span className="text-slate-700">{item.audience}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building className="w-3.5 h-3.5 text-slate-400" />
                    <span>برگزارکننده: </span>
                    <span className="text-slate-700">{item.organizer}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                {isRegistered ? (
                  <div className="w-full py-2.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-1.5 shadow-2xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    درخواست حضور شما در این رویداد ثبت گردید
                  </div>
                ) : (
                  <button
                    disabled={!item.registrationOpen}
                    onClick={() => handleRegister(item.id)}
                    className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs border border-slate-750"
                  >
                    <span>{item.registrationOpen ? 'ثبت‌نام در این برنامه' : 'مهلت ثبت‌نام به پایان رسیده'}</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
