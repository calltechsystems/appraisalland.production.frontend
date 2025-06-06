const SearchUser = ({searchInput,setSearchInput}) => {
  return (
    <form className="form-inline d-flex">
      <input
        className="form-control"
        type="search"
        placeholder="Search by name"
        aria-label="Search"
        required
        value={searchInput}
        onChange={(e)=>setSearchInput(e.target.value)}
      />
      <button className="btn" type="submit">
        <span className="flaticon-magnifying-glass"></span>
      </button>
    </form>
  );
};

export default SearchUser;
