import { useBlockchainData } from '../../../context/useBlockchainData';
import BlockCard from './BlockCard'; // Ensure this path is correct
import { IoCubeOutline } from 'react-icons/io5';

const LatestBlocks = () => {
  const { latestBlocks } = useBlockchainData(); // Adjusted to latestBlocks

  return (
    <div className="p-2 bg-white rounded-lg my-8 flex-1">
      <h2 className="p-2 text-lg font-bold text-center">Latest Blocks</h2>
      {latestBlocks && latestBlocks.length > 0 ? (
        latestBlocks.map((block, index) => ( // Iterating over blocks
          <BlockCard
            index={index} // Adding index as a prop
            key={block.number}
            icon={<IoCubeOutline size="24"/>}
            blockNumber={block.number}
            transactions={block.transactions.length} // Assuming transactions is an array
            createdAgo={block.timestamp} // Consider calculating this based on block.timestamp
            feeRecipient={block.miner}
            totalFees={block.totalFees} // Adjust according to your needs or data availability
          />
        ))
      ) : (
        <div>Loading...</div>
      )}
      <div className="w-full flex justify-center mt-4"> {/* Wrapper to center the button */}
        <button 
          className="my-2 px-4 py-2 border border-gray-400 text-gray-800 font-semibold rounded hover:border-gray-500 hover:text-gray-900 transition-colors"
          onClick={() => {/* Your navigation or action for View All */}}
        >
          View All Blocks
        </button>
      </div>
    </div>
  );
};

export default LatestBlocks;