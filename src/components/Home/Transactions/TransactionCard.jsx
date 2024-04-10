import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

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
  const navigate = useNavigate(); // Use the useNavigate hook

  // Function to navigate to the transaction page
  const handleNavigate = (path) => {
    navigate(path); // Navigate to the given path
  };

  return (
    <div className={`flex flex-col justify-between items-center sm:flex-row max-sm:items-start bg-white border-b border-gray-200 ${index === 0 ? 'border-t' : ''} p-4 min-h-[92px]`}>
      <div className="flex items-center max-sm:justify-center gap-4 w-full">
        <div className='bg-blue-50 p-2 rounded-md'>
          {icon}
        </div>
        <div>
          <p className='text-md cursor-pointer' onClick={() => handleNavigate(`/tx/${hash}`)}>
            Transaction <span className='cursor-pointer text-blue-600'>{hash.slice(0, 6)}...{hash.slice(hash.length - 6)}</span>
          </p>
          <p className='text-xs text-gray-600'>{timeSince(timestamp)}</p>
        </div>
      </div>
  
      <div className='flex md:flex-row justify-between max-sm:justify-around items-center w-full space-x-2 max-sm:mt-4'>
        <div className="relative sm:left-[5px] md:left-[-20px] lg:left-[10px] lg:mx-4">
          <p className='text-sm whitespace-nowrap cursor-pointer' onClick={() => handleNavigate(`/address/${from}`)}>
            From: <span className='cursor-pointer text-blue-600'>{from.slice(0, 6)}...{from.slice(from.length - 6)}</span>
          </p>
          <p className='text-sm whitespace-nowrap cursor-pointer' onClick={() => handleNavigate(`/address/${to}`)}>
            To: <span className='cursor-pointer text-blue-600'>{to.slice(0, 6)}...{to.slice(to.length - 6)}</span>
          </p>
        </div>
  
        <div className="md:ml-4 border rounded px-3 py-1 min-w-[90px]">
          <p className='text-xs font-semibold'>Amount</p>
          <p className='text-sm'>{`${value}`.slice(0, 5)} ETH</p>
        </div>
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
