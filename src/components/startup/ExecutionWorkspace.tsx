import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { 
  Rocket, Upload, CheckCircle2, FileText, ShieldCheck, 
  Check, Clock, AlertCircle, Sparkles, FileSpreadsheet, Paperclip, 
  Activity, Radio, MapPin, Gauge, Download, Eye, ExternalLink, 
  Building2, User, Phone, Mail, FileCheck, CheckCheck, 
  ChevronRight, ArrowRight, AlertTriangle, RefreshCw, Send, 
  Layers, Filter, Search, MessageSquare, Info, Shield, HelpCircle 
} from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';
import { Modal } from '../common/Modal';
import confetti from 'canvas-confetti';

export const ExecutionWorkspace: React.FC = () => {
  const { proposals, submitMilestoneDeliverable, addNotification } = usePlatform();

  const activeProposal = proposals[0];

  // Modal States
  const [isSubmitM2ModalOpen, setIsSubmitM2ModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isRaiseQueryModalOpen, setIsRaiseQueryModalOpen] = useState(false);
  const [selectedAlertModal, setSelectedAlertModal] = useState<any | null>(null);

  // Document Tab State
  const [activeDocTab, setActiveDocTab] = useState<'milestones' | 'telemetry' | 'payments' | 'audit'>('milestones');

  // M2 Deliverables Checklist & Form
  const [m2Checklist, setM2Checklist] = useState({
    telemetryPdf: true,
    leakLogsCsv: true,
    scadaNote: false
  });
  const [m2Comments, setM2Comments] = useState('90-day continuous acoustic telemetry export covering Zone A grid. 38 leaks confirmed and repaired with municipal engineering division.');
  const [m2Submitted, setM2Submitted] = useState(false);

  // Contact modal form
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');

  // Alerts data
  const alerts = [
    {
      id: 'ALT-104',
      type: 'Feeder #14 – Acoustic Transient',
      location: 'Zone A, Feeder 14 (Aundh Sub-grid)',
      desc: 'Sub-surface 4.2 bar drop detected by clamp node #088.',
      detectedOn: '22 Dec 2026',
      status: 'Fixed',
      statusColor: 'emerald' as const,
      details: 'Acoustic waveform cross-correlation localized pinhole rupture at Chainage 4+200. Municipal crew excavated and clamped in 4.5 hours.'
    },
    {
      id: 'ALT-103',
      type: 'Pressure Surge Damping #09',
      location: 'Zone A, Main Supply Ring',
      desc: 'High velocity water hammer transient alert exceeding 6.8 bar.',
      detectedOn: '18 Dec 2026',
      status: 'Fixed',
      statusColor: 'emerald' as const,
      details: 'Automatic surge relief valve telemetry response triggered. AI pressure damping normalized line pressure in 1.8 minutes.'
    },
    {
      id: 'ALT-102',
      type: 'Flow Anomaly – Sector 7',
      location: 'Zone A, Block C Feeder',
      desc: 'Unexpected night-flow increase (2.4 L/s above baseline).',
      detectedOn: '15 Dec 2026',
      status: 'In Progress',
      statusColor: 'amber' as const,
      details: 'Night minimum flow anomaly flagged for secondary acoustic survey by field team.'
    },
    {
      id: 'ALT-101',
      type: 'Sensor Offline – Node #127',
      location: 'Zone A, Feeder 3',
      desc: 'LoRaWAN uplink gap exceeding 24 hours on node battery.',
      detectedOn: '14 Dec 2026',
      status: 'Fixed',
      statusColor: 'emerald' as const,
      details: 'Antenna orientation adjusted and lithium battery pack replaced on 15 Dec.'
    }
  ];

  const handleM2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!m2Checklist.telemetryPdf || !m2Checklist.leakLogsCsv) {
      addNotification({
        title: 'Missing Required Files',
        message: 'Please verify all required deliverables before submitting.',
        portal: 'startup',
        type: 'warning'
      });
      return;
    }

    if (activeProposal) {
      submitMilestoneDeliverable(activeProposal.id, 'M2', 'https://dashboard.aquasense.ai/pune-zone-a/export-90days.pdf', m2Comments);
    }
    setM2Submitted(true);
    setIsSubmitM2ModalOpen(false);
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    addNotification({
      title: 'Milestone M2 Submitted',
      message: 'M2 performance review bundle submitted to Maharashtra Water Supply Department. Escrow Tranche of INR 14.0 Lakhs queued.',
      portal: 'startup',
      type: 'success'
    });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setIsContactModalOpen(false);
    setIsRaiseQueryModalOpen(false);
    addNotification({
      title: 'Message Sent to Nodal Officer',
      message: `Your communication regarding "${contactSubject || 'Pilot Query'}" was delivered to Shri Rajesh Deshmukh.`,
      portal: 'startup',
      type: 'success'
    });
    setContactSubject('');
    setContactMessage('');
  };

  if (!activeProposal) {
    return (
      <div className="space-y-6">
        <div className="glass-panel rounded-3xl p-16 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#1D64EC] flex items-center justify-center mx-auto">
            <Rocket className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-navy-900">No Active Pilot Deployments</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Once a problem statement proposal receives bilateral execution clearance, live milestone evidence uploads, escrow tranches, and sensor telemetry feeds will unlock in this workspace.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* ========================================================================= */}
      {/* TOP HEADER BAND: Pilot Identity & Quick Export Controls                   */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
        
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Active Pilot
              </span>
              <span className="text-xs text-slate-400 font-mono">Proposal Ref: {activeProposal.id}</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-navy-900 font-display tracking-tight leading-tight">
              {activeProposal.challengeTitle}
            </h1>

            <p className="text-xs text-slate-500 font-medium">
              Department: <strong>{activeProposal.department}</strong>
            </p>
          </div>

          {/* Right Top Actions */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => {
                addNotification({
                  title: 'Pilot Summary Generated',
                  message: 'Downloading official 90-day pilot execution summary report (PDF).',
                  portal: 'startup',
                  type: 'info'
                });
              }}
              className="px-4 py-2 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-navy-900 font-bold text-xs shadow-xs flex items-center gap-1.5 transition-all"
            >
              <Download className="w-3.5 h-3.5 text-[#1D64EC]" />
              <span>Export Summary (PDF)</span>
            </button>

            <button
              type="button"
              onClick={() => {
                addNotification({
                  title: 'Telemetry Archive Exported',
                  message: 'Downloading raw 90-day IoT acoustic waveform telemetry logs (CSV).',
                  portal: 'startup',
                  type: 'info'
                });
              }}
              className="px-4 py-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors flex items-center gap-1.5"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
              <span>Telemetry (CSV)</span>
            </button>

            <button
              type="button"
              onClick={() => setIsContactModalOpen(true)}
              className="px-4 py-2 rounded-2xl bg-[#1D64EC] hover:bg-blue-700 text-white font-bold text-xs shadow-xs flex items-center gap-1.5 transition-all"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contact Nodal Officer</span>
            </button>
          </div>

        </div>

        {/* 5 KPI Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 text-xs">
          
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Sensors Active</span>
            <strong className="text-xl font-extrabold text-navy-900 font-display block">320 Nodes</strong>
            <span className="text-[10px] text-emerald-700 font-semibold">318 Online (2 Maint.)</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Network Coverage</span>
            <strong className="text-xl font-extrabold text-navy-900 font-display block">~120 km</strong>
            <span className="text-[10px] text-slate-500 font-medium">Zone A Distribution Grid</span>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
            <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">NRW Loss Reduction</span>
            <strong className="text-xl font-extrabold text-emerald-900 font-display block">18.4%</strong>
            <span className="text-[10px] text-emerald-700 font-bold">Target: ≥ 20.0% (On Track)</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Network Uptime</span>
            <strong className="text-xl font-extrabold text-navy-900 font-display block">99.4%</strong>
            <span className="text-[10px] text-slate-500 font-medium">Last 90 Days Telemetry</span>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 space-y-1 col-span-2 sm:col-span-1">
            <span className="text-[10px] font-bold text-[#1D64EC] uppercase tracking-wider block">Milestone Status</span>
            <strong className="text-sm font-extrabold text-navy-900 block mt-0.5 leading-snug">
              {m2Submitted ? 'M2 Submitted' : 'M2 In Progress'}
            </strong>
            <span className="text-[10px] text-slate-500 block">M1 Done • M3 Pending</span>
          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: MILESTONE DELIVERABLES & ESCROW TRANCHES (3 Cards)            */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-navy-900 font-display">
              Milestone Deliverables & Escrow Tranches
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Submit structured evidence to trigger direct PFMS state treasury milestone disbursements.
            </p>
          </div>
          <span className="text-xs font-bold text-slate-400">Total Grant: INR 35.0 Lakhs</span>
        </div>

        {/* 3 Milestone Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 text-xs">
          
          {/* Card 1: Milestone M1 (Completed) */}
          <div className="p-5 rounded-3xl bg-emerald-50/60 border border-emerald-200 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
                    Milestone 01 • INR 10.5 Lakhs (30%)
                  </span>
                  <h3 className="font-bold text-navy-900 text-sm mt-0.5 leading-tight">
                    M1 – Sensor Rigging & Baseline Calibration
                  </h3>
                </div>
                <StatusBadge label="Completed" variant="emerald" size="sm" />
              </div>

              <p className="text-slate-600 leading-relaxed font-medium">
                Acoustic clamp sensor deployment across 40 km pipeline, baseline pressure calibration, and LoRaWAN gateway sign-off.
              </p>

              {/* Checklist Read-Only Checked */}
              <div className="p-3.5 rounded-2xl bg-white border border-emerald-100 space-y-1.5 text-[11px] font-medium text-slate-700">
                <div className="flex items-center gap-2 text-emerald-900">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Acoustic sensor deployment report (320 nodes)</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-900">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Baseline pressure & NRW calibration data</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-900">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>LoRaWAN gateway SCADA integration sign-off</span>
                </div>
              </div>

              {/* Payment Info */}
              <div className="p-3 rounded-2xl bg-emerald-100/60 border border-emerald-200 space-y-1 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-emerald-900 font-bold">Tranche Released:</span>
                  <strong className="text-emerald-950 font-extrabold">INR 10.5 Lakhs</strong>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Approved Date:</span>
                  <span>30 Oct 2026</span>
                </div>
                <div className="flex justify-between text-slate-600 font-mono text-[10px]">
                  <span>PFMS Ref:</span>
                  <span>PFMS-MH-2026-10452</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2">
              <button
                type="button"
                onClick={() => addNotification({ title: 'Opened M1 Report', message: 'Viewing verified M1 deployment report (PDF)', portal: 'startup', type: 'info' })}
                className="flex-1 py-1.5 rounded-xl bg-white hover:bg-emerald-100 border border-emerald-200 text-emerald-900 font-bold text-[11px] transition-colors"
              >
                View M1 Report
              </button>
              <button
                type="button"
                onClick={() => addNotification({ title: 'Opened Payment Voucher', message: 'Viewing PFMS payment receipt (PDF)', portal: 'startup', type: 'info' })}
                className="flex-1 py-1.5 rounded-xl bg-white hover:bg-emerald-100 border border-emerald-200 text-slate-700 font-bold text-[11px] transition-colors"
              >
                View Receipt
              </button>
            </div>
          </div>

          {/* Card 2: Milestone M2 (In Progress / Active Submission) */}
          <div className="p-5 rounded-3xl bg-white border-2 border-amber-400 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block">
                    Milestone 02 • INR 14.0 Lakhs (40%)
                  </span>
                  <h3 className="font-bold text-navy-900 text-sm mt-0.5 leading-tight">
                    M2 – 3-Month Continuous Performance Review
                  </h3>
                </div>
                <StatusBadge label={m2Submitted ? 'Under Review' : 'Due in 5 Days'} variant={m2Submitted ? 'blue' : 'amber'} size="sm" />
              </div>

              <p className="text-slate-600 leading-relaxed font-medium">
                90-day continuous telemetry export, leak logs validation (38 leaks resolved), and SCADA pressure transient verification.
              </p>

              {/* Interactive Checklist */}
              <div className="p-3.5 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-2 text-[11px]">
                <span className="text-[10px] font-bold uppercase text-amber-900 block">Required Deliverables Checklist:</span>
                <label className="flex items-start gap-2 cursor-pointer text-slate-800 font-medium">
                  <input
                    type="checkbox"
                    checked={m2Checklist.telemetryPdf}
                    onChange={(e) => setM2Checklist({ ...m2Checklist, telemetryPdf: e.target.checked })}
                    className="mt-0.5 rounded text-amber-600 focus:ring-amber-400"
                  />
                  <span>90-day continuous telemetry & acoustic export (PDF)</span>
                </label>
                <label className="flex items-start gap-2 cursor-pointer text-slate-800 font-medium">
                  <input
                    type="checkbox"
                    checked={m2Checklist.leakLogsCsv}
                    onChange={(e) => setM2Checklist({ ...m2Checklist, leakLogsCsv: e.target.checked })}
                    className="mt-0.5 rounded text-amber-600 focus:ring-amber-400"
                  />
                  <span>Verified leak resolution report (38 leaks resolved)</span>
                </label>
                <label className="flex items-start gap-2 cursor-pointer text-slate-800 font-medium">
                  <input
                    type="checkbox"
                    checked={m2Checklist.scadaNote}
                    onChange={(e) => setM2Checklist({ ...m2Checklist, scadaNote: e.target.checked })}
                    className="mt-0.5 rounded text-amber-600 focus:ring-amber-400"
                  />
                  <span>SCADA pressure transient telemetry verification note</span>
                </label>
              </div>

              {/* Payment Info */}
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-600 font-bold">Escrow Tranche:</span>
                  <strong className="text-navy-900 font-extrabold">INR 14.0 Lakhs (40%)</strong>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Tranche Status:</span>
                  <strong className={m2Submitted ? 'text-blue-700 font-bold' : 'text-amber-700 font-bold'}>
                    {m2Submitted ? 'Verification in Progress' : 'Pending Submission (Due 15 Dec)'}
                  </strong>
                </div>
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <button
                type="button"
                onClick={() => setIsSubmitM2ModalOpen(true)}
                className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs flex items-center justify-center gap-1.5 transition-all"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>{m2Submitted ? 'Update M2 Deliverables' : 'Submit M2 Deliverables'}</span>
              </button>
            </div>
          </div>

          {/* Card 3: Milestone M3 (Pending) */}
          <div className="p-5 rounded-3xl bg-slate-50/70 border border-slate-200/80 flex flex-col justify-between space-y-4 opacity-85">
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Milestone 03 • INR 10.5 Lakhs (30%)
                  </span>
                  <h3 className="font-bold text-slate-700 text-sm mt-0.5 leading-tight">
                    M3 – Final Empirical Validation & Handover
                  </h3>
                </div>
                <StatusBadge label="Pending M2" variant="slate" size="sm" />
              </div>

              <p className="text-slate-500 leading-relaxed font-medium">
                Final empirical audit by the Maharashtra Water Quality & Loss Verification Board (Target: ≥20% non-revenue water reduction across 120 km network).
              </p>

              {/* Preview Requirements */}
              <div className="p-3.5 rounded-2xl bg-white/70 border border-slate-200 space-y-1.5 text-[11px] text-slate-500">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Upcoming Requirements:</span>
                <p>• Final independent NRW reduction audit report</p>
                <p>• Comprehensive telemetry and performance logs summary</p>
                <p>• O&M manuals, training records, and as-built drawings</p>
              </div>

              {/* Payment Info */}
              <div className="p-3 rounded-2xl bg-white border border-slate-200 space-y-1 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-500 font-bold">Escrow Tranche:</span>
                  <strong className="text-slate-700 font-bold">INR 10.5 Lakhs (30%)</strong>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Tranche Status:</span>
                  <span>Dependent on final KPI audit</span>
                </div>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-100 text-center text-[10px] text-slate-500 font-medium">
              Deliverables will unlock automatically following M2 approval.
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 2 & 3: FIELD TELEMETRY STATUS & LIVE ALERTS                       */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Field Telemetry & Network Health (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-navy-900 font-display">
                Field Telemetry Status
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Live sensor network health and municipal grid performance.</p>
            </div>
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200">
              <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
              Live Telemetry
            </span>
          </div>

          {/* 4 Telemetry KPI Cards */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Network Uptime</span>
              <strong className="text-xl font-extrabold text-navy-900 font-display block">99.4%</strong>
              <span className="text-[10px] text-emerald-700 font-semibold">Last 90 Days Monitored</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Alert Latency</span>
              <strong className="text-xl font-extrabold text-navy-900 font-display block">&lt; 3.8 Mins</strong>
              <span className="text-[10px] text-slate-500 font-medium">Sub-15 min SLA fulfilled</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Resolved Leaks</span>
              <strong className="text-xl font-extrabold text-emerald-800 font-display block">38 / 47</strong>
              <span className="text-[10px] text-slate-500 font-medium">9 pending municipal crew</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">SCADA Gateway</span>
              <strong className="text-base font-extrabold text-[#1D64EC] font-display block">Connected</strong>
              <span className="text-[10px] text-emerald-700 font-semibold">Pune Municipal GIS Live</span>
            </div>
          </div>

          {/* Network Health Breakdown */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs text-slate-700">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Network Health Summary</span>
            <div className="flex justify-between">
              <span className="text-slate-500">Total Sensors Deployed:</span>
              <strong className="text-navy-900">320 Acoustic Nodes</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Active Online Sensors:</span>
              <strong className="text-emerald-700">318 Nodes (2 in scheduled maintenance)</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Grid Pipeline Coverage:</span>
              <strong className="text-navy-900">~120 km distribution network (Zone A)</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Data Freshness:</span>
              <span className="text-emerald-700 font-semibold font-mono">Last packet: 10 mins ago</span>
            </div>
          </div>
        </div>

        {/* Right: Recent Field Telemetry Alerts (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-navy-900 font-display">
                Recent Field Telemetry Alerts
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Automated acoustic transient and pressure anomaly logs.</p>
            </div>
            <span className="text-xs font-bold text-slate-400">{alerts.length} Recent Logs</span>
          </div>

          <div className="space-y-2.5">
            {alerts.map((al) => (
              <div 
                key={al.id} 
                className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:bg-white hover:border-[#1D64EC]/40 transition-all flex items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-0.5 truncate">
                  <div className="flex items-center gap-2">
                    <strong className="text-navy-900 font-bold truncate">{al.type}</strong>
                    <span className={`px-2 py-0.2 rounded-full text-[10px] font-bold ${
                      al.status === 'Fixed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'
                    }`}>
                      {al.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 truncate">{al.location} • {al.desc}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">{al.detectedOn}</span>
                  <button
                    type="button"
                    onClick={() => setSelectedAlertModal(al)}
                    className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold text-[11px] shadow-2xs"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={() => {
                addNotification({
                  title: 'All Alerts Filtered',
                  message: 'Displaying complete 90-day alert logs.',
                  portal: 'startup',
                  type: 'info'
                });
              }}
              className="text-xs font-bold text-[#1D64EC] hover:underline flex items-center gap-1"
            >
              <span>View All 47 Alerts</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* SECTION 4: KPIS & PERFORMANCE VS CONTRACT                                 */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-navy-900 font-display">
              KPIs & Performance vs Contract Order
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Live field outcomes mapped against statutory contractual deliverables (Order GR-MH/2026/WTR-994).
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
            Contract Status: On Track for Scale
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1">
            <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">Primary KPI: NRW Reduction</span>
            <div className="text-2xl font-black text-emerald-900 font-display">18.4%</div>
            <div className="flex justify-between text-[11px] text-slate-600 pt-1">
              <span>Baseline: 12.0%</span>
              <strong className="text-emerald-800">Target: ≥ 20.0%</strong>
            </div>
            <span className="text-[10px] text-emerald-700 font-bold block pt-1">Last Verified: 20 Dec 2026</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Leak Detection Accuracy</span>
            <div className="text-2xl font-black text-navy-900 font-display">91.0%</div>
            <p className="text-[11px] text-slate-500 pt-1">Acoustic cross-correlation accuracy across 47 detected events.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Alert Response Time</span>
            <div className="text-2xl font-black text-navy-900 font-display">3.8 Mins</div>
            <p className="text-[11px] text-slate-500 pt-1">Average alert transmission to SCADA (SLA: &lt; 15 mins).</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">System Uptime</span>
            <div className="text-2xl font-black text-navy-900 font-display">99.4%</div>
            <p className="text-[11px] text-slate-500 pt-1">Continuous LoRaWAN sensor uplink over 90 days.</p>
          </div>

        </div>

        <p className="text-[11px] text-slate-400 italic">
          * Note: Final KPI audit will be conducted by the Maharashtra Water Quality & Loss Verification Board before M3 approval and scale decision.
        </p>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 5 & 6: DOCUMENTS & AUDIT TRAIL + ACTIONS & NEXT STEPS             */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Documents & Audit Trail (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-navy-900 font-display">
                Documents & Audit Trail
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Verified milestone proofs, payment vouchers, and calibration logs.</p>
            </div>
          </div>

          {/* 4 Document Tabs */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold text-slate-600 overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveDocTab('milestones')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${activeDocTab === 'milestones' ? 'bg-white text-navy-900 shadow-xs' : 'hover:text-navy-900'}`}
            >
              Milestone Reports
            </button>
            <button
              type="button"
              onClick={() => setActiveDocTab('telemetry')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${activeDocTab === 'telemetry' ? 'bg-white text-navy-900 shadow-xs' : 'hover:text-navy-900'}`}
            >
              Telemetry Exports
            </button>
            <button
              type="button"
              onClick={() => setActiveDocTab('payments')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${activeDocTab === 'payments' ? 'bg-white text-navy-900 shadow-xs' : 'hover:text-navy-900'}`}
            >
              Payments & Invoices
            </button>
            <button
              type="button"
              onClick={() => setActiveDocTab('audit')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${activeDocTab === 'audit' ? 'bg-white text-navy-900 shadow-xs' : 'hover:text-navy-900'}`}
            >
              Audit & Verification
            </button>
          </div>

          {/* Documents Table */}
          <div className="space-y-2 text-xs">
            {activeDocTab === 'milestones' && [
              { title: 'M1 Completion & Sensor Deployment Report (PDF)', date: '30 Oct 2026', size: '2.4 MB' },
              { title: 'M2 Interim 90-Day Telemetry Draft Report (PDF)', date: '10 Dec 2026', size: '3.8 MB' },
              { title: 'M2 Telemetry Export & Raw Acoustic Traces (ZIP)', date: '12 Dec 2026', size: '14.2 MB' },
            ].map((d, idx) => (
              <div key={idx} className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                <div className="flex items-center gap-2.5 truncate">
                  <FileText className="w-4 h-4 text-[#1D64EC] shrink-0" />
                  <span className="font-bold text-navy-900 truncate">{d.title}</span>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-[11px] text-slate-400 font-mono">{d.date}</span>
                  <button
                    type="button"
                    onClick={() => addNotification({ title: 'Download Started', message: `Downloading ${d.title}`, portal: 'startup', type: 'info' })}
                    className="p-1.5 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-[#1D64EC]"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}

            {activeDocTab === 'payments' && [
              { title: 'Invoice #INV-2026-M1 – Tranche 1 Escrow (PDF)', date: '05 Nov 2026', size: '1.1 MB' },
              { title: 'Payment Receipt – M1 PFMS-MH-2026-10452 (PDF)', date: '08 Nov 2026', size: '0.9 MB' },
              { title: 'Draft Invoice #INV-2026-M2 – Tranche 2 (PDF)', date: 'Pending', size: '1.2 MB' },
            ].map((d, idx) => (
              <div key={idx} className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                <div className="flex items-center gap-2.5 truncate">
                  <FileText className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-bold text-navy-900 truncate">{d.title}</span>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-[11px] text-slate-400 font-mono">{d.date}</span>
                  <button
                    type="button"
                    onClick={() => addNotification({ title: 'Download Started', message: `Downloading ${d.title}`, portal: 'startup', type: 'info' })}
                    className="p-1.5 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-emerald-700"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}

            {activeDocTab === 'telemetry' && [
              { title: 'Zone A 90-Day Continuous SCADA Telemetry Stream (CSV)', date: '15 Dec 2026', size: '28.4 MB' },
              { title: 'Acoustic Waveform Leak Resolution Matrix (XLSX)', date: '14 Dec 2026', size: '4.2 MB' },
            ].map((d, idx) => (
              <div key={idx} className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                <div className="flex items-center gap-2.5 truncate">
                  <FileSpreadsheet className="w-4 h-4 text-[#1D64EC] shrink-0" />
                  <span className="font-bold text-navy-900 truncate">{d.title}</span>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-[11px] text-slate-400 font-mono">{d.date}</span>
                  <button
                    type="button"
                    onClick={() => addNotification({ title: 'Download Started', message: `Downloading ${d.title}`, portal: 'startup', type: 'info' })}
                    className="p-1.5 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-[#1D64EC]"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}

            {activeDocTab === 'audit' && [
              { title: 'Baseline Pressure & Loss Calibration Sign-off (PDF)', date: '25 Oct 2026', size: '1.8 MB' },
              { title: 'Independent Validation Protocol Draft (PDF)', date: 'Pending', size: '2.1 MB' },
            ].map((d, idx) => (
              <div key={idx} className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                <div className="flex items-center gap-2.5 truncate">
                  <ShieldCheck className="w-4 h-4 text-purple-600 shrink-0" />
                  <span className="font-bold text-navy-900 truncate">{d.title}</span>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-[11px] text-slate-400 font-mono">{d.date}</span>
                  <button
                    type="button"
                    onClick={() => addNotification({ title: 'Download Started', message: `Downloading ${d.title}`, portal: 'startup', type: 'info' })}
                    className="p-1.5 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-purple-700"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Actions & Next Steps (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-base font-bold text-navy-900 font-display">
                Actions & Next Steps
              </h2>
              <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                Action Required
              </span>
            </div>

            {/* Immediate Action Checklist */}
            <div className="space-y-2 text-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Immediate Tasks</span>
              <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-1">
                <strong className="text-amber-950 font-bold block">1. Submit M2 Deliverables Bundle</strong>
                <p className="text-slate-600 text-[11px]">Upload latest telemetry logs & leak resolution notes before 15 Dec 2026 SLA deadline.</p>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <strong className="text-navy-900 font-bold block">2. Coordinate Municipal Repairs for 9 Pending Leaks</strong>
                <p className="text-slate-600 text-[11px]">Pune Zone A maintenance crew scheduled for secondary excavation.</p>
              </div>
            </div>

            {/* Upcoming Deadlines */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs text-slate-700">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Upcoming Deadlines</span>
              <div className="flex justify-between">
                <span>M2 Submission Due:</span>
                <strong className="text-amber-800 font-bold">15 Dec 2026</strong>
              </div>
              <div className="flex justify-between">
                <span>Final KPI Audit (Tentative):</span>
                <strong className="text-navy-900 font-bold">Feb 2027</strong>
              </div>
            </div>

            {/* Key Contacts Strip */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1 text-[11px] text-slate-600">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Key Contacts</span>
              <p>Nodal Officer: <strong>Shri Rajesh Deshmukh</strong></p>
              <p>Technical Lead: <strong>Dr. Meera Deshmukh</strong></p>
              <p>Support: <strong className="text-[#1D64EC]">pilot-support@mahatech.gov.in</strong></p>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsSubmitM2ModalOpen(true)}
              className="w-full py-3 rounded-2xl bg-[#1D64EC] hover:bg-blue-700 text-white font-bold text-xs shadow-xs flex items-center justify-center gap-1.5 transition-all"
            >
              <Upload className="w-4 h-4" />
              <span>Submit M2 Deliverables</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setIsContactModalOpen(true)}
                className="py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Contact Officer</span>
              </button>

              <button
                type="button"
                onClick={() => setIsRaiseQueryModalOpen(true)}
                className="py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Raise Query</span>
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* MODAL 1: SUBMIT M2 DELIVERABLES MODAL                                     */}
      {/* ========================================================================= */}
      {isSubmitM2ModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 border border-slate-200 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-navy-900 font-display">
                  Submit Milestone M2 Deliverables
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">3-Month Performance Review (Escrow Tranche: INR 14.0 Lakhs)</p>
              </div>
              <button
                onClick={() => setIsSubmitM2ModalOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleM2Submit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-navy-900 mb-1">1. Telemetry Export (PDF / ZIP) *</label>
                <div className="p-3 rounded-xl bg-slate-50 border border-dashed border-slate-300 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Paperclip className="w-4 h-4 text-[#1D64EC]" />
                    <span className="font-medium text-navy-900">pune_zone_a_90days_telemetry.pdf (2.4 MB)</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">Ready</span>
                </div>
              </div>

              <div>
                <label className="block font-bold text-navy-900 mb-1">2. Verified Leak Logs (CSV / XLSX) *</label>
                <div className="p-3 rounded-xl bg-slate-50 border border-dashed border-slate-300 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                    <span className="font-medium text-navy-900">verified_leak_logs_38leaks.csv (140 KB)</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">Ready</span>
                </div>
              </div>

              <div>
                <label className="block font-bold text-navy-900 mb-1">3. Internal Validation / Reviewer Notes (Optional)</label>
                <textarea
                  rows={3}
                  value={m2Comments}
                  onChange={(e) => setM2Comments(e.target.value)}
                  placeholder="Add any context or field operational observations for the reviewer..."
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-navy-900"
                />
              </div>

              <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-emerald-900 text-[11px]">
                <strong className="block font-bold">PFMS Escrow Release:</strong>
                Submitting this bundle initiates the 7-day review by the Water Supply Department. Upon sign-off, INR 14.0 Lakhs will disburse to your verified bank account.
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsSubmitM2ModalOpen(false)}
                  className="px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                >
                  Save Draft
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-[#1D64EC] hover:bg-blue-700 text-white font-bold text-xs shadow-xs flex items-center gap-1.5"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Submit M2 Deliverables</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: CONTACT NODAL OFFICER MODAL                                      */}
      {/* ========================================================================= */}
      {(isContactModalOpen || isRaiseQueryModalOpen) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 border border-slate-200 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-navy-900 font-display">
                  {isRaiseQueryModalOpen ? 'Raise Operational Query' : 'Contact Nodal Officer'}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">Direct communication with Shri Rajesh Deshmukh</p>
              </div>
              <button
                onClick={() => {
                  setIsContactModalOpen(false);
                  setIsRaiseQueryModalOpen(false);
                }}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSendMessage} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-navy-900 mb-1">Subject *</label>
                <input
                  type="text"
                  required
                  value={contactSubject}
                  onChange={(e) => setContactSubject(e.target.value)}
                  placeholder="e.g. Schedule M2 field audit / SCADA telemetry query"
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-navy-900"
                />
              </div>

              <div>
                <label className="block font-bold text-navy-900 mb-1">Message *</label>
                <textarea
                  rows={4}
                  required
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  placeholder="Type your official query or update here..."
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-navy-900"
                />
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsContactModalOpen(false);
                    setIsRaiseQueryModalOpen(false);
                  }}
                  className="px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[#1D64EC] hover:bg-blue-700 text-white font-bold text-xs shadow-xs flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: ALERT DETAIL MODAL                                               */}
      {/* ========================================================================= */}
      {selectedAlertModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-4 border border-slate-200 shadow-2xl">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#1D64EC] block">{selectedAlertModal.id}</span>
                <h3 className="text-base font-bold text-navy-900 font-display mt-0.5">
                  {selectedAlertModal.type}
                </h3>
              </div>
              <button
                onClick={() => setSelectedAlertModal(null)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs"
              >
                ×
              </button>
            </div>

            <div className="space-y-2.5 text-xs text-slate-700">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Location & Zone</span>
                <strong className="text-navy-900 block">{selectedAlertModal.location}</strong>
                <p className="text-slate-500">{selectedAlertModal.desc}</p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Field Investigation Details</span>
                <p className="leading-relaxed text-slate-700 font-medium">{selectedAlertModal.details}</p>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                <span>Detected: {selectedAlertModal.detectedOn}</span>
                <span className="font-bold text-emerald-700">Status: {selectedAlertModal.status}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedAlertModal(null)}
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
