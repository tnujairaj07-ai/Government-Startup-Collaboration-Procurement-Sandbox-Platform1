import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { 
  Layers, CheckCircle2, Clock, Check, 
  Sparkles, FileText, ArrowRight, ExternalLink, 
  Search, Filter, Eye, Download, Upload, 
  Building2, Rocket, ArrowUpRight, ChevronRight, 
  DollarSign, Activity, AlertTriangle, ShieldCheck, 
  Calendar, User, ChevronLeft, FileSpreadsheet, Scale, 
  Receipt, MessageSquare 
} from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';

interface ProposalItem {
  id: string;
  psCode: string;
  challengeTitle: string;
  department: string;
  solutionName: string;
  currentStage: string;
  stageNum: number;
  stageColor: 'blue' | 'amber' | 'emerald' | 'purple' | 'slate';
  lastUpdated: string;
  status: 'Open' | 'Active Pilot' | 'Completed' | 'Closed';
  statusVariant: 'blue' | 'amber' | 'emerald' | 'slate';
  stages: {
    num: number;
    title: string;
    date: string;
    status: 'Completed' | 'In Progress' | 'Pending';
    description: string;
    notes?: string;
    documents?: { name: string; type: string }[];
    actions?: string[];
    kpis?: { label: string; value: string }[];
  }[];
  milestones: {
    name: string;
    dueDate: string;
    status: 'Completed' | 'In Progress' | 'Pending';
    amount: string;
    paymentStatus: 'Paid' | 'Pending' | 'Due';
  }[];
  kpis: {
    primaryName: string;
    baseline: string;
    target: string;
    current: string;
    status: string;
    secondary: { label: string; value: string }[];
  };
  keyContacts: {
    nodalOfficer: string;
    technicalLead: string;
  };
}

export const ApplicationTracker: React.FC = () => {
  const { setActiveTab, addNotification } = usePlatform();

  // Filter States
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('All');
  const [selectedDeptFilter, setSelectedDeptFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Selected Proposal for Detailed Timeline View
  const [selectedProposalId, setSelectedProposalId] = useState<string | null>('PS2');
  const [docArchiveTab, setDocArchiveTab] = useState<'all' | 'contract' | 'milestones' | 'payments' | 'correspondence'>('all');
  const [selectedStageIndex, setSelectedStageIndex] = useState<number>(7); // Default to Stage 8 (M2 in progress)

  // Proposals Master Data
  const proposals: ProposalItem[] = [
    {
      id: 'PS2',
      psCode: 'MH-2026-WTR-01 / PS2',
      challengeTitle: 'AI-powered Water Leakage Detection for Urban Pipelines',
      department: 'Maharashtra Water Supply & Sanitation Department',
      solutionName: 'AquaMind Platform & Acoustic IoT Clamps',
      currentStage: 'Milestone M2 In Progress',
      stageNum: 8,
      stageColor: 'amber',
      lastUpdated: '15 Dec 2026 – M2 validation in progress',
      status: 'Active Pilot',
      statusVariant: 'emerald',
      keyContacts: {
        nodalOfficer: 'Shri Rajesh Deshmukh (Joint Secretary)',
        technicalLead: 'Dr. Meera Deshmukh (Chief Evaluator)'
      },
      stages: [
        {
          num: 1,
          title: 'Proposal Submitted',
          date: '10 Jun 2026',
          status: 'Completed',
          description: 'Digital proposal receipt #RCP-88192 generated via Maharashtra Procure Gateway.',
          documents: [{ name: 'Proposal Receipt #RCP-88192 (PDF)', type: 'Receipt' }]
        },
        {
          num: 2,
          title: 'Under Department Review',
          date: '15 Jun 2026',
          status: 'Completed',
          description: 'Eligibility, GST compliance, and DPIIT startup recognition verified by scrutiny team.',
          notes: 'Eligibility: Confirmed | DPIIT: Verified (DIPP12345)'
        },
        {
          num: 3,
          title: 'Shortlisted',
          date: '05 Jul 2026',
          status: 'Completed',
          description: 'Top 3 startup solutions selected for technical domain expert committee presentation.',
          documents: [{ name: 'Shortlist Intimation Letter (PDF)', type: 'Letter' }]
        },
        {
          num: 4,
          title: 'Expert Evaluation',
          date: '20 Jul 2026',
          status: 'Completed',
          description: 'Technical scorecard 94/100 awarded by Dr. Meera Deshmukh panel.',
          documents: [{ name: 'Expert Scorecard & Evaluation Matrix (PDF)', type: 'Scorecard' }],
          notes: 'Overall Score: 94/100 | Key Strengths: Direct problem alignment, empirical evidence, TRL 8 maturity'
        },
        {
          num: 5,
          title: 'Contract Approval',
          date: '10 Aug 2026',
          status: 'Completed',
          description: 'Approved by Secretary – Water Supply under GR-MH/2026/WTR-994.',
          documents: [
            { name: 'Government Resolution Approval Order (PDF)', type: 'GR Order' },
            { name: 'Bilateral Sandbox Agreement & IP Terms (PDF)', type: 'Contract' }
          ]
        },
        {
          num: 6,
          title: 'Pilot Started',
          date: '01 Sep 2026',
          status: 'Completed',
          description: 'Field sensor installation underway across 120 km distribution grid in Pune Zone A.',
          notes: 'Pilot Location: Pune Zone A | Duration: 6 Months | Scope: 120 km pipeline network'
        },
        {
          num: 7,
          title: 'Milestone M1 Completed',
          date: '30 Oct 2026',
          status: 'Completed',
          description: '320 acoustic clamp sensors calibrated & INR 10.5 Lakhs escrow tranche paid.',
          documents: [
            { name: 'M1 Sensor Deployment Report (PDF)', type: 'Report' },
            { name: 'Payment Voucher – M1 (PDF)', type: 'Voucher' }
          ],
          kpis: [
            { label: 'Sensors Deployed', value: '320 Units' },
            { label: 'Coverage', value: '40 km Pipeline' },
            { label: 'Detection Accuracy', value: '88%' }
          ]
        },
        {
          num: 8,
          title: 'Milestone M2 In Progress',
          date: 'Due 15 Dec 2026',
          status: 'In Progress',
          description: '90-day telemetry export, SCADA integration, and continuous leak logs being validated.',
          notes: 'Current Progress: 75% of M2 validation tasks completed | Next Submission Due: 15 Dec 2026',
          documents: [{ name: 'M2 Interim Progress Report (Draft PDF)', type: 'Report' }],
          actions: ['Submit M2 Milestone Deliverables', 'Upload Telemetry Log Data']
        },
        {
          num: 9,
          title: 'Final Validation',
          date: 'Pending (Feb 2027)',
          status: 'Pending',
          description: 'Final empirical KPI audit (≥20% verified non-revenue water reduction).',
          notes: 'Independent validation by Maharashtra Water Quality & Loss Audit Board'
        },
        {
          num: 10,
          title: 'Scale Decision',
          date: 'Pending (Mar 2027)',
          status: 'Pending',
          description: 'GeM state-wide fast-track standing rate contract & PAC certificate.',
          notes: 'Conditional on: ≥20% NRW reduction, zero cyber infractions, 99% telemetry uptime'
        }
      ],
      milestones: [
        { name: 'M1: Sensor Rigging & Gateway Setup', dueDate: '30 Oct 2026', status: 'Completed', amount: 'INR 10.5 Lakhs', paymentStatus: 'Paid' },
        { name: 'M2: 90-Day Continuous Telemetry & Leak Fixes', dueDate: '15 Dec 2026', status: 'In Progress', amount: 'INR 14.0 Lakhs', paymentStatus: 'Pending' },
        { name: 'M3: Final Verification & Scaled Audit', dueDate: '28 Feb 2027', status: 'Pending', amount: 'INR 10.5 Lakhs', paymentStatus: 'Pending' }
      ],
      kpis: {
        primaryName: 'Non-Revenue Water (NRW) Reduction',
        baseline: '12.0%',
        target: '≥ 20.0%',
        current: '18.4%',
        status: 'On Track',
        secondary: [
          { label: 'Leak Detection Accuracy', value: '91.2% (M2)' },
          { label: 'System Telemetry Uptime', value: '99.4%' },
          { label: 'Alert Latency to SCADA', value: '< 4 Minutes' }
        ]
      }
    },
    {
      id: 'PS7',
      psCode: 'MH-2026-URB-07 / PS7',
      challengeTitle: 'Smart Street Lighting – Adaptive Mesh Control & Energy Saver',
      department: 'Municipal Administration & Urban Development',
      solutionName: 'LumiFlow AI Dynamic Dimming Gateway',
      currentStage: 'Expert Evaluation',
      stageNum: 4,
      stageColor: 'purple',
      lastUpdated: '10 Nov 2026 – Scorecard issued (91/100)',
      status: 'Open',
      statusVariant: 'blue',
      keyContacts: {
        nodalOfficer: 'Shri Vikram Shinde (Chief Engineer)',
        technicalLead: 'Prof. S. K. Kulkarni (Evaluation Chair)'
      },
      stages: [
        { num: 1, title: 'Proposal Submitted', date: '15 Sep 2026', status: 'Completed', description: 'Proposal receipt #RCP-91024 generated.' },
        { num: 2, title: 'Under Department Review', date: '28 Sep 2026', status: 'Completed', description: 'Technical and financial eligibility verified.' },
        { num: 3, title: 'Shortlisted', date: '15 Oct 2026', status: 'Completed', description: 'Selected among top 4 vendors for expert scrutiny.' },
        { num: 4, title: 'Expert Evaluation', date: '10 Nov 2026', status: 'In Progress', description: 'Panel scorecard 91/100 issued. Pilot scope finalization underway.' },
        { num: 5, title: 'Contract Approval', date: 'Pending', status: 'Pending', description: 'Drafting standing tripartite sandbox order.' }
      ],
      milestones: [
        { name: 'M1: 500 Luminaire Controller Assembly', dueDate: '15 Jan 2027', status: 'Pending', amount: 'INR 8.0 Lakhs', paymentStatus: 'Due' },
        { name: 'M2: 60-Day Energy Audit', dueDate: '15 Mar 2027', status: 'Pending', amount: 'INR 12.0 Lakhs', paymentStatus: 'Due' }
      ],
      kpis: {
        primaryName: 'Grid Power Conservation',
        baseline: '0.0%',
        target: '≥ 35.0%',
        current: '33.5% (Lab)',
        status: 'Pilot Ready',
        secondary: [
          { label: 'Mesh Latency', value: '< 200 ms' },
          { label: 'Fault Alert SLA', value: '< 2 Mins' }
        ]
      }
    },
    {
      id: 'PS11',
      psCode: 'MH-2026-AGR-11 / PS11',
      challengeTitle: 'Drone-based Crop Health & Pest Infestation Early Warning',
      department: 'Department of Agriculture & Farmers Welfare',
      solutionName: 'CropCare AI Multispectral Edge Engine',
      currentStage: 'Completed – Scaled to State',
      stageNum: 10,
      stageColor: 'emerald',
      lastUpdated: '30 Sep 2026 – GeM Fast-Track Rate Contract Approved',
      status: 'Completed',
      statusVariant: 'emerald',
      keyContacts: {
        nodalOfficer: 'Dr. Anand Patil (Director – Agriculture)',
        technicalLead: 'Dr. R. V. Deshpande'
      },
      stages: [
        { num: 1, title: 'Proposal Submitted', date: '20 May 2026', status: 'Completed', description: 'Proposal receipt #RCP-77412 generated.' },
        { num: 2, title: 'Under Department Review', date: '01 Jun 2026', status: 'Completed', description: 'DGCA drone type certification verified.' },
        { num: 3, title: 'Shortlisted', date: '15 Jun 2026', status: 'Completed', description: 'Selected for Nashik district pilot.' },
        { num: 4, title: 'Expert Evaluation', date: '01 Jul 2026', status: 'Completed', description: 'Scorecard 96/100 awarded.' },
        { num: 5, title: 'Contract Approval', date: '15 Jul 2026', status: 'Completed', description: 'Contract order GR/AGR/2026/04 executed.' },
        { num: 6, title: 'Pilot Started', date: '01 Aug 2026', status: 'Completed', description: 'Nashik vineyard trial covering 1,400 acres.' },
        { num: 7, title: 'Milestone M1 Completed', date: '20 Aug 2026', status: 'Completed', description: 'First flight telemetry and NDVI maps delivered.' },
        { num: 8, title: 'Milestone M2 Completed', date: '10 Sep 2026', status: 'Completed', description: 'Pest infestation detection accuracy verified at 94%.' },
        { num: 9, title: 'Final Validation', date: '20 Sep 2026', status: 'Completed', description: 'Directorate of Agriculture audit signed off.' },
        { num: 10, title: 'Scale Decision', date: '30 Sep 2026', status: 'Completed', description: 'Graduated to GeM PAC state procurement catalog.' }
      ],
      milestones: [
        { name: 'M1: Baseline Flight Surveys', dueDate: '20 Aug 2026', status: 'Completed', amount: 'INR 6.0 Lakhs', paymentStatus: 'Paid' },
        { name: 'M2: AI Pest Warning Maps', dueDate: '10 Sep 2026', status: 'Completed', amount: 'INR 8.5 Lakhs', paymentStatus: 'Paid' }
      ],
      kpis: {
        primaryName: 'Pest Infestation Early Warning Lead Time',
        baseline: '2 Days',
        target: '≥ 7 Days Ahead',
        current: '8.5 Days Ahead',
        status: 'Exceeded Target',
        secondary: [
          { label: 'Mapping Resolution', value: '2.5 cm/px' },
          { label: 'Crop Yield Impact', value: '+14% Saved' }
        ]
      }
    }
  ];

  // Filtered Proposals
  const filteredProposals = proposals.filter(p => {
    if (selectedStatusFilter !== 'All' && p.status !== selectedStatusFilter) return false;
    if (selectedDeptFilter !== 'All' && !p.department.toLowerCase().includes(selectedDeptFilter.toLowerCase())) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return p.challengeTitle.toLowerCase().includes(q) || p.psCode.toLowerCase().includes(q) || p.solutionName.toLowerCase().includes(q);
    }
    return true;
  });

  const activeProposal = proposals.find(p => p.id === selectedProposalId) || proposals[0];
  const activeStage = activeProposal.stages[selectedStageIndex] || activeProposal.stages[0];

  return (
    <div className="space-y-6">
      
      {/* ========================================================================= */}
      {/* PAGE HEADER & TOP FILTERS                                                */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#1D64EC] text-[10px] font-bold border border-blue-200 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1D64EC] animate-pulse" />
              Government Sandbox Lifecycle Tracker
            </span>
            <span className="text-xs text-slate-400 font-mono">Live Proposal Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-navy-900 font-display tracking-tight">
            Proposal Tracker
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Track the end-to-end lifecycle of your proposals, from submission through pilot milestones to scale decisions.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setActiveTab('challenges')}
            className="px-4 py-2.5 rounded-2xl bg-[#1D64EC] hover:bg-blue-700 text-white font-bold text-xs shadow-xs flex items-center gap-2 transition-all"
          >
            <Rocket className="w-4 h-4" />
            <span>Explore Open Challenges</span>
          </button>
        </div>
      </div>

      {/* Filter Controls Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 text-xs">
        
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by challenge title, PS ID, or solution name..."
            className="w-full pl-8 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-navy-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1D64EC]/20 focus:border-[#1D64EC]"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 font-bold text-[10px] uppercase">Status:</span>
            <select
              value={selectedStatusFilter}
              onChange={(e) => setSelectedStatusFilter(e.target.value)}
              className="p-1.5 px-2.5 rounded-xl bg-slate-50 border border-slate-200 text-navy-900 font-bold text-xs"
            >
              <option value="All">All Statuses</option>
              <option value="Active Pilot">Active Pilot</option>
              <option value="Open">Open</option>
              <option value="Completed">Completed</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 font-bold text-[10px] uppercase">Department:</span>
            <select
              value={selectedDeptFilter}
              onChange={(e) => setSelectedDeptFilter(e.target.value)}
              className="p-1.5 px-2.5 rounded-xl bg-slate-50 border border-slate-200 text-navy-900 font-bold text-xs max-w-[170px] truncate"
            >
              <option value="All">All Departments</option>
              <option value="Water Supply">Water Supply & Sanitation</option>
              <option value="Urban Development">Urban Development</option>
              <option value="Agriculture">Agriculture</option>
            </select>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: PROPOSALS OVERVIEW LIST                                        */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-navy-900 font-display">
              Registered Proposals & Innovation Bids
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Click any proposal to inspect its 10-stage lifecycle, milestone verification logs, and contracts.
            </p>
          </div>
          <span className="text-xs font-bold text-slate-400">
            {filteredProposals.length} Proposals Listed
          </span>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-navy-900 border-b border-slate-200">
                <th className="py-3.5 px-4 font-bold">Challenge / PS ID</th>
                <th className="py-3.5 px-4 font-bold">Department</th>
                <th className="py-3.5 px-4 font-bold">Your Solution</th>
                <th className="py-3.5 px-4 font-bold">Current Stage</th>
                <th className="py-3.5 px-4 font-bold">Last Updated</th>
                <th className="py-3.5 px-4 font-bold">Overall Status</th>
                <th className="py-3.5 px-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredProposals.map((prop) => {
                const isSelected = selectedProposalId === prop.id;
                return (
                  <tr 
                    key={prop.id}
                    onClick={() => {
                      setSelectedProposalId(prop.id);
                      setSelectedStageIndex(prop.stages.findIndex(s => s.status === 'In Progress') !== -1 ? prop.stages.findIndex(s => s.status === 'In Progress') : prop.stages.length - 1);
                    }}
                    className={`cursor-pointer transition-colors ${
                      isSelected ? 'bg-blue-50/70 font-semibold' : 'hover:bg-slate-50/60'
                    }`}
                  >
                    <td className="py-4 px-4 max-w-xs">
                      <strong className="text-navy-900 font-bold block leading-snug">{prop.challengeTitle}</strong>
                      <span className="text-[10px] text-slate-400 font-mono block mt-0.5">{prop.psCode}</span>
                    </td>
                    <td className="py-4 px-4 text-slate-600 font-medium whitespace-nowrap">
                      {prop.department}
                    </td>
                    <td className="py-4 px-4 font-bold text-[#1D64EC] whitespace-nowrap">
                      {prop.solutionName}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        prop.stageColor === 'emerald' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                        prop.stageColor === 'amber' ? 'bg-amber-100 text-amber-900 border border-amber-200' :
                        prop.stageColor === 'purple' ? 'bg-purple-100 text-purple-800 border border-purple-200' :
                        'bg-blue-100 text-[#1D64EC] border border-blue-200'
                      }`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        {prop.currentStage}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-slate-500 font-medium text-[11px] whitespace-nowrap">
                      {prop.lastUpdated}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <StatusBadge label={prop.status} variant={prop.statusVariant} size="sm" />
                    </td>
                    <td className="py-4 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProposalId(prop.id);
                            const el = document.getElementById('proposal-detail-section');
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="px-3 py-1 rounded-xl bg-slate-100 hover:bg-[#1D64EC] hover:text-white text-slate-700 font-bold text-[11px] transition-colors"
                        >
                          View Timeline
                        </button>
                        {prop.status === 'Active Pilot' && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveTab('execution');
                            }}
                            className="px-3 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] shadow-2xs transition-colors"
                          >
                            Pilot Workspace
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 2: PROPOSAL DETAIL & 10-STAGE VISUAL LIFECYCLE TIMELINE           */}
      {/* ========================================================================= */}
      <div id="proposal-detail-section" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
        
        {/* Header Strip */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-1">
              <span>Proposal Tracker</span>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-navy-900 font-bold">{activeProposal.psCode}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-navy-900 font-display">
              {activeProposal.challengeTitle}
            </h2>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1 font-medium">
              <span>{activeProposal.department}</span>
              <span>•</span>
              <span>Solution: <strong className="text-[#1D64EC] font-bold">{activeProposal.solutionName}</strong></span>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <StatusBadge label={activeProposal.status} variant={activeProposal.statusVariant} size="md" />
            {activeProposal.status === 'Active Pilot' && (
              <button
                type="button"
                onClick={() => setActiveTab('execution')}
                className="px-4 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs flex items-center gap-1.5 transition-all"
              >
                <Rocket className="w-3.5 h-3.5" />
                <span>Open Pilot Workspace</span>
              </button>
            )}
          </div>
        </div>

        {/* Section A: 10-Stage Visual Progression */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-navy-900 font-display uppercase tracking-wider">
              10-Stage Procurement & Pilot Progression
            </h3>
            <span className="text-xs font-bold text-slate-400">
              Stage {selectedStageIndex + 1} of 10 Selected
            </span>
          </div>

          {/* Horizontal Timeline Bar */}
          <div className="overflow-x-auto pb-3 custom-scrollbar">
            <div className="flex items-center min-w-[850px] justify-between relative px-2">
              {/* Background Connecting Line */}
              <div className="absolute left-6 right-6 top-5 h-1 bg-slate-200 z-0" />

              {activeProposal.stages.map((stg, idx) => {
                const isCompleted = stg.status === 'Completed';
                const isInProgress = stg.status === 'In Progress';
                const isSelected = selectedStageIndex === idx;

                return (
                  <div 
                    key={stg.num}
                    onClick={() => setSelectedStageIndex(idx)}
                    className="relative z-10 flex flex-col items-center cursor-pointer group"
                    style={{ width: '80px' }}
                  >
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-xs transition-all ${
                      isSelected
                        ? 'ring-4 ring-blue-200 scale-110 shadow-md'
                        : ''
                    } ${
                      isCompleted
                        ? 'bg-emerald-500 text-white'
                        : isInProgress
                        ? 'bg-amber-500 text-white animate-pulse'
                        : 'bg-white text-slate-400 border-2 border-slate-200'
                    }`}>
                      {isCompleted ? <Check className="w-5 h-5 stroke-[3]" /> : stg.num}
                    </div>

                    <span className={`text-[10px] text-center font-bold mt-2 leading-tight ${
                      isSelected ? 'text-[#1D64EC]' : isInProgress ? 'text-amber-800' : isCompleted ? 'text-navy-900' : 'text-slate-400'
                    }`}>
                      {stg.title}
                    </span>

                    <span className="text-[9px] text-slate-400 font-mono mt-0.5 whitespace-nowrap">
                      {stg.date.split(' ')[0]} {stg.date.split(' ')[1] || ''}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Selected Stage Detail Card */}
          {activeStage && (
            <div className={`p-5 rounded-3xl border transition-all space-y-3 ${
              activeStage.status === 'In Progress' ? 'bg-amber-50/60 border-amber-200' :
              activeStage.status === 'Completed' ? 'bg-slate-50 border-slate-200/80' : 'bg-slate-50/40 border-slate-200/60'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200/60">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-xl bg-navy-900 text-white flex items-center justify-center font-bold text-xs">
                    {activeStage.num}
                  </span>
                  <div>
                    <h4 className="font-bold text-sm text-navy-900">{activeStage.title}</h4>
                    <span className="text-[11px] text-slate-500 font-mono">{activeStage.date}</span>
                  </div>
                </div>

                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  activeStage.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' :
                  activeStage.status === 'In Progress' ? 'bg-amber-100 text-amber-900' : 'bg-slate-200 text-slate-600'
                }`}>
                  {activeStage.status}
                </span>
              </div>

              <p className="text-xs text-slate-700 font-medium leading-relaxed">
                {activeStage.description}
              </p>

              {activeStage.notes && (
                <div className="p-3 rounded-2xl bg-white border border-slate-200/80 text-xs text-slate-700 font-medium">
                  <strong className="text-navy-900 block mb-0.5">Verification Notes:</strong>
                  {activeStage.notes}
                </div>
              )}

              {activeStage.kpis && (
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {activeStage.kpis.map((k, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-white border border-slate-200 text-center">
                      <span className="text-[10px] text-slate-400 block font-bold">{k.label}</span>
                      <strong className="text-emerald-700 font-bold">{k.value}</strong>
                    </div>
                  ))}
                </div>
              )}

              {activeStage.documents && activeStage.documents.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Stage Documents</span>
                  <div className="flex flex-wrap gap-2">
                    {activeStage.documents.map((d, i) => (
                      <div key={i} className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-navy-900 flex items-center gap-2">
                        <FileText className="w-3.5 h-3.5 text-[#1D64EC]" />
                        <span>{d.name}</span>
                        <button
                          type="button"
                          onClick={() => addNotification({ title: 'Document Opened', message: `Viewing ${d.name}`, portal: 'startup', type: 'info' })}
                          className="text-[#1D64EC] hover:underline text-[11px] ml-1"
                        >
                          View
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeStage.actions && activeStage.actions.length > 0 && (
                <div className="pt-2 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('execution')}
                    className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs flex items-center gap-1.5"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Submit M2 Milestone Deliverables</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => addNotification({ title: 'Telemetry Data Uploaded', message: 'Sensor logs queued for SCADA validation.', portal: 'startup', type: 'success' })}
                    className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-navy-900 font-bold text-xs"
                  >
                    Upload Telemetry Logs
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* 2-Column: Summary Panel + Milestones & KPIs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
          
          {/* Section B: Proposal Summary Panel (4 cols) */}
          <div className="lg:col-span-4 bg-slate-50 rounded-3xl p-6 border border-slate-200/80 space-y-4 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <h4 className="font-bold text-navy-900 font-display">Proposal Summary</h4>
              <span className="text-[10px] font-bold text-slate-400 font-mono">{activeProposal.psCode}</span>
            </div>

            <div className="space-y-2.5 text-slate-700">
              <div>
                <span className="text-slate-400 text-[10px] font-bold uppercase block">Challenge ID</span>
                <strong className="text-navy-900">{activeProposal.psCode}</strong>
              </div>

              <div>
                <span className="text-slate-400 text-[10px] font-bold uppercase block">Department</span>
                <p className="font-semibold text-navy-900">{activeProposal.department}</p>
              </div>

              <div>
                <span className="text-slate-400 text-[10px] font-bold uppercase block">Startup Solution</span>
                <strong className="text-[#1D64EC]">{activeProposal.solutionName}</strong>
              </div>

              <div className="pt-2 border-t border-slate-200 space-y-1.5">
                <span className="text-slate-400 text-[10px] font-bold uppercase block">Key Government Contacts</span>
                <p className="font-medium">Nodal: <strong className="text-navy-900">{activeProposal.keyContacts.nodalOfficer}</strong></p>
                <p className="font-medium">Evaluator: <strong className="text-navy-900">{activeProposal.keyContacts.technicalLead}</strong></p>
              </div>

              <div className="pt-2 border-t border-slate-200 space-y-2">
                <span className="text-slate-400 text-[10px] font-bold uppercase block">Primary Documents</span>
                <button
                  type="button"
                  onClick={() => addNotification({ title: 'Opened Full Proposal', message: 'Downloading verified proposal copy (PDF)', portal: 'startup', type: 'info' })}
                  className="w-full p-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 font-bold text-slate-700 flex items-center justify-between"
                >
                  <span>View Full Proposal (PDF)</span>
                  <Download className="w-3.5 h-3.5 text-[#1D64EC]" />
                </button>
                <button
                  type="button"
                  onClick={() => addNotification({ title: 'Opened Sandbox Agreement', message: 'Viewing bilateral legal contract (PDF)', portal: 'startup', type: 'info' })}
                  className="w-full p-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 font-bold text-slate-700 flex items-center justify-between"
                >
                  <span>View Contract & IP Terms (PDF)</span>
                  <Download className="w-3.5 h-3.5 text-[#1D64EC]" />
                </button>
              </div>
            </div>
          </div>

          {/* Section C & D: Milestones & KPIs (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Section C: Milestones & Payments */}
            <div className="p-6 bg-white rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h4 className="font-bold text-navy-900 text-sm font-display">
                  Milestones & Escrow Payments
                </h4>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Treasury PFMS Linked
                </span>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 text-xs">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-navy-900 border-b border-slate-200">
                      <th className="py-2.5 px-3.5 font-bold">Milestone</th>
                      <th className="py-2.5 px-3.5 font-bold">Due Date</th>
                      <th className="py-2.5 px-3.5 font-bold">Status</th>
                      <th className="py-2.5 px-3.5 font-bold">Tranche Amount</th>
                      <th className="py-2.5 px-3.5 font-bold">Payment</th>
                      <th className="py-2.5 px-3.5 font-bold text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {activeProposal.milestones.map((m, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/60">
                        <td className="py-3 px-3.5 font-bold text-navy-900">{m.name}</td>
                        <td className="py-3 px-3.5 font-mono text-slate-500">{m.dueDate}</td>
                        <td className="py-3 px-3.5">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            m.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' :
                            m.status === 'In Progress' ? 'bg-amber-100 text-amber-900' : 'bg-slate-100 text-slate-500'
                          }`}>
                            {m.status}
                          </span>
                        </td>
                        <td className="py-3 px-3.5 font-bold text-navy-900">{m.amount}</td>
                        <td className="py-3 px-3.5">
                          <span className={`font-bold ${m.paymentStatus === 'Paid' ? 'text-emerald-700' : 'text-amber-700'}`}>
                            {m.paymentStatus}
                          </span>
                        </td>
                        <td className="py-3 px-3.5 text-right">
                          {m.status === 'Completed' ? (
                            <button
                              type="button"
                              onClick={() => addNotification({ title: 'Voucher Opened', message: `Viewing voucher for ${m.name}`, portal: 'startup', type: 'info' })}
                              className="text-[11px] font-bold text-[#1D64EC] hover:underline"
                            >
                              View Report
                            </button>
                          ) : m.status === 'In Progress' ? (
                            <button
                              type="button"
                              onClick={() => setActiveTab('execution')}
                              className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-bold text-[10px]"
                            >
                              Submit M2
                            </button>
                          ) : (
                            <span className="text-slate-400">–</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Section D: KPIs & Performance */}
            <div className="p-6 bg-white rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h4 className="font-bold text-navy-900 text-sm font-display">
                  Live Pilot KPIs & Telemetry Performance
                </h4>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  {activeProposal.kpis.status}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
                  <span className="text-[10px] text-emerald-800 font-bold uppercase block">{activeProposal.kpis.primaryName}</span>
                  <div className="text-xl font-extrabold text-emerald-900 font-display">{activeProposal.kpis.current}</div>
                  <span className="text-[10px] text-slate-500">Target: {activeProposal.kpis.target}</span>
                </div>

                {activeProposal.kpis.secondary.map((sec, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">{sec.label}</span>
                    <div className="text-base font-bold text-navy-900 font-display">{sec.value}</div>
                    <span className="text-[10px] text-emerald-700 font-semibold">Live Validated</span>
                  </div>
                ))}
              </div>

              <p className="text-[10px] text-slate-400 italic pt-1">
                * Data sources: Municipal SCADA telemetry, LoRaWAN IoT edge sensors, and independent Maharashtra state verification board.
              </p>
            </div>

          </div>

        </div>

        {/* Section E: Documents & Correspondence */}
        <div className="p-6 bg-slate-50 rounded-3xl border border-slate-200/80 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <h4 className="font-bold text-navy-900 text-sm font-display">
              Documents & Official Correspondence
            </h4>
            <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 text-xs font-bold text-slate-600">
              <button
                type="button"
                onClick={() => setDocArchiveTab('all')}
                className={`px-2.5 py-1 rounded-lg ${docArchiveTab === 'all' ? 'bg-[#1D64EC] text-white' : 'hover:text-navy-900'}`}
              >
                All Documents
              </button>
              <button
                type="button"
                onClick={() => setDocArchiveTab('contract')}
                className={`px-2.5 py-1 rounded-lg ${docArchiveTab === 'contract' ? 'bg-[#1D64EC] text-white' : 'hover:text-navy-900'}`}
              >
                Contracts
              </button>
              <button
                type="button"
                onClick={() => setDocArchiveTab('milestones')}
                className={`px-2.5 py-1 rounded-lg ${docArchiveTab === 'milestones' ? 'bg-[#1D64EC] text-white' : 'hover:text-navy-900'}`}
              >
                Milestones
              </button>
              <button
                type="button"
                onClick={() => setDocArchiveTab('payments')}
                className={`px-2.5 py-1 rounded-lg ${docArchiveTab === 'payments' ? 'bg-[#1D64EC] text-white' : 'hover:text-navy-900'}`}
              >
                Invoices & Vouchers
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
            {[
              { title: 'Proposal Receipt #RCP-88192', type: 'Receipt', date: '10 Jun 2026' },
              { title: 'Expert Technical Scorecard (94/100)', type: 'Scorecard', date: '20 Jul 2026' },
              { title: 'Bilateral Sandbox Agreement Order', type: 'Contract', date: '10 Aug 2026' },
              { title: 'Milestone M1 Completion Report', type: 'Milestone', date: '30 Oct 2026' },
              { title: 'Treasury Disbursal Voucher – M1 (₹10.5L)', type: 'Payment', date: '05 Nov 2026' },
              { title: 'SCADA Telemetry Calibration Sign-off', type: 'Technical', date: '12 Nov 2026' },
            ].map((doc, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-white border border-slate-200 flex items-center justify-between gap-2 shadow-2xs">
                <div className="flex items-center gap-2.5 truncate">
                  <FileText className="w-4 h-4 text-[#1D64EC] shrink-0" />
                  <div className="truncate">
                    <span className="font-bold text-navy-900 truncate block">{doc.title}</span>
                    <span className="text-[10px] text-slate-400">{doc.type} • {doc.date}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => addNotification({ title: 'Document Downloaded', message: `Downloaded copy of ${doc.title} (PDF)`, portal: 'startup', type: 'info' })}
                  className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 shrink-0"
                >
                  <Download className="w-3.5 h-3.5 text-[#1D64EC]" />
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
