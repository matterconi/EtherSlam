// import { ethers } from 'ethers';
import { JsonRpcProvider } from 'ethers/providers';

// Configuration: Replace with your Alchemy API URL
const alchemyApiUrl = 'https://eth-mainnet.g.alchemy.com/v2/qPM6j1ZfMd658HQjSInxD4duTMuEjtoT';

// Initialize an Alchemy provider
export const provider = new JsonRpcProvider(alchemyApiUrl);