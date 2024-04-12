import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DisplayAllTransactions from '../components/all/DisplayAllTransactions';
import MockInterface from '../components/shared/MockInterface';
import { fetchBlock } from '../utils/fetchBlock';

const AllBlocksTransactionsPage = () => {
  const { blockNumber } = useParams();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [timestamp, setTimestamp] = useState('');
  const [currentPage, setCurrentPage] = useState(0); // Start from page 0 for slicing

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        setLoading(true);
        const block = await fetchBlock(Number(blockNumber));
        setTimestamp(block.timestamp);
        setTransactions(block.transactionsArray);
      } catch (err) {
        console.error('Failed to fetch transactions:', err);
        setError('Failed to fetch transactions.');
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();
  }, [blockNumber]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(0, prevPage - 1));
  };

  const transactionsPerPage = 25;
  const totalTransactions = transactions.length;
  const totalPages = Math.ceil(totalTransactions / transactionsPerPage);
  const isLimit = currentPage === totalPages - 1;

  if (loading) return <MockInterface />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <DisplayAllTransactions
        transactions={transactions.slice(currentPage * transactionsPerPage, (currentPage + 1) * transactionsPerPage)}
        timestamp={timestamp} handlePreviousPage={handlePreviousPage} handleNextPage={handleNextPage} page={currentPage} totalPages={totalPages} isLimit={isLimit}
        isBlock={true} transactionsNumber={totalTransactions}
      />
    </div>
  );
};

export default AllBlocksTransactionsPage;
