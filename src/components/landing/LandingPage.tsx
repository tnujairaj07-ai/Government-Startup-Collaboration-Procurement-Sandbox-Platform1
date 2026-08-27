import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { 
  Rocket, Building2, ShieldCheck, CheckCircle2, ArrowRight, 
  Sparkles, Search, ChevronRight, Lock, Activity, FileText, 
  DollarSign, Check, ChevronDown, ChevronUp, Globe, Users, 
  Layers, Download, Scale, Cpu, HelpCircle, Mail, Phone, 
  ExternalLink, ArrowUpRight, Star, Shield, Radio, CheckCheck, 
  Compass, BarChart3, Award, FileSpreadsheet, Paperclip, Send, 
  X, Info, Flame, AlertCircle, TrendingUp, Lightbulb, Landmark, 
  FileCheck, ShieldAlert 
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { openPortal, openLogin, challenges, addNotification } = usePlatform();

  // Search input state
  const [heroSearch, setHeroSearch] = useState('');

  // Active FAQ Accordion
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Active Feature Tab
  const [activeFeatureTab, setActiveFeatureTab] = useState<'gov' | 'startup'>('gov');

  // Modals
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  // Demo Form State
  const [demoDept, setDemoDept] = useState('');
  const [demoOfficer, setDemoOfficer] = useState('');
  const [demoEmail, setDemoEmail] = useState('');

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    openPortal('startup', 'challenges');
  };

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDemoModalOpen(false);
    addNotification({
      title: 'Department Briefing Scheduled',
      message: `Thank you Officer ${demoOfficer || 'User'}. A briefing session for ${demoDept || 'your department'} has been booked.`,
      portal: 'gov',
      type: 'success'
    });
  };

  // 9 Stages of the End-to-End Flow
  const workflowStages = [
    {
      num: 1,
      title: 'Problem Identification',
      desc: 'Departments define outcome-based problem statements with clear KPIs and pilot scope.',
      icon: '🎯'
    },
    {
      num: 2,
      title: 'Startup Discovery',
      desc: 'AI-assisted discovery and shortlisting of DPIIT-recognized startups based on relevance, capability, and evidence.',
      icon: '🔍'
    },
    {
      num: 3,
      title: 'Eligibility & Evidence Verification',
      desc: 'Automated checks for DPIIT status, turnover, and required documents; startups maintain a verified evidence archive.',
      icon: '📁'
    },
    {
      num: 4,
      title: 'AI-Assisted Ranking',
      desc: 'AI evaluates startups across 10 dimensions: problem fit, technology match, evidence strength, pilot readiness, security, and more.',
      icon: '🤖'
    },
    {
      num: 5,
      title: 'Expert Evaluation',
      desc: 'Domain experts review shortlisted startups, examine dossiers, and approve startups for controlled pilots.',
      icon: '👥'
    },
    {
      num: 6,
      title: 'Controlled Pilot (Sandbox)',
      desc: 'Selected startups run time-bound pilots with milestone-based contracts, escrow payments, and real-time telemetry.',
      icon: '🚀'
    },
    {
      num: 7,
      title: 'Trusted Data Collection & Validation',
      desc: 'Pilot data is collected via government and startup systems, with integrity checks and independent validation.',
      icon: '📊'
    },
    {
      num: 8,
      title: 'Evidence-Based Decision',
      desc: 'Based on KPI performance and validation reports, departments decide to Scale, Iterate, or Close.',
      icon: '⚖️'
    },
    {
      num: 9,
      title: 'Scale / Procurement',
      desc: 'Successful pilots transition into wider deployment, fast-track procurement, or GeM-based scale-up.',
      icon: '⚡'
    },
  ];

  const faqs = [
    {
      q: 'Who can participate as a startup?',
      a: 'Any DPIIT-recognized startup, MSME, or eligible innovator with a demonstrated technology or product solving state challenges can register, maintain an evidence archive, and respond to open departmental problem statements.'
    },
    {
      q: 'How are proposals evaluated?',
      a: 'Proposals undergo a 2-tier evaluation: automated AI scoring across 10 objective dimensions (relevance, technology match, evidence strength, pilot readiness, cybersecurity, scalability, etc.) followed by independent domain expert panel reviews.'
    },
    {
      q: 'What happens after a successful pilot?',
      a: 'Upon independent validation of milestone KPIs, departments can issue a formal Scale Clearance. Proven solutions can transition directly into wider municipal or statewide deployment, fast-track procurement, or GeM rate-contract listings.'
    },
    {
      q: 'How are payments made to startups?',
      a: 'Payments are linked to verified milestone deliverables through direct escrow tranches and PFMS/State Treasury integration, eliminating delayed receivables and cash-flow uncertainty.'
    },
    {
      q: 'Is this platform integrated with GeM and State Portals?',
      a: 'Yes. The sandbox framework connects with the Government e-Marketplace (GeM) Fast-Track Scale Gateway, National Single Window System (NSWS), and Maharashtra state e-procurement portals.'
    },
    {
      q: 'How is data security and IP managed?',
      a: 'Standardized legal agreements protect background IP while granting the state pilot usage rights. All data is hosted on MeitY-empanelled cloud infrastructure in India and governed by the Maharashtra Cyber Policy v2.0.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F4F7FC] text-[#0F172A] selection:bg-[#1D64EC] selection:text-white font-sans antialiased">
      
      {/* ========================================================================= */}
      {/* 1. TOP GLOBAL NAVBAR                                                     */}
      {/* ========================================================================= */}
      <header className="bg-white border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Brand / Logo */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#1D64EC] via-[#2563EB] to-[#0D4CD3] text-white font-black text-xl flex items-center justify-center shadow-md shadow-blue-500/20">
              🏛️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-2xl font-black text-[#0F172A] font-display tracking-tight leading-none">
                  Mahatech <span className="text-[#1D64EC]">Procure</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#E8F2FE] text-[#1D64EC] text-[10px] font-extrabold uppercase tracking-wider hidden sm:inline-block border border-blue-200">
                  Gov Sandbox
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-semibold tracking-wide mt-0.5">
                Government of Maharashtra • Innovation Procurement Pathway
              </p>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => openPortal('startup', 'challenges')}
              className="px-4 sm:px-5 py-2.5 rounded-xl bg-[#E8F2FE] hover:bg-[#DDEBFC] text-[#1D64EC] border border-blue-200 font-bold text-xs flex items-center gap-1.5 transition-all shadow-2xs"
            >
              <Compass className="w-4 h-4 text-[#1D64EC]" />
              <span>Explore Challenges</span>
            </button>

            <button
              type="button"
              onClick={() => openLogin()}
              className="px-5 sm:px-6 py-2.5 rounded-xl bg-[#1D64EC] hover:bg-[#0D4CD3] text-white font-bold text-xs shadow-md shadow-blue-500/25 flex items-center gap-2 transition-all hover:scale-[1.02]"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Portal Login</span>
            </button>
          </div>

        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. SUB-NAVBAR CATEGORY BAR                                                */}
      {/* ========================================================================= */}
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs py-2.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center overflow-x-auto custom-scrollbar">
          <div className="flex items-center gap-1.5 sm:gap-2 text-xs font-bold whitespace-nowrap px-2">
            <a 
              href="#hero" 
              className="px-3.5 py-1.5 rounded-full bg-[#1D64EC] text-white shadow-2xs hover:bg-[#0D4CD3] transition-all"
            >
              Home
            </a>
            <a 
              href="#why-it-matters" 
              className="px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-[#E8F2FE] text-slate-700 hover:text-[#1D64EC] transition-all"
            >
              Why This Matters
            </a>
            <a 
              href="#solution" 
              className="px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-[#E8F2FE] text-slate-700 hover:text-[#1D64EC] transition-all"
            >
              Our Solution
            </a>
            <a 
              href="#how-it-works" 
              className="px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-[#E8F2FE] text-slate-700 hover:text-[#1D64EC] transition-all"
            >
              How It Works
            </a>
            <a 
              href="#features" 
              className="px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-[#E8F2FE] text-slate-700 hover:text-[#1D64EC] transition-all"
            >
              Platform Offers
            </a>
            <a 
              href="#outcomes" 
              className="px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-[#E8F2FE] text-slate-700 hover:text-[#1D64EC] transition-all"
            >
              Impact & Outcomes
            </a>
            <a 
              href="#who-is-this-for" 
              className="px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-[#E8F2FE] text-slate-700 hover:text-[#1D64EC] transition-all"
            >
              Who Is This For
            </a>
            <a 
              href="#use-cases" 
              className="px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-[#E8F2FE] text-slate-700 hover:text-[#1D64EC] transition-all"
            >
              Sample Use Cases
            </a>
            <a 
              href="#compliance" 
              className="px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-[#E8F2FE] text-slate-700 hover:text-[#1D64EC] transition-all"
            >
              Compliance & Oversight
            </a>
            <a 
              href="#faqs" 
              className="px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-[#E8F2FE] text-slate-700 hover:text-[#1D64EC] transition-all"
            >
              FAQs
            </a>
          </div>
        </div>
      </nav>

      {/* ========================================================================= */}
      {/* 3. HERO SECTION (New Headline & Dual Direct Exploration CTAs)             */}
      {/* ========================================================================= */}
      <section id="hero" className="relative pt-10 pb-16 lg:pt-16 lg:pb-24 overflow-hidden">
        
        {/* Ambient Glows */}
        <div className="absolute -top-24 right-0 w-[550px] h-[550px] bg-gradient-to-br from-blue-200/50 via-sky-100/30 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-1/2 -left-24 w-[450px] h-[450px] bg-gradient-to-tr from-sky-100/60 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: New Headline, Subheadline & Dual CTAs */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-7">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F2FE] text-[#1D64EC] border border-blue-200 text-xs font-bold shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#1D64EC] animate-ping" />
                <span>Maharashtra Innovation Sandbox & Procurement Mechanism</span>
              </div>

              <div className="space-y-3.5">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F172A] font-display tracking-tight leading-[1.15]">
                  A Startup-Friendly Public Procurement Mechanism for <span className="text-[#1D64EC]">Maharashtra</span>
                </h1>
                <p className="text-base sm:text-lg text-slate-700 font-semibold leading-snug">
                  From problem statement to scaled solution — a transparent, end-to-end pathway for government departments to discover, pilot, procure and scale innovative startup solutions.
                </p>
              </div>

              {/* Primary Dual CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => openPortal('gov', 'dashboard')}
                  className="px-6 py-3.5 rounded-2xl bg-[#1D64EC] hover:bg-[#0D4CD3] text-white font-bold text-xs sm:text-sm shadow-action hover:shadow-action-hover flex items-center gap-2 transition-all hover:scale-[1.02]"
                >
                  <Building2 className="w-4 h-4 text-blue-200" />
                  <span>Explore for Departments</span>
                  <ArrowRight className="w-4 h-4 text-blue-200 ml-1" />
                </button>

                <button
                  type="button"
                  onClick={() => openPortal('startup', 'dashboard')}
                  className="px-6 py-3.5 rounded-2xl bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold text-xs sm:text-sm shadow-md flex items-center gap-2 transition-all hover:scale-[1.02]"
                >
                  <Rocket className="w-4 h-4 text-sky-300" />
                  <span>Explore for Startups</span>
                  <ArrowRight className="w-4 h-4 text-sky-300 ml-1" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('how-it-works');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-5 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold text-xs sm:text-sm shadow-2xs transition-all"
                >
                  Watch How It Works
                </button>
              </div>

              {/* Search Pill Input */}
              <form onSubmit={handleSearchSubmit} className="max-w-xl pt-2">
                <div className="p-1.5 bg-white rounded-2xl border-2 border-blue-200 shadow-md flex items-center gap-2 focus-within:border-[#1D64EC] focus-within:ring-4 focus-within:ring-blue-500/10 transition-all">
                  <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
                  <input
                    type="text"
                    value={heroSearch}
                    onChange={(e) => setHeroSearch(e.target.value)}
                    placeholder="Search problem statements, departments, or sectors..."
                    className="w-full py-2 bg-transparent text-xs sm:text-sm text-navy-900 placeholder:text-slate-400 outline-none font-medium"
                  />
                  <button
                    type="submit"
                    className="px-5 sm:px-6 py-2.5 rounded-xl bg-[#1D64EC] hover:bg-[#0D4CD3] text-white font-bold text-xs sm:text-sm shadow-sm shrink-0 transition-all"
                  >
                    Search
                  </button>
                </div>
              </form>

              {/* Trust Badges (Exact 4 Badges as Requested) */}
              <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-bold text-slate-700">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-[#1D64EC] flex items-center justify-center text-[10px] font-black">
                    🏛️
                  </div>
                  <span>Government of Maharashtra</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-[10px] font-black">
                    💡
                  </div>
                  <span>Maharashtra State Innovation Society</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center text-[10px] font-black">
                    ★
                  </div>
                  <span>DPIIT-Recognized Startup Pathway</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-[10px] font-black">
                    🛒
                  </div>
                  <span>Integrated with GeM & State Portals</span>
                </div>
              </div>

            </div>

            {/* Right Column: Hero Graphic Card with Pilot Telemetry Cockpit */}
            <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
              
              <div className="relative w-full max-w-md aspect-[4/4.8] rounded-[40px] bg-gradient-to-br from-[#1D64EC] via-[#2563EB] to-[#0D4CD3] p-3 shadow-2xl overflow-hidden flex flex-col justify-between">
                
                <div className="absolute inset-2 rounded-[34px] bg-[#FFFFFF] overflow-hidden flex flex-col p-6 justify-between">
                  
                  <div className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full bg-gradient-to-tr from-sky-200 to-blue-200 opacity-40 blur-xl" />
                  
                  {/* Top Bar inside card */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-[#1D64EC]" />
                      <span className="text-xs font-black text-[#0F172A] font-display">MahaProcure Sandbox</span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Live Verified Pilot
                    </span>
                  </div>

                  {/* Center Mockup: Pilot Cockpit Preview */}
                  <div className="my-auto space-y-3 z-10">
                    <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200 shadow-xs space-y-2">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-slate-500">Active Field Pilot</span>
                        <span className="font-bold text-emerald-700">Pune Municipal Corp</span>
                      </div>
                      <h4 className="font-extrabold text-[#0F172A] text-sm leading-tight">
                        AI-based Water Leakage Detection (Zone A)
                      </h4>
                      <div className="flex items-center justify-between pt-1">
                        <div>
                          <span className="text-[10px] text-slate-400 font-bold block">NRW LOSS REDUCTION</span>
                          <strong className="text-lg font-black text-emerald-800 font-display">18.4% Achieved</strong>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-slate-400 font-bold block">ESCROW RELEASED</span>
                          <strong className="text-sm font-bold text-[#0F172A]">INR 10.5 Lakhs</strong>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5 text-xs">
                      <div className="p-3 rounded-2xl bg-blue-50 border border-blue-200">
                        <span className="text-[10px] font-bold text-[#1D64EC] block">AI SHORTLISTING</span>
                        <strong className="text-[#0F172A] font-bold">94/100 Score</strong>
                      </div>
                      <div className="p-3 rounded-2xl bg-purple-50 border border-purple-200">
                        <span className="text-[10px] font-bold text-purple-900 block">GEM GATEWAY</span>
                        <strong className="text-[#0F172A] font-bold">Fast-Track Ready</strong>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Strip */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 z-10">
                    <span>Verified by Maharashtra Water Board</span>
                    <strong className="text-[#1D64EC] font-bold">Audit Empanelled</strong>
                  </div>

                </div>

                {/* Floating Glassmorphic Stat Pill 1: Top Right */}
                <div className="absolute -top-3 -right-2 z-20 bg-white/95 backdrop-blur-md p-3 px-4 rounded-2xl border border-blue-200 shadow-xl flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-100 text-[#1D64EC] flex items-center justify-center font-bold text-sm">
                    ★
                  </div>
                  <div>
                    <strong className="text-xs font-black text-[#0F172A] block">100+ Vetted Startups</strong>
                    <span className="text-[10px] text-slate-500 font-semibold">Innovation Partners</span>
                  </div>
                </div>

                {/* Floating Glassmorphic Stat Pill 2: Bottom Left */}
                <div className="absolute -bottom-3 -left-3 z-20 bg-white/95 backdrop-blur-md p-3 px-4 rounded-2xl border border-emerald-200 shadow-xl flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
                    🏛️
                  </div>
                  <div>
                    <strong className="text-xs font-black text-[#0F172A] block">28 Departments</strong>
                    <span className="text-[10px] text-slate-500 font-semibold">Live Sandbox Pilots</span>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 4. PROBLEM CONTEXT: WHY THIS MATTERS                                      */}
      {/* ========================================================================= */}
      <section id="why-it-matters" className="py-16 sm:py-24 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="px-3.5 py-1 rounded-full bg-red-50 text-red-700 text-xs font-bold border border-red-200 uppercase tracking-wider">
              Procurement Friction & Innovation Bottlenecks
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] font-display tracking-tight">
              Why This Matters
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
              Government departments across Maharashtra face complex operational challenges — from water loss in urban networks to traffic congestion, healthcare access, and agricultural productivity. Startups have innovative solutions, but the existing procurement system is designed for standard goods and established vendors.
            </p>
          </div>

          {/* Dual Struggle Cards: Departments vs Startups */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Left: Departments Struggle */}
            <div className="p-8 rounded-3xl bg-[#F8FAFC] border border-slate-200 space-y-5 shadow-xs">
              <div className="flex items-center gap-3 text-red-600">
                <div className="w-10 h-10 rounded-2xl bg-red-100 flex items-center justify-center font-black">
                  🏛️
                </div>
                <h3 className="text-xl font-extrabold text-[#0F172A] font-display">Departments struggle to:</h3>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-slate-700 font-medium">
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-red-100 text-red-700 flex items-center justify-center text-xs shrink-0 mt-0.5">✕</span>
                  <span>Formulate clear, outcome-based problem statements</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-red-100 text-red-700 flex items-center justify-center text-xs shrink-0 mt-0.5">✕</span>
                  <span>Discover and shortlist suitable startups</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-red-100 text-red-700 flex items-center justify-center text-xs shrink-0 mt-0.5">✕</span>
                  <span>Evaluate novel technologies fairly and quickly</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-red-100 text-red-700 flex items-center justify-center text-xs shrink-0 mt-0.5">✕</span>
                  <span>Structure controlled pilots with measurable KPIs</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-red-100 text-red-700 flex items-center justify-center text-xs shrink-0 mt-0.5">✕</span>
                  <span>Manage intellectual property, data, and cybersecurity</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-red-100 text-red-700 flex items-center justify-center text-xs shrink-0 mt-0.5">✕</span>
                  <span>Measure pilot performance and transition successful solutions into scale</span>
                </li>
              </ul>
            </div>

            {/* Right: Startups Struggle */}
            <div className="p-8 rounded-3xl bg-[#F8FAFC] border border-slate-200 space-y-5 shadow-xs">
              <div className="flex items-center gap-3 text-orange-600">
                <div className="w-10 h-10 rounded-2xl bg-orange-100 flex items-center justify-center font-black">
                  🚀
                </div>
                <h3 className="text-xl font-extrabold text-[#0F172A] font-display">Startups struggle with:</h3>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-slate-700 font-medium">
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center text-xs shrink-0 mt-0.5">✕</span>
                  <span>Eligibility barriers like high turnover and past experience requirements</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center text-xs shrink-0 mt-0.5">✕</span>
                  <span>Long, opaque government sales cycles</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center text-xs shrink-0 mt-0.5">✕</span>
                  <span>Unclear payment milestones and delayed disbursements</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center text-xs shrink-0 mt-0.5">✕</span>
                  <span>Limited visibility of departmental demand and procurement pipelines</span>
                </li>
              </ul>

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold leading-relaxed">
                The result: good innovations never get tested, and departments continue with sub-optimal systems.
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. OUR SOLUTION: STRUCTURED INNOVATION PROCUREMENT PATHWAY                */}
      {/* ========================================================================= */}
      <section id="solution" className="py-16 sm:py-24 bg-[#F4F7FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="px-3.5 py-1 rounded-full bg-[#E8F2FE] text-[#1D64EC] text-xs font-bold border border-blue-200 uppercase tracking-wider">
              The Architecture of Innovation
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] font-display tracking-tight">
              A Structured, Transparent Innovation Procurement Pathway
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
              This platform provides an end-to-end mechanism designed to be transparent, competitive, and legally compliant, while remaining startup-friendly and practical for government teams.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Solution for Departments */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#E8F2FE] text-[#1D64EC] flex items-center justify-center font-bold">
                  🏛️
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-[#0F172A]">For Government Departments</h3>
                  <p className="text-xs text-slate-500">Structured outcome definition and risk-managed sandbox</p>
                </div>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-slate-700 font-medium">
                {[
                  'Identify and publish outcome-based challenges',
                  'Discover and shortlist eligible, DPIIT-recognized startups',
                  'Conduct AI-assisted and expert evaluation of solutions',
                  'Run controlled sandbox pilots with clear KPIs and milestone-based payments',
                  'Manage IP, data ownership, cybersecurity, and risk through standard clauses',
                  'Measure pilot performance with independent validation',
                  'Make evidence-based scale-up or procurement decisions'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#1D64EC] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Solution for Startups */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                  🚀
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-[#0F172A]">For Startups & Innovators</h3>
                  <p className="text-xs text-slate-500">Single window entry and guaranteed milestone payments</p>
                </div>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-slate-700 font-medium">
                {[
                  'A single window to view challenges, submit proposals, and track status',
                  'A verified company evidence archive to showcase capabilities and past work',
                  'Clear milestone-based contracts and timely payments via escrow/PFMS',
                  'Transparency on evaluation, pilot progress, and scale decisions'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-[#1D64EC] text-xs font-bold leading-relaxed">
                Empowering founders to solve real public problems with zero bureaucratic bottlenecks.
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. HOW IT WORKS (9 Clear Stages Horizontal / Grid Journey)                */}
      {/* ========================================================================= */}
      <section id="how-it-works" className="py-16 sm:py-24 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="px-3.5 py-1 rounded-full bg-[#E8F2FE] text-[#1D64EC] text-xs font-bold border border-blue-200 uppercase tracking-wider">
              End-to-End Progression
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] font-display tracking-tight">
              How It Works
            </h2>
            <p className="text-base text-slate-600 font-medium">
              A simple, stage-wise journey from problem to scale.
            </p>
          </div>

          {/* 9 Stage Flow Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workflowStages.map((stage) => (
              <div 
                key={stage.num}
                className="p-6 rounded-3xl bg-[#F8FAFC] border border-slate-200 hover:border-[#1D64EC] hover:shadow-md transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="w-8 h-8 rounded-xl bg-[#E8F2FE] text-[#1D64EC] font-black text-xs flex items-center justify-center">
                      {stage.num}
                    </span>
                    <span className="text-xl">{stage.icon}</span>
                  </div>
                  <h4 className="font-extrabold text-[#0F172A] text-sm sm:text-base leading-snug">
                    {stage.title}
                  </h4>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    {stage.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Below Flow */}
          <div className="pt-4 text-center flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => openPortal('startup', 'applications')}
              className="px-6 py-3.5 rounded-2xl bg-[#1D64EC] hover:bg-[#0D4CD3] text-white font-bold text-xs shadow-action inline-flex items-center gap-2 transition-all hover:scale-[1.02]"
            >
              <span>See a Live Workflow in Proposal Tracker</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => openPortal('startup', 'challenges')}
              className="px-6 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-all"
            >
              View Sample Challenge
            </button>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. KEY FEATURES: WHAT THE PLATFORM OFFERS                                  */}
      {/* ========================================================================= */}
      <section id="features" className="py-16 sm:py-24 bg-[#F4F7FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="px-3.5 py-1 rounded-full bg-blue-50 text-[#1D64EC] text-xs font-bold border border-blue-200 uppercase tracking-wider">
              Comprehensive Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] font-display tracking-tight">
              What the Platform Offers
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-medium">
              Purpose-built tooling tailored for government officers and innovative startups.
            </p>

            {/* Toggle Switch between Gov & Startup Features */}
            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setActiveFeatureTab('gov')}
                className={`px-5 py-2.5 rounded-2xl font-bold text-xs transition-all ${
                  activeFeatureTab === 'gov'
                    ? 'bg-[#1D64EC] text-white shadow-md'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                🏛️ For Government Departments (7 Modules)
              </button>
              <button
                type="button"
                onClick={() => setActiveFeatureTab('startup')}
                className={`px-5 py-2.5 rounded-2xl font-bold text-xs transition-all ${
                  activeFeatureTab === 'startup'
                    ? 'bg-[#1D64EC] text-white shadow-md'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                🚀 For Startups & Innovators (7 Modules)
              </button>
            </div>
          </div>

          {/* Features Grid based on Active Tab */}
          {activeFeatureTab === 'gov' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
              
              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2.5">
                <span className="w-8 h-8 rounded-xl bg-blue-100 text-[#1D64EC] font-bold flex items-center justify-center">1</span>
                <h3 className="font-extrabold text-[#0F172A] text-sm">Challenge Creation Wizard</h3>
                <p className="text-slate-600 font-medium leading-relaxed">
                  Draft outcome-based problem statements with AI-assisted problem framing, KPI suggestions, and eligibility criteria.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2.5">
                <span className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 font-bold flex items-center justify-center">2</span>
                <h3 className="font-extrabold text-[#0F172A] text-sm">AI-Powered Startup Shortlisting</h3>
                <p className="text-slate-600 font-medium leading-relaxed">
                  Automatically rank startups based on problem fit, technology match, evidence strength, pilot readiness, security, and more.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2.5">
                <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center">3</span>
                <h3 className="font-extrabold text-[#0F172A] text-sm">Expert Evaluation Module</h3>
                <p className="text-slate-600 font-medium leading-relaxed">
                  Structured evaluation interface with startup dossiers, scoring rubrics, and clear “Approved / Not Approved” decisions for pilots.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2.5">
                <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-900 font-bold flex items-center justify-center">4</span>
                <h3 className="font-extrabold text-[#0F172A] text-sm">Pilot Management Console</h3>
                <p className="text-slate-600 font-medium leading-relaxed">
                  Define milestones, KPIs, data sources, and payment tranches; monitor pilot progress, telemetry, and field alerts in real time.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2.5">
                <span className="w-8 h-8 rounded-xl bg-blue-100 text-[#1D64EC] font-bold flex items-center justify-center">5</span>
                <h3 className="font-extrabold text-[#0F172A] text-sm">Digital Contract Signer</h3>
                <p className="text-slate-600 font-medium leading-relaxed">
                  Standardized pilot agreements with IP, data, and cybersecurity clauses; Aadhaar/DSC-based eSign with full audit trail.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2.5">
                <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center">6</span>
                <h3 className="font-extrabold text-[#0F172A] text-sm">Independent Validation & Scale Decision</h3>
                <p className="text-slate-600 font-medium leading-relaxed">
                  Capture pilot results, run independent audits, and make evidence-based decisions to scale, iterate, or close.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2.5 md:col-span-2 lg:col-span-3">
                <span className="w-8 h-8 rounded-xl bg-slate-100 text-slate-900 font-bold flex items-center justify-center">7</span>
                <h3 className="font-extrabold text-[#0F172A] text-sm">Integration with Government Systems</h3>
                <p className="text-slate-600 font-medium leading-relaxed">
                  Aligns with DPIIT startup database, GeM, state e-procurement, and PFMS for payments and compliance.
                </p>
              </div>

            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
              
              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2.5">
                <span className="w-8 h-8 rounded-xl bg-blue-100 text-[#1D64EC] font-bold flex items-center justify-center">1</span>
                <h3 className="font-extrabold text-[#0F172A] text-sm">Challenge Marketplace</h3>
                <p className="text-slate-600 font-medium leading-relaxed">
                  Browse all open challenges by department, theme, and location; see eligibility, budget, and timelines at a glance.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2.5">
                <span className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 font-bold flex items-center justify-center">2</span>
                <h3 className="font-extrabold text-[#0F172A] text-sm">Company Evidence Archive</h3>
                <p className="text-slate-600 font-medium leading-relaxed">
                  Maintain a verified digital dossier: company documents, DPIIT recognition, technology details, past projects, compliance, and security certifications.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2.5">
                <span className="w-8 h-8 rounded-xl bg-blue-100 text-[#1D64EC] font-bold flex items-center justify-center">3</span>
                <h3 className="font-extrabold text-[#0F172A] text-sm">Proposal Tracker</h3>
                <p className="text-slate-600 font-medium leading-relaxed">
                  Track every proposal from submission to scale decision with a clear 10-stage lifecycle timeline.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2.5">
                <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center">4</span>
                <h3 className="font-extrabold text-[#0F172A] text-sm">Active Pilot Workspace</h3>
                <p className="text-slate-600 font-medium leading-relaxed">
                  Upload milestone deliverables, telemetry logs, and field reports; track escrow tranches and payments in one place.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2.5">
                <span className="w-8 h-8 rounded-xl bg-slate-100 text-slate-900 font-bold flex items-center justify-center">5</span>
                <h3 className="font-extrabold text-[#0F172A] text-sm">Digital Contract Signer</h3>
                <p className="text-slate-600 font-medium leading-relaxed">
                  Review and eSign pilot agreements online; download executed contracts and view complete audit trails.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2.5">
                <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-900 font-bold flex items-center justify-center">6</span>
                <h3 className="font-extrabold text-[#0F172A] text-sm">Transparent Payments</h3>
                <p className="text-slate-600 font-medium leading-relaxed">
                  Milestone-based escrow/PFMS payments with clear invoices, payment status, and receipts.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2.5 md:col-span-2 lg:col-span-3">
                <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center">7</span>
                <h3 className="font-extrabold text-[#0F172A] text-sm">Pathway to Scale</h3>
                <p className="text-slate-600 font-medium leading-relaxed">
                  Successful pilots get fast-tracked for wider deployment, with clear routes into state procurement and GeM listings.
                </p>
              </div>

            </div>
          )}

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. IMPACT & BENEFITS: EXPECTED OUTCOMES                                   */}
      {/* ========================================================================= */}
      <section id="outcomes" className="py-16 sm:py-24 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 uppercase tracking-wider">
              Measurable Public Value
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] font-display tracking-tight">
              Expected Outcomes
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-medium">
              Transformative impact for state administration and high-growth innovators.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* For Government */}
            <div className="p-8 rounded-3xl bg-[#F8FAFC] border border-slate-200 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-100 text-[#1D64EC] flex items-center justify-center font-bold">
                  🏛️
                </div>
                <h3 className="text-lg font-extrabold text-[#0F172A]">For Government</h3>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-slate-700 font-medium">
                {[
                  'Faster discovery and testing of innovative solutions',
                  'Higher quality, lower-risk pilots with measurable KPIs',
                  'Reduced departmental risk through structured contracts and validation',
                  'Timely, milestone-based payments to startups',
                  'Evidence-based procurement and scale-up decisions',
                  'Reusable templates for problem statements, evaluations, contracts, and IP/data clauses'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#1D64EC] shrink-0 mt-0.5 font-black" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* For Startups */}
            <div className="p-8 rounded-3xl bg-[#F8FAFC] border border-slate-200 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  🚀
                </div>
                <h3 className="text-lg font-extrabold text-[#0F172A]">For Startups</h3>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-slate-700 font-medium">
                {[
                  'Lower entry barriers for government procurement',
                  'Clear visibility of departmental demand and challenges',
                  'Shorter, more transparent sales cycles',
                  'Timely payments and reduced cash-flow uncertainty',
                  'Fair, rubric-based evaluation of technology and impact',
                  'A credible pathway from pilot to scale across departments and districts'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 font-black" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. WHO CAN USE THIS: WHO IS THIS FOR?                                     */}
      {/* ========================================================================= */}
      <section id="who-is-this-for" className="py-16 sm:py-24 bg-[#F4F7FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="px-3.5 py-1 rounded-full bg-purple-50 text-purple-800 text-xs font-bold border border-purple-200 uppercase tracking-wider">
              Ecosystem Stakeholders
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] font-display tracking-tight">
              Who Is This For?
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-medium">
              A unified bridge connecting Maharashtra's public institutions and innovators.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Government Departments & Agencies */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-100 text-[#1D64EC] flex items-center justify-center font-bold">
                  🏛️
                </div>
                <h3 className="text-lg font-extrabold text-[#0F172A]">Government Departments & Agencies</h3>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-slate-700 font-medium">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1D64EC] shrink-0 mt-2" />
                  <span>Line departments (Urban Development, Water Resources, Health, Agriculture, Transport, etc.)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1D64EC] shrink-0 mt-2" />
                  <span>Municipal corporations and urban local bodies</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1D64EC] shrink-0 mt-2" />
                  <span>State innovation societies and entrepreneurship cells</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1D64EC] shrink-0 mt-2" />
                  <span>Procurement and finance teams managing pilot contracts and payments</span>
                </li>
              </ul>
            </div>

            {/* DPIIT-Recognized Startups */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  🚀
                </div>
                <h3 className="text-lg font-extrabold text-[#0F172A]">DPIIT-Recognized Startups</h3>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-slate-700 font-medium">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-2" />
                  <span>Early-stage and growth-stage startups with innovative solutions</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-2" />
                  <span>Startups in sectors like water, energy, health, agriculture, mobility, governance, and more</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-2" />
                  <span>Startups looking to pilot and scale solutions with government buyers</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. SAMPLE USE CASES (4 Quantified Case Stories)                          */}
      {/* ========================================================================= */}
      <section id="use-cases" className="py-16 sm:py-24 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="px-3.5 py-1 rounded-full bg-blue-50 text-[#1D64EC] text-xs font-bold border border-blue-200 uppercase tracking-wider">
              Proven Ground Results
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] font-display tracking-tight">
              Sample Use Cases
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-medium">
              Real-world deployment scenarios delivering measurable public outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            
            {/* Case 1: Urban Water */}
            <div className="p-6 rounded-3xl bg-[#F8FAFC] border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl">💧</span>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-[#1D64EC] font-bold text-[10px]">Pune Municipal Corp</span>
              </div>
              <h3 className="font-extrabold text-[#0F172A] text-base">1. Urban Water Loss Reduction (Pune)</h3>
              <div className="space-y-1 text-slate-600 font-medium">
                <p><strong>Problem:</strong> High non-revenue water (NRW) in urban distribution networks.</p>
                <p><strong>Solution:</strong> AI-based leak detection and pressure optimization startup.</p>
              </div>
              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-bold">
                Outcome: 18–22% NRW reduction in pilot zones; fast-tracked for city-wide scale.
              </div>
            </div>

            {/* Case 2: Traffic */}
            <div className="p-6 rounded-3xl bg-[#F8FAFC] border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl">🚦</span>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold text-[10px]">Urban Mobility</span>
              </div>
              <h3 className="font-extrabold text-[#0F172A] text-base">2. AI-Based Traffic Signal Optimization</h3>
              <div className="space-y-1 text-slate-600 font-medium">
                <p><strong>Problem:</strong> Congestion at high-volume intersections with long waiting times.</p>
                <p><strong>Solution:</strong> AI-driven adaptive signal control with real-time traffic prediction.</p>
              </div>
              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-bold">
                Outcome: 15–20% reduction in average waiting time in pilot corridors.
              </div>
            </div>

            {/* Case 3: Agriculture */}
            <div className="p-6 rounded-3xl bg-[#F8FAFC] border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl">🌾</span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-bold text-[10px]">Agriculture Dept</span>
              </div>
              <h3 className="font-extrabold text-[#0F172A] text-base">3. Drone-Based Crop Health Monitoring</h3>
              <div className="space-y-1 text-slate-600 font-medium">
                <p><strong>Problem:</strong> Limited visibility of crop stress and pest attacks at district level.</p>
                <p><strong>Solution:</strong> Drone + AI platform for multispectral crop health mapping.</p>
              </div>
              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-bold">
                Outcome: Early detection of stress zones; targeted interventions in pilot blocks.
              </div>
            </div>

            {/* Case 4: Smart Lighting */}
            <div className="p-6 rounded-3xl bg-[#F8FAFC] border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl">💡</span>
                <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-900 font-bold text-[10px]">Smart Cities</span>
              </div>
              <h3 className="font-extrabold text-[#0F172A] text-base">4. Smart Street Lighting with Adaptive Control</h3>
              <div className="space-y-1 text-slate-600 font-medium">
                <p><strong>Problem:</strong> High energy consumption and poor lighting in certain wards.</p>
                <p><strong>Solution:</strong> IoT-enabled smart lighting with adaptive brightness and fault detection.</p>
              </div>
              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-bold">
                Outcome: 25–30% energy savings; improved citizen complaints resolution.
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 11. COMPLIANCE & STANDARDS + GOVERNANCE & OVERSIGHT                       */}
      {/* ========================================================================= */}
      <section id="compliance" className="py-16 sm:py-24 bg-[#F4F7FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Compliance & Standards */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <span className="px-3 py-1 rounded-full bg-blue-50 text-[#1D64EC] text-xs font-bold uppercase tracking-wider">
                Legal & State Standards
              </span>
              <h3 className="text-2xl font-black text-[#0F172A] font-display">Compliance & Standards</h3>
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                The mechanism is designed to be:
              </p>
              <ul className="space-y-2 text-xs text-slate-700 font-semibold">
                <li className="flex items-center gap-2">✓ Legally compliant with state procurement and financial rules</li>
                <li className="flex items-center gap-2">✓ Aligned with DPIIT startup recognition and eligibility norms</li>
                <li className="flex items-center gap-2">✓ Consistent with MeitY cloud and data residency guidelines</li>
                <li className="flex items-center gap-2">✓ Compliant with Maharashtra State Cyber Policy and CERT-In audits</li>
                <li className="flex items-center gap-2">✓ Integrated with Government e-Marketplace (GeM) and e-procurement</li>
              </ul>

              <div className="pt-2 border-t border-slate-100">
                <strong className="text-xs font-bold text-[#0F172A] block mb-1.5">Standard Templates Provided For:</strong>
                <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                  Problem statements & criteria • Pilot agreements, IP, and data ownership clauses • Cybersecurity & risk management • Milestone payment schedules & validation reports.
                </p>
              </div>
            </div>

            {/* Governance & Oversight */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                Institutional Framework
              </span>
              <h3 className="text-2xl font-black text-[#0F172A] font-display">Governance & Oversight</h3>
              
              <div className="space-y-3 text-xs text-slate-700">
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <strong className="text-[#0F172A] block font-bold">Nodal Agency:</strong>
                  <span>Maharashtra State Innovation Society, Department of Skills, Employment, Entrepreneurship and Innovation</span>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <strong className="text-[#0F172A] block font-bold">Participating Departments:</strong>
                  <span>Urban Development, Water Resources, Health, Agriculture, Transport, and others</span>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <strong className="text-[#0F172A] block font-bold">Audit & Transparency:</strong>
                  <span>Complete digital audit trail for evaluations, contracts, payments, and scale decisions under IT Act 2000</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 12. FREQUENTLY ASKED QUESTIONS (FAQs)                                     */}
      {/* ========================================================================= */}
      <section id="faqs" className="py-16 sm:py-24 bg-white border-y border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center space-y-3">
            <span className="px-3.5 py-1 rounded-full bg-blue-50 text-[#1D64EC] text-xs font-bold border border-blue-200 uppercase tracking-wider">
              Answers & Help
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] font-display tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-medium">
              Everything you need to know about participating in the innovation sandbox.
            </p>
          </div>

          <div className="space-y-3 text-xs">
            {faqs.map((faq, idx) => (
              <div 
                key={idx}
                className="rounded-2xl bg-[#F8FAFC] border border-slate-200 overflow-hidden shadow-2xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 sm:p-5 text-left font-bold text-[#0F172A] text-sm sm:text-base flex items-center justify-between gap-4 hover:bg-slate-100 transition-colors"
                >
                  <span>{faq.q}</span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-5 h-5 text-[#1D64EC] shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                </button>

                {openFaq === idx && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 text-slate-600 text-xs sm:text-sm font-medium leading-relaxed border-t border-slate-200/80">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 13. FINAL HEROIC CTA BANNER                                               */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0D4CD3] text-white relative overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-indigo-500/20 blur-3xl" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          
          <div className="space-y-3">
            <span className="px-3.5 py-1 rounded-full bg-white/10 text-blue-200 text-xs font-bold border border-white/20 uppercase tracking-wider">
              Statewide Innovation Sandbox
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-white">
              Ready to Transform Public Procurement in Maharashtra?
            </h2>
            <p className="text-sm sm:text-base text-slate-200 font-medium max-w-2xl mx-auto leading-relaxed">
              Whether you are a government department looking to solve real operational challenges, or a startup with innovative solutions for the public sector, this platform provides a structured, transparent, and startup-friendly pathway from problem to scale.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => openPortal('gov', 'dashboard')}
              className="px-6 py-3.5 rounded-2xl bg-[#1D64EC] hover:bg-[#0D4CD3] text-white font-bold text-xs sm:text-sm shadow-xl flex items-center gap-2 transition-all hover:scale-[1.02]"
            >
              <Building2 className="w-4 h-4 text-blue-200" />
              <span>Login as Department</span>
            </button>

            <button
              type="button"
              onClick={() => openPortal('startup', 'dashboard')}
              className="px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-[#0F172A] font-bold text-xs sm:text-sm shadow-xl flex items-center gap-2 transition-all hover:scale-[1.02]"
            >
              <Rocket className="w-4 h-4 text-[#1D64EC]" />
              <span>Login as Startup</span>
            </button>
          </div>

          {/* Contact Details */}
          <div className="pt-6 border-t border-white/15 text-xs text-slate-300 space-y-1">
            <p>Email: <strong className="text-white">support@mahatech.gov.in</strong> • Helpline: <strong className="text-white">+91-22-2202-9988</strong> (Mon–Fri, 10 AM–6 PM)</p>
            <p className="text-slate-400 text-[11px]">Documentation: User Guides & Standard Contract Templates Available</p>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 14. FOOTER CONTENT (5 Columns + Copyright)                                */}
      {/* ========================================================================= */}
      <footer className="bg-[#0F172A] text-slate-400 text-xs py-14 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            
            {/* Col 1: About */}
            <div className="space-y-3">
              <h4 className="font-bold text-white text-xs uppercase tracking-wider font-display">About</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#why-it-matters" className="hover:text-white transition-colors">Why This Matters</a></li>
                <li><a href="#solution" className="hover:text-white transition-colors">Our Solution</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#compliance" className="hover:text-white transition-colors">Governance & Oversight</a></li>
              </ul>
            </div>

            {/* Col 2: For Departments */}
            <div className="space-y-3">
              <h4 className="font-bold text-white text-xs uppercase tracking-wider font-display">For Departments</h4>
              <ul className="space-y-2 text-slate-400">
                <li><button onClick={() => openPortal('gov', 'challenges')} className="hover:text-white transition-colors text-left">Publish a Challenge</button></li>
                <li><button onClick={() => openPortal('gov', 'monitor')} className="hover:text-white transition-colors text-left">Pilot Management</button></li>
                <li><button onClick={() => openPortal('gov', 'contracts')} className="hover:text-white transition-colors text-left">Contract Approval</button></li>
                <li><button onClick={() => openPortal('gov', 'gem')} className="hover:text-white transition-colors text-left">Scale & GeM</button></li>
              </ul>
            </div>

            {/* Col 3: For Startups */}
            <div className="space-y-3">
              <h4 className="font-bold text-white text-xs uppercase tracking-wider font-display">For Startups</h4>
              <ul className="space-y-2 text-slate-400">
                <li><button onClick={() => openPortal('startup', 'challenges')} className="hover:text-white transition-colors text-left">Challenge Marketplace</button></li>
                <li><button onClick={() => openPortal('startup', 'passport')} className="hover:text-white transition-colors text-left">Company Evidence Archive</button></li>
                <li><button onClick={() => openPortal('startup', 'applications')} className="hover:text-white transition-colors text-left">Proposal Tracker</button></li>
                <li><button onClick={() => openPortal('startup', 'execution')} className="hover:text-white transition-colors text-left">Active Pilot Workspace</button></li>
              </ul>
            </div>

            {/* Col 4: Resources */}
            <div className="space-y-3">
              <h4 className="font-bold text-white text-xs uppercase tracking-wider font-display">Resources</h4>
              <ul className="space-y-2 text-slate-400">
                <li><button onClick={() => addNotification({ title: 'Downloading User Guide', message: 'Downloading official Maharashtra Procurement Sandbox Manual (PDF)', portal: 'startup', type: 'info' })} className="hover:text-white transition-colors text-left">User Guides (PDF)</button></li>
                <li><a href="#faqs" className="hover:text-white transition-colors">FAQs</a></li>
                <li><a href="mailto:support@mahatech.gov.in" className="hover:text-white transition-colors">Contact Support</a></li>
              </ul>
            </div>

            {/* Col 5: Legal */}
            <div className="space-y-3">
              <h4 className="font-bold text-white text-xs uppercase tracking-wider font-display">Legal</h4>
              <ul className="space-y-2 text-slate-400">
                <li><span className="cursor-pointer hover:text-white transition-colors">Terms of Use</span></li>
                <li><span className="cursor-pointer hover:text-white transition-colors">Privacy Policy</span></li>
                <li><span className="cursor-pointer hover:text-white transition-colors">Accessibility Statement</span></li>
              </ul>
            </div>

          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Mahatech Procure — Problem Statement 26136</span>
            </div>
            <p>© Government of Maharashtra • Maharashtra State Innovation Society. All rights reserved.</p>
          </div>

        </div>
      </footer>

      {/* ========================================================================= */}
      {/* MODAL: REQUEST A DEMO (GOVERNMENT DEPARTMENTS)                             */}
      {/* ========================================================================= */}
      {isDemoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 border border-slate-200 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-black text-[#0F172A] font-display">
                  Request Department Sandbox Briefing
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">For Maharashtra Government Officers</p>
              </div>
              <button
                onClick={() => setIsDemoModalOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleDemoSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-[#0F172A] mb-1">Department / Municipal Body *</label>
                <input
                  type="text"
                  required
                  value={demoDept}
                  onChange={(e) => setDemoDept(e.target.value)}
                  placeholder="e.g. Pune Municipal Corporation / Water Supply Dept."
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-navy-900 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-[#0F172A] mb-1">Nodal Officer Name *</label>
                <input
                  type="text"
                  required
                  value={demoOfficer}
                  onChange={(e) => setDemoOfficer(e.target.value)}
                  placeholder="e.g. Shri Rajesh Deshmukh"
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-navy-900 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-[#0F172A] mb-1">Government Official Email (.gov.in / .nic.in) *</label>
                <input
                  type="email"
                  required
                  value={demoEmail}
                  onChange={(e) => setDemoEmail(e.target.value)}
                  placeholder="rajesh.deshmukh@maharashtra.gov.in"
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-navy-900 font-medium"
                />
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsDemoModalOpen(false)}
                  className="px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-[#1D64EC] hover:bg-[#0D4CD3] text-white font-bold shadow-action"
                >
                  Schedule Department Briefing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
