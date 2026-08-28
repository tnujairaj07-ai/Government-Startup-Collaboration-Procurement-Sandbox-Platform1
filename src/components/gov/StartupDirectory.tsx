import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { 
  Search, ShieldCheck, MapPin, Sparkles, ChevronRight, 
  Filter, Plus, Minus, RotateCcw, Building2, CheckCircle2, 
  GraduationCap, Briefcase, Award, Users, Compass, ExternalLink 
} from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';
import { StartupDetailModal } from './StartupDetailModal';

export const StartupDirectory: React.FC = () => {
  const { startups } = usePlatform();
  
  // Entity Tab Navigation (Startups, Incubators, Accelerators, Corporates, Mentors, Universities, State Innovation Cells)
  const [activeEntityTab, setActiveEntityTab] = useState<string>('Startups');

  // Search & Basic Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [detailStartupId, setDetailStartupId] = useState<string | null>(null);

  // Right-Side Filter Panel States (Matching Reference Picture)
  const [dpiitRecognised, setDpiitRecognised] = useState(false);
  const [taxExempted80IAC, setTaxExempted80IAC] = useState(false);
  const [internationalUsers, setInternationalUsers] = useState(false);

  // Collapsible Section Toggles (Industry open by default with '-', others with '+')
  const [isIndustryOpen, setIsIndustryOpen] = useState(true);
  const [isSectorOpen, setIsSectorOpen] = useState(false);
  const [isStageOpen, setIsStageOpen] = useState(false);
  const [isStateOpen, setIsStateOpen] = useState(false);
  const [isCityOpen, setIsCityOpen] = useState(false);

  // Search input inside Industry section
  const [industrySearch, setIndustrySearch] = useState('');

  // Selected filter arrays
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
  const [selectedStages, setSelectedStages] = useState<string[]>([]);
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);

  // Filter option dictionaries
  const allIndustries = [
    'Advertising',
    'Aeronautics Aerospace & Defence',
    'Agriculture',
    'AI & Machine Learning',
    'CleanTech & Environment',
    'Smart Water & Utilities',
    'Waste Management',
    'Healthcare & MedTech',
    'Transport & Mobility',
    'Energy & Smart Grid'
  ];

  const allSectors = [
    'Hardware / IoT',
    'DeepTech & AI/ML',
    'Robotics & Automation',
    'SaaS & Cloud Platforms',
    'BioTech & Life Sciences'
  ];

  const allStages = [
    'Prototype',
    'Pilot-ready',
    'In Pilot',
    'Scaled'
  ];

  const allStates = [
    'Maharashtra',
    'Karnataka',
    'Delhi NCR',
    'Telangana',
    'Gujarat'
  ];

  const allCities = [
    'Pune',
    'Mumbai',
    'Nagpur',
    'Thane',
    'Nashik',
    'Chhatrapati Sambhajinagar'
  ];

  // Entity Tabs Configuration
  const entityTabs = [
    { name: 'Startups', count: `${startups.length}` },
    { name: 'Incubators', count: '0' },
    { name: 'Accelerators', count: '0' },
    { name: 'Corporates', count: '0' },
    { name: 'Mentors', count: '0' },
    { name: 'Universities', count: '0' },
    { name: 'State Innovation Cells', count: '0' }
  ];

  // Ecosystem partner directory data for other tabs (empty when no mock data)
  const otherEcosystemEntities: any[] = [];

  const toggleItem = (list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const handleResetFilters = () => {
    setDpiitRecognised(false);
    setTaxExempted80IAC(false);
    setInternationalUsers(false);
    setSelectedIndustries([]);
    setSelectedSectors([]);
    setSelectedStages([]);
    setSelectedStates([]);
    setSelectedCities([]);
    setSearchQuery('');
    setIndustrySearch('');
  };

  const activeFiltersCount = (dpiitRecognised ? 1 : 0) +
    (taxExempted80IAC ? 1 : 0) +
    (internationalUsers ? 1 : 0) +
    selectedIndustries.length +
    selectedSectors.length +
    selectedStages.length +
    selectedStates.length +
    selectedCities.length;

  // Filter logic applied to startups
  const filteredStartups = startups.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.domains.some(d => d.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          s.techStack.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesDpiit = !dpiitRecognised || Boolean(s.dpiitNumber);
    const matches80IAC = !taxExempted80IAC || Boolean(s.dpiitNumber);
    const matchesInternational = !internationalUsers || s.location.toLowerCase().includes('global');

    const matchesIndustry = selectedIndustries.length === 0 || selectedIndustries.some(ind => {
      if (ind === 'Smart Water & Utilities') return s.domains.some(d => d.toLowerCase().includes('water') || d.toLowerCase().includes('utilities'));
      if (ind === 'Waste Management') return s.domains.some(d => d.toLowerCase().includes('waste'));
      if (ind === 'Agriculture') return s.domains.some(d => d.toLowerCase().includes('agri'));
      if (ind === 'AI & Machine Learning') return s.techStack.some(t => t.toLowerCase().includes('ai') || t.toLowerCase().includes('ml'));
      return s.domains.some(d => d.toLowerCase().includes(ind.toLowerCase()));
    });

    const matchesSector = selectedSectors.length === 0 || selectedSectors.some(sec => {
      if (sec === 'Hardware / IoT') return s.techStack.includes('IoT') || s.techStack.includes('Hardware');
      if (sec === 'DeepTech & AI/ML') return s.techStack.includes('AI/ML');
      if (sec === 'Robotics & Automation') return s.techStack.includes('Robotics');
      if (sec === 'SaaS & Cloud Platforms') return s.techStack.includes('SaaS');
      return true;
    });

    const matchesStage = selectedStages.length === 0 || selectedStages.includes(s.stage);

    const matchesState = selectedStates.length === 0 || selectedStates.some(st => 
      s.location.toLowerCase().includes(st.toLowerCase())
    );

    const matchesCity = selectedCities.length === 0 || selectedCities.some(city => 
      s.location.toLowerCase().includes(city.toLowerCase())
    );

    return matchesSearch && matchesDpiit && matches80IAC && matchesInternational && 
           matchesIndustry && matchesSector && matchesStage && matchesState && matchesCity;
  });

  const visibleIndustries = allIndustries.filter(ind => 
    ind.toLowerCase().includes(industrySearch.toLowerCase())
  );

  const filteredOtherEntities = otherEcosystemEntities.filter(e => {
    if (activeEntityTab !== 'Startups' && e.category !== activeEntityTab) return false;
    const q = searchQuery.toLowerCase();
    return e.name.toLowerCase().includes(q) || e.location.toLowerCase().includes(q) || e.focus.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="micro-label text-slate-400">Mahatech Procure</span>
            <span className="w-2 h-2 rounded-full bg-[#1D64EC]" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 font-display">
            Startup & Ecosystem Directory
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Discover, filter, and AI-match startups, incubators, accelerators, and innovation cells to your challenges.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-2xl bg-white border border-slate-200 text-xs font-bold text-navy-900 shadow-xs">
            Showing <span className="text-[#1D64EC] text-base">{activeEntityTab === 'Startups' ? filteredStartups.length : filteredOtherEntities.length}</span> Verified Entities
          </div>
        </div>
      </div>

      {/* Main 2-Column Layout: Directory Content on Left, Dedicated Filters Panel on Right */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        
        {/* Left Area: Search Bar + Ecosystem Nav Bar + Cards Grid */}
        <div className="flex-1 min-w-0 space-y-6 w-full">
          
          {/* 1. Search Input Bar */}
          <div className="glass-panel rounded-2xl p-3 sm:p-4 flex items-center gap-3">
            <Search className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
            <input
              type="text"
              placeholder={`Search ${activeEntityTab.toLowerCase()} by name, technology, sector, or city...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-none text-xs font-medium text-navy-900 outline-none placeholder:text-slate-400"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')} 
                className="text-xs text-slate-400 hover:text-slate-600 px-2"
              >
                Clear
              </button>
            )}
          </div>

          {/* 2. Ecosystem Navbar Row Just Below The Search Bar */}
          <div className="bg-white rounded-2xl p-1.5 border border-slate-200/80 shadow-xs overflow-x-auto">
            <div className="flex items-center gap-1 min-w-max">
              {entityTabs.map((tab) => {
                const isActive = activeEntityTab === tab.name;
                return (
                  <button
                    key={tab.name}
                    onClick={() => setActiveEntityTab(tab.name)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                      isActive
                        ? 'bg-[#1D64EC] text-white shadow-xs'
                        : 'text-slate-600 hover:text-navy-900 hover:bg-slate-50'
                    }`}
                  >
                    <span>{tab.name}</span>
                    <span className={`text-[11px] px-1.5 py-0.2 rounded-md ${
                      isActive ? 'bg-white/20 text-white font-extrabold' : 'text-slate-400 font-semibold'
                    }`}>
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Filter Tags Bar (if any selected) */}
          {activeFiltersCount > 0 && activeEntityTab === 'Startups' && (
            <div className="flex flex-wrap items-center gap-2 px-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Active:</span>
              {dpiitRecognised && (
                <span className="px-2.5 py-1 rounded-full bg-blue-50 text-[#1D64EC] border border-blue-200 text-[11px] font-semibold flex items-center gap-1">
                  DPIIT Recognised
                  <button onClick={() => setDpiitRecognised(false)} className="hover:text-navy-900 ml-1">×</button>
                </span>
              )}
              {taxExempted80IAC && (
                <span className="px-2.5 py-1 rounded-full bg-blue-50 text-[#1D64EC] border border-blue-200 text-[11px] font-semibold flex items-center gap-1">
                  80IAC Exempted
                  <button onClick={() => setTaxExempted80IAC(false)} className="hover:text-navy-900 ml-1">×</button>
                </span>
              )}
              {selectedIndustries.map(ind => (
                <span key={ind} className="px-2.5 py-1 rounded-full bg-blue-50 text-[#1D64EC] border border-blue-200 text-[11px] font-semibold flex items-center gap-1">
                  {ind}
                  <button onClick={() => toggleItem(selectedIndustries, setSelectedIndustries, ind)} className="hover:text-navy-900 ml-1">×</button>
                </span>
              ))}
              {selectedStages.map(st => (
                <span key={st} className="px-2.5 py-1 rounded-full bg-blue-50 text-[#1D64EC] border border-blue-200 text-[11px] font-semibold flex items-center gap-1">
                  Stage: {st}
                  <button onClick={() => toggleItem(selectedStages, setSelectedStages, st)} className="hover:text-navy-900 ml-1">×</button>
                </span>
              ))}
              {selectedCities.map(c => (
                <span key={c} className="px-2.5 py-1 rounded-full bg-blue-50 text-[#1D64EC] border border-blue-200 text-[11px] font-semibold flex items-center gap-1">
                  City: {c}
                  <button onClick={() => toggleItem(selectedCities, setSelectedCities, c)} className="hover:text-navy-900 ml-1">×</button>
                </span>
              ))}
              <button
                onClick={handleResetFilters}
                className="text-[11px] font-bold text-rose-600 hover:text-rose-700 underline ml-2 flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                Reset all
              </button>
            </div>
          )}

          {/* Cards Grid: Startups View */}
          {activeEntityTab === 'Startups' && (
            <>
              {filteredStartups.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredStartups.map(startup => (
                    <div
                      key={startup.id}
                      className="glass-card rounded-3xl p-6 flex flex-col justify-between hover:shadow-md transition-all duration-200 border border-slate-200/80 group"
                    >
                      <div>
                        {/* Header */}
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={startup.logo}
                              alt={startup.name}
                              className="w-12 h-12 rounded-2xl object-cover border border-slate-200 shadow-xs"
                            />
                            <div>
                              <h3 className="font-bold text-sm text-navy-900 group-hover:text-[#1D64EC] transition-colors">
                                {startup.name}
                              </h3>
                              <div className="flex items-center gap-1 text-[11px] text-slate-500">
                                <MapPin className="w-3 h-3 text-slate-400" />
                                <span>{startup.location}</span>
                              </div>
                            </div>
                          </div>

                          <StatusBadge
                            label={startup.status}
                            variant={
                              startup.status === 'Scaled' ? 'emerald' :
                              startup.status === 'In Pilot' ? 'amber' :
                              startup.status === 'Shortlisted' ? 'violet' : 'slate'
                            }
                            size="sm"
                          />
                        </div>

                        {/* Tagline & Summary */}
                        <p className="text-xs font-semibold text-brand-cobalt mb-1">
                          {startup.tagline}
                        </p>
                        <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-3">
                          {startup.summary}
                        </p>

                        {/* Domain & Tech Pills */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {startup.domains.map((dom, idx) => (
                            <span key={idx} className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-[#1D64EC] border border-blue-100">
                              {dom}
                            </span>
                          ))}
                          {startup.techStack.map((tech, idx) => (
                            <span key={idx} className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-600">
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* Key Metrics */}
                        <div className="space-y-1 pt-3 border-t border-slate-100">
                          <span className="micro-label text-slate-400 block text-[10px]">Key Metrics</span>
                          {startup.keyMetrics.map((km, idx) => (
                            <div key={idx} className="text-[11px] text-emerald-800 bg-emerald-50/70 px-2.5 py-1 rounded-lg font-medium truncate">
                              • {km}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Bottom Actions */}
                      <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[11px] text-slate-400 font-mono">
                          {startup.deployments.length} Live Deployments
                        </span>

                        <button
                          type="button"
                          onClick={() => setDetailStartupId(startup.id)}
                          className="px-4 py-2 rounded-full bg-[#1D64EC] hover:bg-brand-cobalt text-white font-bold text-xs shadow-sm flex items-center gap-1.5 transition-all"
                        >
                          <span>Inspect Dossier</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              ) : (
                <div className="glass-panel rounded-3xl p-12 text-center space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                    <Filter className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-navy-900">No matching startups found</h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Try adjusting your filters or search keywords to broaden your screening results.
                  </p>
                  <button
                    onClick={handleResetFilters}
                    className="px-5 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-navy-900 font-bold text-xs transition-colors"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </>
          )}

          {/* Cards Grid: Other Ecosystem Entities (Incubators, Accelerators, Corporates, Mentors, Universities, State Innovation Cells) */}
          {activeEntityTab !== 'Startups' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredOtherEntities.map(entity => (
                <div
                  key={entity.id}
                  className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-all"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#1D64EC] text-[10px] font-bold border border-blue-100 uppercase tracking-wider block w-max mb-1.5">
                          {entity.type}
                        </span>
                        <h3 className="font-bold text-sm text-navy-900 leading-snug">
                          {entity.name}
                        </h3>
                        <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span>{entity.location}</span>
                        </div>
                      </div>

                      <StatusBadge label="Verified Partner" variant="emerald" size="sm" icon="check" />
                    </div>

                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-700">
                      <span className="font-semibold text-navy-900 block mb-0.5">Focus & Domain Specialization:</span>
                      <p className="text-slate-600">{entity.focus}</p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-navy-900">
                      <strong className="text-[#1D64EC]">{entity.portfolioCount}</strong> Engaged Startups / Projects
                    </span>

                    <button
                      type="button"
                      className="px-4 py-2 rounded-full bg-slate-100 hover:bg-[#1D64EC] hover:text-white text-slate-700 font-bold text-xs transition-colors flex items-center gap-1"
                    >
                      <span>Connect Partner</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Right Area: Dedicated Filters Panel (Matching Reference Picture) */}
        <aside className="w-full lg:w-72 xl:w-80 shrink-0 sticky top-24">
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4">
            
            {/* Header: Filters + Clear */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-base font-bold text-navy-900 font-display">
                Filters
              </h2>
              {activeFiltersCount > 0 && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-xs text-slate-400 hover:text-rose-600 font-semibold transition-colors"
                >
                  Clear all
                </button>
              )}
            </div>

            {/* 1. DPIIT Recognised Startup */}
            <div className="py-1">
              <label className="flex items-start gap-3 text-xs text-slate-800 font-medium cursor-pointer hover:text-navy-900 select-none">
                <input
                  type="checkbox"
                  checked={dpiitRecognised}
                  onChange={(e) => setDpiitRecognised(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded text-[#1D64EC] focus:ring-[#1D64EC] border-slate-300 cursor-pointer"
                />
                <span>DPIIT Recognised Startup</span>
              </label>
            </div>

            <div className="border-t border-slate-100" />

            {/* 2. 80IAC Exempted Startups */}
            <div className="py-1">
              <label className="flex items-start gap-3 text-xs text-slate-800 font-medium cursor-pointer hover:text-navy-900 select-none">
                <input
                  type="checkbox"
                  checked={taxExempted80IAC}
                  onChange={(e) => setTaxExempted80IAC(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded text-[#1D64EC] focus:ring-[#1D64EC] border-slate-300 cursor-pointer"
                />
                <span>80IAC Exempted Startups</span>
              </label>
            </div>

            <div className="border-t border-slate-100" />

            {/* 3. INDUSTRY Section (Collapsible with orange minus/plus) */}
            <div className="space-y-3">
              <div 
                onClick={() => setIsIndustryOpen(!isIndustryOpen)}
                className="flex items-center justify-between cursor-pointer group"
              >
                <span className="text-xs font-bold text-navy-900 uppercase tracking-wider group-hover:text-[#1D64EC] transition-colors">
                  INDUSTRY
                </span>
                <span className="text-amber-600 font-bold text-base select-none">
                  {isIndustryOpen ? '−' : '+'}
                </span>
              </div>

              {isIndustryOpen && (
                <div className="space-y-2.5 pt-1 animate-in fade-in duration-150">
                  {/* Search inside Industry */}
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search Industry"
                      value={industrySearch}
                      onChange={(e) => setIndustrySearch(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-navy-900 outline-none focus:border-[#1D64EC] focus:bg-white placeholder:text-slate-400"
                    />
                  </div>

                  {/* Industry Checkbox List */}
                  <div className="max-h-48 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                    {visibleIndustries.map(ind => (
                      <label key={ind} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium cursor-pointer hover:text-navy-900 select-none">
                        <input
                          type="checkbox"
                          checked={selectedIndustries.includes(ind)}
                          onChange={() => toggleItem(selectedIndustries, setSelectedIndustries, ind)}
                          className="mt-0.5 w-3.5 h-3.5 rounded text-[#1D64EC] focus:ring-[#1D64EC] border-slate-300 cursor-pointer"
                        />
                        <span className="leading-snug">{ind}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-slate-100" />

            {/* 4. SECTOR Section */}
            <div className="space-y-2.5">
              <div 
                onClick={() => setIsSectorOpen(!isSectorOpen)}
                className="flex items-center justify-between cursor-pointer group"
              >
                <span className="text-xs font-bold text-navy-900 uppercase tracking-wider group-hover:text-[#1D64EC] transition-colors">
                  SECTOR
                </span>
                <span className="text-amber-600 font-bold text-base select-none">
                  {isSectorOpen ? '−' : '+'}
                </span>
              </div>

              {isSectorOpen && (
                <div className="space-y-2 pt-1 animate-in fade-in duration-150">
                  {allSectors.map(sec => (
                    <label key={sec} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium cursor-pointer hover:text-navy-900 select-none">
                      <input
                        type="checkbox"
                        checked={selectedSectors.includes(sec)}
                        onChange={() => toggleItem(selectedSectors, setSelectedSectors, sec)}
                        className="mt-0.5 w-3.5 h-3.5 rounded text-[#1D64EC] focus:ring-[#1D64EC] border-slate-300 cursor-pointer"
                      />
                      <span className="leading-snug">{sec}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-slate-100" />

            {/* 5. STAGE Section */}
            <div className="space-y-2.5">
              <div 
                onClick={() => setIsStageOpen(!isStageOpen)}
                className="flex items-center justify-between cursor-pointer group"
              >
                <span className="text-xs font-bold text-navy-900 uppercase tracking-wider group-hover:text-[#1D64EC] transition-colors">
                  STAGE
                </span>
                <span className="text-amber-600 font-bold text-base select-none">
                  {isStageOpen ? '−' : '+'}
                </span>
              </div>

              {isStageOpen && (
                <div className="space-y-2 pt-1 animate-in fade-in duration-150">
                  {allStages.map(st => (
                    <label key={st} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium cursor-pointer hover:text-navy-900 select-none">
                      <input
                        type="checkbox"
                        checked={selectedStages.includes(st)}
                        onChange={() => toggleItem(selectedStages, setSelectedStages, st)}
                        className="mt-0.5 w-3.5 h-3.5 rounded text-[#1D64EC] focus:ring-[#1D64EC] border-slate-300 cursor-pointer"
                      />
                      <span className="leading-snug">{st}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-slate-100" />

            {/* 6. STATE Section */}
            <div className="space-y-2.5">
              <div 
                onClick={() => setIsStateOpen(!isStateOpen)}
                className="flex items-center justify-between cursor-pointer group"
              >
                <span className="text-xs font-bold text-navy-900 uppercase tracking-wider group-hover:text-[#1D64EC] transition-colors">
                  STATE
                </span>
                <span className="text-amber-600 font-bold text-base select-none">
                  {isStateOpen ? '−' : '+'}
                </span>
              </div>

              {isStateOpen && (
                <div className="space-y-2 pt-1 animate-in fade-in duration-150">
                  {allStates.map(st => (
                    <label key={st} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium cursor-pointer hover:text-navy-900 select-none">
                      <input
                        type="checkbox"
                        checked={selectedStates.includes(st)}
                        onChange={() => toggleItem(selectedStates, setSelectedStates, st)}
                        className="mt-0.5 w-3.5 h-3.5 rounded text-[#1D64EC] focus:ring-[#1D64EC] border-slate-300 cursor-pointer"
                      />
                      <span className="leading-snug">{st}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-slate-100" />

            {/* 7. CITY Section */}
            <div className="space-y-2.5">
              <div 
                onClick={() => setIsCityOpen(!isCityOpen)}
                className="flex items-center justify-between cursor-pointer group"
              >
                <span className="text-xs font-bold text-navy-900 uppercase tracking-wider group-hover:text-[#1D64EC] transition-colors">
                  CITY
                </span>
                <span className="text-amber-600 font-bold text-base select-none">
                  {isCityOpen ? '−' : '+'}
                </span>
              </div>

              {isCityOpen && (
                <div className="space-y-2 pt-1 animate-in fade-in duration-150">
                  {allCities.map(city => (
                    <label key={city} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium cursor-pointer hover:text-navy-900 select-none">
                      <input
                        type="checkbox"
                        checked={selectedCities.includes(city)}
                        onChange={() => toggleItem(selectedCities, setSelectedCities, city)}
                        className="mt-0.5 w-3.5 h-3.5 rounded text-[#1D64EC] focus:ring-[#1D64EC] border-slate-300 cursor-pointer"
                      />
                      <span className="leading-snug">{city}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-slate-100" />

            {/* 8. International Users */}
            <div className="pt-1">
              <label className="flex items-start gap-3 text-xs text-slate-800 font-medium cursor-pointer hover:text-navy-900 select-none">
                <input
                  type="checkbox"
                  checked={internationalUsers}
                  onChange={(e) => setInternationalUsers(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded text-[#1D64EC] focus:ring-[#1D64EC] border-slate-300 cursor-pointer"
                />
                <span>International Users</span>
              </label>
            </div>

          </div>
        </aside>

      </div>

      {/* Startup Detail Modal */}
      {detailStartupId && (
        <StartupDetailModal
          startupId={detailStartupId}
          onClose={() => setDetailStartupId(null)}
        />
      )}

    </div>
  );
};
