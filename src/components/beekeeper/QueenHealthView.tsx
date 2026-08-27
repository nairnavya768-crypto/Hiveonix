import React from 'react';
import { useApp } from '../../context/AppContext';
import { Crown, Sparkles, AlertTriangle, CheckCircle2, Calendar, Scale } from 'lucide-react';

export const QueenHealthView: React.FC = () => {
  const { hives } = useApp();

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
            Colony Genetics & Queen Rearing
          </span>
          <span className="text-xs font-mono text-stone-400">Total Queens: {hives.length}</span>
        </div>
        <h2 className="text-2xl font-bold text-[#20221F] font-heading mt-1.5">
          Queen Colony Vitality & Lineage Registry
        </h2>
        <p className="text-xs sm:text-sm text-[#7A7467] mt-0.5">
          Laying pattern regularity, supersedure indicators, age telemetry, and mating lineage tracking.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {hives.map((hive) => {
          const q = hive.queen;
          return (
            <div key={hive.id} className="p-6 rounded-3xl bg-white border border-[#EBE6D7] shadow-xs space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#FFF8E6] border border-[#F6E7A1] flex items-center justify-center">
                    <Crown className="w-6 h-6 text-[#D9A441]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#20221F]">{q.id}</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          q.status === 'healthy'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {q.status.toUpperCase()}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-[#20221F] mt-0.5">{q.breed}</h3>
                    <p className="text-xs text-[#777]">
                      Resident in <strong className="text-[#20221F]">{hive.name}</strong> ({hive.id})
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-3 rounded-xl bg-[#FCFBF7] border border-[#E8E2D2]">
                  <span className="text-stone-400 font-semibold text-[10px]">Queen Age</span>
                  <p className="text-base font-bold font-mono-num text-[#20221F] mt-1">{q.ageMonths} mo</p>
                </div>
                <div className="p-3 rounded-xl bg-[#FCFBF7] border border-[#E8E2D2]">
                  <span className="text-stone-400 font-semibold text-[10px]">Brood Pattern</span>
                  <p className="text-base font-bold font-mono-num text-[#20221F] mt-1">{q.layingPatternScore}%</p>
                </div>
                <div className="p-3 rounded-xl bg-[#FCFBF7] border border-[#E8E2D2]">
                  <span className="text-stone-400 font-semibold text-[10px]">Supersedure</span>
                  <p className="text-base font-bold text-emerald-700 mt-1">Low (2%)</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAF7EF] border border-[#EAE4D4] text-xs space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-[#20221F]">
                  <Sparkles className="w-3.5 h-3.5 text-[#D9A441]" />
                  <span>Genetic Assessment:</span>
                </div>
                <p className="text-[11px] text-[#666] leading-relaxed">
                  High hygienic grooming behavior index observed. Regular worker egg deposition with low drone comb ratio.
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
