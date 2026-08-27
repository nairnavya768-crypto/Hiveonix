import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { HoneyBatch, LabTestResults } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { KPICard } from '../common/KPICard';
import {
  FlaskConical,
  FileCheck2,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Search,
  Layers,
  Award,
  Sparkles,
  QrCode,
  X,
  Send,
  Sliders,
  ShieldCheck,
  Download,
  Calendar,
} from 'lucide-react';

export const LabTechnicianDashboard: React.FC = () => {
  const {
    batches,
    currentUser,
    activeTab,
    setActiveTab,
    certifyBatch,
    setSelectedBatchId,
    setIsVerifyPassportOpen,
    setIsBlockchainModalOpen,
    showToast,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBatchForTest, setSelectedBatchForTest] = useState<HoneyBatch | null>(null);

  // Form State for Lab Testing
  const [moisture, setMoisture] = useState(17.8);
  const [c4Sugar, setC4Sugar] = useState(0.0);
  const [hmf, setHmf] = useState(14.2);
  const [pollenPurity, setPollenPurity] = useState(94);
  const [fructoseGlucoseRatio, setFructoseGlucoseRatio] = useState(1.18);
  const [antibiotics, setAntibiotics] = useState<'negative' | 'trace' | 'positive'>('negative');
  const [heavyMetals, setHeavyMetals] = useState<'passed' | 'failed'>('passed');
  const [notes, setNotes] = useState('Complies with FSSAI & NABL standards for Raw Forest Honey.');

  const filteredBatches = batches.filter(
    (b) =>
      b.batchId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.beekeeperName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.honeyFloraType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pendingBatches = batches.filter((b) => !b.labResults || b.status === 'lab_pending');
  const certifiedBatches = batches.filter((b) => b.labResults && b.status !== 'lab_rejected');

  const handleOpenTestModal = (batch: HoneyBatch) => {
    setSelectedBatchForTest(batch);
    if (batch.labResults) {
      setMoisture(batch.labResults.moisturePercent);
      setC4Sugar(batch.labResults.c4SugarAdulterationPercent);
      setHmf(batch.labResults.hmfContentMgKg);
      setPollenPurity(batch.labResults.pollenCountPurityPercent);
      setFructoseGlucoseRatio(batch.labResults.fructoseGlucoseRatio);
      setAntibiotics(batch.labResults.antibioticResidue);
      setHeavyMetals(batch.labResults.heavyMetals);
      setNotes(batch.labResults.remarks);
    } else {
      setMoisture(18.2);
      setC4Sugar(0.0);
      setHmf(16.0);
      setPollenPurity(92);
      setFructoseGlucoseRatio(1.22);
      setAntibiotics('negative');
      setHeavyMetals('passed');
      setNotes('Pristine unheated wild honey sample. No synthetic sugars or C4 markers detected.');
    }
  };

  const handleSaveLabTest = (pass: boolean) => {
    if (!selectedBatchForTest) return;

    const certId = `NABL-KER-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const testResults: LabTestResults = {
      testedByLab: currentUser.organization || 'National Quality Lab — NABL Accredited',
      labCertificateId: certId,
      testDate: new Date().toISOString().split('T')[0],
      moisturePercent: moisture,
      c4SugarAdulterationPercent: c4Sugar,
      hmfContentMgKg: hmf,
      pollenCountPurityPercent: pollenPurity,
      fructoseGlucoseRatio: fructoseGlucoseRatio,
      antibioticResidue: antibiotics,
      heavyMetals: heavyMetals,
      status: pass && c4Sugar === 0 && moisture <= 20 ? 'passed' : 'failed',
      remarks: notes,
      signedBy: currentUser.name,
      blockchainTxHash: `0x${Math.random().toString(16).substring(2)}`,
    };

    certifyBatch(selectedBatchForTest.batchId, testResults);
    setSelectedBatchForTest(null);
    showToast(
      pass ? 'Lab Certification Approved' : 'Batch Quality Rejected',
      `Certificate ID ${certId} signed on blockchain ledger.`,
      pass ? 'success' : 'error'
    );
  };

  // 1. PENDING TEST QUEUE TAB
  if (activeTab === 'pending_tests') {
    return (
      <div className="space-y-8 animate-in fade-in duration-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                Awaiting NABL Testing ({pendingBatches.length} Samples)
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#20221F] font-heading mt-1.5">
              Priority Lab Assay Queue
            </h1>
            <p className="text-xs sm:text-sm text-[#7A7467] mt-0.5">
              Raw honey harvest samples received from apiary field collection hubs awaiting NMR & chemical assay.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {pendingBatches.map((batch) => (
            <div key={batch.batchId} className="p-6 rounded-3xl bg-white border border-[#EBE6D7] shadow-xs space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-xs font-bold text-[#8C6B1F] px-2 py-0.5 rounded-md bg-[#FFF8E6] border border-[#F6E7A1]">
                    {batch.batchId}
                  </span>
                  <h3 className="text-base font-bold text-[#20221F] mt-1">{batch.honeyFloraType}</h3>
                  <p className="text-xs text-[#7A7467]">{batch.apiaryLocation}</p>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                  Queue Priority #1
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-[#FAF7EF] border border-[#EAE4D4] text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-stone-400">Beekeeper:</span>
                  <strong className="text-[#20221F]">{batch.beekeeperName}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Quantity:</span>
                  <strong className="text-[#20221F] font-mono">{batch.quantityKg} kg ({batch.bottleCount} jars)</strong>
                </div>
              </div>

              <button
                onClick={() => handleOpenTestModal(batch)}
                className="w-full py-2.5 rounded-xl bg-[#20221F] hover:bg-[#343831] text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <FlaskConical className="w-4 h-4 text-[#F6E7A1]" />
                <span>Perform NMR & C4 Assay</span>
              </button>
            </div>
          ))}
        </div>

        {/* Modal component rendered if open */}
        {selectedBatchForTest && renderTestModal()}
      </div>
    );
  }

  // 2. CERTIFIED ARCHIVE TAB
  if (activeTab === 'certified_archive') {
    return (
      <div className="space-y-8 animate-in fade-in duration-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                NABL Certified Archive
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#20221F] font-heading mt-1.5">
              Signed Honey Certificates Repository
            </h1>
            <p className="text-xs sm:text-sm text-[#7A7467] mt-0.5">
              Immutable archive of all laboratory test certificates, isotopic data sheets, and blockchain transaction receipts.
            </p>
          </div>

          <button
            onClick={() => showToast('Certificates Exported', 'All signed NABL test reports exported to PDF bundle', 'success')}
            className="px-4 py-2.5 rounded-xl bg-[#20221F] hover:bg-[#343831] text-white text-xs font-bold transition-colors flex items-center gap-2 shadow-xs"
          >
            <Download className="w-4 h-4 text-[#F6E7A1]" />
            <span>Export Archive (PDF)</span>
          </button>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-[#EBE6D7] shadow-xs space-y-4">
          <div className="overflow-x-auto rounded-2xl border border-[#EFE9DC]">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-[#FAF7EF] text-[#6B6557] uppercase text-[10px] font-bold tracking-wider border-b border-[#EAE3D2]">
                <tr>
                  <th className="py-3 px-4">Certificate ID</th>
                  <th className="py-3 px-4">Batch ID</th>
                  <th className="py-3 px-4">Flora & Origin</th>
                  <th className="py-3 px-4">Moisture</th>
                  <th className="py-3 px-4">C4 Sugar</th>
                  <th className="py-3 px-4">HMF</th>
                  <th className="py-3 px-4">Signed Date</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F2ECE0] bg-white">
                {certifiedBatches.map((b) => (
                  <tr key={b.batchId} className="hover:bg-[#FFFDF7] transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-emerald-700">
                      {b.labResults?.labCertificateId}
                    </td>
                    <td className="py-3 px-4 font-mono text-[#20221F]">{b.batchId}</td>
                    <td className="py-3 px-4 font-medium text-[#20221F]">{b.honeyFloraType}</td>
                    <td className="py-3 px-4 font-mono">{b.labResults?.moisturePercent}%</td>
                    <td className="py-3 px-4 font-mono text-emerald-700 font-bold">{b.labResults?.c4SugarAdulterationPercent}%</td>
                    <td className="py-3 px-4 font-mono">{b.labResults?.hmfContentMgKg} mg/kg</td>
                    <td className="py-3 px-4 text-stone-400">{b.labResults?.testDate}</td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => {
                          setSelectedBatchId(b.batchId);
                          setIsVerifyPassportOpen(true);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-[#FAF7EF] hover:bg-[#F2ECE0] border border-[#D9D3C3] text-[11px] font-bold text-[#20221F]"
                      >
                        View Cert
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // 3. LAB ACCREDITATION SETTINGS TAB
  if (activeTab === 'settings') {
    return (
      <div className="space-y-8 animate-in fade-in duration-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 border border-slate-200">
              Laboratory Accreditation & Instruments
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#20221F] font-heading mt-1.5">
            NABL Accreditation & Spectrometer Calibration
          </h1>
          <p className="text-xs sm:text-sm text-[#7A7467] mt-0.5">
            ISO/IEC 17025 testing facility credentials and instrument calibration logs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-[#EBE6D7] shadow-xs space-y-4">
            <h2 className="text-base font-bold text-[#20221F] font-heading flex items-center gap-2">
              <Award className="w-5 h-5 text-[#8C6B1F]" />
              <span>NABL Facility Profile</span>
            </h2>
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-2xl bg-[#FCFBF7] border border-[#E8E2D2] flex justify-between">
                <span className="text-stone-400">Accreditation Number:</span>
                <strong className="text-[#20221F] font-mono">TC-8891 (Chemical & Biological)</strong>
              </div>
              <div className="p-3 rounded-2xl bg-[#FCFBF7] border border-[#E8E2D2] flex justify-between">
                <span className="text-stone-400">Validity:</span>
                <strong className="text-emerald-700">Active until Dec 2028</strong>
              </div>
              <div className="p-3 rounded-2xl bg-[#FCFBF7] border border-[#E8E2D2] flex justify-between">
                <span className="text-stone-400">Chief Analytical Chemist:</span>
                <strong className="text-[#20221F]">{currentUser.name}</strong>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#EBE6D7] shadow-xs space-y-4">
            <h2 className="text-base font-bold text-[#20221F] font-heading flex items-center gap-2">
              <FlaskConical className="w-5 h-5 text-indigo-600" />
              <span>Analytical Hardware Calibration</span>
            </h2>
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-2xl bg-[#FCFBF7] border border-[#E8E2D2] flex justify-between">
                <span className="text-stone-400">Bruker 400MHz NMR Spectrometer:</span>
                <span className="text-emerald-700 font-bold">✓ Calibrated 3 days ago</span>
              </div>
              <div className="p-3 rounded-2xl bg-[#FCFBF7] border border-[#E8E2D2] flex justify-between">
                <span className="text-stone-400">HPLC-UV Sugar Profiler:</span>
                <span className="text-emerald-700 font-bold">✓ Calibrated 1 week ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Helper Modal Renderer
  function renderTestModal() {
    if (!selectedBatchForTest) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
        <div className="relative w-full max-w-2xl bg-white rounded-3xl border border-[#E8E2D2] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
          <div className="p-6 bg-gradient-to-r from-[#FFF9E8] via-[#FCFBF7] to-white border-b border-[#F0EAD9] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#F6E7A1] border border-[#D9A441]/40 flex items-center justify-center shadow-2xs">
                <FlaskConical className="w-5 h-5 text-[#8C6B1F]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#20221F] font-heading">
                  NABL Laboratory Chemical Assay
                </h3>
                <p className="text-xs text-[#7A7467]">
                  Batch ID: <strong className="text-[#20221F] font-mono">{selectedBatchForTest.batchId}</strong> ({selectedBatchForTest.honeyFloraType})
                </p>
              </div>
            </div>
            <button
              onClick={() => setSelectedBatchForTest(null)}
              className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 overflow-y-auto flex-1 space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-[#20221F] mb-1">
                  Moisture Content % (FSSAI max 20%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={moisture}
                  onChange={(e) => setMoisture(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-[#D9D3C3] font-mono font-bold bg-white"
                />
                <span className="text-[10px] text-stone-400 mt-0.5 block">Ideal raw range: 16.5% - 19.0%</span>
              </div>

              <div>
                <label className="block font-bold text-[#20221F] mb-1">
                  C4 Sugar Adulteration % (Max 0%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={c4Sugar}
                  onChange={(e) => setC4Sugar(Number(e.target.value))}
                  className={`w-full px-3 py-2 rounded-xl border font-mono font-bold bg-white ${
                    c4Sugar > 0 ? 'border-rose-500 text-rose-700' : 'border-[#D9D3C3] text-emerald-700'
                  }`}
                />
                <span className="text-[10px] text-stone-400 mt-0.5 block">
                  {c4Sugar > 0 ? '⚠️ Adulteration Flag Triggered' : '✅ Zero C4 Cane/Corn Syrup Detected'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-[#20221F] mb-1">
                  HMF (Hydroxymethylfurfural) mg/kg (Max 40)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={hmf}
                  onChange={(e) => setHmf(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-[#D9D3C3] font-mono font-bold bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-[#20221F] mb-1">
                  Pollen Purity % (Standard &gt;80%)
                </label>
                <input
                  type="number"
                  value={pollenPurity}
                  onChange={(e) => setPollenPurity(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-[#D9D3C3] font-mono font-bold bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-[#20221F] mb-1">
                  Fructose / Glucose Ratio (~1.1 - 1.4)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={fructoseGlucoseRatio}
                  onChange={(e) => setFructoseGlucoseRatio(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-[#D9D3C3] font-mono font-bold bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-[#20221F] mb-1">
                  Antibiotic Residue Screen
                </label>
                <select
                  value={antibiotics}
                  onChange={(e) => setAntibiotics(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-[#D9D3C3] font-bold bg-white"
                >
                  <option value="negative">Negative (Clean)</option>
                  <option value="trace">Trace Level</option>
                  <option value="positive">Positive (Failed)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-[#20221F] mb-1">Official Analyst Notes & Sensory Clearance</label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#D9D3C3] font-medium bg-white"
              />
            </div>

            <div className="p-3 rounded-xl bg-[#FFF9E8] border border-[#F6E7A1] text-xs text-[#7A6020]">
              ⚡ Signing this certificate will mint a cryptographic Lab Verification Block on the Hiveonix Ledger.
            </div>

            <div className="flex items-center gap-3 pt-3">
              <button
                type="button"
                onClick={() => handleSaveLabTest(false)}
                className="w-1/2 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold transition-all shadow-sm flex items-center justify-center gap-1.5"
              >
                <XCircle className="w-4 h-4" /> Reject Batch (Quality Failure)
              </button>
              <button
                type="button"
                onClick={() => handleSaveLabTest(true)}
                className="w-1/2 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold transition-all shadow-sm flex items-center justify-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" /> Approve & Sign Certificate
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 4. DEFAULT: LAB OVERVIEW & BATCH TESTING QUEUE
  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
              NABL Accredited Quality Laboratory
            </span>
            <span className="text-xs font-mono text-stone-400">Lab Node: NABL-IN-082</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#20221F] font-heading mt-1.5">
            Honey Quality Certification & NMR/C4 Testing
          </h1>
          <p className="text-xs sm:text-sm text-[#7A7467] mt-0.5">
            Analyze chemical parameters, adulteration markers, and sign cryptographic certificates.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Batches Tested"
          value="342 Batches"
          subtitle="This Month"
          trend={{ value: "+12% Testing Throughput", isPositive: true }}
          icon={<FlaskConical className="w-5 h-5 text-blue-600" />}
          accentColor="blue"
        />
        <KPICard
          title="Avg Moisture Level"
          value="18.1%"
          subtitle="FSSAI Standard &lt;20%"
          trend={{ value: "Compliant & Safe", isPositive: true }}
          icon={<FileCheck2 className="w-5 h-5 text-emerald-600" />}
          accentColor="green"
        />
        <KPICard
          title="C4 Adulteration Detected"
          value="1 Batch"
          subtitle="Corn/Rice Inverted Syrup"
          trend={{ value: "Flagged & Blocked", isPositive: false }}
          icon={<AlertTriangle className="w-5 h-5 text-rose-600" />}
          accentColor="red"
        />
        <KPICard
          title="Grade A+ Pass Rate"
          value="98.4%"
          subtitle="Export Standard Compliant"
          trend={{ value: "Pure Single Flora", isPositive: true }}
          icon={<Award className="w-5 h-5 text-amber-600" />}
          accentColor="yellow"
        />
      </div>

      {/* Batches Table for Testing */}
      <div className="p-6 rounded-3xl bg-white border border-[#EBE6D7] shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-[#20221F] font-heading">
              Honey Batch Testing Queue
            </h3>
            <p className="text-xs text-[#7A7467] mt-0.5">
              Select any batch to perform isotopic testing, C4 sugar analysis, and issue official NABL certificates.
            </p>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Batch ID, Flora, Beekeeper..."
              className="pl-9 pr-3.5 py-2 rounded-xl border border-[#D9D3C3] text-xs focus:border-[#D9A441] bg-[#FCFBF7] w-64"
            />
          </div>
        </div>

        {/* Batches Table */}
        <div className="overflow-x-auto rounded-2xl border border-[#EFE9DC]">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-[#FAF7EF] text-[#6B6557] uppercase text-[10px] font-bold tracking-wider border-b border-[#EAE3D2]">
              <tr>
                <th className="py-3 px-4">Batch ID</th>
                <th className="py-3 px-4">Producer</th>
                <th className="py-3 px-4">Flora Type</th>
                <th className="py-3 px-4">Weight</th>
                <th className="py-3 px-4">Current Lab Status</th>
                <th className="py-3 px-4">NABL Certificate</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F2ECE0] bg-white">
              {filteredBatches.map((batch) => (
                <tr key={batch.batchId} className="hover:bg-[#FFFDF7] transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-[#20221F]">{batch.batchId}</td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-[#20221F]">{batch.beekeeperName}</div>
                    <div className="text-[10px] text-stone-400">{batch.apiaryLocation}</div>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-[#20221F]">{batch.honeyFloraType}</td>
                  <td className="py-3.5 px-4 font-mono-num font-bold text-[#20221F]">{batch.quantityKg} kg</td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={batch.status} size="sm" />
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[11px]">
                    {batch.labResults ? (
                      <span className="text-emerald-700 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {batch.labResults.labCertificateId}
                      </span>
                    ) : (
                      <span className="text-amber-700 font-medium">Pending Test</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => {
                          setSelectedBatchId(batch.batchId);
                          setIsVerifyPassportOpen(true);
                        }}
                        className="p-1.5 rounded-lg border border-[#D9D3C3] hover:bg-[#FAF7EF] text-stone-600 transition-colors"
                        title="View Honey Passport"
                      >
                        <QrCode className="w-3.5 h-3.5 text-[#8C6B1F]" />
                      </button>
                      <button
                        onClick={() => handleOpenTestModal(batch)}
                        className="px-3 py-1.5 rounded-xl bg-[#20221F] hover:bg-[#343831] text-white text-xs font-bold transition-all shadow-2xs flex items-center gap-1"
                      >
                        <FlaskConical className="w-3.5 h-3.5 text-[#F6E7A1]" />
                        <span>{batch.labResults ? 'Re-Inspect' : 'Run Lab Analysis'}</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {renderTestModal()}
    </div>
  );
};
