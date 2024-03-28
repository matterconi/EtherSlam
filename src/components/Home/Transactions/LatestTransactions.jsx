import { useBlockchainData } from '../../../context/useBlockchainData'; // Make sure this path is correct
import { CiViewList } from "react-icons/ci";
import TransactionCard from './TransactionCard'; // Ensure correct path
import { ethers } from 'ethers'; // Adjust import for ethers v5

// Mock transaction data for demonstration

const LatestTransactions = () => {
  const { latestBlocks } = useBlockchainData(); // Assuming useBlockchainData correctly fetches and sets latestBlocks

  // Ensure latestBlocks is not null and has data before trying to access it
  if (!latestBlocks || latestBlocks.length === 0) {
    return <div>Loading transactions...</div>; // Or any other loading state representation
  }

  // Assuming each block's transactions array contains transaction objects
  // with hash, timestamp, from, to, and amount properties
  // Here, we flatten all transactions from the latest blocks into a single array
  const transactions = [...latestBlocks[0].transactions].reverse().map(tx => ({
    hash: tx.hash,
    from: tx.from,
    to: tx.to,
    value: tx.value ? ethers.formatEther(tx.value) : "0",
  }))
  return (
    <div className="p-2 bg-white rounded-lg my-8 flex-1">
      <h2 className="p-2 text-lg font-bold text-center">Latest Transactions</h2>
      {transactions.slice(0, 5).map((tx, index) => (
        <TransactionCard
          index={index} // Adding index as a prop
          key={tx.hash} // Unique identifier for each transaction
          icon={<CiViewList size="24"/>}
          hash={tx.hash}
          timestamp={latestBlocks[0].timestamp} // Ensure timestamp is in correct format for TransactionCard
          from={tx.from}
          to={tx.to}
          value={`${tx.value}`} // Ensure amount is correctly formatted or calculated
        />
      ))}
      <div className="w-full flex justify-center mt-4"> {/* Wrapper to center the button */}
        <button 
          className="my-2 px-4 py-2 border border-gray-400 text-gray-800 font-semibold rounded hover:border-gray-500 hover:text-gray-900 transition-colors"
          onClick={() => {/* Your navigation or action for View All */}}
        >
          View All Transactions
        </button>
      </div>
    </div>
  );
};


export default LatestTransactions;
