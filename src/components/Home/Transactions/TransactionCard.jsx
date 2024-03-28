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

const TransactionCard = ({ index, icon, hash, timestamp, from, to, value }) => {
  return (
    <div className={`flex flex-col sm:flex-row justify-between items-center bg-white mb-4 border-b border-gray-200 ${index === 0 ? 'border-t' : ''} p-4 min-h-[92px]`}>
      {/* First Column: Transaction Hash and Timestamp */}
      <div className="flex items-center gap-4">
        <div className='bg-blue-50 p-2 rounded-md'>
          {icon}
        </div>
        <div>
          <p className="text-md">{hash.slice(0, 6)}...{hash.slice(hash.length - 6)}</p>
          <p className='text-xs text-gray-600'>{timeSince(timestamp)}</p>
        </div>
      </div>
      
      {/* Second Column: From and To Addresses */}
      <div className="mt-4 md:mt-0 md:ml-4">
        <p className='text-sm whitespace-nowrap'>From: {from.slice(0, 6)}...{from.slice(from.length - 6)}</p>
        <p className='text-sm whitespace-nowrap'>To: {to.slice(0, 6)}...{to.slice(to.length - 6)}</p>
      </div>
      
      {/* Third Column: Amount Transacted */}
      <div className="mt-4 md:mt-0 md:ml-4 border rounded px-3 py-1">
        <p className='text-xs font-semibold'>Amount</p>
        <p className='text-sm'>{value.slice(0, 5)} Eth </p>
      </div>
    </div>
  );
};


TransactionCard.propTypes = {
  index: PropTypes.number,
  icon: PropTypes.element.isRequired,
  hash: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default TransactionCard;
