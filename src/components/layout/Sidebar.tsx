import React from 'react';
import { 
  LayoutDashboard, FilePlus2, Compass, ClipboardCheck, 
  Scale, Activity, ShieldCheck, Layers, FileSignature, 
  Rocket, FolderSearch, Ticket, FileSpreadsheet, Settings, 
  Award, History, Shield, Users, LogOut, LucideIcon, Bot, ShoppingCart, FolderArchive 
} from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';
import clsx from 'clsx';

interface NavSection {
  title: string;
  items: {
    id: string;
    label: string;
    badge?: string | number;
    icon: LucideIcon;
  }[];
}

export const Sidebar: React.FC = () => {
  const { currentRole, activeTab, setActiveTab, proposals, contracts, challenges } = usePlatform();

  const activeChallengesCount = challenges.filter(c => c.status === 'Open').length;
  const pendingContracts = contracts.filter(c => c.govStatus === 'pending' || c.startupStatus === 'pending').length;

  const getSections = (): NavSection[] => {
    switch (currentRole) {
      case 'gov':
        return [
          {
            title: 'GOVTECH PORTAL',
            items: [
              { id: 'dashboard', label: 'Government Dashboard', icon: LayoutDashboard },
              { id: 'challenges', label: 'Problem Statements', badge: activeChallengesCount, icon: FilePlus2 },
              { id: 'directory', label: 'Startup Directory', icon: Compass },
              { id: 'ai_evaluator', label: 'AI Evaluator', icon: Bot },
            ]
          },
          {
            title: 'PILOTS & MONITORING',
            items: [
              { id: 'expert_clearance', label: 'Expert Evaluation', icon: ClipboardCheck },
              { id: 'monitor', label: 'Work Area / Monitor', icon: Activity },
              { id: 'contracts', label: 'Contract Approval', badge: pendingContracts > 0 ? pendingContracts : undefined, icon: Scale },
              { id: 'gem', label: 'GeM', icon: ShoppingCart },
              { id: 'reports', label: 'Reports & Insights', icon: FileSpreadsheet },
            ]
          },
          {
            title: 'ACCOUNT & SUPPORT',
            items: [
              { id: 'settings', label: 'Department Settings', icon: Settings },
            ]
          }
        ];

      case 'startup':
        return [
          {
            title: 'STARTUP PORTAL',
            items: [
              { id: 'dashboard', label: 'Startup Dashboard', icon: LayoutDashboard },
              { id: 'passport', label: 'Evidence Archive', icon: FolderArchive },
              { id: 'challenges', label: 'Explore Challenges', badge: activeChallengesCount, icon: FolderSearch },
            ]
          },
          {
            title: 'PIPELINE & PILOTS',
            items: [
              { id: 'applications', label: 'Proposal Tracker', icon: Layers },
              { id: 'execution', label: 'Active Pilot Workspace', icon: Rocket },
              { id: 'contracts', label: 'Digital Contract Signing', badge: pendingContracts > 0 ? pendingContracts : undefined, icon: FileSignature },
              { id: 'gem', label: 'GeM Fast-Track Scale', icon: ShieldCheck },
            ]
          },
          {
            title: 'ACCOUNT & SUPPORT',
            items: [
              { id: 'settings', label: 'Company Settings', icon: Settings },
            ]
          }
        ];
    }
  };

  const sections = getSections();

  const getRoleHeaderSubtitle = () => {
    switch (currentRole) {
      case 'gov': return 'GOVERNMENT WORKSPACE';
      case 'startup': return 'STARTUP WORKSPACE';
    }
  };

  return (
    <aside className="w-64 xl:w-72 h-screen sticky top-0 bg-[#1D64EC] text-white flex flex-col justify-between p-5 shrink-0 overflow-y-auto custom-scrollbar border-r border-blue-600/40 select-none">
      
      {/* Top Brand Block */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 px-1 pt-1">
          <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md p-2 flex items-center justify-center shadow-inner border border-white/30 shrink-0">
            {/* Geometric Glowing Logo emblem */}
            <div className="w-full h-full bg-emerald-400 rounded-lg flex items-center justify-center shadow-xs">
              <span className="text-[#1D64EC] font-black text-xs font-display">MP</span>
            </div>
          </div>
          <div>
            <h1 className="font-extrabold text-base tracking-tight font-display text-white leading-tight">
              Mahatech Procure
            </h1>
            <p className="text-[9px] font-bold tracking-[0.14em] uppercase text-blue-200 mt-0.5">
              {getRoleHeaderSubtitle()}
            </p>
          </div>
        </div>

        {/* Navigation Sections */}
        <nav className="space-y-5">
          {sections.map((section, sIdx) => (
            <div key={sIdx} className="space-y-1.5">
              <div className="text-[10px] font-extrabold tracking-[0.12em] uppercase text-blue-200/90 px-3 pb-1">
                {section.title}
              </div>

              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveTab(item.id)}
                      className={clsx(
                        "w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-left transition-all duration-150 group",
                        isActive
                          ? "bg-white text-[#1D64EC] font-bold shadow-md shadow-blue-900/10"
                          : "text-white/85 hover:bg-white/10 hover:text-white font-medium"
                      )}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <Icon
                          className={clsx(
                            "w-4 h-4 shrink-0 transition-colors",
                            isActive ? "text-[#1D64EC]" : "text-blue-200 group-hover:text-white"
                          )}
                        />
                        <span className="text-xs truncate">{item.label}</span>
                      </div>

                      {item.badge !== undefined && (
                        <span
                          className={clsx(
                            "text-[10px] font-extrabold px-2 py-0.5 rounded-full shrink-0 ml-2",
                            isActive
                              ? "bg-blue-100 text-[#1D64EC]"
                              : "bg-white/20 text-white"
                          )}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Bottom Information Card */}
      <div className="pt-4 space-y-2">
        <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md text-[11px]">
          <p className="font-bold text-white uppercase tracking-wider text-[10px] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            MAHATECH PROCURE v2.0
          </p>
          <p className="text-blue-100 text-[10px] mt-1 leading-relaxed">
            Government of Maharashtra Innovation Procurement Pathway.
          </p>
        </div>
      </div>

    </aside>
  );
};
