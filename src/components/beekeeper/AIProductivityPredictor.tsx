import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AIService } from '../../services/aiService';
import { TrendingUp, Sparkles, Scale, Calendar, Sliders, CheckCircle2, ArrowRight } from 'lucide-react';

export const AIProductivityPredictor: React.FC = () => {
  const { hives, setIsCreateBatchModalOpen } = useApp();
  const [selectedHiveId, setSelectedHiveId] = useState(hives[0]?.id || 'HV-KER-0101');

  const selectedHive = hives.find((h) => h.id === selectedHiveId) || hives[0];

  // Interactive Prediction Parameters
  const [colonyFrames, setColonyFrames] = useState(14); // 8-20 frames
  const [forageIndex, setForageIndex] = useState(85); // 0-100%
  const [weatherStability, setWeatherStability] = useState(80); // 0-100%
  const [superCount, setSuperCount] = useState(selectedHive?.honeySuperCount || 3);

  const forecast = AIService.calculateYieldForecast({
    hiveHealthScore: selectedHive?.healthScore || 90,
    colonyPopulationFrames: colonyFrames,
    forageConditionIndex: forageIndex,
    weatherStabilityIndex: weatherStability,
    supersCount: superCount,
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-200">
            Biomass & Micro-Climate Yield Model
          </span>
          <span className="text-xs font-mono text-stone-400">Yield Engine v2.4</span>
        </div>
        <h2 className="text-2xl font-bold text-[#20221F] font-heading mt-1.5">
          AI Honey Productivity & Harvest Forecast
        </h2>
        <p className="text-xs sm:text-sm text-[#7A7467] mt-0.5">
          Predict honey extraction yield per colony based on brood frame density, super volume, and satellite forage bloom.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Simulation Controls */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-white border border-[#EBE6D7] shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-[#F2ECE0] pb-3">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#8C6B1F]" />
              <h3 className="text-sm font-bold text-[#20221F]">Simulation Variable Tuner</h3>
            </div>
            <select
              value={selectedHiveId}
              onChange={(e) => setSelectedHiveId(e.target.value)}
              className="px-2.5 py-1.5 rounded-xl border border-[#D9D3C3] text-xs font-semibold bg-[#FCFBF7]"
            >
              {hives.map((h) => (
                <option key={h.id} value={h.id}>
                  {h.name} ({h.id})
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-5 text-xs">
            {/* Slider 1: Colony Frames */}
            <div>
              <div className="flex items-center justify-between font-bold text-[#20221F] mb-1.5">
                <span>Worker Bee Population Density:</span>
                <span className="font-mono text-[#8C6B1F]">{colonyFrames} Brood Frames</span>
              </div>
              <input
                type="range"
                min={8}
                max={20}
                value={colonyFrames}
                onChange={(e) => setColonyFrames(Number(e.target.value))}
                className="w-full accent-[#D9A441] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-400 mt-1 font-mono">
                <span>8 Frames (Small)</span>
                <span>14 Frames (Optimal)</span>
                <span>20 Frames (Double Brood)</span>
              </div>
            </div>

            {/* Slider 2: Forage Index */}
            <div>
              <div className="flex items-center justify-between font-bold text-[#20221F] mb-1.5">
                <span>Local Flora Bloom & Nectar Flow Index:</span>
                <span className="font-mono text-[#8C6B1F]">{forageIndex}% Flow</span>
              </div>
              <input
                type="range"
                min={20}
                max={100}
                value={forageIndex}
                onChange={(e) => setForageIndex(Number(e.target.value))}
                className="w-full accent-[#D9A441] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-400 mt-1 font-mono">
                <span>20% (Dearth)</span>
                <span>60% (Moderate)</span>
                <span>100% (Peak Bloom)</span>
              </div>
            </div>

            {/* Slider 3: Weather Stability */}
            <div>
              <div className="flex items-center justify-between font-bold text-[#20221F] mb-1.5">
                <span>Flight Weather & Temperature Stability:</span>
                <span className="font-mono text-[#8C6B1F]">{weatherStability}% Stable</span>
              </div>
              <input
                type="range"
                min={30}
                max={100}
                value={weatherStability}
                onChange={(e) => setWeatherStability(Number(e.target.value))}
                className="w-full accent-[#D9A441] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-400 mt-1 font-mono">
                <span>Rainy / High Wind</span>
                <span>Sunny / Calm Flying Days</span>
              </div>
            </div>

            {/* Slider 4: Honey Supers Count */}
            <div>
              <div className="flex items-center justify-between font-bold text-[#20221F] mb-1.5">
                <span>Installed Honey Super Chamber Count:</span>
                <span className="font-mono text-[#8C6B1F]">{superCount} Supers</span>
              </div>
              <input
                type="range"
                min={1}
                max={5}
                value={superCount}
                onChange={(e) => setSuperCount(Number(e.target.value))}
                className="w-full accent-[#D9A441] cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Forecast Output Results */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-6 rounded-3xl bg-white border border-[#EBE6D7] shadow-xs space-y-6">
            {/* Big Metric Display */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#FFF9E8] via-[#FCFBF7] to-white border border-[#F6E7A1] flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6B1F]">
                  Predicted Honey Yield
                </span>
                <div className="text-4xl sm:text-5xl font-extrabold font-mono-num text-[#20221F] mt-1">
                  {forecast.predictedYieldKg} <span className="text-xl font-medium text-stone-500">kg</span>
                </div>
                <p className="text-xs text-[#7A7467] mt-1">
                  Estimated ~{Math.round(forecast.predictedYieldKg * 2)} standard 500g glass jars
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  {forecast.confidencePercent}% Confidence
                </span>
                <p className="text-[11px] text-stone-400 mt-2 flex items-center justify-end gap-1">
                  <Calendar className="w-3.5 h-3.5" /> Optimal Window:
                </p>
                <p className="text-xs font-bold text-[#20221F]">{forecast.harvestWindow}</p>
              </div>
            </div>

            {/* Contributing Factor Weights */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#7A7467]">
                Key Driving Biological Factors
              </h4>
              <div className="space-y-2.5">
                {forecast.factors.map((f, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#FAF7EF] border border-[#EAE4D4] text-xs">
                    <div className="flex items-center justify-between font-bold text-[#20221F]">
                      <span>{f.factor}</span>
                      <span className="font-mono text-[#8C6B1F]">{f.weightPercent}% Influence</span>
                    </div>
                    <p className="text-[11px] text-[#666] mt-0.5">{f.impact}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action CTA */}
            <button
              onClick={() => setIsCreateBatchModalOpen(true)}
              className="w-full py-3 rounded-xl bg-[#20221F] hover:bg-[#383C35] text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Schedule Harvest & Reserve Batch ID</span>
              <ArrowRight className="w-4 h-4 text-[#F6E7A1]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
