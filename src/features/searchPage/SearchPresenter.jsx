import { useSelector } from "react-redux";
import { getResultsStatus } from "./searchSlice";
import SearchList from "./SearchListPresenter";
import SearchBar from "../searchbar/SearchBarPresenter";
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
      
        <div className="searchCenteredText"><h4>
          <i>Search for any Movie or TV Series by filtering for streaming services, genres or countries</i>
        </h4>
        <h4>
          <i>Create Personalized lists however you like</i>
        </h4>
        <h5>
          <i>Please visit our <a href="https://github.com/iprog-vt2023-grp23/StreaMore" target="_blank" rel="noopener noreferrer">Github</a> for more information</i>
        </h5></div>
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
