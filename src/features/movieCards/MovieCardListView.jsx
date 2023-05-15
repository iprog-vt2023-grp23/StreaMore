import MovieCardView from "./MovieCardView";
import "./MovieCardList.css";

const MovieCardListView = (props) => {
  return (
    <div className="movieCardList">
      {props.movies.map((movie) => (
        <MovieCardView
          getItems={props.getItems}
          key={movie.imdbId}
          onSelectMovie={props.selectMovie}
          onAddNewMovieList={props.onAddNewMovieList}
          onAddMovieToList={props.onAddMovieToList}
          onPlusButtonClick={props.onPlusButtonClick}
          id={movie.imdbId}
          movie={movie}
          movieLists={props.movieLists}
          search={props.search}
          list={props.list}
        />
      ))}
    </div>
  );
};

export default MovieCardListView;
