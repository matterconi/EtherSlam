import { useState, useEffect } from 'react';

// Helper function to format numbers in billions
const formatBillions = (num) => {
  return `${(num / 1e9).toFixed(2)}B`;
};

const AllTokens = () => {
  const [tokens, setTokens] = useState([]);
  const apiKey = "CG-KTHBcz6hCUuQj4KiS6uWaB3W";

  useEffect(() => {
    const fetchAllTokens = async () => {
      const apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&x_cg_demo_api_key=${apiKey}`;
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setTokens(data);
      } catch (error) {
        console.error("Failed to fetch all tokens:", error);
      }
    };

    fetchAllTokens();
  }, []);

  return (
    <div className="bg-white rounded-xl p-4 mx-auto my-4">
      <h2 className="text-2xl text-center font-semibold my-8">All Tokens</h2>
      {/* Token Rows/Cards, adjusted for responsive layout */}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 lg:gap-4 text-center">
        {tokens.map((token) => (
          <div key={token.id} className="border border-gray-200 rounded-lg p-4 mb-4 md:mb-0">
            <div className="flex items-center space-x-2 mb-4 justify-center">
              <img src={token.image} alt={token.name} className="w-10 h-10 mr-2 rounded-full" />
              <span className="font-bold">{token.name}</span>
            </div>
            <div className="flex flex-col space-y-2">
              <span>Price: ${token.current_price.toLocaleString()}</span>
              <span>Market Cap: ${formatBillions(token.market_cap)}</span>
              <span>Volume (24h): ${formatBillions(token.total_volume)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTokens;
