import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { 
  Scale, ShieldCheck, Lock, FileSignature, CheckCircle2, 
  Download, Check, Sparkles, FileText, ArrowRight, ArrowLeft, 
  AlertTriangle, Eye, Search, Filter, Building2, Calendar, 
  CheckSquare, FileSpreadsheet, ExternalLink, RefreshCw, X, ChevronRight, Award 
} from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';
import confetti from 'canvas-confetti';

interface PSShortlistedStartup {
  id: string;
  name: string;
  legalName: string;
  logo: string;
  pilotStatus: 'Completed' | 'In Progress' | 'Terminated';
  score: number;
  technicalScore: number;
  impactScore: number;
  complianceScore: number;
  costScaleScore: number;
  keyMetricsSummary: string;
  pilotDuration: string;
  recommendation: 'Recommended' | 'Alternate' | 'Not Recommended';
  approvalStatus: 'Approved' | 'Under Review' | 'Not Approved' | 'Rejected' | 'Pending Sign-off';
  notes: string;
}

interface ProblemStatementContractItem {
  id: string;
  psCode: string;
  title: string;
  description: string;
  department: string;
  status: 'Evaluation Complete' | 'Approved' | 'In Pilot' | 'Pending Approval';
  shortlistedCount: number;
  bestPerformer: {
    name: string;
    score: number;
  };
  approvalSummary: {
    statusText: string;
    approvedStartupName?: string;
    contractRef?: string;
    contractValue?: string;
    contractSigned: boolean;
  };
  evaluationCriteria: {
    name: string;
    weight: string;
  }[];
  expertPanelNote: string;
  shortlistedStartups: PSShortlistedStartup[];
  contractTerms: {
    agreementRef: string;
    pilotCost: string;
    scope: string;
    milestones: { name: string; pct: string; amount: string }[];
    ipClause: string;
    cyberClause: string;
    terminationClause: string;
  };
  documents: {
    type: string;
    description: string;
    date: string;
    fileName: string;
    fileSize: string;
  }[];
}

export const ContractApprovalGate: React.FC = () => {
  const { contracts, approveGovContract, setActiveTab, addNotification } = usePlatform();

  // Navigation State: 'overview' (PS-wise flow) | 'approved_repository' (Approved Startups Tab)
  const [activeMainTab, setActiveMainTab] = useState<'overview' | 'approved_repository'>('overview');
  
  // Selected Problem Statement for Section 2 Detail View (null = show PS list)
  const [selectedPSId, setSelectedPSId] = useState<string | null>(null);

  // Selected Approved Startup for Section 4 Dedicated Page (null = show approved list)
  const [selectedApprovedPSId, setSelectedApprovedPSId] = useState<string | null>(null);

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('All');
  const [selectedDepartmentFilter, setSelectedDepartmentFilter] = useState<string>('All');

  // Signatory State
  const [officialName, setOfficialName] = useState('Shri Rajesh Kumar, Secretary – Water Supply');

  // Modal State for Viewing Startup Evaluation Breakdown
  const [evalModalStartup, setEvalModalStartup] = useState<PSShortlistedStartup | null>(null);

  // Modal State for Document Preview
  const [previewDoc, setPreviewDoc] = useState<{ type: string; fileName: string; date: string } | null>(null);

  // Dataset of Problem Statements derived from contracts in context
  const psContractData: ProblemStatementContractItem[] = React.useMemo(() => {
    return contracts.map(c => ({
      id: c.id,
      psCode: c.id,
      title: c.challengeTitle,
      description: `Bilateral pilot innovation contract for ${c.challengeTitle}`,
      department: 'Government Department',
      status: (c.govStatus === 'approved' ? 'Approved' : 'Pending Approval') as 'Evaluation Complete' | 'Approved' | 'In Pilot' | 'Pending Approval',
      shortlistedCount: 1,
      bestPerformer: {
        name: c.startupName,
        score: 94
      },
      approvalSummary: {
        statusText: c.govStatus === 'approved' ? 'Approved – Contract Signed' : 'Pending Sign-off',
        approvedStartupName: c.startupName,
        contractRef: c.id,
        contractValue: c.totalValue,
        contractSigned: c.govStatus === 'approved'
      },
      evaluationCriteria: [
        { name: 'Technical Performance', weight: '40%' },
        { name: 'Quantified KPI Impact', weight: '30%' },
        { name: 'Cybersecurity & Compliance', weight: '15%' },
        { name: 'Cost Effectiveness', weight: '15%' }
      ],
      expertPanelNote: `Recommended for pilot deployment under agreement ${c.id}.`,
      shortlistedStartups: [
        {
          id: `ST-${c.id}`,
          name: c.startupName,
          legalName: `${c.startupName.toUpperCase()} PRIVATE LIMITED`,
          logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
          pilotStatus: 'In Progress',
          score: 94,
          technicalScore: 95,
          impactScore: 94,
          complianceScore: 92,
          costScaleScore: 90,
          keyMetricsSummary: 'Target KPI alignment confirmed',
          pilotDuration: '6 months',
          recommendation: 'Recommended',
          approvalStatus: (c.govStatus === 'approved' ? 'Approved' : 'Pending Sign-off') as 'Approved' | 'Under Review' | 'Not Approved' | 'Rejected' | 'Pending Sign-off',
          notes: 'Standard bilateral pilot agreement.'
        }
      ],
      contractTerms: {
        agreementRef: c.id,
        pilotCost: c.totalValue,
        scope: c.challengeTitle,
        milestones: (c.milestones || []).map((m: any) => ({ name: m.name || 'Milestone', pct: '33%', amount: `INR ${m.amount || '0'}` })),
        ipClause: 'Shared GovTech IP framework. Telemetry datasets owned by State.',
        cyberClause: 'State Cyber Policy compliance.',
        terminationClause: '30 days standard notice.'
      },
      documents: []
    }));
  }, [contracts]);

  // Active Problem Statement for Section 2
  const currentPS = psContractData.find(ps => ps.id === selectedPSId) || psContractData[0] || null;

  // Active Approved Item for Section 4
  const currentApprovedPS = psContractData.find(ps => ps.id === selectedApprovedPSId) || psContractData[0] || null;
  const currentApprovedStartup = currentApprovedPS ? (currentApprovedPS.shortlistedStartups.find(s => s.approvalStatus === 'Approved') || currentApprovedPS.shortlistedStartups[0]) : null;

  // Filtered PS list
  const filteredPSList = psContractData.filter(ps => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = ps.title.toLowerCase().includes(q) ||
                          ps.psCode.toLowerCase().includes(q) ||
                          ps.department.toLowerCase().includes(q) ||
                          ps.bestPerformer.name.toLowerCase().includes(q);

    const matchesStatus = selectedStatusFilter === 'All' || ps.status === selectedStatusFilter;
    const matchesDept = selectedDepartmentFilter === 'All' || ps.department === selectedDepartmentFilter;

    return matchesSearch && matchesStatus && matchesDept;
  });

  // Approved PS list for Tab 2
  const approvedPSList = psContractData.filter(ps => 
    ps.shortlistedStartups.some(s => s.approvalStatus === 'Approved')
  );

  const handleApproveContract = () => {
    approveGovContract(contracts[0]?.id || 'CT-001', officialName);
    addNotification({
      title: `Contract Approved & Dispatched: ${currentPS.bestPerformer.name}`,
      message: `Agreement Ref: ${currentPS.contractTerms.agreementRef} approved by ${officialName}. Dispatched for digital eSign.`,
      portal: 'both',
      type: 'success'
    });
    confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
  };

  const handleDownloadAllZip = (psTitle: string) => {
    addNotification({
      title: 'Dossier Archive Download Initiated',
      message: `Downloading complete zipped tender, contract, and approval bundle for "${psTitle}".`,
      portal: 'gov',
      type: 'info'
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header Banner */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="micro-label text-slate-400">Legal, Procurement & Governance Framework</span>
            <span className="w-2 h-2 rounded-full bg-[#1D64EC]" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 font-display">
            Contract Approval & Sign-off
          </h1>
          <p className="text-xs text-slate-600 mt-1 max-w-3xl">
            Review problem-statement-wise pilot evaluations, approve the best-performing startup, and access all approval, tender, and contract documents.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-2xl bg-white border border-slate-200 text-xs font-bold text-navy-900 shadow-xs">
            <span className="text-[#1D64EC] text-base">{approvedPSList.length}</span> Approved Startups
          </div>
        </div>
      </div>

      {/* Top-Level Navigation Tabs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white rounded-3xl p-2 border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
          <button
            onClick={() => {
              setActiveMainTab('overview');
              setSelectedPSId(null);
              setSelectedApprovedPSId(null);
            }}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeMainTab === 'overview' && !selectedApprovedPSId
                ? 'bg-[#1D64EC] text-white shadow-sm'
                : 'text-slate-600 hover:text-navy-900 hover:bg-slate-50'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>Problem Statements ({psContractData.length})</span>
          </button>

          <button
            onClick={() => {
              setActiveMainTab('approved_repository');
              setSelectedPSId(null);
              setSelectedApprovedPSId(null);
            }}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeMainTab === 'approved_repository' && !selectedApprovedPSId
                ? 'bg-[#1D64EC] text-white shadow-sm'
                : 'text-slate-600 hover:text-navy-900 hover:bg-slate-50'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Approved Startups by Problem Statement ({approvedPSList.length})</span>
          </button>
        </div>

        {/* Top Filter Controls */}
        {!selectedPSId && !selectedApprovedPSId && (
          <div className="flex flex-wrap items-center gap-2 px-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-56">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search PS, startup, ref..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-navy-900 outline-none focus:border-[#1D64EC] placeholder:text-slate-400"
              />
            </div>

            <select
              value={selectedStatusFilter}
              onChange={(e) => setSelectedStatusFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-navy-900 outline-none focus:border-[#1D64EC]"
            >
              <option value="All">All Statuses</option>
              <option value="Evaluation Complete">Evaluation Complete</option>
              <option value="Approved">Approved</option>
              <option value="In Pilot">In Pilot</option>
            </select>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: PROBLEM STATEMENT-WISE OVERVIEW (Main Landing View of Tab 1) */}
      {/* ========================================================================= */}
      {activeMainTab === 'overview' && !selectedPSId && !selectedApprovedPSId && (
        <div className="space-y-6 animate-in fade-in duration-150">
          
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-navy-900 font-display">
                Problem Statements
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Select a problem statement to inspect shortlisted startups, pilot evaluations, and approve final contracts.
              </p>
            </div>
            <span className="text-xs font-bold text-slate-400">
              Showing {filteredPSList.length} Challenges
            </span>
          </div>          {/* Problem Statement Cards Grid or Clean Empty State */}
          {filteredPSList.length === 0 ? (
            <div className="glass-panel rounded-3xl p-16 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#1D64EC] flex items-center justify-center mx-auto">
                <Scale className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-navy-900">No Contracts Awaiting Approval</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                When startup proposals receive technical domain expert clearance, bilateral contract packages will appear here for secretarial ratification.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPSList.map((ps) => (
                <div
                  key={ps.id}
                  className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-[#1D64EC]/50 transition-all flex flex-col justify-between group space-y-4"
                >
                  <div>
                    {/* Top Row: PS ID + Title + Status */}
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <span className="text-[11px] font-mono font-bold text-[#1D64EC] uppercase tracking-wider block mb-1">
                          {ps.psCode} • {ps.department}
                        </span>
                        <h3 className="text-base font-bold text-navy-900 leading-snug group-hover:text-[#1D64EC] transition-colors">
                          {ps.title}
                        </h3>
                      </div>

                      <StatusBadge
                        label={ps.status}
                        variant={
                          ps.status === 'Approved' ? 'emerald' :
                          ps.status === 'Evaluation Complete' ? 'violet' :
                          ps.status === 'In Pilot' ? 'amber' : 'blue'
                        }
                        size="sm"
                      />
                    </div>

                    {/* 1-Line Description */}
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 mb-4 font-medium">
                      {ps.description}
                    </p>

                    {/* Metadata Chips: Shortlist Count & Best Performer */}
                    <div className="space-y-2 pt-3 border-t border-slate-100 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 font-medium">Shortlisted Startups:</span>
                        <strong className="text-navy-900 font-bold">{ps.shortlistedCount} startups shortlisted</strong>
                      </div>

                      <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-slate-400 block">Best Performer</span>
                          <p className="text-xs font-bold text-navy-900 mt-0.5">{ps.bestPerformer.name}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] uppercase font-bold text-slate-400 block">Panel Score</span>
                          <p className="text-sm font-extrabold text-[#1D64EC] font-display mt-0.5">{ps.bestPerformer.score}/100</p>
                        </div>
                      </div>

                      {/* Approval Status */}
                      <div className="flex items-center gap-2 pt-1 text-[11px]">
                        <span className="font-semibold text-slate-500">Approval Status:</span>
                        <span className={`font-bold ${
                          ps.status === 'Approved' ? 'text-emerald-700' :
                          ps.status === 'Evaluation Complete' ? 'text-purple-700' : 'text-amber-700'
                        }`}>
                          {ps.approvalSummary.statusText}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom CTA Button */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-mono">
                      Ref: {ps.contractTerms.agreementRef}
                    </span>

                    <button
                      type="button"
                      onClick={() => setSelectedPSId(ps.id)}
                      className="px-4 py-2 rounded-full bg-[#1D64EC] hover:bg-brand-cobalt text-white font-bold text-xs shadow-sm flex items-center gap-1.5 transition-all group-hover:scale-[1.02]"
                    >
                      <span>Review Shortlist & Approve</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}

        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 2: PROBLEM STATEMENT DETAIL PAGE (When clicking a PS) */}
      {/* ========================================================================= */}
      {activeMainTab === 'overview' && selectedPSId && currentPS && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* Breadcrumb & Navigation */}
          <div className="flex items-center justify-between pb-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <button 
                onClick={() => setSelectedPSId(null)}
                className="hover:text-[#1D64EC] transition-colors"
              >
                Contract Approval
              </button>
              <span>→</span>
              <span className="text-navy-900 font-bold">{currentPS.psCode}: {currentPS.title}</span>
            </div>

            <button
              onClick={() => setSelectedPSId(null)}
              className="px-4 py-1.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 flex items-center gap-1 shadow-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to PS List</span>
            </button>
          </div>

          {/* PS Header Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#1D64EC] font-mono text-[10px] font-bold border border-blue-100">
                  {currentPS.psCode} • {currentPS.department}
                </span>
              </div>
              <h2 className="text-2xl font-extrabold text-navy-900 font-display">
                {currentPS.title}
              </h2>
              <p className="text-xs text-slate-600 mt-1 max-w-2xl font-medium">
                {currentPS.description}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <StatusBadge
                label={currentPS.status === 'Approved' ? 'Pilot Completed – Approval Done' : 'Evaluation Complete – Pending Sign-off'}
                variant={currentPS.status === 'Approved' ? 'emerald' : 'amber'}
                size="md"
                icon={currentPS.status === 'Approved' ? 'check' : 'clock'}
              />
            </div>
          </div>

          {/* Subsection A: Shortlisted Startups for this PS (Table) */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-navy-900 font-display">
                  Shortlisted Startups for Pilot
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Comparison of pilot performance, verified impact metrics, and final recommendation status.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-navy-900 border-b border-slate-200">
                    <th className="py-3.5 px-4 font-bold">Startup</th>
                    <th className="py-3.5 px-4 font-bold">Status</th>
                    <th className="py-3.5 px-4 font-bold">Score</th>
                    <th className="py-3.5 px-4 font-bold min-w-[200px]">Key Metrics Summary</th>
                    <th className="py-3.5 px-4 font-bold">Duration</th>
                    <th className="py-3.5 px-4 font-bold">Recommendation</th>
                    <th className="py-3.5 px-4 font-bold">Approval Status</th>
                    <th className="py-3.5 px-4 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {currentPS.shortlistedStartups.map((st) => (
                    <tr key={st.id} className="hover:bg-blue-50/40 transition-colors">
                      
                      {/* Startup */}
                      <td className="py-4 px-4 font-bold text-navy-900 whitespace-nowrap">
                        <div className="flex items-center gap-2.5">
                          <img src={st.logo} alt={st.name} className="w-7 h-7 rounded-lg object-cover border border-slate-200" />
                          <span>{st.name}</span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${
                          st.pilotStatus === 'Completed' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' :
                          st.pilotStatus === 'In Progress' ? 'bg-blue-50 text-blue-800 border border-blue-200' :
                          'bg-rose-50 text-rose-800 border border-rose-200'
                        }`}>
                          {st.pilotStatus}
                        </span>
                      </td>

                      {/* Score */}
                      <td className="py-4 px-4 font-bold text-navy-900">
                        <span className="text-[#1D64EC] font-extrabold text-sm">{st.score}</span> / 100
                      </td>

                      {/* Key Metrics */}
                      <td className="py-4 px-4 text-slate-700 font-medium">
                        {st.keyMetricsSummary}
                      </td>

                      {/* Duration */}
                      <td className="py-4 px-4 text-slate-600 font-medium whitespace-nowrap">
                        {st.pilotDuration}
                      </td>

                      {/* Recommendation */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${
                          st.recommendation === 'Recommended' ? 'bg-emerald-100 text-emerald-900' :
                          st.recommendation === 'Alternate' ? 'bg-amber-50 text-amber-900' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {st.recommendation}
                        </span>
                      </td>

                      {/* Approval Status */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className={`font-bold ${
                          st.approvalStatus === 'Approved' ? 'text-emerald-700' :
                          st.approvalStatus === 'Pending Sign-off' ? 'text-amber-700' : 'text-slate-500'
                        }`}>
                          {st.approvalStatus}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 text-right whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => setEvalModalStartup(st)}
                          className="px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-[#1D64EC] hover:text-white text-slate-700 font-bold text-[11px] transition-colors"
                        >
                          View Evaluation
                        </button>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Subsection B: Pilot Evaluation Summary (per PS) */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-navy-900 font-display">
                  Pilot Evaluation Summary – {currentPS.psCode}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Standardized rubric weighting and multi-attribute evaluation breakdown.
                </p>
              </div>
            </div>

            {/* Criteria & Weights Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {currentPS.evaluationCriteria.map((crit, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#1D64EC] block mb-1">
                    {crit.weight} Weight
                  </span>
                  <p className="text-xs font-bold text-navy-900 leading-snug">{crit.name}</p>
                </div>
              ))}
            </div>

            {/* Aggregate Results Comparison Table */}
            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-navy-900 border-b border-slate-200">
                    <th className="py-3 px-4 font-bold">Startup</th>
                    <th className="py-3 px-4 font-bold text-center">Technical (40%)</th>
                    <th className="py-3 px-4 font-bold text-center">Impact (30%)</th>
                    <th className="py-3 px-4 font-bold text-center">Compliance (15%)</th>
                    <th className="py-3 px-4 font-bold text-center">Cost & Scale (15%)</th>
                    <th className="py-3 px-4 font-bold text-right">Overall Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                  {currentPS.shortlistedStartups.map((st) => (
                    <tr key={st.id} className="hover:bg-slate-50/60">
                      <td className="py-3 px-4 font-bold text-navy-900">{st.name}</td>
                      <td className="py-3 px-4 text-center">{st.technicalScore}/100</td>
                      <td className="py-3 px-4 text-center">{st.impactScore}/100</td>
                      <td className="py-3 px-4 text-center">{st.complianceScore}/100</td>
                      <td className="py-3 px-4 text-center">{st.costScaleScore}/100</td>
                      <td className="py-3 px-4 text-right font-bold text-[#1D64EC] text-sm">{st.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Expert Panel Note Box */}
            <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-[#1D64EC] shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="font-bold text-navy-900 block mb-0.5">Expert Panel Consensus Note:</span>
                <p className="text-slate-700 leading-relaxed font-medium">
                  “{currentPS.expertPanelNote}”
                </p>
              </div>
            </div>
          </div>

          {/* Subsection C: Approval Decision & Contract */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-navy-900 font-display">
                  Approval & Contract – {currentPS.psCode}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Agreement Ref: <strong className="font-mono text-[#1D64EC]">{currentPS.contractTerms.agreementRef}</strong>
                </p>
              </div>

              <button
                type="button"
                onClick={() => setPreviewDoc({ type: 'Contract Agreement', fileName: 'DRAFT-CONTRACT-AGREEMENT.pdf', date: '25-Jul-2026' })}
                className="px-4 py-2 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Draft (PDF)</span>
              </button>
            </div>

            {/* Contract Highlights */}
            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="micro-label text-[#1D64EC] block">1. Scope of Work</span>
                <p className="text-slate-700 leading-relaxed font-medium">{currentPS.contractTerms.scope}</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="micro-label text-[#1D64EC] block">2. Pilot Cost & Milestones (Escrow Tranches)</span>
                <p className="text-slate-900 font-bold mb-2">Total Grant Value: {currentPS.contractTerms.pilotCost}</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {currentPS.contractTerms.milestones.map((ms, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-white border border-slate-200">
                      <strong className="text-navy-900 block leading-tight">{ms.name}</strong>
                      <span className="text-[11px] text-[#1D64EC] font-bold mt-1 block">{ms.amount}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="micro-label text-emerald-700 block">3. Intellectual Property (IP) & Data Ownership</span>
                <p className="text-slate-700 leading-relaxed font-medium">{currentPS.contractTerms.ipClause}</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="micro-label text-purple-700 block">4. Cybersecurity & Policy Compliance</span>
                <p className="text-slate-700 leading-relaxed font-medium">{currentPS.contractTerms.cyberClause}</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="micro-label text-amber-700 block">5. Termination & Risk Provisions</span>
                <p className="text-slate-700 leading-relaxed font-medium">{currentPS.contractTerms.terminationClause}</p>
              </div>
            </div>

            {/* Signatory Authorization & Actions */}
            <div className="pt-4 border-t border-slate-100 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
              <div>
                <label className="micro-label block mb-1">Authorizing Department Signatory</label>
                <input
                  type="text"
                  value={officialName}
                  onChange={(e) => setOfficialName(e.target.value)}
                  className="p-2.5 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-navy-900 w-full sm:w-80 outline-none focus:border-[#1D64EC] focus:bg-white"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPreviewDoc({ type: 'Approval File', fileName: 'MHA-APPROVAL-NOTE.pdf', date: '15-Jul-2026' })}
                  className="px-4 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
                >
                  View Approval File
                </button>

                <button
                  type="button"
                  onClick={() => addNotification({ title: 'Revision Requested', message: 'Notice sent to department legal team for contract clause amendments.', portal: 'gov', type: 'warning' })}
                  className="px-4 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
                >
                  Request Changes
                </button>

                <button
                  type="button"
                  onClick={handleApproveContract}
                  className="px-6 py-2.5 rounded-full bg-[#1D64EC] hover:bg-brand-cobalt text-white font-bold text-xs shadow-sm flex items-center gap-1.5 transition-all hover:scale-[1.02]"
                >
                  <Check className="w-4 h-4" />
                  <span>Approve & Send for eSign</span>
                </button>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 3: TAB 2 - APPROVED STARTUPS BY PROBLEM STATEMENT */}
      {/* ========================================================================= */}
      {activeMainTab === 'approved_repository' && !selectedApprovedPSId && (
        <div className="space-y-6 animate-in fade-in duration-150">
          
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-navy-900 font-display">
                Approved Startups by Problem Statement
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Central legal and procurement vault containing all ratified contracts, tender annexures, and CERT-In compliance certificates.
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleDownloadAllZip('All Approved Startups (Maharashtra State Repository)')}
              className="px-4 py-2 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Complete Vault (ZIP)</span>
            </button>
          </div>

          {/* Grouped Accordion / List of Approved Startups by PS */}
          <div className="space-y-5">
            {approvedPSList.map((ps) => {
              const approvedStartup = ps.shortlistedStartups.find(s => s.approvalStatus === 'Approved') || ps.shortlistedStartups[0];

              return (
                <div
                  key={ps.id}
                  className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-4"
                >
                  {/* PS Group Header */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-[#1D64EC] uppercase tracking-wider block">
                        {ps.psCode} • {ps.department}
                      </span>
                      <h3 className="text-base font-bold text-navy-900 font-display mt-0.5">
                        {ps.title}
                      </h3>
                    </div>

                    <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200">
                      1 Approved Startup
                    </span>
                  </div>

                  {/* Approved Startup Card Row */}
                  <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-100 space-y-4">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      <div className="flex items-center gap-3.5">
                        <img src={approvedStartup.logo} alt={approvedStartup.name} className="w-12 h-12 rounded-xl object-cover border border-slate-200 shadow-xs" />
                        <div>
                          <h4 className="font-bold text-sm text-navy-900">
                            {approvedStartup.legalName || approvedStartup.name}
                          </h4>
                          <div className="flex items-center gap-3 text-xs text-slate-500 mt-1 font-medium">
                            <span>Contract Ref: <strong className="font-mono text-navy-900">{ps.contractTerms.agreementRef}</strong></span>
                            <span>•</span>
                            <span>Value: <strong className="text-navy-900">{ps.contractTerms.pilotCost}</strong></span>
                            <span>•</span>
                            <span className="text-emerald-700 font-bold">Active Contract</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedApprovedPSId(ps.id)}
                          className="px-4 py-2 rounded-full bg-[#1D64EC] hover:bg-brand-cobalt text-white font-bold text-xs shadow-sm transition-all"
                        >
                          View Full Details
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDownloadAllZip(`${approvedStartup.name} - ${ps.psCode}`)}
                          className="px-4 py-2 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs transition-colors"
                        >
                          Download All (ZIP)
                        </button>
                      </div>
                    </div>

                    {/* Quick Access Document Chips */}
                    <div className="pt-3 border-t border-slate-200/60 flex flex-wrap items-center gap-2 text-xs">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">Legal Documents:</span>
                      {ps.documents.map((doc, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setPreviewDoc({ type: doc.type, fileName: doc.fileName, date: doc.date })}
                          className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-[11px] flex items-center gap-1.5 transition-colors shadow-2xs"
                        >
                          <FileText className="w-3.5 h-3.5 text-[#1D64EC]" />
                          <span>{doc.type}</span>
                        </button>
                      ))}
                    </div>

                  </div>

                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 4: APPROVED STARTUP DETAIL PAGE (When clicking View Full Details) */}
      {/* ========================================================================= */}
      {activeMainTab === 'approved_repository' && selectedApprovedPSId && currentApprovedPS && currentApprovedStartup && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* Breadcrumb */}
          <div className="flex items-center justify-between pb-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <button 
                onClick={() => setSelectedApprovedPSId(null)}
                className="hover:text-[#1D64EC] transition-colors"
              >
                Contract Approval
              </button>
              <span>→</span>
              <button 
                onClick={() => setSelectedApprovedPSId(null)}
                className="hover:text-[#1D64EC] transition-colors"
              >
                Approved Startups
              </button>
              <span>→</span>
              <span className="text-navy-900 font-bold">{currentApprovedStartup.name} ({currentApprovedPS.psCode})</span>
            </div>

            <button
              onClick={() => setSelectedApprovedPSId(null)}
              className="px-4 py-1.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 flex items-center gap-1 shadow-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Approved List</span>
            </button>
          </div>

          {/* Header Banner */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img src={currentApprovedStartup.logo} alt={currentApprovedStartup.name} className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shadow-xs shrink-0" />
              <div>
                <span className="text-[10px] font-mono font-bold text-[#1D64EC] uppercase tracking-wider block mb-1">
                  Agreement: {currentApprovedPS.contractTerms.agreementRef}
                </span>
                <h2 className="text-2xl font-extrabold text-navy-900 font-display">
                  {currentApprovedStartup.name} – {currentApprovedPS.psCode}: {currentApprovedPS.title}
                </h2>
                <p className="text-xs text-slate-600 font-medium mt-0.5">
                  {currentApprovedStartup.legalName} • {currentApprovedPS.department}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <StatusBadge label="Active Ratified Contract" variant="emerald" size="md" icon="check" />
            </div>
          </div>

          {/* Subsection A: Contract Overview */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-navy-900 font-display border-b border-slate-100 pb-3">
              Contract Overview
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Problem Statement</span>
                <p className="font-bold text-navy-900">{currentApprovedPS.psCode}</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Agreement Ref</span>
                <p className="font-mono font-bold text-[#1D64EC]">{currentApprovedPS.contractTerms.agreementRef}</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Contract Value</span>
                <p className="font-bold text-navy-900">{currentApprovedPS.contractTerms.pilotCost}</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Pilot Duration</span>
                <p className="font-bold text-navy-900">{currentApprovedStartup.pilotDuration}</p>
              </div>
            </div>

            <div className="space-y-3 pt-2 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="micro-label text-navy-900 block">Scope of Deployment</span>
                <p className="text-slate-700 leading-relaxed font-medium">{currentApprovedPS.contractTerms.scope}</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="micro-label text-[#1D64EC] block">Milestones & Payments</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-1">
                  {currentApprovedPS.contractTerms.milestones.map((ms, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-white border border-slate-200 font-medium">
                      <strong className="text-navy-900 block">{ms.name} ({ms.pct})</strong>
                      <span className="text-xs text-[#1D64EC] font-bold mt-0.5 block">{ms.amount}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="micro-label text-emerald-700 block">IP & Data Ownership</span>
                <p className="text-slate-700 leading-relaxed font-medium">{currentApprovedPS.contractTerms.ipClause}</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="micro-label text-purple-700 block">Cybersecurity & Compliance</span>
                <p className="text-slate-700 leading-relaxed font-medium">{currentApprovedPS.contractTerms.cyberClause}</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="micro-label text-amber-700 block">Termination & Risk Provisions</span>
                <p className="text-slate-700 leading-relaxed font-medium">{currentApprovedPS.contractTerms.terminationClause}</p>
              </div>
            </div>
          </div>

          {/* Subsection B: Approval & Tender Documents */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-navy-900 font-display">
                  Approval & Tender Documents
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Official verified PDFs, administrative orders, and compliance certificates.
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleDownloadAllZip(`${currentApprovedStartup.name} - Complete Dossier`)}
                className="px-4 py-2 rounded-full bg-[#1D64EC] hover:bg-brand-cobalt text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download All Documents (ZIP)</span>
              </button>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-navy-900 border-b border-slate-200">
                    <th className="py-3.5 px-4 font-bold">Document Type</th>
                    <th className="py-3.5 px-4 font-bold">Description</th>
                    <th className="py-3.5 px-4 font-bold">Date</th>
                    <th className="py-3.5 px-4 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                  {currentApprovedPS.documents.map((doc, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/60">
                      <td className="py-3.5 px-4 font-bold text-navy-900 flex items-center gap-2">
                        <FileText className="w-4 h-4 text-[#1D64EC]" />
                        <span>{doc.type}</span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">{doc.description}</td>
                      <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">{doc.date}</td>
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setPreviewDoc({ type: doc.type, fileName: doc.fileName, date: doc.date })}
                            className="px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] transition-colors"
                          >
                            View
                          </button>
                          <button
                            type="button"
                            onClick={() => addNotification({ title: 'Download Started', message: `Downloading ${doc.fileName}`, portal: 'gov', type: 'info' })}
                            className="px-3 py-1 rounded-full bg-white hover:bg-blue-50 text-[#1D64EC] border border-blue-200 font-bold text-[11px] transition-colors"
                          >
                            Download
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Subsection C: Related Links */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold text-navy-900 font-display">
                Connected Portals & Live Feeds
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">Jump directly to telemetry telemetry or startup registry dossier</p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('directory')}
                className="px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>View Startup Profile</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('monitor')}
                className="px-4 py-2 rounded-full bg-blue-50 hover:bg-blue-100 text-[#1D64EC] border border-blue-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>View Work Area Monitor</span>
              </button>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 1: DETAILED STARTUP EVALUATION BREAKDOWN */}
      {/* ========================================================================= */}
      {evalModalStartup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-5 border border-slate-200 shadow-2xl">
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <img src={evalModalStartup.logo} alt={evalModalStartup.name} className="w-10 h-10 rounded-xl object-cover border border-slate-200" />
                <div>
                  <h3 className="text-base font-bold text-navy-900 font-display">
                    {evalModalStartup.name} — Evaluation Scorecard
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">{evalModalStartup.legalName}</p>
                </div>
              </div>

              <button
                onClick={() => setEvalModalStartup(null)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs"
              >
                ×
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-center justify-between">
                <span className="font-bold text-navy-900">Aggregate Panel Score</span>
                <span className="text-base font-extrabold text-[#1D64EC] font-display">{evalModalStartup.score} / 100</span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="font-medium text-slate-700">1. Technical Performance (40%)</span>
                  <strong className="text-navy-900 font-bold">{evalModalStartup.technicalScore}/100</strong>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="font-medium text-slate-700">2. Quantified Impact on KPIs (30%)</span>
                  <strong className="text-navy-900 font-bold">{evalModalStartup.impactScore}/100</strong>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="font-medium text-slate-700">3. Compliance & Security (15%)</span>
                  <strong className="text-navy-900 font-bold">{evalModalStartup.complianceScore}/100</strong>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="font-medium text-slate-700">4. Cost & District Scalability (15%)</span>
                  <strong className="text-navy-900 font-bold">{evalModalStartup.costScaleScore}/100</strong>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="micro-label text-slate-400 block mb-1">Evaluator Qualitative Assessment</span>
                <p className="text-slate-700 leading-relaxed font-medium">{evalModalStartup.notes}</p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setEvalModalStartup(null)}
                className="px-5 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: DOCUMENT PREVIEW MODAL */}
      {/* ========================================================================= */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-5 border border-slate-200 shadow-2xl">
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#1D64EC] uppercase tracking-wider block">
                  Document Viewer • {previewDoc.date}
                </span>
                <h3 className="text-lg font-bold text-navy-900 font-display mt-0.5">
                  {previewDoc.type}
                </h3>
                <p className="text-xs text-slate-500 font-mono">{previewDoc.fileName}</p>
              </div>

              <button
                onClick={() => setPreviewDoc(null)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs"
              >
                ×
              </button>
            </div>

            {/* Document Mock Viewer Canvas */}
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-4 font-mono text-slate-700">
              <div className="text-center pb-3 border-b border-slate-200 font-bold text-navy-900 uppercase">
                Government of Maharashtra • Department of Urban Development & Water Resources
              </div>
              <div className="space-y-2">
                <p><strong>Document Ref:</strong> {previewDoc.fileName}</p>
                <p><strong>Date of Execution:</strong> {previewDoc.date}</p>
                <p><strong>Status:</strong> Legally Ratified & Digitally Sealed (SHA-256 / UIDAI eSign)</p>
                <p className="leading-relaxed font-sans text-slate-600 pt-2">
                  This document serves as the official authenticated record for the procurement and pilot contract approval under Problem Statement 26136. All statutory terms regarding IP licensing, cyber security certification (CERT-In Level 3), and milestone escrow tranches are formally incorporated herein.
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => addNotification({ title: 'PDF Downloaded', message: `Downloaded ${previewDoc.fileName}`, portal: 'gov', type: 'success' })}
                className="px-5 py-2.5 rounded-full bg-[#1D64EC] hover:bg-brand-cobalt text-white font-bold text-xs shadow-sm flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Document (PDF)</span>
              </button>

              <button
                type="button"
                onClick={() => setPreviewDoc(null)}
                className="px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
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
