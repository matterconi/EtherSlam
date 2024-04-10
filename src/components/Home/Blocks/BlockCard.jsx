import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function timeSince(timestamp) {
  const now = Date.now() / 1000;
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
  const navigate = useNavigate();

  // Function to navigate to block details
  const navigateToBlock = () => {
    navigate(`/block/${blockNumber}`);
  };

  // Function to navigate to miner details
  const navigateToMiner = () => {
    navigate(`/address/${feeRecipient}`);
  };

  return (
    <div className={`flex flex-col justify-between items-center sm:flex-row max-sm:items-start bg-white border-b border-gray-200 ${index === 0 ? 'border-t' : ''} p-4 min-h-[92px]`}>
      <div className="flex items-center max-sm:justify-center gap-4 w-full">
        <div className='bg-pink-50 p-2 rounded-md'>
          {icon}
        </div>
        <div>
          <p className='text-md cursor-pointer' onClick={navigateToBlock}>
            Block <span className='cursor-pointer text-blue-600'>{blockNumber}</span>
          </p>
          <p className='text-xs text-gray-600'>{timeSince(createdAgo)}</p>
        </div>
      </div>
  
      <div className='flex md:flex-row justify-between max-sm:justify-around items-center w-full space-x-2 max-sm:mt-4'>
        <div className="relative sm:left-[5px] md:left-[-20px] lg:left-[10px] lg:mx-4">
          <p className='text-sm whitespace-nowrap cursor-pointer' onClick={navigateToMiner}>
            Miner: <span className='cursor-pointer text-blue-600'>{feeRecipient.slice(0, 6)}...{feeRecipient.slice(feeRecipient.length - 6)}</span>
          </p>
          <p className='text-sm'>Transactions: {transactions}</p>
        </div>
  
        <div className="md:ml-4 border rounded px-3 py-1 min-w-[90px]">
          <p className='text-xs font-semibold'>Fees</p>
          <p className='text-sm'>{`${totalFees}`.slice(0, 5)} Eth</p>
        </div>
      </div>
    </div>
  );
};

BlockCard.propTypes = {
  icon: PropTypes.element.isRequired,
  blockNumber: PropTypes.number.isRequired,
  transactions: PropTypes.number.isRequired,
  totalFees: PropTypes.string.isRequired,
  createdAgo: PropTypes.number.isRequired,
  feeRecipient: PropTypes.string.isRequired,
  index: PropTypes.number,
};

export default BlockCard;
