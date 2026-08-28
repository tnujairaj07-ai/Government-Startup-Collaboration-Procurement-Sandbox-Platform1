import React, { useState, useEffect } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { 
  Building2, Rocket, Lock, Mail, Eye, EyeOff, ShieldCheck, 
  ArrowRight, ArrowLeft, RefreshCw, CheckCircle2, AlertCircle, 
  HelpCircle, ExternalLink, Key, Award, FileText, Phone, Check, 
  Info, Sparkles, UserCheck, ShieldAlert 
} from 'lucide-react';
import { PortalRole } from '../../types';

export const LoginPage: React.FC = () => {
  const { 
    currentRole, openPortal, 
    setIsLandingPage, setIsLoginPage, addNotification 
  } = usePlatform();

  // Login Mode: 'gov' | 'startup'
  const [loginType, setLoginType] = useState<PortalRole>(currentRole || 'gov');

  // Form Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Modals
  const [isAccessModalOpen, setIsAccessModalOpen] = useState(false);
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');

  useEffect(() => {
    setEmail('');
    setPassword('');
  }, [loginType]);

  // Direct login on button click (no validation or captcha code needed for frontend)
  const handleDirectLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    addNotification({
      title: `Welcome to Mahatech Procure`,
      message: `Successfully signed in to the ${loginType === 'gov' ? 'Government Department Portal' : 'Startup Cockpit'}.`,
      portal: loginType,
      type: 'success'
    });

    openPortal(loginType, 'dashboard');
  };

  const handleForgotPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsForgotPasswordModalOpen(false);
    addNotification({
      title: 'Password Reset Link Sent',
      message: `A password reset link has been dispatched to ${forgotEmail || 'your registered email'}.`,
      portal: loginType,
      type: 'info'
    });
  };

  return (
    <div className="min-h-screen bg-[#F4F7FC] text-[#0F172A] flex flex-col justify-between selection:bg-[#1D64EC] selection:text-white font-sans antialiased relative overflow-hidden">
      
      {/* Decorative Ambient Mesh Glows */}
      <div className="absolute -top-32 -left-32 w-[550px] h-[550px] bg-gradient-to-br from-blue-100/70 via-sky-100/40 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-32 w-[550px] h-[550px] bg-gradient-to-bl from-sky-100/60 via-blue-100/30 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* ========================================================================= */}
      {/* HEADER / NAVIGATION BAR                                                  */}
      {/* ========================================================================= */}
      <header className="px-4 sm:px-8 py-5 flex items-center justify-between z-10 max-w-7xl mx-auto w-full">
        {/* Brand Link */}
        <div 
          onClick={() => {
            setIsLoginPage(false);
            setIsLandingPage(true);
          }}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#1D64EC] via-[#2563EB] to-[#0D4CD3] text-white font-black text-lg flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            🏛️
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black text-[#0F172A] font-display tracking-tight leading-none">
                Mahatech <span className="text-[#1D64EC]">Procure</span>
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#E8F2FE] text-[#1D64EC] text-[9px] font-extrabold uppercase tracking-wider border border-blue-200">
                Gov Gateway
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-semibold tracking-wide mt-0.5">
              Government of Maharashtra
            </p>
          </div>
        </div>

        {/* Back to Home Button */}
        <button
          type="button"
          onClick={() => {
            setIsLoginPage(false);
            setIsLandingPage(true);
          }}
          className="px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 hover:text-[#0F172A] border border-slate-200 text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Landing Page</span>
        </button>
      </header>

      {/* ========================================================================= */}
      {/* MAIN 3-PANEL CONTAINER (Desktop: 3-Col | Mobile: Stacked)                 */}
      {/* ========================================================================= */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 z-10">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-start">
          
          {/* --------------------------------------------------------------------- */}
          {/* PART 1: BRAND & VALUE PROPOSITION (Left Panel)                         */}
          {/* --------------------------------------------------------------------- */}
          <div className="lg:col-span-4 space-y-6 lg:pr-4">
            
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F2FE] text-[#1D64EC] border border-blue-200 text-[11px] font-bold">
                <span className="w-2 h-2 rounded-full bg-[#1D64EC] animate-pulse" />
                <span>Single Sovereign Sandbox Gateway</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] font-display tracking-tight leading-snug">
                A digital marketplace for government innovation challenges and startup solutions.
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                Mahatech Procure connects Maharashtra’s government departments with vetted startups to solve real public problems—through open challenges, controlled pilots, and evidence-based scale-up.
              </p>
            </div>

            {/* Trust Indicators in Original UI Palette */}
            <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-3.5">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                Trust & Sovereign Compliance
              </span>

              <div className="space-y-2.5 text-xs font-bold text-slate-700">
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-[#1D64EC] flex items-center justify-center text-[10px] font-black shrink-0">
                    ★
                  </div>
                  <span>Government of Maharashtra Certified</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-[10px] font-black shrink-0">
                    ✓
                  </div>
                  <span>DPIIT-recognized Startup Friendly</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center text-[10px] shrink-0">
                    🛡️
                  </div>
                  <span>Secure • Transparent • Audit-ready</span>
                </div>
              </div>
            </div>

            {/* Learn How it works link */}
            <div className="pt-1">
              <button
                type="button"
                onClick={() => {
                  setIsLoginPage(false);
                  setIsLandingPage(true);
                  setTimeout(() => {
                    const el = document.getElementById('how-it-works');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="text-xs font-bold text-[#1D64EC] hover:text-[#0D4CD3] flex items-center gap-1.5 group transition-colors"
              >
                <span>New to Mahatech Procure? Learn how it works</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>

          {/* --------------------------------------------------------------------- */}
          {/* PART 2: LOGIN FORM (Center / Main Card - Instant 1-Click Access)       */}
          {/* --------------------------------------------------------------------- */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-[36px] border border-slate-200/90 shadow-xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
              
              {/* Header inside Card */}
              <div className="text-center space-y-1 pb-1">
                <h2 className="text-2xl font-black text-[#0F172A] font-display tracking-tight">
                  Sign in to Mahatech Procure
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  Choose your login type and click to enter directly.
                </p>
              </div>

              {/* Segmented Tab Switcher (Gov vs Startup) */}
              <div className="p-1 rounded-2xl bg-slate-100 flex items-center gap-1 border border-slate-200">
                <button
                  type="button"
                  onClick={() => setLoginType('gov')}
                  className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    loginType === 'gov'
                      ? 'bg-[#1D64EC] text-white shadow-md shadow-blue-500/20'
                      : 'text-slate-600 hover:text-[#1D64EC]'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Government Dept</span>
                </button>

                <button
                  type="button"
                  onClick={() => setLoginType('startup')}
                  className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    loginType === 'startup'
                      ? 'bg-[#0D4CD3] text-white shadow-md shadow-blue-600/20'
                      : 'text-slate-600 hover:text-[#1D64EC]'
                  }`}
                >
                  <Rocket className="w-3.5 h-3.5" />
                  <span>Startup / Company</span>
                </button>
              </div>

              {/* Login Form */}
              <form onSubmit={handleDirectLogin} className="space-y-4">
                
                {/* Email Field */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">
                    {loginType === 'gov' ? 'Official Email ID' : 'Registered Email ID'}
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={loginType === 'gov' ? 'name@maharashtra.gov.in' : 'founder@yourstartup.com'}
                      className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:border-[#1D64EC] focus:bg-white text-xs font-semibold text-navy-950 outline-none transition-all"
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium block">
                    {loginType === 'gov' ? 'Use your government-issued email address.' : 'Use the email registered with your startup profile.'}
                  </span>
                </div>

                {/* Password Field */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-slate-800">Password</label>
                    <button
                      type="button"
                      onClick={() => {
                        setForgotEmail(email);
                        setIsForgotPasswordModalOpen(true);
                      }}
                      className="text-[11px] font-bold text-[#1D64EC] hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full pl-10 pr-11 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:border-[#1D64EC] focus:bg-white text-xs font-semibold text-navy-950 outline-none transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-700"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me Checkbox */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded text-[#1D64EC] focus:ring-0 cursor-pointer"
                  />
                  <label htmlFor="rememberMe" className="text-xs font-semibold text-slate-600 cursor-pointer">
                    Remember me on this browser
                  </label>
                </div>

                {/* Primary Submit Button (Direct Entry on Click) */}
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-[#1D64EC] hover:bg-[#0D4CD3] text-white font-bold text-xs sm:text-sm shadow-action hover:shadow-action-hover flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
                >
                  <Lock className="w-4 h-4" />
                  <span>{loginType === 'gov' ? 'Sign In as Government User' : 'Sign In as Startup'}</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>

              </form>

              {/* Secondary SSO Options (Direct Click Access) */}
              <div className="space-y-2 pt-1 border-t border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block text-center">
                  Or sign in directly with SSO
                </span>

                {loginType === 'gov' ? (
                  <button
                    type="button"
                    onClick={() => handleDirectLogin()}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 flex items-center justify-center gap-2 transition-colors"
                  >
                    <span>🏛️ Jan Parichay (National Single Sign-On / DSC)</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleDirectLogin()}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 flex items-center justify-center gap-2 transition-colors"
                  >
                    <span>🚀 Continue with DPIIT-linked Startup India SSO</span>
                  </button>
                )}
              </div>

              {/* Helper disclaimer */}
              <p className="text-[10px] text-slate-400 text-center leading-relaxed">
                {loginType === 'gov'
                  ? 'Access is restricted to authorized government officials. If you do not have credentials, contact your department nodal officer or raise an access request.'
                  : 'By signing in, you confirm that you are an authorized representative of the startup. All information provided is subject to verification and audit.'
                }
              </p>

            </div>
          </div>

          {/* --------------------------------------------------------------------- */}
          {/* PART 3: HELP, SUPPORT & ONBOARDING (Right Panel)                       */}
          {/* --------------------------------------------------------------------- */}
          <div className="lg:col-span-3 space-y-6">
            
            <div className="space-y-2">
              <h3 className="text-lg font-black text-[#0F172A] font-display tracking-tight">
                Need help with access?
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Choose the option that best describes you.
              </p>
            </div>

            {/* Help Card for Government Users */}
            <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center gap-2 text-[#1D64EC] font-bold text-xs">
                <Building2 className="w-4 h-4 text-[#1D64EC]" />
                <span>For Government Users</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                If you are a government official and do not have login credentials:
                contact your department nodal officer or raise an access request.
              </p>
              <button
                type="button"
                onClick={() => setIsAccessModalOpen(true)}
                className="w-full py-2 px-3 rounded-xl bg-[#E8F2FE] hover:bg-[#DDEBFC] text-[#1D64EC] border border-blue-200 text-xs font-bold transition-all text-center"
              >
                Request Government Access
              </button>
            </div>

            {/* Help Card for Startups */}
            <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center gap-2 text-[#1D64EC] font-bold text-xs">
                <Rocket className="w-4 h-4 text-[#1D64EC]" />
                <span>For Startups</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                Create your verified startup profile, upload your evidence archive, and start exploring active challenges.
              </p>
              <button
                type="button"
                onClick={() => {
                  setLoginType('startup');
                  handleDirectLogin();
                }}
                className="w-full py-2 px-3 rounded-xl bg-[#E8F2FE] hover:bg-[#DDEBFC] text-[#1D64EC] border border-blue-200 text-xs font-bold transition-all text-center"
              >
                Register as a Startup
              </button>
            </div>

            {/* Contact & Support Section */}
            <div className="p-5 rounded-3xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
              <strong className="text-[#0F172A] font-bold block text-xs">Technical Support Cell</strong>
              <div className="space-y-1.5 text-slate-600 font-medium text-[11px]">
                <p className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>support@mahatech.gov.in</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>+91-22-2202-9988 (10 AM–6 PM)</span>
                </p>
              </div>

              <div className="pt-2 border-t border-slate-200 space-y-1 text-[11px] font-bold text-slate-500">
                <p className="hover:text-[#1D64EC] cursor-pointer">User Guides & FAQs →</p>
                <p className="hover:text-[#1D64EC] cursor-pointer">Privacy Policy →</p>
                <p className="hover:text-[#1D64EC] cursor-pointer">Terms of Use →</p>
              </div>
            </div>

          </div>

        </div>
      </main>

      {/* ========================================================================= */}
      {/* FOOTER                                                                    */}
      {/* ========================================================================= */}
      <footer className="py-4 px-6 text-xs text-slate-500 border-t border-slate-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-2 max-w-7xl mx-auto w-full">
        <p className="font-semibold text-[#0F172A]">Mahatech Procure — Problem Statement 26136</p>
        <p className="text-[11px] text-slate-400">
          Government of Maharashtra • From Challenge to Scale
        </p>
      </footer>

      {/* ========================================================================= */}
      {/* MODAL 1: REQUEST GOVERNMENT ACCESS MODAL                                  */}
      {/* ========================================================================= */}
      {isAccessModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 border border-slate-200 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-black text-[#0F172A] font-display">
                  Request Government Onboarding Access
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">For Maharashtra Government Officers</p>
              </div>
              <button
                onClick={() => setIsAccessModalOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-[#0F172A] mb-1">Department / Urban Body *</label>
                <input
                  type="text"
                  placeholder="e.g. Urban Development Dept / PMC"
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-navy-900 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-[#0F172A] mb-1">Officer Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Shri Rajesh Deshmukh"
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-navy-900 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-[#0F172A] mb-1">Official Govt Email (.gov.in) *</label>
                <input
                  type="email"
                  placeholder="name@maharashtra.gov.in"
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-navy-900 font-medium"
                />
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAccessModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsAccessModalOpen(false);
                    addNotification({
                      title: 'Access Request Submitted',
                      message: 'Your onboarding credentials request has been forwarded to the Mahatech State Nodal Cell.',
                      portal: 'gov',
                      type: 'success'
                    });
                  }}
                  className="px-5 py-2 rounded-xl bg-[#1D64EC] hover:bg-[#0D4CD3] text-white font-bold shadow-action"
                >
                  Submit Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: FORGOT PASSWORD MODAL                                            */}
      {/* ========================================================================= */}
      {isForgotPasswordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 border border-slate-200 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-black text-[#0F172A] font-display">
                  Reset Account Password
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">Receive a secure reset link</p>
              </div>
              <button
                onClick={() => setIsForgotPasswordModalOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleForgotPasswordSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-[#0F172A] mb-1">Registered Email ID *</label>
                <input
                  type="email"
                  required
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="Enter your registered email ID"
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-navy-900 font-medium"
                />
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsForgotPasswordModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#1D64EC] hover:bg-[#0D4CD3] text-white font-bold shadow-action"
                >
                  Send Reset Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
