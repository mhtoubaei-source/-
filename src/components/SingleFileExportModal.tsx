import React, { useState } from 'react';
import { X, Download, Copy, Check, FileCode, ExternalLink } from 'lucide-react';

interface SingleFileExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SingleFileExportModal: React.FC<SingleFileExportModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const standaloneHtmlCode = `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>سامانه جامع مدیریت هسته‌های علمی، پژوهشی و تربیتی</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Vazirmatn', system-ui, -apple-system, sans-serif;
    }
  </style>
</head>
<body class="bg-slate-50 text-slate-800 antialiased min-h-screen">

  <!-- Top Bar & Role Switcher -->
  <header class="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
    <div class="bg-slate-900 text-slate-200 px-4 py-2 text-xs">
      <div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div class="flex items-center gap-2">
          <span class="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span class="text-slate-300 font-bold">مرکز هدایت علمی-پژوهشی و تربیتی</span>
        </div>
        <div class="flex items-center gap-2 bg-slate-800 p-1 rounded-xl border border-slate-700">
          <span class="text-[11px] text-slate-400 ml-2">سطح دسترسی:</span>
          <button id="role-admin-btn" onclick="setAppRole('admin')" class="px-3 py-1 rounded-lg text-xs font-bold bg-blue-600 text-white">مدیر سیستم / هسته</button>
          <button id="role-student-btn" onclick="setAppRole('student')" class="px-3 py-1 rounded-lg text-xs font-bold text-slate-300 hover:text-white">دانشجو / عضو هسته</button>
        </div>
      </div>
    </div>

    <!-- Main Navigation Bar -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-md">
            مرکز
          </div>
          <div>
            <div class="text-base font-extrabold text-slate-900">سامانه هدایت تربیتی و پژوهشی</div>
            <p class="text-[11px] text-slate-500">پایش مرحله‌ای و تایملاین تعاملی پروژه‌ها</p>
          </div>
        </div>

        <nav class="flex items-center gap-2 text-xs font-bold">
          <button onclick="switchPage('core-programs')" id="nav-tab-1" class="px-3 py-2 rounded-xl text-blue-700 bg-blue-50">۱. برنامه‌های هسته‌ها</button>
          <button onclick="switchPage('center-cores')" id="nav-tab-2-1" class="px-3 py-2 rounded-xl text-slate-600 hover:bg-slate-100">۲-۱. نمایش هسته‌ها</button>
          <button onclick="switchPage('center-activities')" id="nav-tab-2-2" class="px-3 py-2 rounded-xl text-slate-600 hover:bg-slate-100">۲-۲. فعالیت‌ها</button>
          <button onclick="switchPage('side-activities')" id="nav-tab-3" class="px-3 py-2 rounded-xl text-slate-600 hover:bg-slate-100">۳. فعالیت‌های جانبی</button>
        </nav>
      </div>
    </div>
  </header>

  <!-- Main Container -->
  <main class="max-w-7xl mx-auto px-4 sm:px-6 py-8">
    <!-- View: Programs -->
    <section id="page-core-programs" class="space-y-6">
      <div class="bg-gradient-to-l from-slate-900 via-slate-800 to-blue-950 text-white p-8 rounded-3xl shadow-xl">
        <h1 class="text-3xl font-black mb-3">برنامه‌های هسته‌های علمی-پژوهشی و تربیتی</h1>
        <p class="text-slate-300 text-sm leading-relaxed max-w-3xl">
          هسته‌ها بستر حل مسائل واقعی نظام تعلیم و تربیت با حضور اساتید، معلمان و نخبگان دانشجویی هستند.
        </p>
        <button onclick="switchPage('center-cores')" class="mt-4 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold">مشاهده کارنامه و پروژه‌های هسته‌ها</button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="bg-white p-5 rounded-2xl border border-slate-200">
          <h3 class="font-bold text-sm text-slate-900 mb-1">۱. مسئله‌محوری</h3>
          <p class="text-xs text-slate-500">پاسخ‌گویی به چالش‌های ملموس مدارس و نظام آموزشی</p>
        </div>
        <div class="bg-white p-5 rounded-2xl border border-slate-200">
          <h3 class="font-bold text-sm text-slate-900 mb-1">۲. شاگردپروری</h3>
          <p class="text-xs text-slate-500">رشد پژوهشگران جوان در کنار اساتید صاحب‌نظر</p>
        </div>
        <div class="bg-white p-5 rounded-2xl border border-slate-200">
          <h3 class="font-bold text-sm text-slate-900 mb-1">۳. تولید محصول</h3>
          <p class="text-xs text-slate-500">طراحی بسته‌های مداخله‌ای، پروتکل‌ها و نرم‌افزارها</p>
        </div>
        <div class="bg-white p-5 rounded-2xl border border-slate-200">
          <h3 class="font-bold text-sm text-slate-900 mb-1">۴. پایش ۷ مرحله‌ای</h3>
          <p class="text-xs text-slate-500">نظارت پیوسته بر فرآیند رشد طرح از ایده تا خاتمه</p>
        </div>
      </div>
    </section>

    <!-- View: Cores -->
    <section id="page-center-cores" class="space-y-6 hidden">
      <div class="flex items-center justify-between bg-white p-6 rounded-3xl border border-slate-200">
        <div>
          <h2 class="text-xl font-black text-slate-900">۲-۱. نمایش هسته‌های پژوهشی و پروژه‌ها</h2>
          <p class="text-xs text-slate-500 mt-1">با کلیک روی هر پروژه، تایملاین ۷ مرحله‌ای باز می‌شود.</p>
        </div>
        <div id="student-notice" class="hidden text-xs bg-emerald-100 text-emerald-800 px-3 py-1.5 rounded-xl font-bold">
          نمایش فیلترشده ویژه دانشجو
        </div>
      </div>

      <!-- Core 1 -->
      <div class="bg-white rounded-3xl border border-slate-200 p-6 space-y-4">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <span class="text-xs bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full font-bold">فناوری‌های نوین تربیتی</span>
            <h3 class="text-xl font-bold text-slate-900 mt-1">هسته هوش مصنوعی و داده‌کاوی تربیتی</h3>
            <p class="text-xs text-slate-500">پردیس مرکزی، ساختمان پژوهش | مدیر: دکتر علیرضا محمدی | دبیر: مهندس نوری</p>
          </div>
          <div class="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl">
            اعضا: محمدحسین حسینی، سارا رحمانی، رضا شاکری
          </div>
        </div>

        <div class="space-y-2">
          <div class="text-xs font-bold text-slate-700">پروژه‌های فعال هسته:</div>
          <div onclick="openTimeline('prj-1')" class="bg-slate-50 hover:bg-blue-50/50 p-4 rounded-2xl border border-slate-200 cursor-pointer flex items-center justify-between">
            <div>
              <span class="text-xs font-mono font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">EDU-AI-101</span>
              <h4 class="text-sm font-bold text-slate-900 mt-1">سامانه ارزیابی هوشمند بازخوردهای تربیتی معلمان با رویکرد پردازش متن</h4>
              <p class="text-xs text-slate-500">مسئول دانشجو: محمدحسین حسینی | مرحله جاری: ارزیابی دوم (فاز ۲)</p>
            </div>
            <div class="text-left shrink-0">
              <span class="text-xs font-bold text-blue-600">باز کردن تایملاین ◀</span>
              <div class="text-[11px] text-slate-400 font-mono mt-1">۷۵٪ پیشرفت</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Core 2 -->
      <div class="bg-white rounded-3xl border border-slate-200 p-6 space-y-4">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <span class="text-xs bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-bold">روان‌شناسی و رشد شناختی</span>
            <h3 class="text-xl font-bold text-slate-900 mt-1">هسته علوم شناختی و روان‌شناسی تربیتی</h3>
            <p class="text-xs text-slate-500">دانشکده علوم تربیتی | مدیر: دکتر مریم کاظمی | دبیر: زهرا موسوی</p>
          </div>
          <div class="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl">
            اعضا: فاطمه صادقی، سید مهدی طباطبایی، الهام بهرامی
          </div>
        </div>

        <div class="space-y-2">
          <div class="text-xs font-bold text-slate-700">پروژه‌های فعال هسته:</div>
          <div onclick="openTimeline('prj-2')" class="bg-slate-50 hover:bg-blue-50/50 p-4 rounded-2xl border border-slate-200 cursor-pointer flex items-center justify-between">
            <div>
              <span class="text-xs font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">COG-EDU-201</span>
              <h4 class="text-sm font-bold text-slate-900 mt-1">تدوین پروتکل تقویت توجه و خودتنظیمی هیجانی در نوجوانان</h4>
              <p class="text-xs text-slate-500">مسئول دانشجو: فاطمه صادقی | مرحله جاری: دفاع نهایی و صدور گواهی</p>
            </div>
            <div class="text-left shrink-0">
              <span class="text-xs font-bold text-blue-600">باز کردن تایملاین ◀</span>
              <div class="text-[11px] text-slate-400 font-mono mt-1">۹۵٪ پیشرفت</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- View: Activities -->
    <section id="page-center-activities" class="space-y-6 hidden">
      <div class="bg-white p-6 rounded-3xl border border-slate-200">
        <h2 class="text-xl font-black text-slate-900">۲-۲. فعالیت‌های مرکز هدایت تربیتی</h2>
        <p class="text-xs text-slate-500 mt-1">۱. حمایت از گروه | ۲. نشست‌ها | ۳. کلاس‌ها و کارگاه‌ها</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div class="bg-white p-6 rounded-3xl border border-slate-200 space-y-3">
          <span class="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold">۱. حمایت از گروه</span>
          <h3 class="text-base font-bold text-slate-900">گرنت پژوهشی طرح‌های نوآورانه تربیتی</h3>
          <p class="text-xs text-slate-600">تخصیص تا سقف ۸۰ میلیون تومان برای طرح‌های مصوب شورا.</p>
          <button onclick="alert('درخواست حمایت برای هسته شما ثبت شد.')" class="w-full py-2 bg-slate-900 text-white rounded-xl text-xs font-bold">ارسال درخواست گرنت</button>
        </div>

        <div class="bg-white p-6 rounded-3xl border border-slate-200 space-y-3">
          <span class="px-2.5 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs font-bold">۲. نشست‌ها</span>
          <h3 class="text-base font-bold text-slate-900">نشست تخصصی هوش مصنوعی در بوم تربیت اسلامی</h3>
          <p class="text-xs text-slate-600">با حضور اساتید برجسته | چهارشنبه ۲۸ آذر ساعت ۱۴</p>
          <button onclick="alert('صندلی شما رزرو گردید.')" class="w-full py-2 bg-slate-900 text-white rounded-xl text-xs font-bold">رزرو صندلی در نشست</button>
        </div>

        <div class="bg-white p-6 rounded-3xl border border-slate-200 space-y-3">
          <span class="px-2.5 py-0.5 bg-indigo-100 text-indigo-800 rounded-full text-xs font-bold">۳. کلاس‌ها</span>
          <h3 class="text-base font-bold text-slate-900">کارگاه روش‌شناسی پژوهش‌های آمیخته تربیتی</h3>
          <p class="text-xs text-slate-600">آموزش کار با نرم‌افزارهای MAXQDA و SPSS | پنجشنبه‌ها</p>
          <button onclick="alert('ثبت‌نام در کارگاه انجام شد.')" class="w-full py-2 bg-slate-900 text-white rounded-xl text-xs font-bold">ثبت‌نام در کارگاه</button>
        </div>
      </div>
    </section>

    <!-- View: Side Activities -->
    <section id="page-side-activities" class="space-y-6 hidden">
      <div class="bg-white p-6 rounded-3xl border border-slate-200">
        <h2 class="text-xl font-black text-slate-900">۳. فعالیت‌ها و رویدادهای جانبی</h2>
        <p class="text-xs text-slate-500 mt-1">همایش‌ها، مسابقات، اردوها و بازدیدهای علمی</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div class="bg-white p-6 rounded-3xl border border-slate-200 space-y-3">
          <span class="px-2.5 py-0.5 bg-amber-100 text-amber-800 rounded-full text-xs font-bold">همایش ملی</span>
          <h3 class="text-lg font-bold text-slate-900">همایش ملی نوآوری‌های فناورانه در تعلیم و تربیت</h3>
          <p class="text-xs text-slate-600">ارائه مقالات برگزیده هسته‌های پژوهشی سراسر کشور | اردیبهشت ۱۴۰۴</p>
          <button onclick="alert('اطلاعات همایش برای شما ارسال خواهد شد.')" class="w-full py-2 bg-slate-900 text-white rounded-xl text-xs font-bold">مشاهده محورها و ثبت‌نام</button>
        </div>

        <div class="bg-white p-6 rounded-3xl border border-slate-200 space-y-3">
          <span class="px-2.5 py-0.5 bg-amber-100 text-amber-800 rounded-full text-xs font-bold">مسابقه ملی</span>
          <h3 class="text-lg font-bold text-slate-900">مسابقه ایده‌پروری مسائل تربیتی مدارس (تربیت‌تاپ)</h3>
          <p class="text-xs text-slate-600">رقابت استارتاپ‌ها و هسته‌های دانشجویی در حل مسائل پرورشی | اسفند ۱۴۰۳</p>
          <button onclick="alert('فرم مسابقه برای شما فعال شد.')" class="w-full py-2 bg-slate-900 text-white rounded-xl text-xs font-bold">ارسال ایده</button>
        </div>
      </div>
    </section>
  </main>

  <!-- TIMELINE MODAL (Heart of the system) -->
  <div id="timeline-modal" class="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 hidden">
    <div class="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
      <!-- Modal Header -->
      <div class="bg-slate-900 text-white p-5 flex items-center justify-between">
        <div>
          <span class="px-2 py-0.5 bg-blue-600/40 text-blue-300 text-xs font-mono font-bold rounded">EDU-AI-101</span>
          <h3 id="modal-project-title" class="text-lg font-bold text-white mt-1">تایملاین ۷ مرحله‌ای پروژه پژوهشی</h3>
        </div>
        <button onclick="closeTimeline()" class="text-slate-400 hover:text-white p-2 rounded-xl text-xl">✕</button>
      </div>

      <!-- Stepper 7 Tabs -->
      <div class="bg-slate-100 p-3 border-b border-slate-200 flex items-center gap-1 overflow-x-auto text-xs font-bold">
        <button onclick="renderStep(1)" id="t-step-1" class="px-3 py-2 rounded-xl bg-white text-blue-800 shadow-sm whitespace-nowrap">۱. انتخاب مسئله</button>
        <button onclick="renderStep(2)" id="t-step-2" class="px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-200 whitespace-nowrap">۲. ارائه به مرکز</button>
        <button onclick="renderStep(3)" id="t-step-3" class="px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-200 whitespace-nowrap">۳. ارزیابی اولیه</button>
        <button onclick="renderStep(4)" id="t-step-4" class="px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-200 whitespace-nowrap">۴. تأیید نهایی</button>
        <button onclick="renderStep(5)" id="t-step-5" class="px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-200 whitespace-nowrap">۵. ارزیابی اول</button>
        <button onclick="renderStep(6)" id="t-step-6" class="px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-200 whitespace-nowrap">۶. ارزیابی دوم</button>
        <button onclick="renderStep(7)" id="t-step-7" class="px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-200 whitespace-nowrap">۷. خاتمه و ارزیابی بعدی</button>
      </div>

      <!-- Step Content Area -->
      <div id="step-content-box" class="p-6 overflow-y-auto flex-1 space-y-4">
        <!-- Injected via JavaScript -->
      </div>

      <!-- Modal Footer -->
      <div class="bg-slate-50 p-4 border-t border-slate-200 flex items-center justify-between">
        <button onclick="closeTimeline()" class="px-4 py-2 bg-slate-200 text-slate-700 rounded-xl text-xs font-bold">بستن پنجره</button>
        <span class="text-xs text-slate-400">سیستم تعاملی تایملاین مرکز هدایت تربیتی</span>
      </div>
    </div>
  </div>

  <script>
    let currentRole = 'admin';
    let currentStepNum = 1;

    const stepData = {
      1: {
        title: 'گام اول: انتخاب مسئله',
        badge: 'تکمیل‌شده',
        badgeClass: 'bg-emerald-100 text-emerald-800',
        content: \`
          <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
            <div class="text-xs font-bold text-slate-700">وضعیت مسئله: مشخص و تاییدشده</div>
            <div class="text-sm font-bold text-slate-900">عنوان مسئله: تحلیل بازخوردهای تربیتی معلمان با پردازش متن</div>
            <p class="text-xs text-slate-600 leading-relaxed">نبود بازخورد بهنگام تربیتی معلمان به عنوان چالش اصلی افت انگیزه تحصیلی شناسایی شد.</p>
          </div>
          <div class="border border-slate-200 rounded-2xl p-4 bg-white">
            <div class="text-xs font-bold text-slate-800 mb-2">سیستم فایل پیوست:</div>
            <div class="text-xs bg-slate-50 p-2 rounded-lg flex items-center justify-between">
              <span>سند_تبیین_مسئله.pdf (۱.۸ مگابایت)</span>
              <button onclick="alert('دانلود شبیه‌سازی شد.')" class="text-blue-600 font-bold">دانلود</button>
            </div>
          </div>
        \`
      },
      2: {
        title: 'گام دوم: ارائه به مرکز',
        badge: 'تکمیل‌شده',
        badgeClass: 'bg-emerald-100 text-emerald-800',
        content: \`
          <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
            <div class="text-xs font-bold text-slate-700">وضعیت ارسال: فرم الف و پروپوزال تسلیم دبیرخانه شد</div>
            <div class="text-xs text-slate-500">تاریخ ارائه: ۱۴۰۳/۰۸/۲۴</div>
          </div>
        \`
      },
      3: {
        title: 'گام سوم: ارزیابی اولیه',
        badge: 'تأیید شورا',
        badgeClass: 'bg-emerald-100 text-emerald-800',
        content: \`
          <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
            <div class="text-xs font-bold text-slate-700">نتیجه داوری: تأیید کامل با اصلاحات جزیی</div>
            <div class="text-xs text-slate-800 font-bold">نظر ارزیاب: طرح دارای نوآوری آشکار و قابلیت اجرای میدانی است.</div>
          </div>
        \`
      },
      4: {
        title: 'گام چهارم: تأیید نهایی مرکز',
        badge: 'ابلاغ رسمی',
        badgeClass: 'bg-emerald-100 text-emerald-800',
        content: \`
          <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
            <div class="text-xs font-bold text-slate-700">شماره ابلاغیه: مرکز/۱۴۰۳/پ/۱۰۱</div>
            <div class="text-xs text-slate-500">تاریخ تصویب شورا: ۱۴۰۳/۰۹/۱۵</div>
          </div>
        \`
      },
      5: {
        title: 'گام پنجم: ارزیابی اول (فاز ۱)',
        badge: 'نمره ۸۸ از ۱۰۰',
        badgeClass: 'bg-emerald-100 text-emerald-800',
        content: \`
          <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
            <div class="text-xs font-bold text-slate-700">گزارش فاز ۱: تدوین مبانی نظری و استخراج شاخص‌ها</div>
            <p class="text-xs text-slate-600">نظر ناظر علمی: چارچوب مفهومی با استحکام تدوین گردیده است.</p>
          </div>
        \`
      },
      6: {
        title: 'گام ششم: ارزیابی دوم (فاز ۲)',
        badge: 'در حال انجام',
        badgeClass: 'bg-blue-100 text-blue-800',
        content: \`
          <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
            <div class="text-xs font-bold text-slate-700">آزمون میدانی الگوریتم در مدارس پایلوت</div>
            <p class="text-xs text-slate-600">در حال جمع‌آوری داده‌های پیش‌آزمون و پس‌آزمون مربیان.</p>
            <div class="pt-2">
              <input type="file" id="file-up" onchange="alert('فایل گزارش با موفقیت آپلود شد.')" class="text-xs">
            </div>
          </div>
        \`
      },
      7: {
        title: 'گام هفتم: ارزیابی‌های بعدی و خاتمه پروژه',
        badge: 'در انتظار',
        badgeClass: 'bg-slate-100 text-slate-600',
        content: \`
          <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
            <div class="text-xs font-bold text-slate-700">خاتمه، دفاع نهایی و صدور گواهی</div>
            <p class="text-xs text-slate-600">برگزاری کارگاه ارائه دستاوردها برای مدیران مدارس (اردیبهشت ۱۴۰۴)</p>
          </div>
        \`
      }
    };

    function setAppRole(role) {
      currentRole = role;
      const adminBtn = document.getElementById('role-admin-btn');
      const studentBtn = document.getElementById('role-student-btn');
      const notice = document.getElementById('student-notice');

      if (role === 'admin') {
        adminBtn.className = 'px-3 py-1 rounded-lg text-xs font-bold bg-blue-600 text-white';
        studentBtn.className = 'px-3 py-1 rounded-lg text-xs font-bold text-slate-300 hover:text-white';
        if (notice) notice.classList.add('hidden');
      } else {
        studentBtn.className = 'px-3 py-1 rounded-lg text-xs font-bold bg-emerald-600 text-white';
        adminBtn.className = 'px-3 py-1 rounded-lg text-xs font-bold text-slate-300 hover:text-white';
        if (notice) notice.classList.remove('hidden');
      }
    }

    function switchPage(pageId) {
      ['core-programs', 'center-cores', 'center-activities', 'side-activities'].forEach(p => {
        const el = document.getElementById('page-' + p);
        if (el) el.classList.add('hidden');
      });
      const target = document.getElementById('page-' + pageId);
      if (target) target.classList.remove('hidden');
    }

    function openTimeline(prjId) {
      const modal = document.getElementById('timeline-modal');
      if (modal) modal.classList.remove('hidden');
      renderStep(1);
    }

    function closeTimeline() {
      const modal = document.getElementById('timeline-modal');
      if (modal) modal.classList.add('hidden');
    }

    function renderStep(step) {
      currentStepNum = step;
      for (let i = 1; i <= 7; i++) {
        const tab = document.getElementById('t-step-' + i);
        if (tab) {
          if (i === step) {
            tab.className = 'px-3 py-2 rounded-xl bg-white text-blue-800 shadow-sm whitespace-nowrap';
          } else {
            tab.className = 'px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-200 whitespace-nowrap';
          }
        }
      }

      const box = document.getElementById('step-content-box');
      const data = stepData[step];
      if (box && data) {
        box.innerHTML = \`
          <div class="flex items-center justify-between border-b pb-3">
            <h4 class="text-base font-bold text-slate-900">\${data.title}</h4>
            <span class="px-2.5 py-0.5 rounded-full text-xs font-bold \${data.badgeClass}">\${data.badge}</span>
          </div>
          \${data.content}
          <div class="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
            <div class="text-xs font-bold text-slate-700">باکس ثبت و مشاهده نظرات:</div>
            <div class="flex gap-2">
              <input type="text" id="note-input" placeholder="ثبت نظر جدید..." class="flex-1 p-2 text-xs border rounded-lg">
              <button onclick="alert('نظر با موفقیت ذخیره شد.')" class="px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-bold">ثبت</button>
            </div>
          </div>
        \`;
      }
    }
  </script>
</body>
</html>`;

  const handleDownload = () => {
    const blob = new Blob([standaloneHtmlCode], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'scientific_research_center_single_file.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(standaloneHtmlCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[88vh]">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-amber-500/20 text-amber-300 rounded-xl">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                خروجی تک‌فایلی مستقل HTML (Single-file HTML)
              </h3>
              <p className="text-xs text-slate-400">
                کد آماده و مستقل حاوی تمام ساختار HTML، استایل‌های Tailwind و کدهای JS
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 overflow-y-auto">
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-xs text-emerald-900 leading-relaxed">
            <strong>توضیح: </strong>
            این فایل HTML کاملاً خودکفا بوده و از طریق لینک CDN به Tailwind متصل است و فونت فارسی Vazirmatn را لود می‌کند. تمامی ۴ بخش منو، کنترل دسترسی مدیر و دانشجو، و تایملاین ۷ مرحله‌ای در آن به صورت آماده و روان کار می‌کنند و بدون نیاز به هیچ ابزار بیلد، مستقیماً با دو بار کلیک در مرورگر اجرا می‌شود.
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-600 font-semibold">
              <span>پیش‌نمایش محتوای فایل HTML:</span>
              <span className="font-mono text-slate-400">اندازه تقریبی: ~۱۵ کیلوبایت</span>
            </div>
            <pre className="bg-slate-900 text-slate-200 p-4 rounded-2xl text-[11px] font-mono overflow-x-auto max-h-72 dir-ltr text-left">
              {standaloneHtmlCode.slice(0, 1500)}...
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex items-center justify-between gap-3">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 rounded-xl text-xs font-bold transition cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'کد در کلیپ‌بورد کپی شد' : 'کپی کل کد HTML'}</span>
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-600/20 transition cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>دانلود مستقیم فایل HTML</span>
          </button>
        </div>
      </div>
    </div>
  );
};
