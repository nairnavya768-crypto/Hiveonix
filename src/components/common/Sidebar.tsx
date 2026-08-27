import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Users,
  Box,
  MapPin,
  FileCheck2,
  QrCode,
  ShieldAlert,
  Layers,
  Sparkles,
  TrendingUp,
  CloudSun,
  Crown,
  Bot,
  Truck,
  FlaskConical,
  Settings,
  PlusCircle,
  ShieldCheck,
  Compass,
  LogOut,
} from 'lucide-react';

interface SidebarProps {
  onOpenLogin?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onOpenLogin }) => {
  const {
    currentUser,
    currentRole,
    activeTab,
    setActiveTab,
    setIsAddHiveModalOpen,
    setIsCreateBatchModalOpen,
    setIsMadhukrantiModalOpen,
    setIsChatbotOpen,
    logout,
  } = useApp();

  interface NavItem {
    id: string;
    label: string;
    icon: React.ReactNode;
    badge?: string;
  }

  let navItems: NavItem[] = [];

  if (currentRole === 'government') {
    navItems = [
      { id: 'overview', label: 'Mission Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
      { id: 'beekeepers', label: 'Beekeeper Registry', icon: <Users className="w-4 h-4" />, badge: '1,420' },
      { id: 'hives', label: 'All Hives & Apiaries', icon: <Box className="w-4 h-4" /> },
      { id: 'risk_map', label: 'Regional Risk Map', icon: <MapPin className="w-4 h-4" />, badge: 'Live' },
      { id: 'batches', label: 'Verified Batches', icon: <FileCheck2 className="w-4 h-4" /> },
      { id: 'qr_analytics', label: 'QR Scan Analytics', icon: <QrCode className="w-4 h-4" /> },
      { id: 'counterfeit', label: 'Counterfeit Radar', icon: <ShieldAlert className="w-4 h-4 text-rose-500" />, badge: '3 Flags' },
      { id: 'blockchain', label: 'Blockchain Ledger', icon: <Layers className="w-4 h-4" /> },
      { id: 'settings', label: 'National Standards', icon: <Settings className="w-4 h-4" /> },
    ];
  } else if (currentRole === 'beekeeper') {
    navItems = [
      { id: 'overview', label: 'Apiary Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
      { id: 'hive_map', label: 'Live Hive Map (D3)', icon: <MapPin className="w-4 h-4 text-emerald-600" />, badge: 'D3.js' },
      { id: 'my_hives', label: 'My Hives', icon: <Box className="w-4 h-4" /> },
      { id: 'ai_diagnostics', label: 'AI Disease & Health', icon: <Sparkles className="w-4 h-4 text-amber-500" />, badge: 'AI' },
      { id: 'ai_yield', label: 'AI Yield Predictor', icon: <TrendingUp className="w-4 h-4 text-emerald-600" /> },
      { id: 'batches', label: 'Honey Batches', icon: <FileCheck2 className="w-4 h-4" /> },
      { id: 'environment', label: 'Forage & Bloom', icon: <CloudSun className="w-4 h-4" /> },
      { id: 'queen_health', label: 'Queen Colony Health', icon: <Crown className="w-4 h-4" /> },
      { id: 'assistant', label: 'Hiveonix Assistant', icon: <Bot className="w-4 h-4 text-[#8C6B1F]" /> },
      { id: 'settings', label: 'Profile & Settings', icon: <Settings className="w-4 h-4" /> },
    ];
  } else if (currentRole === 'non_registered_beekeeper') {
    navItems = [
      { id: 'overview', label: 'Onboarding Home', icon: <LayoutDashboard className="w-4 h-4" /> },
      { id: 'madhukranti_sso', label: 'Madhukranti SSO', icon: <ShieldCheck className="w-4 h-4 text-[#D9A441]" />, badge: 'Required' },
      { id: 'register_hives', label: 'Register First Hive', icon: <PlusCircle className="w-4 h-4" /> },
      { id: 'mission_info', label: 'National Mission Guide', icon: <Compass className="w-4 h-4" /> },
      { id: 'assistant', label: 'Beekeeper Helpdesk', icon: <Bot className="w-4 h-4" /> },
    ];
  } else if (currentRole === 'lab') {
    navItems = [
      { id: 'overview', label: 'Lab Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
      { id: 'pending_tests', label: 'Pending Test Queue', icon: <FlaskConical className="w-4 h-4 text-indigo-500" />, badge: '3 Pending' },
      { id: 'verify_batch', label: 'Enter Lab NMR / Tests', icon: <FileCheck2 className="w-4 h-4" /> },
      { id: 'certified_archive', label: 'Certified Archive', icon: <ShieldCheck className="w-4 h-4 text-emerald-600" /> },
      { id: 'settings', label: 'Lab Accreditation', icon: <Settings className="w-4 h-4" /> },
    ];
  } else if (currentRole === 'logistics') {
    navItems = [
      { id: 'overview', label: 'Logistics Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
      { id: 'shipments', label: 'Active Shipments', icon: <Truck className="w-4 h-4 text-blue-500" />, badge: '2 Active' },
      { id: 'live_tracking', label: 'Live GPS & Cold Chain', icon: <MapPin className="w-4 h-4" /> },
      { id: 'blockchain', label: 'Chain of Custody', icon: <Layers className="w-4 h-4" /> },
      { id: 'settings', label: 'Fleet Settings', icon: <Settings className="w-4 h-4" /> },
    ];
  } else {
    // Consumer
    navItems = [
      { id: 'verify_honey', label: 'Verify Honey Passport', icon: <QrCode className="w-4 h-4 text-[#D9A441]" /> },
      { id: 'my_scans', label: 'Verified Jars History', icon: <FileCheck2 className="w-4 h-4" /> },
      { id: 'blockchain', label: 'Public Blockchain Explorer', icon: <Layers className="w-4 h-4" /> },
      { id: 'assistant', label: 'Honey Authenticity AI', icon: <Bot className="w-4 h-4" /> },
    ];
  }

  return (
    <aside className="w-64 shrink-0 bg-white border-r border-[#EAE4D4] min-h-[calc(100vh-4rem)] p-4 flex flex-col justify-between hidden md:flex">
      <div className="space-y-6">
        {/* Quick Action Trigger for Beekeepers / Lab */}
        {currentRole === 'beekeeper' && (
          <div className="space-y-2">
            <button
              onClick={() => setIsAddHiveModalOpen(true)}
              className="w-full py-2.5 px-3 rounded-xl bg-[#20221F] hover:bg-[#343732] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              <PlusCircle className="w-4 h-4 text-[#F6E7A1]" />
              Register New Hive
            </button>
            <button
              onClick={() => setIsCreateBatchModalOpen(true)}
              className="w-full py-2 px-3 rounded-xl bg-[#FFF9E8] hover:bg-[#FFF3D1] text-[#8C6B1F] border border-[#F6E7A1] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <FileCheck2 className="w-4 h-4 text-[#D9A441]" />
              Record Harvest Batch
            </button>
          </div>
        )}

        {currentRole === 'non_registered_beekeeper' && (
          <div className="p-3.5 rounded-xl bg-gradient-to-br from-[#FFF9E8] to-[#FFF3D1] border border-[#F6E7A1]">
            <p className="text-xs font-bold text-[#8C6B1F]">National Registry</p>
            <p className="text-[11px] text-[#555] mt-1 leading-relaxed">
              Verify with Madhukranti SSO to unlock traceability and government quality certification.
            </p>
            <button
              onClick={() => setIsMadhukrantiModalOpen(true)}
              className="mt-2.5 w-full py-2 px-3 rounded-lg bg-[#D9A441] hover:bg-[#C28E30] text-[#20221F] text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Launch Madhukranti SSO
            </button>
          </div>
        )}

        {/* Navigation List */}
        <div>
          <p className="text-[10px] font-bold tracking-wider text-[#9E988A] uppercase px-3 mb-2">
            {currentRole.replace('_', ' ')} Navigation
          </p>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.id === 'assistant') {
                      setIsChatbotOpen(true);
                    } else if (item.id === 'madhukranti_sso') {
                      setIsMadhukrantiModalOpen(true);
                    } else {
                      setActiveTab(item.id);
                    }
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#FFF8E6] text-[#8C6B1F] border border-[#F6E7A1] shadow-2xs font-bold'
                      : 'text-[#5A554A] hover:bg-[#FAF7EF] hover:text-[#20221F] border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-mono-num font-bold px-2 py-0.5 rounded-full ${
                        item.badge === 'Live' || item.badge === 'AI'
                          ? 'bg-[#EBF5E9] text-[#2E6930] border border-[#CDE5C8]'
                          : item.badge.includes('Flags')
                          ? 'bg-rose-100 text-rose-700 border border-rose-200'
                          : 'bg-[#F2ECE0] text-[#6E685C]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Footer Info Box & User Session */}
      <div className="space-y-2">
        <div className="p-3 rounded-2xl bg-[#FCFBF7] border border-[#ECE6D8] text-[11px] text-[#7A7467] space-y-1.5">
          <div className="flex items-center justify-between font-bold text-[#20221F]">
            <span className="truncate max-w-[140px]">{currentUser?.name || 'Verified User'}</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[#8C6B1F] font-mono-num font-semibold uppercase">
              {currentRole.replace('_', ' ')}
            </span>
            <button
              onClick={() => logout()}
              className="text-[10px] text-rose-600 hover:text-rose-800 font-bold hover:underline flex items-center gap-1"
            >
              <LogOut className="w-3 h-3" />
              Sign Out
            </button>
          </div>
        </div>

        <div className="p-2 rounded-xl bg-[#FAF7EF] border border-[#EAE3D2] text-[10px] text-[#888] text-center">
          NBHM • FSSAI • Madhukranti Mesh
        </div>
      </div>
    </aside>
  );
};
