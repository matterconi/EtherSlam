import React, { useState, useEffect } from 'react';

const AllNFTs = () => {
  const [nftDetails, setNftDetails] = useState([]);
  const apiKey = "CG-KTHBcz6hCUuQj4KiS6uWaB3W"; // Assuming an API key is needed

  useEffect(() => {
    const fetchNFTs = async () => {
      // Fetch the list of NFTs
      const listUrl = `https://api.coingecko.com/api/v3/nfts/list?x_cg_demo_api_key=${apiKey}`;
      try {
        const listResponse = await fetch(listUrl, {
          headers: {
            'x-cg-demo-api-key': apiKey,
          },
        });
        if (!listResponse.ok) throw new Error('Failed to fetch NFT list');
        const data = await listResponse.json();
        // Assume the response includes a list of NFTs and we take the first 10
        const first10NFTs = data.slice(0, 10);

        // Fetch details for each NFT
        const detailsPromises = first10NFTs.map(async (nft) => {
          const detailUrl = `https://api.coingecko.com/api/v3/nfts/${nft.id}?x_cg_demo_api_key=${apiKey}`;
          const detailResponse = await fetch(detailUrl, {
            headers: {
              'x-cg-demo-api-key': apiKey,
            },
          });
          if (!detailResponse.ok) throw new Error(`Failed to fetch details for NFT ${nft.id}`);
          return detailResponse.json();
        });

        // Resolve all promises
        const details = await Promise.all(detailsPromises);
        console.log(details);
        setNftDetails(details);
      } catch (error) {
        console.error("Error fetching NFTs:", error);
      }
    };

    fetchNFTs();
  }, [apiKey]); // Dependency on the API key if necessary

  return (
    <div className="bg-white rounded-xl p-4 mx-16 my-4">
      <h2 className="text-2xl font-semibold mb-4">All NFTs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {nftDetails.map((nft) => (
          <div key={nft.id} className="flex flex-col items-center p-4 border border-gray-200 rounded-lg">
            <img src={nft.image.small} alt={nft.name} className="w-20 h-20" />
            <h3 className="mt-2 font-bold">{nft.name}</h3>
            <p>Floor Price: {nft.floor_price.usd} USD</p>
            <p>Market Cap: {nft.market_cap.usd} USD</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllNFTs;
