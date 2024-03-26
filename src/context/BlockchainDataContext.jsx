import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ethers } from 'ethers'; // Adjust import for ethers v5
import { JsonRpcProvider } from 'ethers/providers'; // Adjust import for ethers v5

export const BlockchainDataContext = createContext();

export const BlockchainDataProvider = ({ children }) => {
  const [latestBlocks, setLatestBlocks] = useState(null);

  useEffect(() => {
    const fetchBlocks = async () => {
      const provider = new JsonRpcProvider('https://eth-mainnet.g.alchemy.com/v2/qPM6j1ZfMd658HQjSInxD4duTMuEjtoT');
      const currentBlockNumber = await provider.getBlockNumber();
      const blocks = [];

      for (let i = 0; i < 5; i++) {
        const blockNumber = currentBlockNumber - i;
        console.log(`Fetching block number: ${blockNumber}`); // 1. Log current block number
        const block = await provider.getBlock(blockNumber, true);
        console.log(block);
        let totalFees = BigInt(0);
        let j = 0;
        for (const tx of block.prefetchedTransactions ) {
          if (j > 3) break;
          if (typeof tx.hash === 'string' && tx.hash) {
              console.log(`Processing transaction hash: ${tx.hash}`); // 2. Log each transaction hash
              const receipt = await provider.getTransactionReceipt(tx.hash);
  
              let txFee;
              if (tx.type === 2) { // For EIP-1559 transactions
                  const baseFeePerGas = BigInt(block.baseFeePerGas.toString());
                  const maxFeePerGas = BigInt(tx.maxFeePerGas.toString());
                  const maxPriorityFeePerGas = BigInt(tx.maxPriorityFeePerGas.toString());
                  const gasUsed = BigInt(receipt.gasUsed.toString());
  
                  console.log(`Transaction type: EIP-1559, baseFeePerGas: ${baseFeePerGas}, maxFeePerGas: ${maxFeePerGas}, maxPriorityFeePerGas: ${maxPriorityFeePerGas}, gasUsed: ${gasUsed}`); // 3. Log transaction details
  
                  const effectiveGasPrice = baseFeePerGas + maxPriorityFeePerGas > maxFeePerGas ? maxFeePerGas : baseFeePerGas + maxPriorityFeePerGas;
                  txFee = gasUsed * effectiveGasPrice;
              } else { // For legacy transactions
                  const gasPrice = BigInt(tx.gasPrice.toString());
                  console.log(`Transaction type: Legacy, gasPrice: ${gasPrice}, gasUsed: ${receipt.gasUsed}`); // 3. Log transaction details
                  txFee = BigInt(receipt.gasUsed.toString()) * gasPrice;
              }
  
              console.log(`Transaction fee: ${txFee}`); // 4. Log calculated txFee
              totalFees += txFee;
          }
          j++;
        }
    
        console.log(`Total fees for block ${blockNumber}: ${ethers.formatEther(totalFees)}`);
  
        const simplifiedBlock = {
          number: block.number,
          hash: block.hash,
          miner: block.miner,
          parentHash: block.parentHash,
          timestamp: block.timestamp,
          totalFees: ethers.formatEther(totalFees), // Convert the total fees to Ether and include it in the block data
          transactions: block.transactions.map(tx => ({
            hash: tx.hash,
            from: tx.from,
            to: tx.to,
            value: tx.value ? ethers.utils.formatEther(tx.value) : "0",
          })),
        };
  
        blocks.push(simplifiedBlock);
      }
      console.log(blocks);
      setLatestBlocks(blocks);
    };
  
    fetchBlocks().catch(console.error);
  }, []);

  return (
    <BlockchainDataContext.Provider value={{ latestBlocks }}>
      {children}
    </BlockchainDataContext.Provider>
  );
};

BlockchainDataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

