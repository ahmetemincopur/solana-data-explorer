'use client';

import React, { useEffect, useState } from 'react';
import { getClusterStats, Cluster } from '../../lib/solana';

const Transactions: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getClusterStats('Mainnet Beta');
        setStats(data);
        setError(null);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchStats(); // İlk veri çekme

    const intervalId = setInterval(fetchStats, 5000); // 5 saniyede bir veri çekme

    return () => clearInterval(intervalId); // Temizleme fonksiyonu
  }, []);

  return (
    <div className="container mx-auto mt-8 text-white">
      <h2 className="text-3xl font-bold mb-4">Mainnet Beta Cluster Stats</h2>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : stats ? (
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-2">Live Cluster Stats</h3>
          <table className="min-w-full bg-white text-black">
            <tbody>
              <tr className="bg-gray-200">
                <td className="border px-4 py-2">Slot</td>
                <td className="border px-4 py-2">{stats.slot}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Block Height</td>
                <td className="border px-4 py-2">{stats.blockHeight}</td>
              </tr>
              <tr className="bg-gray-200">
                <td className="border px-4 py-2">Cluster Time</td>
                <td className="border px-4 py-2">{new Date(stats.blockTime * 1000).toLocaleString()}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Slot Leader</td>
                <td className="border px-4 py-2">{stats.slotLeader}</td>
              </tr>
              <tr className="bg-gray-200">
                <td className="border px-4 py-2">Epoch</td>
                <td className="border px-4 py-2">{stats.epoch}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Epoch Progress</td>
                <td className="border px-4 py-2">{stats.epochProgress.toFixed(1)}%</td>
              </tr>
              <tr className="bg-gray-200">
                <td className="border px-4 py-2">Epoch Time Remaining</td>
                <td className="border px-4 py-2">~{Math.floor(stats.epochTimeRemaining / 60 / 60 / 24)}d {Math.floor((stats.epochTimeRemaining / 60 / 60) % 24)}h {Math.floor((stats.epochTimeRemaining / 60) % 60)}m</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Transactions;
