import { Challenge, Startup, Proposal, Contract, TelemetryFeed, AppNotification, AdminAuditLog } from '../types';

export const EMPTY_STARTUP: Startup = {
  id: '',
  name: '',
  tagline: '',
  legalName: '',
  brandName: '',
  founderName: '',
  coFounders: [],
  logo: '',
  dpiitNumber: '',
  dpiitRecognized: false,
  dpiitVerified: false,
  incorporationDate: '',
  headquarters: '',
  location: '',
  sector: '',
  domains: [],
  techStack: [],
  stage: 'Prototype',
  complianceScore: 0,
  trl: 0,
  trlLevel: 0,
  turnoverLastFY: '',
  turnoverCr: 0,
  website: '',
  email: '',
  phone: '',
  teamSize: 0,
  cin: '',
  gstin: '',
  gst: '',
  pan: '',
  contactEmail: '',
  matchScore: 0,
  matchRationale: '',
  summary: '',
  keyMetrics: [],
  achievements: [],
  whyPills: [],
  whyNotPills: [],
  radarMetrics: [],
  deployments: [],
  patents: [],
  certifications: [],
  cloudInfrastructure: '',
  cyberScore: 0,
  status: 'New',
  gemReady: false,
  gemRegistered: false,
  gemSellerId: '',
  yearFounded: 2026,
  registeredAddress: '',
  description: '',
  technologyTags: [],
  securityCertifications: [],
  priorGovContracts: 0,
  verifiedEvidencePassport: null,
  aiReadinessScore: 0
};

export const INITIAL_CHALLENGES: Challenge[] = [];

export const INITIAL_STARTUPS: Startup[] = [];

export const INITIAL_PROPOSALS: Proposal[] = [];

export const INITIAL_CONTRACTS: Contract[] = [];

export const INITIAL_TELEMETRY_FEEDS: TelemetryFeed[] = [];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [];

export const INITIAL_ADMIN_LOGS: AdminAuditLog[] = [];
