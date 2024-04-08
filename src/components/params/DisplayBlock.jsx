import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useBlockchainData } from '../../context/useBlockchainData'; 

const Tooltip = ({ info, children }) => {
  const [isHovered, setIsHovered] = useState(false);
  

  return (
    <div className="relative flex items-center"
         onMouseEnter={() => setIsHovered(true)}
         onMouseLeave={() => setIsHovered(false)}>
      <div className="flex justify-center items-center w-4 h-4 text-xs border border-gray-400 mr-2 text-gray-400 rounded-full bg-gray-200">?</div>
      {isHovered && (
        <div className="absolute -left-20 mt-8 w-48 p-2 bg-black text-white text-sm rounded-md z-10">
          {info}
        </div>
      )}
      <span className='min-w-[130px]'>{children}</span>
    </div>
  );
};

const DisplayBlock = ({ block }) => {
  // Converting total fees from Ether string to a readable format
  const totalFeesEth = parseFloat(block.totalFees).toFixed(18);
  const { latestBlock } = useBlockchainData();
  console.log(latestBlock)
  const navigate = useNavigate();
  const handeLeftClick = () => {
    if (block.number === 0) return;
    navigate(`/block/${block.number - 1}`)
  }
  const handeRightClick = () => {
    if (block.number === latestBlock.number) return;
    navigate(`/block/${block.number + 1}`)
  }
  return (
    <>
      <div className="flex flex-col bg-white mb-16 border border-gray-200 px-4 py-8 rounded-md shadow-xl">
        <h3 className="text-lg font-semibold mb-8">Block Overview</h3>
        <div className="flex flex-col gap-4">
          {/* Block details */}
          <div className="flex justify-start items-center">
            <Tooltip info="The unique identifier of the block.">Block Hash:</Tooltip>
            <span className="ml-2">{block.hash}</span>
          </div>
          <div className="flex justify-start items-center">
            <Tooltip info="The height of the block in the blockchain.">Block Height:</Tooltip>
            <span className="ml-2">{block.number}</span> <FiChevronLeft className="mx-2" onClick={handeLeftClick}/> <FiChevronRight className="mx-2" onClick={handeRightClick}/>
          </div>
          <div className="flex justify-start items-center">
            <Tooltip info="The number of transactions inside the block.">Transactions:</Tooltip>
            <span className="ml-2">{block.transactions}</span>
          </div>
          <div className="flex justify-start items-center">
            <Tooltip info="The Unix timestamp for when the block was mined.">Timestamp:</Tooltip>
            <span className="ml-2">{new Date(block.timestamp * 1000).toLocaleString()}</span>
          </div>
          <div className="flex justify-start items-center">
            <Tooltip info="The address of the miner who mined the block.">Miner:</Tooltip>
            <Link to={`/address/${block.miner}`} className="text-blue-500 ml-2">{block.miner}</Link>
          </div>
          <div className="flex justify-start items-center">
            <Tooltip info="The total fees collected in this block.">Total Fees:</Tooltip>
            <span className="ml-2">{totalFeesEth} ETH</span>
          </div>
          <div className="flex justify-start items-center">
            <Tooltip info="The total fees collected in this block.">Base Fee Per Gas:</Tooltip>
            <span className="ml-2">{block.baseFeePerGas} ETH</span>
          </div>
          <div className="flex justify-start items-center">
            <Tooltip info="The hash of the block's parent.">Parent Hash:</Tooltip>
            <span className="ml-2">{block.parentHash}</span>
          </div>
        </div>
      </div>
      
      {/* Educational Section */}
      <div className="flex flex-col bg-white mb-16 border border-gray-200 px-4 py-8 rounded-md shadow-xl">
        <h3 className="text-lg font-semibold mb-8">Understanding Ethereum Blocks</h3>
        <div className="text-gray-600">
          <p className="mb-4">
            Ethereum blocks are core to the blockchain, acting as secure containers for transactions and forming an immutable chain through cryptographic links to their predecessors. Here’s a brief overview of their key components:
          </p>
          <ul className="list-disc pl-8 space-y-2">
            <li>
              <strong>Block Number:</strong> Identifies each block’s position in the blockchain, starting from the genesis block.
            </li>
            <li>
              <strong>Timestamp:</strong> The Unix time when the block was mined, ensuring a verifiable sequence of transactions.
            </li>
            <li>
              <strong>Transactions:</strong> A list of all validated transactions included in the block, showcasing sender, receiver, and amount transferred.
            </li>
            <li>
              <strong>Miner:</strong> The address of the miner who added the block to the blockchain, earning rewards for their computational work.
            </li>
            <li>
              <strong>Total Fees:</strong> Sum of transaction fees in the block, incentivizing miners.
            </li>
            <li>
              <strong>Parent Hash:</strong> A cryptographic link to the previous block, securing the blockchain’s continuity and integrity.
            </li>
          </ul>
          <p className="mt-4">
            Mining, the process of adding new blocks, secures the network and validates transactions. Despite the complexity of mining, it's pivotal for Ethereum's decentralized functionality, supporting applications and transactions on the blockchain.
          </p>
        </div>
      </div>
    </>
  );
};

DisplayBlock.propTypes = {
  block: PropTypes.shape({
    hash: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
    timestamp: PropTypes.number.isRequired,
    miner: PropTypes.string.isRequired,
    parentHash: PropTypes.string.isRequired,
    totalFees: PropTypes.string.isRequired,
    transactions: PropTypes.arrayOf(PropTypes.string).isRequired,
    baseFeePerGas: PropTypes.string.isRequired,
  }).isRequired,
};

export default DisplayBlock;