import React from 'react';
import { useApp } from '../../context/AppContext';
import { INITIAL_SUSPICIOUS_SCANS } from '../../data/mockData';
import { ShieldAlert, AlertOctagon, Lock, Eye, MapPin, CheckCircle2 } from 'lucide-react';

export const CounterfeitMonitor: React.FC = () => {
  const { setSelectedBatchId, setIsVerifyPassportOpen, showToast } = useApp();
  const [scans, setScans] = React.useState(INITIAL_SUSPICIOUS_SCANS);

  const handleLockBatch = (batchId: string) => {
    setScans((prev) =>
      prev.map((s) => (s.batchId === batchId ? { ...s, actionTaken: 'BATCH BARCODE LOCKED & FLAGGED ON CONSUMER PASSPORT' } : s))
    );
    showToast('Batch Locked', `Cryptographic revocation dispatched for batch ${batchId}`, 'warning');
  };

  return (
    <div className="p-6 rounded-3xl bg-white border border-[#EBE6D7] shadow-xs space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-600" />
            <h3 className="text-base font-bold text-[#20221F] font-heading">Counterfeit & Anomaly Radar</h3>
          </div>
          <p className="text-xs text-[#7A7467] mt-0.5">
            Real-time geospatial duplicate scans, invalid checksums & unauthorized retail distribution flags
          </p>
        </div>
        <span className="px-3 py-1 rounded-full bg-rose-50 text-rose-800 border border-rose-200 text-xs font-bold font-mono">
          {scans.length} Active Anomaly Alerts
        </span>
      </div>

      <div className="divide-y divide-[#F2ECE0] border border-[#EFE9DC] rounded-2xl overflow-hidden">
        {scans.map((scan) => (
          <div key={scan.id} className="p-4 bg-[#FCFBF7] hover:bg-[#FFFDF9] transition-colors space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span className="p-1.5 rounded-lg bg-rose-100 text-rose-700">
                  <AlertOctagon className="w-4 h-4" />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#20221F]">{scan.batchId}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                        scan.riskLevel === 'critical'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {scan.riskLevel}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#7A7467] flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-stone-400" />
                    {scan.scanLocation} • <span className="font-mono text-[10px]">{scan.timestamp}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setSelectedBatchId(scan.batchId);
                    setIsVerifyPassportOpen(true);
                  }}
                  className="px-3 py-1.5 rounded-xl border border-[#D9D3C3] hover:bg-white text-xs font-bold text-[#555] flex items-center gap-1 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" /> Inspect Batch
                </button>
                <button
                  onClick={() => handleLockBatch(scan.batchId)}
                  className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-1 transition-colors shadow-2xs"
                >
                  <Lock className="w-3.5 h-3.5" /> Lock QR Token
                </button>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white border border-[#EAE4D4] text-xs flex items-center justify-between">
              <div>
                <span className="font-bold text-stone-600">Anomaly Trigger: </span>
                <span className="font-mono text-[#20221F] font-semibold">{scan.reason}</span>
              </div>
              <div className="text-[11px] text-[#8C6B1F] font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> {scan.actionTaken}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
