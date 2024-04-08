import React, { useState, useEffect } from 'react';

// Helper function to format numbers in billions
const formatBillions = (num) => {
  return `${(num / 1e6).toFixed(2)}M`;
};

const AllNFTs = () => {
  const [nftDetails, setNftDetails] = useState([]);
  const apiKey = "CG-KTHBcz6hCUuQj4KiS6uWaB3W";

  useEffect(() => {
    const fetchNFTs = async () => {
      const listUrl = `https://api.coingecko.com/api/v3/nfts/list?x_cg_demo_api_key=${apiKey}`;
      try {
        const listResponse = await fetch(listUrl);
        if (!listResponse.ok) throw new Error('Failed to fetch NFT list');
        const data = await listResponse.json();
        const first20NFTs = data.slice(0, 24);
        const detailsPromises = first20NFTs.map(async (nft) => {
          const detailUrl = `https://api.coingecko.com/api/v3/nfts/${nft.id}?x_cg_demo_api_key=${apiKey}`;
          const detailResponse = await fetch(detailUrl);
          if (!detailResponse.ok) throw new Error(`Failed to fetch details for NFT ${nft.id}`);
          return detailResponse.json();
        });

        const details = await Promise.all(detailsPromises);
        console.log(details);
        setNftDetails(details);
      } catch (error) {
        console.error("Error fetching NFTs:", error);
      }
    };

    fetchNFTs();
  }, [apiKey]);

  return (
    <div className="bg-white rounded-xl p-4 mx-auto my-4">
      <h2 className="text-2xl text-center font-semibold my-8">Trending NFTs</h2>
      {/* NFT Rows/Cards */}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 lg:gap-4 max-sm:text-center">
        {nftDetails.map((nft, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4 md:mb-0">
            <div className="flex items-center space-x-2 mb-4 max-sm:justify-center">
              {nft.image.small !== "missing_small.png" && <img src={nft.image.small} alt={nft.name} className="w-10 h-10 mr-2 rounded-full" />}
              <span className="font-bold">{nft.name}</span>
            </div>
            <div className="flex flex-col space-y-2">
              <span>Floor Price: {nft.floor_price ? `$${nft.floor_price.usd.toLocaleString()}` : 'N/A'}</span>
              <span>Market Cap: {nft.market_cap ? `$${formatBillions(nft.market_cap.usd)}` : 'N/A'}</span>
              <span>Unique owners: {nft.number_of_unique_addresses}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllNFTs;
