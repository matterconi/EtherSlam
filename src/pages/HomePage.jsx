import Dashboard from '../components/Home/Dashboard';
import LatestBlocks from '../components/Home/Blocks/LatestBlocks'; 
import LatestTransactions from '../components/Home/Transactions/LatestTransactions';
import SearchBar from '../components/Home/SearchBar';
import BuiltWith from '../components/Home/BuiltWith'

const HomePage = () => {
  return (
    <>
      <SearchBar />
      <Dashboard />
      <div className="flex flex-col lg:flex-row gap-4 w-full ">
        <div className="flex flex-1 flex-col w-full lg:w-1/2">
          <LatestBlocks />
        </div>
        <div className="flex flex-1 flex-col w-full lg:w-1/2">
          <LatestTransactions />
        </div>
      </div>
      <BuiltWith />
    </>
  );
};

export default HomePage;