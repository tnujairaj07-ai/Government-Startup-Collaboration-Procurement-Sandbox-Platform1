import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  PortalRole, Challenge, Startup, Proposal, Contract, TelemetryFeed, 
  AppNotification, ExpertScorecard, AdminAuditLog
} from '../types';
import { 
  INITIAL_CHALLENGES, INITIAL_STARTUPS, INITIAL_PROPOSALS, 
  INITIAL_CONTRACTS, INITIAL_TELEMETRY_FEEDS, INITIAL_NOTIFICATIONS, INITIAL_ADMIN_LOGS,
  EMPTY_STARTUP 
} from '../data/mockData';
import confetti from 'canvas-confetti';

interface PlatformContextType {
  currentRole: PortalRole;
  setCurrentRole: (role: PortalRole) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  
  // Data entities
  challenges: Challenge[];
  startups: Startup[];
  proposals: Proposal[];
  contracts: Contract[];
  telemetryFeeds: TelemetryFeed[];
  notifications: AppNotification[];
  adminLogs: AdminAuditLog[];
  
  // Current active startup for the Startup Portal view (AquaSense Technologies)
  currentStartup: Startup;
  updateStartupProfile: (updates: Partial<Startup>) => void;
  
  // Actions
  addChallenge: (newCh: Partial<Challenge>) => Challenge;
  submitProposal: (proposalData: Partial<Proposal>) => Proposal;
  evaluateProposal: (proposalId: string, scorecard: ExpertScorecard) => void;
  approveGovContract: (contractId: string, officialName: string) => void;
  signStartupContract: (contractId: string, signerName: string, aadhaarMasked: string) => void;
  submitMilestoneDeliverable: (proposalId: string, milestoneId: string, proofUrl: string, proofNotes: string) => void;
  validateMilestoneM2: (proposalId: string, milestoneId: string) => void;
  markNotificationAsRead: (id: string) => void;
  addNotification: (notif: Omit<AppNotification, 'id' | 'timestamp' | 'read'>) => void;
  
  // UI Selection States
  selectedChallengeId: string | null;
  setSelectedChallengeId: (id: string | null) => void;
  selectedStartupId: string | null;
  setSelectedStartupId: (id: string | null) => void;
  selectedProposalId: string | null;
  setSelectedProposalId: (id: string | null) => void;
  isCommandPaletteOpen: boolean;
  setIsCommandPaletteOpen: (open: boolean) => void;
  isLandingPage: boolean;
  setIsLandingPage: (isLanding: boolean) => void;
  isLoginPage: boolean;
  setIsLoginPage: (isLogin: boolean) => void;
  openLogin: (defaultRole?: PortalRole) => void;
  openPortal: (role: PortalRole, tab?: string) => void;
}

const PlatformContext = createContext<PlatformContextType | undefined>(undefined);

export const PlatformProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLandingPage, setIsLandingPage] = useState<boolean>(true);
  const [isLoginPage, setIsLoginPage] = useState<boolean>(false);
  const [currentRole, setCurrentRoleState] = useState<PortalRole>('gov');
  const [activeTab, setActiveTabState] = useState<string>('dashboard');

  const [challenges, setChallenges] = useState<Challenge[]>(INITIAL_CHALLENGES);
  const [startups, setStartups] = useState<Startup[]>(INITIAL_STARTUPS);
  const [proposals, setProposals] = useState<Proposal[]>(INITIAL_PROPOSALS);
  const [contracts, setContracts] = useState<Contract[]>(INITIAL_CONTRACTS);
  const [telemetryFeeds] = useState<TelemetryFeed[]>(INITIAL_TELEMETRY_FEEDS);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const [adminLogs] = useState<AdminAuditLog[]>(INITIAL_ADMIN_LOGS);

  const [selectedChallengeId, setSelectedChallengeId] = useState<string | null>(null);
  const [selectedStartupId, setSelectedStartupId] = useState<string | null>(null);
  const [selectedProposalId, setSelectedProposalId] = useState<string | null>(null);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);

  // Clear any existing localStorage or sessionStorage
  useEffect(() => {
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch (e) {
      // Ignore if storage is inaccessible
    }
  }, []);

  // Current active startup for founder view (defaults to empty startup when no data)
  const currentStartup = startups[0] || EMPTY_STARTUP;

  const setCurrentRole = (role: PortalRole) => {
    setCurrentRoleState(role);
    setActiveTabState('dashboard');
  };

  const openLogin = (defaultRole?: PortalRole) => {
    if (defaultRole) {
      setCurrentRoleState(defaultRole);
    }
    setIsLandingPage(false);
    setIsLoginPage(true);
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e) {}
  };

  const openPortal = (role: PortalRole, tab: string = 'dashboard') => {
    setCurrentRoleState(role);
    setActiveTabState(tab);
    setIsLandingPage(false);
    setIsLoginPage(false);
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e) {}
  };

  const setActiveTab = (tab: string) => {
    setActiveTabState(tab);
  };

  const addNotification = (notif: Omit<AppNotification, 'id' | 'timestamp' | 'read'>) => {
    const newNotif: AppNotification = {
      ...notif,
      id: 'NOTIF-' + Date.now(),
      timestamp: 'Just now',
      read: false,
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const updateStartupProfile = (updates: Partial<Startup>) => {
    setStartups(prev => prev.map((s, idx) => idx === 0 ? { ...s, ...updates } : s));
    addNotification({
      title: 'Evidence Passport Updated',
      message: 'Verified capability profile has been updated.',
      portal: 'startup',
      type: 'success'
    });
  };

  const addChallenge = (newCh: Partial<Challenge>): Challenge => {
    const codeNum = challenges.length + 1;
    const created: Challenge = {
      id: 'CH-00' + codeNum,
      code: `MH-2026-${(newCh.sector || 'GEN').substring(0, 3).toUpperCase()}-0${codeNum}`,
      title: newCh.title || 'AI-powered Water Leakage Detection for Urban Pipelines',
      department: newCh.department || 'Maharashtra Water Supply & Sanitation Department',
      sector: newCh.sector || 'Smart Water & AI/ML IoT',
      domain: newCh.domain || 'Water',
      location: newCh.location || ['Pune', 'Nagpur', 'Thane'],
      description: newCh.description || '',
      problemSummary: newCh.problemSummary || '',
      budget: newCh.budget || 'INR 25–40 Lakhs',
      budgetMin: newCh.budgetMin || 2500000,
      budgetMax: newCh.budgetMax || 4000000,
      pilotDurationMonths: newCh.pilotDurationMonths || 6,
      scaleDecisionMonth: newCh.scaleDecisionMonth || 7,
      trlMin: newCh.trlMin || 7,
      deadline: newCh.deadline || '2026-10-31',
      status: 'Open',
      createdAt: new Date().toISOString().split('T')[0],
      priority: newCh.priority || 'Critical',
      tags: newCh.tags || ['AI/ML', 'IoT', 'Water'],
      securityCompliance: newCh.securityCompliance || [
        'Data resides in India (MeitY compliant)',
        'SCADA / ITMS Integration',
        'Maharashtra State Cyber Policy v2.0'
      ],
      ipTerms: newCh.ipTerms || 'Startup retains core algorithm IP; Government gets perpetual royalty-free license for internal use.',
      matchedStartupsCount: 3,
      proposalsCount: 0,
      aiDecomposition: newCh.aiDecomposition || {
        objectives: ['Deploy real-time acoustic sensors in target zone', 'Achieve >20% reduction in NRW'],
        keyMetrics: ['≥20% reduction in water loss', 'Alert response time <15 mins', 'Cost saved >INR 10 Lakhs/month'],
        recommendedTech: ['Acoustic IoT Clamp Sensors', 'LoRaWAN Edge Gateway', 'Kalman Hydraulic Digital Twin'],
        estimatedCostRange: 'INR 25–40 Lakhs'
      }
    };

    setChallenges(prev => [created, ...prev]);

    addNotification({
      title: 'Challenge Published',
      message: `"${created.title}" published by ${created.department}.`,
      portal: 'startup',
      type: 'violet',
      actionPath: 'challenges'
    });

    confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    return created;
  };

  const submitProposal = (proposalData: Partial<Proposal>): Proposal => {
    const newProp: Proposal = {
      id: 'PR-' + Date.now(),
      challengeId: proposalData.challengeId || 'CH-001',
      challengeTitle: proposalData.challengeTitle || 'AI-powered Water Leakage Detection for Urban Pipelines',
      department: proposalData.department || 'Maharashtra Water Supply & Sanitation Department',
      startupId: currentStartup.id,
      startupName: currentStartup.name,
      proposedSolutionName: proposalData.proposedSolutionName || 'AquaMind Leakage Detection Suite',
      startupLogo: currentStartup.logo,
      submittedAt: new Date().toISOString(),
      status: 'submitted',
      problemUnderstanding: proposalData.problemUnderstanding || 'High non-revenue water loss in urban distribution networks.',
      approachSummary: proposalData.approachSummary || '',
      architectureDetails: proposalData.architectureDetails || '',
      expectedOutcomes: proposalData.expectedOutcomes || ['≥20% reduction in water loss in 6 months', '<15 min alert response time'],
      timelineMonths: proposalData.timelineMonths || 6,
      requestedBudget: proposalData.requestedBudget || 'INR 35 Lakhs',
      teamAllocation: proposalData.teamAllocation || ['Project Lead – 1', 'Data Scientists – 2', 'Field Engineers – 3'],
      milestones: proposalData.milestones || [
        {
          id: 'M1',
          number: 1,
          title: 'Deployment & Baseline Calibration',
          deliverableDescription: 'Sensor deployment across Zone A and SCADA baseline sync.',
          durationWeeks: 6,
          payoutPercentage: 30,
          payoutAmount: 'INR 10.5 Lakhs',
          status: 'pending'
        },
        {
          id: 'M2',
          number: 2,
          title: '3-Month Performance Review',
          deliverableDescription: 'Real-time telemetry and 90-day leak resolution data.',
          durationWeeks: 12,
          payoutPercentage: 40,
          payoutAmount: 'INR 14.0 Lakhs',
          status: 'pending'
        },
        {
          id: 'M3',
          number: 3,
          title: 'Final Validation & Handover',
          deliverableDescription: 'Final KPI validation and GeM cataloging.',
          durationWeeks: 6,
          payoutPercentage: 30,
          payoutAmount: 'INR 10.5 Lakhs',
          status: 'pending'
        }
      ],
      aiFitScore: 96
    };

    setProposals(prev => [newProp, ...prev]);

    setChallenges(prev => prev.map(c => c.id === newProp.challengeId ? { ...c, proposalsCount: c.proposalsCount + 1 } : c));

    addNotification({
      title: 'Proposal Received',
      message: `Proposal received for "${newProp.challengeTitle}" from ${currentStartup.name}.`,
      portal: 'gov',
      type: 'info',
      actionPath: 'proposals'
    });

    confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
    return newProp;
  };

  const evaluateProposal = (proposalId: string, scorecard: ExpertScorecard) => {
    setProposals(prev => prev.map(p => {
      if (p.id === proposalId) {
        return {
          ...p,
          status: scorecard.recommendationVerdict.includes('Recommend') ? 'contract_pending' : 'screening_passed',
          expertScorecard: scorecard
        };
      }
      return p;
    }));

    addNotification({
      title: 'Expert Scorecard Submitted',
      message: `Review completed by ${scorecard.reviewerName} (Score: ${scorecard.weightedTotal}/100).`,
      portal: 'gov',
      type: 'success'
    });
  };

  const approveGovContract = (contractId: string, officialName: string) => {
    setContracts(prev => prev.map(c => c.id === contractId ? {
      ...c,
      govStatus: 'approved',
      approvedByGovOfficial: officialName,
      govApprovedAt: new Date().toISOString()
    } : c));

    addNotification({
      title: 'Contract Approved by Department',
      message: `Contract approved by ${officialName}. Ready for startup e-signature.`,
      portal: 'startup',
      type: 'warning',
      actionPath: 'contracts'
    });
  };

  const signStartupContract = (contractId: string, signerName: string, aadhaarMasked: string) => {
    const hash = '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');

    setContracts(prev => prev.map(c => {
      if (c.id === contractId) {
        return {
          ...c,
          startupStatus: 'signed',
          signedAt: new Date().toISOString(),
          signerName,
          signerAadhaarMasked: aadhaarMasked,
          signatureHash: hash,
          auditTrail: [
            ...c.auditTrail,
            {
              timestamp: new Date().toLocaleString(),
              action: 'Digitally signed via Aadhaar eSign',
              actor: signerName,
              ip: '117.204.12.88'
            }
          ]
        };
      }
      return c;
    }));

    setProposals(prev => prev.map(p => p.startupId === currentStartup.id ? { ...p, status: 'pilot_ongoing' } : p));

    addNotification({
      title: 'Pilot Agreement Executed! 🚀',
      message: `Aadhaar eSign verified for ${signerName}. Pilot is now officially active.`,
      portal: 'both',
      type: 'success',
      actionPath: 'pilots'
    });

    confetti({ particleCount: 140, spread: 85, origin: { y: 0.5 } });
  };

  const submitMilestoneDeliverable = (proposalId: string, milestoneId: string, proofUrl: string, proofNotes: string) => {
    const hash = '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    
    setProposals(prev => prev.map(p => {
      if (p.id === proposalId) {
        return {
          ...p,
          milestones: p.milestones.map(m => m.id === milestoneId ? {
            ...m,
            status: 'submitted',
            proofUrl,
            proofNotes,
            submissionHash: hash,
            submittedDate: new Date().toISOString().split('T')[0],
            evidenceFilesCount: (m.evidenceFilesCount || 0) + 1
          } : m)
        };
      }
      return p;
    }));

    addNotification({
      title: 'Milestone Evidence Submitted',
      message: `AquaSense Technologies uploaded evidence for Milestone #${milestoneId}.`,
      portal: 'gov',
      type: 'violet',
      actionPath: 'pilots'
    });
  };

  const validateMilestoneM2 = (proposalId: string, milestoneId: string) => {
    setProposals(prev => prev.map(p => {
      if (p.id === proposalId) {
        return {
          ...p,
          milestones: p.milestones.map(m => m.id === milestoneId ? {
            ...m,
            status: 'approved',
            approvedDate: new Date().toISOString().split('T')[0]
          } : m)
        };
      }
      return p;
    }));

    addNotification({
      title: 'Pilot Milestone #2 Approved & Paid',
      message: 'Milestone M2 validated by Department. Escrow release of INR 14.0 Lakhs authorized.',
      portal: 'both',
      type: 'success',
      actionPath: 'pilots'
    });

    confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
  };

  return (
    <PlatformContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        activeTab,
        setActiveTab,
        challenges,
        startups,
        proposals,
        contracts,
        telemetryFeeds,
        notifications,
        adminLogs,
        currentStartup,
        updateStartupProfile,
        addChallenge,
        submitProposal,
        evaluateProposal,
        approveGovContract,
        signStartupContract,
        submitMilestoneDeliverable,
        validateMilestoneM2,
        markNotificationAsRead,
        addNotification,
        selectedChallengeId,
        setSelectedChallengeId,
        selectedStartupId,
        setSelectedStartupId,
        selectedProposalId,
        setSelectedProposalId,
        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
        isLandingPage,
        setIsLandingPage,
        isLoginPage,
        setIsLoginPage,
        openLogin,
        openPortal
      }}
    >
      {children}
    </PlatformContext.Provider>
  );
};

export const usePlatform = () => {
  const context = useContext(PlatformContext);
  if (!context) {
    throw new Error('usePlatform must be used within a PlatformProvider');
  }
  return context;
};
