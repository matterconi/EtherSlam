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


function App() {
  return (
    <BlockchainDataProvider>
      <Router>
        <div className="px-8 bg-gradient-to-r from-blue-800 to-blue-500 min-h-screen">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tokens" element={<TokensPage />} />
            <Route path="/nfts" element={<NftsPage />} />
            <Route path='/block/:blockNumber' element={<BlockPage />} />
            <Route path="/tx/:transactionHash" element={<TransactionPage />} />
            <Route path="/address/:addressHash" element={<AddressPage />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </BlockchainDataProvider>
  );
}

export default App;
