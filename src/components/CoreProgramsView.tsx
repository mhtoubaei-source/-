import React from 'react';
import {
  Target, Compass, Layers, CheckCircle, ArrowLeft,
  Sparkles, Award, Lightbulb, FileSpreadsheet
} from 'lucide-react';

interface CoreProgramsViewProps {
  onNavigateToCores: () => void;
}

export const CoreProgramsView: React.FC<CoreProgramsViewProps> = ({ onNavigateToCores }) => {
  return (
    <div className="space-y-7 animate-in fade-in duration-300">
      {/* Hero Introduction Banner - Professional Polish */}
      <div className="bg-gradient-to-l from-slate-950 via-slate-900 to-blue-950 text-white rounded-2xl p-6 sm:p-9 shadow-lg border border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl space-y-3.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 text-blue-300 text-xs font-semibold border border-blue-400/25">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            معرفی چشم‌انداز، رسالت و رویکردهای تحولی
          </div>
          <h1 className="text-2xl sm:text-3.5xl font-black tracking-tight text-white leading-tight">
            برنامه‌های هسته‌های علمی-پژوهشی و تربیتی
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed text-justify font-normal">
            هسته‌های علمی-پژوهشی کانون‌های جوشان پیوند نظر و عمل هستند؛ جایی که اساتید صاحب‌نظر، معلمان پرتلاش و دانشجویان نخبه گرد هم می‌آیند تا مسائل واقعی، انضمامی و برزمین‌مانده نظام تعلیم و تربیت کشور را با رویکردی عالمانه، فناورانه و مبتنی بر ارزش‌های اسلامی بازخوانی و حل نمایند.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={onNavigateToCores}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center gap-2 transition cursor-pointer shadow-md shadow-blue-600/25 border border-blue-400/20"
            >
              مشاهده کارنامه و پروژه‌های هسته‌ها
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 4 Core Pillars */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2 tracking-tight">
            <Target className="w-5 h-5 text-blue-700" />
            اهداف کلان برنامه هسته‌ها
          </h2>
          <span className="text-xs text-slate-500 font-medium">سند راهبردی مرکز هدایت تربیتی</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:border-blue-300/80 hover:shadow-xs transition-all space-y-3">
            <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-100 shadow-2xs">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">مسئله‌محوری و حل چالش</h3>
            <p className="text-xs text-slate-600 leading-relaxed text-justify">
              تمرکز هسته‌ها بر گره‌های واقعی مدارس، از افت تحصیلی و گسست تربیتی تا شیوه‌های سنجش انطباقی و اخلاق فناوری.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:border-emerald-300/80 hover:shadow-xs transition-all space-y-3">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100 shadow-2xs">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">شاگردپروری و تیم‌سازی</h3>
            <p className="text-xs text-slate-600 leading-relaxed text-justify">
              تربیت نسل نوین پژوهشگران جوان در کنار اساتید راهنما و تعمیق روحیه کار تیمی منسجم و خودجوش دانشجویی.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:border-amber-300/80 hover:shadow-xs transition-all space-y-3">
            <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-100 shadow-2xs">
              <Lightbulb className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">تولید محصولات کاربردی</h3>
            <p className="text-xs text-slate-600 leading-relaxed text-justify">
              خروج از مقاله‌گرایی صرف و دستیابی به بسته‌های مداخله‌ای، پروتکل‌های شناختی، بازی‌های تربیتی و نرم‌افزارهای تحلیلی.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:border-indigo-300/80 hover:shadow-xs transition-all space-y-3">
            <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center border border-indigo-100 shadow-2xs">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">پایش مرحله‌ای و کیفی</h3>
            <p className="text-xs text-slate-600 leading-relaxed text-justify">
              استقرار نظام ارزشیابی ۷ مرحله‌ای دقیق و نظارت پیوسته شورای علمی مرکز از انتخاب مسئله تا دفاع نهایی.
            </p>
          </div>
        </div>
      </div>

      {/* 7-Step Life Cycle Flow Infographic */}
      <div className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200/90 shadow-xs space-y-5">
        <div className="border-b border-slate-100 pb-3.5">
          <div className="text-xs font-bold text-blue-700 mb-1">فرآیند عملیاتی طرح‌ها</div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            چرخه حیات ۷ مرحله‌ای یک پروژه در مرکز هدایت تربیتی
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            تمامی طرح‌های پژوهشی ثبت‌شده در هسته‌ها از مسیر ارزیابی شفاف زیر عبور می‌کنند:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {[
            { step: '۱', title: 'انتخاب مسئله', desc: 'تبیین ابعاد و ضرورت' },
            { step: '۲', title: 'ارائه به مرکز', desc: 'تحویل پیشنهاده رسمی' },
            { step: '۳', title: 'ارزیابی اولیه', desc: 'داوری شورای علمی' },
            { step: '۴', title: 'تأیید نهایی', desc: 'ابلاغ مصوبه و بودجه' },
            { step: '۵', title: 'ارزیابی اول', desc: 'گزارش پیشرفت فاز ۱' },
            { step: '۶', title: 'ارزیابی دوم', desc: 'گزارش پیشرفت فاز ۲' },
            { step: '۷', title: 'خاتمه و کاربست', desc: 'دفاع و صدور گواهی' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-50/70 p-3.5 rounded-xl border border-slate-200/80 text-center relative flex flex-col justify-between hover:bg-white hover:border-blue-200 transition-all shadow-2xs"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-mono font-bold text-xs mx-auto flex items-center justify-center mb-2 shadow-2xs">
                {item.step}
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">{item.title}</div>
                <div className="text-[11px] text-slate-500 mt-1 leading-tight">{item.desc}</div>
              </div>
              {idx < 6 && (
                <div className="hidden lg:block absolute -left-2 top-1/2 -translate-y-1/2 text-slate-400 text-[10px] font-bold">
                  ◀
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Guidelines & Support summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs space-y-3.5">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-xs sm:text-sm">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            شرایط تأسیس و فعالیت یک هسته پژوهشی
          </div>
          <ul className="text-xs text-slate-600 space-y-2.5 leading-relaxed font-normal">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              حضور حداقل یک عضو هیئت علمی به عنوان مدیر هسته با رزومه مرتبط
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              مشارکت حداقل ۳ دانشجوی تحصیلات تکمیلی یا دانشجوی ممتاز
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              تعریف حداقل یک پروژه فعال مصوب سالانه در حیطه نیازهای اولویت‌دار آموزش و پرورش
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              برگزاری منظم جلسات ماهانه حلقه علمی و ارائه گزارش‌های دوره‌ای
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs space-y-3.5">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-xs sm:text-sm">
            <FileSpreadsheet className="w-4 h-4 text-blue-600" />
            بسته‌های توانمندسازی مرکز برای هسته‌ها
          </div>
          <ul className="text-xs text-slate-600 space-y-2.5 leading-relaxed font-normal">
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">•</span>
              تخصیص گرنت‌های پژوهشی تا سقف ۸۰ میلیون تومان به ازای هر طرح مصوب
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">•</span>
              واگذاری زیرساخت‌های آزمایشگاهی، پایگاه‌های آماری و فضاهای استقرار تیمی
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">•</span>
              اعطای گواهی معتبر پژوهشگری و تسهیل امتیازات نخبگانی برای اعضا
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">•</span>
              تسهیل ورود به میدان مدارس و همکاری با معلمان مناطق مختلف کشور
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
