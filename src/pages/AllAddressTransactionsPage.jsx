import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DisplayAllAddressTransactions from '../components/all/DisplayAllAddressTransactions';
import MockInterface from '../components/shared/MockInterface';

const AllAddressTransactionsPage = () => {
  const { addressHash } = useParams();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1); // Pagination state

  useEffect(() => {
    const fetchTransactions = async () => {
      const apiKey = "V38ISFW6218A75EA8JDCV7J3ZS5K4TI977";
      const pageSize = 25; // Define the number of transactions per page
      const startBlock = 'latest'; // Start fetching from the latest block
      // Assuming the API supports page and offset parameters
      const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${addressHash}&startblock=${startBlock}&page=${page}&offset=${pageSize}&sort=desc&apikey=${apiKey}`;

      setLoading(true);
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.status === "1") {
          if (page > 1) {
            setTransactions(prev => [...prev, ...data.result]);
          } else {
            setTransactions(data.result);
          }
        } else {
          throw new Error(data.message);
        }
      } catch (err) {
        console.error('Error fetching transactions:', err);
        setError('Failed to fetch transactions for the address.');
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [addressHash, page]);

  const handleNextPage = () => setPage(prev => prev + 1);
  const handlePreviousPage = () => setPage(prev => Math.max(1, prev - 1));

  if (loading) return <MockInterface />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <DisplayAllAddressTransactions transactions={transactions.slice((page - 1) * 25, page * 25)} handlePreviousPage={handlePreviousPage} handleNextPage={handleNextPage} page={page} />
    </div>
  );
};

export default AllAddressTransactionsPage;
