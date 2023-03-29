import {
  addMovieToList,
  removeMovieFromList,
  getMovieList,
} from "../movieList/movieListSlice";
import { selectMovieToInspect } from "../inspectMovie/inspectMovieSlice";
import { useDispatch, useSelector } from "react-redux";
import "../searchPage/SearchList.css";
import MovieView from "./MovieView";

const RenderMovies = (props) => {
  const dispatch = useDispatch();
  const movieList = useSelector(getMovieList);

  const selectMovie = (movie) => {
    console.log(movie);
    dispatch(selectMovieToInspect(movie));
  };
  const addMovie = (movie) => {
    dispatch(addMovieToList(movie));
  };
  const removeMovie = (movie) => {
    dispatch(removeMovieFromList(movie));
  };

  return props.movies.map((movie) => (
      <MovieView
        key={movie.imdbId}
        onSelectMovie={selectMovie}
        onAddToMovieList={addMovie}
        onRemoveToMovieList={removeMovie}
        id={movie.imdbId}
        movie={movie}
        movieList={movieList}
      />
  ));
};

export default RenderMovies;
