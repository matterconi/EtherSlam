import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { BlockchainDataProvider } from './context/BlockchainDataContext'; // Adjust the path as needed
import Navbar from './components/shared/Navbar';
import Footer from './components/shared/Footer';
import HomePage from './pages/HomePage';
import TokensPage from './pages/TokensPage';
import NftsPage from './pages/NftsPage';
import BlockPage from './pages/BlockPage';
import TransactionPage from './pages/TransactionPage';
import AddressPage from './pages/AddressPage';
import AllBlocksPage from './pages/AllBlocksPage'; // Import the AllBlocksPage component
import AllTransactionsPage from './pages/AllTransactionsPage'; // Import the AllTransactionsPage component
import AllAddressTransactionsPage from './pages/AllAddressTransactionsPage'; // Import the AllAddressTransactionsPage component

function App() {
  return (
    <BlockchainDataProvider>
      <Router>
        <div className="flex flex-col min-h-screen px-8 bg-gradient-to-r from-blue-800 to-blue-500">
          <div className="flex-grow">
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/tokens" element={<TokensPage />} />
              <Route path="/nfts" element={<NftsPage />} />
              <Route path="/block/:blockNumber" element={<BlockPage />} />
              <Route path="/tx/:transactionHash" element={<TransactionPage />} />
              <Route path="/address/:addressHash" element={<AddressPage />} />
              <Route path="/blocks" element={<AllBlocksPage />} />
              <Route path="/transactions" element={<AllTransactionsPage />} />
              <Route path="/address-transactions/:addressHash" element={<AllAddressTransactionsPage />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </BlockchainDataProvider>
  );
}

export default App;
