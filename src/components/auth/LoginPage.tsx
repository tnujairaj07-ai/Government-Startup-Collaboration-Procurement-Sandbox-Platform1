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
    currentRole, setCurrentRole, openPortal, 
    setIsLandingPage, setIsLoginPage, addNotification 
  } = usePlatform();

  // Login Mode: 'gov' | 'startup'
  const [loginType, setLoginType] = useState<PortalRole>(currentRole || 'gov');

  // Form Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaCode, setCaptchaCode] = useState('7K9X2');

  // Status & Feedback
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Modals
  const [isAccessModalOpen, setIsAccessModalOpen] = useState(false);
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');

  // Generate random 5-character Captcha
  const refreshCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let result = '';
    for (let i = 0; i < 5; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(result);
    setCaptchaInput('');
  };

  useEffect(() => {
    refreshCaptcha();
    // Auto-fill default demo credentials when switching tabs
    if (loginType === 'gov') {
      setEmail('rajesh.deshmukh@maharashtra.gov.in');
      setPassword('GovMaha@2026');
    } else {
      setEmail('anjali.patil@aquasense.ai');
      setPassword('Startup@2026');
    }
    setErrorMessage(null);
    setSuccessMessage(null);
  }, [loginType]);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    // Basic Captcha check (case-insensitive)
    if (captchaInput.trim().toUpperCase() !== captchaCode.toUpperCase()) {
      setErrorMessage('Invalid captcha code. Please enter the characters shown in the box.');
      refreshCaptcha();
      return;
    }

    if (!email || !password) {
      setErrorMessage('Please enter your official email ID and password.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage('Authentication verified. Redirecting to your dashboard...');
      
      addNotification({
        title: `Welcome ${loginType === 'gov' ? 'Shri Rajesh Deshmukh' : 'Ms. Anjali Patil'}`,
        message: `Successfully authenticated into the ${loginType === 'gov' ? 'Government Department Portal' : 'Startup Cockpit'}.`,
        portal: loginType,
        type: 'success'
      });

      setTimeout(() => {
        openPortal(loginType, 'dashboard');
      }, 700);
    }, 900);
  };

  const handleQuickDemoFill = (role: PortalRole) => {
    setLoginType(role);
    if (role === 'gov') {
      setEmail('rajesh.deshmukh@maharashtra.gov.in');
      setPassword('GovMaha@2026');
    } else {
      setEmail('anjali.patil@aquasense.ai');
      setPassword('Startup@2026');
    }
    setCaptchaInput(captchaCode);
    setErrorMessage(null);
  };

  const handleForgotPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsForgotPasswordModalOpen(false);
    addNotification({
      title: 'Password Reset Link Sent',
      message: `A secure verification link has been dispatched to ${forgotEmail || 'your registered email'}.`,
      portal: loginType,
      type: 'info'
    });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0A2540] flex flex-col justify-between selection:bg-[#FF671F] selection:text-white font-sans antialiased relative overflow-hidden">
      
      {/* Top Tricolor Brand Band */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#FF671F] via-[#FFFFFF] to-[#046A38] shadow-xs" />

      {/* Decorative Warm Ambient Background Circles (Inspired by Reference Design) */}
      <div className="absolute -top-32 -left-32 w-[550px] h-[550px] bg-gradient-to-br from-orange-100/60 via-amber-100/30 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-32 w-[550px] h-[550px] bg-gradient-to-bl from-blue-100/50 via-emerald-100/30 to-transparent rounded-full blur-3xl pointer-events-none" />

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
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#FF671F] via-[#FF8A3D] to-[#FF671F] text-white font-black text-lg flex items-center justify-center shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
            🏛️
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black text-[#0B1E48] font-display tracking-tight leading-none">
                Mahatech <span className="text-[#FF671F]">Procure</span>
              </span>
              <span className="px-2 py-0.5 rounded-full bg-orange-50 text-[#FF671F] text-[9px] font-extrabold uppercase tracking-wider border border-orange-200">
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
          className="px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 hover:text-[#0B1E48] border border-slate-200 text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-all"
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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0B1E48] border border-blue-200 text-[11px] font-bold">
                <span className="w-2 h-2 rounded-full bg-[#046A38] animate-pulse" />
                <span>Single Sovereign Sandbox Gateway</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#0B1E48] font-display tracking-tight leading-snug">
                A digital marketplace for government innovation challenges and startup solutions.
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                Mahatech Procure connects Maharashtra’s government departments with vetted startups to solve real public problems—through open challenges, controlled pilots, and evidence-based scale-up.
              </p>
            </div>

            {/* Trust Indicators in Indian Flag Colors */}
            <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-3.5">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                Trust & Sovereign Compliance
              </span>

              <div className="space-y-2.5 text-xs font-bold text-slate-700">
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-[#FF671F]/15 text-[#C2410C] flex items-center justify-center text-[10px] font-black shrink-0">
                    ★
                  </div>
                  <span>Government of Maharashtra Certified</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-[#046A38]/15 text-[#046A38] flex items-center justify-center text-[10px] font-black shrink-0">
                    ✓
                  </div>
                  <span>DPIIT-recognized Startup Friendly</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-[#0B1E48]/15 text-[#0B1E48] flex items-center justify-center text-[10px] shrink-0">
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
                className="text-xs font-bold text-[#FF671F] hover:text-orange-700 flex items-center gap-1.5 group transition-colors"
              >
                <span>New to Mahatech Procure? Learn how it works</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>

          {/* --------------------------------------------------------------------- */}
          {/* PART 2: LOGIN FORM (Center / Main Card - Matching Reference Styling)   */}
          {/* --------------------------------------------------------------------- */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-[36px] border border-slate-200/90 shadow-xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
              
              {/* Header inside Card */}
              <div className="text-center space-y-1 pb-1">
                <h2 className="text-2xl font-black text-[#0B1E48] font-display tracking-tight">
                  Sign in to Mahatech Procure
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  Choose your login type and continue.
                </p>
              </div>

              {/* Segmented Tab Switcher (Gov vs Startup) */}
              <div className="p-1 rounded-2xl bg-slate-100 flex items-center gap-1 border border-slate-200">
                <button
                  type="button"
                  onClick={() => setLoginType('gov')}
                  className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    loginType === 'gov'
                      ? 'bg-[#0B1E48] text-white shadow-md'
                      : 'text-slate-600 hover:text-[#0B1E48]'
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
                      ? 'bg-[#FF671F] text-white shadow-md'
                      : 'text-slate-600 hover:text-[#FF671F]'
                  }`}
                >
                  <Rocket className="w-3.5 h-3.5" />
                  <span>Startup / Company</span>
                </button>
              </div>

              {/* Feedback Banners */}
              {errorMessage && (
                <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs font-semibold flex items-start gap-2.5 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <p className="leading-snug">{errorMessage}</p>
                </div>
              )}

              {successMessage && (
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center gap-2.5 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-[#046A38] shrink-0" />
                  <p className="leading-snug">{successMessage}</p>
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                
                {/* Email Field */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">
                    {loginType === 'gov' ? 'Official Email ID' : 'Registered Email ID'}
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={loginType === 'gov' ? 'name@maharashtra.gov.in' : 'founder@yourstartup.com'}
                      className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:border-[#0B1E48] focus:bg-white text-xs font-semibold text-navy-950 outline-none transition-all"
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
                      className="text-[11px] font-bold text-[#FF671F] hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full pl-10 pr-11 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:border-[#0B1E48] focus:bg-white text-xs font-semibold text-navy-950 outline-none transition-all"
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

                {/* Captcha Field */}
                <div className="space-y-1.5 pt-1">
                  <label className="block text-xs font-bold text-slate-800">Security Verification</label>
                  <div className="flex items-center gap-2">
                    {/* Visual Captcha Box */}
                    <div className="h-11 px-4 rounded-xl bg-slate-900 text-[#FF8A3D] font-mono font-black text-sm tracking-widest flex items-center justify-center select-none shadow-inner border border-slate-700">
                      {captchaCode}
                    </div>

                    <button
                      type="button"
                      onClick={refreshCaptcha}
                      className="w-11 h-11 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
                      title="Refresh Captcha Code"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>

                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={captchaInput}
                      onChange={(e) => setCaptchaInput(e.target.value)}
                      placeholder="Enter code above"
                      className="flex-1 px-3.5 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:border-[#0B1E48] focus:bg-white text-xs font-semibold text-navy-950 outline-none uppercase font-mono transition-all"
                    />
                  </div>
                </div>

                {/* Remember Me Checkbox */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded text-[#0B1E48] focus:ring-0 cursor-pointer"
                  />
                  <label htmlFor="rememberMe" className="text-xs font-semibold text-slate-600 cursor-pointer">
                    Remember me on this browser
                  </label>
                </div>

                {/* Primary Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-3.5 rounded-2xl text-white font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all hover:scale-[1.01] ${
                    loginType === 'gov'
                      ? 'bg-[#0B1E48] hover:bg-[#152C63] shadow-blue-950/20'
                      : 'bg-[#FF671F] hover:bg-orange-700 shadow-orange-600/20'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Verifying Credentials...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>{loginType === 'gov' ? 'Sign In as Government User' : 'Sign In as Startup'}</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </>
                  )}
                </button>

              </form>

              {/* Demo 1-Click Auto-Fill Fast Pass */}
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                <span className="text-[11px] font-bold text-slate-500">Quick Test Credentials:</span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleQuickDemoFill('gov')}
                    className="px-2.5 py-1 rounded-lg bg-blue-100 hover:bg-blue-200 text-[#0B1E48] font-bold text-[10px] transition-colors"
                  >
                    Gov Officer
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickDemoFill('startup')}
                    className="px-2.5 py-1 rounded-lg bg-orange-100 hover:bg-orange-200 text-[#C2410C] font-bold text-[10px] transition-colors"
                  >
                    Startup Founder
                  </button>
                </div>
              </div>

              {/* Secondary SSO Options */}
              <div className="space-y-2 pt-1 border-t border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block text-center">
                  Or continue with verified SSO
                </span>

                {loginType === 'gov' ? (
                  <button
                    type="button"
                    onClick={() => handleQuickDemoFill('gov')}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 flex items-center justify-center gap-2 transition-colors"
                  >
                    <span>🇮🇳 Jan Parichay (National Single Sign-On / DSC)</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleQuickDemoFill('startup')}
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
              <h3 className="text-lg font-black text-[#0B1E48] font-display tracking-tight">
                Need help with access?
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Choose the option that best describes you.
              </p>
            </div>

            {/* Help Card for Government Users */}
            <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center gap-2 text-[#0B1E48] font-bold text-xs">
                <Building2 className="w-4 h-4 text-[#0B1E48]" />
                <span>For Government Users</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                If you are a government official and do not have login credentials:
                contact your department nodal officer or raise an access request.
              </p>
              <button
                type="button"
                onClick={() => setIsAccessModalOpen(true)}
                className="w-full py-2 px-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#0B1E48] border border-blue-200 text-xs font-bold transition-all text-center"
              >
                Request Government Access
              </button>
            </div>

            {/* Help Card for Startups */}
            <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center gap-2 text-[#C2410C] font-bold text-xs">
                <Rocket className="w-4 h-4 text-[#FF671F]" />
                <span>For Startups</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                Create your verified startup profile, upload your evidence archive, and start exploring active challenges.
              </p>
              <button
                type="button"
                onClick={() => handleQuickDemoFill('startup')}
                className="w-full py-2 px-3 rounded-xl bg-orange-50 hover:bg-orange-100 text-[#C2410C] border border-orange-200 text-xs font-bold transition-all text-center"
              >
                Register as a Startup
              </button>
            </div>

            {/* Contact & Support Section */}
            <div className="p-5 rounded-3xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
              <strong className="text-[#0B1E48] font-bold block text-xs">Technical Support Cell</strong>
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
                <p className="hover:text-[#0B1E48] cursor-pointer">User Guides & FAQs →</p>
                <p className="hover:text-[#0B1E48] cursor-pointer">Privacy Policy →</p>
                <p className="hover:text-[#0B1E48] cursor-pointer">Terms of Use →</p>
              </div>
            </div>

          </div>

        </div>
      </main>

      {/* ========================================================================= */}
      {/* FOOTER                                                                    */}
      {/* ========================================================================= */}
      <footer className="py-4 px-6 text-xs text-slate-500 border-t border-slate-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-2 max-w-7xl mx-auto w-full">
        <p className="font-semibold text-[#0B1E48]">Mahatech Procure — Problem Statement 26136</p>
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
                <h3 className="text-base font-black text-[#0B1E48] font-display">
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
                <label className="block font-bold text-[#0B1E48] mb-1">Department / Urban Body *</label>
                <input
                  type="text"
                  placeholder="e.g. Urban Development Dept / PMC"
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-navy-900 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-[#0B1E48] mb-1">Officer Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Shri Rajesh Deshmukh"
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-navy-900 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-[#0B1E48] mb-1">Official Govt Email (.gov.in) *</label>
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
                  className="px-5 py-2 rounded-xl bg-[#0B1E48] hover:bg-[#152C63] text-white font-bold shadow-sm"
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
                <h3 className="text-base font-black text-[#0B1E48] font-display">
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
                <label className="block font-bold text-[#0B1E48] mb-1">Registered Email ID *</label>
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
                  className="px-5 py-2 rounded-xl bg-[#FF671F] hover:bg-orange-700 text-white font-bold shadow-sm"
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
