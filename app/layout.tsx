"use client"

import './globals.css';
import Navbar from '../components/Navbar';
import { useState } from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [selectedCluster, setSelectedCluster] = useState<'Mainnet Beta' | 'Testnet' | 'Devnet'>('Devnet');

  const handleClusterChange = (cluster: 'Mainnet Beta' | 'Testnet' | 'Devnet') => {
    setSelectedCluster(cluster);
  };

  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
