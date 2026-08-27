import React, { useState } from 'react';
import { MapPin, AlertTriangle, CheckCircle2, ShieldAlert, Sparkles, Filter, ChevronRight, Layers, Building2 } from 'lucide-react';
import { StateDistrictExplorer, NATIONAL_STATE_DATA } from './StateDistrictExplorer';

interface StateData {
  name: string;
  code: string;
  hivesCount: number;
  beekeepersCount: number;
  healthIndex: number; // 0-100
  riskLevel: 'low' | 'moderate' | 'high';
  topFlora: string;
  activeAlerts: string;
  coordinates: { x: number; y: number }; // SVG layout coords
}

export const RiskMapComponent: React.FC = () => {
  const [selectedStateCode, setSelectedStateCode] = useState<string>('KL');
  const [viewMode, setViewMode] = useState<'map' | 'explorer'>('explorer');

  const states: StateData[] = [
    {
      name: 'Kerala (Wayanad / Idukki / Kozhikode)',
      code: 'KL',
      hivesCount: 3850,
      beekeepersCount: 420,
      healthIndex: 92,
      riskLevel: 'low',
      topFlora: 'Wild Cardamom, Rubber, Wild Shola',
      activeAlerts: 'Optimal forage bloom across Wayanad; minimal thermal stress.',
      coordinates: { x: 38, y: 82 },
    },
    {
      name: 'Punjab (Bathinda / Ludhiana / Hoshiarpur)',
      code: 'PB',
      hivesCount: 4600,
      beekeepersCount: 380,
      healthIndex: 82,
      riskLevel: 'moderate',
      topFlora: 'Yellow Mustard (Sarson), Ber, Clover',
      activeAlerts: 'Seasonal spray caution advisory dispatched to PAU & KVK Bathinda.',
      coordinates: { x: 30, y: 22 },
    },
    {
      name: 'Himachal Pradesh (Kullu / Shimla / Kinnaur)',
      code: 'HP',
      hivesCount: 2900,
      beekeepersCount: 260,
      healthIndex: 94,
      riskLevel: 'low',
      topFlora: 'Solai, Apple Blossom, White Acacia',
      activeAlerts: 'High altitude pristine quality index; zero pesticide residues.',
      coordinates: { x: 36, y: 16 },
    },
    {
      name: 'Maharashtra (Satara / Pune)',
      code: 'MH',
      hivesCount: 3200,
      beekeepersCount: 310,
      healthIndex: 76,
      riskLevel: 'moderate',
      topFlora: 'Jamun, Forest Wild Berry, Sunflower',
      activeAlerts: 'Elevated summer temperatures in Pune basin; shade netting recommended.',
      coordinates: { x: 35, y: 55 },
    },
    {
      name: 'Rajasthan (Alwar / Bharatpur)',
      code: 'RJ',
      hivesCount: 3400,
      beekeepersCount: 290,
      healthIndex: 85,
      riskLevel: 'low',
      topFlora: 'Mustard (Brassica), Ber, Dhak',
      activeAlerts: 'Bumper mustard flow; 1,800 quintals cleared for export processing.',
      coordinates: { x: 32, y: 35 },
    },
    {
      name: 'Meghalaya (East Khasi Hills / Shillong)',
      code: 'ML',
      hivesCount: 1600,
      beekeepersCount: 180,
      healthIndex: 96,
      riskLevel: 'low',
      topFlora: 'Khasi Mandarin Blossom, Wild Buckwheat',
      activeAlerts: 'Pristine mountain nectar. 100% C4 sugar purity verified.',
      coordinates: { x: 80, y: 38 },
    },
  ];

  const activeState = states.find((s) => s.code === selectedStateCode) || states[0];

  return (
    <div className="space-y-6">
      {/* Visual Map Region Canvas Card */}
      <div className="p-6 rounded-3xl bg-white border border-[#EBE6D7] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h3 className="text-base font-bold text-[#20221F] font-heading">National Beekeeping Risk & Health Radar</h3>
            </div>
            <p className="text-xs text-[#7A7467] mt-0.5">Real-time KVK cluster health index and anomaly distribution across India</p>
          </div>

          <div className="flex items-center gap-3 text-xs font-semibold">
            <span className="flex items-center gap-1 text-[#2E6930]">
              <span className="w-2 h-2 rounded-full bg-emerald-500" /> Healthy ({'>'}85)
            </span>
            <span className="flex items-center gap-1 text-[#8C6B1F]">
              <span className="w-2 h-2 rounded-full bg-amber-500" /> Moderate (70-84)
            </span>
            <span className="flex items-center gap-1 text-[#B92921]">
              <span className="w-2 h-2 rounded-full bg-rose-500" /> At Risk ({'<'}70)
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Visual Map Region Canvas */}
          <div className="lg:col-span-7 relative h-72 sm:h-80 bg-[#FCFBF7] rounded-2xl border border-[#EFE9DC] p-4 flex items-center justify-center overflow-hidden">
            <div className="relative w-full h-full max-w-md mx-auto">
              <svg viewBox="0 0 100 100" className="w-full h-full stroke-stone-300 fill-stone-100/40">
                <path
                  d="M 32 10 L 42 12 L 48 20 L 44 32 L 65 34 L 80 40 L 75 52 L 60 55 L 55 70 L 45 92 L 35 85 L 28 65 L 20 48 L 22 30 Z"
                  strokeWidth="0.8"
                  strokeDasharray="2,2"
                />
              </svg>

              {states.map((st) => {
                const isSelected = st.code === selectedStateCode;
                const pinBg =
                  st.riskLevel === 'low'
                    ? 'bg-emerald-500 text-white'
                    : st.riskLevel === 'moderate'
                    ? 'bg-amber-500 text-white'
                    : 'bg-rose-500 text-white animate-bounce';

                return (
                  <button
                    key={st.code}
                    onClick={() => setSelectedStateCode(st.code)}
                    style={{ left: `${st.coordinates.x}%`, top: `${st.coordinates.y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold shadow-md transition-transform ${
                      isSelected ? 'scale-110 ring-2 ring-[#20221F] ring-offset-2 z-20' : 'hover:scale-105 z-10'
                    } ${pinBg}`}
                  >
                    <MapPin className="w-3 h-3" />
                    <span>{st.code}</span>
                    <span className="font-mono">{st.healthIndex}</span>
                  </button>
                );
              })}
            </div>

            <div className="absolute bottom-3 left-3 text-[10px] font-mono-num text-stone-400">
              Active Spatial Nodes: 6 Key Honey Belts
            </div>
          </div>

          {/* Selected State Detail Card */}
          <div className="lg:col-span-5 p-5 rounded-2xl bg-[#FCFBF7] border border-[#E8E2D2] space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono-num font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#FFF8E6] text-[#8C6B1F] border border-[#F6E7A1]">
                Cluster Node #{activeState.code}
              </span>
              <span
                className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                  activeState.riskLevel === 'low'
                    ? 'bg-emerald-100 text-emerald-800'
                    : activeState.riskLevel === 'moderate'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-rose-100 text-rose-800'
                }`}
              >
                {activeState.riskLevel === 'low' ? 'Low Risk' : activeState.riskLevel === 'moderate' ? 'Moderate Watch' : 'High Alert'}
              </span>
            </div>

            <div>
              <h4 className="text-base sm:text-lg font-bold text-[#20221F] font-heading">{activeState.name}</h4>
              <p className="text-xs text-[#666] mt-0.5">Primary Flora: {activeState.topFlora}</p>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center pt-1">
              <div className="p-2.5 rounded-xl bg-white border border-[#EBE6D7]">
                <p className="text-[10px] text-[#7A7467] font-semibold">Active Hives</p>
                <p className="text-sm font-bold font-mono-num text-[#20221F] mt-0.5">{activeState.hivesCount.toLocaleString()}</p>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-[#EBE6D7]">
                <p className="text-[10px] text-[#7A7467] font-semibold">Beekeepers</p>
                <p className="text-sm font-bold font-mono-num text-[#20221F] mt-0.5">{activeState.beekeepersCount}</p>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-[#EBE6D7]">
                <p className="text-[10px] text-[#7A7467] font-semibold">Health Score</p>
                <p className="text-sm font-bold font-mono-num text-[#20221F] mt-0.5">{activeState.healthIndex}/100</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white border border-[#EBE6D7] text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-[#20221F]">
                <Sparkles className="w-3.5 h-3.5 text-[#D9A441]" />
                <span>National Advisory Broadcast:</span>
              </div>
              <p className="text-[11px] text-[#555] leading-relaxed">{activeState.activeAlerts}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Comprehensive District Breakdown Section */}
      <StateDistrictExplorer />
    </div>
  );
};
