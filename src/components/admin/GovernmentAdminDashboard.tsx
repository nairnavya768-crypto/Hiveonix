import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { KPICard } from '../common/KPICard';
import { StatusBadge } from '../common/StatusBadge';
import { RiskMapComponent } from './RiskMapComponent';
import { CounterfeitMonitor } from './CounterfeitMonitor';
import {
  Users,
  Box,
  FileCheck2,
  TrendingUp,
  QrCode,
  ShieldAlert,
  AlertTriangle,
  Search,
  Filter,
  Eye,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Layers,
  MapPin,
  Sliders,
  Download,
  Building2,
  Award,
} from 'lucide-react';

export const GovernmentAdminDashboard: React.FC = () => {
  const {
    batches,
    hives,
    activeTab,
    setActiveTab,
    setSelectedBatchId,
    setIsVerifyPassportOpen,
    setIsBlockchainModalOpen,
    showToast,
  } = useApp();

  const [batchSearch, setBatchSearch] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('all');
  const [beekeeperSearch, setBeekeeperSearch] = useState('');
  const [selectedStateFilter, setSelectedStateFilter] = useState('all');

  const filteredBatches = batches.filter((b) => {
    const matchesSearch =
      b.batchId.toLowerCase().includes(batchSearch.toLowerCase()) ||
      b.beekeeperName.toLowerCase().includes(batchSearch.toLowerCase()) ||
      b.apiaryLocation.toLowerCase().includes(batchSearch.toLowerCase());
    const matchesStatus = selectedStatusFilter === 'all' || b.status === selectedStatusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleApproveBatch = (batchId: string) => {
    showToast('National Approval Recorded', `Batch ${batchId} cleared for National Fair Trade Export`, 'success');
  };

  // Mock list of 1,420 registered beekeepers for the national registry tab
  const REGISTERED_BEEKEEPERS = [
    {
      id: 'BK-IND-8849',
      name: 'Anand Varma',
      state: 'Kerala',
      district: 'Wayanad',
      hives: 24,
      madhukrantiId: 'MDK-KER-2024-8849',
      kvkCluster: 'KVK Wayanad Shola',
      aadhaarKyc: 'verified',
      flora: 'Wild Cardamom & Forest',
      lastHarvestKg: 480,
    },
    {
      id: 'BK-IND-6120',
      name: 'Gurpreet Singh',
      state: 'Punjab',
      district: 'Bathinda',
      hives: 40,
      madhukrantiId: 'MDK-PB-2023-6120',
      kvkCluster: 'KVK Bathinda Agri',
      aadhaarKyc: 'verified',
      flora: 'Mustard & Clover',
      lastHarvestKg: 1250,
    },
    {
      id: 'BK-IND-3419',
      name: 'Ramesh Patel',
      state: 'Gujarat',
      district: 'Gir Somnath',
      hives: 18,
      madhukrantiId: 'MDK-GUJ-2024-3419',
      kvkCluster: 'KVK Junagadh',
      aadhaarKyc: 'verified',
      flora: 'Fennel & Acacia',
      lastHarvestKg: 380,
    },
    {
      id: 'BK-IND-9912',
      name: 'Devika Sangma',
      state: 'Meghalaya',
      district: 'East Khasi Hills',
      hives: 12,
      madhukrantiId: 'MDK-MEG-2025-9912',
      kvkCluster: 'KVK Shillong Hill',
      aadhaarKyc: 'verified',
      flora: 'Khasi Mandarin Blossom',
      lastHarvestKg: 210,
    },
    {
      id: 'BK-IND-4428',
      name: 'Shankar Lal Meena',
      state: 'Rajasthan',
      district: 'Alwar',
      hives: 32,
      madhukrantiId: 'MDK-RAJ-2024-4428',
      kvkCluster: 'KVK Alwar Mustard',
      aadhaarKyc: 'verified',
      flora: 'Raw Mustard & Ber',
      lastHarvestKg: 940,
    },
    {
      id: 'BK-IND-1102',
      name: 'Dr. Subhash Chandra',
      state: 'Himachal Pradesh',
      district: 'Kullu',
      hives: 28,
      madhukrantiId: 'MDK-HP-2023-1102',
      kvkCluster: 'KVK Kullu Valley',
      aadhaarKyc: 'verified',
      flora: 'Himalayan Flora & Apple Blossom',
      lastHarvestKg: 620,
    },
  ];

  // 1. REGIONAL RISK MAP TAB
  if (activeTab === 'risk_map') {
    return (
      <div className="space-y-8 animate-in fade-in duration-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200">
              National Epidemiological Radar
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#20221F] font-heading mt-1.5">
            Regional Pest & Disease Risk Map
          </h1>
          <p className="text-xs sm:text-sm text-[#7A7467] mt-0.5">
            Real-time hive health clusters, Varroa mite quarantine zones, and unseasonal weather alerts.
          </p>
        </div>
        <RiskMapComponent />
      </div>
    );
  }

  // 2. COUNTERFEIT RADAR TAB
  if (activeTab === 'counterfeit') {
    return (
      <div className="space-y-8 animate-in fade-in duration-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200">
              Anti-Adulteration AI Surveillance
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#20221F] font-heading mt-1.5">
            National Counterfeit Radar & C4 Sugar Alerts
          </h1>
          <p className="text-xs sm:text-sm text-[#7A7467] mt-0.5">
            Real-time detection of synthetic inverted sugars, cloned QR barcodes, and unauthorized retail distributions.
          </p>
        </div>
        <CounterfeitMonitor />
      </div>
    );
  }

  // 3. BEEKEEPER REGISTRY TAB
  if (activeTab === 'beekeepers') {
    const filteredBeekeepers = REGISTERED_BEEKEEPERS.filter((bk) => {
      const matches =
        bk.name.toLowerCase().includes(beekeeperSearch.toLowerCase()) ||
        bk.madhukrantiId.toLowerCase().includes(beekeeperSearch.toLowerCase()) ||
        bk.district.toLowerCase().includes(beekeeperSearch.toLowerCase()) ||
        bk.state.toLowerCase().includes(beekeeperSearch.toLowerCase());
      const matchesState = selectedStateFilter === 'all' || bk.state === selectedStateFilter;
      return matches && matchesState;
    });

    return (
      <div className="space-y-8 animate-in fade-in duration-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-200">
                National Madhukranti Registry
              </span>
              <span className="text-xs font-mono text-stone-400">Total: 1,420 Verified Producers</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#20221F] font-heading mt-1.5">
              Beekeeper & Apiary Census Registry
            </h1>
            <p className="text-xs sm:text-sm text-[#7A7467] mt-0.5">
              Aadhaar-linked beekeeper profiles, KVK extension cluster assignments, and seasonal yield outputs.
            </p>
          </div>

          <button
            onClick={() => showToast('Census Data Exported', '1,420 Beekeeper records exported to CSV format', 'success')}
            className="px-4 py-2.5 rounded-xl bg-[#20221F] hover:bg-[#343831] text-white text-xs font-bold transition-colors flex items-center gap-2 shadow-xs"
          >
            <Download className="w-4 h-4 text-[#F6E7A1]" />
            <span>Export Registry (CSV)</span>
          </button>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-[#EBE6D7] shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative max-w-sm w-full">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={beekeeperSearch}
                onChange={(e) => setBeekeeperSearch(e.target.value)}
                placeholder="Search beekeeper name, Madhukranti ID, district..."
                className="pl-9 pr-3.5 py-2 rounded-xl border border-[#D9D3C3] text-xs focus:outline-hidden focus:border-[#D9A441] bg-[#FCFBF7] w-full"
              />
            </div>

            <select
              value={selectedStateFilter}
              onChange={(e) => setSelectedStateFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border border-[#D9D3C3] text-xs font-semibold focus:outline-hidden focus:border-[#D9A441] bg-[#FCFBF7]"
            >
              <option value="all">All States & UTs</option>
              <option value="Kerala">Kerala</option>
              <option value="Punjab">Punjab</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Meghalaya">Meghalaya</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Himachal Pradesh">Himachal Pradesh</option>
            </select>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-[#EFE9DC]">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-[#FAF7EF] text-[#6B6557] uppercase text-[10px] font-bold tracking-wider border-b border-[#EAE3D2]">
                <tr>
                  <th className="py-3 px-4">Madhukranti ID</th>
                  <th className="py-3 px-4">Beekeeper Name</th>
                  <th className="py-3 px-4">State & District</th>
                  <th className="py-3 px-4">KVK Cluster</th>
                  <th className="py-3 px-4 font-mono-num">Smart Hives</th>
                  <th className="py-3 px-4">Dominant Flora</th>
                  <th className="py-3 px-4">e-KYC</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F2ECE0] bg-white">
                {filteredBeekeepers.map((bk) => (
                  <tr key={bk.id} className="hover:bg-[#FFFDF7] transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-[#8C6B1F]">{bk.madhukrantiId}</td>
                    <td className="py-3 px-4 font-bold text-[#20221F]">{bk.name}</td>
                    <td className="py-3 px-4 text-[#555]">{bk.district}, {bk.state}</td>
                    <td className="py-3 px-4 text-[#666]">{bk.kvkCluster}</td>
                    <td className="py-3 px-4 font-mono-num font-bold text-[#20221F]">{bk.hives} Colonies</td>
                    <td className="py-3 px-4 text-[#555]">{bk.flora}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        ✓ Verified
                      </span>
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

  // 4. ALL HIVES & APIARIES TAB
  if (activeTab === 'hives') {
    return (
      <div className="space-y-8 animate-in fade-in duration-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
              National Smart Apiary Infrastructure
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#20221F] font-heading mt-1.5">
            National Smart Hive Network & IoT Census
          </h1>
          <p className="text-xs sm:text-sm text-[#7A7467] mt-0.5">
            14,890 sensor-equipped hive chambers actively transmitting acoustic buzzing Hz, internal temp, and weight.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {hives.map((hive) => (
            <div key={hive.id} className="p-6 rounded-3xl bg-white border border-[#EBE6D7] shadow-xs space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-xs font-bold text-[#8C6B1F]">{hive.id}</span>
                  <h3 className="text-base font-bold text-[#20221F] mt-1">{hive.name}</h3>
                  <p className="text-xs text-[#7A7467]">{hive.location}</p>
                </div>
                <StatusBadge status={hive.healthStatus} size="sm" />
              </div>

              <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-[#FAF7EF] border border-[#EAE4D4] text-center text-xs">
                <div>
                  <span className="text-[10px] text-stone-400 block font-semibold">Temp</span>
                  <strong className="text-[#20221F]">{hive.sensorData.temperature}°C</strong>
                </div>
                <div>
                  <span className="text-[10px] text-stone-400 block font-semibold">Humidity</span>
                  <strong className="text-[#20221F]">{hive.sensorData.humidity}%</strong>
                </div>
                <div>
                  <span className="text-[10px] text-stone-400 block font-semibold">Weight</span>
                  <strong className="text-[#20221F]">{hive.sensorData.weight} kg</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 5. QR SCAN ANALYTICS TAB
  if (activeTab === 'qr_analytics') {
    return (
      <div className="space-y-8 animate-in fade-in duration-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
              Consumer Market Telemetry
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#20221F] font-heading mt-1.5">
            National QR Scan Volume & Geographic Analytics
          </h1>
          <p className="text-xs sm:text-sm text-[#7A7467] mt-0.5">
            Live consumer verification scans across Indian metros and export destinations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <KPICard
            title="Total Consumer Scans"
            value="142,890"
            subtitle="Verified Jars in 2026"
            trend={{ value: "+28.4% YoY", isPositive: true }}
            icon={<QrCode className="w-5 h-5 text-blue-600" />}
            accentColor="blue"
          />
          <KPICard
            title="Authenticity Confirmation"
            value="99.78%"
            subtitle="Genuine Sealed Passports"
            trend={{ value: "Pristine Compliance", isPositive: true }}
            icon={<CheckCircle2 className="w-5 h-5 text-emerald-600" />}
            accentColor="green"
          />
          <KPICard
            title="Anomalous Geolocation Spikes"
            value="3 Flags"
            subtitle="Under Active Investigation"
            trend={{ value: "Isolated", isPositive: true }}
            icon={<ShieldAlert className="w-5 h-5 text-rose-600" />}
            accentColor="red"
          />
        </div>

        <div className="p-6 rounded-3xl bg-white border border-[#EBE6D7] shadow-xs space-y-4">
          <h2 className="text-base font-bold text-[#20221F] font-heading">Top Retail Consumption Hubs</h2>
          <div className="space-y-3">
            {[
              { city: 'Mumbai & MMR', scans: '42,910', pct: 85, origin: 'Wayanad Forest Honey' },
              { city: 'Bengaluru Urban', scans: '34,200', pct: 72, origin: 'Coorg Multiflora Honey' },
              { city: 'Delhi-NCR', scans: '29,400', pct: 64, origin: 'Kashmir Acacia & Mustard' },
              { city: 'Hyderabad', scans: '18,300', pct: 45, origin: 'Eastern Ghats Forest' },
            ].map((hub, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-[#FCFBF7] border border-[#E8E2D2] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <strong className="text-[#20221F]">{hub.city}</strong>
                  <span className="font-mono font-bold text-[#8C6B1F]">{hub.scans} Scans</span>
                </div>
                <div className="h-2 rounded-full bg-[#EAE4D4] overflow-hidden">
                  <div className="h-full bg-[#D9A441] rounded-full" style={{ width: `${hub.pct}%` }} />
                </div>
                <div className="text-[11px] text-[#777]">Most popular batch origin: {hub.origin}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 6. BLOCKCHAIN LEDGER TAB
  if (activeTab === 'blockchain') {
    return (
      <div className="space-y-8 animate-in fade-in duration-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                National Purity Ledger
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#20221F] font-heading mt-1.5">
              National Honey Mission Blockchain Audit Trail
            </h1>
            <p className="text-xs sm:text-sm text-[#7A7467] mt-0.5">
              Decentralized validator nodes hosted across NBHM, NABL, and ICAR institutions.
            </p>
          </div>

          <button
            onClick={() => setIsBlockchainModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-[#20221F] hover:bg-[#343831] text-white text-xs font-bold transition-colors flex items-center gap-2 shadow-xs"
          >
            <Layers className="w-4 h-4 text-[#F6E7A1]" />
            <span>Open Node Explorer</span>
          </button>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-[#EBE6D7] shadow-xs space-y-4">
          <h2 className="text-base font-bold text-[#20221F] font-heading">Recent Consensus Blocks</h2>
          <div className="space-y-3">
            {batches.map((b) => (
              <div key={b.batchId} className="p-4 rounded-2xl bg-[#FCFBF7] border border-[#E8E2D2] text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-[#8C6B1F]">Batch {b.batchId}</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-mono text-[10px] font-bold">
                    ✓ Verified on PoP Ledger
                  </span>
                </div>
                <p className="text-[#333]">
                  Producer: <strong>{b.beekeeperName}</strong> • Lab Cert: <strong>{b.labResults?.labCertificateId || 'Certified'}</strong>
                </p>
                <div className="flex items-center justify-between text-[10px] font-mono text-stone-400 pt-1 border-t border-[#EFE8D8]">
                  <span>Hash: {b.blockchainHash || '0x4f12...'}</span>
                  <span>Validator: NBHM-NODE-01</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 7. NATIONAL STANDARDS (SETTINGS) TAB
  if (activeTab === 'settings') {
    return (
      <div className="space-y-8 animate-in fade-in duration-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 border border-slate-200">
              Regulatory Policy Thresholds
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#20221F] font-heading mt-1.5">
            National Honey Purity Standards (FSSAI & NABL)
          </h1>
          <p className="text-xs sm:text-sm text-[#7A7467] mt-0.5">
            Government parameters enforced across all accredited Agmark and NABL testing laboratories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-[#EBE6D7] shadow-xs space-y-4">
            <h2 className="text-base font-bold text-[#20221F] font-heading flex items-center gap-2">
              <Sliders className="w-5 h-5 text-[#8C6B1F]" />
              <span>Chemical & Adulteration Limits</span>
            </h2>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-[#FCFBF7] border border-[#E8E2D2] flex items-center justify-between">
                <div>
                  <strong className="block text-[#20221F]">C4 Sugar Adulteration</strong>
                  <span className="text-[11px] text-stone-400">Carbon isotope delta ratio</span>
                </div>
                <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200">
                  Strictly 0.0% (Zero Tolerance)
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FCFBF7] border border-[#E8E2D2] flex items-center justify-between">
                <div>
                  <strong className="block text-[#20221F]">Max Permissible Moisture</strong>
                  <span className="text-[11px] text-stone-400">Prevents natural fermentation</span>
                </div>
                <span className="font-mono font-bold text-[#20221F] bg-[#FAF7EF] px-2.5 py-1 rounded-xl border border-[#EAE3D2]">
                  ≤ 20.0%
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FCFBF7] border border-[#E8E2D2] flex items-center justify-between">
                <div>
                  <strong className="block text-[#20221F]">Max Hydroxymethylfurfural (HMF)</strong>
                  <span className="text-[11px] text-stone-400">Heat freshness index</span>
                </div>
                <span className="font-mono font-bold text-[#20221F] bg-[#FAF7EF] px-2.5 py-1 rounded-xl border border-[#EAE3D2]">
                  ≤ 40.0 mg/kg
                </span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#EBE6D7] shadow-xs space-y-4">
            <h2 className="text-base font-bold text-[#20221F] font-heading flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-600" />
              <span>Export Quality Clearance Policy</span>
            </h2>
            <p className="text-xs text-[#666] leading-relaxed">
              Batches meeting Grade A+ parameters automatically receive direct fair-trade export passports with digital seal verification for EU, US, and Middle East markets.
            </p>
            <div className="p-3.5 rounded-2xl bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
              ✓ Automated Single-Window Export Clearance Enabled
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 8. DEFAULT: MISSION OVERVIEW / VERIFIED BATCHES DIRECTORY
  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-200">
              National Honey Mission (NBHM) / KVK Command
            </span>
            <span className="text-xs font-mono text-stone-400">Node ID: GOV-DEL-01</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#20221F] font-heading mt-1.5">
            National Beekeeping & Quality Oversight
          </h1>
          <p className="text-xs sm:text-sm text-[#7A7467] mt-0.5">
            Real-time apiary telemetry, laboratory compliance audits, and blockchain traceability across India.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsBlockchainModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-white border border-[#D9D3C3] hover:bg-[#FCFBF7] text-xs font-bold text-[#20221F] flex items-center gap-2 shadow-2xs transition-colors"
          >
            <Layers className="w-4 h-4 text-[#8C6B1F]" />
            <span>Audit Blockchain Ledger</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Registered Beekeepers"
          value="1,420"
          subtitle="Madhukranti & KVK Verified"
          trend={{ value: "+14.2% MoM", isPositive: true }}
          icon={<Users className="w-5 h-5 text-purple-600" />}
          accentColor="yellow"
        />
        <KPICard
          title="Active Smart Hives"
          value="14,890"
          subtitle="IoT Sensor Nodes Online"
          trend={{ value: "+8.6% MoM", isPositive: true }}
          icon={<Box className="w-5 h-5 text-amber-600" />}
          accentColor="green"
        />
        <KPICard
          title="Verified Honey Batches"
          value="8,940"
          subtitle="NABL Certified Grade A+"
          trend={{ value: "99.8% Purity Rate", isPositive: true }}
          icon={<FileCheck2 className="w-5 h-5 text-emerald-600" />}
          accentColor="blue"
        />
        <KPICard
          title="Counterfeit Flags"
          value="3"
          subtitle="All 3 Locked & Geo-Isolated"
          trend={{ value: "0 Breaches Active", isPositive: true }}
          icon={<ShieldAlert className="w-5 h-5 text-rose-600" />}
          accentColor="red"
        />
      </div>

      {/* Verified Batches Directory */}
      <div className="p-6 rounded-3xl bg-white border border-[#EBE6D7] shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-[#20221F] font-heading">
              National Honey Batch Registry & Certifications
            </h3>
            <p className="text-xs text-[#7A7467] mt-0.5">
              Inspected batch records with NABL laboratory parameters and blockchain signatures
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={batchSearch}
                onChange={(e) => setBatchSearch(e.target.value)}
                placeholder="Search Batch ID, Beekeeper, State..."
                className="pl-9 pr-3.5 py-2 rounded-xl border border-[#D9D3C3] text-xs focus:outline-hidden focus:border-[#D9A441] bg-[#FCFBF7] w-64"
              />
            </div>

            <select
              value={selectedStatusFilter}
              onChange={(e) => setSelectedStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border border-[#D9D3C3] text-xs font-semibold focus:outline-hidden focus:border-[#D9A441] bg-[#FCFBF7]"
            >
              <option value="all">All Statuses</option>
              <option value="retail_ready">Passport Verified</option>
              <option value="lab_pending">Lab Pending</option>
              <option value="in_logistics">In Cold Logistics</option>
              <option value="lab_rejected">Quality Rejected</option>
            </select>
          </div>
        </div>

        {/* Batches Table */}
        <div className="overflow-x-auto rounded-2xl border border-[#EFE9DC]">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-[#FAF7EF] text-[#6B6557] uppercase text-[10px] font-bold tracking-wider border-b border-[#EAE3D2]">
              <tr>
                <th className="py-3 px-4">Batch ID & QR</th>
                <th className="py-3 px-4">Producer & Apiary</th>
                <th className="py-3 px-4">Flora Type</th>
                <th className="py-3 px-4">Harvest Quantity</th>
                <th className="py-3 px-4">Lab Parameters</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F2ECE0] bg-white">
              {filteredBatches.map((batch) => (
                <tr key={batch.batchId} className="hover:bg-[#FFFDF7] transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-mono font-bold text-[#20221F]">{batch.batchId}</div>
                    <div className="text-[10px] text-stone-400 font-mono">{batch.harvestDate}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-[#20221F]">{batch.beekeeperName}</div>
                    <div className="text-[11px] text-[#777] line-clamp-1">{batch.apiaryLocation}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-medium text-[#20221F]">{batch.honeyFloraType}</span>
                  </td>
                  <td className="py-3.5 px-4 font-mono-num">
                    <span className="font-bold text-[#20221F]">{batch.quantityKg} kg</span>
                    <span className="text-[11px] text-[#888] block">({batch.bottleCount} jars)</span>
                  </td>
                  <td className="py-3.5 px-4">
                    {batch.labResults ? (
                      <div className="text-[11px] space-y-0.5">
                        <div className="flex items-center gap-1 font-mono-num">
                          <span className="text-[#666]">Moisture:</span>
                          <strong className={batch.labResults.moisturePercent > 20 ? 'text-rose-600' : 'text-[#20221F]'}>
                            {batch.labResults.moisturePercent}%
                          </strong>
                        </div>
                        <div className="flex items-center gap-1 font-mono-num">
                          <span className="text-[#666]">C4 Sugar:</span>
                          <strong className={batch.labResults.c4SugarAdulterationPercent > 0 ? 'text-rose-600' : 'text-emerald-700'}>
                            {batch.labResults.c4SugarAdulterationPercent}%
                          </strong>
                        </div>
                      </div>
                    ) : (
                      <span className="text-[11px] text-amber-700 font-medium">In Queue</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={batch.status} size="sm" />
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => {
                          setSelectedBatchId(batch.batchId);
                          setIsVerifyPassportOpen(true);
                        }}
                        className="p-1.5 rounded-lg border border-[#D9D3C3] hover:bg-[#FAF7EF] text-stone-600 hover:text-stone-900 transition-colors"
                        title="View Honey Passport"
                      >
                        <QrCode className="w-3.5 h-3.5 text-[#8C6B1F]" />
                      </button>
                      <button
                        onClick={() => handleApproveBatch(batch.batchId)}
                        className="px-2.5 py-1 rounded-lg bg-[#20221F] hover:bg-[#383C35] text-white text-[11px] font-bold transition-colors"
                      >
                        Verify
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
