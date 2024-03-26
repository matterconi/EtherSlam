import { CiViewList } from "react-icons/ci";
import BlockCard from './BlockCard'; // Adjust the import path as necessary
const LatestBlocks = () => {
  // Fake block data for demonstration
  const blocks = [
    { 
      blockNumber: 12345, 
      transactions: 10, 
      totalFees: '0.5 ETH', 
      createdAgo: '5 hours ago', 
      feeRecipient: '0xAbC123...'
    },
    { 
      blockNumber: 12346, 
      transactions: 15, 
      totalFees: '0.3 ETH', 
      createdAgo: '4 hours ago', 
      feeRecipient: '0xDeF456...'
    },
    { 
      blockNumber: 12347, 
      transactions: 8, 
      totalFees: '0.2 ETH', 
      createdAgo: '3 hours ago', 
      feeRecipient: '0xGhI789...'
    },
    { 
      blockNumber: 12348, 
      transactions: 12, 
      totalFees: '0.4 ETH', 
      createdAgo: '2 hours ago', 
      feeRecipient: '0xJkL012...'
    },
    { 
      blockNumber: 12349, 
      transactions: 9, 
      totalFees: '0.1 ETH', 
      createdAgo: '1 hour ago', 
      feeRecipient: '0xMnO345...'
    },
  ];
  

  return (
    <div className="p-2 bg-white rounded-lg my-8 flex-1">
      <h2 className="p-2 text-lg font-bold  text-center">Latest Blocks</h2>
      {blocks.map((block, i) => 
      (
        <BlockCard
          key={block.blockNumber}
          index={i}
          icon={<CiViewList  size="24"/>}
          blockNumber={block.blockNumber}
          transactions={block.transactions}
          totalFees={block.totalFees}
          createdAgo={block.createdAgo}
          feeRecipient={block.feeRecipient}
        />
      ))}
      <div className="w-full flex justify-center">
        <button 
          onClick={() => console.log('Viewing all blocks...')}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline my-2"
        >
          View All Blocks
        </button>
      </div>
    </div>
  );
};

export default LatestBlocks;