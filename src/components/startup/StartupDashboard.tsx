import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { 
  Rocket, Ticket, Upload, FileSignature, 
  ArrowUpRight, ChevronRight, FileText, CheckCircle2, Clock, Sparkles, 
  Building2, User, Globe, Mail, Phone, ExternalLink, Download, 
  ShieldCheck, AlertTriangle, Scale, DollarSign, Award, ArrowRight, 
  Check, Eye, Shield, Layers, FileCheck 
} from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';

export const StartupDashboard: React.FC = () => {
  const { currentStartup, setActiveTab, addNotification } = usePlatform();

  const [isFullProfileModalOpen, setIsFullProfileModalOpen] = useState(false);
  const [selectedInvoiceModal, setSelectedInvoiceModal] = useState<any | null>(null);

  // Founder and Startup Profile Details
  const founderProfile = {
    name: 'Ms. Anjali Patil',
    designation: 'Founder & CEO',
    companyName: 'AquaSense Technologies Pvt. Ltd.',
    dpiitNumber: 'DIPP12345',
    userId: 'STARTUP-MH-2024-0187',
    headquarters: 'Pune, Maharashtra',
    yearOfIncorporation: '2021',
    sector: 'Water Tech, AI/ML, IoT',
    teamSize: '12 Employees',
    website: 'https://aquasense.tech',
    websiteLabel: 'aquasense.tech',
    description: 'AI-based water leakage detection and pressure optimization for municipal networks.',
    dpiitStatus: 'Recognized Startup',
    mhPresence: 'Registered & Operating',
    email: 'anjali@aquasense.tech',
    phone: '+91-98220 54321',
    cin: 'U72900PN2021PTC198421',
    gstin: '27AABCA1234F1Z5'
  };

  // Section 3A: Active Proposals
  const activeProposals = [
    {
      id: 'PROP-001',
      challenge: 'PS2: Smart Water Loss Reduction in Urban Networks',
      department: 'Urban Dev. & Water Resources',
      submittedOn: '15 Jul 2026',
      status: 'Shortlisted',
      stage: 'Expert Evaluation',
      badgeVariant: 'violet' as const
    },
    {
      id: 'PROP-002',
      challenge: 'PS5: AI-based Stormwater Flood Prediction',
      department: 'Urban Dev. & Water Resources',
      submittedOn: '02 Aug 2026',
      status: 'Under Review',
      stage: 'AI Evaluation',
      badgeVariant: 'blue' as const
    },
    {
      id: 'PROP-003',
      challenge: 'Smart Street Lighting & Dynamic Dimming',
      department: 'Municipal Administration',
      submittedOn: '10 Jun 2026',
      status: 'Shortlisted',
      stage: 'Pilot Approval',
      badgeVariant: 'emerald' as const
    },
    {
      id: 'PROP-004',
      challenge: 'CropCare AI – Drone Multispectral Monitoring',
      department: 'Agriculture Department',
      submittedOn: '20 May 2026',
      status: 'Not Shortlisted',
      stage: 'Closed',
      badgeVariant: 'slate' as const
    }
  ];

  // Section 3B: Pilots in Progress
  const activePilots = [
    {
      id: 'PILOT-001',
      name: 'Pune Zone A – Water Leakage Detection',
      department: 'Urban Dev. / Pune Municipal Corp.',
      milestone: 'M2 (3-Month Review)',
      status: 'On Track',
      dueDate: '05 Sep 2026',
      kpi: '18.4% NRW reduction (verified)'
    },
    {
      id: 'PILOT-002',
      name: 'Nashik Feeder – Smart Pressure Management',
      department: 'Urban Dev. / Nashik Division',
      milestone: 'M1 (Sensor Assembly & Rigging)',
      status: 'On Track',
      dueDate: '12 Sep 2026',
      kpi: '12.0% pressure surge damping'
    }
  ];

  // Section 3C: Solutions Scaled
  const scaledSolutions = [
    {
      id: 'SCALE-001',
      name: 'Pune Zone A – Water Leakage Detection & Telemetry',
      department: 'Department of Urban Development & Water Resources',
      status: 'Scaled',
      gemStatus: 'GeM Ready',
      impact: '18.4% NRW reduction across 120 km municipal pipeline (420 ML water saved)'
    }
  ];

  // Section 4B: Invoices & Payments
  const recentInvoices = [
    {
      invoiceNo: 'INV-2026-042',
      pilot: 'CropCare AI – Drone Monitoring',
      amount: 'INR 8.5 Lakhs',
      issueDate: '10 Aug 2026',
      dueDate: '25 Aug 2026',
      status: 'Paid',
      statusVariant: 'emerald' as const
    },
    {
      invoiceNo: 'INV-2026-037',
      pilot: 'Pune Zone A – Water Leakage (M2)',
      amount: 'INR 14.0 Lakhs',
      issueDate: '01 Aug 2026',
      dueDate: '16 Aug 2026',
      status: 'Paid',
      statusVariant: 'emerald' as const
    },
    {
      invoiceNo: 'INV-2026-045',
      pilot: 'Nashik – Smart Pressure Mgmt.',
      amount: 'INR 6.0 Lakhs',
      issueDate: '20 Aug 2026',
      dueDate: '05 Sep 2026',
      status: 'Pending',
      statusVariant: 'amber' as const
    }
  ];

  // Section 5: Recent Updates & Notices
  const recentUpdates = [
    { text: 'Your proposal for “Smart Street Lighting” is shortlisted.', time: 'Today', type: 'violet' as const, category: 'Proposal Update' },
    { text: 'Milestone M2 for “Water Leakage Pilot” is due in 5 days.', time: '2 hours ago', type: 'warning' as const, category: 'Milestone SLA' },
    { text: 'Invoice #INV-2026-042 for “CropCare AI” has been paid.', time: 'Yesterday', type: 'success' as const, category: 'Treasury Disbursal' },
    { text: 'New challenge published: “AI-based Stormwater Flood Prediction”', time: '3 days ago', type: 'info' as const, category: 'Innovation Call' },
    { text: 'Compliance filing reminder: Annual DPIIT update due in 15 days.', time: 'Last week', type: 'warning' as const, category: 'Statutory Notice' }
  ];

  const handleDownloadStartupSummary = () => {
    addNotification({
      title: 'Startup Summary Dossier Generated',
      message: 'Downloading official executive capability dossier for AquaSense Technologies (PDF).',
      portal: 'startup',
      type: 'success'
    });
  };

  return (
    <div className="space-y-6">
      
      {/* ========================================================================= */}
      {/* SECTION 1: FOUNDER & STARTUP PROFILE BAND */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
        
        {/* Top Profile Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          
          {/* Left: Founder / CEO Profile */}
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-xl font-bold font-display shadow-md shrink-0">
              AP
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-xl sm:text-2xl font-extrabold text-navy-900 font-display">
                  {founderProfile.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {founderProfile.dpiitStatus}
                </span>
              </div>
              
              <p className="text-xs font-semibold text-emerald-700">
                {founderProfile.designation} • {founderProfile.companyName}
              </p>
              
              <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 mt-1 font-medium">
                <span className="flex items-center gap-1">
                  <Building2 className="w-3 h-3 text-slate-400" />
                  HQ: {founderProfile.headquarters}
                </span>
                <span>•</span>
                <span className="font-mono text-slate-400">DPIIT: {founderProfile.dpiitNumber}</span>
                <span>•</span>
                <span className="font-mono text-slate-400">UID: {founderProfile.userId}</span>
              </div>
            </div>
          </div>

          {/* Right: Contact & Action */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto shrink-0">
            <div className="text-left sm:text-right text-xs space-y-0.5">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">State Registration</span>
              <p className="font-bold text-navy-900 text-[11px]">{founderProfile.mhPresence}</p>
              <div className="flex items-center sm:justify-end gap-2 text-slate-500 text-[11px] pt-1">
                <Mail className="w-3 h-3 text-slate-400" />
                <span>{founderProfile.email}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsFullProfileModalOpen(true)}
              className="px-4 py-2 rounded-full bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-700 font-bold text-xs transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <User className="w-3.5 h-3.5" />
              <span>View Full Profile</span>
            </button>
          </div>

        </div>

        {/* Middle: Startup Profile Summary Strip */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 text-xs">
          <div className="md:col-span-4 p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 space-y-1">
            <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">Domain & Core Focus</span>
            <p className="font-bold text-navy-900 leading-snug">{founderProfile.sector}</p>
            <a 
              href={founderProfile.website} 
              target="_blank" 
              rel="noreferrer" 
              className="text-[11px] text-[#1D64EC] font-semibold hover:underline inline-flex items-center gap-1 pt-1"
            >
              <Globe className="w-3 h-3" />
              <span>{founderProfile.websiteLabel}</span>
            </a>
          </div>

          <div className="md:col-span-8 p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Solution Capability Summary</span>
            <p className="text-slate-700 font-medium leading-relaxed">
              {founderProfile.description}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-500 pt-1 font-medium">
              <span>Incorporation: <strong>{founderProfile.yearOfIncorporation}</strong></span>
              <span>•</span>
              <span>Team Size: <strong>{founderProfile.teamSize}</strong></span>
              <span>•</span>
              <span>CIN: <strong className="font-mono text-slate-600">{founderProfile.cin}</strong></span>
            </div>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* SECTION 2: KEY METRICS (7 KPI Cards) */}
      {/* ========================================================================= */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-navy-900 font-display">
            Startup Overview – AquaSense Technologies
          </h2>
          <span className="text-xs font-bold text-slate-400 font-mono">Real-time Sandbox Telemetry</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-3">
          
          {/* Card 1: Active Proposals */}
          <div 
            onClick={() => setActiveTab('applications')}
            className="bg-white rounded-3xl p-4.5 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-emerald-500/40 transition-all cursor-pointer group"
          >
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Active Proposals</span>
            <div className="text-2xl font-extrabold text-navy-900 font-display">4</div>
            <p className="text-[10px] text-[#1D64EC] font-semibold mt-1">2 review, 1 shortlisted</p>
            <div className="pt-2.5 mt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold text-slate-400 group-hover:text-[#1D64EC]">
              <span>View Proposals</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>

          {/* Card 2: Pilots in Progress */}
          <div 
            onClick={() => setActiveTab('execution')}
            className="bg-white rounded-3xl p-4.5 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-emerald-500/40 transition-all cursor-pointer group"
          >
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Pilots in Progress</span>
            <div className="text-2xl font-extrabold text-emerald-800 font-display">2</div>
            <p className="text-[10px] text-amber-700 font-semibold mt-1">1 due for M2 review</p>
            <div className="pt-2.5 mt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold text-slate-400 group-hover:text-emerald-700">
              <span>Monitor Pilots</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>

          {/* Card 3: Solutions Scaled */}
          <div 
            onClick={() => setActiveTab('gem')}
            className="bg-white rounded-3xl p-4.5 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-emerald-500/40 transition-all cursor-pointer group"
          >
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Solutions Scaled</span>
            <div className="text-2xl font-extrabold text-navy-900 font-display">1</div>
            <p className="text-[10px] text-purple-700 font-semibold mt-1">Pune Zone A Leakage</p>
            <div className="pt-2.5 mt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold text-slate-400 group-hover:text-purple-700">
              <span>View Scaled</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>

          {/* Card 4: Revenue from Gov Pilots */}
          <div 
            onClick={() => setActiveTab('contracts')}
            className="bg-white rounded-3xl p-4.5 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-emerald-500/40 transition-all cursor-pointer group"
          >
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Revenue (YTD)</span>
            <div className="text-xl font-extrabold text-navy-900 font-display">₹68 Lakhs</div>
            <p className="text-[10px] text-emerald-700 font-semibold mt-1">Invoices paid: 85%</p>
            <div className="pt-2.5 mt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold text-slate-400 group-hover:text-emerald-700">
              <span>View Invoices</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>

          {/* Card 5: Escrow Released */}
          <div 
            onClick={() => setActiveTab('contracts')}
            className="bg-white rounded-3xl p-4.5 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-emerald-500/40 transition-all cursor-pointer group"
          >
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Escrow Released</span>
            <div className="text-xl font-extrabold text-navy-900 font-display">₹58 Lakhs</div>
            <p className="text-[10px] text-slate-600 font-semibold mt-1">Across 2 pilots</p>
            <div className="pt-2.5 mt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold text-slate-400 group-hover:text-navy-900">
              <span>View Escrow</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>

          {/* Card 6: GeM Fast-Track Status */}
          <div 
            onClick={() => setActiveTab('gem')}
            className="bg-white rounded-3xl p-4.5 border border-purple-200 shadow-xs hover:shadow-md transition-all cursor-pointer group bg-purple-50/20"
          >
            <span className="text-[10px] font-bold text-purple-700 uppercase tracking-wider block mb-1">GeM Status</span>
            <div className="text-lg font-extrabold text-purple-900 font-display">GeM Ready</div>
            <p className="text-[10px] text-purple-700 font-semibold mt-1">Fast-Track Catalog</p>
            <div className="pt-2.5 mt-2.5 border-t border-purple-200 flex items-center justify-between text-[10px] font-bold text-purple-700 group-hover:underline">
              <span>View Scale</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>

          {/* Card 7: Compliance Score */}
          <div 
            onClick={() => {
              const el = document.getElementById('compliance-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-white rounded-3xl p-4.5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer group"
          >
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Compliance</span>
            <div className="text-2xl font-extrabold text-emerald-800 font-display">92/100</div>
            <p className="text-[10px] text-emerald-700 font-semibold mt-1">DPIIT & CERT-In</p>
            <div className="pt-2.5 mt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold text-slate-400 group-hover:text-emerald-700">
              <span>View Score</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 3: ACTIVE PIPELINE (Proposals, Pilots, Scale) */}
      {/* ========================================================================= */}
      <div className="space-y-6">
        
        {/* Subsection A: Active Proposals */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-navy-900 font-display">
                Active Proposals
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Track all submitted innovation bids and their lifecycle review stages.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setActiveTab('challenges')}
              className="px-4 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs border border-emerald-200 transition-colors flex items-center gap-1.5"
            >
              <Rocket className="w-3.5 h-3.5" />
              <span>Explore New Calls</span>
            </button>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 text-navy-900 border-b border-slate-200">
                  <th className="py-3 px-4 font-bold">Challenge / Problem Statement</th>
                  <th className="py-3 px-4 font-bold">Department</th>
                  <th className="py-3 px-4 font-bold">Submitted On</th>
                  <th className="py-3 px-4 font-bold">Status</th>
                  <th className="py-3 px-4 font-bold">Current Stage</th>
                  <th className="py-3 px-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {activeProposals.map((prop) => (
                  <tr key={prop.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-navy-900 max-w-xs">
                      {prop.challenge}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 font-medium whitespace-nowrap">
                      {prop.department}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                      {prop.submittedOn}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <StatusBadge label={prop.status} variant={prop.badgeVariant} size="sm" />
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-navy-900 whitespace-nowrap">
                      {prop.stage}
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => setActiveTab('applications')}
                          className="px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] transition-colors"
                        >
                          View
                        </button>
                        {prop.status === 'Shortlisted' && (
                          <button
                            type="button"
                            onClick={() => setActiveTab('passport')}
                            className="px-3 py-1 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-[11px] border border-emerald-200 transition-colors"
                          >
                            Upload Evidence
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pt-1 flex justify-end">
            <button
              type="button"
              onClick={() => setActiveTab('applications')}
              className="text-xs font-bold text-[#1D64EC] hover:underline flex items-center gap-1"
            >
              <span>View All Proposals</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 2-Column: Pilots in Progress & Scaled Solutions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Subsection B: Pilots in Progress (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-base font-bold text-navy-900 font-display">
                    Pilots in Progress
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Monitor live telemetry milestones, test telemetry, and deliverables.
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200">
                  2 Active Pilots
                </span>
              </div>

              <div className="space-y-3 pt-2">
                {activePilots.map((p) => (
                  <div key={p.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-navy-900 text-sm">{p.name}</h4>
                      <StatusBadge label={p.status} variant="emerald" size="sm" />
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500">
                      <span>Dept: <strong>{p.department}</strong></span>
                      <span>•</span>
                      <span>Milestone: <strong className="text-navy-900">{p.milestone}</strong></span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                      <span className="text-emerald-700 font-bold">Key KPI: {p.kpi}</span>
                      <span className="text-amber-800 font-semibold">Due: {p.dueDate}</span>
                    </div>

                    <div className="pt-2 flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setActiveTab('execution')}
                        className="px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] transition-colors"
                      >
                        View Pilot Details
                      </button>

                      <button
                        type="button"
                        onClick={() => setActiveTab('execution')}
                        className="px-4 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] shadow-2xs transition-colors flex items-center gap-1"
                      >
                        <Upload className="w-3 h-3" />
                        <span>Submit Milestone</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Active Pilot Highlight Box */}
              <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-xs mt-3 flex items-start justify-between gap-2 text-emerald-900">
                <div>
                  <strong className="block font-bold">Active Pilot Status:</strong>
                  <p className="leading-relaxed mt-0.5">Pune Zone A (Water Leakage) running with <strong className="text-emerald-800">18.4% verified NRW reduction</strong>.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('execution')}
                  className="text-[11px] font-bold text-emerald-800 hover:underline shrink-0 whitespace-nowrap mt-1"
                >
                  View Pilot Report →
                </button>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setActiveTab('execution')}
                className="text-xs font-bold text-[#1D64EC] hover:underline flex items-center gap-1"
              >
                <span>Monitor All Pilots</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Subsection C: Solutions Scaled & Fast-Track Scale (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-base font-bold text-navy-900 font-display">
                    Solutions Scaled
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Fast-track scale and GeM direct procurement catalog.
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-800 text-[11px] font-bold border border-purple-200">
                  1 Scaled
                </span>
              </div>

              <div className="space-y-3 pt-2">
                {scaledSolutions.map((sol) => (
                  <div key={sol.id} className="p-4 rounded-2xl bg-purple-50/40 border border-purple-200/70 space-y-2.5 text-xs">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-bold text-navy-900 text-sm leading-snug">{sol.name}</h4>
                        <p className="text-[11px] text-slate-500 mt-0.5">{sol.department}</p>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 font-bold text-[10px] border border-purple-200 shrink-0">
                        {sol.gemStatus}
                      </span>
                    </div>

                    <p className="text-slate-700 leading-relaxed font-medium bg-white p-2.5 rounded-xl border border-purple-100">
                      <strong>Impact: </strong>{sol.impact}
                    </p>

                    <div className="pt-1 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setActiveTab('gem')}
                        className="px-3 py-1.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-[11px] transition-colors"
                      >
                        View Scale Report
                      </button>

                      <button
                        type="button"
                        onClick={() => setActiveTab('gem')}
                        className="px-3.5 py-1.5 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-bold text-[11px] shadow-2xs transition-colors flex items-center gap-1"
                      >
                        <ShieldCheck className="w-3 h-3" />
                        <span>View GeM Listing</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setActiveTab('gem')}
                className="text-xs font-bold text-purple-700 hover:underline flex items-center gap-1"
              >
                <span>View All Scaled Solutions</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* SECTION 4: FINANCIALS & PAYMENTS */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-navy-900 font-display">
              Financials & Payments
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Track invoices, PFMS treasury disbursements, and milestone escrow releases from government pilots.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setActiveTab('contracts')}
            className="px-4 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors flex items-center gap-1"
          >
            <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
            <span>Invoicing Center</span>
          </button>
        </div>

        {/* 4 Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Invoiced (YTD)</span>
            <strong className="text-xl font-extrabold text-navy-900 font-display block mt-0.5">INR 80.0 Lakhs</strong>
            <span className="text-[10px] text-slate-500 font-medium">3 Invoices Submitted</span>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100">
            <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">Total Paid (YTD)</span>
            <strong className="text-xl font-extrabold text-emerald-900 font-display block mt-0.5">INR 68.0 Lakhs</strong>
            <span className="text-[10px] text-emerald-700 font-medium">Direct Bank Transfer</span>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-100">
            <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">Pending Payments</span>
            <strong className="text-xl font-extrabold text-amber-900 font-display block mt-0.5">INR 12.0 Lakhs</strong>
            <span className="text-[10px] text-amber-700 font-medium">Under Treasury Verification</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Escrow Released</span>
            <strong className="text-xl font-extrabold text-navy-900 font-display block mt-0.5">INR 58.0 Lakhs</strong>
            <span className="text-[10px] text-slate-500 font-medium">Across 2 active pilots</span>
          </div>
        </div>

        {/* Recent Invoices Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-navy-900 border-b border-slate-200">
                <th className="py-3 px-4 font-bold">Invoice No.</th>
                <th className="py-3 px-4 font-bold">Pilot / Contract</th>
                <th className="py-3 px-4 font-bold">Amount</th>
                <th className="py-3 px-4 font-bold">Issue Date</th>
                <th className="py-3 px-4 font-bold">Due Date</th>
                <th className="py-3 px-4 font-bold">Status</th>
                <th className="py-3 px-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {recentInvoices.map((inv) => (
                <tr key={inv.invoiceNo} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-[#1D64EC]">
                    {inv.invoiceNo}
                  </td>
                  <td className="py-3.5 px-4 font-medium text-navy-900">
                    {inv.pilot}
                  </td>
                  <td className="py-3.5 px-4 font-extrabold text-navy-900">
                    {inv.amount}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">
                    {inv.issueDate}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">
                    {inv.dueDate}
                  </td>
                  <td className="py-3.5 px-4">
                    <StatusBadge label={inv.status} variant={inv.statusVariant} size="sm" />
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => setSelectedInvoiceModal(inv)}
                        className="px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] transition-colors"
                      >
                        View
                      </button>
                      <button
                        type="button"
                        onClick={() => addNotification({ title: 'Invoice Downloaded', message: `Downloaded copy of ${inv.invoiceNo} (PDF)`, portal: 'startup', type: 'info' })}
                        className="px-2.5 py-1 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 text-[11px]"
                      >
                        <Download className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pt-1 flex justify-end">
          <button
            type="button"
            onClick={() => setActiveTab('contracts')}
            className="text-xs font-bold text-[#1D64EC] hover:underline flex items-center gap-1"
          >
            <span>View All Invoices & Payments</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 5 & 6: RECENT UPDATES & QUICK ACTIONS */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Recent Updates & Notices (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-navy-900 font-display">
                Recent Updates & Notices
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Official notices, milestone deadlines, and payment confirmations.
              </p>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          <div className="space-y-3">
            {recentUpdates.map((act, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-100 flex items-center justify-between gap-3 hover:bg-emerald-50/40 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                    act.type === 'success' ? 'bg-emerald-50 text-emerald-600' :
                    act.type === 'warning' ? 'bg-amber-50 text-amber-600' :
                    act.type === 'violet' ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-[#1D64EC]'
                  }`}>
                    {act.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> :
                     act.type === 'warning' ? <Clock className="w-4 h-4" /> :
                     act.type === 'violet' ? <Sparkles className="w-4 h-4" /> : <FileText className="w-4 h-4 text-[#1D64EC]" />}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-navy-900 leading-snug">{act.text}</p>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5 font-medium">
                      <span>{act.time}</span>
                      <span>•</span>
                      <span className="text-slate-600 font-semibold">{act.category}</span>
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />
              </div>
            ))}
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => setActiveTab('applications')}
              className="text-xs font-bold text-[#1D64EC] hover:underline flex items-center gap-1"
            >
              <span>View All Updates & Notices</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right: Quick Actions & Deadlines (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-navy-900 font-display">
                Quick Actions
              </h3>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Founder Tools</span>
            </div>

            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={() => setActiveTab('challenges')}
                className="w-full p-2.5 px-3.5 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200/80 text-navy-900 font-bold text-xs flex items-center justify-between transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <Rocket className="w-4 h-4 text-emerald-600" />
                  <span>Explore Challenges</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600" />
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('passport')}
                className="w-full p-2.5 px-3.5 rounded-xl bg-slate-50 hover:bg-purple-50 border border-slate-200/80 text-navy-900 font-bold text-xs flex items-center justify-between transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <Ticket className="w-4 h-4 text-purple-600" />
                  <span>Update Evidence Passport</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-purple-600" />
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('execution')}
                className="w-full p-2.5 px-3.5 rounded-xl bg-slate-50 hover:bg-amber-50 border border-slate-200/80 text-navy-900 font-bold text-xs flex items-center justify-between transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <Upload className="w-4 h-4 text-amber-600" />
                  <span>Submit Milestone (M2 Due)</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-600" />
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('contracts')}
                className="w-full p-2.5 px-3.5 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200/80 text-navy-900 font-bold text-xs flex items-center justify-between transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <FileSignature className="w-4 h-4 text-[#1D64EC]" />
                  <span>View Contracts & Invoices</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#1D64EC]" />
              </button>

              <button
                type="button"
                onClick={() => setIsFullProfileModalOpen(true)}
                className="w-full p-2.5 px-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-navy-900 font-bold text-xs flex items-center justify-between transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <Building2 className="w-4 h-4 text-slate-600" />
                  <span>Manage Company Profile</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600" />
              </button>
            </div>

            {/* Upcoming Deadlines Mini List */}
            <div className="pt-3 border-t border-slate-100 space-y-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Upcoming Deadlines</span>
              <div className="space-y-1 text-[11px]">
                <div className="p-2 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 font-semibold flex items-center justify-between">
                  <span>M2 – Water Leakage Pilot</span>
                  <span className="font-bold">05 Sep 2026</span>
                </div>
                <div className="p-2 rounded-xl bg-blue-50 text-blue-900 border border-blue-200 font-semibold flex items-center justify-between">
                  <span>DPIIT Annual Update</span>
                  <span className="font-bold">10 Sep 2026</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={handleDownloadStartupSummary}
              className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Startup Summary (PDF)</span>
            </button>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* SECTION 7: COMPLIANCE & READINESS */}
      {/* ========================================================================= */}
      <div id="compliance-section" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-navy-900 font-display">
              Compliance & Statutory Readiness
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              State procurement clearances, cybersecurity audits, and DPIIT verification status.
            </p>
          </div>
          <span className="px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Pilot Compliance Score: 92/100</span>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-navy-900">DPIIT Recognition</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-slate-600">Certificate No: <strong className="font-mono text-navy-900">DIPP12345</strong></p>
            <span className="text-[10px] text-emerald-700 font-semibold block">Recognized Startup (Active)</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-navy-900">Annual DPIIT Filing</span>
              <AlertTriangle className="w-4 h-4 text-amber-600" />
            </div>
            <p className="text-slate-600">Filed up to: <strong className="text-navy-900">FY 2024–25</strong></p>
            <span className="text-[10px] text-amber-700 font-semibold block">FY 2025–26 update due in 15 days</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-navy-900">Tax & GST Filing</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-slate-600">GSTIN: <strong className="font-mono text-navy-900">27AABCA1234F1Z5</strong></p>
            <span className="text-[10px] text-emerald-700 font-semibold block">GST Returns Cleared (Monthly)</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-navy-900">CERT-In & Security</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-slate-600">Audit Level 3: <strong className="text-navy-900">Done (12 Mar 2026)</strong></p>
            <span className="text-[10px] text-purple-700 font-semibold block">ISO 27001 Certification in progress</span>
          </div>

        </div>

        <div className="pt-1 flex justify-end">
          <button
            type="button"
            onClick={() => setActiveTab('passport')}
            className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
          >
            <span>View Full Verified Evidence Passport & Compliance Dossier</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODAL 1: FULL FOUNDER & COMPANY PROFILE MODAL */}
      {/* ========================================================================= */}
      {isFullProfileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 border border-slate-200 shadow-2xl">
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-lg font-bold font-display shadow-sm">
                  AP
                </div>
                <div>
                  <h3 className="text-base font-bold text-navy-900 font-display">
                    {founderProfile.name}
                  </h3>
                  <p className="text-xs text-slate-500">{founderProfile.designation} • {founderProfile.companyName}</p>
                </div>
              </div>

              <button
                onClick={() => setIsFullProfileModalOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs"
              >
                ×
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Corporate Entity Details</span>
                <p className="font-bold text-navy-900">{founderProfile.companyName}</p>
                <p className="text-slate-600">CIN: {founderProfile.cin} • Registered in {founderProfile.yearOfIncorporation}</p>
                <p className="text-slate-600">Headquarters: {founderProfile.headquarters}</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">DPIIT & Procurement Accreditation</span>
                <p className="font-bold text-emerald-700">DPIIT Startup Certificate: {founderProfile.dpiitNumber}</p>
                <p className="text-slate-600">Eligible for prior turnover and experience relaxations under Maharashtra State Innovation Procurement Rules.</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Authorized Signatory & Contact</span>
                <p className="text-slate-700 font-medium">Official Contact: {founderProfile.email} | {founderProfile.phone}</p>
                <p className="text-emerald-700 font-bold">UIDAI Aadhaar Verified Signatory</p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setIsFullProfileModalOpen(false)}
                className="px-5 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: INVOICE DETAILS MODAL */}
      {/* ========================================================================= */}
      {selectedInvoiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-4 border border-slate-200 shadow-2xl">
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Invoice Details</span>
                <h3 className="text-lg font-bold text-navy-900 font-display mt-0.5">
                  {selectedInvoiceModal.invoiceNo}
                </h3>
              </div>
              <button
                onClick={() => setSelectedInvoiceModal(null)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs"
              >
                ×
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Pilot Deliverable</span>
                <strong className="text-navy-900 block">{selectedInvoiceModal.pilot}</strong>
                <p className="text-slate-500">Billed to Department of Urban Development & Water Resources</p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-100">
                  <span className="text-[10px] text-emerald-800 uppercase block font-bold">Total Amount</span>
                  <strong className="text-base font-extrabold text-emerald-900">{selectedInvoiceModal.amount}</strong>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] text-slate-500 uppercase block font-bold">Status</span>
                  <strong className="text-base font-extrabold text-navy-900">{selectedInvoiceModal.status}</strong>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                <span>Issued: {selectedInvoiceModal.issueDate}</span>
                <span>Due: {selectedInvoiceModal.dueDate}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => addNotification({ title: 'Invoice Downloaded', message: `Downloaded copy of ${selectedInvoiceModal.invoiceNo} (PDF)`, portal: 'startup', type: 'info' })}
                className="px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedInvoiceModal(null)}
                className="px-5 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
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
