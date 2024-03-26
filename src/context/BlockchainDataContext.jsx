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
        console.log(`Fetching block number: ${blockNumber}`);
        const block = await provider.getBlock(blockNumber, true);
        console.log("bloks:", block);
        // Use the block's gasUsed and baseFeePerGas for total fees calculation
        const gasUsed = BigInt(block.gasUsed.toString());
        const baseFeePerGas = block.baseFeePerGas ? BigInt(block.baseFeePerGas.toString()) : BigInt(0);
        console.log(`Gas used for block ${blockNumber}: ${gasUsed}`);
        console.log(`Base fee per gas for block ${blockNumber}: ${baseFeePerGas}`);
        const totalFees = gasUsed * baseFeePerGas;

        console.log(`Total fees for block ${blockNumber}: ${ethers.formatEther(totalFees)}`);

        const simplifiedBlock = {
          number: block.number,
          hash: block.hash,
          miner: block.miner,
          parentHash: block.parentHash,
          timestamp: block.timestamp,
          totalFees: ethers.formatEther(totalFees), // Convert the total fees to Ether
          transactions: block.transactions.map(tx => ({
            hash: tx.hash,
            from: tx.from,
            to: tx.to,
            value: tx.value ? ethers.formatEther(tx.value) : "0",
          })),
        };

        blocks.push(simplifiedBlock);
      }
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
