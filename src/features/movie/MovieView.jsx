import React from "react";
import { NavLink } from "react-router-dom";

/*
 *A reusable function used for rendering a movie, is used in the movie list as well as the searchList and InspectMovie
 */
const MovieView = (props) => {
  //const movieList = useSelector(getMovieList);

  //Selects a clicked movie for inspection
  const selectMovie = () => {
    props.onSelectMovie(props.movie);
    //dispatch(selectMovieToInspect(result));
  };

  /*
   *Adds and removes a rendered movie to and from the user movie list
   */
  const addToMovieList = () => {
    props.onAddToMovieList(props.movie);
    //dispatch(addMovieToList(result));
  };
  const removeFromMovieList = () => {
    props.onRemoveToMovieList(props.movie);
    //dispatch(removeMovieFromList(result));
  };

  /*
   *A button that removes the rendered movie from the movie list if it is in the list
   *Or a button that adds the rendered movie to the movie list if it is not in the list
   */
  const addToListButton = () => {
    if(props.movieList.find(movie => movie.imdbId === props.movie.imdbId))
      return <button onClick={removeFromMovieList}>-</button>;
    return <button onClick={addToMovieList}>+</button>;
  };
  //Renders a clickable movie, the onclick will navigate to inspectMovie where the clicked movie will be displayed
  return (
    <div>
      {/*Stylas i SearchList.css*/}
      <NavLink onClick={selectMovie} to="/inspectMovie">
        <h3>{props.movie.title}</h3>
        <div>{props.movie.body}</div>
        <img src={props.movie.posterURLs[154]}></img>
      </NavLink>
      {/* temp borttagna, TODO ska få plats med dom i korten {renderStreamingServices(result)} */}
      {addToListButton()}
    </div>
  );
};

export default MovieView;
