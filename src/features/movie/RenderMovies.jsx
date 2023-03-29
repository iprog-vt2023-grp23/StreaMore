import {
  addMovieToList,
  removeMovieFromList,
  getMovieList,
} from "../movieList/movieListSlice";
import { useContext } from "react";
import { selectMovieToInspect } from "../inspectMovie/inspectMovieSlice";
import { useDispatch, useSelector } from "react-redux";
import "../searchPage/SearchList.css";
import MovieView from "./MovieView";
import { getUserId, addMovie, removeMovie } from "../../firebase/firebaseSlice";

const RenderMovies = (props) => {
  const dispatch = useDispatch();
  const movieList = useSelector(getMovieList);
  const userId = useSelector(getUserId)

  const selectMovie = (movie) => {
    dispatch(selectMovieToInspect(movie));
  };
  const addMovieButton = (movie) => {
    dispatch(addMovie(movie, userId));
  };
  const removeMovieButton = (movie) => {
    dispatch(removeMovie(movie, userId));
  };

  return props.movies.map((movie) => (
    <div className="movieCard" key={movie.imdbId}>
      <MovieView
        onSelectMovie={selectMovie}
        onAddToMovieList={addMovieButton}
        onRemoveToMovieList={removeMovieButton}
        id={movie.imdbId}
        movie={movie}
        movieList={movieList}
      />
    </div>
  ));
};

export default RenderMovies;
