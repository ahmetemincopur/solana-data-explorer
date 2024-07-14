import React from 'react';

interface OverviewProps {
  address: string;
  balance: number | null;
  dataSize: number;
  programId: string;
  executable: boolean;
}

const Overview: React.FC<OverviewProps> = ({ address, balance, dataSize, programId, executable }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-4">
      <h3 className="text-xl font-semibold mb-2 text-white">Overview</h3>
      <table className="min-w-full bg-white text-black">
        <tbody>
          <tr className="bg-gray-200">
            <td className="border px-4 py-2">Address</td>
            <td className="border px-4 py-2">{address}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Balance (SOL)</td>
            <td className="border px-4 py-2">{balance !== null ? balance : 'Account does not exist'}</td>
          </tr>
          <tr className="bg-gray-200">
            <td className="border px-4 py-2">Allocated Data Size</td>
            <td className="border px-4 py-2">{dataSize} byte(s)</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Assigned Program Id</td>
            <td className="border px-4 py-2">{programId}</td>
          </tr>
          <tr className="bg-gray-200">
            <td className="border px-4 py-2">Executable</td>
            <td className="border px-4 py-2">{executable ? 'Yes' : 'No'}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Overview;
