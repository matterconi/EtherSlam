import { SiReact, SiTailwindcss, SiEthereum, SiChatbot } from 'react-icons/si'; // Added SiChatbot for ChatGPT
import { FaDragon, FaSearch } from 'react-icons/fa'; // Using FaSearch as a placeholder for EtherScan
import { SiAlchemy } from 'react-icons/si';

const BuiltWith = () => {
    return (
        <>
            <style>
                {`
                @keyframes rotate {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }
                @keyframes oscillate {
                    0%, 100% {
                        transform: translateX(0) rotate(-2.5deg);
                    }
                    50% {
                        transform: translateX(2px) rotate(2.5deg);
                    }
                }
                @keyframes textFloat {
                    0%, 100% {
                        transform: translateX(1px);
                    }
                    50% {
                        transform: translateX(-1px);
                    }
                }
                .rotate {
                    animation: rotate 20s linear infinite;
                }
                .oscillate {
                    animation: oscillate 3s ease-in-out infinite;
                }
                .textFloat {
                    display: inline-block;
                    animation: textFloat 5s ease-in-out infinite;
                }
                `}
            </style>
            <div className="bg-white rounded-xl p-6 md:p-8 mx-4 md:mx-16 my-8 md:mb-16">
                <h2 className="text-xl md:text-2xl font-semibold mb-6 md:mb-8 text-center">Built With</h2>
                <div className="flex flex-wrap justify-center gap-x-16 gap-y-8 mt-8">
                    <div className="flex items-center gap-2">
                        <SiReact size="24" className="text-blue-600 rotate mr-2" />
                        <span className="textFloat">React</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <SiTailwindcss size="24" className="text-blue-400 oscillate mr-2" />
                        <span className="textFloat">Tailwind CSS</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <SiEthereum size="24" className="text-black oscillate mr-2" />
                        <span className="textFloat">Ether.js</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <FaDragon size="24" className="text-green-600 oscillate mr-2" />
                        <span className="textFloat">CoinGecko</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <SiAlchemy size="24" className="text-yellow-500 rotate mr-2" />
                        <span className="textFloat">Alchemy</span>
                    </div>
                    {/* Adding EtherScan */}
                    <div className="flex items-center gap-2">
                        <FaSearch size="24" className="text-gray-600 rotate mr-2" /> {/* Placeholder icon */}
                        <span className="textFloat">EtherScan</span>
                    </div>
                    {/* Adding ChatGPT */}
                    <div className="flex items-center gap-2">
                        <SiChatbot size="24" className="text-pink-600 oscillate mr-2" />
                        <span className="textFloat">ChatGPT</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BuiltWith;