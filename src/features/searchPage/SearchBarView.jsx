import "./SearchBar.css";

const SearchBarView = (props) => {
  const keyDown = (e) => {
    props.onKeyDown(e);
  };
  const keywordChanged = (e) => {
    props.onKeywordChanged(e);
  };

  return (
    <section className="searchBar">
      {/* <h2>Search</h2> */}
      <form>
        {/* <label>Movie Title</label> */}
        <input
          className="searchBarInput"
          type="text"
          id="movieTitle"
          name="movieName"
          placeholder="Search for a film..."
          value={props.keyword}
          onChange={keywordChanged}
          onKeyDown={keyDown}
        />
        {/* <label htmlFor="country">Country</label> */}
        <div>
          <select
            id="country"
            value={props.country_codes_array[props.country.toUpperCase()]}
            onChange={props.onCountryChanged}
          >
            <option value=""></option>
            {props.countryOptions}
          </select>
          <button type="button" onClick={props.onSearch}>
            Search
          </button>
        </div>
      </form>
    </section>
  );
};

export default SearchBarView;
