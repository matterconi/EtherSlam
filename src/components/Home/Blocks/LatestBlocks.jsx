import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useBlockchainData } from '../../../context/useBlockchainData';
import BlockCard from './BlockCard'; // Ensure this path is correct
import MockInterface from '../../shared/MockInterface'; // Ensure this path is correct
import { IoCubeOutline } from 'react-icons/io5';

const LatestBlocks = () => {
  const navigate = useNavigate(); // Use the useNavigate hook
  const { latestBlocks } = useBlockchainData();

  return (
    <div className="p-2 bg-white rounded-lg my-8 flex-1">
      <h2 className="p-2 text-lg font-bold text-center">Latest Blocks</h2>
      {latestBlocks && latestBlocks.length > 0 ? (
        latestBlocks.map((block, index) => (
          <BlockCard
            index={index}
            key={block.number}
            icon={<IoCubeOutline size="24"/>}
            blockNumber={block.number}
            transactions={block.transactions.length}
            createdAgo={block.timestamp}
            feeRecipient={block.miner}
            totalFees={block.totalFees}
          />
        ))
      ) : (
        <MockInterface />
      )}
      <div className="w-full flex justify-center mt-4">
        <button 
          className="my-2 px-4 py-2 border border-gray-400 text-gray-800 font-semibold rounded hover:border-gray-500 hover:text-gray-900 transition-colors"
          onClick={() => navigate('/blocks')} // Use navigate for navigation
        >
          View All Blocks
        </button>
      </div>
    </div>
  );
};

export default LatestBlocks;
