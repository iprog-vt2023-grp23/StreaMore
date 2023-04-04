import { useSelector } from "react-redux";
import MovieCardList from "../movieCards/MovieCardList";
import MovieListView from "./MyListsPageView";
// import {
//   getMovieList,
// } from "./userListsSlice";
import { getMovieLists } from "./movieListsSlice";

const MyListsPage = () => {
   const movieLists = useSelector(getMovieLists);

  //Render all movies in movieList using map and the rendermovie function and with imdbId as key for each rendered object
  //const content = movieList.map(movie => <RenderMovie onSelectMovie={dispatch(selectMovieToInspect(movie))} onAddToMovieList={dispatch(addMovieToList(movie))} onRemoveToMovieList={dispatch(removeMovieFromList(movie))} key={movie.imdbId} result={movie} />);
  // return <MovieListView content={content}/>
  return movieLists.map((list) => (
    <div>{list.name}</div>
    ));
};

export default MyListsPage;
