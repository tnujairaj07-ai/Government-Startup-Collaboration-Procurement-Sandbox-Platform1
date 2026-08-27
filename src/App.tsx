import React from 'react';
import { PlatformProvider, usePlatform } from './context/PlatformContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { SearchCommand } from './components/common/SearchCommand';
import { ComingSoon } from './components/common/ComingSoon';

// Government Portal Components
import { GovDashboard } from './components/gov/GovDashboard';
import { GovChallenges } from './components/gov/GovChallenges';
import { StartupDirectory } from './components/gov/StartupDirectory';
import { AIEvaluator } from './components/gov/AIEvaluator';
import { ExpertReviewClearance } from './components/gov/ExpertReviewClearance';
import { ContractApprovalGate } from './components/gov/ContractApprovalGate';
import { PilotTelemetryMonitor } from './components/gov/PilotTelemetryMonitor';

// Startup Portal Components
import { StartupDashboard } from './components/startup/StartupDashboard';
import { CompanyEvidenceArchive } from './components/startup/CompanyEvidenceArchive';
import { ChallengeExplorer } from './components/startup/ChallengeExplorer';
import { ApplicationTracker } from './components/startup/ApplicationTracker';
import { DigitalContractSigner } from './components/startup/DigitalContractSigner';
import { ExecutionWorkspace } from './components/startup/ExecutionWorkspace';

const MainContent: React.FC = () => {
  const { currentRole, activeTab } = usePlatform();

  const renderContent = () => {
    switch (currentRole) {
      case 'gov':
        switch (activeTab) {
          case 'dashboard':
            return <GovDashboard />;
          case 'challenges':
            return <GovChallenges />;
          case 'directory':
            return <StartupDirectory />;
          case 'ai_evaluator':
            return <AIEvaluator />;
          case 'expert_clearance':
            return <ExpertReviewClearance />;
          case 'monitor':
            return <PilotTelemetryMonitor />;
          case 'contracts':
            return <ContractApprovalGate />;
          case 'gem':
            return <ComingSoon title="GeM" category="Government e-Marketplace Integration" />;
          case 'reports':
            return <ComingSoon title="Reports & Insights" category="Government Analytics" />;
          case 'settings':
            return <ComingSoon title="Department Settings" category="Account & Support" />;
          default:
            return <GovDashboard />;
        }

      case 'startup':
        switch (activeTab) {
          case 'dashboard':
            return <StartupDashboard />;
          case 'passport':
            return <CompanyEvidenceArchive />;
          case 'challenges':
            return <ChallengeExplorer />;
          case 'applications':
            return <ApplicationTracker />;
          case 'execution':
            return <ExecutionWorkspace />;
          case 'gem':
            return <ComingSoon title="GeM Fast-Track Scale Gateway" category="Government e-Marketplace Integration" />;
          case 'contracts':
            return <DigitalContractSigner />;
          case 'settings':
            return <ComingSoon title="Company Settings" category="Account & Support" />;
          default:
            return <StartupDashboard />;
        }
    }
  };

  return (
    <div className="min-h-screen flex bg-[#F4F7FC]">
      {/* Full-Height Left Sidebar */}
      <Sidebar />

      {/* Main Right Column */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <Header />
        
        <main className="flex-1 p-6 sm:p-8 w-full overflow-y-auto">
          {renderContent()}
        </main>

        <footer className="py-4 px-6 sm:px-8 text-xs text-slate-500 border-t border-slate-200/80 bg-white flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-semibold text-navy-900">Mahatech Procure — Problem Statement 26136</p>
          <p className="text-[11px] text-slate-400">
            Government of Maharashtra • From Challenge to Scale – A Transparent Pathway for Government Innovation
          </p>
        </footer>
      </div>

      {/* Global Search Command (Cmd+K) */}
      <SearchCommand />
    </div>
  );
};

export function App() {
  return (
    <PlatformProvider>
      <MainContent />
    </PlatformProvider>
  );
}

export default App;
