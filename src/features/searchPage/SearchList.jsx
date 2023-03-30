import { useSelector, useDispatch } from "react-redux";
import { selectMovieToInspect } from "../inspectMovie/inspectMovieSlice";
import {
  addMovieToList,
  removeMovieFromList,
  getMovieList,
} from "../movieList/movieListSlice";
import {
  selectAllResults,
  getResultsStatus,
  getResultsError,
  getKeyword,
} from "./searchSlice";
import "./SearchList.css";
import { BiLoaderCircle } from "react-icons/bi";
import RenderMovies from "../movie/RenderMovies";
import SearchListView from "./SearchListView";

const SearchList = () => {
  const dispatch = useDispatch();
  let results = useSelector(selectAllResults);
  let status = useSelector(getResultsStatus);
  const error = useSelector(getResultsError);
  const keyword = useSelector(getKeyword);
  const movieList = useSelector(getMovieList);

  const selectMovie = (movie) => {
    dispatch(selectMovieToInspect(movie));
  };
  const addMovie = (movie) => {
    dispatch(addMovieToList(movie));
  };
  const removeMovie = (movie) => {
    dispatch(removeMovieFromList(movie));
  };

  // Either render a loading gif, the search result or an error depending on the status
  if (status === "loading") {
    // content = <img src="https://codemyui.com/wp-content/uploads/2017/09/rotate-pulsating-loading-animation.gif"/>
    return <BiLoaderCircle className="loadingCircle" />;
  } else if (status === "succeeded") {
    //Spreads the results array and sorts it by imdb rating
    //const content = [...results].sort((a, b) => {return b.imdbRating - a.imdbRating});
    const content = <RenderMovies movies={results} />;
    return <SearchListView content={content} keyword={keyword} />;
    //Render all movies in sortedResults using map and the rendermovie function and with imdbId as key for each rendered object
    //content = sortedResults.map(movie => <div className="movieCard"><RenderMovie onSelectMovie={dispatch(selectMovieToInspect(movie))} onAddToMovieList={dispatch(addMovieToList(movie))} onRemoveToMovieList={dispatch(removeMovieFromList(movie))} key={movie.imdbId} result={movie} /></div>);
  } else if (status === "failed") {
    return <div>{error}</div>;
  }
};

export default SearchList;
