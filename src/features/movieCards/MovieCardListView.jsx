import MovieCardView from "./MovieCardView";
import "./MovieView.css"

const MovieCardListView = (props) => {
  return (
    <div className="renderCards">
      {props.movies.map((movie) => (
        <MovieCardView
          key={movie.imdbId}
          onSelectMovie={props.selectMovie}
          onAddToMovieList={props.addMovieButton}
          onRemoveToMovieList={props.removeMovieButton}
          id={movie.imdbId}
          movie={movie}
          movieList={props.movieList}
        />
      ))}
    </div>
  );
};

export default MovieCardListView;
