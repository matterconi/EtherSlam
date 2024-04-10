import { useState, useEffect } from 'react';
import DisplayAllBlocks from '../components/all/DisplayAllBlocks';
import { useBlockchainData } from '../context/useBlockchainData';
import { fetchRecentBlocks } from '../utils/fetchRecentBlocks';

const AllBlocksPage = () => {
  const { latestBlock } = useBlockchainData();
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0); // Add a new state variable [1
  const blocksPerPage = 25;

  const fetchAndSetBlocks = async (blockNumber) => {
    setLoading(true);
    try {
      const blocksData = await fetchRecentBlocks(blocksPerPage, blockNumber);
      setBlocks(blocksData);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching recent blocks:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (latestBlock?.number) {
      fetchAndSetBlocks(latestBlock.number);
    }
  }, [latestBlock]);

  const handleNext = async () => {
    if (page > 0) {
      // Assuming blocks are sorted newest to oldest
      const newStartBlock = blocks[0].number + 25;
      await fetchAndSetBlocks(newStartBlock);
      setPage(page - 1);
    }
  };

  const handlePrevious = async () => {
    // Fetch older blocks
    const newStartBlock = blocks[0].number - 25;
    await fetchAndSetBlocks(newStartBlock);
    setPage(page + 1);
  };

  const renderNavigationButtons = () => (
    <div className="flex justify-between">
      <button
        onClick={handleNext}
        className={`bg-blue-500 text-white p-2 rounded ${ page === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={page < 1}
        title={ page < 1 ? 'You are viewing the most recent blocks' : 'Go to more recent blocks'}>
        Next
      </button>
      <button
        onClick={handlePrevious}
        className={`bg-blue-500 text-white p-2 rounded ${blocks.length < blocksPerPage ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={blocks.length < blocksPerPage}
        title={blocks.length < blocksPerPage ? 'No older blocks to view' : 'Go to older blocks'}>
        Previous
      </button>
    </div>
  );

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <DisplayAllBlocks blocks={blocks} />
      {renderNavigationButtons()}
    </div>
  );
};

export default AllBlocksPage;
