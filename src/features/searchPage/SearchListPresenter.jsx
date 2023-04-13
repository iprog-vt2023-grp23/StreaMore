import { useSelector, useDispatch } from "react-redux";
import { selectMovieToInspect } from "../inspectMovie/inspectMovieSlice";
// import {
//   addMovieToList,
//   removeMovieFromList,
//   getMovieList,
// } from "../userLists/userListsSlice";
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
  const dispatch = useDispatch();
  let results = useSelector(selectAllResults);
  let status = useSelector(getResultsStatus);
  const error = useSelector(getResultsError);
  const keyword = useSelector(getKeyword);
  // const movieList = useSelector(getMovieList);

  const selectMovie = (movie) => {
    dispatch(selectMovieToInspect(movie));
  };
  // const addMovie = (movie) => {
  //   dispatch(addMovieToList(movie));
  // };
  // const removeMovie = (movie) => {
  //   dispatch(removeMovieFromList(movie));
  // };

  // Either render a loading gif, the search result or an error depending on the status
  if (status === "loading") {
    return <BiLoaderCircle className="loadingCircle" />;
  } else if (status === "succeeded") {
    //Spreads the results array and sorts it by imdb rating
    const content = <MovieCardList movies={results} />;
    return <SearchListView content={content} keyword={keyword} />;
    //Render all movies in sortedResults using map and the rendermovie function and with imdbId as key for each rendered object
  } else if (status === "failed") {
    return <div>{error}</div>;
  }
};

export default SearchList;
