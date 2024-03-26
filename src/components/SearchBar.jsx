const SearchBar = () => {
  return (
    <div className="rounded-lg max-w-md mx-auto mb-16 ">
      <div className="text-white my-4">
        <p className="font-bold">Searchbox for blockchains by day, tennis net by night</p>
      </div>
      <input
        type="text"
        placeholder="Search for block, transaction, wallet..."
        className="w-full p-2 rounded-md"
      />
    </div>
  );
}

export default SearchBar;