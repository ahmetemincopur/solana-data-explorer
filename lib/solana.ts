import { Connection, PublicKey } from '@solana/web3.js';

export const ENDPOINTS = {
  'Mainnet Beta': 'https://api.mainnet-beta.solana.com',
  Testnet: 'https://api.testnet.solana.com',
  Devnet: 'https://api.devnet.solana.com',
} as const;

export type Cluster = keyof typeof ENDPOINTS;

export const getBalance = async (address: string, connection: Connection): Promise<number> => {
  const publicKey = new PublicKey(address);
  const balance = await connection.getBalance(publicKey);
  return balance / 1e9; // SOL cinsine çeviriyoruz
};

export const getAccountInfo = async (address: string, connection: Connection) => {
  const publicKey = new PublicKey(address);
  const accountInfo = await connection.getAccountInfo(publicKey);

  if (!accountInfo) {
    return null;
  }

  return {
    dataSize: accountInfo.data.length,
    programId: accountInfo.owner.toBase58(),
    executable: accountInfo.executable,
  };
};

export const getTransactionHistory = async (address: string, connection: Connection) => {
  const publicKey = new PublicKey(address);
  const signatures = await connection.getConfirmedSignaturesForAddress2(publicKey, { limit: 10 });

  const transactions = await Promise.all(
    signatures.map(async (sig) => {
      const tx = await connection.getConfirmedTransaction(sig.signature);
      return {
        signature: sig.signature,
        block: tx?.slot || 0,
        result: tx?.meta?.err ? 'Failed' : 'Success',
      };
    })
  );

  return transactions;
};

export const getClusterStats = async (cluster: Cluster) => {
  try {
    const connection = new Connection(ENDPOINTS[cluster]);

    // Get TPS and ping time data
    const performanceSamples = await connection.getRecentPerformanceSamples(30); // Get the last 30 samples
    const tpsHistory = performanceSamples.map(sample => sample.numTransactions / sample.samplePeriodSecs);
    const pingTimes = performanceSamples.map(sample => sample.samplePeriodSecs * 1000); // Convert to milliseconds
    
    // Calculate total transaction count
    const transactionCount = performanceSamples.reduce((sum, sample) => sum + sample.numTransactions, 0);
    
    // Calculate average TPS
    const totalTPS = tpsHistory.reduce((sum, tps) => sum + tps, 0);
    const averageTPS = totalTPS / tpsHistory.length;

    const slot = await connection.getSlot();
    const blockHeight = await connection.getBlockHeight();
    const blockTime = await connection.getBlockTime(slot);
    const epochInfo = await connection.getEpochInfo();
    const slotLeader = await connection.getSlotLeader();
    const epochProgress = (epochInfo.slotIndex / epochInfo.slotsInEpoch) * 100;
    const epochTimeRemaining = epochInfo.slotsInEpoch - epochInfo.slotIndex;

    return {
      slot,
      blockHeight,
      blockTime,
      epoch: epochInfo.epoch,
      epochProgress,
      epochTimeRemaining,
      slotLeader,
      tpsHistory,
      pingTimes,
      transactionCount,
      averageTPS,
    };
  } catch (error: any) {
    console.error(`Failed to fetch cluster stats for ${cluster}:`, error.message);
    throw new Error(`Failed to fetch cluster stats for ${cluster}: ${error.message}`);
  }
};
