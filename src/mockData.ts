import { Core, Activity, SideActivity, StudentProfile, TimelineStep, Project, DeliverableRequest } from './types';

export const INITIAL_STUDENTS: StudentProfile[] = [
  {
    id: 'std-1',
    name: 'محمدحسین حسینی',
    studentId: '40112345',
    coreId: 'core-ai',
    roleInCore: 'پژوهشگر ارشد و سرتیم پروژه',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'std-2',
    name: 'فاطمه صادقی',
    studentId: '40054321',
    coreId: 'core-cognition',
    roleInCore: 'پژوهشگر هسته علوم شناختی',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'std-3',
    name: 'علی کریمی',
    studentId: '40219876',
    coreId: 'core-curriculum',
    roleInCore: 'عضو تیم پژوهش فلسفه تربیت',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  }
];

export const createDefaultSteps = (projectCode: string): TimelineStep[] => [
  {
    id: 1,
    title: 'انتخاب مسئله',
    shortTitle: 'تعریف مسئله',
    description: 'شناسایی و تبیین مسئله پژوهشی، بیان ضرورت و تعیین ابعاد مسئله تربیتی-علمی',
    status: 'completed',
    lastUpdated: '۱۴۰۳/۰۸/۱۰',
    notes: 'مسئله با مشورت مدیر هسته و با استناد به اسناد بالادستی و نیاز ملموس میدانی نهایی شد.',
    isProblemDefined: true,
    problemTitle: 'بررسی الگوهای یادگیری انطباقی و تحلیل داده‌های رفتاری دانش‌آموزان در بستر سامانه‌های یادگیری مجازی',
    problemStatement: 'در سال‌های اخیر، عدم پایش به‌موقع افت تحصیلی و گسست تربیتی دانش‌آموزان در فضای مجازی به چالشی اساسی تبدیل شده است. این پژوهش در پی شناسایی شاخص‌های رفتاری جهت مداخله زودهنگام مربیان تربیتی است.',
    keywords: ['یادگیری انطباقی', 'داده‌کاوی تربیتی', 'مداخله شناختی', 'هدایت تحصیلی'],
    attachments: [
      {
        id: 'att-1-1',
        name: `سند_تبیین_مسئله_${projectCode}.pdf`,
        size: '۱.۸ مگابایت',
        uploadedBy: 'محمدحسین حسینی (مسئول پروژه)',
        uploadedAt: '۱۴۰۳/۰۸/۱۰',
        fileType: 'application/pdf'
      }
    ]
  },
  {
    id: 2,
    title: 'ارائه به مرکز',
    shortTitle: 'ارائه پروپوزال',
    description: 'ارسال رسمی پروپوزال و مستندات تدوین‌شده به دبیرخانه مرکز هدایت تربیتی',
    status: 'completed',
    lastUpdated: '۱۴۰۳/۰۸/۲۵',
    notes: 'فرم الف و ب طرح پژوهشی همراه با امضای مدیر هسته به مرکز تسلیم شد.',
    submissionDate: '۱۴۰۳/۰۸/۲۴',
    proposalType: 'طرح توسعه‌ای-پژوهشی کاربردی',
    isSubmittedToCenter: true,
    attachments: [
      {
        id: 'att-2-1',
        name: `فرم_رسمی_پیشنهاده_${projectCode}.pdf`,
        size: '۳.۴ مگابایت',
        uploadedBy: 'محمدحسین حسینی',
        uploadedAt: '۱۴۰۳/۰۸/۲۴',
        fileType: 'application/pdf'
      },
      {
        id: 'att-2-2',
        name: `تاییدیه_مدیر_هسته_${projectCode}.jpg`,
        size: '۸۵۰ کیلوبایت',
        uploadedBy: 'دکتر علیرضا محمدی',
        uploadedAt: '۱۴۰۳/۰۸/۲۵',
        fileType: 'image/jpeg'
      }
    ]
  },
  {
    id: 3,
    title: 'ارزیابی اولیه',
    shortTitle: 'داوری اولیه',
    description: 'بررسی طرح در شورای علمی مرکز از حیث نوآوری، قابلیت اجرا و انطباق با اهداف تربیتی',
    status: 'completed',
    lastUpdated: '۱۴۰۳/۰۹/۰۸',
    notes: 'طرح در جلسه ۶۵ شورای ارزیابی مرکز مطرح و پس از اعمال اصلاحات جزیی تایید شد.',
    evaluationResult: 'approved',
    evaluatorName: 'شورای داوران مرکز هدایت (دکتر تقوی و دکتر رضایی)',
    evaluatorComment: 'طرح دارای چارچوب مفهومی منسجم و مسئله‌مندی آشکار است. پیشنهاد شد نمونه آماری به سه مقطع تحصیلی تعمیم یابد.',
    evaluationDate: '۱۴۰۳/۰۹/۰۵',
    attachments: [
      {
        id: 'att-3-1',
        name: `کاربرگ_ارزیابی_اولیه_${projectCode}.pdf`,
        size: '۱.۱ مگابایت',
        uploadedBy: 'دبیرخانه شورای ارزیابی',
        uploadedAt: '۱۴۰۳/۰۹/۰۸',
        fileType: 'application/pdf'
      }
    ]
  },
  {
    id: 4,
    title: 'تأیید نهایی مرکز',
    shortTitle: 'تأیید رسمی مرکز',
    description: 'صدور مصوبه رسمی، ابلاغ بودجه و تخصیص کد شناسه طرح پژوهشی',
    status: 'completed',
    lastUpdated: '۱۴۰۳/۰۹/۱۸',
    notes: 'قرارداد پژوهشی فی‌مابین مرکز و هسته منعقد و قسط اول گرنت واریز گردید.',
    officialApprovalStatus: 'approved',
    approvalNumber: `مرکز/۱۴۰۳/پ/${projectCode}`,
    approvalDate: '۱۴۰۳/۰۹/۱۵',
    centerNotes: 'تایید قطعی ابلاغ شد. موعد ارائه گزارش فاز اول: پایان دی‌ماه ۱۴۰۳.',
    attachments: [
      {
        id: 'att-4-1',
        name: `ابلاغیه_مصوبه_شورای_عالی_مرکز.pdf`,
        size: '۶۵۰ کیلوبایت',
        uploadedBy: 'ریاست مرکز هدایت تربیتی',
        uploadedAt: '۱۴۰۳/۰۹/۱۸',
        fileType: 'application/pdf'
      }
    ]
  },
  {
    id: 5,
    title: 'ارزیابی اول',
    shortTitle: 'گزارش فاز ۱',
    description: 'ارائه گزارش پیشرفت فاز اول، مرور مبانی نظری، طراحی مدل و جمع‌آوری داده‌های مقدماتی',
    status: 'completed',
    lastUpdated: '۱۴۰۳/۱۱/۰۲',
    notes: 'گزارش فاز اول شامل ۱۲۰ صفحه مستندات و داده‌های میدانی دریافت و داوری شد.',
    phaseTitle: 'تدوین چارچوب مفهومی و استخراج شاخص‌های رفتاری-تربیتی',
    phaseReportSummary: 'استخراج ۴۲ مولفه رفتاری دانش‌آموز در کاربری سامانه‌های برخط و خوشه‌بندی داده‌های ۳ مدرسه پایلوت.',
    score: 88,
    phaseEvaluator: 'دکتر تقوی (ناظر علمی طرح)',
    phaseEvaluationComment: 'پیشرفت فاز نخست بسیار رضایت‌بخش است. مدل مفهومی از استحکام لازم برخوردار است.',
    attachments: [
      {
        id: 'att-5-1',
        name: `گزارش_پیشرفت_فاز_اول_${projectCode}.pdf`,
        size: '۵.۲ مگابایت',
        uploadedBy: 'محمدحسین حسینی',
        uploadedAt: '۱۴۰۳/۱۰/۲۸',
        fileType: 'application/pdf'
      },
      {
        id: 'att-5-2',
        name: `صورتجلسه_ارزیابی_فاز_یک.pdf`,
        size: '۹۵۰ کیلوبایت',
        uploadedBy: 'ناظر علمی مرکز',
        uploadedAt: '۱۴۰۳/۱۱/۰۲',
        fileType: 'application/pdf'
      }
    ]
  },
  {
    id: 6,
    title: 'ارزیابی دوم',
    shortTitle: 'گزارش فاز ۲',
    description: 'ارزیابی پیاده‌سازی عملیاتی، آزمون کارایی ابزار در میدان واقعی و تحلیل خروجی‌ها',
    status: 'in_progress',
    lastUpdated: '۱۴۰۳/۱۲/۰۴',
    notes: 'آزمون پایلوت الگوریتم پیش‌بینی در ۲ دبیرستان منطقه در حال اجراست.',
    phaseTitle: 'پیاده‌سازی پایلوت، اعتبارسنجی الگوریتم و دریافت فیدبک مشاوران',
    phaseReportSummary: 'در حال نگارش گزارش اعتبارسنجی تجربی و تدوین نتایج مقایسه‌ای پیش‌آزمون و پس‌آزمون مربیان.',
    score: undefined,
    phaseEvaluator: 'دکتر تقوی (ناظر علمی)',
    phaseEvaluationComment: 'در انتظار ارسال نسخه نهایی گزارش فاز دوم توسط تیم پروژه تا موعد ۱۵ اسفند.',
    attachments: [
      {
        id: 'att-6-1',
        name: `پیش‌نویس_گزارش_فاز۲_${projectCode}.docx`,
        size: '۲.۱ مگابایت',
        uploadedBy: 'محمدحسین حسینی',
        uploadedAt: '۱۴۰۳/۱۲/۰۱',
        fileType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      }
    ]
  },
  {
    id: 7,
    title: 'ارزیابی‌های بعدی و خاتمه پروژه',
    shortTitle: 'ارزیابی نهایی و خاتمه',
    description: 'دفاعیه نهایی، تحویل بسته‌های عملیاتی، صدور گواهی پایان پروژه و ثبت در سامانه دستاوردها',
    status: 'locked',
    lastUpdated: 'در انتظار تکمیل فاز ۲',
    notes: 'پس از تایید فاز ۲، جلسه دفاع نهایی برگزار و گواهی اختتام پژوهش صادر خواهد شد.',
    completionCertificateIssued: false,
    finalScore: undefined,
    finalEvaluationComment: 'این مرحله پس از ارزیابی و تسویه فاز دوم فعال خواهد شد.',
    additionalStages: [
      {
        title: 'برگزاری کارگاه ارائه دستاوردها برای مدیران مدارس',
        date: 'اردیبهشت ۱۴۰۴',
        status: 'برنامه‌ریزی‌شده',
        notes: 'دعوت از ۳۰ مدیر و مشاور تربیتی استان'
      },
      {
        title: 'استخراج و چاپ مقاله علمی-پژوهشی در نشریه تربیت اسلامی',
        date: 'تیر ۱۴۰۴',
        status: 'در دست تدوین',
        notes: 'ارسال مقاله به نشریه پژوهش در مسائل تعلیم و تربیت'
      }
    ],
    attachments: []
  }
];

export const INITIAL_CORES: Core[] = [
  {
    id: 'core-ai',
    title: 'هسته هوش مصنوعی و داده‌کاوی تربیتی',
    category: 'فناوری‌های نوین تربیتی',
    director: 'دکتر علیرضا محمدی',
    secretary: 'مهندس حسام نوری',
    establishedYear: '۱۴۰۱',
    location: 'پردیس مرکزی، ساختمان پژوهش، طبقه سوم، اتاق ۳۰۸',
    color: 'emerald',
    iconName: 'Cpu',
    description: 'تمرکز بر پیوند فناوری‌های هوش مصنوعی، یادگیری ماشین و تحلیل کلان‌داده‌ها با فرآیندهای رشد اخلاقی، تحصیلی و تربیتی نوجوانان.',
    members: [
      'دکتر علیرضا محمدی (عضو هیئت علمی و مدیر هسته)',
      'محمدحسین حسینی (دانشجوی دکتری مهندسی نرم‌افزار و سرتیم)',
      'سارا رحمانی (کارشناس ارشد روان‌سنجی)',
      'رضا شاکری (کارشناس هوش مصنوعی)',
      'نرگس عسگری (پژوهشگر علوم تربیتی)'
    ],
    projectsCount: 2,
    activeProjects: [
      {
        id: 'prj-ai-01',
        coreId: 'core-ai',
        title: 'سامانه ارزیابی هوشمند بازخوردهای تربیتی معلمان با رویکرد پردازش متن',
        code: 'EDU-AI-101',
        summary: 'طراحی موتور هوشمند تحلیل سبک ارتباطی معلمان با دانش‌آموزان و ارائه پیشنهادات بهینه‌سازی بازخوردهای کلاسی.',
        manager: 'دکتر علیرضا محمدی',
        studentLead: 'محمدحسین حسینی',
        members: ['محمدحسین حسینی', 'رضا شاکری', 'سارا رحمانی'],
        startDate: '۱۴۰۳/۰۷/۱۵',
        targetEndDate: '۱۴۰۴/۰۲/۳۰',
        currentStepIndex: 5, // currently at step 6 (index 5)
        overallStatus: 'in_progress',
        progressPercentage: 75,
        steps: createDefaultSteps('101')
      },
      {
        id: 'prj-ai-02',
        coreId: 'core-ai',
        title: 'مدل‌سازی مسیر رشد فردی دانش‌آموز بر اساس یادگیری تقویتی و تحلیل رفتار',
        code: 'EDU-AI-102',
        summary: 'تدوین درخت تصمیم و الگوریتم‌های انطباقی برای پیشنهاد فعالیت‌های پرورشی متناسب با تیپ شخصیتی و استعداد فردی.',
        manager: 'دکتر علیرضا محمدی',
        studentLead: 'نرگس عسگری',
        members: ['نرگس عسگری', 'محمدحسین حسینی'],
        startDate: '۱۴۰۳/۰۹/۰۱',
        targetEndDate: '۱۴۰۴/۰۴/۱۵',
        currentStepIndex: 2, // step 3 (index 2)
        overallStatus: 'in_progress',
        progressPercentage: 35,
        steps: [
          {
            id: 1,
            title: 'انتخاب مسئله',
            shortTitle: 'تعریف مسئله',
            description: 'تبیین ابعاد مسئله مدل‌سازی مسیر رشد تربیتی فردی‌سازی شده',
            status: 'completed',
            lastUpdated: '۱۴۰۳/۰۹/۱۰',
            notes: 'مسئله مبتنی بر سند تحول بنیادین و الگوی تعالی تربیت طراحی شد.',
            isProblemDefined: true,
            problemTitle: 'فردی‌سازی برنامه‌های تربیتی با استفاده از یادگیری تقویتی',
            problemStatement: 'نبود سامانه‌ای برای رصد پیوسته تمایلات و ظرفیت‌های انحصاری هر دانش‌آموز و ارائه بسته‌های رشدی سفارشی‌سازی‌شده.',
            keywords: ['مسیر رشد فردی', 'شخصی‌سازی آموزش', 'یادگیری تقویتی'],
            attachments: [
              {
                id: 'att-ai2-1',
                name: 'پروپوزال_مقدماتی_مسیر_رشد.pdf',
                size: '۲.۰ مگابایت',
                uploadedBy: 'نرگس عسگری',
                uploadedAt: '۱۴۰۳/۰۹/۰۵',
                fileType: 'application/pdf'
              }
            ]
          },
          {
            id: 2,
            title: 'ارائه به مرکز',
            shortTitle: 'ارائه پروپوزال',
            description: 'تسلیم پروپوزال رسمی به مرکز هدایت تربیتی',
            status: 'completed',
            lastUpdated: '۱۴۰۳/۰۹/۲۸',
            notes: 'پروپوزال در قالب آیین‌نامه طرح‌های مصوب ثبت گردید.',
            submissionDate: '۱۴۰۳/۰۹/۲۵',
            proposalType: 'طرح اکتشافی-کاربردی',
            isSubmittedToCenter: true,
            attachments: [
              {
                id: 'att-ai2-2',
                name: 'فرم_الف_پیشنهاده_طرح.pdf',
                size: '۲.۹ مگابایت',
                uploadedBy: 'نرگس عسگری',
                uploadedAt: '۱۴۰۳/۰۹/۲۵',
                fileType: 'application/pdf'
              }
            ]
          },
          {
            id: 3,
            title: 'ارزیابی اولیه',
            shortTitle: 'داوری اولیه',
            description: 'بررسی در شورای داوری مرکز',
            status: 'in_progress',
            lastUpdated: '۱۴۰۳/۱۰/۰۸',
            notes: 'طرح در حال حاضر در دست ارزیابی دو داور متخصص است.',
            evaluationResult: 'pending',
            evaluatorName: 'کمیته تخصصی فناوری تربیتی',
            evaluatorComment: 'در حال بررسی ضرورت‌ها و اعتبارسنجی الگوریتم پیشنهادی.',
            evaluationDate: 'در جریان',
            attachments: []
          },
          {
            id: 4,
            title: 'تأیید نهایی مرکز',
            shortTitle: 'تأیید رسمی',
            description: 'صدور ابلاغیه و آغاز مرحله فاز اول',
            status: 'locked',
            lastUpdated: '-',
            notes: 'پس از اتمام ارزیابی اولیه فعال می‌گردد.',
            attachments: []
          },
          {
            id: 5,
            title: 'ارزیابی اول',
            shortTitle: 'گزارش فاز ۱',
            description: 'ارائه گزارش پیشرفت فاز نخست',
            status: 'locked',
            lastUpdated: '-',
            notes: '-',
            attachments: []
          },
          {
            id: 6,
            title: 'ارزیابی دوم',
            shortTitle: 'گزارش فاز ۲',
            description: 'ارائه گزارش پیشرفت فاز دوم',
            status: 'locked',
            lastUpdated: '-',
            notes: '-',
            attachments: []
          },
          {
            id: 7,
            title: 'ارزیابی‌های بعدی و خاتمه پروژه',
            shortTitle: 'خاتمه پروژه',
            description: 'تحویل نهایی و صدور گواهی',
            status: 'locked',
            lastUpdated: '-',
            notes: '-',
            attachments: []
          }
        ]
      }
    ]
  },
  {
    id: 'core-cognition',
    title: 'هسته علوم شناختی و روان‌شناسی تربیتی',
    category: 'روان‌شناسی و رشد شناختی',
    director: 'دکتر مریم کاظمی',
    secretary: 'زهرا موسوی',
    establishedYear: '۱۴۰۰',
    location: 'دانشکده علوم تربیتی و روان‌شناسی، طبقه دوم، آزمایشگاه شناختی',
    color: 'sky',
    iconName: 'Brain',
    description: 'تحقیق پیرامون مکانیسم‌های توجه، حافظه کاری، کارکردهای اجرایی مغز و توسعه بسته‌های مداخله‌ای شناختی در بستر ارزش‌های اسلامی-ایرانی.',
    members: [
      'دکتر مریم کاظمی (دانشیار روان‌شناسی و مدیر هسته)',
      'فاطمه صادقی (دانشجوی کارشناسی ارشد روان‌شناسی شناختی)',
      'سید مهدی طباطبایی (پژوهشگر عصب‌روان‌شناسی)',
      'الهام بهرامی (مشاور مدارس استعدادهای درخشان)'
    ],
    projectsCount: 1,
    activeProjects: [
      {
        id: 'prj-cog-01',
        coreId: 'core-cognition',
        title: 'تدوین پروتکل تقویت توجه و خودتنظیمی هیجانی در نوجوانان دوره متوسطه',
        code: 'COG-EDU-201',
        summary: 'طراحی بسته تمرینات بازی‌محور شناختی جهت افزایش تاب‌آوری تحصیلی و کاهش اضطراب در آزمون‌های سرنوشت‌ساز.',
        manager: 'دکتر مریم کاظمی',
        studentLead: 'فاطمه صادقی',
        members: ['فاطمه صادقی', 'سید مهدی طباطبایی', 'الهام بهرامی'],
        startDate: '۱۴۰۳/۰۶/۰۱',
        targetEndDate: '۱۴۰۴/۰۱/۳۱',
        currentStepIndex: 6, // Step 7 (closeout stage)
        overallStatus: 'completed',
        progressPercentage: 95,
        steps: [
          {
            id: 1,
            title: 'انتخاب مسئله',
            shortTitle: 'تعریف مسئله',
            description: 'افت تمرکز و افزایش هیجان‌زدگی منفی در امتحانات نهایی',
            status: 'completed',
            lastUpdated: '۱۴۰۳/۰۶/۱۰',
            notes: 'مسئله کاملاً با پژوهش‌های میدانی در ۱۰ دبیرستان احراز شد.',
            isProblemDefined: true,
            problemTitle: 'کاهش اضطراب امتحان از طریق تقویت کارکردهای اجرایی شناختی',
            problemStatement: 'بیش از ۳۵ درصد دانش‌آموزان با اضطراب شدید امتحان مواجهند که ریشه در ضعف مهارتهای خودتنظیمی شناختی دارد.',
            keywords: ['کارکردهای اجرایی', 'خودتنظیمی', 'اضطراب آزمون', 'توجه پایدار'],
            attachments: [
              {
                id: 'att-cog-1',
                name: 'طرح_مسئله_شناختی.pdf',
                size: '۱.۳ مگابایت',
                uploadedBy: 'فاطمه صادقی',
                uploadedAt: '۱۴۰۳/۰۶/۰۸',
                fileType: 'application/pdf'
              }
            ]
          },
          {
            id: 2,
            title: 'ارائه به مرکز',
            shortTitle: 'ارائه پروپوزال',
            description: 'ثبت پرونده و معرفی داوران تخصصی',
            status: 'completed',
            lastUpdated: '۱۴۰۳/۰۶/۲۵',
            notes: 'طرح با تایید معاونت پژوهشی به مرکز تحویل شد.',
            submissionDate: '۱۴۰۳/۰۶/۲۰',
            proposalType: 'طرح تجربی-میدانی',
            isSubmittedToCenter: true,
            attachments: []
          },
          {
            id: 3,
            title: 'ارزیابی اولیه',
            shortTitle: 'داوری اولیه',
            description: 'تایید ابزارها و نمونه‌گیری',
            status: 'completed',
            lastUpdated: '۱۴۰۳/۰۷/۱۰',
            notes: 'پروتکل آزمایش با اصلاح چند متغیر مداخله‌گر تایید گردید.',
            evaluationResult: 'approved',
            evaluatorName: 'دکتر میرزایی',
            evaluatorComment: 'طرح آزمایش و گروه‌های کنترل و آزمایش به دقت تبیین شده است.',
            evaluationDate: '۱۴۰۳/۰۷/۰۸',
            attachments: []
          },
          {
            id: 4,
            title: 'تأیید نهایی مرکز',
            shortTitle: 'تأیید مصوبه',
            description: 'تصویب در هیئت نظارت',
            status: 'completed',
            lastUpdated: '۱۴۰۳/۰۷/۲۰',
            notes: 'مجوز ورود به مدارس صادر شد.',
            officialApprovalStatus: 'approved',
            approvalNumber: 'مرکز/۱۴۰۳/پ/۲۰۱',
            approvalDate: '۱۴۰۳/۰۷/۱۵',
            attachments: []
          },
          {
            id: 5,
            title: 'ارزیابی اول',
            shortTitle: 'گزارش فاز ۱',
            description: 'تحلیل داده‌های پیش‌آزمون و اجرای جلسات تمرینی',
            status: 'completed',
            lastUpdated: '۱۴۰۳/۰۹/۱۵',
            notes: 'اجرای جلسات ۱۰ گانه با دقت مستندسازی شد.',
            phaseTitle: 'اجرای بسته مداخله در ۵۰ دانش‌آموز گروه آزمایش',
            score: 94,
            phaseEvaluator: 'دکتر میرزایی',
            phaseEvaluationComment: 'شاخص‌های ارزیابی رشد چشمگیری در تمرکز پایدار نشان داد.',
            attachments: []
          },
          {
            id: 6,
            title: 'ارزیابی دوم',
            shortTitle: 'گزارش فاز ۲',
            description: 'تحلیل داده‌های پس‌آزمون و پیگیری یک‌ماهه',
            status: 'completed',
            lastUpdated: '۱۴۰۳/۱۱/۲۰',
            notes: 'اثربخشی مداخله در آزمون مجدد تایید و ثبت شد.',
            phaseTitle: 'تحلیل آماری کوواریانس و سنجش مانایی اثر مداخله',
            score: 96,
            phaseEvaluator: 'دکتر میرزایی',
            phaseEvaluationComment: 'نتایج فوق‌العاده و شایان تبدیل به کتابچه راهنمای معلمان است.',
            attachments: []
          },
          {
            id: 7,
            title: 'ارزیابی‌های بعدی و خاتمه پروژه',
            shortTitle: 'خاتمه و صدور گواهی',
            description: 'دفاعیه نهایی، انتشار راهنما و تسویه قرارداد',
            status: 'in_progress',
            lastUpdated: '۱۴۰۳/۱۲/۰۵',
            notes: 'کتابچه راهنما تحویل مرکز چاپ شد و گواهی اختتام در آستانه صدور است.',
            completionCertificateIssued: true,
            finalScore: 95,
            finalEvaluationComment: 'پروژه با بالاترین درجه کیفی به فرجام رسید.',
            additionalStages: [
              {
                title: 'چاپ کتابچه راهنمای معلم برای تمرینات شناختی کلاسی',
                date: 'بهمن ۱۴۰۳',
                status: 'تکمیل‌شده',
                notes: 'در تیراژ ۵۰۰ نسخه توسط مرکز هدایت چاپ شد.'
              }
            ],
            attachments: [
              {
                id: 'att-cog-cert',
                name: 'گواهی_رسمی_خاتمه_طرح_COG-201.pdf',
                size: '۷۵۰ کیلوبایت',
                uploadedBy: 'مدیر کل مرکز هدایت تربیتی',
                uploadedAt: '۱۴۰۳/۱۲/۰۲',
                fileType: 'application/pdf'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'core-curriculum',
    title: 'هسته فلسفه تربیت و برنامه‌ریزی درسی تحولی',
    category: 'مبانی نظری و برنامه‌ریزی درسی',
    director: 'دکتر حامد رضوی',
    secretary: 'محمدرضا سلطانی',
    establishedYear: '۱۳۹۹',
    location: 'پردیس اندیشه، تالار علامه طباطبایی، دفتر هسته فلسفه',
    color: 'amber',
    iconName: 'BookOpen',
    description: 'پژوهش در مبانی حکمت اسلامی، بازخوانی فلسفه تربیت معلم و بازطراحی بسته‌های درسی با تکیه بر شایستگی‌های هویت‌ساز.',
    members: [
      'دکتر حامد رضوی (استاد تمام فلسفه تعلیم و تربیت)',
      'علی کریمی (دانشجوی ارشد برنامه‌ریزی درسی)',
      'مریم جعفری (پژوهشگر اسناد تحول)',
      'حسن مرادی (دبیر دبیرستان ماندگار البرز)'
    ],
    projectsCount: 1,
    activeProjects: [
      {
        id: 'prj-cur-01',
        coreId: 'core-curriculum',
        title: 'الگوی نوین ارزشیابی شایستگی‌محور در مدارس مبتنی بر سند تحول',
        code: 'PHI-EDU-301',
        summary: 'طراحی چارچوب مفهومی و نشانگرهای ارزیابی تربیتی فراتر از آزمون‌های حافظه‌محور.',
        manager: 'دکتر حامد رضوی',
        studentLead: 'علی کریمی',
        members: ['علی کریمی', 'مریم جعفری'],
        startDate: '۱۴۰۳/۰۸/۰۱',
        targetEndDate: '۱۴۰۴/۰۳/۱۵',
        currentStepIndex: 2, // Step 3
        overallStatus: 'revision_needed',
        progressPercentage: 40,
        steps: [
          {
            id: 1,
            title: 'انتخاب مسئله',
            shortTitle: 'تعریف مسئله',
            description: 'نارسایی سنجش‌های کمی فعلی در بازنمایی ساحت‌های شش‌گانه تربیت',
            status: 'completed',
            lastUpdated: '۱۴۰۳/۰۸/۱۵',
            notes: 'مسئله مبتنی بر کاستی‌های کارنامه‌های مرسوم مدارس تدوین شد.',
            isProblemDefined: true,
            problemTitle: 'عبور از سنجش نمره‌ای به سنجش چندوجهی ساحت‌های تربیتی',
            problemStatement: 'نظام فعلی کارنامه تحصیلی قادر به بازتاب ابعاد اخلاقی، اجتماعی، زیستی و هنری متربیان نیست.',
            keywords: ['ساحت‌های تربیت', 'ارزشیابی توصیفی-شایستگی', 'سند تحول'],
            attachments: []
          },
          {
            id: 2,
            title: 'ارائه به مرکز',
            shortTitle: 'ارائه پروپوزال',
            description: 'تسلیم پیشنهاد پژوهش',
            status: 'completed',
            lastUpdated: '۱۴۰۳/۰۸/۳۰',
            notes: 'در موعد مقرر تحویل داده شد.',
            submissionDate: '۱۴۰۳/۰۸/۲۸',
            proposalType: 'طرح تحلیلی-بنیادین',
            isSubmittedToCenter: true,
            attachments: []
          },
          {
            id: 3,
            title: 'ارزیابی اولیه',
            shortTitle: 'نیازمند اصلاح',
            description: 'بررسی در شورای داوران',
            status: 'revision_needed',
            lastUpdated: '۱۴۰۳/۰۹/۲۰',
            notes: 'شورای علمی خواستار شفاف‌سازی ابزار اجرایی و افزودن نمونه فرم‌های میدانی شدند.',
            evaluationResult: 'revision_needed',
            evaluatorName: 'دکتر شمس (شورای ارزیابی)',
            evaluatorComment: 'طرح از نظر مبانی غنی است ولی در بعد ابزار اجرایی دچار ابهام است. لطفاً بخش سنجه‌های عملیاتی بازنویسی شود.',
            evaluationDate: '۱۴۰۳/۰۹/۱۸',
            attachments: [
              {
                id: 'att-rev-1',
                name: 'یادداشت_اصلاحیه_داوران.pdf',
                size: '۵۰۰ کیلوبایت',
                uploadedBy: 'دبیرخانه شورای ارزیابی',
                uploadedAt: '۱۴۰۳/۰۹/۲۰',
                fileType: 'application/pdf'
              }
            ]
          },
          {
            id: 4,
            title: 'تأیید نهایی مرکز',
            shortTitle: 'تأیید نهایی',
            description: 'در انتظار رفع اصلاحات اولیه',
            status: 'locked',
            lastUpdated: '-',
            notes: 'منوط به ارائه اصلاحیه است.',
            attachments: []
          },
          {
            id: 5,
            title: 'ارزیابی اول',
            shortTitle: 'گزارش فاز ۱',
            description: 'فاز اول تدوین سنجه‌ها',
            status: 'locked',
            lastUpdated: '-',
            notes: '-',
            attachments: []
          },
          {
            id: 6,
            title: 'ارزیابی دوم',
            shortTitle: 'گزارش فاز ۲',
            description: 'آزمون پایلوت در دو مدرسه',
            status: 'locked',
            lastUpdated: '-',
            notes: '-',
            attachments: []
          },
          {
            id: 7,
            title: 'ارزیابی‌های بعدی و خاتمه پروژه',
            shortTitle: 'خاتمه طرح',
            description: 'دفاعیه و انتشار کاربست',
            status: 'locked',
            lastUpdated: '-',
            notes: '-',
            attachments: []
          }
        ]
      }
    ]
  },
  {
    id: 'core-media',
    title: 'هسته رسانه و زیست‌بوم فضای مجازی کودک و نوجوان',
    category: 'رسانه و تربیت دیجیتال',
    director: 'دکتر جواد صامتی',
    secretary: 'مهدیه اخوان',
    establishedYear: '۱۴۰۲',
    location: 'ساختمان مراکز رشد، استودیو فناوری تربیتی',
    color: 'indigo',
    iconName: 'Smartphone',
    description: 'مطالعه و رصد الگوهای مصرف رسانه‌ای نسل جدید، بازی‌سازی تربیتی، سواد روایتگری و پیشگیری از آسیب‌های فضای سایبری.',
    members: [
      'دکتر جواد صامتی (مدیر هسته و دکتری ارتباطات)',
      'مهدیه اخوان (کارشناس ارشد رسانه‌های دیجیتال)',
      'امیرمحمد طاهری (توسعه‌دهنده بازی‌های شناختی)',
      'سحر افشار (پژوهشگر جامعه‌شناسی ارتباطات)'
    ],
    projectsCount: 1,
    activeProjects: [
      {
        id: 'prj-med-01',
        coreId: 'core-media',
        title: 'پلتفرم تعاملی ارزیابی و توانمندسازی سواد رسانه‌ای مربیان پرورشی',
        code: 'MED-LIT-401',
        summary: 'توسعه برنامه کاربردی میکرولرنینگ برای آموزش سریع شناسایی محتواهای گمراه‌کننده و اعتیاد به بازی‌های برخط.',
        manager: 'دکتر جواد صامتی',
        studentLead: 'امیرمحمد طاهری',
        members: ['امیرمحمد طاهری', 'مهدیه اخوان'],
        startDate: '۱۴۰۳/۰۹/۱۵',
        targetEndDate: '۱۴۰۴/۰۴/۳۰',
        currentStepIndex: 1, // Step 2 (Submission to center)
        overallStatus: 'in_progress',
        progressPercentage: 20,
        steps: [
          {
            id: 1,
            title: 'انتخاب مسئله',
            shortTitle: 'تعریف مسئله',
            description: 'شکاف عمیق بین زبان نسل نو و توانمندی تحلیل رسانه‌ای مربیان مدارس',
            status: 'completed',
            lastUpdated: '۱۴۰۳/۰۹/۲۰',
            notes: 'مسئله از طریق نیازسنجی گسترده در ۱۰۰ کانون پرورشی احراز شد.',
            isProblemDefined: true,
            problemTitle: 'ارتقای سواد انتقادی رسانه‌ای در مواجهه با محتوای هوش مصنوعی و دیپ‌فیک',
            problemStatement: 'نیاز به بسته‌ای کاربردی و چابک برای توانمندسازی معلمان و مربیان پرورشی در شناسایی جریان‌های فکری مخرب دیجیتال.',
            keywords: ['سواد رسانه', 'دیجیتال نیتِو', 'میکرولرنینگ', 'اعتیاد اینترنتی'],
            attachments: []
          },
          {
            id: 2,
            title: 'ارائه به مرکز',
            shortTitle: 'ارائه پروپوزال',
            description: 'در حال ارسال و ثبت رسمی در دبیرخانه مرکز هدایت',
            status: 'in_progress',
            lastUpdated: '۱۴۰۳/۱۰/۰۲',
            notes: 'فرم‌های شماره ۱ تا ۳ پر شده و در دست بارگذاری است.',
            submissionDate: '۱۴۰۳/۱۰/۰۵',
            proposalType: 'طرح محصول‌محور رسانه‌ای',
            isSubmittedToCenter: false,
            attachments: []
          },
          {
            id: 3,
            title: 'ارزیابی اولیه',
            shortTitle: 'داوری اولیه',
            description: 'در انتظار اتمام مرحله ارائه به مرکز',
            status: 'locked',
            lastUpdated: '-',
            notes: '-',
            attachments: []
          },
          {
            id: 4,
            title: 'تأیید نهایی مرکز',
            shortTitle: 'تأیید رسمی',
            description: 'صدور ابلاغیه',
            status: 'locked',
            lastUpdated: '-',
            notes: '-',
            attachments: []
          },
          {
            id: 5,
            title: 'ارزیابی اول',
            shortTitle: 'گزارش فاز ۱',
            description: 'توسعه ماژول‌های ۵ گانه آموزشی',
            status: 'locked',
            lastUpdated: '-',
            notes: '-',
            attachments: []
          },
          {
            id: 6,
            title: 'ارزیابی دوم',
            shortTitle: 'گزارش فاز ۲',
            description: 'پایلوت در دو منطقه آموزش و پرورش',
            status: 'locked',
            lastUpdated: '-',
            notes: '-',
            attachments: []
          },
          {
            id: 7,
            title: 'ارزیابی‌های بعدی و خاتمه پروژه',
            shortTitle: 'خاتمه پروژه',
            description: 'رونمایی از محصول نهایی',
            status: 'locked',
            lastUpdated: '-',
            notes: '-',
            attachments: []
          }
        ]
      }
    ]
  }
];

export const INITIAL_ACTIVITIES: Activity[] = [
  // 1. حمایت از گروه (Group Support)
  {
    id: 'act-sup-1',
    category: 'group_support',
    title: 'فراخوان تخصیص گرنت پژوهشی طرح‌های نوآورانه تربیتی سال ۱۴۰۳',
    speakerOrMentor: 'صندوق حمایت از پژوهش‌های تربیتی مرکز',
    date: 'مهلت ثبت: تا پایان آذر ۱۴۰۳',
    time: '۸:۰۰ الی ۱۵:۳۰',
    location: 'سامانه الکترونیکی دبیرخانه مرکز هدایت',
    description: 'تخصیص تا سقف ۸۰ میلیون تومان گرنت بلاعوض برای هسته‌هایی که طرح‌های آن‌ها در مرحله ارزیابی اولیه شورا امتیاز بالاتر از ۸۵ کسب نماید.',
    status: 'ongoing',
    tags: ['گرنت پژوهشی', 'حمایت مالی', 'تجهیز هسته‌ها'],
    supportAmount: '۸۰,۰۰۰,۰۰۰ تومان',
    supportType: 'گرنت مستقیم و کمک‌هزینه انتشار مقاله'
  },
  {
    id: 'act-sup-2',
    category: 'group_support',
    title: 'تخصیص فضای استقرار و زیرساخت سرور و پردازش ابری',
    speakerOrMentor: 'واحد پشتیبانی و فناوری مرکز',
    date: 'دائمی در طول سال تحصیلی',
    time: 'مستمر',
    location: 'پردیس فناوری و اتاق‌های اختصاصی هسته‌ها',
    description: 'واگذاری ایستگاه‌های کاری (Workstations) مجهز، دسترسی به پایگاه‌های علمی معتبر بین‌المللی و سرورهای گرافیکی برای هسته‌های پردازش داده.',
    status: 'ongoing',
    tags: ['زیرساخت فیزیکی', 'سرور پردازشی', 'پایگاه‌های داده'],
    supportAmount: 'دسترسی رایگان سازمانی',
    supportType: 'تجهیزات و زیرساخت سخت‌افزاری'
  },
  {
    id: 'act-sup-3',
    category: 'group_support',
    title: 'بسته منتورینگ حقوقی و ثبت معنوی دستاوردهای پژوهشی',
    speakerOrMentor: 'کلینیک حقوق مالکیت فکری دانشگاه',
    date: 'شنبه‌ها و سه‌شنبه‌ها',
    time: '۱۰:۰۰ الی ۱۲:۰۰',
    location: 'دفتر مشاوره حقوقی مرکز هدایت',
    description: 'مشاوره رایگان برای عقد تفاهم‌نامه‌ها با مدارس و نهادهای آموزشی، ثبت پتنت، حق کپی‌رایت نرم‌افزارها و قراردادهای پژوهشی.',
    status: 'ongoing',
    tags: ['مالکیت فکری', 'مشاوره حقوقی', 'ثبت اختراع'],
    supportAmount: 'مشاوره و پوشش ۱۰۰٪ هزینه‌ها',
    supportType: 'حمایت حقوقی و ثبت دستاورد'
  },

  // 2. نشست‌ها (Sessions)
  {
    id: 'act-ses-1',
    category: 'sessions',
    title: 'نشست تخصصی: فرصت‌ها و چالش‌های هوش مصنوعی زاینده در بوم تربیت اسلامی',
    speakerOrMentor: 'دکتر علیرضا محمدی و حجت‌الاسلام دکتر موسوی',
    date: 'چهارشنبه ۲۸ آذر ۱۴۰۳',
    time: '۱۴:۰۰ الی ۱۶:۳۰',
    location: 'تالار گفتگو و اندیشه‌ورزی مرکز هدایت',
    capacity: 60,
    registeredCount: 52,
    description: 'بررسی نسبت مدل‌های زبانی بزرگ با جهان‌بینی تربیتی، نحوه تولید محتوای اخلاقی و الزامات نظارتی مدارس هوشمند.',
    status: 'upcoming',
    tags: ['نشست هم‌اندیشی', 'هوش مصنوعی', 'اخلاق فناوری']
  },
  {
    id: 'act-ses-2',
    category: 'sessions',
    title: 'کرسی نقد و نظر: سنجش ساحت‌های تربیتی سند تحول بنیادین؛ آرمان یا واقعیت؟',
    speakerOrMentor: 'دکتر حامد رضوی و دکتر صادقی',
    date: 'دوشنبه ۱۲ آذر ۱۴۰۳',
    time: '۱۰:۰۰ الی ۱۲:۳۰',
    location: 'سالن همایش‌های شهید چمران',
    capacity: 80,
    registeredCount: 80,
    description: 'مناظره علمی پیرامون قابلیت تبدیل شاخص‌های کیفی مندرج در سند تحول به سنجه‌های ملموس در کارنامه مدارس سراسر کشور.',
    status: 'completed',
    tags: ['کرسی نظریه‌پردازی', 'سند تحول', 'ارزشیابی']
  },
  {
    id: 'act-ses-3',
    category: 'sessions',
    title: 'حلقه اشتراک تجربه: تجارب میدانی هسته‌ها در تعامل با معلمان مدارس مناطق محروم',
    speakerOrMentor: 'دبیران و مسئولان دانشجویی هسته‌های فعال',
    date: 'سه‌شنبه ۴ دی ۱۴۰۳',
    time: '۱۵:۰۰ الی ۱۷:۰۰',
    location: 'سالن جلسات شهید رجایی',
    capacity: 40,
    registeredCount: 31,
    description: 'انتقال تجارب زیسته پژوهشگران جوان در پیاده‌سازی پرسشنامه‌ها و کارگاه‌ها در مدارس با امکانات محدود و راهکارهای غلبه بر مقاومت سازمانی.',
    status: 'upcoming',
    tags: ['انتقال تجربه', 'میدان تربیت', 'عدالت آموزشی']
  },

  // 3. کلاس‌ها و کارگاه‌ها (Classes & Workshops)
  {
    id: 'act-cls-1',
    category: 'classes',
    title: 'دوره فشرده: روش‌شناسی پژوهش‌های آمیخته (کیفی و کمی) در علوم تربیتی',
    speakerOrMentor: 'دکتر فریده اسماعیلی (استاد روش تحقیق)',
    date: 'شروع از ۱۵ آذر ۱۴۰۳ (۴ جلسه پنجشنبه‌ها)',
    time: '۹:۰۰ الی ۱۳:۰۰',
    location: 'کارگاه آموزشی شماره ۲ مرکز',
    capacity: 30,
    registeredCount: 28,
    description: 'آموزش عملی نرم‌افزارهای MAXQDA و SPSS، نحوه طراحی پرسشنامه‌های استاندارد روان‌سنجی و مصاحبه‌های نیمه‌ساختاریافته تربیتی.',
    status: 'ongoing',
    tags: ['روش تحقیق', 'MAXQDA', 'تحلیل آماری', 'کارگاه مهارتی']
  },
  {
    id: 'act-cls-2',
    category: 'classes',
    title: 'کارگاه مهارت‌افزایی: اصول مقاله‌نویسی علمی-پژوهشی و ISI برای دانشجویان',
    speakerOrMentor: 'دکتر مریم کاظمی',
    date: 'پنجشنبه ۲۲ دی ۱۴۰۳',
    time: '۸:۳۰ الی ۱۲:۳۰',
    location: 'سالن سمینار دانشکده روان‌شناسی',
    capacity: 50,
    registeredCount: 45,
    description: 'آشنایی با ساختار استاندارد مقالات IMRAD، انتخاب نشریه معتبر، نحوه پاسخگویی به ایرادات داوران و اخلاق نشر علمی.',
    status: 'upcoming',
    tags: ['مقاله‌نویسی', 'ISI', 'پژوهش برتر']
  },
  {
    id: 'act-cls-3',
    category: 'classes',
    title: 'کلاس مهارتی: فنون ارتباط موثر و مربی‌گری (کوچینگ) تربیتی نوجوانان',
    speakerOrMentor: 'استاد رحیمیان (روان‌درمانگر و مشاور)',
    date: 'یکشنبه‌ها ساعت ۱۶ الی ۱۸ (به مدت ۶ هفته)',
    time: '۱۶:۰۰ الی ۱۸:۰۰',
    location: 'کلینیک روان‌شناسی و هدایت تربیتی',
    capacity: 25,
    registeredCount: 25,
    description: 'تکنیک‌های گوش دادن فعال، حل مسئله مشارکتی با نوجوان، مدیریت بحران‌های هویتی و تنظیم مرزهای ارتباطی مربی-متربی.',
    status: 'completed',
    tags: ['کوچینگ تربیتی', 'مهارت‌های ارتباطی', 'مشاوره نوجوان']
  }
];

export const INITIAL_SIDE_ACTIVITIES: SideActivity[] = [
  {
    id: 'side-1',
    title: 'همایش ملی نوآوری‌های فناورانه در تعلیم و تربیت اسلامی',
    type: 'conference',
    organizer: 'مرکز هدایت علمی-پژوهشی و تربیتی با همکاری دانشگاه فرهنگیان',
    date: '۵ و ۶ اردیبهشت ۱۴۰۴',
    location: 'مرکز همایش‌های بین‌المللی دانشگاه',
    summary: 'ارائه دستاوردهای هسته‌های پژوهشی سراسر کشور، برپایی نمایشگاه پوستر طرح‌ها، و تقدیر از برترین پروژه‌های دانش‌بنیان تربیتی.',
    registrationOpen: true,
    audience: 'پژوهشگران، اساتید، معلمان و دانشجویان علوم تربیتی'
  },
  {
    id: 'side-2',
    title: 'مسابقه ملی ایده‌پروری و استارتاپ‌های حل مسائل تربیتی مدارس (تربیت‌تاپ)',
    type: 'competition',
    organizer: 'شتاب‌دهنده فناوری‌های تربیتی رشد و مرکز هدایت',
    date: 'بهمن ۱۴۰۳ - مرحله نهایی اسفند ۱۴۰۳',
    location: 'پردیس نوآوری‌های تربیتی',
    summary: 'رقابت تیم‌های دانشجویی برای ارائه راهکارهای نوآورانه در کاهش افت انگیزه تحصیلی، بازی‌وارسازی آموزش و ارتقای بهداشت روانی.',
    registrationOpen: true,
    audience: 'دانشجویان خلاق، اعضای هسته‌ها و تیم‌های کارآفرینی'
  },
  {
    id: 'side-3',
    title: 'اردوی زیارتی-علمی مشهد مقدس و هم‌اندیشی مدیران و اعضای هسته‌ها',
    type: 'visit',
    organizer: 'معاونت فرهنگی و تربیتی مرکز هدایت',
    date: '۲۵ الی ۲۸ دی‌ماه ۱۴۰۳',
    location: 'مشهد مقدس - هتل پردیس دانشگاه',
    summary: 'برنامه‌ای ترکیبی از جلسات هم‌افزایی علمی و شبکه‌سازی میان هسته‌های پژوهشی به همراه برنامه‌های معنوی و زیارتی.',
    registrationOpen: false,
    audience: 'اعضای فعال هسته‌های پژوهشی و مدیران منتخب'
  },
  {
    id: 'side-4',
    title: 'بازدید تخصصی از مراکز رشد علوم انسانی و شرکت‌های دانش‌بنیان فناوری آموزشی',
    type: 'visit',
    organizer: 'واحد ارتباط با صنعت و جامعه مرکز هدایت',
    date: 'پنجشنبه ۱۸ بهمن ۱۴۰۳',
    location: 'پارک فناوری پردیس و پژوهشگاه علوم انسانی',
    summary: 'مشاهده میدانی خطوط تولید اسباب‌بازی‌های شناختی، پلتفرم‌های یادگیری الکترونیکی و نشست با کارآفرینان برتر حوزه اجوتک.',
    registrationOpen: true,
    audience: 'اعضای هسته‌ها و علاقمندان به تجاری‌سازی طرح‌ها'
  }
];

export const INITIAL_DELIVERABLES: DeliverableRequest[] = [
  {
    id: 'deliv-1',
    projectId: 'prj-ai-01',
    projectCode: 'EDU-AI-101',
    projectTitle: 'سامانه ارزیابی هوشمند بازخوردهای تربیتی معلمان با رویکرد پردازش متن',
    studentLead: 'محمدحسین حسینی',
    stepId: 6,
    stepTitle: 'گام ۶: ارزیابی دوم (گزارش فاز ۲)',
    title: 'ارسال نسخه نهایی گزارش فاز دوم و تحلیل داده‌های پایلوت مدارس',
    description: 'لطفاً گزارش اعتبارسنجی تجربی، نتایج مقایسه‌ای پیش‌آزمون و پس‌آزمون معلمان در مدارس پایلوت و جداول آماری استخراج‌شده را جهت داوری مرحله دوم ارسال نمایید.',
    deadline: '۱۴۰۳/۱۲/۱۵',
    status: 'pending',
    requestedBy: 'دکتر تقوی (ناظر علمی مرکز)',
    requestedAt: '۱۴۰۳/۱۱/۲۰',
    priority: 'urgent'
  },
  {
    id: 'deliv-2',
    projectId: 'prj-cur-01',
    projectCode: 'PHI-EDU-301',
    projectTitle: 'الگوی نوین ارزشیابی شایستگی‌محور در مدارس مبتنی بر سند تحول',
    studentLead: 'علی کریمی',
    stepId: 3,
    stepTitle: 'گام ۳: ارزیابی اولیه (اصلاحیه پروپوزال)',
    title: 'اصلاح ابزار اجرایی و افزودن نمونه فرم‌های میدانی سنجش',
    description: 'بر اساس مصوبه شورای ارزیابی مرکز، سنجه‌های عملیاتی نیازمند بازنگری و ارائه نمونه چک‌لیست‌های میدانی برای مدارس است. فایل اصلاح‌شده پروپوزال را بارگذاری فرمایید.',
    deadline: '۱۴۰۳/۱۲/۱۰',
    status: 'revision_needed',
    requestedBy: 'دکتر شمس (شورای داوری مرکز)',
    requestedAt: '۱۴۰۳/۰۹/۲۰',
    priority: 'urgent',
    feedbackComment: 'طرح از نظر مبانی غنی است ولی در بعد ابزار اجرایی دچار ابهام است. لطفاً بخش سنجه‌های عملیاتی بازنویسی شده و کاربرگ ضمیمه شود.'
  },
  {
    id: 'deliv-3',
    projectId: 'prj-cog-01',
    projectCode: 'EDU-COG-201',
    projectTitle: 'بسته سنجش و ارتقای سواد رسانه‌ای و شناختی نوجوانان در مواجهه با اخبار جعلی',
    studentLead: 'فاطمه صادقی',
    stepId: 3,
    stepTitle: 'گام ۳: ارزیابی اولیه',
    title: 'ارسال مستندات تکمیلی پروتکل آزمون شناختی و مجوز کمیته اخلاق',
    description: 'پروتکل مداخله آزمایشی و کاربرگ موافقت‌نامه والدین دانش‌آموزان شرکت‌کننده در طرح بارگذاری شود.',
    deadline: '۱۴۰۳/۱۲/۲۰',
    status: 'submitted',
    requestedBy: 'دبیرخانه شورای علمی مرکز',
    requestedAt: '۱۴۰۳/۱۱/۲۵',
    submittedAt: '۱۴۰۳/۱۲/۰۴',
    priority: 'high',
    submissionNotes: 'سلام و احترام؛ فایل نهایی پروتکل مداخله شناختی همراه با نمونه پرسشنامه‌ها و فرم کمیته اخلاق پژوهشی ضمیمه گردید.',
    submissionAttachment: {
      id: 'att-sub-cog-1',
      name: 'پروتکل_مداخله_شناختی_صادقی_v2.pdf',
      size: '۳.۱ مگابایت',
      uploadedBy: 'فاطمه صادقی',
      uploadedAt: '۱۴۰۳/۱۲/۰۴',
      fileType: 'application/pdf'
    }
  },
  {
    id: 'deliv-4',
    projectId: 'prj-ai-01',
    projectCode: 'EDU-AI-101',
    projectTitle: 'سامانه ارزیابی هوشمند بازخوردهای تربیتی معلمان با رویکرد پردازش متن',
    studentLead: 'محمدحسین حسینی',
    stepId: 5,
    stepTitle: 'گام ۵: ارزیابی اول (گزارش فاز ۱)',
    title: 'گزارش پیشرفت فاز اول و چارچوب مفهومی شاخص‌های رفتاری',
    description: 'تدوین چارچوب مفهومی و استخراج شاخص‌های رفتاری-تربیتی در ۴۲ مولفه.',
    deadline: '۱۴۰۳/۱۰/۲۸',
    status: 'approved',
    requestedBy: 'دکتر تقوی (ناظر علمی طرح)',
    requestedAt: '۱۴۰۳/۰۹/۲۵',
    submittedAt: '۱۴۰۳/۱۰/۲۸',
    priority: 'normal',
    feedbackComment: 'فاز اول با نمره ۸۸ به تایید ناظر علمی رسید و مجوز آغاز فاز ۲ صادر شد.',
    evaluatedAt: '۱۴۰۳/۱۱/۰۲',
    evaluatorName: 'دکتر تقوی (ناظر علمی)',
    submissionAttachment: {
      id: 'att-sub-ai-1',
      name: 'گزارش_پیشرفت_فاز_اول_EDU-AI-101.pdf',
      size: '۵.۲ مگابایت',
      uploadedBy: 'محمدحسین حسینی',
      uploadedAt: '۱۴۰۳/۱۰/۲۸',
      fileType: 'application/pdf'
    }
  },
  {
    id: 'deliv-5',
    projectId: 'prj-ai-02',
    projectCode: 'EDU-AI-102',
    projectTitle: 'مدل‌سازی مسیر رشد فردی دانش‌آموز بر اساس یادگیری تقویتی و تحلیل رفتار',
    studentLead: 'نرگس عسگری',
    stepId: 3,
    stepTitle: 'گام ۳: ارزیابی اولیه',
    title: 'تکمیل کاربرگ تحلیل نیازهای تربیتی مربیان پرورشی',
    description: 'ارسال نتایج مصاحبه با ۱۰ مربی پرورشی پیرامون الگوهای ثبت رفتاری دانش‌آموزان جهت غنای مدل.',
    deadline: '۱۴۰۳/۱۲/۲۵',
    status: 'pending',
    requestedBy: 'کمیته تخصصی فناوری تربیتی',
    requestedAt: '۱۴۰۳/۱۲/۰۱',
    priority: 'normal'
  }
];
