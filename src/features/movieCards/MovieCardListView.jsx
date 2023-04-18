import MovieCard from "../uiComponents/MovieCard";
import "./MovieCardList.css"

const MovieCardListView = (props) => {
  return (
    <div className="movieCardList">
      {props.movies.map((movie) => (
        <MovieCard
          getItems={props.getItems}
          key={movie.imdbId}
          onSelectMovie={props.selectMovie}
          onAddNewMovieList={props.onAddNewMovieList}
          onAddMovieToList={props.onAddMovieToList}
          id={movie.imdbId}
          movie={movie}
          movieLists={props.movieLists}
        />
      ))}
    </div>
  );
};

 export default MovieCardListView;
