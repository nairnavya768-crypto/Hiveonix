import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Layers, ShieldCheck, CheckCircle2, Search, ExternalLink, X, Hash, Clock, Box } from 'lucide-react';

export const BlockchainExplorerModal: React.FC = () => {
  const { isBlockchainModalOpen, setIsBlockchainModalOpen, blockchainBlocks } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  if (!isBlockchainModalOpen) return null;

  const filteredBlocks = blockchainBlocks.filter(
    (b) =>
      b.blockHash.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.batchId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.eventType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.actor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl border border-[#E8E2D2] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-[#FAF3DF] via-[#FFF9E8] to-[#FCFBF7] border-b border-[#EAE2CA] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#F6E7A1] border border-[#D9A441]/50 flex items-center justify-center shadow-2xs">
              <Layers className="w-5 h-5 text-[#8C6B1F]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Proof of Authenticity Ledger
                </span>
                <span className="text-[10px] font-mono text-stone-400">Total Blocks: {blockchainBlocks.length}</span>
              </div>
              <h2 className="text-lg font-bold text-[#20221F] font-heading mt-0.5">
                Hiveonix Immutable Blockchain Explorer
              </h2>
            </div>
          </div>

          <button
            onClick={() => setIsBlockchainModalOpen(false)}
            className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 bg-[#FCFBF7] border-b border-[#F0EAD9] flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by block hash, batch ID, or event type..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#D9D3C3] text-xs font-mono bg-white focus:border-[#D9A441]"
            />
          </div>
        </div>

        {/* Block Sequence Explorer */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {filteredBlocks.map((block) => (
            <div
              key={block.blockNumber}
              className="p-5 rounded-2xl bg-white border border-[#EBE6D7] shadow-xs space-y-3 hover:border-[#D9A441] transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F2ECE0] pb-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-[#FFF8E6] border border-[#F6E7A1] font-mono font-bold text-[#8C6B1F] flex items-center justify-center text-xs">
                    #{block.blockNumber}
                  </span>
                  <span className="font-bold text-[#20221F]">{block.eventType.replace(/_/g, ' ')}</span>
                  <span className="text-[10px] font-mono text-stone-400">Actor: {block.actor}</span>
                </div>
                <span className="text-[11px] font-mono text-stone-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {block.timestamp}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                <div className="p-2.5 rounded-xl bg-[#FCFBF7] border border-[#E8E2D2]">
                  <span className="text-stone-400 block text-[9px] uppercase font-bold">Block Hash:</span>
                  <p className="font-mono text-[#8C6B1F] font-semibold break-all">{block.blockHash}</p>
                </div>
                <div className="p-2.5 rounded-xl bg-[#FCFBF7] border border-[#E8E2D2]">
                  <span className="text-stone-400 block text-[9px] uppercase font-bold">Previous Hash:</span>
                  <p className="font-mono text-stone-500 font-medium break-all">{block.previousBlockHash}</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#FAF7EF] border border-[#EAE4D4] text-xs space-y-1">
                <div className="flex items-center justify-between font-bold text-[#20221F]">
                  <span>Batch Ref: <strong className="font-mono text-[#8C6B1F]">{block.batchId}</strong></span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Consensus Verified
                  </span>
                </div>
                <pre className="text-[10px] text-[#666] font-mono bg-white p-2 rounded-lg border border-[#EAE4D4] overflow-x-auto">
                  {JSON.stringify(block.dataPayload, null, 2)}
                </pre>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
