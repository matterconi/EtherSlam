import { useState, useEffect } from 'react';
import DisplayAllTransactions from '../components/all/DisplayAllTransactions';
import { useBlockchainData } from '../context/useBlockchainData';
import { fetchRecentBlocks } from '../utils/fetchRecentBlocks';

const AllTransactionPage = () => {
  const { latestBlock } = useBlockchainData();
  const [transactions, setTransactions] = useState([]);
  const [timestamp, setTimestamp] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const transactionsPerPage = 25;
  const [blockCount, setBlockCount] = useState(0);

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      setError('');

      try {
        if (!latestBlock?.number) {
          setError('Latest block data is not available.');
          setLoading(false);
          return;
        }
        
        // Determine if we need to fetch a new block based on remaining transactions
        const transactionsNeeded = (currentPage + 1) * transactionsPerPage;
        let needNewBlock = transactions.length < transactionsNeeded;
        
        if (needNewBlock) {
          const block = await fetchRecentBlocks(1, latestBlock.number - blockCount);
          setTimestamp(block[0].timestamp);
          const newTransactions = block.flatMap(block => block.transactions);
          setTransactions(t => [...t, ...newTransactions]);
          if (blockCount === 0) setBlockCount(1);
          else setBlockCount(prevCount => prevCount + 1);
        }
      } catch (err) {
        console.error('Error fetching transactions:', err);
        setError('Failed to fetch transactions.');
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [latestBlock, currentPage, transactionsPerPage, blockCount, transactions.length]);

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(prevPage => Math.max(0, prevPage - 1));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <DisplayAllTransactions transactions={transactions.slice(currentPage * transactionsPerPage, (currentPage + 1) * transactionsPerPage)} timestamp={timestamp}/>
      <div className="flex justify-center space-x-4 mt-4">
        <button onClick={handlePreviousPage} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" disabled={currentPage === 0}>
          Newer
        </button>
        <button onClick={handleNextPage} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Older
        </button>
      </div>
    </div>
  );
};

export default AllTransactionPage;
