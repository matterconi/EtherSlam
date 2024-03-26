import { useBlockchainData } from '../context/useBlockchainData'; // Make sure this path is correct
import { CiViewList } from "react-icons/ci";
import TransactionCard from './TransactionCard'; // Ensure correct path

// Mock transaction data for demonstration
const transactions = [
  { 
    hash: '0x1234...', 
    timestamp: Date.now() / 1000 - 300, // 5 minutes ago
    from: '0xAbC123...',
    to: '0xDeF456...', 
    amount: '0.5', // ETH
  },
  { 
    hash: '0x5678...', 
    timestamp: Date.now() / 1000 - 900, // 15 minutes ago
    from: '0xGhI789...',
    to: '0xJkL012...', 
    amount: '0.3', // ETH
  },
  // Add more transactions as needed
];

const LatestTransactions = () => {
  const { latestBlocks } = useBlockchainData(); // Assuming useBlockchainData correctly fetches and sets latestBlocks

  // Ensure latestBlocks is not null and has data before trying to access it
  if (!latestBlocks || latestBlocks.length === 0) {
    return <div>Loading transactions...</div>; // Or any other loading state representation
  }

  // Assuming each block's transactions array contains transaction objects
  // with hash, timestamp, from, to, and amount properties
  // Here, we flatten all transactions from the latest blocks into a single array
  const myTransactions = latestBlocks.flatMap(block => block.transactions);

  return (
    <div className="p-2 bg-white rounded-lg my-8 flex-1">
      <h2 className="p-2 text-lg font-bold text-center">Latest Transactions</h2>
      {transactions.map((tx) => (
        <TransactionCard
          key={tx.hash} // Unique identifier for each transaction
          icon={<CiViewList size="24"/>}
          hash={tx.hash}
          timestamp={tx.timestamp} // Ensure timestamp is in correct format for TransactionCard
          from={tx.from}
          to={tx.to}
          amount={`${tx.amount} ETH`} // Ensure amount is correctly formatted or calculated
        />
      ))}
      <div className="w-full flex justify-center mt-4">
        <button
          onClick={() => console.log('Viewing all transactions...')}
          className="mt-4 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        >
          View All Transactions
        </button>
      </div>
    </div>
  );
};


export default LatestTransactions;
