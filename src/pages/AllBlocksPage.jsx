import { useState, useEffect } from 'react';
import DisplayAllBlocks from '../components/all/DisplayAllBlocks';
import MockInterface from '../components/shared/MockInterface';
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

  const handleNextPage = async () => {
    if (page > 0) {
      // Assuming blocks are sorted newest to oldest
      console.log(page)
      const newStartBlock = blocks[0].number + 25;
      console.log(newStartBlock)
      await fetchAndSetBlocks(newStartBlock);
      setPage((prevPage) => Math.max(0, prevPage - 1));;
    }
  };

  const handlePreviousPage = async () => {
    // Fetch older blocks
    console.log(page)
    
    const newStartBlock = blocks[0].number - 25;
    console.log(newStartBlock)
    await fetchAndSetBlocks(newStartBlock);
    setPage((prevPage) => prevPage + 1);
  };

  
  if (loading) return <MockInterface />;

  return (
    <div>
      <DisplayAllBlocks blocks={blocks} handlePreviousPage={handlePreviousPage} handleNextPage={handleNextPage} page={page}/>
    </div>
  );
};

export default AllBlocksPage;
