import React, { useState } from 'react';
import {
  INITIAL_CORES,
  INITIAL_ACTIVITIES,
  INITIAL_SIDE_ACTIVITIES,
  INITIAL_STUDENTS,
  INITIAL_DELIVERABLES
} from './mockData';
import { Core, Project, Activity, UserRole, StudentProfile, DeliverableRequest, Attachment } from './types';
import { Navbar, ActiveTab } from './components/Navbar';
import { CoreProgramsView } from './components/CoreProgramsView';
import { CoresListView } from './components/CoresListView';
import { ActivitiesView } from './components/ActivitiesView';
import { SideActivitiesView } from './components/SideActivitiesView';
import { TimelineModal } from './components/TimelineModal';
import { SingleFileExportModal } from './components/SingleFileExportModal';
import { ResearcherPortalView } from './components/ResearcherPortalView';
import { AdminMonitoringView } from './components/AdminMonitoringView';
import {
  Compass, ShieldCheck, GraduationCap, ArrowUpRight,
  BookOpen, Users, Activity as ActivityIcon, Sparkles, CheckCircle2,
  FileText, Upload, Send, AlertTriangle, Clock
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('core-programs');
  const [role, setRole] = useState<UserRole>('admin');
  const [students] = useState<StudentProfile[]>(INITIAL_STUDENTS);
  const [currentStudent, setCurrentStudent] = useState<StudentProfile>(INITIAL_STUDENTS[0]);
  const [cores, setCores] = useState<Core[]>(INITIAL_CORES);
  const [activities, setActivities] = useState<Activity[]>(INITIAL_ACTIVITIES);
  const [sideActivities] = useState(INITIAL_SIDE_ACTIVITIES);
  const [deliverables, setDeliverables] = useState<DeliverableRequest[]>(INITIAL_DELIVERABLES);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // Flatten all projects
  const allProjects = cores.flatMap(c => c.activeProjects);

  // Stats calculation
  const totalProjects = cores.reduce((acc, c) => acc + c.activeProjects.length, 0);
  const completedProjects = cores.reduce((acc, c) => acc + c.activeProjects.filter(p => p.overallStatus === 'completed').length, 0);
  const revisionNeededProjects = cores.reduce((acc, c) => acc + c.activeProjects.filter(p => p.overallStatus === 'revision_needed').length, 0);

  // Deliverables stats for badges
  const studentDeliverables = deliverables.filter(
    d => d.studentLead === currentStudent.name || 
         allProjects.some(p => p.id === d.projectId && (p.studentLead === currentStudent.name || p.members.includes(currentStudent.name)))
  );
  const actionNeededCount = studentDeliverables.filter(
    d => d.status === 'pending' || d.status === 'revision_needed'
  ).length;
  const pendingInboxCount = deliverables.filter(d => d.status === 'submitted').length;

  const handleUpdateProject = (updatedProject: Project) => {
    setCores(prevCores =>
      prevCores.map(core => {
        if (core.id === updatedProject.coreId) {
          const updatedProjects = core.activeProjects.map(p =>
            p.id === updatedProject.id ? updatedProject : p
          );
          return {
            ...core,
            activeProjects: updatedProjects
          };
        }
        return core;
      })
    );

    setSelectedProject(updatedProject);
  };

  const handleAddCore = (newCore: Core) => {
    setCores([newCore, ...cores]);
  };

  const handleAddProject = (coreId: string, newProject: Project) => {
    setCores(prevCores =>
      prevCores.map(core => {
        if (core.id === coreId) {
          return {
            ...core,
            projectsCount: core.projectsCount + 1,
            activeProjects: [newProject, ...core.activeProjects]
          };
        }
        return core;
      })
    );
  };

  const handleAddActivity = (newActivity: Activity) => {
    setActivities([newActivity, ...activities]);
  };

  const handleRegisterActivity = (activityId: string) => {
    setActivities(prev =>
      prev.map(a => {
        if (a.id === activityId) {
          return {
            ...a,
            registeredCount: (a.registeredCount || 0) + 1
          };
        }
        return a;
      })
    );
  };

  // Researcher submission handler
  const handleSubmitDeliverable = (submission: {
    deliverableId?: string;
    projectId: string;
    stepId: number;
    title: string;
    notes: string;
    attachment: Attachment;
  }) => {
    const today = '۱۴۰۳/۱۲/۱۴';

    if (submission.deliverableId) {
      setDeliverables(prev =>
        prev.map(d => {
          if (d.id === submission.deliverableId) {
            return {
              ...d,
              status: 'submitted' as const,
              submittedAt: today,
              submissionNotes: submission.notes,
              submissionAttachment: submission.attachment,
              feedbackComment: undefined
            };
          }
          return d;
        })
      );
    } else {
      const targetPrj = allProjects.find(p => p.id === submission.projectId);
      const newDeliv: DeliverableRequest = {
        id: `deliv-${Date.now()}`,
        projectId: submission.projectId,
        projectCode: targetPrj?.code || 'PRJ-NEW',
        projectTitle: targetPrj?.title || 'طرح پژوهشی',
        studentLead: currentStudent.name,
        stepId: submission.stepId,
        stepTitle: `گام ${submission.stepId}`,
        title: submission.title,
        description: 'مدرک ارسالی مستقیم پژوهشگر',
        requestedAt: today,
        deadline: 'ارسال شده',
        requestedBy: 'پژوهشگر هسته',
        status: 'submitted',
        priority: 'high',
        submittedAt: today,
        submissionNotes: submission.notes,
        submissionAttachment: submission.attachment
      };
      setDeliverables(prev => [newDeliv, ...prev]);
    }

    // Attach file to the project's step in state
    setCores(prevCores =>
      prevCores.map(core => {
        const hasProject = core.activeProjects.some(p => p.id === submission.projectId);
        if (!hasProject) return core;

        return {
          ...core,
          activeProjects: core.activeProjects.map(prj => {
            if (prj.id !== submission.projectId) return prj;

            const updatedSteps = prj.steps.map(st => {
              if (st.id === submission.stepId) {
                const existingAtts = st.attachments || [];
                return {
                  ...st,
                  attachments: [submission.attachment, ...existingAtts]
                };
              }
              return st;
            });

            return {
              ...prj,
              steps: updatedSteps
            };
          })
        };
      })
    );
  };

  // Admin approval handler
  const handleApproveDeliverable = (deliverableId: string, feedback: string) => {
    const today = '۱۴۰۳/۱۲/۱۴';
    const deliv = deliverables.find(d => d.id === deliverableId);

    setDeliverables(prev =>
      prev.map(d => {
        if (d.id === deliverableId) {
          return {
            ...d,
            status: 'approved' as const,
            feedbackComment: feedback,
            evaluatedAt: today
          };
        }
        return d;
      })
    );

    if (deliv) {
      setCores(prevCores =>
        prevCores.map(core => {
          const hasProject = core.activeProjects.some(p => p.id === deliv.projectId);
          if (!hasProject) return core;

          return {
            ...core,
            activeProjects: core.activeProjects.map(prj => {
              if (prj.id !== deliv.projectId) return prj;

              const updatedSteps = prj.steps.map(st => {
                if (st.id === deliv.stepId) {
                  return {
                    ...st,
                    status: 'completed' as const,
                    evaluatorFeedback: feedback
                  };
                }
                return st;
              });

              const stillHasRevision = updatedSteps.some(s => s.status === 'revision_needed');
              const newStatus = stillHasRevision ? 'revision_needed' : 'in_progress';

              return {
                ...prj,
                overallStatus: newStatus as any,
                steps: updatedSteps
              };
            })
          };
        })
      );
    }
  };

  // Admin revision request handler
  const handleRequestRevisionDeliverable = (deliverableId: string, feedback: string) => {
    const today = '۱۴۰۳/۱۲/۱۴';
    const deliv = deliverables.find(d => d.id === deliverableId);

    setDeliverables(prev =>
      prev.map(d => {
        if (d.id === deliverableId) {
          return {
            ...d,
            status: 'revision_needed' as const,
            feedbackComment: feedback,
            evaluatedAt: today
          };
        }
        return d;
      })
    );

    if (deliv) {
      setCores(prevCores =>
        prevCores.map(core => {
          const hasProject = core.activeProjects.some(p => p.id === deliv.projectId);
          if (!hasProject) return core;

          return {
            ...core,
            activeProjects: core.activeProjects.map(prj => {
              if (prj.id !== deliv.projectId) return prj;

              const updatedSteps = prj.steps.map(st => {
                if (st.id === deliv.stepId) {
                  return {
                    ...st,
                    status: 'revision_needed' as const,
                    evaluatorFeedback: feedback
                  };
                }
                return st;
              });

              return {
                ...prj,
                overallStatus: 'revision_needed' as const,
                steps: updatedSteps
              };
            })
          };
        })
      );
    }
  };

  // Admin create deliverable request handler
  const handleCreateDeliverableRequest = (newReq: Omit<DeliverableRequest, 'id' | 'requestedAt' | 'status'>) => {
    const today = '۱۴۰۳/۱۲/۱۴';
    const created: DeliverableRequest = {
      ...newReq,
      id: `deliv-${Date.now()}`,
      requestedAt: today,
      status: 'pending'
    };
    setDeliverables(prev => [created, ...prev]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/80 text-slate-800 antialiased font-sans selection:bg-blue-600 selection:text-white">
      {/* Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        role={role}
        setRole={setRole}
        students={students}
        currentStudent={currentStudent}
        setCurrentStudent={setCurrentStudent}
        onOpenExportModal={() => setIsExportModalOpen(true)}
        actionNeededCount={actionNeededCount}
        pendingInboxCount={pendingInboxCount}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-7 space-y-7">
        {/* Quick Context & Operational Shortcuts Bar */}
        <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-bold text-slate-700">دسترسی مستقیم:</span>

            <button
              id="quick-admin-monitoring-btn"
              onClick={() => {
                setRole('admin');
                setActiveTab('admin-monitoring');
              }}
              className={`px-3 py-1.5 rounded-xl font-bold transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'admin-monitoring'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-blue-50 text-blue-800 hover:bg-blue-100 border border-blue-200'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>میز پایش و مدیریت پروژه‌ها (ادمین)</span>
              {pendingInboxCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-amber-400 text-slate-950 text-[10px] font-bold">
                  {pendingInboxCount} مدرک جدید
                </span>
              )}
            </button>

            <button
              id="quick-researcher-portal-btn"
              onClick={() => {
                setRole('student');
                setActiveTab('researcher-portal');
              }}
              className={`px-3 py-1.5 rounded-xl font-bold transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'researcher-portal'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-emerald-600" />
              <span>پژوهش‌های من و ارسال مدارک (پژوهشگر)</span>
              {actionNeededCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-amber-500 text-white text-[10px] font-bold">
                  {actionNeededCount} اقدام فوری
                </span>
              )}
            </button>
          </div>

          <div className="text-[11px] text-slate-500 font-medium flex items-center gap-3">
            <span>کل طرح‌ها: <strong className="text-slate-800 font-mono">{totalProjects}</strong></span>
            <span>•</span>
            <span>نیازمند اصلاح: <strong className="text-amber-700 font-mono">{revisionNeededProjects}</strong></span>
            <span>•</span>
            <span>تکمیل‌شده: <strong className="text-emerald-700 font-mono">{completedProjects}</strong></span>
          </div>
        </div>

        {/* View Routing */}
        {activeTab === 'core-programs' && (
          <CoreProgramsView onNavigateToCores={() => setActiveTab('center-cores')} />
        )}

        {activeTab === 'center-cores' && (
          <CoresListView
            cores={cores}
            role={role}
            currentStudent={currentStudent}
            onSelectProject={(prj) => setSelectedProject(prj)}
            onAddCore={handleAddCore}
            onAddProject={handleAddProject}
          />
        )}

        {activeTab === 'center-activities' && (
          <ActivitiesView
            activities={activities}
            role={role}
            onAddActivity={handleAddActivity}
            onRegisterActivity={handleRegisterActivity}
          />
        )}

        {activeTab === 'side-activities' && (
          <SideActivitiesView
            sideActivities={sideActivities}
            role={role}
          />
        )}

        {activeTab === 'admin-monitoring' && (
          <AdminMonitoringView
            cores={cores}
            projects={allProjects}
            deliverables={deliverables}
            onSelectProject={(prj) => setSelectedProject(prj)}
            onApproveDeliverable={handleApproveDeliverable}
            onRequestRevisionDeliverable={handleRequestRevisionDeliverable}
            onCreateDeliverableRequest={handleCreateDeliverableRequest}
          />
        )}

        {activeTab === 'researcher-portal' && (
          <ResearcherPortalView
            currentStudent={currentStudent}
            projects={allProjects}
            deliverables={deliverables}
            onSubmitDeliverable={handleSubmitDeliverable}
            onOpenTimeline={(prj) => setSelectedProject(prj)}
          />
        )}
      </main>

      {/* Interactive Project Progress Timeline Modal */}
      {selectedProject && (
        <TimelineModal
          project={selectedProject}
          role={role}
          currentStudentName={currentStudent.name}
          onClose={() => setSelectedProject(null)}
          onUpdateProject={handleUpdateProject}
        />
      )}

      {/* Standalone Single File HTML Export Modal */}
      <SingleFileExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />

      {/* Footer - Professional Polish Theme */}
      <footer className="bg-white border-t border-slate-200/90 mt-16 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3 md:col-span-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 text-white flex items-center justify-center font-bold shadow-xs">
                  <Compass className="w-4 h-4 text-white" />
                </div>
                <div className="text-sm font-extrabold text-slate-900">
                  مرکز هدایت علمی-پژوهشی و تربیتی
                </div>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed max-w-md text-justify">
                مرکز هدایت تربیتی با هدف توانمندسازی هسته‌های مسئله‌محور، پایش پیوسته روند پیشرفت پروژه‌های علمی-پژوهشی و ایجاد پیوند میان نیازهای عینی مدارس و ظرفیت‌های دانشگاهی کشور فعالیت می‌نماید.
              </p>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="font-bold text-slate-900 tracking-tight">دسترسی سریع به بخش‌ها</div>
              <ul className="space-y-2 text-slate-500 font-medium">
                <li>
                  <button onClick={() => setActiveTab('admin-monitoring')} className="hover:text-blue-700 transition cursor-pointer flex items-center gap-1 font-bold">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                    <span>میز پایش و مدیریت پروژه‌ها (ادمین)</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('researcher-portal')} className="hover:text-emerald-700 transition cursor-pointer flex items-center gap-1 font-bold">
                    <FileText className="w-3.5 h-3.5 text-emerald-600" />
                    <span>پژوهش‌های من و ارسال مدارک</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('core-programs')} className="hover:text-blue-700 transition cursor-pointer">
                    ۱. برنامه‌های هسته‌ها
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('center-cores')} className="hover:text-blue-700 transition cursor-pointer">
                    ۲-۱. نمایش کارنامه هسته‌ها
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('center-activities')} className="hover:text-blue-700 transition cursor-pointer">
                    ۲-۲. فعالیت‌های سه‌گانه مرکز
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="font-bold text-slate-900 tracking-tight">دریافت نسخه آفلاین</div>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                می‌توانید تمام ساختار، استایل و اسکریپت‌های این سامانه را در قالب یک فایل تک‌فایلی HTML ذخیره و آفلاین اجرا کنید.
              </p>
              <button
                onClick={() => setIsExportModalOpen(true)}
                className="mt-1 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl transition cursor-pointer text-xs flex items-center gap-1.5 border border-slate-200 shadow-2xs"
              >
                <span>دریافت خروجی تک‌فایلی</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-600" />
              </button>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2 font-medium">
            <div>
              تمامی حقوق برای مرکز هدایت علمی-پژوهشی و تربیتی محفوظ است © ۱۴۰۳
            </div>
            <div className="flex items-center gap-3">
              <span className="text-slate-500 font-mono">نسخه ۱.۴.۰</span>
              <span>•</span>
              <span>تایملاین ۷ مرحله‌ای هوشمند</span>
              <span>•</span>
              <span>کنترل دسترسی RBAC (مدیر و دانشجو)</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
