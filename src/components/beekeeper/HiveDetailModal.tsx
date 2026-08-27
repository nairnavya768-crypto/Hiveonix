import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Hive } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import {
  Thermometer,
  Droplets,
  Scale,
  Activity,
  BatteryCharging,
  Crown,
  Calendar,
  MapPin,
  Sparkles,
  Plus,
  X,
  Clock,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

interface HiveDetailModalProps {
  hiveId: string;
  onClose: () => void;
}

export const HiveDetailModal: React.FC<HiveDetailModalProps> = ({ hiveId, onClose }) => {
  const { hives, updateHive, showToast, setIsCreateBatchModalOpen, setSelectedBatchId } = useApp();
  const hive = hives.find((h) => h.id === hiveId);

  const [activeTab, setActiveTab] = useState<'sensors' | 'queen' | 'history' | 'ai'>('sensors');
  const [newInspectionNote, setNewInspectionNote] = useState('');
  const [inspectorName, setInspectorName] = useState('Anand Varma');

  if (!hive) return null;

  const handleAddInspection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInspectionNote.trim()) return;

    const newLog = {
      date: new Date().toISOString().split('T')[0],
      action: 'Field Inspection Log',
      inspector: inspectorName,
      note: newInspectionNote.trim(),
    };

    updateHive(hive.id, {
      lastInspectionDate: newLog.date,
      historyLogs: [newLog, ...(hive.historyLogs || [])],
    });

    setNewInspectionNote('');
    showToast('Inspection Recorded', `Logged new observation for Hive ${hive.id}`, 'success');
  };

  // Mock 24h telemetry trend points
  const tempTrends = [33.8, 34.2, 34.9, 35.4, 35.1, 34.8, hive.sensorData.temperature];
  const weightTrends = [41.2, 41.6, 42.0, 42.3, 42.5, 42.6, hive.sensorData.weight];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl border border-[#E8E2D2] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-[#FFF9E8] via-[#FCFBF7] to-white border-b border-[#F0EAD9] flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-[#8C6B1F] px-2 py-0.5 rounded-md bg-[#FFF8E6] border border-[#F6E7A1]">
                {hive.id}
              </span>
              <StatusBadge status={hive.healthStatus} size="sm" />
              <span className="text-xs text-stone-400 font-medium">Est. {hive.establishedDate}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#20221F] font-heading">{hive.name}</h2>
            <p className="text-xs text-[#7A7467] flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#D9A441]" />
              {hive.apiaryName} • {hive.location} • Species: <strong className="text-[#20221F]">{hive.species}</strong>
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="px-6 py-2.5 bg-[#FAF7EF] border-b border-[#EAE4D4] flex items-center gap-2 overflow-x-auto text-xs font-semibold">
          <button
            onClick={() => setActiveTab('sensors')}
            className={`px-3.5 py-1.5 rounded-xl transition-colors ${
              activeTab === 'sensors'
                ? 'bg-white text-[#20221F] shadow-xs border border-[#D9D3C3] font-bold'
                : 'text-[#666] hover:text-[#20221F]'
            }`}
          >
            Live Sensors & Telemetry
          </button>
          <button
            onClick={() => setActiveTab('queen')}
            className={`px-3.5 py-1.5 rounded-xl transition-colors ${
              activeTab === 'queen'
                ? 'bg-white text-[#20221F] shadow-xs border border-[#D9D3C3] font-bold'
                : 'text-[#666] hover:text-[#20221F]'
            }`}
          >
            Queen & Colony Profile
          </button>
          <button
            onClick={() => setActiveTab('ai')}
            className={`px-3.5 py-1.5 rounded-xl transition-colors ${
              activeTab === 'ai'
                ? 'bg-white text-[#8C6B1F] shadow-xs border border-[#F6E7A1] font-bold'
                : 'text-[#666] hover:text-[#20221F]'
            }`}
          >
            AI Anomaly & Health Score
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-3.5 py-1.5 rounded-xl transition-colors ${
              activeTab === 'history'
                ? 'bg-white text-[#20221F] shadow-xs border border-[#D9D3C3] font-bold'
                : 'text-[#666] hover:text-[#20221F]'
            }`}
          >
            Inspection History ({hive.historyLogs?.length || 0})
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'sensors' && (
            <div className="space-y-6">
              {/* Sensor Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 rounded-2xl bg-[#FCFBF7] border border-[#E8E2D2]">
                  <div className="flex items-center justify-between text-xs text-[#7A7467]">
                    <span>Internal Temp</span>
                    <Thermometer className="w-4 h-4 text-rose-500" />
                  </div>
                  <p className="text-2xl font-bold font-mono-num text-[#20221F] mt-1">
                    {hive.sensorData.temperature}°C
                  </p>
                  <span className="text-[10px] text-emerald-700 font-semibold">Normal (34-36°C)</span>
                </div>

                <div className="p-4 rounded-2xl bg-[#FCFBF7] border border-[#E8E2D2]">
                  <div className="flex items-center justify-between text-xs text-[#7A7467]">
                    <span>Chamber Humidity</span>
                    <Droplets className="w-4 h-4 text-blue-500" />
                  </div>
                  <p className="text-2xl font-bold font-mono-num text-[#20221F] mt-1">
                    {hive.sensorData.humidity}%
                  </p>
                  <span className="text-[10px] text-[#8C6B1F] font-semibold">Target &lt;65%</span>
                </div>

                <div className="p-4 rounded-2xl bg-[#FCFBF7] border border-[#E8E2D2]">
                  <div className="flex items-center justify-between text-xs text-[#7A7467]">
                    <span>Total Weight</span>
                    <Scale className="w-4 h-4 text-amber-600" />
                  </div>
                  <p className="text-2xl font-bold font-mono-num text-[#20221F] mt-1">
                    {hive.sensorData.weight} kg
                  </p>
                  <span className="text-[10px] text-emerald-700 font-semibold">+1.4kg this week</span>
                </div>

                <div className="p-4 rounded-2xl bg-[#FCFBF7] border border-[#E8E2D2]">
                  <div className="flex items-center justify-between text-xs text-[#7A7467]">
                    <span>Acoustic Pitch</span>
                    <Activity className="w-4 h-4 text-indigo-500" />
                  </div>
                  <p className="text-2xl font-bold font-mono-num text-[#20221F] mt-1">
                    {hive.sensorData.acousticFrequency} Hz
                  </p>
                  <span className="text-[10px] text-[#777] font-semibold">Calm resonant hum</span>
                </div>
              </div>

              {/* 24h Telemetry Micro-Chart */}
              <div className="p-4 rounded-2xl bg-[#FAF7EF] border border-[#EAE4D4] space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-[#20221F]">
                  <span>24-Hour Weight Gain (Nectar Storage Velocity)</span>
                  <span className="text-[11px] font-mono text-[#8C6B1F]">Active Honey Flow</span>
                </div>
                <div className="h-16 flex items-end gap-2 pt-2">
                  {weightTrends.map((val, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        style={{ height: `${(val / 50) * 100}%` }}
                        className="w-full bg-[#D9A441] rounded-t-sm transition-all"
                      />
                      <span className="text-[9px] font-mono text-stone-400">{val}k</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Harvest Readiness Alert */}
              <div className="p-4 rounded-2xl bg-[#FFF9E8] border border-[#F6E7A1] flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#8C6B1F]">Honey Super Chamber Ready for Extraction</h4>
                  <p className="text-[11px] text-[#666] mt-0.5">
                    Estimated Yield: <strong className="text-[#20221F] font-mono">{hive.estimatedHarvestYieldKg} kg</strong> raw wild honey.
                  </p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    setIsCreateBatchModalOpen(true);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-[#20221F] hover:bg-[#343831] text-white text-xs font-bold transition-colors shrink-0"
                >
                  Create Batch ID
                </button>
              </div>
            </div>
          )}

          {activeTab === 'queen' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-[#FCFBF7] border border-[#E8E2D2] flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#FFF8E6] border border-[#F6E7A1] flex items-center justify-center shrink-0">
                  <Crown className="w-6 h-6 text-[#D9A441]" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#20221F]">{hive.queen.id}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        hive.queen.status === 'healthy'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {hive.queen.status.toUpperCase()}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-[#20221F]">{hive.queen.breed}</h4>
                  <p className="text-xs text-[#777]">
                    Installed on {hive.queen.installedDate} ({hive.queen.ageMonths} months old)
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-4 rounded-2xl bg-white border border-[#EBE6D7]">
                  <p className="text-stone-400 font-semibold">Laying Pattern Score</p>
                  <p className="text-2xl font-bold font-mono-num text-[#20221F] mt-1">
                    {hive.queen.layingPatternScore}%
                  </p>
                  <span className="text-[10px] text-emerald-700 font-medium">Concentric solid brood pattern</span>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-[#EBE6D7]">
                  <p className="text-stone-400 font-semibold">Queen Retinue Pheromone</p>
                  <p className="text-2xl font-bold font-mono-num text-[#20221F] mt-1">Strong</p>
                  <span className="text-[10px] text-stone-500 font-medium">9-ODA & 9-HDA levels optimal</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ai' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#FFFDF5] border border-[#F6E7A1] flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6B1F]">
                    Colony Health Score
                  </span>
                  <div className="text-3xl font-extrabold font-mono-num text-[#20221F] mt-1">
                    {hive.healthScore} <span className="text-sm font-normal text-stone-400">/ 100</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-700 flex items-center justify-end gap-1">
                    <CheckCircle2 className="w-4 h-4" /> AI Risk Index: Low
                  </span>
                  <p className="text-[10px] text-stone-400 mt-0.5">Updated from live sensor telemetry</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF7EF] border border-[#EAE4D4] text-xs space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-[#20221F]">
                  <Sparkles className="w-4 h-4 text-[#D9A441]" />
                  <span>Automated AI Colony Insight:</span>
                </div>
                <p className="text-[11px] text-[#555] leading-relaxed">
                  Acoustic analysis shows steady 215 Hz resonance. No swarming frequency peaks detected. Frame weight gain indicates healthy active nectar foraging on cardamom flora.
                </p>
                <div className="pt-2 text-[10px] text-stone-400 italic">
                  *AI Risk Detection — Requires periodic beekeeper field validation.
                </div>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-4">
              {/* Add Note Form */}
              <form onSubmit={handleAddInspection} className="p-4 rounded-2xl bg-[#FCFBF7] border border-[#E8E2D2] space-y-3">
                <p className="text-xs font-bold text-[#20221F]">Add Field Inspection Observation</p>
                <textarea
                  rows={2}
                  value={newInspectionNote}
                  onChange={(e) => setNewInspectionNote(e.target.value)}
                  placeholder="Record brood frame condition, queen sighting, mite count, super additions..."
                  className="w-full p-2.5 rounded-xl border border-[#D9D3C3] text-xs bg-white focus:border-[#D9A441]"
                />
                <div className="flex items-center justify-between">
                  <input
                    type="text"
                    value={inspectorName}
                    onChange={(e) => setInspectorName(e.target.value)}
                    placeholder="Inspector name"
                    className="px-2.5 py-1.5 rounded-lg border border-[#D9D3C3] text-xs bg-white w-48"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-1.5 rounded-xl bg-[#20221F] text-white text-xs font-bold hover:bg-[#383C35]"
                  >
                    Save Log
                  </button>
                </div>
              </form>

              {/* History Timeline */}
              <div className="space-y-3">
                {hive.historyLogs?.map((log, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-white border border-[#EBE6D7] text-xs space-y-1">
                    <div className="flex items-center justify-between text-stone-400 font-mono text-[10px]">
                      <span>{log.date}</span>
                      <span className="font-semibold text-[#8C6B1F]">{log.inspector}</span>
                    </div>
                    <p className="font-bold text-[#20221F]">{log.action}</p>
                    <p className="text-[#666] leading-relaxed text-[11px]">{log.note}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
