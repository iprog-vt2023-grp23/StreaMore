import { useSelector, useDispatch } from "react-redux";
import RenderMovies from "../movie/RenderMovies";
import { selectMovieToInspect } from "../inspectMovie/inspectMovieSlice";
import MovieListView from "./MovieListView";
import {
  addMovieToList,
  getMovieList,
  removeMovieFromList,
} from "./movieListSlice";

const MovieList = () => {
  const movieList = useSelector(getMovieList);
  const dispatch = useDispatch();

  //Render all movies in movieList using map and the rendermovie function and with imdbId as key for each rendered object
  //const content = movieList.map(movie => <RenderMovie onSelectMovie={dispatch(selectMovieToInspect(movie))} onAddToMovieList={dispatch(addMovieToList(movie))} onRemoveToMovieList={dispatch(removeMovieFromList(movie))} key={movie.imdbId} result={movie} />);
  console.log(movieList)
  const content = <RenderMovies movies={movieList} />;
    console.log("asdas",content)
  return <MovieListView content={content}/>
};

export default MovieList;
