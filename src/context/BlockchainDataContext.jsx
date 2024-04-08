import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ethers } from 'ethers'; // Adjust import for ethers v5
import { JsonRpcProvider } from 'ethers/providers'; // Adjust import for ethers v5

export const BlockchainDataContext = createContext();

export const BlockchainDataProvider = ({ children }) => {
  const [latestBlock, setLatestBlock] = useState(null); // Change to [latestBlocks, setLatestBlocks
  const [latestBlocks, setLatestBlocks] = useState(null);

  useEffect(() => {
    const fetchBlocks = async () => {
      const provider = new JsonRpcProvider('https://eth-mainnet.g.alchemy.com/v2/qPM6j1ZfMd658HQjSInxD4duTMuEjtoT');
      const currentBlockNumber = await provider.getBlockNumber();
      const block = await provider.getBlock(currentBlockNumber, true);
      setLatestBlock(block);
      const blocks = [];
      for (let i = 0; i < 5; i++) {
        const blockNumber = currentBlockNumber - i;
        const block = await provider.getBlock(blockNumber, true);
        // Use the block's gasUsed and baseFeePerGas for total fees calculation
        const gasUsed = BigInt(block.gasUsed.toString());
        const baseFeePerGas = block.baseFeePerGas ? BigInt(block.baseFeePerGas.toString()) : BigInt(0);
        const totalFees = gasUsed * baseFeePerGas;

        const simplifiedBlock = {
          number: block.number,
          hash: block.hash,
          miner: block.miner,
          parentHash: block.parentHash,
          timestamp: block.timestamp,
          totalFees: ethers.formatEther(totalFees), // Convert the total fees to Ether
          transactions: block.prefetchedTransactions
        };

        blocks.push(simplifiedBlock);
      }
      setLatestBlocks(blocks);
    };

    fetchBlocks().catch(console.error);
  }, []);

  return (
    <BlockchainDataContext.Provider value={{ latestBlock, latestBlocks }}>
      {children}
    </BlockchainDataContext.Provider>
  );
};

BlockchainDataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
