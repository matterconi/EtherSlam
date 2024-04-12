import { useNavigate } from 'react-router-dom';
import { useBlockchainData } from '../../../context/useBlockchainData';
import { CiViewList } from "react-icons/ci";
import TransactionCard from './TransactionCard';
import MockInterface from '../../shared/MockInterface'; // Adjust path if necessary
import { ethers } from 'ethers';

const LatestTransactions = () => {
  const navigate = useNavigate();
  const { latestBlocks, loading } = useBlockchainData(); // Using loading state from the context

  return (
    <div className="p-2 bg-white rounded-lg my-8 flex-1">
      <h2 className="p-2 text-lg font-bold text-center">Latest Transactions</h2>
      {loading ? (
        <MockInterface />
      ) : latestBlocks && latestBlocks.length > 0 && latestBlocks[0].transactions.length > 0 ? (
        latestBlocks[0].transactions.slice(0, 5).reverse().map((tx, index) => (
          <TransactionCard
            index={index}
            key={tx.hash}
            icon={<CiViewList size="24"/>} // Adjust icon as necessary
            hash={tx.hash}
            timestamp={latestBlocks[0].timestamp}
            from={tx.from}
            to={tx.to}
            value={`${ethers.formatEther(tx.value || 0)} ETH`}
          />
        ))
      ) : (
        <MockInterface /> // Display message if no transactions are available
      )}
      <div className="w-full flex justify-center mt-4">
        <button 
          className="my-2 px-4 py-2 border border-gray-400 text-gray-800 font-semibold rounded hover:border-gray-500 hover:text-gray-900 transition-colors"
          onClick={() => navigate('/transactions')} // Use navigate for navigation
        >
          View All Transactions
        </button>
      </div>
    </div>
  );
};

export default LatestTransactions;