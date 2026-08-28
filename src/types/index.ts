export type PortalRole = 'gov' | 'startup';

export type GovDepartment = 
  | 'Maharashtra Water Supply & Sanitation Department'
  | 'Department of Urban Development'
  | 'Agriculture & Rural Development Department'
  | 'Public Health & Family Welfare Department'
  | 'Maharashtra Police & Cyber Command'
  | 'Environment & Climate Change Department'
  | 'Energy, Industries & Labour Department';

export interface AIDecomposition {
  objectives: string[];
  keyMetrics: string[];
  recommendedTech: string[];
  estimatedCostRange: string;
}

export interface Challenge {
  id: string;
  code: string;
  psNumber?: string;
  title: string;
  organization?: string;
  department: string;
  category?: 'Software' | 'Hardware' | 'DeepTech';
  submittedIdeasCount?: string;
  theme?: string;
  deadlineSubmission?: string;
  sector: string;
  domain: 'Water' | 'Energy' | 'Transport' | 'Health' | 'Agriculture' | 'Urban' | 'Environment';
  location: string[];
  description: string;
  problemSummary: string;
  budget: string;
  budgetMin: number;
  budgetMax: number;
  pilotDurationMonths: number;
  scaleDecisionMonth: number;
  trlMin: number;
  deadline: string;
  status: 'Open' | 'Closing Soon' | 'Shortlisting' | 'Pilot Ongoing' | 'Completed';
  createdAt: string;
  securityCompliance: string[];
  ipTerms: string;
  tags: string[];
  matchedStartupsCount: number;
  proposalsCount: number;
  aiDecomposition: AIDecomposition;
  priority: 'High' | 'Critical' | 'Medium';
}

export interface RadarMetric {
  attribute: string;
  value: number; // 0 to 100
  benchmark: number;
}

export interface PastTrackRecord {
  id: string;
  title: string;
  client: string;
  year: string;
  status: 'Completed' | 'Scaled' | 'Validated' | 'Ongoing Deployment';
  budget: string;
  outcome: string;
}

export interface Startup {
  id: string;
  name: string;
  tagline: string;
  legalName?: string;
  brandName?: string;
  description?: string;
  sector?: string;
  email?: string;
  phone?: string;
  headquarters?: string;
  website?: string;
  complianceScore?: number;
  incorporationDate?: string;
  gstin?: string;
  dpiitVerified?: boolean;
  logo: string;
  domains: string[];
  techStack: string[];
  stage: 'Prototype' | 'Pilot-ready' | 'Scaled' | 'Seed' | 'Early Traction' | 'Validation' | 'In Pilot';
  location: string;
  trl: number;
  trlLevel?: number;
  dpiitNumber: string;
  dpiitRecognized: boolean;
  gemReady: boolean;
  gemRegistered?: boolean;
  gemSellerId: string;
  yearFounded: number;
  teamSize: number;
  cin: string;
  gst: string;
  pan?: string;
  contactEmail: string;
  founderName: string;
  matchScore: number;
  matchRationale: string;
  summary: string;
  keyMetrics: string[];
  achievements: string[];
  whyPills: string[];
  whyNotPills: string[];
  radarMetrics: RadarMetric[];
  deployments: PastTrackRecord[];
  patents: string[];
  certifications: string[];
  cloudInfrastructure: string;
  cyberScore: number;
  status: 'Shortlisted' | 'In Pilot' | 'Scaled' | 'New';
  turnoverLastFY?: string;
  turnoverCr?: number;
  registeredAddress?: string;
  technologyTags?: string[];
  securityCertifications?: string[];
  priorGovContracts?: number;
  verifiedEvidencePassport?: any;
  aiReadinessScore?: number;
  coFounders?: string[];
}

export interface Milestone {
  id: string;
  number: number;
  title: string;
  deliverableDescription: string;
  durationWeeks: number;
  payoutPercentage: number;
  payoutAmount: string;
  status: 'pending' | 'submitted' | 'approved' | 'paid';
  proofUrl?: string;
  proofNotes?: string;
  submissionHash?: string;
  submittedDate?: string;
  approvedDate?: string;
  evidenceFilesCount?: number;
}

export interface RubricScoreItem {
  criterion: string;
  weightPct: number;
  score: number; // 1-5 scale
  comments: string;
}

export interface ExpertScorecard {
  id: string;
  reviewerName: string;
  role: string;
  avatar: string;
  scores: {
    technicalInnovation: number; // 1-5 (30%)
    govFeasibility: number; // 1-5 (25%)
    districtScalability: number; // 1-5 (20%)
    costEffectiveness: number; // 1-5 (15%)
    dataSecurityCompliance: number; // 1-5 (10%)
  };
  qualitativeNotes: string;
  riskFlags: string[];
  recommendationVerdict: 'Strongly Recommend for Pilot' | 'Recommend with Conditions' | 'Neutral' | 'Not Recommended';
  weightedTotal: number; // out of 100
  submittedAt: string;
}

export interface Proposal {
  id: string;
  challengeId: string;
  challengeTitle: string;
  department: string;
  startupId: string;
  startupName: string;
  proposedSolutionName: string;
  startupLogo: string;
  submittedAt: string;
  status: 'submitted' | 'screening_passed' | 'shortlisted' | 'expert_review' | 'contract_pending' | 'contract_signed' | 'pilot_ongoing' | 'completed' | 'rejected';
  problemUnderstanding: string;
  approachSummary: string;
  architectureDetails: string;
  expectedOutcomes: string[];
  timelineMonths: number;
  requestedBudget: string;
  teamAllocation: string[];
  milestones: Milestone[];
  expertScorecard?: ExpertScorecard;
  aiFitScore: number;
  solutionSummary?: string;
  currentStageName?: string;
  currentStage?: string;
}

export interface ContractComparisonOption {
  startupName: string;
  pilotCost: string;
  expectedWaterLossReduction: string;
  pilotDuration: string;
  dataHosting: string;
  ipModel: string;
}

export interface Contract {
  id: string;
  contractCode: string;
  proposalId: string;
  challengeId: string;
  challengeTitle: string;
  startupId: string;
  startupName: string;
  totalValue: string;
  effectiveDate: string;
  durationMonths: number;
  scopeOfWork: string;
  ipOwnershipClause: string;
  dataPrivacyClause: string;
  cyberSecurityClause: string;
  indemnityClause: string;
  terminationClause: string;
  escrowTerms: string;
  govStatus: 'approved' | 'pending' | 'modified';
  startupStatus: 'signed' | 'pending';
  signedAt?: string;
  signatureHash?: string;
  signerAadhaarMasked?: string;
  signerName?: string;
  signerDesignation?: string;
  approvedByGovOfficial?: string;
  govApprovedAt?: string;
  auditTrail: { timestamp: string; action: string; actor: string; ip?: string }[];
  milestones?: { name: string; amount: string; status?: string }[];
  createdAt?: string;
}

export interface TelemetryDataPoint {
  time: string;
  waterLossReduction: number;
  activeSensors: number;
  dailyWaterLossPct: number;
  flowThroughput: number;
  anomalyScore: number;
}

export interface TelemetryFeed {
  id: string;
  challengeId: string;
  pilotName: string;
  startupName: string;
  district: string;
  duration: string;
  currentWaterLossReduction: number; // e.g. 18.4
  targetWaterLossReduction: number; // e.g. 20.0
  activeSensors: number; // 312
  totalSensors: number; // 320
  alertsThisMonth: number; // 47
  verifiedAlerts: number; // 38
  falseAlerts: number; // 9
  monthlySavingsINR: string; // INR 12.3 Lakhs
  overallHealth: 'Optimal' | 'Warning' | 'Critical';
  uptimePercent: number;
  lastPing: string;
  hashVerificationStatus: 'Verified (SHA-256)' | 'Tampered' | 'Pending';
  risksAndIssues: string[];
  dataPoints: TelemetryDataPoint[];
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  portal: 'gov' | 'startup' | 'expert' | 'admin' | 'both';
  type: 'info' | 'success' | 'warning' | 'violet';
  actionPath?: string;
}

export interface AdminAuditLog {
  id: string;
  action: string;
  entity: string;
  performedBy: string;
  timestamp: string;
  status: 'Compliant' | 'Pending Review' | 'Flagged';
}
