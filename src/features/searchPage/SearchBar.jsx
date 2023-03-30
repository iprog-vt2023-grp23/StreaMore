import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  searchFilms,
  setStateCountry,
  getCountry,
  setStateKeyword,
} from "./searchSlice";
import country_codes_array from "./CountryCodes";
import SearchBarView from "./SearchBarView";
import { BsSearch } from "react-icons/bs";
import "./SearchBar.css";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");
  const [searchRequestStatus, setSearchRequestStatus] = useState("idle");
  const country = useSelector(getCountry);

  //Functions for changing the current sate as well as setting the store state
  const keywordChanged = (e) => setKeyword(e.target.value);
  const countryChanged = (e) => {
    //Finds the two letter country code from the full country name (looks more wack than it is)
    const toAdd = Object.keys(country_codes_array)
      .find((key) => country_codes_array[key] === e.target.value)
      .toLowerCase();
    dispatch(setStateCountry(toAdd));
  };

  //Function for the search button
  const search = () => {
    //Don't allow user to spam search button faster than a response can be received
    if (searchRequestStatus === "idle") {
      try {
        setSearchRequestStatus("pending");
        /* 
                    Change parameters for the search here! Parameters can be found on https://rapidapi.com/movie-of-the-night-movie-of-the-night-default/api/streaming-availability
                */
        dispatch(
          searchFilms([
            "title=" + keyword,
            "services=netflix",
            "country=" + country,
          ])
        ).unwrap();
        dispatch(setStateKeyword(keyword));
        setKeyword("");
      } catch (err) {
        console.log(err);
      } finally {
        setSearchRequestStatus("idle");
      }
    }
  };

  //Function for searching when the enter key is pressed down
  function keyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault(); //Dont reload the page
      search();
    }
  }

  //Function that gets all possible country names from CountryCodes
  const countryOptions = Object.values(country_codes_array).map((country) => (
    <option key={country} value={country}>
      {country}
    </option>
  ));

  
  

  return (
    <SearchBarView
      country_codes_array={country_codes_array}
      country={country}
      keyword={keyword}
      countryOptions={countryOptions}
      onKeywordChanged={keywordChanged}
      onKeyDown={keyDown}
      onSearch={search}
      onCountryChanged={countryChanged}
    />
  );
};

export default SearchBar;
