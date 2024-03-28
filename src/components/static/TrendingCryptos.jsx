import React, { useState, useEffect } from 'react';

const TrendingCryptos = () => {
  const [trending, setTrending] = useState([]);
  const apiKey = "CG-KTHBcz6hCUuQj4KiS6uWaB3W"; // Your API key

  useEffect(() => {
    const fetchTrendingCryptos = async () => {
      const apiUrl = `https://api.coingecko.com/api/v3/search/trending?x_cg_demo_api_key=${apiKey}`;
      try {
        const response = await fetch(apiUrl, {
          headers: {
            'x-cg-demo-api-key': apiKey // Alternative way to pass the API key if needed
          }
        });
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        console.log(data)
        setTrending(data.coins);
      } catch (error) {
        console.error("Failed to fetch trending cryptocurrencies:", error);
      }
    };

    fetchTrendingCryptos();
  }, [apiKey]); // Added apiKey as a dependency

  return (
    <div className="bg-white rounded-xl p-4 mx-16 my-4">
      <h2 className="text-2xl font-semibold mb-4">Trending Cryptocurrencies</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {trending.map((crypto) => (
          <div key={crypto.item.id} className="flex flex-col items-center p-4 border border-gray-200 rounded-lg">
            <img src={crypto.item.small} alt={crypto.item.name} className="w-20 h-20" />
            <h3 className="mt-2 font-bold">{crypto.item.name}</h3>
            <p className="text-sm text-gray-600">{crypto.item.symbol.toUpperCase()}</p>
            {/* Displaying additional information */}
            <p>Price: ${crypto.item.data.price}</p>
            <p>Market Cap: ${crypto.item.data.market_cap}</p>
            <p>Total Volume: ${crypto.item.data.total_volume}</p>
            <p>Market Cap Rank: #{crypto.item.market_cap_rank}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingCryptos;
