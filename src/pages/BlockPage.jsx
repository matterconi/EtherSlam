import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DisplayBlock from '../components/params/DisplayBlock'; // Ensure this path is correct
import { fetchBlock } from '../utils/fetchBlock'; // Adjust the import path as necessary

const BlockPage = () => {
  const { blockNumber } = useParams();
  const [block, setBlock] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAndSetBlockData = async () => {
      setLoading(true);
      try {
        // Convert blockNumber to a number as fetchBlock might expect a number type
        const blockData = await fetchBlock(Number(blockNumber));
        setBlock(blockData);
      } catch (err) {
        console.error('Error fetching block details:', err);
        setError('Failed to fetch block details.');
      } finally {
        setLoading(false);
      }
    };

    if (blockNumber) {
      fetchAndSetBlockData();
    }
  }, [blockNumber]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!block) return <div>No block data found.</div>;
  return (
    <div>
      <DisplayBlock block={block} />
    </div>
  );
};

export default BlockPage;
