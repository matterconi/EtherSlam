function Navbar() {
  return (
    <nav className="text-white flex justify-between items-center pt-8 mb-16 mx-16 ">
      <div className="text-2xl font-bold mb-2">
        BlockSlam
      </div>
      <ul className="flex gap-4">
        <li className="hover:text-gray-200 transition-colors duration-200">
          <a href="/blockchain">Blockchain</a>
        </li>
        <li className="hover:text-gray-200 transition-colors duration-200">
          <a href="/token">Token</a>
        </li>
        <li className="hover:text-gray-200 transition-colors duration-200">
          <a href="/nft">NFT</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;