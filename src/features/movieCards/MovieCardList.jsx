import { getMovieList } from "../userLists/movieListSlice";
import { selectMovieToInspect } from "../inspectMovie/inspectMovieSlice";
import { useDispatch, useSelector } from "react-redux";
import MovieCardListView from "./MovieCardListView";
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
  return (
    <MovieCardListView
        movies={props.movies}
        selectMovie={selectMovie}
        addMovieButton={addMovieButton}
        removeMovieButton={removeMovieButton}
        movieList={movieList}
    />
  );
};

export default RenderMovies;
