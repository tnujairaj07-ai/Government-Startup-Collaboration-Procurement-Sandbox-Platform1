import React, { useState, useMemo } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { 
  Bot, Sparkles, Sliders, ArrowRight, ArrowLeft, Search, Filter, 
  CheckCircle2, AlertTriangle, ShieldCheck, Download, FileText, 
  ChevronRight, ExternalLink, RefreshCw, Send, Check, X, 
  Layers, BarChart3, Shield, BookOpen, Eye, Award, HelpCircle, 
  ChevronDown, ChevronUp, Clock 
} from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';
import confetti from 'canvas-confetti';

interface DimensionEvaluation {
  name: string;
  key: string;
  weight: number;
  score: number;
  explanation: string;
  evidenceLinks: { label: string; docName: string }[];
}

interface RankedStartup {
  id: string;
  rank: number;
  name: string;
  legalName: string;
  logo: string;
  overallScore: number;
  suitabilityLabel: 'High Suitability' | 'Moderate Suitability' | 'Low Suitability';
  relevanceScore: number;
  evidenceScore: number;
  evidenceLevel: string;
  pilotReadinessScore: number;
  pilotReadinessLabel: 'High' | 'Medium' | 'Low';
  securityScore: number;
  securityStatus: 'Compliant' | 'Partial' | 'Gaps';
  keyStrengths: string[];
  keyRisks: string[];
  recommendation: 'Shortlist for Expert Review' | 'Keep as Backup' | 'Do Not Shortlist';
  narrativeSummary: string;
  aiRecommendationRationale: string;
  dimensions: DimensionEvaluation[];
}

interface ProblemStatementOption {
  id: string;
  psCode: string;
  title: string;
  department: string;
  status: 'Published' | 'Draft' | 'In Pilot';
  description: string;
  totalStartupsCount: number;
  shortlistedCount: number;
  startups: RankedStartup[];
}

export const AIEvaluator: React.FC = () => {
  const { challenges, proposals, setActiveTab, addNotification } = usePlatform();

  // Navigation State: null = Home / PS Selection, string = Selected PS Results View
  const [selectedPSId, setSelectedPSId] = useState<string | null>(null);

  // Home Page Search & Filter State
  const [psSearchQuery, setPsSearchQuery] = useState('');
  const [psDeptFilter, setPsDeptFilter] = useState('All');

  // AI Results Filter & Slider State
  const [minScoreFilter, setMinScoreFilter] = useState<number>(60);
  const [evidenceLevelFilter, setEvidenceLevelFilter] = useState<string>('All');
  const [readinessFilter, setReadinessFilter] = useState<string>('All');
  const [startupSearchQuery, setStartupSearchQuery] = useState('');

  // Weight Adjustment Advanced Drawer Toggle
  const [isWeightAdjustmentOpen, setIsWeightAdjustmentOpen] = useState(false);

  // Drilldown Modal: AI Scorecard Modal
  const [scorecardStartup, setScorecardStartup] = useState<RankedStartup | null>(null);

  // Shortlist Handoff Confirmation Modal
  const [isHandoffModalOpen, setIsHandoffModalOpen] = useState(false);

  // Simulation Running State
  const [isEvaluating, setIsEvaluating] = useState(false);

  // 10 Dimensions & Default Weights
  const [dimensionWeights, setDimensionWeights] = useState([
    { name: 'Problem/solution relevance', key: 'relevance', weight: 20 },
    { name: 'Capability/technology match', key: 'techMatch', weight: 15 },
    { name: 'Expected outcome fit', key: 'outcomeFit', weight: 15 },
    { name: 'Evidence strength', key: 'evidence', weight: 10 },
    { name: 'Relevant past experience', key: 'experience', weight: 10 },
    { name: 'Pilot readiness', key: 'readiness', weight: 10 },
    { name: 'Scalability & replicability', key: 'scalability', weight: 5 },
    { name: 'Cost/value proposition', key: 'costValue', weight: 5 },
    { name: 'Security, privacy, compliance', key: 'security', weight: 10 },
    { name: 'Risk & operational profile', key: 'riskProfile', weight: 5 }
  ]);

  // PS Dataset derived from context challenges
  const psList = useMemo<ProblemStatementOption[]>(() => {
    return challenges.map(ch => ({
      id: ch.id,
      psCode: ch.code || ch.id,
      title: ch.title,
      department: ch.department,
      status: (ch.status === 'Open' ? 'Published' : 'Draft') as 'Published' | 'Draft' | 'In Pilot',
      description: ch.description,
      totalStartupsCount: ch.matchedStartupsCount || 0,
      shortlistedCount: ch.proposalsCount || 0,
      startups: []
    }));
  }, [challenges]);

  // Selected Problem Statement
  const currentPS = useMemo(() => {
    return psList.find(p => p.id === selectedPSId) || psList[0];
  }, [selectedPSId, psList]);

  // Filtered PS Options on Landing Page
  const filteredPSOptions = useMemo(() => {
    return psList.filter(ps => {
      const q = psSearchQuery.toLowerCase();
      const matchesSearch = ps.title.toLowerCase().includes(q) || ps.psCode.toLowerCase().includes(q) || ps.department.toLowerCase().includes(q);
      const matchesDept = psDeptFilter === 'All' || ps.department === psDeptFilter;
      return matchesSearch && matchesDept;
    });
  }, [psList, psSearchQuery, psDeptFilter]);

  // Filtered Ranked Startups in Results Table
  const filteredStartups = useMemo(() => {
    if (!currentPS || !currentPS.startups) return [];
    return currentPS.startups.filter(s => {
      const matchesScore = s.overallScore >= minScoreFilter;
      const matchesReadiness = readinessFilter === 'All' || s.pilotReadinessLabel === readinessFilter;
      const matchesSearch = s.name.toLowerCase().includes(startupSearchQuery.toLowerCase()) || s.legalName.toLowerCase().includes(startupSearchQuery.toLowerCase());
      return matchesScore && matchesReadiness && matchesSearch;
    });
  }, [currentPS, minScoreFilter, readinessFilter, startupSearchQuery]);

  // Run AI Evaluation Trigger (Simulated with animation)
  const handleRunEvaluation = (psId: string) => {
    setIsEvaluating(true);
    setTimeout(() => {
      setIsEvaluating(false);
      setSelectedPSId(psId);
      addNotification({
        title: 'AI Evaluation Complete',
        message: `Processed 42 registered startups across 10 evaluation dimensions. Shortlist generated.`,
        portal: 'both',
        type: 'success'
      });
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    }, 900);
  };

  // User override recommendations store
  const [recommendations, setRecommendations] = useState<Record<string, 'Shortlist for Expert Review' | 'Keep as Backup' | 'Do Not Shortlist'>>({});

  // Change Recommendation for a Startup
  const handleRecommendationChange = (startupId: string, rec: 'Shortlist for Expert Review' | 'Keep as Backup' | 'Do Not Shortlist') => {
    setRecommendations(prev => ({ ...prev, [startupId]: rec }));
  };

  // Confirm Handoff to Expert Evaluation
  const handleConfirmHandoff = () => {
    const shortlistedCount = currentPS.startups.filter(s => s.recommendation === 'Shortlist for Expert Review').length;
    
    addNotification({
      title: 'Shortlist Sent to Expert Evaluation',
      message: `Successfully transferred ${shortlistedCount} AI-shortlisted startup(s) for ${currentPS.psCode} to the Expert Evaluation panel.`,
      portal: 'both',
      type: 'success'
    });

    confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
    setIsHandoffModalOpen(false);
    setActiveTab('expert_clearance');
  };

  const handleExportShortlist = (format: 'PDF' | 'CSV') => {
    addNotification({
      title: `Shortlist Export Initiated (${format})`,
      message: `Exporting 10-dimension AI suitability scorecard and ranked shortlist for ${currentPS.psCode}.`,
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
            <span className="micro-label text-slate-400">10-Dimension AI Evaluation Engine</span>
            <span className="w-2 h-2 rounded-full bg-[#1D64EC]" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 font-display flex items-center gap-2.5">
            <Bot className="w-7 h-7 text-[#1D64EC]" />
            <span>AI Evaluator</span>
          </h1>
          <p className="text-xs text-slate-600 mt-1 max-w-3xl">
            AI-assisted shortlisting and multi-dimensional suitability ranking of startups for state problem statements.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-2xl bg-white border border-slate-200 text-xs font-bold text-navy-900 shadow-xs flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span>10 Evaluation Dimensions Active</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PAGE 1: HOME / SELECT PROBLEM STATEMENT */}
      {/* ========================================================================= */}
      {!selectedPSId && (
        <div className="space-y-6 animate-in fade-in duration-150">
          
          {/* Search & Filter Bar */}
          <div className="glass-panel rounded-2xl p-4 flex flex-col md:flex-row items-center gap-3">
            <div className="flex-1 w-full relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search problem statements by keyword or department..."
                value={psSearchQuery}
                onChange={(e) => setPsSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-navy-900 outline-none focus:border-[#1D64EC] focus:bg-white placeholder:text-slate-400 transition-colors"
              />
            </div>

            <select
              value={psDeptFilter}
              onChange={(e) => setPsDeptFilter(e.target.value)}
              className="px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-navy-900 outline-none focus:border-[#1D64EC] cursor-pointer w-full md:w-auto"
            >
              <option value="All">All Departments</option>
              <option value="Maharashtra Water Supply & Sanitation Department">Water Supply</option>
              <option value="Environment & Climate Change Department">Environment</option>
              <option value="Disaster Management Department">Disaster Management</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-navy-900 font-display">
                Select a Problem Statement
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Choose a challenge call to trigger the 10-dimension AI shortlisting engine across all registered startups.
              </p>
            </div>
            <span className="text-xs font-bold text-slate-400">
              {filteredPSOptions.length} Challenge Calls Available
            </span>
          </div>

          {/* PS Selection Grid or Clean Empty State */}
          {filteredPSOptions.length === 0 ? (
            <div className="py-16 px-4 text-center rounded-3xl border border-dashed border-slate-200 bg-white space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#1D64EC] flex items-center justify-center mx-auto text-xl font-bold">
                <Bot className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-sm text-navy-900">No Problem Statements Available for AI Evaluation</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Once problem statements are created and published, the 10-dimension AI evaluation engine will automatically rank candidate startups.
              </p>
              <button
                type="button"
                onClick={() => setActiveTab('challenges')}
                className="px-5 py-2 rounded-full bg-[#1D64EC] hover:bg-blue-700 text-white font-bold text-xs shadow-2xs inline-flex items-center gap-1.5 mt-2"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Create Problem Statement</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPSOptions.map((ps) => (
                <div
                  key={ps.id}
                  className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-[#1D64EC]/40 transition-all flex flex-col justify-between group space-y-4"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="font-mono text-[11px] font-bold text-[#1D64EC] uppercase">
                        {ps.psCode} • {ps.department.split(' ')[1] || 'State'}
                      </span>
                      <StatusBadge label={ps.status} variant="blue" size="sm" />
                    </div>

                    <h3 className="font-bold text-base text-navy-900 group-hover:text-[#1D64EC] transition-colors leading-snug">
                      {ps.title}
                    </h3>

                    <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed font-medium">
                      {ps.description}
                    </p>

                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 mt-4 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Candidate Pool</span>
                        <strong className="text-navy-900">{ps.totalStartupsCount} Startups</strong>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">AI Shortlist</span>
                        <strong className="text-[#1D64EC]">{ps.shortlistedCount} Recommended</strong>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => handleRunEvaluation(ps.id)}
                      disabled={isEvaluating}
                      className="w-full py-2.5 rounded-full bg-[#1D64EC] hover:bg-brand-cobalt text-white font-bold text-xs shadow-sm flex items-center justify-center gap-2 transition-all hover:scale-[1.02] disabled:opacity-50"
                    >
                      {isEvaluating ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Evaluating Multi-Dimensions...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" />
                          <span>Run AI Evaluation</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 text-xs text-slate-600 leading-relaxed font-medium">
            <strong>System Notice:</strong> AI evaluates all registered startups against the selected problem statement using relevance, technology fit, evidence strength, pilot readiness, security, and other dimensions. The output is a ranked shortlist with explanations, not a final decision.
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* PAGE 2 & 3: AI EVALUATION RESULTS & RANKED STARTUPS LIST */}
      {/* ========================================================================= */}
      {selectedPSId && currentPS && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* Breadcrumb & Navigation Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <button 
                onClick={() => setSelectedPSId(null)}
                className="hover:text-[#1D64EC] transition-colors"
              >
                AI Evaluator
              </button>
              <span>→</span>
              <span className="text-navy-900 font-bold">{currentPS.psCode}: {currentPS.title}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleExportShortlist('PDF')}
                className="px-3.5 py-1.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 flex items-center gap-1.5 shadow-2xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Shortlist</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedPSId(null)}
                className="px-4 py-1.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 flex items-center gap-1 shadow-xs"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Change PS</span>
              </button>
            </div>
          </div>

          {/* Results Header Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#1D64EC] font-mono text-[10px] font-bold border border-blue-100">
                  {currentPS.psCode} • {currentPS.department}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>Evaluation Complete</span>
                </span>
              </div>
              <h2 className="text-2xl font-extrabold text-navy-900 font-display">
                AI Evaluation Results – {currentPS.psCode}
              </h2>
              <p className="text-xs text-slate-600 mt-1 max-w-2xl font-medium">
                {currentPS.description}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsHandoffModalOpen(true)}
              className="px-6 py-2.5 rounded-full bg-[#1D64EC] hover:bg-brand-cobalt text-white font-bold text-xs shadow-sm flex items-center gap-2 transition-all hover:scale-[1.02] shrink-0"
            >
              <span>Send Top Shortlist to Expert Evaluation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Section A: Evaluation Summary Cards (5 Cards) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
            <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Startups Evaluated</span>
              <div className="text-2xl font-extrabold text-navy-900 font-display">42</div>
              <p className="text-[10px] text-slate-500 font-medium mt-0.5">Across all domains</p>
            </div>

            <div className="p-4 rounded-3xl bg-white border border-purple-200 shadow-xs bg-purple-50/20">
              <span className="text-[10px] font-bold text-purple-700 uppercase tracking-wider block mb-1">AI Shortlisted</span>
              <div className="text-2xl font-extrabold text-purple-900 font-display">7</div>
              <p className="text-[10px] text-purple-700 font-medium mt-0.5">Score ≥ 75 / 100</p>
            </div>

            <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">High Relevance</span>
              <div className="text-2xl font-extrabold text-navy-900 font-display">12</div>
              <p className="text-[10px] text-slate-500 font-medium mt-0.5">Relevance ≥ 80%</p>
            </div>

            <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">High Evidence</span>
              <div className="text-2xl font-extrabold text-navy-900 font-display">5</div>
              <p className="text-[10px] text-slate-500 font-medium mt-0.5">Evidence Level ≥ 3</p>
            </div>

            <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Pilot-Ready</span>
              <div className="text-2xl font-extrabold text-navy-900 font-display">9</div>
              <p className="text-[10px] text-slate-500 font-medium mt-0.5">Readiness ≥ 85%</p>
            </div>
          </div>

          {/* Section B: AI Scoring Model (10 Dimensions with Weight Adjustment Drawer) */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-navy-900 font-display">
                  AI Scoring Model – {currentPS.psCode}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  10-dimension algorithmic weights used to calculate the overall suitability score.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsWeightAdjustmentOpen(!isWeightAdjustmentOpen)}
                className="px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors"
              >
                <Sliders className="w-3.5 h-3.5 text-[#1D64EC]" />
                <span>{isWeightAdjustmentOpen ? 'Hide Weight Adjustment' : 'Adjust Weights (Advanced)'}</span>
                {isWeightAdjustmentOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* 10 Dimensions Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-xs">
              {dimensionWeights.map((dim) => (
                <div key={dim.key} className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                  <span className="text-[10px] font-bold text-[#1D64EC] uppercase tracking-wider block">
                    {dim.weight}% Weight
                  </span>
                  <p className="font-bold text-navy-900 leading-snug">{dim.name}</p>
                </div>
              ))}
            </div>

            {/* Advanced Weight Slider Drawer */}
            {isWeightAdjustmentOpen && (
              <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-200/80 space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-navy-900">Custom Dimension Weight Tuning:</span>
                  <button
                    type="button"
                    onClick={() => {
                      addNotification({ title: 'Weights Recalibrated', message: 'Startup rankings recalculated based on new dimension weights.', portal: 'gov', type: 'info' });
                    }}
                    className="px-3 py-1 rounded-full bg-[#1D64EC] text-white font-bold text-[11px] shadow-2xs"
                  >
                    Apply & Re-rank
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                  {dimensionWeights.map((dim, idx) => (
                    <div key={dim.key} className="p-2.5 rounded-xl bg-white border border-slate-200 space-y-1">
                      <div className="flex items-center justify-between font-semibold text-slate-700">
                        <span className="truncate">{dim.name}</span>
                        <strong className="text-[#1D64EC] font-mono">{dim.weight}%</strong>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="40"
                        value={dim.weight}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setDimensionWeights(prev => prev.map((d, i) => i === idx ? { ...d, weight: val } : d));
                        }}
                        className="w-full accent-[#1D64EC] cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <p className="text-[11px] text-slate-500 leading-relaxed">
              The AI uses these dimensions to compute an overall suitability score (0–100) for each startup. Scores are accompanied by explanations and evidence references.
            </p>
          </div>

          {/* Section C: AI-Ranked Startups Table (Core Screen) */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
            
            {/* Table Filter Controls */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-navy-900 font-display">
                  AI-Ranked Startups – {currentPS.psCode}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Click any startup or "View AI Scorecard" to examine the 10-dimension explainability breakdown.
                </p>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-2.5 text-xs w-full lg:w-auto">
                <div className="relative flex-1 sm:w-48">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search startups..."
                    value={startupSearchQuery}
                    onChange={(e) => setStartupSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-navy-900 outline-none focus:border-[#1D64EC]"
                  />
                </div>

                <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1 rounded-xl">
                  <span className="text-[11px] text-slate-500 font-medium">Min Score:</span>
                  <select
                    value={minScoreFilter}
                    onChange={(e) => setMinScoreFilter(Number(e.target.value))}
                    className="bg-transparent font-bold text-navy-900 outline-none cursor-pointer"
                  >
                    <option value={50}>≥ 50</option>
                    <option value={60}>≥ 60</option>
                    <option value={70}>≥ 70</option>
                    <option value={80}>≥ 80</option>
                  </select>
                </div>

                <select
                  value={readinessFilter}
                  onChange={(e) => setReadinessFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 font-semibold text-navy-900 outline-none cursor-pointer"
                >
                  <option value="All">All Pilot Readiness</option>
                  <option value="High">High Readiness</option>
                  <option value="Medium">Medium Readiness</option>
                  <option value="Low">Low Readiness</option>
                </select>
              </div>
            </div>

            {/* Main Startups Table */}
            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-navy-900 border-b border-slate-200">
                    <th className="py-3.5 px-3 font-bold text-center">Rank</th>
                    <th className="py-3.5 px-4 font-bold">Startup</th>
                    <th className="py-3.5 px-3 font-bold text-center">Overall</th>
                    <th className="py-3.5 px-3 font-bold text-center">Relevance</th>
                    <th className="py-3.5 px-3 font-bold">Evidence</th>
                    <th className="py-3.5 px-3 font-bold">Pilot Ready</th>
                    <th className="py-3.5 px-3 font-bold">Security</th>
                    <th className="py-3.5 px-4 font-bold min-w-[180px]">Key Strengths (AI)</th>
                    <th className="py-3.5 px-4 font-bold min-w-[180px]">Key Risks (AI)</th>
                    <th className="py-3.5 px-3 font-bold">Recommendation</th>
                    <th className="py-3.5 px-4 font-bold text-right min-w-[150px]">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredStartups.map((st) => (
                    <tr key={st.id} className="hover:bg-blue-50/40 transition-colors">
                      
                      {/* Rank */}
                      <td className="py-4 px-3 text-center whitespace-nowrap">
                        <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-800 font-extrabold text-xs inline-flex items-center justify-center">
                          #{st.rank}
                        </span>
                      </td>

                      {/* Startup Name */}
                      <td className="py-4 px-4 font-bold text-navy-900 whitespace-nowrap">
                        <div 
                          onClick={() => setScorecardStartup(st)}
                          className="flex items-center gap-2.5 cursor-pointer hover:text-[#1D64EC] transition-colors"
                        >
                          <img src={st.logo} alt={st.name} className="w-8 h-8 rounded-xl object-cover border border-slate-200 shrink-0" />
                          <div>
                            <span className="block leading-snug">{st.name}</span>
                            <span className="text-[10px] text-slate-400 font-normal block">{st.legalName.split(' ')[0]}</span>
                          </div>
                        </div>
                      </td>

                      {/* Overall Suitability */}
                      <td className="py-4 px-3 text-center whitespace-nowrap">
                        <span className={`px-2.5 py-1 rounded-full font-extrabold text-xs ${
                          st.overallScore >= 80 ? 'bg-emerald-100 text-emerald-900' :
                          st.overallScore >= 70 ? 'bg-amber-100 text-amber-900' : 'bg-rose-100 text-rose-900'
                        }`}>
                          {st.overallScore}/100
                        </span>
                      </td>

                      {/* Relevance */}
                      <td className="py-4 px-3 text-center whitespace-nowrap font-bold text-navy-900">
                        {st.relevanceScore}%
                      </td>

                      {/* Evidence */}
                      <td className="py-4 px-3 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-800 border border-blue-200 text-[10px] font-bold block w-max">
                          {st.evidenceLevel}
                        </span>
                      </td>

                      {/* Pilot Ready */}
                      <td className="py-4 px-3 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                          st.pilotReadinessLabel === 'High' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' :
                          st.pilotReadinessLabel === 'Medium' ? 'bg-amber-50 text-amber-800 border border-amber-200' : 'bg-rose-50 text-rose-800 border border-rose-200'
                        }`}>
                          {st.pilotReadinessLabel} ({st.pilotReadinessScore}%)
                        </span>
                      </td>

                      {/* Security */}
                      <td className="py-4 px-3 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                          st.securityStatus === 'Compliant' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' :
                          st.securityStatus === 'Partial' ? 'bg-amber-50 text-amber-800 border border-amber-200' : 'bg-rose-50 text-rose-800 border border-rose-200'
                        }`}>
                          {st.securityStatus}
                        </span>
                      </td>

                      {/* Key Strengths */}
                      <td className="py-4 px-4 text-slate-700 font-medium">
                        <ul className="list-disc list-inside space-y-0.5 text-[11px]">
                          {st.keyStrengths.map((str, idx) => (
                            <li key={idx} className="leading-snug">{str}</li>
                          ))}
                        </ul>
                      </td>

                      {/* Key Risks */}
                      <td className="py-4 px-4 text-slate-600 font-medium">
                        <ul className="list-disc list-inside space-y-0.5 text-[11px] text-slate-500">
                          {st.keyRisks.map((rsk, idx) => (
                            <li key={idx} className="leading-snug">{rsk}</li>
                          ))}
                        </ul>
                      </td>

                      {/* Recommendation */}
                      <td className="py-4 px-3 whitespace-nowrap">
                        <select
                          value={st.recommendation}
                          onChange={(e) => handleRecommendationChange(st.id, e.target.value as any)}
                          className={`px-2.5 py-1 rounded-xl text-xs font-bold border outline-none cursor-pointer ${
                            st.recommendation === 'Shortlist for Expert Review' ? 'bg-emerald-50 text-emerald-900 border-emerald-300' :
                            st.recommendation === 'Keep as Backup' ? 'bg-amber-50 text-amber-900 border-amber-300' : 'bg-rose-50 text-rose-900 border-rose-300'
                          }`}
                        >
                          <option value="Shortlist for Expert Review">Shortlist for Expert Review</option>
                          <option value="Keep as Backup">Keep as Backup</option>
                          <option value="Do Not Shortlist">Do Not Shortlist</option>
                        </select>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => setScorecardStartup(st)}
                            className="px-3 py-1.5 rounded-full bg-[#1D64EC] hover:bg-brand-cobalt text-white font-bold text-[11px] transition-colors flex items-center gap-1 shadow-2xs"
                          >
                            <Sparkles className="w-3 h-3" />
                            <span>Scorecard</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setActiveTab('directory')}
                            className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] transition-colors"
                          >
                            Dossier
                          </button>
                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Shortlist Summary & Transfer Handoff Bar */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="font-bold text-xs text-navy-900 block">
                  Proposed Shortlist for Expert Evaluation:
                </span>
                <p className="text-xs text-slate-500 mt-0.5">
                  <strong>{currentPS.startups.filter(s => s.recommendation === 'Shortlist for Expert Review').length} startups</strong> selected for formal technical evaluation.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsHandoffModalOpen(true)}
                  className="px-6 py-2.5 rounded-full bg-[#1D64EC] hover:bg-brand-cobalt text-white font-bold text-xs shadow-sm flex items-center gap-2 transition-all hover:scale-[1.02]"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Shortlist to Expert Evaluation</span>
                </button>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 1: STARTUP DETAIL & AI SCORECARD (10 Dimensions Drilldown) */}
      {/* ========================================================================= */}
      {scorecardStartup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-5 border border-slate-200 shadow-2xl max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3.5">
                <img src={scorecardStartup.logo} alt={scorecardStartup.name} className="w-12 h-12 rounded-2xl object-cover border border-slate-200 shadow-xs" />
                <div>
                  <span className="text-[10px] font-bold text-[#1D64EC] uppercase tracking-wider block">
                    AI Explainability Scorecard • Rank #{scorecardStartup.rank}
                  </span>
                  <h3 className="text-lg font-extrabold text-navy-900 font-display mt-0.5">
                    {scorecardStartup.name} – AI Scorecard ({currentPS.psCode})
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">{scorecardStartup.legalName}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-xl font-extrabold text-[#1D64EC] font-display block">{scorecardStartup.overallScore}/100</span>
                  <span className="text-[10px] font-bold text-emerald-700">{scorecardStartup.suitabilityLabel}</span>
                </div>

                <button
                  onClick={() => setScorecardStartup(null)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-sm"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Section A: AI Evaluation Summary Narrative */}
            <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-2 text-xs text-slate-700">
              <span className="font-bold text-navy-900 block text-xs">AI Evaluation Summary:</span>
              <p className="leading-relaxed whitespace-pre-line font-medium">
                {scorecardStartup.narrativeSummary}
              </p>
            </div>

            {/* Section B: 10-Dimension Breakdown */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-navy-900 font-display">
                Dimension-wise Evaluation & Document Evidence
              </h4>

              <div className="space-y-2.5 text-xs">
                {scorecardStartup.dimensions && scorecardStartup.dimensions.length > 0 ? (
                  scorecardStartup.dimensions.map((dim, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <strong className="text-navy-900">{dim.name}</strong>
                          <span className="text-slate-400 text-[11px] ml-2">Weight: {dim.weight}%</span>
                        </div>
                        <span className="font-extrabold text-sm text-[#1D64EC] font-display">{dim.score} / 100</span>
                      </div>

                      <p className="text-slate-600 leading-relaxed font-medium">{dim.explanation}</p>

                      {dim.evidenceLinks && dim.evidenceLinks.length > 0 && (
                        <div className="pt-1.5 border-t border-slate-200/60 flex flex-wrap items-center gap-2">
                          <span className="text-[10px] font-bold text-slate-400 uppercase">Document Evidence:</span>
                          {dim.evidenceLinks.map((ev, eIdx) => (
                            <button
                              key={eIdx}
                              type="button"
                              onClick={() => addNotification({ title: 'Document Opened', message: `Displaying verified evidence document: ${ev.docName}`, portal: 'gov', type: 'info' })}
                              className="px-2.5 py-0.5 rounded-lg bg-white hover:bg-blue-50 text-[#1D64EC] border border-blue-200 text-[10px] font-semibold flex items-center gap-1 transition-colors"
                            >
                              <FileText className="w-3 h-3" />
                              <span>{ev.label}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="p-4 rounded-xl bg-slate-50 text-slate-500 text-center">
                    Detailed 10-dimension audit logs available in full startup dossier.
                  </div>
                )}
              </div>
            </div>

            {/* Section C: Strengths, Risks & AI Recommendation Rationale */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2 text-xs">
              <span className="font-bold text-navy-900 block">AI Recommendation Rationale:</span>
              <p className="text-slate-700 leading-relaxed font-medium">
                {scorecardStartup.aiRecommendationRationale}
              </p>
            </div>

            {/* Section D: Links to Full Dossier */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setScorecardStartup(null);
                  setActiveTab('directory');
                }}
                className="text-xs font-bold text-[#1D64EC] hover:underline flex items-center gap-1"
              >
                <span>View Full Startup Dossier in Directory</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => setScorecardStartup(null)}
                className="px-5 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
              >
                Close Scorecard
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: CONFIRMATION HANDOFF TO EXPERT EVALUATION */}
      {/* ========================================================================= */}
      {isHandoffModalOpen && currentPS && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 border border-slate-200 shadow-2xl text-center">
            <div className="w-14 h-14 rounded-3xl bg-blue-50 text-[#1D64EC] flex items-center justify-center mx-auto shadow-xs">
              <Send className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-extrabold text-navy-900 font-display">
                Send Shortlist to Expert Evaluation?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                This will send the <strong>{currentPS.startups.filter(s => s.recommendation === 'Shortlist for Expert Review').length} shortlisted startups</strong> ({currentPS.startups.filter(s => s.recommendation === 'Shortlist for Expert Review').map(s => s.name).join(', ')}) to the <strong>Expert Evaluation</strong> module for {currentPS.psCode}.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-100 text-xs text-slate-700 text-left space-y-1">
              <span className="font-bold text-navy-900 block">Next Step in Workflow:</span>
              <p className="text-slate-600">Empanelled technical experts will evaluate evidence, add structured notes, and grant pilot approvals.</p>
            </div>

            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setIsHandoffModalOpen(false)}
                className="px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleConfirmHandoff}
                className="px-6 py-2.5 rounded-full bg-[#1D64EC] hover:bg-brand-cobalt text-white font-bold text-xs shadow-sm flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>Confirm & Open Expert Evaluation</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
