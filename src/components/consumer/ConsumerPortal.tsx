import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { HoneyPassportModal } from './HoneyPassportModal';
import { QRCodeSVG } from 'qrcode.react';
import { BrandLogo } from '../common/BrandLogo';
import {
  QrCode,
  Search,
  ShieldCheck,
  Award,
  Sparkles,
  MapPin,
  CheckCircle2,
  Camera,
  ArrowRight,
  ExternalLink,
  Flame,
  Leaf,
  Layers,
  FlaskConical,
  HeartHandshake,
  AlertTriangle,
  Scale,
  Compass,
  FileCheck2,
} from 'lucide-react';

export const ConsumerPortal: React.FC = () => {
  const { batches, activeTab, setActiveTab, setSelectedBatchId, setIsVerifyPassportOpen, setIsBlockchainModalOpen } = useApp();
  const [searchInput, setSearchInput] = useState('');
  const [isScanning, setIsScanning] = useState(false);

  const handleScanSample = (batchId: string) => {
    setSelectedBatchId(batchId);
    setIsVerifyPassportOpen(true);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    setSelectedBatchId(searchInput.trim());
    setIsVerifyPassportOpen(true);
  };

  // 1. WHY TRACEABILITY MATTERS VIEW
  if (activeTab === 'how_it_works') {
    return (
      <div className="max-w-5xl mx-auto space-y-10 py-2 animate-in fade-in duration-200">
        {/* Hero */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#FFF9E8] via-[#FCFBF7] to-white border-2 border-[#D9A441] shadow-lg text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-[#F6E7A1] border border-[#D9A441] flex items-center justify-center mx-auto shadow-xs">
            <Compass className="w-7 h-7 text-[#8C6B1F]" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#FFF8E6] text-[#8C6B1F] border border-[#F6E7A1]">
            Consumer Education & Purity Standards
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#20221F] font-heading">
            Why Honey Traceability Matters
          </h1>
          <p className="text-xs sm:text-sm text-[#666] max-w-2xl mx-auto leading-relaxed">
            Over 70% of commercial supermarket honey fails advanced Nuclear Magnetic Resonance (NMR) testing due to synthetic C4 rice/corn sugar adulteration. Hiveonix connects every jar directly to the hive.
          </p>
        </div>

        {/* 4 Key Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pillar 1: Sugar Adulteration */}
          <div className="p-6 rounded-3xl bg-white border border-[#EBE6D7] shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center">
              <FlaskConical className="w-5 h-5 text-rose-600" />
            </div>
            <h2 className="text-base font-bold text-[#20221F] font-heading">Zero Synthetic Sugars (C3 & C4 Tested)</h2>
            <p className="text-xs text-[#666] leading-relaxed">
              Industrial honey is frequently diluted with inverted sugar syrups designed to evade basic laboratory tests. Hiveonix mandates NABL NMR profiling and SIRA (Stable Isotope Ratio Analysis) with a strict 0.0% tolerance.
            </p>
            <div className="p-3 rounded-2xl bg-[#FCFBF7] border border-[#E8E2D2] text-[11px] text-[#555]">
              <strong>Standard Mandate:</strong> FSSAI & NABL certified C4 sugar ratio must be exactly 0.0%.
            </div>
          </div>

          {/* Pillar 2: Raw vs Ultra-Heated Honey */}
          <div className="p-6 rounded-3xl bg-white border border-[#EBE6D7] shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center">
              <Flame className="w-5 h-5 text-amber-600" />
            </div>
            <h2 className="text-base font-bold text-[#20221F] font-heading">Preserving Living Enzymes & Pollen</h2>
            <p className="text-xs text-[#666] leading-relaxed">
              Commercial honey is often pasteurized at &gt;70°C, destroying beneficial diastase enzymes and bioflavonoids. Hiveonix raw honey is cold-extracted and cold-chain transported to keep HMF levels strictly below 40 mg/kg.
            </p>
            <div className="p-3 rounded-2xl bg-[#FCFBF7] border border-[#E8E2D2] text-[11px] text-[#555]">
              <strong>Enzyme Retention:</strong> Natural active invertase & diastase preserved from pristine forest flora.
            </div>
          </div>

          {/* Pillar 3: Beekeeper Livelihoods */}
          <div className="p-6 rounded-3xl bg-white border border-[#EBE6D7] shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center">
              <HeartHandshake className="w-5 h-5 text-emerald-600" />
            </div>
            <h2 className="text-base font-bold text-[#20221F] font-heading">100% Fair-Trade Beekeeper Value</h2>
            <p className="text-xs text-[#666] leading-relaxed">
              By removing predatory intermediaries, 75%+ of the consumer price flows directly to indigenous tribal and smallholder beekeepers registered with the National Honey Mission.
            </p>
            <div className="p-3 rounded-2xl bg-[#FCFBF7] border border-[#E8E2D2] text-[11px] text-[#555]">
              <strong>Direct Benefit:</strong> Direct bank transfer verified via Madhukranti & KVK clusters.
            </div>
          </div>

          {/* Pillar 4: Blockchain Proof */}
          <div className="p-6 rounded-3xl bg-white border border-[#EBE6D7] shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center">
              <Layers className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-base font-bold text-[#20221F] font-heading">Immutable Cryptographic Audit Trail</h2>
            <p className="text-xs text-[#666] leading-relaxed">
              From the exact GPS coordinates of the hive box, through NABL lab signature timestamps, to the jar QR code — every step is anchored in a tamper-proof blockchain ledger.
            </p>
            <div className="p-3 rounded-2xl bg-[#FCFBF7] border border-[#E8E2D2] text-[11px] text-[#555]">
              <strong>Tamper Proof:</strong> Any altered record or QR clone is automatically rejected by the network.
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="p-6 rounded-3xl bg-[#20221F] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-[#F6E7A1]">Ready to test your honey jar?</h3>
            <p className="text-xs text-stone-300">Scan or enter the serialized batch ID on your packaging.</p>
          </div>
          <button
            onClick={() => setActiveTab('verify_honey')}
            className="px-5 py-2.5 rounded-xl bg-[#D9A441] hover:bg-[#C28E30] text-[#20221F] text-xs font-bold transition-colors shrink-0 flex items-center gap-1.5"
          >
            <QrCode className="w-4 h-4" />
            <span>Verify A Honey Passport</span>
          </button>
        </div>
      </div>
    );
  }

  // 2. VERIFIED JARS HISTORY VIEW
  if (activeTab === 'my_scans') {
    return (
      <div className="max-w-5xl mx-auto space-y-8 py-2 animate-in fade-in duration-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                Verified Consumer History
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#20221F] font-heading mt-1.5">
              My Scanned Honey Jars
            </h1>
            <p className="text-xs sm:text-sm text-[#7A7467] mt-0.5">
              Saved passports, lab certificates, and origin stories for your verified pure honey bottles.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('verify_honey')}
            className="px-4 py-2.5 rounded-xl bg-[#20221F] hover:bg-[#343831] text-white text-xs font-bold transition-colors flex items-center gap-2"
          >
            <QrCode className="w-4 h-4 text-[#F6E7A1]" />
            <span>Scan New Jar</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {batches.slice(0, 4).map((batch) => (
            <div
              key={batch.batchId}
              onClick={() => handleScanSample(batch.batchId)}
              className="p-6 rounded-3xl bg-white border border-[#EBE6D7] shadow-xs hover:border-[#D9A441] transition-all cursor-pointer space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-xs font-bold text-[#8C6B1F] px-2 py-0.5 rounded-md bg-[#FFF8E6] border border-[#F6E7A1]">
                    {batch.batchId}
                  </span>
                  <h3 className="text-base font-bold text-[#20221F] mt-1">{batch.honeyFloraType}</h3>
                  <p className="text-xs text-[#7A7467]">{batch.apiaryLocation}</p>
                </div>
                <div className="text-right">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    ✓ Authenticated
                  </span>
                  <span className="text-[10px] text-stone-400 block mt-1">Scanned 2 days ago</span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-[#FAF7EF] border border-[#EAE3D2] text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-stone-400">Purity Score:</span>
                  <strong className="text-emerald-700">100% Raw • 0.0% C4 Sugar</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Beekeeper:</span>
                  <strong className="text-[#20221F]">{batch.beekeeperName}</strong>
                </div>
              </div>

              <div className="flex items-center justify-end text-xs font-bold text-[#8C6B1F] gap-1">
                <span>View Full Certificate</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 3. BLOCKCHAIN EXPLORER VIEW
  if (activeTab === 'blockchain') {
    return (
      <div className="max-w-5xl mx-auto space-y-8 py-2 animate-in fade-in duration-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                Public Transparency Ledger
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#20221F] font-heading mt-1.5">
              Public Blockchain Explorer
            </h1>
            <p className="text-xs sm:text-sm text-[#7A7467] mt-0.5">
              Every jar is verified against a decentralized Proof-of-Purity ledger.
            </p>
          </div>

          <button
            onClick={() => setIsBlockchainModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-[#20221F] hover:bg-[#343831] text-white text-xs font-bold transition-colors flex items-center gap-2"
          >
            <Layers className="w-4 h-4 text-[#F6E7A1]" />
            <span>Launch Full Ledger Modal</span>
          </button>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-[#EBE6D7] shadow-xs space-y-4">
          <h2 className="text-base font-bold text-[#20221F] font-heading">Recent On-Chain Purity Mint Transactions</h2>
          <div className="space-y-3">
            {batches.map((b) => (
              <div key={b.batchId} className="p-4 rounded-2xl bg-[#FCFBF7] border border-[#E8E2D2] text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-[#8C6B1F]">Batch {b.batchId}</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-mono text-[10px] font-bold">
                    Block #849120
                  </span>
                </div>
                <p className="text-[#444]">
                  Certified {b.honeyFloraType} ({b.quantityKg} kg) by <strong>{b.labResults?.testedByLab || 'NABL Lab'}</strong>
                </p>
                <div className="flex items-center justify-between text-[10px] font-mono text-stone-400 pt-1 border-t border-[#EFE8D8]">
                  <span>Tx: {b.blockchainHash || '0x7e8b912a4f...'}</span>
                  <span>Gas: 0.0021 HVX</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 4. DEFAULT: VERIFY HONEY PASSPORT VIEW
  return (
    <div className="max-w-5xl mx-auto space-y-10 py-2 animate-in fade-in duration-200">
      {/* Consumer Hero & QR Scanner Gate */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#FFF9E8] via-[#FCFBF7] to-white border-2 border-[#D9A441] shadow-xl text-center space-y-6 relative overflow-hidden">
        <div className="flex justify-center">
          <div className="p-1 rounded-full bg-gradient-to-b from-[#F6E7A1]/80 via-[#D9A441]/40 to-transparent shadow-md hover:scale-105 transition-transform duration-200">
            <BrandLogo size="lg" />
          </div>
        </div>

        <div className="max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#FFF8E6] text-[#8C6B1F] border border-[#F6E7A1]">
            Consumer Honey Authentication Gateway
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#20221F] font-heading">
            Verify Your Honey's Purity & Origin
          </h1>
          <p className="text-xs sm:text-sm text-[#666] leading-relaxed">
            Scan the QR code printed on your honey jar or enter the batch code below to view NABL lab tests, hive sensor telemetry, and fair-trade beekeeper provenance.
          </p>
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSearchSubmit} className="max-w-md mx-auto flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="e.g. HVX-2026-KER-004821"
              className="w-full pl-10 pr-4 py-3 rounded-2xl border border-[#D9D3C3] text-xs font-mono font-bold focus:border-[#D9A441] bg-white shadow-xs"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-3 rounded-2xl bg-[#20221F] hover:bg-[#343831] text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5 shrink-0"
          >
            <span>Verify</span>
            <ArrowRight className="w-4 h-4 text-[#F6E7A1]" />
          </button>
        </form>

        {/* Camera Scanner Simulation Trigger */}
        <div className="pt-2">
          <button
            onClick={() => setIsScanning(!isScanning)}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#8C6B1F] hover:text-[#20221F] transition-colors"
          >
            <Camera className="w-4 h-4" />
            <span>{isScanning ? 'Close Camera Viewfinder' : 'Open Smartphone Camera Viewfinder'}</span>
          </button>
        </div>

        {/* Simulated Camera Viewfinder */}
        {isScanning && (
          <div className="max-w-sm mx-auto p-6 rounded-3xl bg-[#20221F] text-white space-y-4 animate-in fade-in duration-200">
            <div className="relative h-48 rounded-2xl border-2 border-dashed border-[#F6E7A1] flex items-center justify-center overflow-hidden bg-black/40">
              <div className="w-32 h-32 border-2 border-[#D9A441] rounded-xl flex items-center justify-center animate-pulse">
                <span className="text-[10px] text-[#F6E7A1] font-mono">Align QR Code</span>
              </div>
              <div className="absolute inset-x-0 top-1/2 h-0.5 bg-rose-500/80 animate-ping" />
            </div>
            <p className="text-[11px] text-stone-300">Point lens at printed seal on lid or label.</p>
            <button
              onClick={() => handleScanSample(batches[0].batchId)}
              className="w-full py-2.5 rounded-xl bg-[#D9A441] text-[#20221F] text-xs font-bold hover:bg-[#C28E30] transition-colors"
            >
              Simulate Detected QR Scan
            </button>
          </div>
        )}
      </div>

      {/* Verified Single-Origin Honey Batch Showcase */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-[#20221F] font-heading">
              Certified Single-Origin Honey Showcase
            </h2>
            <p className="text-xs text-[#7A7467]">Click on any certified batch to inspect its full digital passport</p>
          </div>
          <span className="text-xs font-mono font-bold text-[#8C6B1F] px-3 py-1 rounded-full bg-[#FFF8E6] border border-[#F6E7A1]">
            100% NABL Verified
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {batches.map((batch) => (
            <div
              key={batch.batchId}
              onClick={() => handleScanSample(batch.batchId)}
              className="p-6 rounded-3xl bg-white border border-[#EBE6D7] shadow-xs hover:border-[#D9A441] hover:shadow-md transition-all cursor-pointer space-y-4 group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-[10px] font-bold text-[#8C6B1F] px-2 py-0.5 rounded-md bg-[#FFF8E6] border border-[#F6E7A1]">
                    {batch.batchId}
                  </span>
                  <h3 className="text-base font-bold text-[#20221F] mt-1.5 group-hover:text-[#8C6B1F] transition-colors">
                    {batch.honeyFloraType}
                  </h3>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Grade A+
                </span>
              </div>

              <p className="text-xs text-[#666] line-clamp-2 leading-relaxed">{batch.productionNotes}</p>

              <div className="p-3 rounded-2xl bg-[#FCFBF7] border border-[#E8E2D2] text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-stone-400">Beekeeper:</span>
                  <strong className="text-[#20221F] flex items-center gap-1">
                    {batch.beekeeperName} <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  </strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-400">Origin:</span>
                  <span className="text-[#555] truncate max-w-[150px]">{batch.apiaryLocation}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 text-xs">
                <span className="font-bold text-[#20221F]">₹650 <span className="text-[10px] text-stone-400 font-normal">/ 500g</span></span>
                <span className="text-xs font-bold text-[#8C6B1F] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>View Passport</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <HoneyPassportModal />
    </div>
  );
};
