import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { 
  FileSignature, ShieldCheck, Lock, CheckCircle2, 
  Download, ArrowRight, Check, KeyRound, Sparkles, FileText, Clock, 
  ChevronDown, ChevronUp, ChevronRight, ExternalLink, Shield, AlertTriangle, 
  Building2, User, Phone, CheckCheck, RefreshCw, Send, 
  HelpCircle, Eye, FileCheck, Layers, ArrowUpRight 
} from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';
import { Modal } from '../common/Modal';
import confetti from 'canvas-confetti';

export const DigitalContractSigner: React.FC = () => {
  const { contracts, signStartupContract, currentStartup, setActiveTab, addNotification } = usePlatform();

  const currentContract = contracts[0];

  // Accordion Expand State for Contract Clauses
  const [expandedClauses, setExpandedClauses] = useState<{ [key: number]: boolean }>({
    1: true,
    2: true,
    3: false,
    4: false,
    5: false
  });

  // Selected Annexure Modal
  const [selectedAnnexure, setSelectedAnnexure] = useState<{ title: string; subtitle: string; content: string } | null>(null);

  // Signing Flow States
  const [isSigningModalOpen, setIsSigningModalOpen] = useState(false);
  const [hasAgreedTerms, setHasAgreedTerms] = useState(true);
  const [selectedMethod, setSelectedMethod] = useState<'Aadhaar' | 'DSC' | 'OTP'>('Aadhaar');
  const [aadhaarNumber, setAadhaarNumber] = useState('XXXX-XXXX-8812');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isSignedOverride, setIsSignedOverride] = useState(true); // Default to fully executed per spec

  // Query Modal
  const [isQueryModalOpen, setIsQueryModalOpen] = useState(false);
  const [querySubject, setQuerySubject] = useState('');
  const [queryBody, setQueryBody] = useState('');

  const isSigned = isSignedOverride || currentContract?.startupStatus === 'signed';

  const toggleClause = (id: number) => {
    setExpandedClauses(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSendOtp = () => {
    setOtpSent(true);
    setOtp('492018');
    addNotification({
      title: 'UIDAI OTP Dispatched',
      message: 'One-time verification password sent to mobile linked to Aadhaar (Ending with 1234).',
      portal: 'startup',
      type: 'info'
    });
  };

  const handleCompleteSign = () => {
    if (currentContract) {
      signStartupContract(
        currentContract.id,
        currentStartup.founderName,
        `XXXXXXXX8812`
      );
      setIsSignedOverride(true);
      setIsSigningModalOpen(false);
      setOtpSent(false);
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 } });
      addNotification({
        title: 'Contract Digitally Executed',
        message: 'Aadhaar eSign completed successfully. Legally binding agreement active with Maharashtra Water Supply Department.',
        portal: 'startup',
        type: 'success'
      });
    }
  };

  const handleSendQuery = (e: React.FormEvent) => {
    e.preventDefault();
    setIsQueryModalOpen(false);
    addNotification({
      title: 'Contract Query Dispatched',
      message: `Your query on "${querySubject || 'Legal Terms'}" has been forwarded to the Legal & Procurement Cell.`,
      portal: 'startup',
      type: 'success'
    });
    setQuerySubject('');
    setQueryBody('');
  };

  const annexureData: { [key: string]: { title: string; subtitle: string; content: string } } = {
    A: {
      title: 'Annexure A: Technical Scope of Work & Deployment Grid',
      subtitle: 'AI-based Water Leakage Detection in Pune Municipal Corporation (Zone A)',
      content: `1. Deployment of 320 acoustic clamp sensor nodes across ~120 km distribution network in Pune Zone A.
2. Setup and configuration of 4 LoRaWAN gateway repeaters with MeitY-compliant edge encryption.
3. Bidirectional API handshake with Pune Municipal Corporation SCADA and GIS central console.
4. Continuous 24/7 hydraulic digital twin telemetry, acoustic wave anomaly detection, and sub-surface fracture localization.
5. Monthly milestone calibration certificates and joint validation sign-offs with Municipal Executive Engineers.`
    },
    B: {
      title: 'Annexure B: Milestone Schedule & Escrow Tranche Disbursals',
      subtitle: 'PFMS Treasury Escrow Terms & Timelines',
      content: `Tranche M1 (30% - INR 10.5 Lakhs): Released upon successful rigging of 320 acoustic nodes and baseline pressure calibration sign-off.
Tranche M2 (40% - INR 14.0 Lakhs): Released upon 90-day continuous telemetry validation and verified resolution of at least 35 detected leakage events.
Tranche M3 (30% - INR 10.5 Lakhs): Released upon final empirical audit by the Maharashtra Water Quality & Loss Verification Board confirming >=20% NRW reduction.`
    },
    C: {
      title: 'Annexure C: Intellectual Property Rights & Sovereign Data Governance',
      subtitle: 'IP Safeguards & Government License Terms',
      content: `1. Background IP: All pre-existing proprietary source code, acoustic neural network architectures, and hardware designs remain the sole property of AquaSense Technologies Pvt. Ltd.
2. License Grant: The Government of Maharashtra is granted a non-exclusive, perpetual, royalty-free license to use the deployed platform instance for internal municipal water management.
3. Data Sovereignty: All field telemetry, pressure readings, GIS pipeline maps, and municipal water consumption data generated during the pilot remain the exclusive property of the Government of Maharashtra and must reside solely within India-based data centres.`
    },
    D: {
      title: 'Annexure D: Cybersecurity, VAPT & Infrastructure Compliance',
      subtitle: 'Maharashtra State Cyber Policy v2.0 Mandates',
      content: `1. Data at rest shall be encrypted using AES-256; data in transit shall use TLS 1.3 encryption.
2. Compulsory annual Level 3 security audit by a CERT-In empanelled auditing agency.
3. Mandatory Multi-Factor Authentication (MFA) and Role-Based Access Control (RBAC) across all municipal dashboard endpoints.
4. Critical security incidents must be reported to the Maharashtra Cyber Cell within 24 hours of detection.`
    },
    E: {
      title: 'Annexure E: Termination, SLA Breaches & Exit Management',
      subtitle: 'Risk Allocation & Handover Protocols',
      content: `1. Termination for Cause: The Department reserves the right to issue a 30-day cure notice if system uptime falls below 95% or if key NRW reduction benchmarks are missed for 2 consecutive review cycles.
2. Termination for Convenience: Either party may terminate with 60 days written notice, subject to settlement of verified milestone deliverables up to the date of notice.
3. Exit & Handover: Upon contract conclusion, the startup shall deliver complete telemetry exports, as-built sensor GIS maps, and conduct operational training for municipal personnel.`
    }
  };

  const auditLogs = [
    {
      event: 'Document viewed',
      timestamp: '12 Aug 2026, 10:15 AM',
      actor: 'anjali@aquasense.ai (Startup CEO)',
      ip: '117.204.12.88',
      details: 'Web – Chrome on Windows (Session #AUTH-991)'
    },
    {
      event: 'Document viewed & vetted',
      timestamp: '12 Aug 2026, 10:45 AM',
      actor: 'rajesh.kumar@maharashtra.gov.in',
      ip: '14.139.42.19',
      details: 'Government NIC Network • SSO Verified'
    },
    {
      event: 'Department DSC signature applied',
      timestamp: '12 Aug 2026, 11:15 AM',
      actor: 'Shri Rajesh Kumar (Secretary)',
      ip: '14.139.42.19',
      details: 'Digital Signature Certificate #MH-SEC-4412'
    },
    {
      event: 'UIDAI OTP verification initiated',
      timestamp: '12 Aug 2026, 11:40 AM',
      actor: 'UIDAI Gateway / CDAC',
      ip: 'Gateway Node',
      details: 'Aadhaar eSign OTP Request ID #CDAC-88912'
    },
    {
      event: 'OTP verified successfully',
      timestamp: '12 Aug 2026, 11:41 AM',
      actor: 'Ms. Anjali Patil (CEO)',
      ip: '117.204.12.88',
      details: 'Mobile OTP match verified (+91-XXXXX-XX234)'
    },
    {
      event: 'Digitally signed via Aadhaar eSign',
      timestamp: '12 Aug 2026, 11:42 AM',
      actor: 'Ms. Anjali Patil (CEO)',
      ip: '117.204.12.88',
      details: 'Legally binding eSign applied • SHA-256 Digest'
    },
    {
      event: 'Contract marked as Fully Executed',
      timestamp: '12 Aug 2026, 11:42 AM',
      actor: 'MahaProcure System Engine',
      ip: 'System',
      details: 'Both parties signed • Order GR-MH/2026/WTR-994'
    }
  ];

  if (!currentContract) {
    return (
      <div className="space-y-6">
        <div className="glass-panel rounded-3xl p-16 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#1D64EC] flex items-center justify-center mx-auto">
            <FileSignature className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-navy-900">No Bilateral Contracts Awaiting Signature</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            When your problem statement proposals receive clearance from the state evaluation committee, official Sandbox Pilot Agreements will appear here for Aadhaar-based eSign.
          </p>
          <button
            type="button"
            onClick={() => setActiveTab('challenges')}
            className="px-5 py-2 rounded-full bg-[#1D64EC] hover:bg-blue-700 text-white font-bold text-xs shadow-2xs inline-flex items-center gap-1.5 mt-2"
          >
            <span>Explore Open Challenges</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* ========================================================================= */}
      {/* TOP HEADER BAND                                                          */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-5">
        
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#1D64EC] text-[10px] font-bold border border-blue-200 uppercase tracking-wider">
                Government of Maharashtra • Bilateral Sandbox Agreement
              </span>
              <span className="text-xs text-slate-400 font-mono">Order Ref: {currentContract.id}</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-navy-900 font-display tracking-tight leading-tight">
              Pilot Agreement – {currentContract.challengeTitle}
            </h1>

            <p className="text-xs text-slate-500 font-medium">
              Startup: <strong>{currentContract.startupName}</strong>
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <StatusBadge
              label={isSigned ? 'Fully Executed – Active' : 'Partially Executed – Awaiting Signature'}
              variant={isSigned ? 'emerald' : 'amber'}
              size="md"
              icon={isSigned ? 'check' : 'clock'}
            />
          </div>
        </div>

        {/* Dynamic Status Banner */}
        <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs ${
          isSigned ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950' : 'bg-amber-50/70 border-amber-200 text-amber-950'
        }`}>
          <div className="flex items-center gap-2.5">
            {isSigned ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            ) : (
              <Clock className="w-5 h-5 text-amber-600 shrink-0" />
            )}
            <div>
              <strong className="block font-bold">
                {isSigned ? 'Fully Executed & Legally Active Agreement' : 'Awaiting Startup Signatory Execution'}
              </strong>
              <span className="text-slate-600 text-[11px]">
                {isSigned 
                  ? 'Both the Department Secretary and Startup CEO have signed via certified electronic signatures.' 
                  : 'The Department Secretary has signed. Please complete your Aadhaar eSign to commence pilot execution.'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => {
                addNotification({
                  title: 'Downloading Contract',
                  message: 'Generated verified digital PDF of Agreement GR-MH/2026/WTR-994 with cryptographic signatures.',
                  portal: 'startup',
                  type: 'info'
                });
              }}
              className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 font-bold text-navy-900 text-xs shadow-2xs flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-[#1D64EC]" />
              <span>Download Contract (PDF)</span>
            </button>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: CONTRACT SUMMARY                                              */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-navy-900 font-display">
              Contract Summary & Metadata
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">Key parameters governing execution, payments, and pilot tenure.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 text-xs">
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-0.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Contract Type</span>
            <strong className="text-navy-900 font-bold block">Sandbox Pilot Agreement</strong>
            <span className="text-[10px] text-slate-500">Government Sandbox GR</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-0.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Problem Statement</span>
            <strong className="text-navy-900 font-bold block truncate">PS2 – Water Leak Detection</strong>
            <span className="text-[10px] text-[#1D64EC] font-semibold">Urban Distribution Grid</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-0.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Pilot Location</span>
            <strong className="text-navy-900 font-bold block">Pune MC (Zone A)</strong>
            <span className="text-[10px] text-slate-500">~120 km Pipeline Scope</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-0.5">
            <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">Contract Value</span>
            <strong className="text-base font-black text-emerald-950 font-display block">INR 35.0 Lakhs</strong>
            <span className="text-[10px] text-emerald-700 font-medium">3 Tranches via PFMS</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-0.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Duration & Tenure</span>
            <strong className="text-navy-900 font-bold block">6 Months</strong>
            <span className="text-[10px] text-slate-500">Extendable upon scale</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-0.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Effective Date</span>
            <strong className="text-navy-900 font-bold block">12 Aug 2026</strong>
            <span className="text-[10px] text-slate-500">Signing Execution Date</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-0.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Expected End Date</span>
            <strong className="text-navy-900 font-bold block">11 Feb 2027</strong>
            <span className="text-[10px] text-slate-500">Final Validation Audit</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 space-y-0.5">
            <span className="text-[10px] font-bold text-[#1D64EC] uppercase tracking-wider block">Payment Mechanism</span>
            <strong className="text-navy-900 font-bold block">Escrow via PFMS</strong>
            <span className="text-[10px] text-[#1D64EC] font-medium">Auto-disbursal in 72h</span>
          </div>
        </div>

        <div className="pt-2 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('execution')}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs flex items-center gap-1.5 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Open Active Pilot Workspace</span>
          </button>

          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('contract-audit-trail');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
          >
            View Forensic Audit Trail
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 2: KEY CONTRACT CLAUSES (Collapsible Accordions)                  */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-navy-900 font-display">
              Key Contract Clauses & Statutory Obligations
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">Expand each clause to inspect operational terms and annexure details.</p>
          </div>
          <button
            type="button"
            onClick={() => {
              const allOpen = Object.values(expandedClauses).every(v => v);
              setExpandedClauses({ 1: !allOpen, 2: !allOpen, 3: !allOpen, 4: !allOpen, 5: !allOpen });
            }}
            className="text-xs font-bold text-[#1D64EC] hover:underline"
          >
            {Object.values(expandedClauses).every(v => v) ? 'Collapse All' : 'Expand All'}
          </button>
        </div>

        <div className="space-y-3 text-xs">
          
          {/* Clause 1 */}
          <div className="rounded-2xl border border-slate-200 overflow-hidden transition-all">
            <button
              type="button"
              onClick={() => toggleClause(1)}
              className="w-full p-4 bg-slate-50/70 hover:bg-slate-50 flex items-center justify-between text-left"
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg bg-navy-900 text-white font-bold text-xs flex items-center justify-center">1</span>
                <div>
                  <strong className="text-navy-900 font-bold text-xs block">Scope of Work</strong>
                  <p className="text-slate-500 text-[11px] mt-0.5">Deploy AI-based leak detection across 2 zones in Pune (Zone A), covering ~120 km of water pipeline.</p>
                </div>
              </div>
              {expandedClauses[1] ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </button>
            {expandedClauses[1] && (
              <div className="p-4 bg-white border-t border-slate-100 space-y-3 text-slate-700 leading-relaxed font-medium">
                <p>• Deployment of 320 acoustic clamp sensors and 4 LoRaWAN gateways across Zone A.</p>
                <p>• Bidirectional integration with Pune Municipal Corporation SCADA & GIS telemetry consoles.</p>
                <p>• Baseline hydraulic calibration and continuous real-time leak localization for 6 months.</p>
                <button
                  type="button"
                  onClick={() => setSelectedAnnexure(annexureData.A)}
                  className="text-xs font-bold text-[#1D64EC] hover:underline flex items-center gap-1 pt-1"
                >
                  <span>View Full Scope of Work (Annexure A)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Clause 2 */}
          <div className="rounded-2xl border border-slate-200 overflow-hidden transition-all">
            <button
              type="button"
              onClick={() => toggleClause(2)}
              className="w-full p-4 bg-slate-50/70 hover:bg-slate-50 flex items-center justify-between text-left"
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg bg-navy-900 text-white font-bold text-xs flex items-center justify-center">2</span>
                <div>
                  <strong className="text-navy-900 font-bold text-xs block">Milestones & Escrow Payments</strong>
                  <p className="text-slate-500 text-[11px] mt-0.5">Disbursement in 3 tranches: M1 (30% – INR 10.5L), M2 (40% – INR 14.0L), M3 (30% – INR 10.5L), released within 72 hours of Digital Milestone Validation.</p>
                </div>
              </div>
              {expandedClauses[2] && (
                <div className="p-4 bg-white border-t border-slate-100 space-y-3 text-slate-700 leading-relaxed font-medium">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
                      <strong className="text-emerald-900 block text-xs">M1 – Rigging & Calibration</strong>
                      <span className="text-[11px] text-emerald-800 block">30% • INR 10.5 Lakhs (Paid)</span>
                      <p className="text-[10px] text-slate-500">Trigger: 320 nodes active + SCADA integration sign-off.</p>
                    </div>
                    <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 space-y-1">
                      <strong className="text-amber-900 block text-xs">M2 – 3-Month Performance</strong>
                      <span className="text-[11px] text-amber-800 block">40% • INR 14.0 Lakhs (In Progress)</span>
                      <p className="text-[10px] text-slate-500">Trigger: 90-day telemetry + 38 verified leak repairs.</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                      <strong className="text-navy-900 block text-xs">M3 – Final Handover</strong>
                      <span className="text-[11px] text-slate-600 block">30% • INR 10.5 Lakhs (Pending)</span>
                      <p className="text-[10px] text-slate-500">Trigger: State Board final verification audit.</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedAnnexure(annexureData.B)}
                    className="text-xs font-bold text-[#1D64EC] hover:underline flex items-center gap-1 pt-1"
                  >
                    <span>View Milestone Schedule & Payment Terms (Annexure B)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </button>
          </div>

          {/* Clause 3 */}
          <div className="rounded-2xl border border-slate-200 overflow-hidden transition-all">
            <button
              type="button"
              onClick={() => toggleClause(3)}
              className="w-full p-4 bg-slate-50/70 hover:bg-slate-50 flex items-center justify-between text-left"
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg bg-navy-900 text-white font-bold text-xs flex items-center justify-center">3</span>
                <div>
                  <strong className="text-navy-900 font-bold text-xs block">IP & Data Ownership</strong>
                  <p className="text-slate-500 text-[11px] mt-0.5">Startup retains IP over core algorithms; Government gets perpetual, royalty-free license for internal use. All data generated during the pilot is owned exclusively by the Government of Maharashtra.</p>
                </div>
              </div>
              {expandedClauses[3] ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </button>
            {expandedClauses[3] && (
              <div className="p-4 bg-white border-t border-slate-100 space-y-3 text-slate-700 leading-relaxed font-medium">
                <p>• <strong>Background IP:</strong> Full pre-existing algorithmic and acoustic ML model rights are retained solely by the startup.</p>
                <p>• <strong>Data Sovereignty:</strong> All municipal telemetry, loss maps, and customer data belong exclusively to the Government of Maharashtra.</p>
                <button
                  type="button"
                  onClick={() => setSelectedAnnexure(annexureData.C)}
                  className="text-xs font-bold text-[#1D64EC] hover:underline flex items-center gap-1 pt-1"
                >
                  <span>View Full IP & Data Clause (Annexure C)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Clause 4 */}
          <div className="rounded-2xl border border-slate-200 overflow-hidden transition-all">
            <button
              type="button"
              onClick={() => toggleClause(4)}
              className="w-full p-4 bg-slate-50/70 hover:bg-slate-50 flex items-center justify-between text-left"
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg bg-navy-900 text-white font-bold text-xs flex items-center justify-center">4</span>
                <div>
                  <strong className="text-navy-900 font-bold text-xs block">Cybersecurity Standards</strong>
                  <p className="text-slate-500 text-[11px] mt-0.5">Compliance with Maharashtra State Cyber Policy v2.0; annual third-party CERT-In audit.</p>
                </div>
              </div>
              {expandedClauses[4] ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </button>
            {expandedClauses[4] && (
              <div className="p-4 bg-white border-t border-slate-100 space-y-3 text-slate-700 leading-relaxed font-medium">
                <p>• Data encrypted with AES-256 (at rest) and TLS 1.3 (in transit).</p>
                <p>• Annual Level 3 CERT-In empanelled penetration test and continuous audit logging.</p>
                <button
                  type="button"
                  onClick={() => setSelectedAnnexure(annexureData.D)}
                  className="text-xs font-bold text-[#1D64EC] hover:underline flex items-center gap-1 pt-1"
                >
                  <span>View Cybersecurity & Compliance Requirements (Annexure D)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Clause 5 */}
          <div className="rounded-2xl border border-slate-200 overflow-hidden transition-all">
            <button
              type="button"
              onClick={() => toggleClause(5)}
              className="w-full p-4 bg-slate-50/70 hover:bg-slate-50 flex items-center justify-between text-left"
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg bg-navy-900 text-white font-bold text-xs flex items-center justify-center">5</span>
                <div>
                  <strong className="text-navy-900 font-bold text-xs block">Termination & Risks</strong>
                  <p className="text-slate-500 text-[11px] mt-0.5">Either party may terminate with 30 days’ notice if KPIs are not met for 2 consecutive months.</p>
                </div>
              </div>
              {expandedClauses[5] ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </button>
            {expandedClauses[5] && (
              <div className="p-4 bg-white border-t border-slate-100 space-y-3 text-slate-700 leading-relaxed font-medium">
                <p>• Termination for cause if system uptime or leak accuracy fails SLAs for 2 consecutive cycles.</p>
                <p>• Orderly exit protocol including data handover, telemetry backups, and decommissioning schedule.</p>
                <button
                  type="button"
                  onClick={() => setSelectedAnnexure(annexureData.E)}
                  className="text-xs font-bold text-[#1D64EC] hover:underline flex items-center gap-1 pt-1"
                >
                  <span>View Termination & Risk Provisions (Annexure E)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 3 & 4: EXECUTION & SIGNATURES + ESIGN CONTROLS                     */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Execution Signatures (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-navy-900 font-display">
                Execution & Certified Signatures
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Legally binding electronic signatures under IT Act 2000 Section 3A.</p>
            </div>
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              IT Act Compliant
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            
            {/* Department Signatory Card */}
            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">Department Signatory</span>
                <span className="text-[10px] font-bold text-emerald-700 bg-white px-2 py-0.5 rounded-full border border-emerald-200">
                  DSC Signed
                </span>
              </div>

              <div>
                <strong className="text-sm font-bold text-navy-900 block">Shri Rajesh Kumar</strong>
                <p className="text-[11px] text-slate-600">Secretary – Water Supply & Sanitation</p>
                <span className="text-[10px] text-slate-400">Government of Maharashtra</span>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-emerald-100 space-y-1 text-[11px]">
                <div className="flex items-center gap-1.5 text-emerald-900 font-semibold">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Signed on 12 Aug 2026, 11:42 AM IST</span>
                </div>
                <p className="text-[10px] text-slate-500">Method: Digital Signature Certificate (DSC)</p>
                <p className="text-[10px] text-slate-500 font-mono">IP: 14.139.42.19 • Desktop (NIC SSO)</p>
              </div>
            </div>

            {/* Startup Signatory Card */}
            <div className={`p-4 rounded-2xl border space-y-2.5 ${
              isSigned ? 'bg-emerald-50/60 border-emerald-200' : 'bg-amber-50/60 border-amber-200'
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 block">Startup Signatory</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                  isSigned ? 'bg-white text-emerald-700 border-emerald-200' : 'bg-white text-amber-700 border-amber-200'
                }`}>
                  {isSigned ? 'Aadhaar eSigned' : 'Pending Signature'}
                </span>
              </div>

              <div>
                <strong className="text-sm font-bold text-navy-900 block">Ms. Anjali Patil</strong>
                <p className="text-[11px] text-slate-600">Chief Executive Officer (CEO)</p>
                <span className="text-[10px] text-slate-400">AquaSense Technologies Pvt. Ltd.</span>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-slate-200 space-y-1 text-[11px]">
                <div className="flex items-center gap-1.5 font-semibold text-navy-900">
                  <Check className={`w-3.5 h-3.5 ${isSigned ? 'text-emerald-600' : 'text-amber-600'}`} />
                  <span>{isSigned ? 'Digitally signed via Aadhaar eSign' : 'Awaiting digital signing'}</span>
                </div>
                <p className="text-[10px] text-slate-500">Method: Aadhaar OTP Gateway (UIDAI)</p>
                <p className="text-[10px] text-slate-500 font-mono">
                  {isSigned ? 'IP: 117.204.12.88 • Web (Chrome)' : 'Mobile: +91-XXXXX-XX234'}
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Right: Digital eSign Actions Pad (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-base font-bold text-navy-900 font-display flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#1D64EC]" />
                <span>Digital eSign Options</span>
              </h2>
              <span className="text-xs font-bold text-slate-400">Secure Gateway</span>
            </div>

            {!isSigned ? (
              <div className="space-y-3 text-xs">
                <label className="flex items-start gap-2 p-3 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer font-medium text-slate-700">
                  <input
                    type="checkbox"
                    checked={hasAgreedTerms}
                    onChange={(e) => setHasAgreedTerms(e.target.checked)}
                    className="mt-0.5 rounded text-[#1D64EC]"
                  />
                  <span>I have read, understood, and accept all clauses in this agreement.</span>
                </label>

                <div className="space-y-1.5 font-semibold">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Select eSign Method</span>
                  {[
                    { id: 'Aadhaar', name: 'Aadhaar eSign (OTP-based)' },
                    { id: 'DSC', name: 'DSC (Digital Signature Certificate Token)' },
                    { id: 'OTP', name: 'Government Registered Email / Mobile OTP' }
                  ].map(m => (
                    <label 
                      key={m.id}
                      className={`p-3 rounded-2xl border flex items-center gap-2.5 cursor-pointer transition-colors ${
                        selectedMethod === m.id ? 'bg-blue-50/70 border-[#1D64EC] text-[#1D64EC]' : 'bg-slate-50 border-slate-200 text-navy-900'
                      }`}
                    >
                      <input
                        type="radio"
                        name="signMethod"
                        checked={selectedMethod === m.id}
                        onChange={() => setSelectedMethod(m.id as any)}
                        className="text-[#1D64EC]"
                      />
                      <span>{m.name}</span>
                    </label>
                  ))}
                </div>

                <button
                  type="button"
                  disabled={!hasAgreedTerms}
                  onClick={() => setIsSigningModalOpen(true)}
                  className="w-full py-3.5 rounded-2xl bg-[#1D64EC] hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs shadow-xs flex items-center justify-center gap-2 transition-all"
                >
                  <FileSignature className="w-4 h-4" />
                  <span>Proceed to eSign Contract</span>
                </button>
              </div>
            ) : (
              <div className="space-y-3 text-xs">
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-1">
                  <div className="flex items-center justify-center gap-1.5 text-emerald-800 font-bold text-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>Contract Executed Successfully!</span>
                  </div>
                  <p className="text-[11px] text-emerald-900 font-medium">
                    Digitally signed by Ms. Anjali Patil (CEO) on 12 Aug 2026, 11:42 AM IST.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveTab('execution')}
                  className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs flex items-center justify-center gap-2 transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Go to Active Pilot Workspace</span>
                </button>
              </div>
            )}
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => {
                addNotification({
                  title: 'Contract Package Downloaded',
                  message: 'Downloaded executed agreement with embedded signature certificates (PDF).',
                  portal: 'startup',
                  type: 'info'
                });
              }}
              className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-[#1D64EC]" />
              <span>Download Signed Contract (PDF)</span>
            </button>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* SECTION 5: FORENSIC AUDIT TRAIL                                           */}
      {/* ========================================================================= */}
      <div id="contract-audit-trail" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-navy-900 font-display">
              Forensic Audit Trail & Integrity Log
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Complete chronological record of document views, authentication, and signing events for this contract.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                addNotification({
                  title: 'Audit Trail Exported',
                  message: 'Generated tamper-evident audit report (PDF) with SHA-256 integrity logs.',
                  portal: 'startup',
                  type: 'info'
                });
              }}
              className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-[#1D64EC]" />
              <span>Download Audit Trail (PDF)</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 text-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-navy-900 border-b border-slate-200">
                <th className="py-3 px-4 font-bold">Event</th>
                <th className="py-3 px-4 font-bold">Timestamp</th>
                <th className="py-3 px-4 font-bold">User / Actor</th>
                <th className="py-3 px-4 font-bold">IP Address</th>
                <th className="py-3 px-4 font-bold">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {auditLogs.map((log, idx) => (
                <tr key={idx} className="hover:bg-slate-50/60">
                  <td className="py-3 px-4 font-bold text-navy-900 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>{log.event}</span>
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-500 whitespace-nowrap">{log.timestamp}</td>
                  <td className="py-3 px-4 font-medium text-navy-900">{log.actor}</td>
                  <td className="py-3 px-4 font-mono text-slate-400">{log.ip}</td>
                  <td className="py-3 px-4 text-slate-600">{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 6: CONTRACT LIFECYCLE & RELATED LINKS                             */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-navy-900 font-display">
              Contract Lifecycle & Related Links
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">Connected sandbox lifecycle artifacts and quick action gateways.</p>
          </div>
        </div>

        {/* Lifecycle Progression Strip */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Contract Lifecycle Progression</span>
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-600">
            <span className="text-emerald-700">1. Draft Created</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <span className="text-emerald-700">2. Department Signed</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <span className="text-emerald-700">3. Startup Signed</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <span className="text-emerald-700">4. Fully Executed</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <span className="text-[#1D64EC] bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">5. Active Pilot Live</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('applications')}
            className="p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-between text-left transition-colors"
          >
            <div>
              <strong className="text-navy-900 block font-bold">Proposal #RCP-88192</strong>
              <span className="text-[10px] text-slate-500">View Proposal & Scorecard</span>
            </div>
            <ArrowUpRight className="w-4 h-4 text-[#1D64EC]" />
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('execution')}
            className="p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-between text-left transition-colors"
          >
            <div>
              <strong className="text-navy-900 block font-bold">Milestone Invoices</strong>
              <span className="text-[10px] text-slate-500">View Tranche Releases</span>
            </div>
            <ArrowUpRight className="w-4 h-4 text-[#1D64EC]" />
          </button>

          <button
            type="button"
            onClick={() => setIsQueryModalOpen(true)}
            className="p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-between text-left transition-colors"
          >
            <div>
              <strong className="text-navy-900 block font-bold">Legal Query Cell</strong>
              <span className="text-[10px] text-slate-500">Ask Clarification on Clauses</span>
            </div>
            <HelpCircle className="w-4 h-4 text-[#1D64EC]" />
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODAL 1: AADHAAR ESIGN AUTHENTICATION MODAL                               */}
      {/* ========================================================================= */}
      {isSigningModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 border border-slate-200 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-navy-900 font-display">
                  Aadhaar eSign Gateway
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">UIDAI / CDAC Digital Signature Authentication</p>
              </div>
              <button
                onClick={() => setIsSigningModalOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs"
              >
                ×
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 text-slate-700">
                <span className="text-[10px] font-bold uppercase text-[#1D64EC] block">Signatory Authentication</span>
                <p className="mt-0.5">
                  Sign as: <strong>Ms. Anjali Patil, CEO – AquaSense Technologies</strong> for Agreement <strong className="font-mono">GR-MH/2026/WTR-994</strong>.
                </p>
              </div>

              <div>
                <label className="block font-bold text-navy-900 mb-1">Aadhaar / Virtual ID (VID) *</label>
                <input
                  type="text"
                  value={aadhaarNumber}
                  onChange={(e) => setAadhaarNumber(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-mono font-bold text-navy-900 text-xs"
                />
              </div>

              {!otpSent ? (
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="w-full py-3 rounded-2xl bg-[#1D64EC] hover:bg-blue-700 text-white font-bold text-xs shadow-xs flex items-center justify-center gap-2 transition-all"
                >
                  <KeyRound className="w-4 h-4" />
                  <span>Send OTP to Linked Mobile</span>
                </button>
              ) : (
                <div className="space-y-3 pt-1">
                  <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-800 flex items-center justify-between">
                    <span>✓ OTP sent to mobile (+91-XXXXX-XX234)</span>
                    <span className="font-mono font-bold">Simulated OTP: 492018</span>
                  </div>

                  <div>
                    <label className="block font-bold text-navy-900 mb-1">Enter 6-Digit OTP</label>
                    <input
                      type="text"
                      maxLength={6}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="492018"
                      className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-center text-lg font-mono font-bold tracking-widest text-navy-900"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleCompleteSign}
                    className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs flex items-center justify-center gap-2 transition-all"
                  >
                    <Check className="w-4 h-4" />
                    <span>Verify OTP & Apply Legal eSign</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: ANNEXURE VIEWER MODAL                                            */}
      {/* ========================================================================= */}
      {selectedAnnexure && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-4 border border-slate-200 shadow-2xl max-h-[85vh] overflow-y-auto custom-scrollbar">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-navy-900 font-display">
                  {selectedAnnexure.title}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">{selectedAnnexure.subtitle}</p>
              </div>
              <button
                onClick={() => setSelectedAnnexure(null)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs"
              >
                ×
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 font-medium whitespace-pre-line leading-relaxed">
              {selectedAnnexure.content}
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] text-slate-400 font-mono">Bilateral Agreement GR-MH/2026/WTR-994</span>
              <button
                type="button"
                onClick={() => setSelectedAnnexure(null)}
                className="px-5 py-2 rounded-full bg-[#1D64EC] hover:bg-blue-700 text-white font-bold text-xs"
              >
                Close Annexure
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: LEGAL QUERY CELL MODAL                                           */}
      {/* ========================================================================= */}
      {isQueryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 border border-slate-200 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-navy-900 font-display">
                  Raise Contractual or Legal Query
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">Maharashtra Water Supply Legal & Procurement Cell</p>
              </div>
              <button
                onClick={() => setIsQueryModalOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSendQuery} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-navy-900 mb-1">Clause Reference / Subject *</label>
                <input
                  type="text"
                  required
                  value={querySubject}
                  onChange={(e) => setQuerySubject(e.target.value)}
                  placeholder="e.g. Clause 3 IP terms / Escrow disbursal SLA"
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-navy-900 text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-navy-900 mb-1">Query Details *</label>
                <textarea
                  rows={4}
                  required
                  value={queryBody}
                  onChange={(e) => setQueryBody(e.target.value)}
                  placeholder="Describe your question or request for clarification..."
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-navy-900 text-xs"
                />
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsQueryModalOpen(false)}
                  className="px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[#1D64EC] hover:bg-blue-700 text-white font-bold text-xs shadow-xs flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Query</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
