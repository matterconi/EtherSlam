import { useBlockchainData } from '../context/useBlockchainData';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DisplayAddress from '../components/params/DisplayAddress'; // Adjust the import path as necessary

const AddressPage = () => {
  const latestBlock = useBlockchainData();
  const { addressHash } = useParams();
  const [addressData, setAddressData] = useState({
    ethBalance: 0,
    transactions: [],
    tokens: [],
    nfts: [],
    addressType: '' // Add addressType to the state
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const apiKey = "V38ISFW6218A75EA8JDCV7J3ZS5K4TI977";
    const alchemyKey = " https://eth-mainnet.g.alchemy.com/v2/qPM6j1ZfMd658HQjSInxD4duTMuEjtoT"
    const startblock = latestBlock && latestBlock.latestBlock ? latestBlock.latestBlock.number - 100000 : 0;
    const endblock = latestBlock && latestBlock.latestBlock ? latestBlock.latestBlock.number : 0;

    const fetchAddressData = async () => {
      if (!startblock) return;
      setLoading(true);
      try {
        const balanceUrl = `https://api.etherscan.io/api?module=account&action=balance&address=${addressHash}&tag=latest&apikey=${apiKey}`;
        const transactionsUrl = `https://api.etherscan.io/api?module=account&action=txlist&address=${addressHash}&startblock=${startblock}&endblock=${endblock}&page=1&offset=10&sort=asc&apikey=${apiKey}`;

        // Fetch Ether balance
        const balanceResponse = await fetch(balanceUrl);
        const balanceData = await balanceResponse.json();
        const ethBalance = (parseFloat(balanceData.result) / 1e18).toFixed(18); // Convert to Ether and format

        // Fetch transactions
        const transactionsResponse = await fetch(transactionsUrl);
        const transactionsData = await transactionsResponse.json();

        // Check address type (EOA or Contract)
        const respose = await fetch(alchemyKey, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            jsonrpc: "2.0",
            method: "eth_getCode",
            params: [addressHash, "latest"],
            id: 1,
          }),
        });

        const data = await respose.json();
        const addressType = data.result === "0x" ? "EOA" : "Contract";
        setAddressData(prevData => ({
          ...prevData,
          ethBalance,
          transactions: transactionsData.result,
          addressType // Update addressType in state
        }));
      } catch (err) {
        console.error('Error fetching address details:', err);
        setError('Failed to fetch address details.');
      } finally {
        setLoading(false);
      }
    };

    fetchAddressData();
  }, [addressHash, latestBlock]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <DisplayAddress addressData={addressData} addressHash={addressHash}/>
    </div>
  );
};

export default AddressPage;
