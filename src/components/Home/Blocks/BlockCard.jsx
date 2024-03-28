import PropTypes from 'prop-types';

function timeSince(timestamp) {
  const now = Date.now() / 1000; // current time in seconds
  const secondsPast = now - timestamp;

  if (secondsPast < 60) {
    return `${Math.floor(secondsPast)} seconds ago`;
  } else if (secondsPast < 3600) {
    return `${Math.floor(secondsPast / 60)} minutes ago`;
  } else if (secondsPast < 86400) {
    return `${Math.floor(secondsPast / 3600)} hours ago`;
  } else {
    return `${Math.floor(secondsPast / 86400)} days ago`;
  }
}

const BlockCard = ({ icon, blockNumber, transactions, totalFees, createdAgo, feeRecipient, index }) => {
  return (
    <div className={`flex flex-col sm:flex-row justify-between items-center bg-white mb-4 border-b border-gray-200 ${index === 0 ? 'border-t' : ''} p-4 min-h-[92px]`}>
      {/* Icon and Block Information */}
      <div className="flex items-center gap-4">
        <div className='bg-pink-50 p-2 rounded-md'>
          {icon}
        </div>
        <div>
          <p className='text-md '>Block #{blockNumber}</p>
          <p className='text-xs text-gray-600'>{timeSince(createdAgo)}</p>
        </div>
      </div>

      {/* Miner and Transaction Count */}
      <div className="mt-4 sm:mt-0 sm:ml-4">
        <p className='text-sm whitespace-nowrap'>Miner: {feeRecipient.slice(0, 6)}...{feeRecipient.slice(feeRecipient.length - 6)}</p>
        <p className='text-sm'>Transactions: {transactions}</p>
      </div>

      {/* Total Fees */}
      <div className="mt-4 md:mt-0 md:ml-4 border rounded px-3 py-1">
        <p className='text-xs font-semibold'>Fees</p>
        <p className='text-sm'>{`${totalFees}`.slice(0, 5)} Eth</p>
      </div>
    </div>
  );
};

BlockCard.propTypes = {
  icon: PropTypes.element.isRequired,
  blockNumber: PropTypes.number.isRequired,
  transactions: PropTypes.number.isRequired, // Adjusted to expect a number
  totalFees: PropTypes.string.isRequired,
  createdAgo: PropTypes.number.isRequired,
  feeRecipient: PropTypes.string.isRequired,
  index: PropTypes.number,
};

export default BlockCard;