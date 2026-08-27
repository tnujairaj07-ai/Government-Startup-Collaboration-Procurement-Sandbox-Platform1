import React, { useState } from 'react';
import { 
  Building2, Rocket, Award, Shield, Bell, Search, 
  ChevronDown, Check, Sparkles, Home 
} from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';
import { PortalRole } from '../../types';

export const Header: React.FC = () => {
  const { 
    currentRole, setCurrentRole, setActiveTab, activeTab,
    notifications, markNotificationAsRead, setIsCommandPaletteOpen,
    currentStartup, setIsLandingPage
  } = usePlatform();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);

  const unreadNotifs = notifications.filter(n => !n.read);

  const getPageTitle = () => {
    switch (currentRole) {
      case 'gov':
        switch (activeTab) {
          case 'dashboard': return 'Executive Command Workspace';
          case 'challenges': return 'Problem Statements & Challenges';
          case 'directory': return 'Startup Directory & Screening';
          case 'ai_evaluator': return 'AI Evaluator & Shortlisting Engine';
          case 'expert_clearance': return 'Expert Evaluation & Clearance';
          case 'monitor': return 'Pilot Telemetry & Milestone Monitor';
          case 'contracts': return 'Contract Approval & Legal Sign-off';
          case 'gem': return 'GeM Fast-Track Scale Gateway';
          case 'reports': return 'Department Reports & Analytics';
          case 'settings': return 'Department Settings';
          default: return 'Government Department Workspace';
        }
      case 'startup':
        switch (activeTab) {
          case 'dashboard': return 'Founder Command Workspace';
          case 'passport': return 'Company Evidence Archive & Verified Profile';
          case 'challenges': return 'Explore Government Challenges';
          case 'applications': return 'Proposal & Application Tracker';
          case 'execution': return 'Active Pilot Execution Workspace';
          case 'contracts': return 'Digital Contract Signing & Invoicing';
          case 'gem': return 'GeM Fast-Track Scale Gateway';
          case 'settings': return 'Company Settings';
          default: return 'Innovator Startup Workspace';
        }
    }
  };

  const getUserProfile = () => {
    switch (currentRole) {
      case 'gov':
        return {
          name: 'Shri Rajesh Deshmukh',
          role: 'Joint Secretary – Urban Development',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
          initials: 'RD'
        };
      case 'startup':
        return {
          name: currentStartup.founderName || 'Ms. Anjali Patil',
          role: `CEO – ${currentStartup.name}`,
          avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
          initials: 'AP'
        };
    }
  };

  const user = getUserProfile();

  const handleRoleSelect = (role: PortalRole) => {
    setCurrentRole(role);
    setIsRoleMenuOpen(false);
  };

  return (
    <header className="h-20 bg-white border-b border-slate-200/80 px-6 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      
      {/* Left: Prominent Page Title */}
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-navy-900 tracking-tight font-display">
          {getPageTitle()}
        </h1>
      </div>

      {/* Right Controls: Search, Switcher, Notification, Profile Capsule */}
      <div className="flex items-center gap-3 sm:gap-4">
        
        {/* Back to Landing Page Button */}
        <button
          type="button"
          onClick={() => setIsLandingPage(true)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold transition-all shadow-2xs"
          title="Return to Main Landing Page"
        >
          <Home className="w-3.5 h-3.5 text-orange-600" />
          <span className="hidden sm:inline">Landing Page</span>
        </button>

        {/* Quick Search Command Button */}
        <button
          onClick={() => setIsCommandPaletteOpen(true)}
          className="hidden md:flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-slate-100/90 hover:bg-slate-200/80 text-slate-500 hover:text-navy-900 transition-all text-xs font-semibold"
        >
          <Search className="w-3.5 h-3.5 text-slate-400" />
          <span>Quick Search...</span>
          <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-white border border-slate-200 rounded text-slate-500 shadow-xs">
            ⌘K
          </kbd>
        </button>

        {/* 2-Role Switcher Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsRoleMenuOpen(!isRoleMenuOpen)}
            className="flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-navy-900 transition-all"
          >
            <span className="text-[10px] uppercase tracking-wider text-slate-500 hidden sm:inline">Role:</span>
            <span className="text-[#1D64EC]">
              {currentRole === 'gov' ? 'Gov Dept' : 'Startup'}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {/* 2-Role Menu */}
          {isRoleMenuOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-3 py-2 border-b border-slate-100 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Select Portal Role</span>
              </div>

              <button
                onClick={() => handleRoleSelect('gov')}
                className={`w-full p-2.5 rounded-xl text-left flex items-center gap-3 transition-colors ${
                  currentRole === 'gov' ? 'bg-blue-50 text-[#1D64EC] font-bold' : 'hover:bg-slate-50 text-slate-700'
                }`}
              >
                <Building2 className="w-4 h-4 text-[#1D64EC]" />
                <div className="flex-1 text-xs">Government Department</div>
                {currentRole === 'gov' && <Check className="w-4 h-4 text-[#1D64EC]" />}
              </button>

              <button
                onClick={() => handleRoleSelect('startup')}
                className={`w-full p-2.5 rounded-xl text-left flex items-center gap-3 transition-colors mt-1 ${
                  currentRole === 'startup' ? 'bg-emerald-50 text-emerald-800 font-bold' : 'hover:bg-slate-50 text-slate-700'
                }`}
              >
                <Rocket className="w-4 h-4 text-emerald-600" />
                <div className="flex-1 text-xs">Startup / Innovator</div>
                {currentRole === 'startup' && <Check className="w-4 h-4 text-emerald-600" />}
              </button>
            </div>
          )}
        </div>

        {/* Notifications Icon Button */}
        <div className="relative">
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="w-10 h-10 rounded-2xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 hover:text-navy-900 transition-colors relative"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadNotifs.length > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#1D64EC] rounded-full ring-2 ring-white" />
            )}
          </button>

          {/* Notification Drawer */}
          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-100 p-3 z-50">
              <div className="flex items-center justify-between px-2 py-2 border-b border-slate-100 mb-2">
                <span className="text-xs font-bold text-navy-900 uppercase tracking-wider">
                  Activity Notices
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-[#1D64EC]">
                  {unreadNotifs.length} new
                </span>
              </div>

              <div className="max-h-80 overflow-y-auto space-y-2 custom-scrollbar">
                {notifications.map(n => (
                  <div
                    key={n.id}
                    onClick={() => {
                      markNotificationAsRead(n.id);
                      if (n.actionPath) {
                        setActiveTab(n.actionPath);
                        setIsNotifOpen(false);
                      }
                    }}
                    className={`p-3 rounded-xl transition-all cursor-pointer text-xs border ${
                      n.read 
                        ? 'bg-slate-50/70 border-slate-100 text-slate-600' 
                        : 'bg-blue-50/60 border-blue-200 text-navy-900 font-medium'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-[11px] text-navy-900">{n.title}</span>
                      <span className="text-[10px] text-slate-400">{n.timestamp}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                      {n.message}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Capsule (Reference Style: [Avatar] Name Role) */}
        <div className="flex items-center gap-3 pl-2 sm:pl-3 border-l border-slate-200">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-10 h-10 rounded-2xl object-cover border border-slate-200 shadow-xs"
          />
          <div className="text-left hidden lg:block">
            <p className="text-xs font-bold text-navy-900 leading-tight">{user.name}</p>
            <p className="text-[10px] font-medium text-slate-400 mt-0.5">{user.role}</p>
          </div>
        </div>

      </div>

    </header>
  );
};
