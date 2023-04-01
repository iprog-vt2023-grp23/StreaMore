import { getMovieList } from "../userLists/userListsSlice";
import { getMovieLists } from "../userLists/movieListsSlice";
import { selectMovieToInspect } from "../inspectMovie/inspectMovieSlice";
import { useDispatch, useSelector } from "react-redux";
import MovieCardListView from "./MovieCardListView";
import {
  addMovieFirebase,
  removeMovieFirebase,
  addMovieListFirebase,
  addMovieToMovieListFirebase,
} from "../../firebase/firebaseSlice";

const MovieCardList = (props) => {
  const dispatch = useDispatch();
  // const movieList = useSelector(getMovieList);
  const movieLists = useSelector(getMovieLists);

  const selectMovie = (movie) => {
    dispatch(selectMovieToInspect(movie));
  };
  // const addMovieButton = (movie) => {
  //   dispatch(addMovieFirebase({ movie }));
  // };
  // const removeMovieButton = (movie) => {
  //   dispatch(removeMovieFirebase({ movie }));
  // };
  const addMovieListButton = (listName) => {
    dispatch(addMovieListFirebase({ listName }));
  };
  const addMovieToListButton = (listName, movie) => {
    dispatch(addMovieToMovieListFirebase({ listName, movie }));
  };


  return (
    <MovieCardListView
        movies={props.movies}
        selectMovie={selectMovie}
        // addMovieButton={addMovieButton}
        // removeMovieButton={removeMovieButton}
        addMovieListButton={addMovieListButton}
        addMovieToListButton={addMovieToListButton}
        // movieList={movieList}
        movieLists={movieLists}
    />
  );
};

export default MovieCardList;
