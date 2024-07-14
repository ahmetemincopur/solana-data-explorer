import React, { useState } from 'react';
import Link from 'next/link';
import ClusterModal from './ClusterModal';
import { Cluster } from '../lib/solana';

interface NavbarProps {
  onClusterChange: (cluster: Cluster) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onClusterChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCluster, setSelectedCluster] = useState<Cluster>('Devnet');

  const handleClusterSelect = (cluster: Cluster) => {
    setSelectedCluster(cluster);
    onClusterChange(cluster);
    setIsModalOpen(false);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4 items-center">
          <Link href="/" legacyBehavior>
            <a className="text-white text-lg font-bold">Solana Explorer</a>
          </Link>
          <Link href="/cluster-stats" legacyBehavior>
            <a className="text-gray-300 hover:text-white">Cluster Stats</a>
          </Link>
          <Link href="/supply" legacyBehavior>
            <a className="text-gray-300 hover:text-white">Supply</a>
          </Link>
          <Link href="/inspector" legacyBehavior>
            <a className="text-gray-300 hover:text-white">Inspector</a>
          </Link>
        </div>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded ml-4"
          onClick={() => setIsModalOpen(true)}
        >
          {selectedCluster}
        </button>
        {isModalOpen && (
          <ClusterModal
            selectedCluster={selectedCluster}
            onSelect={handleClusterSelect}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
