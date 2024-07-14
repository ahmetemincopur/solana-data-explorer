import React, { useEffect, useState } from 'react';
import { Cluster, getClusterStats } from '../lib/solana';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

interface ClusterStatsProps {
  selectedCluster: Cluster;
}

const ClusterStats: React.FC<ClusterStatsProps> = ({ selectedCluster }) => {
  const [stats, setStats] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getClusterStats(selectedCluster);
        setStats(data);
        setError(null);
      } catch (error) {
        setError('Failed to fetch cluster stats.');
      }
    };

    fetchStats(); // İlk veri çekme

    const intervalId = setInterval(fetchStats, 5000); // 5 saniyede bir veri çekme

    return () => clearInterval(intervalId); // Temizleme fonksiyonu
  }, [selectedCluster]);

  const tpsData = {
    labels: Array.from({ length: stats?.tpsHistory?.length || 30 }, (_, i) => `${i + 1}`),
    datasets: [
      {
        label: 'TPS history',
        data: stats?.tpsHistory || [],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const pingData = {
    labels: Array.from({ length: stats?.pingTimes?.length || 30 }, (_, i) => `${i + 1}`),
    datasets: [
      {
        label: 'Average Ping Time',
        data: stats?.pingTimes || [],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return (
    <div className="container mx-auto mt-8 text-white">
      <h2 className="text-3xl font-bold mb-4">Cluster Stats for {selectedCluster}</h2>
      {error ? (
        <p>{error}</p>
      ) : stats ? (
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-2">Live Cluster Stats</h3>
          <table className="min-w-full bg-white text-black mb-4">
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
                <td className="border px-4 py-2">
                  ~{Math.floor(stats.epochTimeRemaining / 60 / 60 / 24)}d {Math.floor((stats.epochTimeRemaining / 60 / 60) % 24)}h {Math.floor((stats.epochTimeRemaining / 60) % 60)}m
                </td>
              </tr>
            </tbody>
          </table>
          <h3 className="text-xl font-semibold mb-2">Live Transaction Stats</h3>
          <table className="min-w-full bg-white text-black mb-4">
            <tbody>
              <tr className="bg-gray-200">
                <td className="border px-4 py-2">Transaction count</td>
                <td className="border px-4 py-2">{stats.transactionCount}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Transactions per second (TPS)</td>
                <td className="border px-4 py-2">{stats.averageTPS}</td>
              </tr>
            </tbody>
          </table>
          <div>
            <h4 className="text-lg font-semibold mb-2">TPS history</h4>
            <Bar data={tpsData} />
          </div>
          <div className="mt-4">
            <h4 className="text-lg font-semibold mb-2">Average Ping Time</h4>
            <Bar data={pingData} />
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ClusterStats;
