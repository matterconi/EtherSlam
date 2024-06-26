import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ethers } from 'ethers'; // Ensure ethers v5 is used

// Utility function to shorten the transaction hash for display
const formatHash = (hash) => hash.substring(0, 10) + '...';

// Function to format the timestamp
const formatTimestamp = (timestamp) => {
  const currentTime = Date.now();
  const transactionTime = timestamp * 1000; // Assuming timestamp is in seconds and needs conversion to milliseconds
  const timeDifference = currentTime - transactionTime;
  const secondsDifference = Math.floor(timeDifference / 1000);

  if (secondsDifference < 60) {
    return `${secondsDifference} seconds ago`;
  } else if (secondsDifference < 3600) {
    return `${Math.floor(secondsDifference / 60)} minutes ago`;
  } else if (secondsDifference < 86400) {
    return `${Math.floor(secondsDifference / 3600)} hours ago`;
  } else {
    return `${Math.floor(secondsDifference / 86400)} days ago`;
  }
};

const DisplayAllAddressTransactions = ({ transactions, handlePreviousPage, handleNextPage, page }) => {
  return (
    <>
      <div className="p-4 bg-white shadow-lg rounded-lg mb-8">
        <h2 className="text-xl mb-4">Address Transactions</h2>

        {/* For larger screens */}
        <div className="hidden sm:block mt-4">
          <div className="grid grid-cols-6 text-sm font-semibold text-gray-700">
            <div className="px-4 py-2">Hash</div>
            <div className="px-4 py-2">Block Number</div>
            <div className="px-4 py-2">Timestamp</div>
            <div className="px-4 py-2">From</div>
            <div className="px-4 py-2">To</div>
            <div className="px-4 py-2">Value (ETH)</div>
          </div>
          {transactions.map((transaction, index) => (
            <div key={index} className={`grid grid-cols-6 text-sm items-center ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border-b`}>
              <div className="px-4 py-2">
                <Link to={`/tx/${transaction.hash}`} className="text-blue-500">{formatHash(transaction.hash)}</Link>
              </div>
              <div className="px-4 py-2">{transaction.blockNumber}</div>
              <div className="px-4 py-2">{formatTimestamp(transaction.timeStamp)}</div>
              <div className="px-4 py-2">
                <Link to={`/address/${transaction.from}`} className="text-blue-500">{formatHash(transaction.from)}</Link>
              </div>
              <div className="px-4 py-2">
                <Link to={`/address/${transaction.to}`} className="text-blue-500">{formatHash(transaction.to)}</Link>
              </div>
              <div className="px-4 py-2">
                {ethers.formatEther(transaction.value)} ETH
              </div>
            </div>
          ))}
          <div className='flex justify-center space-x-8 p-4'>
            <button className="my-2 px-4 py-2 border border-gray-400 text-gray-800 font-semibold rounded hover:border-gray-500 hover:text-gray-900 transition-colors" onClick={handlePreviousPage} disabled={page === 1}>Previous</button>
            <button className="my-2 px-4 py-2 border border-gray-400 text-gray-800 font-semibold rounded hover:border-gray-500 hover:text-gray-900 transition-colors" onClick={handleNextPage}>Next</button>
          </div>
        </div>

        {/* For smaller screens */}
        <div className="sm:hidden">
          {transactions.map((transaction, index) => (
            <div key={index} className="border border-gray-200 rounded-lg mb-4 shadow-sm">
              <div className="p-4 flex flex-col items-center justify-center space-y-2">
                <p className="text-sm font-semibold">
                  Hash: <Link to={`/transaction/${transaction.hash}`} className="text-blue-500 break-all">{formatHash(transaction.hash)}</Link>
                </p>
                <p className="text-sm">Block Number: {transaction.blockNumber}</p>
                <p className="text-sm">Timestamp: {formatTimestamp(transaction.timeStamp)}</p>
                <p className="text-sm">
                  From: <Link to={`/address/${transaction.from}`} className="text-blue-500 break-all">{formatHash(transaction.from)}</Link>
                </p>
                <p className="text-sm">
                  To: <Link to={`/address/${transaction.to}`} className="text-blue-500 break-all">{formatHash(transaction.to)}</Link>
                </p>
                <p className="text-sm">
                  Value: {ethers.formatEther(transaction.value)} ETH
                </p>
              </div>
            </div>
          ))}
          <div className='flex flex-row items-center space-y-4'>
            <button className="my-2 px-4 py-2 border border-gray-400 text-gray-800 font-semibold rounded hover:border-gray-500 hover:text-gray-900 transition-colors" onClick={handlePreviousPage} disabled={page === 1}>Previous</button>
            <button className="my-2 px-4 py-2 border border-gray-400 text-gray-800 font-semibold rounded hover:border-gray-500 hover:text-gray-900 transition-colors" onClick={handleNextPage}>Next</button>
          </div>
        </div>
      </div>
    </>
  );
};

DisplayAllAddressTransactions.propTypes = {
  transactions: PropTypes.array.isRequired,
  handlePreviousPage: PropTypes.func.isRequired,
  handleNextPage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
};

export default DisplayAllAddressTransactions;
