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
    <div className={`flex flex-col sm:flex-row justify-between items-center bg-white mb-2 border-b border-gray-200 ${index === 0 ? 'border-t' : ''}`}>
      <div className="w-full flex flex-col sm:flex-row justify-between p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className='bg-pink-50 p-2 rounded-md'>
            {icon}
          </div>
          <div className="min-w-[100px]">
            <p>{blockNumber}</p>
            <p className='text-xs'>{timeSince(createdAgo)}</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mt-4 sm:mt-0">
          <div className="min-w-[150px]">
            <p className='text-sm'>Miner: {feeRecipient}</p>
            <p className='text-sm'>Transactions: {transactions}</p>
          </div>
          <div className="border rounded flex flex-col justify-center items-center p-2 min-w-[120px]">
            <p className='text-xs font-semibold'>Total Fees</p>
            <p className='text-sm'>{`${totalFees}`.slice(0, 5)} Eth</p>
          </div>
        </div>
      </div>
    </div>
  );
};

BlockCard.propTypes = {
  icon: PropTypes.element.isRequired,
  blockNumber: PropTypes.number.isRequired,
  transactions: PropTypes.array.isRequired,
  totalFees: PropTypes.string.isRequired,
  createdAgo: PropTypes.number.isRequired,
  feeRecipient: PropTypes.string.isRequired,
  index: PropTypes.number
};

export default BlockCard;