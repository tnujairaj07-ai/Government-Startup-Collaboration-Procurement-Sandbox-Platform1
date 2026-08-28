import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { 
  QrCode, CheckCircle2, Award, FileCheck2, Lock, 
  Download, Edit3, Save, Share2, ShieldCheck, FileText, Check, 
  Building2, Globe, Mail, Phone, ExternalLink, Calendar, Users, 
  MapPin, Eye, Upload, Trash2, RefreshCw, Copy, CheckCheck, 
  AlertTriangle, Shield, Layers, FileSignature, FolderArchive, 
  Search, Plus, Sparkles 
} from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';
import confetti from 'canvas-confetti';

interface ArchiveDoc {
  id: string;
  name: string;
  type: string;
  category: string;
  uploadedOn: string;
  verifiedStatus: 'Verified by Platform' | 'Verified' | 'Self-Declared' | 'Informational';
  version: string;
  size: string;
}

export const CompanyEvidenceArchive: React.FC = () => {
  const { currentStartup, addNotification } = usePlatform();

  // Active Category Tab
  const [activeTab, setActiveTab] = useState<string>('legal');
  const [searchDocQuery, setSearchDocQuery] = useState('');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedDocPreview, setSelectedDocPreview] = useState<ArchiveDoc | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [allowPublicGovAccess, setAllowPublicGovAccess] = useState(true);

  // New Upload Form State
  const [newDocTitle, setNewDocTitle] = useState('');
  const [newDocCategory, setNewDocCategory] = useState('legal');
  const [newDocType, setNewDocType] = useState('Legal Certificate');

  // Archive Documents Data Store
  const [documents, setDocuments] = useState<ArchiveDoc[]>([]);

  // Categories definition
  const categories = [
    { id: 'legal', label: 'Company & Legal', count: documents.filter(d => d.category === 'legal').length },
    { id: 'dpiit', label: 'DPIIT & Recognitions', count: documents.filter(d => d.category === 'dpiit').length },
    { id: 'tech', label: 'Technology & Product', count: documents.filter(d => d.category === 'tech').length },
    { id: 'projects', label: 'Projects & Case Studies', count: documents.filter(d => d.category === 'projects').length },
    { id: 'compliance', label: 'Compliance & Certifications', count: documents.filter(d => d.category === 'compliance').length },
    { id: 'security', label: 'Security & Data Residency', count: documents.filter(d => d.category === 'security').length },
    { id: 'financials', label: 'Financials (Optional)', count: documents.filter(d => d.category === 'financials').length },
    { id: 'additional', label: 'Additional Evidence & IP', count: documents.filter(d => d.category === 'additional').length },
  ];

  // Category descriptions
  const categoryDescriptions: Record<string, string> = {
    legal: 'Core legal, incorporation, and tax documents establishing the company’s statutory identity and structure.',
    dpiit: 'Official recognitions, DPIIT startup certificates, and government incubator endorsements.',
    tech: 'Technical specifications, digital twin architecture notes, TRL 8 evidence, and SCADA/GIS API guides.',
    projects: 'Empirical deployment reports, completion certificates, and client performance case studies.',
    compliance: 'ISO certifications, MSME credentials, and statutory procurement compliance proofs.',
    security: 'CERT-In cybersecurity audit reports, MeitY data residency declarations, and VAPT certifications.',
    financials: 'Audited financial statements, CA turnover certificates, and bank account verifications.',
    additional: 'Intellectual property filings, published patents, media citations, and partner MOUs.'
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocTitle.trim()) return;

    const newDoc: ArchiveDoc = {
      id: `DOC-${Date.now().toString().slice(-4)}`,
      name: newDocTitle,
      type: newDocType,
      category: newDocCategory,
      uploadedOn: 'Today',
      verifiedStatus: 'Self-Declared',
      version: 'v1.0',
      size: '2.4 MB'
    };

    setDocuments([newDoc, ...documents]);
    setIsUploadModalOpen(false);
    setNewDocTitle('');

    addNotification({
      title: 'Document Uploaded to Archive',
      message: `"${newDoc.name}" has been uploaded and queued for platform signature verification.`,
      portal: 'startup',
      type: 'success'
    });
  };

  const handleShareSubmit = () => {
    addNotification({
      title: 'Dossier Access Granted',
      message: 'Secure capability access link shared with Maharashtra Water Supply & Urban Dev Departments.',
      portal: 'startup',
      type: 'success'
    });
    setIsShareModalOpen(false);
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://mahatech.gov.in/evidence/aquasense-tech-dossier');
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const filteredDocs = documents
    .filter(d => d.category === activeTab)
    .filter(d => searchQueryFilter(d));

  function searchQueryFilter(doc: ArchiveDoc) {
    if (!searchDocQuery.trim()) return true;
    const q = searchDocQuery.toLowerCase();
    return doc.name.toLowerCase().includes(q) || doc.type.toLowerCase().includes(q);
  }

  return (
    <div className="space-y-6">
      
      {/* ========================================================================= */}
      {/* PAGE HEADER: Verified Company Profile & Actions                          */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Verified Company Profile & Archive
            </span>
            <span className="text-xs text-slate-400 font-mono">Last Updated: 24 Aug 2026</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-navy-900 font-display tracking-tight">
            Company Evidence Archive
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Official verified capability profile and cryptographic document repository for government evaluators and buyers.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => setIsUploadModalOpen(true)}
            className="px-4 py-2.5 rounded-2xl bg-white hover:bg-slate-50 text-navy-900 font-bold text-xs border border-slate-200 shadow-xs flex items-center gap-2 transition-all"
          >
            <Upload className="w-4 h-4 text-[#1D64EC]" />
            <span>Upload Document</span>
          </button>

          <button
            type="button"
            onClick={() => setIsShareModalOpen(true)}
            className="px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors flex items-center gap-2"
          >
            <Share2 className="w-4 h-4 text-purple-600" />
            <span>Share with Department</span>
          </button>

          <button
            type="button"
            onClick={() => {
              addNotification({
                title: 'Full Dossier Exported',
                message: 'Downloading complete verified evidence archive bundle for AquaSense Technologies (PDF/ZIP).',
                portal: 'startup',
                type: 'info'
              });
            }}
            className="px-5 py-2.5 rounded-2xl bg-[#1D64EC] hover:bg-blue-700 text-white font-bold text-xs shadow-xs flex items-center gap-2 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Download Full Dossier</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: VERIFIED IDENTITY SUMMARY (Cover Header Band)                  */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
        
        {/* Top Identity Row */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#1D64EC] text-white flex items-center justify-center text-xl font-black font-display shadow-md shrink-0">
              {currentStartup.name ? currentStartup.name.slice(0, 2).toUpperCase() : 'ST'}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h2 className="text-xl sm:text-2xl font-black text-navy-900 font-display">
                  {currentStartup.name || 'Startup Registered'}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200 flex items-center gap-1">
                  <Check className="w-3 h-3 text-emerald-600" />
                  Cryptographically Signed
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {currentStartup.description || 'Public innovation and GovTech problem-solving entity.'}
              </p>
              <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400 mt-1 font-mono">
                <span>DPIIT: <strong className="text-emerald-700 font-bold">{currentStartup.dpiitNumber || 'DIPP-VERIFIED'}</strong></span>
                <span>•</span>
                <span>GeM Vendor: <strong className="text-purple-700 font-bold">GEM-VERIFIED</strong></span>
                <span>•</span>
                <span>UID: <strong className="text-slate-600">STARTUP-MH-REG</strong></span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-100 shrink-0">
            <div className="w-12 h-12 bg-white rounded-xl border border-slate-200 flex items-center justify-center p-1 shadow-inner">
              <QrCode className="w-full h-full text-navy-900" />
            </div>
            <div className="text-xs space-y-0.5">
              <span className="text-[10px] font-bold text-emerald-700 uppercase block">State Audit Status</span>
              <strong className="text-navy-900 block font-bold text-[11px]">Fully Verified & Empanelled</strong>
              <span className="text-[10px] text-slate-400 block font-mono">Sha256: 8f4a...92b1</span>
            </div>
          </div>

        </div>

        {/* 3-Column Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          
          {/* Left: Core Identity */}
          <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Company Core</span>
            <div className="space-y-1 text-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-500">Legal Structure:</span>
                <strong className="text-navy-900">Private Limited</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Headquarters:</span>
                <strong className="text-navy-900">{currentStartup.location || 'Maharashtra, India'}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Sector / Domain:</span>
                <strong className="text-navy-900">{currentStartup.sector || 'DeepTech Innovation'}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Official Portal:</span>
                <span className="text-[#1D64EC] font-bold">
                  {currentStartup.website || 'Verified Company Domain'}
                </span>
              </div>
            </div>
          </div>

          {/* Middle: Capabilities Snapshot */}
          <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-2">
            <span className="text-[10px] font-bold text-[#1D64EC] uppercase tracking-wider block">Capability Snapshot</span>
            <div className="space-y-1 text-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-500">Domain / Focus:</span>
                <strong className="text-navy-900">{currentStartup.sector || 'Public Sector Innovation'}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Maturity Level:</span>
                <strong className="text-[#1D64EC]">TRL 8 (Pilot-Ready)</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Integration:</span>
                <strong className="text-navy-900">SCADA, GIS, ITMS</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Hosting:</span>
                <strong className="text-emerald-700">MeitY Cloud (India)</strong>
              </div>
            </div>
          </div>

          {/* Right: Quantified Impact */}
          <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-2">
            <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">Quantified Impact</span>
            <div className="space-y-1 text-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-500">Audit Status:</span>
                <strong className="text-emerald-800">State Verified</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Active Monitoring:</span>
                <strong className="text-navy-900">Sandbox Ready</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Compliance Proof:</span>
                <strong className="text-emerald-800">CERT-In & MeitY</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Deployment SLA:</span>
                <strong className="text-navy-900">Fast-Track</strong>
              </div>
            </div>
          </div>

        </div>

        <p className="text-[11px] text-slate-400 italic">
          * This capability summary is generated from cryptographically signed documents and audited pilot field trials. Evaluators may review underlying evidence in the archive below.
        </p>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 2: DOCUMENT ARCHIVE (Core Tabs & Organized Table)                 */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-5">
        
        {/* Archive Title & Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-black text-navy-900 font-display">
              Document Archive
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              All verified documents, certifications, case studies, and compliance filings organized by domain.
            </p>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchDocQuery}
              onChange={(e) => setSearchDocQuery(e.target.value)}
              placeholder="Search documents in archive..."
              className="pl-8 pr-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-navy-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1D64EC]/20 focus:border-[#1D64EC] w-64"
            />
          </div>
        </div>

        {/* 8 Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 custom-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveTab(cat.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                activeTab === cat.id
                  ? 'bg-[#1D64EC] text-white shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                activeTab === cat.id ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Category Description Banner */}
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs flex items-center justify-between gap-4">
          <p className="text-slate-600 leading-relaxed font-medium">
            {categoryDescriptions[activeTab] || 'Verified documentation for this section.'}
          </p>
          <button
            type="button"
            onClick={() => {
              setNewDocCategory(activeTab);
              setIsUploadModalOpen(true);
            }}
            className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-navy-900 font-bold text-[11px] shrink-0 flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5 text-[#1D64EC]" />
            <span>Upload in this Category</span>
          </button>
        </div>

        {/* Documents Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-navy-900 border-b border-slate-200">
                <th className="py-3.5 px-4 font-bold">Document Name</th>
                <th className="py-3.5 px-4 font-bold">Type</th>
                <th className="py-3.5 px-4 font-bold">Uploaded On</th>
                <th className="py-3.5 px-4 font-bold">Verification Status</th>
                <th className="py-3.5 px-4 font-bold">Version & Size</th>
                <th className="py-3.5 px-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredDocs.length > 0 ? (
                filteredDocs.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-navy-900 max-w-sm">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-[#1D64EC] shrink-0" />
                        <span 
                          onClick={() => setSelectedDocPreview(doc)}
                          className="hover:text-[#1D64EC] hover:underline cursor-pointer"
                        >
                          {doc.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap font-medium">
                      {doc.type}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap font-mono">
                      {doc.uploadedOn}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        doc.verifiedStatus === 'Verified by Platform'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : doc.verifiedStatus === 'Verified'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : doc.verifiedStatus === 'Self-Declared'
                          ? 'bg-amber-50 text-amber-800 border border-amber-200'
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        {doc.verifiedStatus.includes('Verified') && <Check className="w-3 h-3 text-emerald-600" />}
                        {doc.verifiedStatus}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px] whitespace-nowrap">
                      {doc.version} • {doc.size}
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => setSelectedDocPreview(doc)}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] transition-colors flex items-center gap-1"
                        >
                          <Eye className="w-3 h-3 text-slate-500" />
                          <span>View</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            addNotification({
                              title: 'Document Downloaded',
                              message: `Downloaded verified copy of "${doc.name}" (PDF)`,
                              portal: 'startup',
                              type: 'info'
                            });
                          }}
                          className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-[11px] transition-colors flex items-center gap-1"
                        >
                          <Download className="w-3 h-3 text-[#1D64EC]" />
                          <span>Download</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    <p className="font-semibold text-xs">No documents found matching "{searchDocQuery}".</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* SECTION 3: PAST PROJECTS & DEPLOYMENTS SHOWCASE                           */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-navy-900 font-display">
              Track Record & Municipal Deployments
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Verified outcomes, completion sign-offs, and reference letters from state utilities.
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
            3 Active Reference Deployments
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Project 1 */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between space-y-3">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                  Pilot Deployment
                </span>
                <span className="text-xs font-bold text-slate-400">2024</span>
              </div>
              <h3 className="font-bold text-navy-900 text-sm">
                Pune Municipal Corporation Water Pilot (Zone A)
              </h3>
              <p className="text-xs text-slate-500 font-medium">Pune Municipal Corporation</p>
              <p className="text-xs text-slate-700 leading-relaxed font-medium bg-white p-3 rounded-xl border border-slate-100">
                <strong>Outcome:</strong> 22% reduction in non-revenue water across 120 km distribution network; 14 major hidden feeder fractures resolved in 6 months.
              </p>
            </div>

            <div className="pt-2 border-t border-slate-200/60 flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => addNotification({ title: 'Opened Case Study', message: 'Viewing Pune MC Case Study (PDF)', portal: 'startup', type: 'info' })}
                className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-[11px] font-bold text-slate-700"
              >
                Case Study
              </button>
              <button
                type="button"
                onClick={() => addNotification({ title: 'Opened Completion Certificate', message: 'Viewing Pune MC Sign-off (PDF)', portal: 'startup', type: 'info' })}
                className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-[11px] font-bold text-emerald-800"
              >
                Completion Cert.
              </button>
            </div>
          </div>

          {/* Project 2 */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between space-y-3">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded-full">
                  Proof-of-Concept
                </span>
                <span className="text-xs font-bold text-slate-400">2023</span>
              </div>
              <h3 className="font-bold text-navy-900 text-sm">
                Nagpur Jal Proof-of-Concept
              </h3>
              <p className="text-xs text-slate-500 font-medium">Nagpur Municipal Corporation</p>
              <p className="text-xs text-slate-700 leading-relaxed font-medium bg-white p-3 rounded-xl border border-slate-100">
                <strong>Outcome:</strong> Pinpointed 14 major hidden feeder fractures in 90 days with zero civic water supply interruption.
              </p>
            </div>

            <div className="pt-2 border-t border-slate-200/60 flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => addNotification({ title: 'Opened PoC Report', message: 'Viewing Nagpur Jal PoC Report (PDF)', portal: 'startup', type: 'info' })}
                className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-[11px] font-bold text-slate-700"
              >
                PoC Report
              </button>
              <button
                type="button"
                onClick={() => addNotification({ title: 'Opened Reference Letter', message: 'Viewing Nagpur Client Reference (PDF)', portal: 'startup', type: 'info' })}
                className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-[11px] font-bold text-slate-700"
              >
                Reference Letter
              </button>
            </div>
          </div>

          {/* Project 3 */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between space-y-3">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-100/70 px-2 py-0.5 rounded-full">
                  Full City Rollout
                </span>
                <span className="text-xs font-bold text-slate-400">2025</span>
              </div>
              <h3 className="font-bold text-navy-900 text-sm">
                Thane Smart City Smart Water Rollout
              </h3>
              <p className="text-xs text-slate-500 font-medium">Thane Smart City Ltd</p>
              <p className="text-xs text-slate-700 leading-relaxed font-medium bg-white p-3 rounded-xl border border-slate-100">
                <strong>Outcome:</strong> Active monitoring across 250 km network; 18% NRW reduction observed in first 4 months of continuous edge sensing.
              </p>
            </div>

            <div className="pt-2 border-t border-slate-200/60 flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => addNotification({ title: 'Opened Deployment Report', message: 'Viewing Thane Deployment Report (PDF)', portal: 'startup', type: 'info' })}
                className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-[11px] font-bold text-slate-700"
              >
                Deployment Report
              </button>
              <button
                type="button"
                onClick={() => addNotification({ title: 'Opened Impact Case Study', message: 'Viewing Thane Case Study (PDF)', portal: 'startup', type: 'info' })}
                className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-[11px] font-bold text-purple-800"
              >
                Impact Case Study
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 4: VERIFICATION & ACCESS GOVERNANCE                               */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-navy-900 font-display">
              Verification Status & Government Access Governance
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Control which government ministries, municipal corporations, and expert panels can inspect this archive.
            </p>
          </div>
          <span className="text-xs font-mono text-emerald-700 font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Audit Trail Active
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-navy-900 block">Universal Government Evaluator Access</span>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Allow authorized evaluators from any Maharashtra State Department to view verified documents.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={allowPublicGovAccess}
                  onChange={(e) => setAllowPublicGovAccess(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#1D64EC]"></div>
              </label>
            </div>

            <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
              <span className="text-slate-500">Dedicated Shareable Link:</span>
              <button
                type="button"
                onClick={handleCopyLink}
                className="px-3 py-1 rounded-lg bg-white border border-slate-200 font-bold text-[11px] text-[#1D64EC] flex items-center gap-1 shadow-2xs hover:bg-blue-50"
              >
                {copiedLink ? <CheckCheck className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copiedLink ? 'Copied!' : 'Copy Dossier Link'}</span>
              </button>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Recent Access Audit Log</span>
            <div className="space-y-1.5 text-[11px]">
              <div className="p-2 rounded-xl bg-white border border-slate-100 flex items-center justify-between">
                <span>Viewed by: <strong>Urban Development Dept (JS Office)</strong></span>
                <span className="text-slate-400">26 Aug 2026</span>
              </div>
              <div className="p-2 rounded-xl bg-white border border-slate-100 flex items-center justify-between">
                <span>Viewed by: <strong>Water Resources Evaluation Panel</strong></span>
                <span className="text-slate-400">25 Aug 2026</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODAL 1: UPLOAD NEW DOCUMENT MODAL                                        */}
      {/* ========================================================================= */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 border border-slate-200 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-navy-900 font-display">
                  Upload Document to Evidence Archive
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">Submit verified certificates, technical whitepapers, or audit files.</p>
              </div>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-navy-900 mb-1">Document Title *</label>
                <input
                  type="text"
                  required
                  value={newDocTitle}
                  onChange={(e) => setNewDocTitle(e.target.value)}
                  placeholder="e.g. ISO 27001 Audit Certificate / PoC Report"
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-navy-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1D64EC]/20 focus:border-[#1D64EC]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-navy-900 mb-1">Archive Category</label>
                  <select
                    value={newDocCategory}
                    onChange={(e) => setNewDocCategory(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-navy-900 font-medium"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-navy-900 mb-1">Document Classification</label>
                  <input
                    type="text"
                    value={newDocType}
                    onChange={(e) => setNewDocType(e.target.value)}
                    placeholder="e.g. Technical Datasheet"
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-navy-900"
                  />
                </div>
              </div>

              {/* Drag and drop zone */}
              <div className="border-2 border-dashed border-slate-200 hover:border-[#1D64EC] p-6 rounded-2xl text-center bg-slate-50/60 cursor-pointer transition-colors space-y-1">
                <Upload className="w-6 h-6 text-slate-400 mx-auto" />
                <p className="font-bold text-navy-900">Drag & drop files or browse</p>
                <p className="text-[10px] text-slate-400">PDF, DOCX, ZIP, or PNG up to 25 MB</p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[#1D64EC] hover:bg-blue-700 text-white font-bold text-xs shadow-xs"
                >
                  Upload & Sign Document
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: DOCUMENT PREVIEW MODAL                                           */}
      {/* ========================================================================= */}
      {selectedDocPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-4 border border-slate-200 shadow-2xl">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#1D64EC] flex items-center justify-center font-bold">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-navy-900 font-display leading-tight">
                    {selectedDocPreview.name}
                  </h3>
                  <p className="text-xs text-slate-400">{selectedDocPreview.type} • {selectedDocPreview.size}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedDocPreview(null)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs"
              >
                ×
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs text-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-500">Document ID:</span>
                <span className="font-mono font-bold text-navy-900">{selectedDocPreview.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Uploaded On:</span>
                <span className="font-medium text-navy-900">{selectedDocPreview.uploadedOn}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Verification Status:</span>
                <strong className="text-emerald-700 font-bold">{selectedDocPreview.verifiedStatus}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Cryptographic Digest:</span>
                <span className="font-mono text-[10px] text-slate-400">e3b0c44298fc1c149afbf4c8996fb924...</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-100 border border-slate-200 text-center space-y-2">
              <ShieldCheck className="w-8 h-8 text-emerald-600 mx-auto" />
              <p className="font-bold text-navy-900 text-xs">Official Document Verified</p>
              <p className="text-[11px] text-slate-500">
                This document is verified with UIDAI / DPIIT and is eligible for government tender evaluation.
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  addNotification({
                    title: 'Document Downloaded',
                    message: `Downloaded "${selectedDocPreview.name}" (PDF)`,
                    portal: 'startup',
                    type: 'info'
                  });
                }}
                className="px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5 text-[#1D64EC]" />
                <span>Download PDF</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedDocPreview(null)}
                className="px-5 py-2 rounded-full bg-[#1D64EC] hover:bg-blue-700 text-white font-bold text-xs"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: SHARE WITH DEPARTMENT MODAL                                      */}
      {/* ========================================================================= */}
      {isShareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 border border-slate-200 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-navy-900 font-display">
                  Share Evidence Dossier
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">Grant temporary or permanent evaluation access.</p>
              </div>
              <button
                onClick={() => setIsShareModalOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs"
              >
                ×
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-navy-900 mb-1">Target Government Department</label>
                <select className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-navy-900 font-medium">
                  <option>Urban Development & Water Resources Department</option>
                  <option>Disaster Management, Relief & Rehabilitation Department</option>
                  <option>Agriculture & Farmers Welfare Department</option>
                  <option>Public Health & Family Welfare Department</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-navy-900 mb-1">Access Duration</label>
                <select className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-navy-900 font-medium">
                  <option>Permanent (Challenge & Pilot Evaluation Duration)</option>
                  <option>30 Days Sandbox Review</option>
                  <option>7 Days Quick Screen</option>
                </select>
              </div>

              <div className="p-3 rounded-2xl bg-blue-50/70 border border-blue-100 text-blue-900">
                <span className="font-bold block">Encrypted Access Token</span>
                <p className="text-[11px] mt-0.5">Evaluators will receive an audit-logged access token tied to their government SSO.</p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsShareModalOpen(false)}
                className="px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleShareSubmit}
                className="px-5 py-2 rounded-full bg-[#1D64EC] hover:bg-blue-700 text-white font-bold text-xs shadow-xs"
              >
                Grant Access & Send Token
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
