import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { KPICard } from '../common/KPICard';
import { StatusBadge } from '../common/StatusBadge';
import { HiveDetailModal } from './HiveDetailModal';
import { AddHiveModal } from './AddHiveModal';
import { AIDiseaseScanner } from './AIDiseaseScanner';
import { AIProductivityPredictor } from './AIProductivityPredictor';
import { BatchManager } from './BatchManager';
import { EnvironmentalIntelligence } from './EnvironmentalIntelligence';
import { QueenHealthView } from './QueenHealthView';
import { HiveMapD3 } from './HiveMapD3';
import {
  Box,
  Plus,
  Activity,
  Sparkles,
  Scale,
  Thermometer,
  Droplets,
  Calendar,
  Layers,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Crown,
  FileCheck2,
  MapPin,
  LayoutGrid,
  Radio,
} from 'lucide-react';

export const BeekeeperDashboard: React.FC = () => {
  const {
    hives,
    batches,
    currentUser,
    activeTab,
    setActiveTab,
    setIsAddHiveModalOpen,
    setIsCreateBatchModalOpen,
    setSelectedBatchId,
    setIsVerifyPassportOpen,
  } = useApp();

  const [selectedHiveIdForModal, setSelectedHiveIdForModal] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');

  // Sub-tabs routing
  if (activeTab === 'hive_map' || activeTab === 'map') {
    return (
      <div className="space-y-6 animate-in fade-in duration-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
              Interactive D3.js Spatial Engine
            </span>
            <span className="text-xs font-mono text-stone-400">Mesh Gateway: Active</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#20221F] font-heading mt-1.5">
            Live Smart Apiary Spatial Radar
          </h1>
          <p className="text-xs sm:text-sm text-[#7A7467] mt-0.5">
            Real-time LoRaWAN node topology, acoustic frequency sensors, and 3km flora boundary coverage.
          </p>
        </div>

        <HiveMapD3
          hives={hives}
          onSelectHive={(hiveId) => setSelectedHiveIdForModal(hiveId)}
          selectedHiveId={selectedHiveIdForModal}
        />

        {selectedHiveIdForModal && (
          <HiveDetailModal
            hiveId={selectedHiveIdForModal}
            onClose={() => setSelectedHiveIdForModal(null)}
          />
        )}
      </div>
    );
  }

  if (activeTab === 'ai_diagnostics' || activeTab === 'disease-scanner') {
    return <AIDiseaseScanner />;
  }
  if (activeTab === 'ai_yield' || activeTab === 'productivity-predictor') {
    return <AIProductivityPredictor />;
  }
  if (activeTab === 'batches') {
    return <BatchManager />;
  }
  if (activeTab === 'environment' || activeTab === 'environmental') {
    return <EnvironmentalIntelligence />;
  }
  if (activeTab === 'queen_health' || activeTab === 'queen') {
    return <QueenHealthView />;
  }
  if (activeTab === 'settings') {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                Apiary Profile & Configuration
              </span>
              <span className="text-xs font-mono text-stone-400">ID: {currentUser.madhukrantiId || 'MDK-KER-2024-8849'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#20221F] font-heading mt-1.5">
              Beekeeper Settings & IoT Gateways
            </h1>
            <p className="text-xs sm:text-sm text-[#7A7467] mt-0.5">
              Manage your apiary GPS coordinates, Madhukranti registry credentials, and sensor synchronization mesh.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="p-6 rounded-3xl bg-white border border-[#EBE6D7] shadow-xs space-y-5">
              <h2 className="text-base font-bold text-[#20221F] font-heading flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#D9A441]" />
                <span>Madhukranti & Aadhaar e-KYC Verification</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-2xl bg-[#FCFBF7] border border-[#E8E2D2]">
                  <span className="text-stone-400 font-semibold block text-[11px]">Registered Beekeeper Name</span>
                  <strong className="text-sm text-[#20221F] mt-0.5 block">{currentUser.name}</strong>
                  <span className="text-[10px] text-emerald-700 font-semibold mt-1 inline-flex items-center gap-1">
                    ✓ Aadhaar e-KYC Verified
                  </span>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#FCFBF7] border border-[#E8E2D2]">
                  <span className="text-stone-400 font-semibold block text-[11px]">National Madhukranti ID</span>
                  <strong className="text-sm font-mono text-[#8C6B1F] mt-0.5 block">{currentUser.madhukrantiId || 'MDK-KER-2024-8849'}</strong>
                  <span className="text-[10px] text-stone-500 mt-1 block">Ministry of Agriculture & Farmers Welfare</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#FCFBF7] border border-[#E8E2D2]">
                  <span className="text-stone-400 font-semibold block text-[11px]">Assigned KVK Cluster</span>
                  <strong className="text-xs text-[#20221F] mt-0.5 block">KVK Wayanad Regional Apiary Division</strong>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#FCFBF7] border border-[#E8E2D2]">
                  <span className="text-stone-400 font-semibold block text-[11px]">Apiary Base Location</span>
                  <strong className="text-xs text-[#20221F] mt-0.5 block">{currentUser.location} (11.6854° N, 76.1320° E)</strong>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#EBE6D7] shadow-xs space-y-4">
              <h2 className="text-base font-bold text-[#20221F] font-heading flex items-center gap-2">
                <Box className="w-5 h-5 text-[#8C6B1F]" />
                <span>LoRaWAN & IoT Telemetry Sync Gateway</span>
              </h2>
              <p className="text-xs text-[#7A7467]">
                Smart hive sensors broadcast internal temperature, acoustic buzzing Hz, and weight load-cell telemetry every 15 minutes.
              </p>
              <div className="p-4 rounded-2xl bg-[#FAF7EF] border border-[#EAE3D2] flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-[#20221F]">Gateway Station: Shola Mesh #1</p>
                  <span className="text-[11px] text-emerald-700 font-medium">Status: Connected • 100% Signal (RSSI -64 dBm)</span>
                </div>
                <button
                  type="button"
                  onClick={() => alert('IoT telemetry mesh ping test: All 6 sensor nodes responding with 0% packet loss.')}
                  className="px-3.5 py-1.5 rounded-xl bg-[#20221F] text-white text-xs font-bold hover:bg-[#343831] transition-colors"
                >
                  Test Mesh Ping
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-gradient-to-br from-[#FFF9E8] to-[#FFF0C8] border border-[#F6E7A1] shadow-xs space-y-4">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#D9A441] flex items-center justify-center">
                <Crown className="w-5 h-5 text-[#8C6B1F]" />
              </div>
              <h3 className="text-sm font-bold text-[#20221F]">National Quality Tier</h3>
              <p className="text-xs text-[#6B551E] leading-relaxed">
                Your apiary is classified as <strong>Grade A+ Organic Certified</strong> with direct export clearance eligibility under NBHM guidelines.
              </p>
              <div className="pt-2 border-t border-[#F6E7A1]/60">
                <span className="text-[11px] font-mono text-[#8C6B1F]">Certificate: NBHM-EXP-KER-0092</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default Overview / Hives view
  const totalHoneyYield = batches.reduce((sum, b) => sum + b.quantityKg, 0);
  const avgHealth = Math.round(hives.reduce((sum, h) => sum + h.healthScore, 0) / (hives.length || 1));

  return (
    <div className="space-y-8">
      {/* Top Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
              Madhukranti Verified Beekeeper
            </span>
            <span className="text-xs font-mono text-stone-400">ID: {currentUser.madhukrantiId || 'MDK-KER-2026-4821'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#20221F] font-heading mt-1.5">
            Welcome back, {currentUser.name}
          </h1>
          <p className="text-xs sm:text-sm text-[#7A7467] mt-0.5">
            {currentUser.organization} • {currentUser.location} • Smart Hive Mesh Connected
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setIsAddHiveModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-white border border-[#D9D3C3] hover:bg-[#FCFBF7] text-xs font-bold text-[#20221F] flex items-center gap-2 shadow-2xs transition-colors"
          >
            <Plus className="w-4 h-4 text-[#8C6B1F]" />
            <span>Add Hive Chamber</span>
          </button>
          <button
            onClick={() => setIsCreateBatchModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-[#20221F] hover:bg-[#343831] text-white text-xs font-bold shadow-md transition-all flex items-center gap-2"
          >
            <FileCheck2 className="w-4 h-4 text-[#F6E7A1]" />
            <span>Record Harvest Batch</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Active Smart Hives"
          value={`${hives.length} Colonies`}
          subtitle="IoT Sensors 100% Online"
          trend={{ value: "All Telemetry Live", isPositive: true }}
          icon={<Box className="w-5 h-5 text-amber-600" />}
          accentColor="yellow"
        />
        <KPICard
          title="Total Harvest Yield"
          value={`${totalHoneyYield} kg`}
          subtitle={`${batches.length} Serialized Batches`}
          trend={{ value: "+28% vs Last Season", isPositive: true }}
          icon={<Scale className="w-5 h-5 text-emerald-600" />}
          accentColor="green"
        />
        <KPICard
          title="Colony Health Index"
          value={`${avgHealth}/100`}
          subtitle="Acoustic & Brood Normality"
          trend={{ value: "Low Disease Risk", isPositive: true }}
          icon={<Activity className="w-5 h-5 text-purple-600" />}
          accentColor="blue"
        />
        <KPICard
          title="Lab Certified Batches"
          value={`${batches.filter((b) => b.status === 'retail_ready').length}`}
          subtitle="NABL C4 Passed • Grade A+"
          trend={{ value: "100% Purity", isPositive: true }}
          icon={<ShieldCheck className="w-5 h-5 text-amber-700" />}
          accentColor="yellow"
        />
      </div>

      {/* Interactive D3 Live Radar Map Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-[#20221F] font-heading">Smart Apiary Radar & Colony Grid</h2>
            <p className="text-xs text-[#7A7467]">Switch between interactive D3.js telemetry radar and card grid</p>
          </div>

          <div className="inline-flex p-1 rounded-xl bg-white border border-[#E8E2D2] text-xs shadow-2xs">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                viewMode === 'grid' ? 'bg-[#20221F] text-white shadow-xs' : 'text-[#777] hover:text-[#20221F]'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Chamber Grid</span>
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                viewMode === 'map' ? 'bg-[#20221F] text-white shadow-xs' : 'text-[#777] hover:text-[#20221F]'
              }`}
            >
              <Radio className="w-3.5 h-3.5 text-[#F6E7A1]" />
              <span>D3 Interactive Radar</span>
            </button>
          </div>
        </div>

        {viewMode === 'map' ? (
          <HiveMapD3
            hives={hives}
            onSelectHive={(hiveId) => setSelectedHiveIdForModal(hiveId)}
            selectedHiveId={selectedHiveIdForModal}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {hives.map((hive) => (
              <div
                key={hive.id}
                className="p-5 rounded-3xl bg-white border border-[#EBE6D7] shadow-xs hover:border-[#D9A441] transition-all space-y-4 group"
              >
                {/* Card Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#8C6B1F] px-2 py-0.5 rounded-md bg-[#FFF8E6] border border-[#F6E7A1]">
                        {hive.id}
                      </span>
                      <StatusBadge status={hive.healthStatus} size="sm" />
                    </div>
                    <h3 className="text-base font-bold text-[#20221F] mt-1 group-hover:text-[#8C6B1F] transition-colors">
                      {hive.name}
                    </h3>
                    <p className="text-[11px] text-[#7A7467]">{hive.species}</p>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-stone-400 font-semibold uppercase block">Health Score</span>
                    <span className="text-xl font-mono-num font-bold text-[#20221F]">{hive.healthScore}</span>
                  </div>
                </div>

                {/* Sensor Readings Bar */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2.5 rounded-xl bg-[#FCFBF7] border border-[#E8E2D2]">
                    <span className="text-stone-400 font-semibold text-[10px] flex items-center justify-center gap-1">
                      <Thermometer className="w-3 h-3 text-rose-500" /> Temp
                    </span>
                    <p className="text-sm font-bold font-mono-num text-[#20221F] mt-0.5">
                      {hive.sensorData.temperature}°C
                    </p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#FCFBF7] border border-[#E8E2D2]">
                    <span className="text-stone-400 font-semibold text-[10px] flex items-center justify-center gap-1">
                      <Droplets className="w-3 h-3 text-blue-500" /> Humidity
                    </span>
                    <p className="text-sm font-bold font-mono-num text-[#20221F] mt-0.5">
                      {hive.sensorData.humidity}%
                    </p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#FCFBF7] border border-[#E8E2D2]">
                    <span className="text-stone-400 font-semibold text-[10px] flex items-center justify-center gap-1">
                      <Scale className="w-3 h-3 text-amber-600" /> Weight
                    </span>
                    <p className="text-sm font-bold font-mono-num text-[#20221F] mt-0.5">
                      {hive.sensorData.weight} kg
                    </p>
                  </div>
                </div>

                {/* Harvest Estimation */}
                <div className="p-3 rounded-xl bg-[#FFF9E8] border border-[#F6E7A1] flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[#8C6B1F] font-bold">Est. Harvest Yield:</span>
                    <p className="font-mono text-sm font-bold text-[#20221F]">{hive.estimatedHarvestYieldKg} kg</p>
                  </div>
                  <button
                    onClick={() => setSelectedHiveIdForModal(hive.id)}
                    className="px-3 py-1.5 rounded-lg bg-[#20221F] hover:bg-[#343831] text-white text-[11px] font-bold transition-colors flex items-center gap-1"
                  >
                    <span>Inspect Hive</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      {selectedHiveIdForModal && (
        <HiveDetailModal
          hiveId={selectedHiveIdForModal}
          onClose={() => setSelectedHiveIdForModal(null)}
        />
      )}
      <AddHiveModal />
    </div>
  );
};
