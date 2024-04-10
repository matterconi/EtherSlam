import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DisplayAllAddressTransactions from '../components/all/DisplayAllAddressTransactions';

const AllAddressTransactionsPage = () => {
  const { addressHash } = useParams(); // Extracting address hash from URL
  console.log('Address Hash:', addressHash); // Log the address hash obtained from URL

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    console.log('Effect running'); // Log when the effect runs

    const apiKey = "V38ISFW6218A75EA8JDCV7J3ZS5K4TI977"; // Make sure to use your actual Etherscan API key
    const startBlock = 0; // Example: You might want to adjust this based on your needs
    const endBlock = 'latest';

    const fetchTransactions = async () => {
      const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${addressHash}&startblock=${startBlock}&endblock=${endBlock}&sort=asc&apikey=${apiKey}`;
      console.log('Fetching Transactions from:', url); // Log the API URL

      setLoading(true);
      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log('Fetch response:', data); // Log the response from the fetch call

        if (data.status === "1") {
          setTransactions(data.result);
          console.log('Transactions set:', data.result); // Log the transactions data
        } else {
          throw new Error(data.message); // Handle API errors (e.g., "NOTOK" responses)
        }
      } catch (err) {
        console.error('Error fetching transactions:', err);
        setError('Failed to fetch transactions for the address.');
      } finally {
        setLoading(false);
      }
    };

    if (addressHash) {
      fetchTransactions();
    }
  }, [addressHash]);

  if (loading) {
    console.log('Loading...'); // Log when component is in loading state
    return <div>Loading...</div>;
  }
  if (error) {
    console.log('Error:', error); // Log any errors
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <DisplayAllAddressTransactions transactions={transactions} />
    </div>
  );
};

export default AllAddressTransactionsPage;
