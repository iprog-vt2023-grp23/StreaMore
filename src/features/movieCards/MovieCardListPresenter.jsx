// import { getMovieList } from "../userLists/userListsSlice";
import { addMovieToMovieList, addNewMovieList, getMovieLists, updateMovieLists } from "../userLists/myListsSlice";
import { selectMovieToInspect } from "../inspectMovie/inspectMovieSlice";
import { useDispatch, useSelector } from "react-redux";
import MovieCardView from "./MovieCardView";
import "./MovieView.css"

const MovieCardList = (props) => {
  const dispatch = useDispatch();
  const movieLists = useSelector(getMovieLists);

  const selectMovie = (movie) => {
    dispatch(selectMovieToInspect(movie));
  };
  const onAddNewMovieList = (listName) => {
    dispatch(addNewMovieList( listName ));
  };
  const onAddMovieToList = (listName, movie) => {
    dispatch(addMovieToMovieList({ listName, movie }));
  };

  return (
    <div className="movieCardList">
      {/*Render all movies*/}
      {props.movies.map((movie) => (
        <MovieCardView
          key={movie.imdbId}
          onSelectMovie={selectMovie}
          onAddNewMovieList={onAddNewMovieList}
          onAddMovieToList={onAddMovieToList}
          id={movie.imdbId}
          movie={movie}
          movieLists={movieLists}
        />
      ))}
    </div>
  ); 
};

export default MovieCardList;
