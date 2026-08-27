import React, { useState } from 'react';
import { ENVIRONMENTAL_DATA_BY_REGION } from '../../data/mockData';
import {
  CloudSun,
  Thermometer,
  Droplets,
  CloudRain,
  Wind,
  Sparkles,
  Flower2,
  Calendar,
  MapPin,
  CheckCircle2,
} from 'lucide-react';

export const EnvironmentalIntelligence: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState('Wayanad, Kerala');
  const envData = ENVIRONMENTAL_DATA_BY_REGION[selectedRegion] || ENVIRONMENTAL_DATA_BY_REGION['Wayanad, Kerala'];

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-200">
              Flora Bloom & Satellite Radar
            </span>
            <span className="text-xs font-mono text-stone-400">Micro-Climate Telemetry</span>
          </div>
          <h2 className="text-2xl font-bold text-[#20221F] font-heading mt-1.5">
            Environmental Intelligence & Flowering Calendar
          </h2>
          <p className="text-xs sm:text-sm text-[#7A7467] mt-0.5">
            Real-time weather, NDVI vegetation density, and monthly nectar forage cycles.
          </p>
        </div>

        <select
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
          className="px-3.5 py-2.5 rounded-xl border border-[#D9D3C3] text-xs font-bold bg-white text-[#20221F] shadow-2xs"
        >
          <option value="Wayanad, Kerala">Wayanad, Kerala (Cardamom & Shola)</option>
          <option value="Coorg, Karnataka">Coorg, Karnataka (Coffee & Jamun)</option>
          <option value="Bathinda, Punjab">Bathinda, Punjab (Yellow Mustard)</option>
          <option value="Kinnaur, Himachal Pradesh">Kinnaur, HP (White Acacia)</option>
        </select>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        <div className="p-4 rounded-2xl bg-white border border-[#EBE6D7] shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#7A7467]">
            <span>Suitability Score</span>
            <Sparkles className="w-4 h-4 text-[#D9A441]" />
          </div>
          <p className="text-3xl font-extrabold font-mono-num text-[#20221F] mt-1.5">
            {envData.suitabilityScore} <span className="text-sm font-normal text-stone-400">/ 100</span>
          </p>
          <span className="text-[10px] text-emerald-700 font-semibold">High Forage Potential</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#EBE6D7] shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#7A7467]">
            <span>Ambient Temp</span>
            <Thermometer className="w-4 h-4 text-rose-500" />
          </div>
          <p className="text-2xl font-bold font-mono-num text-[#20221F] mt-1.5">{envData.temperature}°C</p>
          <span className="text-[10px] text-emerald-700 font-semibold">Optimal for flight</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#EBE6D7] shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#7A7467]">
            <span>Relative Humidity</span>
            <Droplets className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-2xl font-bold font-mono-num text-[#20221F] mt-1.5">{envData.humidity}%</p>
          <span className="text-[10px] text-[#8C6B1F] font-semibold">Good nectar ripening</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#EBE6D7] shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#7A7467]">
            <span>24h Rainfall</span>
            <CloudRain className="w-4 h-4 text-indigo-500" />
          </div>
          <p className="text-2xl font-bold font-mono-num text-[#20221F] mt-1.5">{envData.rainfallMm} mm</p>
          <span className="text-[10px] text-stone-400 font-semibold">No flood risk</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#EBE6D7] shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#7A7467]">
            <span>Pollen Alert</span>
            <Flower2 className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-bold text-[#20221F] mt-1.5">{envData.pollenAlert}</p>
          <span className="text-[10px] text-emerald-700 font-semibold">High protein intake</span>
        </div>
      </div>

      {/* Flowering Calendar Visualization */}
      <div className="p-6 rounded-3xl bg-white border border-[#EBE6D7] shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-[#20221F] font-heading">
              Regional Forage & Flowering Calendar ({selectedRegion})
            </h3>
            <p className="text-xs text-[#7A7467] mt-0.5">
              Identifies key nectar and pollen blooming seasons for apiary super preparation
            </p>
          </div>
          <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#FFF8E6] text-[#8C6B1F] border border-[#F6E7A1]">
            Active Floral Belt
          </span>
        </div>

        {/* Calendar Grid */}
        <div className="space-y-3">
          {envData.forageConditions.map((flora, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-[#FCFBF7] border border-[#EAE4D4] space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="p-2 rounded-xl bg-[#FFF8E6] border border-[#F6E7A1] text-[#8C6B1F]">
                    <Flower2 className="w-4 h-4" />
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-[#20221F]">{flora.floraName}</h4>
                    <p className="text-[11px] text-[#777]">Season: {flora.seasonMonths}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span
                    className={`font-semibold px-2.5 py-0.5 rounded-full ${
                      flora.bloomStatus === 'Peak Bloom'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-stone-100 text-stone-700'
                    }`}
                  >
                    {flora.bloomStatus}
                  </span>
                  <span className="font-mono text-[#8C6B1F] font-bold">Nectar: {flora.nectarYield}</span>
                </div>
              </div>

              {/* Monthly Visualizer Bar */}
              <div className="grid grid-cols-12 gap-1 text-center text-[10px] font-mono font-bold pt-1">
                {months.map((m, mIdx) => {
                  const isCurrentSeason =
                    (mIdx >= 6 && mIdx <= 9 && flora.seasonMonths.includes('July')) ||
                    (mIdx >= 10 && flora.seasonMonths.includes('November')) ||
                    (mIdx <= 3 && flora.seasonMonths.includes('January')) ||
                    flora.seasonMonths.includes('Year Round');

                  return (
                    <div
                      key={m}
                      className={`py-1.5 rounded-lg transition-colors ${
                        isCurrentSeason
                          ? 'bg-[#D9A441] text-white shadow-2xs font-bold'
                          : 'bg-white border border-[#EBE6D7] text-stone-400'
                      }`}
                    >
                      {m}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
