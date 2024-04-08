import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const DisplayAddress = ({ addressData }) => {
  // Destructuring for easier access
  const { addressType = 'address', ethBalance, transactions } = addressData;
  return (
    <>
      <div className="p-4 bg-white shadow-lg rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Address Overview</h2>
        <p><strong>Type:</strong> {addressType}</p>
        <p><strong>ETH Balance:</strong> {ethBalance ? `${ethBalance} ETH` : "Loading..."}</p>
        
        {/* Transactions Section */}
        <h3 className="mt-4 mb-2 text-lg font-semibold">Transactions in the last 100000 blocks</h3>
        {transactions && transactions.length > 0 ? (
          <div className="space-y-2">
            {transactions.map((txn, index) => (
              <div key={index} className="border p-2 rounded">
                <p>Transaction Hash: <Link to={`/tx/${txn.hash}`} className="text-blue-500">{txn.hash}</Link></p>
                <p>Block: {txn.blockNumber}</p>
                <p>From: {txn.from} → To: {txn.to}</p>
                <p>Value: {(parseFloat(txn.value) / 1e18).toFixed(18)} ETH</p>
                <p>Txn Fee: {txn.gasUsed * txn.gasPrice / 1e18} ETH</p>
              </div>
            ))}
          </div>
        ) : <p>No transactions available.</p>}
      </div>
      
      {/* About Ethereum Addresses Section */}
      <div className="p-4 bg-white shadow-lg rounded-lg">
        <h3 className="text-lg font-semibold mb-2">About Ethereum Addresses</h3>
        <p className="mb-2">Ethereum addresses are part of the Ethereum blockchain. They are used to send and receive ETH and tokens, interact with smart contracts, and more.</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Addresses represent an account on the Ethereum network.</li>
          <li>They can send transactions and hold a balance of ETH and tokens.</li>
          <li>Addresses are generated from public-private key pairs.</li>
          <li>Smart contracts also have addresses and can execute code when interacted with.</li>
        </ul>
      </div>
    </>
  );
};

DisplayAddress.propTypes = {
  addressData: PropTypes.shape({
    addressType: PropTypes.number,
    ethBalance: PropTypes.number,
    transactions: PropTypes.array,
    tokens: PropTypes.array,
    nfts: PropTypes.array,
  }),
};

export default DisplayAddress;
