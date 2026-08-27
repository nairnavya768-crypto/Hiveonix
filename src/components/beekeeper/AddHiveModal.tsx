import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Hive } from '../../types';
import { Box, Plus, X, MapPin } from 'lucide-react';

export const AddHiveModal: React.FC = () => {
  const { isAddHiveModalOpen, setIsAddHiveModalOpen, addHive, currentUser } = useApp();

  const [hiveName, setHiveName] = useState('Nilgiri Hill Chamber #4');
  const [apiaryName, setApiaryName] = useState(currentUser.organization || 'Nilgiri Shola Apiary');
  const [location, setLocation] = useState(currentUser.location || 'Wayanad, Kerala');
  const [species, setSpecies] = useState<Hive['species']>('Apis cerana indica');
  const [supers, setSupers] = useState(2);
  const [queenBreed, setQueenBreed] = useState('Apis cerana indica (High Nectar Yield Strain)');

  if (!isAddHiveModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newHive: Hive = {
      id: `HV-${location.substring(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
      name: hiveName,
      apiaryName,
      location,
      coordinates: { lat: 11.6854, lng: 76.132 },
      species,
      establishedDate: new Date().toISOString().split('T')[0],
      healthStatus: 'healthy',
      healthScore: 95,
      honeySuperCount: supers,
      estimatedHarvestYieldKg: supers * 12.5,
      lastInspectionDate: new Date().toISOString().split('T')[0],
      sensorData: {
        temperature: 34.6,
        humidity: 58,
        weight: 39.4,
        acousticFrequency: 215,
        activityIndex: 90,
        batteryLevel: 100,
        lastUpdated: 'Just now',
      },
      queen: {
        id: `QN-${location.substring(0, 3).toUpperCase()}-${Date.now().toString().slice(-4)}`,
        installedDate: new Date().toISOString().split('T')[0],
        ageMonths: 1,
        status: 'healthy',
        breed: queenBreed,
        layingPatternScore: 98,
      },
      historyLogs: [
        {
          date: new Date().toISOString().split('T')[0],
          action: 'Chamber Commissioned & IoT Telemetry Activated',
          inspector: currentUser.name,
          note: 'Smart hive synced to Hiveonix Mesh.',
        },
      ],
    };

    addHive(newHive);
    setIsAddHiveModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl border border-[#E8E2D2] shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-[#FFF9E8] via-[#FCFBF7] to-white border-b border-[#F0EAD9] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#F6E7A1] border border-[#D9A441]/40 flex items-center justify-center shadow-2xs">
              <Box className="w-5 h-5 text-[#8C6B1F]" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#20221F] font-heading">Register New Smart Hive</h2>
              <p className="text-xs text-[#7A7467]">Deploy IoT sensors and queen lineage tracking</p>
            </div>
          </div>
          <button
            onClick={() => setIsAddHiveModalOpen(false)}
            className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#20221F] mb-1">Hive Identifier / Chamber Name</label>
            <input
              type="text"
              required
              value={hiveName}
              onChange={(e) => setHiveName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9D3C3] text-xs font-medium focus:border-[#D9A441] bg-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#20221F] mb-1">Apiary Name</label>
              <input
                type="text"
                required
                value={apiaryName}
                onChange={(e) => setApiaryName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9D3C3] text-xs font-medium focus:border-[#D9A441] bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#20221F] mb-1">Geographical Location</label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9D3C3] text-xs font-medium focus:border-[#D9A441] bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#20221F] mb-1">Bee Species</label>
              <select
                value={species}
                onChange={(e) => setSpecies(e.target.value as any)}
                className="w-full px-3 py-2.5 rounded-xl border border-[#D9D3C3] text-xs font-medium focus:border-[#D9A441] bg-white"
              >
                <option value="Apis cerana indica">Apis cerana indica (Indian Native)</option>
                <option value="Apis mellifera">Apis mellifera (Italian / European)</option>
                <option value="Apis dorsata">Apis dorsata (Giant Rock Bee)</option>
                <option value="Tetragonula iridipennis">Tetragonula (Stingless Bee)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-[#20221F] mb-1">Honey Supers Installed</label>
              <input
                type="number"
                min={1}
                max={6}
                value={supers}
                onChange={(e) => setSupers(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9D3C3] text-xs font-medium focus:border-[#D9A441] bg-white font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#20221F] mb-1">Queen Lineage & Breed</label>
            <input
              type="text"
              value={queenBreed}
              onChange={(e) => setQueenBreed(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9D3C3] text-xs font-medium focus:border-[#D9A441] bg-white"
            />
          </div>

          <div className="p-3 rounded-xl bg-[#FFF9E8] border border-[#F6E7A1] text-xs text-[#7A6020]">
            ⚡ Automatic Calibration: Temperature, weight load-cell, and acoustic microphones will link via LoRaWAN/Wi-Fi.
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsAddHiveModalOpen(false)}
              className="w-1/3 py-2.5 rounded-xl border border-[#D9D3C3] text-xs font-semibold text-[#555] hover:bg-stone-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-2/3 py-2.5 rounded-xl bg-[#20221F] hover:bg-[#343831] text-white text-xs font-bold shadow-md flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4 text-[#F6E7A1]" />
              <span>Deploy Smart Hive</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
