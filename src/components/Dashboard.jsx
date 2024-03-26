import { FaEthereum } from "react-icons/fa";
import { MdOutlineAttachMoney } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
import { FaCheck } from "react-icons/fa";

import PropTypes from 'prop-types';

const DashboardCard = ({ title, value, icon, className }) => (
  // Outer div with the right border
  <div className={`bg-white p-4 flex flex-col ${className}`}> 
    <div className={`flex-grow pb-4`}> 
      <div className="flex justify-start items-center w-full">
        {icon}
        <div className="flex flex-col ml-4">
          <h3 className="font-semibold text-gray-700 uppercase">{title}</h3>
          <p className="text-lg">{value}</p>
        </div>
      </div>
    </div>
  </div>

);

DashboardCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  icon: PropTypes.element,
  className: PropTypes.string,
};

const Dashboard = () => {
  return (
    <div className="bg-white rounded-xl p-4 mx-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  mb-16">
      {/* Apply a conditional class to add the right border except for the last item in each row */}
      <DashboardCard title="Ether Price" value="$1,234.56" icon={<FaEthereum size="24" className="flex-shrink-0"/>} className="sm:border-r max-lg:border-b"/>
      <DashboardCard title="Market Cap" value="433B"icon={<MdOutlineAttachMoney size="30" className="flex-shrink-0"/>} className="lg:border-r max-lg:border-b" />
      <DashboardCard title="Transactions" value="456,789" icon={<GrTransaction size="24" className="flex-shrink-0"/>} className="sm:border-r max-sm:border-b" />
      {/* The last card in a row at the largest breakpoint does not need a right border, hence no additional className */}
      <DashboardCard title="Finalized Blocks" value="10,234" icon={<FaCheck size="24" className="flex-shrink-0"/>} />
    </div>
  );
};

export default Dashboard;
