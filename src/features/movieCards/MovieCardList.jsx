// import { getMovieList } from "../userLists/userListsSlice";
import { getMovieLists } from "../userLists/movieListsSlice";
import { selectMovieToInspect } from "../inspectMovie/inspectMovieSlice";
import { useDispatch, useSelector } from "react-redux";
import MovieCardListView from "./MovieCardListView";
import {
  createMovieListFirebase,
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
  const onAddNewMovieList = (listName) => {
    dispatch(createMovieListFirebase( listName ));
  };
  const onAddMovieToList = (listName, movie) => {
    dispatch(addMovieToMovieListFirebase({ listName, movie }));
  };


  return (
    <MovieCardListView
        movies={props.movies}
        selectMovie={selectMovie}
        // addMovieButton={addMovieButton}
        // removeMovieButton={removeMovieButton}
        onAddNewMovieList={onAddNewMovieList}
        onAddMovieToList={onAddMovieToList}
        // movieList={movieList}
        movieLists={movieLists}
    />
  );
};

export default MovieCardList;
