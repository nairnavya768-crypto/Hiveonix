import { BlockchainBlock, UserRole } from '../types';
import { INITIAL_BLOCKS } from '../data/mockData';

const BLOCKCHAIN_STORAGE_KEY = 'hiveonix_blockchain_ledger';

export class BlockchainService {
  static getLedger(): BlockchainBlock[] {
    try {
      const stored = localStorage.getItem(BLOCKCHAIN_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed to load stored blockchain ledger', e);
    }
    return INITIAL_BLOCKS;
  }

  static saveLedger(blocks: BlockchainBlock[]): void {
    localStorage.setItem(BLOCKCHAIN_STORAGE_KEY, JSON.stringify(blocks));
  }

  private static generateSimpleHash(data: string): string {
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
      const char = data.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0;
    }
    const hex = Math.abs(hash).toString(16).padStart(8, '0');
    return `0x${hex}${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}`;
  }

  static appendBlock(params: {
    eventType: BlockchainBlock['eventType'];
    batchId: string;
    actor: string;
    actorRole: UserRole;
    dataPayload: Record<string, any>;
  }): BlockchainBlock {
    const currentLedger = this.getLedger();
    const previousBlock = currentLedger[0];
    const previousBlockHash = previousBlock ? previousBlock.blockHash : '0x0000000000000000000000000000000000000000000000000000000000000000';
    const blockNumber = previousBlock ? previousBlock.blockNumber + 1 : 1001;

    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
    const blockHash = this.generateSimpleHash(`${blockNumber}-${params.batchId}-${timestamp}-${JSON.stringify(params.dataPayload)}`);
    const merkleRoot = this.generateSimpleHash(`merkle-${blockNumber}-${params.batchId}`);

    const newBlock: BlockchainBlock = {
      blockNumber,
      timestamp,
      eventType: params.eventType,
      batchId: params.batchId,
      actor: params.actor,
      actorRole: params.actorRole,
      blockHash,
      previousBlockHash,
      merkleRoot,
      dataPayload: params.dataPayload,
      verified: true,
    };

    const updated = [newBlock, ...currentLedger];
    this.saveLedger(updated);
    return newBlock;
  }
}
