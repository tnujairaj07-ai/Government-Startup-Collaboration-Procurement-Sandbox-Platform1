import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { 
  Rocket, Upload, CheckCircle2, FileText, ShieldCheck, 
  Check, Clock, AlertCircle, Sparkles, FileSpreadsheet, Paperclip, 
  Activity, Radio, MapPin, Gauge, Download, Eye, ExternalLink 
} from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';
import { Modal } from '../common/Modal';
import confetti from 'canvas-confetti';

export const ExecutionWorkspace: React.FC = () => {
  const { proposals, submitMilestoneDeliverable, addNotification } = usePlatform();

  const activeProposal = proposals[0];

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [proofUrl, setProofUrl] = useState('https://dashboard.aquasense.ai/pune-zone-a/export-90days.pdf');
  const [proofNotes, setProofNotes] = useState('90-day performance dashboard export (38 verified leaks resolved / 47 alerts) with SCADA telemetry data.');

  const handleUploadM2 = () => {
    if (activeProposal) {
      submitMilestoneDeliverable(activeProposal.id, 'M2', proofUrl, proofNotes);
      setIsUploadModalOpen(false);
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      addNotification({
        title: 'M2 Deliverable Submitted',
        message: 'Milestone M2 evidence uploaded and submitted for Maharashtra Water Supply Department review.',
        portal: 'startup',
        type: 'success'
      });
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Active Sandbox Pilot Workspace
            </span>
            <span className="text-xs text-slate-400 font-mono">Pune Zone A Grid</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-navy-900 font-display tracking-tight">
            Active Pilot Workspace
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Manage milestone deliverables, sensor telemetry logs, escrow disbursements, and field verification reports.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <StatusBadge label="Milestone M2 Live" variant="amber" size="md" icon="clock" />
        </div>
      </div>

      {/* Pilot Context Header */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
        <div className="space-y-1">
          <span className="text-[10px] uppercase font-bold text-[#1D64EC] tracking-wider block">Active Field Deployment</span>
          <h2 className="font-bold text-navy-900 text-sm">
            AI-based Water Leakage Detection – Pune Municipal Corporation (Zone A)
          </h2>
          <p className="text-slate-500 font-medium">
            Department: Maharashtra Water Supply & Sanitation • Contract Order: GR-MH/2026/WTR-994 • Grant Cap: INR 35.0 Lakhs
          </p>
        </div>
        <div className="flex items-center gap-6 bg-slate-50 p-3 px-4 rounded-xl border border-slate-100 shrink-0">
          <div>
            <span className="text-[10px] text-slate-400 font-bold block uppercase">Sensors Active</span>
            <strong className="text-base font-extrabold text-navy-900 font-display">320 Nodes</strong>
          </div>
          <div className="border-l border-slate-200 pl-6">
            <span className="text-[10px] text-slate-400 font-bold block uppercase">NRW Loss Reduction</span>
            <strong className="text-base font-extrabold text-emerald-700 font-display">18.4% Verified</strong>
          </div>
        </div>
      </div>

      {/* 2-Column: Milestone Submissions & Field Telemetry Status */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Milestone Submissions (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-navy-900 font-display">
                Milestone Deliverables & Escrow Tranches
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Submit evidence to trigger PFMS treasury milestone disbursements.
              </p>
            </div>
            <span className="text-xs font-bold text-slate-400">3-Stage Escrow</span>
          </div>

          <div className="space-y-4">
            
            {/* M1 – Deployment & Baseline */}
            <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-xs font-bold text-navy-900">M1 – Sensor Rigging & Baseline Calibration</h3>
                </div>
                <StatusBadge label="Completed & Paid" variant="emerald" size="sm" />
              </div>

              <div className="text-xs text-slate-600 pl-7 space-y-1 font-medium">
                <p>• Acoustic clamp sensor deployment report (320 nodes across 40 km pipeline)</p>
                <p>• Baseline municipal pressure & non-revenue water loss calibration data</p>
                <p>• LoRaWAN gateway integration sign-off with municipal SCADA</p>
              </div>

              <div className="pt-2 pl-7 border-t border-emerald-200/60 flex items-center justify-between text-[11px]">
                <span className="text-slate-500">Tranche Released: <strong className="text-emerald-800 font-bold">INR 10.5 Lakhs (30%)</strong></span>
                <span className="text-emerald-800 font-bold">Approved on 30 Oct 2026</span>
              </div>
            </div>

            {/* M2 – 3-month Performance Review */}
            <div className="p-5 rounded-2xl bg-white border-2 border-amber-300 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-amber-600" />
                  <h3 className="text-xs font-bold text-navy-900">M2 – 3-Month Continuous Performance Review</h3>
                </div>
                <StatusBadge label="Due in 5 days" variant="amber" size="sm" />
              </div>

              <div className="text-xs text-slate-700 pl-7 space-y-1 font-medium">
                <p className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Required Deliverables Checklist:</p>
                <p>1. 90-day continuous telemetry & acoustic leak logs export</p>
                <p>2. Verified leak resolution report vs alert notifications (38 leaks resolved)</p>
                <p>3. SCADA water loss pressure transient telemetry verification note</p>
              </div>

              {/* Upload Drag & Drop Area */}
              <div
                onClick={() => setIsUploadModalOpen(true)}
                className="mt-2 pl-7 p-4 rounded-2xl bg-amber-50/50 border border-dashed border-amber-400 hover:bg-amber-50 transition-colors cursor-pointer text-center space-y-1"
              >
                <Upload className="w-5 h-5 text-amber-600 mx-auto" />
                <p className="text-xs font-bold text-navy-900">Click to Upload Milestone Evidence</p>
                <p className="text-[10px] text-slate-500">Attach telemetry export PDF, verified leak logs (CSV), and audit notes</p>
              </div>

              <div className="pt-2 pl-7 flex items-center justify-between text-xs">
                <span className="font-extrabold text-navy-900 text-sm">Escrow Tranche: INR 14.0 Lakhs (40%)</span>
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(true)}
                  className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs flex items-center gap-1.5 transition-all"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Submit M2 Deliverables</span>
                </button>
              </div>
            </div>

            {/* M3 – Final Validation & Handover */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-500 font-bold text-xs flex items-center justify-center">3</span>
                  <h3 className="text-xs font-bold text-slate-500">M3 – Final Empirical Validation & Handover</h3>
                </div>
                <StatusBadge label="Pending M2" variant="slate" size="sm" />
              </div>
              <p className="text-xs text-slate-500 pl-7 leading-relaxed font-medium">
                Final empirical audit by the Maharashtra Water Quality & Loss Verification Board (Target: ≥20% non-revenue water reduction across 120 km network). Escrow Tranche: INR 10.5 Lakhs (30%).
              </p>
            </div>

          </div>
        </div>

        {/* Right: Live Field Telemetry & Verification Status (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-navy-900 font-display">
                Field Telemetry Status
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Live sensor network health and municipal alerts.</p>
            </div>
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200">
              <Radio className="w-3 h-3 text-emerald-600 animate-pulse" />
              Live
            </span>
          </div>

          {/* 4 Sensor Telemetry Stats */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Network Uptime</span>
              <strong className="text-base font-extrabold text-navy-900 font-display">99.4%</strong>
              <span className="text-[10px] text-emerald-700 font-semibold block">Last 90 Days</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Alert Latency</span>
              <strong className="text-base font-extrabold text-navy-900 font-display">&lt; 3.8 Mins</strong>
              <span className="text-[10px] text-slate-500 block">Sub-15 min SLA met</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Resolved Leaks</span>
              <strong className="text-base font-extrabold text-emerald-800 font-display">38 / 47</strong>
              <span className="text-[10px] text-slate-500 block">9 pending repair</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">SCADA Gateway</span>
              <strong className="text-base font-extrabold text-[#1D64EC] font-display">Connected</strong>
              <span className="text-[10px] text-emerald-700 font-semibold block">Pune Municipal GIS</span>
            </div>
          </div>

          {/* Recent Telemetry Alerts List */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Recent Field Telemetry Alerts</span>
            <div className="space-y-1.5 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                <div>
                  <span className="font-bold text-navy-900 block text-[11px]">Feeder #14 Acoustic Transient</span>
                  <span className="text-[10px] text-slate-500">Zone A • Sub-surface 4.2 bar drop</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Fixed
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                <div>
                  <span className="font-bold text-navy-900 block text-[11px]">Pressure Surge Damping #09</span>
                  <span className="text-[10px] text-slate-500">Zone A • High velocity transient alert</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Fixed
                </span>
              </div>
            </div>
          </div>

          {/* Documentation Action */}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <button
              type="button"
              onClick={() => {
                addNotification({
                  title: 'Telemetry Exported',
                  message: 'Exported 90-day SCADA sensor telemetry audit package (CSV/PDF).',
                  portal: 'startup',
                  type: 'info'
                });
              }}
              className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-[#1D64EC]" />
              <span>Export Raw Telemetry Logs (CSV)</span>
            </button>
          </div>
        </div>

      </div>

      {/* Deliverable Evidence Upload Modal */}
      <Modal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        title="Submit Evidence — Milestone M2 (3-Month Performance Review)"
        subtitle="Upload validated 90-day telemetry reports and leak resolution evidence"
        maxWidth="lg"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Performance Dashboard Export URL</label>
            <input
              type="text"
              value={proofUrl}
              onChange={(e) => setProofUrl(e.target.value)}
              className="w-full p-3 rounded-xl bg-white border border-slate-200 text-xs font-mono text-navy-900 outline-none focus:border-[#1D64EC]"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Evidence & Verification Notes</label>
            <textarea
              rows={3}
              value={proofNotes}
              onChange={(e) => setProofNotes(e.target.value)}
              className="w-full p-3 rounded-xl bg-white border border-slate-200 text-xs font-medium text-navy-900 outline-none focus:border-[#1D64EC]"
            />
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
            <span className="font-bold text-navy-900">Attached Files:</span>
            <div className="flex items-center gap-2 text-[11px] text-slate-600">
              <Paperclip className="w-3.5 h-3.5 text-[#1D64EC]" />
              <span>pune_zone_a_90days_telemetry_audit.pdf (2.4 MB)</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-600">
              <Paperclip className="w-3.5 h-3.5 text-[#1D64EC]" />
              <span>verified_leak_logs_38leaks.csv (140 KB)</span>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsUploadModalOpen(false)}
              className="px-5 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleUploadM2}
              className="px-7 py-2.5 rounded-full bg-[#1D64EC] hover:bg-blue-700 text-white font-bold text-xs shadow-xs flex items-center gap-1.5 transition-all"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Submit for Validation</span>
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
};
