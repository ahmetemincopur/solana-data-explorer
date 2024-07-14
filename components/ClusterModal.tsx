import React from 'react';
import { Cluster } from '../lib/solana';

interface ClusterModalProps {
  selectedCluster: Cluster;
  onSelect: (cluster: Cluster) => void;
  onClose: () => void;
}

const ClusterModal: React.FC<ClusterModalProps> = ({ selectedCluster, onSelect, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-80">
        <h3 className="text-xl font-semibold mb-4 text-white">Choose a Cluster</h3>
        <button
          className={`block w-full text-left px-4 py-2 mb-2 rounded ${
            selectedCluster === 'Mainnet Beta' ? 'bg-green-500' : 'bg-gray-700'
          }`}
          onClick={() => onSelect('Mainnet Beta')}
        >
          Mainnet Beta
        </button>
        <button
          className={`block w-full text-left px-4 py-2 mb-2 rounded ${
            selectedCluster === 'Testnet' ? 'bg-green-500' : 'bg-gray-700'
          }`}
          onClick={() => onSelect('Testnet')}
        >
          Testnet
        </button>
        <button
          className={`block w-full text-left px-4 py-2 rounded ${
            selectedCluster === 'Devnet' ? 'bg-green-500' : 'bg-gray-700'
          }`}
          onClick={() => onSelect('Devnet')}
        >
          Devnet
        </button>
        <button
          className="mt-4 text-white"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ClusterModal;
