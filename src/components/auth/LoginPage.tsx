import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { DEMO_USERS } from '../../data/mockData';
import { AuthService, ROLE_AUTH_MATRIX } from '../../services/authService';
import { BrandLogo } from '../common/BrandLogo';
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ShieldCheck,
  Building2,
  Bug,
  FlaskConical,
  Truck,
  HeartHandshake,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  QrCode,
  KeyRound,
  ShieldAlert,
  Smartphone,
  Info,
  RefreshCw,
  Layers,
  ChevronRight,
  Award,
  UserPlus,
  HelpCircle,
} from 'lucide-react';

interface LoginPageProps {
  onBackToApp?: () => void;
  onOpenLanding?: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onBackToApp, onOpenLanding }) => {
  const { login, setIsMadhukrantiModalOpen, setIsVerifyPassportOpen, setIsBlockchainModalOpen } = useApp();

  const [selectedRole, setSelectedRole] = useState<UserRole>('beekeeper');
  const [authMode, setAuthMode] = useState<'password' | 'otp'>('password');
  
  // Form inputs
  const [identifier, setIdentifier] = useState('MDK-KER-2024-8849');
  const [password, setPassword] = useState('demo12345');
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState(45);
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [showMatrixModal, setShowMatrixModal] = useState(false);

  // Quick lookup for batch consumer
  const [quickBatchInput, setQuickBatchInput] = useState('HVX-2026-KER-004821');

  const roleDefinitions: {
    role: UserRole;
    label: string;
    badge: string;
    icon: React.ReactNode;
    color: string;
    accentBg: string;
    loginMethod: string;
    accessScope: string;
    demoIdentifier: string;
    demoPassword?: string;
  }[] = [
    {
      role: 'government',
      label: 'Government Admin',
      badge: 'NBHM / MoA&FW',
      icon: <Building2 className="w-5 h-5 text-purple-700" />,
      color: 'border-purple-200 bg-purple-50 text-purple-900',
      accentBg: 'bg-purple-600',
      loginMethod: 'Official government credentials + secure authentication',
      accessScope: 'National census, district monitoring, NABL audits & policy',
      demoIdentifier: 'admin@hiveonix.demo',
      demoPassword: 'GovAdmin@2026',
    },
    {
      role: 'beekeeper',
      label: 'Registered Beekeeper',
      badge: 'Madhukranti Verified',
      icon: <Bug className="w-5 h-5 text-amber-700" />,
      color: 'border-amber-200 bg-amber-50 text-amber-900',
      accentBg: 'bg-amber-600',
      loginMethod: 'Madhukranti ID / Aadhaar Registered Mobile + Password/OTP',
      accessScope: 'Smart hive IoT radar, harvest batch logging & AI health',
      demoIdentifier: 'MDK-KER-2024-8849',
      demoPassword: 'demo12345',
    },
    {
      role: 'lab',
      label: 'Lab Certifier',
      badge: 'NABL Accredited',
      icon: <FlaskConical className="w-5 h-5 text-indigo-700" />,
      color: 'border-indigo-200 bg-indigo-50 text-indigo-900',
      accentBg: 'bg-indigo-600',
      loginMethod: 'Lab-issued credentials + secure authentication',
      accessScope: 'NMR, C4 sugar carbon isotope & purity certification',
      demoIdentifier: 'NABL-IN-082',
      demoPassword: 'demo12345',
    },
    {
      role: 'logistics',
      label: 'Logistics Handler',
      badge: 'Cold-Chain Fleet',
      icon: <Truck className="w-5 h-5 text-blue-700" />,
      color: 'border-blue-200 bg-blue-50 text-blue-900',
      accentBg: 'bg-blue-600',
      loginMethod: 'Registered logistics account + password/OTP',
      accessScope: 'Assigned shipments, GPS telemetry & temperature custody',
      demoIdentifier: 'LOG-EXP-BLR-04',
      demoPassword: 'demo12345',
    },
    {
      role: 'consumer',
      label: 'Consumer',
      badge: 'Public & Verified',
      icon: <HeartHandshake className="w-5 h-5 text-emerald-700" />,
      color: 'border-emerald-200 bg-emerald-50 text-emerald-900',
      accentBg: 'bg-emerald-600',
      loginMethod: 'QR-based product access or consumer account',
      accessScope: 'Verified honey origin passport and blockchain validation',
      demoIdentifier: 'consumer@hiveonix.demo',
      demoPassword: 'demo12345',
    },
  ];

  const currentRoleDef = roleDefinitions.find((r) => r.role === selectedRole) || roleDefinitions[1];

  const handleRoleChange = (role: UserRole) => {
    setSelectedRole(role);
    setAuthError(null);
    setOtpSent(false);
    setOtpCode('');

    const targetDef = roleDefinitions.find((r) => r.role === role);
    if (targetDef) {
      setIdentifier(targetDef.demoIdentifier);
      setPassword(targetDef.demoPassword || 'demo12345');
    }
  };

  const handleSendOTP = () => {
    if (!identifier.trim()) {
      setAuthError('Please enter your Registered ID, Email, or Mobile Number');
      return;
    }
    setAuthError(null);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setOtpSent(true);
      setOtpCode('749216'); // Pre-fill test OTP code for rapid evaluation
      setOtpTimer(45);
    }, 600);
  };

  const handleAuthenticate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setAuthError(null);

    if (!identifier.trim()) {
      setAuthError('Please enter valid login credentials.');
      return;
    }

    if (authMode === 'otp' && otpSent && !otpCode.trim()) {
      setAuthError('Please enter the 6-digit OTP code sent to your registered device.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      // Authenticate via AuthService
      const result = AuthService.loginWithCredentials(identifier, selectedRole, password);
      if (result.success && result.user) {
        login(result.user);
        setIsLoading(false);
        if (onBackToApp) onBackToApp();
      } else {
        setIsLoading(false);
        setAuthError(result.error || 'Invalid credentials. Please verify your ID or password.');
      }
    }, 650);
  };

  const handleDirectDemoLogin = (role: UserRole) => {
    setIsLoading(true);
    setTimeout(() => {
      const user = AuthService.loginAsDemoRole(role);
      login(user);
      setIsLoading(false);
      if (onBackToApp) onBackToApp();
    }, 400);
  };

  const handleOpenUnregisteredFlow = () => {
    setIsMadhukrantiModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-butter-canvas flex flex-col justify-between selection:bg-[#F6E7A1]">
      {/* Top Header Bar */}
      <header className="border-b border-[#E8E2D2] bg-white/90 backdrop-blur-md px-4 sm:px-8 py-3 flex items-center justify-between shadow-2xs">
        <BrandLogo size="sm" showText={true} showTagline={true} badge="IDENTITY GATEWAY" />

        <div className="flex items-center gap-2">
          {/* Unregistered Beekeeper Direct Link */}
          <button
            type="button"
            onClick={handleOpenUnregisteredFlow}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#D9A441] bg-[#FFF9E8] hover:bg-[#FCEBA8] text-xs font-bold text-[#8C6B1F] transition-all shadow-2xs"
          >
            <UserPlus className="w-3.5 h-3.5 text-[#D9A441]" />
            <span className="hidden sm:inline">Unregistered Beekeeper?</span>
            <span className="sm:hidden">Register</span>
          </button>

          <button
            type="button"
            onClick={() => setShowMatrixModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#E0D8C3] bg-[#FAF8F2] hover:bg-[#F2ECE0] text-xs font-semibold text-[#524B3E] transition-colors shadow-2xs"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#D9A441]" />
            <span className="hidden md:inline">Role Matrix</span>
          </button>

          {onOpenLanding && (
            <button
              type="button"
              onClick={onOpenLanding}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold text-[#666] hover:text-[#20221F] hover:bg-stone-100 transition-colors"
            >
              Overview
            </button>
          )}
        </div>
      </header>

      {/* Main Authentication Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 md:py-10 flex flex-col items-center justify-center">
        {/* Unregistered Beekeeper Highlight Banner */}
        <div className="w-full max-w-4xl mb-6 p-4 rounded-3xl bg-gradient-to-r from-[#FFF9E8] via-[#FFF3D0] to-[#FAF0C8] border-2 border-[#D9A441]/60 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white border border-[#D9A441] flex items-center justify-center shrink-0 shadow-2xs">
              <Building2 className="w-5 h-5 text-[#8C6B1F]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#8C6B1F] tracking-wide uppercase">Unregistered Beekeeper?</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold border border-amber-300">
                  Madhu Kranti Gov App Connect
                </span>
              </div>
              <p className="text-xs text-[#5C4916] mt-0.5">
                Connect to the National Madhu Kranti Gov Portal via Aadhaar OTP to register your apiary, obtain your official beekeeper ID, and then log in.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleOpenUnregisteredFlow}
            className="px-4 py-2 rounded-xl bg-[#20221F] hover:bg-[#383C35] text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 shrink-0 self-start sm:self-auto"
          >
            <span>Register with Madhu Kranti</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#F6E7A1]" />
          </button>
        </div>

        {/* Title Section */}
        <div className="text-center max-w-xl mx-auto mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF8E6] border border-[#F6E7A1] text-[#8C6B1F] text-xs font-semibold mb-2 shadow-2xs">
            <KeyRound className="w-3.5 h-3.5 text-[#D9A441]" />
            <span>Multi-Stakeholder Authentication Matrix</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#20221F] font-heading tracking-tight">
            Sign In to Your Certified Portal
          </h1>
          <p className="text-xs sm:text-sm text-[#7A7568] mt-1.5 leading-relaxed">
            Select your assigned stakeholder role below to access government monitoring, smart apiary IoT, laboratory verification, cold-chain logistics, or consumer passports.
          </p>
        </div>

        {/* 2-Column Authentication Card Grid */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Column: Role Selection Cards */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#8A8475]">1. Select Your Stakeholder Role</span>
                <span className="text-[11px] text-[#8C6B1F] font-semibold">5 Roles Configured</span>
              </div>

              <div className="space-y-2">
                {roleDefinitions.map((item) => {
                  const isSelected = selectedRole === item.role;
                  return (
                    <button
                      key={item.role}
                      type="button"
                      onClick={() => handleRoleChange(item.role)}
                      className={`w-full p-3.5 rounded-2xl text-left border transition-all relative overflow-hidden flex items-start gap-3.5 ${
                        isSelected
                          ? 'bg-white border-[#20221F] shadow-md ring-2 ring-[#20221F]/10 scale-[1.01]'
                          : 'bg-white/80 border-[#E6DEC9] hover:bg-white hover:border-[#D4CCA6]'
                      }`}
                    >
                      {/* Active Indicator Strip */}
                      {isSelected && (
                        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#D9A441]" />
                      )}

                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-2xs border ${item.color}`}>
                        {item.icon}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="text-xs font-bold text-[#20221F]">{item.label}</h3>
                          <span className={`text-[10px] font-mono-num font-semibold px-2 py-0.5 rounded-full border ${item.color}`}>
                            {item.badge}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#7A7467] line-clamp-1 mt-0.5">
                          <strong className="text-[#4F4B41]">Access:</strong> {item.accessScope}
                        </p>
                        <p className="text-[10px] text-[#969083] line-clamp-1 mt-0.5">
                          <strong className="text-[#686358]">Auth:</strong> {item.loginMethod}
                        </p>
                      </div>

                      {isSelected && (
                        <CheckCircle2 className="w-4 h-4 text-[#D9A441] shrink-0 mt-1" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Unregistered Beekeeper Quick Callout */}
            <div className="p-3.5 rounded-2xl bg-[#FFFDF5] border border-[#F0E6CB] shadow-xs flex items-start gap-2.5">
              <UserPlus className="w-4 h-4 text-[#8C6B1F] shrink-0 mt-0.5" />
              <div className="text-[11px] text-[#6B6659]">
                <strong className="text-[#20221F]">Not registered yet?</strong> Click{' '}
                <button
                  type="button"
                  onClick={handleOpenUnregisteredFlow}
                  className="text-[#8C6B1F] font-bold underline hover:text-[#5C4916]"
                >
                  Unregistered Beekeeper Onboarding
                </button>{' '}
                to connect to the Madhu Kranti portal and generate your beekeeper ID.
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Login Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-[#E4DDCB] shadow-xl overflow-hidden flex flex-col justify-between">
            <div>
              {/* Form Header */}
              <div className="p-6 bg-gradient-to-br from-[#FFF9E8] via-[#FCFBF7] to-white border-b border-[#F0EAD9]">
                <div className="flex items-center justify-between mb-2">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-[#E8E2D2] text-[11px] font-bold text-[#20221F] shadow-2xs">
                    {currentRoleDef.icon}
                    <span>{currentRoleDef.label} Portal</span>
                  </div>
                  <span className="text-[10px] font-semibold text-[#8C6B1F] bg-[#FFF8E6] px-2 py-0.5 rounded-md border border-[#F6E7A1]">
                    Auth Gateway v2.6
                  </span>
                </div>

                <h2 className="text-lg font-bold text-[#20221F] font-heading">
                  Authentication & Permissions Verification
                </h2>
                <p className="text-xs text-[#7A7467] mt-1">
                  <strong>Access Policy:</strong> {currentRoleDef.accessScope}
                </p>
                <div className="mt-2.5 p-2 rounded-xl bg-white border border-[#EAE3D2] text-[11px] text-[#555] flex items-center gap-2">
                  <Info className="w-4 h-4 text-[#D9A441] shrink-0" />
                  <span><strong>Method:</strong> {currentRoleDef.loginMethod}</span>
                </div>
              </div>

              {/* Form Body */}
              <div className="p-6 space-y-4">
                {/* Auth Mode Tabs (Password vs OTP) */}
                <div className="flex items-center justify-between p-1 bg-[#F7F5EE] rounded-xl border border-[#E8E2D2]">
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('password');
                      setOtpSent(false);
                      setAuthError(null);
                    }}
                    className={`w-1/2 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      authMode === 'password'
                        ? 'bg-white text-[#20221F] shadow-xs'
                        : 'text-[#777] hover:text-[#20221F]'
                    }`}
                  >
                    Password / Secure Key
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('otp');
                      setAuthError(null);
                    }}
                    className={`w-1/2 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      authMode === 'otp'
                        ? 'bg-white text-[#20221F] shadow-xs'
                        : 'text-[#777] hover:text-[#20221F]'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5 text-[#D9A441]" />
                    <span>Registered OTP</span>
                  </button>
                </div>

                {authError && (
                  <div className="p-3 rounded-xl bg-rose-50 text-rose-800 border border-rose-200 text-xs flex items-start gap-2">
                    <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <span>{authError}</span>
                  </div>
                )}

                <form onSubmit={handleAuthenticate} className="space-y-4">
                  {/* Credential Identifier Input */}
                  <div>
                    <label className="block text-xs font-bold text-[#20221F] mb-1">
                      {selectedRole === 'government'
                        ? 'Official Government Email / Officer ID'
                        : selectedRole === 'beekeeper'
                        ? 'Madhukranti ID / Aadhaar Registered Mobile / Email'
                        : selectedRole === 'lab'
                        ? 'NABL Laboratory ID / Chemist Email'
                        : selectedRole === 'logistics'
                        ? 'Logistics Account ID / Fleet Dispatch Email'
                        : 'Consumer Mobile / Email'}
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        required
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D9D3C3] text-xs font-medium focus:outline-hidden focus:border-[#D9A441] focus:ring-1 focus:ring-[#D9A441] bg-[#FCFBF8]"
                        placeholder={currentRoleDef.demoIdentifier}
                      />
                    </div>
                  </div>

                  {/* Password Mode Inputs */}
                  {authMode === 'password' && (
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-bold text-[#20221F]">
                          {selectedRole === 'government' ? 'Government 2FA Token / Secure Password' : 'Password'}
                        </label>
                        <span className="text-[10px] text-[#8C6B1F] font-mono-num font-semibold">
                          Demo: {currentRoleDef.demoPassword || 'demo12345'}
                        </span>
                      </div>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-[#D9D3C3] text-xs font-medium focus:outline-hidden focus:border-[#D9A441] focus:ring-1 focus:ring-[#D9A441] bg-[#FCFBF8] font-mono"
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-stone-400 hover:text-stone-700"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* OTP Mode Inputs */}
                  {authMode === 'otp' && (
                    <div className="space-y-3 p-3.5 rounded-2xl bg-[#FFFBF0] border border-[#F6E7A1]">
                      {!otpSent ? (
                        <div className="space-y-2">
                          <p className="text-xs text-[#7A6020]">
                            A 6-digit Aadhaar / registered mobile one-time passcode will be generated for <strong>{identifier || 'your account'}</strong>.
                          </p>
                          <button
                            type="button"
                            onClick={handleSendOTP}
                            disabled={isLoading}
                            className="w-full py-2 px-3 rounded-xl bg-[#20221F] text-white text-xs font-bold hover:bg-[#383C35] transition-colors flex items-center justify-center gap-2"
                          >
                            <Smartphone className="w-4 h-4 text-[#F6E7A1]" />
                            <span>Send 6-Digit OTP</span>
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-2.5">
                          <div className="flex items-center justify-between">
                            <label className="block text-xs font-bold text-[#20221F]">Enter 6-Digit OTP</label>
                            <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded-full">
                              Code Sent (Demo Auto-Filled: 749216)
                            </span>
                          </div>
                          <div className="relative">
                            <KeyRound className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                            <input
                              type="text"
                              maxLength={6}
                              value={otpCode}
                              onChange={(e) => setOtpCode(e.target.value)}
                              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D9D3C3] text-sm font-bold tracking-widest text-center focus:outline-hidden focus:border-[#D9A441] bg-white font-mono"
                              placeholder="749216"
                            />
                          </div>
                          <div className="flex items-center justify-between text-[11px] text-[#7A7467]">
                            <span>Resend in {otpTimer}s</span>
                            <button
                              type="button"
                              onClick={handleSendOTP}
                              className="text-[#8C6B1F] font-bold hover:underline"
                            >
                              Resend Code
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Primary Action Buttons */}
                  <div className="pt-2 space-y-2">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3 rounded-xl bg-[#20221F] hover:bg-[#383C35] text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <span className="flex items-center gap-2">
                          <RefreshCw className="w-4 h-4 animate-spin text-[#F6E7A1]" />
                          Verifying Credentials & Node Signature...
                        </span>
                      ) : (
                        <>
                          <span>Sign In & Open {currentRoleDef.label} Dashboard</span>
                          <ArrowRight className="w-4 h-4 text-[#F6E7A1]" />
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDirectDemoLogin(selectedRole)}
                      disabled={isLoading}
                      className="w-full py-2.5 rounded-xl bg-[#FFF8E6] hover:bg-[#FFF2CD] text-[#8C6B1F] border border-[#F6E7A1] text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-2xs"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#D9A441]" />
                      <span>One-Click Quick Login as {currentRoleDef.label}</span>
                    </button>
                  </div>
                </form>

                {/* Special Role Gateways */}
                <div className="pt-4 border-t border-[#F0EAD9] space-y-2">
                  {/* Beekeeper: Register with Madhukranti SSO */}
                  {selectedRole === 'beekeeper' && (
                    <button
                      type="button"
                      onClick={handleOpenUnregisteredFlow}
                      className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#FFF8E6] to-[#FFF0C8] hover:from-[#FFF0C8] hover:to-[#FCE6A8] text-[#8C6B1F] border border-[#F6E7A1] text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-2xs"
                    >
                      <UserPlus className="w-4 h-4 text-[#D9A441]" />
                      <span>Unregistered Beekeeper? Connect to Madhu Kranti Gov App</span>
                    </button>
                  )}

                  {/* Consumer: Quick Passport Lookup without full account */}
                  {selectedRole === 'consumer' && (
                    <div className="p-3 rounded-xl bg-[#F8F6F0] border border-[#E6DEC9] space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-[#20221F]">Instant Honey Jar Verification (No Account)</span>
                        <QrCode className="w-4 h-4 text-[#D9A441]" />
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={quickBatchInput}
                          onChange={(e) => setQuickBatchInput(e.target.value)}
                          placeholder="e.g. HVX-2026-KER-004821"
                          className="flex-1 px-3 py-1.5 rounded-lg border border-[#D9D3C3] text-xs bg-white font-mono"
                        />
                        <button
                          type="button"
                          onClick={() => setIsVerifyPassportOpen(true)}
                          className="px-3 py-1.5 rounded-lg bg-[#20221F] text-white text-xs font-bold hover:bg-stone-800 transition-colors"
                        >
                          Verify QR
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Form Footer */}
            <div className="px-6 py-3.5 bg-[#FAF8F2] border-t border-[#F0EAD9] flex items-center justify-between text-[11px] text-[#7A7467]">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Protected by National Honey Mission Registry Standards</span>
              </span>
              <button
                type="button"
                onClick={() => setIsBlockchainModalOpen(true)}
                className="text-[#8C6B1F] font-semibold hover:underline flex items-center gap-1"
              >
                <Layers className="w-3 h-3" />
                <span>Ledger Status</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Role & Access Matrix Modal */}
      {showMatrixModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl bg-white rounded-3xl border border-[#E8E2D2] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="p-6 bg-gradient-to-br from-[#FFF9E8] via-[#FCFBF7] to-white border-b border-[#F0EAD9] flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#F6E7A1] border border-[#D9A441]/50 flex items-center justify-center">
                    <Award className="w-4 h-4 text-[#8C6B1F]" />
                  </div>
                  <h2 className="text-lg font-bold text-[#20221F] font-heading">
                    Authentication & Role-Based Access Matrix
                  </h2>
                </div>
                <p className="text-xs text-[#7A7467] mt-1">
                  Reference security specification for all 5 Hiveonix stakeholder personas.
                </p>
              </div>
              <button
                onClick={() => setShowMatrixModal(false)}
                className="p-1.5 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              <div className="overflow-x-auto rounded-2xl border border-[#EAE3D2]">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#FAF8F2] border-b border-[#EAE3D2] text-[#6E695D]">
                      <th className="p-3.5 font-bold uppercase tracking-wider text-[10px]">Stakeholder Role</th>
                      <th className="p-3.5 font-bold uppercase tracking-wider text-[10px]">Login / Authentication</th>
                      <th className="p-3.5 font-bold uppercase tracking-wider text-[10px]">Access & Permissions Scope</th>
                      <th className="p-3.5 font-bold uppercase tracking-wider text-[10px] text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EFE9DC]">
                    {roleDefinitions.map((item) => (
                      <tr key={item.role} className="hover:bg-[#FFFDF7] transition-colors">
                        <td className="p-3.5">
                          <div className="flex items-center gap-2">
                            <div className={`p-1.5 rounded-lg border ${item.color}`}>
                              {item.icon}
                            </div>
                            <div>
                              <p className="font-bold text-[#20221F]">{item.label}</p>
                              <span className="text-[10px] text-[#8C6B1F] font-mono-num">{item.badge}</span>
                            </div>
                          </div>
                        </td>
                        <td className="p-3.5 font-medium text-[#444]">{item.loginMethod}</td>
                        <td className="p-3.5 text-[#555]">{item.accessScope}</td>
                        <td className="p-3.5 text-right">
                          <button
                            type="button"
                            onClick={() => {
                              setShowMatrixModal(false);
                              handleDirectDemoLogin(item.role);
                            }}
                            className="px-3 py-1.5 rounded-lg bg-[#20221F] text-white text-[11px] font-bold hover:bg-stone-800 transition-colors shadow-2xs whitespace-nowrap"
                          >
                            Sign In
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FFF9E8] border border-[#F6E7A1] text-xs text-[#7A6020] flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#D9A441] shrink-0 mt-0.5" />
                <p>
                  <strong>Zero-Trust Architecture:</strong> Each persona is cryptographically tied to verifiable credentials. Government admins supervise national policy and approvals, beekeepers govern apiary and hive telemetry, NABL labs record spectrometer results, logistics track cold-chain transit, and consumers verify tamper-evident origin passports.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Page Footer */}
      <footer className="border-t border-[#E8E2D2] bg-white/70 py-4 px-4 text-center text-xs text-[#8A8475]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Hiveonix National Honey Traceability & Quality Intelligence System</span>
          <span className="font-mono-num text-[11px]">NABL Accredited • Madhukranti Integrated • NBHM Aligned</span>
        </div>
      </footer>
    </div>
  );
};
