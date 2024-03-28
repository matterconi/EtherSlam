import PropTypes from 'prop-types';
const DisplayTransaction = ({ transaction }) => {
    // Helper function to convert hex to decimal
    const hexToDecimal = (hex) => parseInt(hex, 16);
  
    // Helper function to convert Wei to ETH
    const weiToEth = (wei) => wei / 1e18;
  
    // Calculate transaction fee (gasUsed * gasPrice)
    const transactionFeeWei = hexToDecimal(transaction.gas) * hexToDecimal(transaction.gasPrice);
    const transactionFeeEth = weiToEth(transactionFeeWei).toFixed(18);
  
    // Transaction value in ETH
    const transactionValueEth = weiToEth(hexToDecimal(transaction.value)).toFixed(18);
  
    // Gas price in Gwei
    const gasPriceGwei = weiToEth(hexToDecimal(transaction.gasPrice) * 1e9).toFixed(9);
  
    return (
      <div className="transaction-details">
        <h3>Transaction Details</h3>
        <p><strong>Transaction Hash:</strong> {transaction.hash}</p>
        <p><strong>Status:</strong> Success</p> {/* Assuming success for demonstration */}
        <p><strong>Block:</strong> {hexToDecimal(transaction.blockNumber)}</p>
        <p><strong>From:</strong> {transaction.from}</p>
        <p><strong>To:</strong> {transaction.to}</p>
        <p><strong>Value:</strong> {transactionValueEth} ETH</p>
        <p><strong>Transaction Fee:</strong> {transactionFeeEth} ETH</p>
        <p><strong>Gas Price:</strong> {gasPriceGwei} Gwei</p>
        {/* Add more details as needed */}
      </div>
    );
  };

  DisplayTransaction.propTypes = {
    transaction: PropTypes.object.isRequired,
  };
  export default DisplayTransaction;