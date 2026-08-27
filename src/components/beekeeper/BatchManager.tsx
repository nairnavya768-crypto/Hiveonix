import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { HoneyBatch } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import {
  FileCheck2,
  Plus,
  QrCode,
  Layers,
  Calendar,
  FlaskConical,
  Truck,
  CheckCircle2,
  Clock,
  ExternalLink,
  Search,
  X,
} from 'lucide-react';

export const BatchManager: React.FC = () => {
  const {
    batches,
    hives,
    currentUser,
    createBatch,
    setSelectedBatchId,
    setIsVerifyPassportOpen,
    isCreateBatchModalOpen,
    setIsCreateBatchModalOpen,
  } = useApp();

  const [filterSearch, setFilterSearch] = useState('');

  // New Batch Form State
  const [selectedHiveId, setSelectedHiveId] = useState(hives[0]?.id || 'HV-KER-0101');
  const [floraType, setFloraType] = useState('Wild Cardamom & Forest Shola Multi-Flora');
  const [quantityKg, setQuantityKg] = useState(60);
  const [notes, setNotes] = useState('Cold centrifugal extracted at 22°C. Single apiary raw batch.');

  const myBatches = batches.filter(
    (b) =>
      b.batchId.toLowerCase().includes(filterSearch.toLowerCase()) ||
      b.honeyFloraType.toLowerCase().includes(filterSearch.toLowerCase())
  );

  const handleCreateBatchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const targetHive = hives.find((h) => h.id === selectedHiveId) || hives[0];

    const regionPrefix = (targetHive?.location || 'KER').substring(0, 3).toUpperCase();
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const batchId = `HVX-2026-${regionPrefix}-${randomNum}`;
    const bottleCount = Math.round(quantityKg * 2);

    const newBatch: HoneyBatch = {
      batchId,
      hiveId: targetHive?.id || 'HV-01',
      beekeeperId: currentUser.id,
      beekeeperName: currentUser.name,
      apiaryLocation: `${targetHive?.apiaryName}, ${targetHive?.location}`,
      honeyFloraType: floraType,
      harvestDate: new Date().toISOString().split('T')[0],
      quantityKg,
      bottleCount,
      status: 'harvested',
      blockchainHash: `0x${Math.random().toString(16).substring(2)}${Math.random().toString(16).substring(2)}`,
      qrCodeUrl: `https://hiveonix.agritech.gov.in/verify/${batchId}`,
      productionNotes: notes,
      currentLocation: targetHive?.apiaryName || 'Apiary Extraction Node',
      timeline: [
        {
          stage: 'Hive Telemetry Verified',
          timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
          actor: `Smart Hive ${targetHive?.id}`,
          details: `Chamber weight ${targetHive?.sensorData.weight}kg, internal moisture optimal.`,
          verified: true,
        },
        {
          stage: 'Centrifugal Extraction',
          timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
          actor: currentUser.name,
          details: `${quantityKg}kg raw honey extracted into food-grade 304 stainless steel barrel.`,
          verified: true,
        },
      ],
    };

    createBatch(newBatch);
    setIsCreateBatchModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
              Harvest Traceability Engine
            </span>
            <span className="text-xs font-mono text-stone-400">Total Batches: {batches.length}</span>
          </div>
          <h2 className="text-2xl font-bold text-[#20221F] font-heading mt-1.5">
            Honey Batch Production & Passport Lifecycle
          </h2>
          <p className="text-xs sm:text-sm text-[#7A7467] mt-0.5">
            Every harvest receives a cryptographic batch identity linking hive telemetry to lab certification and consumer QR codes.
          </p>
        </div>

        <button
          onClick={() => setIsCreateBatchModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-[#20221F] hover:bg-[#343831] text-white text-xs font-bold shadow-md transition-all flex items-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4 text-[#F6E7A1]" />
          <span>Record New Harvest Batch</span>
        </button>
      </div>

      {/* Batches List with Timeline View */}
      <div className="space-y-4">
        {myBatches.map((batch) => (
          <div
            key={batch.batchId}
            className="p-6 rounded-3xl bg-white border border-[#EBE6D7] shadow-xs space-y-5 hover:border-[#D9A441] transition-all"
          >
            {/* Batch Top Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F2ECE0] pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-bold text-[#20221F]">{batch.batchId}</span>
                  <StatusBadge status={batch.status} size="sm" />
                </div>
                <h3 className="text-base font-bold text-[#20221F] mt-1">{batch.honeyFloraType}</h3>
                <p className="text-xs text-[#7A7467]">
                  From <strong className="text-[#20221F]">{batch.hiveId}</strong> • Harvested: {batch.harvestDate} • {batch.apiaryLocation}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="text-right mr-2 hidden sm:block">
                  <p className="text-xs font-bold font-mono-num text-[#20221F]">{batch.quantityKg} kg</p>
                  <p className="text-[10px] text-stone-400">({batch.bottleCount} serialized jars)</p>
                </div>
                <button
                  onClick={() => {
                    setSelectedBatchId(batch.batchId);
                    setIsVerifyPassportOpen(true);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-[#FFF9E8] hover:bg-[#FFF3D1] text-[#8C6B1F] border border-[#F6E7A1] text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
                >
                  <QrCode className="w-3.5 h-3.5 text-[#D9A441]" />
                  <span>Honey Passport</span>
                </button>
              </div>
            </div>

            {/* Interactive Timeline Lifecycle */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#8A8475] mb-3">
                Supply Chain & Verification Journey
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {batch.timeline.map((event, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#FCFBF7] border border-[#EAE4D4] text-xs space-y-1">
                    <div className="flex items-center justify-between text-[10px] text-stone-400">
                      <span className="font-mono">{event.timestamp.split(' ')[0]}</span>
                      {event.verified ? (
                        <span className="text-emerald-700 font-bold flex items-center gap-0.5">
                          <CheckCircle2 className="w-3 h-3" /> Verified
                        </span>
                      ) : (
                        <span className="text-amber-700 font-medium">Pending</span>
                      )}
                    </div>
                    <p className="font-bold text-[#20221F] truncate">{event.stage}</p>
                    <p className="text-[11px] text-[#666] line-clamp-2 leading-relaxed">{event.details}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Batch Modal */}
      {isCreateBatchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-3xl border border-[#E8E2D2] shadow-2xl overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-[#FFF9E8] via-[#FCFBF7] to-white border-b border-[#F0EAD9] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#F6E7A1] border border-[#D9A441]/40 flex items-center justify-center shadow-2xs">
                  <FileCheck2 className="w-5 h-5 text-[#8C6B1F]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#20221F] font-heading">Record Harvest Batch</h3>
                  <p className="text-xs text-[#7A7467]">Initiate blockchain genesis block for this extraction</p>
                </div>
              </div>
              <button
                onClick={() => setIsCreateBatchModalOpen(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateBatchSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#20221F] mb-1">Source Hive Chamber</label>
                <select
                  value={selectedHiveId}
                  onChange={(e) => setSelectedHiveId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9D3C3] text-xs font-semibold focus:border-[#D9A441] bg-white"
                >
                  {hives.map((h) => (
                    <option key={h.id} value={h.id}>
                      {h.name} ({h.id}) — Est. Yield: {h.estimatedHarvestYieldKg}kg
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#20221F] mb-1">Flora Classification</label>
                <input
                  type="text"
                  required
                  value={floraType}
                  onChange={(e) => setFloraType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9D3C3] text-xs font-medium focus:border-[#D9A441] bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#20221F] mb-1">Extracted Weight (kg)</label>
                  <input
                    type="number"
                    min={5}
                    max={500}
                    value={quantityKg}
                    onChange={(e) => setQuantityKg(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9D3C3] text-xs font-medium focus:border-[#D9A441] bg-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#20221F] mb-1">Estimated 500g Jars</label>
                  <input
                    type="text"
                    disabled
                    value={`${quantityKg * 2} Bottles`}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9D3C3] text-xs font-mono bg-stone-50 text-stone-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#20221F] mb-1">Extraction & Sensory Notes</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#D9D3C3] text-xs font-medium focus:border-[#D9A441] bg-white"
                />
              </div>

              <div className="p-3 rounded-xl bg-[#FFF9E8] border border-[#F6E7A1] text-xs text-[#7A6020]">
                ⚡ Upon submission, a unique serialized Batch ID is minted and dispatched to the NABL Lab queue for moisture and C4 sugar testing.
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreateBatchModalOpen(false)}
                  className="w-1/3 py-2.5 rounded-xl border border-[#D9D3C3] text-xs font-semibold text-[#555] hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-2.5 rounded-xl bg-[#20221F] hover:bg-[#383C35] text-white text-xs font-bold shadow-md flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4 text-[#F6E7A1]" />
                  <span>Generate Batch Passport ID</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
