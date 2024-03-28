import React, { useState, useEffect } from 'react';

const AllTokens = () => {
  const [tokens, setTokens] = useState([]);
  const apiKey = "CG-KTHBcz6hCUuQj4KiS6uWaB3W"; // Assuming the API key is needed

  useEffect(() => {
    const fetchAllTokens = async () => {
      const apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&x_cg_demo_api_key=${apiKey}`;
      try {
        const response = await fetch(apiUrl, {
          headers: {
            'x-cg-demo-api-key': apiKey // Pass the API key if needed
          }
        });
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setTokens(data);
      } catch (error) {
        console.error("Failed to fetch all tokens:", error);
      }
    };

    fetchAllTokens();
  }, [apiKey]); // Added apiKey as a dependency if API key is necessary for the request

  return (
    <div className="bg-white rounded-xl p-4 mx-16 my-4">
      <h2 className="text-2xl font-semibold mb-4">All Tokens</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {tokens.map((token) => (
          <div key={token.id} className="flex flex-col items-center p-4 border border-gray-200 rounded-lg">
            <img src={token.image} alt={token.name} className="w-20 h-20" />
            <h3 className="mt-2 font-bold">{token.name}</h3>
            <p className="text-sm text-gray-600">{token.symbol.toUpperCase()}</p>
            <p>Price: ${token.current_price}</p>
            <p>Market Cap: ${token.market_cap}</p>
            <p>Volume (24h): ${token.total_volume}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTokens;