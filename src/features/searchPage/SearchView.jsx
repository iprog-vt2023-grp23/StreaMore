import { useSelector } from "react-redux";
import { getResultsStatus } from "./searchSlice";
import SearchList from "./SearchList";
import SearchBar from "./SearchBar";
import "./Search.css";

const Search = () => {
  let status = useSelector(getResultsStatus);
  const SearchCentered = () => {
    return (
      <div className="searchCentered">
        <h1>StreaMore</h1>
        <h4>
          <i>Stream more, search less</i>
        </h4>
        <SearchBar />
      </div>
    );
  };

  const SearchAndResults = () => {
    return (
      <div className="searchAndResults">
        <SearchBar />
        <SearchList />
      </div>
    );
  };

  return <>{status === "idle" ? <SearchCentered /> : <SearchAndResults />}</>;
};

export default Search;
