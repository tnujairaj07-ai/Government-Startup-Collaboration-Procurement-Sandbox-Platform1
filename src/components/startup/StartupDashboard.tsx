import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { 
  Rocket, Ticket, Upload, FileSignature, 
  ArrowUpRight, ChevronRight, FileText, CheckCircle2, Clock, Sparkles, 
  Building2, User, Globe, Mail, Phone, ExternalLink, Download, 
  ShieldCheck, AlertTriangle, Scale, DollarSign, Award, ArrowRight, 
  Check, Eye, Shield, Layers, FileCheck, Search, ChevronLeft, Calendar, 
  Edit3, Briefcase, MapPin, Hash, Users, Activity, Sparkle
} from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';

export const StartupDashboard: React.FC = () => {
  const { currentStartup, setActiveTab, addNotification } = usePlatform();

  const [activeFilter, setActiveFilter] = useState<'all' | 'proposals' | 'pilots' | 'scaled'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInvoiceModal, setSelectedInvoiceModal] = useState<any | null>(null);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  // Founder Profile Data
  const founder = {
    name: 'Ms. Anjali Patil',
    role: 'Founder & CEO',
    company: 'AquaSense Technologies Pvt. Ltd.',
    status: 'Recognized Startup',
    dpiitNo: 'DIPP12345',
    userId: 'STARTUP-MH-2024-0187',
    gender: 'Female',
    email: 'anjali@aquasense.tech',
    phone: '+91-98220 54321',
    address: 'Viman Nagar, Pune, Maharashtra, India',
    experience: '8+ Years (Water IoT)',
    sector: 'Water Tech, AI/ML & Smart IoT',
    cin: 'U72900PN2021PTC198421',
    gstin: '27AABCA1234F1Z5',
    teamSize: '12 Members',
    incorporationYear: '2021',
    website: 'aquasense.tech',
    complianceScore: '92 / 100'
  };

  // Engagements (Proposals, Pilots, Scaled) for the middle grid
  const engagements = [
    {
      id: 'ENG-1',
      type: 'proposal',
      title: 'PS2: Smart Water Loss Reduction',
      department: 'Urban Development & Water Resources',
      timeBadge: '15 Jul 2026',
      status: 'Shortlisted',
      statusColor: 'emerald',
      stage: 'Expert Evaluation',
      kpiText: 'Target: ≥20% NRW Reduction',
      actionLabel: 'View Proposal',
      tabTarget: 'applications'
    },
    {
      id: 'ENG-2',
      type: 'pilot',
      title: 'Pune Zone A – Water Leakage Pilot',
      department: 'Urban Dev. / Pune Municipal Corp.',
      timeBadge: '05 Sep 2026 (Due)',
      status: 'On Track',
      statusColor: 'emerald',
      stage: 'M2 – 3-Month Review',
      kpiText: '18.4% verified NRW reduction',
      actionLabel: 'Submit M2',
      tabTarget: 'execution'
    },
    {
      id: 'ENG-3',
      type: 'proposal',
      title: 'PS5: Stormwater Flood Prediction AI',
      department: 'Urban Development & Water Resources',
      timeBadge: '02 Aug 2026',
      status: 'Under Review',
      statusColor: 'blue',
      stage: 'AI Shortlisting Evaluation',
      kpiText: 'Sub-15 min flood alert latency',
      actionLabel: 'View Details',
      tabTarget: 'applications'
    },
    {
      id: 'ENG-4',
      type: 'pilot',
      title: 'Nashik Feeder – Smart Pressure Mgmt',
      department: 'Urban Dev. / Nashik Division',
      timeBadge: '12 Sep 2026 (Due)',
      status: 'On Track',
      statusColor: 'emerald',
      stage: 'M1 – Sensor Assembly',
      kpiText: '12% pressure surge damping',
      actionLabel: 'Monitor Pilot',
      tabTarget: 'execution'
    },
    {
      id: 'ENG-5',
      type: 'proposal',
      title: 'Smart Street Lighting Dynamic Dimming',
      department: 'Municipal Administration',
      timeBadge: '10 Jun 2026',
      status: 'Shortlisted',
      statusColor: 'emerald',
      stage: 'Pilot Clearance Approval',
      kpiText: '35% energy conservation',
      actionLabel: 'View Bid',
      tabTarget: 'applications'
    },
    {
      id: 'ENG-6',
      type: 'scaled',
      title: 'Pune Zone A – Scaled Telemetry',
      department: 'Urban Development & Water Resources',
      timeBadge: 'Scaled Solution',
      status: 'GeM Ready',
      statusColor: 'purple',
      stage: 'Fast-Track Procurement',
      kpiText: '120 km municipal pipeline scaled',
      actionLabel: 'GeM Catalog',
      tabTarget: 'gem'
    }
  ];

  // Milestone timeline slots
  const milestoneSlots = [
    { label: 'M1: Sensor Rigging', status: 'completed', time: 'Completed' },
    { label: 'M2: 3-Month Review', status: 'active', time: 'Due 05 Sep' },
    { label: 'M3: Telemetry Audit', status: 'upcoming', time: 'Due 15 Nov' },
    { label: 'GeM PAC Scale', status: 'ready', time: 'Fast-Track' },
    { label: 'DPIIT Annual Filing', status: 'pending', time: 'Due 10 Sep' }
  ];

  // Invoices data
  const invoices = [
    { id: 'INV-2026-042', project: 'CropCare AI – Drone Monitoring', amount: '₹8.5 Lakhs', status: 'Paid', date: '10 Aug 2026' },
    { id: 'INV-2026-037', project: 'Pune Zone A – Water Leakage (M2)', amount: '₹14.0 Lakhs', status: 'Paid', date: '01 Aug 2026' },
    { id: 'INV-2026-045', project: 'Nashik – Smart Pressure Mgmt.', amount: '₹6.0 Lakhs', status: 'Pending', date: '20 Aug 2026' }
  ];

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
            <span>Evidence Passport</span>
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

      {/* Main 2-Column Grid matching reference profile */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* ========================================================================= */}
        {/* LEFT COLUMN: TALL FOUNDER & STARTUP PROFILE CARD (Col 1-4)                 */}
        {/* ========================================================================= */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-6 lg:sticky lg:top-24">
          
          {/* Top Profile Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-xl font-black font-display shadow-md shrink-0 border-2 border-white">
                AP
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
            <a
              href={`tel:${founder.phone}`}
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 transition-colors flex items-center justify-center"
              title="Call Founder"
            >
              <Phone className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${founder.email}`}
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 transition-colors flex items-center justify-center"
              title="Email Founder"
            >
              <Mail className="w-4 h-4" />
            </a>
            <button
              type="button"
              onClick={() => setActiveTab('passport')}
              className="flex-1 py-2 px-3 rounded-xl bg-[#1D64EC] hover:bg-blue-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
            >
              <FileCheck className="w-3.5 h-3.5" />
              <span>Full Dossier</span>
            </button>
          </div>

          {/* Key-Value Information List matching reference layout */}
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
                <User className="w-4 h-4 text-blue-500" />
                User ID
              </span>
              <span className="font-mono text-slate-600 font-semibold text-right">
                {founder.userId}
              </span>
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
                <Phone className="w-4 h-4 text-slate-400" />
                Phone Number
              </span>
              <span className="text-slate-700 font-medium">
                {founder.phone}
              </span>
            </div>

            <div className="flex items-start justify-between pt-3">
              <span className="text-slate-400 font-medium flex items-center gap-2 shrink-0">
                <MapPin className="w-4 h-4 text-red-400" />
                Headquarters
              </span>
              <span className="text-slate-700 font-medium text-right leading-snug">
                {founder.address}
              </span>
            </div>

            <div className="flex items-center justify-between pt-3">
              <span className="text-slate-400 font-medium flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-400" />
                Incorporation
              </span>
              <strong className="text-navy-900 font-bold">
                {founder.incorporationYear} ({founder.teamSize})
              </strong>
            </div>

            <div className="flex items-center justify-between pt-3">
              <span className="text-slate-400 font-medium flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#1D64EC]" />
                Website
              </span>
              <a 
                href={`https://${founder.website}`}
                target="_blank" 
                rel="noreferrer" 
                className="text-[#1D64EC] font-bold hover:underline inline-flex items-center gap-1"
              >
                <span>{founder.website}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
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

          {/* Startup Description Note */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-600 leading-relaxed">
            <strong className="text-navy-900 block mb-0.5">Solution Scope:</strong>
            AI-based water leakage detection, acoustic edge telemetry, and pressure optimization for municipal supply mains.
          </div>

        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: METRICS + ENGAGEMENT CARDS + SCHEDULE (Col 5-12)             */}
        {/* ========================================================================= */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* 1. TOP METRICS ROW: 3 Spacious, Non-Overflowing Cards */}
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
                4
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 mt-2">
                <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-[11px] font-bold border border-emerald-200">
                  1 Shortlisted
                </span>
                <span className="text-[11px] text-slate-500">2 in review</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Across Urban Dev & Municipal Depts</p>
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
                2
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-800 mt-2">
                <span className="px-2 py-0.5 rounded-md bg-amber-50 text-[11px] font-bold border border-amber-200">
                  M2 Due in 5 Days
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Pune Zone A (18.4% NRW) & Nashik</p>
            </div>

            {/* Metric 3: Gov Revenue (YTD) */}
            <div 
              onClick={() => setActiveTab('contracts')}
              className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-purple-500/40 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  REVENUE (YTD)
                </span>
                <span className="p-1 rounded-lg bg-purple-50 text-purple-600">
                  <DollarSign className="w-3.5 h-3.5" />
                </span>
              </div>
              <div className="text-3xl font-black text-navy-900 font-display">
                ₹68 Lakhs
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-purple-800 mt-2">
                <span className="px-2 py-0.5 rounded-md bg-purple-50 text-[11px] font-bold border border-purple-200">
                  85% Paid Out
                </span>
                <span className="text-[11px] text-slate-500">₹58L Escrow</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Treasury PFMS direct transfer</p>
            </div>

          </div>

          {/* 2. ENGAGEMENTS CARD GRID (Matching reference "Today Patient" Card Grid) */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-4">
            
            {/* Header with Search and Filter Pills */}
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

                {/* Filter Checkboxes/Pills */}
                <div className="hidden sm:flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold text-slate-600">
                  <button
                    type="button"
                    onClick={() => setActiveFilter('all')}
                    className={`px-2.5 py-1 rounded-lg transition-all ${activeFilter === 'all' ? 'bg-white text-navy-900 shadow-xs' : 'hover:text-navy-900'}`}
                  >
                    All
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveFilter('proposals')}
                    className={`px-2.5 py-1 rounded-lg transition-all ${activeFilter === 'proposals' ? 'bg-white text-navy-900 shadow-xs' : 'hover:text-navy-900'}`}
                  >
                    Proposals
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveFilter('pilots')}
                    className={`px-2.5 py-1 rounded-lg transition-all ${activeFilter === 'pilots' ? 'bg-white text-navy-900 shadow-xs' : 'hover:text-navy-900'}`}
                  >
                    Pilots
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveFilter('scaled')}
                    className={`px-2.5 py-1 rounded-lg transition-all ${activeFilter === 'scaled' ? 'bg-white text-navy-900 shadow-xs' : 'hover:text-navy-900'}`}
                  >
                    Scaled
                  </button>
                </div>
              </div>
            </div>

            {/* 6 Cards Grid (Matching the 6 appointment cards layout in the reference image) */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3.5">
              {filteredEngagements.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:border-[#1D64EC]/40 hover:bg-white transition-all shadow-2xs flex flex-col justify-between space-y-3 group"
                >
                  <div className="space-y-2">
                    {/* Top status & due time badge */}
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-slate-500 font-mono">
                        {item.timeBadge}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        item.statusColor === 'emerald' ? 'bg-emerald-100/80 text-emerald-800' :
                        item.statusColor === 'blue' ? 'bg-blue-100/80 text-[#1D64EC]' :
                        item.statusColor === 'purple' ? 'bg-purple-100/80 text-purple-800' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {item.status}
                      </span>
                    </div>

                    {/* Title & Department */}
                    <div>
                      <h4 className="text-xs font-bold text-navy-900 leading-snug group-hover:text-[#1D64EC] transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                        {item.department}
                      </p>
                    </div>

                    {/* Stage & KPI Text */}
                    <div className="p-2 rounded-xl bg-white border border-slate-100 space-y-0.5 text-[11px]">
                      <span className="text-slate-400 block text-[10px] font-bold uppercase">Current Stage</span>
                      <strong className="text-navy-900 block font-semibold">{item.stage}</strong>
                      <span className="text-emerald-700 font-medium block">{item.kpiText}</span>
                    </div>
                  </div>

                  {/* Bottom Action Button */}
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

            {/* Bottom pagination / link */}
            <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100">
              <span>Showing {filteredEngagements.length} verified government engagements</span>
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

          {/* 3. MILESTONES & TIMELINE SLOTS (Matching Availability Bar in Reference Image) */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-navy-900 font-display">
                  Milestone & Compliance Schedule
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Tap milestone blocks to inspect deliverable verification status or submit telemetry proofs.
                </p>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200">
                SLA Milestones
              </span>
            </div>

            {/* Milestone Slot Chips matching the time slots in reference */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {milestoneSlots.map((slot, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveTab('execution')}
                  className={`p-3 rounded-2xl text-center cursor-pointer transition-all border ${
                    slot.status === 'active'
                      ? 'bg-[#1D64EC] text-white border-[#1D64EC] shadow-sm font-bold scale-[1.02]'
                      : slot.status === 'ready'
                      ? 'bg-purple-600 text-white border-purple-600 font-bold shadow-sm'
                      : slot.status === 'completed'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100 font-semibold'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 font-semibold'
                  }`}
                >
                  <div className="text-[11px] font-bold leading-tight truncate">
                    {slot.label}
                  </div>
                  <div className={`text-[10px] mt-1 ${
                    slot.status === 'active' || slot.status === 'ready' ? 'text-white/80' : 'text-slate-400'
                  }`}>
                    {slot.time}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. FINANCIALS & RECENT INVOICES STRIP */}
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
                <span>View All Invoices</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              {invoices.map((inv) => (
                <div key={inv.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-[#1D64EC]">{inv.id}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      inv.status === 'Paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
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
          </div>

        </div>

      </div>

      {/* Edit Profile Modal */}
      {isEditProfileOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 border border-slate-200 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-navy-900 font-display">
                Edit Founder & Company Profile
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
                <label className="block font-bold text-navy-900 mb-1">Founder / CEO Name</label>
                <input
                  type="text"
                  defaultValue={founder.name}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-navy-900"
                />
              </div>

              <div>
                <label className="block font-bold text-navy-900 mb-1">Official Contact Email</label>
                <input
                  type="email"
                  defaultValue={founder.email}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-navy-900"
                />
              </div>

              <div>
                <label className="block font-bold text-navy-900 mb-1">Phone Number</label>
                <input
                  type="text"
                  defaultValue={founder.phone}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-navy-900"
                />
              </div>

              <div>
                <label className="block font-bold text-navy-900 mb-1">Company Website</label>
                <input
                  type="text"
                  defaultValue={founder.website}
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
