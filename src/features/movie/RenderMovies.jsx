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

const RenderMovies = (props) => {
  const { api } = useContext(FirebaseContext);
  const dispatch = useDispatch();
  const movieList = useSelector(getMovieList);

  const selectMovie = (movie) => {
    console.log(movie);
    dispatch(selectMovieToInspect(movie));
  };
  const addMovie = (movie) => {
    dispatch(addMovieToList(movie));
    api.addMovie(movie);

  };
  const removeMovie = (movie) => {
    dispatch(removeMovieFromList(movie));
    api.removeMovie(movie);
  };

  console.log("list",movieList)
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
