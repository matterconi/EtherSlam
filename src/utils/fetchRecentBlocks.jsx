import { ethers } from 'ethers';
import { JsonRpcProvider } from 'ethers/providers';

const providerUrl = 'https://eth-mainnet.alchemyapi.io/v2/qPM6j1ZfMd658HQjSInxD4duTMuEjtoT';
const provider = new JsonRpcProvider(providerUrl);

// Adjusted function to fetch blocks based on a specific starting block number
export const fetchRecentBlocks = async (blocksPerPage, startBlock = null) => {

  // Calculate the range of blocks to fetch
  let endBlockNumber = Math.max(startBlock - blocksPerPage + 1, 0); // Ensure we don't go below the genesis block

  const blockPromises = [];
  for (let blockNumber = startBlock; blockNumber >= endBlockNumber && blockNumber >= 0; blockNumber--) {
    // Collect all promises to resolve later
    blockPromises.push(provider.getBlock(blockNumber, true));
  }

  // Fetch the blocks in parallel
  const blocks = await Promise.all(blockPromises);

  // Sort the blocks by number to ensure they are ordered correctly
  const sortedBlocks = blocks.sort((a, b) => b.number - a.number);

  return sortedBlocks.map(block => ({
    number: block.number,
    hash: block.hash,
    miner: block.miner,
    parentHash: block.parentHash,
    timestamp: block.timestamp,
    baseFeePerGas: block.baseFeePerGas ? ethers.formatUnits(block.baseFeePerGas, 'gwei') : '0',
    transactions: block.prefetchedTransactions,
    transactionsLength: block.transactions.length,
    // Additional processing could be done here
  }));
};
