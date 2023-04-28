import { useSelector } from "react-redux";
import { getResultsStatus } from "./searchSlice";
import SearchList from "./SearchListPresenter";
import SearchBar from "./SearchBarPresenter";
import "./Search.css";

const SearchPresenter = () => {
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

export default SearchPresenter;
