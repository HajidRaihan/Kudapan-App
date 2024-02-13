const SearchBar = ({ value, handler }) => {
  return (
    <div className="mx-5 z-50 my-3">
      <input
        type="text"
        placeholder="search"
        className="w-full h-8 border border-slate-500 rounded-xl p-2"
        value={value}
        onChange={handler}
      />
    </div>
  );
};

export default SearchBar;
