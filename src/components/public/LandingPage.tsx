import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { BrandLogo } from '../common/BrandLogo';
import {
  Sparkles,
  QrCode,
  ShieldCheck,
  Search,
  ArrowRight,
  CheckCircle2,
  Layers,
  Cpu,
  FlaskConical,
  Truck,
  HeartHandshake,
  Activity,
  Award,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const { switchRole, setSelectedBatchId, setIsVerifyPassportOpen, setIsMadhukrantiModalOpen } = useApp();
  const [quickBatchInput, setQuickBatchInput] = useState('HVX-2026-KER-004821');

  const handleQuickVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickBatchInput.trim()) {
      setSelectedBatchId(quickBatchInput.trim());
      setIsVerifyPassportOpen(true);
    }
  };

  const steps = [
    {
      step: '01',
      title: 'Smart Hive IoT',
      desc: 'Real-time telemetry: Temperature, acoustic frequency, weight & humidity.',
      icon: <Cpu className="w-5 h-5 text-[#8C6B1F]" />,
      color: 'bg-[#FFF9E8] border-[#F6E7A1]',
    },
    {
      step: '02',
      title: 'AI Colony Health',
      desc: 'Early anomaly detection, Varroa mite risk alerts & yield forecasting.',
      icon: <Sparkles className="w-5 h-5 text-amber-600" />,
      color: 'bg-[#FEF6E6] border-[#FCDDA6]',
    },
    {
      step: '03',
      title: 'NABL Lab Testing',
      desc: 'NMR profile, C4 adulteration check, HMF & pollen purity certification.',
      icon: <FlaskConical className="w-5 h-5 text-indigo-600" />,
      color: 'bg-[#F2EEFB] border-[#DCDEF8]',
    },
    {
      step: '04',
      title: 'Blockchain Ledger',
      desc: 'Immutable audit trail of origin, harvest geo-coordinates & batch seals.',
      icon: <Layers className="w-5 h-5 text-emerald-600" />,
      color: 'bg-[#EBF7EE] border-[#CBEAD2]',
    },
    {
      step: '05',
      title: 'Cold Logistics',
      desc: 'Tamper-evident transport tracking from apiary to regional hub.',
      icon: <Truck className="w-5 h-5 text-blue-600" />,
      color: 'bg-[#EEF5FD] border-[#CDE1F9]',
    },
    {
      step: '06',
      title: 'Honey Passport QR',
      desc: 'Consumer scans bottle to verify lab certificates, apiary & harvest date.',
      icon: <QrCode className="w-5 h-5 text-[#8C6B1F]" />,
      color: 'bg-[#FFF8E6] border-[#F6E7A1]',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FCFBF7] text-[#20221F] selection:bg-[#F6E7A1]">
      {/* Top Banner: National Beekeeping Mission Notice */}
      <div className="bg-[#FAF4E4] border-b border-[#EDE3CA] py-2 px-4 text-center text-xs text-[#6B5A33]">
        <span className="font-semibold">National Mission on Honey & Pollination (NBHM)</span> — Integrated with Madhukranti SSO & NABL Laboratories.
      </div>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          {/* Centered Brand Emblem Badge */}
          <div className="flex justify-center mb-5">
            <div className="p-1 rounded-full bg-gradient-to-b from-[#F6E7A1]/80 via-[#D9A441]/40 to-transparent shadow-lg hover:scale-105 transition-transform duration-300">
              <BrandLogo size="lg" />
            </div>
          </div>

          {/* Subtle Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF9E8] border border-[#F6E7A1] text-xs font-bold text-[#8C6B1F] mb-6 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#D9A441] animate-pulse" />
            From Hive to Trust • NBHM Aligned
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#20221F] font-heading leading-tight">
            Smart Beekeeping. <br />
            <span className="bg-gradient-to-r from-[#9A6B1F] via-[#D9A441] to-[#9A6B1F] bg-clip-text text-transparent">
              Verified Honey.
            </span>{' '}
            Complete Traceability.
          </h1>

          <p className="mt-6 text-base sm:text-lg text-[#5A5549] leading-relaxed max-w-2xl mx-auto">
            Connecting every step of the honey journey — from hive health and production intelligence to laboratory verification, cold-chain logistics, and consumer trust.
          </p>

          {/* Call to Actions */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={onGetStarted}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#20221F] hover:bg-[#383C35] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 group"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 text-[#F6E7A1] group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => setIsVerifyPassportOpen(true)}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#FFF9E8] hover:bg-[#FFF3D1] text-[#8C6B1F] border border-[#F6E7A1] font-bold text-sm shadow-2xs transition-all flex items-center justify-center gap-2"
            >
              <QrCode className="w-4 h-4 text-[#D9A441]" />
              <span>Verify Honey Passport</span>
            </button>
          </div>

          {/* Quick Instant Batch Verification Bar */}
          <div className="mt-10 max-w-xl mx-auto p-2 rounded-2xl bg-white border border-[#E8E2D2] shadow-lg">
            <form onSubmit={handleQuickVerify} className="flex items-center gap-2">
              <div className="pl-3 text-stone-400">
                <Search className="w-4 h-4 text-[#D9A441]" />
              </div>
              <input
                type="text"
                value={quickBatchInput}
                onChange={(e) => setQuickBatchInput(e.target.value)}
                placeholder="Enter Batch ID (e.g. HVX-2026-KER-004821)"
                className="flex-1 bg-transparent border-none py-2 text-xs sm:text-sm font-mono-num text-[#20221F] focus:outline-hidden placeholder:text-stone-400"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#F6E7A1] hover:bg-[#EACF72] text-[#20221F] text-xs font-bold transition-colors shrink-0"
              >
                Inspect
              </button>
            </form>
            <div className="flex items-center justify-between px-3 pt-2 text-[11px] text-[#7A7467]">
              <span>Try sample: <strong className="font-mono text-[#20221F]">HVX-2026-KER-004821</strong> (Wayanad Shola)</span>
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> NABL Verified
              </span>
            </div>
          </div>
        </div>

        {/* Live Step Pipeline Visualizer */}
        <div className="mt-16 sm:mt-20">
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-[#20221F] font-heading">The End-to-End Honey Quality Pipeline</h2>
            <p className="text-xs text-[#7A7467] mt-1">Zero Blind Spots: From Forest Apiaries to Kitchen Tables</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3.5">
            {steps.map((item, idx) => (
              <div
                key={item.step}
                className={`p-4 rounded-2xl border ${item.color} bg-white shadow-2xs hover:shadow-md transition-all flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono-num font-bold text-stone-400">{item.step}</span>
                    <div className="w-8 h-8 rounded-xl bg-[#FCFBF7] border border-stone-200/60 flex items-center justify-center">
                      {item.icon}
                    </div>
                  </div>
                  <h3 className="text-xs font-bold text-[#20221F] font-heading">{item.title}</h3>
                  <p className="text-[11px] text-[#666] mt-1 leading-relaxed">{item.desc}</p>
                </div>
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block pt-3 text-right">
                    <ChevronRight className="w-3.5 h-3.5 text-stone-300 inline" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ecosystem Statistics */}
      <section className="bg-white border-y border-[#EAE4D4] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div className="p-4">
            <p className="text-3xl sm:text-4xl font-extrabold font-mono-num text-[#20221F]">1,420+</p>
            <p className="text-xs font-semibold text-[#7A7467] uppercase tracking-wider mt-1">Certified Beekeepers</p>
            <p className="text-[11px] text-stone-400 mt-0.5">Madhukranti & KVK Verified</p>
          </div>
          <div className="p-4">
            <p className="text-3xl sm:text-4xl font-extrabold font-mono-num text-[#20221F]">14,800+</p>
            <p className="text-xs font-semibold text-[#7A7467] uppercase tracking-wider mt-1">Smart Hives Monitored</p>
            <p className="text-[11px] text-stone-400 mt-0.5">Continuous IoT Telemetry</p>
          </div>
          <div className="p-4">
            <p className="text-3xl sm:text-4xl font-extrabold font-mono-num text-[#20221F]">99.8%</p>
            <p className="text-xs font-semibold text-[#7A7467] uppercase tracking-wider mt-1">Quality Purity Index</p>
            <p className="text-[11px] text-stone-400 mt-0.5">NABL Lab Multi-Parameter Test</p>
          </div>
          <div className="p-4">
            <p className="text-3xl sm:text-4xl font-extrabold font-mono-num text-emerald-700">0.0%</p>
            <p className="text-xs font-semibold text-[#7A7467] uppercase tracking-wider mt-1">C4 Adulteration Leakage</p>
            <p className="text-[11px] text-stone-400 mt-0.5">Cryptographic Tamper Seals</p>
          </div>
        </div>
      </section>

      {/* Role Navigation Quick Explorer for Hackathon Reviewers */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#20221F] font-heading">
            Explore All 6 Stakeholder Dashboards
          </h2>
          <p className="text-xs sm:text-sm text-[#7A7467] mt-2">
            Click any stakeholder below to immediately launch their dedicated dashboard with live data.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            onClick={() => switchRole('government')}
            className="p-5 rounded-2xl bg-white border border-[#EAE4D4] hover:border-[#D9A441] shadow-xs hover:shadow-lg transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200">
                National Governance
              </span>
              <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-[#D9A441] group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-base font-bold text-[#20221F]">Government & KVK Admin</h3>
            <p className="text-xs text-[#666] mt-1.5 leading-relaxed">
              Interactive India disease risk map, counterfeit scan radar, beekeeper KYC directory & national yield benchmarks.
            </p>
          </div>

          <div
            onClick={() => switchRole('beekeeper')}
            className="p-5 rounded-2xl bg-white border border-[#EAE4D4] hover:border-[#D9A441] shadow-xs hover:shadow-lg transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200">
                Apiary Producer
              </span>
              <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-[#D9A441] group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-base font-bold text-[#20221F]">Registered Beekeeper</h3>
            <p className="text-xs text-[#666] mt-1.5 leading-relaxed">
              Live hive sensors, AI disease & acoustic diagnostics, harvest batch creation & flowering calendars.
            </p>
          </div>

          <div
            onClick={() => {
              switchRole('non_registered_beekeeper');
              setIsMadhukrantiModalOpen(true);
            }}
            className="p-5 rounded-2xl bg-gradient-to-br from-[#FFFDF5] to-[#FFF8E6] border border-[#F6E7A1] hover:border-[#D9A441] shadow-xs hover:shadow-lg transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-orange-100 text-orange-800 border border-orange-200">
                Onboarding Flow
              </span>
              <ArrowRight className="w-4 h-4 text-[#D9A441] group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-base font-bold text-[#20221F]">New Beekeeper (Madhukranti SSO)</h3>
            <p className="text-xs text-[#666] mt-1.5 leading-relaxed">
              Interactive 4-step Madhukranti SSO simulation, Aadhaar KYC verification & first hive registration.
            </p>
          </div>

          <div
            onClick={() => switchRole('lab')}
            className="p-5 rounded-2xl bg-white border border-[#EAE4D4] hover:border-[#D9A441] shadow-xs hover:shadow-lg transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200">
                Quality Authority
              </span>
              <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-[#D9A441] group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-base font-bold text-[#20221F]">NABL Testing Laboratory</h3>
            <p className="text-xs text-[#666] mt-1.5 leading-relaxed">
              Pending batch testing queue, NMR and C4 inverted sugar parameter entry, and cryptographic certificate issuance.
            </p>
          </div>

          <div
            onClick={() => switchRole('logistics')}
            className="p-5 rounded-2xl bg-white border border-[#EAE4D4] hover:border-[#D9A441] shadow-xs hover:shadow-lg transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                Supply Chain
              </span>
              <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-[#D9A441] group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-base font-bold text-[#20221F]">Logistics & Cold Transport</h3>
            <p className="text-xs text-[#666] mt-1.5 leading-relaxed">
              Real-time GPS vehicle tracking, temperature logs, tamper alarms, and checkpoint custody handovers.
            </p>
          </div>

          <div
            onClick={() => switchRole('consumer')}
            className="p-5 rounded-2xl bg-white border border-[#EAE4D4] hover:border-[#D9A441] shadow-xs hover:shadow-lg transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                End Consumer
              </span>
              <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-[#D9A441] group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-base font-bold text-[#20221F]">Consumer & Honey Passport</h3>
            <p className="text-xs text-[#666] mt-1.5 leading-relaxed">
              Scan serialized QR codes, view lab purity certificates, trace the farmer’s apiary, and verify blockchain proof.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#20221F] text-stone-400 py-12 px-4 sm:px-6 lg:px-8 border-t border-stone-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <BrandLogo size="md" showText={true} showTagline={true} theme="dark" />
          <div className="text-xs text-center sm:text-right text-stone-400 space-y-1">
            <p>Built for National Beekeeping & Honey Mission (NBHM) Standards</p>
            <p className="text-stone-500">© 2026 Hiveonix Technologies. FSSAI & Codex Compliant.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
