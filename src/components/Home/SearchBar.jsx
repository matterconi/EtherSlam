import { useState } from 'react';

const SearchBar = ({ setTransaction, setAddressDetails }) => {
  const etherscanApiKey = "V38ISFW6218A75EA8JDCV7J3ZS5K4TI977";
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setResult(null); // Clear previous results

    if (query.startsWith('0x') && query.length === 66) { // Transaction hash
      const txInfoUrl = `https://api.etherscan.io/api?module=proxy&action=eth_getTransactionByHash&txhash=${query}&apikey=${etherscanApiKey}`;

      try {
        const response = await fetch(txInfoUrl);
        const data = await response.json();
        if (data.result) {
          const details = data.result;
          const formattedResult = `
            Block Number: ${parseInt(details.blockNumber, 16)}
            From: ${details.from}
            To: ${details.to}
            Value: ${(parseInt(details.value, 16) / 1e18).toFixed(18)} ETH
            Gas Used: ${parseInt(details.gas, 16)}
            Gas Price: ${(parseInt(details.gasPrice, 16) / 1e9).toFixed(9)} Gwei
          `;
          setResult(formattedResult);
          setTransaction(details); // Passing transaction details to parent component
        } else {
          setResult('Transaction not found or not yet indexed.');
        }
      } catch (error) {
        console.error('Error fetching transaction details:', error);
        setResult('Failed to fetch transaction details. Please try again.');
      }
    } else if (query.startsWith('0x') && query.length === 42) { // Ethereum address
      const balanceUrl = `https://api.etherscan.io/api?module=account&action=balance&address=${query}&tag=latest&apikey=${etherscanApiKey}`;

      try {
        const response = await fetch(balanceUrl);
        const data = await response.json();
        if (data.result) {
          const balanceEth = (parseInt(data.result, 16) / 1e18).toFixed(18);
          const formattedResult = `Balance: ${balanceEth} ETH`;
          setResult(formattedResult);
          setAddressDetails({ address: query, balance: balanceEth }); // Passing address details to parent component
        } else {
          setResult('Address not found or API error.');
        }
      } catch (error) {
        console.error('Error fetching address balance:', error);
        setResult('Failed to fetch address balance. Please try again.');
      }
    } else {
      setResult('Invalid input. Please enter a valid Ethereum address or transaction hash.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch} className='flex justify-center mb-8'>
        <input
          type="text"
          className="input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter Ethereum address or transaction hash"
        />
        <button type="submit" className="button">Search</button>
      </form>
      {result && <p>{result}</p>}
    </div>
  );
};

export default SearchBar;