import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { NotificationDropdown } from './NotificationDropdown';
import { BrandLogo } from './BrandLogo';
import {
  Sparkles,
  Bell,
  QrCode,
  Layers,
  ShieldCheck,
  ChevronDown,
  UserCheck,
  LogOut,
  Building2,
  Bug,
  FlaskConical,
  Truck,
  HeartHandshake,
  Bot,
  ExternalLink,
} from 'lucide-react';

interface NavbarProps {
  onOpenLanding?: () => void;
  onOpenLogin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenLanding, onOpenLogin }) => {
  const {
    currentUser,
    currentRole,
    switchRole,
    logout,
    unreadNotifCount,
    setIsChatbotOpen,
    setIsMadhukrantiModalOpen,
    setIsBlockchainModalOpen,
    setIsProfileModalOpen,
    setIsVerifyPassportOpen,
    setActiveTab,
  } = useApp();

  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const roleConfigs: {
    role: UserRole;
    label: string;
    description: string;
    icon: React.ReactNode;
    badgeColor: string;
  }[] = [
    {
      role: 'government',
      label: 'Gov / KVK Admin',
      description: 'National mission oversight & cluster risk monitoring',
      icon: <Building2 className="w-4 h-4 text-purple-600" />,
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
    },
    {
      role: 'beekeeper',
      label: 'Registered Beekeeper',
      description: 'IoT telemetry, AI colony diagnostics & batch harvesting',
      icon: <Bug className="w-4 h-4 text-amber-600" />,
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
    },
    {
      role: 'non_registered_beekeeper',
      label: 'New / Non-Reg Beekeeper',
      description: 'Madhukranti SSO onboarding & first hive registration',
      icon: <UserCheck className="w-4 h-4 text-orange-600" />,
      badgeColor: 'bg-orange-50 text-orange-800 border-orange-200',
    },
    {
      role: 'lab',
      label: 'NABL Lab Certifier',
      description: 'C4 sugar NMR, HMF & moisture quality certification',
      icon: <FlaskConical className="w-4 h-4 text-indigo-600" />,
      badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    },
    {
      role: 'logistics',
      label: 'Logistics Handler',
      description: 'Cold chain vehicle dispatch & tamper sensor tracking',
      icon: <Truck className="w-4 h-4 text-blue-600" />,
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    {
      role: 'consumer',
      label: 'Consumer & Passport',
      description: 'QR scan verification, origin map & authenticity proof',
      icon: <HeartHandshake className="w-4 h-4 text-emerald-600" />,
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
  ];

  const currentConfig = roleConfigs.find((r) => r.role === currentRole) || roleConfigs[1];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#EAE4D4] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Brand Logo & Tagline */}
          <div className="flex items-center gap-3 sm:gap-6">
            <button
              onClick={() => {
                if (onOpenLanding) onOpenLanding();
                else setActiveTab('landing');
              }}
              className="flex items-center gap-2.5 text-left focus:outline-hidden group"
            >
              <BrandLogo size="sm" showText={true} showTagline={true} badge="v2.6 PRO" />
            </button>

            {/* Quick Public Action: Honey Passport */}
            <button
              onClick={() => {
                setIsVerifyPassportOpen(true);
              }}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#FAF7EF] hover:bg-[#F4EEDC] text-[#524B3D] border border-[#E6DEC9] transition-colors"
            >
              <QrCode className="w-3.5 h-3.5 text-[#D9A441]" />
              <span>Verify Honey Passport</span>
            </button>

            {/* Blockchain Live Pill */}
            <button
              onClick={() => setIsBlockchainModalOpen(true)}
              className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono-num font-medium bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Ledger: 1,048 Blocks Synced</span>
            </button>
          </div>

          {/* Right: Actions, Role Selector, Notifications, AI Assistant, User */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* AI Assistant Button */}
            <button
              onClick={() => setIsChatbotOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#FFF9E8] to-[#FFF3D1] hover:from-[#FFF3D1] hover:to-[#FCECB8] text-[#8C6B1F] border border-[#F6E7A1] text-xs font-semibold shadow-2xs transition-all active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D9A441] animate-spin-slow" />
              <span className="hidden sm:inline">AI Assistant</span>
            </button>

            {/* Role Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${currentConfig.badgeColor} shadow-2xs`}
              >
                {currentConfig.icon}
                <span className="hidden md:inline font-medium">{currentConfig.label}</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </button>

              {isRoleDropdownOpen && (
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsRoleDropdownOpen(false)}
                />
              )}

              {isRoleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 sm:w-80 rounded-2xl bg-white border border-[#E8E2D2] shadow-2xl z-50 p-2 animate-in fade-in zoom-in-95 duration-150">
                  <div className="p-2 border-b border-[#F2EDE1] mb-1">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#8A8475]">Switch Active Role</p>
                    <p className="text-[11px] text-[#666]">Explore all ecosystem persona dashboards</p>
                  </div>
                  <div className="space-y-1">
                    {roleConfigs.map((cfg) => (
                      <button
                        key={cfg.role}
                        onClick={() => {
                          switchRole(cfg.role);
                          setIsRoleDropdownOpen(false);
                        }}
                        className={`w-full p-2.5 rounded-xl text-left flex items-start gap-3 transition-colors ${
                          currentRole === cfg.role
                            ? 'bg-[#FFF9E8] border border-[#F6E7A1]'
                            : 'hover:bg-[#FCFBF7] border border-transparent'
                        }`}
                      >
                        <div className="w-7 h-7 rounded-lg bg-white border border-stone-200 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                          {cfg.icon}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-[#20221F] flex items-center justify-between">
                            {cfg.label}
                            {currentRole === cfg.role && (
                              <span className="text-[10px] text-[#8C6B1F] font-semibold">Active</span>
                            )}
                          </p>
                          <p className="text-[11px] text-[#777] line-clamp-1 mt-0.5">{cfg.description}</p>
                        </div>
                      </button>
                    ))}
                  </div>

                  {currentRole === 'non_registered_beekeeper' && (
                    <div className="mt-2 p-2 bg-[#FFF8E6] rounded-xl border border-[#F6E7A1]">
                      <button
                        onClick={() => {
                          setIsMadhukrantiModalOpen(true);
                          setIsRoleDropdownOpen(false);
                        }}
                        className="w-full text-center text-xs font-bold text-[#8C6B1F] hover:underline flex items-center justify-center gap-1.5"
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Launch Madhukranti SSO Flow
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className="relative p-2 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-[#FAF7EF] border border-[#EBE6D7] transition-colors"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadNotifCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#D9A441] text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                    {unreadNotifCount}
                  </span>
                )}
              </button>
              <NotificationDropdown isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
            </div>

            {/* User Profile Menu */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-[#FAF7EF] border border-[#EBE6D7] transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#F6E7A1] to-[#E5BA55] flex items-center justify-center text-xs font-bold text-[#20221F] border border-[#D9A441]/40 shadow-2xs">
                  {currentUser.name ? currentUser.name.charAt(0) : 'U'}
                </div>
                <ChevronDown className="w-3 h-3 text-stone-400 hidden sm:block" />
              </button>

              {isUserMenuOpen && (
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsUserMenuOpen(false)}
                />
              )}

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white border border-[#E8E2D2] shadow-2xl z-50 p-2 animate-in fade-in zoom-in-95 duration-150">
                  <div className="p-3 border-b border-[#F2EDE1]">
                    <p className="text-xs font-bold text-[#20221F] truncate">{currentUser.name}</p>
                    <p className="text-[11px] text-[#777] truncate">{currentUser.email}</p>
                    <div className="mt-1.5 inline-block text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#FFF8E6] text-[#8C6B1F] border border-[#F6E7A1]">
                      {currentUser.role.replace('_', ' ').toUpperCase()}
                    </div>
                  </div>
                  <div className="py-1 space-y-0.5">
                    <button
                      onClick={() => {
                        setIsProfileModalOpen(true);
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full px-3 py-2 text-left text-xs font-medium text-[#20221F] hover:bg-[#FAF7EF] rounded-lg transition-colors flex items-center gap-2"
                    >
                      <UserCheck className="w-3.5 h-3.5 text-[#8C6B1F]" />
                      Profile & National ID
                    </button>
                    <button
                      onClick={() => {
                        setIsBlockchainModalOpen(true);
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full px-3 py-2 text-left text-xs font-medium text-[#20221F] hover:bg-[#FAF7EF] rounded-lg transition-colors flex items-center gap-2"
                    >
                      <Layers className="w-3.5 h-3.5 text-[#8C6B1F]" />
                      Blockchain Ledger Audit
                    </button>
                    <button
                      onClick={() => {
                        logout();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full px-3 py-2 text-left text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out (Return to Login)
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
