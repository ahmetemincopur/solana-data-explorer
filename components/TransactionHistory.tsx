import React from 'react';

interface Transaction {
  signature: string;
  block: number;
  result: string;
}

interface TransactionHistoryProps {
  transactions: Transaction[];
  onRefresh: () => void;
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ transactions, onRefresh }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-semibold text-white">Transaction History</h3>
        <button onClick={onRefresh} className="bg-gray-700 text-white px-2 py-1 rounded">
          Refresh
        </button>
      </div>
      <table className="min-w-full bg-white text-black">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Transaction Signature</th>
            <th className="border px-4 py-2">Block</th>
            <th className="border px-4 py-2">Result</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? (
            transactions.map((tx) => (
              <tr key={tx.signature}>
                <td className="border px-4 py-2">{tx.signature}</td>
                <td className="border px-4 py-2">{tx.block}</td>
                <td className="border px-4 py-2">{tx.result}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="border px-4 py-2 text-center">
                Fetched full history
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionHistory;
