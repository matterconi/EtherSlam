import { useContext } from 'react';
import { BlockchainDataContext } from '../context/BlockchainDataContext';

export const useBlockchainData = () => useContext(BlockchainDataContext);