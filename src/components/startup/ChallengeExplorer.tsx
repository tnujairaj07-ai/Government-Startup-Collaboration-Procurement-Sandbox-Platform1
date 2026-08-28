import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { 
  FolderSearch, Sparkles, ArrowRight, Clock, 
  MapPin, DollarSign, Building2, CheckCircle2 
} from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';
import { ProposalSubmissionModal } from './ProposalSubmissionModal';
import { Challenge } from '../../types';

export const ChallengeExplorer: React.FC = () => {
  const { challenges } = usePlatform();
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [selectedTheme, setSelectedTheme] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [applyChallenge, setApplyChallenge] = useState<Challenge | null>(null);

  const departments = ['All', 'Water', 'Energy', 'Transport', 'Health', 'Agriculture', 'Urban'];
  const themes = ['All', 'Smart Automation', 'AI/ML', 'IoT', 'Robotics', 'Data Platforms', 'Drones'];
  const statuses = ['All', 'Open', 'Closing Soon', 'Shortlisting'];

  const filteredChallenges = challenges.filter(c => {
    const matchesDept = selectedDept === 'All' || c.domain === selectedDept || c.department.includes(selectedDept);
    const matchesTheme = selectedTheme === 'All' || c.tags.includes(selectedTheme);
    const matchesStatus = selectedStatus === 'All' || c.status === selectedStatus;
    return matchesDept && matchesTheme && matchesStatus;
  });

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="micro-label text-slate-400">Public Sector Opportunities</span>
            <span className="w-2 h-2 rounded-full bg-[#1D64EC]" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 font-display">
            Explore Challenges
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Browse government challenges and submit innovative solutions.
          </p>
        </div>

        <div className="px-4 py-2 rounded-2xl bg-white border border-slate-200 text-xs font-bold text-navy-900 shadow-xs">
          <span className="text-[#1D64EC] text-base">{challenges.length}</span> Open Innovation Calls
        </div>
      </div>

      {/* AI Match Recommendation Card */}
      <div className="p-5 rounded-3xl bg-white border border-purple-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold text-purple-700 uppercase tracking-wider block">AI Match Recommendation</span>
            <p className="text-xs sm:text-sm font-medium text-slate-800 leading-relaxed mt-0.5">
              Based on your verified capability profile, these challenges are a strong fit: <strong className="text-navy-900">Water Leakage Detection, Smart Irrigation Optimization</strong>.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setSelectedDept('Water');
            setSelectedTheme('All');
          }}
          className="px-5 py-2.5 rounded-full bg-purple-50 hover:bg-purple-100 text-purple-900 font-bold text-xs border border-purple-200 shrink-0 transition-colors"
        >
          Filter Best Fits
        </button>
      </div>

      {/* Filter Bar */}
      <div className="glass-panel rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-3">
        <div className="flex-1 w-full flex flex-wrap items-center gap-2">
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-navy-900 outline-none focus:border-[#1D64EC]"
          >
            {departments.map(d => (
              <option key={d} value={d}>{d === 'All' ? 'All Departments' : d}</option>
            ))}
          </select>

          <select
            value={selectedTheme}
            onChange={(e) => setSelectedTheme(e.target.value)}
            className="px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-navy-900 outline-none focus:border-[#1D64EC]"
          >
            {themes.map(t => (
              <option key={t} value={t}>{t === 'All' ? 'All Themes' : t}</option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-navy-900 outline-none focus:border-[#1D64EC]"
          >
            {statuses.map(st => (
              <option key={st} value={st}>{st === 'All' ? 'All Statuses' : st}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Challenge Cards Grid or Clean Empty State */}
      {filteredChallenges.length === 0 ? (
        <div className="glass-panel rounded-3xl p-16 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#1D64EC] flex items-center justify-center mx-auto">
            <FolderSearch className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-navy-900">No Open Challenges Available</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Government departments are preparing new problem statements. Check back shortly for new innovation calls.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChallenges.map(ch => (
            <div
              key={ch.id}
              className="glass-card rounded-3xl p-6 flex flex-col justify-between hover:shadow-md transition-all duration-200 border border-slate-200/80 group"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="font-mono text-xs font-bold text-slate-400">
                    {ch.code}
                  </span>
                  <StatusBadge
                    label={ch.status}
                    variant={ch.status === 'Open' ? 'emerald' : ch.status === 'Closing Soon' ? 'amber' : 'violet'}
                    size="sm"
                  />
                </div>

                {/* Department & Title */}
                <span className="text-[11px] font-bold text-[#1D64EC] uppercase tracking-wider block mb-1">
                  {ch.department}
                </span>
                <h3 className="text-base font-bold text-navy-900 group-hover:text-[#1D64EC] transition-colors leading-snug">
                  {ch.title}
                </h3>

                {/* Outcome Statement */}
                <p className="text-xs text-slate-600 line-clamp-3 mt-2 leading-relaxed font-medium">
                  {ch.problemSummary}
                </p>

                {/* Meta details */}
                <div className="mt-4 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 text-[11px] text-slate-700 space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Pilot Budget:</span>
                    <strong className="text-navy-900">{ch.budget}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Timeline:</span>
                    <strong className="text-navy-900">{ch.pilotDurationMonths} months pilot + scale decision</strong>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] text-slate-400 font-mono">
                  {ch.location.join(', ')}
                </span>

                <button
                  type="button"
                  onClick={() => setApplyChallenge(ch)}
                  className="px-5 py-2.5 rounded-full bg-[#1D64EC] hover:bg-brand-cobalt text-white font-bold text-xs shadow-sm flex items-center gap-1.5 transition-all"
                >
                  <span>View Details & Apply</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Apply Modal */}
      {applyChallenge && (
        <ProposalSubmissionModal
          isOpen={true}
          onClose={() => setApplyChallenge(null)}
          challenge={applyChallenge}
        />
      )}

    </div>
  );
};
