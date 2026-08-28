import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { 
  Rocket, Ticket, Upload, FileSignature, 
  ArrowUpRight, ChevronRight, FileText, CheckCircle2, Clock, Sparkles, 
  Building2, User, Globe, Mail, Phone, ExternalLink, Download, 
  ShieldCheck, AlertTriangle, Scale, DollarSign, Award, ArrowRight, 
  Check, Eye, Shield, Layers, FileCheck, Search, ChevronLeft, Calendar, 
  Edit3, Briefcase, MapPin, Hash, Users, Activity, Sparkle, Inbox
} from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';

export const StartupDashboard: React.FC = () => {
  const { currentStartup, proposals, contracts, setActiveTab, addNotification } = usePlatform();

  const [activeFilter, setActiveFilter] = useState<'all' | 'proposals' | 'pilots' | 'scaled'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  // Founder Profile Data (from currentStartup or clean defaults)
  const founder = {
    name: currentStartup.founderName || 'Founder Name',
    role: 'Founder & CEO',
    company: currentStartup.name || 'Your Registered Startup',
    status: currentStartup.dpiitRecognized ? 'DPIIT Verified' : 'DPIIT Registered',
    dpiitNo: currentStartup.dpiitNumber || 'DIPP-XXXXX',
    userId: currentStartup.id || 'STARTUP-MH-USER',
    gender: 'N/A',
    email: currentStartup.contactEmail || currentStartup.email || 'founder@yourstartup.com',
    phone: currentStartup.phone || '+91-XXXXXXXXXX',
    address: currentStartup.location || 'Maharashtra, India',
    experience: 'N/A',
    sector: currentStartup.sector || 'DeepTech & Public Innovation',
    cin: currentStartup.cin || 'UXXXXXXXXXXXXXX',
    gstin: currentStartup.gst || currentStartup.gstin || '27XXXXXXXXXXXXX',
    teamSize: `${currentStartup.teamSize || 0} Members`,
    incorporationYear: currentStartup.yearFounded ? String(currentStartup.yearFounded) : '2026',
    website: currentStartup.website || 'yourstartup.com',
    complianceScore: `${currentStartup.cyberScore || 0} / 100`
  };

  // Engagements derived from context proposals
  const engagements = proposals.map((p) => ({
    id: p.id,
    type: p.status === 'pilot_ongoing' ? 'pilot' : p.status === 'completed' ? 'scaled' : 'proposal',
    title: p.challengeTitle,
    department: p.department || 'Government Department',
    timeBadge: p.submittedAt || 'Recent',
    status: p.status === 'pilot_ongoing' ? 'Active Pilot' : p.status === 'shortlisted' ? 'Shortlisted' : 'Under Review',
    statusColor: p.status === 'pilot_ongoing' ? 'emerald' : p.status === 'shortlisted' ? 'emerald' : 'blue',
    stage: p.status === 'pilot_ongoing' ? 'Active Pilot' : p.status === 'completed' ? 'Scale Decision' : 'Submitted',
    kpiText: p.proposedSolutionName || 'Outcome alignment verified',
    actionLabel: p.status === 'pilot_ongoing' ? 'Pilot Console' : 'View Proposal',
    tabTarget: p.status === 'pilot_ongoing' ? 'execution' : 'applications'
  }));

  // Invoices derived from contracts
  const invoices = contracts.map((c) => ({
    id: `INV-${c.id}`,
    project: c.challengeTitle,
    amount: c.totalValue,
    status: c.govStatus === 'approved' ? 'Paid' : 'Pending',
    date: c.effectiveDate || 'Recent'
  }));

  const filteredEngagements = engagements.filter(item => {
    if (activeFilter === 'proposals' && item.type !== 'proposal') return false;
    if (activeFilter === 'pilots' && item.type !== 'pilot') return false;
    if (activeFilter === 'scaled' && item.type !== 'scaled') return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return item.title.toLowerCase().includes(q) || item.department.toLowerCase().includes(q);
    }
    return true;
  });

  const activePilotsCount = proposals.filter(p => p.status === 'pilot_ongoing').length;

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-navy-900 font-display tracking-tight">
            Founder & Startup Profile
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Command cockpit for active state innovation challenges, live pilots, milestones, and treasury disbursals.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('passport')}
            className="px-4 py-2 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-navy-900 font-bold text-xs shadow-xs flex items-center gap-2 transition-all"
          >
            <Ticket className="w-3.5 h-3.5 text-purple-600" />
            <span>Evidence Archive</span>
          </button>
          
          <button
            type="button"
            onClick={() => setActiveTab('challenges')}
            className="px-4 py-2 rounded-2xl bg-[#1D64EC] hover:bg-blue-700 text-white font-bold text-xs shadow-xs flex items-center gap-2 transition-all"
          >
            <Rocket className="w-3.5 h-3.5" />
            <span>Explore Challenges</span>
          </button>
        </div>
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* ========================================================================= */}
        {/* LEFT COLUMN: TALL FOUNDER & STARTUP PROFILE CARD (Col 1-4)                 */}
        {/* ========================================================================= */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-6 lg:sticky lg:top-24">
          
          {/* Top Profile Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-xl font-black font-display shadow-md shrink-0 border-2 border-white">
                {founder.name ? founder.name.slice(0, 2).toUpperCase() : 'ST'}
              </div>
              <div className="space-y-1">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {founder.status}
                </span>
                <h2 className="text-lg font-black text-navy-900 font-display leading-tight">
                  {founder.name}
                </h2>
                <p className="text-xs text-slate-500 font-semibold">
                  {founder.role}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsEditProfileOpen(true)}
              className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors shrink-0"
              title="Edit Profile"
            >
              <Edit3 className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Action Icon Strip */}
          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={() => setActiveTab('passport')}
              className="flex-1 py-2 px-3 rounded-xl bg-[#1D64EC] hover:bg-blue-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
            >
              <FileCheck className="w-3.5 h-3.5" />
              <span>Full Dossier</span>
            </button>
          </div>

          {/* Key-Value Information List */}
          <div className="divide-y divide-slate-100 text-xs space-y-3 pt-2">
            
            <div className="flex items-center justify-between pt-3">
              <span className="text-slate-400 font-medium flex items-center gap-2">
                <Building2 className="w-4 h-4 text-slate-400" />
                Company Name
              </span>
              <strong className="text-navy-900 font-bold text-right truncate max-w-[170px]">
                {founder.company}
              </strong>
            </div>

            <div className="flex items-center justify-between pt-3">
              <span className="text-slate-400 font-medium flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-purple-500" />
                Domain & Sector
              </span>
              <span className="font-bold text-navy-900 text-right truncate max-w-[170px]">
                {founder.sector}
              </span>
            </div>

            <div className="flex items-center justify-between pt-3">
              <span className="text-slate-400 font-medium flex items-center gap-2">
                <Hash className="w-4 h-4 text-emerald-500" />
                DPIIT Reg. No.
              </span>
              <strong className="font-mono font-bold text-emerald-700">
                {founder.dpiitNo}
              </strong>
            </div>

            <div className="flex items-center justify-between pt-3">
              <span className="text-slate-400 font-medium flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-400" />
                Email
              </span>
              <span className="text-slate-700 font-medium truncate max-w-[180px]">
                {founder.email}
              </span>
            </div>

            <div className="flex items-center justify-between pt-3">
              <span className="text-slate-400 font-medium flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Compliance Score
              </span>
              <strong className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">
                {founder.complianceScore}
              </strong>
            </div>

          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-600 leading-relaxed">
            <strong className="text-navy-900 block mb-0.5">Sandbox Status:</strong>
            Registered innovator in Maharashtra state procurement gateway.
          </div>

        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: METRICS + ENGAGEMENT CARDS (Col 5-12)                        */}
        {/* ========================================================================= */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* 1. TOP METRICS ROW */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Metric 1: Active Proposals */}
            <div 
              onClick={() => setActiveTab('applications')}
              className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-blue-500/40 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  ACTIVE PROPOSALS
                </span>
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              </div>
              <div className="text-3xl font-black text-navy-900 font-display">
                {proposals.length}
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Submitted problem statements</p>
            </div>

            {/* Metric 2: Pilots in Progress */}
            <div 
              onClick={() => setActiveTab('execution')}
              className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-emerald-500/40 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  PILOTS IN PROGRESS
                </span>
                <span className="p-1 rounded-lg bg-emerald-50 text-emerald-600">
                  <Activity className="w-3.5 h-3.5" />
                </span>
              </div>
              <div className="text-3xl font-black text-emerald-800 font-display">
                {activePilotsCount}
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Live active testbeds</p>
            </div>

            {/* Metric 3: Gov Revenue */}
            <div 
              onClick={() => setActiveTab('contracts')}
              className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-purple-500/40 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  CONTRACTS SIGNED
                </span>
                <span className="p-1 rounded-lg bg-purple-50 text-purple-600">
                  <DollarSign className="w-3.5 h-3.5" />
                </span>
              </div>
              <div className="text-3xl font-black text-navy-900 font-display">
                {contracts.length}
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Treasury PFMS direct tranches</p>
            </div>

          </div>

          {/* 2. ENGAGEMENTS CARD GRID */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-4">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-black text-navy-900 font-display">
                  Active Engagements
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-bold">
                  {filteredEngagements.length} Total
                </span>
              </div>

              {/* Search Bar */}
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search challenges, pilots..."
                    className="pl-8 pr-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-navy-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1D64EC]/20 focus:border-[#1D64EC]"
                  />
                </div>
              </div>
            </div>

            {filteredEngagements.length === 0 ? (
              <div className="py-12 px-4 text-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 space-y-2.5">
                <Inbox className="w-8 h-8 text-slate-400 mx-auto" />
                <h4 className="font-bold text-xs text-navy-900">No Active Proposals or Pilots</h4>
                <p className="text-[11px] text-slate-500 max-w-xs mx-auto">
                  Browse open government challenges and submit your innovation proposal to initiate pilot evaluation.
                </p>
                <button
                  type="button"
                  onClick={() => setActiveTab('challenges')}
                  className="px-4 py-1.5 rounded-full bg-[#1D64EC] hover:bg-blue-700 text-white font-bold text-xs shadow-2xs inline-flex items-center gap-1 mt-1"
                >
                  <Rocket className="w-3.5 h-3.5" />
                  <span>Browse Open Challenges</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3.5">
                {filteredEngagements.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:border-[#1D64EC]/40 hover:bg-white transition-all shadow-2xs flex flex-col justify-between space-y-3 group"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-slate-500 font-mono">
                          {item.timeBadge}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100/80 text-[#1D64EC]">
                          {item.status}
                        </span>
                      </div>

                      <div>
                        <h4 className="text-xs font-bold text-navy-900 leading-snug group-hover:text-[#1D64EC] transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                          {item.department}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveTab(item.tabTarget)}
                      className="w-full py-1.5 rounded-xl bg-slate-100 hover:bg-[#1D64EC] hover:text-white text-slate-700 font-bold text-[11px] transition-all flex items-center justify-center gap-1 shadow-2xs"
                    >
                      <span>{item.actionLabel}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100">
              <span>{filteredEngagements.length} active engagements</span>
              <button
                type="button"
                onClick={() => setActiveTab('applications')}
                className="font-bold text-[#1D64EC] hover:underline flex items-center gap-1"
              >
                <span>View Full Pipeline</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

          {/* 3. FINANCIALS & RECENT INVOICES STRIP */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-base font-bold text-navy-900 font-display">
                Recent Invoices & Disbursals
              </h3>
              <button
                type="button"
                onClick={() => setActiveTab('contracts')}
                className="text-xs font-bold text-[#1D64EC] hover:underline flex items-center gap-1"
              >
                <span>View Contracts</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {invoices.length === 0 ? (
              <div className="py-6 text-center text-xs text-slate-400">
                No milestone invoices or escrow disbursals recorded yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                {invoices.map((inv) => (
                  <div key={inv.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-[#1D64EC]">{inv.id}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        {inv.status}
                      </span>
                    </div>
                    <p className="font-bold text-navy-900 truncate">{inv.project}</p>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                      <strong className="text-navy-900 text-xs">{inv.amount}</strong>
                      <span>{inv.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Edit Profile Modal */}
      {isEditProfileOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 border border-slate-200 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-navy-900 font-display">
                Edit Founder Profile
              </h3>
              <button
                onClick={() => setIsEditProfileOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs"
              >
                ×
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-navy-900 mb-1">Founder Name</label>
                <input
                  type="text"
                  defaultValue={founder.name}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-navy-900"
                />
              </div>

              <div>
                <label className="block font-bold text-navy-900 mb-1">Contact Email</label>
                <input
                  type="email"
                  defaultValue={founder.email}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-navy-900"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsEditProfileOpen(false)}
                className="px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsEditProfileOpen(false);
                  addNotification({
                    title: 'Profile Updated',
                    message: 'Founder profile changes saved in session.',
                    portal: 'startup',
                    type: 'success'
                  });
                }}
                className="px-5 py-2 rounded-full bg-[#1D64EC] hover:bg-blue-700 text-white font-bold text-xs"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
