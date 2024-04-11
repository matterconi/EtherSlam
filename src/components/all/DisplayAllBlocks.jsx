import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const formatHash = (hash) => hash.substring(0, 10) + '...'; // Shortens the hash for display

const formatTimestamp = (timestamp) => {
  const currentTime = Date.now();
  const blockTime = timestamp * 1000; // Convert timestamp to milliseconds
  const timeDifference = currentTime - blockTime;
  const secondsDifference = Math.floor(timeDifference / 1000);

  if (secondsDifference < 60) {
    return `${secondsDifference} seconds ago`;
  } else if (secondsDifference < 3600) {
    const minutes = Math.floor(secondsDifference / 60);
    return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  } else if (secondsDifference < 86400) {
    const hours = Math.floor(secondsDifference / 3600);
    return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  } else {
    const days = Math.floor(secondsDifference / 86400);
    return `${days} day${days !== 1 ? 's' : ''} ago`;
  }
};

const DisplayAllBlocks = ({ blocks, handlePreviousPage, handleNextPage, page }) => {
  return (
    <>
      <div className="p-4 bg-white shadow-lg rounded-lg mb-8">
        <h2 className="text-xl mb-4">Recent Blocks</h2>
        
        {/* Blocks Section */}
        <div className="max-sm:hidden mt-4">
          {/* Grid Headers */}
          <div className="grid grid-cols-5 text-sm font-semibold text-gray-700">
            <div className="px-4 py-2">Number</div>
            <div className="px-4 py-2">Hash</div>
            <div className="px-4 py-2">Miner</div>
            <div className="px-4 py-2">Timestamp</div>
            <div className="px-4 py-2">Transactions</div>
          </div>
          {/* Grid Rows */}
          {blocks.map((block, index) => (
            <div key={index} className={`grid grid-cols-5 text-sm items-center ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border-b`}>
              <div className="px-4 py-2">{block.number}</div>
              <div className="px-4 py-2">
                <Link to={`/block/${block.number}`} className="text-blue-500">{formatHash(block.hash)}</Link>
              </div>
              <div className="px-4 py-2">
                <Link to={`/address/${block.miner}`} className="text-blue-500">{formatHash(block.miner)}</Link>
              </div>
              <div className="px-4 py-2">
                {new Date(block.timestamp * 1000).toLocaleString()} ({formatTimestamp(block.timestamp)})
              </div>
              <div className="px-4 py-2">{block.transactionsLength}</div>
            </div>
          ))}
          <div className='flex justify-center space-x-8 p-4'>
            <button className="my-2 px-4 py-2 border border-gray-400 text-gray-800 font-semibold rounded hover:border-gray-500 hover:text-gray-900 transition-colors" onClick={handlePreviousPage} >Previous</button>
            <button className="my-2 px-4 py-2 border border-gray-400 text-gray-800 font-semibold rounded hover:border-gray-500 hover:text-gray-900 transition-colors" onClick={handleNextPage} disabled={page === 0}>Next</button>
          </div>
        </div>

        {/* Responsive Design for smaller screens */}
        <div className="sm:hidden">
          {blocks.map((block, index) => (
            <div key={index} className="border border-gray-200 rounded-lg mb-4 shadow-sm">
              <div className="p-4 flex flex-col items-center justify-center space-y-2">
                <p className="text-sm font-semibold text-center">
                  Number: <Link to={`/block/${block.number}`} className="text-blue-500 break-all">{block.number}</Link>
                </p>
                <p className="text-sm">
                  Hash: <Link to={`/block/${block.number}`} className="text-blue-500 break-all">{formatHash(block.hash)}</Link>
                </p>
                <p className="text-sm">
                  Miner: <Link to={`/address/${block.miner}`} className="text-blue-500 break-all">{formatHash(block.miner)}</Link>
                </p>
                <p className="text-sm">Timestamp: {new Date(block.timestamp * 1000).toLocaleString()} ({formatTimestamp(block.timestamp)})</p>
                <p className="text-sm">Transactions: {block.transactionsLength}</p>
              </div>
            </div>
          ))}
          <div className='flex justify-center space-x-8 p-4'>
            <button className="my-2 px-4 py-2 border border-gray-400 text-gray-800 font-semibold rounded hover:border-gray-500 hover:text-gray-900 transition-colors" onClick={handlePreviousPage}>Previous</button>
            <button className="my-2 px-4 py-2 border border-gray-400 text-gray-800 font-semibold rounded hover:border-gray-500 hover:text-gray-900 transition-colors" onClick={handleNextPage}>Next</button>
          </div>
        </div>
      </div>
    </>
  );
};

DisplayAllBlocks.propTypes = {
  blocks: PropTypes.array.isRequired,
};

export default DisplayAllBlocks;