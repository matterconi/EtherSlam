import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    // Trim the query to remove leading/trailing whitespace
    const trimmedQuery = query.trim();

    if (trimmedQuery.startsWith('0x') && trimmedQuery.length === 66) {
      navigate(`/tx/${trimmedQuery}`);
    } else if (trimmedQuery.startsWith('0x') && trimmedQuery.length === 42) {
      navigate(`/address/${trimmedQuery}`);
    } else {
      alert('Invalid input. Please enter a valid Ethereum address or transaction hash.');
    }
  };

  return (
    <div className="mx-auto md:w-[550px] w-[350px]">
      <form onSubmit={handleSearch} className="bg-white rounded-xl p-4 grid grid-cols-1 mb-16 relative border border-gray-400 hover:border-gray-200 focus-within:border-gray-200">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-4 pr-12 bg-white rounded-md placeholder-gray-400 text-black focus:outline-none"
          placeholder="Enter Ethereum address or transaction hash"
        />
        <button
          type="submit"
          className="absolute inset-y-0 right-0 m-2 flex items-center justify-center bg-pink-50 hover:bg-pink-100 p-2 rounded-md"
        >
          <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
