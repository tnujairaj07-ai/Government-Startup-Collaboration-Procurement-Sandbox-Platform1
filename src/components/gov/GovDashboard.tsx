import React, { useState } from 'react';
import { 
  PlusCircle, ArrowUpRight, Compass, ClipboardCheck, 
  Activity, ChevronRight, FileText, CheckCircle2, Clock, Sparkles, 
  Scale, Shield, User, MapPin, Mail, Phone, ExternalLink, 
  AlertTriangle, Download, ArrowRight, Building2, CheckSquare, 
  Calendar, Layers, FileCheck, ShieldCheck, X, Inbox, FolderOpen,
  CheckCircle, FileSearch, HelpCircle
} from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';
import { ProblemStatementModal } from './ProblemStatementModal';
import { StatusBadge } from '../common/StatusBadge';

export const GovDashboard: React.FC = () => {
  const { 
    challenges, startups, proposals, contracts, adminLogs, 
    setActiveTab, addNotification 
  } = usePlatform();

  const [isNewChallengeModalOpen, setIsNewChallengeModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [activeCaseStudyModal, setActiveCaseStudyModal] = useState<boolean>(false);

  // Official Profile Information
  const officialProfile = {
    name: 'Department Nodal Officer',
    designation: 'Joint Secretary',
    department: 'Department of Urban Development & Water Resources',
    ministry: 'Government of Maharashtra',
    office: 'Mantralaya, Mumbai – 400032',
    userId: 'GOV-MH-UD-OFFICER',
    primaryRole: 'Nodal Officer – Mahatech Procure (Urban Development & Water Resources)',
    responsibilities: [
      'Approve departmental problem statements & innovation calls',
      'Review independent expert evaluations & pilot approvals',
      'Approve milestone escrow releases & bilateral contracts',
      'Oversee state-wide scale-up and GeM cataloging'
    ],
    status: 'Active',
    lastLogin: 'Today, Session Active',
    email: 'officer@maharashtra.gov.in',
    phone: '+91-22-2202 5555'
  };

  // Real Dynamic Calculations (0 when empty)
  const activeChallengesCount = challenges.filter(c => c.status === 'Open').length;
  const startupsEngagedCount = startups.length;
  const activePilotsList = proposals.filter(p => p.status === 'pilot_ongoing');
  const activePilotsCount = activePilotsList.length;
  const solutionsScaledCount = proposals.filter(p => p.status === 'completed').length;
  const contractsApprovedCount = contracts.filter(c => c.govStatus === 'approved').length;
  const pendingApprovalsCount = contracts.filter(c => c.govStatus === 'pending').length + proposals.filter(p => p.status === 'expert_review' || p.status === 'screening_passed').length;
  
  // Pending actions derived from context
  const pendingActions = [
    ...contracts.filter(c => c.govStatus === 'pending').map(c => ({
      id: c.id,
      type: 'Contract' as const,
      title: `Bilateral Contract: ${c.startupName} (${c.challengeTitle})`,
      zone: 'Department Zone',
      dueIn: 'Pending',
      status: 'Pending Sign-off',
      actionLabel: 'Approve Contract',
      targetTab: 'contracts'
    })),
    ...proposals.filter(p => p.status === 'expert_review' || p.status === 'screening_passed').map(p => ({
      id: p.id,
      type: 'Evaluation' as const,
      title: `Proposal Review: ${p.startupName} (${p.challengeTitle})`,
      zone: 'Review Panel',
      dueIn: 'Pending',
      status: 'Under Review',
      actionLabel: 'Evaluate',
      targetTab: 'expert_clearance'
    }))
  ];

  const handleDownloadDepartmentReport = () => {
    addNotification({
      title: 'Department Report Generated',
      message: 'Downloading executive audit report for Urban Development & Water Resources (PDF).',
      portal: 'gov',
      type: 'success'
    });
  };

  return (
    <div className="space-y-6">
      
      {/* ========================================================================= */}
      {/* SECTION 1: OFFICIAL PROFILE & ROLE SUMMARY */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
        
        {/* Top Identification Row */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          
          {/* Left: Identity */}
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#1D64EC] text-white flex items-center justify-center text-xl font-bold font-display shadow-md shrink-0">
              GO
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-xl sm:text-2xl font-extrabold text-navy-900 font-display">
                  {officialProfile.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {officialProfile.status}
                </span>
              </div>
              
              <p className="text-xs font-semibold text-[#1D64EC]">
                {officialProfile.designation} • {officialProfile.department}
              </p>
              
              <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 mt-1 font-medium">
                <span className="flex items-center gap-1">
                  <Building2 className="w-3 h-3 text-slate-400" />
                  {officialProfile.office}
                </span>
                <span>•</span>
                <span className="font-mono text-slate-400">UID: {officialProfile.userId}</span>
              </div>
            </div>
          </div>

          {/* Right: Contact & Action */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto shrink-0">
            <div className="text-left sm:text-right text-xs space-y-0.5">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Session Status</span>
              <p className="font-bold text-navy-900 font-mono text-[11px]">{officialProfile.lastLogin}</p>
              <div className="flex items-center sm:justify-end gap-2 text-slate-500 text-[11px] pt-1">
                <Mail className="w-3 h-3 text-slate-400" />
                <span>{officialProfile.email}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsProfileModalOpen(true)}
              className="px-4 py-2 rounded-full bg-slate-100 hover:bg-[#1D64EC] hover:text-white text-slate-700 font-bold text-xs transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <User className="w-3.5 h-3.5" />
              <span>View Full Profile</span>
            </button>
          </div>

        </div>

        {/* Bottom Mandate & Responsibilities Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 text-xs">
          <div className="md:col-span-4 p-4 rounded-2xl bg-blue-50/70 border border-blue-100 space-y-1">
            <span className="micro-label text-[#1D64EC] block">Primary Mandate</span>
            <p className="font-bold text-navy-900 leading-snug">{officialProfile.primaryRole}</p>
          </div>

          <div className="md:col-span-8 p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
            <span className="micro-label text-slate-400 block">Key Assigned Responsibilities</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-slate-700 font-medium">
              {officialProfile.responsibilities.map((resp, idx) => (
                <div key={idx} className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-snug">{resp}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* SECTION 2: KEY METRICS AT A GLANCE (Real 0 State)                         */}
      {/* ========================================================================= */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-navy-900 font-display">
            Department Overview – Urban Development & Water Resources
          </h2>
          <span className="text-xs font-bold text-slate-400 font-mono">Live Platform Telemetry</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5">
          
          {/* Card 1: Active Challenges */}
          <div 
            onClick={() => setActiveTab('challenges')}
            className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-[#1D64EC]/40 transition-all cursor-pointer group"
          >
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Active Challenges</span>
            <div className="text-2xl font-extrabold text-navy-900 font-display">{activeChallengesCount}</div>
            <p className="text-[11px] text-[#1D64EC] font-semibold mt-1">Open for bidding</p>
            <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold text-slate-400 group-hover:text-[#1D64EC]">
              <span>View All Challenges</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>

          {/* Card 2: Startups Engaged */}
          <div 
            onClick={() => setActiveTab('directory')}
            className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-[#1D64EC]/40 transition-all cursor-pointer group"
          >
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Startups Engaged</span>
            <div className="text-2xl font-extrabold text-navy-900 font-display">{startupsEngagedCount}</div>
            <p className="text-[11px] text-emerald-700 font-semibold mt-1">Verified repository</p>
            <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold text-slate-400 group-hover:text-[#1D64EC]">
              <span>View Directory</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>

          {/* Card 3: Pilots in Progress */}
          <div 
            onClick={() => setActiveTab('monitor')}
            className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-[#1D64EC]/40 transition-all cursor-pointer group"
          >
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Pilots in Progress</span>
            <div className="text-2xl font-extrabold text-navy-900 font-display">{activePilotsCount}</div>
            <p className="text-[11px] text-amber-700 font-semibold mt-1">Active sandbox pilots</p>
            <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold text-slate-400 group-hover:text-[#1D64EC]">
              <span>Monitor Pilots</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>

          {/* Card 4: Solutions Scaled */}
          <div 
            onClick={() => setActiveTab('monitor')}
            className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-[#1D64EC]/40 transition-all cursor-pointer group"
          >
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Solutions Scaled</span>
            <div className="text-2xl font-extrabold text-navy-900 font-display">{solutionsScaledCount}</div>
            <p className="text-[11px] text-purple-700 font-semibold mt-1">Statewide deployment</p>
            <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold text-slate-400 group-hover:text-[#1D64EC]">
              <span>View Scaled</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>

          {/* Card 5: Contracts Approved */}
          <div 
            onClick={() => setActiveTab('contracts')}
            className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-[#1D64EC]/40 transition-all cursor-pointer group"
          >
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Contracts Approved</span>
            <div className="text-2xl font-extrabold text-navy-900 font-display">{contractsApprovedCount}</div>
            <p className="text-[11px] text-slate-600 font-semibold mt-1">Bilateral agreements</p>
            <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold text-slate-400 group-hover:text-[#1D64EC]">
              <span>View Contracts</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>

          {/* Card 6: Pending Approvals */}
          <div 
            onClick={() => setActiveTab('contracts')}
            className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition-all cursor-pointer group"
          >
            <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block mb-1">Pending Approvals</span>
            <div className="text-2xl font-extrabold text-navy-900 font-display">{pendingApprovalsCount}</div>
            <p className="text-[11px] text-slate-500 font-semibold mt-1">Requiring action</p>
            <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold text-slate-400 group-hover:text-[#1D64EC]">
              <span>Review Items</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 3: MY PRIORITIES & PENDING ACTIONS (Empty State Ready)            */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-navy-900 font-display">
              Pending Actions & Priorities
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Urgent statutory approvals, milestone verifications, and contract ratifications requiring your sign-off.
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-[11px] font-bold">
            {pendingActions.length} Actions Pending
          </span>
        </div>

        {pendingActions.length === 0 ? (
          <div className="py-12 px-4 text-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto text-xl font-bold">
              ✓
            </div>
            <h3 className="font-bold text-sm text-navy-900">No Pending Approvals or Actions</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              All departmental problem statements, pilot evaluations, and contract milestones are up to date.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 text-navy-900 border-b border-slate-200">
                  <th className="py-3 px-4 font-bold">Type</th>
                  <th className="py-3 px-4 font-bold">Item & Scope</th>
                  <th className="py-3 px-4 font-bold">Zone / Department</th>
                  <th className="py-3 px-4 font-bold">Due In</th>
                  <th className="py-3 px-4 font-bold">Status</th>
                  <th className="py-3 px-4 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {pendingActions.map((act) => (
                  <tr key={act.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-[#1D64EC] border border-blue-200">
                        {act.type}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-navy-900 max-w-sm">{act.title}</td>
                    <td className="py-3.5 px-4 text-slate-600 font-medium whitespace-nowrap">{act.zone}</td>
                    <td className="py-3.5 px-4 whitespace-nowrap">{act.dueIn}</td>
                    <td className="py-3.5 px-4 font-semibold text-slate-700 whitespace-nowrap">{act.status}</td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => setActiveTab(act.targetTab as any)}
                        className="px-3.5 py-1.5 rounded-full bg-[#1D64EC] hover:bg-brand-cobalt text-white font-bold text-[11px] shadow-2xs transition-colors"
                      >
                        {act.actionLabel}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* SECTION 4 & 5: 2-COLUMN CHALLENGES OVERVIEW & PILOT ENGAGEMENTS           */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Challenges & Problem Statements Overview */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-navy-900 font-display">
                  Challenges & Problem Statements
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Track published calls, proposals received, and active shortlists.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsNewChallengeModalOpen(true)}
                className="px-3 py-1.5 rounded-full bg-blue-50 hover:bg-blue-100 text-[#1D64EC] font-bold text-xs border border-blue-200 transition-colors flex items-center gap-1"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>New Call</span>
              </button>
            </div>

            {/* Summary Stats Strip */}
            <div className="grid grid-cols-3 gap-2 py-3 text-center">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Published</span>
                <strong className="text-sm font-extrabold text-navy-900">{challenges.length}</strong>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Proposals</span>
                <strong className="text-sm font-extrabold text-[#1D64EC]">{proposals.length}</strong>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Shortlisted</span>
                <strong className="text-sm font-extrabold text-emerald-800">
                  {proposals.filter(p => p.status === 'shortlisted' || p.status === 'pilot_ongoing').length}
                </strong>
              </div>
            </div>

            {/* Challenges List or Clean Empty State */}
            {challenges.length === 0 ? (
              <div className="py-8 px-4 text-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 space-y-2.5">
                <Inbox className="w-8 h-8 text-slate-400 mx-auto" />
                <p className="text-xs font-bold text-navy-900">No Problem Statements Published Yet</p>
                <p className="text-[11px] text-slate-500 max-w-xs mx-auto">
                  Create outcome-focused challenge briefs with clear KPIs and target areas for startups to discover.
                </p>
                <button
                  type="button"
                  onClick={() => setIsNewChallengeModalOpen(true)}
                  className="px-4 py-1.5 rounded-full bg-[#1D64EC] hover:bg-blue-700 text-white font-bold text-xs shadow-2xs inline-flex items-center gap-1 mt-1"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Create Problem Statement</span>
                </button>
              </div>
            ) : (
              <div className="space-y-2.5 pt-1">
                {challenges.slice(0, 3).map((ch) => (
                  <div
                    key={ch.id}
                    onClick={() => setActiveTab('challenges')}
                    className="p-3.5 rounded-2xl bg-slate-50/80 hover:bg-blue-50/50 border border-slate-100 hover:border-blue-200 transition-all cursor-pointer space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] font-bold text-[#1D64EC]">{ch.code} • {ch.department}</span>
                      <StatusBadge label={ch.status} variant={ch.status === 'Open' ? 'emerald' : 'blue'} size="sm" />
                    </div>
                    <h4 className="font-bold text-xs text-navy-900 leading-snug">{ch.title}</h4>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setActiveTab('challenges')}
              className="text-xs font-bold text-[#1D64EC] hover:underline flex items-center gap-1"
            >
              <span>Manage All Problem Statements</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Column: Pilots & Startup Engagements */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-navy-900 font-display">
                  Pilots & Startup Engagements
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Monitor ongoing pilots, milestones, and field telemetry.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-[11px] font-bold">
                {activePilotsCount} Active
              </span>
            </div>

            {/* Summary Strip */}
            <div className="grid grid-cols-3 gap-2 py-3 text-center">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Active Pilots</span>
                <strong className="text-sm font-extrabold text-navy-900">{activePilotsCount}</strong>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Scaled</span>
                <strong className="text-sm font-extrabold text-purple-700">{solutionsScaledCount}</strong>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Escalations</span>
                <strong className="text-sm font-extrabold text-emerald-700">0</strong>
              </div>
            </div>

            {/* Active Pilots Rows or Clean Empty State */}
            {activePilotsList.length === 0 ? (
              <div className="py-8 px-4 text-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 space-y-2.5">
                <Activity className="w-8 h-8 text-slate-400 mx-auto" />
                <p className="text-xs font-bold text-navy-900">No Active Pilots Underway</p>
                <p className="text-[11px] text-slate-500 max-w-xs mx-auto">
                  Once proposals pass expert evaluation and contracts are ratified, live pilot telemetry will appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-2 pt-1">
                {activePilotsList.map((p, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3 text-xs">
                    <div>
                      <h5 className="font-bold text-navy-900">{p.startupName}</h5>
                      <p className="text-[11px] text-slate-500">{p.challengeTitle}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveTab('monitor')}
                      className="px-3 py-1.5 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold text-[11px] shrink-0 transition-colors"
                    >
                      Monitor Pilot
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setActiveTab('monitor')}
              className="text-xs font-bold text-[#1D64EC] hover:underline flex items-center gap-1"
            >
              <span>Monitor All Pilots</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* SECTION 6: CONTRACTS & APPROVALS (Empty State Ready)                      */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-navy-900 font-display">
              Contracts & Approvals
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Track approved bilateral contracts, milestone escrow disbursements, and compliance orders.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold">
            <span className="text-slate-500">Total Contracts: <strong>{contracts.length}</strong></span>
          </div>
        </div>

        {contracts.length === 0 ? (
          <div className="py-8 px-4 text-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 space-y-2">
            <Scale className="w-8 h-8 text-slate-400 mx-auto" />
            <h4 className="font-bold text-xs text-navy-900">No Bilateral Contracts Generated Yet</h4>
            <p className="text-[11px] text-slate-500 max-w-sm mx-auto">
              Contracts are automatically prepared once proposals are approved by domain evaluation panels.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {contracts.map((ctr, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{ctr.id}</span>
                    <StatusBadge label={ctr.govStatus === 'approved' ? 'Active' : 'Pending'} variant={ctr.govStatus === 'approved' ? 'emerald' : 'amber'} size="sm" />
                  </div>
                  <h4 className="font-bold text-sm text-navy-900 leading-snug">{ctr.startupName}</h4>
                  <div className="flex items-center gap-3 text-xs text-slate-600 mt-2 font-medium">
                    <span>Value: <strong className="text-navy-900">{ctr.totalValue}</strong></span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setActiveTab('contracts')}
                    className="px-4 py-1.5 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs transition-colors"
                  >
                    View Contract
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* SECTION 7: RECENT ACTIVITY & AUDIT TRAIL (Empty State Ready)               */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Recent Activity & Audit Trail */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-navy-900 font-display">
                Recent Activity & Audit Trail
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Real-time challenge submissions, milestone approvals, and contract ratifications.
              </p>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          {adminLogs.length === 0 ? (
            <div className="py-8 px-4 text-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 space-y-2">
              <FileSearch className="w-8 h-8 text-slate-400 mx-auto" />
              <p className="text-xs font-bold text-navy-900">No Activity Logs Recorded Yet</p>
              <p className="text-[11px] text-slate-500 max-w-sm mx-auto">
                All platform actions, problem statement publications, and evaluations will be recorded in this tamper-proof audit trail.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {adminLogs.map((act, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-100 flex items-center justify-between gap-3 hover:bg-blue-50/40 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#1D64EC] flex items-center justify-center shrink-0 mt-0.5">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-navy-900 leading-snug">{act.action}</p>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5 font-medium">
                        <span>{act.timestamp}</span>
                        <span>•</span>
                        <span className="text-slate-600">{act.entity}</span>
                        <span>•</span>
                        <span className="font-mono">{act.performedBy}</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />
                </div>
              ))}
            </div>
          )}

          <div className="pt-2">
            <button
              type="button"
              onClick={handleDownloadDepartmentReport}
              className="text-xs font-bold text-[#1D64EC] hover:underline flex items-center gap-1"
            >
              <span>Download Full Activity Log & Compliance Trail</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right: Quick Actions & Command Shortcuts */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-navy-900 font-display">
                Quick Actions
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Standard government innovation procurement workflows.
              </p>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setIsNewChallengeModalOpen(true)}
                className="w-full p-3 rounded-2xl bg-[#1D64EC] hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-between shadow-2xs transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <PlusCircle className="w-4 h-4" />
                  <span>Draft New Problem Statement</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('directory')}
                className="w-full p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 text-navy-900 border border-slate-200 font-bold text-xs flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Compass className="w-4 h-4 text-purple-600" />
                  <span>Browse DPIIT Startup Directory</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('ai_evaluator')}
                className="w-full p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 text-navy-900 border border-slate-200 font-bold text-xs flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span>AI Shortlisting Evaluator</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('contracts')}
                className="w-full p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 text-navy-900 border border-slate-200 font-bold text-xs flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Scale className="w-4 h-4 text-emerald-600" />
                  <span>Contract Approval Gate</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-500 space-y-1">
            <span className="font-bold text-navy-900 block">Department Support:</span>
            <p>Nodal helpline: <strong className="text-navy-900">+91-22-2202-9988</strong></p>
          </div>
        </div>

      </div>

      {/* Problem Statement Creation Modal */}
      {isNewChallengeModalOpen && (
        <ProblemStatementModal 
          isOpen={isNewChallengeModalOpen}
          onClose={() => setIsNewChallengeModalOpen(false)}
        />
      )}

      {/* Profile Modal */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 border border-slate-200 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-navy-900 font-display">
                Government Officer Profile
              </h3>
              <button
                onClick={() => setIsProfileModalOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Officer Name</span>
                <strong className="text-sm font-bold text-navy-900">{officialProfile.name}</strong>
                <p className="text-slate-600 font-medium">{officialProfile.designation} • {officialProfile.department}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-slate-600">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] text-slate-400 font-bold block">OFFICIAL EMAIL</span>
                  <span className="font-semibold text-navy-900 break-all">{officialProfile.email}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] text-slate-400 font-bold block">OFFICE PHONE</span>
                  <span className="font-semibold text-navy-900">{officialProfile.phone}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setIsProfileModalOpen(false)}
                className="px-5 py-2 rounded-full bg-[#1D64EC] hover:bg-blue-700 text-white font-bold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
