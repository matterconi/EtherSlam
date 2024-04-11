// utils/fetchBlock.js
import { ethers } from 'ethers';
import { JsonRpcProvider } from 'ethers/providers'; // Adjust import for ethers v5

const providerUrl = 'https://eth-mainnet.g.alchemy.com/v2/qPM6j1ZfMd658HQjSInxD4duTMuEjtoT';
const provider = new JsonRpcProvider(providerUrl);

export const fetchBlock = async (blockNumber) => {
  const block = await provider.getBlock(blockNumber, true);
  const gasUsed = BigInt(block.gasUsed.toString());
  const baseFeePerGas = block.baseFeePerGas ? BigInt(block.baseFeePerGas.toString()) : BigInt(0);
  const totalFees = gasUsed * baseFeePerGas;

  return {
    number: block.number,
    hash: block.hash,
    miner: block.miner,
    parentHash: block.parentHash,
    timestamp: block.timestamp,
    totalFees: ethers.formatEther(totalFees),
    baseFeePerGas: ethers.formatEther(block.baseFeePerGas),
    transactions: block.length,
    transactionsArray: block.prefetchedTransactions,
  };
};
