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

const TransactionCard = ({ hash, timestamp, from, to, amount, icon }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center bg-white mb-2 border-b border-gray-200">
      <div className="w-full flex flex-col md:flex-row justify-between p-4">
        {/* First Column: Transaction Hash and Timestamp */}
        <div className="flex flex-col gap-2 mb-4 md:mb-0">
          <div className="flex items-center gap-2">
            <div className='bg-blue-50 p-2 rounded-md'>
              {icon}
            </div>
            <p className="text-xs md:text-sm">{hash.slice(0, 10)}...</p>
          </div>
          <p className="text-xs">{timeSince(timestamp)}</p>
        </div>
        
        {/* Second Column: From and To Addresses */}
        <div className="flex flex-col gap-2 mb-4 md:mb-0">
          <p className="text-xs md:text-sm">From: {from.slice(0, 10)}...</p>
          <p className="text-xs md:text-sm">To: {to.slice(0, 10)}...</p>
        </div>
        
        {/* Third Column: Amount Transacted */}
        <div className="flex flex-col items-center">
          <p className="text-xs font-semibold">Amount</p>
          <p className="text-sm">{amount} ETH</p>
        </div>
      </div>
    </div>
  );
};

TransactionCard.propTypes = {
  icon: PropTypes.element.isRequired,
  hash: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
};

export default TransactionCard;
