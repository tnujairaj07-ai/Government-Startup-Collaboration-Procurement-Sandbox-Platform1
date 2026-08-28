import React, { useState, useMemo } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { 
  Activity, ShieldCheck, CheckCircle2, AlertTriangle, 
  Download, ArrowUpRight, Check, AlertCircle, FileText, 
  Sparkles, Flag, RefreshCw, Search, ArrowLeft, ChevronRight, 
  Building2, MapPin, SlidersHorizontal, Filter, X 
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid 
} from 'recharts';
import { StatusBadge } from '../common/StatusBadge';
import { MetricTile } from '../common/MetricTile';
import confetti from 'canvas-confetti';

interface PilotStartupItem {
  id: string;
  name: string;
  legalName: string;
  logo: string;
  initials: string;
  stage: 'Scaling' | 'In Pilot' | 'Early Traction' | 'Validation' | 'Pilot-ready';
  location: string;
  sector: string;
  pilotName: string;
  pilotCode: string;
  budget: string;
  progressPct: number;
  activeSensors: number;
  totalSensors: number;
  telemetryMetricLabel: string;
  telemetryMetricValue: string;
  targetMetricValue: string;
  alertsThisMonth: number;
  verifiedAlerts: number;
  falseAlerts: number;
  savingsOrImpact: string;
  milestones: {
    title: string;
    stage: string;
    amount: string;
    status: 'approved' | 'submitted' | 'pending';
    dateInfo: string;
    description: string;
  }[];
  risksAndIssues: string[];
  dataPoints: { time: string; value: number }[];
}

export const PilotTelemetryMonitor: React.FC = () => {
  const { telemetryFeeds, proposals, validateMilestoneM2, addNotification } = usePlatform();

  // Selected startup state (null = show grid list, string = show detail cockpit)
  const [selectedStartupId, setSelectedStartupId] = useState<string | null>(null);

  // Search & Filter state for grid list
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStageFilter, setSelectedStageFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('default');

  // Rich list of startups selected/sorted for pilot deployment
  const pilotStartups: PilotStartupItem[] = useMemo(() => {
    return proposals.filter(p => p.status === 'pilot_ongoing' || p.status === 'completed').map(p => ({
      id: p.id,
      name: p.startupName,
      legalName: `${p.startupName.toUpperCase()} PRIVATE LIMITED`,
      logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
      initials: p.startupName.slice(0, 2).toUpperCase(),
      stage: (p.status === 'completed' ? 'Scaling' : 'In Pilot') as 'Scaling' | 'In Pilot' | 'Early Traction' | 'Validation' | 'Pilot-ready',
      location: 'Maharashtra, India',
      sector: 'DeepTech & Public Innovation',
      pilotName: p.challengeTitle,
      pilotCode: `MHA-PILOT-${p.id}`,
      budget: 'INR 35.0 Lakhs',
      progressPct: 50,
      activeSensors: 100,
      totalSensors: 100,
      telemetryMetricLabel: 'Target Benchmark',
      telemetryMetricValue: '100%',
      targetMetricValue: '100%',
      alertsThisMonth: 0,
      verifiedAlerts: 0,
      falseAlerts: 0,
      savingsOrImpact: 'Verified Public Impact',
      milestones: [
        {
          title: 'M1 – Deployment & Baseline Data Calibration',
          stage: 'M1',
          amount: 'INR 10.5 Lakhs (30%)',
          status: 'approved',
          dateInfo: 'Completed',
          description: 'Sensor deployment and baseline calibration verification.'
        },
        {
          title: 'M2 – Performance Review & Telemetry Sign-off',
          stage: 'M2',
          amount: 'INR 14.0 Lakhs (40%)',
          status: 'submitted',
          dateInfo: 'In Progress',
          description: 'Live telemetry logs, field KPI validation, and milestone verification.'
        },
        {
          title: 'M3 – Final Validation & Handover',
          stage: 'M3',
          amount: 'INR 10.5 Lakhs (30%)',
          status: 'pending',
          dateInfo: 'Pending',
          description: 'Final audit report and state-wide scale recommendation.'
        }
      ],
      risksAndIssues: [],
      dataPoints: [
        { time: 'Day 10', value: 20 },
        { time: 'Day 20', value: 40 },
        { time: 'Day 30', value: 60 },
        { time: 'Day 45', value: 80 }
      ]
    }));
  }, [proposals]);

  // Filtered & sorted startup list
  const filteredStartups = useMemo(() => {
    let result = pilotStartups.filter(st => {
      const q = searchQuery.toLowerCase();
      const matchesSearch = st.name.toLowerCase().includes(q) ||
                            st.legalName.toLowerCase().includes(q) ||
                            st.location.toLowerCase().includes(q) ||
                            st.sector.toLowerCase().includes(q) ||
                            st.pilotName.toLowerCase().includes(q);

      const matchesStage = selectedStageFilter === 'All' || st.stage === selectedStageFilter;
      return matchesSearch && matchesStage;
    });

    if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'progress') {
      result.sort((a, b) => b.progressPct - a.progressPct);
    }

    return result;
  }, [pilotStartups, searchQuery, selectedStageFilter, sortBy]);

  // Selected startup object for detailed cockpit view
  const activeStartup = useMemo(() => {
    if (!selectedStartupId) return null;
    return pilotStartups.find(s => s.id === selectedStartupId) || pilotStartups[0];
  }, [selectedStartupId, pilotStartups]);

  // Actions inside detail cockpit
  const handleValidateM2 = () => {
    if (activeStartup) {
      addNotification({
        title: `Milestone M2 Approved: ${activeStartup.name}`,
        message: `Milestone M2 verified. Escrow release tranche initiated for ${activeStartup.name}.`,
        portal: 'both',
        type: 'success'
      });
      confetti({ particleCount: 90, spread: 75, origin: { y: 0.6 } });
    }
  };

  const handleFlagIssue = () => {
    if (activeStartup) {
      addNotification({
        title: `Notice Dispatched: ${activeStartup.name}`,
        message: `Department maintenance notice dispatched to ${activeStartup.name}.`,
        portal: 'both',
        type: 'warning'
      });
    }
  };

  const handleInitiateScale = () => {
    if (activeStartup) {
      addNotification({
        title: `Scale Discussion Initiated: ${activeStartup.name}`,
        message: `Fast-track scale proposal initiated on GeM portal for ${activeStartup.name}.`,
        portal: 'both',
        type: 'success'
      });
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Existing Header Banner (Always Preserved) */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="micro-label text-slate-400">Live Field Validation Hub</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 font-display">
            Work Area / Pilot Telemetry Monitor
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Active project monitoring, milestone sign-off, live sensor telemetry, and escrow stake tracking for deployed pilots.
          </p>
        </div>

        {selectedStartupId && (
          <button
            onClick={() => setSelectedStartupId(null)}
            className="px-4 py-2 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Startups</span>
          </button>
        )}
      </div>

      {/* VIEW 1: STARTUP-WISE GRID LIST (Matching User Reference Image) */}
      {!selectedStartupId && (
        <div className="space-y-6">
          
          {/* Top Search & Filter Bar (Matching Reference Layout) */}
          <div className="glass-panel rounded-2xl p-4 space-y-3">
            <div className="flex flex-col md:flex-row items-center gap-3">
              
              {/* Search Bar with Clear 'X' */}
              <div className="flex-1 w-full relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search startups by name, sector, location, or pilot challenge..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-navy-900 outline-none focus:border-[#1D64EC] focus:bg-white placeholder:text-slate-400 transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="w-5 h-5 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center text-xs font-bold"
                  >
                    ×
                  </button>
                )}
              </div>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
                <span className="text-xs font-semibold text-slate-600 whitespace-nowrap">Sort By</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-navy-900 outline-none focus:border-[#1D64EC] focus:bg-white cursor-pointer min-w-[140px]"
                >
                  <option value="default">Select Sort</option>
                  <option value="name">Startup Name (A-Z)</option>
                  <option value="progress">Pilot Progress %</option>
                </select>
              </div>

            </div>

            {/* Filter Tags: Maharashtra + Clear All */}
            <div className="flex items-center gap-2 pt-1 border-t border-slate-100/80">
              <span className="px-3 py-1 rounded-md bg-[#1D64EC]/10 text-[#1D64EC] border border-[#1D64EC]/20 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                <span>MAHARASHTRA</span>
                <span className="cursor-pointer font-extrabold hover:text-navy-900">×</span>
              </span>

              <span className="px-3 py-1 rounded-md bg-blue-50 text-slate-700 border border-slate-200 text-[11px] font-bold uppercase tracking-wider">
                ACTIVE PILOTS ({filteredStartups.length})
              </span>

              {(searchQuery || selectedStageFilter !== 'All') && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedStageFilter('All');
                    setSortBy('default');
                  }}
                  className="px-3 py-1 rounded-md bg-[#1D64EC] hover:bg-brand-cobalt text-white text-[11px] font-bold uppercase tracking-wider transition-colors ml-auto"
                >
                  CLEAR ALL FILTERS
                </button>
              )}
            </div>
          </div>

          {/* 3-Column Startup Card Grid or Clean Empty State */}
          {filteredStartups.length === 0 ? (
            <div className="glass-panel rounded-3xl p-16 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#1D64EC] flex items-center justify-center mx-auto">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-navy-900">No Active Pilots Deployed</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Once startup problem proposals receive expert clearance and bilateral pilot agreements are approved, live telemetry monitoring will appear here.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStartups.map(startup => (
                <div
                  key={startup.id}
                  onClick={() => setSelectedStartupId(startup.id)}
                  className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-[#1D64EC] transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div>
                    {/* Card Header: Avatar + Title + Stage + Location */}
                    <div className="flex items-start gap-3.5 mb-4">
                      {startup.logo ? (
                        <img
                          src={startup.logo}
                          alt={startup.name}
                          className="w-12 h-12 rounded-full object-cover border border-slate-200 shadow-xs shrink-0"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 text-navy-900 font-extrabold text-xs flex items-center justify-center shrink-0">
                          {startup.initials}
                        </div>
                      )}

                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-xs text-navy-900 leading-snug group-hover:text-[#1D64EC] transition-colors line-clamp-2 uppercase">
                          {startup.legalName || startup.name}
                        </h3>
                        <p className="text-xs font-semibold text-slate-500 mt-1">
                          {startup.stage}
                        </p>
                        <p className="text-[11px] text-slate-400 font-medium mt-0.5 truncate">
                          {startup.location}
                        </p>
                      </div>
                    </div>

                    {/* Progress & Live Telemetry Snippet */}
                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-2 mb-4">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-semibold text-slate-600">Pilot Milestone Progress</span>
                        <strong className="text-navy-900 font-bold">{startup.progressPct}%</strong>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
                        <div 
                          className="h-full bg-[#1D64EC] rounded-full transition-all duration-500"
                          style={{ width: `${startup.progressPct}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-[11px] pt-1">
                        <span className="text-slate-500 truncate">{startup.telemetryMetricLabel}</span>
                        <span className="font-bold text-emerald-700">{startup.telemetryMetricValue}</span>
                      </div>
                    </div>

                  </div>

                  {/* Card Sub-Panel / Sector Footer */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-medium text-slate-500">
                      {startup.sector}
                    </span>

                    <div className="flex items-center gap-1 text-[11px] font-bold text-[#1D64EC] group-hover:translate-x-0.5 transition-transform">
                      <span>View Pilot Monitor</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}

        </div>
      )}

      {/* VIEW 2: INDIVIDUAL STARTUP PILOT TELEMETRY & STAKE TRACKING COCKPIT */}
      {selectedStartupId && activeStartup && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* Startup Pilot Overview Badge */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={activeStartup.logo}
                alt={activeStartup.name}
                className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shadow-xs shrink-0"
              />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#1D64EC] font-mono text-[10px] font-bold border border-blue-100">
                    {activeStartup.pilotCode}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">{activeStartup.sector}</span>
                </div>
                <h2 className="text-xl font-extrabold text-navy-900 font-display">
                  {activeStartup.pilotName}
                </h2>
                <p className="text-xs text-slate-600 font-medium mt-0.5">
                  Deploying Entity: <strong className="text-navy-900">{activeStartup.legalName}</strong> • {activeStartup.location}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
              <div className="px-4 py-2 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-navy-900">
                Grant Allocation: <span className="text-[#1D64EC] font-extrabold">{activeStartup.budget}</span>
              </div>
              <StatusBadge label={activeStartup.stage} variant="emerald" size="md" icon="check" />
            </div>
          </div>

          {/* 4 Live KPIs (MetricTile) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricTile
              label={activeStartup.telemetryMetricLabel}
              value={activeStartup.telemetryMetricValue}
              subValue={`Target: ≥${activeStartup.targetMetricValue} by Month 6`}
              variant="white"
              trend={{ direction: 'up', percentage: activeStartup.telemetryMetricValue, text: 'verified' }}
              timeframe="Live Calibrated"
            />

            <MetricTile
              label="Active Sensor Nodes"
              value={`${activeStartup.activeSensors} / ${activeStartup.totalSensors}`}
              subValue="Real-time telemetry uplink"
              variant="white"
              trend={{ direction: 'up', percentage: '98.2%', text: 'uptime' }}
              timeframe="LoRa Mesh"
            />

            <MetricTile
              label="Alerts This Month"
              value={activeStartup.alertsThisMonth}
              subValue={`${activeStartup.verifiedAlerts} verified, ${activeStartup.falseAlerts} false alarms`}
              variant="white"
              trend={{ direction: 'up', percentage: `${((activeStartup.verifiedAlerts / activeStartup.alertsThisMonth) * 100).toFixed(0)}%`, text: 'precision' }}
              timeframe="AI Edge Filtered"
            />

            <MetricTile
              label="Estimated Value / Impact"
              value={activeStartup.savingsOrImpact}
              subValue="Quantified outcome to department"
              variant="white"
              trend={{ direction: 'up', percentage: 'Positive', text: 'impact' }}
              timeframe="Pilot Ward"
            />
          </div>

          {/* Telemetry Graphs Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left: Time-series Trajectory (8 cols) */}
            <div className="lg:col-span-8 glass-panel rounded-3xl p-6 sm:p-8 shadow-glass space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-base font-bold text-navy-900 font-display">
                    {activeStartup.telemetryMetricLabel} Trajectory (Live Telemetry)
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">Continuous acoustic pressure sampling calibrated across pilot network</p>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold">
                  <span className="w-3 h-3 rounded-full bg-[#1D64EC]" />
                  <span className="text-slate-700">Achieved ({activeStartup.telemetryMetricValue})</span>
                  <span className="w-3 h-3 rounded-full bg-emerald-500 ml-2" />
                  <span className="text-slate-700">Target (≥{activeStartup.targetMetricValue})</span>
                </div>
              </div>

              <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={activeStartup.dataPoints} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="startupTelemetryGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1D64EC" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#1D64EC" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" opacity={0.6} />
                    <XAxis dataKey="time" tick={{ fill: '#64748B', fontSize: 11 }} />
                    <YAxis tick={{ fill: '#64748B', fontSize: 11 }} />
                    <Tooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-md text-xs">
                              <p className="font-bold text-navy-900 mb-1">{label}</p>
                              <p className="text-[#1D64EC] font-semibold">{activeStartup.telemetryMetricLabel}: {payload[0]?.value}%</p>
                              <p className="text-slate-500">Target: ≥{activeStartup.targetMetricValue}</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Area type="monotone" dataKey="value" stroke="#1D64EC" strokeWidth={2.5} fillOpacity={1} fill="url(#startupTelemetryGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Right: Alert Breakdown Bar Chart (4 cols) */}
            <div className="lg:col-span-4 glass-panel rounded-3xl p-6 shadow-glass space-y-4 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-navy-900 font-display">
                  Alert Breakdown & Precision
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">{activeStartup.verifiedAlerts} Verified vs {activeStartup.falseAlerts} False Alarms</p>

                <div className="mt-4 space-y-3 text-xs">
                  <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                    <span className="font-bold text-emerald-900">Verified Incident Alerts</span>
                    <span className="text-sm font-extrabold text-emerald-700 font-display">{activeStartup.verifiedAlerts}</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between">
                    <span className="font-bold text-amber-900">False Noise Alarms</span>
                    <span className="text-sm font-extrabold text-amber-700 font-display">{activeStartup.falseAlerts}</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <span className="font-bold text-slate-700">Detection Accuracy</span>
                    <span className="text-sm font-extrabold text-[#1D64EC] font-display">
                      {((activeStartup.verifiedAlerts / activeStartup.alertsThisMonth) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-100 text-[11px] text-slate-600">
                <span className="font-bold text-navy-900">SCADA Bridge: </span>
                Streaming active sensor telemetry at 15-minute sync interval.
              </div>
            </div>

          </div>

          {/* Milestone Stake Tracker (Escrow Tranches) */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8 shadow-glass space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-navy-900 font-display">
                  Milestone Stake Tracker & Escrow Tranches
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">Validate uploaded deliverable evidence to release escrow payments</p>
              </div>
              <span className="text-xs font-extrabold text-navy-900">Total Grant: {activeStartup.budget}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {activeStartup.milestones.map((ms, idx) => (
                <div
                  key={idx}
                  className={`p-5 rounded-2xl border space-y-2 ${
                    ms.status === 'approved' ? 'bg-emerald-50/60 border-emerald-200' :
                    ms.status === 'submitted' ? 'bg-purple-50/70 border-purple-200' :
                    'bg-white border-slate-200/80'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {ms.status === 'approved' ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      ) : ms.status === 'submitted' ? (
                        <Activity className="w-5 h-5 text-purple-600 shrink-0" />
                      ) : (
                        <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-400 font-bold text-xs flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                      )}
                      <h4 className="text-xs font-bold text-navy-900">{ms.title}</h4>
                    </div>

                    <StatusBadge
                      label={ms.status === 'approved' ? 'Completed & Paid' : ms.status === 'submitted' ? 'Evidence In Review' : 'Pending'}
                      variant={ms.status === 'approved' ? 'emerald' : ms.status === 'submitted' ? 'violet' : 'slate'}
                      size="sm"
                    />
                  </div>

                  <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                    {ms.description}
                  </p>

                  <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                    <span className="font-bold text-navy-900">{ms.amount}</span>
                    <span className="text-slate-500 font-medium">{ms.dateInfo}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Risks & Issues + Action Controls */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Risks & Issues Log */}
            <div className="lg:col-span-7 glass-panel rounded-3xl p-6 shadow-glass space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h4 className="text-sm font-bold text-navy-900 font-display flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  <span>Risks & Operational Issues</span>
                </h4>
                <span className="micro-label text-slate-400">Live Field Log</span>
              </div>

              <div className="space-y-2 text-xs">
                {activeStartup.risksAndIssues.map((issue, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-amber-50/60 border border-amber-200/80 text-amber-900 flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                    <span className="font-medium leading-relaxed">{issue}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Department Actions */}
            <div className="lg:col-span-5 glass-panel rounded-3xl p-6 shadow-glass flex flex-col justify-between space-y-3">
              <div>
                <span className="micro-label text-slate-400 block mb-2">Department Authorizations</span>
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={handleValidateM2}
                    className="w-full py-2.5 rounded-full bg-[#1D64EC] hover:bg-brand-cobalt text-white font-bold text-xs shadow-sm flex items-center justify-center gap-1.5 transition-all hover:scale-[1.02]"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Validate Milestone M2 (Release Escrow)</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleInitiateScale}
                    className="w-full py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-1.5 transition-all hover:scale-[1.02]"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Initiate Statewide Scale (GeM)</span>
                  </button>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      type="button"
                      onClick={handleFlagIssue}
                      className="py-2 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold text-xs border border-amber-200 flex items-center justify-center gap-1 transition-colors"
                    >
                      <Flag className="w-3.5 h-3.5" />
                      <span>Flag Issue</span>
                    </button>

                    <button
                      type="button"
                      className="py-2 rounded-full bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs border border-slate-200 flex items-center justify-center gap-1 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Audit Report (PDF)</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
