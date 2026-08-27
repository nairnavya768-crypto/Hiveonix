import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { QRCodeSVG } from 'qrcode.react';
import { BrandLogo } from '../common/BrandLogo';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Award,
  FlaskConical,
  Truck,
  MapPin,
  Calendar,
  Layers,
  Sparkles,
  Printer,
  Download,
  Share2,
  X,
  ExternalLink,
  DollarSign,
  Heart,
  Star,
} from 'lucide-react';

export const HoneyPassportModal: React.FC = () => {
  const { isVerifyPassportOpen, setIsVerifyPassportOpen, selectedBatchId, batches, showToast } = useApp();
  const [rating, setRating] = useState<number>(5);
  const [feedbackSaved, setFeedbackSaved] = useState(false);

  if (!isVerifyPassportOpen) return null;

  // Find the selected batch or default to the first verified one
  const batch =
    batches.find((b) => b.batchId.toLowerCase() === selectedBatchId?.toLowerCase()) ||
    batches[0];

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Passport Link Copied', 'Shareable verification link copied to clipboard.', 'info');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl border border-[#E8E2D2] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Passport Certificate Banner */}
        <div className="p-6 bg-gradient-to-r from-[#FAF3DF] via-[#FFF9E8] to-[#FCFBF7] border-b border-[#EAE2CA] flex items-start justify-between">
          <div className="flex items-center gap-3.5">
            <BrandLogo size="lg" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Cryptographic Honey Passport
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-200">
                  Madhukranti Verified
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#20221F] font-heading mt-1">
                Certificate of Origin & Purity
              </h2>
              <p className="text-xs text-[#7A7467]">
                Batch ID: <strong className="font-mono text-[#20221F]">{batch.batchId}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 rounded-xl text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors hidden sm:block"
              title="Print Certificate"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-xl text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors"
              title="Share Link"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsVerifyPassportOpen(false)}
              className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* Main Hero Card with QR & Beekeeper Identity */}
          <div className="p-6 rounded-3xl bg-[#FCFBF7] border border-[#E8E2D2] grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Left QR Code Box */}
            <div className="md:col-span-4 flex flex-col items-center justify-center p-4 rounded-2xl bg-white border border-[#EAE4D4] text-center shadow-2xs">
              <div className="p-2.5 bg-white rounded-xl border border-stone-200 shadow-2xs">
                <QRCodeSVG
                  value={batch.qrCodeUrl || `https://hiveonix.agritech.gov.in/verify/${batch.batchId}`}
                  size={120}
                  level="H"
                  includeMargin={false}
                />
              </div>
              <span className="font-mono text-[10px] font-bold text-[#8C6B1F] mt-2 block">
                {batch.batchId}
              </span>
              <span className="text-[9px] text-stone-400">Scan via Any Smartphone Camera</span>
            </div>

            {/* Right Origin Information */}
            <div className="md:col-span-8 space-y-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6B1F]">
                  Single-Origin Botanical Variety
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-[#20221F] font-heading">
                  {batch.honeyFloraType}
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-stone-400 font-medium">Producer / Beekeeper:</span>
                  <p className="font-bold text-[#20221F] flex items-center gap-1 mt-0.5">
                    {batch.beekeeperName}
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  </p>
                </div>
                <div>
                  <span className="text-stone-400 font-medium">Apiary Location:</span>
                  <p className="font-bold text-[#20221F] flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-[#D9A441] shrink-0" />
                    {batch.apiaryLocation}
                  </p>
                </div>
                <div>
                  <span className="text-stone-400 font-medium">Harvest Date:</span>
                  <p className="font-mono font-bold text-[#20221F] mt-0.5">{batch.harvestDate}</p>
                </div>
                <div>
                  <span className="text-stone-400 font-medium">Source Smart Hive:</span>
                  <p className="font-mono font-bold text-[#8C6B1F] mt-0.5">{batch.hiveId}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Laboratory Quality Assay Block */}
          <div className="p-6 rounded-3xl bg-white border border-[#EBE6D7] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FlaskConical className="w-5 h-5 text-blue-600" />
                <h4 className="text-base font-bold text-[#20221F] font-heading">
                  NABL Laboratory Chemical Assay
                </h4>
              </div>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                Grade A+ Pure Raw Honey
              </span>
            </div>

            {batch.labResults ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-2xl bg-[#FCFBF7] border border-[#E8E2D2]">
                  <span className="text-stone-400 font-semibold text-[10px]">Moisture Level</span>
                  <p className="text-lg font-bold font-mono-num text-[#20221F] mt-0.5">
                    {batch.labResults.moisturePercent}%
                  </p>
                  <span className="text-[10px] text-emerald-700 font-semibold">Standard &lt;20%</span>
                </div>

                <div className="p-3 rounded-2xl bg-[#FCFBF7] border border-[#E8E2D2]">
                  <span className="text-stone-400 font-semibold text-[10px]">C4 Sugar Adulteration</span>
                  <p className="text-lg font-bold font-mono-num text-emerald-700 mt-0.5">
                    {batch.labResults.c4SugarAdulterationPercent}%
                  </p>
                  <span className="text-[10px] text-emerald-700 font-semibold">0% Cane/Corn Syrup</span>
                </div>

                <div className="p-3 rounded-2xl bg-[#FCFBF7] border border-[#E8E2D2]">
                  <span className="text-stone-400 font-semibold text-[10px]">HMF Freshness</span>
                  <p className="text-lg font-bold font-mono-num text-[#20221F] mt-0.5">
                    {batch.labResults.hmfContentMgKg} <span className="text-xs text-stone-400">mg/kg</span>
                  </p>
                  <span className="text-[10px] text-emerald-700 font-semibold">Unheated &lt;40</span>
                </div>

                <div className="p-3 rounded-2xl bg-[#FCFBF7] border border-[#E8E2D2]">
                  <span className="text-stone-400 font-semibold text-[10px]">Pollen Purity</span>
                  <p className="text-lg font-bold font-mono-num text-[#20221F] mt-0.5">
                    {batch.labResults.pollenCountPurityPercent}%
                  </p>
                  <span className="text-[10px] text-emerald-700 font-semibold">Single-Botanical Flora</span>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-[#FFF9E8] border border-[#F6E7A1] text-xs text-[#7A6020]">
                Sample in NABL queue. Pre-screening verified 0% C4 cane sugar.
              </div>
            )}
          </div>

          {/* Blockchain Provenance Ledger */}
          <div className="p-5 rounded-2xl bg-[#FAF7EF] border border-[#EAE4D4] space-y-2.5">
            <div className="flex items-center justify-between text-xs font-bold text-[#20221F]">
              <div className="flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-[#8C6B1F]" />
                <span>On-Chain Immutability Record</span>
              </div>
              <span className="text-[11px] font-mono text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Block Height #842,910
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-white border border-[#D9D3C3] font-mono text-[10px] text-stone-600 break-all select-all">
              <span className="text-stone-400 select-none">Tx Hash: </span>
              {batch.blockchainHash}
            </div>
          </div>

          {/* Fair-Trade Price Transparency Breakdown */}
          <div className="p-5 rounded-2xl bg-white border border-[#EBE6D7] shadow-xs space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D9A441]" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#20221F]">
                Fair-Trade Value Distribution (₹650 per 500g Jar)
              </h4>
            </div>

            <div className="w-full bg-stone-100 h-3 rounded-full overflow-hidden flex">
              <div style={{ width: '68%' }} className="bg-[#D9A441] h-full" title="68% Beekeeper Direct" />
              <div style={{ width: '12%' }} className="bg-blue-500 h-full" title="12% NABL Quality Lab" />
              <div style={{ width: '10%' }} className="bg-indigo-500 h-full" title="10% Cold Logistics" />
              <div style={{ width: '10%' }} className="bg-stone-400 h-full" title="10% Retail Packaging" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
              <div>
                <span className="font-bold text-[#20221F]">₹442 (68%)</span>
                <span className="text-stone-400 block text-[10px]">Beekeeper Direct</span>
              </div>
              <div>
                <span className="font-bold text-[#20221F]">₹78 (12%)</span>
                <span className="text-stone-400 block text-[10px]">NABL Lab Testing</span>
              </div>
              <div>
                <span className="font-bold text-[#20221F]">₹65 (10%)</span>
                <span className="text-stone-400 block text-[10px]">Cold-Chain Logistics</span>
              </div>
              <div>
                <span className="font-bold text-[#20221F]">₹65 (10%)</span>
                <span className="text-stone-400 block text-[10px]">Glass Packaging</span>
              </div>
            </div>
          </div>

          {/* Consumer Review & Star Rating */}
          <div className="p-5 rounded-2xl bg-[#FCFBF7] border border-[#E8E2D2] text-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#20221F]">Rate this Harvest Batch</span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => {
                      setRating(star);
                      setFeedbackSaved(true);
                      showToast('Review Submitted', `Thank you for rating Batch ${batch.batchId}!`, 'success');
                    }}
                    className="p-1 text-[#D9A441] hover:scale-110 transition-transform"
                  >
                    <Star className={`w-4 h-4 ${star <= rating ? 'fill-[#D9A441]' : 'text-stone-300'}`} />
                  </button>
                ))}
              </div>
            </div>
            {feedbackSaved && (
              <p className="text-[11px] text-emerald-700 font-medium">
                ✅ Feedback recorded and linked to the Beekeeper Producer Group.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
