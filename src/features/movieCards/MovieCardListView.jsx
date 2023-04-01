import MovieCardView from "./MovieCardView";
import "./MovieView.css"

const MovieCardListView = (props) => {
  return (
    <div className="movieCardList">
      {props.movies.map((movie) => (
        <MovieCardView
          key={movie.imdbId}
          onSelectMovie={props.selectMovie}
          // onAddToMovieList={props.addMovieButton}
          // onRemoveToMovieList={props.removeMovieButton}
          onAddMovieList={props.addMovieListButton}
          onAddMovieToList={props.addMovieToListButton}
          id={movie.imdbId}
          movie={movie}
          // movieList={props.movieList}
          movieLists={props.movieLists}
        />
      ))}
    </div>
  );
};

export default MovieCardListView;
