import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  MapPin,
  Building2,
  Users,
  Box,
  Scale,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  FileCheck2,
  CheckCircle2,
  Filter,
  Search,
  ArrowRight,
  Sparkles,
  ExternalLink,
  Layers,
  ChevronDown,
  TrendingUp,
  Download,
} from 'lucide-react';

export interface DistrictData {
  id: string;
  name: string;
  kvkCluster: string;
  beekeepersCount: number;
  hivesCount: number;
  yieldKg: number;
  healthScore: number;
  riskLevel: 'low' | 'moderate' | 'high';
  topFlora: string;
  nablPassRate: number;
  officerInCharge: string;
  contactEmail: string;
  advisoryNote: string;
  beekeepersList: {
    name: string;
    madhukrantiId: string;
    hives: number;
    lastHarvestKg: number;
    status: 'active' | 'watch';
  }[];
}

export interface StateRegion {
  name: string;
  code: string;
  zone: string;
  totalBeekeepers: number;
  totalHives: number;
  annualYieldKg: number;
  avgHealthScore: number;
  riskLevel: 'low' | 'moderate' | 'high';
  districts: DistrictData[];
}

export const NATIONAL_STATE_DATA: StateRegion[] = [
  {
    name: 'Kerala',
    code: 'KL',
    zone: 'Southern Western Ghats',
    totalBeekeepers: 420,
    totalHives: 3850,
    annualYieldKg: 64200,
    avgHealthScore: 92,
    riskLevel: 'low',
    districts: [
      {
        id: 'kl_wayanad',
        name: 'Wayanad',
        kvkCluster: 'KVK Wayanad Shola Apiary Center (Ambalavayal)',
        beekeepersCount: 165,
        hivesCount: 1480,
        yieldKg: 28500,
        healthScore: 94,
        riskLevel: 'low',
        topFlora: 'Wild Cardamom, Coffee Blossom, Shola Rainforest',
        nablPassRate: 99.4,
        officerInCharge: 'Dr. Joseph Thomas (Senior Agronomist)',
        contactEmail: 'kvk.wayanad@nbhm.gov.in',
        advisoryNote: 'Optimal nectar flow recorded. Zero pesticide detection across 48 audited batches.',
        beekeepersList: [
          { name: 'Anand Varma', madhukrantiId: 'MDK-KER-2024-8849', hives: 24, lastHarvestKg: 480, status: 'active' },
          { name: 'Sreejit Nambiar', madhukrantiId: 'MDK-KER-2023-4102', hives: 32, lastHarvestKg: 690, status: 'active' },
          { name: 'Meera Kurup', madhukrantiId: 'MDK-KER-2025-7719', hives: 18, lastHarvestKg: 340, status: 'active' },
        ],
      },
      {
        id: 'kl_idukki',
        name: 'Idukki',
        kvkCluster: 'KVK Idukki High Range Division (Santhampara)',
        beekeepersCount: 140,
        hivesCount: 1320,
        yieldKg: 22400,
        healthScore: 91,
        riskLevel: 'low',
        topFlora: 'Rubber Blossom, Clove & Spices',
        nablPassRate: 98.8,
        officerInCharge: 'Dr. Priya Varghese (NBHM Inspecting Officer)',
        contactEmail: 'kvk.idukki@nbhm.gov.in',
        advisoryNote: 'High rubber honey harvest. Standardize moisture below 19.5% prior to bottling.',
        beekeepersList: [
          { name: 'Mathew Abraham', madhukrantiId: 'MDK-KER-2023-9012', hives: 40, lastHarvestKg: 820, status: 'active' },
          { name: 'Biju George', madhukrantiId: 'MDK-KER-2024-1148', hives: 22, lastHarvestKg: 460, status: 'active' },
        ],
      },
      {
        id: 'kl_kozhikode',
        name: 'Kozhikode',
        kvkCluster: 'KVK Kozhikode Coastal & Foothills (Peruvannamuzhi)',
        beekeepersCount: 115,
        hivesCount: 1050,
        yieldKg: 13300,
        healthScore: 89,
        riskLevel: 'low',
        topFlora: 'Coconut, Multi-floral, Stingless Bee Honey (Cheruthen)',
        nablPassRate: 98.1,
        officerInCharge: 'Dr. Radhakrishnan K. (KAU Consultant)',
        contactEmail: 'kvk.kozhikode@nbhm.gov.in',
        advisoryNote: 'Stingless bee honey (Tetragonula iridipennis) demand up 40%. High medicinal value certified.',
        beekeepersList: [
          { name: 'K. Narayanan', madhukrantiId: 'MDK-KER-2024-6331', hives: 28, lastHarvestKg: 290, status: 'active' },
        ],
      },
    ],
  },
  {
    name: 'Punjab',
    code: 'PB',
    zone: 'Northern Indo-Gangetic Plains',
    totalBeekeepers: 380,
    totalHives: 4600,
    annualYieldKg: 94000,
    avgHealthScore: 82,
    riskLevel: 'moderate',
    districts: [
      {
        id: 'pb_bathinda',
        name: 'Bathinda',
        kvkCluster: 'KVK Bathinda Agri Center (PAU Regional Station)',
        beekeepersCount: 180,
        hivesCount: 2200,
        yieldKg: 46500,
        healthScore: 84,
        riskLevel: 'low',
        topFlora: 'Yellow Mustard (Sarson), Ber, Clover',
        nablPassRate: 97.9,
        officerInCharge: 'Dr. Balwinder Singh (PAU Entymology Head)',
        contactEmail: 'kvk.bathinda@nbhm.gov.in',
        advisoryNote: 'Mustard bloom peak. Ensure pesticide spray buffer hours (dusk/night) with local mustard farmers.',
        beekeepersList: [
          { name: 'Gurpreet Singh', madhukrantiId: 'MDK-PB-2023-6120', hives: 40, lastHarvestKg: 1250, status: 'active' },
          { name: 'Harpreet Dhillon', madhukrantiId: 'MDK-PB-2024-5512', hives: 55, lastHarvestKg: 1680, status: 'active' },
        ],
      },
      {
        id: 'pb_ludhiana',
        name: 'Ludhiana',
        kvkCluster: 'PAU Ludhiana Central Honey Research Center',
        beekeepersCount: 120,
        hivesCount: 1500,
        yieldKg: 31500,
        healthScore: 79,
        riskLevel: 'moderate',
        topFlora: 'Eucalyptus, Sunflower, Multi-Flora',
        nablPassRate: 96.5,
        officerInCharge: 'Dr. J. S. Sandhu (PAU Director)',
        contactEmail: 'kvk.ludhiana@nbhm.gov.in',
        advisoryNote: 'Varroa mite screening advisory issued. 2 commercial apiaries undergoing organic thymol treatment.',
        beekeepersList: [
          { name: 'Paramjit Gill', madhukrantiId: 'MDK-PB-2024-3381', hives: 30, lastHarvestKg: 890, status: 'watch' },
        ],
      },
      {
        id: 'pb_hoshiarpur',
        name: 'Hoshiarpur',
        kvkCluster: 'KVK Hoshiarpur Sub-Mountain Kandi Apiary Cluster',
        beekeepersCount: 80,
        hivesCount: 900,
        yieldKg: 16000,
        healthScore: 86,
        riskLevel: 'low',
        topFlora: 'Shisham, Kinnow Citrus Blossom, Kandi Forest',
        nablPassRate: 99.0,
        officerInCharge: 'Dr. Manjit Sharma (Forest Entomologist)',
        contactEmail: 'kvk.hoshiarpur@nbhm.gov.in',
        advisoryNote: 'Kinnow citrus nectar flow high. Moisture levels strictly below 18.0%.',
        beekeepersList: [
          { name: 'Amrik Singh', madhukrantiId: 'MDK-PB-2025-1029', hives: 25, lastHarvestKg: 620, status: 'active' },
        ],
      },
    ],
  },
  {
    name: 'Himachal Pradesh',
    code: 'HP',
    zone: 'Himalayan Temperate Flora Basin',
    totalBeekeepers: 260,
    totalHives: 2900,
    annualYieldKg: 41000,
    avgHealthScore: 94,
    riskLevel: 'low',
    districts: [
      {
        id: 'hp_kullu',
        name: 'Kullu',
        kvkCluster: 'KVK Kullu (Bajaura) Regional Temperate Fruit Apiary',
        beekeepersCount: 110,
        hivesCount: 1250,
        yieldKg: 18200,
        healthScore: 95,
        riskLevel: 'low',
        topFlora: 'Apple Blossom, Wild Himalayan Plectranthus (Solai)',
        nablPassRate: 99.8,
        officerInCharge: 'Dr. Subhash Chandra (Himalayan Honey Board)',
        contactEmail: 'kvk.kullu@nbhm.gov.in',
        advisoryNote: 'Pristine Himalayan organic certification passed. Solai nectar purity at 99.4%.',
        beekeepersList: [
          { name: 'Dr. Subhash Chandra', madhukrantiId: 'MDK-HP-2023-1102', hives: 28, lastHarvestKg: 620, status: 'active' },
          { name: 'Rakesh Thakur', madhukrantiId: 'MDK-HP-2024-9102', hives: 24, lastHarvestKg: 490, status: 'active' },
        ],
      },
      {
        id: 'hp_shimla',
        name: 'Shimla',
        kvkCluster: 'KVK Shimla (Rohru) High Altitude Bee Lab',
        beekeepersCount: 90,
        hivesCount: 1050,
        yieldKg: 14800,
        healthScore: 93,
        riskLevel: 'low',
        topFlora: 'White Acacia, Wild Raspberry, Pine Honeydew',
        nablPassRate: 99.5,
        officerInCharge: 'Dr. Vandana Verma (YSP UHF Nauni)',
        contactEmail: 'kvk.shimla@nbhm.gov.in',
        advisoryNote: 'High wintering survival rate (98.2%). Zero antibiotic residues.',
        beekeepersList: [
          { name: 'Kewal Ram', madhukrantiId: 'MDK-HP-2024-4019', hives: 20, lastHarvestKg: 380, status: 'active' },
        ],
      },
      {
        id: 'hp_kinnaur',
        name: 'Kinnaur',
        kvkCluster: 'KVK Kinnaur (Kalpa) Tribal Apiary Division',
        beekeepersCount: 60,
        hivesCount: 600,
        yieldKg: 8000,
        healthScore: 96,
        riskLevel: 'low',
        topFlora: 'High Altitude Flora, Wild Seabuckthorn, Apple',
        nablPassRate: 100.0,
        officerInCharge: 'Dr. Tsering Dorje (Tribal Agri Officer)',
        contactEmail: 'kvk.kinnaur@nbhm.gov.in',
        advisoryNote: '100% organic grade A+ honey minted for national GI-tagging.',
        beekeepersList: [
          { name: 'Sonam Negi', madhukrantiId: 'MDK-HP-2025-8812', hives: 16, lastHarvestKg: 280, status: 'active' },
        ],
      },
    ],
  },
  {
    name: 'Maharashtra',
    code: 'MH',
    zone: 'Deccan & Western Ghats Foothills',
    totalBeekeepers: 310,
    totalHives: 3200,
    annualYieldKg: 52000,
    avgHealthScore: 76,
    riskLevel: 'moderate',
    districts: [
      {
        id: 'mh_satara',
        name: 'Satara (Mahabaleshwar)',
        kvkCluster: 'Mahabaleshwar Honey Bee Center (Madhusagar Co-op)',
        beekeepersCount: 160,
        hivesCount: 1750,
        yieldKg: 31000,
        healthScore: 88,
        riskLevel: 'low',
        topFlora: 'Jamun, Hirda, Gela, Forest Wild Berry',
        nablPassRate: 98.4,
        officerInCharge: 'Dr. Sanjay Deshmukh (MSKVIB Directorate)',
        contactEmail: 'kvk.satara@nbhm.gov.in',
        advisoryNote: 'Mahabaleshwar Jamun honey harvesting season active. Fructose-glucose ratio 1.25.',
        beekeepersList: [
          { name: 'Prakash Patil', madhukrantiId: 'MDK-MH-2024-8192', hives: 35, lastHarvestKg: 780, status: 'active' },
        ],
      },
      {
        id: 'mh_pune',
        name: 'Pune',
        kvkCluster: 'KVK Pune (Baramati) Precision Apiary Center',
        beekeepersCount: 90,
        hivesCount: 850,
        yieldKg: 13000,
        healthScore: 68,
        riskLevel: 'high',
        topFlora: 'Sunflower, Mustard, Pomegranate Blossom',
        nablPassRate: 94.2,
        officerInCharge: 'Dr. Vijay Kadam (Senior Agronomist)',
        contactEmail: 'kvk.pune@nbhm.gov.in',
        advisoryNote: 'Elevated summer temperature stress (>41°C). Apiary shade netting advisory active.',
        beekeepersList: [
          { name: 'Nitin Shinde', madhukrantiId: 'MDK-MH-2023-7729', hives: 22, lastHarvestKg: 340, status: 'watch' },
        ],
      },
    ],
  },
  {
    name: 'Rajasthan',
    code: 'RJ',
    zone: 'Aravalli & Eastern Mustard Belt',
    totalBeekeepers: 290,
    totalHives: 3400,
    annualYieldKg: 68000,
    avgHealthScore: 85,
    riskLevel: 'low',
    districts: [
      {
        id: 'rj_alwar',
        name: 'Alwar',
        kvkCluster: 'KVK Alwar Eastern Mustard Cluster',
        beekeepersCount: 150,
        hivesCount: 1800,
        yieldKg: 38000,
        healthScore: 87,
        riskLevel: 'low',
        topFlora: 'Mustard (Brassica), Ber, Eucalyptus',
        nablPassRate: 98.7,
        officerInCharge: 'Dr. Shankar Lal Meena (NBHM State Node)',
        contactEmail: 'kvk.alwar@nbhm.gov.in',
        advisoryNote: 'Bumper mustard flow. 1,800 quintals cleared for export processing.',
        beekeepersList: [
          { name: 'Shankar Lal Meena', madhukrantiId: 'MDK-RAJ-2024-4428', hives: 32, lastHarvestKg: 940, status: 'active' },
        ],
      },
      {
        id: 'rj_bharatpur',
        name: 'Bharatpur',
        kvkCluster: 'KVK Bharatpur National Mustard Research Center',
        beekeepersCount: 140,
        hivesCount: 1600,
        yieldKg: 30000,
        healthScore: 84,
        riskLevel: 'low',
        topFlora: 'Mustard, Dhak (Palash), Coriander',
        nablPassRate: 97.8,
        officerInCharge: 'Dr. P. K. Rai (Director ICAR-DRMR)',
        contactEmail: 'kvk.bharatpur@nbhm.gov.in',
        advisoryNote: 'High crystalline natural honey properties recorded. Glucose-fructose stability certified.',
        beekeepersList: [
          { name: 'Bhanwar Singh', madhukrantiId: 'MDK-RAJ-2024-9918', hives: 28, lastHarvestKg: 810, status: 'active' },
        ],
      },
    ],
  },
  {
    name: 'Meghalaya',
    code: 'ML',
    zone: 'North-Eastern Khasi & Garo Hills',
    totalBeekeepers: 180,
    totalHives: 1600,
    annualYieldKg: 21000,
    avgHealthScore: 96,
    riskLevel: 'low',
    districts: [
      {
        id: 'ml_eastkhasi',
        name: 'East Khasi Hills',
        kvkCluster: 'KVK East Khasi Hills (Upper Shillong)',
        beekeepersCount: 100,
        hivesCount: 950,
        yieldKg: 13200,
        healthScore: 97,
        riskLevel: 'low',
        topFlora: 'Khasi Mandarin Blossom, Wild Buckwheat, Shola Floral Herbs',
        nablPassRate: 100.0,
        officerInCharge: 'Dr. Devika Sangma (NEH Apiary Consultant)',
        contactEmail: 'kvk.shillong@nbhm.gov.in',
        advisoryNote: 'Pristine mountain nectar. Zero C4 sugar adulteration across 100% of tested samples.',
        beekeepersList: [
          { name: 'Devika Sangma', madhukrantiId: 'MDK-MEG-2025-9912', hives: 12, lastHarvestKg: 210, status: 'active' },
        ],
      },
    ],
  },
];

export const StateDistrictExplorer: React.FC = () => {
  const { setSelectedBatchId, setIsVerifyPassportOpen, showToast } = useApp();

  const [selectedStateCode, setSelectedStateCode] = useState<string>('KL');
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const currentState = NATIONAL_STATE_DATA.find((s) => s.code === selectedStateCode) || NATIONAL_STATE_DATA[0];

  const availableDistricts = currentState.districts;

  const currentDistrict =
    selectedDistrictId === 'all'
      ? null
      : availableDistricts.find((d) => d.id === selectedDistrictId);

  // Aggregated or District specific metrics
  const activeHives = currentDistrict
    ? currentDistrict.hivesCount
    : currentState.districts.reduce((sum, d) => sum + d.hivesCount, 0);

  const activeBeekeepers = currentDistrict
    ? currentDistrict.beekeepersCount
    : currentState.districts.reduce((sum, d) => sum + d.beekeepersCount, 0);

  const activeYield = currentDistrict
    ? currentDistrict.yieldKg
    : currentState.districts.reduce((sum, d) => sum + d.yieldKg, 0);

  const activeHealthScore = currentDistrict
    ? currentDistrict.healthScore
    : Math.round(
        currentState.districts.reduce((sum, d) => sum + d.healthScore, 0) /
          (currentState.districts.length || 1)
      );

  const activePassRate = currentDistrict
    ? currentDistrict.nablPassRate
    : (
        currentState.districts.reduce((sum, d) => sum + d.nablPassRate, 0) /
        (currentState.districts.length || 1)
      ).toFixed(1);

  const activeFlora = currentDistrict
    ? currentDistrict.topFlora
    : currentState.districts.map((d) => d.topFlora.split(',')[0]).join(', ');

  const activeOfficer = currentDistrict
    ? currentDistrict.officerInCharge
    : `${currentState.districts[0]?.officerInCharge} (State Nodal Officer)`;

  const activeKvk = currentDistrict
    ? currentDistrict.kvkCluster
    : `${currentState.districts.length} KVK Centers Active across ${currentState.name}`;

  const activeAdvisory = currentDistrict
    ? currentDistrict.advisoryNote
    : `Regional state advisory: Favorable bloom across ${currentState.districts.map((d) => d.name).join(', ')}. Continuous IoT telemetry synchronization maintained.`;

  // Filtered beekeepers
  const allBeekeepersInSelection = currentDistrict
    ? currentDistrict.beekeepersList
    : currentState.districts.flatMap((d) => d.beekeepersList);

  const filteredBeekeepers = allBeekeepersInSelection.filter((b) =>
    b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.madhukrantiId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleExportDistrictReport = () => {
    showToast(
      'Government Report Generated',
      `Official NBHM Census & Quality Dossier for ${currentDistrict ? currentDistrict.name : currentState.name} downloaded.`,
      'success'
    );
  };

  return (
    <div className="space-y-6">
      {/* State & District Selector Bar */}
      <div className="p-5 rounded-3xl bg-white border border-[#E8E2D2] shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h2 className="text-base sm:text-lg font-bold text-[#20221F] font-heading">
                State & District Beekeeping Census & Quality Explorer
              </h2>
            </div>
            <p className="text-xs text-[#7A7467] mt-0.5">
              Select any state and administrative district below to view live apiary telemetry, NABL pass rates, and registered beekeepers.
            </p>
          </div>

          <button
            onClick={handleExportDistrictReport}
            className="px-4 py-2 rounded-xl bg-[#20221F] hover:bg-[#343831] text-white text-xs font-bold transition-all flex items-center gap-2 shadow-2xs self-start md:self-auto shrink-0"
          >
            <Download className="w-4 h-4 text-[#F6E7A1]" />
            <span>Export District Dossier (PDF/CSV)</span>
          </button>
        </div>

        {/* Dropdown Filters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2 border-t border-[#F0EAD9]">
          {/* State Selector */}
          <div>
            <label className="block text-xs font-bold text-[#20221F] mb-1">
              Select Indian State / UT
            </label>
            <div className="relative">
              <select
                value={selectedStateCode}
                onChange={(e) => {
                  setSelectedStateCode(e.target.value);
                  setSelectedDistrictId('all');
                }}
                className="w-full pl-3.5 pr-8 py-2.5 rounded-xl border border-[#D9D3C3] text-xs font-bold bg-[#FCFBF7] text-[#20221F] focus:border-[#D9A441] focus:outline-hidden appearance-none cursor-pointer"
              >
                {NATIONAL_STATE_DATA.map((st) => (
                  <option key={st.code} value={st.code}>
                    {st.name} ({st.totalHives.toLocaleString()} Hives • {st.districts.length} Districts)
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-stone-400 absolute right-3 top-3 pointer-events-none" />
            </div>
          </div>

          {/* District Selector */}
          <div>
            <label className="block text-xs font-bold text-[#20221F] mb-1">
              Select Administrative District
            </label>
            <div className="relative">
              <select
                value={selectedDistrictId}
                onChange={(e) => setSelectedDistrictId(e.target.value)}
                className="w-full pl-3.5 pr-8 py-2.5 rounded-xl border border-[#D9D3C3] text-xs font-bold bg-[#FCFBF7] text-[#20221F] focus:border-[#D9A441] focus:outline-hidden appearance-none cursor-pointer"
              >
                <option value="all">All Districts in {currentState.name} ({availableDistricts.length} Districts)</option>
                {availableDistricts.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} ({d.hivesCount.toLocaleString()} Hives)
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-stone-400 absolute right-3 top-3 pointer-events-none" />
            </div>
          </div>

          {/* Search within District */}
          <div>
            <label className="block text-xs font-bold text-[#20221F] mb-1">
              Search Beekeeper / Madhukranti ID
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g. Anand Varma or MDK-KER"
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-[#D9D3C3] text-xs bg-[#FCFBF7] text-[#20221F] focus:border-[#D9A441] focus:outline-hidden"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Selected Territory Header & KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white border border-[#E8E2D2] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-stone-400">
            <span className="font-semibold">Active Smart Hives</span>
            <Box className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-2xl font-bold font-mono-num text-[#20221F]">
            {activeHives.toLocaleString()}
          </p>
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>100% LoRaWAN Synced</span>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-[#E8E2D2] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-stone-400">
            <span className="font-semibold">Registered Beekeepers</span>
            <Users className="w-4 h-4 text-indigo-600" />
          </div>
          <p className="text-2xl font-bold font-mono-num text-[#20221F]">
            {activeBeekeepers.toLocaleString()}
          </p>
          <div className="flex items-center gap-1.5 text-[11px] text-stone-600 font-medium">
            <span>Aadhaar e-KYC Verified</span>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-[#E8E2D2] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-stone-400">
            <span className="font-semibold">Seasonal Honey Production</span>
            <Scale className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-bold font-mono-num text-[#20221F]">
            {(activeYield / 1000).toFixed(1)} MT <span className="text-xs text-stone-400 font-normal">({activeYield.toLocaleString()} kg)</span>
          </p>
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-semibold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+19% vs Last Season</span>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-[#E8E2D2] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-stone-400">
            <span className="font-semibold">NABL C4 Sugar Pass Rate</span>
            <ShieldCheck className="w-4 h-4 text-amber-700" />
          </div>
          <p className="text-2xl font-bold font-mono-num text-[#20221F]">
            {activePassRate}%
          </p>
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Zero Synthetic Sugar Failures</span>
          </div>
        </div>
      </div>

      {/* District Intelligence & Extension Center Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Regional Details */}
        <div className="lg:col-span-7 space-y-5">
          <div className="p-6 rounded-3xl bg-white border border-[#E8E2D2] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#FFF8E6] text-[#8C6B1F] border border-[#F6E7A1]">
                  Territory Dossier
                </span>
                <h3 className="text-lg font-bold text-[#20221F] font-heading mt-1">
                  {currentDistrict ? `${currentDistrict.name} District, ${currentState.name}` : `${currentState.name} State Aggregate Overview`}
                </h3>
              </div>
              <span
                className={`text-xs font-bold px-3 py-1 rounded-full ${
                  activeHealthScore >= 88
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    : 'bg-amber-100 text-amber-800 border border-amber-200'
                }`}
              >
                Health Index: {activeHealthScore}/100
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-[#FCFBF7] border border-[#EAE3CE] space-y-1">
                <span className="text-[11px] text-stone-400 font-semibold block">KVK Regional Extension Station</span>
                <strong className="text-xs text-[#20221F] block">{activeKvk}</strong>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#FCFBF7] border border-[#EAE3CE] space-y-1">
                <span className="text-[11px] text-stone-400 font-semibold block">Nodal Inspecting Officer</span>
                <strong className="text-xs text-[#20221F] block">{activeOfficer}</strong>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#FCFBF7] border border-[#EAE3CE] space-y-1 sm:col-span-2">
                <span className="text-[11px] text-stone-400 font-semibold block">Dominant Regional Flora & Nectar Flow</span>
                <strong className="text-xs text-[#8C6B1F] block">{activeFlora}</strong>
              </div>
            </div>

            {/* National Advisory */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#FFF9E8] to-[#FFF4D5] border border-[#F6E7A1] text-xs text-[#7A6020] space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-[#8C6B1F]">
                <Sparkles className="w-4 h-4 text-[#D9A441]" />
                <span>MoA&FW / NBHM Regional Advisory:</span>
              </div>
              <p className="text-[11px] leading-relaxed text-[#5C4814]">
                {activeAdvisory}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Registered Beekeeper Roster in District */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-3xl bg-white border border-[#E8E2D2] shadow-xs space-y-4 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-bold text-[#20221F] font-heading flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#8C6B1F]" />
                  <span>Beekeeper Registry ({filteredBeekeepers.length})</span>
                </h3>
                <span className="text-[10px] font-mono text-[#8C6B1F] bg-[#FFF8E6] px-2 py-0.5 rounded-md border border-[#F6E7A1]">
                  {currentDistrict ? currentDistrict.name : currentState.name}
                </span>
              </div>

              <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
                {filteredBeekeepers.map((bk, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-2xl bg-[#FCFBF7] border border-[#EBE6D7] hover:border-[#D9A441] transition-all flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <strong className="text-[#20221F] font-bold">{bk.name}</strong>
                        <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.2 rounded-sm border border-emerald-200">
                          ✓ KYC
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-[#8C6B1F] block mt-0.5">
                        {bk.madhukrantiId}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[11px] font-bold text-[#20221F] block">{bk.hives} Hives</span>
                      <span className="text-[10px] text-stone-500">{bk.lastHarvestKg} kg yielded</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-[#F0EAD9] flex items-center justify-between text-[11px] text-[#7A7467]">
              <span>NBHM National Roster ID: NBHM-REG-{currentState.code}-2026</span>
              <span className="text-emerald-700 font-bold">100% Linked</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
