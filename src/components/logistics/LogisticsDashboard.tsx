import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { INITIAL_SHIPMENTS } from '../../data/mockData';
import { Shipment } from '../../types';
import { KPICard } from '../common/KPICard';
import {
  Truck,
  Thermometer,
  MapPin,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Navigation,
  ShieldCheck,
  Plus,
  Search,
  Layers,
  Radio,
  RefreshCw,
  Gauge,
  Wifi,
  ExternalLink,
  ShieldAlert,
  ArrowRight,
  Sliders,
} from 'lucide-react';

export const LogisticsDashboard: React.FC = () => {
  const { activeTab, setActiveTab, setSelectedBatchId, setIsVerifyPassportOpen, setIsBlockchainModalOpen, showToast } = useApp();
  const [shipments, setShipments] = useState<Shipment[]>(INITIAL_SHIPMENTS);
  const [selectedShipmentId, setSelectedShipmentId] = useState<string>(INITIAL_SHIPMENTS[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [simulatedLivePings, setSimulatedLivePings] = useState(0);

  const selectedShipment = shipments.find((s) => s.id === selectedShipmentId) || shipments[0];

  const handleUpdateCheckpoint = (shipmentId: string) => {
    setShipments((prev) =>
      prev.map((s) => {
        if (s.id === shipmentId) {
          const checkpointLocations = [
            'National Highway Cold Hub (Checkpost Gate 4)',
            'Western Ghats Transit Depot (Kozhikode Corridor)',
            'NH-44 Bangalore Peripheral Cold Hub',
            'Cochin Port Container Terminal Bay 12',
          ];
          const nextLocation = checkpointLocations[(s.checkpoints.length) % checkpointLocations.length];
          const newCheckpoint = {
            location: nextLocation,
            timestamp: new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' }),
            temperature: +(19.5 + Math.random() * 3.5).toFixed(1),
            verified: true,
          };
          return {
            ...s,
            currentLocation: newCheckpoint.location,
            temperatureCelsius: newCheckpoint.temperature,
            checkpoints: [...s.checkpoints, newCheckpoint],
          };
        }
        return s;
      })
    );
    setSimulatedLivePings((c) => c + 1);
    showToast('GPS Telemetry Synced', `Live checkpoint & temperature ping recorded for ${shipmentId}`, 'success');
  };

  const handleMarkDelivered = (shipmentId: string) => {
    setShipments((prev) =>
      prev.map((s) => (s.id === shipmentId ? { ...s, status: 'delivered', currentLocation: s.destination } : s))
    );
    showToast('Delivery Handover Recorded', `Shipment ${shipmentId} delivered to temperature-controlled warehouse`, 'success');
  };

  // 1. LIVE GPS & COLD CHAIN TRACKING VIEW
  if (activeTab === 'live_tracking') {
    return (
      <div className="space-y-8 animate-in fade-in duration-200">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 animate-pulse text-emerald-600" />
                Live GPS & Cold-Chain Telemetry Stream
              </span>
              <span className="text-xs font-mono text-stone-400">Pings: {selectedShipment.checkpoints.length + simulatedLivePings}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#20221F] font-heading mt-1.5">
              Live Transit Corridor & Thermal Radar
            </h1>
            <p className="text-xs sm:text-sm text-[#7A7467] mt-0.5">
              Real-time refrigerated container monitoring ensuring honey temperature remains below 25°C.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleUpdateCheckpoint(selectedShipment.id)}
              className="px-4 py-2.5 rounded-xl bg-[#20221F] hover:bg-[#343831] text-white text-xs font-bold shadow-md transition-all flex items-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#F6E7A1]" />
              <span>Simulate GPS Ping</span>
            </button>
          </div>
        </div>

        {/* Selected Shipment Selector */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {shipments.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedShipmentId(s.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2.5 border ${
                selectedShipmentId === s.id
                  ? 'bg-[#20221F] text-white border-[#20221F] shadow-sm'
                  : 'bg-white text-[#555] border-[#E8E2D2] hover:bg-[#FAF7EF]'
              }`}
            >
              <Truck className={`w-4 h-4 ${selectedShipmentId === s.id ? 'text-[#F6E7A1]' : 'text-stone-400'}`} />
              <span>{s.id} • {s.vehicleNumber}</span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                  s.status === 'delivered' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-blue-500/20 text-blue-300'
                }`}
              >
                {s.temperatureCelsius}°C
              </span>
            </button>
          ))}
        </div>

        {/* Live GPS Interactive Map Visualizer */}
        <div className="p-6 rounded-3xl bg-white border border-[#EBE6D7] shadow-xs space-y-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b border-[#F2ECE0]">
            <div>
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">Active Transit Route</span>
              <h2 className="text-lg font-bold text-[#20221F] font-heading flex items-center gap-2 mt-0.5">
                <span>{selectedShipment.origin}</span>
                <ArrowRight className="w-4 h-4 text-[#8C6B1F]" />
                <span>{selectedShipment.destination}</span>
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200">
                <Thermometer className="w-4 h-4 text-emerald-600" />
                <span>Current: <strong>{selectedShipment.temperatureCelsius}°C</strong> (Safe &lt;25°C)</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-800 border border-blue-200">
                <Gauge className="w-4 h-4 text-blue-600" />
                <span>Speed: <strong>58 km/h</strong></span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-200">
                <ShieldCheck className="w-4 h-4 text-[#8C6B1F]" />
                <span>NFC Smart Seal: <strong>Locked & Intact</strong></span>
              </div>
            </div>
          </div>

          {/* Graphical Map Canvas Simulation */}
          <div className="relative h-80 rounded-2xl bg-gradient-to-br from-[#1E293B] via-[#0F172A] to-[#020617] p-6 text-white overflow-hidden shadow-inner flex flex-col justify-between border border-slate-700">
            {/* Background Grid Lines & Coordinates */}
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:16px_16px]" />

            {/* Top Overlay Stats */}
            <div className="relative z-10 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-700 backdrop-blur-xs">
                <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span className="font-mono text-slate-300">GPS Geo-Mesh: 11.8924° N, 75.9812° E</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-700 backdrop-blur-xs">
                <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-mono text-emerald-400">4G LTE • Telemetry 100%</span>
              </div>
            </div>

            {/* Visual Route Path Line */}
            <div className="relative z-10 my-auto py-6">
              <div className="relative max-w-2xl mx-auto">
                {/* Horizontal Route Bar */}
                <div className="h-2 w-full bg-slate-700/80 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-amber-400 via-emerald-400 to-blue-400 w-3/4 rounded-full" />
                </div>

                {/* Waypoint 1: Origin */}
                <div className="absolute -top-3 left-0 -translate-x-1/2 flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center shadow-lg shadow-emerald-500/50">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-[11px] font-bold mt-2 whitespace-nowrap text-slate-200">
                    {selectedShipment.origin}
                  </span>
                  <span className="text-[10px] text-emerald-400 font-mono">Dispatched</span>
                </div>

                {/* Waypoint 2: In-Transit Truck */}
                <div className="absolute -top-4 left-3/4 -translate-x-1/2 flex flex-col items-center animate-bounce">
                  <div className="w-10 h-10 rounded-2xl bg-[#D9A441] border-2 border-white flex items-center justify-center shadow-lg shadow-amber-500/50">
                    <Truck className="w-5 h-5 text-[#20221F]" />
                  </div>
                  <span className="text-[11px] font-bold mt-2 whitespace-nowrap bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full font-mono">
                    {selectedShipment.currentLocation}
                  </span>
                  <span className="text-[10px] text-amber-200 font-mono mt-0.5">{selectedShipment.temperatureCelsius}°C</span>
                </div>

                {/* Waypoint 3: Destination */}
                <div className="absolute -top-3 right-0 translate-x-1/2 flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-slate-700 border-2 border-slate-500 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-slate-400" />
                  </div>
                  <span className="text-[11px] font-bold mt-2 whitespace-nowrap text-slate-400">
                    {selectedShipment.destination}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">ETA: 4h 15m</span>
                </div>
              </div>
            </div>

            {/* Bottom Live Telemetry Bar */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 text-xs pt-4 border-t border-slate-800">
              <div className="flex items-center gap-3">
                <span className="text-slate-400">Driver: <strong className="text-white">{selectedShipment.driverName}</strong></span>
                <span className="text-slate-400 font-mono">Batch: <strong className="text-[#F6E7A1]">{selectedShipment.batchId}</strong></span>
              </div>
              <div className="text-slate-400 text-[11px]">
                Updated: <span className="font-mono text-emerald-400">{new Date().toLocaleTimeString()}</span>
              </div>
            </div>
          </div>

          {/* Telemetry Timeline Checkpoint Log */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-[#20221F] font-heading flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#8C6B1F]" />
              <span>Full Route Telemetry Timeline ({selectedShipment.checkpoints.length} Checkpoints Logged)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {selectedShipment.checkpoints.map((cp, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-[#FCFBF7] border border-[#E8E2D2] space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#20221F]">Gate #{idx + 1}</span>
                    <span className="text-emerald-700 font-bold font-mono text-[11px]">{cp.temperature}°C</span>
                  </div>
                  <p className="text-[11px] text-[#555] font-medium truncate">{cp.location}</p>
                  <div className="flex items-center justify-between text-[10px] text-stone-400 pt-1 border-t border-[#EFE8D8]">
                    <span>{cp.timestamp}</span>
                    <span className="text-emerald-600 font-bold">✓ Verified</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. CHAIN OF CUSTODY (BLOCKCHAIN) VIEW
  if (activeTab === 'blockchain') {
    return (
      <div className="space-y-8 animate-in fade-in duration-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                Immutable Custody Ledger
              </span>
              <span className="text-xs font-mono text-stone-400">Protocol: Hiveonix PoP (Proof-of-Purity)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#20221F] font-heading mt-1.5">
              Logistics Chain of Custody & Smart Seals
            </h1>
            <p className="text-xs sm:text-sm text-[#7A7467] mt-0.5">
              Cryptographic transfer handoffs recorded from apiary extraction to temperature-monitored port containers.
            </p>
          </div>

          <button
            onClick={() => setIsBlockchainModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-white border border-[#D9D3C3] hover:bg-[#FCFBF7] text-xs font-bold text-[#20221F] flex items-center gap-2 shadow-2xs transition-colors"
          >
            <Layers className="w-4 h-4 text-[#8C6B1F]" />
            <span>Open Ledger Explorer</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 p-6 rounded-3xl bg-white border border-[#EBE6D7] shadow-xs space-y-4">
            <h2 className="text-base font-bold text-[#20221F] font-heading">Recent Digital Custody Handoffs</h2>

            <div className="space-y-3">
              {shipments.map((s) => (
                <div key={s.id} className="p-4 rounded-2xl bg-[#FCFBF7] border border-[#E8E2D2] space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-[#8C6B1F]">{s.id} • Batch {s.batchId}</span>
                    <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      Digital Sig Verified
                    </span>
                  </div>
                  <p className="text-[#333]">
                    Transferred from <strong>{s.origin}</strong> to Carrier Driver <strong>{s.driverName}</strong> ({s.vehicleNumber}).
                  </p>
                  <div className="flex items-center justify-between text-[10px] font-mono text-stone-400 pt-1 border-t border-[#EFE9DC]">
                    <span>Smart Lock ID: NFC-SEAL-88912</span>
                    <span className="truncate max-w-[200px]">Hash: 0x9f4a...821c</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-gradient-to-br from-[#FFF9E8] to-[#FFF0C8] border border-[#F6E7A1] shadow-xs space-y-3">
              <ShieldCheck className="w-6 h-6 text-[#8C6B1F]" />
              <h3 className="text-sm font-bold text-[#20221F]">Tamper Prevention Guarantee</h3>
              <p className="text-xs text-[#6B551E] leading-relaxed">
                If an NFC smart lock is unlatched outside an authorized GPS geofenced hub, the batch status is automatically locked and flagged on the national radar.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 3. FLEET SETTINGS VIEW
  if (activeTab === 'settings') {
    return (
      <div className="space-y-8 animate-in fade-in duration-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 border border-slate-200">
              Fleet & Sensor Configuration
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#20221F] font-heading mt-1.5">
            Logistics Fleet & Temperature Policies
          </h1>
          <p className="text-xs sm:text-sm text-[#7A7467] mt-0.5">
            Configure IoT telemetry polling frequency and cold-chain alarm thresholds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-[#EBE6D7] shadow-xs space-y-4">
            <h2 className="text-base font-bold text-[#20221F] font-heading flex items-center gap-2">
              <Sliders className="w-5 h-5 text-[#8C6B1F]" />
              <span>Cold-Chain Threshold Alarms</span>
            </h2>
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-2xl bg-[#FCFBF7] border border-[#E8E2D2] flex items-center justify-between">
                <div>
                  <strong className="block text-[#20221F]">Maximum Permissible Honey Temp</strong>
                  <span className="text-[11px] text-stone-400">Trigger automatic alert if exceeded</span>
                </div>
                <span className="font-bold text-sm font-mono text-rose-600 bg-rose-50 px-2.5 py-1 rounded-xl border border-rose-200">
                  25.0°C
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-[#FCFBF7] border border-[#E8E2D2] flex items-center justify-between">
                <div>
                  <strong className="block text-[#20221F]">IoT GPS Broadcast Frequency</strong>
                  <span className="text-[11px] text-stone-400">Satellite & Cellular telemetry rate</span>
                </div>
                <span className="font-bold text-sm font-mono text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-xl border border-indigo-200">
                  Every 10 min
                </span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#EBE6D7] shadow-xs space-y-4">
            <h2 className="text-base font-bold text-[#20221F] font-heading flex items-center gap-2">
              <Truck className="w-5 h-5 text-indigo-600" />
              <span>Registered Refrigerator Fleet</span>
            </h2>
            <p className="text-xs text-[#666]">
              All 8 active refrigerated vehicles equipped with calibrated dual thermal sensors and LoRaWAN backup transmitters.
            </p>
            <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
              ✓ 100% Vehicles Active & FSSAI Compliant
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 4. DEFAULT OVERVIEW / SHIPMENTS VIEW
  const filteredShipments = shipments.filter(
    (s) =>
      s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.vehicleNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.driverName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.batchId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 border border-indigo-200">
              Cold Chain Logistics & Distribution Network
            </span>
            <span className="text-xs font-mono text-stone-400">Carrier: Bharat AgriCold Fleet</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#20221F] font-heading mt-1.5">
            Temperature-Controlled Honey Shipments
          </h1>
          <p className="text-xs sm:text-sm text-[#7A7467] mt-0.5">
            Real-time IoT temperature telemetry preventing heat-induced HMF elevation during transport.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('live_tracking')}
            className="px-4 py-2.5 rounded-xl bg-[#20221F] hover:bg-[#343831] text-white text-xs font-bold shadow-md transition-all flex items-center gap-2"
          >
            <MapPin className="w-4 h-4 text-[#F6E7A1]" />
            <span>Open Live GPS Radar</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Active In-Transit Dispatches"
          value="8 Shipments"
          subtitle="4,850 kg Honey Volume"
          trend={{ value: "All Routes on Schedule", isPositive: true }}
          icon={<Truck className="w-5 h-5 text-indigo-600" />}
          accentColor="blue"
        />
        <KPICard
          title="Mean Cold-Chain Temp"
          value="21.4°C"
          subtitle="Safe Honey Storage (<25°C)"
          trend={{ value: "0 Thermal Breaches", isPositive: true }}
          icon={<Thermometer className="w-5 h-5 text-emerald-600" />}
          accentColor="green"
        />
        <KPICard
          title="GPS Punctuality Rate"
          value="99.4%"
          subtitle="Direct Apiary-to-Port Corridor"
          trend={{ value: "+2.1% SLA", isPositive: true }}
          icon={<Navigation className="w-5 h-5 text-purple-600" />}
          accentColor="purple"
        />
        <KPICard
          title="Tamper-Evident Seals"
          value="100% Intact"
          subtitle="Digital NFC Smart Locks"
          trend={{ value: "Secure Chain of Custody", isPositive: true }}
          icon={<ShieldCheck className="w-5 h-5 text-amber-600" />}
          accentColor="yellow"
        />
      </div>

      {/* Active Shipments Cards */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-lg font-bold text-[#20221F] font-heading">Active Dispatches</h2>

          <div className="relative max-w-xs w-full">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search vehicle, driver or batch..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#D9D3C3] text-xs bg-white focus:border-[#D9A441]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredShipments.map((shipment) => (
            <div
              key={shipment.id}
              className="p-6 rounded-3xl bg-white border border-[#EBE6D7] shadow-xs space-y-4 hover:border-[#D9A441] transition-all"
            >
              <div className="flex items-start justify-between border-b border-[#F2ECE0] pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#20221F]">{shipment.id}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                        shipment.status === 'delivered'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-indigo-100 text-indigo-800'
                      }`}
                    >
                      {shipment.status.replace('_', ' ')}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-[#20221F] mt-1">
                    Vehicle: {shipment.vehicleNumber} ({shipment.driverName})
                  </h3>
                  <p className="text-xs text-[#7A7467]">
                    Carrying Batch: <strong className="text-[#20221F] font-mono">{shipment.batchId}</strong>
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-[#FCFBF7] border border-[#E8E2D2] text-center">
                  <span className="text-[10px] text-stone-400 font-bold uppercase block">Cargo Temp</span>
                  <span className="text-lg font-bold font-mono-num text-emerald-700">
                    {shipment.temperatureCelsius}°C
                  </span>
                </div>
              </div>

              {/* Origin -> Destination Route */}
              <div className="p-3 rounded-xl bg-[#FAF7EF] border border-[#EAE4D4] text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-stone-400 font-semibold">Origin:</span>
                  <strong className="text-[#20221F]">{shipment.origin}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-400 font-semibold">Destination:</span>
                  <strong className="text-[#20221F]">{shipment.destination}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-400 font-semibold">Current GPS:</span>
                  <span className="text-indigo-700 font-medium flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {shipment.currentLocation}
                  </span>
                </div>
              </div>

              {/* Checkpoints Trail */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A8475]">
                  Telemetry Checkpoints ({shipment.checkpoints.length})
                </span>
                <div className="space-y-1">
                  {shipment.checkpoints.slice(-2).map((cp, idx) => (
                    <div key={idx} className="flex items-center justify-between text-[11px] text-[#666]">
                      <span className="truncate max-w-[200px]">• {cp.location}</span>
                      <span className="font-mono text-[10px] text-stone-400">{cp.timestamp} ({cp.temperature}°C)</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => {
                    setSelectedShipmentId(shipment.id);
                    setActiveTab('live_tracking');
                  }}
                  className="w-1/2 py-2 rounded-xl bg-white border border-[#D9D3C3] hover:bg-[#FAF7EF] text-xs font-bold text-[#20221F] transition-colors flex items-center justify-center gap-1"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#8C6B1F]" />
                  <span>View Live GPS</span>
                </button>
                {shipment.status !== 'delivered' ? (
                  <button
                    onClick={() => handleMarkDelivered(shipment.id)}
                    className="w-1/2 py-2 rounded-xl bg-[#20221F] hover:bg-[#343831] text-white text-xs font-bold transition-colors flex items-center justify-center gap-1 shadow-2xs"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#F6E7A1]" />
                    <span>Confirm Delivery</span>
                  </button>
                ) : (
                  <div className="w-1/2 py-2 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold text-center border border-emerald-200">
                    ✓ Handed Over
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
