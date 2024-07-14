'use client';

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import ClusterStats from '../components/ClusterStats';
import Overview from '../components/Overview';
import TransactionHistory from '../components/TransactionHistory';
import { Cluster, getBalance, getAccountInfo, getTransactionHistory, ENDPOINTS } from '../lib/solana';
import { Connection } from '@solana/web3.js';

const Home: React.FC = () => {
  const [selectedCluster, setSelectedCluster] = useState<Cluster>('Devnet');
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState<number | null>(null);
  const [dataSize, setDataSize] = useState(0);
  const [programId, setProgramId] = useState('');
  const [executable, setExecutable] = useState(false);
  const [transactions, setTransactions] = useState<{ signature: string; block: number; result: string }[]>([]);
  const [connection, setConnection] = useState(new Connection(ENDPOINTS[selectedCluster]));

  const handleClusterChange = (cluster: Cluster) => {
    setSelectedCluster(cluster);
    setConnection(new Connection(ENDPOINTS[cluster]));
  };

  const handleSearch = async (address: string) => {
    setAddress(address);

    // Solana API'den hesap bilgilerini ve işlemlerini alın
    const accountBalance = await getBalance(address, connection);
    setBalance(accountBalance);

    const accountInfo = await getAccountInfo(address, connection);
    if (accountInfo) {
      setDataSize(accountInfo.dataSize);
      setProgramId(accountInfo.programId);
      setExecutable(accountInfo.executable);
    } else {
      setDataSize(0);
      setProgramId('');
      setExecutable(false);
    }

    const transactionHistory = await getTransactionHistory(address, connection);
    setTransactions(transactionHistory);
  };

  return (
    <div>
      <Navbar onClusterChange={handleClusterChange} />
      <SearchBar onSearch={handleSearch} />
      {address ? (
        <>
          <Overview
            address={address}
            balance={balance}
            dataSize={dataSize}
            programId={programId}
            executable={executable}
          />
          <TransactionHistory transactions={transactions} onRefresh={() => handleSearch(address)} />
        </>
      ) : (
        <ClusterStats selectedCluster={selectedCluster} />
      )}
    </div>
  );
};

export default Home;
