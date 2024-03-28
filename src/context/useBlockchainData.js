import { useContext } from 'react';
import { BlockchainDataContext } from './BlockchainDataContext';

export const useBlockchainData = () => useContext(BlockchainDataContext);