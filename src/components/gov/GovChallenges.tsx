import React, { useState, useMemo } from 'react';
import { 
  PlusCircle, Search, ArrowUpDown, ChevronLeft, ChevronRight, 
  MapPin, DollarSign, Sparkles, Building2, CheckCircle2, Eye 
} from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';
import { StatusBadge } from '../common/StatusBadge';
import { ProblemStatementModal } from './ProblemStatementModal';
import { Challenge } from '../../types';

export const GovChallenges: React.FC = () => {
  const { challenges, setSelectedChallengeId, setActiveTab } = usePlatform();
  
  const [isNewChallengeModalOpen, setIsNewChallengeModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [entriesPerPage, setEntriesPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [inspectingChallenge, setInspectingChallenge] = useState<Challenge | null>(null);

  // Sorting states
  const [sortField, setSortField] = useState<string>('sno');
  const [sortAsc, setSortAsc] = useState<boolean>(true);

  const sectors = [
    'All',
    'Smart Water & AI/ML IoT',
    'Smart Urban Infrastructure',
    'AgriTech & Remote Sensing',
    'Disaster Management & AI',
    'Smart Freight & Maritime Mobility',
    'HealthTech & Bio-Sensing',
    'Robotics & Waste Management',
    'Civic Infrastructure & Edge AI',
    'GovTech & Distributed Ledger',
    'Environmental IoT & Satellite Edge',
    'Clean Energy & Smart Grid',
    'GovTech & Indian Language NLP'
  ];

  const statuses = ['All', 'Open', 'Closing Soon', 'Pilot Ongoing', 'Shortlisting'];

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  // Filtered and sorted dataset
  const filteredAndSortedChallenges = useMemo(() => {
    let result = challenges.filter((ch, index) => {
      const q = searchQuery.toLowerCase();
      const psNo = (ch.psNumber || ch.code || `MH2600${index + 1}`).toLowerCase();
      const title = ch.title.toLowerCase();
      const org = (ch.organization || ch.department).toLowerCase();
      const theme = (ch.theme || ch.sector).toLowerCase();
      const category = (ch.category || (ch.tags.includes('Hardware') ? 'Hardware' : 'Software')).toLowerCase();
      
      const matchesSearch = psNo.includes(q) || title.includes(q) || org.includes(q) || theme.includes(q) || category.includes(q);
      const matchesSector = selectedSector === 'All' || ch.sector === selectedSector || ch.theme === selectedSector;
      const matchesStatus = selectedStatus === 'All' || ch.status === selectedStatus;

      return matchesSearch && matchesSector && matchesStatus;
    });

    result.sort((a, b) => {
      let valA: string | number = '';
      let valB: string | number = '';

      switch (sortField) {
        case 'org':
          valA = a.organization || a.department;
          valB = b.organization || b.department;
          break;
        case 'title':
          valA = a.title;
          valB = b.title;
          break;
        case 'category':
          valA = a.category || 'Software';
          valB = b.category || 'Software';
          break;
        case 'psNumber':
          valA = a.psNumber || a.code;
          valB = b.psNumber || b.code;
          break;
        case 'theme':
          valA = a.theme || a.sector;
          valB = b.theme || b.sector;
          break;
        case 'deadline':
          valA = a.deadlineSubmission || a.deadline;
          valB = b.deadlineSubmission || b.deadline;
          break;
        default:
          valA = a.id;
          valB = b.id;
      }

      if (valA < valB) return sortAsc ? -1 : 1;
      if (valA > valB) return sortAsc ? 1 : -1;
      return 0;
    });

    return result;
  }, [challenges, searchQuery, selectedSector, selectedStatus, sortField, sortAsc]);

  // Pagination calculation
  const totalEntries = filteredAndSortedChallenges.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage) || 1;
  const startIndex = (currentPage - 1) * entriesPerPage;
  const currentEntries = filteredAndSortedChallenges.slice(startIndex, startIndex + entriesPerPage);

  const handleEntriesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEntriesPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="micro-label text-slate-400">Maharashtra Innovation Society</span>
            <span className="w-2 h-2 rounded-full bg-[#1D64EC]" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 font-display">
            Problem Statements & Innovation Calls
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Browse, search, and track state innovation challenges and outcome-based public problem statements.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsNewChallengeModalOpen(true)}
            className="px-5 py-3 rounded-full bg-[#1D64EC] hover:bg-brand-cobalt text-white font-bold text-xs shadow-sm flex items-center gap-2 transition-all hover:scale-[1.02]"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create New Challenge</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Bar (With Show Entries on the Left, Search in the Middle, and the Two Dropdowns on the Right) */}
      <div className="glass-panel rounded-2xl p-4 flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
        
        {/* Show Entries Dropdown */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 shrink-0">
          <span>Show</span>
          <select
            value={entriesPerPage}
            onChange={handleEntriesChange}
            className="px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-navy-900 font-bold text-xs outline-none focus:border-[#1D64EC] focus:bg-white cursor-pointer"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span>entries</span>
        </div>

        {/* Search Input */}
        <div className="flex-1 w-full relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search challenges by title, department, or code (e.g. 'Water', 'MH-2026')"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-navy-900 outline-none focus:border-[#1D64EC] focus:bg-white placeholder:text-slate-400 transition-colors"
          />
        </div>

        {/* Two Dropdowns on Right (Sector & Status) */}
        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto shrink-0">
          <select
            value={selectedSector}
            onChange={(e) => {
              setSelectedSector(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-navy-900 outline-none focus:border-[#1D64EC] focus:bg-white"
          >
            {sectors.map(sec => (
              <option key={sec} value={sec}>{sec === 'All' ? 'All Sectors' : sec}</option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-navy-900 outline-none focus:border-[#1D64EC] focus:bg-white"
          >
            {statuses.map(st => (
              <option key={st} value={st}>{st === 'All' ? 'All Statuses' : st}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-5">
        
        {/* Data Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/90 text-navy-900 border-b border-slate-200">
                
                {/* S.No. */}
                <th 
                  onClick={() => handleSort('sno')}
                  className="py-3.5 px-4 font-bold text-xs whitespace-nowrap cursor-pointer hover:bg-slate-100 select-none border-r border-slate-200/80 text-center"
                >
                  <div className="flex items-center justify-center gap-1.5">
                    <span>S.No.</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>

                {/* Organization */}
                <th 
                  onClick={() => handleSort('org')}
                  className="py-3.5 px-4 font-bold text-xs cursor-pointer hover:bg-slate-100 select-none border-r border-slate-200/80 min-w-[200px]"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Organization</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>

                {/* Problem Statement Title */}
                <th 
                  onClick={() => handleSort('title')}
                  className="py-3.5 px-4 font-bold text-xs cursor-pointer hover:bg-slate-100 select-none border-r border-slate-200/80 min-w-[260px]"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Problem Statement Title</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>

                {/* Category */}
                <th 
                  onClick={() => handleSort('category')}
                  className="py-3.5 px-4 font-bold text-xs whitespace-nowrap cursor-pointer hover:bg-slate-100 select-none border-r border-slate-200/80"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Category</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>

                {/* PS Number */}
                <th 
                  onClick={() => handleSort('psNumber')}
                  className="py-3.5 px-4 font-bold text-xs whitespace-nowrap cursor-pointer hover:bg-slate-100 select-none border-r border-slate-200/80"
                >
                  <div className="flex items-center gap-1.5">
                    <span>PS Number</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>

                {/* Theme */}
                <th 
                  onClick={() => handleSort('theme')}
                  className="py-3.5 px-4 font-bold text-xs cursor-pointer hover:bg-slate-100 select-none border-r border-slate-200/80 min-w-[180px]"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Theme</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>

                {/* Deadline for Idea Submission */}
                <th 
                  onClick={() => handleSort('deadline')}
                  className="py-3.5 px-4 font-bold text-xs cursor-pointer hover:bg-slate-100 select-none min-w-[160px]"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Deadline for Idea Submission</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>

                {/* Action */}
                <th className="py-3.5 px-4 font-bold text-xs text-right whitespace-nowrap">
                  <span>Action</span>
                </th>

              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              {currentEntries.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-16 text-center text-slate-500">
                    <div className="max-w-md mx-auto space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#1D64EC] flex items-center justify-center mx-auto text-xl font-bold">
                        🏛️
                      </div>
                      <h4 className="font-bold text-sm text-navy-900">No Problem Statements Found</h4>
                      <p className="text-xs text-slate-400">
                        No challenges published yet. Click the "+ Create Problem Statement" button to publish a new challenge.
                      </p>
                      <button
                        type="button"
                        onClick={() => setIsNewChallengeModalOpen(true)}
                        className="px-4 py-2 rounded-full bg-[#1D64EC] hover:bg-blue-700 text-white font-bold text-xs shadow-2xs inline-flex items-center gap-1.5 mt-1"
                      >
                        <PlusCircle className="w-4 h-4" />
                        <span>Create Problem Statement</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                currentEntries.map((ch, idx) => {
                  const sNo = startIndex + idx + 1;
                  const psNo = ch.psNumber || ch.code || `MH2600${sNo}`;
                  const orgName = ch.organization || ch.department;
                  const category = ch.category || (ch.tags.includes('Hardware') ? 'Hardware' : 'Software');
                  const themeName = ch.theme || ch.sector;
                  const deadlineText = ch.deadlineSubmission || ch.deadline || '20 September 2026';

                  return (
                    <tr key={ch.id} className="hover:bg-blue-50/40 transition-colors group">
                      
                      {/* S.No. */}
                      <td className="py-3.5 px-4 font-medium text-slate-600 border-r border-slate-100 text-center">
                        {sNo}
                      </td>

                      {/* Organization */}
                      <td className="py-3.5 px-4 font-medium text-slate-800 border-r border-slate-100 leading-relaxed">
                        {orgName}
                      </td>

                      {/* Problem Statement Title */}
                      <td className="py-3.5 px-4 font-semibold text-[#1D64EC] group-hover:underline cursor-pointer border-r border-slate-100 leading-relaxed"
                        onClick={() => setInspectingChallenge(ch)}
                      >
                        {ch.title}
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-4 text-slate-700 font-medium border-r border-slate-100 whitespace-nowrap">
                        <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${
                          category === 'Hardware' ? 'bg-amber-50 text-amber-800 border border-amber-200' : 'bg-blue-50 text-[#1D64EC] border border-blue-200'
                        }`}>
                          {category}
                        </span>
                      </td>

                      {/* PS Number */}
                      <td className="py-3.5 px-4 font-mono font-bold text-navy-900 border-r border-slate-100 whitespace-nowrap">
                        {psNo}
                      </td>

                      {/* Theme */}
                      <td className="py-3.5 px-4 text-slate-700 font-medium border-r border-slate-100 leading-relaxed">
                        {themeName}
                      </td>

                      {/* Deadline for Idea Submission */}
                      <td className="py-3.5 px-4 font-medium text-slate-700 border-r border-slate-100 whitespace-nowrap">
                        {deadlineText}
                      </td>

                      {/* Action (Eye Icon View Details) */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => setInspectingChallenge(ch)}
                          className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-[#1D64EC] hover:text-white text-slate-700 font-bold text-[11px] transition-colors inline-flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Details</span>
                        </button>
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Bottom Pagination Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 text-xs text-slate-600">
          <div>
            Showing <strong className="text-navy-900">{totalEntries > 0 ? startIndex + 1 : 0}</strong> to <strong className="text-navy-900">{Math.min(startIndex + entriesPerPage, totalEntries)}</strong> of <strong className="text-navy-900">{totalEntries}</strong> entries
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`w-8 h-8 rounded-xl font-bold text-xs transition-colors ${
                  currentPage === pageNum
                    ? 'bg-[#1D64EC] text-white shadow-xs'
                    : 'bg-white hover:bg-slate-100 border border-slate-200 text-slate-700'
                }`}
              >
                {pageNum}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>

      </div>

      {/* Inspect Challenge Modal */}
      {inspectingChallenge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-5 border border-slate-200 shadow-2xl">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#1D64EC] uppercase tracking-wider block">
                  {inspectingChallenge.psNumber || inspectingChallenge.code} • {inspectingChallenge.category || 'Software'}
                </span>
                <h3 className="text-xl font-bold text-navy-900 font-display mt-1">
                  {inspectingChallenge.title}
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  {inspectingChallenge.organization || inspectingChallenge.department}
                </p>
              </div>
              <button 
                onClick={() => setInspectingChallenge(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold"
              >
                ×
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="micro-label text-slate-400 block">Problem Statement & Desired Outcomes</span>
                <p className="text-slate-700 leading-relaxed font-medium">
                  {inspectingChallenge.problemSummary || inspectingChallenge.description}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="micro-label text-slate-400 block mb-1">Theme</span>
                  <span className="font-bold text-navy-900">{inspectingChallenge.theme || inspectingChallenge.sector}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="micro-label text-slate-400 block mb-1">Deadline for Submission</span>
                  <span className="font-bold text-navy-900">{inspectingChallenge.deadlineSubmission || inspectingChallenge.deadline}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="micro-label text-slate-400 block mb-1">Pilot Budget</span>
                  <span className="font-bold text-navy-900">{inspectingChallenge.budget}</span>
                </div>
              </div>

              {inspectingChallenge.aiDecomposition && (
                <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-2">
                  <span className="micro-label text-[#1D64EC] block">AI Target Key Metrics</span>
                  <ul className="space-y-1 text-slate-700 font-medium">
                    {inspectingChallenge.aiDecomposition.keyMetrics.map((km, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1D64EC]" />
                        <span>{km}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setInspectingChallenge(null);
                  setActiveTab('directory');
                }}
                className="px-5 py-2.5 rounded-full bg-[#1D64EC] hover:bg-brand-cobalt text-white font-bold text-xs shadow-sm"
              >
                Screen Matching Startups
              </button>

              <button
                type="button"
                onClick={() => setInspectingChallenge(null)}
                className="px-5 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Challenge Creation Modal */}
      <ProblemStatementModal
        isOpen={isNewChallengeModalOpen}
        onClose={() => setIsNewChallengeModalOpen(false)}
      />

    </div>
  );
};
