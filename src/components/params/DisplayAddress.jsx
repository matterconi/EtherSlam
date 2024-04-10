import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const DisplayAddress = ({ addressData, addressHash }) => {
  const { addressType = 'address', ethBalance, transactions } = addressData;
  const navigate = useNavigate();
  const formatHash = (hash) => `${hash.slice(0, 4)}...${hash.slice(-4)}`;

  return (
    <>
      <div className="p-4 bg-white shadow-lg rounded-lg mb-8">
        <h2 className="text-xl mb-4">Address {addressHash}</h2>
        <p>Type: {addressType}</p>
        <p>ETH Balance: {ethBalance ? `${ethBalance} ETH` : "Loading..."}</p>
        
        {/* Transactions Section */}
        <h3 className="mt-4 mb-2 text-lg ">Transactions in the last 100000 blocks</h3>
        {transactions && transactions.length > 0 ? (
          <>
          <div className="max-sm:hidden mt-4">
            {/* Grid Headers */}
            <div className="grid grid-cols-6 text-sm font-semibold text-gray-700">
              <div className="px-4 py-2">Hash</div>
              <div className="px-4 py-2">Block</div>
              <div className="px-4 py-2">From</div>
              <div className="px-4 py-2">To</div>
              <div className="px-4 py-2">Value</div>
              <div className="px-4 py-2">Fee</div>
            </div>
            {/* Grid Rows */}
            {transactions.map((txn, index) => (
              <div key={index} className={`grid grid-cols-6 text-sm items-center ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border-b`}>
                <div className="px-4 py-2">
                  <Link to={`/tx/${txn.hash}`} className="text-blue-500">{formatHash(txn.hash)}</Link>
                </div>
                <div className="px-4 py-2">{txn.blockNumber}</div>
                <div className="px-4 py-2">
                  {txn.from !== addressHash ? (
                    <Link to={`/address/${txn.from}`} className="text-blue-500">{formatHash(txn.from)}</Link>
                  ) : (
                    <span>{formatHash(txn.from)}</span>
                  )}
                </div>
                <div className="px-4 py-2">
                  {txn.to !== addressHash ? (
                    <Link to={`/address/${txn.to}`} className="text-blue-500">{formatHash(txn.to)}</Link>
                  ) : (
                    <span>{formatHash(txn.to)}</span>
                  )}
                </div>
                <div className="px-4 py-2">{(parseFloat(txn.value) / 1e18).toFixed(5)} ETH</div>
                <div className="px-4 py-2">{((txn.gasUsed * txn.gasPrice) / 1e18).toFixed(5)} ETH</div>
              </div>
            ))}
          </div>
          <div className="sm:hidden">
            {transactions.map((txn, index) => (
              <div key={index} className="border border-gray-200 rounded-lg mb-4 shadow-sm">
                <div className="p-4 flex flex-col items-center justify-center space-y-2">
                  <p className="text-sm font-semibold text-center">
                    Hash: <Link to={`/tx/${txn.hash}`} className="text-blue-500 break-all">{formatHash(txn.hash)}</Link>
                  </p>
                  <p className="text-sm">Block: {txn.blockNumber}</p>
                  <div className="flex items-center space-x-2 ">
                    <p className="text-sm text-center">
                      From:
                      {txn.from !== addressHash ? (
                        <Link to={`/address/${txn.from}`} className="text-blue-500 ml-1">{formatHash(txn.from)}</Link>
                      ) : (
                        <span className="ml-1">{formatHash(txn.from)}</span>
                      )}
                    </p>
                    <p className="text-sm text-center">
                      To:
                      {txn.to !== addressHash ? (
                        <Link to={`/address/${txn.to}`} className="text-blue-500 ml-1">{formatHash(txn.to)}</Link>
                      ) : (
                        <span className="ml-1">{formatHash(txn.to)}</span>
                      )}
                    </p>
                  </div>
                  <p className="text-sm">Value: {(parseFloat(txn.value) / 1e18).toFixed(5)} ETH</p>
                  <p className="text-sm">Fee: {((txn.gasUsed * txn.gasPrice) / 1e18).toFixed(5)} ETH</p>
                </div>
              </div>
            ))}
          </div>

        </>
          
        ) : <p>No transactions available.</p>}
        <div className="w-full flex justify-center mt-4">
        <button 
          className="my-2 px-4 py-2 border border-gray-400 text-gray-800 font-semibold rounded hover:border-gray-500 hover:text-gray-900 transition-colors"
          onClick={() => navigate(`/address-transactions/${addressHash}`)} // Use navigate for navigation
        >
          View All {addressType} Transactions
        </button>
      </div>
      </div>
      
      {/* About Ethereum Addresses Section */}
      <div className="p-4 bg-white shadow-lg rounded-lg">
        <h3 className="text-lg font-semibold mb-2">About Ethereum Addresses</h3>
        <p>Ethereum addresses are unique identifiers that enable users to send and receive digital assets and data on the Ethereum blockchain. Comprising 42 characters, starting with '0x', these addresses are derived from the public portion of a key pair generated by Ethereum users.</p>
        <p>Addresses are not only the cornerstone for transactions but also serve as a hub for a user's assets and interactions within the Ethereum ecosystem, including smart contracts and decentralized applications (dApps). They ensure the security and integrity of transactions through cryptographic methods, allowing for trustless exchanges on the network.</p>
        <p>Understanding Ethereum addresses is crucial for navigating the Ethereum network, as they play a vital role in the execution of decentralized finance (DeFi) operations, token exchanges, and more. This guide aims to demystify Ethereum addresses and their importance in the broader context of blockchain technology.</p>
        {/* Remaining content */}
      </div>


    </>
  );
};

DisplayAddress.propTypes = {
  addressData: PropTypes.shape({
    addressType: PropTypes.string,
    ethBalance: PropTypes.string,
    transactions: PropTypes.arrayOf(PropTypes.shape({
      hash: PropTypes.string.isRequired,
      blockNumber: PropTypes.number.isRequired,
      from: PropTypes.string.isRequired,
      to: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      gasUsed: PropTypes.number.isRequired,
      gasPrice: PropTypes.number.isRequired,
    })),
  }),
  addressHash: PropTypes.string.isRequired,
};

export default DisplayAddress;
