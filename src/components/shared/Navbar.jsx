import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="text-white flex justify-between items-center pt-8 mb-16 ">
      <Link to="/" className="text-2xl font-bold">Eth-Ciclopedia</Link>
      <ul className="flex gap-4">
        <li className="hover:text-gray-200 transition-colors duration-200">
          <a href="/">Blockchain</a>
        </li>
        <li className="hover:text-gray-200 transition-colors duration-200">
        <Link to="/tokens">Tokens</Link>
        </li>
        <li className="hover:text-gray-200 transition-colors duration-200">
        <Link to="/nfts">Nfts</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;