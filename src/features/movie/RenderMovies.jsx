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
import { FirebaseContext } from '/src/firebase/Firebase';
import { getUserId } from "../userPage/userPageSlice";

const RenderMovies = (props) => {
  const { api } = useContext(FirebaseContext);
  const dispatch = useDispatch();
  const movieList = useSelector(getMovieList);
  const userId = useSelector(getUserId)

  const selectMovie = (movie) => {
    dispatch(selectMovieToInspect(movie));
  };
  const addMovie = (movie) => {
    api.addMovie(movie, userId);
  };
  const removeMovie = (movie) => {
    api.removeMovie(movie, userId);
  };

  return props.movies.map((movie) => (
    <div className="movieCard" key={movie.imdbId}>
      <MovieView
        onSelectMovie={selectMovie}
        onAddToMovieList={addMovie}
        onRemoveToMovieList={removeMovie}
        id={movie.imdbId}
        movie={movie}
        movieList={movieList}
      />
    </div>
  ));
};

export default RenderMovies;
