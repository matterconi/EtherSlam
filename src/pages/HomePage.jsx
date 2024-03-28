import Dashboard from '../components/Home/Dashboard';
import LatestBlocks from '../components/Home/Blocks/LatestBlocks'; 
import LatestTransactions from '../components/Home/Transactions/LatestTransactions';
import SearchBar from '../components/Home/SearchBar';

const HomePage = () => {
  return (
    <>
      <SearchBar />
      <Dashboard />
      <LatestBlocks />
      <LatestTransactions />
      {/* Add any other components that should appear on the homepage */}
    </>
  );
};

export default HomePage;