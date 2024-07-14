import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (address: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className="bg-gray-800 p-4">
      <div className="container mx-auto">
        <form onSubmit={handleSearch} className="flex items-center space-x-2 bg-gray-700 p-2 rounded-lg">
          <input
            type="text"
            className="bg-gray-700 text-white outline-none px-2 py-1 flex-grow"
            placeholder="Search for blocks, accounts, transactions, programs, and tokens"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="text-gray-400 hover:text-white">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M12.9 14.32a8 8 0 111.42-1.42l4.58 4.59a1 1 0 01-1.42 1.42l-4.59-4.58zM14 8a6 6 0 11-12 0 6 6 0 0112 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
