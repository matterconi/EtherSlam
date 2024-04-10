import { useState, useEffect } from 'react';
import { FaEthereum } from "react-icons/fa";
import { MdOutlineAttachMoney } from "react-icons/md";
import { FaExchangeAlt,  FaRegChartBar  } from "react-icons/fa";
import PropTypes from 'prop-types';

const DashboardCard = ({ title, value, icon, className, conditionalValueColor, sign }) => (
  <div className={`bg-white p-6 flex flex-col ${className} max-sm:justify-center items-center`}>
    <div className="flex-grow ">
      <div className="flex justify-start items-center w-full">
        {icon}
        <div className="flex flex-col ml-4">
          <h3 className="font-semibold text-gray-700 uppercase">{title}</h3>
          <p className={`text-lg ${conditionalValueColor}`}>{sign} {value} %</p>
        </div>
      </div>
    </div>
  </div>
);

DashboardCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  icon: PropTypes.element,
  className: PropTypes.string,
  conditionalValueColor: PropTypes.string,
  sign: PropTypes.string,
};

const Dashboard = () => {
  const [ethData, setEthData] = useState({
    etherPrice: 'Loading...',
    marketCap: 'Loading...',
    transactions: 'Loading...',
    finalizedBlocks: 'Loading...',
  });

  const apiKey = "CG-KTHBcz6hCUuQj4KiS6uWaB3W";

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true&x_cg_demo_api_key=${apiKey}`;
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();
        setEthData({
          etherPrice: `$${data.ethereum.usd.toLocaleString()}`,
          marketCap: `${(data.ethereum.usd_market_cap / 1e9).toFixed(2)}B`,
          change24h: `${(data.ethereum.usd_24h_change).toFixed(2)}`, // Placeholder
          volume24h: `${(data.ethereum.usd_24h_vol / 1e9).toFixed(2)}B`, // Placeholder
        });
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);
  console.log(ethData)
  return (
    <div className="bg-white rounded-xl p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-16">
      <DashboardCard title="Ether Price" value={ethData.etherPrice} icon={<FaEthereum size="24" className="flex-shrink-0"/>} className="sm:border-r max-lg:border-b"/>
      <DashboardCard title="Market Cap" value={ethData.marketCap} icon={<MdOutlineAttachMoney size="30" className="flex-shrink-0"/>} className="lg:border-r max-lg:border-b" />
      <DashboardCard title="24h Change" value={ethData.change24h} icon={<FaExchangeAlt size="24" className="flex-shrink-0"/>} className="sm:border-r max-sm:border-b" conditionalValueColor={Number(ethData.change24h) > 0 ? "text-green-500" : "text-red-500"} sign={Number(ethData.change24h) > 0 ? "+" : ""}/>
      <DashboardCard title="24H Volume" value={ethData.volume24h} icon={<FaRegChartBar size="24" className="flex-shrink-0"/>} />
    </div>
  );
};

export default Dashboard;