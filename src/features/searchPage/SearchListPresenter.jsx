import { useSelector, useDispatch } from "react-redux";
import { selectMovieToInspect } from "../inspectMovie/inspectMovieSlice";
import { useState } from "react";
// import {
//   addMovieToList,
//   removeMovieFromList,
//   getMovieList,
// } from "../userLists/userListsSlice";
import AddToListMenu from "../movieCards/AddToListMenuView";
import {
  selectAllResults,
  getResultsStatus,
  getResultsError,
  getKeyword,
} from "./searchSlice";
import "./SearchList.css";
import { BiLoaderCircle } from "react-icons/bi";
import MovieCardList from "../movieCards/MovieCardListPresenter";
import SearchListView from "./SearchListView";

const SearchList = () => {
  const [showAddToListMenu, setShowAddToListMenu] = useState(false);
  const dispatch = useDispatch();
  let results = useSelector(selectAllResults);
  let status = useSelector(getResultsStatus);
  const error = useSelector(getResultsError);
  const keyword = useSelector(getKeyword);

  const selectMovie = (movie) => {
    dispatch(selectMovieToInspect(movie));
  };






  // Either render a loading gif, the search result or an error depending on the status
  if (status === "loading") {
    return <BiLoaderCircle className="loadingCircle" />;
  } else if (status === "succeeded") {
    //Spreads the results array and sorts it by imdb rating

    /*
    * Detta är en presenter, vet inte om vi borde använda den som ett ui element!
    */
    const content = <MovieCardList movies={results} />;
    /*
     * 
     */
    return <SearchListView content={content} keyword={keyword} />;
    //Render all movies in sortedResults using map and the rendermovie function and with imdbId as key for each rendered object
  } else if (status === "failed") {
    return <div>{error}</div>;
  }
};

export default SearchList;
