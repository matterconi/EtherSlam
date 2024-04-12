/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const formatTimestamp = (timestamp) => {
  const currentTime = Date.now();
  const transactionTime = timestamp * 1000; // Assuming timestamp is in seconds and needs conversion to milliseconds
  const timeDifference = currentTime - transactionTime;
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

// Tooltip Component
const Tooltip = ({ info, children }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div className="relative flex items-center ">
      <div className="flex justify-center items-center w-4 h-4 text-xs border border-gray-400 mr-2 text-gray-400 rounded-full bg-gray-200" onMouseEnter={() => setIsHovered(true)}
         onMouseLeave={() => setIsHovered(false)}>?</div>
      {isHovered && (
        <div className="absolute left-6 w-48 p-2 bg-black text-white text-sm rounded-md z-10">
          {info}
        </div>
      )}
      <span className='min-w-[130px]'>{children}</span>
    </div>
  );
};

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  info: PropTypes.string.isRequired,
};
   
// Divider Component
const Divider = () => <div className="border-b border-gray-300 my-4 w-full" />;

// DisplayTransaction Component
const DisplayTransaction = ({ transaction, timestamp }) => {
  // Helper functions
  const hexToDecimal = (hex) => parseInt(hex, 16);
  const weiToEth = (wei) => wei / 1e18;
  const ethToUsd = (eth, rate = 2000) => `$${(eth * rate).toFixed(2)}`;

  // Calculated values
  const transactionValueEth = weiToEth(hexToDecimal(transaction.value));
  const transactionFeeEth = weiToEth(hexToDecimal(transaction.gas) * hexToDecimal(transaction.gasPrice));
  const gasPriceGwei = weiToEth(hexToDecimal(transaction.gasPrice) * 1e9).toFixed(9);

  return (
    <>
      <div className="flex flex-col bg-white mb-16 border border-gray-200 px-4 py-8 rounded-md shadow-xl">
      <h3 className="text-lg font-semibold mb-8">Transaction Details</h3>
      <div className="flex flex-col gap-4">
        <div className="flex justify-start items-center">
          <Tooltip info="The unique identifier for the transaction.">Hash:</Tooltip>
          <span className="break-all">{transaction.hash}</span>
        </div>
        <div className="flex justify-start items-center">
          <Tooltip info="The status of the transaction (Success, Pending, etc.).">Status:</Tooltip>
          <span>Success</span> {/* Assuming success for demonstration */}
        </div>
        <div className="flex justify-start items-center">
          <Tooltip info="The block number that includes this transaction.">Block:</Tooltip>
          <span><Link to={`/block/${hexToDecimal(transaction.blockNumber)}`} className="break-all text-blue-500 hover:text-blue-600">
          {hexToDecimal(transaction.blockNumber)}
          </Link></span>
        </div>
        <div className="flex justify-start items-center">
          <Tooltip info="The timestamp when the transaction was confirmed.">Timestamp:</Tooltip>
          <span>{formatTimestamp(timestamp)}</span>
        </div>
        <Divider />
        <div className="flex justify-start items-center">
          <Tooltip info="The address sending the transaction.">From:</Tooltip>
          <Link to={`/address/${transaction.from}`} className="break-all text-blue-500 hover:text-blue-600">
            {transaction.from}
          </Link>
        </div>
        <div className="flex justify-start items-center">
          <Tooltip info="The recipient address of the transaction.">To:</Tooltip>
          <Link to={`/address/${transaction.to}`} className="break-all text-blue-500 hover:text-blue-600">
            {transaction.to}
          </Link>
        </div>
        <Divider />
        <div className="flex justify-start items-center">
          <Tooltip info="The amount of Ether transferred in the transaction.">Value:</Tooltip>
          <span>{transactionValueEth.toFixed(18)} ETH ({ethToUsd(transactionValueEth)} USD)</span>
        </div>
        <div className="flex justify-start items-center">
          <Tooltip info="The fee paid for the transaction.">Transaction Fee:</Tooltip>
          <span>{transactionFeeEth.toFixed(18)} ETH ({ethToUsd(transactionFeeEth)} USD)</span>
        </div>
        <div className="flex justify-start items-center">
          <Tooltip info="The gas price set for the transaction, in Gwei.">Gas Price:</Tooltip>
          <span>{gasPriceGwei} Gwei</span>
        </div>
      </div>
    </div>
    <div className="flex flex-col bg-white mb-16 border border-gray-200 px-4 py-8 rounded-md shadow-xl">
      <h3 className="text-lg font-semibold mb-8">Understanding Ethereum Transactions</h3>
      <div className="text-gray-600">
        <p className="mb-4">Ethereum transactions are actions initiated by Ethereum accounts, transferring ETH or executing operations within smart contracts. Here's a brief overview of their components and how they work:</p>
        <ul className="list-disc pl-8 space-y-2">
          <li><strong>Nonce:</strong> A counter indicating the number of transactions sent from the sender's address. It helps to prevent transaction replay attacks.</li>
          <li><strong>Gas Limit:</strong> The maximum amount of gas the sender is willing to use for the transaction. It sets the limit for how complex the computation can be.</li>
          <li><strong>Gas Price:</strong> The amount of ETH the sender is willing to pay per unit of gas. Higher gas prices can lead to faster transaction confirmations.</li>
          <li><strong>To:</strong> The recipient address. For smart contract interactions, this is the contract's address.</li>
          <li><strong>Value:</strong> The amount of ETH transferred from the sender to the recipient.</li>
          <li><strong>Data:</strong> Optional data field that can include messages or function calls to smart contracts.</li>
          <li><strong>Signature:</strong> Cryptographic signature generated from the sender's private key. This verifies the transaction's authenticity.</li>
        </ul>
        <p className="mt-4">When a transaction is sent, it's verified and executed by the network's miners or validators. The execution might change the state of the Ethereum blockchain, depending on the transaction's purpose and data.</p>
      </div>
    </div>
    </>
  );
};

DisplayTransaction.propTypes = {
  transaction: PropTypes.object.isRequired,
  timestamp: PropTypes.number.isRequired,
};

export default DisplayTransaction;
