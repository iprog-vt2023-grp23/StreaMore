import { getMovieList } from "../movieList/movieListSlice";
import { selectMovieToInspect } from "../inspectMovie/inspectMovieSlice";
import { useDispatch, useSelector } from "react-redux";
import "../searchPage/SearchList.css";
import MovieView from "./MovieView";
import {
  addMovieFirebase,
  removeMovieFirebase,
} from "../../firebase/firebaseSlice";

const RenderMovies = (props) => {
  const dispatch = useDispatch();
  const movieList = useSelector(getMovieList);

  const selectMovie = (movie) => {
    dispatch(selectMovieToInspect(movie));
  };
  const addMovieButton = (movie) => {
    dispatch(addMovieFirebase({ movie }));
  };
  const removeMovieButton = (movie) => {
    dispatch(removeMovieFirebase({ movie }));
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
