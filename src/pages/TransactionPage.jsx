import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DisplayTransaction from '../components/params/DisplayTransaction'; // Adjust the path as necessary
import MockInterface from '../components/shared/MockInterface'; // Adjust the path as necessary

const TransactionPage = () => {
  const { transactionHash } = useParams();
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [timestamp, setTimestamp] = useState('');

  useEffect(() => {
    const fetchTransactionData = async () => {
      setLoading(true);
      const apiKey = "V38ISFW6218A75EA8JDCV7J3ZS5K4TI977";
      const url = `https://api.etherscan.io/api?module=proxy&action=eth_getTransactionByHash&txhash=${transactionHash}&apikey=${apiKey}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.result) {
          const blockNumberDecimal = parseInt(data.result.blockNumber, 16);  // Convert hex to decimal
          const blockResponse = await fetch(`https://api.etherscan.io/api?module=block&action=getblockreward&blockno=${blockNumberDecimal}&apikey=${apiKey}`);
          const blockData = await blockResponse.json();
          console.log(blockData)
          setTransaction(data.result);
          setTimestamp(blockData.result.timeStamp);
        } else {
          setError('Transaction not found.');
        }
      } catch (err) {
        console.error('Error fetching transaction details:', err);
        setError('Failed to fetch transaction details.');
      } finally {
        setLoading(false);
      }
    };

    if (transactionHash) {
      fetchTransactionData();
    }
  }, [transactionHash]);

  if (loading) return <MockInterface />;
  if (error) return <div>Error: {error}</div>;
  if (!transaction) return <div>No transaction data found.</div>;

  return (
    <div>
      <DisplayTransaction transaction={transaction} timestamp={timestamp}/>
    </div>
  );
};

export default TransactionPage;