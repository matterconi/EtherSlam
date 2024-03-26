import { BlockchainDataProvider } from './context/BlockchainDataContext';
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import LatestBlocks from "./components/LatestBlocks";
import LatestTransactions from "./components/LatestTransactions";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";

function App() {
  return (
    <BlockchainDataProvider>
      <div  className="bg-custom-gradient min-h-screen">
        <Navbar />
        <SearchBar />
        <Dashboard />
        <div className='mx-16 flex justify-between gap-4 max-lg:flex-col'>
          <LatestBlocks />
          <LatestTransactions />
        </div>
        <Footer />
      </div>
    </BlockchainDataProvider>
  );
}

export default App;