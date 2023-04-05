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
  const movieLists = useSelector(getMovieLists);

  const selectMovie = (movie) => {
    dispatch(selectMovieToInspect(movie));
  };
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
        onAddNewMovieList={onAddNewMovieList}
        onAddMovieToList={onAddMovieToList}
        movieLists={movieLists}
    />
  );
};

export default MovieCardList;
