import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { 
  Rocket, Building2, ShieldCheck, CheckCircle2, ArrowRight, 
  Sparkles, Search, ChevronRight, Lock, Activity, FileText, 
  DollarSign, Check, ChevronDown, ChevronUp, Globe, Users, 
  Layers, Download, Scale, Cpu, HelpCircle, Mail, Phone, 
  ExternalLink, ArrowUpRight, Star, Shield, Radio, CheckCheck, 
  Compass, BarChart3, Award, FileSpreadsheet, Paperclip, Send, 
  X, Info, Flame 
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { openPortal, challenges, addNotification } = usePlatform();

  // Search input state
  const [heroSearch, setHeroSearch] = useState('');

  // Active FAQ Accordion
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Active How It Works Tab (All vs Phased)
  const [howItWorksTab, setHowItWorksTab] = useState<'all' | 'phase1' | 'phase2' | 'phase3'>('all');

  // Modals
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  // Registration Form State
  const [regName, setRegName] = useState('');
  const [regCompany, setRegCompany] = useState('');
  const [regDpiit, setRegDpiit] = useState('');
  const [regEmail, setRegEmail] = useState('');

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

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegisterModalOpen(false);
    addNotification({
      title: 'Startup Profile Created',
      message: `Welcome ${regCompany || 'Innovator'}! Your startup profile has been created. Redirecting to Startup Portal.`,
      portal: 'startup',
      type: 'success'
    });
    openPortal('startup', 'dashboard');
  };

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDemoModalOpen(false);
    addNotification({
      title: 'Demo Session Scheduled',
      message: `Thank you Officer ${demoOfficer || 'User'}. A Sandbox briefing for ${demoDept || 'your department'} has been booked.`,
      portal: 'gov',
      type: 'success'
    });
  };

  const stages = [
    { num: 1, phase: 'phase1', title: 'Department defines a challenge', desc: 'Outcome-based problem statement, target geographies, budget, and KPIs.' },
    { num: 2, phase: 'phase1', title: 'Eligibility & constraints are set', desc: 'Mandatory and preferred criteria for startups (DPIIT, experience, certifications).' },
    { num: 3, phase: 'phase1', title: 'Startups discover the challenge', desc: 'Browse and filter challenges by sector, department, and location.' },
    { num: 4, phase: 'phase1', title: 'Startups submit proposals', desc: 'Upload solution details, evidence, and compliance documents.' },
    { num: 5, phase: 'phase1', title: 'AI-assisted shortlisting', desc: 'AI evaluates startups on relevance, technology fit, evidence strength, pilot readiness, and security.' },
    { num: 6, phase: 'phase1', title: 'Expert evaluation', desc: 'Domain experts review AI-shortlisted startups, add notes, and approve startups for pilot.' },
    { num: 7, phase: 'phase2', title: 'KPI contract & approval', desc: 'Finalize pilot scope, KPIs, milestones, IP, data, and security clauses; approve contracts via eSign.' },
    { num: 8, phase: 'phase2', title: 'Controlled pilot launch', desc: 'Deploy solution in defined zones, with sensors, integrations, and baseline data collection.' },
    { num: 9, phase: 'phase2', title: 'Trusted data collection', desc: 'Continuous telemetry, field logs, and milestone evidence uploaded to the platform.' },
    { num: 10, phase: 'phase2', title: 'Integrity & anomaly checks', desc: 'Automated checks on data quality, uptime, and KPI calculations.' },
    { num: 11, phase: 'phase3', title: 'Independent validation', desc: 'Third-party or government validation of KPI results and compliance.' },
    { num: 12, phase: 'phase3', title: 'Evidence-based decision', desc: 'Based on verified outcomes, decide to Scale, Iterate, or Close.' },
  ];

  const filteredStages = stages.filter(s => {
    if (howItWorksTab === 'all') return true;
    return s.phase === howItWorksTab;
  });

  const faqs = [
    {
      q: 'Who can use Mahatech Procure?',
      a: 'Government departments of Maharashtra can publish challenges and manage pilots. DPIIT-recognized startups (and other eligible entities, as per policy) can register, create profiles, and submit proposals.'
    },
    {
      q: 'Is participation limited to large companies?',
      a: 'No. The platform is designed to be startup-friendly. Eligibility criteria can include relaxed turnover limits and mark early-stage startups as "preferred" or "scored," subject to applicable procurement rules.'
    },
    {
      q: 'How are startups evaluated?',
      a: 'Through a combination of AI-assisted scoring (on relevance, technology fit, evidence, pilot readiness, security, etc.) and domain expert evaluation. Final pilot approval and scale decisions are made by government authorities.'
    },
    {
      q: 'How do pilots get paid?',
      a: 'Pilots use escrow-linked milestones. Startups submit evidence for each milestone; after validation, payments are released via PFMS/treasury systems as per contract terms.'
    },
    {
      q: 'What happens after a successful pilot?',
      a: 'Based on verified KPIs and validation, departments can decide to Scale the solution, Iterate with improvements, or Close the pilot. Successful solutions can move to state-wide deployment via GeM and fast-track mechanisms.'
    },
    {
      q: 'Is my data secure?',
      a: 'Yes. The platform follows government-grade security practices, with data hosted in India, role-based access, encryption, and comprehensive audit logs.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-navy-900 selection:bg-amber-400 selection:text-navy-950 font-sans antialiased">
      
      {/* ========================================================================= */}
      {/* 1. TOP GLOBAL NAVBAR                                                     */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-amber-100/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Brand / Logo */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-600 text-white font-black text-xl flex items-center justify-center shadow-md shadow-orange-500/20">
              🏛️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl font-black text-navy-900 font-display tracking-tight leading-none">
                  Mahatech <span className="text-orange-600">Procure</span>
                </span>
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-extrabold uppercase tracking-wider hidden sm:inline-block">
                  Gov Sandbox
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-semibold tracking-wide mt-0.5">
                Government of Maharashtra
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-bold text-slate-700">
            <a href="#hero" className="text-orange-600 hover:text-orange-700 transition-colors">Home</a>
            <a href="#about" className="hover:text-orange-600 transition-colors">What is it</a>
            <a href="#departments" className="hover:text-orange-600 transition-colors">Departments</a>
            <a href="#startups" className="hover:text-orange-600 transition-colors">Startups</a>
            <a href="#how-it-works" className="hover:text-orange-600 transition-colors">How it Works</a>
            <a href="#features" className="hover:text-orange-600 transition-colors">Features</a>
            <a href="#impact" className="hover:text-orange-600 transition-colors">Impact</a>
            <a href="#faqs" className="hover:text-orange-600 transition-colors">FAQs</a>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => openPortal('startup', 'challenges')}
              className="hidden sm:flex px-4 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 font-bold text-xs items-center gap-1.5 transition-all"
            >
              <Compass className="w-3.5 h-3.5 text-orange-600" />
              <span>Explore Challenges</span>
            </button>

            <button
              type="button"
              onClick={() => setIsLoginModalOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs shadow-md shadow-orange-500/25 flex items-center gap-2 transition-all hover:scale-[1.02]"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Access Portals</span>
            </button>
          </div>

        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. HERO SECTION (Matching User Reference Image UI & Organic Curves)       */}
      {/* ========================================================================= */}
      <section id="hero" className="relative pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden">
        
        {/* Background Decorative Warm Blobs */}
        <div className="absolute -top-24 right-0 w-[550px] h-[550px] bg-gradient-to-br from-amber-200/50 via-orange-200/30 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-1/2 -left-24 w-[400px] h-[400px] bg-gradient-to-tr from-amber-100/60 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Hero Text, Search, CTAs, Trust Badges */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/90 text-amber-900 border border-amber-300/80 text-xs font-bold shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
                <span>Government Innovation & Sandbox Procurement</span>
              </div>

              <div className="space-y-3">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-navy-950 font-display tracking-tight leading-[1.1]">
                  Mahatech <span className="text-orange-600">Procure</span>
                </h1>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-800 font-display leading-snug">
                  A digital marketplace for government innovation challenges and startup solutions.
                </h2>
                <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-2xl">
                  Mahatech Procure connects Maharashtra’s government departments with vetted startups to solve real public problems—through open challenges, controlled pilots, and evidence-based scale-up.
                </p>
              </div>

              {/* Search Pill Input (Matching Reference Layout) */}
              <form onSubmit={handleSearchSubmit} className="max-w-xl">
                <div className="p-1.5 bg-white rounded-2xl border-2 border-amber-200/90 shadow-md flex items-center gap-2 focus-within:border-orange-500 focus-within:ring-4 focus-within:ring-orange-500/10 transition-all">
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
                    className="px-5 sm:px-6 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs sm:text-sm shadow-sm shrink-0 transition-all"
                  >
                    Get Started
                  </button>
                </div>
              </form>

              {/* Primary CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => openPortal('startup', 'challenges')}
                  className="px-6 py-3.5 rounded-2xl bg-navy-950 hover:bg-navy-900 text-white font-bold text-xs sm:text-sm shadow-md flex items-center gap-2 transition-all hover:scale-[1.02]"
                >
                  <Compass className="w-4 h-4 text-orange-400" />
                  <span>Explore Challenges</span>
                  <ArrowRight className="w-4 h-4 text-orange-400 ml-1" />
                </button>

                <button
                  type="button"
                  onClick={() => setIsRegisterModalOpen(true)}
                  className="px-6 py-3.5 rounded-2xl bg-amber-100/80 hover:bg-amber-200/80 text-amber-950 border border-amber-300 font-bold text-xs sm:text-sm transition-all"
                >
                  Register as a Startup
                </button>

                <button
                  type="button"
                  onClick={() => setIsLoginModalOpen(true)}
                  className="px-5 py-3.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs sm:text-sm shadow-2xs transition-all"
                >
                  Login (Gov / Startup)
                </button>
              </div>

              {/* Trust Badges */}
              <div className="pt-4 border-t border-amber-100 flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-bold text-slate-600">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-[10px]">
                    ✓
                  </div>
                  <span>Government of Maharashtra</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-800 flex items-center justify-center text-[10px]">
                    ★
                  </div>
                  <span>DPIIT-recognized Startup Friendly</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-[10px]">
                    🛡️
                  </div>
                  <span>Secure • Transparent • Audit-ready</span>
                </div>
              </div>

            </div>

            {/* Right Column: Hero Graphic Card with Organic Shapes and Floating Stat Badges */}
            <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
              
              {/* Organic Curved Container Card (Matching the Reference Image Design) */}
              <div className="relative w-full max-w-md aspect-[4/4.8] rounded-[40px] bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 p-3 shadow-2xl overflow-hidden flex flex-col justify-between">
                
                {/* Inner Light Backdrop */}
                <div className="absolute inset-2 rounded-[34px] bg-[#FFFBF2] overflow-hidden flex flex-col p-6 justify-between">
                  
                  {/* Decorative curved shape in the corner */}
                  <div className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full bg-gradient-to-tr from-amber-300 to-orange-400 opacity-40 blur-xl" />
                  
                  {/* Top Bar inside card */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-orange-500" />
                      <span className="text-xs font-black text-navy-900 font-display">MahaProcure Cockpit</span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-200 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Live Sandbox
                    </span>
                  </div>

                  {/* Center Mockup: Pilot Cockpit Preview */}
                  <div className="my-auto space-y-3 z-10">
                    <div className="p-4 rounded-2xl bg-white border border-amber-100 shadow-md space-y-2">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-slate-500">Active Field Pilot</span>
                        <span className="font-bold text-emerald-700">Pune Zone A</span>
                      </div>
                      <h4 className="font-extrabold text-navy-900 text-sm leading-tight">
                        AI-based Water Leakage Detection
                      </h4>
                      <div className="flex items-center justify-between pt-1">
                        <div>
                          <span className="text-[10px] text-slate-400 font-bold block">NRW LOSS REDUCTION</span>
                          <strong className="text-lg font-black text-emerald-800 font-display">18.4% Achieved</strong>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-slate-400 font-bold block">ESCROW RELEASED</span>
                          <strong className="text-sm font-bold text-navy-900">INR 10.5 Lakhs</strong>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5 text-xs">
                      <div className="p-3 rounded-2xl bg-amber-50/80 border border-amber-200">
                        <span className="text-[10px] font-bold text-amber-900 block">AI SHORTLISTING</span>
                        <strong className="text-navy-900 font-bold">94/100 Score</strong>
                      </div>
                      <div className="p-3 rounded-2xl bg-blue-50/80 border border-blue-200">
                        <span className="text-[10px] font-bold text-blue-900 block">GEM GATEWAY</span>
                        <strong className="text-navy-900 font-bold">Fast-Track Ready</strong>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Strip */}
                  <div className="pt-2 border-t border-amber-100 flex items-center justify-between text-[11px] text-slate-500 z-10">
                    <span>Verified by Maharashtra Water Board</span>
                    <strong className="text-orange-600 font-bold">Audit Empanelled</strong>
                  </div>

                </div>

                {/* Floating Glassmorphic Stat Pill 1: Top Right */}
                <div className="absolute -top-3 -right-2 z-20 bg-white/95 backdrop-blur-md p-3 px-4 rounded-2xl border border-amber-200 shadow-xl flex items-center gap-3 animate-bounce-slow">
                  <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm">
                    ★
                  </div>
                  <div>
                    <strong className="text-xs font-black text-navy-950 block">100+ Vetted Startups</strong>
                    <span className="text-[10px] text-slate-500 font-semibold">Innovation Partners</span>
                  </div>
                </div>

                {/* Floating Glassmorphic Stat Pill 2: Bottom Left */}
                <div className="absolute -bottom-3 -left-3 z-20 bg-white/95 backdrop-blur-md p-3 px-4 rounded-2xl border border-amber-200 shadow-xl flex items-center gap-3 animate-bounce-slow">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
                    🏛️
                  </div>
                  <div>
                    <strong className="text-xs font-black text-navy-950 block">28 Departments</strong>
                    <span className="text-[10px] text-slate-500 font-semibold">Live Sandbox Pilots</span>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 3. WHAT IS MAHATECH PROCURE?                                              */}
      {/* ========================================================================= */}
      <section id="about" className="py-16 sm:py-24 bg-white border-y border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-200 uppercase tracking-wider">
              Problem-Led Innovation Framework
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-navy-950 font-display tracking-tight">
              What is Mahatech Procure?
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
              Mahatech Procure is the Government of Maharashtra’s platform for problem-led innovation. Departments publish outcome-based challenges, startups submit solutions, and selected teams run controlled pilots with clear KPIs, escrow-linked payments, and independent validation.
            </p>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Successful pilots move to <strong className="text-navy-900">state-wide scale</strong> via GeM and fast-track procurement, while every step—evaluation, pilot data, payments, and decisions—is recorded with a complete audit trail.
            </p>
          </div>

          {/* 5 Key Points Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-3xl bg-amber-50/50 border border-amber-200/80 space-y-3 hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-2xl bg-orange-500 text-white flex items-center justify-center font-bold">
                🎯
              </div>
              <h3 className="font-extrabold text-navy-900 text-base">Outcome-Focused Challenges</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Defined by measurable public outcomes (e.g. 20% water loss cut or 15 min faster emergency dispatch), not restrictive technology specs.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-amber-50/50 border border-amber-200/80 space-y-3 hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold">
                🤖
              </div>
              <h3 className="font-extrabold text-navy-900 text-base">AI + Expert Shortlisting</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Fair, transparent scoring across technical fit, pilot readiness, and security, followed by rigorous domain expert panels.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-amber-50/50 border border-amber-200/80 space-y-3 hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                🛡️
              </div>
              <h3 className="font-extrabold text-navy-900 text-base">Controlled Escrow Pilots</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Manage pilots with defined milestones, IoT telemetry streams, and automated PFMS state treasury tranches.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-amber-50/50 border border-amber-200/80 space-y-3 hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold">
                📊
              </div>
              <h3 className="font-extrabold text-navy-900 text-base">Independent Validation</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Empirical verification boards certify field outcomes to support evidence-based Scale, Iterate, or Close decisions.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-amber-50/50 border border-amber-200/80 space-y-3 hover:shadow-md transition-all md:col-span-2 lg:col-span-2">
              <div className="w-10 h-10 rounded-2xl bg-purple-600 text-white flex items-center justify-center font-bold">
                📜
              </div>
              <h3 className="font-extrabold text-navy-900 text-base">Full Forensic Auditability</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Every score, contract clause, milestone upload, and payment is permanently timestamped with IP and user IDs under the IT Act 2000.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. FOR GOVERNMENT DEPARTMENTS                                             */}
      {/* ========================================================================= */}
      <section id="departments" className="py-16 sm:py-24 bg-[#FFFDF9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 pb-6 border-b border-amber-200/80">
            <div className="max-w-2xl space-y-3">
              <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold border border-blue-200 uppercase tracking-wider">
                Government Solutions
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-navy-950 font-display tracking-tight">
                For Government Departments
              </h2>
              <p className="text-base text-orange-600 font-extrabold font-display">
                Publish challenges, run pilots, and scale proven solutions.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                Departments define public problems in terms of measurable outcomes—such as reduced water loss, faster ambulance response, or improved traffic flow. Mahatech Procure handles the workflow: startup discovery, eligibility checks, AI-assisted ranking, expert evaluation, pilot management, and validation.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => openPortal('gov', 'dashboard')}
                className="px-5 py-3 rounded-xl bg-navy-950 hover:bg-navy-900 text-white font-bold text-xs shadow-md flex items-center gap-2 transition-all"
              >
                <Building2 className="w-4 h-4 text-orange-400" />
                <span>Login as Government User</span>
              </button>
              <button
                type="button"
                onClick={() => setIsDemoModalOpen(true)}
                className="px-5 py-3 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300 font-bold text-xs transition-all"
              >
                Request a Demo
              </button>
            </div>
          </div>

          {/* 5 Government Capabilities */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
            
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
              <span className="w-8 h-8 rounded-xl bg-blue-100 text-[#1D64EC] font-black flex items-center justify-center text-sm">1</span>
              <h3 className="font-extrabold text-navy-900 text-sm">Publish Innovation Challenges</h3>
              <p className="text-slate-600 font-medium leading-relaxed">
                Define problem statements, eligibility criteria, evaluation weights, KPIs, and risk levels using structured, guided forms.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
              <span className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 font-black flex items-center justify-center text-sm">2</span>
              <h3 className="font-extrabold text-navy-900 text-sm">Shortlist Startups with AI + Experts</h3>
              <p className="text-slate-600 font-medium leading-relaxed">
                Use AI-assisted evaluation across relevance, technology fit, evidence strength, pilot readiness, and security—followed by domain expert review.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
              <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 font-black flex items-center justify-center text-sm">3</span>
              <h3 className="font-extrabold text-navy-900 text-sm">Run Controlled Pilots</h3>
              <p className="text-slate-600 font-medium leading-relaxed">
                Manage pilots with clear milestones, escrow-linked payments, telemetry data, and field verification.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
              <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-900 font-black flex items-center justify-center text-sm">4</span>
              <h3 className="font-extrabold text-navy-900 text-sm">Make Evidence-Based Decisions</h3>
              <p className="text-slate-600 font-medium leading-relaxed">
                Decide to <strong>Scale</strong>, <strong>Iterate</strong>, or <strong>Close</strong> based on verified KPIs, independent validation, and compliance checks.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3 md:col-span-2 lg:col-span-2">
              <span className="w-8 h-8 rounded-xl bg-navy-100 text-navy-900 font-black flex items-center justify-center text-sm">5</span>
              <h3 className="font-extrabold text-navy-900 text-sm">Maintain Full Auditability</h3>
              <p className="text-slate-600 font-medium leading-relaxed">
                Every evaluation score, milestone submission, payment, and decision is logged with timestamps, user IDs, and document trails.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. FOR STARTUPS                                                           */}
      {/* ========================================================================= */}
      <section id="startups" className="py-16 sm:py-24 bg-white border-y border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 pb-6 border-b border-amber-200/80">
            <div className="max-w-2xl space-y-3">
              <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-900 text-xs font-bold border border-orange-200 uppercase tracking-wider">
                Startup Ecosystem
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-navy-950 font-display tracking-tight">
                For Startups & Innovators
              </h2>
              <p className="text-base text-orange-600 font-extrabold font-display">
                Access government challenges, showcase your capability, and win pilot projects.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                Mahatech Procure gives startups a single window to engage with Maharashtra’s government departments. Create a verified profile, upload your evidence, respond to challenges, and track your proposals from submission to scale.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setIsRegisterModalOpen(true)}
                className="px-5 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-md flex items-center gap-2 transition-all"
              >
                <Rocket className="w-4 h-4" />
                <span>Register as a Startup</span>
              </button>
              <button
                type="button"
                onClick={() => openPortal('startup', 'dashboard')}
                className="px-5 py-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-200 font-bold text-xs transition-all"
              >
                Login as Startup
              </button>
            </div>
          </div>

          {/* 5 Startup Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
            
            <div className="p-6 rounded-3xl bg-amber-50/40 border border-amber-200/80 space-y-3">
              <div className="w-8 h-8 rounded-xl bg-orange-500 text-white font-bold flex items-center justify-center">1</div>
              <h3 className="font-extrabold text-navy-900 text-sm">Access to Real Government Problems</h3>
              <p className="text-slate-600 font-medium leading-relaxed">
                Browse challenges by sector—water, traffic, health, agriculture, urban services—and find problems that match your solution.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-amber-50/40 border border-amber-200/80 space-y-3">
              <div className="w-8 h-8 rounded-xl bg-amber-500 text-white font-bold flex items-center justify-center">2</div>
              <h3 className="font-extrabold text-navy-900 text-sm">Verified Company Evidence Archive</h3>
              <p className="text-slate-600 font-medium leading-relaxed">
                Upload legal documents, DPIIT certificates, technical docs, case studies, compliance and security proofs in a structured, government-ready format.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-amber-50/40 border border-amber-200/80 space-y-3">
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center">3</div>
              <h3 className="font-extrabold text-navy-900 text-sm">Transparent Proposal Tracking</h3>
              <p className="text-slate-600 font-medium leading-relaxed">
                See exactly where your proposal is: under review, shortlisted, in expert evaluation, contract approval, pilot, or scale decision.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-amber-50/40 border border-amber-200/80 space-y-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-bold flex items-center justify-center">4</div>
              <h3 className="font-extrabold text-navy-900 text-sm">Managed Pilots with Clear Payments</h3>
              <p className="text-slate-600 font-medium leading-relaxed">
                Run pilots with defined milestones, escrow tranches, and PFMS-linked payments. Submit evidence, track approvals, and monitor disbursements.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-amber-50/40 border border-amber-200/80 space-y-3 md:col-span-2 lg:col-span-2">
              <div className="w-8 h-8 rounded-xl bg-purple-600 text-white font-bold flex items-center justify-center">5</div>
              <h3 className="font-extrabold text-navy-900 text-sm">Pathway to Scale</h3>
              <p className="text-slate-600 font-medium leading-relaxed">
                Successful pilots can move to state-wide deployment via GeM and fast-track mechanisms, with all performance evidence attached.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. HOW IT WORKS (12 Clear Stages Lifecycle Roadmap)                       */}
      {/* ========================================================================= */}
      <section id="how-it-works" className="py-16 sm:py-24 bg-[#FFFDF9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold border border-emerald-200 uppercase tracking-wider">
              Procurement & Sandbox Progression
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-navy-950 font-display tracking-tight">
              How It Works
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-medium">
              From problem statement to state-wide scale in 12 clear, verifiable stages.
            </p>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs font-bold">
              <button
                type="button"
                onClick={() => setHowItWorksTab('all')}
                className={`px-4 py-2 rounded-xl transition-all ${howItWorksTab === 'all' ? 'bg-navy-950 text-white shadow-sm' : 'bg-white text-slate-600 border border-slate-200'}`}
              >
                All 12 Stages
              </button>
              <button
                type="button"
                onClick={() => setHowItWorksTab('phase1')}
                className={`px-4 py-2 rounded-xl transition-all ${howItWorksTab === 'phase1' ? 'bg-orange-600 text-white shadow-sm' : 'bg-white text-slate-600 border border-slate-200'}`}
              >
                Phase 1: Pre-Pilot (1–6)
              </button>
              <button
                type="button"
                onClick={() => setHowItWorksTab('phase2')}
                className={`px-4 py-2 rounded-xl transition-all ${howItWorksTab === 'phase2' ? 'bg-amber-600 text-white shadow-sm' : 'bg-white text-slate-600 border border-slate-200'}`}
              >
                Phase 2: Pilot (7–10)
              </button>
              <button
                type="button"
                onClick={() => setHowItWorksTab('phase3')}
                className={`px-4 py-2 rounded-xl transition-all ${howItWorksTab === 'phase3' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-white text-slate-600 border border-slate-200'}`}
              >
                Phase 3: Scale (11–12)
              </button>
            </div>
          </div>

          {/* 12-Stage Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 text-xs">
            {filteredStages.map((stg) => (
              <div 
                key={stg.num}
                className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-all space-y-2 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="w-8 h-8 rounded-xl bg-orange-100 text-orange-900 font-black text-xs flex items-center justify-center">
                      {stg.num}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      stg.phase === 'phase1' ? 'bg-blue-50 text-[#1D64EC]' :
                      stg.phase === 'phase2' ? 'bg-amber-50 text-amber-900' : 'bg-emerald-50 text-emerald-800'
                    }`}>
                      {stg.phase === 'phase1' ? 'Pre-Pilot' : stg.phase === 'phase2' ? 'Active Pilot' : 'Validation & Scale'}
                    </span>
                  </div>
                  <h4 className="font-extrabold text-navy-900 text-sm leading-snug">{stg.title}</h4>
                  <p className="text-slate-600 font-medium leading-relaxed">{stg.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 text-center">
            <button
              type="button"
              onClick={() => openPortal('startup', 'applications')}
              className="px-6 py-3 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold text-xs border border-amber-300 inline-flex items-center gap-2 transition-all"
            >
              <span>See Detailed Process in Proposal Tracker</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. KEY FEATURES (8 Grid Cards)                                           */}
      {/* ========================================================================= */}
      <section id="features" className="py-16 sm:py-24 bg-white border-y border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-900 text-xs font-bold border border-purple-200 uppercase tracking-wider">
              Platform Modules
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-navy-950 font-display tracking-tight">
              Key Platform Features
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-medium">
              Purpose-built tools for government problem-solving, compliance, and startup scale-up.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-xs">
            {[
              { title: 'Outcome-Based Challenges', icon: '🎯', desc: 'Define problems in terms of public impact—reduced waiting time, lower water loss, better health outcomes.' },
              { title: 'AI-Assisted Evaluation', icon: '🤖', desc: 'Score startups on relevance, technology fit, evidence strength, pilot readiness, security, scalability, and risk.' },
              { title: 'Expert Review Workflow', icon: '👥', desc: 'Domain experts evaluate shortlisted startups, add structured notes, and approve pilots with full traceability.' },
              { title: 'Pilot Management Console', icon: '🚀', desc: 'Track milestones, upload evidence, monitor telemetry, and manage escrow-linked payments in one workspace.' },
              { title: 'Digital Contract Signer', icon: '✍️', desc: 'Review, eSign, and store government contracts with complete audit trails and versioning.' },
              { title: 'Company Evidence Archive', icon: '📁', desc: 'Structured repository for legal docs, certifications, case studies, security audits, and financials.' },
              { title: 'Transparent Audit Trail', icon: '📜', desc: 'Every action—proposal submission, score, milestone approval, payment, and decision—is logged with user, time, and IP.' },
              { title: 'Scale-Ready Pipeline', icon: '⚡', desc: 'Move successful pilots to state-wide deployment via GeM and fast-track mechanisms, backed by verified data.' },
            ].map((feat, idx) => (
              <div key={idx} className="p-6 rounded-3xl bg-amber-50/30 border border-amber-200/80 space-y-2.5 hover:bg-white hover:shadow-md transition-all">
                <div className="text-2xl">{feat.icon}</div>
                <h3 className="font-extrabold text-navy-900 text-sm">{feat.title}</h3>
                <p className="text-slate-600 font-medium leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. IMPACT & USE CASES (5 Sector Cards)                                    */}
      {/* ========================================================================= */}
      <section id="impact" className="py-16 sm:py-24 bg-[#FFFDF9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold border border-blue-200 uppercase tracking-wider">
              Quantified Public Impact
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-navy-950 font-display tracking-tight">
              Impact & Use Cases
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-medium">
              Mahatech Procure is designed for high-impact public problems across sectors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
            
            {/* Use Case 1 */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl">💧</span>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 font-bold text-[10px]">Water Resources</span>
              </div>
              <h3 className="font-extrabold text-navy-900 text-base">Urban Water & Leakage Reduction</h3>
              <div className="space-y-1.5 text-slate-600 font-medium">
                <p><strong>Problem:</strong> High non-revenue water (NRW) due to leaks and pressure issues.</p>
                <p><strong>Solution:</strong> AI + IoT-based acoustic leak detection and pressure optimization.</p>
              </div>
              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-bold">
                Outcome: 18–25% reduction in NRW across pilot zones.
              </div>
            </div>

            {/* Use Case 2 */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl">🚦</span>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold text-[10px]">Urban Mobility</span>
              </div>
              <h3 className="font-extrabold text-navy-900 text-base">Traffic & Mobility Optimization</h3>
              <div className="space-y-1.5 text-slate-600 font-medium">
                <p><strong>Problem:</strong> Congestion and long waiting times at key intersections.</p>
                <p><strong>Solution:</strong> AI-based adaptive signal mesh and real-time traffic management.</p>
              </div>
              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-bold">
                Outcome: 15–30% reduction in average waiting time.
              </div>
            </div>

            {/* Use Case 3 */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl">🌾</span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-bold text-[10px]">Agriculture</span>
              </div>
              <h3 className="font-extrabold text-navy-900 text-base">Agriculture & Crop Health</h3>
              <div className="space-y-1.5 text-slate-600 font-medium">
                <p><strong>Problem:</strong> Crop loss due to pests, disease, and delayed interventions.</p>
                <p><strong>Solution:</strong> Drone-based multispectral monitoring and AI-driven advisories.</p>
              </div>
              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-bold">
                Outcome: Early detection, reduced input costs, improved yield.
              </div>
            </div>

            {/* Use Case 4 */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl">🏥</span>
                <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-red-900 font-bold text-[10px]">Public Health</span>
              </div>
              <h3 className="font-extrabold text-navy-900 text-base">Emergency Health Response</h3>
              <div className="space-y-1.5 text-slate-600 font-medium">
                <p><strong>Problem:</strong> Delayed emergency response and ambulance turnaround.</p>
                <p><strong>Solution:</strong> AI dispatch, route optimization, and hospital ER integration.</p>
              </div>
              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-bold">
                Outcome: Faster response times, better survival rates.
              </div>
            </div>

            {/* Use Case 5 */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3 md:col-span-2 lg:col-span-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl">♻️</span>
                <span className="px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-900 font-bold text-[10px]">Urban Sanitation</span>
              </div>
              <h3 className="font-extrabold text-navy-900 text-base">Urban Services & Waste Management</h3>
              <div className="space-y-1.5 text-slate-600 font-medium">
                <p><strong>Problem:</strong> Inefficient municipal waste collection and segregation.</p>
                <p><strong>Solution:</strong> Smart optical bins, dynamic route optimization, and robotics segregation.</p>
              </div>
              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-bold">
                Outcome: Lower operational costs, higher segregation rates.
              </div>
            </div>

          </div>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => openPortal('startup', 'challenges')}
              className="px-6 py-3.5 rounded-2xl bg-[#1D64EC] hover:bg-blue-700 text-white font-bold text-xs shadow-md inline-flex items-center gap-2 transition-all"
            >
              <Compass className="w-4 h-4" />
              <span>Explore Live Challenges</span>
            </button>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. SECURITY, COMPLIANCE & TRUST                                           */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 bg-white border-y border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold border border-emerald-200 uppercase tracking-wider">
              Sovereign Government Standards
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-navy-950 font-display tracking-tight">
              Security, Compliance & Trust
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-medium">
              Mahatech Procure is built to meet government-grade security and compliance requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
            
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-2">
              <ShieldCheck className="w-6 h-6 text-emerald-600" />
              <h3 className="font-extrabold text-navy-900 text-sm">Data Residency</h3>
              <p className="text-slate-600 font-medium leading-relaxed">
                All data hosted 100% in India, on MeitY-empanelled cloud infrastructure (Mumbai & Pune availability zones).
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-2">
              <Lock className="w-6 h-6 text-[#1D64EC]" />
              <h3 className="font-extrabold text-navy-900 text-sm">State Cyber Standards</h3>
              <p className="text-slate-600 font-medium leading-relaxed">
                Alignment with Maharashtra State Cyber Policy v2.0; AES-256 encryption, access control, and audit logging by design.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-2">
              <Users className="w-6 h-6 text-purple-600" />
              <h3 className="font-extrabold text-navy-900 text-sm">Role-Based Access</h3>
              <p className="text-slate-600 font-medium leading-relaxed">
                Separate, role-specific cockpits for government department officers and startup founders with granular permissions.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-2">
              <Activity className="w-6 h-6 text-amber-600" />
              <h3 className="font-extrabold text-navy-900 text-sm">Audit-Ready Design</h3>
              <p className="text-slate-600 font-medium leading-relaxed">
                Complete logs of views, edits, scorecards, approvals, payments, and scale decisions under IT Act 2000.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-2 md:col-span-2 lg:col-span-2">
              <Award className="w-6 h-6 text-orange-600" />
              <h3 className="font-extrabold text-navy-900 text-sm">Startup-Friendly by Design</h3>
              <p className="text-slate-600 font-medium leading-relaxed">
                Eligibility and evaluation specifically architected to include early-stage, DPIIT-recognized startups with relaxed turnover thresholds.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. FREQUENTLY ASKED QUESTIONS (FAQs)                                     */}
      {/* ========================================================================= */}
      <section id="faqs" className="py-16 sm:py-24 bg-[#FFFDF9]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center space-y-3">
            <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-200 uppercase tracking-wider">
              Answers & Help
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-navy-950 font-display tracking-tight">
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
                className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-2xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 sm:p-5 text-left font-bold text-navy-900 text-sm sm:text-base flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                >
                  <span>{faq.q}</span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-5 h-5 text-orange-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                </button>

                {openFaq === idx && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 text-slate-600 text-xs sm:text-sm font-medium leading-relaxed border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 11. FINAL HEROIC CTA BANNER                                               */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-navy-950 via-navy-900 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-orange-500/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-blue-500/20 blur-3xl" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
          
          <div className="space-y-3">
            <span className="px-3.5 py-1 rounded-full bg-orange-500/20 text-orange-300 text-xs font-bold border border-orange-500/30 uppercase tracking-wider">
              Get Started Today
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-white">
              Ready to Transform Public Problem-Solving?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed">
              Join Maharashtra’s digital marketplace for innovation challenges and startup solutions.
            </p>
          </div>

          {/* Dual Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm font-bold">
            <button
              type="button"
              onClick={() => openPortal('gov', 'dashboard')}
              className="px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-navy-950 shadow-lg flex items-center gap-2 transition-all hover:scale-[1.02]"
            >
              <Building2 className="w-4 h-4 text-[#1D64EC]" />
              <span>Login as Government</span>
            </button>

            <button
              type="button"
              onClick={() => setIsRegisterModalOpen(true)}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg flex items-center gap-2 transition-all hover:scale-[1.02]"
            >
              <Rocket className="w-4 h-4" />
              <span>Register as a Startup</span>
            </button>
          </div>

          {/* Contact Details */}
          <div className="pt-6 border-t border-slate-800 text-xs text-slate-400 space-y-1">
            <p>For queries, email: <strong className="text-white">support@mahatech.gov.in</strong></p>
            <p>Helpline: <strong className="text-white">+91-22-2202-9988</strong> (Mon–Fri, 10 AM–6 PM IST)</p>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 12. FOOTER CONTENT (5 Columns + Copyright)                                */}
      {/* ========================================================================= */}
      <footer className="bg-slate-950 text-slate-400 text-xs py-14 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            
            {/* Col 1: About */}
            <div className="space-y-3">
              <h4 className="font-bold text-white text-xs uppercase tracking-wider font-display">About</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#about" className="hover:text-white transition-colors">About Mahatech Procure</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">Process & Workflow</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">Security & Compliance</a></li>
              </ul>
            </div>

            {/* Col 2: For Departments */}
            <div className="space-y-3">
              <h4 className="font-bold text-white text-xs uppercase tracking-wider font-display">For Departments</h4>
              <ul className="space-y-2 text-slate-400">
                <li><button onClick={() => openPortal('gov', 'challenges')} className="hover:text-white transition-colors text-left">Publish a Challenge</button></li>
                <li><button onClick={() => openPortal('gov', 'monitor')} className="hover:text-white transition-colors text-left">Pilot Management</button></li>
                <li><button onClick={() => openPortal('gov', 'gem')} className="hover:text-white transition-colors text-left">Scale & GeM</button></li>
              </ul>
            </div>

            {/* Col 3: For Startups */}
            <div className="space-y-3">
              <h4 className="font-bold text-white text-xs uppercase tracking-wider font-display">For Startups</h4>
              <ul className="space-y-2 text-slate-400">
                <li><button onClick={() => setIsRegisterModalOpen(true)} className="hover:text-white transition-colors text-left">Register as a Startup</button></li>
                <li><button onClick={() => openPortal('startup', 'challenges')} className="hover:text-white transition-colors text-left">Browse Challenges</button></li>
                <li><button onClick={() => openPortal('startup', 'applications')} className="hover:text-white transition-colors text-left">Proposal & Pilot Tracker</button></li>
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
            <p>© Government of Maharashtra. All rights reserved.</p>
          </div>

        </div>
      </footer>

      {/* ========================================================================= */}
      {/* MODAL 1: ACCESS PORTALS / ROLE SELECTOR                                   */}
      {/* ========================================================================= */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 border border-slate-200 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-black text-navy-900 font-display">
                  Select Your Portal
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">Government of Maharashtra Sandbox Gateway</p>
              </div>
              <button
                onClick={() => setIsLoginModalOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              {/* Government Portal Choice */}
              <div 
                onClick={() => {
                  setIsLoginModalOpen(false);
                  openPortal('gov', 'dashboard');
                }}
                className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 hover:bg-blue-100/70 cursor-pointer transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#1D64EC] text-white flex items-center justify-center text-lg">
                    🏛️
                  </div>
                  <div>
                    <strong className="text-navy-900 text-sm font-bold block">Government Department Portal</strong>
                    <span className="text-[11px] text-slate-500">Publish challenges, score proposals & manage pilots</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#1D64EC] group-hover:translate-x-1 transition-transform" />
              </div>

              {/* Startup Portal Choice */}
              <div 
                onClick={() => {
                  setIsLoginModalOpen(false);
                  openPortal('startup', 'dashboard');
                }}
                className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 hover:bg-amber-100/70 cursor-pointer transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center text-lg">
                    🚀
                  </div>
                  <div>
                    <strong className="text-navy-900 text-sm font-bold block">Startup & Founder Portal</strong>
                    <span className="text-[11px] text-slate-500">Submit solutions, evidence archive & eSign contracts</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-orange-600 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center text-[11px] text-slate-500">
              Single-Sign-On enabled with Aadhaar eSign & National Single Window System.
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: STARTUP QUICK REGISTRATION MODAL                                 */}
      {/* ========================================================================= */}
      {isRegisterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 border border-slate-200 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-black text-navy-900 font-display">
                  Register as an Innovator
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">DPIIT-recognized Startup Onboarding</p>
              </div>
              <button
                onClick={() => setIsRegisterModalOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleRegisterSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-navy-900 mb-1">Founder / CEO Full Name *</label>
                <input
                  type="text"
                  required
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="e.g. Ms. Anjali Patil"
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-navy-900 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-navy-900 mb-1">Company / Startup Name *</label>
                <input
                  type="text"
                  required
                  value={regCompany}
                  onChange={(e) => setRegCompany(e.target.value)}
                  placeholder="e.g. AquaSense Technologies Pvt. Ltd."
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-navy-900 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-navy-900 mb-1">DPIIT Recognition Number</label>
                <input
                  type="text"
                  value={regDpiit}
                  onChange={(e) => setRegDpiit(e.target.value)}
                  placeholder="e.g. DIPP12345 (Optional if in process)"
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-navy-900 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-navy-900 mb-1">Official Email Address *</label>
                <input
                  type="email"
                  required
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="anjali@aquasense.ai"
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-navy-900 font-medium"
                />
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsRegisterModalOpen(false)}
                  className="px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-orange-600 hover:bg-orange-700 text-white font-bold shadow-sm"
                >
                  Create Verified Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: REQUEST A DEMO (GOVERNMENT DEPARTMENTS)                         */}
      {/* ========================================================================= */}
      {isDemoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 border border-slate-200 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-black text-navy-900 font-display">
                  Request Department Sandbox Demo
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
                <label className="block font-bold text-navy-900 mb-1">Department / Municipal Body *</label>
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
                <label className="block font-bold text-navy-900 mb-1">Nodal Officer Name *</label>
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
                <label className="block font-bold text-navy-900 mb-1">Government Official Email (.gov.in / .nic.in) *</label>
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
                  className="px-6 py-2 rounded-full bg-[#1D64EC] hover:bg-blue-700 text-white font-bold shadow-sm"
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
