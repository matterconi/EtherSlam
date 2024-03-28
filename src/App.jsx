import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { BlockchainDataProvider } from './context/BlockchainDataContext'; // Adjust the path as needed
import Navbar from './components/shared/Navbar';
import Footer from './components/shared/Footer';
import HomePage from './pages/HomePage';
import TokensPage from './pages/TokensPage';
import NftsPage from './pages/NftsPage';
import TransactionPage from './pages/TransactionPage';


function App() {
  return (
    <BlockchainDataProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tokens" element={<TokensPage />} />
            <Route path="/nfts" element={<NftsPage />} />
            <Route path="/transaction/:transactionHash" element={<TransactionPage />} />
            {/* Add more routes as needed */}
          </Routes>
          <Footer />
        </div>
      </Router>
    </BlockchainDataProvider>
  );
}

export default App;