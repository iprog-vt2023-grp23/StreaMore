import { useSelector } from "react-redux";
import RenderMovies from "../movie/RenderMovies";
import MovieListView from "./MovieListView";
import {
  getMovieList,
} from "./movieListSlice";

const MovieList = () => {
  const movieList = useSelector(getMovieList);

  //Render all movies in movieList using map and the rendermovie function and with imdbId as key for each rendered object
  //const content = movieList.map(movie => <RenderMovie onSelectMovie={dispatch(selectMovieToInspect(movie))} onAddToMovieList={dispatch(addMovieToList(movie))} onRemoveToMovieList={dispatch(removeMovieFromList(movie))} key={movie.imdbId} result={movie} />);
  const content = <RenderMovies movies={movieList} />;
  return <MovieListView content={content}/>
};

export default MovieList;
