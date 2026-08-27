import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Lock,
  Box,
  FileCheck2,
  TrendingUp,
  Award,
  CheckCircle2,
} from 'lucide-react';

export const NonRegisteredDashboard: React.FC = () => {
  const { setIsMadhukrantiModalOpen } = useApp();

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      {/* Hero Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-br from-[#FFF9E8] via-[#FCFBF7] to-white border-2 border-[#D9A441] shadow-lg relative overflow-hidden space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#F6E7A1] border border-[#D9A441] flex items-center justify-center shadow-xs">
              <ShieldAlert className="w-6 h-6 text-[#8C6B1F]" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                Non-Registered Beekeeper Mode
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#20221F] font-heading mt-1">
                Link with Madhukranti National Registry
              </h1>
            </div>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[#555] leading-relaxed max-w-2xl">
          You are currently in guest / unverified mode. To connect IoT hive sensors, submit honey batches for accredited NABL laboratory testing, and mint blockchain-verified consumer QR passports, please complete the seamless Madhukranti SSO authentication.
        </p>

        {/* CTA Button */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={() => setIsMadhukrantiModalOpen(true)}
            className="px-6 py-3.5 rounded-2xl bg-[#20221F] hover:bg-[#343831] text-white text-xs font-bold shadow-lg transition-all flex items-center gap-2"
          >
            <ShieldCheck className="w-4 h-4 text-[#F6E7A1]" />
            <span>Authenticate via Madhukranti Portal (Simulated SSO)</span>
            <ArrowRight className="w-4 h-4 text-[#F6E7A1]" />
          </button>
        </div>
      </div>

      {/* Feature Comparison Matrix */}
      <div className="p-6 rounded-3xl bg-white border border-[#EBE6D7] shadow-xs space-y-6">
        <h2 className="text-lg font-bold text-[#20221F] font-heading">
          Benefits of National Madhukranti Registration
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-[#FCFBF7] border border-[#E8E2D2] space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#FFF8E6] border border-[#F6E7A1] flex items-center justify-center">
              <Box className="w-5 h-5 text-[#8C6B1F]" />
            </div>
            <h3 className="text-sm font-bold text-[#20221F]">IoT Smart Hive Telemetry</h3>
            <p className="text-xs text-[#666] leading-relaxed">
              Automatic internal temperature, weight load-cell, and acoustic frequency monitoring with LoRaWAN sync.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#FCFBF7] border border-[#E8E2D2] space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#FFF8E6] border border-[#F6E7A1] flex items-center justify-center">
              <FileCheck2 className="w-5 h-5 text-[#8C6B1F]" />
            </div>
            <h3 className="text-sm font-bold text-[#20221F]">NABL Lab Quality Certs</h3>
            <p className="text-xs text-[#666] leading-relaxed">
              Official testing for C4 sugar adulteration, moisture %, HMF levels, and direct export clearance.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#FCFBF7] border border-[#E8E2D2] space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#FFF8E6] border border-[#F6E7A1] flex items-center justify-center">
              <Award className="w-5 h-5 text-[#8C6B1F]" />
            </div>
            <h3 className="text-sm font-bold text-[#20221F]">Consumer Honey Passports</h3>
            <p className="text-xs text-[#666] leading-relaxed">
              Blockchain-anchored QR codes printed on jars showing verifiable authenticity and fair-trade farmer prices.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
